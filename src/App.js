import { useEffect, useState } from "react";
import "./index.css";
import { ScrollTrigger } from "./lib/gsap";
import Preloader from "./components/Preloader";
import Cursor from "./components/Cursor";
import GrainOverlay from "./components/GrainOverlay";
import Scrubber from "./components/Scrubber";
import Nav from "./components/Nav";
import Hero from "./components/Hero";
import Logline from "./components/Logline";
import Numbers from "./components/Numbers";
import Reel from "./components/Reel";
import Arc from "./components/Arc";
import Craft from "./components/Craft";
import Credits from "./components/Credits";

export default function App() {
  const [ready, setReady] = useState(false);

  // Recalculate pin distances once webfonts land, so the reel stays exact.
  useEffect(() => {
    const refresh = () => ScrollTrigger.refresh();
    let cancelled = false;
    if (typeof document !== "undefined" && document.fonts && document.fonts.ready) {
      document.fonts.ready
        .then(() => {
          if (!cancelled) refresh();
        })
        .catch(() => {});
    }
    window.addEventListener("load", refresh);
    return () => {
      cancelled = true;
      window.removeEventListener("load", refresh);
    };
  }, []);

  return (
    <>
      {!ready && <Preloader onDone={() => setReady(true)} />}
      <Cursor />
      <GrainOverlay />
      <Scrubber />
      <Nav />
      <main>
        <Hero ready={ready} />
        <Logline />
        <Numbers />
        <Reel />
        <Arc />
        <Craft />
        <Credits />
      </main>
    </>
  );
}
