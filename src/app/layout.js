import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ReactQueryProvider from "@/utils/reactQueryProvider";
import Modal from "components/modal/Modal";
import SplashScreen from "@/splashScreen";
import Script from "next/script";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  metadataBase: new URL("https://moonchill.in"),
  title:
    "MoonChill – India’s Best OTT Plans, Subscriptions & Entertainment Bundles",
  description:
    "Get affordable OTT subscriptions from Netflix, Amazon Prime, Disney+ Hotstar, SonyLIV, Zee5 & more — all at one place. MoonChill brings you verified deals, combo plans, and entertainment bundles to chill smarter!",
  robots: "index, follow",
  keywords: [
    // 🔥 Primary Keywords
    "MoonChill",
    "OTT plans India",
    "OTT subscriptions",
    "best OTT combo offers",
    "Netflix subscription",
    "Amazon Prime Video plan",
    "Disney+ Hotstar premium",
    "SonyLIV plan",
    "Zee5 plan",
    "MX Player plan",
    "OTT bundles India",
    "cheap OTT plans",
    "affordable OTT subscriptions",
    "entertainment plans",
    "streaming offers India",
    "digital entertainment platform",
    // 🎬 Category Keywords
    "movie streaming",
    "TV shows online",
    "live sports streaming",
    "cricket live",
    "IPL live",
    "WWE live",
    "football live",
    "anime streaming",
    "kids shows",
    "music concerts",
    "reality TV",
    "Bollywood movies",
    "Hollywood movies",
    // 💳 Purchase Intent Keywords
    "buy OTT subscription",
    "best OTT deals",
    "monthly streaming plan",
    "family OTT subscription",
    "student OTT offers",
    "discounted streaming",
    "streaming combo plan",
    "premium OTT package",
    // 🌍 Brand + SEO Support
    "MoonChill plans",
    "MoonChill offers",
    "MoonChill subscriptions",
    "MoonChill entertainment platform",
    "MoonChill India",
    "stream all-in-one platform",
  ],
  authors: [{ name: "MoonChill Team" }],
  openGraph: {
    title:
      "MoonChill – India’s #1 OTT Subscription & Entertainment Deals Platform",
    description:
      "Compare and buy OTT plans for Netflix, Hotstar, Prime Video & more. Save on your entertainment with MoonChill’s best OTT deals and bundles.",
    url: "https://moonchill.in",
    siteName: "MoonChill",
    images: [
      {
        url: "https://moonchill.in/moochillBanner.png",
        width: 1200,
        height: 630,
        alt: "MoonChill – OTT Subscription Platform",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "MoonChill – Affordable OTT Plans & Streaming Subscriptions",
    description:
      "Buy and manage OTT subscriptions from Netflix, Prime Video, Disney+ Hotstar, SonyLIV & more — only on MoonChill.",
    images: ["https://moonchill.in/moochillBanner.png"],
  },
  alternates: {
    canonical: "https://moonchill.in",
  },
  icons: {
    icon: "/Logo.ico",
    apple: "/logo.svg",
    shortcut: "/logolight.png",
  },
  other: {
    // ✅ SEO-optimized structured data (Google Rich Snippet)
    "application/ld+json": JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Organization",
      name: "MoonChill",
      url: "https://moonchill.in",
      logo: "https://moonchill.in/logo.svg",
      sameAs: [
        "https://facebook.com/moonchill",
        "https://instagram.com/moonchill",
        "https://x.com/moonchill",
      ],
      description:
        "MoonChill is India’s leading OTT subscription and entertainment platform that offers affordable streaming plans for Netflix, Hotstar, Prime Video, SonyLIV, and more.",
      contactPoint: [
        {
          "@type": "ContactPoint",
          telephone: "+91-9136653743",
          contactType: "customer support",
          areaServed: "IN",
          availableLanguage: ["English", "Hindi"],
        },
      ],
    }),
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/Logo.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/logo.svg" />
        <link rel="icon" type="image/png" sizes="32x32" href="/logo.svg" />
        <link rel="icon" type="image/png" sizes="16x16" href="/logo.svg" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ReactQueryProvider>
          <SplashScreen />
          <main className="max-w-screen-2xl mx-auto">{children}</main>
          <Modal />
        </ReactQueryProvider>
        {/* Schema JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "MoonChill",
              url: "https://moonchill.in",
              logo: "https://moonchill.in/moonchill-logo.svg",
              sameAs: [
                "https://facebook.com/moonchill",
                "https://twitter.com/moonchill",
                "https://instagram.com/moonchill",
              ],
            }),
          }}
        />
      </body>
    </html>
  );
}
