import { z } from "zod";

// --- Schemas (Contract-Driven Development) ---

export const SalesContactSchema = z.object({
  firstName: z.string().min(1, "First name is required").trim(),
  lastName: z.string().min(1, "Last name is required").trim(),
  email: z.string().email("Invalid email address").trim().toLowerCase(),
  company: z.string().optional().default("Household / Indep."),
  phone: z.string().optional(),
  description: z.string().min(10, "Please provide a bit more detail (10+ chars)"),
  source: z.string().optional(),
  referrer: z.string().optional(),
  utm: z.record(z.string(), z.string()).optional(),
  honeypot: z.string().optional(), // Anti-spam
  // Explicitly supported extended fields
  website: z.string().optional(),
  role: z.string().optional(),
  employees: z.string().optional(),
  budget: z.string().optional(),
  interests: z.array(z.string()).optional().default([]),
  message: z.string().optional(),
});

export const SupportTicketSchema = z.object({
  contactName: z.string().min(1, "Name is required").trim(),
  email: z.string().email("Invalid email address").trim().toLowerCase(),
  phone: z.string().optional(),
  subject: z.string().min(5, "Subject is required (5+ chars)"),
  description: z.string().min(20, "Please provide more details about the issue"),
  priority: z.enum(["High", "Medium", "Low"]).default("Medium"),
  context: z.enum(["existing_client", "new_client_critical"]).optional(),
  honeypot: z.string().optional(),
  // Explicitly supported extended fields
  company: z.string().optional(),
  url: z.string().optional(),
  browser: z.string().optional(),
  os: z.string().optional(),
});

export const NewsletterSubscriberSchema = z.object({
  email: z.string().email("Invalid email address").trim().toLowerCase(),
  source: z.string().optional(),
  consent: z.boolean().refine((val) => val === true, "Must consent"),
  honeypot: z.string().optional(),
});

export type SalesContact = z.infer<typeof SalesContactSchema>;
export type SupportTicket = z.infer<typeof SupportTicketSchema>;
export type NewsletterSubscriber = z.infer<typeof NewsletterSubscriberSchema>;

// --- Form Data Types for UI Components ---

// UI-specific types that extend the base schemas with UI-only fields
export interface SupportFormData extends Omit<SupportTicket, "contactName" | "priority"> {
  name: string; // Mapped to contactName
  category: string; // UI only
  priority: string; // Allow empty string for initial state
  source?: string; // Analytics source
  company?: string; // UI field
}

export interface SalesFormData extends Omit<SalesContact, "description" | "interests"> {
  // Description is optional in UI, constructed from message + interests
  description?: string;
  message?: string;
  website?: string;
  role?: string;
  employees?: string;
  budget?: string;
  interests?: string[];
}
