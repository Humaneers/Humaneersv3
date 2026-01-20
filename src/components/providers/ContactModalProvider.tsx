"use client";

import { createContext, useContext, useState, ReactNode } from "react";

type ModalTab = "sales" | "support" | "newsletter" | "general";

interface ContactModalContextType {
  isOpen: boolean;
  activeTab: ModalTab;
  prefillMessage: string;
  openModal: (tab?: ModalTab, message?: string) => void;
  closeModal: () => void;
}

const ContactModalContext = createContext<ContactModalContextType | undefined>(undefined);

export function ContactModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<ModalTab>("sales");
  const [prefillMessage, setPrefillMessage] = useState("");

  const openModal = (tab: ModalTab = "sales", message: string = "") => {
    setActiveTab(tab);
    setPrefillMessage(message);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setPrefillMessage("");
  };

  return (
    <ContactModalContext.Provider
      value={{ isOpen, activeTab, prefillMessage, openModal, closeModal }}
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
