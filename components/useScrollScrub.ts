"use client";

import { useEffect, useState, type RefObject } from "react";

/** Pixels a slide sits stationary before it starts moving. */
export const DWELL = 420;
/** Pixels spent transitioning from one slide to the next. */
export const TRANSITION = 220;
/** Total scroll travel consumed per slide. */
export const STEP = DWELL + TRANSITION;

const clamp = (v: number, min: number, max: number) => Math.min(Math.max(v, min), max);

const easeInOutCubic = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

/** Height of the sticky navbar, read from the `--nav-h` custom property. */
export function navHeight() {
  if (typeof window === "undefined") return 0;
  const raw = getComputedStyle(document.documentElement).getPropertyValue("--nav-h");
  return parseFloat(raw) || 0;
}

export const scrubTravel = (count: number) => Math.max(0, count - 1) * STEP;

/**
 * Maps page scroll across a tall zone onto a continuous slide index. Each slide
 * dwells for DWELL pixels, then eases into the next over TRANSITION pixels, so
 * the returned position is fractional mid-transition (e.g. 2.4).
 */
export function useScrollScrub(count: number, zoneRef: RefObject<HTMLElement | null>) {
  const [pos, setPos] = useState(0);

  useEffect(() => {
    const zone = zoneRef.current;
    if (!zone) return;

    const travel = scrubTravel(count);

    const update = () => {
      // The sticky child pins once the zone's top reaches the navbar offset,
      // so progress is how far past that point we've scrolled.
      const progress = clamp(navHeight() - zone.getBoundingClientRect().top, 0, travel);
      const raw = progress / STEP;
      const index = Math.floor(raw);
      const within = (raw - index) * STEP;
      const t = clamp((within - DWELL) / TRANSITION, 0, 1);
      setPos(clamp(index + easeInOutCubic(t), 0, count - 1));
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [count, zoneRef]);

  return pos;
}

/** Scrolls the page so `index` becomes the resting slide of a scrub zone. */
export function scrubScrollTo(zone: HTMLElement | null, index: number) {
  if (!zone) return;
  const top = window.scrollY + zone.getBoundingClientRect().top - navHeight() + index * STEP + 1;
  window.scrollTo({ top, behavior: "smooth" });
}
