"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, useMotionTemplate } from "framer-motion";
import Image from "next/image";

const services = [
  {
    id: "01",
    title: "Commercials",
    desc: "High-end brand storytelling designed to convert. We craft commercials that don't just sell, they resonate.",
    tags: ["Brand", "Story", "Scale"],
    image: "/thumbnails/thumb1.jpg",
  },
  {
    id: "02",
    title: "Motion Graphics",
    desc: "Dynamic 2D/3D animations that bring ideas to life. Visual storytelling at its core.",
    tags: ["2D/3D", "Kinetic", "VFX"],
    image: "/thumbnails/thumb2.jpg",
  },
  {
    id: "03",
    title: "Color Grading",
    desc: "Cinematic looks tailored to evoke the right emotion. Every frame matters.",
    tags: ["Cinematic", "Mood", "Pop"],
    image: "/thumbnails/thumb3.jpg",
  },
  {
    id: "04",
    title: "Documentary",
    desc: "Weaving raw footage into compelling, authentic narratives. Finding the story hidden within.",
    tags: ["Authentic", "Pacing", "Arc"],
    image: "/thumbnails/thumb4.jpg",
  },
  {
    id: "05",
    title: "Social Ads",
    desc: "High-impact, fast-paced content designed to hold attention in an era of endless scrolling.",
    tags: ["ROI", "Fast", "Impact"],
    image: "/thumbnails/thumb5.webp",
  },
  {
    id: "06",
    title: "Animated Titles",
    desc: "Custom title sequences that set the perfect tone for your film before the first scene begins.",
    tags: ["Titles", "Tone", "Design"],
    image: "/thumbnails/thumb6.jpg",
  }
];

export function HorizontalScrollServices() {
  const targetRef = useRef<HTMLDivElement>(null);
  
  // Track scroll progress within the 400vh tall wrapper
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"]
  });

  // Framer Motion cannot natively interpolate from "0%" to a "calc()" string.
  // Instead, we interpolate a number from 0 to 100, and use useMotionTemplate to build the calc string dynamically!
  const scrollPercentage = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const x = useMotionTemplate`calc(-${scrollPercentage}% + ${scrollPercentage}vw)`;

  return (
    <section ref={targetRef} className="relative h-[400vh] bg-[#050505] text-white border-t border-white/5 pb-32 md:pb-48">
      <div className="sticky top-0 h-[100dvh] w-full flex flex-col justify-between pt-4 md:pt-6 pb-28 md:pb-32 overflow-hidden">
        
        {/* Header Section */}
        <div className="w-full px-6 md:px-12 xl:px-20 flex flex-col md:flex-row justify-between items-start md:items-end gap-6 shrink-0">
          <div className="flex-1">
            <h2 className="relative inline-block text-4xl md:text-5xl lg:text-6xl font-sans font-bold tracking-tight leading-tight mb-2">
              <div className="absolute -top-5 -left-2 md:-top-8 md:-left-10 -rotate-12 z-10 pointer-events-none" style={{ filter: "drop-shadow(0 0 10px rgba(0,255,65,0.5))" }}>
                <span className="inline-block border-2 md:border-[3px] border-[#00FF41] text-[#00FF41] text-[10px] md:text-xl font-bold px-2 py-0.5 md:px-4 md:py-1.5 rounded-sm md:rounded-md uppercase tracking-widest bg-[#050505]/50 backdrop-blur-sm">
                  Selected
                </span>
              </div>
              Featured <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-400 to-white">Works</span>
            </h2>
          </div>
          <p className="text-gray-400 text-sm md:text-base max-w-[320px] leading-relaxed pb-2">
            The process behind the pixels. Over the years, we&apos;ve helped brands turn their concepts into highly polished, cinematic experiences. Here is a look at some of that work.
          </p>
        </div>

        {/* Horizontal Scrolling Track */}
        <motion.div style={{ x }} className="flex w-max gap-6 md:gap-8 pl-6 md:pl-[40vw] lg:pl-[50vw] pr-6 md:pr-12 xl:pr-20 shrink-0 mt-auto">
          {services.map((service) => (
            <div 
              key={service.id} 
              onClick={(e) => {
                const isPlaying = e.currentTarget.getAttribute('data-playing') === 'true';
                const vid = e.currentTarget.querySelector('video');
                if (isPlaying) {
                  e.currentTarget.setAttribute('data-playing', 'false');
                  if (vid) vid.pause();
                } else {
                  // Pause all other videos first
                  document.querySelectorAll('.service-card-video').forEach((v: any) => {
                    v.pause();
                    v.closest('.group')?.setAttribute('data-playing', 'false');
                  });
                  e.currentTarget.setAttribute('data-playing', 'true');
                  if (vid) vid.play();
                }
              }}
              onMouseEnter={(e) => {
                const vid = e.currentTarget.querySelector('video');
                if (vid) vid.play();
              }}
              onMouseLeave={(e) => {
                const isPlaying = e.currentTarget.getAttribute('data-playing') === 'true';
                if (!isPlaying) {
                  const vid = e.currentTarget.querySelector('video');
                  if (vid) vid.pause();
                }
              }}
              className="group relative w-[75vw] sm:w-[40vw] lg:w-[28vw] xl:w-[22vw] h-[60vh] sm:h-[65vh] md:h-[70vh] shrink-0 bg-[#050505] border border-white/10 rounded-3xl overflow-hidden hover:border-white/30 transition-colors flex flex-col justify-between p-8 cursor-pointer"
              data-playing="false"
            >
              {/* Image & Video Background */}
              <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden bg-[#050505]">
                {/* Thumbnail Image */}
                <Image 
                  src={service.image} 
                  alt={service.title}
                  fill
                  sizes="(max-width: 768px) 75vw, (max-width: 1200px) 40vw, 22vw"
                  className="object-cover opacity-60 group-hover:opacity-30 group-data-[playing=true]:opacity-30 transition-all duration-700 scale-100 group-hover:scale-105 group-data-[playing=true]:scale-105"
                />
                {/* Hover Video */}
                <video
                  src="/card-bg.mp4"
                  loop
                  muted
                  playsInline
                  className="service-card-video absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-60 group-data-[playing=true]:opacity-60 transition-opacity duration-700 scale-105 group-hover:scale-100 group-data-[playing=true]:scale-100"
                />
                {/* Overlay gradient to ensure text is always readable */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/10 pointer-events-none" />
              </div>
              
              {/* Tags Area */}
              <div className="relative z-10 flex flex-wrap gap-2 mb-6 pointer-events-none">
                {service.tags.map((tag, i) => (
                  <span key={i} className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[10px] uppercase tracking-widest font-bold text-gray-300">
                    {tag}
                  </span>
                ))}
              </div>

              {/* Text Content */}
              <div className="relative z-10 flex flex-col gap-4 pointer-events-none">
                <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center mb-2">
                  <span className="text-gray-400 font-black text-xs">{service.id}</span>
                </div>
                <div>
                  <h3 className="text-2xl md:text-3xl font-black font-heading mb-3">{service.title}</h3>
                  <p className="text-gray-400 text-sm md:text-base leading-relaxed">
                    {service.desc}
                  </p>
                </div>
              </div>

              {/* Hover Interaction Arrow */}
              <div className="absolute bottom-8 right-8 w-12 h-12 bg-[#E2F163] rounded-full flex items-center justify-center opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 group-data-[playing=true]:opacity-100 group-data-[playing=true]:translate-y-0 transition-all duration-300 z-20 shadow-[0_0_20px_rgba(226,241,99,0.3)]">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </div>
            </div>
          ))}
          {/* Spacing element at end of track to allow scrolling past last card fully */}
          <div className="w-[10vw] sm:w-[20vw] shrink-0" />
        </motion.div>
      </div>
    </section>
  );
}
