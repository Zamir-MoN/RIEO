"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { Star, Shield, Zap, CheckCircle2, Briefcase } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function HeroAnimatedSection() {
  const heroRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      // Initial States
      gsap.set(".hero-title", { scale: 0.7, opacity: 0 });
      gsap.set(".hero-portrait", { y: "100%", opacity: 0 });
      gsap.set(".hero-bg-video", { opacity: 0 });
      gsap.set(".hero-badge", { scale: 0.8, opacity: 0, y: 20 });
      gsap.set(".hero-bottom-text", { opacity: 0, x: -30 });
      gsap.set(".hero-bottom-right-text", { opacity: 0, x: 30 });

      // 1. Text Scale Up
      tl.to(".hero-title", {
        scale: 1,
        opacity: 1,
        duration: 1.5,
        ease: "power4.out",
        delay: 0.2
      })
      // 2. Portrait Slide In
      .to(".hero-portrait", {
        y: "0%",
        opacity: 1,
        duration: 1.2,
        ease: "power3.out"
      }, "-=0.8")
      // 3. Background Video Fade In
      .to(".hero-bg-video", {
        opacity: 0.8,
        duration: 2,
        ease: "power2.inOut"
      }, "-=1.0")
      // 4. Badges Pop In
      .to(".hero-badge", {
        scale: 1,
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "back.out(1.5)"
      }, "-=1.2")
      // 5. Bottom Text Fade Slide
      .to(".hero-bottom-text", {
        opacity: 1,
        x: 0,
        duration: 1,
        ease: "power3.out"
      }, "-=0.8")
      // 6. Bottom Right Text
      .to(".hero-bottom-right-text", {
        opacity: 1,
        x: 0,
        duration: 1,
        ease: "power3.out"
      }, "-=0.8");
    }, heroRef);
    
    return () => ctx.revert();
  }, []);

  return (
    <section ref={heroRef} className="relative h-[100dvh] w-full flex items-center justify-center overflow-hidden">
      {/* Background Video/Motion */}
      <div className="hero-bg-video absolute inset-0 z-0 opacity-80">
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
        <h1 className="hero-title text-[7.5rem] sm:text-[14rem] md:text-[18rem] lg:text-[24rem] font-custom text-[#0F0F0F] tracking-tighter opacity-100 leading-none whitespace-nowrap">
          RIEO
        </h1>
      </div>

      {/* Dark Fade Background (Behind Portrait) */}
      <div className="absolute bottom-0 left-0 w-full h-[55dvh] bg-gradient-to-t from-[#050505] via-[#050505]/90 to-transparent z-10 pointer-events-none" />

      {/* Floating Glassmorphism Badges */}
      <div className="absolute top-[5%] sm:top-[8%] left-0 w-full z-30 pointer-events-none md:inset-0">
        <div className="relative w-full h-full grid grid-cols-2 gap-3 px-4 md:block md:p-0">
          {/* Badge 1: 80+ Projects (Top Left) */}
          <div className="hero-badge relative md:absolute md:top-[5%] lg:top-[8%] md:right-[calc(50%+360px)] lg:right-[calc(50%+590px)] bg-gradient-to-br from-white/20 to-white/5 backdrop-blur-2xl border-[1.5px] border-white/30 px-4 py-3 md:px-6 md:py-4 lg:px-8 lg:py-5 rounded-2xl lg:rounded-3xl shadow-[inset_0_0_20px_rgba(255,255,255,0.15),_0_20px_40px_rgba(0,0,0,0.4)] flex items-center justify-center gap-3 md:gap-5 lg:gap-8 min-w-0 md:min-w-[200px] lg:min-w-[240px] w-full md:w-auto">
            <svg className="w-12 h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 text-[#F5FF00] fill-current drop-shadow-md shrink-0" viewBox="0 0 45 30">
              {/* Approximated Webflow W Logo */}
              <path d="M12.6,0.3L9,9.4H4.2l3-7.5H0l6.2,15.6l5.2-13.1l4.8,12h3.3L12.6,0.3z M30.6,0.3l-3.6,9.1h-4.8l3-7.5h-7.2l6.2,15.6l5.2-13.1 l4.8,12h3.3L30.6,0.3z"/>
            </svg>
            <div className="flex flex-col items-start md:items-center">
              <div className="text-xl md:text-2xl lg:text-3xl font-black text-white leading-none tracking-tight drop-shadow-md">80+</div>
              <div className="text-[0.65rem] md:text-xs lg:text-sm text-white font-bold mt-1 tracking-wide">Projects</div>
            </div>
          </div>

          {/* Badge 2: 3+ Years (Bottom Left) */}
          <div className="hero-badge relative md:absolute md:bottom-[2%] lg:bottom-[4%] md:right-[calc(50%+250px)] lg:right-[calc(50%+340px)] bg-gradient-to-br from-white/20 to-white/5 backdrop-blur-2xl border-[1.5px] border-white/30 p-4 md:p-6 lg:p-8 rounded-[1.25rem] md:rounded-[2rem] shadow-[inset_0_0_20px_rgba(255,255,255,0.15),_0_20px_40px_rgba(0,0,0,0.4)] flex flex-col items-center justify-center text-center min-w-0 md:min-w-[160px] lg:min-w-[200px] w-full md:w-auto">
            <div className="text-4xl md:text-6xl lg:text-7xl font-black text-[#F5FF00] leading-none mb-1 md:mb-3 drop-shadow-lg tracking-tighter">3+</div>
            <div className="text-[0.65rem] md:text-xs lg:text-sm text-white font-bold leading-snug tracking-wide">
              Years of<br className="hidden md:block" />experience
            </div>
          </div>

          {/* Badge 3: Traits List (Right) */}
          <div className="hero-badge relative md:absolute md:bottom-[12%] lg:bottom-[18%] md:left-[calc(50%+200px)] lg:left-[calc(50%+280px)] bg-gradient-to-br from-white/20 to-white/5 backdrop-blur-2xl border-[1.5px] border-white/30 p-4 md:p-8 lg:p-10 rounded-[1.25rem] md:rounded-[2.5rem] shadow-[inset_0_0_20px_rgba(255,255,255,0.15),_0_20px_40px_rgba(0,0,0,0.4)] flex items-center justify-center min-w-0 md:min-w-[200px] lg:min-w-[240px] w-full md:w-auto col-span-2">
            <div className="flex flex-row flex-wrap md:flex-col items-center md:items-start justify-center gap-3 md:gap-5 lg:gap-6">
              <div className="flex items-center gap-2 md:gap-5">
                <Star className="w-4 h-4 md:w-5 md:h-5 lg:w-7 lg:h-7 text-[#F5FF00] fill-[#F5FF00] drop-shadow-md" />
                <span className="text-[0.7rem] md:text-sm lg:text-lg text-white font-bold tracking-wide">Creative</span>
              </div>
              <div className="flex items-center gap-2 md:gap-5">
                <Shield className="w-4 h-4 md:w-5 md:h-5 lg:w-7 lg:h-7 text-[#F5FF00] fill-[#F5FF00] drop-shadow-md" />
                <span className="text-[0.7rem] md:text-sm lg:text-lg text-white font-bold tracking-wide">Reliable</span>
              </div>
              <div className="flex items-center gap-2 md:gap-5">
                <CheckCircle2 className="w-4 h-4 md:w-5 md:h-5 lg:w-7 lg:h-7 text-[#F5FF00] fill-[#F5FF00] drop-shadow-md" />
                <span className="text-[0.7rem] md:text-sm lg:text-lg text-white font-bold tracking-wide">Strategist</span>
              </div>
              <div className="flex items-center gap-2 md:gap-5">
                <Zap className="w-4 h-4 md:w-5 md:h-5 lg:w-7 lg:h-7 text-[#F5FF00] fill-[#F5FF00] drop-shadow-md" />
                <span className="text-[0.7rem] md:text-sm lg:text-lg text-white font-bold tracking-wide">Builder</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Portrait Image */}
      <div className="hero-portrait absolute bottom-0 left-1/2 -translate-x-1/2 z-20 pointer-events-none h-[85dvh] w-full flex items-end justify-center">
        <Image 
          src="/portrait.png" 
          alt="RIEO Portrait" 
          width={1000}
          height={1200}
          priority
          className="h-full w-auto object-contain object-bottom drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
        />
      </div>

      {/* Bottom Left Text */}
      <div className="hero-bottom-text hidden md:block absolute bottom-6 left-6 md:bottom-12 md:left-12 lg:bottom-16 lg:left-16 z-30 text-white font-sans pointer-events-none">
        <p className="text-sm md:text-xl lg:text-2xl font-bold tracking-tight leading-snug drop-shadow-[0_4px_10px_rgba(0,0,0,0.8)]">
          The design Expert.<br/>
          <span className="text-[#00FF41]">That&apos;s RIEO.</span>
        </p>
      </div>

      {/* Bottom Right Text */}
      <div className="hero-bottom-right-text hidden md:block absolute bottom-6 right-6 md:bottom-12 md:right-12 lg:bottom-16 lg:right-16 z-30 text-white font-sans pointer-events-none text-right">
        <p className="text-[10px] md:text-xs lg:text-sm font-medium text-gray-200 tracking-tight leading-relaxed drop-shadow-[0_4px_10px_rgba(0,0,0,0.8)]">
          Working closely with your team to deliver<br className="hidden md:block" />
          Webflow builds that merge creativity, technical<br className="hidden md:block" />
          excellence, and long-term value.
        </p>
      </div>

      {/* Bottom Blend Fade */}
      <div className="absolute bottom-0 left-0 w-full h-[15dvh] sm:h-[20dvh] bg-gradient-to-t from-[#050505] via-[#050505]/80 to-transparent z-10 pointer-events-none" />
    </section>
  );
}
