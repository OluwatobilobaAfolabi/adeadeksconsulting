import Link from "next/link";
import Image from "next/image";

const linkColumns = [
  {
    heading: "Quick Links",
    links: [
      { label: "Home", href: "/" },
      { label: "Services", href: "/#services" },
    ],
  },
  {
    heading: "About Us",
    links: [
      { label: "Our Team", href: "/about#team" },
      { label: "Contact", href: "mailto:contact@adeadeksconsulting.com" },
    ],
  },
  {
    heading: "Legal",
    links: [
      { label: "Privacy Policy", href: "#" },
      { label: "Terms and Conditions", href: "#" },
    ],
  },
];

const contactPills = [
  {
    icon: "/images/icon-envelope-open.svg",
    label: "contact@adeadeksconsulting.com",
    href: "mailto:contact@adeadeksconsulting.com",
  },
  { icon: "/images/icon-mobile.svg", label: "+234 812 959 2813", href: "tel:+2348129592813" },
  {
    icon: "/images/icon-map-pin.svg",
    label: "5 Kwaji Close, Maitama, Federal Capital Territory",
    href: undefined,
  },
];

const socials = [
  { icon: "/images/icon-envelope.svg", label: "Email", href: "mailto:contact@adeadeksconsulting.com" },
  { icon: "/images/icon-instagram.svg", label: "Instagram", href: "#" },
  { icon: "/images/icon-linkedin.svg", label: "LinkedIn", href: "#" },
  { icon: "/images/icon-facebook.svg", label: "Facebook", href: "#" },
  { icon: "/images/icon-x.svg", label: "X", href: "#" },
];

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-white">
      {/* soft yellow glows approximating the blurred ellipses in the design */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_120%_at_75%_-20%,rgba(255,220,53,0.35),transparent_60%),radial-gradient(ellipse_50%_80%_at_0%_110%,rgba(255,220,53,0.22),transparent_60%)]"
      />

      <div className="container-site relative flex flex-col gap-12 pt-16 pb-8">
        <div className="flex flex-col gap-12 lg:flex-row lg:items-start lg:justify-between">
          <Image
            src="/images/logo.svg"
            alt="Ade Adeks Global Consulting"
            width={62}
            height={64}
            className="h-16 w-auto self-start"
          />

          <div className="flex flex-col gap-10 sm:flex-row sm:gap-16">
            {linkColumns.map((col) => (
              <div key={col.heading} className="flex flex-col gap-6">
                <p className="font-serif text-xl font-semibold">{col.heading}</p>
                <div className="flex flex-col gap-3 text-base font-medium">
                  {col.links.map((link) =>
                    link.href.startsWith("/") ? (
                      <Link key={link.label} href={link.href} className="hover:text-navy">
                        {link.label}
                      </Link>
                    ) : (
                      <a key={link.label} href={link.href} className="hover:text-navy">
                        {link.label}
                      </a>
                    ),
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="flex flex-col gap-6">
            <p className="font-serif text-xl font-semibold">Contact Us</p>
            <div className="flex flex-col items-start gap-3">
              {contactPills.map((pill) => {
                const content = (
                  <>
                    <Image src={pill.icon} alt="" width={20} height={20} />
                    <span className="text-sm font-medium sm:text-base">{pill.label}</span>
                  </>
                );
                const className =
                  "flex items-center gap-2 rounded-[25px] border-[1.5px] border-[#383838] bg-white/15 px-3 py-1";
                return pill.href ? (
                  <a key={pill.label} href={pill.href} className={className}>
                    {content}
                  </a>
                ) : (
                  <div key={pill.label} className={className}>
                    {content}
                  </div>
                );
              })}
            </div>
            <div className="flex items-center gap-4">
              {socials.map((social) => (
                <a key={social.label} href={social.href} aria-label={social.label}>
                  <Image src={social.icon} alt="" width={24} height={24} />
                </a>
              ))}
            </div>
            <a href="mailto:contact@adeadeksconsulting.com" className="btn-yellow h-12 w-fit">
              Reach Out to Us
              <Image src="/images/icon-paper-plane.svg" alt="" width={20} height={20} />
            </a>
          </div>
        </div>

        <div className="flex flex-col gap-8 border-t border-black/30 pt-8">
          <p className="text-center text-base font-medium">
            © 2026 Ade Adeks Global Consulting. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
