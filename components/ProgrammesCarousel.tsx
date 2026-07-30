"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { scrubScrollTo, scrubTravel, useScrollScrub } from "./useScrollScrub";

const programmes = [
  {
    title: "Frontiers for Innovation",
    points: [
      "Technology-enabled solution design",
      "Innovation ecosystem development",
      "Accelerator and incubator management",
      "Emerging technology adoption",
    ],
    img: "/images/prog-frontiers.png",
  },
  {
    title: "Food for Resilience",
    points: [
      "Agricultural systems strengthening",
      "Climate-smart food production",
      "Supply chain resilience",
      "Food security policy design",
    ],
    img: "/images/prog-food.png",
  },
  {
    title: "Foundations for Governance",
    points: [
      "Governance diagnostics and reform",
      "Public financial management",
      "Anti-corruption frameworks",
      "Institutional capacity building",
    ],
    img: "/images/prog-governance.png",
  },
  {
    title: "Financing for Access",
    points: [
      "Inclusive finance strategy",
      "Investment facilitation",
      "Blended finance advisory",
      "Capital mobilisation strategy",
    ],
    img: "/images/prog-financing.png",
  },
  {
    title: "Futures for Livelihoods",
    points: [
      "Future-of-work skills frameworks",
      "Youth employment programmes",
      "Gender-responsive inclusion",
      "Creative economy and cultural industries",
    ],
    img: "/images/prog-futures.png",
  },
  {
    title: "Facilities for Wellbeing",
    points: [
      "Health systems strengthening",
      "Mental health programme design",
      "Healthcare access and equity",
      "Climate, conservation, and environment",
    ],
    img: "/images/prog-facilities.png",
  },
];

export default function ProgrammesCarousel() {
  const zoneRef = useRef<HTMLDivElement>(null);
  const windowRef = useRef<HTMLDivElement>(null);
  const [stepWidth, setStepWidth] = useState(0);

  const slidePos = useScrollScrub(programmes.length, zoneRef);
  const travel = scrubTravel(programmes.length);

  // Each slide fills the masked window, so the step equals the window width.
  useEffect(() => {
    const measure = () => setStepWidth(windowRef.current?.clientWidth ?? 0);
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  const active = Math.round(slidePos);

  return (
    <div
      ref={zoneRef}
      className="carousel-zone relative"
      style={{ height: `calc(100vh - var(--nav-h) + ${travel}px)` }}
    >
      <div className="scrub-sticky">
        <div className="flex w-full flex-col items-center gap-8">
          <div className="relative w-full">
            {/* Gold ring echoing the oval outline behind the slide in the design */}
            <div
              aria-hidden
              className="pointer-events-none absolute left-1/2 top-1/2 hidden h-[calc(100%+40px)] w-[calc(min(866px,100vw-56px)+60px)] -translate-x-1/2 -translate-y-1/2 rounded-[430px] border border-[#f2ad00] lg:block"
            />

            <div ref={windowRef} className="programmes-window">
              <div
                className="programmes-track"
                style={{ transform: `translateX(${-slidePos * stepWidth}px)` }}
              >
                {programmes.map((prog, i) => (
                  <div key={prog.title} className="programmes-slide">
                    <div className="programme-oval relative w-full overflow-hidden bg-[#d9d9d9]">
                      <Image
                        src={prog.img}
                        alt={prog.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 1024px) 100vw, 866px"
                        priority={i === 0}
                      />
                      {/* White pill card sits over the lower part of the oval */}
                      <div className="programme-caption absolute left-1/2 flex -translate-x-1/2 flex-col items-center gap-3 bg-white px-6 py-5 text-center sm:px-10 lg:px-16 lg:py-8">
                        <p className="programme-caption-title font-serif text-base font-semibold leading-[1.41] sm:text-xl lg:text-2xl">
                          {prog.title}
                        </p>
                        <ul className="programme-caption-list list-disc pl-6 text-left text-[11px] leading-[1.41] sm:text-sm lg:text-base">
                          {prog.points.map((point) => (
                            <li key={point}>{point}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {programmes.map((prog, i) => (
              <button
                key={prog.title}
                type="button"
                onClick={() => scrubScrollTo(zoneRef.current, i)}
                aria-label={`Show ${prog.title}`}
                aria-current={active === i}
                className={`size-3 rounded-full transition-colors ${
                  active === i
                    ? "bg-navy"
                    : "border border-[#b5b5b5] bg-transparent hover:bg-[#e0e0e0]"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
