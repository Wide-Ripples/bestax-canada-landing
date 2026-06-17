import { ImageResponse } from "next/og";

export const alt = "Bestax Accountants — Free 20-Minute Tax & Bookkeeping Review";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#fff",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
          padding: "60px",
          fontFamily: "Arial, Helvetica, sans-serif",
          position: "relative",
        }}
      >
        {/* Top accent */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: 10,
            background: "#E84319",
          }}
        />

        {/* Badge */}
        <div
          style={{
            background: "#E84319",
            color: "#fff",
            padding: "8px 24px",
            borderRadius: 999,
            fontSize: 20,
            fontWeight: 700,
            marginBottom: 30,
            display: "flex",
          }}
        >
          Free 20-Minute Tax &amp; Bookkeeping Review
        </div>

        {/* Headline */}
        <div
          style={{
            fontSize: 56,
            fontWeight: 900,
            color: "#1a1a1a",
            lineHeight: 1.15,
            marginBottom: 32,
            maxWidth: 880,
          }}
        >
          Stop Losing Money to Messy Books and CRA Surprises
        </div>

        {/* Stats row */}
        <div style={{ display: "flex", gap: 52, marginBottom: 40 }}>
          {(
            [
              ["10+", "Years Experience"],
              ["35+", "Professionals"],
              ["1,000+", "Clients Served"],
              ["$427K", "Penalties Avoided"],
            ] as [string, string][]
          ).map(([num, label]) => (
            <div key={label} style={{ display: "flex", flexDirection: "column" }}>
              <span style={{ fontSize: 34, fontWeight: 800, color: "#F5A623", lineHeight: 1 }}>
                {num}
              </span>
              <span style={{ fontSize: 16, color: "#888", marginTop: 4 }}>{label}</span>
            </div>
          ))}
        </div>

        {/* Brand URL */}
        <div style={{ fontSize: 20, color: "#aaa", fontWeight: 600 }}>bestax.ca</div>

        {/* Bottom accent */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: 10,
            background: "#F5A623",
          }}
        />
      </div>
    ),
    { ...size }
  );
}
