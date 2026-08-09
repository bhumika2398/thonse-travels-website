import Reveal from "./Reveal.jsx";

const REASONS = [
  {
    icon: "🕐",
    title: "24/7 Round-the-Clock Support",
    description:
      "Emergency itinerary changes, delayed flights, late-night airport arrivals — we're always reachable, day or night.",
  },
  {
    icon: "🧭",
    title: "Verified Local Drivers",
    description:
      "Every driver is background-verified and doubles as a regional guide, pointing you to the best local spots along the way.",
  },
  {
    icon: "✨",
    title: "Impeccable Fleet Hygiene",
    description:
      "Every vehicle is deep-cleaned and sanitized between bookings, so you always ride in a fresh, well-maintained car.",
  },
  {
    icon: "💳",
    title: "Transparent, Fixed Pricing",
    description:
      "The fare we quote is the fare you pay — no hidden fees, no surge pricing, no last-minute surprises.",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="section-glow bg-charcoal section-pad">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal>
          <p className="section-eyebrow-light">Why Thonse</p>
          <h2 className="section-title-light">The Thonse Standard</h2>
          <p className="section-sub-light">
            Five-star hospitality applied to the open road — every detail considered, so you
            don't have to.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {REASONS.map((r, i) => (
            <Reveal key={r.title} delay={i * 100}>
              <div className="glass-card h-full p-7">
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-gold-gradient text-xl">
                  {r.icon}
                </span>
                <h3 className="mt-5 font-display text-lg font-semibold text-cream">{r.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-cream/65">{r.description}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
