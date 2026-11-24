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
    const video = heroRef.current?.querySelector("video");
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        video?.play().catch(() => {});
      } else {
        video?.pause();
      }
    }, { threshold: 0.1 });

    if (heroRef.current) observer.observe(heroRef.current);

    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      // Initial States with hardware acceleration hints
      gsap.set(".hero-title", { scale: 0.7, opacity: 0, force3D: true });
      gsap.set(".hero-portrait-anim", { y: 60, opacity: 0, force3D: true });
      gsap.set(".hero-bg-video", { opacity: 0 });
      gsap.set(".hero-badge", { scale: 0.8, opacity: 0, y: 20, force3D: true });
      gsap.set(".hero-bottom-text", { opacity: 0, x: -30, force3D: true });
      gsap.set(".hero-bottom-right-text", { opacity: 0, x: 30, force3D: true });

      // 1. Text Scale Up
      tl.to(".hero-title", {
        scale: 1,
        opacity: 1,
        duration: 1.5,
        ease: "power4.out",
        delay: 0.2
      })
        // 2. Portrait Slide In
        .to(".hero-portrait-anim", {
          y: 0,
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

    return () => {
      observer.disconnect();
      ctx.revert();
    };
  }, []);

  return (
    <section ref={heroRef} className="hero-section-root relative h-[64vw] min-h-[250px] max-h-[420px] md:h-[100dvh] md:max-h-[1080px] w-full flex items-center justify-center overflow-hidden">
      {/* Background Video/Motion */}
      <div className="hero-bg-video absolute inset-0 z-0 opacity-80">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#050505] z-10 pointer-events-none" />
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="w-full h-full object-cover grayscale contrast-125"
        >
          <source src="/hero-bg-2.mp4" type="video/mp4" />
        </video>
      </div>


      {/* Center Text - Sits wide across the screen right behind head & shoulders, matching desktop composition */}
      <div className="hero-center-text absolute top-[40%] md:top-[38vh] -translate-y-1/2 left-0 z-10 w-full flex justify-center pointer-events-none px-2 sm:px-4">
        <div className="hero-title select-none">
          <h1 
            data-text="RIEO"
            className="glitch-text text-[clamp(3.6rem,19vw,6.8rem)] md:text-[clamp(6rem,18vw,22rem)] font-custom text-white tracking-normal md:tracking-tighter opacity-100 leading-none whitespace-nowrap select-none drop-shadow-[0_12px_30px_rgba(0,0,0,0.6)]"
          >
            RIEO
          </h1>
        </div>
      </div>

      {/* Dark Fade Background (Behind Portrait) */}
      <div className="absolute bottom-0 left-0 w-full h-[55%] md:h-[55dvh] bg-gradient-to-t from-[#050505] via-[#050505]/90 to-transparent z-5 pointer-events-none" />

      {/* Floating Badges & Ambient Content - Exact Desktop composition on all viewports */}
      <div className="absolute inset-0 z-30 pointer-events-none w-full h-full overflow-hidden">
        <div className="relative w-full h-full">

          {/* Badge 1: 80+ Projects (Top Left above "R") */}
          <div className="hero-badge hero-badge-1 absolute top-3 sm:top-5 md:top-[clamp(8%,12vh,15%)] left-2.5 sm:left-4 md:left-[clamp(1.5rem,calc(50%-min(38vw,560px)),6rem)] bg-gradient-to-br from-white/20 to-white/5 backdrop-blur-2xl border border-white/30 px-2 py-1 sm:px-3 sm:py-1.5 md:px-[clamp(0.85rem,1.2vw,1.5rem)] md:py-[clamp(0.6rem,1vh,1rem)] rounded-lg sm:rounded-2xl md:rounded-3xl shadow-[inset_0_0_20px_rgba(255,255,255,0.15),_0_20px_40px_rgba(0,0,0,0.4)] flex items-center justify-center gap-1.5 sm:gap-2.5 md:gap-4 w-auto">
            <svg className="w-3.5 h-3.5 sm:w-5 sm:h-5 md:w-[clamp(2.5rem,3vw,3.5rem)] md:h-[clamp(2rem,2.5vw,3rem)] text-[#F5FF00] fill-current drop-shadow-md shrink-0" viewBox="0 0 45 30">
              <path d="M12.6,0.3L9,9.4H4.2l3-7.5H0l6.2,15.6l5.2-13.1l4.8,12h3.3L12.6,0.3z M30.6,0.3l-3.6,9.1h-4.8l3-7.5h-7.2l6.2,15.6l5.2-13.1 l4.8,12h3.3L30.6,0.3z" />
            </svg>
            <div className="flex flex-col items-start md:items-center justify-center">
              <div className="text-[11px] sm:text-base md:text-[clamp(1.25rem,2vw,1.85rem)] font-black text-white leading-none tracking-tight drop-shadow-md tabular-nums">80+</div>
              <div className="text-[7px] sm:text-[0.6rem] md:text-xs text-white/90 font-bold mt-0.5 md:mt-1 tracking-wide uppercase">Projects</div>
            </div>
          </div>

          {/* Badge 2: 3+ Years (Lower Left below "R") */}
          <div className="hero-badge hero-badge-2 absolute bottom-10 sm:bottom-14 md:bottom-[clamp(15%,20vh,25%)] left-2.5 sm:left-4 md:left-[clamp(1.5rem,calc(50%-min(36vw,490px)),5rem)] bg-gradient-to-br from-white/20 to-white/5 backdrop-blur-2xl border border-white/30 px-2 py-1 sm:p-2.5 md:p-[clamp(0.75rem,1.2vw,1.4rem)] rounded-lg sm:rounded-2xl md:rounded-3xl shadow-[inset_0_0_20px_rgba(255,255,255,0.15),_0_20px_40px_rgba(0,0,0,0.4)] flex flex-col items-center justify-center text-center w-auto">
            <div className="text-sm sm:text-2xl md:text-[clamp(2.5rem,4vw,3.8rem)] font-black text-[#F5FF00] leading-none mb-0.5 md:mb-1 drop-shadow-lg tracking-tighter tabular-nums">3+</div>
            <div className="text-[7px] sm:text-[0.6rem] md:text-xs text-white/90 font-bold leading-tight tracking-wide">
              Years of<br />experience
            </div>
          </div>

          {/* Badge 3: Traits List (Lower Right beside shoulder & below "O") */}
          <div className="hero-badge hero-badge-3 absolute top-[48%] md:top-[clamp(44%,49vh,54%)] -translate-y-1/2 right-2 sm:right-4 md:right-[clamp(1.5rem,calc(50%-min(38vw,560px)),6rem)] bg-gradient-to-br from-white/20 to-white/5 backdrop-blur-2xl border border-white/30 p-1.5 sm:p-2.5 md:p-[clamp(0.85rem,1.4vw,1.75rem)] rounded-lg sm:rounded-2xl md:rounded-3xl shadow-[inset_0_0_20px_rgba(255,255,255,0.15),_0_20px_40px_rgba(0,0,0,0.4)] flex items-center justify-center w-auto">
            <div className="flex flex-col items-start justify-center gap-0.5 sm:gap-1.5 md:gap-[clamp(0.75rem,1.2vh,1.25rem)]">
              <div className="flex items-center gap-1 md:gap-3.5">
                <Star className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 md:w-5 md:h-5 text-[#F5FF00] fill-[#F5FF00] drop-shadow-md shrink-0" />
                <span className="text-[8px] sm:text-[0.7rem] md:text-[clamp(0.75rem,0.9vw,1rem)] text-white font-bold tracking-wide">Creative</span>
              </div>
              <div className="flex items-center gap-1 md:gap-3.5">
                <Shield className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 md:w-5 md:h-5 text-[#F5FF00] fill-[#F5FF00] drop-shadow-md shrink-0" />
                <span className="text-[8px] sm:text-[0.7rem] md:text-[clamp(0.75rem,0.9vw,1rem)] text-white font-bold tracking-wide">Reliable</span>
              </div>
              <div className="flex items-center gap-1 md:gap-3.5">
                <CheckCircle2 className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 md:w-5 md:h-5 text-[#F5FF00] fill-[#F5FF00] drop-shadow-md shrink-0" />
                <span className="text-[8px] sm:text-[0.7rem] md:text-[clamp(0.75rem,0.9vw,1rem)] text-white font-bold tracking-wide">Strategist</span>
              </div>
              <div className="flex items-center gap-1 md:gap-3.5">
                <Zap className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 md:w-5 md:h-5 text-[#F5FF00] fill-[#F5FF00] drop-shadow-md shrink-0" />
                <span className="text-[8px] sm:text-[0.7rem] md:text-[clamp(0.75rem,0.9vw,1rem)] text-white font-bold tracking-wide">Builder</span>
              </div>
            </div>
          </div>

          {/* Bottom Left Text */}
          <div className="hero-bottom-text absolute bottom-2 sm:bottom-4 md:bottom-[clamp(1.25rem,3.5vh,2.5rem)] left-2.5 sm:left-4 md:left-[clamp(1.5rem,3.5vw,4.5rem)] z-30 text-white font-sans pointer-events-none block">
            <p className="text-[9px] sm:text-xs md:text-[clamp(1rem,1.4vw,1.4rem)] font-bold tracking-tight leading-snug drop-shadow-[0_4px_10px_rgba(0,0,0,0.8)]">
              The design Expert.<br />
              <span className="text-[#00FF41]">That&apos;s RIEO.</span>
            </p>
          </div>

          {/* Bottom Right Text */}
          <div className="hero-bottom-right-text absolute bottom-2 sm:bottom-4 md:bottom-[clamp(1.25rem,3.5vh,2.5rem)] right-2.5 sm:right-4 md:right-[clamp(1.5rem,3.5vw,4.5rem)] z-30 text-white font-sans pointer-events-none text-right max-w-[115px] sm:max-w-[180px] md:max-w-[clamp(220px,22vw,320px)] block">
            <p className="text-[7px] sm:text-[10px] md:text-[clamp(0.7rem,0.85vw,0.85rem)] font-medium text-gray-200 tracking-tight leading-tight md:leading-relaxed drop-shadow-[0_4px_10px_rgba(0,0,0,0.8)]">
              Working closely with your team to deliver video editing and motion graphics that merge creativity, technical excellence, and long-term value.
            </p>
          </div>
        </div>
      </div>

      {/* Portrait Image - Perfectly head-locked to RIEO center across all viewports & modes */}
      <div className="hero-portrait absolute top-[40%] md:top-[38vh] left-1/2 -translate-x-1/2 -translate-y-[24%] z-20 pointer-events-none h-[70%] md:h-[clamp(560px,75vh,780px)] w-auto flex items-center justify-center">
        <div className="hero-portrait-anim h-full w-auto flex items-center justify-center">
          <Image
            src="/portrait.png"
            alt="RIEO Portrait"
            width={1254}
            height={1254}
            priority
            className="h-full w-auto max-w-none object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.6)]"
          />
        </div>
      </div>

      {/* Bottom Blend Fade */}
      <div className="absolute bottom-0 left-0 w-full h-[22dvh] bg-gradient-to-t from-[#050505] via-[#050505]/80 to-transparent z-25 pointer-events-none" />
    </section>
  );
}
