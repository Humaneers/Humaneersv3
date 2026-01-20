"use client";

import dynamic from "next/dynamic";

const ContactModal = dynamic(() => import("./ContactModal").then((mod) => mod.ContactModal), {
  ssr: false,
});

export function ContactModalWrapper() {
  return <ContactModal />;
}
