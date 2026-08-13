import { useEffect, useState } from "react";
import PageHeader from "../components/PageHeader.jsx";
import RideCard from "../components/RideCard.jsx";
import Reveal from "../components/Reveal.jsx";
import { fetchFleet } from "../api/client.js";
import { siteInfo } from "../data/siteInfo.js";
import { airportService } from "../data/services.js";
import useDocumentMeta from "../hooks/useDocumentMeta.js";

export default function Rides() {
  useDocumentMeta(
    "Our Rides | Swift Dzire & Ertiga Rental Udupi — Thonse Tours and Travels",
    "Book a Swift Dzire or Ertiga rental in Udupi with a professional driver. Transparent per-km pricing, sanitized vehicles, and 24x7 availability from Thonse Tours and Travels."
  );

  const [fleet, setFleet] = useState([]);
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    fetchFleet()
      .then((data) => {
        setFleet(data);
        setStatus("ready");
      })
      .catch(() => setStatus("error"));
  }, []);

  // Airport Pickup & Drop is a service, not a vehicle — but it's rendered
  // through the same RideCard so all three appear as one row of equal cards.
  const cards = [...fleet, airportService];

  return (
    <>
      <PageHeader
        eyebrow="Our Fleet"
        title="Swift Dzire, Ertiga & Airport Transfers"
        subtitle="Every vehicle is inspected, sanitized, and driven by a professional driver from Mukthar Ahmed's verified local team — so every ride feels as good as it looks."
        image="ertiga.png"
        imageAlt="Ertiga rental car Udupi"
      />

      <section className="section-glow-light section-pad">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          {status === "loading" && (
            <p className="text-center text-ink/60">Loading our fleet…</p>
          )}
          {status === "error" && (
            <p className="text-center text-[#b3483f]">
              Couldn't load the fleet right now. Please call {siteInfo.phoneDisplay}.
            </p>
          )}

          <div className="grid gap-8 md:grid-cols-3">
            {status === "ready" &&
              cards.map((vehicle, i) => (
                <Reveal key={vehicle.slug || vehicle.name} delay={i * 120}>
                  <RideCard vehicle={vehicle} />
                </Reveal>
              ))}
          </div>
        </div>
      </section>
    </>
  );
}
