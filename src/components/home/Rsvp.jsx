"use client";

import { useState } from "react";

const inputClasses =
  "w-full rounded-md border border-[#e6dbe3] bg-white px-4 py-3 font-semibold text-[#2b1f2b] placeholder:font-normal placeholder:text-[#a89aab] outline-none transition-colors focus:border-[#b23a70]";

const labelClasses =
  "mb-2 block text-xs font-bold tracking-[0.15em] text-[#4a3350] uppercase";

export default function RSVP() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formLoadedAt] = useState(() => Date.now());

const handleSubmit = async (e) => {
  e.preventDefault();

  if (loading) return;

  const secondsOnPage = (Date.now() - formLoadedAt) / 1000;

  if (secondsOnPage < 3) {
    alert("Please take a moment to complete the form.");
    return;
  }

  setLoading(true);

  try {
    const form = e.currentTarget;
    const formData = new FormData(form);

    const data = {
      firstName: formData.get("firstName") || "",
      lastName: formData.get("lastName") || "",
      email: formData.get("email") || "",
      phone: formData.get("phone") || "",
      guestsAttending: formData.get("guests") || "",
      message: formData.get("message") || "",

      // Honeypot
      website: formData.get("website") || "",
    };

    const response = await fetch(
      process.env.NEXT_PUBLIC_WEB_APP_URL,
      {
        method: "POST",
        headers: {
          "Content-Type": "text/plain;charset=utf-8",
        },
        body: JSON.stringify(data),
      }
    );

    const result = await response.json();

    if (!result.success) {
      throw new Error(
        result.message || "Something went wrong"
      );
    }

    setSubmitted(true);
    form.reset();

  } catch (error) {
    console.error("RSVP submission error:", error);

    alert(
      "Something went wrong while submitting your RSVP. Please try again."
    );
  } finally {
    setLoading(false);
  }
};

  return (
    <section
      id="rsvp"
      className="w-full bg-[#fdf8f5] px-6 py-20 sm:py-28"
    >
      <div className="mx-auto max-w-3xl text-center">
        <p className="text-xs font-semibold tracking-[0.35em] text-[#b23a70] uppercase">
          Kindly Reply
        </p>

        <h2 className="mt-3 text-4xl text-[#2b1f2b] italic sm:text-5xl">
          RSVP
        </h2>

        <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-[#6b6070] sm:text-lg">
          It would mean the world to us to have you share in our joy. Let us
          know who&rsquo;s coming and which celebrations you&rsquo;ll join us
          for.
        </p>

        <div className="mt-6 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-xs font-semibold tracking-[0.2em] text-[#8a7f8f] uppercase">
          <span>October 25, 2026 • 8:30</span>
        </div>
      </div>

      <div className="mx-auto mt-12 max-w-2xl rounded-2xl border border-[#f0e2ec] bg-white p-8 shadow-[0_20px_60px_rgba(90,40,70,0.1)] sm:p-12">
        {submitted ? (
          <div className="py-10 text-center">
            <p className="text-2xl text-[#2b1f2b] italic">
              Thank you!
            </p>

            <p className="mt-3 text-[#6b6070]">
              Your reply has been received. We can&rsquo;t wait to celebrate
              with you.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">

              <div
  className="absolute left-[-9999px] h-0 w-0 overflow-hidden"
  aria-hidden="true"
>
  <label htmlFor="website">
    Website
  </label>

  <input
    id="website"
    name="website"
    type="text"
    tabIndex="-1"
    autoComplete="off"
  />
</div>
              <div>
                <label
                  className={labelClasses}
                  htmlFor="firstName"
                >
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
                <label
                  className={labelClasses}
                  htmlFor="lastName"
                >
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
              <label
                className={labelClasses}
                htmlFor="email"
              >
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
  <label
    className={labelClasses}
    htmlFor="phone"
  >
    Phone Number *
  </label>

  <input
    id="phone"
    name="phone"
    type="tel"
    required
    inputMode="numeric"
    autoComplete="tel"
    className={inputClasses}
    placeholder="9876543210"
  />
</div>
            

            <div>
              <label
                className={labelClasses}
                htmlFor="guests"
              >
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

              <p className="mt-1.5 text-xs text-[#a89aab]">
                Including yourself
              </p>
            </div>

            <div>
              <label
                className={labelClasses}
                htmlFor="message"
              >
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
              disabled={loading}
              className="w-full rounded-md bg-[#b23a70] py-3.5 text-sm font-semibold tracking-[0.2em] text-white uppercase transition-colors duration-300 hover:bg-[#9c2f60] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Submitting..." : "Send Your Blessing"}
            </button>
          </form>
        )}
      </div>

      <div className="mx-auto mt-12 max-w-2xl rounded-2xl bg-[#b23a70] px-8 py-8 text-center">
        <p className="text-lg text-white italic sm:text-xl">
          With love, always
        </p>

        <p className="mt-1 text-xl font-bold tracking-[0.25em] text-white/90 uppercase">
          Nirali &amp; Sagar
        </p>
      </div>
    </section>
  );
}