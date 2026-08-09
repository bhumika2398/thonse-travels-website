import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Hero from "../components/Hero.jsx";
import RideCard from "../components/RideCard.jsx";
import ExperienceUdupi from "../components/ExperienceUdupi.jsx";
import DestinationCard from "../components/DestinationCard.jsx";
import WhyChooseUs from "../components/WhyChooseUs.jsx";
import ReviewsSection from "../components/ReviewsSection.jsx";
import FAQSection from "../components/FAQSection.jsx";
import Reveal from "../components/Reveal.jsx";
import useDocumentMeta from "../hooks/useDocumentMeta.js";
import { fetchFleet } from "../api/client.js";
import { destinations } from "../data/destinations.js";
import { testimonials } from "../data/testimonials.js";
import { faqs } from "../data/faq.js";
import { siteInfo } from "../data/siteInfo.js";
import { airportService } from "../data/services.js";

export default function Home() {
  useDocumentMeta(
    "Thonse Tours and Travels | Udupi Car Rentals — Swift Dzire, Ertiga & Airport Transfers",
    "Thonse Tours and Travels is a trusted Udupi travel agency offering car rental in Udupi — Swift Dzire & Ertiga rental Udupi, plus reliable Udupi airport taxi transfers. Call Mukthar Ahmed at 8880954175."
  );

  const [fleet, setFleet] = useState([]);
  const [fleetError, setFleetError] = useState(false);

  useEffect(() => {
    fetchFleet()
      .then(setFleet)
      .catch(() => setFleetError(true));
  }, []);

  // Airport Pickup & Drop is a service, not a vehicle, but it renders
  // through the same RideCard so all three sit in one row of equal cards.
  const cards = fleet.length ? [...fleet, airportService] : [];

  return (
    <>
      <Hero />

      {/* FLEET + AIRPORT SERVICE — one row of three equal cards */}
      <section className="section-glow bg-cream section-pad">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <Reveal className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <p className="section-eyebrow">Our Fleet</p>
              <h2 className="section-title">Swift Dzire, Ertiga & Airport Transfers</h2>
              <p className="section-sub">
                Every ride is maintained to a five-star standard and driven by {siteInfo.owner}'s
                verified local team.
              </p>
            </div>
            <Link to="/rides" className="btn-outline !text-ink !border-gold-dark/50 hover:!bg-gold/10 shrink-0">
              View Full Fleet
            </Link>
          </Reveal>

          <div className="mt-14 grid gap-8 md:grid-cols-3">
            {fleetError && (
              <p className="text-sm text-[#b3483f]">
                Couldn't load the fleet right now. Please call {siteInfo.phoneDisplay}.
              </p>
            )}
            {cards.map((vehicle, i) => (
              <Reveal key={vehicle.slug || vehicle.name} delay={i * 120}>
                <RideCard vehicle={vehicle} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <WhyChooseUs />

      <ExperienceUdupi />

      {/* DESTINATIONS — the site's main visual showcase */}
      <section className="section-glow bg-cream section-pad">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <Reveal>
            <p className="section-eyebrow">The Udupi Coast</p>
            <h2 className="section-title">Destinations</h2>
            <p className="section-sub">
              Beaches, backwaters, and temple towns — everywhere our guests ask to go.
            </p>
          </Reveal>

          <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {destinations.map((destination, i) => (
              <Reveal key={destination.slug} delay={i * 90}>
                <DestinationCard destination={destination} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ — centered text/list layout, distinct from the grid sections */}
      <section className="bg-cream-dim section-pad">
        <div className="mx-auto max-w-5xl px-5 sm:px-8">
          <Reveal className="text-center">
            <p className="section-eyebrow">Questions</p>
            <h2 className="section-title">Frequently Asked</h2>
            <p className="section-sub mx-auto">
              Everything travelers usually ask us, answered up front.
            </p>
          </Reveal>

          <div className="mt-14">
            <FAQSection faqs={faqs} />
          </div>
        </div>
      </section>

      {/* REVIEWS */}
      <section className="section-glow bg-cream section-pad">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <Reveal>
            <p className="section-eyebrow">Guest Stories</p>
            <h2 className="section-title">What Our Travelers Say</h2>
          </Reveal>
          <div className="mt-14">
            <ReviewsSection reviews={testimonials} />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gold-gradient py-20">
        <div className="mx-auto flex max-w-5xl flex-col items-center gap-6 px-5 text-center sm:px-8">
          <h2 className="font-display text-3xl font-semibold text-charcoal sm:text-4xl">
            Ready to hit the coast?
          </h2>
          <p className="max-w-xl text-charcoal/80">
            Call {siteInfo.owner} directly or send a quick enquiry — we'll have your ride
            confirmed within minutes.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <a
              href={siteInfo.callLink}
              className="rounded-full bg-charcoal px-7 py-3.5 font-semibold text-cream shadow-glass-lg transition-transform hover:-translate-y-0.5"
            >
              Call {siteInfo.phoneDisplay}
            </a>
            <Link
              to="/contact"
              className="rounded-full border border-charcoal/40 px-7 py-3.5 font-semibold text-charcoal transition-transform hover:-translate-y-0.5 hover:bg-charcoal/10"
            >
              Book Online
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
