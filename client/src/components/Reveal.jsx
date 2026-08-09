import useScrollReveal from "../hooks/useScrollReveal.js";

/**
 * Generic scroll-reveal wrapper. Wrap any section/element in <Reveal> to
 * fade + slide it in as it enters the viewport. `delay` accepts a
 * Tailwind-safe inline style in ms, `as` lets you pick the wrapper tag.
 */
export default function Reveal({ children, className = "", delay = 0, as: Tag = "div" }) {
  const ref = useScrollReveal();

  return (
    <Tag ref={ref} className={`reveal ${className}`} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </Tag>
  );
}
