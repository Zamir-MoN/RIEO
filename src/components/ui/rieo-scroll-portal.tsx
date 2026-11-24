"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const GALLERY_COLUMNS = [
  // Column 1: Moves UP -> DOWN on scroll
  [
    { src: "/thumbnails/thumb1.jpg", alt: "Editorial Frame 01", aspect: "aspect-[3/4]" },
    { src: "/thumbnails/thumb2.jpg", alt: "Editorial Frame 02", aspect: "aspect-[4/5]" },
    { src: "/thumbnails/thumb5.webp", alt: "Editorial Frame 05", aspect: "aspect-[3/4]" },
    { src: "/portrait.png", alt: "RIEO Portrait", aspect: "aspect-[4/5]" },
    { src: "/thumbnails/thumb3.jpg", alt: "Editorial Frame 03", aspect: "aspect-[3/4]" },
    { src: "/thumbnails/thumb6.jpg", alt: "Editorial Frame 06", aspect: "aspect-[4/5]" },
    { src: "/thumbnails/thumb4.jpg", alt: "Editorial Frame 04", aspect: "aspect-[3/4]" },
    { src: "/thumbnails/thumb1.jpg", alt: "Editorial Frame 01", aspect: "aspect-[4/5]" },
    { src: "/thumbnails/thumb2.jpg", alt: "Editorial Frame 02", aspect: "aspect-[3/4]" },
    { src: "/thumbnails/thumb5.webp", alt: "Editorial Frame 05", aspect: "aspect-[4/5]" },
  ],
  // Column 2: Moves DOWN -> UP on scroll
  [
    { src: "/thumbnails/thumb3.jpg", alt: "Editorial Frame 03", aspect: "aspect-[3/4]" },
    { src: "/thumbnails/thumb4.jpg", alt: "Editorial Frame 04", aspect: "aspect-[4/5]" },
    { src: "/thumbnails/thumb1.jpg", alt: "Editorial Frame 01", aspect: "aspect-[3/4]" },
    { src: "/thumbnails/thumb6.jpg", alt: "Editorial Frame 06", aspect: "aspect-[4/5]" },
    { src: "/thumbnails/thumb1.jpg", alt: "Editorial Frame 01", aspect: "aspect-[3/4]" },
    { src: "/portrait.png", alt: "RIEO Portrait", aspect: "aspect-[4/5]" },
    { src: "/thumbnails/thumb2.jpg", alt: "Editorial Frame 02", aspect: "aspect-[3/4]" },
    { src: "/thumbnails/thumb5.webp", alt: "Editorial Frame 05", aspect: "aspect-[4/5]" },
    { src: "/thumbnails/thumb3.jpg", alt: "Editorial Frame 03", aspect: "aspect-[3/4]" },
    { src: "/thumbnails/thumb4.jpg", alt: "Editorial Frame 04", aspect: "aspect-[4/5]" },
  ],
  // Column 3: Moves UP -> DOWN on scroll
  [
    { src: "/thumbnails/thumb5.webp", alt: "Editorial Frame 05", aspect: "aspect-[4/5]" },
    { src: "/thumbnails/thumb6.jpg", alt: "Editorial Frame 06", aspect: "aspect-[3/4]" },
    { src: "/thumbnails/thumb2.jpg", alt: "Editorial Frame 02", aspect: "aspect-[4/5]" },
    { src: "/thumbnails/thumb3.jpg", alt: "Editorial Frame 03", aspect: "aspect-[3/4]" },
    { src: "/thumbnails/thumb4.jpg", alt: "Editorial Frame 04", aspect: "aspect-[4/5]" },
    { src: "/thumbnails/thumb1.jpg", alt: "Editorial Frame 01", aspect: "aspect-[3/4]" },
    { src: "/portrait.png", alt: "RIEO Portrait", aspect: "aspect-[4/5]" },
    { src: "/thumbnails/thumb6.jpg", alt: "Editorial Frame 06", aspect: "aspect-[3/4]" },
    { src: "/thumbnails/thumb5.webp", alt: "Editorial Frame 05", aspect: "aspect-[4/5]" },
    { src: "/thumbnails/thumb2.jpg", alt: "Editorial Frame 02", aspect: "aspect-[3/4]" },
  ],
  // Column 4: Moves DOWN -> UP on scroll
  [
    { src: "/portrait.png", alt: "RIEO Portrait", aspect: "aspect-[3/4]" },
    { src: "/thumbnails/thumb6.jpg", alt: "Editorial Frame 06", aspect: "aspect-[4/5]" },
    { src: "/thumbnails/thumb1.jpg", alt: "Editorial Frame 01", aspect: "aspect-[3/4]" },
    { src: "/thumbnails/thumb4.jpg", alt: "Editorial Frame 04", aspect: "aspect-[4/5]" },
    { src: "/thumbnails/thumb5.webp", alt: "Editorial Frame 05", aspect: "aspect-[3/4]" },
    { src: "/thumbnails/thumb2.jpg", alt: "Editorial Frame 02", aspect: "aspect-[4/5]" },
    { src: "/thumbnails/thumb3.jpg", alt: "Editorial Frame 03", aspect: "aspect-[3/4]" },
    { src: "/thumbnails/thumb6.jpg", alt: "Editorial Frame 06", aspect: "aspect-[4/5]" },
    { src: "/portrait.png", alt: "RIEO Portrait", aspect: "aspect-[3/4]" },
    { src: "/thumbnails/thumb1.jpg", alt: "Editorial Frame 01", aspect: "aspect-[4/5]" },
  ],
];

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
  const colRefs = useRef<(HTMLDivElement | null)[]>([]);

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

      if (!container || !stage || !word || !r || !i || !e || !o || !portal || !content)
        return;

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

      const getColTravel = (col: HTMLDivElement | null) => {
        if (!col) return 0;
        return Math.max(0, col.scrollHeight - stage.clientHeight);
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
        borderWidth: 6,
        opacity: 0,
        pointerEvents: "none",
        force3D: true,
      });

      gsap.set(content, {
        opacity: 0,
        scale: 0.96,
        force3D: true,
      });

      // Set alternating initial column positions:
      // Col 0 & Col 2 (1st & 3rd): start shifted up (-32%) so they move UP -> DOWN
      // Col 1 & Col 3 (2nd & 4th): start at 0% so they move DOWN -> UP
      colRefs.current.forEach((col, idx) => {
        if (!col) return;
        const isUpToDown = idx % 2 === 0;
        gsap.set(col, {
          yPercent: isUpToDown ? -32 : 0,
          force3D: true,
        });
      });

      // Scrubbed GSAP timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.25,
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
         PHASE 2: FULLSCREEN EXPANSION FROM CENTER (0.85 -> 1.95)
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
          duration: 1.1,
          ease: "power3.inOut",
        },
        0.85
      );

      tl.to(
        content,
        {
          scale: 1,
          opacity: 1,
          duration: 0.8,
          ease: "power2.out",
        },
        1.15
      );

      /* ============================================================
         PHASE 3: 4-COLUMN ALTERNATING SCROLL (1.95 -> 3.65)
         - Col 1 & 3: UP -> DOWN (from -32% to 0%)
         - Col 2 & 4: DOWN -> UP (from 0% to -32%)
         ============================================================ */
      colRefs.current.forEach((col, idx) => {
        if (!col) return;
        const isUpToDown = idx % 2 === 0;
        tl.fromTo(
          col,
          { yPercent: isUpToDown ? -32 : 0 },
          {
            yPercent: isUpToDown ? 0 : -32,
            duration: 1.7,
            ease: "none",
          },
          1.95
        );
      });

      /* ============================================================
         PHASE 4: REDUCE BACK INTO CENTERED "O" (3.65 -> 4.85)
         ============================================================ */
      tl.to(
        content,
        {
          scale: 0.96,
          opacity: 0,
          duration: 0.55,
          ease: "power2.in",
        },
        3.65
      );

      tl.to(
        portal,
        {
          left: () => getOMetrics().stageCenterX,
          top: () => getOMetrics().oCenterY,
          width: () => getOMetrics().w,
          height: () => getOMetrics().h,
          borderRadius: () => getOMetrics().radius,
          borderWidth: 6,
          duration: 1.15,
          ease: "power3.inOut",
        },
        3.75
      );

      /* ============================================================
         PHASE 5: RESTORE "O" & SLIDE "RIEO" BACK (4.85 -> 5.70)
         ============================================================ */
      tl.set(portal, { pointerEvents: "none" }, 4.9);

      tl.to(
        o,
        {
          opacity: 1,
          duration: 0.25,
          ease: "none",
        },
        4.85
      );

      tl.to(
        portal,
        {
          opacity: 0,
          duration: 0.25,
          ease: "none",
        },
        4.85
      );

      tl.to(
        word,
        {
          x: 0,
          duration: 0.75,
          ease: "power3.inOut",
        },
        4.95
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
        5.1
      );

      /* ============================================================
         PHASE 6: "RIEO" GLIDES UPWARD TO REVEAL NEXT CARD (5.75 -> 6.45)
         ============================================================ */
      tl.to(
        word,
        {
          y: () => -stage.clientHeight * 0.65,
          opacity: 0,
          duration: 0.7,
          ease: "power2.inOut",
        },
        5.75
      );
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      className="relative w-full h-[460vh] bg-transparent text-white selection:bg-white selection:text-black"
    >
      {/* Sticky Fullscreen Stage: Stays centered in viewport during scroll */}
      <div
        ref={stageRef}
        className="sticky top-0 relative h-[100dvh] w-full overflow-hidden flex items-center justify-center bg-transparent pointer-events-none"
      >
        {/* Center Typography: "R I E O" */}
        <div className="relative z-10 flex flex-col items-center justify-center pointer-events-none select-none">
          <div
            ref={wordRef}
            style={{
              textShadow: "0 4px 28px rgba(0,0,0,0.95), 0 0 60px rgba(0,0,0,0.85)",
              WebkitTextStroke: "2px rgba(5,5,5,0.7)",
              paintOrder: "stroke fill",
            }}
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
          ============================================================
        */}
        <div
          ref={portalRef}
          className="absolute z-30 overflow-hidden bg-[#070708] border-solid border-white will-change-[width,height,left,top,border-radius,opacity]"
        >
          <div
            ref={portalContentRef}
            className="relative w-full h-full overflow-hidden pointer-events-auto will-change-[transform,opacity]"
          >
            {/* 4-Column Alternating Scroll Masonry Gallery */}
            <div className="w-full h-full px-1.5 sm:px-5 md:px-6 overflow-hidden">
              <div className="grid grid-cols-4 gap-1.5 sm:gap-3 md:gap-4 h-full items-start">
                {GALLERY_COLUMNS.map((col, colIdx) => (
                  <div
                    key={colIdx}
                    ref={(el) => {
                      colRefs.current[colIdx] = el;
                    }}
                    className="flex flex-col gap-1.5 sm:gap-3 md:gap-4 py-1.5 sm:py-3 will-change-transform"
                  >
                    {col.map((item, itemIdx) => (
                      <div
                        key={itemIdx}
                        className={`group relative w-full ${item.aspect} rounded-lg sm:rounded-xl md:rounded-2xl overflow-hidden bg-zinc-900 border border-white/5 shrink-0`}
                      >
                        <img
                          src={item.src}
                          alt={item.alt}
                          loading="eager"
                          decoding="async"
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
