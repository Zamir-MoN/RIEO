"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Eye, Film, Layers, ArrowDown, ExternalLink } from "lucide-react";

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

      if (!container || !stage || !word || !r || !i || !e || !o || !portal || !content) return;

      // Calculate exact metrics of "O" relative to stage container (measuring unshifted word)
      const getOMetrics = () => {
        const stageRect = stage.getBoundingClientRect();
        const oRect = o.getBoundingClientRect();
        const currentWordX = Number(gsap.getProperty(word, "x")) || 0;

        // Visible glyph width is 92.2% of container width (removing font side bearings)
        const w = oRect.width * 0.922;
        // Exact 1.71 aspect ratio of the glyph
        const h = w / 1.71;
        // Stadium capsule corner radius
        const radius = h / 2;

        // Unshifted center of "O" relative to stage container
        const oCenterX = oRect.left + oRect.width / 2 - stageRect.left - currentWordX;
        const oCenterY = oRect.top + oRect.height * 0.43 - stageRect.top;

        // Horizontal shift required to slide "O" to exact horizontal center of stage
        const stageCenterX = stage.clientWidth / 2;
        const shiftToCenterX = stageCenterX - oCenterX;

        return { w, h, radius, oCenterX, oCenterY, stageCenterX, shiftToCenterX };
      };

      // Set initial state: portal sits at the horizontal center where "O" slides to
      const m = getOMetrics();
      gsap.set(portal, {
        left: m.stageCenterX,
        top: m.oCenterY,
        xPercent: -50,
        yPercent: -50,
        width: m.w,
        height: m.h,
        borderRadius: m.radius,
        borderWidth: 1,
        opacity: 0,
        pointerEvents: "none",
        force3D: true,
      });

      gsap.set(content, {
        opacity: 0,
        scale: 0.96,
        force3D: true,
      });

      // Scrubbed GSAP timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.9,
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
         PHASE 1: "R I E" FADE OUT & "O" SLIDES TO CENTER (0.00 -> 0.85)
         ============================================================ */
      tl.to(
        [r, i, e],
        {
          x: -70,
          opacity: 0,
          stagger: 0.04,
          duration: 0.55,
          ease: "power2.inOut",
        },
        0
      );

      tl.to(
        word,
        {
          x: () => getOMetrics().shiftToCenterX,
          duration: 0.75,
          ease: "power3.inOut",
        },
        0.05
      );

      // Sync portal's collapsed coordinates to the centered "O" right before crossfading
      tl.set(
        portal,
        {
          left: () => getOMetrics().stageCenterX,
          top: () => getOMetrics().oCenterY,
          width: () => getOMetrics().w,
          height: () => getOMetrics().h,
          borderRadius: () => getOMetrics().radius,
          pointerEvents: "auto",
        },
        0.65
      );

      tl.to(
        portal,
        {
          opacity: 1,
          duration: 0.25,
          ease: "none",
        },
        0.65
      );

      tl.to(
        o,
        {
          opacity: 0,
          duration: 0.25,
          ease: "none",
        },
        0.65
      );

      /* ============================================================
         PHASE 2: FULLSCREEN EXPANSION FROM CENTER (0.85 -> 2.15)
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
          duration: 1.3,
          ease: "power3.inOut",
        },
        0.85
      );

      tl.to(
        content,
        {
          scale: 1,
          opacity: 1,
          duration: 0.9,
          ease: "power2.out",
        },
        1.25
      );

      /* ============================================================
         PHASE 3: HOLD FULL SECTION (2.15 -> 2.95)
         ============================================================ */
      tl.to(
        ".portal-feature-card",
        {
          y: -10,
          stagger: 0.08,
          duration: 0.8,
          ease: "sine.inOut",
        },
        2.15
      );

      /* ============================================================
         PHASE 4: REDUCE BACK INTO CENTERED "O" (2.95 -> 4.30)
         ============================================================ */
      tl.to(
        content,
        {
          scale: 0.96,
          opacity: 0,
          duration: 0.65,
          ease: "power2.in",
        },
        2.95
      );

      tl.to(
        portal,
        {
          left: () => getOMetrics().stageCenterX,
          top: () => getOMetrics().oCenterY,
          width: () => getOMetrics().w,
          height: () => getOMetrics().h,
          borderRadius: () => getOMetrics().radius,
          borderWidth: 1,
          duration: 1.3,
          ease: "power3.inOut",
        },
        3.05
      );

      /* ============================================================
         PHASE 5: RESTORE "O" & SLIDE "RIEO" BACK (4.30 -> 5.15)
         ============================================================ */
      tl.set(portal, { pointerEvents: "none" }, 4.35);

      tl.to(
        o,
        {
          opacity: 1,
          duration: 0.25,
          ease: "none",
        },
        4.3
      );

      tl.to(
        portal,
        {
          opacity: 0,
          duration: 0.25,
          ease: "none",
        },
        4.3
      );

      tl.to(
        word,
        {
          x: 0,
          duration: 0.75,
          ease: "power3.inOut",
        },
        4.4
      );

      tl.to(
        [r, i, e],
        {
          x: 0,
          opacity: 1,
          stagger: 0.04,
          duration: 0.55,
          ease: "power2.out",
        },
        4.55
      );

      // Brief lock before unpinning
      tl.to({}, { duration: 0.35 });
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      className="relative w-full h-[380vh] bg-[#050505] text-white selection:bg-white selection:text-black"
    >
      {/* Sticky Fullscreen Stage: Stays centered in viewport during scroll */}
      <div
        ref={stageRef}
        className="sticky top-0 relative h-[100dvh] w-full overflow-hidden flex items-center justify-center bg-[#050505]"
      >
        {/* Center Typography: "R I E O" */}
        <div className="relative z-10 flex flex-col items-center justify-center pointer-events-none select-none">
          <div
            ref={wordRef}
            className="flex items-center justify-center font-custom tracking-normal text-[clamp(5.2rem,22vw,14rem)] leading-none text-white will-change-transform"
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
              className="inline-block text-white will-change-transform"
            >
              O
            </span>
          </div>
        </div>

        {/* 
          ============================================================
          THE EXPANDING "O" FULLSCREEN PORTAL
          Direct child of stage!
          - Collapsed: Sits directly over the centered "O".
          - Expanded: Grows outward to fill 100% of the stage.
          - Reduced: Collapses back into the centered "O" position.
          ============================================================
        */}
        <div
          ref={portalRef}
          className="absolute z-30 overflow-hidden bg-[#0A0A0A] border border-white/20 will-change-[width,height,left,top,border-radius,opacity]"
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
          </div>

          {/* Inner Content Container */}
          <div
            ref={portalContentRef}
            className="relative z-10 w-full h-full flex flex-col justify-between p-5 sm:p-8 md:p-14 lg:p-16 max-w-7xl mx-auto overflow-hidden pointer-events-auto will-change-[transform,opacity]"
          >
            {/* Top Bar inside Portal */}
            <div className="flex items-center justify-between border-b border-white/10 pb-4 sm:pb-6">
              <div className="flex items-center gap-3">
                <span className="inline-flex rounded-full h-2.5 w-2.5 bg-white" />
                <span className="text-xs sm:text-sm font-bold uppercase tracking-widest text-white">
                  Inside The Portal • RIEO Showcase
                </span>
              </div>

              <div className="hidden sm:flex items-center gap-2 text-xs text-gray-400 bg-white/5 px-3 py-1.5 rounded-full border border-white/10">
                <Film className="w-3.5 h-3.5 text-white" />
                <span>Cinematic Reel 2026</span>
              </div>
            </div>

            {/* Middle Hero Showcase inside Portal */}
            <div className="my-auto py-6 sm:py-8">
              <div className="max-w-3xl">
                <p className="text-xs sm:text-sm md:text-base font-semibold text-gray-400 uppercase tracking-wider mb-2">
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
                <div className="portal-feature-card bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 rounded-2xl p-4 sm:p-5 md:p-6 transition-colors duration-300">
                  <div className="w-10 h-10 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center text-white mb-3 sm:mb-4">
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
                <div className="portal-feature-card bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 rounded-2xl p-4 sm:p-5 md:p-6 transition-colors duration-300">
                  <div className="w-10 h-10 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center text-white mb-3 sm:mb-4">
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
                <div className="portal-feature-card bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 rounded-2xl p-4 sm:p-5 md:p-6 transition-colors duration-300">
                  <div className="w-10 h-10 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center text-white mb-3 sm:mb-4">
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
                <ArrowDown className="w-3.5 h-3.5 text-white animate-bounce" />
              </div>

              <div className="flex items-center gap-4">
                <a
                  href="/store"
                  className="inline-flex items-center gap-1.5 text-white hover:underline font-bold"
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
