import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
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

// Cycle order: float-2 plays first, then float-1, then float-3, then loops.
// Each clip pairs with its own poster frame so a layer always has an
// instant visual the moment it becomes front, instead of a blank/black
// wait while the video buffers. `mobileSrc` is a separately-compressed,
// lower-resolution/lower-bitrate encode of the same clip (720x1280 vs the
// desktop 1080x1920) served instead on screens under 768px, since the
// full-size files are still multiple MB each — too heavy for constrained
// mobile data connections.
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
    mobileSrc: `/videos/float-3-mobile.mp4?v=${VIDEO_ASSET_VERSION}`,
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
      if (!el) return;
      // Set via the DOM directly rather than a JSX prop: React 18's host
      // component property whitelist doesn't include `fetchPriority` (that
      // mapping to the `fetchpriority` attribute only landed in React 19),
      // so passing it as JSX triggers an "unrecognized prop" dev warning on
      // every render. setAttribute bypasses React's prop diffing entirely,
      // so the attribute still lands on the element with no warning.
      el.setAttribute("fetchpriority", isFront ? "high" : "auto");
      if (isFront) {
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
            // Only the currently-visible clip preloads/plays eagerly, on
            // every device — the back layer (buffering the *next* clip
            // ahead of its turn) stays "metadata" so the browser is never
            // fetching two full videos at once, which otherwise made the
            // very first paint slow. It loads and starts on demand instead,
            // via the effect above, the instant it becomes front; now that
            // every clip is a small, faststart-flagged file, that on-demand
            // fetch is fast enough not to be noticeable.
            preload={isFront ? "auto" : "metadata"}
            autoPlay={isFront}
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
    <>
      {/* Video area carries only the heading + one short line — Book
          Now/Call and the search form live in the panel below instead of
          overlaying the video, so the video itself reads as a clean,
          uncluttered visual rather than a landing pad for buttons and a
          form. */}
      <section className="relative flex min-h-screen items-end overflow-hidden bg-charcoal">
        <div className="absolute inset-0">
          <CyclingVideoBackground />
          {/* Subtle bottom-to-top gradient — enough for text contrast, not heavy */}
          <div className="absolute inset-0 z-20 bg-gradient-to-t from-charcoal/85 via-charcoal/30 to-charcoal/10" />
        </div>

        <div className="relative z-30 mx-auto w-full max-w-7xl px-5 pb-16 pt-40 sm:px-8 sm:pb-20">
          <h1 className="max-w-3xl font-display text-4xl font-semibold leading-[1.08] text-cream sm:text-6xl md:text-7xl animate-fade-slide-up">
            Coastal journeys, driven with quiet care.
          </h1>
          <p
            className="mt-5 max-w-md text-base text-cream/75 sm:text-lg animate-fade-slide-up"
            style={{ animationDelay: "120ms" }}
          >
            Premium rides across the Udupi coast, driven with care.
          </p>
        </div>
      </section>

      {/* Action panel, below the video in normal page flow — Book Now
          (primary) + Call (secondary) sit above the search form, in that
          order; the search form itself is inputs + its own "Search"
          submit only. */}
      <section className="bg-charcoal px-5 py-10 sm:px-8 sm:py-12">
        <div className="mx-auto flex w-full max-w-7xl flex-col items-center gap-8">
          <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-3">
            <Link to="/contact" className="btn-gold">
              Book Now
            </Link>
            <a href={siteInfo.callLink} className="btn-outline">
              Call {siteInfo.phoneDisplay}
            </a>
          </div>

          <div className="mx-auto w-full max-w-[900px]">
            <SearchStrip />
          </div>
        </div>
      </section>
    </>
  );
}
