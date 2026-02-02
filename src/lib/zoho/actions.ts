import { createLead, createTicket } from "./index";
import {
  SalesContactSchema,
  SalesContact,
  SupportTicket,
  SalesFormData,
  SupportFormData,
} from "./types";
import { z } from "zod";

// --- Validation Helpers ---

export function validateSupportForm(data: unknown): { valid: boolean; errors: string[] } {
  // We validate against a looser schema for the UI
  // primarily to check required fields
  const uiSchema = z.object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Invalid email address"),
    subject: z.string().min(5, "Subject is required"),
    description: z.string().min(20, "Description must be at least 20 characters"),
    priority: z
      .string()
      .refine((val) => ["High", "Medium", "Low"].includes(val), "Please select a priority"),
    category: z.string().min(1, "Please select a category"),
    phone: z.string().optional(),
    company: z.string().optional(),
    context: z.enum(["existing_client", "new_client_critical"]).optional(),
    honeypot: z.string().optional(),
  });

  const result = uiSchema.safeParse(data);
  if (result.success) {
    return { valid: true, errors: [] };
  }
  return { valid: false, errors: result.error.flatten().formErrors };
}

export function validateSalesForm(data: unknown): { valid: boolean; errors: string[] } {
  const formSchema = SalesContactSchema.omit({ description: true }).extend({
    message: z.string().optional(),
    website: z.string().optional(),
    role: z.string().optional(),
    employees: z.string().optional(),
    budget: z.string().optional(),
    interests: z.array(z.string()).optional().default([]),
  });

  const result = formSchema.safeParse(data);
  if (result.success) {
    return { valid: true, errors: [] };
  }
  return { valid: false, errors: result.error.flatten().formErrors };
}

// --- Submission Actions ---

export async function submitSupportTicket(data: SupportFormData) {
  try {
    // Adapter: Map UI fields to Zoho Schema
    const ticketData: SupportTicket = {
      ...data,
      contactName: data.name,
      priority: data.priority as "High" | "Medium" | "Low", // Validated above
    };

    const result = await createTicket(ticketData);
    return { success: true, data: result };
  } catch (error) {
    console.error("Failed to submit support ticket:", error);
    return { success: false, error: error instanceof Error ? error.message : "Unknown error" };
  }
}

export async function submitSalesLead(data: SalesFormData) {
  try {
    // Adapter: Construct description
    const finalData: SalesContact = {
      ...data,
      description:
        data.description ||
        (data.message
          ? `${data.message}\n\nInterests: ${(data.interests || []).join(", ")}`
          : "No description"),
      // Ensure extended fields are passed through
    } as SalesContact;

    const result = await createLead(finalData);
    return { success: true, data: result };
  } catch (error) {
    console.error("Failed to submit sales lead:", error);
    return { success: false, error: error instanceof Error ? error.message : "Unknown error" };
  }
}
