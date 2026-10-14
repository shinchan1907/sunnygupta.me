import { useRef } from "react";
import { useReveal } from "../hooks/useReveal";
import ChapterHead from "./ChapterHead";
import { links, email } from "../data/content";

/** CH. 06 — CREDITS. Big CTA, link row, credits-roll footer. */
export default function Credits() {
  const ref = useRef(null);
  useReveal(ref);

  return (
    <section id="credits" className="chapter credits" ref={ref}>
      <ChapterHead no="06" title="Credits" />
      <h2 className="credits__cta" data-rv>
        Have a system to build? A process to automate? A product to ship?
      </h2>
      <div data-rv>
        <a className="btn-accent" href={`mailto:${email}`}>
          Start the conversation
        </a>
      </div>
      <nav className="credits__links" data-rv aria-label="Elsewhere">
        {links.map((l) => (
          <a
            key={l.label}
            href={l.href}
            target={l.href.startsWith("mailto:") ? undefined : "_blank"}
            rel={l.href.startsWith("mailto:") ? undefined : "noopener noreferrer"}
          >
            {l.label} ↗
          </a>
        ))}
      </nav>
      <footer className="credits__roll" data-rv>
        <div className="mono">Directed, engineered &amp; edited by S. Gupta</div>
        <div className="mono">© 2026 Sunny Gupta · Jalandhar, Punjab · IST</div>
        <div className="mono credits__end">The end ●</div>
      </footer>
    </section>
  );
}
