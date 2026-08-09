import { Link } from "react-router-dom";

export default function RideCard({ vehicle }) {
  const {
    name,
    tagline2,
    passengerCapacity,
    image,
    imageAlt,
    tagline,
    highlights = [],
    priceFrom,
    priceUnit,
  } = vehicle;

  const priceLabel =
    priceUnit === "fixed" ? `₹${priceFrom} fixed fare` : `From ₹${priceFrom}/km`;

  return (
    <div className="glass-card glass-light group flex h-full flex-col overflow-hidden">
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={`/images/${image}`}
          alt={imageAlt || `${name} rental car Udupi`}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/70 via-transparent to-transparent" />
        <span className="badge-glass absolute left-4 top-4 rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-wider">
          {tagline2}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-6">
        <h3 className="font-display text-2xl font-semibold text-ink">{name}</h3>
        <p className="mt-1 text-sm font-medium text-gold-dark">{passengerCapacity}</p>
        <p className="mt-3 text-sm leading-relaxed text-ink/70">{tagline}</p>

        <ul className="mt-4 flex flex-wrap gap-2">
          {highlights.map((h) => (
            <li
              key={h}
              className="rounded-full border border-gold/40 bg-gold/10 px-3 py-1 text-xs font-medium text-ink/80"
            >
              {h}
            </li>
          ))}
        </ul>

        <div className="mt-6 flex items-center justify-between pt-4 border-t border-gold/20">
          <span className="font-display text-lg font-semibold text-ink">{priceLabel}</span>
          <Link to={`/contact?vehicle=${encodeURIComponent(name)}`} className="btn-gold !px-5 !py-2.5 text-sm">
            Book Now
          </Link>
        </div>
      </div>
    </div>
  );
}
