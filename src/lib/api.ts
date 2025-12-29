export type ContactPayload = {
  name: string;
  email: string;
  company?: string;
  message: string;
  phone?: string;
  website?: string;
  hp?: string;
  turnstileToken?: string;
};

export type ContactResponse =
  | { ok: true; submissionId?: string }
  | { ok: false; error: { code: string; message: string } };

export async function submitContact(
  payload: ContactPayload
): Promise<ContactResponse> {
  try {
    const response = await fetch("/api/forms/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const data = (await response.json().catch(() => null)) as ContactResponse | null;

    if (data && typeof data.ok === "boolean") {
      return data;
    }

    if (!response.ok) {
      return {
        ok: false,
        error: {
          code: "unknown",
          message: "Something went wrong. Please try again.",
        },
      };
    }

    return { ok: true };
  } catch (error) {
    return {
      ok: false,
      error: {
        code: "unknown",
        message: "Unable to reach the server. Please try again.",
      },
    };
  }
}
