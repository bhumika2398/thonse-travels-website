import { Link } from "react-router-dom";
import PageHeader from "../components/PageHeader.jsx";
import Reveal from "../components/Reveal.jsx";
import useDocumentMeta from "../hooks/useDocumentMeta.js";
import { siteInfo } from "../data/siteInfo.js";

const STATS = [
  { label: "Years on the Road", value: "10+" },
  { label: "Happy Travelers", value: "5,000+" },
  { label: "Local Destinations Covered", value: "40+" },
  { label: "Availability", value: "24×7" },
];

export default function About() {
  useDocumentMeta(
    "About Us | Udupi Travel Agency — Thonse Tours and Travels",
    "Meet Mukthar Ahmed, owner of Thonse Tours and Travels — a local Udupi travel agency offering car rental in Udupi with verified drivers, transparent pricing, and 24x7 support."
  );

  return (
    <>
      <PageHeader
        eyebrow="Our Story"
        title="Rooted in Udupi, Built on Trust"
        subtitle="A local operation, run by a local family, for travelers who want the coast shown to them properly."
        image="udupi-beach1.jpg"
        imageAlt="Udupi coastline"
      />

      <section className="section-glow-light section-pad">
        <div className="mx-auto grid max-w-7xl gap-14 px-5 sm:px-8 lg:grid-cols-2 lg:items-center">
          <Reveal>
            <div className="relative overflow-hidden rounded-3xl shadow-glass-lg">
              <img
                src="/images/gallery-krishna-matha-day.jpg"
                alt="Sri Krishna Matha temple Udupi by day"
                loading="lazy"
                className="h-[28rem] w-full object-cover"
              />
              <div className="absolute inset-0 border border-gold/20 rounded-3xl" />
            </div>
          </Reveal>

          <Reveal delay={150}>
            <p className="section-eyebrow">Meet the Owner</p>
            <h2 className="section-title">{siteInfo.owner}</h2>
            <p className="mt-5 text-base leading-relaxed text-ink/70">
              Thonse Tours and Travels was founded on a simple idea: a ride through coastal
              Karnataka should feel as good as the destination itself. Based out of Udupi,
              {" " + siteInfo.owner} personally oversees every vehicle, every driver, and every
              itinerary that leaves the yard.
            </p>
            <p className="mt-4 text-base leading-relaxed text-ink/70">
              What started as a single sedan ferrying pilgrims to Sri Krishna Matha has grown
              into a full fleet serving beach-goers, families, and business travelers alike —
              without losing the personal touch that got us here.
            </p>

            <div className="mt-8 grid grid-cols-2 gap-6 sm:grid-cols-4">
              {STATS.map((s) => (
                <div key={s.label} className="glass-card glass-light rounded-2xl px-4 py-5 text-center">
                  <p className="font-display text-2xl font-semibold text-gold-dark">{s.value}</p>
                  <p className="mt-1 text-xs uppercase tracking-wide text-ink/60">{s.label}</p>
                </div>
              ))}
            </div>

            <Link to="/contact" className="btn-gold mt-8 w-fit">
              Plan Your Trip With Us
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
