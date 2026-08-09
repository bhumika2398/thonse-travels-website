import { useEffect } from "react";

/**
 * Lightweight per-page SEO: sets document.title and upserts the
 * <meta name="description"> tag. Deliberately dependency-free (no
 * react-helmet-async) to keep the bundle small and avoid extra
 * install/runtime risk — this is all react-helmet-async would do for a
 * single-tag-per-page site like this one.
 */
export default function useDocumentMeta(title, description) {
  useEffect(() => {
    if (title) document.title = title;

    if (description) {
      let tag = document.querySelector('meta[name="description"]');
      if (!tag) {
        tag = document.createElement("meta");
        tag.setAttribute("name", "description");
        document.head.appendChild(tag);
      }
      tag.setAttribute("content", description);
    }
  }, [title, description]);
}
