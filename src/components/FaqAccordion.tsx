"use client";

import { useState } from "react";

const faqs = [
  {
    q: "What types of businesses do you work with?",
    a: "We work with a wide range of Canadian businesses, including service-based businesses, consultants, agencies, trades, e-commerce businesses, and growing small to mid-sized companies. Whether your operations are simple or becoming more complex, we can help keep your books organized and your finances easier to manage.",
  },
  {
    q: "Can you help if my bookkeeping is behind?",
    a: "Yes. Many businesses come to us when their books are behind, disorganized, or not being maintained consistently. We can review your current situation, help clean things up, and put a more reliable bookkeeping process in place going forward.",
  },
  {
    q: "What accounting and bookkeeping services do you provide?",
    a: "Our support can include bookkeeping, account reconciliations, financial reporting, GST/HST support, payroll support, year-end readiness, and ongoing accounting guidance. The exact scope depends on your business needs and how much support you want on a monthly basis.",
  },
  {
    q: "Do you provide monthly bookkeeping?",
    a: "Yes. We can provide ongoing monthly bookkeeping support so your records stay updated and you have a clearer view of your numbers throughout the year. This helps reduce year-end stress and gives you better visibility into how your business is performing.",
  },
  {
    q: "Do you also handle payroll?",
    a: "Yes, we can support payroll-related accounting needs for many businesses. If payroll is part of your requirements, we can discuss your current setup and determine the best process for ongoing support.",
  },
  {
    q: "What happens during the consultation?",
    a: "The consultation is a practical discussion about your business, your current bookkeeping or accounting challenges, and the type of support you may need. We will understand your situation, answer key questions, and outline possible next steps.",
  },
  {
    q: "How much do your accounting and bookkeeping services cost?",
    a: "Pricing depends on the size of your business, the condition of your books, the volume of transactions, and the scope of support required. Typically starts from $750 CAD per month, but after understanding your needs, we can recommend a suitable service package or engagement structure.",
  },
  {
    q: "How quickly can we get started?",
    a: "That depends on your current setup and how urgent the work is, but we aim to make the onboarding process smooth and efficient. Once we review your needs and agree on scope, we can guide you through the next steps to get started.",
  },
];

export default function FaqAccordion() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="space-y-2">
      {faqs.map((faq, i) => (
        <div key={i} className="border border-gray-200 rounded-xl overflow-hidden">
          <button
            onClick={() => setOpen(open === i ? null : i)}
            className="w-full flex items-center justify-between px-6 py-4 text-left font-semibold text-[#4A4A4A] hover:bg-orange-50 transition-colors"
            aria-expanded={open === i}
          >
            <span>{faq.q}</span>
            <svg
              className={`w-5 h-5 shrink-0 ml-4 text-[#F5A623] transition-transform duration-200 ${open === i ? "rotate-180" : ""}`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          {open === i && (
            <div className="px-6 pb-5 pt-3 text-[#4A4A4A] text-sm leading-relaxed border-t border-gray-100">
              {faq.a}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
