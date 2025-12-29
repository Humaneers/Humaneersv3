import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type ChangeEvent,
  type FocusEvent,
  type FormEvent,
} from "react";
import { Button } from "./ui/button";
import {
  sanitizeContact,
  validateContact,
  validateField,
  type ContactFormErrors,
  type ContactFormValues,
} from "../lib/validate";
import { submitContact } from "../lib/api";

const initialValues: ContactFormValues = {
  name: "",
  email: "",
  company: "",
  message: "",
  phone: "",
  website: "",
  hp: "",
};

type FormStatus = "idle" | "submitting" | "success" | "error";

export function ContactForm() {
  const [values, setValues] = useState<ContactFormValues>(initialValues);
  const [errors, setErrors] = useState<ContactFormErrors>({});
  const [status, setStatus] = useState<FormStatus>("idle");
  const [formError, setFormError] = useState<string | null>(null);
  const [turnstileToken, setTurnstileToken] = useState<string>("");
  const turnstileRef = useRef<HTMLDivElement | null>(null);
  const turnstileWidgetId = useRef<string | null>(null);

  const turnstileSiteKey = import.meta.env.VITE_TURNSTILE_SITE_KEY as
    | string
    | undefined;

  const isSubmitting = status === "submitting";
  const isSuccess = status === "success";

  useEffect(() => {
    // TODO: wire analytics event "form_viewed" when analytics utility is available.
    if ((window as any).analytics?.track) {
      (window as any).analytics.track("form_viewed", { form: "contact" });
    }
  }, []);

  useEffect(() => {
    if (!turnstileSiteKey || !turnstileRef.current) {
      return;
    }

    let isMounted = true;

    const ensureTurnstile = () =>
      new Promise<void>((resolve) => {
        if ((window as any).turnstile) {
          resolve();
          return;
        }

        const existingScript = document.querySelector<HTMLScriptElement>(
          "script[data-turnstile-script]"
        );
        if (existingScript) {
          existingScript.addEventListener("load", () => resolve(), {
            once: true,
          });
          return;
        }

        const script = document.createElement("script");
        script.src = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
        script.async = true;
        script.defer = true;
        script.dataset.turnstileScript = "true";
        script.onload = () => resolve();
        document.body.appendChild(script);
      });

    ensureTurnstile().then(() => {
      if (!isMounted || !turnstileRef.current || !(window as any).turnstile) {
        return;
      }

      turnstileWidgetId.current = (window as any).turnstile.render(
        turnstileRef.current,
        {
          sitekey: turnstileSiteKey,
          callback: (token: string) => setTurnstileToken(token),
          "error-callback": () => setTurnstileToken(""),
          "expired-callback": () => setTurnstileToken(""),
        }
      );
    });

    return () => {
      isMounted = false;
    };
  }, [turnstileSiteKey]);

  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleBlur = (event: FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name } = event.target;
    const fieldName = name as keyof ContactFormValues;
    const error = validateField(fieldName, values);
    setErrors((prev) => ({ ...prev, [fieldName]: error }));
  };

  const canSubmit = useMemo(() => {
    if (isSubmitting) return false;
    const nextErrors = validateContact(values);
    return Object.values(nextErrors).every((error) => !error);
  }, [isSubmitting, values]);

  const resetForm = () => {
    setValues(initialValues);
    setErrors({});
    setTurnstileToken("");
    if (turnstileWidgetId.current && (window as any).turnstile?.reset) {
      (window as any).turnstile.reset(turnstileWidgetId.current);
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setFormError(null);
    setStatus("submitting");

    // TODO: wire analytics event "form_submit_clicked" when analytics utility is available.
    if ((window as any).analytics?.track) {
      (window as any).analytics.track("form_submit_clicked", { form: "contact" });
    }

    const validationErrors = validateContact(values);
    if (Object.values(validationErrors).some(Boolean)) {
      setErrors(validationErrors);
      setStatus("idle");
      return;
    }

    const payload = {
      ...sanitizeContact(values),
      turnstileToken: turnstileToken || undefined,
    };

    const result = await submitContact(payload);

    if (result.ok) {
      setStatus("success");
      resetForm();
      // TODO: wire analytics event "form_submit_succeeded" when analytics utility is available.
      if ((window as any).analytics?.track) {
        (window as any).analytics.track("form_submit_succeeded", {
          form: "contact",
          submissionId: result.submissionId,
        });
      }
      return;
    }

    setStatus("error");
    setFormError(result.error.message);
    // TODO: wire analytics event "form_submit_failed" when analytics utility is available.
    if ((window as any).analytics?.track) {
      (window as any).analytics.track("form_submit_failed", {
        form: "contact",
        code: result.error.code,
      });
    }
  };

  return (
    <form className="space-y-6" onSubmit={handleSubmit} noValidate>
      <div>
        <h2 className="text-2xl font-bold text-[#1B263B]">Tell us about your project</h2>
        <p className="text-[#4E596F] mt-2">
          Send us a note and we will follow up within one business day.
        </p>
      </div>

      {isSuccess && (
        <div className="rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-emerald-800">
          Thanks for reaching out. Your message is on its way, and we will be in touch soon.
        </div>
      )}

      {status === "error" && formError && (
        <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-red-700">
          {formError}
        </div>
      )}

      <div className="grid gap-5 md:grid-cols-2">
        <div className="space-y-2">
          <label className="text-sm font-semibold text-[#1B263B]" htmlFor="contact-name">
            Name
          </label>
          <input
            id="contact-name"
            name="name"
            type="text"
            autoComplete="name"
            value={values.name}
            onChange={handleChange}
            onBlur={handleBlur}
            className="w-full rounded-md border border-gray-200 px-4 py-3 text-[#1B263B] placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#B87333]/40"
            placeholder="Jane Doe"
            required
            maxLength={100}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? "contact-name-error" : undefined}
          />
          {errors.name && (
            <p id="contact-name-error" className="text-sm text-red-600">
              {errors.name}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <label className="text-sm font-semibold text-[#1B263B]" htmlFor="contact-email">
            Email
          </label>
          <input
            id="contact-email"
            name="email"
            type="email"
            autoComplete="email"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            className="w-full rounded-md border border-gray-200 px-4 py-3 text-[#1B263B] placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#B87333]/40"
            placeholder="you@company.com"
            required
            maxLength={254}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? "contact-email-error" : undefined}
          />
          {errors.email && (
            <p id="contact-email-error" className="text-sm text-red-600">
              {errors.email}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <label className="text-sm font-semibold text-[#1B263B]" htmlFor="contact-company">
            Company
          </label>
          <input
            id="contact-company"
            name="company"
            type="text"
            autoComplete="organization"
            value={values.company}
            onChange={handleChange}
            onBlur={handleBlur}
            className="w-full rounded-md border border-gray-200 px-4 py-3 text-[#1B263B] placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#B87333]/40"
            placeholder="Humaneers"
            maxLength={150}
            aria-invalid={Boolean(errors.company)}
            aria-describedby={errors.company ? "contact-company-error" : undefined}
          />
          {errors.company && (
            <p id="contact-company-error" className="text-sm text-red-600">
              {errors.company}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <label className="text-sm font-semibold text-[#1B263B]" htmlFor="contact-phone">
            Phone
          </label>
          <input
            id="contact-phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            value={values.phone}
            onChange={handleChange}
            onBlur={handleBlur}
            className="w-full rounded-md border border-gray-200 px-4 py-3 text-[#1B263B] placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#B87333]/40"
            placeholder="(555) 123-4567"
            maxLength={50}
            aria-invalid={Boolean(errors.phone)}
            aria-describedby={errors.phone ? "contact-phone-error" : undefined}
          />
          {errors.phone && (
            <p id="contact-phone-error" className="text-sm text-red-600">
              {errors.phone}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <label className="text-sm font-semibold text-[#1B263B]" htmlFor="contact-website">
            Website
          </label>
          <input
            id="contact-website"
            name="website"
            type="url"
            autoComplete="url"
            value={values.website}
            onChange={handleChange}
            onBlur={handleBlur}
            className="w-full rounded-md border border-gray-200 px-4 py-3 text-[#1B263B] placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#B87333]/40"
            placeholder="https://humaneers.dev"
            maxLength={200}
            aria-invalid={Boolean(errors.website)}
            aria-describedby={errors.website ? "contact-website-error" : undefined}
          />
          {errors.website && (
            <p id="contact-website-error" className="text-sm text-red-600">
              {errors.website}
            </p>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-semibold text-[#1B263B]" htmlFor="contact-message">
          Message
        </label>
        <textarea
          id="contact-message"
          name="message"
          value={values.message}
          onChange={handleChange}
          onBlur={handleBlur}
          className="min-h-[160px] w-full rounded-md border border-gray-200 px-4 py-3 text-[#1B263B] placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#B87333]/40"
          placeholder="Tell us about your goals, timeline, and any challenges."
          required
          maxLength={2000}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? "contact-message-error" : undefined}
        />
        {errors.message && (
          <p id="contact-message-error" className="text-sm text-red-600">
            {errors.message}
          </p>
        )}
      </div>

      <div className="hidden" aria-hidden="true">
        <label htmlFor="contact-hp">Leave this field empty</label>
        <input
          id="contact-hp"
          name="hp"
          type="text"
          value={values.hp}
          onChange={handleChange}
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      {turnstileSiteKey && (
        <div className="rounded-lg border border-gray-200 bg-gray-50 px-4 py-4">
          <div ref={turnstileRef} />
          <p className="text-xs text-gray-500 mt-2">
            This site is protected by Cloudflare Turnstile.
          </p>
        </div>
      )}

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-[#4E596F]">
          By submitting, you agree to our team contacting you about your request.
        </p>
        <Button
          type="submit"
          disabled={!canSubmit}
          className="bg-[#B87333] hover:bg-[#a0632a] text-white px-8 py-3 h-auto rounded-full text-base font-semibold shadow-md hover:shadow-lg"
        >
          {isSubmitting ? "Submitting…" : "Send Message"}
        </Button>
      </div>
    </form>
  );
}
