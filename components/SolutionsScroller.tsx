"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { navHeight, scrubTravel, useScrollScrub } from "./useScrollScrub";

const solutions = [
  {
    title: "Studio",
    desc: "A structured creative environment for teams ready to think differently.",
    img: "/images/sol-studio.png",
    href: "https://innovate2scaleplatform.com/idea-studio",
  },
  {
    title: "Lab",
    desc: "A dedicated space for rigorous experimentation and venture prototyping.",
    img: "/images/sol-lab.png",
    href: "https://innovate2scaleplatform.com/lab",
  },
  {
    title: "Tools",
    desc: "Proprietary assessments, playbooks, and strategic frameworks built for scaling.",
    img: "/images/sol-tools.png",
    href: "https://innovate2scaleplatform.com/tools",
  },
  {
    title: "Academy",
    desc: "Executive education and training designed by practitioners who have scaled.",
    img: "/images/sol-academy.png",
    href: "https://innovate2scaleplatform.com/academy",
  },
  {
    title: "Insights",
    desc: "The Scale Acceleration Index and curated intelligence for scale leaders.",
    img: "/images/sol-insights.png",
    href: "https://innovate2scaleplatform.com/insights",
  },
  {
    title: "Summit",
    desc: "Annual and quarterly convenings for leaders defining the future of scale.",
    img: "/images/sol-summit.png",
    href: "https://innovate2scaleplatform.com/summit",
  },
];

const DESKTOP_WINDOW_HEIGHT = 427;
const MOBILE_WINDOW_HEIGHT = 395;

export default function SolutionsScroller() {
  const zoneRef = useRef<HTMLDivElement>(null);
  const [windowHeight, setWindowHeight] = useState(DESKTOP_WINDOW_HEIGHT);

  const slidePos = useScrollScrub(solutions.length, zoneRef);
  const travel = scrubTravel(solutions.length);

  // Below 1240px the panel stacks, so the clipping window becomes a compact
  // card rather than filling the screen — but never taller than the space
  // left under the navbar, so the active panel can't run off-screen.
  useEffect(() => {
    const measure = () => {
      if (window.innerWidth < 1240) {
        setWindowHeight(Math.min(MOBILE_WINDOW_HEIGHT, window.innerHeight - navHeight() - 40));
      } else {
        setWindowHeight(DESKTOP_WINDOW_HEIGHT);
      }
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  const active = Math.round(slidePos);

  return (
    <div
      ref={zoneRef}
      className="relative"
      style={{ height: `calc(100vh - var(--nav-h) + ${travel}px)` }}
    >
      <div className="scrub-sticky">
        <div className="flex w-full items-start justify-center gap-8 lg:gap-16">
          {/* Scroll progress rail — desktop only */}
          <div aria-hidden className="solutions-rail shrink-0 flex-col gap-3 pt-8">
            {solutions.map((sol, i) => (
              <span
                key={sol.title}
                className={`w-1 rounded-[20px] transition-all duration-300 ${
                  active === i ? "h-[120px] bg-navy" : "h-8 bg-[#e0e0e0]"
                }`}
              />
            ))}
          </div>

          <div className="solutions-window" style={{ height: `${windowHeight}px` }}>
            <div
              className="solutions-track"
              style={{ transform: `translateY(${-slidePos * windowHeight}px)` }}
            >
              {solutions.map((sol) => (
                <div
                  key={sol.title}
                  className="solutions-panel"
                  style={{ height: `${windowHeight}px` }}
                >
                  <div className="solutions-panel-inner">
                    <div className="flex flex-col items-start gap-6 lg:w-[310px]">
                      <div className="flex flex-col gap-3">
                        <h3 className="heading-card">{sol.title}</h3>
                        <p className="text-base leading-[1.41]">{sol.desc}</p>
                      </div>
                      <a
                        href={sol.href}
                        className="group inline-flex items-center gap-2 text-base font-bold leading-[1.41] text-[#f2ad00]"
                      >
                        Learn More
                        <Image
                          src="/images/i2s/arrow-right.svg"
                          alt=""
                          width={20}
                          height={20}
                          className="transition-transform group-hover:translate-x-1"
                        />
                      </a>
                    </div>

                    <div className="solutions-media relative aspect-[532/362] w-full shrink-0 overflow-hidden rounded-[227px] bg-[#d9d9d9] lg:w-[532px]">
                      <Image
                        src={sol.img}
                        alt={sol.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 1024px) 100vw, 532px"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
