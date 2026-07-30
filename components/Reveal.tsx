"use client";

import { useEffect, useRef } from "react";

type RevealProps = {
  /** Side the element slides in from. */
  from?: "left" | "right";
  className?: string;
  children: React.ReactNode;
};

/** Fraction of the element's height currently inside the viewport. */
function visibleRatio(el: HTMLElement) {
  const rect = el.getBoundingClientRect();
  if (rect.height === 0) return 0;
  const viewport = window.innerHeight || document.documentElement.clientHeight;
  const visible = Math.min(rect.bottom, viewport) - Math.max(rect.top, 0);
  return Math.max(0, visible) / rect.height;
}

export default function Reveal({ from = "left", className = "", children }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const show = () => el.classList.add("is-in");

    // Safety net: the hidden state is opacity 0, so anything that stops the
    // observer from delivering would leave the card invisible for good. Reveal
    // straight away when it's unsupported, or already on screen at mount.
    if (typeof IntersectionObserver === "undefined" || visibleRatio(el) >= 0.15) {
      show();
      return;
    }

    // Reveal once, at 15% visibility, then stop observing.
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          show();
          observer.unobserve(el);
        }
      },
      { threshold: 0.15 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className={`reveal reveal-${from} ${className}`}>
      {children}
    </div>
  );
}
