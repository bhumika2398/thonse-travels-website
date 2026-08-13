import { Link } from "react-router-dom";

/**
 * A true 1:1 square card — aspect-square lives on the outer glass-card
 * container itself (not just the image), so the photo fills the whole
 * card. Only the destination name and a "Plan this trip" link are
 * overlaid at the bottom; no description text.
 */
export default function DestinationCard({ destination }) {
  const { name, image } = destination;

  return (
    <div className="glass-card glass-light group relative aspect-square overflow-hidden">
      <img
        src={`/images/${image.src}`}
        alt={image.alt}
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-charcoal/90 via-charcoal/15 to-transparent" />

      <div className="absolute inset-x-0 bottom-0 p-5">
        <h3 className="font-display text-xl font-semibold text-cream">{name}</h3>
        <Link
          to="/contact"
          className="mt-1.5 inline-flex items-center gap-1.5 text-sm font-semibold text-gold-light hover:text-gold transition-colors"
        >
          Plan this trip
          <span aria-hidden="true">→</span>
        </Link>
      </div>
    </div>
  );
}
