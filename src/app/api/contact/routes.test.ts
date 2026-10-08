// @vitest-environment node
/**
 * Route tests for /api/contact/sales and /api/contact/support: Zoho retry,
 * the SMTP email fallback, the [LEAD_FALLBACK] log line and the response the
 * visitor gets. Zoho is mocked at fetch and SMTP at nodemailer; no real CRM
 * record or email is created.
 */
import { createHash } from "node:crypto";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { NextRequest } from "next/server";

const mail = vi.hoisted(() => {
  const sendMail = vi.fn();
  const close = vi.fn();
  const createTransport = vi.fn(() => ({ sendMail, close }));
  return { sendMail, close, createTransport };
});

vi.mock("nodemailer", () => ({
  default: { createTransport: mail.createTransport },
  createTransport: mail.createTransport,
}));

type Responder = () => Response | Promise<Response>;
type RouteModule = { POST: (req: NextRequest) => Promise<Response> };

const ENV: Record<string, string> = {
  ZOHO_CLIENT_ID: "test-client-id",
  ZOHO_CLIENT_SECRET: "test-client-secret",
  ZOHO_REFRESH_TOKEN: "test-refresh-token",
  ZOHO_DESK_ORG_ID: "111",
  ZOHO_DESK_DEPARTMENT_ID: "222",
  FALLBACK_SMTP_USER: "website@humaneers.dev",
  FALLBACK_SMTP_PASS: "test-app-password",
};

const SALES_ERROR = "Our systems are busy. Please email hello@humaneers.dev directly.";
const SUPPORT_ERROR = "Unable to create ticket automatically. Please email support@humaneers.dev.";

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json" },
  });
}

const tokenOk: Responder = () => json({ access_token: "tok-1", expires_in: 3600 });
const leadOk: Responder = () =>
  json({ data: [{ code: "SUCCESS", status: "success", details: { id: "L1" } }] }, 201);
const ticketOk: Responder = () => json({ id: "T1", ticketNumber: "101" });
const down: Responder = () => json({ code: "INTERNAL_ERROR" }, 503);

let fetchMock: ReturnType<typeof vi.fn>;

function mockZoho(queues: { leads?: Responder[]; tickets?: Responder[]; always?: Responder }) {
  fetchMock = vi.fn(async (input: RequestInfo | URL) => {
    const url = String(input);
    if (url.includes("/oauth/v2/token")) return tokenOk();
    const queue = url.includes("/crm/v2/Leads")
      ? queues.leads
      : url.includes("/api/v1/tickets")
        ? queues.tickets
        : undefined;
    const responder = queue?.shift() ?? queues.always;
    if (!responder) throw new Error(`test: no response queued for ${url}`);
    return responder();
  });
  vi.stubGlobal("fetch", fetchMock);
}

function callsTo(fragment: string) {
  return fetchMock.mock.calls.filter(([url]) => String(url).includes(fragment));
}

function smtpAccepts(...addresses: string[]) {
  mail.sendMail.mockResolvedValue({ accepted: addresses, rejected: [], messageId: "<m@test>" });
}

function fallbackLogs(): Array<Record<string, unknown>> {
  return vi
    .mocked(console.error)
    .mock.calls.filter(
      ([first]) => typeof first === "string" && first.startsWith("[LEAD_FALLBACK] ")
    )
    .map(([first]) => JSON.parse((first as string).slice("[LEAD_FALLBACK] ".length)));
}

function allLogText(): string {
  const spies = [vi.mocked(console.error), vi.mocked(console.warn)];
  return spies.flatMap((s) => s.mock.calls.map((args) => args.map(String).join(" "))).join("\n");
}

let ipCounter = 0;
function post(route: RouteModule, path: string, body: unknown, ip = `203.0.113.${++ipCounter}`) {
  return route.POST(
    new NextRequest(`http://localhost${path}`, {
      method: "POST",
      body: typeof body === "string" ? body : JSON.stringify(body),
      headers: { "content-type": "application/json", "x-forwarded-for": ip },
    })
  );
}

const lead = {
  firstName: "Ada",
  lastName: "Lovelace",
  email: "ada@example.com",
  company: "Analytical Engines",
  phone: "(928) 440-1505",
  description: "We need managed IT for twelve people.",
  source: "Website",
  honeypot: "",
};

const ticket = {
  contactName: "Grace Hopper",
  email: "grace@example.com",
  phone: "(928) 440-1505",
  subject: "Printer offline",
  description: "The office printer is offline for everyone.",
  priority: "High",
  context: "existing_client",
  honeypot: "",
};

let sales: RouteModule;
let support: RouteModule;

beforeEach(async () => {
  vi.resetModules();
  for (const [key, value] of Object.entries(ENV)) vi.stubEnv(key, value);
  vi.spyOn(console, "error").mockImplementation(() => {});
  vi.spyOn(console, "warn").mockImplementation(() => {});
  mail.sendMail.mockReset();
  mail.close.mockReset();
  mail.createTransport.mockClear();

  const zoho = await import("@/lib/zoho");
  zoho.ZOHO_RETRY_POLICY.baseDelayMs = 1;
  sales = await import("./sales/route");
  support = await import("./support/route");
});

afterEach(() => {
  vi.unstubAllEnvs();
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
});

describe("POST /api/contact/sales", () => {
  it("returns success when Zoho takes the lead, and sends no email", async () => {
    mockZoho({ leads: [leadOk] });

    const res = await post(sales, "/api/contact/sales", lead);

    expect(res.status).toBe(200);
    expect(await res.json()).toEqual({ success: true });
    expect(callsTo("/crm/v2/Leads")).toHaveLength(1);
    expect(mail.sendMail).not.toHaveBeenCalled();
    expect(fallbackLogs()).toHaveLength(0);
  });

  it("returns success after a Zoho 5xx is retried", async () => {
    mockZoho({ leads: [down, leadOk] });

    const res = await post(sales, "/api/contact/sales", lead);

    expect(res.status).toBe(200);
    expect(callsTo("/crm/v2/Leads")).toHaveLength(2);
    expect(mail.sendMail).not.toHaveBeenCalled();
    expect(fallbackLogs()).toHaveLength(0);
  });

  it("emails the full submission to hello@ when Zoho stays down, and returns success", async () => {
    mockZoho({ always: down });
    smtpAccepts("hello@humaneers.dev");
    const ip = "198.51.100.7";

    const res = await post(sales, "/api/contact/sales", lead, ip);

    expect(res.status).toBe(200);
    expect(await res.json()).toEqual({ success: true });
    expect(callsTo("/crm/v2/Leads")).toHaveLength(3);

    expect(mail.createTransport).toHaveBeenCalledWith(
      expect.objectContaining({
        host: "smtp.zoho.com",
        port: 465,
        secure: true,
        auth: { user: "website@humaneers.dev", pass: "test-app-password" },
      })
    );
    expect(mail.sendMail).toHaveBeenCalledTimes(1);
    const message = mail.sendMail.mock.calls[0][0];
    expect(message.to).toBe("hello@humaneers.dev");
    expect(message.from).toEqual({ name: "Humaneers website", address: "website@humaneers.dev" });
    expect(message.replyTo).toEqual({ name: "Ada Lovelace", address: "ada@example.com" });
    for (const value of [
      "Ada",
      "Lovelace",
      "ada@example.com",
      "Analytical Engines",
      "(928) 440-1505",
      lead.description,
    ]) {
      expect(message.text).toContain(value);
    }
    expect(message.html).toBeUndefined();
    expect(mail.close).toHaveBeenCalled();

    const [log] = fallbackLogs();
    expect(fallbackLogs()).toHaveLength(1);
    expect(log).toMatchObject({
      formType: "sales",
      errorClass: "server",
      zohoStatus: 503,
      attempts: 3,
      fallback: "sent",
      accepted: true,
    });
    expect(log.submissionId).toMatch(/^[0-9a-f-]{36}$/);
    expect(message.text).toContain(log.submissionId as string);
    expect(log.ipHash).toBe(createHash("sha256").update(ip).digest("hex"));
    expect(allLogText()).not.toContain(ip);
    expect(allLogText()).not.toContain("ada@example.com");
  });

  it("returns the existing error when Zoho and the email both fail", async () => {
    mockZoho({ always: down });
    mail.sendMail.mockRejectedValue(
      Object.assign(new Error("Invalid login"), { code: "EAUTH", responseCode: 535 })
    );

    const res = await post(sales, "/api/contact/sales", lead);

    expect(res.status).toBe(500);
    expect(await res.json()).toEqual({ error: SALES_ERROR });
    expect(fallbackLogs()).toEqual([
      expect.objectContaining({
        formType: "sales",
        errorClass: "server",
        fallback: "failed",
        fallbackErrorClass: "EAUTH",
        fallbackResponseCode: 535,
        accepted: false,
      }),
    ]);
  });

  it("does not count the email as kept when the server did not accept the inbox", async () => {
    mockZoho({ always: down });
    mail.sendMail.mockResolvedValue({ accepted: [], rejected: ["hello@humaneers.dev"] });

    const res = await post(sales, "/api/contact/sales", lead);

    expect(res.status).toBe(500);
    expect(fallbackLogs()[0]).toMatchObject({
      fallback: "failed",
      fallbackErrorClass: "EENVELOPE",
    });
  });

  it("skips the email and logs unconfigured when SMTP credentials are absent", async () => {
    vi.stubEnv("FALLBACK_SMTP_USER", "");
    vi.stubEnv("FALLBACK_SMTP_PASS", "");
    mockZoho({ always: down });

    const res = await post(sales, "/api/contact/sales", lead);

    expect(res.status).toBe(500);
    expect(await res.json()).toEqual({ error: SALES_ERROR });
    expect(mail.createTransport).not.toHaveBeenCalled();
    expect(fallbackLogs()[0]).toMatchObject({ fallback: "unconfigured", accepted: false });
  });

  it("strips line breaks from visitor input placed in mail headers", async () => {
    mockZoho({ always: down });
    smtpAccepts("hello@humaneers.dev");

    await post(sales, "/api/contact/sales", {
      ...lead,
      firstName: "Ada\r\nBcc: attacker@example.net",
    });

    const message = mail.sendMail.mock.calls[0][0];
    expect(message.subject).not.toMatch(/[\r\n]/);
    expect(message.replyTo.name).not.toMatch(/[\r\n]/);
    expect(message.to).toBe("hello@humaneers.dev");
    expect(message.bcc).toBeUndefined();
  });

  it("honeypot: returns success, calls nothing, and logs only the IP hash", async () => {
    mockZoho({ always: down });
    const ip = "192.0.2.44";

    const res = await post(sales, "/api/contact/sales", { ...lead, honeypot: "spam" }, ip);

    expect(res.status).toBe(200);
    expect(await res.json()).toEqual({ success: true });
    expect(fetchMock).not.toHaveBeenCalled();
    expect(mail.sendMail).not.toHaveBeenCalled();
    expect(console.warn).toHaveBeenCalledWith(
      `[Bot Detected] Honeypot filled. IP Hash: ${createHash("sha256").update(ip).digest("hex")}`
    );
    expect(allLogText()).not.toContain(ip);
  });

  it("rejects an invalid or malformed body with 400 and calls nothing", async () => {
    mockZoho({ always: down });

    const invalid = await post(sales, "/api/contact/sales", { ...lead, email: "not-an-email" });
    const malformed = await post(sales, "/api/contact/sales", "{not json");

    expect(invalid.status).toBe(400);
    expect(malformed.status).toBe(400);
    expect(await invalid.json()).toEqual({ error: "Please check your form and try again." });
    expect(fetchMock).not.toHaveBeenCalled();
    expect(mail.sendMail).not.toHaveBeenCalled();
  });
});

describe("POST /api/contact/support", () => {
  it("creates the Desk ticket with departmentId and returns the normal success", async () => {
    mockZoho({ tickets: [ticketOk] });

    const res = await post(support, "/api/contact/support", ticket);

    expect(res.status).toBe(200);
    expect(await res.json()).toEqual({ success: true, message: "Ticket created successfully" });
    const body = JSON.parse((callsTo("/api/v1/tickets")[0][1] as RequestInit).body as string);
    expect(body.departmentId).toBe("222");
    expect(mail.sendMail).not.toHaveBeenCalled();
  });

  it("with no ZOHO_DESK_DEPARTMENT_ID skips Desk and emails support@", async () => {
    vi.stubEnv("ZOHO_DESK_DEPARTMENT_ID", "");
    mockZoho({ tickets: [ticketOk] });
    smtpAccepts("support@humaneers.dev");

    const res = await post(support, "/api/contact/support", ticket);

    expect(res.status).toBe(200);
    expect(await res.json()).toEqual({ success: true });
    expect(fetchMock).not.toHaveBeenCalled();
    expect(console.error).toHaveBeenCalledWith("[CRITICAL] ZOHO_DESK_DEPARTMENT_ID missing");

    const message = mail.sendMail.mock.calls[0][0];
    expect(message.to).toBe("support@humaneers.dev");
    expect(message.replyTo).toEqual({ name: "Grace Hopper", address: "grace@example.com" });
    for (const value of [ticket.subject, ticket.description, "(928) 440-1505", "High"]) {
      expect(message.text).toContain(value);
    }
    expect(fallbackLogs()).toEqual([
      expect.objectContaining({
        formType: "support",
        errorClass: "config",
        zohoDetail: "ZOHO_DESK_DEPARTMENT_ID",
        attempts: 0,
        fallback: "sent",
        accepted: true,
      }),
    ]);
  });

  it("returns the existing error when Desk and the email both fail", async () => {
    mockZoho({ always: down });
    mail.sendMail.mockRejectedValue(Object.assign(new Error("timeout"), { code: "ETIMEDOUT" }));

    const res = await post(support, "/api/contact/support", ticket);

    expect(res.status).toBe(500);
    expect(await res.json()).toEqual({ error: SUPPORT_ERROR });
    expect(callsTo("/api/v1/tickets")).toHaveLength(3);
    expect(fallbackLogs()[0]).toMatchObject({
      formType: "support",
      fallback: "failed",
      fallbackErrorClass: "ETIMEDOUT",
    });
  });

  it("honeypot: returns success and calls nothing", async () => {
    mockZoho({ always: down });

    const res = await post(support, "/api/contact/support", { ...ticket, honeypot: "spam" });

    expect(res.status).toBe(200);
    expect(fetchMock).not.toHaveBeenCalled();
    expect(mail.sendMail).not.toHaveBeenCalled();
  });
});
