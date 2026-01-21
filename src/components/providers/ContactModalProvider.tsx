"use client";

import { createContext, useContext, useState, ReactNode } from "react";

type ModalTab = "sales" | "support" | "newsletter" | "general";

interface ContactModalContextType {
  isOpen: boolean;
  activeTab: ModalTab;
  prefillMessage: string;
  source: string;
  openModal: (tab?: ModalTab, message?: string, source?: string) => void;
  closeModal: () => void;
}

const ContactModalContext = createContext<ContactModalContextType | undefined>(undefined);

export function ContactModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<ModalTab>("sales");
  const [prefillMessage, setPrefillMessage] = useState("");
  const [source, setSource] = useState("ContactModal");

  const openModal = (tab: ModalTab = "sales", message: string = "", source: string = "ContactModal") => {
    setActiveTab(tab);
    setPrefillMessage(message);
    setSource(source);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setPrefillMessage("");
    setSource("ContactModal");
  };

  return (
    <ContactModalContext.Provider
      value={{ isOpen, activeTab, prefillMessage, source, openModal, closeModal }}
    >
      {children}
    </ContactModalContext.Provider>
  );
}

export function useContactModal() {
  const context = useContext(ContactModalContext);
  if (context === undefined) {
    throw new Error("useContactModal must be used within a ContactModalProvider");
  }
  return context;
}
