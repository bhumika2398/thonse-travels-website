import { useEffect, useRef, useState } from "react";
import Reveal from "./Reveal.jsx";

const CLIPS = [
  {
    src: "/videos/float-4.mp4",
    caption: "Hanging Bridge, Udupi",
    floatDuration: "7s",
    floatDelay: "0s",
  },
  {
    src: "/videos/float-5.mp4",
    caption: "Delta Point",
    floatDuration: "8.5s",
    floatDelay: "0.6s",
  },
];

/**
 * Autoplay video clip, hardened against the browser's autoplay-permission
 * prompt. The `muted` HTML attribute alone is sometimes not enough — some
 * browsers/embedded preview environments evaluate the declarative
 * `autoPlay` attribute before/without reliably honoring `muted`, which can
 * surface a native "allow autoplay with sound?" permission popup even
 * though the element is marked muted. Setting `video.muted = true`
 * explicitly via JS before calling `.play()` (and guarding that call with
 * `.catch()`, matching the pattern used for the Hero background video)
 * removes both failure modes.
 *
 * Also lazy: this section sits well below the fold, but a plain <video src>
 * starts fetching the whole file the instant it mounts regardless of
 * scroll position. An IntersectionObserver defers even setting `src` until
 * the card is about to scroll into view, mirroring the `loading="lazy"`
 * treatment every image on the site already gets.
 */
function ClipVideo({ clip }) {
  const videoRef = useRef(null);
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    const el = videoRef.current;
    if (!el) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoad(true);
          observer.disconnect();
        }
      },
      { rootMargin: "300px 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const el = videoRef.current;
    if (!el || !shouldLoad) return;
    el.muted = true;
    el.play().catch(() => {}); // ignore benign autoplay-policy rejections
  }, [shouldLoad]);

  return (
    <video
      ref={videoRef}
      className="h-64 w-full object-cover sm:h-80"
      src={shouldLoad ? clip.src : undefined}
      preload="none"
      muted
      loop
      playsInline
      aria-label={clip.caption}
    />
  );
}

/**
 * "Experience Udupi" — two small autoplay video cards, each floating
 * independently (different duration/delay) so they never move in sync.
 * This is the section that makes the site feel distinct rather than a
 * copy of the reference site's single hero video.
 */
export default function ExperienceUdupi() {
  return (
    <section className="section-glow-light section-pad">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal>
          <p className="section-eyebrow">In Motion</p>
          <h2 className="section-title">Experience Udupi</h2>
          <p className="section-sub">
            A glimpse of the coast, in motion — the same roads and shores you'll see on your
            ride with us.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-8 sm:grid-cols-2">
          {CLIPS.map((clip, i) => (
            <Reveal key={clip.src} delay={i * 150}>
              <div
                className="animate-float"
                style={{ animationDuration: clip.floatDuration, animationDelay: clip.floatDelay }}
              >
                <div className="glass-light overflow-hidden rounded-3xl p-3">
                  <div className="overflow-hidden rounded-2xl">
                    <ClipVideo clip={clip} />
                  </div>
                  <p className="mt-3 px-2 pb-1 text-center font-display text-base font-medium text-ink">
                    {clip.caption}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
