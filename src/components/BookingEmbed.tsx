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

    // Trigger loading: defer via requestIdleCallback so NimbusPop's heavy JS
    // doesn't block the main thread during initial paint (fixes desktop TBT).
    // Falls back to a 2.5s setTimeout on browsers without requestIdleCallback.
    const scheduleLoad = () => {
      if (loadedRef.current) return;
      loadedRef.current = true;
      if (typeof (window as Window & typeof globalThis).requestIdleCallback === "function") {
        requestIdleCallback(() => loadNimbus(), { timeout: 4000 });
      } else {
        setTimeout(loadNimbus, 2500);
      }
    };

    // Still use IntersectionObserver so on mobile (where embed is below fold)
    // we don't even schedule until user scrolls near it.
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          scheduleLoad();
          observer.disconnect();
        }
      },
      { rootMargin: "200px" }
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
        // Poll for the iframe NimbusPop creates and add accessible title
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
