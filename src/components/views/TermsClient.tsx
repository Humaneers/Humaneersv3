"use client";

import { useMemo } from "react";

export function TermsClient() {
  const currentDate = useMemo(() => new Date().toLocaleDateString(), []);

  return (
    <div className="bg-white py-24 min-h-screen">
      <div className="container mx-auto px-6 max-w-4xl">
        <h1 className="text-4xl font-bold text-brand-oxford mb-8">Terms of Service</h1>
        <div className="prose prose-lg text-brand-slate">
          <p className="mb-4">Last updated: {currentDate}</p>

          <h2 className="text-2xl font-bold text-brand-oxford mt-8 mb-4">1. Agreement to Terms</h2>
          <p>
            These Terms of Service ("Terms") constitute a legally binding agreement between you
            (whether personally or on behalf of an entity) and Humaneers Limited Company
            ("Humaneers," "we," "us," or "our") concerning your access to and use of our website and
            services. By accessing our website or engaging our services, you agree to be bound by
            these Terms and our Privacy Policy. If you do not agree with these Terms, you must not
            access the website or use our services.
          </p>

          <h2 className="text-2xl font-bold text-brand-oxford mt-8 mb-4">2. Services Overview</h2>
          <p>
            Humaneers provides the following professional services to businesses and individuals:
          </p>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>
              <strong>Managed IT Services</strong>: Cloud infrastructure management, system
              monitoring, cybersecurity, and technical support.
            </li>
            <li>
              <strong>Crisis Management & Incident Response</strong>: Emergency IT support, security
              incident handling, and 24/7 critical issue resolution.
            </li>
            <li>
              <strong>Brand Growth & Marketing</strong>: Brand strategy, marketing leadership, and
              growth consulting.
            </li>
            <li>
              <strong>Family Protection Services</strong>: Cybersecurity and technical support for
              households and families.
            </li>
            <li>
              <strong>Fractional Leadership</strong>: Part-time CIO (Chief Information Officer) and
              CMO (Chief Marketing Officer) services.
            </li>
          </ul>
          <p>
            Services are provided under individual service agreements that incorporate these Terms
            by reference.
          </p>

          <h2 className="text-2xl font-bold text-brand-oxford mt-8 mb-4">
            3. Service Level Agreements (SLAs)
          </h2>
          <p>
            For clients with active Managed IT service contracts, we commit to the following service
            levels:
          </p>

          <h3 className="text-xl font-semibold text-brand-oxford mt-6 mb-3">
            3.1 Uptime Guarantee
          </h3>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>
              <strong>Cloud Infrastructure</strong>: 99.9% uptime for managed cloud services
              (excludes scheduled maintenance).
            </li>
            <li>
              <strong>Monitoring Systems</strong>: 24/7/365 monitoring with automated alerting.
            </li>
            <li>
              <strong>Scheduled Maintenance</strong>: Performed during agreed maintenance windows
              with 48-hour advance notice.
            </li>
          </ul>

          <h3 className="text-xl font-semibold text-brand-oxford mt-6 mb-3">
            3.2 Support Response Times
          </h3>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>
              <strong>Critical (P1)</strong>: System down or data breach - 15-minute initial
              response, 4-hour resolution target. Emergency phone support available 24/7.
            </li>
            <li>
              <strong>High (P2)</strong>: Major functionality impaired - 1-hour initial response,
              8-hour resolution target.
            </li>
            <li>
              <strong>Medium (P3)</strong>: Minor issue with workaround available - 4-hour initial
              response, 24-hour resolution target.
            </li>
            <li>
              <strong>Low (P4)</strong>: General questions or feature requests - 24-hour initial
              response, best-effort resolution.
            </li>
          </ul>

          <h3 className="text-xl font-semibold text-brand-oxford mt-6 mb-3">3.3 SLA Credits</h3>
          <p>If we fail to meet committed SLAs, you may be eligible for service credits:</p>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>Uptime below 99.9%: 10% monthly service credit per 0.1% below target (max 30%).</li>
            <li>Response time violations: Credits calculated based on severity and impact.</li>
            <li>
              Credits must be requested within 30 days of the incident and are your sole remedy for
              SLA breaches.
            </li>
          </ul>

          <h2 className="text-2xl font-bold text-brand-oxford mt-8 mb-4">
            4. Security & Compliance
          </h2>

          <h3 className="text-xl font-semibold text-brand-oxford mt-6 mb-3">
            4.1 SOC 2 Type II Compliance
          </h3>
          <p>Humaneers maintains SOC 2 Type II certification, demonstrating our commitment to:</p>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>
              <strong>Security</strong>: Protection of systems and data from unauthorized access.
            </li>
            <li>
              <strong>Availability</strong>: Systems are available for operation and use as
              committed.
            </li>
            <li>
              <strong>Confidentiality</strong>: Confidential information is protected as committed.
            </li>
            <li>
              <strong>Privacy</strong>: Personal information is collected, used, retained, and
              disclosed in conformity with our Privacy Policy.
            </li>
          </ul>
          <p>SOC 2 reports are available to clients under NDA upon request.</p>

          <h3 className="text-xl font-semibold text-brand-oxford mt-6 mb-3">
            4.2 Data Security Commitments
          </h3>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>Encryption of data in transit (TLS 1.2+) and at rest (AES-256).</li>
            <li>Multi-factor authentication (MFA) for all administrative access.</li>
            <li>Regular security assessments, penetration testing, and vulnerability scanning.</li>
            <li>
              Incident response procedures with notification within 72 hours of confirmed breach.
            </li>
            <li>Annual third-party security audits and compliance reviews.</li>
          </ul>

          <h3 className="text-xl font-semibold text-brand-oxford mt-6 mb-3">
            4.3 Industry Compliance
          </h3>
          <p>
            For clients in regulated industries, we provide compliance-ready services including:
          </p>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>
              <strong>HIPAA</strong>: Business Associate Agreements (BAA) available for healthcare
              clients.
            </li>
            <li>
              <strong>GDPR</strong>: Data Processing Agreements (DPA) for EU data handling.
            </li>
            <li>
              <strong>PCI DSS</strong>: Support for payment card data security requirements.
            </li>
            <li>
              <strong>SOX</strong>: IT controls for financial reporting compliance.
            </li>
          </ul>

          <h2 className="text-2xl font-bold text-brand-oxford mt-8 mb-4">
            5. Client Responsibilities
          </h2>
          <p>Clients engaging our services agree to:</p>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>Provide accurate and complete information necessary for service delivery.</li>
            <li>Maintain confidentiality of access credentials and account information.</li>
            <li>Notify us promptly of any security incidents or unauthorized access.</li>
            <li>Comply with acceptable use policies for hosted infrastructure.</li>
            <li>Provide timely approval for changes requiring client authorization.</li>
            <li>
              Maintain backups of critical data (we provide backup services but client ownership of
              data remains).
            </li>
          </ul>

          <h2 className="text-2xl font-bold text-brand-oxford mt-8 mb-4">6. Payment Terms</h2>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>
              <strong>Billing Cycles</strong>: Services are billed monthly in advance unless
              otherwise agreed in your service agreement.
            </li>
            <li>
              <strong>Payment Due</strong>: Invoices are due within 15 days of invoice date.
            </li>
            <li>
              <strong>Late Payments</strong>: Late fees of 1.5% per month (18% APR) apply to overdue
              balances.
            </li>
            <li>
              <strong>Suspension</strong>: Services may be suspended for accounts more than 30 days
              past due after written notice.
            </li>
            <li>
              <strong>Price Changes</strong>: We reserve the right to adjust pricing with 60 days'
              advance written notice.
            </li>
          </ul>

          <h2 className="text-2xl font-bold text-brand-oxford mt-8 mb-4">
            7. Term and Termination
          </h2>

          <h3 className="text-xl font-semibold text-brand-oxford mt-6 mb-3">7.1 Service Term</h3>
          <p>Service agreements are typically structured as:</p>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>
              <strong>Monthly Contracts</strong>: 30-day notice required for cancellation by either
              party.
            </li>
            <li>
              <strong>Annual Contracts</strong>: Fixed 12-month term with automatic renewal unless
              60-day notice provided.
            </li>
            <li>
              <strong>Project-Based</strong>: Term defined in project statement of work.
            </li>
          </ul>

          <h3 className="text-xl font-semibold text-brand-oxford mt-6 mb-3">
            7.2 Termination for Cause
          </h3>
          <p>
            Either party may terminate immediately for material breach if the breach is not cured
            within 15 days of written notice. Humaneers may terminate immediately for non-payment,
            violation of acceptable use policies, or illegal activity.
          </p>

          <h3 className="text-xl font-semibold text-brand-oxford mt-6 mb-3">
            7.3 Effect of Termination
          </h3>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>Client data will be available for retrieval for 30 days post-termination.</li>
            <li>All outstanding fees become immediately due and payable.</li>
            <li>Access credentials will be revoked upon termination.</li>
            <li>Confidentiality obligations survive termination indefinitely.</li>
          </ul>

          <h2 className="text-2xl font-bold text-brand-oxford mt-8 mb-4">
            8. Intellectual Property
          </h2>

          <h3 className="text-xl font-semibold text-brand-oxford mt-6 mb-3">
            8.1 Client Data Ownership
          </h3>
          <p>
            You retain all rights, title, and interest in your data and content. We claim no
            ownership over client data and will not use it except as necessary to provide services.
          </p>

          <h3 className="text-xl font-semibold text-brand-oxford mt-6 mb-3">8.2 Humaneers IP</h3>
          <p>
            Our proprietary tools, methodologies, processes, and software remain our exclusive
            property. Services grants no transfer of IP rights except as explicitly stated in
            individual agreements.
          </p>

          <h3 className="text-xl font-semibold text-brand-oxford mt-6 mb-3">8.3 Work Product</h3>
          <p>
            For custom development or deliverables created specifically for your project, ownership
            transfers to you upon full payment unless otherwise agreed in writing.
          </p>

          <h2 className="text-2xl font-bold text-brand-oxford mt-8 mb-4">9. Confidentiality</h2>
          <p>
            Both parties agree to maintain confidentiality of all non-public information disclosed
            during the engagement. This includes:
          </p>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>Technical information, business processes, and strategic plans.</li>
            <li>Client data, user information, and access credentials.</li>
            <li>Pricing, contract terms, and financial information.</li>
          </ul>
          <p>
            Confidentiality obligations survive termination of services and continue indefinitely
            except where disclosure is required by law.
          </p>

          <h2 className="text-2xl font-bold text-brand-oxford mt-8 mb-4">
            10. Limitation of Liability
          </h2>

          <h3 className="text-xl font-semibold text-brand-oxford mt-6 mb-3">
            10.1 Cap on Liability
          </h3>
          <p>
            Except for breaches of confidentiality or indemnification obligations, neither party's
            aggregate liability shall exceed the total fees paid by client in the 12 months
            preceding the claim.
          </p>

          <h3 className="text-xl font-semibold text-brand-oxford mt-6 mb-3">
            10.2 Excluded Damages
          </h3>
          <p>
            Neither party shall be liable for indirect, incidental, special, consequential, or
            punitive damages, including lost profits, lost data, or business interruption, even if
            advised of the possibility.
          </p>

          <h3 className="text-xl font-semibold text-brand-oxford mt-6 mb-3">10.3 Exceptions</h3>
          <p>Liability limitations do not apply to:</p>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>Gross negligence or willful misconduct.</li>
            <li>Violation of confidentiality obligations.</li>
            <li>Indemnification obligations under Section 11.</li>
            <li>Violations of applicable law that cannot be limited by contract.</li>
          </ul>

          <h2 className="text-2xl font-bold text-brand-oxford mt-8 mb-4">11. Indemnification</h2>

          <h3 className="text-xl font-semibold text-brand-oxford mt-6 mb-3">11.1 By Humaneers</h3>
          <p>
            We will defend and indemnify you against claims that our services infringe third-party
            intellectual property rights, subject to your prompt notification and cooperation.
          </p>

          <h3 className="text-xl font-semibold text-brand-oxford mt-6 mb-3">11.2 By Client</h3>
          <p>
            You will defend and indemnify us against claims arising from: (a) your misuse of
            services, (b) violation of laws or third-party rights, (c) your data or content, or (d)
            unauthorized access due to your failure to secure credentials.
          </p>

          <h2 className="text-2xl font-bold text-brand-oxford mt-8 mb-4">
            12. Warranties and Disclaimers
          </h2>

          <h3 className="text-xl font-semibold text-brand-oxford mt-6 mb-3">12.1 Our Warranties</h3>
          <p>
            We warrant that services will be performed in a professional and workmanlike manner
            consistent with industry standards. For material breach of this warranty, your sole
            remedy is re-performance of the deficient services.
          </p>

          <h3 className="text-xl font-semibold text-brand-oxford mt-6 mb-3">12.2 Disclaimers</h3>
          <p>
            EXCEPT AS EXPRESSLY STATED, SERVICES ARE PROVIDED "AS IS" WITHOUT WARRANTIES OF ANY
            KIND, EXPRESS OR IMPLIED, INCLUDING WARRANTIES OF MERCHANTABILITY, FITNESS FOR A
            PARTICULAR PURPOSE, OR NON-INFRINGEMENT.
          </p>

          <h2 className="text-2xl font-bold text-brand-oxford mt-8 mb-4">13. Force Majeure</h2>
          <p>
            Neither party shall be liable for delays or failures in performance resulting from
            circumstances beyond reasonable control, including natural disasters, war, terrorism,
            pandemic, government actions, internet outages, or third-party service failures.
          </p>

          <h2 className="text-2xl font-bold text-brand-oxford mt-8 mb-4">
            14. Acceptable Use Policy
          </h2>
          <p>Clients shall not use our services to:</p>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>Violate any applicable laws or regulations.</li>
            <li>Infringe on intellectual property rights of others.</li>
            <li>Transmit malware, spam, or malicious code.</li>
            <li>Engage in unauthorized access or security testing without permission.</li>
            <li>Host or distribute illegal content.</li>
            <li>Harass, threaten, or harm others.</li>
          </ul>
          <p>Violation may result in immediate service suspension and termination.</p>

          <h2 className="text-2xl font-bold text-brand-oxford mt-8 mb-4">15. Changes to Terms</h2>
          <p>
            We may modify these Terms at any time by posting updated terms on our website. For
            material changes affecting active service agreements, we will provide 30 days' advance
            notice via email. Continued use of services after changes take effect constitutes
            acceptance.
          </p>

          <h2 className="text-2xl font-bold text-brand-oxford mt-8 mb-4">16. Dispute Resolution</h2>

          <h3 className="text-xl font-semibold text-brand-oxford mt-6 mb-3">
            16.1 Informal Resolution
          </h3>
          <p>
            Before filing a claim, parties agree to attempt informal resolution by providing written
            notice describing the dispute and proposed resolution.
          </p>

          <h3 className="text-xl font-semibold text-brand-oxford mt-6 mb-3">16.2 Arbitration</h3>
          <p>
            Disputes that cannot be resolved informally shall be settled by binding arbitration in
            accordance with the Commercial Arbitration Rules of the American Arbitration
            Association. Arbitration shall be conducted in Tempe, Arizona.
          </p>

          <h3 className="text-xl font-semibold text-brand-oxford mt-6 mb-3">16.3 Exceptions</h3>
          <p>
            Either party may seek injunctive relief in court for breach of confidentiality or
            intellectual property violations without arbitration.
          </p>

          <h2 className="text-2xl font-bold text-brand-oxford mt-8 mb-4">17. Governing Law</h2>
          <p>
            These Terms are governed by the laws of the State of Arizona, United States, without
            regard to conflict of law principles. Any litigation shall be brought exclusively in the
            state or federal courts located in Maricopa County, Arizona.
          </p>

          <h2 className="text-2xl font-bold text-brand-oxford mt-8 mb-4">18. General Provisions</h2>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>
              <strong>Entire Agreement</strong>: These Terms, together with your service agreement,
              constitute the entire agreement between the parties.
            </li>
            <li>
              <strong>Severability</strong>: If any provision is found invalid, the remaining
              provisions remain in full effect.
            </li>
            <li>
              <strong>Waiver</strong>: Failure to enforce any provision does not constitute a
              waiver.
            </li>
            <li>
              <strong>Assignment</strong>: You may not assign your rights without our written
              consent. We may assign to affiliates or in connection with a merger or sale.
            </li>
            <li>
              <strong>Notices</strong>: Legal notices must be sent in writing to hello@humaneers.dev
              or the address in your service agreement.
            </li>
          </ul>

          <h2 className="text-2xl font-bold text-brand-oxford mt-8 mb-4">
            19. Contact Information
          </h2>
          <p>For questions about these Terms or our services, please contact:</p>
          <p className="mt-4">
            <strong>Humaneers Limited Company</strong>
            <br />
            Email:{" "}
            <a href="mailto:hello@humaneers.dev" className="text-brand-copper hover:underline">
              hello@humaneers.dev
            </a>
            <br />
            Legal:{" "}
            <a href="mailto:legal@humaneers.dev" className="text-brand-copper hover:underline">
              legal@humaneers.dev
            </a>
            <br />
            Security:{" "}
            <a href="mailto:security@humaneers.dev" className="text-brand-copper hover:underline">
              security@humaneers.dev
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
