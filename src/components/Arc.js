import { useLayoutEffect, useRef } from "react";
import { gsap } from "../lib/gsap";
import { usePrefersReducedMotion } from "../hooks/usePrefersReducedMotion";
import { useReveal } from "../hooks/useReveal";
import ChapterHead from "./ChapterHead";
import { beats } from "../data/content";

/** CH. 04 — THE ARC. Alternating timeline, line draws on scroll. */
export default function Arc() {
  const ref = useRef(null);
  const lineRef = useRef(null);
  const reduced = usePrefersReducedMotion();
  useReveal(ref);

  useLayoutEffect(() => {
    if (!ref.current || !lineRef.current || reduced) return undefined;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        lineRef.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: ".arc__wrap",
            start: "top 72%",
            end: "bottom 55%",
            scrub: true,
          },
        }
      );
    }, ref);
    return () => ctx.revert();
  }, [reduced]);

  return (
    <section id="arc" className="chapter" ref={ref}>
      <ChapterHead
        no="04"
        title="The Arc"
        sub="From the floor to the architecture."
      />
      <div className="arc__wrap">
        <div className="arc__line" aria-hidden="true">
          <div
            className="arc__line-fill"
            ref={lineRef}
            style={reduced ? { transform: "scaleY(1)" } : undefined}
          />
        </div>
        {beats.map((b) => (
          <article className="beat" key={b.no} data-rv>
            <span className="beat__dot" aria-hidden="true" />
            <div className="beat__no">
              {b.no} · {b.era}
            </div>
            <h3 className="beat__title">{b.title}</h3>
            <p className="beat__desc">{b.desc}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
