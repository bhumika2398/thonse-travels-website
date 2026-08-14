import { useEffect, useRef } from "react";

/**
 * Attaches an IntersectionObserver to the returned ref and adds the
 * `is-visible` class (see .reveal in index.css) once the element enters
 * the viewport. Reveals once and then disconnects.
 */
export default function useScrollReveal(options = {}) {
  const ref = useRef(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -60px 0px", ...options }
    );

    observer.observe(node);
    return () => observer.disconnect();
    // Intentionally run once on mount only: `options` is a fresh {} literal
    // on every render by default (no call site ever passes a real one), so
    // depending on it would tear down and recreate the IntersectionObserver
    // on every re-render instead of once per element.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return ref;
}
