import Image from "next/image";
import RotatingGlobe from "@/components/RotatingGlobe";
import ScrollFillHeading from "@/components/ScrollFillHeading";
import SplitRow from "@/components/SplitRow";

const marqueeImages = [
  "/images/hero-1.jpg",
  "/images/hero-2.jpg",
  "/images/hero-3.jpg",
  "/images/hero-4.jpg",
  "/images/hero-5.jpg",
];

const valueCards = [
  {
    title: "Our Vision",
    body: "A world where every product and service can achieve the million impact and create lasting opportunities for people everywhere.",
    img: "/images/card-lens-1.jpg",
    border: "border-[#ff6433]",
    caption: "bg-[#ffd8cc]",
    stagger: "",
  },
  {
    title: "Our Mission",
    body: "To achieve this vision, we will unlock pathways that enhance the scalability of products and services with strategies, structures that accelerate impact.",
    img: "/images/card-lens-2.jpg",
    border: "border-[#fab9d5]",
    caption: "bg-[#feecf3]",
    stagger: "lg:mt-[239px]",
  },
  {
    title: "Our Values",
    body: "We will abide by a core set of principles guided by faith for the impossible, impact at scale, innovation for heart and partnership for delivery.",
    img: "/images/card-lens-3.jpg",
    border: "border-[#ffda00]",
    caption: "bg-[#fffadb]",
    stagger: "lg:mt-[477px]",
  },
];

const services = [
  {
    title: "Consulting Services",
    body: "Strategy-driven advisory services for growth and scale excellence. International Development, Partnership and Ecosystems, Innovation Management, HR and Capacity Building, Delivery and Implementation, Coaching and Mentoring.",
    img: "/images/service-consulting.jpg",
    href: "https://innovate2scaleplatform.com/consulting",
  },
  {
    title: "Programme Services",
    body: "Transformative programmes developing individuals, leaders, entrepreneurs, and organizations. Frontiers for Innovation, Food for Resilience, Foundations for Governance, Financing for Access, Futures for Livelihoods, Facilities for Wellbeing.",
    img: "/images/service-programme.jpg",
    href: "https://innovate2scaleplatform.com/programmes",
  },
  {
    title: "Solution Services",
    body: "Innovative solutions designed for lasting impact. Innovate2Scale Lab, Innovate2Scale Toolkit, Innovate2Scale Academy, Innovate2Scale Insights, Innovate2Scale Studio, Innovate2Scale Summit.",
    img: "/images/service-solution.jpg",
    href: "https://innovate2scaleplatform.com/solutions",
  },
];

const initiatives = [
  {
    title: "Innovate2Scale Lab",
    body: "A space where bold solutions scale with an ecosystem lens powered by the innovate2scale platform with a focus on harnessing the digital economy, system innovations and partnerships.",
    img: "/images/initiative-lab.jpg",
    href: "https://innovate2scaleplatform.com/initiatives/lab",
  },
  {
    title: "KirAkira Africa Collective",
    body: "A suite of solutions around higher education, policy instruments and innovation with focus on children and young people to build a safe and secure future for Africa.",
    img: "/images/initiative-kirakira.jpg",
    href: "https://innovate2scaleplatform.com/initiatives/kirakira",
  },
  {
    title: "We-Scale",
    body: "Shapes pathways for improving access to quality jobs, financing and living through inclusive opportunities and economy by harnessing the power of creativity and innovation.",
    img: "/images/initiative-wescale.jpg",
    href: "https://innovate2scaleplatform.com/initiatives/we-scale",
  },
];

const initiativeTags = ["Scaling Bold Solutions", "Scaling the Future", "Scaling Livelihoods"];

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="overflow-hidden bg-white pt-16 pb-11 lg:pt-[104px]">
        <div className="container-site flex flex-col items-start gap-6">
          <div className="flex flex-col gap-4">
            <h1 className="heading-display">
              <span className="text-black">Scaling</span>{" "}
              <span className="text-[#e3bb00]">Futures</span>
            </h1>
            <p className="max-w-[644px] text-lg leading-[1.41]">
              At Ade Adeks Global Consulting, we drive growth from early-stage ideas to
              large-scale impact. By shaping policies, talent, finance, and markets, we bridge
              the &quot;missing middle&quot; to help businesses scale and succeed.
            </p>
          </div>
          <a href="https://innovate2scaleplatform.com/" className="btn-yellow h-14">
            Check Out Innovate2scale
            <Image src="/images/icon-link.svg" alt="" width={20} height={20} />
          </a>
        </div>
        <div className="mt-16 overflow-hidden pl-4 sm:pl-8 lg:pl-16">
          <div className="animate-marquee flex w-max gap-6">
            {[...marqueeImages, ...marqueeImages].map((src, i) => (
              <div
                key={i}
                className="relative size-[260px] shrink-0 bg-[#d9d9d9] md:size-[340px] xl:size-[421px]"
              >
                <Image
                  src={src}
                  alt=""
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 260px, 421px"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Innovation / Vision / Mission / Values */}
      <section className="bg-white py-16 lg:py-[104px]">
        <div className="container-site flex flex-col gap-16">
          <ScrollFillHeading />
          <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:gap-6">
            {valueCards.map((card) => (
              <div
                key={card.title}
                className={`relative aspect-[421/477] w-full max-w-[421px] overflow-hidden border-[12px] ${card.border} ${card.stagger}`}
              >
                <Image
                  src={card.img}
                  alt=""
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 421px"
                />
                <div
                  className={`absolute inset-x-3 bottom-3 flex flex-col gap-1 px-4 py-3 ${card.caption}`}
                >
                  <p className="font-serif text-[22px] font-semibold leading-[1.41]">
                    {card.title}
                  </p>
                  <p className="text-base leading-[1.41]">{card.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Services */}
      <section id="services" className="bg-surface py-16 lg:py-[104px]">
        <div className="container-site flex flex-col gap-16">
          <div className="flex flex-col gap-4">
            <h2 className="heading-display">Our Services</h2>
            <p className="max-w-[644px] text-lg leading-[1.41]">
              We work with businesses, governments, social enterprises, coalition and donors to
              turn ideas into scalable impact, leveraging our suite of interventions from design
              studio, strategy formulation, scale leadership, skills development, system
              strengthening, and strategic collaboratives across our three core practice areas
              to drive sustainable impact.
            </p>
          </div>
          <div className="flex flex-col gap-16">
            {services.map((service, i) => (
              <SplitRow key={service.title} {...service} alt={service.title} reverse={i % 2 === 1} />
            ))}
          </div>
        </div>
      </section>

      {/* The Voices of Scale */}
      <section className="bg-white py-16 lg:py-[104px]">
        <div className="container-site">
          <div className="overflow-hidden bg-[#202020] px-6 py-12 sm:px-10 sm:py-16 lg:px-16 lg:py-[88px]">
            <div className="flex flex-col items-center gap-10 text-white lg:flex-row lg:items-center lg:justify-between lg:gap-8">
              <div className="flex w-full flex-col gap-4 lg:max-w-[542px] lg:flex-1">
                <h2 className="heading-display">The Future of Scale</h2>
                <p className="text-lg leading-[1.41]">
                  &quot;95% of new solutions fail to scale. 95% of development programmes do not
                  succeed beyond pilot. 95% of AI projects do not deliver business value. The
                  question is no longer why innovations fail... it is what it will take to make
                  them succeed in different markets, institutions and ecosystems.&quot;
                  <br />
                  <span className="font-bold">Source: MIT.Devex</span>
                </p>
              </div>
              <RotatingGlobe className="w-full max-w-[320px] sm:max-w-[400px] lg:w-[469px] lg:max-w-none lg:shrink-0" />
            </div>
          </div>
        </div>
      </section>

      {/* Innovate2Scale Initiatives */}
      <section className="bg-surface py-16 lg:py-[104px]">
        <div className="container-site flex flex-col gap-16">
          <div className="flex flex-col gap-4">
            <h2 className="heading-display">
              Innovate2Scale <span className="font-serif italic text-muted">Initiatives</span>
            </h2>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
              {initiativeTags.map((tag, i) => (
                <span key={tag} className="flex items-center gap-4">
                  {i > 0 && <span className="size-2 rounded-full bg-black" />}
                  <span className="font-serif text-xl font-medium leading-[1.41] md:text-2xl">
                    {tag}
                  </span>
                </span>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-16">
            {initiatives.map((initiative, i) => (
              <SplitRow
                key={initiative.title}
                {...initiative}
                alt={initiative.title}
                reverse={i % 2 === 1}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
