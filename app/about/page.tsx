import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "About Us | Ade Adeks Global Consulting",
  description:
    "At the heart of our work is a dynamic network of experts and professionals united by a shared commitment to delivering impact at scale across industries, sectors, and borders.",
};

type TeamMember = {
  name: string;
  role: string;
  img: string;
};

const seniorAdvisors: TeamMember[] = [
  { name: "Ade O. Ade", role: "Strategy, Innovation & Transformation.", img: "/images/team-ade.png" },
  { name: "Dr Victor Ugo", role: "Programmes & Development.", img: "/images/team-victor.png" },
  { name: "Gloria Momoh", role: "Partnerships & Private Sector.", img: "/images/team-gloria.jpg" },
];

const consultants: TeamMember[] = [
  { name: "Bisi Adekola", role: "Women and Creatives.", img: "/images/team-bisi.png" },
  { name: "David Ahiante", role: "Policy, Youth & Engagement.", img: "/images/team-david.png" },
  { name: "Eva Okpallannuozo", role: "Talent Transformation.", img: "/images/team-eva.png" },
  { name: "Obaloluwa Ajiboye", role: "Technology, Innovation & Ecosystems.", img: "/images/team-obaloluwa.png" },
];

function TeamCard({ member }: { member: TeamMember }) {
  return (
    <div className="relative aspect-square w-full overflow-hidden bg-[#dedede]">
      <Image
        src={member.img}
        alt={member.name}
        fill
        className="object-cover"
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 310px"
      />
      <div className="absolute inset-x-2 bottom-2 flex flex-col gap-1 bg-white p-2">
        <div className="flex items-start justify-between gap-2">
          <p className="font-serif text-lg font-semibold leading-[1.41]">{member.name}</p>
          <a href="#" aria-label={`${member.name} on LinkedIn`} className="shrink-0">
            <Image src="/images/icon-linkedin-box.svg" alt="" width={24} height={24} />
          </a>
        </div>
        <p className="text-sm leading-[1.41]">{member.role}</p>
      </div>
    </div>
  );
}

export default function About() {
  return (
    <>
      {/* Hero */}
      <section className="bg-white pt-6 pb-16 lg:pt-[88px] lg:pb-[88px]">
        <div className="container-site">
          <div className="relative flex min-h-[520px] items-end overflow-hidden md:min-h-[640px] lg:min-h-[775px]">
            <Image
              src="/images/about-hero.jpg"
              alt=""
              fill
              className="object-cover"
              priority
              sizes="(max-width: 1440px) 100vw, 1312px"
            />
            <div
              aria-hidden
              className="absolute inset-0 bg-gradient-to-b from-[rgba(102,102,102,0.72)] from-[21%] to-[rgba(0,0,0,0.72)] to-[66%]"
            />
            <div className="relative flex flex-col gap-4 p-6 pb-10 text-white sm:p-12 lg:p-[52px] lg:pb-[57px]">
              <h1 className="heading-display">
                Built For Scale
                <br />
                Powered by People
              </h1>
              <p className="max-w-[644px] text-lg leading-[1.41]">
                At the heart of our work is a dynamic network of experts and professionals
                united by a shared commitment to delivering impact at scale across industries,
                sectors, and borders. With more than 20 years of experience, our team brings
                together expertise, networks and insights.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Leadership Note */}
      <section className="bg-surface py-16 lg:py-[104px]">
        <div className="container-site flex flex-col gap-12 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex max-w-[644px] flex-col gap-4">
            <h2 className="heading-display">Leadership Note</h2>
            <div className="flex flex-col gap-6 text-lg leading-[1.41]">
              <p>
                The future does not belong to organizations with the most ideas. It belongs to
                those that can transform bold ideas into measurable impactful solutions and
                doing so consistently, sustainably, and at scale. Welcome to Ade Adeks Global
                Consulting, the Innovate2Scale Hub, where strategy and innovation meets
                delivery at scale.
              </p>
              <p>
                We believe that innovation is not an event; it is a capability. Our mission is
                to help organizations create lasting impact through innovative thinking,
                trusted partnerships, and practical solutions that deliver real-world results.
                Whether shaping policy, strengthening institutions, designing transformative
                programs, or accelerating organizational growth, we work alongside our clients
                to deliver value
              </p>
              <p>
                At the heart of our work are our people which is our greatest asset. Their
                expertise, dedication, and global experience empower us to navigate complex
                environments and deliver solutions that are practical, scalable, and enduring.
              </p>
            </div>
          </div>
          <div className="relative aspect-square w-full max-w-[533px] shrink-0 overflow-hidden bg-[#dedede]">
            <Image
              src="/images/team-md.png"
              alt="Ade O. Ade, Managing Director"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 533px"
            />
            <div className="absolute inset-x-4 bottom-4 flex flex-col gap-2 bg-white p-6">
              <div className="flex items-start justify-between gap-2">
                <p className="font-serif text-2xl font-semibold leading-[1.41]">Ade O. Ade</p>
                <a href="#" aria-label="Ade O. Ade on LinkedIn" className="shrink-0">
                  <Image src="/images/icon-linkedin-box.svg" alt="" width={32} height={32} />
                </a>
              </div>
              <p className="text-lg leading-[1.41]">Managing Director</p>
            </div>
          </div>
        </div>
      </section>

      {/* Meet The Team */}
      <section id="team" className="bg-white py-16 lg:py-[104px]">
        <div className="container-site flex flex-col gap-16">
          <div className="flex flex-col gap-4">
            <h2 className="heading-display">Meet The Team That Makes The Magic Happen</h2>
            <p className="max-w-[644px] text-lg leading-[1.41]">
              Our diverse team of excellent people.
            </p>
          </div>

          <div className="flex flex-col gap-6">
            <div className="flex max-w-[644px] flex-col gap-2">
              <h3 className="heading-card">Senior Advisors</h3>
              <p className="text-base leading-[1.41]">
                Our Senior Advisors are experienced industry leaders who provide strategic
                guidance, executive insight, and trusted counsel. Drawing on over 20 years of
                leadership across diverse sectors, they help clients navigate analyse complex
                business challenges, leverage innovation and scale solutions.
              </p>
            </div>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {seniorAdvisors.map((member) => (
                <TeamCard key={member.name} member={member} />
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-6">
            <div className="flex max-w-[644px] flex-col gap-2">
              <h3 className="heading-card">Consultants</h3>
              <p className="text-base leading-[1.41]">
                Our Consultants work closely with clients to develop practical, customised
                solutions that address their unique business needs. Combining technical
                expertise, analytical thinking, and hands-on experience, they deliver
                actionable strategies, improve operational performance, and support successful
                advisory, innovation and delivery.
              </p>
            </div>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {consultants.map((member) => (
                <TeamCard key={member.name} member={member} />
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
