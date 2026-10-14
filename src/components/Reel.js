import { useLayoutEffect, useRef } from "react";
import { gsap } from "../lib/gsap";
import { usePrefersReducedMotion } from "../hooks/usePrefersReducedMotion";
import { useReveal } from "../hooks/useReveal";
import ChapterHead from "./ChapterHead";
import { projects } from "../data/content";

function Slate({ p }) {
  const inner = (
    <>
      <div className="slate__clap" aria-hidden="true" />
      <div className="slate__meta">
        <span>Scene {p.scene}</span>
        <span>{p.year}</span>
      </div>
      <div className="slate__body">
        <h3 className="slate__title">{p.title}</h3>
        <div className="slate__kind">{p.kind}</div>
        <p className="slate__desc">{p.desc}</p>
        <div className="slate__tags">
          {p.tags.map((t) => (
            <span className="tag" key={t}>
              {t}
            </span>
          ))}
        </div>
        {p.link && (
          <span className="slate__link">
            View project
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M2 10 10 2M4 2h6v6"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        )}
      </div>
    </>
  );

  if (p.link) {
    return (
      <a
        className="slate"
        href={p.link}
        target="_blank"
        rel="noopener noreferrer"
      >
        {inner}
      </a>
    );
  }
  return <div className="slate">{inner}</div>;
}

/**
 * CH. 03 — THE REEL. Clapperboard slates.
 * Desktop (≥900px): GSAP-pinned horizontal scroll. Mobile: vertical stack.
 */
export default function Reel() {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  const reduced = usePrefersReducedMotion();
  useReveal(sectionRef);

  useLayoutEffect(() => {
    const mm = gsap.matchMedia();
    mm.add("(min-width: 900px)", () => {
      if (reduced || !sectionRef.current || !trackRef.current) {
        return undefined;
      }
      const track = trackRef.current;
      const getAmount = () =>
        Math.max(0, track.scrollWidth - window.innerWidth);
      const tween = gsap.to(track, {
        x: () => -getAmount(),
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: () => `+=${getAmount()}`,
          pin: true,
          scrub: 1,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });
      return () => {
        if (tween.scrollTrigger) tween.scrollTrigger.kill();
        tween.kill();
        gsap.set(track, { x: 0 });
      };
    });
    return () => mm.revert();
  }, [reduced]);

  return (
    <section id="reel" className="chapter reel" ref={sectionRef}>
      <div className="reel__head">
        <ChapterHead no="03" title="The Reel" sub="Selected work" />
      </div>
      <div className="reel__viewport">
        <div className="reel__track" ref={trackRef}>
          {projects.map((p) => (
            <Slate key={p.title} p={p} />
          ))}
        </div>
      </div>
      <p className="reel__hint mono" aria-hidden="true">
        Scroll — the reel plays sideways
      </p>
    </section>
  );
}
