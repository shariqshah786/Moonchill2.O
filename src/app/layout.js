import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ReactQueryProvider from "@/utils/reactQueryProvider";
import Modal from "components/modal/Modal";
import SplashScreen from "@/splashScreen";

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
  title: "MoonChill – Entertainment Plans & Subscriptions",
  description:
    "MoonChill brings you the best OTT subscription plans, entertainment bundles, and premium offers. Subscribe easily and chill!",
  keywords: [
    "MoonChill",
    "OTT plans",
    "subscription",
    "entertainment",
    "movies",
    "plans",
    "streaming",
    "TV shows",
    "affordable",
    "bundles",
    "premium",
    "offers",
    "digital",
    "entertainment plans",
    "subscription service",
    "streaming service",
    "entertainment subscription",
    "online streaming",
    "entertainment deals",
    "entertainment packages",
    "subscription offers",
    "entertainment platform",
    "entertainment options",
    "entertainment choices",
    "entertainment solutions",
    "entertainment convenience",
    "entertainment flexibility",
    "entertainment variety",
    "entertainment affordability",
    "entertainment savings",
    "entertainment value",
    "entertainment access",
    "entertainment enjoyment",
    "entertainment satisfaction",
    "entertainment experience",
    "entertainment delight",
    "entertainment fun",
    "entertainment relaxation",
    "entertainment leisure",
    "entertainment pleasure",
    "entertainment happiness",
    "entertainment joy",
    "entertainment excitement",
    "entertainment thrill",
    "entertainment adventure",
    "entertainment entertainment",
    "entertainment entertainment",
    "new releases",
    "classic movies",
    "popular TV shows",
    "exclusive content",
    "ad-free streaming",
    "high-definition",
    "4K streaming",
    "multi-device access",
    "offline viewing",
    "family plans",
    "student discounts",
    "gift subscriptions",
    "customer support",
    "user-friendly interface",
    "easy sign-up",
    "secure payment",
    "cancel anytime",
    "no hidden fees",
    "satisfaction guarantee",
    "entertainment on-the-go",
    "entertainment anytime",
    "entertainment anywhere",
    "entertainment for everyone",
    "entertainment made easy",
    "entertainment made affordable",
    "entertainment made convenient",
    "entertainment made enjoyable",
    "entertainment made fun",
    "entertainment made relaxing",
  ],
  authors: [{ name: "MoonChill Team" }],
  openGraph: {
    title: "MoonChill – Entertainment Plans & Subscriptions",
    description:
      "Get affordable entertainment with MoonChill's curated OTT subscription plans.",
    url: "https://moonchill.in",
    siteName: "MoonChill",
    images: [
      {
        url: "/public/moochillBanner.png", // place a proper image inside public/
        width: 1200,
        height: 630,
        alt: "MoonChill OTT plans",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/logo.png",
    shortcut: "/logo.png",
  },
  twitter: {
    card: "summary_large_image",
    title: "MoonChill – OTT Subscriptions",
    description: "Affordable OTT subscription plans at MoonChill.",
    images: ["/public/moochillBanner.png"],
  },
};
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/public/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/public/logo.png" />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/public/logo.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/public/logo.png"
        />
        {/* Tawk.to Script */}
        <script id="tawk-to" strategy="afterInteractive">
          {`
            var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
            (function(){
              var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
              s1.async=true;
              s1.src='https://embed.tawk.to/68cec191c4e82919233cb79a/1j5jq891r';
              s1.charset='UTF-8';
              s1.setAttribute('crossorigin','*');
              s0.parentNode.insertBefore(s1,s0);
            })();
          `}
        </script>
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
              logo: "https://moonchill.in/moonchill-logo.png",
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
