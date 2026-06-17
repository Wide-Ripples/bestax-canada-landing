import Image from "next/image";

export default function StickyHeader() {
  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100 shadow-sm">
      <div className="w-full px-4 sm:px-6 lg:px-10 py-2 sm:py-3 flex items-center justify-between gap-3">
        <Image
          src="/assets/Logo/bestax-canada-logo without background.png"
          alt="Bestax Accountants Canada"
          width={200}
          height={75}
          priority
          className="h-10 sm:h-16 w-auto object-contain"
        />

        <a
          href="tel:+14169910900"
          className="hidden sm:flex items-center gap-1.5 font-semibold text-[#333] hover:text-[#E84319] transition-colors"
        >
          <svg className="w-5 h-5 text-[#E84319]" fill="currentColor" viewBox="0 0 20 20">
            <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
          </svg>
          +1 416 991 0900
        </a>

        <a
          href="#booking"
          className="bg-[#E84319] hover:bg-[#c73a14] text-white font-bold px-4 sm:px-6 py-2 sm:py-3 rounded-full transition-colors shadow text-sm sm:text-[15px]"
        >
          Book Free Call
        </a>
      </div>
    </header>
  );
}
