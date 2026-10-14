import { useEffect, useRef } from "react";

/** Top-of-page progress bar — accent fill tracks scroll depth. */
export default function Scrubber() {
  const fillRef = useRef(null);

  useEffect(() => {
    const update = () => {
      const el = document.documentElement;
      const max = el.scrollHeight - el.clientHeight;
      const y = window.scrollY || el.scrollTop || 0;
      const p = max > 0 ? Math.min(1, Math.max(0, y / max)) : 0;
      if (fillRef.current) {
        fillRef.current.style.transform = `scaleX(${p})`;
      }
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <div className="scrubber" aria-hidden="true">
      <div ref={fillRef} className="scrubber__fill" />
    </div>
  );
}
