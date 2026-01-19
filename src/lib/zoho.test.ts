import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { submitSalesLead, submitSupportTicket } from "./zoho";
import { setSessionContext } from "./session";

describe("Zoho API Client", () => {
  const fetchMock = vi.fn();

  beforeEach(() => {
    fetchMock.mockClear(); // Clear history of the mock function
    global.fetch = fetchMock;
    sessionStorage.clear();
    setSessionContext({ segment: "business", pageHistory: ["/home"] });
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("submitSalesLead sends correct payload with context", async () => {
    fetchMock.mockResolvedValueOnce({
      ok: true,
      headers: { get: () => "application/json" },
      json: async () => ({ success: true }),
    });

    const formData = {
      firstName: "John",
      lastName: "Doe",
      email: "john@example.com",
      company: "Acme",
      role: "CEO",
      employees: "10",
      interests: ["Managed IT"],
      source: "Test",
      message: "Hello",
    };

    await submitSalesLead(formData);

    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(fetchMock).toHaveBeenCalledWith(
      "/api/zoho/leads",
      expect.objectContaining({
        method: "POST",
        body: expect.stringContaining("John"),
      })
    );

    const callArgs = fetchMock.mock.calls[0];
    const payload = JSON.parse(callArgs[1].body);

    expect(payload.firstName).toBe("John");
    expect(payload.context).toContain("Segment: business");
  });

  it("submitSupportTicket sends correct payload", async () => {
    fetchMock.mockResolvedValueOnce({
      ok: true,
      headers: { get: () => "application/json" },
      json: async () => ({ success: true }),
    });

    const formData = {
      name: "Jane",
      email: "jane@example.com",
      priority: "High",
      category: "Bug",
      subject: "Help",
      description: "Issue",
    };

    await submitSupportTicket(formData);

    expect(fetchMock).toHaveBeenCalledTimes(1);
    const callArgs = fetchMock.mock.calls[0];
    const payload = JSON.parse(callArgs[1].body);

    expect(payload.name).toBe("Jane");
    expect(payload.context).toBeDefined();
  });
});
