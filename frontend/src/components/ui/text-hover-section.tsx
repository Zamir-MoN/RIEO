"use client";

import React from "react";
import { DistortedHoverText } from "./distorted-hover-text";

export function TextHoverSection() {
  return (
    <section className="relative w-full min-h-[60vh] bg-[#050505] flex flex-col items-center justify-center overflow-hidden pt-16">
      <div className="relative w-full bg-[#D5D1C3] rounded-t-[2.5rem] md:rounded-t-[4rem] flex flex-col items-center justify-center py-32 md:py-48">
        <div className="flex flex-col items-center gap-16 md:gap-24 text-center px-4">
          <div className="flex flex-col items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse mb-2" />
            <p className="text-xs md:text-sm font-bold uppercase tracking-[0.3em] text-[#1A1A1A]/60">
              Working Platforms
            </p>
          </div>
        
        <div className="flex flex-col gap-8 md:gap-12 items-center">
          <DistortedHoverText 
            text="Adobe Premiere Pro" 
            className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl" 
          />
          <DistortedHoverText 
            text="DaVinci Resolve" 
            className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl" 
          />
          <DistortedHoverText 
            text="Alight Motion" 
            className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl" 
          />
        </div>
        </div>
      </div>
    </section>
  );
}
