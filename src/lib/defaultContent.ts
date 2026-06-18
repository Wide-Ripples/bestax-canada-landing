import type { PageContent } from "./schema";

export const defaultContent: PageContent = {
  hero: {
    urgencyStrip:
      "⚡ Currently accepting new clients. Book your free 20-minute review today. Spots are limited.",
    headlinePre: "Stop Losing Money to Messy Books,",
    headlineAccent: "Missed Deadlines",
    headlinePost: "and CRA Surprises",
  },
  stats: [
    { num: "10+", label: "Years of Experience" },
    { num: "35+", label: "Professionals" },
    { num: "1,000+", label: "Clients Served" },
    { num: "$427K", label: "Penalties Avoided" },
  ],
  painPoints: [
    "Books are behind or inconsistent",
    "Unsure about GST/HST filings",
    "No clear monthly numbers",
    "Year-end is always stressful",
    "Accountant is reactive, not proactive",
    "Need one firm for everything",
  ],
  callBenefits: [
    "Review your current accounting setup",
    "Spot compliance or reporting gaps before CRA does",
    "Highlight tax-saving opportunities you are missing",
    "Give you a concrete next-step action plan",
  ],
  banner: {
    label: "Proven results for Canadian businesses",
    amount: "$427,000",
    subtitle: "in CRA penalties and interest avoided for our clients",
    footnote: "Through accurate filings, proactive planning, and on-time submissions.",
  },
  darkSection: {
    label: "Don't wait until there's a problem",
    headline: "Most Business Owners Act Too Late.",
    body: "By the time CRA sends a notice, penalties are already stacking up. A 20-minute call now can save you thousands later.",
  },
  header: {
    phone: "+1 416 991 0900",
    ctaText: "Book Free Call",
    ctaHref: "#booking",
  },
  footer: {
    phone: "+1 416 991 0900",
    email: "info@bestax.ca",
    hours: "Mon–Sat 9am–8pm",
    logoColorful: false,
  },
  booking: {
    cardTitle: "Free 20-Minute Tax & Bookkeeping Review",
    cardSubtitle: "Accepting new clients this week",
    calloutText: "Free · No obligation · 20 min",
  },
  testimonials: {
    heading: "Here's What Real Business Owners Say About Us:",
    subheading: "...and this is just a glimpse. Hundreds of happy clients trust Bestax daily.",
  },
  faqs: [
    {
      q: "What types of businesses do you work with?",
      a: "We work with a wide range of Canadian businesses, including service-based businesses, consultants, agencies, trades, e-commerce businesses, and growing small to mid-sized companies. Whether your operations are simple or becoming more complex, we can help keep your books organized and your finances easier to manage.",
    },
    {
      q: "Can you help if my bookkeeping is behind?",
      a: "Yes. Many businesses come to us when their books are behind, disorganized, or not being maintained consistently. We can review your current situation, help clean things up, and put a more reliable bookkeeping process in place going forward.",
    },
    {
      q: "What accounting and bookkeeping services do you provide?",
      a: "Our support can include bookkeeping, account reconciliations, financial reporting, GST/HST support, payroll support, year-end readiness, and ongoing accounting guidance. The exact scope depends on your business needs and how much support you want on a monthly basis.",
    },
    {
      q: "Do you provide monthly bookkeeping?",
      a: "Yes. We can provide ongoing monthly bookkeeping support so your records stay updated and you have a clearer view of your numbers throughout the year. This helps reduce year-end stress and gives you better visibility into how your business is performing.",
    },
    {
      q: "Do you also handle payroll?",
      a: "Yes, we can support payroll-related accounting needs for many businesses. If payroll is part of your requirements, we can discuss your current setup and determine the best process for ongoing support.",
    },
    {
      q: "What happens during the consultation?",
      a: "The consultation is a practical discussion about your business, your current bookkeeping or accounting challenges, and the type of support you may need. We will understand your situation, answer key questions, and outline possible next steps.",
    },
    {
      q: "How much do your accounting and bookkeeping services cost?",
      a: "Pricing depends on the size of your business, the condition of your books, the volume of transactions, and the scope of support required. Typically starts from $750 CAD per month, but after understanding your needs, we can recommend a suitable service package or engagement structure.",
    },
    {
      q: "How quickly can we get started?",
      a: "That depends on your current setup and how urgent the work is, but we aim to make the onboarding process smooth and efficient. Once we review your needs and agree on scope, we can guide you through the next steps to get started.",
    },
  ],
};
