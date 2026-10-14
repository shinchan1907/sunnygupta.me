import { useEffect, useRef } from "react";

/** Dot + trailing ring cursor. Renders nothing on touch / coarse pointers. */
export default function Cursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);

  useEffect(() => {
    if (typeof window === "undefined") return undefined;
    if (typeof window.matchMedia !== "function") return undefined;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
      return undefined;
    }

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return undefined;

    let mx = -100;
    let my = -100;
    let dx = -100;
    let dy = -100;
    let rx = -100;
    let ry = -100;
    let raf = 0;

    const onMove = (e) => {
      mx = e.clientX;
      my = e.clientY;
    };

    const onOver = (e) => {
      const t = e.target;
      const interactive =
        t instanceof Element && t.closest("a, button, [data-hover]");
      ring.classList.toggle("is-hover", Boolean(interactive));
    };

    const loop = () => {
      dx += (mx - dx) * 0.4;
      dy += (my - dy) * 0.4;
      rx += (mx - rx) * 0.14;
      ry += (my - ry) * 0.14;
      dot.style.transform = `translate(${dx - 3}px, ${dy - 3}px)`;
      const half = ring.classList.contains("is-hover") ? 28 : 17;
      ring.style.transform = `translate(${rx - half}px, ${ry - half}px)`;
      raf = requestAnimationFrame(loop);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseover", onOver, { passive: true });
    raf = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <div ref={dotRef} className="cursor-dot" aria-hidden="true" />
      <div ref={ringRef} className="cursor-ring" aria-hidden="true" />
    </>
  );
}
