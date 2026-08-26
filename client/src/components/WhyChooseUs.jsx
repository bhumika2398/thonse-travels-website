import { Clock, Compass, Sparkles, CreditCard, MapPin } from "lucide-react";
import Reveal from "./Reveal.jsx";

const REASONS = [
  {
    Icon: Clock,
    title: "24/7 Round-the-Clock Support",
    description:
      "Emergency itinerary changes, delayed flights, late-night airport arrivals — we're always reachable, day or night.",
  },
  {
    Icon: Compass,
    title: "Verified Local Drivers",
    description:
      "Every driver is background-verified and doubles as a regional guide, pointing you to the best local spots along the way.",
  },
  {
    Icon: Sparkles,
    title: "Impeccable Fleet Hygiene",
    description:
      "Every vehicle is deep-cleaned and sanitized between bookings, so you always ride in a fresh, well-maintained car.",
  },
  {
    Icon: CreditCard,
    title: "Transparent, Fixed Pricing",
    description:
      "The fare we quote is the fare you pay — no hidden fees, no surge pricing, no last-minute surprises.",
  },
  // Moved down from the Hero video overlay — trust/credibility detail
  // belongs here, in context with the rest of the reasons to book, not
  // stacked on top of the Hero's headline and search strip.
  {
    Icon: MapPin,
    title: "Live GPS Tracking",
    description:
      "Every ride is trackable in real time from pickup to drop-off, so you always know exactly where the car is.",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="section-glow-dark section-pad">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal>
          <p className="section-eyebrow-light">Why Thonse</p>
          <h2 className="section-title-light">The Thonse Standard</h2>
          <p className="section-sub-light">
            Five-star hospitality applied to the open road — every detail considered, so you
            don't have to.
          </p>
        </Reveal>

        {/* 3-column grid (was 4) — 5 cards now that Live GPS Tracking moved
            in from the Hero, and 3 columns wraps 5 items into a balanced
            3-then-2 layout instead of 4-then-1. */}
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {REASONS.map(({ Icon, title, description }, i) => (
            <Reveal key={title} delay={i * 100}>
              <div className="glass-card glass-dark h-full p-7">
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-gold-gradient">
                  <Icon className="h-6 w-6 text-charcoal" aria-hidden="true" />
                </span>
                <h3 className="mt-5 font-display text-lg font-semibold text-cream">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-cream/65">{description}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
