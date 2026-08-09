import { Link } from "react-router-dom";

/**
 * The site's main visual showcase card: primary image, name, a tight
 * 1-2 sentence description, an optional row of small supporting
 * thumbnails, and a "Plan this trip" link — one glass-card treatment
 * shared with every other card type on the site.
 */
export default function DestinationCard({ destination }) {
  const { name, image, description, secondaryImages = [] } = destination;

  return (
    <div className="glass-card glass-light group flex h-full flex-col overflow-hidden">
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={`/images/${image.src}`}
          alt={image.alt}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/60 via-transparent to-transparent" />
      </div>

      <div className="flex flex-1 flex-col p-6">
        <h3 className="font-display text-xl font-semibold text-ink">{name}</h3>
        <p className="mt-2 text-sm leading-relaxed text-ink/70">{description}</p>

        {secondaryImages.length > 0 && (
          <div className="mt-4 flex gap-2">
            {secondaryImages.map((thumb) => (
              <div key={thumb.src} className="h-14 w-16 overflow-hidden rounded-lg border border-gold/25">
                <img
                  src={`/images/${thumb.src}`}
                  alt={thumb.alt}
                  loading="lazy"
                  className="h-full w-full object-cover"
                />
              </div>
            ))}
          </div>
        )}

        <Link
          to="/contact"
          className="mt-auto inline-flex w-fit items-center gap-1.5 pt-4 text-sm font-semibold text-gold-dark hover:text-gold transition-colors"
        >
          Plan this trip
          <span aria-hidden="true">→</span>
        </Link>
      </div>
    </div>
  );
}
