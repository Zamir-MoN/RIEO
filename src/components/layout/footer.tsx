"use client";

import React, { useRef } from "react";
import Link from "next/link";
import { motion, useInView, useScroll, useTransform, Variants } from "framer-motion";
import { FaYoutube, FaInstagram, FaTelegram, FaDiscord } from "react-icons/fa6";
import { usePathname } from "next/navigation";

export function Footer() {
  const pathname = usePathname();
  
  const containerRef = useRef<HTMLDivElement>(null);

  if (pathname.startsWith("/admin")) return null;

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "start center"]
  });

  // Animate the SVG curve from a deep arch to a gentle curve/flat line
  const curvePath = useTransform(
    scrollYProgress,
    [0, 1],
    ["M0,120 C600,120 600,120 1200,120 Z", "M0,120 C600,0 600,0 1200,120 Z"]
  );

  // Only trigger when the footer is actually visible
  const isInView = useInView(containerRef, { once: true, margin: "-10%" });

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.1 }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 80 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8, ease: [0.23, 1, 0.32, 1] }
    }
  };

  const iconVariants: Variants = {
    hidden: { opacity: 0, scale: 0, rotate: -20 },
    visible: { 
      opacity: 1, 
      scale: 1,
      rotate: 0,
      transition: { type: "spring", stiffness: 120, damping: 14 }
    }
  };

  return (
    <footer ref={containerRef} className="relative w-full z-20 bg-[#D5D1C3]">
      {/* Smooth SVG curve blending into the beige section, animated on scroll */}
      <div className="absolute top-0 left-0 w-full overflow-hidden leading-none z-0" style={{ transform: 'translateY(-99%)' }}>
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-full h-[100px] md:h-[200px] fill-[#050505]">
          <motion.path d={curvePath}></motion.path>
        </svg>
      </div>
      
      <div className="relative w-full min-h-[100vh] bg-[#050505] flex flex-col items-center justify-between py-12 px-6 md:px-12 pb-[max(5rem,calc(env(safe-area-inset-bottom,0px)+3.5rem))] overflow-hidden">
        
        {/* Background Neon Doodles */}
          <>
            {/* Top Left - Alien/Monster */}
            <motion.svg className="absolute top-[15%] left-[8%] w-24 h-24 md:w-36 md:h-36 text-[#00FF41] stroke-current stroke-[1.5] fill-none z-0" variants={iconVariants} initial="hidden" animate={isInView ? "visible" : "hidden"} viewBox="0 0 24 24" style={{ filter: "drop-shadow(0 0 12px rgba(0,255,65,0.4))" }}>
              <path d="M12 2C8 2 5 5 5 10c0 4 3 6 3 10h8c0-4 3-6 3-10 0-5-3-8-7-8z" />
              <circle cx="9" cy="9" r="1.5" />
              <circle cx="15" cy="9" r="1.5" />
              <path d="M10 14c.5 1 3.5 1 4 0" />
              <path d="M5 10c-2 0-3 1-3 3 0 1 1 2 2 2" />
              <path d="M19 10c2 0 3 1 3 3 0 1-1 2-2 2" />
            </motion.svg>



            {/* Center Left - Sword */}
            <motion.svg className="absolute top-[45%] left-[10%] w-20 h-20 md:w-28 md:h-28 text-[#00FF41] stroke-current stroke-[1.5] fill-none rotate-[20deg] z-0" variants={iconVariants} initial="hidden" animate={isInView ? "visible" : "hidden"} transition={{ delay: 0.15 }} viewBox="0 0 24 24" style={{ filter: "drop-shadow(0 0 12px rgba(0,255,65,0.4))" }}>
              <path d="M14.5 17.5 3 6V3h3l11.5 11.5" />
              <path d="M13 19c0-2.8 2.2-5 5-5s5 2.2 5 5-2.2 5-5 5-5-2.2-5-5Z" />
              <path d="m16 16 2 2" />
            </motion.svg>


            {/* Top Right - Instagram */}
            <motion.a href="#" target="_blank" className="absolute top-[10%] right-[10%] text-[#00FF41] hover:text-white transition-colors rotate-[15deg] z-20" variants={iconVariants} initial="hidden" animate={isInView ? "visible" : "hidden"} transition={{ delay: 0.1 }} style={{ filter: "drop-shadow(0 0 12px rgba(0,255,65,0.4))" }}>
              <FaInstagram className="w-12 h-12 md:w-20 md:h-20" />
            </motion.a>

            {/* Center Right - Youtube */}
            <motion.a href="#" target="_blank" className="absolute top-[40%] right-[5%] text-[#00FF41] hover:text-white transition-colors -rotate-12 z-20" variants={iconVariants} initial="hidden" animate={isInView ? "visible" : "hidden"} transition={{ delay: 0.2 }} style={{ filter: "drop-shadow(0 0 12px rgba(0,255,65,0.4))" }}>
              <FaYoutube className="w-14 h-14 md:w-24 md:h-24" />
            </motion.a>

            {/* Bottom Left - Telegram */}
            <motion.a href="#" target="_blank" className="absolute bottom-[20%] left-[12%] text-[#00FF41] hover:text-white transition-colors rotate-12 z-20" variants={iconVariants} initial="hidden" animate={isInView ? "visible" : "hidden"} transition={{ delay: 0.3 }} style={{ filter: "drop-shadow(0 0 12px rgba(0,255,65,0.4))" }}>
              <FaTelegram className="w-12 h-12 md:w-20 md:h-20" />
            </motion.a>

            {/* Bottom Right - Discord */}
            <motion.a href="#" target="_blank" className="absolute bottom-[10%] right-[15%] text-[#00FF41] hover:text-white transition-colors -rotate-[15deg] z-20" variants={iconVariants} initial="hidden" animate={isInView ? "visible" : "hidden"} transition={{ delay: 0.4 }} style={{ filter: "drop-shadow(0 0 12px rgba(0,255,65,0.4))" }}>
              <FaDiscord className="w-12 h-12 md:w-20 md:h-20" />
            </motion.a>
          </>

        {/* Central Massive Typography */}
        <motion.div 
          className="flex-grow flex flex-col items-center justify-center w-full z-10 text-center relative"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <motion.h2 
            variants={itemVariants}
            className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-[10rem] font-bold font-heading tracking-tighter leading-[0.9] text-white flex flex-col relative px-4"
          >
            <span>Contact with</span>
            <span className="relative inline-block">
              RIEO
              {/* Green Scribble/Slash over text */}
              <motion.svg 
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] text-[#00FF41] pointer-events-none stroke-current stroke-[4] fill-none"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={isInView ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
                transition={{ duration: 0.6, delay: 0.5, ease: "easeOut" }}
                viewBox="0 0 200 100"
                preserveAspectRatio="none"
                style={{ filter: "drop-shadow(0 0 10px rgba(0,255,65,0.4))" }}
              >
                <path d="M10,50 Q50,20 90,60 T190,40" />
              </motion.svg>
            </span>
          </motion.h2>

          <motion.div 
            variants={itemVariants}
            className="mt-16 md:mt-24 flex flex-col items-center gap-6 text-white font-sans"
          >
            <div className="flex flex-col items-center gap-1">
              <span className="text-[10px] md:text-xs text-gray-500 uppercase tracking-widest font-semibold">Inquiries</span>
              <span className="text-sm md:text-lg font-medium">contact@rieo.com</span>
            </div>

            <div className="flex flex-col items-center gap-1">
              <span className="text-[10px] md:text-xs text-gray-500 uppercase tracking-widest font-semibold">Socials</span>
              <motion.div 
                className="flex items-center gap-6 mt-1"
                variants={containerVariants}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
              >
                <motion.a variants={iconVariants} href="#" target="_blank" className="text-[#FF0000] hover:scale-110 transition-transform drop-shadow-md inline-block">
                  <FaYoutube className="w-6 h-6 md:w-8 md:h-8" />
                </motion.a>
                <motion.a variants={iconVariants} href="#" target="_blank" className="text-[#E1306C] hover:scale-110 transition-transform drop-shadow-md inline-block">
                  <FaInstagram className="w-6 h-6 md:w-8 md:h-8" />
                </motion.a>
                <motion.a variants={iconVariants} href="#" target="_blank" className="text-[#24A1DE] hover:scale-110 transition-transform drop-shadow-md inline-block">
                  <FaTelegram className="w-6 h-6 md:w-8 md:h-8" />
                </motion.a>
                <motion.a variants={iconVariants} href="#" target="_blank" className="text-[#5865F2] hover:scale-110 transition-transform drop-shadow-md inline-block">
                  <FaDiscord className="w-6 h-6 md:w-8 md:h-8" />
                </motion.a>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>


      </div>
    </footer>
  );
}
