"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { DistortedHoverText } from "./distorted-hover-text";

// Official Scalable SVG Brand Logos
function PremiereProLogo({ className = "w-8 h-8" }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className}>
      <rect width="48" height="48" rx="12" fill="#00005B" stroke="#9999FF" strokeWidth="1.5" strokeOpacity="0.4" />
      <text 
        x="12" 
        y="33" 
        fill="#9999FF" 
        fontFamily="system-ui, -apple-system, sans-serif" 
        fontWeight="900" 
        fontSize="24" 
        letterSpacing="-1.5"
      >
        Pr
      </text>
    </svg>
  );
}

function DaVinciResolveLogo({ className = "w-8 h-8" }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className}>
      <rect width="48" height="48" rx="12" fill="#18181B" stroke="rgba(255,255,255,0.1)" strokeWidth="1.5" />
      <g transform="translate(24, 24)">
        {/* Red / Coral Petal */}
        <path
          d="M 0 -15 C 8 -15 13 -9 13 -2 C 13 6 0 0 0 0 Z"
          fill="#FF2D55"
        />
        {/* Blue / Cyan Petal */}
        <path
          d="M 13 8 C 17 14 14 20 7 21 C -1 22 0 0 0 0 Z"
          fill="#007AFF"
        />
        {/* Yellow / Gold Petal */}
        <path
          d="M -13 7 C -17 1 -13 -6 -6 -8 C 0 -10 0 0 0 0 Z"
          fill="#FFCC00"
        />
        {/* Center dot */}
        <circle cx="0" cy="0" r="2.5" fill="#FFFFFF" />
      </g>
    </svg>
  );
}

function AlightMotionLogo({ className = "w-8 h-8" }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className}>
      <defs>
        <linearGradient id="am-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#00F5A0" />
          <stop offset="50%" stopColor="#00D9F5" />
          <stop offset="100%" stopColor="#7F00FF" />
        </linearGradient>
      </defs>
      <rect width="48" height="48" rx="12" fill="#0E0E12" stroke="rgba(0, 245, 160, 0.3)" strokeWidth="1.5" />
      <g transform="translate(10, 10)">
        <path
          d="M 14 2 C 7 2 3 7 3 14 C 3 21 7 26 14 26 C 21 26 25 21 25 14 C 25 7 21 2 14 2 Z M 14 6 C 19 6 21 9 21 14 C 21 19 19 22 14 22 C 9 22 7 19 7 14 C 7 9 9 6 14 6 Z"
          fill="url(#am-grad)"
        />
        <path
          d="M 5 15 L 23 15"
          stroke="url(#am-grad)"
          strokeWidth="3.5"
          strokeLinecap="round"
        />
      </g>
    </svg>
  );
}

interface PlatformData {
  name: string;
  percentage: number;
  label: string;
  role: string;
  logo: React.ReactNode;
}

const platforms: PlatformData[] = [
  {
    name: "Adobe Premiere Pro",
    percentage: 98,
    label: "Experience",
    role: "Commercials & Long-Form Video",
    logo: <PremiereProLogo className="w-full h-full" />,
  },
  {
    name: "DaVinci Resolve",
    percentage: 92,
    label: "Experience",
    role: "Color Science & Film Finishing",
    logo: <DaVinciResolveLogo className="w-full h-full" />,
  },
  {
    name: "Alight Motion",
    percentage: 96,
    label: "Experience",
    role: "Motion Graphics & Kinetic VFX",
    logo: <AlightMotionLogo className="w-full h-full" />,
  },
];

// 5 Gauge Tier Labels positioned along the natural curved circular arc path
const gaugeLabels = [
  { text: "OFF TRACK", offset: "8.5%", min: 0, max: 24.9 },
  { text: "IMPROVING", offset: "29%", min: 25, max: 54.9 },
  { text: "GOOD", offset: "50%", min: 55, max: 74.9 },
  { text: "GREAT", offset: "71%", min: 75, max: 92.9 },
  { text: "SUPERB", offset: "94.5%", min: 93, max: 100 },
];

// Animated Number Counter: counts smoothly from 0 to target every time value changes
function AnimatedCounter({ value }: { value: number }) {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    let startTimestamp: number | null = null;
    const duration = 850; // ms to match the arc sweep
    const startValue = 0;
    let animationFrameId: number;

    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const elapsed = timestamp - startTimestamp;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const easedProgress = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(startValue + (value - startValue) * easedProgress);
      setDisplayValue(current);

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(step);
      }
    };

    animationFrameId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animationFrameId);
  }, [value]);

  return <span>{displayValue}%</span>;
}

function CircularExperienceGauge({ platform }: { platform: PlatformData }) {
  // SVG Arc Geometry (260° sweep, radius 110, center 170, 170)
  // Total arc length = 2 * PI * 110 * (260 / 360) ≈ 499.16
  const arcLength = 499.16;
  const targetOffset = arcLength * (1 - platform.percentage / 100);

  // 0% Start needle coordinates at 140°
  const startRad = (140 * Math.PI) / 180;
  const startX1 = 170 + 96 * Math.cos(startRad);
  const startY1 = 170 + 96 * Math.sin(startRad);
  const startX2 = 170 + 124 * Math.cos(startRad);
  const startY2 = 170 + 124 * Math.sin(startRad);

  // Target needle coordinates tracking the end of the blue bar
  const targetAngleDeg = 140 + (platform.percentage / 100) * 260;
  const targetAngleRad = (targetAngleDeg * Math.PI) / 180;
  const targetX1 = 170 + 96 * Math.cos(targetAngleRad);
  const targetY1 = 170 + 96 * Math.sin(targetAngleRad);
  const targetX2 = 170 + 124 * Math.cos(targetAngleRad);
  const targetY2 = 170 + 124 * Math.sin(targetAngleRad);

  return (
    <div className="relative w-full max-w-[340px] sm:max-w-[380px] aspect-square flex items-center justify-center select-none">
      <svg 
        viewBox="0 0 340 340" 
        className="w-full h-full overflow-visible drop-shadow-sm"
      >
        <defs>
          {/* Circular Guide Path at R=135 for perfectly curving text along the gauge */}
          <path
            id="gauge-labels-path"
            d="M 66.59 256.78 A 135 135 0 1 1 273.41 256.78"
            fill="none"
          />
        </defs>

        {/* Radial Curved Labels - flowing smoothly along the circular perimeter */}
        {gaugeLabels.map((lbl) => {
          const isActive = platform.percentage >= lbl.min && platform.percentage <= lbl.max;
          return (
            <text
              key={lbl.text}
              fill={isActive ? "#111827" : "#9CA3AF"}
              fontSize={isActive ? 10.5 : 9}
              fontWeight={isActive ? 900 : 700}
              letterSpacing="0.08em"
              textAnchor="middle"
              className="uppercase select-none font-sans transition-colors duration-300"
            >
              <textPath
                href="#gauge-labels-path"
                startOffset={lbl.offset}
                textAnchor="middle"
              >
                {lbl.text}
              </textPath>
            </text>
          );
        })}

        {/* Background Track Arc (Light gray) */}
        <path
          d="M 85.74 240.71 A 110 110 0 1 1 254.26 240.71"
          fill="none"
          stroke="#ECEEF2"
          strokeWidth="24"
          strokeLinecap="round"
        />

        {/* Animated Royal Blue Progress Arc - sweeps from start (0%) to end every time a new text is hovered */}
        <motion.path
          key={platform.name}
          d="M 85.74 240.71 A 110 110 0 1 1 254.26 240.71"
          fill="none"
          stroke="#4F46E5"
          strokeWidth="24"
          strokeLinecap="round"
          strokeDasharray={arcLength}
          initial={{ strokeDashoffset: arcLength }}
          animate={{ strokeDashoffset: targetOffset }}
          transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
        />

        {/* Dynamic Green Indicator Needle - sweeps from start (0%) to end with the blue bar */}
        <motion.line
          key={`needle-${platform.name}`}
          initial={{
            x1: startX1,
            y1: startY1,
            x2: startX2,
            y2: startY2,
          }}
          animate={{
            x1: targetX1,
            y1: targetY1,
            x2: targetX2,
            y2: targetY2,
          }}
          transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
          stroke="#22C55E"
          strokeWidth="4.5"
          strokeLinecap="round"
        />
      </svg>

      {/* Iridescent Gradient Center Disc */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[74px] sm:w-[150px] md:w-[180px] h-[74px] sm:h-[150px] md:h-[180px] rounded-full bg-gradient-to-tr from-[#ffe4e6]/60 via-white to-[#dbeafe]/80 shadow-[0_12px_32px_rgba(79,70,229,0.1),_inset_0_2px_12px_rgba(255,255,255,0.9)] flex flex-col items-center justify-center pointer-events-none">
        <div className="text-lg sm:text-4xl md:text-5xl font-black text-[#111827] tracking-tight tabular-nums leading-none">
          <AnimatedCounter value={platform.percentage} />
        </div>
        <motion.span 
          key={platform.label}
          initial={{ opacity: 0, y: 3 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="text-[7px] sm:text-xs md:text-sm font-semibold text-gray-500 tracking-wide mt-0.5 sm:mt-1"
        >
          {platform.label}
        </motion.span>
      </div>
    </div>
  );
}

export function TextHoverSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const activePlatform = platforms[activeIndex];

  return (
    <section className="relative w-full bg-[#050505] flex flex-col items-center justify-center overflow-hidden py-6 sm:py-12 md:py-20 px-2.5 sm:px-6 lg:px-8">
      <div className="relative w-full max-w-[1500px] mx-auto bg-[#D5D1C3] text-[#1A1A1A] rounded-2xl sm:rounded-[2.5rem] md:rounded-[3.5rem] py-6 sm:py-16 md:py-24 px-3.5 sm:px-12 lg:px-16 shadow-2xl overflow-hidden">
        
        {/* Subtle Ambient Glow */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/20 blur-[120px] rounded-full pointer-events-none" />

        {/* Header Indicator */}
        <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-10 md:mb-14 relative z-10">
          <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-red-500 animate-pulse" />
          <p className="text-[9px] sm:text-xs md:text-sm font-bold uppercase tracking-[0.2em] sm:tracking-[0.3em] text-[#1A1A1A]/70">
            Working Platforms & Proficiency
          </p>
        </div>

        {/* 2-Column Landscape Layout on all viewports */}
        <div className="grid grid-cols-12 gap-3 sm:gap-6 lg:gap-10 items-center relative z-10">
          
          {/* Left Column: Platform List with Distorted Text */}
          <div className="col-span-6 lg:col-span-7 flex flex-col gap-3 sm:gap-6 md:gap-10 items-start w-full">
            {platforms.map((platform, i) => {
              const isActive = activeIndex === i;
              return (
                <div
                  key={platform.name}
                  onMouseEnter={() => setActiveIndex(i)}
                  onClick={() => setActiveIndex(i)}
                  className="group/item flex items-center gap-1.5 sm:gap-4 cursor-pointer w-full text-left select-none transition-all duration-300"
                >
                  {/* Active Indicator Bar */}
                  <div 
                    className={`h-5 sm:h-10 md:h-12 w-1 sm:w-1.5 rounded-full transition-all duration-300 shrink-0 ${
                      isActive 
                        ? "bg-[#4F46E5] scale-y-100 opacity-100" 
                        : "bg-black/10 scale-y-50 opacity-40 group-hover/item:opacity-70 group-hover/item:scale-y-75"
                    }`}
                  />

                  {/* Brand Logo Icon */}
                  <div className={`w-5 h-5 sm:w-9 sm:h-9 md:w-10 md:h-10 shrink-0 transition-transform duration-300 ${isActive ? "scale-110 drop-shadow-md" : "opacity-75 group-hover/item:opacity-100"}`}>
                    {platform.logo}
                  </div>
                  
                  {/* Platform Name using original DistortedHoverText */}
                  <DistortedHoverText 
                    text={platform.name} 
                    align="left"
                    className="text-xs sm:text-2xl md:text-4xl lg:text-5xl xl:text-6xl text-left"
                  />
                </div>
              );
            })}
          </div>

          {/* Right Column: Circular Experience Gauge & Brand Badge */}
          <div className="col-span-6 lg:col-span-5 flex flex-col items-center justify-center w-full">
            <div className="w-full max-w-[200px] sm:max-w-[360px] md:max-w-[420px] bg-[#E5E2D6]/80 backdrop-blur-md border border-black/5 rounded-2xl sm:rounded-3xl p-3 sm:p-6 md:p-8 flex flex-col items-center shadow-lg">
              
              {/* Circular Gauge */}
              <CircularExperienceGauge platform={activePlatform} />

              {/* Brand Logo & Details Badge directly in the section below the gauge */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activePlatform.name}
                  initial={{ opacity: 0, scale: 0.88, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.88, y: -10 }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                  className="mt-2 sm:mt-6 flex items-center gap-2 sm:gap-3.5 bg-black/[0.04] border border-black/5 px-2.5 sm:px-5 py-1.5 sm:py-2.5 rounded-xl sm:rounded-2xl shadow-sm w-full justify-center"
                >
                  <div className="w-5 h-5 sm:w-9 sm:h-9 shrink-0 drop-shadow-sm">
                    {activePlatform.logo}
                  </div>
                  <div className="flex flex-col text-left min-w-0">
                    <span className="text-[10px] sm:text-sm font-black text-black leading-tight tracking-tight truncate">
                      {activePlatform.name}
                    </span>
                    <span className="text-[7px] sm:text-[10px] font-bold uppercase tracking-wider text-gray-500 truncate">
                      {activePlatform.role}
                    </span>
                  </div>
                </motion.div>
              </AnimatePresence>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
