import { useEffect, useRef } from "react";
import { nav } from "../data/content";

/** Fixed top bar: brand, chapter links, live 24fps timecode + REC. */
export default function Nav() {
  const tcRef = useRef(null);

  useEffect(() => {
    if (typeof window === "undefined") return undefined;
    const t0 = performance.now();
    let raf = 0;
    const pad = (n) => String(n).padStart(2, "0");
    const tick = () => {
      const t = (performance.now() - t0) / 1000;
      const ff = Math.floor((t * 24) % 24);
      const ss = Math.floor(t % 60);
      const mm = Math.floor(t / 60) % 60;
      const hh = Math.floor(t / 3600);
      if (tcRef.current) {
        tcRef.current.textContent = `${pad(hh)}:${pad(mm)}:${pad(ss)}:${pad(ff)}`;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <header className="nav">
      <a className="nav__brand" href="#title">
        S. GUPTA<span>.</span>
      </a>
      <nav className="nav__links" aria-label="Chapters">
        {nav.map((c) => (
          <a key={c.no} href={c.href}>
            <b>{c.no}</b>
            {c.label}
          </a>
        ))}
      </nav>
      <div className="nav__tc" aria-label="Timecode">
        <span className="rec-dot" aria-hidden="true" />
        <span ref={tcRef}>00:00:00:00</span>
      </div>
    </header>
  );
}
