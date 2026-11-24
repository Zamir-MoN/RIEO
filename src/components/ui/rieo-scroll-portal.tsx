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
  const oRef = useRef<HTMLSpanElement>(null);
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
      const portal = portalRef.current;
      const content = portalContentRef.current;
      const hint = hintRef.current;

      if (!container || !stage || !word || !r || !i || !e || !o || !portal || !content) return;

      // Calculate exact metrics of "O" relative to stage container
      const getOMetrics = () => {
        const stageRect = stage.getBoundingClientRect();
        const oRect = o.getBoundingClientRect();

        // Visible glyph width is 92.2% of container width (removing font side bearings)
        const w = oRect.width * 0.922;
        // Exact 1.71 aspect ratio of the glyph
        const h = w / 1.71;
        // Stadium capsule corner radius
        const radius = h / 2;

        // Coordinates of "O" optical center relative to stage container:
        const oCenterX = oRect.left + oRect.width / 2 - stageRect.left;
        const oCenterY = oRect.top + oRect.height * 0.43 - stageRect.top;

        return { w, h, radius, oCenterX, oCenterY };
      };

      // Set initial state: portal sits directly over the "O" with 0.0px error
      const m = getOMetrics();
      gsap.set(portal, {
        left: m.oCenterX,
        top: m.oCenterY,
        xPercent: -50,
        yPercent: -50,
        width: m.w,
        height: m.h,
        borderRadius: m.radius,
        borderWidth: 2,
        opacity: 0,
        pointerEvents: "none",
        force3D: true,
      });

      gsap.set(content, {
        opacity: 0,
        scale: 0.92,
        force3D: true,
      });

      // Scrubbed GSAP timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: "top top",
          end: "bottom bottom",
          scrub: 1.2,
          invalidateOnRefresh: true,
        },
      });

      // Refresh ScrollTrigger when web fonts are fully loaded
      if (typeof document !== "undefined" && document.fonts) {
        document.fonts.ready.then(() => {
          ScrollTrigger.refresh();
        });
      }

      /* ============================================================
         PHASE 1: FOCUS ON "O" (0.00 -> 0.35)
         - Hint fades out.
         - "R", "I", "E" glide outward and fade with blur.
         - Portal appears at the exact "O" contour, "O" fades out.
         ============================================================ */
      tl.to(
        hint,
        {
          opacity: 0,
          y: -20,
          duration: 0.3,
          ease: "power2.out",
        },
        0
      );

      tl.to(
        [r, i, e],
        {
          x: -140,
          opacity: 0,
          filter: "blur(12px)",
          stagger: 0.05,
          duration: 0.8,
          ease: "power3.inOut",
        },
        0.1
      );

      tl.set(portal, { pointerEvents: "auto" }, 0.5);

      tl.to(
        portal,
        {
          opacity: 1,
          duration: 0.3,
          ease: "power1.in",
        },
        0.5
      );

      tl.to(
        o,
        {
          opacity: 0,
          duration: 0.3,
          ease: "power1.in",
        },
        0.5
      );

      /* ============================================================
         PHASE 2: FULLSCREEN EXPANSION (0.35 -> 1.00)
         - Portal expands from O position to 100% width and 100% height!
         - Centers at (stage.clientWidth / 2, stage.clientHeight / 2) with pure px numbers.
         - Border radius smoothly goes to 0px (full bleed).
         - Content zooms into crisp 1.0 scale and full opacity.
         ============================================================ */
      tl.to(
        portal,
        {
          left: () => stage.clientWidth / 2,
          top: () => stage.clientHeight / 2,
          width: () => stage.clientWidth,
          height: () => stage.clientHeight,
          borderRadius: 0,
          borderWidth: 0,
          duration: 1.4,
          ease: "power3.inOut",
        },
        0.8
      );

      tl.to(
        content,
        {
          scale: 1.0,
          opacity: 1,
          duration: 1.1,
          ease: "power2.out",
        },
        1.1
      );

      /* ============================================================
         PHASE 3: HOLD FULL SECTION (1.00 -> 1.60)
         - User comfortably views and interacts with the section.
         ============================================================ */
      tl.to(
        ".portal-feature-card",
        {
          y: -14,
          stagger: 0.1,
          duration: 0.8,
          ease: "sine.inOut",
        },
        2.2
      );

      /* ============================================================
         PHASE 4: REDUCE BACK INTO "O" (1.60 -> 2.50)
         - Portal shrinks back from 100% to the exact "O" position & size!
         - Border radius returns to the stadium pill.
         - Content scales down and fades out.
         - "O" glyph returns.
         - "R", "I", "E" glide back in.
         ============================================================ */
      tl.to(
        content,
        {
          scale: 0.92,
          opacity: 0,
          duration: 0.8,
          ease: "power2.in",
        },
        3.0
      );

      tl.to(
        portal,
        {
          left: () => getOMetrics().oCenterX,
          top: () => getOMetrics().oCenterY,
          width: () => getOMetrics().w,
          height: () => getOMetrics().h,
          borderRadius: () => getOMetrics().radius,
          borderWidth: 2,
          duration: 1.4,
          ease: "power3.inOut",
        },
        3.1
      );

      tl.set(portal, { pointerEvents: "none" }, 4.4);

      tl.to(
        o,
        {
          opacity: 1,
          duration: 0.3,
          ease: "power2.out",
        },
        4.4
      );

      tl.to(
        portal,
        {
          opacity: 0,
          duration: 0.25,
          ease: "power1.out",
        },
        4.4
      );

      tl.to(
        [r, i, e],
        {
          x: 0,
          opacity: 1,
          filter: "blur(0px)",
          stagger: 0.05,
          duration: 0.8,
          ease: "power3.out",
        },
        4.4
      );

      tl.to(
        hint,
        {
          opacity: 1,
          y: 0,
          duration: 0.4,
          ease: "power2.out",
        },
        4.9
      );

      // Brief lock before unpinning
      tl.to({}, { duration: 0.4 });
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      className="relative w-full h-[380vh] bg-[#050505] text-white selection:bg-[#00FF41] selection:text-black"
    >
      {/* Sticky Fullscreen Stage: Stays centered in viewport during scroll */}
      <div
        ref={stageRef}
        className="sticky top-0 relative h-[100dvh] w-full overflow-hidden flex items-center justify-center bg-[#050505]"
      >
        {/* Subtle Ambient Background Gradients */}
        <div className="absolute inset-0 pointer-events-none z-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[min(700px,90vw)] h-[min(700px,90vw)] rounded-full bg-gradient-to-tr from-[#00FF41]/10 via-[#00E5FF]/5 to-transparent blur-[130px] opacity-60" />
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
            <span
              ref={oRef}
              className="inline-block text-white transition-opacity duration-300 will-change-transform"
            >
              O
            </span>
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
          THE EXPANDING "O" FULLSCREEN PORTAL
          Direct child of stage!
          - Collapsed: Sits directly over the "O" with left: oCenterX, top: oCenterY.
          - Expanded: Grows outward to left: 50%, top: 50%, width: 100%, height: 100%!
          - Reduced: Collapses back right into the "O" position!
          ============================================================
        */}
        <div
          ref={portalRef}
          className="absolute z-30 overflow-hidden bg-[#0A0A0A] border-2 border-[#00FF41] shadow-[0_0_60px_rgba(0,255,65,0.4)] will-change-[width,height,left,top,border-radius,opacity]"
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

          {/* 
            Inner Content Container:
            Fills the portal completely (w-full h-full) and formats gracefully at any size.
          */}
          <div
            ref={portalContentRef}
            className="relative z-10 w-full h-full flex flex-col justify-between p-5 sm:p-8 md:p-14 lg:p-16 max-w-7xl mx-auto overflow-hidden pointer-events-auto will-change-[transform,opacity]"
          >
            {/* Top Bar inside Portal */}
            <div className="flex items-center justify-between border-b border-white/10 pb-4 sm:pb-6">
              <div className="flex items-center gap-3">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00FF41] opacity-75" />
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-[#00FF41]" />
                </span>
                <span className="text-xs sm:text-sm font-bold uppercase tracking-widest text-[#00FF41]">
                  Inside The Portal • RIEO Showcase
                </span>
              </div>

              <div className="hidden sm:flex items-center gap-2 text-xs text-gray-400 bg-white/5 px-3 py-1.5 rounded-full border border-white/10">
                <Film className="w-3.5 h-3.5 text-[#00FF41]" />
                <span>Cinematic Reel 2026</span>
              </div>
            </div>

            {/* Middle Hero Showcase inside Portal */}
            <div className="my-auto py-6 sm:py-8">
              <div className="max-w-3xl">
                <p className="text-xs sm:text-sm md:text-base font-semibold text-[#00FF41] uppercase tracking-wider mb-2">
                  Vision • Motion • Rhythm
                </p>
                <h2 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight leading-[1.1] text-white uppercase font-sans">
                  Crafting Visuals That{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-gray-400">
                    Command Attention.
                  </span>
                </h2>
                <p className="mt-3 sm:mt-4 text-xs sm:text-base md:text-lg text-gray-300 max-w-2xl leading-relaxed">
                  Every cut is deliberate. Every keyframe has purpose. Transforming high-velocity ideas into festival-grade motion graphics and viral commercials.
                </p>
              </div>

              {/* 3 Feature Highlight Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 md:gap-6 mt-6 sm:mt-10">
                {/* Card 1 */}
                <div className="portal-feature-card bg-white/[0.04] hover:bg-white/[0.08] backdrop-blur-xl border border-white/10 rounded-2xl p-4 sm:p-5 md:p-6 transition-all duration-300">
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
                <div className="portal-feature-card bg-white/[0.04] hover:bg-white/[0.08] backdrop-blur-xl border border-white/10 rounded-2xl p-4 sm:p-5 md:p-6 transition-all duration-300">
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
                <div className="portal-feature-card bg-white/[0.04] hover:bg-white/[0.08] backdrop-blur-xl border border-white/10 rounded-2xl p-4 sm:p-5 md:p-6 transition-all duration-300">
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

            {/* Bottom Bar inside Portal */}
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
