"use client";

import { useEffect, useRef, useState } from "react";

declare global {
  interface Window {
    Bookings?: {
      inlineEmbed: (opts: { url: string; parent: string; height: string; width: string }) => void;
    };
  }
}

// 60px desktop header + ~68px card red header + 2px border buffer
const DESKTOP_CHROME = 130;
const MOBILE_HEIGHT = 555;

function getIframeHeight() {
  if (typeof window === "undefined") return MOBILE_HEIGHT;
  if (window.innerWidth < 1024) return MOBILE_HEIGHT;
  return Math.max(480, window.innerHeight - DESKTOP_CHROME);
}

export default function BookingEmbed() {
  const containerRef = useRef<HTMLDivElement>(null);
  const loadedRef = useRef(false);
  const [containerHeight, setContainerHeight] = useState(MOBILE_HEIGHT);

  useEffect(() => {
    // Set initial height and track resize
    const update = () => setContainerHeight(getIframeHeight());
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const scheduleLoad = () => {
      if (loadedRef.current) return;
      loadedRef.current = true;
      if (typeof (window as Window & typeof globalThis).requestIdleCallback === "function") {
        requestIdleCallback(() => loadNimbus(), { timeout: 4000 });
      } else {
        setTimeout(loadNimbus, 2500);
      }
    };

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
    const height = getIframeHeight();
    const init = () => {
      if (window.Bookings) {
        window.Bookings.inlineEmbed({
          url: "https://appointments.bestax.ca/portal-embed#/inquiry",
          parent: "#inline-container",
          height: `${height}px`,
          width: "100%",
        });
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
    <div ref={containerRef} className="w-full" style={{ minHeight: containerHeight }}>
      <div id="inline-container" style={{ width: "100%" }} />
    </div>
  );
}
