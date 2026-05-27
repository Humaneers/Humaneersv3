/**
 * Email Fallback Service
 * Handles email notifications when primary form submissions fail
 */

export interface EmailTemplate {
  subject: string;
  htmlBody: string;
  textBody: string;
}

export interface EmailFallbackData {
  formType: "sales" | "support" | "newsletter";
  formData: any;
  errorContext?: {
    originalError?: string;
    retryCount?: number;
    isRetryFailure?: boolean;
    submissionId?: string;
  };
  timestamp: string;
  userAgent?: string;
  referrer?: string;
}

export class EmailFallbackService {
  private static instance: EmailFallbackService;
  private readonly FALLBACK_EMAIL = "support@humaneers.dev";
  private readonly FROM_EMAIL = "noreply@humaneers.dev";

  static getInstance(): EmailFallbackService {
    if (!EmailFallbackService.instance) {
      EmailFallbackService.instance = new EmailFallbackService();
    }
    return EmailFallbackService.instance;
  }

  /**
   * Send fallback email notification
   */
  async sendFallbackNotification(data: EmailFallbackData): Promise<boolean> {
    try {
      const template = this.generateEmailTemplate(data);

      // In a real implementation, you would use your email service here
      // For now, we'll use a mock implementation that logs the email
      const success = await this.sendEmail({
        to: this.FALLBACK_EMAIL,
        from: this.FROM_EMAIL,
        subject: template.subject,
        html: template.htmlBody,
        text: template.textBody,
      });

      if (success) {
        console.log(`Fallback email sent for ${data.formType} submission`);

        // Also send confirmation to user if we have their email
        if (data.formData.email) {
          await this.sendUserConfirmation(data);
        }
      }

      return success;
    } catch (error) {
      console.error("Failed to send fallback email:", error);
      return false;
    }
  }

  /**
   * Send confirmation email to user
   */
  private async sendUserConfirmation(data: EmailFallbackData): Promise<boolean> {
    try {
      const template = this.generateUserConfirmationTemplate(data);

      const success = await this.sendEmail({
        to: data.formData.email,
        from: this.FROM_EMAIL,
        subject: template.subject,
        html: template.htmlBody,
        text: template.textBody,
      });

      if (success) {
        console.log(`User confirmation sent to ${data.formData.email}`);
      }

      return success;
    } catch (error) {
      console.error("Failed to send user confirmation:", error);
      return false;
    }
  }

  /**
   * Generate email template for internal notification
   */
  private generateEmailTemplate(data: EmailFallbackData): EmailTemplate {
    const { formType, formData, errorContext, timestamp } = data;

    const subject = `[FALLBACK] ${formType.toUpperCase()} Form Submission - ${timestamp}`;

    const contextInfo = errorContext
      ? `
      <h3>Error Context</h3>
      <ul>
        ${errorContext.originalError ? `<li><strong>Original Error:</strong> ${errorContext.originalError}</li>` : ""}
        ${errorContext.retryCount ? `<li><strong>Retry Count:</strong> ${errorContext.retryCount}</li>` : ""}
        ${errorContext.isRetryFailure ? `<li><strong>Type:</strong> Retry Failure (Max attempts reached)</li>` : ""}
        ${errorContext.submissionId ? `<li><strong>Submission ID:</strong> ${errorContext.submissionId}</li>` : ""}
      </ul>
    `
      : "";

    const htmlBody = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>${subject}</title>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .header { background: #f8f9fa; padding: 20px; border-left: 4px solid #dc3545; }
          .content { padding: 20px; }
          .form-data { background: #f8f9fa; padding: 15px; border-radius: 5px; margin: 15px 0; }
          .footer { background: #e9ecef; padding: 15px; font-size: 12px; color: #666; }
          ul { margin: 10px 0; padding-left: 20px; }
          li { margin: 5px 0; }
        </style>
      </head>
      <body>
        <div class="header">
          <h2>🚨 Fallback Form Submission</h2>
          <p>A form submission failed through the normal process and was sent via email fallback.</p>
        </div>
        
        <div class="content">
          <h3>Submission Details</h3>
          <ul>
            <li><strong>Form Type:</strong> ${formType.toUpperCase()}</li>
            <li><strong>Timestamp:</strong> ${timestamp}</li>
            <li><strong>User Agent:</strong> ${data.userAgent || "Unknown"}</li>
            <li><strong>Referrer:</strong> ${data.referrer || "Direct"}</li>
          </ul>

          ${contextInfo}

          <div class="form-data">
            <h3>Form Data</h3>
            ${this.formatFormDataAsHtml(formData)}
          </div>

          <h3>Required Actions</h3>
          <ul>
            <li>Manually process this ${formType} submission</li>
            <li>Add to appropriate system (Zoho CRM/Desk)</li>
            <li>Follow up with customer within normal SLA</li>
            <li>Investigate the underlying system issue if this is a recurring problem</li>
          </ul>
        </div>

        <div class="footer">
          <p>This is an automated fallback notification from the Humaneers website form system.</p>
          <p>Generated at: ${new Date().toISOString()}</p>
        </div>
      </body>
      </html>
    `;

    const textBody = `
FALLBACK FORM SUBMISSION

A form submission failed through the normal process and was sent via email fallback.

SUBMISSION DETAILS:
- Form Type: ${formType.toUpperCase()}
- Timestamp: ${timestamp}
- User Agent: ${data.userAgent || "Unknown"}
- Referrer: ${data.referrer || "Direct"}

${
  errorContext
    ? `
ERROR CONTEXT:
${errorContext.originalError ? `- Original Error: ${errorContext.originalError}` : ""}
${errorContext.retryCount ? `- Retry Count: ${errorContext.retryCount}` : ""}
${errorContext.isRetryFailure ? `- Type: Retry Failure (Max attempts reached)` : ""}
${errorContext.submissionId ? `- Submission ID: ${errorContext.submissionId}` : ""}
`
    : ""
}

FORM DATA:
${this.formatFormDataAsText(formData)}

REQUIRED ACTIONS:
- Manually process this ${formType} submission
- Add to appropriate system (Zoho CRM/Desk)
- Follow up with customer within normal SLA
- Investigate the underlying system issue if this is a recurring problem

---
This is an automated fallback notification from the Humaneers website form system.
Generated at: ${new Date().toISOString()}
    `;

    return { subject, htmlBody, textBody };
  }

  /**
   * Generate user confirmation email template
   */
  private generateUserConfirmationTemplate(data: EmailFallbackData): EmailTemplate {
    const { formType, formData } = data;

    const subjects = {
      sales: "Thank you for your interest - We'll be in touch soon",
      support: "Support request received - We're here to help",
      newsletter: "Welcome to Humaneers Newsletter",
    };

    const subject = subjects[formType];

    const htmlBody = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>${subject}</title>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; }
          .header { background: #1a365d; color: white; padding: 30px 20px; text-align: center; }
          .content { padding: 30px 20px; }
          .footer { background: #f8f9fa; padding: 20px; text-align: center; font-size: 14px; color: #666; }
          .cta { background: #1a365d; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; display: inline-block; margin: 20px 0; }
          .contact-info { background: #f8f9fa; padding: 20px; border-radius: 5px; margin: 20px 0; }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>Humaneers</h1>
          <p>Enterprise strategy for businesses and families</p>
        </div>
        
        <div class="content">
          ${this.getUserConfirmationContent(formType, formData)}
          
          <div class="contact-info">
            <h3>Contact Information</h3>
            <p><strong>Email:</strong> support@humaneers.dev</p>
            <p><strong>Emergency Support:</strong> +1-555-0123</p>
            <p><strong>Business Hours:</strong> Monday-Friday, 9 AM - 6 PM EST</p>
          </div>
        </div>

        <div class="footer">
          <p>This confirmation was sent because our primary system experienced a temporary issue.</p>
          <p>Your submission has been received and will be processed normally.</p>
          <p>&copy; 2026 Humaneers. All rights reserved.</p>
        </div>
      </body>
      </html>
    `;

    const textBody = this.getUserConfirmationTextContent(formType, formData);

    return { subject, htmlBody, textBody };
  }

  /**
   * Get user confirmation content based on form type
   */
  private getUserConfirmationContent(formType: string, formData: any): string {
    switch (formType) {
      case "sales":
        return `
          <h2>Thank you for your interest!</h2>
          <p>Hello ${formData.firstName || "there"},</p>
          <p>We've received your inquiry and our team will be in touch within 24 hours to discuss how we can help with your ${formData.interests?.join(", ") || "business needs"}.</p>
          <p>In the meantime, feel free to explore our case studies and resources on our website.</p>
        `;
      case "support":
        return `
          <h2>Support Request Received</h2>
          <p>Hello ${formData.contactName || "there"},</p>
          <p>We've received your support request regarding "${formData.subject}" and our team will respond within 4 hours during business hours.</p>
          <p>For urgent issues, please don't hesitate to call our emergency support line.</p>
        `;
      case "newsletter":
        return `
          <h2>Welcome to Humaneers Newsletter!</h2>
          <p>Thank you for subscribing to our newsletter. You'll receive monthly insights on enterprise strategy, cybersecurity, and business growth.</p>
          <p>You can update your preferences or unsubscribe at any time.</p>
        `;
      default:
        return `
          <h2>Thank you!</h2>
          <p>We've received your submission and will be in touch soon.</p>
        `;
    }
  }

  /**
   * Get user confirmation text content
   */
  private getUserConfirmationTextContent(formType: string, formData: any): string {
    const baseText = `
HUMANEERS
Enterprise strategy for businesses and families

${this.getUserConfirmationContent(formType, formData)
  .replace(/<[^>]*>/g, "")
  .replace(/\s+/g, " ")
  .trim()}

CONTACT INFORMATION:
Email: support@humaneers.dev
Emergency Support: +1-555-0123
Business Hours: Monday-Friday, 9 AM - 6 PM EST

This confirmation was sent because our primary system experienced a temporary issue.
Your submission has been received and will be processed normally.

© 2026 Humaneers. All rights reserved.
    `;
    return baseText;
  }

  /**
   * Format form data as HTML
   */
  private formatFormDataAsHtml(formData: any): string {
    const fields = Object.entries(formData)
      .filter(([key, value]) => value && key !== "honeypot")
      .map(([key, value]) => {
        const label = key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, " $1");
        const displayValue = Array.isArray(value) ? value.join(", ") : String(value);
        return `<li><strong>${label}:</strong> ${displayValue}</li>`;
      })
      .join("");

    return `<ul>${fields}</ul>`;
  }

  /**
   * Format form data as plain text
   */
  private formatFormDataAsText(formData: any): string {
    return Object.entries(formData)
      .filter(([key, value]) => value && key !== "honeypot")
      .map(([key, value]) => {
        const label = key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, " $1");
        const displayValue = Array.isArray(value) ? value.join(", ") : String(value);
        return `- ${label}: ${displayValue}`;
      })
      .join("\n");
  }

  /**
   * Mock email sending implementation
   * In production, this would integrate with your email service (SendGrid, AWS SES, etc.)
   */
  private async sendEmail(emailData: {
    to: string;
    from: string;
    subject: string;
    html: string;
    text: string;
  }): Promise<boolean> {
    try {
      // Mock implementation - in production, integrate with your email service
      console.log("📧 Email would be sent:", {
        to: emailData.to,
        from: emailData.from,
        subject: emailData.subject,
        bodyLength: emailData.html.length,
      });

      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 100));

      // In production, you would do something like:
      // const response = await emailService.send(emailData);
      // return response.success;

      return true; // Mock success
    } catch (error) {
      console.error("Email sending failed:", error);
      return false;
    }
  }
}
