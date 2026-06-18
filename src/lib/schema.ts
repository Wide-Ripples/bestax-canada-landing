export interface Stat { num: string; label: string }
export interface FaqItem { q: string; a: string }

export interface PageContent {
  hero: {
    urgencyStrip: string;
    headlinePre: string;
    headlineAccent: string;
    headlinePost: string;
  };
  stats: [Stat, Stat, Stat, Stat];
  painPoints: [string, string, string, string, string, string];
  callBenefits: [string, string, string, string];
  banner: {
    label: string;
    amount: string;
    subtitle: string;
    footnote: string;
  };
  darkSection: {
    label: string;
    headline: string;
    body: string;
  };
  faqs: FaqItem[];

  // Design & layout settings
  header: {
    phone: string;
    ctaText: string;
    ctaHref: string;
  };
  footer: {
    phone: string;
    email: string;
    hours: string;
    logoColorful: boolean; // false = white/inverted (default), true = original colors
  };
  booking: {
    cardTitle: string;
    cardSubtitle: string;
    calloutText: string;
  };
  testimonials: {
    heading: string;
    subheading: string;
  };
}
