"use client";

export default function StickyCallbackButton() {
  return (
    <a
      href="tel:+14169910900"
      className="hidden md:flex fixed right-0 top-1/2 -translate-y-1/2 z-50 flex-col items-center justify-center gap-1.5 bg-[#E84319] hover:bg-[#c73a14] text-white font-bold px-3 py-5 shadow-xl transition-all hover:px-4 group"
      style={{ writingMode: "vertical-rl", textOrientation: "mixed", borderRadius: "12px 0 0 12px" }}
      aria-label="Request a callback"
    >
      <svg
        className="w-5 h-5 rotate-90 shrink-0"
        fill="currentColor"
        viewBox="0 0 20 20"
        style={{ writingMode: "horizontal-tb" }}
      >
        <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
      </svg>
      <span className="text-sm tracking-wide" style={{ writingMode: "vertical-rl" }}>
        Request a Callback
      </span>
    </a>
  );
}
