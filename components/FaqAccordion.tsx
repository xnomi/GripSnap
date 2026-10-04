'use client';

import { useState } from 'react';

export interface FaqItem {
  question: string;
  answer: string;
}

export default function FaqAccordion({ items }: { items: FaqItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <div className="space-y-3">
      {items.map((item, idx) => {
        const isOpen = openIndex === idx;
        return (
          <div
            key={idx}
            className="border border-border rounded-xl bg-surface2/40 overflow-hidden transition-all"
          >
            <button
              type="button"
              onClick={() => toggle(idx)}
              className="w-full py-4 px-5 text-left flex items-center justify-between gap-4 font-semibold text-white hover:text-emerald-400 transition-colors"
              aria-expanded={isOpen}
            >
              <span className="text-base sm:text-lg">{item.question}</span>
              <span
                className={`w-6 h-6 rounded-full bg-surface flex items-center justify-center text-muted shrink-0 transition-transform ${
                  isOpen ? 'rotate-180 text-emerald-400 bg-emerald-500/10' : ''
                }`}
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </span>
            </button>
            {isOpen && (
              <div className="px-5 pb-5 pt-1 text-sm sm:text-base text-muted leading-relaxed border-t border-border/40">
                {item.answer}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
