import { z } from "zod";

// --- Shared Validation Schemas ---

// Anti-Spam (Honeypot) - Should be empty.
const HoneyPotSchema = z.object({
  honeypot: z.string().max(0, "Nice try, bot.").optional(), // Must be empty string or undefined
});

// Common Attribution Fields
const AttributionSchema = z.object({
  referrer: z.string().optional(),
  utm_source: z.string().optional(),
  utm_medium: z.string().optional(),
  utm_campaign: z.string().optional(),
  gclid: z.string().optional(),
  current_path: z.string().optional(), // Where the user was when they clicked contact
});

// 1. Sales Contact Schema
export const SalesContactSchema = z
  .object({
    name: z.string().min(2, "Name is required"),
    company: z.string().min(2, "Company name is required"),
    email: z.string().email("Invalid email address"),
    phone: z.string().optional(), // Flexible phone validation
    message: z.string().min(10, "Please provide a bit more detail about your needs."),
    interest: z
      .enum([
        "managed_it",
        "co_managed_it",
        "cybersecurity",
        "compliance",
        "fractional_leadership",
        "other",
      ])
      .optional(),
  })
  .merge(HoneyPotSchema)
  .merge(AttributionSchema);

export type SalesContact = z.infer<typeof SalesContactSchema>;

// 2. Support Ticket Schema
export const SupportTicketSchema = z
  .object({
    name: z.string().min(2, "Name is required"),
    email: z.string().email("Invalid email address"),
    phone: z.string().optional(),
    severity: z.enum(["low", "medium", "high", "critical"]),
    subject: z.string().min(5, "Subject is required"),
    description: z.string().min(20, "Please provide more details so we can help you faster."),
    isClient: z.boolean().default(false), // "Are you an existing client?"
  })
  .merge(HoneyPotSchema)
  .merge(AttributionSchema);

export type SupportTicket = z.infer<typeof SupportTicketSchema>;

// 3. Newsletter Schema
export const NewsletterSchema = z
  .object({
    email: z.string().email("Invalid email address"),
    consent: z.literal(true).refine((val) => val === true, {
      message: "You must agree to receive communications.",
    }), // Explicit opt-in
  })
  .merge(HoneyPotSchema)
  .merge(AttributionSchema);

export type NewsletterSubscription = z.infer<typeof NewsletterSchema>;

// 4. Zoho Token Response
export interface ZohoTokenResponse {
  access_token: string;
  expires_in: number;
  api_domain: string;
  token_type: string;
  error?: string;
}
