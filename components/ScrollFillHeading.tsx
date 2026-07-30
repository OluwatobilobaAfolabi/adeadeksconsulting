"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { navHeight } from "./useScrollScrub";

/** Scroll distance each word consumes while it fills. */
const WORD_TRAVEL = 220;

type Word = { text: string; italic?: boolean };

const LINES: Word[][] = [
  [{ text: "Innovation." }],
  [{ text: "International" }, { text: "Development.", italic: true }],
  [{ text: "Impact" }, { text: "Delivery.", italic: true }],
];

const WORD_COUNT = LINES.reduce((sum, line) => sum + line.length, 0);
const TRAVEL = WORD_COUNT * WORD_TRAVEL;

/** Index of the first word on each line, so each word knows its turn. */
const LINE_OFFSETS = LINES.reduce<number[]>((acc, line, i) => {
  acc.push(i === 0 ? 0 : acc[i - 1] + LINES[i - 1].length);
  return acc;
}, []);

export default function ScrollFillHeading() {
  const zoneRef = useRef<HTMLDivElement>(null);
  // How many words are filled, fractionally (e.g. 2.4 = third word 40% filled).
  const [filled, setFilled] = useState(0);

  useEffect(() => {
    const zone = zoneRef.current;
    if (!zone) return;

    const update = () => {
      const top = zone.getBoundingClientRect().top;
      const progress = Math.min(Math.max(navHeight() - top, 0), TRAVEL);
      setFilled((progress / TRAVEL) * WORD_COUNT);
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
    <div ref={zoneRef} style={{ height: `calc(100vh - var(--nav-h) + ${TRAVEL}px)` }}>
      <div
        className="sticky flex items-center"
        style={{ top: "var(--nav-h)", height: "calc(100vh - var(--nav-h))" }}
      >
        <h2 className="heading-display">
          {LINES.map((line, lineIndex) => (
            <span key={LINE_OFFSETS[lineIndex]} className="block">
              {line.map((word, wordIndex) => {
                const fill = Math.min(Math.max(filled - (LINE_OFFSETS[lineIndex] + wordIndex), 0), 1);
                return (
                  <span key={word.text}>
                    <span
                      className={`fill-word ${word.italic ? "italic" : ""}`}
                      style={{ "--fill": `${fill * 100}%` } as CSSProperties}
                    >
                      {word.text}
                    </span>{" "}
                  </span>
                );
              })}
            </span>
          ))}
        </h2>
      </div>
    </div>
  );
}
