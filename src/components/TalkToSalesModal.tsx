"use client";

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "./ui/dialog";
import { EmailActionButton } from "./ui/email-action-button";
import { ArrowRight } from "lucide-react";

interface TalkToSalesModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialData?: { email?: string; interest?: string };
}

export function TalkToSalesModal({ open, onOpenChange }: TalkToSalesModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] p-0 bg-white overflow-hidden">
        <div className="flex flex-col h-full">
          <div className="px-6 py-6 border-b border-gray-100 bg-gray-50/50">
            <DialogHeader>
              <DialogTitle className="text-xl font-bold text-brand-oxford">
                Start a Conversation
              </DialogTitle>
              <DialogDescription>
                Tell us about your organization and we'll design a custom roadmap.
              </DialogDescription>
            </DialogHeader>
          </div>

          <div className="p-12 text-center flex flex-col items-center justify-center space-y-6">
            <div className="bg-brand-cream/50 p-6 rounded-full">
              <ArrowRight className="w-12 h-12 text-brand-copper" />
            </div>

            <div className="max-w-md">
              <p className="text-brand-slate mb-8">
                Click below to open your email client and send a message directly to our sales team.
                Please include a brief description of your needs.
              </p>
              <EmailActionButton
                label="Email Sales Team"
                email="hello@humaneers.dev"
                subject="Sales Inquiry: New Client Request"
                className="w-full sm:w-auto bg-brand-copper hover:bg-brand-copper-dark"
              />
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
