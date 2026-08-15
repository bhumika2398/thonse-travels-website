/**
 * Custom logotype mark: a minimal line-art car silhouette riding a wave,
 * paired with "Thonse" in the display serif and a small tracked
 * "Tours & Travels" caption underneath. Used in Navbar + Footer.
 *
 * `showIcon` defaults to true (Footer keeps the full mark); Navbar passes
 * `showIcon={false}` to render the wordmark only, per founder feedback.
 */
export default function Logo({ light = true, className = "", showIcon = true, captionClassName = "text-gold" }) {
  const textColor = light ? "text-cream" : "text-ink";

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {showIcon && (
        <svg
          viewBox="0 0 64 44"
          className="h-10 w-10 shrink-0 sm:h-11 sm:w-11"
          fill="none"
          aria-hidden="true"
        >
          {/* Car silhouette */}
          <path
            d="M6 25c3.5-.3 6-1 8-3 3.5-5.5 9.5-9 18-9 7.5 0 13 3 16.5 8 2.8.2 5 1 7.5 3"
            stroke="var(--gold)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path d="M4 25.5h52" stroke="var(--gold)" strokeWidth="2" strokeLinecap="round" />
          <circle cx="18" cy="27" r="3.4" stroke="var(--gold)" strokeWidth="2" />
          <circle cx="42" cy="27" r="3.4" stroke="var(--gold)" strokeWidth="2" />
          {/* Wave beneath */}
          <path
            d="M2 35c4 2.4 8 2.4 12 0s8-2.4 12 0 8 2.4 12 0 8-2.4 12 0 6 1.8 10 .8"
            stroke="var(--gold-light)"
            strokeWidth="1.6"
            strokeLinecap="round"
            opacity="0.75"
          />
        </svg>
      )}

      <div className="leading-none">
        <span className={`block font-display text-xl sm:text-2xl font-semibold tracking-tight ${textColor}`}>
          Thonse
        </span>
        <span className={`block text-[9px] sm:text-[10px] font-sans font-semibold uppercase tracking-[0.35em] ${captionClassName}`}>
          Tours &amp; Travels
        </span>
      </div>
    </div>
  );
}
