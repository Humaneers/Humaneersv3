"use client";

import { createContext, useContext, useState, ReactNode } from "react";

type ModalTab = "sales" | "support" | "newsletter" | "general";

interface ContactModalContextType {
  isOpen: boolean;
  activeTab: ModalTab;
  openModal: (tab?: ModalTab) => void;
  closeModal: () => void;
}

const ContactModalContext = createContext<ContactModalContextType | undefined>(undefined);

export function ContactModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<ModalTab>("sales");

  const openModal = (tab: ModalTab = "sales") => {
    setActiveTab(tab);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <ContactModalContext.Provider value={{ isOpen, activeTab, openModal, closeModal }}>
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
