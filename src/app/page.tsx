"use client";

import { useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { GlassCard } from "@/components/ui/glass-card";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  
  useEffect(() => {
    // Basic GSAP animations for split text simulation and reveal
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".hero-text span",
        { y: 100, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.1,
          duration: 1.2,
          ease: "power4.out",
          delay: 0.5,
        }
      );
      
      gsap.fromTo(
        ".fade-up",
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".fade-up-trigger",
            start: "top 80%",
          },
        }
      );
    }, heroRef);
    
    return () => ctx.revert();
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section ref={heroRef} className="relative h-[100dvh] w-full flex items-center justify-center overflow-hidden">
        {/* Background Video/Motion */}
        <div className="absolute inset-0 z-0 opacity-80">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[var(--color-bg-primary)] z-10 pointer-events-none" />
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover grayscale contrast-125"
          >
            <source src="/hero-bg-2.mp4" type="video/mp4" />
          </video>
        </div>

        {/* Center Text */}
        <div className="absolute top-[32vh] -translate-y-1/2 left-0 z-10 w-full flex justify-center pointer-events-none overflow-hidden">
          <h1 className="text-[7.5rem] sm:text-[14rem] md:text-[18rem] lg:text-[24rem] font-custom text-[#0F0F0F] tracking-tighter opacity-100 leading-none whitespace-nowrap">
            RIEO
          </h1>
        </div>

        {/* Dark Fade Background (Behind Portrait) */}
        <div className="absolute bottom-0 left-0 w-full h-[55dvh] bg-gradient-to-t from-[#050505] via-[#050505]/90 to-transparent z-10 pointer-events-none" />

        {/* Portrait Image */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 z-20 pointer-events-none h-[85dvh] w-full flex items-end justify-center">
          <img 
            src="/portrait.png" 
            alt="RIEO Portrait" 
            className="h-full w-auto object-contain object-bottom drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
          />
        </div>
        
        {/* Bottom Blend Fade */}
        <div className="absolute bottom-0 left-0 w-full h-[15dvh] sm:h-[20dvh] bg-gradient-to-t from-[#050505] via-[#050505]/80 to-transparent z-30 pointer-events-none" />
        

      </section>

      {/* Services/Workflow Preview */}
      <section className="py-24 lg:py-32 bg-[#050505] text-white relative z-10 w-full px-4 border-t border-white/5">
        <div className="max-w-7xl mx-auto fade-up-trigger">
          <div className="text-center mb-16 lg:mb-24 fade-up">
            <h2 className="text-4xl sm:text-5xl md:text-7xl font-heading font-bold uppercase tracking-tight">
              Crafting <br className="md:hidden" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-500 to-white">Excellence</span>
            </h2>
            <p className="mt-6 text-sm sm:text-base text-gray-400 uppercase tracking-widest max-w-xl mx-auto">
              The process behind the pixels.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {[
              { title: "Commercials", desc: "High-end brand storytelling designed to convert." },
              { title: "Motion Graphics", desc: "Dynamic 2D/3D animations that bring ideas to life." },
              { title: "Color Grading", desc: "Cinematic looks tailored to evoke the right emotion." }
            ].map((service, i) => (
              <div key={i} className="bg-white/[0.02] border border-white/5 p-8 lg:p-10 rounded-3xl fade-up min-h-[250px] flex flex-col justify-between hover:bg-white/[0.04] transition-colors group">
                <div>
                  <h3 className="text-2xl lg:text-3xl font-bold font-heading mb-4 text-white group-hover:text-gray-200 transition-colors">{service.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{service.desc}</p>
                </div>
                <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center mt-12 group-hover:border-white/30 transition-colors">
                  <span className="text-gray-400 font-bold text-sm">0{i + 1}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>



    </div>
  );
}
