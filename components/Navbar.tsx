"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

const links = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About Us" },
  { href: "/innovate2scale", label: "Innovate2scale" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-[#f5f5f5] bg-white/88 backdrop-blur-[5px]">
      <div className="container-site flex h-[72px] items-center justify-between md:h-[88px]">
        <Link href="/" onClick={() => setOpen(false)} aria-label="Ade Adeks Global Consulting — Home">
          <Image
            src="/images/logo.svg"
            alt="Ade Adeks Global Consulting"
            width={62}
            height={64}
            className="h-12 w-auto md:h-16"
            priority
          />
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          <div className="flex items-center gap-10 text-base">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={
                  pathname === link.href
                    ? "font-bold text-navy underline underline-offset-4"
                    : "text-black hover:text-navy"
                }
              >
                {link.label}
              </Link>
            ))}
          </div>
          <a href="mailto:contact@adeadeksconsulting.com" className="btn-yellow h-12">
            Contact Us
          </a>
        </nav>

        <button
          type="button"
          className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 md:hidden"
          aria-expanded={open}
          aria-label="Toggle menu"
          onClick={() => setOpen(!open)}
        >
          <span
            className={`h-0.5 w-6 bg-navy transition-transform ${open ? "translate-y-1 rotate-45" : ""}`}
          />
          <span
            className={`h-0.5 w-6 bg-navy transition-transform ${open ? "-translate-y-1 -rotate-45" : ""}`}
          />
        </button>
      </div>

      {open && (
        <nav className="border-t border-[#f5f5f5] bg-white md:hidden">
          <div className="container-site flex flex-col gap-4 py-6">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className={
                  pathname === link.href
                    ? "font-bold text-navy underline underline-offset-4"
                    : "text-black"
                }
              >
                {link.label}
              </Link>
            ))}
            <a
              href="mailto:contact@adeadeksconsulting.com"
              className="btn-yellow h-12 w-fit"
              onClick={() => setOpen(false)}
            >
              Contact Us
            </a>
          </div>
        </nav>
      )}
    </header>
  );
}
