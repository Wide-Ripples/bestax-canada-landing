"use client";

import { useEffect, useRef } from "react";

declare global {
  interface Window {
    Bookings?: {
      inlineEmbed: (opts: { url: string; parent: string; height: string; width: string }) => void;
    };
  }
}

export default function BookingEmbed() {
  const containerRef = useRef<HTMLDivElement>(null);
  const loadedRef = useRef(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    // Only load NimbusPop when the booking section enters the viewport —
    // prevents 1MB+ of third-party JS from blocking the main thread on initial load
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !loadedRef.current) {
          loadedRef.current = true;
          observer.disconnect();
          loadNimbus();
        }
      },
      { rootMargin: "300px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  function loadNimbus() {
    const init = () => {
      if (window.Bookings) {
        window.Bookings.inlineEmbed({
          url: "https://appointments.bestax.ca/portal-embed#/inquiry",
          parent: "#inline-container",
          height: "660px",
          width: "100%",
        });
        // Add accessible title to the iframe NimbusPop creates
        const poll = setInterval(() => {
          const iframe = document.querySelector("#inline-container iframe") as HTMLIFrameElement | null;
          if (iframe) {
            iframe.title = "Book a free 20-minute tax and bookkeeping review with Bestax";
            clearInterval(poll);
          }
        }, 200);
        setTimeout(() => clearInterval(poll), 10000);
      } else {
        setTimeout(init, 50);
      }
    };

    const script = document.createElement("script");
    script.src = "https://bookings.nimbuspop.com/assets/embed.js";
    script.async = true;
    script.onload = init;
    document.body.appendChild(script);
  }

  return (
    <div ref={containerRef} className="w-full" style={{ minHeight: 660 }}>
      <div id="inline-container" style={{ width: "100%" }} />
    </div>
  );
}
