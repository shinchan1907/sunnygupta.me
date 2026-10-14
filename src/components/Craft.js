import { useRef } from "react";
import { useReveal } from "../hooks/useReveal";
import ChapterHead from "./ChapterHead";
import { toolkitRows, toolkitNote } from "../data/content";

function MarqueeRow({ items, reverse }) {
  const doubled = [...items, ...items];
  return (
    <div
      className={`marquee${reverse ? " marquee--reverse" : ""}`}
      aria-label={items.join(", ")}
    >
      <div className="marquee__track">
        {doubled.map((tool, i) => (
          <span
            className="pill"
            key={`${tool}-${i}`}
            aria-hidden={i >= items.length}
          >
            {tool}
          </span>
        ))}
      </div>
    </div>
  );
}

/** CH. 05 — THE CRAFT. Two counter-scrolling marquees of tool credits. */
export default function Craft() {
  const ref = useRef(null);
  useReveal(ref);

  // Split the note so the theme name gets the accent.
  const [noteLead, noteTail] = toolkitNote.split("Pitriciacle");

  return (
    <section id="craft" className="chapter" ref={ref} style={{ paddingLeft: 0, paddingRight: 0 }}>
      <div style={{ paddingLeft: "clamp(1.25rem, 6vw, 5rem)", paddingRight: "clamp(1.25rem, 6vw, 5rem)" }}>
        <ChapterHead
          no="05"
          title="The Craft"
          sub="Built with purpose and precision. The toolkit — technical credits."
        />
      </div>
      <div data-rv>
        <MarqueeRow items={toolkitRows[0]} />
        <MarqueeRow items={toolkitRows[1]} reverse />
      </div>
      <p
        className="craft__note"
        data-rv
        style={{ paddingLeft: "clamp(1.25rem, 6vw, 5rem)", paddingRight: "clamp(1.25rem, 6vw, 5rem)" }}
      >
        {noteLead}
        <strong>Pitriciacle</strong>
        {noteTail}
      </p>
    </section>
  );
}
