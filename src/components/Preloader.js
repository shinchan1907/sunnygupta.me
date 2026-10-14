import { useEffect, useRef, useState } from "react";
import { usePrefersReducedMotion } from "../hooks/usePrefersReducedMotion";

const STEP_MS = 600;
const LIFT_MS = 700;

/**
 * Film countdown leader: 3·2·1 inside a ring sweep, then the curtain lifts.
 * Locks body scroll while mounted. Calls onDone after the lift completes.
 */
export default function Preloader({ onDone }) {
  const [count, setCount] = useState(3);
  const [lifting, setLifting] = useState(false);
  const reduced = usePrefersReducedMotion();
  const doneRef = useRef(onDone);
  doneRef.current = onDone;

  useEffect(() => {
    const step = reduced ? STEP_MS / 3 : STEP_MS;
    document.body.style.overflow = "hidden";
    let remaining = 3;
    let liftTimer = 0;
    let doneTimer = 0;

    const interval = window.setInterval(() => {
      remaining -= 1;
      if (remaining <= 0) {
        window.clearInterval(interval);
        setCount(1);
        setLifting(true);
        liftTimer = window.setTimeout(() => doneRef.current(), LIFT_MS);
      } else {
        setCount(remaining);
      }
    }, step);
    // Safety: never trap the user behind the leader.
    doneTimer = window.setTimeout(
      () => doneRef.current(),
      step * 3 + LIFT_MS + 1500
    );

    return () => {
      window.clearInterval(interval);
      window.clearTimeout(liftTimer);
      window.clearTimeout(doneTimer);
      document.body.style.overflow = "";
    };
  }, [reduced]);

  // Ring sweep: 0 → 100% within each count step.
  const radius = 88;
  const circumference = 2 * Math.PI * radius;

  return (
    <div
      className={`preloader${lifting ? " is-lifting" : ""}`}
      role="status"
      aria-label="Loading"
    >
      <div className="preloader__inner">
        <div className="preloader__ring">
          <svg viewBox="0 0 200 200" aria-hidden="true">
            <circle className="track" cx="100" cy="100" r={radius} />
            <circle
              key={count}
              className="sweep"
              cx="100"
              cy="100"
              r={radius}
              strokeDasharray={circumference}
              strokeDashoffset={circumference}
            >
              <animate
                attributeName="stroke-dashoffset"
                from={String(circumference)}
                to="0"
                dur={`${STEP_MS}ms`}
                fill="freeze"
              />
            </circle>
          </svg>
          <div className="preloader__count">{count}</div>
        </div>
        <div className="preloader__label mono">Picture start</div>
      </div>
    </div>
  );
}
