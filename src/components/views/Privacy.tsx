export function Privacy() {
  return (
    <div className="bg-white py-24 min-h-screen">
      <div className="container mx-auto px-6 max-w-4xl">
        <h1 className="text-4xl font-bold text-brand-oxford mb-8">Privacy Policy</h1>
        <div className="prose prose-lg text-brand-slate">
          <p className="mb-4">Last updated: {new Date().toLocaleDateString()}</p>

          <h2 className="text-2xl font-bold text-brand-oxford mt-8 mb-4">1. Introduction</h2>
          <p>Humaneers Limited Company ("we," "our," or "us") respects your privacy and is committed to protecting your personal data. This privacy policy explains how we collect, use, and protect your information when you visit our website or use our services, and informs you about your privacy rights under applicable laws including GDPR and CCPA.</p>

          <h2 className="text-2xl font-bold text-brand-oxford mt-8 mb-4">2. Data We Collect</h2>
          <p>We may collect, use, store and transfer different kinds of personal data about you:</p>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li><strong>Identity Data</strong>: First name, last name, username or similar identifier, job title, company name.</li>
            <li><strong>Contact Data</strong>: Email address, telephone numbers, business address.</li>
            <li><strong>Technical Data</strong>: IP address, browser type and version, time zone setting, location data, browser plug-in types and versions, operating system and platform.</li>
            <li><strong>Usage Data</strong>: Information about how you use our website and services.</li>
            <li><strong>Marketing Data</strong>: Your preferences in receiving marketing communications and your communication preferences.</li>
          </ul>

          <h2 className="text-2xl font-bold text-brand-oxford mt-8 mb-4">3. How We Collect Your Data</h2>
          <p>We collect data through:</p>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li><strong>Direct interactions</strong>: Forms on our website, email correspondence, phone calls, or scheduling bookings through Cal.com.</li>
            <li><strong>Automated technologies</strong>: As you interact with our website, we may automatically collect Technical Data using cookies, server logs, and similar technologies.</li>
            <li><strong>Third parties</strong>: Analytics providers (Zoho PageSense), support chat services (Zoho SalesIQ), and scheduling services (Cal.com).</li>
          </ul>

          <h2 className="text-2xl font-bold text-brand-oxford mt-8 mb-4">4. Legal Basis for Processing (GDPR)</h2>
          <p>We will only use your personal data when the law allows us to. Under GDPR, our lawful bases for processing include:</p>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li><strong>Contract Performance</strong>: Where we need to perform a contract we are about to enter into or have entered with you.</li>
            <li><strong>Legitimate Interests</strong>: Where it is necessary for our legitimate business interests and your interests and fundamental rights do not override those interests.</li>
            <li><strong>Legal Obligation</strong>: Where we need to comply with legal or regulatory obligations.</li>
            <li><strong>Consent</strong>: Where you have given explicit consent for specific purposes (e.g., marketing communications).</li>
          </ul>

          <h2 className="text-2xl font-bold text-brand-oxford mt-8 mb-4">5. How We Use Your Data</h2>
          <p>We use your data to:</p>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>Provide and deliver our IT, security, and marketing services.</li>
            <li>Process and manage your inquiries, bookings, and support requests.</li>
            <li>Communicate with you about services, updates, and service-related announcements.</li>
            <li>Improve our website and services through analytics.</li>
            <li>Send marketing communications where you have opted in or where permitted by law.</li>
            <li>Comply with legal obligations and protect against fraud or security threats.</li>
          </ul>

          <h2 className="text-2xl font-bold text-brand-oxford mt-8 mb-4">6. Third-Party Service Providers</h2>
          <p>We use the following third-party service providers who may process your personal data:</p>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li><strong>Cal.com</strong>: Appointment scheduling and booking management. Data shared includes name, email, phone, company details, and appointment preferences. When you submit a form, your information is passed securely via URL parameters to Cal.com's booking system over an encrypted HTTPS connection.</li>
            <li><strong>Zoho PageSense</strong>: Website analytics and user behavior tracking to improve user experience.</li>
            <li><strong>Zoho SalesIQ</strong>: Live chat support and customer engagement.</li>
            <li><strong>Vercel</strong>: Website hosting and content delivery.</li>
          </ul>
          <p>These providers are contractually obligated to protect your data and use it only for the purposes we specify. We ensure all third parties maintain appropriate security standards.</p>
          <p className="mt-4"><strong>Note on URL Parameters:</strong> When you submit our contact or support forms, non-sensitive information (name, email, company, inquiry details) is passed to our booking system via URL parameters. This data is transmitted over secure HTTPS connections and is not logged in server access logs or exposed to third parties. Sensitive information (such as passwords, financial data, or health information) is never transmitted via URL parameters.</p>

          <h2 className="text-2xl font-bold text-brand-oxford mt-8 mb-4">7. International Data Transfers</h2>
          <p>Your data may be transferred to and processed in countries outside your country of residence, including the United States. Where we transfer data outside the European Economic Area (EEA), we ensure appropriate safeguards are in place, such as:</p>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>Standard Contractual Clauses approved by the European Commission.</li>
            <li>Data Processing Agreements with our service providers.</li>
            <li>Ensuring processors are Privacy Shield certified or have equivalent protections.</li>
          </ul>

          <h2 className="text-2xl font-bold text-brand-oxford mt-8 mb-4">8. Data Retention</h2>
          <p>We will only retain your personal data for as long as necessary to fulfill the purposes for which it was collected, including:</p>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li><strong>Active clients</strong>: For the duration of the service relationship plus 7 years for accounting and legal compliance.</li>
            <li><strong>Prospects and inquiries</strong>: Up to 3 years from last interaction, unless you request earlier deletion.</li>
            <li><strong>Marketing communications</strong>: Until you unsubscribe or request removal.</li>
            <li><strong>Legal obligations</strong>: As required by applicable law (e.g., tax records, contracts).</li>
          </ul>

          <h2 className="text-2xl font-bold text-brand-oxford mt-8 mb-4">9. Your Rights</h2>
          <p>Under GDPR, CCPA, and other privacy laws, you have the following rights:</p>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li><strong>Right to Access</strong>: Request a copy of your personal data we hold.</li>
            <li><strong>Right to Rectification</strong>: Request correction of inaccurate or incomplete data.</li>
            <li><strong>Right to Erasure</strong>: Request deletion of your data (subject to legal retention requirements).</li>
            <li><strong>Right to Restrict Processing</strong>: Request limitation on how we use your data.</li>
            <li><strong>Right to Data Portability</strong>: Receive your data in a structured, machine-readable format.</li>
            <li><strong>Right to Object</strong>: Object to processing based on legitimate interests or for marketing purposes.</li>
            <li><strong>Right to Withdraw Consent</strong>: Where processing is based on consent, you may withdraw at any time.</li>
            <li><strong>Right to Lodge a Complaint</strong>: File a complaint with your local data protection authority.</li>
          </ul>
          <p>To exercise any of these rights, please contact us at <a href="mailto:privacy@humaneers.dev" className="text-brand-copper hover:underline">privacy@humaneers.dev</a>. We will respond within 30 days.</p>

          <h2 className="text-2xl font-bold text-brand-oxford mt-8 mb-4">10. Cookies and Tracking Technologies</h2>
          <p>We use cookies and similar tracking technologies to improve your experience on our website. These include:</p>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li><strong>Essential Cookies</strong>: Required for website functionality (session management, security).</li>
            <li><strong>Analytics Cookies</strong>: Zoho PageSense tracks usage patterns to improve our services.</li>
            <li><strong>Functional Cookies</strong>: Remember your preferences and settings.</li>
            <li><strong>Chat Cookies</strong>: Zoho SalesIQ uses cookies to maintain chat sessions and preferences.</li>
          </ul>
          <p>You can control cookies through your browser settings. Note that disabling certain cookies may affect website functionality.</p>

          <h2 className="text-2xl font-bold text-brand-oxford mt-8 mb-4">11. California Privacy Rights (CCPA)</h2>
          <p>If you are a California resident, you have additional rights under the California Consumer Privacy Act (CCPA):</p>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li><strong>Right to Know</strong>: What personal information we collect, use, disclose, and sell.</li>
            <li><strong>Right to Delete</strong>: Request deletion of your personal information.</li>
            <li><strong>Right to Opt-Out</strong>: We do not sell personal information. If our practices change, you will have the right to opt out.</li>
            <li><strong>Right to Non-Discrimination</strong>: We will not discriminate against you for exercising your CCPA rights.</li>
          </ul>
          <p>To exercise these rights, contact us at <a href="mailto:privacy@humaneers.dev" className="text-brand-copper hover:underline">privacy@humaneers.dev</a>.</p>

          <h2 className="text-2xl font-bold text-brand-oxford mt-8 mb-4">12. Data Security</h2>
          <p>We have implemented appropriate technical and organizational security measures to protect your personal data, including:</p>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>Encryption of data in transit and at rest (HTTPS, TLS).</li>
            <li>Access controls limiting data access to authorized personnel only.</li>
            <li>Regular security assessments and SOC 2 Type II compliance.</li>
            <li>Secure data backup and disaster recovery procedures.</li>
            <li>Employee training on data protection and confidentiality.</li>
          </ul>
          <p>While we strive to protect your data, no method of transmission over the internet is 100% secure. We cannot guarantee absolute security but maintain industry-standard protections.</p>

          <h2 className="text-2xl font-bold text-brand-oxford mt-8 mb-4">13. Children's Privacy</h2>
          <p>Our services are not directed to individuals under 18 years of age. We do not knowingly collect personal data from children. If you believe we have inadvertently collected data from a child, please contact us immediately.</p>

          <h2 className="text-2xl font-bold text-brand-oxford mt-8 mb-4">14. Changes to This Policy</h2>
          <p>We may update this privacy policy from time to time to reflect changes in our practices or legal requirements. We will notify you of significant changes by posting the updated policy on our website and updating the "Last updated" date. For material changes, we may provide additional notice via email.</p>

          <h2 className="text-2xl font-bold text-brand-oxford mt-8 mb-4">15. Contact Us</h2>
          <p>For questions about this privacy policy, to exercise your rights, or to report privacy concerns, please contact:</p>
          <p className="mt-4">
            <strong>Humaneers Limited Company</strong><br />
            Email: <a href="mailto:privacy@humaneers.dev" className="text-brand-copper hover:underline">privacy@humaneers.dev</a><br />
            General Inquiries: <a href="mailto:hello@humaneers.dev" className="text-brand-copper hover:underline">hello@humaneers.dev</a><br />
            Security Issues: <a href="mailto:security@humaneers.dev" className="text-brand-copper hover:underline">security@humaneers.dev</a>
          </p>
          <p className="mt-4">We will respond to all requests within 30 days as required by applicable law.</p>
        </div>
      </div>
    </div>
  );
}
