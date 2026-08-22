import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { CreditCard, Sparkles, ShieldCheck, Clock, MapPin } from "lucide-react";
import { siteInfo } from "../data/siteInfo.js";
import SearchStrip from "./SearchStrip.jsx";

// Cache-busting version for the video files themselves: filenames never
// change when a clip is re-edited/replaced in place, and unhashed files
// under public/ aren't guaranteed a cache-busting filename by the host
// (no vercel.json override exists), so a stale copy could otherwise keep
// being served from a browser or CDN cache after the file is swapped.
// Bump this whenever a video file's *content* changes without its name
// changing (e.g. float-2.mp4 re-edited to remove its end-card overlay).
const VIDEO_ASSET_VERSION = "4";

// Cycle order: float-2 plays first, then float-1, then float-3, then loops
// back to float-2 — continuing indefinitely. Each clip pairs with its own
// poster frame so a layer always has an instant visual the moment it
// becomes front, instead of a blank/black wait while the video buffers.
// `mobileSrc` is a separately-compressed, lower-resolution/lower-bitrate
// encode of the same clip (720x1280 vs the desktop 1080x1920) served
// instead on screens under 768px, since the full-size files are still
// multiple MB each — too heavy for constrained mobile data connections.
//
// float-3 has no separate mobile-optimized encode yet, so it falls back to
// the same full-size file on mobile too (still fine functionally — just
// not bandwidth-optimized like the other two clips). The `handleEnded`
// advance is `(i + 1) % VIDEO_ORDER.length`, so as long as every entry here
// resolves to a real file that actually fires the `ended` event, the cycle
// wraps continuously and never stalls/goes blank.
const VIDEO_ORDER = [
  {
    src: `/videos/float-2.mp4?v=${VIDEO_ASSET_VERSION}`,
    mobileSrc: `/videos/float-2-mobile.mp4?v=${VIDEO_ASSET_VERSION}`,
    poster: "/videos/float-2-poster.jpg",
  },
  {
    src: `/videos/float-1.mp4?v=${VIDEO_ASSET_VERSION}`,
    mobileSrc: `/videos/float-1-mobile.mp4?v=${VIDEO_ASSET_VERSION}`,
    poster: "/videos/float-1-poster.jpg",
  },
  {
    src: `/videos/float-3.mp4?v=${VIDEO_ASSET_VERSION}`,
    mobileSrc: `/videos/float-3.mp4?v=${VIDEO_ASSET_VERSION}`,
    poster: "/videos/float-3-poster.jpg",
  },
];

const MOBILE_QUERY = "(max-width: 767px)";

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(
    () => typeof window !== "undefined" && window.matchMedia(MOBILE_QUERY).matches
  );

  useEffect(() => {
    const mql = window.matchMedia(MOBILE_QUERY);
    const onChange = (e) => setIsMobile(e.matches);
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, []);

  return isMobile;
}

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
  const isMobile = useIsMobile();
  const layerRefs = [useRef(null), useRef(null)];

  const handleEnded = () => {
    setIndex((i) => (i + 1) % VIDEO_ORDER.length);
  };

  // Explicitly (re)start the front layer whenever the cycle advances or the
  // mobile/desktop source swaps. Declaratively toggling the `autoplay`
  // attribute on an element that's already mounted isn't reliably honored
  // by browsers once playback has already started/stopped once, so the
  // front layer's playback is driven imperatively here instead — this is
  // also what makes it safe for the back layer to *not* autoplay on mobile
  // (see below): the moment it becomes front, this effect calls .play() on
  // it directly, loading on demand if it hadn't preloaded yet.
  useEffect(() => {
    [0, 1].forEach((layer) => {
      const isFront = layer === index % 2;
      const el = layerRefs[layer].current;
      if (el && isFront) {
        el.play().catch(() => {}); // ignore benign autoplay-policy rejections
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index, isMobile]);

  return (
    <>
      {[0, 1].map((layer) => {
        const isFront = layer === index % 2;
        const clipIndex = isFront ? index : (index + 1) % VIDEO_ORDER.length;
        const clip = VIDEO_ORDER[clipIndex];
        return (
          <video
            key={layer}
            ref={layerRefs[layer]}
            // Explicit aspect-ratio as a defensive/standards-compliant hint
            // for the video's decode box (belt-and-suspenders — this layer
            // is already `absolute inset-0` inside a `min-h-screen` parent,
            // so its box size never actually depends on the video's own
            // intrinsic dimensions and there's no real CLS risk here).
            style={{ aspectRatio: "9 / 16" }}
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-[600ms] ease-in-out ${
              isFront ? "z-10 opacity-100" : "z-0 opacity-0"
            }`}
            src={isMobile ? clip.mobileSrc : clip.src}
            poster={clip.poster}
            // Only the currently-visible clip preloads/plays eagerly on
            // mobile — the back layer (buffering the *next* clip ahead of
            // its turn) drops to "metadata" there so it isn't competing for
            // bandwidth on a constrained mobile connection; it loads and
            // starts on demand instead, via the effect above, the instant
            // it becomes front. Desktop keeps both eager/auto-playing, since
            // that's what makes the crossfade seamless and bandwidth isn't
            // the bottleneck there.
            preload={isFront || !isMobile ? "auto" : "metadata"}
            fetchPriority={isFront ? "high" : "auto"}
            autoPlay={isFront || !isMobile}
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
        <h1 className="max-w-3xl font-display text-4xl font-semibold leading-[1.08] text-cream sm:text-6xl md:text-7xl animate-fade-slide-up">
          Coastal journeys, driven with quiet care.
        </h1>
        {/* Shorter, single-sentence version on mobile — the full paragraph
            reads fine on desktop but felt like too much text on a small
            screen; sm: and up swap back to the full copy. */}
        <p
          className="mt-6 max-w-xl text-base leading-relaxed text-cream/75 sm:hidden animate-fade-slide-up"
          style={{ animationDelay: "120ms" }}
        >
          A Swift Dzire &amp; spacious Ertiga, each with a professional driver — for beach days,
          temple runs, and more.
        </p>
        <p
          className="mt-6 hidden max-w-xl text-base leading-relaxed text-cream/75 sm:block sm:text-lg animate-fade-slide-up"
          style={{ animationDelay: "120ms" }}
        >
          A Swift Dzire and a spacious Ertiga, both with a professional driver from{" "}
          {siteInfo.owner}'s verified local team — for beach days, temple runs, and everything in
          between.
        </p>

        <div
          className="mt-8 flex flex-wrap items-center gap-4 animate-fade-slide-up"
          style={{ animationDelay: "240ms" }}
        >
          <Link to="/contact" className="btn-gold">
            Book Now
          </Link>
          <a href={siteInfo.callLink} className="btn-outline">
            Call {siteInfo.phoneDisplay}
          </a>
        </div>

        {/* Grid on mobile so every badge lines up in even, predictable
            columns regardless of label length — plain flex-wrap let short
            and long labels pack unevenly (e.g. one alone on a row, two on
            the next) which read as cluttered on narrow screens. sm: and up
            switch back to the flowing flex-wrap row. */}
        <ul
          className="mt-6 grid grid-cols-2 gap-2 sm:flex sm:flex-wrap sm:items-center sm:gap-2.5 animate-fade-slide-up"
          style={{ animationDelay: "320ms" }}
        >
          {TRUST_BADGES.map(({ Icon, label }) => (
            <li
              key={label}
              className="glass flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[11px] font-medium leading-tight text-cream/85 sm:inline-flex sm:items-center sm:px-3.5 sm:text-xs"
            >
              <Icon className="h-3.5 w-3.5 shrink-0 text-gold-light" aria-hidden="true" />
              <span>{label}</span>
            </li>
          ))}
        </ul>

        <div
          className="mx-auto mt-10 max-w-[900px] animate-fade-slide-up"
          style={{ animationDelay: "400ms" }}
        >
          <SearchStrip />
        </div>
      </div>
    </section>
  );
}
