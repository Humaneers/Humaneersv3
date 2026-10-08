/**
 * Server-only. Keeps a contact-form submission when Zoho does not take it.
 *
 * The routes call `deliverWithFallback`. It runs the Zoho call; if that ends
 * in failure it emails the full submission to the team inbox through Zoho
 * Mail SMTP, then writes one `[LEAD_FALLBACK]` JSON log line. The route tells
 * the visitor "received" only when Zoho or the email was accepted.
 *
 * This replaces the old client-side pieces (FormSubmissionQueue in
 * localStorage, EmailFallbackService whose sendEmail() only console.logged).
 *
 * Configuration, read at call time:
 *   FALLBACK_SMTP_HOST  default smtp.zoho.com
 *   FALLBACK_SMTP_PORT  default 465 (implicit TLS); any other port requires STARTTLS
 *   FALLBACK_SMTP_USER  mailbox that authenticates and sends; also the From address
 *   FALLBACK_SMTP_PASS  its password (a Zoho app-specific password)
 * Without USER and PASS the fallback is skipped and logged as "unconfigured".
 *
 * Do not import this from client components: it reads server secrets and
 * opens SMTP sockets.
 */
import nodemailer from "nodemailer";
import { ZohoError, type SalesContact, type SupportTicket } from "./zoho";

export type LeadFormType = "sales" | "support";
export type FallbackOutcome = "sent" | "failed" | "unconfigured";

/** Fixed recipients. Never taken from the request or the environment. */
export const FALLBACK_RECIPIENTS: Readonly<Record<LeadFormType, string>> = {
  sales: "hello@humaneers.dev",
  support: "support@humaneers.dev",
};

const FORM_LABELS: Readonly<Record<LeadFormType, string>> = {
  sales: "Sales inquiry",
  support: "Support request",
};

const SMTP_DEFAULT_HOST = "smtp.zoho.com";
const SMTP_DEFAULT_PORT = 465;

/** Bounds the email phase so the route answers inside its maxDuration. */
export const FALLBACK_SMTP_TIMEOUTS = {
  connectionMs: 3000,
  greetingMs: 3000,
  socketMs: 4000,
  overallMs: 4500,
};

/** Per-field cap in the email body. Request bodies are already capped upstream. */
const MAX_FIELD_CHARS = 20_000;

export interface FallbackMessage {
  formType: LeadFormType;
  submissionId: string;
  receivedAt: string;
  /** Visitor's name, for the subject line and Reply-To display name. */
  displayName: string;
  /** Visitor's email (zod-validated), used as Reply-To. */
  replyTo: string;
  /** Every submitted field, in order. Undefined values print as "(not given)". */
  fields: Array<[label: string, value: string | undefined]>;
}

interface SmtpConfig {
  host: string;
  port: number;
  user: string;
  pass: string;
}

interface FailureSummary {
  errorClass: string;
  status?: number;
  zohoCode?: string;
  detail?: string;
  attempts?: number;
}

type SendResult =
  | { outcome: "sent" }
  | { outcome: "unconfigured" }
  | { outcome: "failed"; errorClass: string; responseCode?: number };

function readSmtpConfig(): SmtpConfig | null {
  const user = process.env.FALLBACK_SMTP_USER?.trim();
  const pass = process.env.FALLBACK_SMTP_PASS;
  if (!user || !pass) return null;

  const host = process.env.FALLBACK_SMTP_HOST?.trim() || SMTP_DEFAULT_HOST;
  let port = SMTP_DEFAULT_PORT;
  const rawPort = process.env.FALLBACK_SMTP_PORT?.trim();
  if (rawPort) {
    const parsed = Number(rawPort);
    if (Number.isInteger(parsed) && parsed > 0 && parsed < 65536) {
      port = parsed;
    } else {
      console.warn(`[LEAD_FALLBACK] FALLBACK_SMTP_PORT is not a valid port; using ${port}`);
    }
  }
  return { host, port, user, pass };
}

/** Strips control characters (CR/LF included) and caps length for header use. */
// eslint-disable-next-line no-control-regex -- matching control characters is the point
const CONTROL_CHARS = /[\u0000-\u001f\u007f]+/g;

function headerSafe(value: string, max = 120): string {
  return value.replace(CONTROL_CHARS, " ").replace(/\s+/g, " ").trim().slice(0, max);
}

function bodyValue(value: string | undefined): string {
  if (value === undefined || value === "") return "(not given)";
  return value.length > MAX_FIELD_CHARS
    ? `${value.slice(0, MAX_FIELD_CHARS)}\n[truncated at ${MAX_FIELD_CHARS} characters]`
    : value;
}

function describeFailure(error: unknown): FailureSummary {
  if (error instanceof ZohoError) {
    return {
      errorClass: error.errorClass,
      status: error.status,
      zohoCode: error.zohoCode,
      detail: error.detail,
      attempts: error.attempts,
    };
  }
  return { errorClass: "unknown" };
}

function smtpErrorClass(error: unknown): { errorClass: string; responseCode?: number } {
  const e = error as { code?: unknown; responseCode?: unknown } | null;
  const code = typeof e?.code === "string" && /^[A-Z_]{2,32}$/.test(e.code) ? e.code : "unknown";
  const responseCode = typeof e?.responseCode === "number" ? e.responseCode : undefined;
  return { errorClass: code, responseCode };
}

function composeText(msg: FallbackMessage, failure: FailureSummary): string {
  const zohoTarget = msg.formType === "sales" ? "Zoho CRM" : "Zoho Desk";
  const failureParts = [
    failure.errorClass,
    failure.status ? `HTTP ${failure.status}` : undefined,
    failure.zohoCode,
    failure.detail ? `field/var: ${failure.detail}` : undefined,
    failure.attempts ? `attempts: ${failure.attempts}` : undefined,
  ].filter(Boolean);

  const lines = [
    `This ${FORM_LABELS[msg.formType].toLowerCase()} from the website did not reach ${zohoTarget}.`,
    `No record was created. Enter it by hand. Reply-To is set to the visitor's address.`,
    "",
    `Submission ID: ${msg.submissionId}`,
    `Form: ${FORM_LABELS[msg.formType]}`,
    `Received: ${msg.receivedAt}`,
    `Zoho failure: ${failureParts.join(", ")}`,
    "",
    "--- Submission ---",
  ];
  for (const [label, value] of msg.fields) {
    const text = bodyValue(value);
    lines.push(text.includes("\n") ? `${label}:\n${text}\n` : `${label}: ${text}`);
  }
  return lines.join("\n");
}

async function sendFallbackEmail(
  msg: FallbackMessage,
  failure: FailureSummary
): Promise<SendResult> {
  const cfg = readSmtpConfig();
  if (!cfg) return { outcome: "unconfigured" };

  const transporter = nodemailer.createTransport({
    host: cfg.host,
    port: cfg.port,
    secure: cfg.port === 465,
    // On any port other than 465, refuse to send unless STARTTLS succeeds:
    // the message carries the visitor's details and the login.
    requireTLS: cfg.port !== 465,
    auth: { user: cfg.user, pass: cfg.pass },
    connectionTimeout: FALLBACK_SMTP_TIMEOUTS.connectionMs,
    greetingTimeout: FALLBACK_SMTP_TIMEOUTS.greetingMs,
    socketTimeout: FALLBACK_SMTP_TIMEOUTS.socketMs,
    tls: { minVersion: "TLSv1.2" },
  });

  const to = FALLBACK_RECIPIENTS[msg.formType];
  const name = headerSafe(msg.displayName) || "Website visitor";
  let timer: ReturnType<typeof setTimeout> | undefined;

  try {
    const overall = new Promise<never>((_, reject) => {
      timer = setTimeout(
        () => reject(Object.assign(new Error("Fallback email timed out"), { code: "ETIMEDOUT" })),
        FALLBACK_SMTP_TIMEOUTS.overallMs
      );
    });
    const info = await Promise.race([
      transporter.sendMail({
        // Zoho Mail only relays mail whose From is the authenticated mailbox.
        from: { name: "Humaneers website", address: cfg.user },
        to,
        replyTo: { name, address: msg.replyTo },
        subject: `[Zoho fallback] ${FORM_LABELS[msg.formType]}: ${name} (${msg.submissionId.slice(0, 8)})`,
        text: composeText(msg, failure),
        headers: { "X-Humaneers-Submission-Id": msg.submissionId },
      }),
      overall,
    ]);

    // Count it as kept only if the server accepted the team inbox.
    const accepted = ((info.accepted ?? []) as unknown[]).map((a) =>
      typeof a === "string" ? a : String((a as { address?: unknown } | null)?.address ?? "")
    );
    if (!accepted.some((a) => a.toLowerCase() === to)) {
      return { outcome: "failed", errorClass: "EENVELOPE" };
    }
    return { outcome: "sent" };
  } catch (error) {
    return { outcome: "failed", ...smtpErrorClass(error) };
  } finally {
    clearTimeout(timer);
    transporter.close();
  }
}

export interface DeliveryResult {
  /** True when Zoho or the email fallback took the submission. */
  accepted: boolean;
  via: "zoho" | "email" | "none";
  submissionId: string;
}

/**
 * Runs `deliver` (the Zoho call). If it throws, emails the submission and logs
 * one `[LEAD_FALLBACK]` line. Never throws.
 */
export async function deliverWithFallback(opts: {
  formType: LeadFormType;
  submissionId: string;
  deliver: () => Promise<unknown>;
  message: () => FallbackMessage;
  ipHash: () => Promise<string>;
}): Promise<DeliveryResult> {
  const startedAt = Date.now();
  const { formType, submissionId } = opts;

  try {
    await opts.deliver();
    return { accepted: true, via: "zoho", submissionId };
  } catch (error) {
    const failure = describeFailure(error);

    let result: SendResult;
    try {
      result = await sendFallbackEmail(opts.message(), failure);
    } catch (fallbackError) {
      result = { outcome: "failed", ...smtpErrorClass(fallbackError) };
    }

    let ipHash: string | undefined;
    try {
      ipHash = await opts.ipHash();
    } catch {
      ipHash = undefined;
    }

    const accepted = result.outcome === "sent";
    console.error(
      "[LEAD_FALLBACK] " +
        JSON.stringify({
          submissionId,
          formType,
          errorClass: failure.errorClass,
          zohoStatus: failure.status,
          zohoCode: failure.zohoCode,
          zohoDetail: failure.detail,
          attempts: failure.attempts,
          fallback: result.outcome,
          fallbackErrorClass: result.outcome === "failed" ? result.errorClass : undefined,
          fallbackResponseCode: result.outcome === "failed" ? result.responseCode : undefined,
          accepted,
          ipHash,
          elapsedMs: Date.now() - startedAt,
        })
    );

    return { accepted, via: accepted ? "email" : "none", submissionId };
  }
}

// --- Message builders: every field the visitor submitted, honeypot excluded ---

export function salesFallbackMessage(
  data: SalesContact,
  meta: { submissionId: string; receivedAt: string }
): FallbackMessage {
  return {
    formType: "sales",
    ...meta,
    displayName: `${data.firstName} ${data.lastName}`,
    replyTo: data.email,
    fields: [
      ["First name", data.firstName],
      ["Last name", data.lastName],
      ["Email", data.email],
      ["Company", data.company],
      ["Phone", data.phone],
      ["Source", data.source],
      ["Referrer", data.referrer],
      ["UTM", data.utm ? JSON.stringify(data.utm) : undefined],
      ["Description", data.description],
    ],
  };
}

export function supportFallbackMessage(
  data: SupportTicket,
  meta: { submissionId: string; receivedAt: string }
): FallbackMessage {
  return {
    formType: "support",
    ...meta,
    displayName: data.contactName,
    replyTo: data.email,
    fields: [
      ["Name", data.contactName],
      ["Email", data.email],
      ["Phone", data.phone],
      ["Priority", data.priority],
      ["Context", data.context],
      ["Subject", data.subject],
      ["Description", data.description],
    ],
  };
}
