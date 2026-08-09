import { useState } from "react";
import StarRating from "./StarRating.jsx";
import Reveal from "./Reveal.jsx";

function ReviewCard({ review }) {
  return (
    <blockquote className="glass-card glass-light h-full p-7">
      <StarRating rating={review.rating} />
      <p className="mt-4 font-display text-base italic leading-relaxed text-ink/90">
        “{review.quote}”
      </p>
      <footer className="mt-5 flex items-center gap-3 border-t border-gold/20 pt-4">
        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gold-gradient font-display font-semibold text-charcoal">
          {review.name.charAt(0)}
        </span>
        <div>
          <p className="text-sm font-semibold text-ink">{review.name}</p>
          <p className="text-xs uppercase tracking-wider text-gold-dark">{review.location}</p>
        </div>
      </footer>
    </blockquote>
  );
}

/**
 * Shows the first 3 reviews; "View More Reviews" reveals the rest with a
 * fade/slide-down transition via a CSS grid-template-rows trick (no JS
 * height measuring needed), then the button becomes "Show Less".
 */
export default function ReviewsSection({ reviews }) {
  const [showAll, setShowAll] = useState(false);
  const primary = reviews.slice(0, 3);
  const extra = reviews.slice(3);

  return (
    <div>
      <div className="grid gap-6 sm:grid-cols-3">
        {primary.map((review, i) => (
          <Reveal key={review.name} delay={i * 100}>
            <ReviewCard review={review} />
          </Reveal>
        ))}
      </div>

      {extra.length > 0 && (
        <div
          className={`grid transition-[grid-template-rows] duration-700 ease-out ${
            showAll ? "mt-6 grid-rows-[1fr]" : "grid-rows-[0fr]"
          }`}
        >
          <div className="overflow-hidden">
            <div
              className={`grid gap-6 sm:grid-cols-3 transition-opacity duration-500 ${
                showAll ? "opacity-100 delay-200" : "opacity-0"
              }`}
            >
              {extra.map((review) => (
                <ReviewCard key={review.name} review={review} />
              ))}
            </div>
          </div>
        </div>
      )}

      {extra.length > 0 && (
        <div className="mt-10 flex justify-center">
          <button
            type="button"
            onClick={() => setShowAll((v) => !v)}
            className="btn-outline !text-ink !border-gold-dark/50 hover:!bg-gold/10"
          >
            {showAll ? "Show Less" : "View More Reviews"}
          </button>
        </div>
      )}
    </div>
  );
}
