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
  title: "Moonchill | Best OTT Plans",
  description:
    "Subscribe to Moonchill OTT aggregator for the best streaming experience.",
  openGraph: {
    title: "Moonchill OTT Plans",
    description: "Get unlimited OTT access at the best price.",
    url: "https://moonchill.in",
    siteName: "Moonchill",
  },
  icons: {
    icon: "/favicon2.png",
    shortcut: "/favicon2.png",
    apple: "/favicon2.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ReactQueryProvider>
          <SplashScreen />
          <main className="max-w-screen-2xl mx-auto">{children}</main>

          <Modal />
        </ReactQueryProvider>
      </body>
    </html>
  );
}
