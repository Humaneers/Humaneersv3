type Env = {
  MOXIE_ENDPOINT?: string;
  MOXIE_API_KEY?: string;
  MOXIE_TOKEN?: string;
  TURNSTILE_SECRET_KEY?: string;
};

type ContactPayload = {
  name: string;
  email: string;
  company?: string;
  message: string;
  phone?: string;
  website?: string;
  hp?: string;
  turnstileToken?: string;
};

type ErrorResponse = {
  ok: false;
  error: { code: string; message: string };
};

type SuccessResponse = { ok: true; submissionId?: string };

type ContactResponse = ErrorResponse | SuccessResponse;

const LIMITS = {
  name: 100,
  email: 254,
  company: 150,
  message: 2000,
  phone: 50,
  website: 200,
};

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const rateLimitStore = new Map<string, number[]>();
const RATE_LIMIT = 10;
const RATE_WINDOW_MS = 10 * 60 * 1000;

const jsonResponse = (body: ContactResponse, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" },
  });

const normalize = (value?: string) => (value ?? "").trim();

const getClientIp = (request: Request) => {
  const cfIp = request.headers.get("CF-Connecting-IP");
  if (cfIp) return cfIp;
  const forwarded = request.headers.get("X-Forwarded-For");
  if (forwarded) return forwarded.split(",")[0]?.trim() ?? "unknown";
  return "unknown";
};

const isRateLimited = (ip: string) => {
  const now = Date.now();
  const entries = rateLimitStore.get(ip) ?? [];
  const recent = entries.filter((timestamp) => now - timestamp < RATE_WINDOW_MS);
  if (recent.length >= RATE_LIMIT) {
    rateLimitStore.set(ip, recent);
    return true;
  }
  recent.push(now);
  rateLimitStore.set(ip, recent);
  return false;
};

const validatePayload = (payload: ContactPayload) => {
  const errors: string[] = [];
  const name = normalize(payload.name);
  const email = normalize(payload.email);
  const message = normalize(payload.message);

  if (!name) errors.push("Name is required.");
  if (!email) errors.push("Email is required.");
  if (!message) errors.push("Message is required.");

  if (name.length > LIMITS.name) errors.push("Name is too long.");
  if (email.length > LIMITS.email) errors.push("Email is too long.");
  if (message.length > LIMITS.message) errors.push("Message is too long.");
  if (payload.company && normalize(payload.company).length > LIMITS.company)
    errors.push("Company is too long.");
  if (payload.phone && normalize(payload.phone).length > LIMITS.phone)
    errors.push("Phone is too long.");
  if (payload.website && normalize(payload.website).length > LIMITS.website)
    errors.push("Website is too long.");
  if (email && !emailRegex.test(email)) errors.push("Email is invalid.");

  return errors;
};

const verifyTurnstile = async (token: string, secret: string, ip: string) => {
  const formData = new FormData();
  formData.append("secret", secret);
  formData.append("response", token);
  if (ip !== "unknown") {
    formData.append("remoteip", ip);
  }

  const response = await fetch(
    "https://challenges.cloudflare.com/turnstile/v0/siteverify",
    {
      method: "POST",
      body: formData,
    }
  );

  if (!response.ok) {
    return false;
  }

  const data = (await response.json()) as { success?: boolean };
  return Boolean(data.success);
};

const mapToMoxiePayload = (payload: ContactPayload) => ({
  name: payload.name,
  email: payload.email,
  company: payload.company,
  message: payload.message,
  phone: payload.phone,
  website: payload.website,
  // TODO: adjust the payload mapping to match the Moxie API contract.
});

const forwardToMoxie = async (payload: ContactPayload, env: Env) => {
  if (!env.MOXIE_ENDPOINT) {
    throw new Error("Missing MOXIE_ENDPOINT");
  }

  const token = env.MOXIE_API_KEY || env.MOXIE_TOKEN;
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(env.MOXIE_ENDPOINT, {
    method: "POST",
    headers,
    body: JSON.stringify(mapToMoxiePayload(payload)),
  });

  return response;
};

export const onRequest: PagesFunction<Env> = async ({ request, env }) => {
  if (request.method !== "POST") {
    return jsonResponse(
      {
        ok: false,
        error: { code: "validation", message: "Method not allowed." },
      },
      405
    );
  }

  const contentType = request.headers.get("Content-Type") || "";
  if (!contentType.includes("application/json")) {
    return jsonResponse(
      {
        ok: false,
        error: { code: "validation", message: "Expected JSON payload." },
      },
      415
    );
  }

  let payload: ContactPayload;
  try {
    payload = (await request.json()) as ContactPayload;
  } catch {
    return jsonResponse(
      {
        ok: false,
        error: { code: "validation", message: "Invalid JSON payload." },
      },
      400
    );
  }

  if (payload.hp && normalize(payload.hp).length > 0) {
    return jsonResponse({ ok: true });
  }

  const validationErrors = validatePayload(payload);
  if (validationErrors.length > 0) {
    return jsonResponse(
      {
        ok: false,
        error: { code: "validation", message: validationErrors[0] },
      },
      400
    );
  }

  const ip = getClientIp(request);
  if (isRateLimited(ip)) {
    return jsonResponse(
      {
        ok: false,
        error: { code: "rate_limited", message: "Please try again later." },
      },
      429
    );
  }

  if (env.TURNSTILE_SECRET_KEY) {
    if (!payload.turnstileToken) {
      return jsonResponse(
        {
          ok: false,
          error: { code: "spam", message: "Unable to verify submission." },
        },
        403
      );
    }

    const isValid = await verifyTurnstile(
      payload.turnstileToken,
      env.TURNSTILE_SECRET_KEY,
      ip
    );

    if (!isValid) {
      return jsonResponse(
        {
          ok: false,
          error: { code: "spam", message: "Unable to verify submission." },
        },
        403
      );
    }
  }

  try {
    const response = await forwardToMoxie(payload, env);

    if (!response.ok) {
      return jsonResponse(
        {
          ok: false,
          error: {
            code: "upstream",
            message: "Something went wrong. Please try again.",
          },
        },
        502
      );
    }

    const data = (await response.json().catch(() => null)) as
      | { id?: string; submissionId?: string }
      | null;

    return jsonResponse({
      ok: true,
      submissionId: data?.submissionId ?? data?.id,
    });
  } catch {
    return jsonResponse(
      {
        ok: false,
        error: {
          code: "upstream",
          message: "Something went wrong. Please try again.",
        },
      },
      502
    );
  }
};
