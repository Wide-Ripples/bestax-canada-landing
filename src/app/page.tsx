import Image from "next/image";
import StickyHeader from "@/components/StickyHeader";
import VideoPlayer from "@/components/VideoPlayer";
import BookingEmbed from "@/components/BookingEmbed";
import FaqAccordion from "@/components/FaqAccordion";
import MobileBookingBar from "@/components/MobileBookingBar";
import ScrollToTop from "@/components/ScrollToTop";
import DesktopHeader from "@/components/DesktopHeader";
import { getContent } from "@/lib/content";

// Revalidate every 60s — page stays fast (SSG) but picks up Redis content changes quickly
export const revalidate = 60;

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

export default async function Page() {
  const content = await getContent();
  return (
    <div className="bg-white text-[#333] pb-16 md:pb-0" style={{ overflowX: "clip" }}>
      {/* Mobile header */}
      <div className="md:hidden">
        <StickyHeader phone={content.header.phone} ctaText={content.header.ctaText} ctaHref={content.header.ctaHref} />
      </div>
      {/* Desktop header: logo + urgency + callback */}
      <DesktopHeader urgencyStrip={content.hero.urgencyStrip} ctaHref={content.header.ctaHref} />

      <main>

      {/* ── URGENCY STRIP — mobile only (desktop shows it in the header) ── */}
      <div className="md:hidden bg-[#E84319] py-2.5 px-6 text-center">
        <p className="text-white font-semibold text-sm">
          {content.hero.urgencyStrip}
        </p>
      </div>

      {/* ══════════════════════════════════════════════════════
          HERO — full width, video left · booking right
      ══════════════════════════════════════════════════════ */}
      <section className="w-full px-6 lg:px-10 pt-4 sm:pt-6 pb-6">

        {/* Two-column hero — form starts at top, headline lives above video */}
        <div className="grid lg:grid-cols-[1fr_460px] gap-7 items-start">

          {/* LEFT: Headline + Video + trust cards */}
          <div className="flex flex-col gap-5 min-w-0">

            {/* Headline — centered above the video */}
            <div className="text-center mb-1">
              <h1 className="text-[1.75rem] sm:text-[2.6rem] lg:text-[3rem] font-black text-[#1a1a1a] leading-[1.15] mb-3">
                {content.hero.headlinePre}{" "}
                <span className="text-[#E84319]">{content.hero.headlineAccent}</span>
                {" "}{content.hero.headlinePost}
              </h1>
              <div className="inline-flex flex-col sm:flex-row items-center gap-1 sm:gap-2 bg-white border border-gray-200 rounded-2xl sm:rounded-full px-4 py-2 shadow-sm max-w-full">
                <div className="flex items-center gap-1.5">
                  <Stars />
                  <span className="text-xs sm:text-sm font-semibold text-[#1a1a1a]">4.8 on Google</span>
                </div>
                <span className="text-gray-300 text-xs hidden sm:inline" aria-hidden="true">|</span>
                <span className="text-xs sm:text-sm text-gray-600 text-center">Trusted by {content.stats[2].num} Canadian businesses</span>
              </div>
            </div>

            <VideoPlayer />

            {/* Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {content.stats.map((s) => (
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
                  <svg key="icon0" className="w-6 h-6 shrink-0 mt-0.5 text-[#E84319]" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>,
                  <svg key="icon1" className="w-6 h-6 shrink-0 mt-0.5 text-[#E84319]" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /><path strokeLinecap="round" strokeLinejoin="round" d="M10 9a2 2 0 114 0c0 1.5-2 2-2 4" /></svg>,
                  <svg key="icon2" className="w-6 h-6 shrink-0 mt-0.5 text-[#E84319]" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>,
                  <svg key="icon3" className="w-6 h-6 shrink-0 mt-0.5 text-[#E84319]" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /><path strokeLinecap="round" strokeLinejoin="round" d="M12 13v3m0 0h.01" /></svg>,
                  <svg key="icon4" className="w-6 h-6 shrink-0 mt-0.5 text-[#E84319]" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>,
                  <svg key="icon5" className="w-6 h-6 shrink-0 mt-0.5 text-[#E84319]" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>,
                ].map((icon, i) => (
                  <li key={i} className="flex items-start gap-3 text-[17px] font-medium text-gray-700">
                    {icon}
                    {content.painPoints[i]}
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
                  <svg key="cb0" className="w-6 h-6 shrink-0 mt-0.5 text-green-600" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>,
                  <svg key="cb1" className="w-6 h-6 shrink-0 mt-0.5 text-green-600" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>,
                  <svg key="cb2" className="w-6 h-6 shrink-0 mt-0.5 text-green-600" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>,
                  <svg key="cb3" className="w-6 h-6 shrink-0 mt-0.5 text-green-600" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" /></svg>,
                ].map((icon, i) => (
                  <li key={i} className="flex items-start gap-3 text-[17px] font-medium text-gray-700">
                    {icon}
                    {content.callBenefits[i]}
                  </li>
                ))}
              </ul>
            </div>

          </div>

          {/* RIGHT: Booking card (sticky) */}
          <div id="booking" className="lg:sticky lg:top-[60px] scroll-mt-[60px]">
            {/* On desktop: fill exactly from sticky top (60px) to bottom of viewport */}
            <div className="rounded-2xl overflow-hidden shadow-xl border border-gray-100 lg:flex lg:flex-col lg:h-[calc(100vh-60px)]">

              <div className="bg-[#E84319] px-5 py-3 shrink-0">
                <h2 className="text-white font-bold text-base leading-snug mb-1.5">
                  {content.booking.cardTitle}
                </h2>
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-green-400 inline-block" />
                    <span className="text-white/90 text-xs font-medium">{content.booking.cardSubtitle}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-white/80 text-xs">
                    {content.booking.calloutText}
                  </div>
                </div>
              </div>

              <div className="bg-white lg:flex-1 lg:overflow-hidden">
                <BookingEmbed />
              </div>

            </div>

            <p className="text-center mt-3 text-sm text-gray-500 lg:hidden">
              Prefer to call?{" "}
              <a href="tel:+14169910900" className="text-[#E84319] font-semibold hover:underline">
                +1 416 991 0900
              </a>
              <span className="text-gray-600"> · Mon–Sat 9am–8pm</span>
            </p>
          </div>

        </div>
      </section>

      {/* ── $427K BANNER ───────────────────────────────────── */}
      <div className="bg-[#E84319] py-8 px-6 lg:px-10 text-center">
        <p className="text-white/70 text-xs font-semibold mb-1 tracking-widest uppercase">{content.banner.label}</p>
        <p className="text-[52px] sm:text-[68px] font-black text-white leading-none my-1">{content.banner.amount}</p>
        <p className="text-white text-base sm:text-lg font-bold">{content.banner.subtitle}</p>
        <p className="text-white/60 text-[14px] mt-1">{content.banner.footnote}</p>
      </div>

      {/* ── TESTIMONIALS ───────────────────────────────────── */}
      <section className="w-full px-6 lg:px-10 py-10">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 mb-2">
            <Stars />
            <span className="text-sm font-bold text-[#333]">4.8 on Google &amp; Trustpilot</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black italic text-[#1a1a1a]">
            {content.testimonials.heading}
          </h2>
        </div>

        {/* Platform badges */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-8">
          <div className="flex items-center gap-1.5 bg-white border border-gray-200 rounded-full px-3 py-2 shadow-sm shrink-0">
            <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
            <span className="text-xs sm:text-sm font-semibold text-gray-700 whitespace-nowrap">Google</span>
            <Stars />
            <span className="text-xs sm:text-sm font-bold text-gray-800">4.8</span>
          </div>
          <div className="flex items-center gap-1.5 bg-white border border-gray-200 rounded-full px-3 py-2 shadow-sm shrink-0">
            <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="#00B67A"><path d="M12 0l2.545 7.826H22.5l-6.512 4.73 2.486 7.648L12 15.47l-6.474 4.734 2.486-7.648L1.5 7.826h7.955z"/></svg>
            <span className="text-xs sm:text-sm font-semibold text-gray-700 whitespace-nowrap">Trustpilot</span>
            <Stars />
          </div>
        </div>

        {/* Google reviews row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-3">
          {[
            "Margie WIlson Bestax Accountants.webp",
            "Mildred silva bestax accountants.webp",
            "carlos Mitchell Bestax Accountants.webp",
            "ngt consultancy review for bestax accountants.webp",
          ].map((file) => (
            <div key={file} className="rounded-xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition-shadow bg-white">
              <Image
                src={`/assets/Reviews/${file}`}
                alt="Google review for Bestax Accountants"
                width={600}
                height={400}
                className="w-full h-auto object-contain"
              />
            </div>
          ))}
        </div>

        {/* Trustpilot reviews row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
          {[
            "Screenshot 2026-06-18 223542.webp",
            "Screenshot 2026-06-18 223613.webp",
          ].map((file) => (
            <div key={file} className="rounded-xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition-shadow bg-white">
              <Image
                src={`/assets/Reviews/${file}`}
                alt="Trustpilot review for Bestax Accountants"
                width={900}
                height={400}
                className="w-full h-auto object-contain"
              />
            </div>
          ))}
        </div>

        <div className="text-center">
          <p className="italic text-gray-500 text-sm mb-1">
            {content.testimonials.subheading}
          </p>
          <p className="italic font-bold text-[#E84319] mb-6">Your turn now!</p>
          <Btn href="#booking">Book Free Consultation Now</Btn>
        </div>
      </section>

      {/* ── DARK URGENCY CLOSER ────────────────────────────── */}
      <section className="bg-[#1a1a1a] py-10 px-6 lg:px-10 text-center">
        <p className="text-gray-500 text-xs font-semibold mb-3 tracking-widest uppercase">{content.darkSection.label}</p>
        <h2 className="text-4xl sm:text-5xl font-black text-white mb-4 leading-tight">
          {content.darkSection.headline}
        </h2>
        <p className="text-gray-300 text-lg max-w-2xl mx-auto mb-6">
          {content.darkSection.body}
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-3">
          <Btn href="#booking" red>Claim My Free Spot Now</Btn>
          <a href="tel:+14169910900" className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-[15px]">
            <svg className="w-4 h-4 text-[#E84319]" fill="currentColor" viewBox="0 0 20 20">
              <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
            </svg>
            +1 416 991 0900
          </a>
        </div>
        <p className="text-gray-600 text-sm">Free · No pressure · No commitment</p>
      </section>

      {/* ── FAQ ────────────────────────────────────────────── */}
      <section className="w-full px-6 lg:px-10 py-6">
        <div className="text-center mb-4">
          <h2 className="text-3xl sm:text-4xl font-black text-[#1a1a1a]">Frequently Asked Questions</h2>
          <p className="text-gray-500 text-lg mt-1">Still have questions? These are the ones we hear most often.</p>
        </div>
        <FaqAccordion faqs={content.faqs} />
        <div className="text-center mt-6">
          <Btn href="#booking">Book Free Consultation Now</Btn>
          <p className="text-sm text-gray-600 mt-3">
            Or call us:{" "}
            <a href="tel:+14169910900" className="text-[#E84319] font-semibold hover:underline">
              +1 416 991 0900
            </a>
            {" "}· Mon–Sat, 9am–8pm
          </p>
        </div>
      </section>

      </main>

      {/* ── FOOTER ─────────────────────────────────────────── */}
      <footer className="bg-[#111] px-6 lg:px-10 py-5">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <Image
            src="/assets/Logo/bestax-canada-logo without background.webp"
            alt="Bestax Accountants"
            width={120}
            height={45}
            loading="lazy"
            className={`h-9 w-auto object-contain ${content.footer.logoColorful ? "opacity-90" : "brightness-0 invert opacity-80"}`}
          />
          <p className="text-gray-600 text-xs text-center sm:text-right">
            &copy; {new Date().getFullYear()}&nbsp;Bestax Accountants &nbsp;&middot;&nbsp;
            <a href={`tel:+${content.footer.phone.replace(/\D/g,"")}`} className="hover:text-gray-400 transition-colors">{content.footer.phone}</a>
            &nbsp;&middot;&nbsp;
            <a href={`mailto:${content.footer.email}`} className="hover:text-gray-400 transition-colors">{content.footer.email}</a>
            &nbsp;&middot;&nbsp;{content.footer.hours}
          </p>
        </div>
      </footer>

      <MobileBookingBar />
      <ScrollToTop />
    </div>
  );
}
