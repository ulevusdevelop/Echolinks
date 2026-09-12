// lib/useInView.ts
//
// Small reusable hook backing the "fly-in" / "float-up" motion required
// by the edit doc (items 25 & 26). Returns a ref to attach to the
// element and a boolean that flips to true once the element scrolls
// into the viewport — combine with the `.motion-fly-in` /
// `.motion-float-up` classes in globals.css. Fires once (not on every
// scroll in/out), matching how a one-time page-load/reveal animation
// should behave.

import { useEffect, useRef, useState } from 'react';

export function useInView<T extends HTMLElement>(threshold = 0.2) {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    // If IntersectionObserver isn't available (very old browsers / SSR
    // edge cases), just show the content immediately rather than
    // leaving it permanently hidden at opacity: 0.
    if (typeof IntersectionObserver === 'undefined') {
      setInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, inView };
}
