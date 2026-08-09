import { useState } from "react";

function FAQItem({ faq, isOpen, onToggle }) {
  return (
    <div className="glass-card overflow-hidden">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
      >
        <span className="font-display text-base font-semibold text-ink sm:text-lg">
          {faq.question}
        </span>
        <span
          className={`shrink-0 text-xl text-gold-dark transition-transform duration-300 ${
            isOpen ? "rotate-45" : ""
          }`}
          aria-hidden="true"
        >
          +
        </span>
      </button>

      <div
        className={`grid transition-[grid-template-rows] duration-500 ease-out ${
          isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div className="overflow-hidden">
          <p className="px-6 pb-5 text-sm leading-relaxed text-ink/70">{faq.answer}</p>
        </div>
      </div>
    </div>
  );
}

/**
 * Accordion — collapsed by default, click a question to expand it (one
 * open at a time). Glass-card styling matches every other card on the
 * site.
 */
export default function FAQSection({ faqs }) {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <div className="mx-auto flex max-w-3xl flex-col gap-4">
      {faqs.map((faq, i) => (
        <FAQItem
          key={faq.question}
          faq={faq}
          isOpen={openIndex === i}
          onToggle={() => setOpenIndex((prev) => (prev === i ? null : i))}
        />
      ))}
    </div>
  );
}
