"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function VideoReveal() {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoWrapperRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const isMobile = window.innerWidth < 768;
    
    // Inset values for the center pill (Stage 1)
    const hInsetCenter = isMobile ? "10%" : "35%";
    const vInsetCenter = isMobile ? "25%" : "15%";
    
    // Inset values for the top pill (Stage 3)
    const hInsetTop = isMobile ? "25%" : "42%";
    const vInsetTopStart = isMobile ? "5%" : "5%";
    const vInsetTopEnd = isMobile ? "80%" : "75%";

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "+=400%", // 4 full screens of scrolling for the sequence
        scrub: 1,
        pin: true,
        anticipatePin: 1,
      }
    });

    // Phase 1: Pill expands to Full Screen
    tl.fromTo(
      videoWrapperRef.current,
      { clipPath: `inset(${vInsetCenter} ${hInsetCenter} ${vInsetCenter} ${hInsetCenter} round 300px)` },
      { clipPath: "inset(0% 0% 0% 0% round 0px)", ease: "power2.inOut" },
      "phase1"
    );
    tl.to(
      ".left-text-anim",
      { x: isMobile ? -50 : -200, opacity: 0, ease: "power2.inOut" },
      "phase1"
    );
    tl.to(
      ".right-text-anim",
      { x: isMobile ? 50 : 200, opacity: 0, ease: "power2.inOut" },
      "phase1"
    );

    // Phase 2: Overlay text over full screen video
    tl.fromTo(
      ".overlay-text-anim",
      { opacity: 0, scale: 0.8 },
      { opacity: 1, scale: 1, ease: "power2.out", duration: 0.5 },
      "phase2"
    );
    tl.to(
      ".overlay-text-anim",
      { opacity: 0, scale: 1.1, ease: "power2.in", duration: 0.5 },
      "phase2+=0.8" // Hold it briefly before fading out
    );

    // Ensure ScrollTrigger calculates the exact top coordinate after any layout shifts
    setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);

    // Phase 3: Shrink full screen to Top Pill
    tl.fromTo(
      videoWrapperRef.current,
      { clipPath: "inset(0% 0% 0% 0% round 0px)" },
      {
        clipPath: `inset(${vInsetTopStart} ${hInsetTop} ${vInsetTopEnd} ${hInsetTop} round 200px)`,
        ease: "power2.inOut"
      },
      "phase3"
    );

    // Phase 4: Final text scrolls up
    tl.fromTo(
      ".final-text-anim",
      { opacity: 0, y: 100 },
      { opacity: 1, y: 0, ease: "power2.out" },
      "phase3+=0.3" // Starts slightly after shrinking begins
    );

  }, { scope: containerRef });

  return (
    <section 
      ref={containerRef} 
      className="relative w-full h-[100dvh] bg-[#F8F8F8] overflow-hidden flex items-center justify-between"
    >
      {/* --- VIDEO LAYER --- */}
      <div 
        ref={videoWrapperRef}
        className="absolute inset-0 z-20 w-full h-full pointer-events-none will-change-[clip-path]"
        style={{ clipPath: "inset(15% 35% 15% 35% round 300px)" }} 
      >
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
        >
          <source src="/hero-bg-2.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black/10 mix-blend-overlay"></div>
      </div>

      {/* --- STAGE 1 TEXTS --- */}
      <div className="absolute inset-0 z-10 w-full h-full flex items-center justify-between px-4 md:px-16 pointer-events-none">
        {/* Left Text */}
        <div className="left-text-anim w-1/2 md:w-1/3 flex flex-col justify-center">
          <div className="relative inline-block w-fit">
            <span className="absolute -top-10 -left-6 md:-top-16 md:-left-12 text-[#22c55e] font-[cursive] text-5xl md:text-8xl -rotate-12 z-20">
              Hey
            </span>
            <h2 className="text-5xl md:text-[7rem] font-extrabold tracking-tighter leading-none relative z-10 text-black">
              I&apos;m <br /> RIEO
            </h2>
          </div>
        </div>

        {/* Right Text */}
        <div className="right-text-anim w-1/2 md:w-1/3 flex flex-col justify-center items-end text-right">
          <p className="text-gray-800 text-sm md:text-lg font-medium leading-relaxed max-w-sm">
            Director & Creative Lead. I mix live action with CG — building worlds, inventing characters, making things that shouldn&apos;t exist look real. Or unreal. As long as you can&apos;t stop looking at it.
          </p>
        </div>
      </div>

      {/* --- STAGE 2 OVERLAY TEXT --- */}
      <div className="overlay-text-anim absolute inset-0 z-30 w-full h-full flex items-center justify-center pointer-events-none opacity-0">
        <h2 className="text-5xl md:text-8xl font-bold text-white tracking-tighter text-center uppercase mix-blend-difference">
          I&apos;ve always <br/>
          <span className="text-[#22c55e] font-[cursive] lowercase text-6xl md:text-9xl">loved</span><br/>
          visuals
        </h2>
      </div>

      {/* --- STAGE 3 FINAL TEXT --- */}
      <div className="final-text-anim absolute inset-0 z-10 w-full h-full flex flex-col items-center justify-center pt-32 pointer-events-none opacity-0">
        <h2 className="text-3xl md:text-6xl font-bold text-black text-center max-w-4xl tracking-tight leading-tight">
          I&apos;ve directed The Spark short,<br/>
          the <span className="font-[cursive] text-[#22c55e]">Pause Fest</span> intro,<br/>
          and more.
        </h2>
      </div>

    </section>
  );
}
