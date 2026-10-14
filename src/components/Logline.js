import { useLayoutEffect, useRef } from "react";
import { gsap } from "../lib/gsap";
import { usePrefersReducedMotion } from "../hooks/usePrefersReducedMotion";
import { useReveal } from "../hooks/useReveal";
import ChapterHead from "./ChapterHead";

const STATEMENT =
  "Every business runs on systems. Most of them are held together with hope and spreadsheets. I build the ones that don't break.";

const CREDITS = [
  ["Founder", "Bytenex (2025– )"],
  ["Builder", "AI platforms, dev tools, games"],
  ["Operator", "ERP & CRM rollouts"],
];

/** CH. 01 — THE LOGLINE. Word-by-word scrub reveal + credit roll. */
export default function Logline() {
  const ref = useRef(null);
  const reduced = usePrefersReducedMotion();
  useReveal(ref);

  useLayoutEffect(() => {
    if (!ref.current || reduced) return undefined;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".logline__statement .w",
        { opacity: 0.12 },
        {
          opacity: 1,
          stagger: 0.06,
          ease: "none",
          scrollTrigger: {
            trigger: ".logline__statement",
            start: "top 78%",
            end: "bottom 45%",
            scrub: true,
          },
        }
      );
    }, ref);
    return () => ctx.revert();
  }, [reduced]);

  return (
    <section id="logline" className="chapter" ref={ref}>
      <ChapterHead no="01" title="The Logline" />
      <p className="logline__statement" aria-label={STATEMENT}>
        {STATEMENT.split(" ").map((word, i) => (
          <span className="w" key={i} aria-hidden="true">
            {word}
          </span>
        ))}
      </p>
      <p className="logline__body" data-rv>
        From marketing floors to machine rooms — I&rsquo;ve spent my career
        translating vague, high-stakes problems into concrete systems: AI
        platforms, automation, CRMs, and operations tooling that teams
        actually use.
      </p>
      <div className="logline__credits" data-rv>
        {CREDITS.map(([role, detail]) => (
          <div className="logline__credit" key={role}>
            <span>{role}</span>
            <span>{detail}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
