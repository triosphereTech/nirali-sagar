"use client";

import { useState } from "react";
import { Playfair_Display, Cormorant_Garamond } from "next/font/google";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-playfair",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-cormorant",
});

const EVENTS = [
  {
    id: "shower",
    name: "Baby Shower Celebration",
    when: "Monday, Dec 20 • 10 AM onwards",
  },
];

const inputClasses =
  "w-full rounded-md border border-[#e6dbe3] bg-white px-4 py-3 font-semibold text-[#2b1f2b] placeholder:font-normal placeholder:text-[#a89aab] outline-none transition-colors focus:border-[#b23a70] [font-family:var(--font-cormorant)]";

const labelClasses =
  "mb-2 block text-xs font-bold tracking-[0.15em] text-[#4a3350] uppercase [font-family:var(--font-cormorant)]";

export default function RSVP() {
  const [events, setEvents] = useState([]);
  const [submitted, setSubmitted] = useState(false);

  const toggleEvent = (id) => {
    setEvents((prev) =>
      prev.includes(id) ? prev.filter((e) => e !== id) : [...prev, id]
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget));
    // TODO: send { ...data, events } to your API / form service
    console.log({ ...data, events });
    setSubmitted(true);
  };

  return (
    <section
      id="rsvp"
      className={`${playfair.variable} ${cormorant.variable} w-full bg-[#fdf8f5] px-6 py-20 sm:py-28`}
    >
      <div className="mx-auto max-w-3xl text-center">
        <p className="text-xs font-semibold tracking-[0.35em] text-[#b23a70] uppercase [font-family:var(--font-cormorant)]">
          Kindly Reply
        </p>
        <h2 className="mt-3 text-4xl text-[#2b1f2b] italic sm:text-5xl [font-family:var(--font-playfair)]">
          RSVP
        </h2>
        <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-[#6b6070] sm:text-lg [font-family:var(--font-cormorant)]">
          It would mean the world to us to have you share in our joy. Let us
          know who&rsquo;s coming and which celebrations you&rsquo;ll join us
          for.
        </p>

        <div className="mt-6 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-xs font-semibold tracking-[0.2em] text-[#8a7f8f] uppercase [font-family:var(--font-cormorant)]">
          <span>Respond by November 15, 2027</span>
          <span className="text-[#c9a227]">&bull;</span>
          <span>December 20, 2027</span>
        </div>
      </div>

      {/* White card so every field stays crisp and readable */}
      <div className="mx-auto mt-12 max-w-2xl rounded-2xl border border-[#f0e2ec] bg-white p-8 shadow-[0_20px_60px_rgba(90,40,70,0.1)] sm:p-12">
        {submitted ? (
          <div className="py-10 text-center">
            <p className="text-2xl text-[#2b1f2b] italic [font-family:var(--font-playfair)]">
              Thank you!
            </p>
            <p className="mt-3 text-[#6b6070] [font-family:var(--font-cormorant)]">
              Your reply has been received. We can&rsquo;t wait to celebrate
              with you.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <label className={labelClasses} htmlFor="firstName">
                  First Name *
                </label>
                <input
                  id="firstName"
                  name="firstName"
                  type="text"
                  required
                  className={inputClasses}
                  placeholder="Jane"
                />
              </div>
              <div>
                <label className={labelClasses} htmlFor="lastName">
                  Last Name *
                </label>
                <input
                  id="lastName"
                  name="lastName"
                  type="text"
                  required
                  className={inputClasses}
                  placeholder="Doe"
                />
              </div>
            </div>

            <div>
              <label className={labelClasses} htmlFor="email">
                Email *
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className={inputClasses}
                placeholder="jane@example.com"
              />
            </div>

            <div>
              <label className={labelClasses} htmlFor="guests">
                Guests Attending *
              </label>
              <input
                id="guests"
                name="guests"
                type="number"
                min="1"
                required
                className={inputClasses}
                placeholder="1"
              />
              <p className="mt-1.5 text-xs text-[#a89aab] [font-family:var(--font-cormorant)]">
                Including yourself
              </p>
            </div>

            <div>
              <span className={labelClasses}>Events Attending *</span>
              <div className="space-y-3">
                {EVENTS.map((event) => (
                  <label
                    key={event.id}
                    className="flex cursor-pointer items-start gap-3 rounded-md border border-[#e6dbe3] bg-[#fdf8f5] px-4 py-3 transition-colors hover:border-[#b23a70]"
                  >
                    <input
                      type="checkbox"
                      name="events"
                      value={event.id}
                      checked={events.includes(event.id)}
                      onChange={() => toggleEvent(event.id)}
                      className="mt-1 h-4 w-4 accent-[#b23a70]"
                    />
                    <span>
                      <span className="block text-sm font-semibold text-[#2b1f2b] [font-family:var(--font-cormorant)]">
                        {event.name}
                      </span>
                      <span className="block text-xs text-[#8a7f8f] [font-family:var(--font-cormorant)]">
                        {event.when}
                      </span>
                    </span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className={labelClasses} htmlFor="message">
                Message (Optional)
              </label>
              <textarea
                id="message"
                name="message"
                rows={4}
                className={`${inputClasses} resize-none`}
                placeholder="Share your blessing for Nirali & Sagar..."
              />
            </div>

            <button
              type="submit"
              className="w-full rounded-md bg-[#b23a70] py-3.5 text-sm font-semibold tracking-[0.2em] text-white uppercase transition-colors duration-300 hover:bg-[#9c2f60] [font-family:var(--font-cormorant)]"
            >
              Send Your Blessing
            </button>
          </form>
        )}
      </div>

      {/* Closing note */}
      <div className="mx-auto mt-12 max-w-2xl rounded-2xl bg-[#b23a70] px-8 py-8 text-center">
        <p className="text-lg text-white italic sm:text-xl [font-family:var(--font-cormorant)] ">
          With love, always
        </p>
        <p className="mt-1 text-xl font-bold tracking-[0.25em] text-white/90 uppercase [font-family:var(--font-playfair)]">
          Nirali &amp; Sagar
        </p>
      </div>
    </section>
  );
}