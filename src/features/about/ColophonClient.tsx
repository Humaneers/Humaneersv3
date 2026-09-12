"use client";

import Link from "next/link";

import { PageHeader } from "@/components/sections/PageHeader";
import { ProseSection } from "@/components/sections/ProseSection";
import { routePaths } from "../../routes";

/**
 * The page was a two-column grid whose eight constitution clauses were styled
 * as copper side tabs, with a card stack beside them. It is long-form content
 * now and the words are unchanged.
 *
 * The credit rows in the card stack were flex rows of a label and a link. They
 * are description lists, so the label and the value stay on separate lines. In
 * the analytics and business rows the whole link was the glyph the row ended
 * with, which is no name for a link; the product name is the link instead.
 */
export function ColophonClient() {
  return (
    <>
      <PageHeader
        scheme="dark"
        align="center"
        heading="Colophon & Transparency"
        description="How we built this site, and how we build our company. We believe in radical openness in our code, our pricing, and our values."
      />

      <ProseSection>
        <h2>The Humaneers Digital Constitution</h2>
        <p>
          Serving businesses and families requires more than technical expertise. It demands
          transparent communication, ethical operations, and a user-centric digital experience. We
          have adopted this framework to design our policies and processes, ensuring we build trust
          and foster long-term relationships with our clients.
        </p>

        <div className="space-y-12">
          {/* 1. Clear Navigation */}
          <div>
            <h3>1. Clear and Segment‑Oriented Navigation</h3>
            <p>
              A well‑structured navigation is essential for users to understand our offerings and
              values.
            </p>
            <ul>
              <li>
                <strong>Sticky Header:</strong> We keep a minimal high‑contrast bar fixed at the top
                of the page so that key actions remain visible during scrolling.
              </li>
              <li>
                <strong>Segmented Service Menu:</strong> We split our offerings into clear
                categories (Managed IT, Brand Growth, Personal Security) to help visitors quickly
                find the solution relevant to their needs.
              </li>
              <li>
                <strong>Action-Oriented Design:</strong> Our "Get Started" buttons are
                context-aware, ensuring you are directed to the right team immediately.
              </li>
              <li>
                <strong>Integrated About Links:</strong> We believe corporate information shouldn't
                be hidden. Our story and values are front and center.
              </li>
            </ul>
          </div>

          {/* 2. Comprehensive Footer */}
          <div>
            <h3>2. Comprehensive Footer as Trust Anchor</h3>
            <p>Our footer acts as a complete sitemap and trust‑building tool.</p>
            <ul>
              <li>
                <strong>Customer Service:</strong> We provide support availability and contact
                channels directly at the bottom of every page.
              </li>
              <li>
                <strong>Service Index:</strong> A complete list of our specialized services, from
                mesh networks to SOC 2 compliance.
              </li>
              <li>
                <strong>Legal & Compliance:</strong> Direct links to our Privacy Policy, Terms, and
                this Transparency page.
              </li>
            </ul>
          </div>

          {/* 3. Transparent Corporate Information */}
          <div>
            <h3>3. Transparent Corporate Information</h3>
            <p>
              <strong>Mission and Story:</strong> We explain the "why": bringing enterprise-grade
              discipline to businesses and families, without the enterprise price tag. We share our
              origins.
            </p>
            <p>
              <strong>Values and Ethics:</strong>
            </p>
            <ul>
              <li>
                <strong>Ethics Charter:</strong> We do not sell client data. We openly declare that
                our charter is a moral imperative guiding all decision-making, not just a compliance
                checklist.
              </li>
              <li>
                <strong>Whistleblower Policy:</strong> We empower employees, contractors, and
                suppliers to report wrongdoing without fear of retaliation.
              </li>
              <li>
                <strong>"No-BS" Promise:</strong> We will always tell you when a cheaper solution
                exists, even if it means we make less money.
              </li>
            </ul>
          </div>

          {/* 4. Sustainability */}
          <div>
            <h3>4. Commitment to Sustainability</h3>
            <ul>
              <li>
                <strong>Remote-First:</strong> Our team works remotely by default.
              </li>
              <li>
                <strong>Hardware Lifecycle:</strong> We partner with certified recyclers to
                refurbish or recycle decommissioned client equipment.
              </li>
              <li>
                <strong>Supplier Engagement:</strong> We evaluate major hardware vendors against ESG
                criteria and integrate sustainability commitments into our procurement advice.
              </li>
            </ul>
          </div>

          {/* 5. DEI */}
          <div>
            <h3>5. Diversity, Equity & Inclusion (DEI)</h3>
            <ul>
              <li>
                <strong>Inclusive Culture:</strong> We offer diversity training and have adopted
                flexible working policies that support parents and caregivers.
              </li>
              <li>
                <strong>Bias‑free Recruitment:</strong> We recruit based on skills, utilizing
                interview panels with diverse backgrounds to reduce unconscious bias.
              </li>
              <li>
                <strong>Advocacy:</strong> We believe that a team with varied life experiences
                identifies security blind spots that a homogenous team would miss.
              </li>
            </ul>
          </div>

          {/* 6. Operational Transparency */}
          <div>
            <h3>6. Operational Transparency and Reliability</h3>
            <ul>
              <li>
                <strong>Status Page:</strong> Our <Link href={routePaths.status}>status page</Link>{" "}
                explains how to report an active problem and links to the uptime commitment in our
                Terms of Service. It does not show live monitoring yet.
              </li>
              <li>
                <strong>Support Availability:</strong> We are available via multiple channels (chat,
                email, phone) to address issues quickly, with clear SLAs for our retainer clients.
              </li>
              <li>
                <strong>Policy Access:</strong> Our privacy, security, and AI usage guidelines are
                always just one click away in our footer.
              </li>
            </ul>
          </div>

          {/* 7. Roadmap */}
          <div>
            <h3>7. Our Continuous Improvement Roadmap</h3>
            <p>
              Transparency is a journey, not a destination. Here is what we are working on next:
            </p>
            <ul>
              <li>
                <strong>Annual Reporting:</strong> We are compiling our first public Sustainability
                and DEI report for release next fiscal year.
              </li>
              <li>
                <strong>Status Page Evolution:</strong> We are building a public-facing dashboard
                for real-time network health monitoring for our managed clients.
              </li>
              <li>
                <strong>Community Training:</strong> We are launching free cybersecurity workshops
                for local nonprofits to give back to our community.
              </li>
            </ul>
          </div>

          {/* 8. AI Usage Policy */}
          <div>
            <h3>8. Human-First, AI-Second</h3>
            <p>We believe technology should amplify human expertise, not replace it.</p>
            <ul>
              <li>
                <strong>Human Decision-Making:</strong> All strategic decisions, client
                communications, and critical recommendations are made by experienced professionals,
                never automated.
              </li>
              <li>
                <strong>AI as a Tool:</strong> We use machine learning tools to enhance code
                quality, catch errors, optimize configurations, and accelerate research. These tools
                help us deliver higher quality work, faster.
              </li>
              <li>
                <strong>Quality Over Speed:</strong> AI helps us produce better deliverables, but we
                review, validate, and take full accountability for everything we ship.
              </li>
              <li>
                <strong>Transparency:</strong> If we use AI-assisted tools on your project, we
                disclose it. You always know how your work is being produced.
              </li>
            </ul>
          </div>
        </div>
      </ProseSection>

      <ProseSection scheme="cream">
        <h3>Security</h3>
        <p>
          <strong>Encrypted in Transit and at Rest</strong>
        </p>
        <p>
          Client data is encrypted with TLS 1.2+ in transit and AES-256 at rest, and multi-factor
          authentication is required for all administrative access.
        </p>
      </ProseSection>

      <ProseSection>
        <h3>Technical Colophon</h3>
        <p>
          This site is built on the shoulders of giants. We utilize open-source software to deliver
          a fast, secure experience.
        </p>
        <dl>
          <div>
            <dt>Framework</dt>
            <dd>
              <a href="https://nextjs.org" target="_blank" rel="noreferrer">
                Next.js 15 (App Router)
              </a>
            </dd>
          </div>
          <div>
            <dt>Styling</dt>
            <dd>
              <a href="https://tailwindcss.com" target="_blank" rel="noreferrer">
                Tailwind CSS 4
              </a>
            </dd>
          </div>
          <div>
            <dt>TypeScript</dt>
            <dd>
              <a href="https://typescriptlang.org" target="_blank" rel="noreferrer">
                TypeScript 5
              </a>
            </dd>
          </div>
          <div>
            <dt>Components</dt>
            <dd>
              <a href="https://ui.shadcn.com" target="_blank" rel="noreferrer">
                shadcn/ui
              </a>
            </dd>
          </div>
          <div>
            <dt>Icons</dt>
            <dd>
              <a href="https://lucide.dev" target="_blank" rel="noreferrer">
                Lucide React
              </a>
            </dd>
          </div>
          <div>
            <dt>Animation</dt>
            <dd>
              <a href="https://motion.dev" target="_blank" rel="noreferrer">
                Motion
              </a>
            </dd>
          </div>
          <div>
            <dt>Deployment</dt>
            <dd>
              <a href="https://vercel.com" target="_blank" rel="noreferrer">
                Vercel
              </a>
            </dd>
          </div>
        </dl>

        <div>
          <h3>Analytics & Monitoring</h3>
          <p>
            Analytics tools used to improve user experience and site performance. Loaded only with
            your explicit consent (except essential support chat).
          </p>
          <dl>
            <div>
              <dt>
                <a href="https://vercel.com/analytics" target="_blank" rel="noreferrer">
                  Vercel Analytics
                </a>
              </dt>
              <dd>Privacy-friendly web analytics</dd>
            </div>
            <div>
              <dt>
                <a href="https://vercel.com/docs/speed-insights" target="_blank" rel="noreferrer">
                  Vercel Speed Insights
                </a>
              </dt>
              <dd>Core Web Vitals monitoring</dd>
            </div>
            <div>
              <dt>
                <a href="https://contentsquare.com" target="_blank" rel="noreferrer">
                  ContentSquare
                </a>
              </dt>
              <dd>Digital experience analytics</dd>
            </div>
            <div>
              <dt>
                <a href="https://www.zoho.com/pagesense/" target="_blank" rel="noreferrer">
                  Zoho PageSense
                </a>
              </dt>
              <dd>Heatmaps & session recordings</dd>
            </div>
            <div>
              <dt>
                <a href="https://www.zoho.com/salesiq/" target="_blank" rel="noreferrer">
                  Zoho SalesIQ
                </a>
              </dt>
              <dd>Live chat support (essential service)</dd>
            </div>
          </dl>
        </div>

        <div>
          <h3>Business Operations</h3>
          <p>The tools we use to run our business and serve our clients.</p>
          <ul>
            <li>
              <a href="https://zoho.com" target="_blank" rel="noreferrer">
                Zoho CRM & Desk
              </a>
            </li>
            <li>
              <a href="https://workspace.google.com" target="_blank" rel="noreferrer">
                Google Workspace
              </a>
            </li>
            <li>
              <a href="https://stripe.com" target="_blank" rel="noreferrer">
                Stripe
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h3>Photography Credits</h3>
          <p>Visuals courtesy of the talented community at Unsplash.</p>
          <dl>
            <div>
              <dt>Tempe Morning</dt>
              <dd>
                <a href="https://unsplash.com" target="_blank" rel="noreferrer">
                  Unsplash
                </a>
              </dd>
            </div>
          </dl>
        </div>
      </ProseSection>
    </>
  );
}
