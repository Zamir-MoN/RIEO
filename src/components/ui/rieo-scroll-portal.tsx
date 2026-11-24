"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const GALLERY_COLUMNS = [
  [
    { src: "/thumbnails/thumb1.jpg", alt: "Editorial Frame 01", aspect: "aspect-[3/4]" },
    { src: "/thumbnails/thumb2.jpg", alt: "Editorial Frame 02", aspect: "aspect-[4/5]" },
  ],
  [
    { src: "/thumbnails/thumb3.jpg", alt: "Editorial Frame 03", aspect: "aspect-[3/4]" },
    { src: "/thumbnails/thumb4.jpg", alt: "Editorial Frame 04", aspect: "aspect-[3/4]" },
  ],
  [
    { src: "/thumbnails/thumb5.webp", alt: "Editorial Frame 05", aspect: "aspect-[4/5]" },
    { src: "/thumbnails/thumb6.jpg", alt: "Editorial Frame 06", aspect: "aspect-[3/4]" },
  ],
  [
    { src: "/portrait.png", alt: "RIEO Portrait", aspect: "aspect-[3/4]" },
    { src: "/hero-bg-2.mp4", alt: "Motion Loop", aspect: "aspect-[4/5]", isVideo: true },
  ],
];

const MENU_ITEMS = [
  { label: "HOME", href: "/" },
  { label: "SERVICES", href: "/#services" },
  { label: "STORE", href: "/store" },
  { label: "REEL", href: "/#typography" },
  { label: "ACCOUNT", href: "/admin" },
  { label: "LOGIN", href: "/login" },
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
  const innerScrollRef = useRef<HTMLDivElement>(null);

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
      const innerScroll = innerScrollRef.current;

      if (
        !container ||
        !stage ||
        !word ||
        !r ||
        !i ||
        !e ||
        !o ||
        !portal ||
        !content ||
        !innerScroll
      )
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

      const getMaxInnerScroll = () => {
        return Math.max(0, innerScroll.scrollHeight - stage.clientHeight);
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

      gsap.set(innerScroll, {
        y: 0,
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
         PHASE 3: SCROLL GALLERY -> GIANT STACKED MENU (1.95 -> 4.20)
         ============================================================ */
      tl.to(
        innerScroll,
        {
          y: () => -getMaxInnerScroll(),
          duration: 2.25,
          ease: "none",
        },
        1.95
      );

      /* ============================================================
         PHASE 4: REDUCE BACK INTO CENTERED "O" (4.20 -> 5.40)
         ============================================================ */
      tl.to(
        content,
        {
          scale: 0.96,
          opacity: 0,
          duration: 0.55,
          ease: "power2.in",
        },
        4.2
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
        4.3
      );

      /* ============================================================
         PHASE 5: RESTORE "O" & SLIDE "RIEO" BACK (5.40 -> 6.25)
         ============================================================ */
      tl.set(portal, { pointerEvents: "none" }, 5.45);

      tl.to(
        o,
        {
          opacity: 1,
          duration: 0.25,
          ease: "none",
        },
        5.4
      );

      tl.to(
        portal,
        {
          opacity: 0,
          duration: 0.25,
          ease: "none",
        },
        5.4
      );

      tl.to(
        word,
        {
          x: 0,
          duration: 0.75,
          ease: "power3.inOut",
        },
        5.5
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
        5.65
      );

      // Brief lock before unpinning
      tl.to({}, { duration: 0.3 });
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      className="relative w-full h-[520vh] bg-[#050505] text-white selection:bg-white selection:text-black"
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
            <div ref={innerScrollRef} className="w-full will-change-transform">
              {/* PART 1: 4-Column Staggered Masonry Media Gallery */}
              <div className="w-full px-3 sm:px-5 md:px-6 pt-3 pb-14 sm:pb-20">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
                  {GALLERY_COLUMNS.map((col, colIdx) => (
                    <div
                      key={colIdx}
                      className={`flex flex-col gap-3 sm:gap-4 ${
                        colIdx === 1
                          ? "pt-8 sm:pt-14"
                          : colIdx === 2
                          ? "-mt-4 sm:-mt-6"
                          : colIdx === 3
                          ? "pt-12 sm:pt-20"
                          : ""
                      }`}
                    >
                      {col.map((item, itemIdx) => (
                        <div
                          key={itemIdx}
                          className={`group relative w-full ${item.aspect} rounded-xl sm:rounded-2xl overflow-hidden bg-zinc-900 border border-white/5`}
                        >
                          {item.isVideo ? (
                            <video
                              autoPlay
                              loop
                              muted
                              playsInline
                              preload="auto"
                              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                            >
                              <source src={item.src} type="video/mp4" />
                            </video>
                          ) : (
                            <img
                              src={item.src}
                              alt={item.alt}
                              loading="eager"
                              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                          )}
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </div>

              {/* PART 2: Giant Bold Stacked Navigation Menu + Rotating Stamp */}
              <div className="relative w-full min-h-[85dvh] flex flex-col justify-end px-6 sm:px-10 md:px-14 pb-20 sm:pb-24 pt-8">
                <nav
                  aria-label="Portal Navigation"
                  className="flex flex-col items-start select-none"
                >
                  {MENU_ITEMS.map((item) => (
                    <a
                      key={item.label}
                      href={item.href}
                      className="font-sans font-black uppercase tracking-tight leading-[0.88] text-[clamp(2.8rem,8.8vw,7.4rem)] text-[#3F3F44] hover:text-white transition-colors duration-300"
                    >
                      {item.label}
                    </a>
                  ))}
                </nav>

                {/* Bottom-Right Rotating Circular Stamp */}
                <div className="absolute bottom-14 right-6 sm:bottom-20 sm:right-12 w-24 h-24 sm:w-28 sm:h-28 pointer-events-none select-none">
                  <svg
                    viewBox="0 0 120 120"
                    className="w-full h-full animate-[spin_14s_linear_infinite]"
                  >
                    <defs>
                      <path
                        id="rieo-circle-badge"
                        d="M 60, 60 m -42, 0 a 42,42 0 1,1 84,0 a 42,42 0 1,1 -84,0"
                      />
                    </defs>
                    <text
                      fill="#FFFFFF"
                      fontSize="10.5"
                      fontWeight="900"
                      letterSpacing="2.8"
                    >
                      <textPath href="#rieo-circle-badge" startOffset="0%">
                        PORTFOLIO • RIEO • STUDIO •
                      </textPath>
                    </text>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
