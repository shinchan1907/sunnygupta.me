import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Registered exactly once, here — every component imports from this module.
gsap.registerPlugin(ScrollTrigger);

export { gsap, ScrollTrigger };
