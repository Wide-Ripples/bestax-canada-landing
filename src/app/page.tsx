import Image from "next/image";
import StickyHeader from "@/components/StickyHeader";
import VideoPlayer from "@/components/VideoPlayer";
import BookingEmbed from "@/components/BookingEmbed";
import FaqAccordion from "@/components/FaqAccordion";
import MobileBookingBar from "@/components/MobileBookingBar";
import ScrollToTop from "@/components/ScrollToTop";

function Stars() {
  return (
    <div className="flex items-center gap-0.5">
      {[...Array(5)].map((_, i) => (
        <svg key={i} className="w-4 h-4 text-[#F5A623]" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

function Check({ red = false }: { red?: boolean }) {
  return (
    <svg
      className={`w-5 h-5 shrink-0 mt-0.5 ${red ? "text-[#E84319]" : "text-green-600"}`}
      fill="currentColor" viewBox="0 0 20 20"
    >
      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
    </svg>
  );
}

function Btn({ href, children, red = false }: { href: string; children: React.ReactNode; red?: boolean }) {
  return (
    <a
      href={href}
      className={`inline-flex items-center justify-center gap-2 text-white font-bold px-8 py-3.5 rounded-full text-[15px] shadow-md transition-all hover:shadow-lg hover:scale-[1.02] ${
        red ? "bg-[#E84319] hover:bg-[#c73a14]" : "bg-[#F5A623] hover:bg-[#e09510]"
      }`}
    >
      {children}
    </a>
  );
}

export default function Page() {
  return (
    <div className="bg-white text-[#333] pb-16 md:pb-0">
      <StickyHeader />

      {/* ── URGENCY STRIP ──────────────────────────────────── */}
      <div className="bg-[#E84319] py-2.5 px-6 lg:px-10 text-center">
        <p className="text-white font-semibold text-sm">
          ⚡ Currently accepting new clients. Book your free 20-minute review today. Spots are limited.
        </p>
      </div>

      {/* ══════════════════════════════════════════════════════
          HERO — full width, video left · booking right
      ══════════════════════════════════════════════════════ */}
      <section className="w-full px-6 lg:px-10 pt-4 sm:pt-8 pb-6">

        {/* Headline — centered text, generous width */}
        <div className="text-center mb-4 sm:mb-7">
          <h1 className="text-[1.75rem] sm:text-[3rem] lg:text-[3.5rem] font-black text-[#1a1a1a] leading-[1.15] mb-3">
            Stop Losing Money to Messy Books,{" "}
            <span className="text-[#E84319]">Missed Deadlines</span>,{" "}
            and CRA Surprises
          </h1>
          <div className="inline-flex items-center gap-2 bg-white border border-gray-200 rounded-full px-4 py-1.5 shadow-sm">
            <Stars />
            <span className="text-sm font-semibold text-[#1a1a1a]">5.0 on Google</span>
            <span className="text-gray-300 text-sm">|</span>
            <span className="text-sm text-gray-500">Trusted by 1,000+ Canadian businesses</span>
          </div>
        </div>

        {/* Two-column hero — fills full width */}
        <div className="grid lg:grid-cols-[1fr_460px] gap-7 items-start">

          {/* LEFT: Video + trust cards */}
          <div className="flex flex-col gap-5 min-w-0">

            <VideoPlayer />

            {/* Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                { num: "10+",    label: "Years of Experience" },
                { num: "35+",    label: "Professionals" },
                { num: "1,000+", label: "Clients Served" },
                { num: "$427K",  label: "Penalties Avoided" },
              ].map((s) => (
                <div key={s.label} className="bg-[#1a1a1a] rounded-xl py-4 text-center">
                  <div className="text-2xl sm:text-3xl font-black text-[#F5A623]">{s.num}</div>
                  <div className="text-gray-400 text-[13px] mt-1">{s.label}</div>
                </div>
              ))}
            </div>

            {/* Pain points */}
            <div className="bg-[#FFF9F5] border border-[#F5A623]/30 rounded-2xl px-6 py-6">
              <p className="text-base font-bold text-[#E84319] mb-4">This is for you if...</p>
              <ul className="grid sm:grid-cols-2 gap-4">
                {[
                  {
                    text: "Books are behind or inconsistent",
                    icon: <svg className="w-6 h-6 shrink-0 mt-0.5 text-[#E84319]" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>,
                  },
                  {
                    text: "Unsure about GST/HST filings",
                    icon: <svg className="w-6 h-6 shrink-0 mt-0.5 text-[#E84319]" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /><path strokeLinecap="round" strokeLinejoin="round" d="M10 9a2 2 0 114 0c0 1.5-2 2-2 4" /></svg>,
                  },
                  {
                    text: "No clear monthly numbers",
                    icon: <svg className="w-6 h-6 shrink-0 mt-0.5 text-[#E84319]" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>,
                  },
                  {
                    text: "Year-end is always stressful",
                    icon: <svg className="w-6 h-6 shrink-0 mt-0.5 text-[#E84319]" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /><path strokeLinecap="round" strokeLinejoin="round" d="M12 13v3m0 0h.01" /></svg>,
                  },
                  {
                    text: "Accountant is reactive, not proactive",
                    icon: <svg className="w-6 h-6 shrink-0 mt-0.5 text-[#E84319]" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>,
                  },
                  {
                    text: "Need one firm for everything",
                    icon: <svg className="w-6 h-6 shrink-0 mt-0.5 text-[#E84319]" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>,
                  },
                ].map(({ text, icon }) => (
                  <li key={text} className="flex items-start gap-3 text-[17px] font-medium text-gray-700">
                    {icon}
                    {text}
                  </li>
                ))}
              </ul>
              <p className="text-[15px] text-gray-500 mt-4 font-medium">
                If any of these sound familiar, start with a free 20-minute call.
              </p>
            </div>

            {/* What you get */}
            <div className="bg-[#F0FDF4] border border-green-200 rounded-2xl px-6 py-6">
              <p className="text-base font-bold text-green-700 mb-4">On the free call, Bestax will:</p>
              <ul className="space-y-4">
                {[
                  {
                    text: "Review your current accounting setup",
                    icon: (
                      <svg className="w-6 h-6 shrink-0 mt-0.5 text-green-600" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    ),
                  },
                  {
                    text: "Spot compliance or reporting gaps before CRA does",
                    icon: (
                      <svg className="w-6 h-6 shrink-0 mt-0.5 text-green-600" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                    ),
                  },
                  {
                    text: "Highlight tax-saving opportunities you are missing",
                    icon: (
                      <svg className="w-6 h-6 shrink-0 mt-0.5 text-green-600" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                      </svg>
                    ),
                  },
                  {
                    text: "Give you a concrete next-step action plan",
                    icon: (
                      <svg className="w-6 h-6 shrink-0 mt-0.5 text-green-600" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                      </svg>
                    ),
                  },
                ].map(({ text, icon }) => (
                  <li key={text} className="flex items-start gap-3 text-[17px] font-medium text-gray-700">
                    {icon}
                    {text}
                  </li>
                ))}
              </ul>
            </div>

          </div>

          {/* RIGHT: Booking card (sticky) */}
          <div id="booking" className="lg:sticky lg:top-[72px] scroll-mt-[72px]">
            <div className="rounded-2xl overflow-hidden shadow-xl border border-gray-100">

              <div className="bg-[#E84319] px-5 py-4">
                <h2 className="text-white font-bold text-base leading-snug mb-2">
                  Free 20-Minute Tax &amp; Bookkeeping Review
                </h2>
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse inline-block" />
                    <span className="text-white/90 text-xs font-medium">Accepting new clients this week</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-white/80 text-xs">
                    <span>Free</span>
                    <span>·</span>
                    <span>No obligation</span>
                    <span>·</span>
                    <span>20 min</span>
                  </div>
                </div>
              </div>

              <div className="bg-white">
                <BookingEmbed />
              </div>

            </div>

            <p className="text-center mt-3 text-sm text-gray-500">
              Prefer to call?{" "}
              <a href="tel:+14169910900" className="text-[#E84319] font-semibold hover:underline">
                +1 416 991 0900
              </a>
              <span className="text-gray-400"> · Mon–Sat 9am–8pm</span>
            </p>
          </div>

        </div>
      </section>

      {/* ── $427K BANNER ───────────────────────────────────── */}
      <div className="bg-[#E84319] py-8 px-6 lg:px-10 text-center">
        <p className="text-white/70 text-xs font-semibold mb-1 tracking-widest uppercase">Proven results for Canadian businesses</p>
        <p className="text-[52px] sm:text-[68px] font-black text-white leading-none my-1">$427,000</p>
        <p className="text-white text-base sm:text-lg font-bold">in CRA penalties and interest avoided for our clients</p>
        <p className="text-white/60 text-[14px] mt-1">Through accurate filings, proactive planning, and on-time submissions.</p>
      </div>

      {/* ── TESTIMONIALS ───────────────────────────────────── */}
      <section className="w-full px-6 lg:px-10 py-14">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 mb-2">
            <Stars />
            <span className="text-sm font-bold text-[#333]">5.0 on Google</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black italic text-[#1a1a1a]">
            Here&apos;s What Real Business Owners Say About Us:
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {["review-2.png.webp", "review-3.png.webp", "review-4.png.webp", "review-5.png.webp"].map((file) => (
            <div key={file} className="rounded-2xl overflow-hidden shadow-md border border-gray-100 hover:shadow-lg transition-shadow">
              <Image
                src={`/assets/Reviews/${file}`}
                alt="Client review for Bestax Accountants"
                width={600}
                height={400}
                className="w-full h-auto object-contain"
              />
            </div>
          ))}
        </div>

        <div className="text-center">
          <p className="italic text-gray-500 text-sm mb-1">
            ...and this is just a glimpse. Hundreds of happy clients trust Bestax daily.
          </p>
          <p className="italic font-bold text-[#E84319] mb-6">Your turn now!</p>
          <Btn href="#booking">Book Free Consultation Now</Btn>
        </div>
      </section>

      {/* ── DARK URGENCY CLOSER ────────────────────────────── */}
      <section className="bg-[#1a1a1a] py-14 px-6 lg:px-10 text-center">
        <p className="text-gray-500 text-sm font-semibold mb-3 tracking-widest uppercase">Don&apos;t wait until there&apos;s a problem</p>
        <h2 className="text-4xl sm:text-5xl font-black text-white mb-5 leading-tight">
          Most Business Owners Act Too Late.
        </h2>
        <p className="text-gray-300 text-lg max-w-lg mx-auto mb-8">
          By the time CRA sends a notice, penalties are already stacking up. A 20-minute call now can save you thousands later.
        </p>
        <Btn href="#booking" red>Claim My Free Spot Now</Btn>
        <p className="text-gray-600 text-sm mt-3">Free · No pressure · No commitment</p>
      </section>

      {/* ── FAQ ────────────────────────────────────────────── */}
      <section className="w-full px-6 lg:px-10 py-14">
        <div className="text-center mb-8">
          <h2 className="text-3xl sm:text-4xl font-black text-[#1a1a1a]">Frequently Asked Questions</h2>
          <p className="text-gray-500 text-lg mt-2">Still have questions? These are the ones we hear most often.</p>
        </div>
        <FaqAccordion />
        <div className="text-center mt-10">
          <Btn href="#booking">Book Free Consultation Now</Btn>
          <p className="text-sm text-gray-400 mt-3">
            Or call us:{" "}
            <a href="tel:+14169910900" className="text-[#E84319] font-semibold hover:underline">
              +1 416 991 0900
            </a>
            {" "}· Mon–Sat, 9am–8pm
          </p>
        </div>
      </section>

      {/* ── FOOTER ─────────────────────────────────────────── */}
      <footer className="bg-[#111] text-gray-500 text-sm py-8 px-6 lg:px-10">
        <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-4">
          <Image
            src="/assets/Logo/bestax-canada-logo without background.png"
            alt="Bestax Accountants"
            width={110}
            height={42}
            className="h-9 w-auto object-contain brightness-0 invert opacity-50"
          />
          <div className="text-center sm:text-right space-y-1">
            <p>1470 Hurontario St #100, Mississauga, ON L5G 3H4</p>
            <p>
              <a href="tel:+14169910900" className="hover:text-gray-300 transition-colors">+1 416 991 0900</a>
              {" "}·{" "}
              <a href="mailto:info@bestax.ca" className="hover:text-gray-300 transition-colors">info@bestax.ca</a>
            </p>
            <p>&copy; {new Date().getFullYear()} Bestax Accountants. All rights reserved.</p>
          </div>
        </div>
      </footer>

      <MobileBookingBar />
      <ScrollToTop />
    </div>
  );
}
