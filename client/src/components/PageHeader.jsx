import { useEffect, useRef } from "react";

export default function PageHeader({ eyebrow, title, subtitle, image, imageAlt = "" }) {
  const imgRef = useRef(null);

  // Set via the DOM directly rather than a JSX prop: React 18's host
  // component property whitelist doesn't include `fetchPriority` (that
  // mapping to the `fetchpriority` attribute only landed in React 19), so
  // passing it as JSX triggers an "unrecognized prop" dev warning.
  useEffect(() => {
    imgRef.current?.setAttribute("fetchpriority", "high");
  }, []);

  return (
    <section className="relative flex min-h-[60vh] items-end overflow-hidden bg-charcoal">
      <div className="absolute inset-0">
        <img
          ref={imgRef}
          src={`/images/${image}`}
          alt={imageAlt}
          loading="eager"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/70 to-charcoal/30" />
      </div>
      <div className="relative z-10 mx-auto w-full max-w-7xl px-5 pb-16 pt-40 sm:px-8">
        <p className="section-eyebrow text-gold-light">{eyebrow}</p>
        <h1 className="mt-4 font-display text-4xl font-semibold text-cream sm:text-5xl md:text-6xl">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-4 max-w-2xl text-base sm:text-lg text-cream/70 leading-relaxed">
            {subtitle}
          </p>
        )}
      </div>
    </section>
  );
}
