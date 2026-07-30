import type { Metadata } from "next";
import Image from "next/image";
import ProgrammesCarousel from "@/components/ProgrammesCarousel";
import Reveal from "@/components/Reveal";
import SolutionsScroller from "@/components/SolutionsScroller";

export const metadata: Metadata = {
  title: "Innovate2scale | Ade Adeks Global Consulting",
  description:
    "An innovation scale platform working with executives, entrepreneurs and ecosystems to solve the scale challenge and prepare the future generation of scale leaders and institutions.",
};

// `place` pins each card to its own grid row so the columns interlock rather than
// sharing a row; odd cards sit right, even cards left, as in the design. Below
// 1240px the grid collapses and the cards stack in source order.
const purposeCards = [
  {
    num: "01",
    title: "Systems Informed Methodology",
    img: "/images/purpose-systems.png",
    place: "min-[1240px]:col-start-2 min-[1240px]:row-start-1",
    from: "right" as const,
  },
  {
    num: "02",
    title: "Practitioner Led Programmes",
    img: "/images/purpose-practitioner.png",
    place: "min-[1240px]:col-start-1 min-[1240px]:row-start-2",
    from: "left" as const,
  },
  {
    num: "03",
    title: "Evidence Based Decisions",
    img: "/images/purpose-evidence.png",
    place: "min-[1240px]:col-start-2 min-[1240px]:row-start-3",
    from: "right" as const,
  },
  {
    num: "04",
    title: "Global Reach, Local Relevance",
    img: "/images/purpose-global.png",
    place: "min-[1240px]:col-start-1 min-[1240px]:row-start-4",
    from: "left" as const,
  },
];

// Listed row by row so the 2-column grid reproduces the design's column order.
const consultancyCards = [
  {
    title: "International Development",
    desc: "Cross-border strategy, donor engagement, & development programme design.",
    icon: "/images/i2s/globe.svg",
    tint: "bg-[#ccfffc]",
  },
  {
    title: "Innovation",
    desc: "Innovation strategy, human-centred design, & corporate innovation lab setup.",
    icon: "/images/i2s/lightbulb-navy.svg",
    tint: "bg-[#ffcd50]",
  },
  {
    title: "Capacity Building and HR",
    desc: "Organisational capability, leadership development, HR strategy, talent, & people systems.",
    icon: "/images/i2s/briefcase.svg",
    tint: "bg-[#ef6bd5]",
  },
  {
    title: "Impact Delivery",
    desc: "Programme management, adaptive delivery, & results-based accountability.",
    icon: "/images/i2s/arrows-out.svg",
    tint: "bg-[#b2e042]",
  },
  {
    title: "Partnerships & Ecosystems",
    desc: "Designing & sustaining high-value multi-stakeholder alliances, ecosystems, & public-private collaborations.",
    icon: "/images/i2s/users-four.svg",
    tint: "bg-[#d5573b]",
  },
  {
    title: "Coaching",
    desc: "Gallup Certified Strengths Coaching for executives, teams, and high-potential talent.",
    icon: "/images/i2s/chart-bar.svg",
    tint: "bg-[#e1d5ed]",
  },
];

const partnershipCards = [
  { title: "Adopt\nan Initiative", icon: "/images/i2s/hand-arrow-down.svg", tint: "bg-[#ccfffc]" },
  { title: "Donate to\nan Initiative", icon: "/images/i2s/hand-coins.svg", tint: "bg-[#ffcd50]" },
  { title: "Volunteer to\nan Initiative", icon: "/images/i2s/hand-fist.svg", tint: "bg-[#ef6bd5]" },
  { title: "Co-create\nwith Us", icon: "/images/i2s/users-three.svg", tint: "bg-[#b2e042]" },
  {
    title: "Joint Ventures and Collaboratives",
    icon: "/images/i2s/users-four.svg",
    tint: "bg-[#d5573b]",
  },
];

const CONTACT = "mailto:contact@adeadeksconsulting.com";

export default function Innovate2Scale() {
  return (
    <>
      {/* 1 — Hero */}
      <section className="bg-white pt-10">
        <div className="container-site">
          <div className="relative flex min-h-[560px] items-center overflow-hidden md:min-h-[700px] lg:h-[870px]">
            <Image
              src="/images/innovate2scale-hero.png"
              alt=""
              fill
              className="object-cover"
              priority
              sizes="(max-width: 1440px) 100vw, 1312px"
            />
            <div aria-hidden className="absolute inset-0 bg-black/40" />

            <div className="relative w-full p-8 sm:p-12 lg:p-16">
              <div className="flex w-full max-w-[803px] flex-col items-start gap-6">
                <div className="inline-flex items-center justify-center gap-2 rounded-[60px] border border-white bg-white/30 px-8 py-2.5">
                  <Image src="/images/i2s/lightbulb-white.svg" alt="" width={20} height={20} />
                  <span className="text-base text-white">Bridging Ideas to Scaled Impact</span>
                </div>

                <div className="flex flex-col gap-4 text-white">
                  <h1 className="heading-display">
                    Scaling the
                    <br />
                    Future Together
                  </h1>
                  <p className="text-lg leading-[1.41]">
                    An innovation scale platform working with executives, entrepreneurs and
                    ecosystems to solve the scale challenge and prepare the future generation of
                    scale leaders and institutions.
                  </p>
                </div>

                <a href={CONTACT} className="btn-yellow h-14">
                  Reach Out to Us
                  <Image src="/images/i2s/paper-plane-tilt.svg" alt="" width={20} height={20} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2 — Our Purpose */}
      <section className="relative overflow-hidden bg-[#eef3fc] py-16 lg:py-[104px]">
        <div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-1/2 size-[1600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.55)_0%,rgba(255,255,255,0)_62%)]"
        />
        <div className="container-site relative flex flex-col gap-16">
          <div className="flex max-w-[755px] flex-col items-start gap-6">
            <span className="badge-pill">
              <Image src="/images/i2s/target.svg" alt="" width={20} height={20} />
              Our Purpose
            </span>
            <div className="flex flex-col gap-4">
              <h2 className="heading-section">
                We Bridge the Gap Between What Works and What Scales.
              </h2>
              <p className="text-lg leading-[1.41]">
                Across six integrated service areas and six flagship programmes, we work with
                leaders, organisations, and ecosystems to move proven solutions from pilot to scale,
                grounded in systems thinking and rigorous evidence.
              </p>
            </div>
          </div>

          {/* Zigzag: odd cards sit in the right column, even cards in the left,
              each pulled up so neighbouring columns interlock as in the design. */}
          <div className="flex flex-col gap-12 min-[1240px]:grid min-[1240px]:grid-cols-2 min-[1240px]:gap-x-14 min-[1240px]:gap-y-0">
            {purposeCards.map((card, i) => (
              <Reveal
                key={card.num}
                from={card.from}
                className={`flex flex-col items-center justify-center gap-4 ${card.place} ${
                  i > 0 ? "min-[1240px]:-mt-[134px]" : ""
                }`}
              >
                <div className="relative aspect-[422/589] w-full max-w-[422px] overflow-hidden rounded-[230px] bg-[#d9d9d9]">
                  <Image
                    src={card.img}
                    alt={card.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 422px"
                  />
                </div>
                <div className="flex items-center gap-2 text-xl md:text-2xl">
                  <span className="font-bold text-[#f2ad00]">{card.num}</span>
                  <span className="font-serif font-semibold leading-[1.41]">{card.title}</span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 3 — Programmes */}
      <section className="bg-white py-16 lg:py-[104px]">
        <div className="container-site flex flex-col gap-16">
          <div className="flex max-w-[755px] flex-col items-start gap-4">
            <span className="badge-pill">
              <Image src="/images/i2s/handshake.svg" alt="" width={20} height={20} />
              Programmes
            </span>
            <h2 className="heading-section">Programmes Built for Scaled Impact</h2>
            <p className="text-lg leading-[1.41]">
              Bridging early-stage ideas to scaled impact. We empower forward-thinking executives,
              entrepreneurs, and growth leaders across Africa and globally.
            </p>
          </div>

          <ProgrammesCarousel />

          <a href={CONTACT} className="btn-yellow mx-auto h-14">
            Get in Touch for more Information
            <Image src="/images/i2s/paper-plane-tilt.svg" alt="" width={20} height={20} />
          </a>
        </div>
      </section>

      {/* 4 — Consultancy */}
      <section className="bg-white py-16 lg:py-[104px]">
        <div className="container-site flex flex-col gap-12 lg:flex-row lg:items-center lg:gap-16">
          <div className="flex flex-col items-start gap-8 lg:w-[484px] lg:shrink-0">
            <div className="flex flex-col items-start gap-4">
              <span className="badge-pill">
                <Image src="/images/i2s/handshake-alt.svg" alt="" width={20} height={20} />
                Consultancy
              </span>
              <h2 className="heading-section">Advisory Built Around Your Challenge</h2>
              <p className="text-lg leading-[1.41]">
                Ade Adeks Global Consulting delivers specialist advisory supporting organisations to
                solve complex challenges, build capability, and achieve scaled, sustainable impact.
              </p>
            </div>
            <a href="https://innovate2scaleplatform.com/consulting" className="btn-yellow h-14">
              Explore Consultancy
              <Image src="/images/i2s/binoculars.svg" alt="" width={20} height={20} />
            </a>
          </div>

          <div className="grid flex-1 grid-cols-1 border-[#e5e5e5] sm:grid-cols-2 sm:border-l sm:border-t">
            {consultancyCards.map((card) => (
              <div
                key={card.title}
                className="flex justify-center border-[#e5e5e5] px-2 py-8 sm:border-b sm:border-r"
              >
                <div className="flex w-full max-w-[310px] flex-col items-center gap-4 rounded-[120px] bg-white p-6 text-center">
                  <div className={`flex items-center rounded-[32px] p-3 ${card.tint}`}>
                    <Image src={card.icon} alt="" width={56} height={56} />
                  </div>
                  <div className="flex flex-col gap-3">
                    <h3 className="font-serif text-xl font-semibold leading-[1.41]">{card.title}</h3>
                    <p className="text-base leading-[1.41]">{card.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5 — Solutions */}
      <section className="bg-white py-16 lg:py-[104px]">
        <div className="container-site flex flex-col gap-16">
          <div className="flex max-w-[644px] flex-col items-start gap-8">
            <div className="flex flex-col items-start gap-4">
              <span className="badge-pill">
                <Image src="/images/i2s/lightbulb.svg" alt="" width={20} height={20} />
                Solutions
              </span>
              <h2 className="heading-section">Platforms That Power Every Stage</h2>
            </div>
            <a href="https://innovate2scaleplatform.com/solutions" className="btn-yellow h-14">
              Explore Solutions
              <Image src="/images/i2s/binoculars.svg" alt="" width={20} height={20} />
            </a>
          </div>

          <SolutionsScroller />
        </div>
      </section>

      {/* 6 — Scale Acceleration Index */}
      <section className="bg-[#eef3fc] py-16 lg:py-[104px]">
        <div className="container-site flex flex-col gap-12 lg:flex-row lg:items-center lg:justify-between lg:gap-16">
          <div className="flex flex-col items-start gap-8 lg:w-[533px] lg:shrink-0">
            <div className="flex flex-col items-start gap-4">
              <span className="badge-pill">
                <Image src="/images/i2s/pipe-wrench.svg" alt="" width={20} height={20} />
                Flagship Tool
              </span>
              <h2 className="heading-section">The Scale Acceleration Index</h2>
              <p className="text-lg leading-[1.41]">
                A living diagnostic platform that measures the conditions for scale across
                organisations and systems. Used by leaders, teams, and partners to benchmark
                progress, identify bottlenecks, and prioritise action.
              </p>
            </div>
            <a href="https://scale-accelerator.replit.app/" className="btn-yellow h-14">
              Start Your Assessment
              <Image src="/images/i2s/note-pencil.svg" alt="" width={20} height={20} />
            </a>
          </div>

          <div className="relative aspect-[644/438] w-full overflow-hidden rounded-[24px] lg:w-[644px]">
            <Image
              src="/images/scale-index.png"
              alt="The Scale Acceleration Index dashboard"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 644px"
            />
          </div>
        </div>
      </section>

      {/* 7 — Partnerships */}
      <section className="bg-white py-16 lg:py-[104px]">
        <div className="container-site flex flex-col gap-16">
          <div className="flex max-w-[978px] flex-col items-start gap-8">
            <div className="flex flex-col items-start gap-4">
              <span className="badge-pill">
                <Image src="/images/i2s/handshake-alt.svg" alt="" width={20} height={20} />
                Partnerships
              </span>
              <h2 className="heading-section">Good Solutions Deserve Allies</h2>
              <p className="max-w-[533px] text-lg leading-[1.41]">
                Scaling requires more than one organisation. We partner with foundations,
                institutions, corporations, and individuals who share a genuine commitment to
                impact.
              </p>
            </div>
            <a href="https://innovate2scaleplatform.com/partnership" className="btn-yellow h-14">
              Explore Partnerships
              <Image src="/images/i2s/binoculars-alt.svg" alt="" width={20} height={20} />
            </a>
          </div>

          <div className="grid grid-cols-1 border-[#e5e5e5] sm:grid-cols-2 sm:border-l sm:border-t lg:grid-cols-3">
            {partnershipCards.map((card) => (
              <div
                key={card.title}
                className="flex justify-center border-[#e5e5e5] px-2 py-8 sm:border-b sm:border-r"
              >
                <div className="flex w-full max-w-[310px] flex-col items-center gap-4 rounded-2xl p-6">
                  <div className={`flex items-center rounded-[32px] p-3 ${card.tint}`}>
                    <Image src={card.icon} alt="" width={56} height={56} />
                  </div>
                  <h3 className="whitespace-pre-line text-center font-serif text-xl font-semibold leading-[1.41]">
                    {card.title}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
