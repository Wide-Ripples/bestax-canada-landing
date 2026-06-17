import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://bestax.ca"),
  title: "Accounting & Bookkeeping Services | Bestax Accountants Canada",
  description:
    "Bestax helps Canadian business owners keep their books accurate, filings on time, and tax obligations under control. 10+ years experience, 35+ professionals, 1000+ clients served.",
  robots: {
    index: false,
    follow: false,
    googleBot: { index: false, follow: false },
  },
  openGraph: {
    title: "Accounting & Bookkeeping Services | Bestax Accountants Canada",
    description:
      "Stop losing money to messy books and CRA surprises. Book a free 20-minute review with Bestax — 10+ years, 1,000+ Canadian clients.",
    locale: "en_CA",
    type: "website",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <body>{children}</body>
    </html>
  );
}
