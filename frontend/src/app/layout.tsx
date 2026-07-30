import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import { LenisProvider } from "@/components/providers/lenis-provider";
import { DockNavigation } from "@/components/layout/dock-navigation";
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

const algeon = localFont({
  src: "../fonts/ALGEONtrial.otf",
  variable: "--font-algeon",
});

export const metadata: Metadata = {
  title: "RIEO",
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
      <body className="min-h-full flex flex-col relative bg-[#050505]">
        <LenisProvider>
          <main className="flex-grow flex flex-col">{children}</main>
          <Footer />
          <DockNavigation />
        </LenisProvider>
      </body>
    </html>
  );
}
