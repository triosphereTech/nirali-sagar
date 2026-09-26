"use client";

import { useEffect, useState } from "react";
import { Playfair_Display, Cormorant_Garamond, Alex_Brush } from "next/font/google";
import Navbar from "../global/Navbar";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["600", "700"],
  variable: "--font-playfair",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-cormorant",
});

const script = Alex_Brush({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-script",
});

// Set your actual wedding date/time here
const WEDDING_DATE = new Date("2026-10-25T08:30:00");

function useCountdown(target) {
  const [time, setTime] = useState({ days: 0, hours: 0, mins: 0, secs: 0 });

  useEffect(() => {
    const tick = () => {
      const diff = Math.max(0, target.getTime() - Date.now());
      setTime({
        days: Math.floor(diff / 86400000),
        hours: Math.floor((diff / 3600000) % 24),
        mins: Math.floor((diff / 60000) % 60),
        secs: Math.floor((diff / 1000) % 60),
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [target]);

  return time;
}

export default function Home() {
  const [scrollY, setScrollY] = useState(0);
  const countdown = useCountdown(WEDDING_DATE);

  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrollY(window.scrollY);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Scroll-driven transforms: bg zooms in, content drifts up & fades
  const zoom = 1 + Math.min(scrollY / 2200, 0.18);
  const contentShift = Math.min(scrollY * 0.45, 180);
  const contentOpacity = Math.max(1 - scrollY / 420, 0);

  const items = [
    { label: "Days", value: countdown.days },
    { label: "Hours", value: countdown.hours },
    { label: "Mins", value: countdown.mins },
    { label: "Secs", value: countdown.secs },
  ];

  return (
    <>
      <Navbar />

      <section className="relative h-screen w-full overflow-hidden bg-[#b23a70]">
        {/* Video background, zooms on scroll */}
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 h-full w-full object-cover will-change-transform"
          style={{ transform: `scale(${zoom})` }}
          src="/video/HeroVid.mp4"
        />

        {/* Beige color layer, mid opacity */}
        <div className="absolute inset-0 bg-[#b23a704d] opacity-100 mix-blend-multiply" />

        {/* Dark vignette for text contrast */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/15 to-black/60" />

        {/* Content, drifts up & fades on scroll */}
        <div
          className={`${playfair.variable} ${cormorant.variable} ${script.variable} relative z-10 flex h-full w-full flex-col items-center justify-center px-6 text-center text-white will-change-transform`}
          style={{
            transform: `translateY(-${contentShift}px)`,
            opacity: contentOpacity,
          }}
        >
          {/* Icon */}
          <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-full border border-white/30">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#d9a441" strokeWidth="1.5">
              <path
                d="M12 2l3.5 5h-7L12 2zM5 9h14v11H5V9zm4 4h6v7H9v-7z"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          <p className="mb-4 text-xs font-semibold tracking-[0.35em] text-[#ffffff] uppercase md:text-sm [font-family:Arial,Helvetica,sans-serif]">
            Welcome to the Baby Shower of
          </p>

          <h1 className="text-6xl leading-none text-white sm:text-7xl md:text-8xl lg:text-[9rem] [font-family:var(--font-script)]">
            Nirali <span className="text-[#db4a8b]">&amp;</span> Sagar
          </h1>

          <div className="mt-8 mb-6 h-px w-64 max-w-[70vw] bg-white/30" />

          <p className="text-sm tracking-[0.3em] text-white/90 uppercase md:text-base">
            October 25, 2026 &middot; 8:30
          </p>
          <p className="mt-2 text-sm tracking-[0.3em] text-white/90 uppercase md:text-base">
            Canada 
          </p>

          <div className="mt-6 mb-10 h-px w-64 max-w-[70vw] bg-white/30" />

          {/* Countdown */}
          <div className="flex items-start gap-6 sm:gap-10 md:gap-14 [font-family:var(--font-cormorant)]">
            {items.map((item) => (
              <div key={item.label} className="flex flex-col items-center">
                <span className="text-4xl font-bold text-[#ffb731] sm:text-5xl md:text-6xl [font-family:var(--font-playfair)]">
                  {String(item.value).padStart(2, "0")}
                </span>
                <span className="mt-1 text-[10px] font-semibold tracking-[0.25em] text-white/80 uppercase sm:text-xs [font-family:var(--font-cormorant)]">
                  {item.label}
                </span>
              </div>
            ))}
          </div>

          {/* Scroll indicator */}
          <div className="absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2">
            <span className="text-[10px] font-semibold tracking-[0.3em] text-white/70 uppercase">
              Scroll
            </span>
            <svg
              className="animate-bounce"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth="1.5"
            >
              <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>
      </section>

    </>
  );
}
