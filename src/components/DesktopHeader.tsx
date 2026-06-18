import Image from "next/image";

interface Props {
  urgencyStrip: string;
  ctaHref: string;
}

export default function DesktopHeader({ urgencyStrip, ctaHref }: Props) {
  return (
    <header className="hidden md:flex sticky top-0 z-50 items-center gap-6 bg-[#E84319] px-6 lg:px-10 py-2.5">
      {/* Logo */}
      <Image
        src="/assets/Logo/bestax-canada-logo without background.webp"
        alt="Bestax Accountants Canada"
        width={150}
        height={56}
        priority
        fetchPriority="high"
        className="h-10 w-auto object-contain brightness-0 invert shrink-0"
      />
      {/* Urgency text — centered */}
      <p className="flex-1 text-white font-semibold text-sm text-center">
        {urgencyStrip}
      </p>
      {/* CTA */}
      <a
        href={ctaHref}
        className="shrink-0 bg-white text-[#E84319] font-bold px-5 py-2 rounded-full text-sm whitespace-nowrap hover:bg-gray-100 transition-colors shadow-sm"
      >
        Request Callback
      </a>
    </header>
  );
}
