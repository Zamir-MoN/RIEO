"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Sparkles, Eye, Film, Layers, ArrowDown, ExternalLink } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function RieoScrollPortal() {
  const containerRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const wordRef = useRef<HTMLDivElement>(null);
  const rRef = useRef<HTMLSpanElement>(null);
  const iRef = useRef<HTMLSpanElement>(null);
  const eRef = useRef<HTMLSpanElement>(null);
  const oRef = useRef<HTMLDivElement>(null);
  const oCharRef = useRef<HTMLSpanElement>(null);
  const portalRef = useRef<HTMLDivElement>(null);
  const portalContentRef = useRef<HTMLDivElement>(null);
  const hintRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const container = containerRef.current;
      const stage = stageRef.current;
      const word = wordRef.current;
      const r = rRef.current;
      const i = iRef.current;
      const e = eRef.current;
      const o = oRef.current;
      const oChar = oCharRef.current;
      const portal = portalRef.current;
      const content = portalContentRef.current;
      const hint = hintRef.current;

      if (!container || !stage || !word || !r || !i || !e || !o || !oChar || !portal || !content) return;

      // Function to calculate exact center offset for "O" and exact "O" insets
      const getMetrics = () => {
        const stageRect = stage.getBoundingClientRect();
        const oRect = o.getBoundingClientRect();

        // How much wordRef needs to shift horizontally to place "O" at stage center:
        const stageCenterX = stageRect.left + stageRect.width / 2;
        const oCenterX = oRect.left + oRect.width / 2;
        const shiftX = stageCenterX - oCenterX;

        // Insets to match "O" size when collapsed in center
        const oW = oRect.width;
        const oH = oRect.height;
        const insetTop = Math.max(0, (stageRect.height - oH) / 2);
        const insetBottom = insetTop;
        const insetLeft = Math.max(0, (stageRect.width - oW) / 2);
        const insetRight = insetLeft;
        const oRadius = Math.min(oW, oH) * 0.48;

        return { shiftX, insetTop, insetRight, insetBottom, insetLeft, oRadius };
      };

      // Set initial states
      const initialMetrics = getMetrics();
      gsap.set(portal, {
        clipPath: `inset(${initialMetrics.insetTop}px ${initialMetrics.insetRight}px ${initialMetrics.insetBottom}px ${initialMetrics.insetLeft}px round ${initialMetrics.oRadius}px)`,
        autoAlpha: 0,
        force3D: true,
      });
      gsap.set(content, { scale: 0.88, opacity: 0, force3D: true });

      // Create main scrubbed timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: "top top",
          end: "bottom bottom",
          scrub: 1.2,
          invalidateOnRefresh: true,
        },
      });

      /* ============================================================
         PHASE 1: FOCUS & "O" CENTERING (0% -> 22%)
         - "R", "I", "E" glide outward and fade out with blur.
         - The word shifts so "O" sits directly in the stage center.
         - The portal activates matching the "O" dimensions.
         ============================================================ */
      tl.to(
        hint,
        {
          opacity: 0,
          y: -20,
          duration: 0.2,
          ease: "power2.out",
        },
        0
      );

      tl.to(
        [r, i, e],
        {
          x: -120,
          opacity: 0,
          filter: "blur(12px)",
          stagger: 0.04,
          duration: 0.6,
          ease: "power3.inOut",
        },
        0.05
      );

      tl.to(
        word,
        {
          x: () => getMetrics().shiftX,
          duration: 0.6,
          ease: "power3.inOut",
        },
        0.05
      );

      tl.to(
        portal,
        {
          autoAlpha: 1,
          duration: 0.2,
          ease: "power1.in",
        },
        0.4
      );

      tl.to(
        oChar,
        {
          opacity: 0,
          scale: 1.1,
          duration: 0.2,
          ease: "power1.in",
        },
        0.45
      );

      /* ============================================================
         PHASE 2: EXPANSION OF "O" INTO FULL SECTION (22% -> 45%)
         - The portal expands to 100vw x 100vh with round 0px.
         - Showcase content inside zooms into focus (scale 1.0, opacity 1).
         ============================================================ */
      tl.to(
        portal,
        {
          clipPath: "inset(0px 0px 0px 0px round 0px)",
          duration: 1.2,
          ease: "power4.inOut",
        },
        0.5
      );

      tl.to(
        content,
        {
          scale: 1.0,
          opacity: 1,
          duration: 1.0,
          ease: "power3.out",
        },
        0.7
      );

      /* ============================================================
         PHASE 3: HOLD SECTION AT FULL SIZE (45% -> 65%)
         - User browses the immersive showcase content at full screen.
         ============================================================ */
      tl.to(
        ".portal-card",
        {
          y: -12,
          stagger: 0.08,
          duration: 0.8,
          ease: "sine.inOut",
        },
        1.7
      );

      /* ============================================================
         PHASE 4: REDUCTION OF SECTION BACK INTO "O" (65% -> 88%)
         - "the section reduce to O again"
         - Portal smoothly collapses back to the exact "O" insets & radius.
         - "O" glyph reappears.
         - Word shifts back to center "RIEO".
         - "R", "I", "E" glide back in with full opacity.
         ============================================================ */
      tl.to(
        content,
        {
          scale: 0.88,
          opacity: 0,
          duration: 0.8,
          ease: "power3.in",
        },
        2.5
      );

      tl.to(
        portal,
        {
          clipPath: () => {
            const m = getMetrics();
            return `inset(${m.insetTop}px ${m.insetRight}px ${m.insetBottom}px ${m.insetLeft}px round ${m.oRadius}px)`;
          },
          duration: 1.2,
          ease: "power4.inOut",
        },
        2.6
      );

      tl.to(
        oChar,
        {
          opacity: 1,
          scale: 1.0,
          duration: 0.3,
          ease: "power2.out",
        },
        3.6
      );

      tl.to(
        portal,
        {
          autoAlpha: 0,
          duration: 0.2,
          ease: "power1.out",
        },
        3.7
      );

      tl.to(
        word,
        {
          x: 0,
          duration: 0.7,
          ease: "power3.out",
        },
        3.6
      );

      tl.to(
        [r, i, e],
        {
          x: 0,
          opacity: 1,
          filter: "blur(0px)",
          stagger: 0.04,
          duration: 0.7,
          ease: "power3.out",
        },
        3.6
      );

      tl.to(
        hint,
        {
          opacity: 1,
          y: 0,
          duration: 0.4,
          ease: "power2.out",
        },
        4.0
      );

      // Brief padding before transition
      tl.to({}, { duration: 0.4 });
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      className="relative w-full h-[360vh] bg-[#050505] text-white selection:bg-[#00FF41] selection:text-black"
    >
      {/* Sticky Fullscreen Stage: Stays locked in viewport during scroll */}
      <div
        ref={stageRef}
        className="sticky top-0 h-[100dvh] w-full overflow-hidden flex items-center justify-center bg-[#050505]"
      >
        {/* Subtle Ambient Background Gradients */}
        <div className="absolute inset-0 pointer-events-none z-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[min(700px,90vw)] h-[min(700px,90vw)] rounded-full bg-gradient-to-tr from-[#00FF41]/10 via-[#00E5FF]/5 to-transparent blur-[120px] opacity-60" />
        </div>

        {/* Center Typography: "R I E O" */}
        <div className="relative z-10 flex flex-col items-center justify-center pointer-events-none select-none">
          <div
            ref={wordRef}
            className="flex items-center justify-center font-custom tracking-normal text-[clamp(5.2rem,22vw,14rem)] leading-none text-white drop-shadow-[0_20px_50px_rgba(0,0,0,0.8)] will-change-transform"
          >
            <span ref={rRef} className="inline-block will-change-transform">
              R
            </span>
            <span ref={iRef} className="inline-block will-change-transform">
              I
            </span>
            <span ref={eRef} className="inline-block will-change-transform">
              E
            </span>
            <div
              ref={oRef}
              className="relative inline-flex items-center justify-center will-change-transform"
            >
              <span
                ref={oCharRef}
                className="inline-block text-white transition-colors duration-300 will-change-transform"
              >
                O
              </span>
            </div>
          </div>

          {/* Hint Badge Below RIEO */}
          <div
            ref={hintRef}
            className="mt-6 sm:mt-8 flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/[0.06] border border-white/10 backdrop-blur-md text-xs sm:text-sm font-medium text-gray-300 tracking-wider uppercase transition-opacity"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#00FF41] animate-pulse" />
            <span>Scroll to expand the &ldquo;O&rdquo;</span>
            <ArrowDown className="w-3.5 h-3.5 text-[#00FF41] animate-bounce" />
          </div>
        </div>

        {/* 
          ============================================================
          THE EXPANDING "O" PORTAL SECTION
          Opens seamlessly from the "O" coordinates to full bleed,
          then reduces back into the "O" on further scroll.
          ============================================================
        */}
        <div
          ref={portalRef}
          className="absolute inset-0 z-30 pointer-events-auto overflow-hidden bg-[#0A0A0A] border border-white/15 shadow-[0_0_80px_rgba(0,255,65,0.25)] will-change-[clip-path,opacity]"
          style={{ visibility: "hidden", opacity: 0 }}
        >
          {/* Background Video inside the Portal */}
          <div className="absolute inset-0 z-0 pointer-events-none">
            <video
              autoPlay
              loop
              muted
              playsInline
              preload="auto"
              className="w-full h-full object-cover opacity-35 grayscale contrast-125 scale-105"
            >
              <source src="/hero-bg-2.mp4" type="video/mp4" />
            </video>
            <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/75 to-[#0A0A0A]/90" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,255,65,0.08)_0%,transparent_70%)]" />
          </div>

          {/* Content inside the Portal */}
          <div
            ref={portalContentRef}
            className="relative z-10 w-full h-full flex flex-col justify-between p-5 sm:p-8 md:p-14 lg:p-16 max-w-7xl mx-auto will-change-[transform,opacity]"
          >
            {/* Top Bar inside Portal */}
            <div className="flex items-center justify-between border-b border-white/10 pb-4 sm:pb-6">
              <div className="flex items-center gap-3">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00FF41] opacity-75" />
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-[#00FF41]" />
                </span>
                <span className="text-xs sm:text-sm font-bold uppercase tracking-widest text-[#00FF41]">
                  Inside The Portal • RIEO Cinematic
                </span>
              </div>

              <div className="hidden sm:flex items-center gap-2 text-xs text-gray-400 bg-white/5 px-3 py-1.5 rounded-full border border-white/10">
                <Film className="w-3.5 h-3.5 text-[#00FF41]" />
                <span>Showreel Edition 2026</span>
              </div>
            </div>

            {/* Middle Hero Showcase inside Portal */}
            <div className="my-auto py-6 sm:py-8">
              <div className="max-w-3xl">
                <p className="text-xs sm:text-sm md:text-base font-semibold text-[#00FF41] uppercase tracking-wider mb-2">
                  Vision • Motion • Rhythm
                </p>
                <h2 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight leading-[1.1] text-white uppercase font-sans">
                  Crafting Visuals That <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-gray-400">Command Attention.</span>
                </h2>
                <p className="mt-3 sm:mt-4 text-xs sm:text-base md:text-lg text-gray-300 max-w-2xl leading-relaxed">
                  Every cut is deliberate. Every keyframe has purpose. Transforming high-velocity ideas into festival-grade motion graphics and viral commercials.
                </p>
              </div>

              {/* 3 Showcase Feature Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 md:gap-6 mt-6 sm:mt-10">
                {/* Card 1 */}
                <div className="portal-card bg-white/[0.04] hover:bg-white/[0.08] backdrop-blur-xl border border-white/10 rounded-2xl p-4 sm:p-5 md:p-6 transition-all duration-300">
                  <div className="w-10 h-10 rounded-xl bg-[#00FF41]/10 border border-[#00FF41]/30 flex items-center justify-center text-[#00FF41] mb-3 sm:mb-4">
                    <Eye className="w-5 h-5" />
                  </div>
                  <div className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-gray-400 mb-1">
                    01 • Direction
                  </div>
                  <h3 className="text-base sm:text-lg md:text-xl font-bold text-white mb-1.5">
                    Rhythmic Pacing
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-400 leading-snug">
                    Hooking viewers in the first 2.5 seconds with seamless sync between sound and frame.
                  </p>
                </div>

                {/* Card 2 */}
                <div className="portal-card bg-white/[0.04] hover:bg-white/[0.08] backdrop-blur-xl border border-white/10 rounded-2xl p-4 sm:p-5 md:p-6 transition-all duration-300">
                  <div className="w-10 h-10 rounded-xl bg-[#00E5FF]/10 border border-[#00E5FF]/30 flex items-center justify-center text-[#00E5FF] mb-3 sm:mb-4">
                    <Layers className="w-5 h-5" />
                  </div>
                  <div className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-gray-400 mb-1">
                    02 • 3D &amp; VFX
                  </div>
                  <h3 className="text-base sm:text-lg md:text-xl font-bold text-white mb-1.5">
                    Spatial Motion
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-400 leading-snug">
                    Kinetic typography, holographic UI graphics, and cinematic 3D camera projections.
                  </p>
                </div>

                {/* Card 3 */}
                <div className="portal-card bg-white/[0.04] hover:bg-white/[0.08] backdrop-blur-xl border border-white/10 rounded-2xl p-4 sm:p-5 md:p-6 transition-all duration-300">
                  <div className="w-10 h-10 rounded-xl bg-[#F5FF00]/10 border border-[#F5FF00]/30 flex items-center justify-center text-[#F5FF00] mb-3 sm:mb-4">
                    <Film className="w-5 h-5" />
                  </div>
                  <div className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-gray-400 mb-1">
                    03 • Color Grade
                  </div>
                  <h3 className="text-base sm:text-lg md:text-xl font-bold text-white mb-1.5">
                    Hollywood Tonal
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-400 leading-snug">
                    Bespoke color contrast science tailored to give footage an instant cinematic prestige.
                  </p>
                </div>
              </div>
            </div>

            {/* Bottom Bar inside Portal: Shows scroll direction indicator */}
            <div className="border-t border-white/10 pt-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-400">
              <div className="flex items-center gap-2">
                <span className="text-white font-medium">Keep scrolling</span>
                <span className="text-gray-500">•</span>
                <span>Section collapses back to &ldquo;O&rdquo;</span>
                <ArrowDown className="w-3.5 h-3.5 text-[#00FF41] animate-bounce" />
              </div>

              <div className="flex items-center gap-4">
                <a
                  href="/store"
                  className="inline-flex items-center gap-1.5 text-[#00FF41] hover:underline font-bold"
                >
                  <span>Explore Assets &amp; Presets</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
