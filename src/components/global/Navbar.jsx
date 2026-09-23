"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Playfair_Display, Cormorant_Garamond } from "next/font/google";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["600", "700"],
  variable: "--font-playfair",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["500", "600"],
  variable: "--font-cormorant",
});

const NAV_LINKS = [
  { label: "Itinerary", href: "#itinerary" },
  { label: "Travels", href: "#travels" },
  { label: "Important FAQ", href: "#faq" },
  { label: "Visuals", href: "#visuals" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [progress, setProgress] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const top = window.scrollY;
      const max =
        document.documentElement.scrollHeight - window.innerHeight;

      setScrolled(top > 40);
      setProgress(max > 0 ? Math.min((top / max) * 100, 100) : 0);
    };

    onScroll();

    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  // Prevent page scrolling when mobile menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  // Close menu with Escape key
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
      }
    };

    if (menuOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [menuOpen]);

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <>
      {/* =========================
          DESKTOP / MAIN NAVBAR
      ========================== */}
      <nav
        className={`${playfair.variable} ${cormorant.variable} fixed top-0 left-0 z-[100] w-full transition-all duration-500 ${
          scrolled
            ? "bg-[#fdfaf6]/95 shadow-[0_4px_24px_rgba(90,40,70,0.08)] backdrop-blur-sm"
            : "bg-gradient-to-b from-black/35 to-transparent"
        }`}
      >
        {/* Scroll progress */}
        <div
          className="absolute top-0 left-0 h-[3px] bg-[#b23a70] transition-[width] duration-150 ease-out"
          style={{ width: `${progress}%` }}
        />

        <div className="mx-auto flex max-w-[1600px] items-center justify-between px-6 py-4 md:px-10 md:py-5 lg:px-16">
          {/* Logo */}
          <Link
            href="/"
            className={`relative z-[120] text-2xl font-bold tracking-wide transition-colors duration-500 md:text-3xl [font-family:var(--font-playfair)] ${
              scrolled || menuOpen ? "text-[#b23a70]" : "text-white"
            }`}
          >
            N&amp;S
          </Link>

          {/* Desktop links */}
          <div
            className={`hidden items-center gap-8 text-[13px] font-semibold tracking-[0.15em] uppercase transition-colors duration-500 md:flex lg:gap-10 lg:text-sm [font-family:var(--font-cormorant)] ${
              scrolled ? "text-[#4a3350]" : "text-white"
            }`}
          >
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="relative pb-1 transition-opacity duration-300 after:absolute after:-bottom-0.5 after:left-0 after:h-px after:w-0 after:bg-current after:transition-all after:duration-300 hover:opacity-70 hover:after:w-full"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Desktop RSVP */}
          <a
            href="#rsvp"
            className="hidden shrink-0 rounded-sm bg-[#b23a70] px-6 py-3 text-xs font-semibold tracking-[0.15em] text-white uppercase transition-all duration-300 hover:bg-[#9c2f60] hover:shadow-[0_8px_24px_rgba(178,58,112,0.2)] sm:inline-block md:text-sm [font-family:var(--font-cormorant)]"
          >
            RSVP
          </a>

          {/* Mobile menu button */}
          <button
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            className={`relative z-[120] flex h-11 w-11 items-center justify-center transition-colors duration-500 md:hidden ${
              scrolled || menuOpen ? "text-[#4a3350]" : "text-white"
            }`}
          >
            <span className="relative block h-6 w-6">
              {/* Top line */}
              <span
                className={`absolute left-0 top-[6px] block h-[1.5px] w-6 origin-center bg-current transition-all duration-300 ${
                  menuOpen ? "top-[11px] rotate-45" : ""
                }`}
              />

              {/* Middle line */}
              <span
                className={`absolute left-0 top-[11px] block h-[1.5px] w-6 bg-current transition-all duration-300 ${
                  menuOpen ? "scale-x-0 opacity-0" : ""
                }`}
              />

              {/* Bottom line */}
              <span
                className={`absolute left-0 top-[16px] block h-[1.5px] w-6 origin-center bg-current transition-all duration-300 ${
                  menuOpen ? "top-[11px] -rotate-45" : ""
                }`}
              />
            </span>
          </button>
        </div>
      </nav>

      {/* =========================
          FULL SCREEN MOBILE MENU
      ========================== */}
      <div
        className={`fixed inset-0 z-[90] bg-[#fdfaf6] transition-all duration-500 md:hidden ${
          menuOpen
            ? "visible opacity-100"
            : "invisible opacity-0 pointer-events-none"
        }`}
      >
        {/* Decorative background */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          {/* Large circle */}
          <div className="absolute -right-32 -top-32 h-[320px] w-[320px] rounded-full border border-[#b23a70]/10" />

          <div className="absolute -right-24 -top-24 h-[260px] w-[260px] rounded-full border border-[#b23a70]/10" />

          {/* Bottom decorative circle */}
          <div className="absolute -bottom-40 -left-40 h-[420px] w-[420px] rounded-full border border-[#b23a70]/10" />

          <div className="absolute bottom-[-130px] left-[-130px] h-[300px] w-[300px] rounded-full border border-[#b23a70]/10" />

          {/* Soft center glow */}
          <div className="absolute left-1/2 top-1/2 h-[280px] w-[280px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#b23a70]/[0.025] blur-3xl" />
        </div>

        {/* Menu content */}
        <div className="relative flex min-h-screen flex-col px-7 pb-7 pt-28">
          {/* Small heading */}
          <div
            className={`mb-10 transition-all delay-100 duration-500 ${
              menuOpen
                ? "translate-y-0 opacity-100"
                : "translate-y-4 opacity-0"
            }`}
          >
            <p className="text-[10px] font-semibold tracking-[0.3em] text-[#b23a70] uppercase [font-family:var(--font-cormorant)]">
              Baby Shower Celebration
            </p>

            <div className="mt-3 h-px w-12 bg-[#b23a70]" />
          </div>

          {/* Navigation */}
          <div className="flex flex-1 flex-col justify-center -mt-10">
            {NAV_LINKS.map((link, index) => (
              <a
                key={link.label}
                href={link.href}
                onClick={closeMenu}
                className={`group flex items-center border-b border-[#4a3350]/10 py-5 transition-all duration-500 ${
                  menuOpen
                    ? "translate-x-0 opacity-100"
                    : "-translate-x-8 opacity-0"
                }`}
                style={{
                  transitionDelay: `${150 + index * 80}ms`,
                }}
              >
                {/* Number */}
                <span className="mr-5 w-7 text-[11px] tracking-[0.1em] text-[#b23a70]/60 [font-family:var(--font-cormorant)]">
                  {String(index + 1).padStart(2, "0")}
                </span>

                {/* Label */}
                <span className="text-[32px] leading-none text-[#4a3350] transition-colors duration-300 group-hover:text-[#b23a70] [font-family:var(--font-playfair)]">
                  {link.label}
                </span>

                {/* Arrow */}
                <span className="ml-auto text-xl font-light text-[#b23a70]/60 transition-transform duration-300 group-hover:translate-x-1">
                  ↗
                </span>
              </a>
            ))}
          </div>

          {/* Bottom section */}
          <div
            className={`mt-8 transition-all delay-500 duration-500 ${
              menuOpen
                ? "translate-y-0 opacity-100"
                : "translate-y-4 opacity-0"
            }`}
          >
            {/* RSVP */}
            <a
              href="#rsvp"
              onClick={closeMenu}
              className="flex w-full items-center justify-center bg-[#b23a70] px-6 py-4 text-sm font-semibold tracking-[0.2em] text-white uppercase transition-all duration-300 hover:bg-[#9c2f60] [font-family:var(--font-cormorant)]"
            >
              RSVP
            </a>

            {/* Bottom text */}
            <div className="mt-6 flex items-center justify-between">
              <span className="text-[10px] tracking-[0.18em] text-[#4a3350]/50 uppercase [font-family:var(--font-cormorant)]">
                N &amp; S
              </span>

              <span className="text-[10px] tracking-[0.18em] text-[#4a3350]/50 uppercase [font-family:var(--font-cormorant)]">
                Forever Begins
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}