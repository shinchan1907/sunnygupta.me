import { useLayoutEffect, useRef } from "react";
import { gsap } from "../lib/gsap";
import { usePrefersReducedMotion } from "../hooks/usePrefersReducedMotion";

/**
 * CH. 00 — TITLE SEQUENCE. Letterbox, giant staggered name, parallax "00".
 * The GSAP intro plays once `ready` flips true (after the preloader lifts).
 */
export default function Hero({ ready }) {
  const ref = useRef(null);
  const reduced = usePrefersReducedMotion();

  useLayoutEffect(() => {
    if (!ready || !ref.current || reduced) return undefined;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });
      tl.fromTo(
        ".hero__bar",
        { scaleY: 0 },
        { scaleY: 1, duration: 1, stagger: 0.12 },
        0
      )
        .fromTo(
          ".hero__line-inner",
          { yPercent: 115 },
          { yPercent: 0, duration: 1.25, stagger: 0.14 },
          0.25
        )
        .fromTo(
          ".hero__fade",
          { y: 26, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.9, stagger: 0.09 },
          0.75
        );
      gsap.to(".hero__num", {
        yPercent: 28,
        ease: "none",
        scrollTrigger: {
          trigger: ref.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    }, ref);
    return () => ctx.revert();
  }, [ready, reduced]);

  return (
    <section id="title" className="hero" ref={ref}>
      <div className="lb lb--top hero__bar" aria-hidden="true" />
      <div className="lb lb--bottom hero__bar" aria-hidden="true" />
      <div className="hero__num" aria-hidden="true">
        00
      </div>

      <div className="hero__inner">
        <p className="hero__kicker mono hero__fade">Bytenex presents</p>
        <h1 className="hero__title display" aria-label="Sunny Gupta">
          <span className="hero__line">
            <span className="hero__line-inner">Sunny</span>
          </span>
          <span className="hero__line">
            <span className="hero__line-inner">Gupta</span>
          </span>
        </h1>
        <p className="hero__sub hero__fade">
          Creative Technologist &amp; Systems Engineer — Founder, Bytenex
        </p>
        <p className="hero__logline hero__fade">
          I turn <em>ambiguity</em> into systems that scale — and teams that
          ship.
        </p>
        <div className="hero__meta mono hero__fade">
          <span>Jalandhar, Punjab · IST</span>
          <a className="hero__scroll" href="#logline">
            Scroll to begin
            <svg
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M7 1v11M2.5 7.5 7 12l4.5-4.5"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>
        </div>
      </div>

      <div className="hero__specs mono" aria-hidden="true">
        <span>24 fps</span>
        <span>2.39 : 1</span>
      </div>
    </section>
  );
}
