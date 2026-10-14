import { useLayoutEffect } from "react";
import { gsap } from "../lib/gsap";
import { usePrefersReducedMotion } from "./usePrefersReducedMotion";

/**
 * Scroll reveal for every element matching `selector` inside `ref`.
 * Elements start visible in CSS; GSAP animates them in from below.
 * With reduced motion, nothing animates — content simply shows.
 */
export function useReveal(ref, selector = "[data-rv]") {
  const reduced = usePrefersReducedMotion();

  useLayoutEffect(() => {
    if (!ref.current || reduced) return undefined;
    const ctx = gsap.context(() => {
      const els = gsap.utils.toArray(selector);
      els.forEach((el) => {
        gsap.fromTo(
          el,
          { y: 48, opacity: 0, rotate: 0.6 },
          {
            y: 0,
            opacity: 1,
            rotate: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 88%", once: true },
          }
        );
      });
    }, ref);
    return () => ctx.revert();
  }, [ref, selector, reduced]);
}
