import PageHeader from "../components/PageHeader.jsx";
import DestinationCard from "../components/DestinationCard.jsx";
import Reveal from "../components/Reveal.jsx";
import useDocumentMeta from "../hooks/useDocumentMeta.js";
import { destinations } from "../data/destinations.js";

export default function Destinations() {
  useDocumentMeta(
    "Udupi Destinations | Beaches, Backwaters & Temples — Thonse Tours and Travels",
    "Explore Udupi's best destinations with Thonse Tours and Travels: St. Mary's Island, Malpe Beach, Kaup Lighthouse, Sri Krishna Matha, Murdeshwar, and Padubidri Beach — all with a professional driver."
  );

  return (
    <>
      <PageHeader
        eyebrow="Curated Journeys"
        title="Udupi's Best, One Ride Away"
        subtitle="Beaches, backwaters, and temple towns — every destination our guests ask us to drive them to, planned, driven, and guided end to end."
        image="st-mary-beach.jpg"
        imageAlt="St. Mary's Island Udupi rock formations at sunset"
      />

      <section className="section-glow-destinations section-pad">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {destinations.map((destination, i) => (
              <Reveal key={destination.slug} delay={i * 90}>
                <DestinationCard destination={destination} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
