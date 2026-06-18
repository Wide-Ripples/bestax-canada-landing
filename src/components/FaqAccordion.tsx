"use client";

import { useState } from "react";
import type { FaqItem } from "@/lib/schema";

export default function FaqAccordion({ faqs }: { faqs: FaqItem[] }) {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <div className="border-t border-gray-200">
      {faqs.map((faq, i) => (
        <div key={i} className={`border-b border-gray-200 transition-colors ${open === i ? "bg-[#FFF9F5]" : ""}`}>
          <button
            onClick={() => setOpen(open === i ? null : i)}
            className="w-full flex items-center justify-between px-6 py-6 text-left gap-6"
            aria-expanded={open === i}
          >
            <span className="text-[17px] sm:text-lg font-bold text-[#1a1a1a] leading-snug">
              {faq.q}
            </span>
            <span
              className={`shrink-0 w-9 h-9 rounded-full flex items-center justify-center text-white text-xl font-bold leading-none transition-colors ${
                open === i ? "bg-[#E84319]" : "bg-[#1a1a1a]"
              }`}
            >
              {open === i ? "−" : "+"}
            </span>
          </button>
          {open === i && (
            <div className="px-6 pb-7 text-gray-600 text-[15px] sm:text-base leading-relaxed">
              {faq.a}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
