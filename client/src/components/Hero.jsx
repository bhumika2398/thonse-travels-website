import { useState } from "react";
import { Link } from "react-router-dom";
import { CreditCard, Sparkles, ShieldCheck, Clock, MapPin } from "lucide-react";
import { siteInfo } from "../data/siteInfo.js";
import SearchStrip from "./SearchStrip.jsx";

// Cycle order: float-2 plays first, then float-1, then float-3, then loops.
// Each clip pairs with its own poster frame so a layer always has an
// instant visual the moment it becomes front, instead of a blank/black
// wait while the video buffers.
const VIDEO_ORDER = [
  { src: "/videos/float-2.mp4", poster: "/videos/float-2-poster.jpg" },
  { src: "/videos/float-1.mp4", poster: "/videos/float-1-poster.jpg" },
  { src: "/videos/float-3.mp4", poster: "/videos/float-3-poster.jpg" },
];

const TRUST_BADGES = [
  { Icon: CreditCard, label: "No Hidden Charges" },
  { Icon: Sparkles, label: "Sanitised, Serviced Fleet" },
  { Icon: ShieldCheck, label: "Verified & Licensed Drivers" },
  { Icon: Clock, label: "24×7 Support" },
  { Icon: MapPin, label: "Live GPS Tracking" },
];

/**
 * Two persistent <video> layers crossfade between clips. The layer whose
 * slot matches `index % 2` is front (visible, playing, wired to
 * onEnded); the other layer always preloads the *next* clip in the
 * sequence, so when it becomes front on the next tick it's already
 * buffered/playing — a seamless 0.6s opacity crossfade, no flash.
 */
function CyclingVideoBackground() {
  const [index, setIndex] = useState(0);

  const handleEnded = () => {
    setIndex((i) => (i + 1) % VIDEO_ORDER.length);
  };

  return (
    <>
      {[0, 1].map((layer) => {
        const isFront = layer === index % 2;
        const clipIndex = isFront ? index : (index + 1) % VIDEO_ORDER.length;
        const clip = VIDEO_ORDER[clipIndex];
        return (
          <video
            key={layer}
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-[600ms] ease-in-out ${
              isFront ? "z-10 opacity-100" : "z-0 opacity-0"
            }`}
            src={clip.src}
            poster={clip.poster}
            preload="auto"
            autoPlay
            muted
            playsInline
            onEnded={isFront ? handleEnded : undefined}
            aria-hidden="true"
          />
        );
      })}
    </>
  );
}

export default function Hero() {
  return (
    <section className="relative flex min-h-screen items-end overflow-hidden bg-charcoal">
      <div className="absolute inset-0">
        <CyclingVideoBackground />
        {/* Subtle bottom-to-top gradient — enough for text contrast, not heavy */}
        <div className="absolute inset-0 z-20 bg-gradient-to-t from-charcoal/85 via-charcoal/30 to-charcoal/10" />
      </div>

      <div className="relative z-30 mx-auto w-full max-w-7xl px-5 pb-20 pt-40 sm:px-8 sm:pb-24">
        <p className="section-eyebrow-light animate-fade-slide-up">
          Udupi, Karnataka · Est. Local Trust
        </p>
        <h1
          className="mt-4 max-w-3xl font-display text-4xl font-semibold leading-[1.08] text-cream sm:text-6xl md:text-7xl animate-fade-slide-up"
          style={{ animationDelay: "120ms" }}
        >
          Coastal journeys, driven with quiet care.
        </h1>
        <p
          className="mt-6 max-w-xl text-base leading-relaxed text-cream/75 sm:text-lg animate-fade-slide-up"
          style={{ animationDelay: "240ms" }}
        >
          A Swift Dzire and a spacious Ertiga, both with a professional driver from{" "}
          {siteInfo.owner}'s verified local team — for beach days, temple runs, and everything in
          between.
        </p>

        <div
          className="mt-8 flex flex-wrap items-center gap-4 animate-fade-slide-up"
          style={{ animationDelay: "320ms" }}
        >
          <Link to="/contact" className="btn-gold">
            Book Now
          </Link>
          <a href={siteInfo.callLink} className="btn-outline">
            Call {siteInfo.phoneDisplay}
          </a>
        </div>

        <ul
          className="mt-6 flex flex-wrap items-center gap-2.5 animate-fade-slide-up"
          style={{ animationDelay: "400ms" }}
        >
          {TRUST_BADGES.map(({ Icon, label }) => (
            <li
              key={label}
              className="glass inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-medium text-cream/85"
            >
              <Icon className="h-3.5 w-3.5 shrink-0 text-gold-light" aria-hidden="true" />
              {label}
            </li>
          ))}
        </ul>

        <div
          className="mx-auto mt-10 max-w-[900px] animate-fade-slide-up"
          style={{ animationDelay: "480ms" }}
        >
          <SearchStrip />
        </div>
      </div>
    </section>
  );
}
