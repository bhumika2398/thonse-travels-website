import Reveal from "./Reveal.jsx";

const CLIPS = [
  {
    src: "/videos/float-2.mp4",
    caption: "Sunset Along the Malpe Coast",
    floatDuration: "7s",
    floatDelay: "0s",
  },
  {
    src: "/videos/float-3.mp4",
    caption: "Backwaters & Coastal Drives",
    floatDuration: "8.5s",
    floatDelay: "0.6s",
  },
];

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
                    <video
                      className="h-64 w-full object-cover sm:h-80"
                      src={clip.src}
                      autoPlay
                      muted
                      loop
                      playsInline
                      aria-label={clip.caption}
                    />
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
