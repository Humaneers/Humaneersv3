// @vitest-environment node
/**
 * Unit tests for the live Zoho path used by /api/contact/sales and
 * /api/contact/support: createLead and createTicket, their retry policy and
 * the hum-36 department-id guard. Zoho is mocked at fetch; nothing leaves the
 * machine.
 */
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";

type ZohoModule = typeof import("./zoho");
type Responder = (init?: RequestInit) => Response | Promise<Response>;

const ENV: Record<string, string> = {
  ZOHO_CLIENT_ID: "test-client-id",
  ZOHO_CLIENT_SECRET: "test-client-secret",
  ZOHO_REFRESH_TOKEN: "test-refresh-token",
  ZOHO_DESK_ORG_ID: "111",
  ZOHO_DESK_DEPARTMENT_ID: "222",
};

function json(body: unknown, status = 200, headers: Record<string, string> = {}) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json", ...headers },
  });
}

const token =
  (value = "tok-1"): Responder =>
  () =>
    json({ access_token: value, expires_in: 3600 });
const leadOk: Responder = () =>
  json({ data: [{ code: "SUCCESS", status: "success", details: { id: "L1" } }] }, 201);
const ticketOk: Responder = () => json({ id: "T1", ticketNumber: "101" });
const status =
  (code: number, body: unknown = {}, headers: Record<string, string> = {}): Responder =>
  () =>
    json(body, code, headers);
const networkDown: Responder = () => {
  throw new TypeError("fetch failed");
};
const hang: Responder = (init) =>
  new Promise((_, reject) => {
    init?.signal?.addEventListener("abort", () =>
      reject(new DOMException("aborted", "AbortError"))
    );
  });

let fetchMock: ReturnType<typeof vi.fn>;

function mockZoho(queues: { token?: Responder[]; leads?: Responder[]; tickets?: Responder[] }) {
  fetchMock = vi.fn(async (input: RequestInfo | URL, init?: RequestInit) => {
    const url = String(input);
    const take = (queue: Responder[] | undefined, fallback?: Responder) => {
      const responder = queue?.shift() ?? fallback;
      if (!responder) throw new Error(`test: no response queued for ${url}`);
      return responder(init);
    };
    if (url.includes("/oauth/v2/token")) return take(queues.token, token());
    if (url.includes("/crm/v2/Leads")) return take(queues.leads);
    if (url.includes("/api/v1/tickets")) return take(queues.tickets);
    throw new Error(`test: unexpected fetch ${url}`);
  });
  vi.stubGlobal("fetch", fetchMock);
}

function callsTo(fragment: string) {
  return fetchMock.mock.calls.filter(([url]) => String(url).includes(fragment));
}

function authHeader(call: unknown[]) {
  const init = call[1] as RequestInit;
  return (init.headers as Record<string, string>).Authorization;
}

const lead = {
  firstName: "Ada",
  lastName: "Lovelace",
  email: "ada@example.com",
  company: "Analytical Engines",
  phone: "(928) 440-1505",
  description: "Need help with our office network.",
  source: "Website",
  utm: { gclid: "abc" },
};

const ticket = {
  contactName: "Grace Hopper",
  email: "grace@example.com",
  phone: "(928) 440-1505",
  subject: "Printer offline",
  description: "The office printer is offline for everyone.",
  priority: "High" as const,
  context: "existing_client" as const,
};

let zoho: ZohoModule;

beforeEach(async () => {
  vi.resetModules();
  for (const [key, value] of Object.entries(ENV)) vi.stubEnv(key, value);
  vi.spyOn(console, "error").mockImplementation(() => {});
  vi.spyOn(console, "warn").mockImplementation(() => {});
  zoho = await import("./zoho");
  zoho.ZOHO_RETRY_POLICY.baseDelayMs = 1;
});

afterEach(() => {
  vi.unstubAllEnvs();
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
});

describe("createLead", () => {
  it("sends one CRM request with the mapped record", async () => {
    mockZoho({ leads: [leadOk] });

    await zoho.createLead(lead);

    const [call] = callsTo("/crm/v2/Leads");
    expect(callsTo("/crm/v2/Leads")).toHaveLength(1);
    expect(authHeader(call)).toBe("Zoho-oauthtoken tok-1");
    const record = JSON.parse((call[1] as RequestInit).body as string).data[0];
    expect(record).toMatchObject({
      First_Name: "Ada",
      Last_Name: "Lovelace",
      Email: "ada@example.com",
      Company: "Analytical Engines",
      Lead_Source: "Website",
      GCLID: "abc",
    });
    expect(record.Description).toContain("Need help with our office network.");
  });

  it("retries a 503 and succeeds on the next attempt", async () => {
    mockZoho({ leads: [status(503), leadOk] });

    await expect(zoho.createLead(lead)).resolves.toBeDefined();
    expect(callsTo("/crm/v2/Leads")).toHaveLength(2);
  });

  it("retries a network error and a 429, then succeeds", async () => {
    mockZoho({ leads: [networkDown, status(429, {}, { "retry-after": "0" }), leadOk] });

    await expect(zoho.createLead(lead)).resolves.toBeDefined();
    expect(callsTo("/crm/v2/Leads")).toHaveLength(3);
  });

  it("on 401 forces one token refresh and retries once", async () => {
    mockZoho({
      token: [token("tok-old"), token("tok-new")],
      leads: [status(401, { code: "INVALID_TOKEN" }), leadOk],
    });

    await zoho.createLead(lead);

    const leadCalls = callsTo("/crm/v2/Leads");
    expect(callsTo("/oauth/v2/token")).toHaveLength(2);
    expect(authHeader(leadCalls[0])).toBe("Zoho-oauthtoken tok-old");
    expect(authHeader(leadCalls[1])).toBe("Zoho-oauthtoken tok-new");
  });

  it("does not refresh a second time when the new token is also refused", async () => {
    mockZoho({
      token: [token("tok-a"), token("tok-b")],
      leads: [status(401), status(401), leadOk],
    });

    await expect(zoho.createLead(lead)).rejects.toMatchObject({
      errorClass: "auth",
      status: 401,
      attempts: 2,
    });
    expect(callsTo("/crm/v2/Leads")).toHaveLength(2);
  });

  it("does not retry a 400 and reports the Zoho code and field, not the body", async () => {
    mockZoho({
      leads: [
        status(400, {
          code: "INVALID_DATA",
          details: { api_name: "Email" },
          message: "invalid data for ada@example.com",
          status: "error",
        }),
        leadOk,
      ],
    });

    const error = await zoho.createLead(lead).catch((e: unknown) => e);
    expect(error).toBeInstanceOf(zoho.ZohoError);
    expect(error).toMatchObject({
      errorClass: "rejected",
      status: 400,
      zohoCode: "INVALID_DATA",
      detail: "Email",
    });
    expect((error as Error).message).not.toContain("ada@example.com");
    expect(callsTo("/crm/v2/Leads")).toHaveLength(1);
  });

  it("treats a 2xx with a per-record error as a failure and does not retry", async () => {
    mockZoho({
      leads: [
        status(202, { data: [{ code: "DUPLICATE_DATA", status: "error", details: {} }] }),
        leadOk,
      ],
    });

    await expect(zoho.createLead(lead)).rejects.toMatchObject({
      errorClass: "logic",
      zohoCode: "DUPLICATE_DATA",
    });
    expect(callsTo("/crm/v2/Leads")).toHaveLength(1);
  });

  it("stops after maxAttempts when Zoho stays down", async () => {
    mockZoho({ leads: [status(503), status(502), status(500), leadOk] });

    await expect(zoho.createLead(lead)).rejects.toMatchObject({
      errorClass: "server",
      attempts: 3,
    });
    expect(callsTo("/crm/v2/Leads")).toHaveLength(3);
  });

  it("stays inside the time budget when Zoho hangs", async () => {
    Object.assign(zoho.ZOHO_RETRY_POLICY, {
      attemptTimeoutMs: 40,
      budgetMs: 150,
      minAttemptMs: 20,
    });
    mockZoho({ leads: [hang, hang, hang] });

    const started = Date.now();
    await expect(zoho.createLead(lead)).rejects.toMatchObject({ errorClass: "timeout" });
    expect(Date.now() - started).toBeLessThan(1000);
  });

  it("does not call the CRM when the refresh token is refused", async () => {
    mockZoho({ token: [() => json({ error: "invalid_code" })], leads: [leadOk] });

    await expect(zoho.createLead(lead)).rejects.toMatchObject({
      errorClass: "auth",
      zohoCode: "invalid_code",
    });
    expect(callsTo("/crm/v2/Leads")).toHaveLength(0);
  });
});

describe("createTicket", () => {
  it("sends departmentId from ZOHO_DESK_DEPARTMENT_ID and the orgId header (hum-36)", async () => {
    mockZoho({ tickets: [ticketOk] });

    await zoho.createTicket(ticket);

    const [call] = callsTo("/api/v1/tickets");
    const init = call[1] as RequestInit;
    expect((init.headers as Record<string, string>).orgId).toBe("111");
    const body = JSON.parse(init.body as string);
    expect(body.departmentId).toBe("222");
    expect(body.subject).toBe("Printer offline");
    expect(body.contact).toMatchObject({ lastName: "Grace Hopper", email: "grace@example.com" });
  });

  it("with no ZOHO_DESK_DEPARTMENT_ID logs CRITICAL and never calls Zoho", async () => {
    vi.stubEnv("ZOHO_DESK_DEPARTMENT_ID", "");
    mockZoho({ tickets: [ticketOk] });

    await expect(zoho.createTicket(ticket)).rejects.toMatchObject({ errorClass: "config" });
    expect(fetchMock).not.toHaveBeenCalled();
    expect(console.error).toHaveBeenCalledWith("[CRITICAL] ZOHO_DESK_DEPARTMENT_ID missing");
  });

  it("retries a Desk 5xx and treats a 2xx without a ticket id as unconfirmed", async () => {
    mockZoho({ tickets: [status(500), status(200, {})] });

    await expect(zoho.createTicket(ticket)).rejects.toMatchObject({ errorClass: "logic" });
    expect(callsTo("/api/v1/tickets")).toHaveLength(2);
  });
});
