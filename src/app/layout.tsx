import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import { LenisProvider } from "@/components/providers/lenis-provider";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

const yffRare = localFont({
  src: "../fonts/YFFRARETRIAL-PowerBlack.otf",
  variable: "--font-yff-rare",
});

export const metadata: Metadata = {
  title: "Premium Video Editor Portfolio",
  description: "High-end professional video editor portfolio and digital store.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${spaceGrotesk.variable} ${yffRare.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col overflow-x-hidden relative">
        <svg className="pointer-events-none fixed inset-0 z-[9999] opacity-[0.4] w-full h-full mix-blend-multiply">
          <filter id="noiseFilter">
            <feTurbulence type="fractalNoise" baseFrequency="0.75" numOctaves="3" stitchTiles="stitch" />
          </filter>
          <rect width="100%" height="100%" filter="url(#noiseFilter)" />
        </svg>
        <LenisProvider>
          <Navbar />
          <main className="flex-grow flex flex-col">{children}</main>
          <Footer />
        </LenisProvider>
      </body>
    </html>
  );
}
