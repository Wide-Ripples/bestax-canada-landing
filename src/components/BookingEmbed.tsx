"use client";

import { useEffect } from "react";

declare global {
  interface Window {
    Bookings?: {
      inlineEmbed: (opts: { url: string; parent: string; height: string; width: string }) => void;
    };
  }
}

export default function BookingEmbed() {
  useEffect(() => {
    const init = () => {
      if (window.Bookings) {
        window.Bookings.inlineEmbed({
          url: "https://appointments.bestax.ca/portal-embed#/inquiry",
          parent: "#inline-container",
          height: "580px",
          width: "100%",
        });
      } else {
        setTimeout(init, 50);
      }
    };

    const script = document.createElement("script");
    script.src = "https://bookings.nimbuspop.com/assets/embed.js";
    script.async = true;
    script.onload = init;
    document.body.appendChild(script);

    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  return (
    <div className="w-full" style={{ minHeight: 580 }}>
      <div id="inline-container" style={{ width: "100%" }} />
    </div>
  );
}
