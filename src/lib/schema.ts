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
}
