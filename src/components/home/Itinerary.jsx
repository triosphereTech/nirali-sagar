"use client";

import Image from "next/image";
import { Playfair_Display, Cormorant_Garamond } from "next/font/google";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-playfair",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-cormorant",
});

export default function Itinerary() {
  return (
    <section
      className={`${playfair.variable} ${cormorant.variable} flex min-h-screen w-full flex-col bg-[#fdf8f5] lg:flex-row`}
    >
      {/* Left: image */}
      <div className="relative h-[45vh] w-full lg:h-screen lg:w-1/2">
        <Image
          src="/image/NBS.png"
          alt="Nirali & Sagar"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent lg:bg-gradient-to-r" />
      </div>

      {/* Right: content */}
      <div className="flex w-full flex-1 items-center justify-center px-8 py-14 sm:px-14 lg:w-1/2 lg:px-20">
        <div className="w-full max-w-md text-center lg:text-left">
          <p className="text-xs font-semibold tracking-[0.35em] text-[#b23a70] uppercase [font-family:var(--font-cormorant)]">
            You&rsquo;re invited
          </p>

          <h1 className="mt-4 text-4xl leading-tight text-[#2b1f2b] sm:text-5xl [font-family:var(--font-playfair)]">
            Nirali <span className="text-[#b23a70]">&amp;</span> Sagar
          </h1>

          <p className="mt-4 text-base text-[#6b6070] [font-family:var(--font-cormorant)] sm:text-lg">
            are inviting you to celebrate their Baby Shower
          </p>

          <div className="mx-auto mt-8 h-px w-20 bg-[#c9a227] lg:mx-0" />

          <div className="mt-8 space-y-5">
            <div>
              <p className="text-[11px] font-semibold tracking-[0.3em] text-[#8a7f8f] uppercase [font-family:var(--font-cormorant)]">
                Date &amp; time
              </p>
              <p className="mt-1 text-xl font-semibold tracking-wide text-[#2b1f2b] [font-family:var(--font-playfair)]">
                20 Dec 2027 &middot; Monday, 10 AM
              </p>
            </div>

            <div>
              <p className="text-[11px] font-semibold tracking-[0.3em] text-[#8a7f8f] uppercase [font-family:var(--font-cormorant)]">
                Venue
              </p>
              <p className="mt-1 text-lg text-[#4a3f4f] [font-family:var(--font-cormorant)]">
                123 Anywhere St., Any City, ST 12345
              </p>
            </div>
          </div>

          <a
            href="#rsvp"
            className="mt-10 inline-block rounded-sm bg-[#b23a70] px-8 py-3 text-xs font-semibold tracking-[0.2em] text-white uppercase transition-colors duration-300 hover:bg-[#9c2f60] [font-family:var(--font-cormorant)]"
          >
            RSVP
          </a>
        </div>
      </div>
    </section>
  );
}