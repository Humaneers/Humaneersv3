// claims-guard-allow-file: relume-default-content this test lists Relume's placeholder strings to prove no section renders them
import { afterEach, describe, expect, it, vi } from "vitest";
import { cleanup, render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Laptop, LifeBuoy, Mail, Phone, ShieldCheck } from "lucide-react";

import { ActionCards, type ActionCardsProps } from "./ActionCards";
import { ContactSection, type ContactItem } from "./ContactSection";
import { CTASection, type CTASectionProps } from "./CTASection";
import { FormSection } from "./FormSection";
import { FAQSection } from "./FAQSection";
import { FeatureGrid, type FeatureGridProps } from "./FeatureGrid";
import { PageHeader, type PageHeaderProps } from "./PageHeader";
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
    // A route, or a phone or email channel (ContactSection, FormSection).
    expect(link.getAttribute("href")).toMatch(/^(\/|tel:|mailto:)/);
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

// Sections added in cut 4: ContactSection (contact19), ActionCards (layout364)
// and FormSection (contact5).

const CALL = { label: "(928) 440-1505", href: "tel:+19284401505" } as const;
const HELLO = { label: "hello@humaneers.dev", href: "mailto:hello@humaneers.dev" } as const;

function sectionSchemeClasses(root: HTMLElement) {
  const section = root.querySelector("section");
  expect(section?.classList.contains("bg-scheme-background")).toBe(true);
  return Array.from(section?.classList ?? []).filter((c) => c.startsWith("scheme-"));
}

describe("ContactSection", () => {
  const items: ContactItem[] = [
    {
      icon: Mail,
      heading: "Email",
      text: "For general questions, email us directly.",
      link: HELLO,
    },
    { icon: Phone, heading: "Phone", link: CALL },
    { icon: LifeBuoy, heading: "Office", text: "Tempe, Arizona" },
  ];

  it("renders an h2, an h3 per item, decorative icons and underlined channel links", () => {
    const { container } = render(
      <ContactSection
        eyebrow="Contact"
        heading="Get in touch"
        description="Pick the channel that suits you."
        items={items}
      />
    );
    expect(headingLevels(container)).toEqual([2, 3, 3, 3]);
    expect(screen.getByText("Contact").tagName).toBe("P");
    expect(screen.getByText("Pick the channel that suits you.")).toBeTruthy();
    container
      .querySelectorAll("svg")
      .forEach((svg) => expect(svg.getAttribute("aria-hidden")).toBe("true"));
    for (const channel of [CALL, HELLO]) {
      const link = screen.getByRole("link", { name: channel.label });
      expect(link.getAttribute("href")).toBe(channel.href);
      expect(link.className).toContain("underline");
    }
    // The office has text and no link.
    expect(container.querySelectorAll("a")).toHaveLength(2);
    expect(container.querySelectorAll("button")).toHaveLength(0);
    expect(container.querySelector(".md\\:grid-cols-3")).not.toBeNull();
    expectSectionBasics(container);
  });

  it("leaves out the eyebrow and description when none is given and sets two columns", () => {
    const { container } = render(
      <ContactSection heading="Reach us directly" items={items.slice(0, 2)} columns={2} />
    );
    expect(headingLevels(container)).toEqual([2, 3, 3]);
    expect(container.querySelectorAll("p.text-scheme-accent")).toHaveLength(0);
    expect(container.querySelector(".md\\:grid-cols-2")).not.toBeNull();
    expectSectionBasics(container);
  });
});

describe("ActionCards", () => {
  it("renders an h2, an h3 per card, a route action as a link and an in-page action as a button", async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    const cards: ActionCardsProps["cards"] = [
      {
        icon: LifeBuoy,
        heading: "Existing clients",
        text: "Send us a maintenance request.",
        action: { label: "Open a request", onClick },
      },
      {
        icon: Laptop,
        heading: "New clients",
        text: "Tell us about your setup.",
        action: TALK,
      },
    ];
    const { container } = render(
      <ActionCards
        heading="How can we help?"
        description="Pick the path that fits."
        cards={cards}
      />
    );
    expect(headingLevels(container)).toEqual([2, 3, 3]);
    expectCtaLinks(container, [TALK]);

    const button = screen.getByRole("button", { name: "Open a request" });
    expect(button.tagName).toBe("BUTTON");
    // type="button": the action runs in place and never submits a surrounding form.
    expect(button.getAttribute("type")).toBe("button");
    await user.click(button);
    expect(onClick).toHaveBeenCalledTimes(1);

    container
      .querySelectorAll("svg")
      .forEach((svg) => expect(svg.getAttribute("aria-hidden")).toBe("true"));
    expectSectionBasics(container);
  });
});

describe("FormSection", () => {
  it("renders an h2, the icon rows and the form it is given, untouched", () => {
    const { container } = render(
      <FormSection
        eyebrow="Waitlist"
        heading="Join the waitlist"
        description="A person reads every entry."
        details={[
          { icon: Phone, label: CALL.label, href: CALL.href },
          { icon: ShieldCheck, label: "US-based team" },
        ]}
      >
        <form aria-label="Waitlist">
          <label htmlFor="test-email">Email</label>
          <input id="test-email" name="email" />
          <button type="submit">Join</button>
        </form>
      </FormSection>
    );
    expect(headingLevels(container)).toEqual([2]);
    expect(screen.getByText("Waitlist", { selector: "p" })).toBeTruthy();
    const call = screen.getByRole("link", { name: CALL.label });
    expect(call.getAttribute("href")).toBe(CALL.href);
    expect(call.className).toContain("underline");
    expect(screen.getByText("US-based team").closest("a")).toBeNull();
    expect(screen.getAllByRole("listitem")).toHaveLength(2);

    const form = screen.getByRole("form", { name: "Waitlist" });
    expect(within(form).getByLabelText("Email").getAttribute("name")).toBe("email");
    expect(within(form).getByRole("button", { name: "Join" }).getAttribute("type")).toBe("submit");
    expectSectionBasics(container);
  });

  it("renders without details", () => {
    const { container } = render(
      <FormSection heading="Join the waitlist" description="A person reads every entry.">
        <p>Form</p>
      </FormSection>
    );
    expect(container.querySelector("ul")).toBeNull();
    expect(headingLevels(container)).toEqual([2]);
  });
});

describe("cut 4 section schemes", () => {
  const SECTIONS: Record<string, (scheme?: SectionScheme) => React.ReactElement> = {
    ContactSection: (scheme) => (
      <ContactSection
        heading="Get in touch"
        items={[{ icon: Phone, heading: "Phone", link: CALL }]}
        scheme={scheme}
      />
    ),
    ActionCards: (scheme) => (
      <ActionCards
        heading="How can we help?"
        cards={[{ icon: Laptop, heading: "New clients", text: "Tell us.", action: TALK }]}
        scheme={scheme}
      />
    ),
    FormSection: (scheme) => (
      <FormSection heading="Join the waitlist" description="A person reads it." scheme={scheme}>
        <p>Form</p>
      </FormSection>
    ),
  };

  const EXPECTED: Record<SectionScheme, string[]> = {
    light: [],
    cream: ["scheme-cream"],
    dark: ["scheme-oxford"],
  };

  for (const [name, renderSection] of Object.entries(SECTIONS)) {
    it(`${name} defaults to the light scheme`, () => {
      const { container } = render(renderSection());
      expect(sectionSchemeClasses(container)).toEqual([]);
    });

    for (const scheme of ["light", "cream", "dark"] as const) {
      it(`${name} applies the ${scheme} scheme`, () => {
        const { container } = render(renderSection(scheme));
        expect(sectionSchemeClasses(container)).toEqual(EXPECTED[scheme]);
        expectSectionBasics(container);
      });
    }
  }
});

describe("cut 4 prop types", () => {
  it("reject a route as a contact channel and a card with no action", () => {
    const routeAsChannel: ContactItem = {
      icon: Phone,
      heading: "Phone",
      // @ts-expect-error a contact link is a tel: or mailto: channel, not a route
      link: { label: "Contact", href: "/contact" },
    };
    const cardWithoutAction: ActionCardsProps["cards"][number] = {
      icon: Laptop,
      heading: "New clients",
      text: "Tell us.",
      // @ts-expect-error every card carries one action
      action: undefined,
    };
    expect([routeAsChannel, cardWithoutAction]).toHaveLength(2);
  });
});
