import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { navLinks, siteInfo } from "../data/siteInfo.js";
import Logo from "./Logo.jsx";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className="fixed inset-x-0 top-0 z-50 transition-all duration-500"
      style={
        scrolled
          ? {
              background: "rgba(28, 31, 26, 0.82)",
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
              borderBottom: "1px solid rgba(255, 255, 255, 0.15)",
              boxShadow: "0 8px 32px rgba(0, 0, 0, 0.25)",
            }
          : { background: "transparent", borderBottom: "1px solid transparent" }
      }
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 sm:px-8 py-3.5">
        <NavLink to="/" onClick={() => setOpen(false)} aria-label="Thonse Tours and Travels home">
          <Logo />
        </NavLink>

        <div className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `font-sans text-sm font-medium tracking-wide transition-colors duration-200 ${
                  isActive ? "text-gold" : "text-cream/85 hover:text-gold"
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </div>

        <div className="hidden lg:flex items-center gap-4">
          <a href={siteInfo.callLink} className="font-sans text-sm text-cream/85 hover:text-gold transition-colors">
            {siteInfo.phoneDisplay}
          </a>
          <NavLink to="/contact" className="btn-gold !px-6 !py-2.5 text-sm">
            Book a Ride
          </NavLink>
        </div>

        <button
          className="lg:hidden flex h-10 w-10 items-center justify-center rounded-full border border-gold/40 text-cream"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          {open ? "✕" : "☰"}
        </button>
      </nav>

      {open && (
        <div
          className="lg:hidden border-t border-gold/20 px-5 py-6 flex flex-col gap-5"
          style={{ background: "rgba(28, 31, 26, 0.95)", backdropFilter: "blur(20px)" }}
        >
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `font-sans text-base font-medium ${isActive ? "text-gold" : "text-cream/85"}`
              }
            >
              {link.label}
            </NavLink>
          ))}
          <a href={siteInfo.callLink} className="font-sans text-base text-gold">
            Call {siteInfo.phoneDisplay}
          </a>
          <NavLink to="/contact" onClick={() => setOpen(false)} className="btn-gold justify-center">
            Book a Ride
          </NavLink>
        </div>
      )}
    </header>
  );
}
