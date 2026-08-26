import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import StarRating from "./StarRating.jsx";

// Light "existing card style" — .glass-light (subtle warm cream/off-white,
// soft shadow, thin border) is the same treatment used by every other card
// on the site's light sections (Fleet, Destinations, FAQ). Deliberately
// NOT .glass-navbar/.glass-dark here — this section should read as light
// and airy, not the navbar's dark glass.
function ReviewCard({ review }) {
  return (
    <blockquote className="glass-card glass-light mx-auto max-w-2xl p-7 sm:p-9">
      <StarRating rating={review.rating} />
      <p className="mt-4 font-display text-base italic leading-relaxed text-ink/90 sm:text-lg">
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

const ARROW_BTN_CLASS =
  "flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-gold-dark/30 text-ink transition-colors duration-200 hover:bg-gold/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/50";

/**
 * Single-card carousel — one review shown at a time, centered, with
 * circular prev/next arrows either side of the card and dot indicators
 * below to jump directly to any review. Replaces the old 3-column grid +
 * "View More" toggle.
 */
export default function ReviewsSection({ reviews }) {
  const [index, setIndex] = useState(0);

  const goTo = (i) => setIndex((i + reviews.length) % reviews.length);
  const prev = () => goTo(index - 1);
  const next = () => goTo(index + 1);

  return (
    <div className="mx-auto max-w-3xl">
      <div className="flex items-center gap-4 sm:gap-6">
        <button
          type="button"
          onClick={prev}
          aria-label="Previous review"
          className={`hidden sm:flex ${ARROW_BTN_CLASS}`}
        >
          <ChevronLeft className="h-5 w-5" aria-hidden="true" />
        </button>

        <div key={index} className="min-w-0 flex-1 animate-fade-slide-up">
          <ReviewCard review={reviews[index]} />
        </div>

        <button
          type="button"
          onClick={next}
          aria-label="Next review"
          className={`hidden sm:flex ${ARROW_BTN_CLASS}`}
        >
          <ChevronRight className="h-5 w-5" aria-hidden="true" />
        </button>
      </div>

      {/* Arrows move below the card on mobile instead of squeezing it narrower */}
      <div className="mt-6 flex items-center justify-center gap-6 sm:hidden">
        <button type="button" onClick={prev} aria-label="Previous review" className={ARROW_BTN_CLASS}>
          <ChevronLeft className="h-5 w-5" aria-hidden="true" />
        </button>
        <button type="button" onClick={next} aria-label="Next review" className={ARROW_BTN_CLASS}>
          <ChevronRight className="h-5 w-5" aria-hidden="true" />
        </button>
      </div>

      <div className="mt-6 flex justify-center gap-2">
        {reviews.map((review, i) => (
          <button
            key={review.name}
            type="button"
            onClick={() => goTo(i)}
            aria-label={`Go to review ${i + 1} of ${reviews.length}`}
            aria-current={i === index}
            className={`h-2 rounded-full transition-all duration-300 ${
              i === index ? "w-6 bg-gold-dark" : "w-2 bg-gold-dark/30 hover:bg-gold-dark/50"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
