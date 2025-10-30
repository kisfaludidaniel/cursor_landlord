import type { Metadata } from "next";
import "../styles/globals.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export const metadata: Metadata = {
  title: "Micro-Landlord OS Lite – Lakáskiadás okosan",
  description: "Modern, mobil-első marketing oldal bérbeadóknak. Royal Indigo színpaletta, magyar piacra.",
  openGraph: {
    title: "Micro-Landlord OS Lite – Lakáskiadás okosan",
    description: "Modern, mobil-első marketing oldal bérbeadóknak. Royal Indigo színpaletta, magyar piacra.",
    type: "website",
    locale: "hu_HU",
    url: "https://micro-landlord.hu/",
    siteName: "Micro-Landlord OS Lite",
    images: [{
      url: "/og-image.png",
      width: 1200,
      height: 630,
      alt: "Micro-Landlord OS Lite Royal Indigo exkluzív",
    }],
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="hu" className="theme-dark">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="robots" content="index, follow" />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="hu_HU" />
        <meta property="og:title" content="Micro-Landlord OS Lite – Lakáskiadás okosan" />
        <meta property="og:description" content="Modern, mobil-első marketing oldal bérbeadóknak. Royal Indigo színpaletta, magyar piacra." />
        <meta property="og:image" content="/og-image.png" />
        <meta property="og:url" content="https://micro-landlord.hu/" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className="font-sans bg-bg text-text antialiased flex flex-col min-h-screen">
        <a href="#main-content" className="skip-to-content">Ugrás a tartalomra</a>
        <Navbar />
        <main id="main-content" className="flex-1 flex flex-col">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
