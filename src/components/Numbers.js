import { useLayoutEffect, useRef } from "react";
import { gsap } from "../lib/gsap";
import { usePrefersReducedMotion } from "../hooks/usePrefersReducedMotion";
import { useReveal } from "../hooks/useReveal";
import ChapterHead from "./ChapterHead";
import { stats } from "../data/content";

function Stat({ value, label, desc, index }) {
  const numRef = useRef(null);
  const reduced = usePrefersReducedMotion();

  useLayoutEffect(() => {
    const el = numRef.current;
    if (!el) return undefined;
    if (reduced) {
      el.textContent = value;
      return undefined;
    }
    const target = parseInt(value, 10);
    const obj = { v: 0 };
    const tween = gsap.to(obj, {
      v: target,
      duration: 1.8,
      ease: "power2.out",
      scrollTrigger: { trigger: el, start: "top 88%", once: true },
      onUpdate: () => {
        el.textContent = String(Math.round(obj.v)).padStart(2, "0");
      },
      onComplete: () => {
        el.textContent = value;
      },
    });
    return () => {
      if (tween.scrollTrigger) tween.scrollTrigger.kill();
      tween.kill();
    };
  }, [value, reduced]);

  return (
    <div className="stat" data-rv>
      <div className="stat__no">{String(index + 1).padStart(2, "0")}</div>
      <div className="stat__value" ref={numRef}>
        {reduced ? value : "00"}
      </div>
      <div>
        <div className="stat__label">{label}</div>
        <div className="stat__desc">{desc}</div>
      </div>
    </div>
  );
}

/** CH. 02 — THE NUMBERS. Four real stats, count-up on enter. */
export default function Numbers() {
  const ref = useRef(null);
  useReveal(ref);

  return (
    <section id="numbers" className="chapter" ref={ref}>
      <ChapterHead no="02" title="The Numbers" sub="Not just code. Outcomes." />
      <div className="numbers__grid">
        {stats.map((s, i) => (
          <Stat key={s.label} index={i} {...s} />
        ))}
      </div>
    </section>
  );
}
