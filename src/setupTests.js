// Tell React the test environment supports act().
global.IS_REACT_ACT_ENVIRONMENT = true;

// jsdom does not implement window.matchMedia, but GSAP's ScrollTrigger
// calls it at registration time. A minimal stub keeps the suite honest
// without pretending any media query matches.
if (typeof window !== "undefined" && typeof window.matchMedia !== "function") {
  window.matchMedia = (query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => false,
  });
}
