export default function MobileBookingBar() {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-white border-t border-gray-200 px-3 py-3 flex items-center gap-2.5 shadow-[0_-4px_20px_rgba(0,0,0,0.1)]">
      <a
        href="tel:+14169910900"
        className="flex-1 flex items-center justify-center gap-1.5 border-2 border-[#E84319] text-[#E84319] font-bold text-sm py-3 rounded-full"
      >
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
          <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
        </svg>
        Call Now
      </a>
      <a
        href="#booking"
        className="flex-2 flex items-center justify-center bg-[#F5A623] hover:bg-[#e09510] text-white font-bold text-sm py-3 px-6 rounded-full transition-colors"
        style={{ flex: 2 }}
      >
        Book Free Appointment
      </a>
    </div>
  );
}
