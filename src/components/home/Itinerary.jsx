"use client";

import Image from "next/image";

export default function Itinerary() {
  return (
    <section
      className="flex min-h-screen w-full flex-col bg-[#fdf8f5] lg:flex-row"
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
          <p className="text-xs font-semibold tracking-[0.35em] text-[#b23a70] uppercase">
            You&rsquo;re invited
          </p>

          <h1 className="mt-4 text-4xl leading-tight text-[#2b1f2b] sm:text-5xl">
            Nirali <span className="text-[#b23a70]">&amp;</span> Sagar
          </h1>

          <p className="mt-4 text-base text-[#6b6070] sm:text-lg">
            are inviting you to celebrate their Baby Shower
          </p>

          <div className="mx-auto mt-8 h-px w-20 bg-[#c9a227] lg:mx-0" />

          <div className="mt-8 space-y-5">
            <div>
              <p className="text-[11px] font-semibold tracking-[0.3em] text-[#8a7f8f] uppercase">
                Date &amp; time
              </p>
              <p className="mt-1 text-xl font-semibold tracking-wide text-[#2b1f2b]">
                25 Oct 2026 &middot; Sunday, 8:30
              </p>
            </div>

            <div>
              <p className="text-[11px] font-semibold tracking-[0.3em] text-[#8a7f8f] uppercase">
                Venue
              </p>
              <p className="mt-1 text-lg text-[#4a3f4f]">
                CISE - Council of India Societies of Edmonton
                <br />
                9504 37 Ave NW, Edmonton, AB T6E 5N2, Canada
              </p>
              <p className="mt-3 text-base text-[#4a3f4f]">
                705 288 7208
                <br />
                825-963-7208
              </p>
            </div>
          </div>

          <a
            href="#rsvp"
            className="mt-10 inline-block rounded-sm bg-[#b23a70] px-8 py-3 text-xs font-semibold tracking-[0.2em] text-white uppercase transition-colors duration-300 hover:bg-[#9c2f60]"
          >
            RSVP
          </a>
        </div>
      </div>
    </section>
  );
}
