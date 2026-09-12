// claims-guard-allow-file: relume-default-content this test lists Relume's placeholder strings to prove no section renders them
import { afterEach, describe, expect, it, vi } from "vitest";
import { cleanup, render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Laptop, LifeBuoy, ShieldCheck } from "lucide-react";

import { CTASection, type CTASectionProps } from "./CTASection";
import { FAQSection } from "./FAQSection";
import { FeatureGrid, type FeatureGridProps } from "./FeatureGrid";
import { PageHeader, type PageHeaderProps } from "./PageHeader";
import { PricingComparison, type PricingComparisonProps } from "./PricingComparison";
import { PricingOffer, type PricingOfferProps } from "./PricingOffer";
import { PricingPlans, type PricingPlan, type PricingPlansProps } from "./PricingPlans";
import type { SectionScheme } from "./scheme";
import { SplitFeature } from "./SplitFeature";

afterEach(cleanup);

// Relume's default copy and its placeholder image host. None of it may reach a page.
const RELUME_PLACEHOLDERS = [
  /d22po4pjz3o32e\.cloudfront\.net/i,
  /lorem ipsum/i,
  /heading goes here/i,
  /feature text goes here/i,
  /relume placeholder/i,
  /name surname/i,
  /position, company name/i,
  /short heading here/i,
  /question text goes here/i,
  /long heading is what you see here/i,
];

const TALK = { label: "Talk to us", href: "/contact" };
const PRICING = { label: "See pricing", href: "/pricing" };

const HEADING_SELECTOR = "h1, h2, h3, h4, h5, h6";

function headingLevels(root: HTMLElement) {
  return Array.from(root.querySelectorAll(HEADING_SELECTOR)).map((h) => Number(h.tagName[1]));
}

/** Checks every section shares: no nested headings, real named links, no placeholder copy. */
function expectSectionBasics(root: HTMLElement) {
  for (const heading of Array.from(root.querySelectorAll(HEADING_SELECTOR))) {
    expect(heading.parentElement?.closest(HEADING_SELECTOR) ?? null).toBeNull();
  }
  for (const link of Array.from(root.querySelectorAll("a"))) {
    expect(link.getAttribute("href")).toMatch(/^\//);
    expect(link.textContent?.trim()).not.toBe("");
    expect(link.closest("button")).toBeNull();
    expect(link.querySelector("button")).toBeNull();
  }
  for (const button of Array.from(root.querySelectorAll("button"))) {
    expect(button.textContent?.trim()).not.toBe("");
    expect(button.closest("a")).toBeNull();
  }
  for (const img of Array.from(root.querySelectorAll("img"))) {
    expect(img.getAttribute("alt")?.trim()).not.toBe("");
  }
  for (const pattern of RELUME_PLACEHOLDERS) {
    expect(root.innerHTML).not.toMatch(pattern);
  }
  // En dash and em dash, written as escapes so this file holds neither character.
  expect(root.textContent).not.toMatch(/[\u2013\u2014]/);
}

function expectCtaLinks(root: HTMLElement, ctas: { label: string; href: string }[]) {
  for (const cta of ctas) {
    const link = within(root).getByRole("link", { name: cta.label });
    expect(link.tagName).toBe("A");
    expect(link.getAttribute("href")).toBe(cta.href);
  }
}

describe("PageHeader", () => {
  const content = {
    heading: "Technology support for your business",
    description:
      "We look after your computers, accounts and network so your team can get on with its work.",
  };

  it("renders one h1, the description and link CTAs, with no buttons or image", () => {
    const { container } = render(<PageHeader {...content} ctas={[TALK, PRICING]} />);
    expect(headingLevels(container)).toEqual([1]);
    expect(screen.getByRole("heading", { level: 1 }).textContent).toBe(content.heading);
    expect(screen.getByText(content.description)).toBeTruthy();
    expectCtaLinks(container, [TALK, PRICING]);
    expect(container.querySelectorAll("button")).toHaveLength(0);
    expect(container.querySelector("img")).toBeNull();
    expectSectionBasics(container);
  });

  it("centers the text when align is center", () => {
    const { container } = render(<PageHeader {...content} align="center" ctas={[TALK]} />);
    expect(screen.getByRole("heading", { level: 1 }).parentElement?.className).toContain(
      "text-center"
    );
    expectCtaLinks(container, [TALK]);
    expectSectionBasics(container);
  });

  it("renders the optional image through next/image with the given alt", () => {
    const alt = "The Humaneers name in copper on a navy background";
    const { container } = render(
      <PageHeader {...content} image={{ src: "/og-image.jpg", alt, width: 1024, height: 1024 }} />
    );
    const images = container.querySelectorAll("img");
    expect(images).toHaveLength(1);
    expect(images[0].getAttribute("alt")).toBe(alt);
    // next/image routes the source through its optimizer rather than a raw <img src>.
    expect(images[0].getAttribute("src")).toContain("/_next/image?url=%2Fog-image.jpg");
    expect(headingLevels(container)).toEqual([1]);
    expectSectionBasics(container);
  });
});

describe("SplitFeature", () => {
  it("renders an h2, body text, points and link CTAs", () => {
    const points = ["One contact for every request", "Changes written down before they are made"];
    const { container } = render(
      <SplitFeature
        heading="How we work with you"
        body="You tell us what is getting in the way. We explain the options and agree the next step with you."
        points={points}
        ctas={[TALK, PRICING]}
      />
    );
    expect(headingLevels(container)).toEqual([2]);
    expect(screen.getAllByRole("listitem").map((li) => li.textContent)).toEqual(points);
    expectCtaLinks(container, [TALK, PRICING]);
    expect(container.querySelectorAll("button")).toHaveLength(0);
    expectSectionBasics(container);
  });

  it("renders without points or CTAs", () => {
    const { container } = render(
      <SplitFeature heading="How we work with you" body="We agree the next step with you." />
    );
    expect(headingLevels(container)).toEqual([2]);
    expect(container.querySelector("ul")).toBeNull();
    expect(container.querySelector("a")).toBeNull();
    expectSectionBasics(container);
  });
});

describe("FeatureGrid", () => {
  const items: FeatureGridProps["items"] = [
    {
      icon: Laptop,
      heading: "Devices",
      text: "Laptops and phones set up and kept up to date.",
      link: { label: "Managed IT", href: "/managed-it" },
    },
    { icon: ShieldCheck, heading: "Accounts", text: "Sign in and access reviewed with you." },
    { icon: LifeBuoy, heading: "Help", text: "A person to ask when something stops working." },
  ];

  it("renders the eyebrow, an h2, an h3 per item and decorative icons", () => {
    const { container } = render(
      <FeatureGrid eyebrow="What we cover" heading="Support that fits your team" items={items} />
    );
    expect(headingLevels(container)).toEqual([2, 3, 3, 3]);
    expect(screen.getByText("What we cover").tagName).toBe("P");
    const icons = container.querySelectorAll("svg");
    expect(icons.length).toBeGreaterThanOrEqual(items.length);
    icons.forEach((svg) => expect(svg.getAttribute("aria-hidden")).toBe("true"));
    expectCtaLinks(container, [{ label: "Managed IT", href: "/managed-it" }]);
    expect(container.querySelectorAll("button")).toHaveLength(0);
    expectSectionBasics(container);
  });

  it("leaves the eyebrow out when none is given and sets the column count", () => {
    const { container } = render(
      <FeatureGrid heading="Support that fits your team" items={items} columns={4} />
    );
    expect(container.querySelectorAll("p.text-scheme-accent")).toHaveLength(0);
    expect(container.querySelector(".lg\\:grid-cols-4")).not.toBeNull();
    expectSectionBasics(container);
  });
});

describe("CTASection", () => {
  const content = {
    heading: "Ready to talk?",
    text: "Tell us about your setup and we will suggest a starting point.",
    ctas: [TALK, PRICING],
  } satisfies CTASectionProps;

  it("renders an h2, text and link CTAs", () => {
    const { container } = render(<CTASection {...content} />);
    expect(headingLevels(container)).toEqual([2]);
    expectCtaLinks(container, [TALK, PRICING]);
    expect(container.querySelectorAll("button")).toHaveLength(0);
    expectSectionBasics(container);
  });
});

const WAITLIST = { label: "Join the waitlist", href: "/talk-to-sales" };

function planFixture(name: string, recommended = false): PricingPlan {
  return {
    name,
    price: "$10",
    priceUnit: "base / mo",
    priceDetail: "+ $2 / additional user / mo",
    footnoteMark: true,
    description: `What the ${name} option covers.`,
    features: ["Remote help", "Device updates"],
    links: [{ label: `${name} details`, href: "/managed-it" }],
    cta: WAITLIST,
    recommended,
  };
}

const PLANS_TABS: PricingPlansProps["tabs"] = [
  {
    value: "teams",
    label: "Teams",
    plans: [planFixture("Starter"), planFixture("Team", true)],
    footnote: "* The base price includes the users listed on each option.",
  },
  {
    value: "homes",
    label: "Homes",
    note: { title: "How home pricing works:", text: "One flat fee for the household." },
    plans: [planFixture("Home")],
  },
];

const COMPARISON_CONTENT = {
  heading: "Compare options",
  plans: ["Starter", "Team"],
  categories: [
    {
      title: "Support",
      features: [
        {
          name: "Remote help",
          description: "Help by phone and screen share.",
          values: { Starter: true, Team: true },
        },
        { name: "On-site visits", values: { Starter: false, Team: "Included" } },
      ],
    },
    {
      title: "Security",
      features: [{ name: "Device updates", values: { Starter: "Billable", Team: true } }],
    },
  ],
} satisfies PricingComparisonProps;

const OFFER_CONTENT = {
  heading: "Hourly help",
  description: "Buy a block of hours and use them when you need them.",
  points: [
    { heading: "Use them for anything", text: "Support, planning or a one-off project." },
    { heading: "Keep them", text: "Hours stay on your account until you use them." },
  ],
  price: "$50",
  priceUnit: "/hr",
  priceDetail: "Sold in 5-hour blocks",
  fineprint: "Subject to the Terms of Service.",
  cta: WAITLIST,
} satisfies PricingOfferProps;

describe("PricingPlans", () => {
  function renderPlans(value = "teams", onValueChange = vi.fn()) {
    const utils = render(
      <PricingPlans
        eyebrow="Waitlist open"
        heading="Plans and rates"
        description="Rates for each kind of client."
        tabsLabel="Who the plans are for"
        tabs={PLANS_TABS}
        value={value}
        onValueChange={onValueChange}
        notes={["A user is a person with an email account."]}
      />
    );
    return { ...utils, onValueChange };
  }

  it("renders an h2, a named tab list and the selected tab's plans as h3s", () => {
    const { container } = renderPlans();
    expect(headingLevels(container)).toEqual([2, 3, 3]);
    expect(screen.getByRole("tablist", { name: "Who the plans are for" })).toBeTruthy();
    const tabs = screen.getAllByRole("tab");
    expect(tabs.map((tab) => tab.textContent)).toEqual(["Teams", "Homes"]);
    expect(tabs[0].getAttribute("aria-selected")).toBe("true");
    expect(tabs[1].getAttribute("aria-selected")).toBe("false");
    expect(screen.queryByRole("heading", { name: "Home" })).toBeNull();
    // The only buttons are the tabs: every plan CTA is a link.
    expect(container.querySelectorAll("button")).toHaveLength(2);
    expectSectionBasics(container);
  });

  it("gives each plan a link CTA named for its plan, and its detail links", () => {
    const { container } = renderPlans();
    for (const name of ["Starter", "Team"]) {
      const cta = screen.getByRole("link", { name: `Join the waitlist for ${name}` });
      expect(cta.tagName).toBe("A");
      expect(cta.getAttribute("href")).toBe("/talk-to-sales");
    }
    expectCtaLinks(container, [{ label: "Starter details", href: "/managed-it" }]);
  });

  it("shows the price, the footnote and the notes as visible text, the asterisk hidden from speech", () => {
    const { container } = renderPlans();
    expect(screen.getAllByText("$10")).toHaveLength(2);
    expect(screen.getByText(PLANS_TABS[0].footnote!)).toBeTruthy();
    expect(screen.getByText("A user is a person with an email account.")).toBeTruthy();
    const marks = Array.from(container.querySelectorAll('[aria-hidden="true"]')).filter(
      (el) => el.textContent === "*"
    );
    expect(marks).toHaveLength(2);
  });

  it("reports a new tab from the keyboard and from a click", async () => {
    const user = userEvent.setup();
    const { onValueChange } = renderPlans();
    await user.tab();
    expect(document.activeElement).toBe(screen.getByRole("tab", { name: "Teams" }));
    await user.keyboard("{ArrowRight}");
    expect(onValueChange).toHaveBeenLastCalledWith("homes");

    onValueChange.mockClear();
    cleanup();
    const second = renderPlans();
    await user.click(screen.getByRole("tab", { name: "Homes" }));
    expect(second.onValueChange).toHaveBeenLastCalledWith("homes");
  });

  it("renders the tab it is given, with that tab's note", () => {
    const { container } = renderPlans("homes");
    expect(screen.getByRole("heading", { level: 3 }).textContent).toBe("Home");
    expect(screen.getByText("How home pricing works:")).toBeTruthy();
    expect(screen.getByRole("tab", { name: "Homes" }).getAttribute("aria-selected")).toBe("true");
    expect(container.querySelector(".max-w-md")).not.toBeNull();
    expectSectionBasics(container);
  });
});

describe("PricingComparison", () => {
  it("renders an h2, a table named by it and an h3 per category", () => {
    const { container } = render(<PricingComparison {...COMPARISON_CONTENT} />);
    expect(headingLevels(container)).toEqual([2, 3, 3]);
    expect(screen.getByRole("table", { name: "Compare options" })).toBeTruthy();
    expect(screen.getAllByRole("columnheader").map((th) => th.textContent)).toEqual([
      "Feature",
      "Starter",
      "Team",
    ]);
    expect(container.querySelectorAll("button, a")).toHaveLength(0);
    expectSectionBasics(container);
  });

  it("gives each feature a row header with its visible description and one value per plan", () => {
    render(<PricingComparison {...COMPARISON_CONTENT} />);
    const rowHeaders = screen.getAllByRole("rowheader");
    expect(rowHeaders.map((rh) => rh.textContent)).toEqual([
      "Remote help Help by phone and screen share.",
      "On-site visits",
      "Device updates",
    ]);
    const valuesFor = (feature: string) =>
      within(screen.getByRole("rowheader", { name: new RegExp(`^${feature}`) }).parentElement!)
        .getAllByRole("cell")
        .map((cell) => cell.textContent);
    expect(valuesFor("Remote help")).toEqual(["Included", "Included"]);
    expect(valuesFor("On-site visits")).toEqual(["Not included", "Included"]);
    expect(valuesFor("Device updates")).toEqual(["Billable", "Included"]);
  });

  it("hides the check and cross icons from speech and sets the column count", () => {
    const { container } = render(
      <PricingComparison {...COMPARISON_CONTENT} plans={["Starter", "Team", "Office", "Group"]} />
    );
    container.querySelectorAll("svg").forEach((svg) => {
      expect(svg.getAttribute("aria-hidden")).toBe("true");
    });
    expect(container.querySelector(".grid-cols-4")).not.toBeNull();
  });
});

describe("PricingOffer", () => {
  it("renders an h2, an h3 per point, the price as text and one link CTA", () => {
    const { container } = render(<PricingOffer {...OFFER_CONTENT} />);
    expect(headingLevels(container)).toEqual([2, 3, 3]);
    expect(screen.getByText("$50").tagName).toBe("SPAN");
    expect(screen.getByText("Sold in 5-hour blocks")).toBeTruthy();
    expect(screen.getByText("Subject to the Terms of Service.")).toBeTruthy();
    expectCtaLinks(container, [WAITLIST]);
    expect(container.querySelectorAll("button")).toHaveLength(0);
    expectSectionBasics(container);
  });
});

describe("section schemes", () => {
  const SECTIONS: Record<string, (scheme?: SectionScheme) => React.ReactElement> = {
    PageHeader: (scheme) => (
      <PageHeader
        heading="Technology support for your business"
        description="We look after your computers."
        ctas={[TALK, PRICING]}
        scheme={scheme}
      />
    ),
    SplitFeature: (scheme) => (
      <SplitFeature heading="How we work with you" body="We agree the next step." scheme={scheme} />
    ),
    FeatureGrid: (scheme) => (
      <FeatureGrid
        heading="Support that fits your team"
        items={[{ icon: Laptop, heading: "Devices", text: "Laptops and phones set up." }]}
        scheme={scheme}
      />
    ),
    CTASection: (scheme) => (
      <CTASection
        heading="Ready to talk?"
        text="Tell us about your setup."
        ctas={[TALK]}
        scheme={scheme}
      />
    ),
    FAQSection: (scheme) => (
      <FAQSection
        heading="Questions"
        items={[{ question: "How do I ask for help?", answer: "Use the support page." }]}
        scheme={scheme}
      />
    ),
    PricingPlans: (scheme) => (
      <PricingPlans
        heading="Plans and rates"
        tabsLabel="Who the plans are for"
        tabs={PLANS_TABS}
        value="teams"
        onValueChange={() => {}}
        scheme={scheme}
      />
    ),
    PricingComparison: (scheme) => <PricingComparison {...COMPARISON_CONTENT} scheme={scheme} />,
    PricingOffer: (scheme) => <PricingOffer {...OFFER_CONTENT} scheme={scheme} />,
  };

  // Light is the :root default and needs no class. Dark is scheme-oxford, not
  // Tailwind's built-in dark scheme utility, which also sets color-scheme.
  const EXPECTED: Record<SectionScheme, string[]> = {
    light: [],
    cream: ["scheme-cream"],
    dark: ["scheme-oxford"],
  };

  function schemeClasses(root: HTMLElement) {
    const section = root.querySelector("section");
    expect(section?.classList.contains("bg-scheme-background")).toBe(true);
    return Array.from(section?.classList ?? []).filter((c) => c.startsWith("scheme-"));
  }

  for (const [name, renderSection] of Object.entries(SECTIONS)) {
    it(`${name} defaults to the light scheme`, () => {
      const { container } = render(renderSection());
      expect(schemeClasses(container)).toEqual([]);
    });

    for (const scheme of ["light", "cream", "dark"] as const) {
      it(`${name} applies the ${scheme} scheme`, () => {
        const { container } = render(renderSection(scheme));
        expect(schemeClasses(container)).toEqual(EXPECTED[scheme]);
        expectSectionBasics(container);
      });
    }
  }
});

describe("FAQSection", () => {
  const items = [
    {
      question: "How do I ask for help?",
      answer: "Use the support page and tell us what happened.",
    },
    { question: "Can I talk to someone first?", answer: "Yes. Book a call from the contact page." },
  ];

  it("renders an h2 and each question as a button inside an h3", () => {
    const { container } = render(<FAQSection heading="Questions" items={items} />);
    expect(headingLevels(container)).toEqual([2, 3, 3]);
    const triggers = screen.getAllByRole("button");
    expect(triggers).toHaveLength(items.length);
    triggers.forEach((trigger, index) => {
      expect(trigger.tagName).toBe("BUTTON");
      // type="button": the trigger toggles in place and never submits or navigates.
      expect(trigger.getAttribute("type")).toBe("button");
      expect(trigger.getAttribute("aria-expanded")).toBe("false");
      expect(trigger.closest("h3")?.textContent).toBe(items[index].question);
    });
    expect(container.querySelector("a")).toBeNull();
    expectSectionBasics(container);
  });

  it("sets each question in text-medium in place of the primitive's text-sm", () => {
    // The primitives merge classes with the cn in src/components/ui/utils.ts.
    // Unless that cn knows the type ramp, both classes stay and text-sm wins.
    render(<FAQSection heading="Questions" items={items} />);
    for (const trigger of screen.getAllByRole("button")) {
      const classes = trigger.className.split(" ");
      expect(classes).toContain("text-medium");
      expect(classes).not.toContain("text-sm");
    }
  });

  it("opens and closes a question from the keyboard", async () => {
    const user = userEvent.setup();
    render(<FAQSection heading="Questions" items={items} />);
    const first = screen.getByRole("button", { name: items[0].question });

    await user.tab();
    expect(document.activeElement).toBe(first);
    await user.keyboard("{Enter}");
    expect(first.getAttribute("aria-expanded")).toBe("true");
    expect(screen.getByText(items[0].answer)).toBeTruthy();

    await user.keyboard(" ");
    expect(first.getAttribute("aria-expanded")).toBe("false");

    await user.tab();
    const second = screen.getByRole("button", { name: items[1].question });
    expect(document.activeElement).toBe(second);
  });
});

describe("prop types", () => {
  // Checked by tsc in `npm run check`: each @ts-expect-error fails the build if
  // the type stops rejecting the value under it.
  it("reject a third CTA, a centered header with an image and an image without alt", () => {
    const tooManyCtas: CTASectionProps = {
      heading: "Ready to talk?",
      text: "Tell us about your setup.",
      // @ts-expect-error a section carries at most two CTAs
      ctas: [TALK, PRICING, TALK],
    };
    // @ts-expect-error header62 has no image column
    const centeredWithImage: PageHeaderProps = {
      heading: "Heading",
      description: "Description",
      align: "center",
      image: { src: "/og-image.jpg", alt: "Alt", width: 1, height: 1 },
    };
    const imageWithoutAlt: PageHeaderProps = {
      heading: "Heading",
      description: "Description",
      // @ts-expect-error an image must say what it shows
      image: { src: "/og-image.jpg", width: 1, height: 1 },
    };
    expect([tooManyCtas, centeredWithImage, imageWithoutAlt]).toHaveLength(3);
  });
});
