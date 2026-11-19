"use client";

import React, { useState } from "react";
import { motion } from "motion/react";

export function DistortedHoverText({
  text,
  className = "",
  baseColor = "text-[#1A1A1A]",
  overlayColor = "text-[#FF0000]",
  align = "left",
}: {
  text: string;
  className?: string;
  baseColor?: string;
  overlayColor?: string;
  align?: "left" | "center";
}) {
  const [isHovered, setIsHovered] = useState(false);
  const id = React.useId().replace(/:/g, "");

  return (
    <div 
      className={`relative inline-block group cursor-pointer select-none ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <svg className="absolute w-0 h-0 pointer-events-none" aria-hidden="true">
        <filter id={`distort-${id}`}>
          <feTurbulence 
            type="fractalNoise" 
            baseFrequency="0.05" 
            numOctaves="2" 
            result="noise" 
          />
          <motion.feDisplacementMap 
            in="SourceGraphic" 
            in2="noise" 
            xChannelSelector="R" 
            yChannelSelector="G"
            initial={{ scale: 0 }}
            animate={{ scale: isHovered ? 25 : 0 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
          />
        </filter>
      </svg>

      {/* Base Text */}
      <motion.span 
        className={`block font-heading font-black ${baseColor}`}
        style={{ filter: `url(#distort-${id})` }}
        initial={{ opacity: 1, scale: 1 }}
        animate={{ opacity: isHovered ? 0.3 : 1, scale: isHovered ? 0.95 : 1 }}
        transition={{ duration: 0.3 }}
      >
        {text}
      </motion.span>
      
      {/* Overlay Text (Red, Custom Font) */}
      <motion.span 
        className={`absolute inset-0 w-full h-full flex items-center ${align === "left" ? "justify-start origin-left" : "justify-center origin-center"} font-algeon whitespace-nowrap ${overlayColor} pointer-events-none drop-shadow-md`}
        initial="hidden"
        animate={isHovered ? "visible" : "hidden"}
        variants={{
          hidden: { rotate: -2, scale: 1.05 },
          visible: { 
            rotate: 0, 
            scale: 1,
            transition: { 
              staggerChildren: 0.04
            }
          }
        }}
      >
        {text.split("").map((char, index) => (
          <motion.span 
            key={index} 
            variants={{
              hidden: { opacity: 0, scale: 0.5 },
              visible: { 
                opacity: 1, 
                scale: 1,
                transition: { duration: 0.1, ease: "easeOut" }
              }
            }}
          >
            {char === " " ? "\u00A0" : char}
          </motion.span>
        ))}
      </motion.span>
    </div>
  );
}
