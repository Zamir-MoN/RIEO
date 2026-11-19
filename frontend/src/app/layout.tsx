import type { Metadata, Viewport } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import { LenisProvider } from "@/components/providers/lenis-provider";
import { DockNavigation } from "@/components/layout/dock-navigation";
import { Footer } from "@/components/layout/footer";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
});

const yffRare = localFont({
  src: "../fonts/YFFRARETRIAL-PowerBlack.otf",
  variable: "--font-yff-rare",
  display: "swap",
});

const algeon = localFont({
  src: "../fonts/ALGEONtrial.otf",
  variable: "--font-algeon",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#050505",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export const metadata: Metadata = {
  title: "RIEO | Cinematic Video Editing & Motion Graphics",
  description: "Showcasing high-end video editing and commercial projects.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${spaceGrotesk.variable} ${yffRare.variable} ${algeon.variable} h-full antialiased`}
    >
      <head>
        <link rel="preconnect" href="https://i.pravatar.cc" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://i.pravatar.cc" />
      </head>
      <body className="min-h-full flex flex-col relative bg-[#050505] text-white">
        <LenisProvider>
          <main className="flex-grow flex flex-col">{children}</main>
          <Footer />
          <DockNavigation />
        </LenisProvider>
      </body>
    </html>
  );
}
