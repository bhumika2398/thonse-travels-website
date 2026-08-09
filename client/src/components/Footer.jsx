import { NavLink } from "react-router-dom";
import { navLinks, siteInfo } from "../data/siteInfo.js";
import Logo from "./Logo.jsx";

export default function Footer() {
  return (
    <footer className="bg-charcoal text-cream/80 border-t border-gold/20">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 py-20 grid gap-12 md:grid-cols-4">
        <div className="md:col-span-2">
          <Logo className="mb-5" />
          <p className="max-w-md text-sm leading-relaxed text-cream/60">
            Premium rides with a professional driver and curated destination journeys across
            Udupi and the Karnataka coast — helmed by {siteInfo.owner}, built on punctuality,
            comfort, and transparent pricing.
          </p>
          <div className="mt-6 inline-flex items-center gap-2 rounded-full glass px-4 py-2 text-xs font-semibold uppercase tracking-wider text-gold-light">
            <span className="h-2 w-2 rounded-full bg-gold animate-pulse" />
            Licensed &amp; Insured · Available 24×7
          </div>
        </div>

        <div>
          <h4 className="font-display text-lg text-gold mb-4">Explore</h4>
          <ul className="space-y-3 text-sm">
            {navLinks.map((link) => (
              <li key={link.to}>
                <NavLink to={link.to} className="hover:text-gold transition-colors">
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-display text-lg text-gold mb-4">Get in Touch</h4>
          <ul className="space-y-3 text-sm">
            <li className="text-cream/60">
              <span className="block text-xs uppercase tracking-wider text-gold-light">Owner</span>
              {siteInfo.owner}
            </li>
            <li>
              <a href={siteInfo.callLink} className="hover:text-gold transition-colors">
                📞 {siteInfo.phoneDisplay}
              </a>
            </li>
            <li>
              <a
                href={siteInfo.whatsappLink}
                target="_blank"
                rel="noreferrer"
                className="hover:text-gold transition-colors"
              >
                💬 WhatsApp Us
              </a>
            </li>
            <li>
              <a href={`mailto:${siteInfo.email}`} className="hover:text-gold transition-colors">
                ✉️ {siteInfo.email}
              </a>
            </li>
            <li className="text-cream/60">📍 {siteInfo.address}</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-gold/10 py-6 text-center text-xs text-cream/40">
        © {new Date().getFullYear()} Thonse Tours and Travels. All rights reserved. Owned &amp;
        operated by {siteInfo.owner}.
      </div>
    </footer>
  );
}
