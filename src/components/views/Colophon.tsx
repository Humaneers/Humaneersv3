import {
  Code,
  Image,
  Scale,
  Heart,
  Shield,
  ShieldCheck,
  Users,
  Globe,
  Layout,
  ArrowRight,
} from "lucide-react";
import { Seo } from "../Seo";
export function Colophon() {
  return (
    <Seo
      title="Humaneers | Colophon & Transparency | How We Operate"
      description="Radical transparency in our code, pricing, and values. View our tech stack, ethics charter, and digital constitution."
      canonicalPath="/colophon"
    >
      <div className="bg-white min-h-screen">
        {/* Header */}
        <section className="bg-brand-oxford text-white py-16">
          <div className="container mx-auto px-6 text-center">
            <h1 className="text-3xl md:text-5xl font-bold mb-4">Colophon & Transparency</h1>
            <p className="text-gray-300 max-w-2xl mx-auto">
              How we built this site, and how we build our company. We believe in radical openness
              in our code, our pricing, and our values.
            </p>
          </div>
        </section>

        <div className="container mx-auto px-6 py-16">
          <div className="grid md:grid-cols-12 gap-12">
            {/* Main Content: The Framework */}
            <div className="md:col-span-8 space-y-16">
              <section>
                <h2 className="text-2xl font-bold text-brand-oxford mb-6 flex items-center gap-2">
                  <Scale className="text-brand-copper" /> The Humaneers Digital Constitution
                </h2>
                <p className="text-brand-slate mb-8 leading-relaxed">
                  Serving businesses and families requires more than technical expertise—it demands
                  transparent communication, ethical operations, and a user-centric digital
                  experience. We have adopted this framework to design our policies and processes,
                  ensuring we build trust and foster long-term relationships with our clients.
                </p>

                <div className="space-y-12">
                  {/* 1. Clear Navigation */}
                  <div className="border-l-4 border-brand-copper pl-6 py-1">
                    <h3 className="text-xl font-bold text-brand-oxford mb-3 flex items-center gap-2">
                      <Layout className="w-5 h-5 text-brand-copper" /> 1. Clear and Segment‑Oriented
                      Navigation
                    </h3>
                    <p className="text-brand-slate mb-4">
                      A well‑structured navigation is essential for users to understand our
                      offerings and values.
                    </p>
                    <ul className="list-disc pl-5 space-y-2 text-sm text-brand-slate">
                      <li>
                        <strong>Sticky Header:</strong> We keep a minimal high‑contrast bar fixed at
                        the top of the page so that key actions remain visible during scrolling.
                      </li>
                      <li>
                        <strong>Segmented Service Menu:</strong> We split our offerings into clear
                        categories (Managed IT, Brand Growth, Personal Security) to help visitors
                        quickly find the solution relevant to their needs.
                      </li>
                      <li>
                        <strong>Action-Oriented Design:</strong> Our "Get Started" buttons are
                        context-aware, ensuring you are directed to the right team immediately.
                      </li>
                      <li>
                        <strong>Integrated About Links:</strong> We believe corporate information
                        shouldn't be hidden. Our story and values are front and center.
                      </li>
                    </ul>
                  </div>

                  {/* 2. Comprehensive Footer */}
                  <div className="border-l-4 border-brand-copper pl-6 py-1">
                    <h3 className="text-xl font-bold text-brand-oxford mb-3 flex items-center gap-2">
                      <Layout className="w-5 h-5 text-brand-copper" /> 2. Comprehensive Footer as
                      Trust Anchor
                    </h3>
                    <p className="text-brand-slate mb-4">
                      Our footer acts as a complete sitemap and trust‑building tool.
                    </p>
                    <ul className="list-disc pl-5 space-y-2 text-sm text-brand-slate">
                      <li>
                        <strong>Customer Service:</strong> We provide support availability and
                        contact channels directly at the bottom of every page.
                      </li>
                      <li>
                        <strong>Service Index:</strong> A complete list of our specialized services,
                        from mesh networks to SOC 2 compliance.
                      </li>
                      <li>
                        <strong>Legal & Compliance:</strong> Direct links to our Privacy Policy,
                        Terms, and this Transparency page.
                      </li>
                    </ul>
                  </div>

                  {/* 3. Transparent Corporate Information */}
                  <div className="border-l-4 border-brand-copper pl-6 py-1">
                    <h3 className="text-xl font-bold text-brand-oxford mb-3 flex items-center gap-2">
                      <Heart className="w-5 h-5 text-brand-copper" /> 3. Transparent Corporate
                      Information
                    </h3>
                    <p className="text-brand-slate mb-4">
                      <strong>Mission and Story:</strong> We explain the "why"—bringing
                      enterprise-grade discipline to businesses and families, without the enterprise
                      price tag. We share our metrics and our origins to demonstrate stability.
                    </p>
                    <p className="text-brand-slate mb-4">
                      <strong>Values and Ethics:</strong>
                    </p>
                    <ul className="list-disc pl-5 space-y-2 text-sm text-brand-slate">
                      <li>
                        <strong>Ethics Charter:</strong> We do not sell client data. We openly
                        declare that our charter is a moral imperative guiding all decision-making,
                        not just a compliance checklist.
                      </li>
                      <li>
                        <strong>Whistleblower Policy:</strong> We empower employees, contractors,
                        and suppliers to report wrongdoing without fear of retaliation.
                      </li>
                      <li>
                        <strong>"No-BS" Promise:</strong> We will always tell you when a cheaper
                        solution exists, even if it means we make less money.
                      </li>
                    </ul>
                  </div>

                  {/* 4. Sustainability */}
                  <div className="border-l-4 border-brand-copper pl-6 py-1">
                    <h3 className="text-xl font-bold text-brand-oxford mb-3 flex items-center gap-2">
                      <Globe className="w-5 h-5 text-brand-copper" /> 4. Commitment to
                      Sustainability
                    </h3>
                    <ul className="list-disc pl-5 space-y-2 text-sm text-brand-slate">
                      <li>
                        <strong>GHG Assessments:</strong> We measure Scope 1, 2 and 3 emissions. As
                        a remote-first company, we drastically reduce commuting emissions.
                      </li>
                      <li>
                        <strong>Hardware Lifecycle:</strong> We partner with certified recyclers to
                        ensure 100% of decommissioned client equipment is refurbished or recycled
                        responsibly, aiming for zero e-waste by 2026.
                      </li>
                      <li>
                        <strong>Supplier Engagement:</strong> We evaluate major hardware vendors
                        against ESG criteria and integrate sustainability commitments into our
                        procurement advice.
                      </li>
                    </ul>
                  </div>

                  {/* 5. DEI */}
                  <div className="border-l-4 border-brand-copper pl-6 py-1">
                    <h3 className="text-xl font-bold text-brand-oxford mb-3 flex items-center gap-2">
                      <Users className="w-5 h-5 text-brand-copper" /> 5. Diversity, Equity &
                      Inclusion (DEI)
                    </h3>
                    <ul className="list-disc pl-5 space-y-2 text-sm text-brand-slate">
                      <li>
                        <strong>Inclusive Culture:</strong> We offer diversity training and have
                        adopted flexible working policies that support parents and caregivers.
                      </li>
                      <li>
                        <strong>Bias‑free Recruitment:</strong> We recruit based on skills,
                        utilizing interview panels with diverse backgrounds to reduce unconscious
                        bias.
                      </li>
                      <li>
                        <strong>Advocacy:</strong> We believe that a team with varied life
                        experiences identifies security blind spots that a homogenous team would
                        miss.
                      </li>
                    </ul>
                  </div>

                  {/* 6. Operational Transparency */}
                  <div className="border-l-4 border-brand-copper pl-6 py-1">
                    <h3 className="text-xl font-bold text-brand-oxford mb-3 flex items-center gap-2">
                      <Shield className="w-5 h-5 text-brand-copper" /> 6. Operational Transparency
                      and Reliability
                    </h3>
                    <ul className="list-disc pl-5 space-y-2 text-sm text-brand-slate">
                      <li>
                        <strong>Status Visibility:</strong> We believe in showing our uptime. We
                        provide transparency on system status and maintenance windows.
                      </li>
                      <li>
                        <strong>Support Availability:</strong> We are available via multiple
                        channels (chat, email, phone) to address issues quickly, with clear SLAs for
                        our retainer clients.
                      </li>
                      <li>
                        <strong>Policy Access:</strong> Our privacy, security, and AI usage
                        guidelines are always just one click away in our footer.
                      </li>
                    </ul>
                  </div>

                  {/* 7. Roadmap */}
                  <div className="border-l-4 border-brand-copper pl-6 py-1">
                    <h3 className="text-xl font-bold text-brand-oxford mb-3 flex items-center gap-2">
                      <ArrowRight className="w-5 h-5 text-brand-copper" /> 7. Our Continuous
                      Improvement Roadmap
                    </h3>
                    <p className="text-brand-slate mb-4">
                      Transparency is a journey, not a destination. Here is what we are working on
                      next:
                    </p>
                    <ul className="list-disc pl-5 space-y-2 text-sm text-brand-slate">
                      <li>
                        <strong>Annual Reporting:</strong> We are compiling our first public
                        Sustainability and DEI report for release next fiscal year.
                      </li>
                      <li>
                        <strong>Status Page Evolution:</strong> We are building a public-facing
                        dashboard for real-time network health monitoring for our managed clients.
                      </li>
                      <li>
                        <strong>Community Training:</strong> We are launching free cybersecurity
                        workshops for local nonprofits to give back to our community.
                      </li>
                    </ul>
                  </div>

                  {/* 8. AI Usage Policy */}
                  <div className="border-l-4 border-brand-copper pl-6 py-1">
                    <h3 className="text-xl font-bold text-brand-oxford mb-3 flex items-center gap-2">
                      <Users className="w-5 h-5 text-brand-copper" /> 8. Human-First, AI-Second
                    </h3>
                    <p className="text-brand-slate mb-4">
                      We believe technology should amplify human expertise, not replace it.
                    </p>
                    <ul className="list-disc pl-5 space-y-2 text-sm text-brand-slate">
                      <li>
                        <strong>Human Decision-Making:</strong> All strategic decisions, client
                        communications, and critical recommendations are made by experienced
                        professionals—never automated.
                      </li>
                      <li>
                        <strong>AI as a Tool:</strong> We use machine learning tools to enhance code
                        quality, catch errors, optimize configurations, and accelerate research.
                        These tools help us deliver higher quality work, faster.
                      </li>
                      <li>
                        <strong>Quality Over Speed:</strong> AI helps us produce better
                        deliverables, but we review, validate, and take full accountability for
                        everything we ship.
                      </li>
                      <li>
                        <strong>Transparency:</strong> If we use AI-assisted tools on your project,
                        we disclose it. You always know how your work is being produced.
                      </li>
                    </ul>
                  </div>
                </div>
              </section>
            </div>

            {/* Sidebar: Colophon Credits */}
            <div className="md:col-span-4 space-y-12">
              <div className="bg-brand-oxford/5 p-6 rounded-xl border border-brand-copper/20">
                <h3 className="font-bold text-brand-oxford mb-4 flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-brand-copper" /> Security
                </h3>
                <div className="flex items-center gap-3 mb-2">
                  <ShieldCheck className="w-8 h-8 text-brand-copper shrink-0" />
                  <span className="font-bold text-brand-oxford">SOC 2 Type II Compliant</span>
                </div>
                <p className="text-xs text-brand-slate">
                  We independently audit our controls to ensure client data security, availability,
                  and confidentiality.
                </p>
              </div>

              <div className="bg-gray-50 p-6 rounded-xl border border-gray-100">
                <h3 className="font-bold text-brand-oxford mb-4 flex items-center gap-2">
                  <Code className="w-5 h-5 text-brand-copper" /> Technical Colophon
                </h3>
                <p className="text-xs text-gray-500 mb-4">
                  This site is built on the shoulders of giants. We utilize open-source software to
                  deliver a fast, secure experience.
                </p>
                <ul className="space-y-3 text-sm">
                  <li className="flex items-center justify-between">
                    <span className="font-medium text-gray-700">Framework</span>
                    <a
                      href="https://react.dev"
                      target="_blank"
                      rel="noreferrer"
                      className="text-brand-copper hover:underline"
                    >
                      React 18
                    </a>
                  </li>
                  <li className="flex items-center justify-between">
                    <span className="font-medium text-gray-700">Build Tool</span>
                    <a
                      href="https://vite.dev"
                      target="_blank"
                      rel="noreferrer"
                      className="text-brand-copper hover:underline"
                    >
                      Vite 6
                    </a>
                  </li>
                  <li className="flex items-center justify-between">
                    <span className="font-medium text-gray-700">Routing</span>
                    <a
                      href="https://reactrouter.com"
                      target="_blank"
                      rel="noreferrer"
                      className="text-brand-copper hover:underline"
                    >
                      React Router
                    </a>
                  </li>
                  <li className="flex items-center justify-between">
                    <span className="font-medium text-gray-700">Styling</span>
                    <a
                      href="https://tailwindcss.com"
                      target="_blank"
                      rel="noreferrer"
                      className="text-brand-copper hover:underline"
                    >
                      Tailwind CSS 4
                    </a>
                  </li>
                  <li className="flex items-center justify-between">
                    <span className="font-medium text-gray-700">TypeScript</span>
                    <a
                      href="https://typescriptlang.org"
                      target="_blank"
                      rel="noreferrer"
                      className="text-brand-copper hover:underline"
                    >
                      TypeScript 5
                    </a>
                  </li>
                  <li className="flex items-center justify-between">
                    <span className="font-medium text-gray-700">Components</span>
                    <a
                      href="https://ui.shadcn.com"
                      target="_blank"
                      rel="noreferrer"
                      className="text-brand-copper hover:underline"
                    >
                      shadcn/ui
                    </a>
                  </li>
                  <li className="flex items-center justify-between">
                    <span className="font-medium text-gray-700">Icons</span>
                    <a
                      href="https://lucide.dev"
                      target="_blank"
                      rel="noreferrer"
                      className="text-brand-copper hover:underline"
                    >
                      Lucide React
                    </a>
                  </li>
                  <li className="flex items-center justify-between">
                    <span className="font-medium text-gray-700">Animation</span>
                    <a
                      href="https://motion.dev"
                      target="_blank"
                      rel="noreferrer"
                      className="text-brand-copper hover:underline"
                    >
                      Motion
                    </a>
                  </li>
                  <li className="flex items-center justify-between">
                    <span className="font-medium text-gray-700">Analytics</span>
                    <a
                      href="https://vercel.com/analytics"
                      target="_blank"
                      rel="noreferrer"
                      className="text-brand-copper hover:underline"
                    >
                      Vercel Analytics
                    </a>
                  </li>
                  <li className="flex items-center justify-between">
                    <span className="font-medium text-gray-700">Heatmaps</span>
                    <a
                      href="https://hotjar.com"
                      target="_blank"
                      rel="noreferrer"
                      className="text-brand-copper hover:underline"
                    >
                      Hotjar
                    </a>
                  </li>
                  <li className="flex items-center justify-between">
                    <span className="font-medium text-gray-700">Deployment</span>
                    <a
                      href="https://vercel.com"
                      target="_blank"
                      rel="noreferrer"
                      className="text-brand-copper hover:underline"
                    >
                      Vercel
                    </a>
                  </li>
                </ul>

                <div className="mt-8 pt-8 border-t border-gray-200">
                  <h3 className="font-bold text-brand-oxford mb-4 flex items-center gap-2">
                    <Users className="w-5 h-5 text-brand-copper" /> Business Operations
                  </h3>
                  <p className="text-xs text-gray-500 mb-4">
                    The tools we use to run our business and serve our clients.
                  </p>
                  <ul className="space-y-3 text-sm">
                    <li className="flex flex-col gap-1">
                      <div className="flex items-center justify-between">
                        <span className="font-medium text-gray-700">Zoho CRM & Desk</span>
                        <a
                          href="https://zoho.com"
                          target="_blank"
                          rel="noreferrer"
                          className="text-brand-copper hover:underline text-xs"
                        >
                          ↗
                        </a>
                      </div>
                      <span className="text-xs text-gray-500">
                        Customer relationship & support ticketing
                      </span>
                    </li>
                    <li className="flex flex-col gap-1">
                      <div className="flex items-center justify-between">
                        <span className="font-medium text-gray-700">Google Workspace</span>
                        <a
                          href="https://workspace.google.com"
                          target="_blank"
                          rel="noreferrer"
                          className="text-brand-copper hover:underline text-xs"
                        >
                          ↗
                        </a>
                      </div>
                      <span className="text-xs text-gray-500">
                        Email, calendar & team collaboration
                      </span>
                    </li>
                    <li className="flex flex-col gap-1">
                      <div className="flex items-center justify-between">
                        <span className="font-medium text-gray-700">Microsoft 365</span>
                        <a
                          href="https://microsoft.com/microsoft-365"
                          target="_blank"
                          rel="noreferrer"
                          className="text-brand-copper hover:underline text-xs"
                        >
                          ↗
                        </a>
                      </div>
                      <span className="text-xs text-gray-500">
                        Document management & productivity
                      </span>
                    </li>
                    <li className="flex flex-col gap-1">
                      <div className="flex items-center justify-between">
                        <span className="font-medium text-gray-700">Figma</span>
                        <a
                          href="https://figma.com"
                          target="_blank"
                          rel="noreferrer"
                          className="text-brand-copper hover:underline text-xs"
                        >
                          ↗
                        </a>
                      </div>
                      <span className="text-xs text-gray-500">Design & prototyping</span>
                    </li>
                    <li className="flex flex-col gap-1">
                      <div className="flex items-center justify-between">
                        <span className="font-medium text-gray-700">GitHub</span>
                        <a
                          href="https://github.com"
                          target="_blank"
                          rel="noreferrer"
                          className="text-brand-copper hover:underline text-xs"
                        >
                          ↗
                        </a>
                      </div>
                      <span className="text-xs text-gray-500">
                        Version control & code repository
                      </span>
                    </li>
                  </ul>
                </div>

                <div className="mt-8 pt-8 border-t border-gray-200">
                  <h3 className="font-bold text-brand-oxford mb-4 flex items-center gap-2">
                    <Image className="w-5 h-5 text-brand-copper" /> Photography Credits
                  </h3>
                  <p className="text-xs text-gray-500 mb-4">
                    Visuals courtesy of the talented community at Unsplash.
                  </p>
                  <ul className="space-y-3 text-xs">
                    <li className="flex flex-col gap-1">
                      <span className="font-medium text-gray-700">Tempe Morning</span>
                      <a
                        href="https://unsplash.com/photos/sunrise-over-a-city-with-mountains-in-the-background-b5d4adb056fb"
                        target="_blank"
                        rel="noreferrer"
                        className="text-brand-copper hover:underline truncate"
                      >
                        Unsplash
                      </a>
                    </li>
                    <li className="flex flex-col gap-1">
                      <span className="font-medium text-gray-700">Office Team</span>
                      <a
                        href="https://unsplash.com/photos/a-group-of-people-sitting-around-a-table-using-laptops-0c32e5ca2a2d"
                        target="_blank"
                        rel="noreferrer"
                        className="text-brand-copper hover:underline truncate"
                      >
                        Unsplash
                      </a>
                    </li>
                    <li className="flex flex-col gap-1">
                      <span className="font-medium text-gray-700">Portraits</span>
                      <span className="text-gray-400">Respective Contributors</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Seo>
  );
}
