"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Image from "next/image";
import InfiniteMenu, { InfiniteMenuItem } from "@/components/ui/infinite-menu";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

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
    video: "/card-expanded-bg.mp4",
  }
];

const menuItems: InfiniteMenuItem[] = services.map((s) => ({
  image: s.image,
  title: s.title,
  description: s.desc,
  link: "#",
}));

export function HorizontalScrollServices() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const lastCardRef = useRef<HTMLDivElement>(null);

  // Expanding card elements
  const expandCardRef = useRef<HTMLDivElement>(null);
  const expandMediaRef = useRef<HTMLVideoElement>(null);
  const scrimRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const section = sectionRef.current;
      const stage = stageRef.current;
      const track = trackRef.current;
      const header = headerRef.current;
      const lastCard = lastCardRef.current;
      const expandCard = expandCardRef.current;
      const expandMedia = expandMediaRef.current;
      const scrim = scrimRef.current;
      const overlay = overlayRef.current;
      const menu = menuRef.current;

      if (!section || !stage || !track || !lastCard || !expandCard) return;

      // Calculate scroll distance so Card 06 lands in horizontal center
      const getScrollAmount = () => {
        const stageW = stage.clientWidth || window.innerWidth;
        const cardW = lastCard.offsetWidth;
        const targetX = lastCard.offsetLeft - (stageW - cardW) / 2;
        return Math.max(0, targetX);
      };

      // Exact coordinates of Card 06 when centered
      const getCardDimensions = () => {
        const stageRect = stage.getBoundingClientRect();
        const cardRect = lastCard.getBoundingClientRect();
        const stageW = stage.clientWidth || window.innerWidth;
        const cardW = lastCard.offsetWidth;
        const cardH = lastCard.offsetHeight;

        return {
          top: cardRect.top - stageRect.top,
          left: (stageW - cardW) / 2,
          width: cardW,
          height: cardH,
        };
      };

      // Timeline linked to ScrollTrigger with scrub
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "bottom bottom",
          scrub: 1,
          invalidateOnRefresh: true,
          onToggle: (self) => {
            if (expandMedia) {
              if (self.isActive) {
                expandMedia.play().catch(() => { });
              } else {
                expandMedia.pause();
              }
            }
          },
        },
      });

      // Ensure expanding clone is completely hidden during horizontal scroll
      gsap.set(expandCard, { autoAlpha: 0 });

      // 1. Horizontal Scroll Phase: cards slide until Card 06 is centered
      tl.to(track, {
        x: () => -getScrollAmount(),
        ease: "none",
        duration: 3.5,
        force3D: true,
      });

      // Brief lock when Card 06 is centered
      tl.to({}, { duration: 0.2 });

      // 2. Seamless Swap: Activate expanding card at Card 06's exact dimensions/position
      tl.set(
        expandCard,
        {
          autoAlpha: 1,
          top: () => getCardDimensions().top,
          left: () => getCardDimensions().left,
          width: () => getCardDimensions().width,
          height: () => getCardDimensions().height,
          borderRadius: "24px",
        },
        "expandStart"
      );

      tl.set(lastCard, { autoAlpha: 0 }, "expandStart");

      // Fade out header and track background
      tl.to(
        [header, track],
        {
          opacity: 0,
          ease: "power2.inOut",
          duration: 0.35,
        },
        "expandStart"
      );

      // 3. Geometric Expansion: Card 06 expands to 100vw and 100vh!
      tl.to(
        expandCard,
        {
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          borderRadius: "0px",
          ease: "power2.inOut",
          duration: 2.0,
        },
        "expandStart"
      );

      // Unzoom media gently from 1.15 to 1.0
      tl.fromTo(
        expandMedia,
        { scale: 1.15 },
        { scale: 1.0, ease: "power2.inOut", duration: 2.0 },
        "expandStart"
      );

      // Dark scrim fades in
      tl.to(scrim, { opacity: 0.65, ease: "power2.inOut", duration: 2.0 }, "expandStart");

      // Full-bleed overlay details reveal smoothly (RIEO glitch text)
      tl.fromTo(
        overlay,
        { opacity: 0, y: 35, scale: 0.96 },
        { opacity: 1, y: 0, scale: 1.0, ease: "power2.out", duration: 1.0 },
        "expandStart+=1.0"
      );
      tl.set(expandCard, { pointerEvents: "auto" }, "expandStart+=1.0");

      if (menu) {
        tl.set(menu, { pointerEvents: "none" }, 0);

        // When scrolling further in this expanded section, completely hide RIEO text and reveal InfiniteMenu
        tl.to(
          overlay,
          {
            opacity: 0,
            autoAlpha: 0,
            scale: 0.88,
            ease: "power2.inOut",
            duration: 0.8,
          },
          "menuStart"
        );

        tl.to(
          scrim,
          { opacity: 0.78, ease: "power2.inOut", duration: 1.2 },
          "menuStart"
        );

        tl.fromTo(
          menu,
          { opacity: 0, scale: 0.85 },
          { opacity: 1, scale: 1.0, ease: "power2.out", duration: 1.2 },
          "menuStart"
        );
        tl.add(() => {
          window.dispatchEvent(new Event("resize"));
        }, "menuStart");
        tl.set(menu, { pointerEvents: "auto" }, "menuStart+=0.6");
      }

      // Hold at full bleed to allow exploring InfiniteMenu before releasing to next section
      tl.to({}, { duration: 1.5 });

      return () => {
        tl.kill();
      };
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-[500vh] bg-[#050505] text-white border-t border-white/5"
    >
      <div
        ref={stageRef}
        className="sticky top-0 h-[100dvh] w-full flex flex-col justify-between pt-4 md:pt-6 pb-28 md:pb-32 overflow-hidden bg-[#050505]"
      >
        {/* Header Section */}
        <div
          ref={headerRef}
          className="w-full px-6 md:px-12 xl:px-20 flex flex-col md:flex-row justify-between items-start md:items-end gap-6 shrink-0 z-10 transition-opacity"
        >
          <div className="flex-1">
            <h2 className="relative inline-block text-6xl md:text-7xl lg:text-8xl font-sans font-bold tracking-tight leading-tight mb-2 ml-4 md:ml-8 mt-6 md:mt-10">
              <div className="absolute -top-10 -left-4 md:-top-16 md:-left-8 lg:-top-16 lg:-left-12 -rotate-12 z-10 pointer-events-none">
                <span className="inline-block text-[#00FF41] text-2xl md:text-4xl lg:text-5xl px-2 py-0.5 tracking-widest font-algeon">
                  Featured
                </span>
              </div>
              Work
            </h2>
          </div>
          <p className="text-gray-400 text-sm md:text-base max-w-[320px] leading-relaxed pb-2">
            The process behind the pixels. Turning concepts into highly polished, cinematic experiences.
          </p>
        </div>

        {/* Horizontal Scrolling Track - All 6 Cards */}
        <div
          ref={trackRef}
          className="relative flex w-max gap-6 md:gap-8 pl-6 md:pl-[40vw] lg:pl-[50vw] pr-6 md:pr-12 xl:pr-20 shrink-0 mt-auto will-change-transform z-10"
        >
          {services.map((service, index) => {
            const isLast = index === services.length - 1;
            return (
              <div
                key={service.id}
                ref={isLast ? lastCardRef : null}
                onClick={(e) => {
                  const isPlaying = e.currentTarget.getAttribute('data-playing') === 'true';
                  const vid = e.currentTarget.querySelector('video');
                  if (isPlaying) {
                    e.currentTarget.setAttribute('data-playing', 'false');
                    if (vid) vid.pause();
                  } else {
                    // Pause all other videos first
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    document.querySelectorAll('.service-card-video').forEach((v: any) => {
                      v.pause();
                      v.closest('.group')?.setAttribute('data-playing', 'false');
                    });
                    e.currentTarget.setAttribute('data-playing', 'true');
                    if (vid) vid.play()?.catch(() => { });
                  }
                }}
                onMouseEnter={(e) => {
                  const vid = e.currentTarget.querySelector('video');
                  if (vid) vid.play()?.catch(() => { });
                }}
                onMouseLeave={(e) => {
                  const isPlaying = e.currentTarget.getAttribute('data-playing') === 'true';
                  if (!isPlaying) {
                    const vid = e.currentTarget.querySelector('video');
                    if (vid) vid.pause();
                  }
                }}
                className="group relative w-[clamp(280px,24vw,380px)] h-[clamp(320px,56vh,520px)] shrink-0 bg-[#050505] border border-white/10 rounded-3xl overflow-hidden hover:border-white/30 transition-colors cursor-pointer"
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
                    className="object-cover opacity-90 group-hover:opacity-40 group-data-[playing=true]:opacity-0 transition-all duration-700 scale-100 group-hover:scale-105 group-data-[playing=true]:scale-105"
                  />
                  {/* Hover Video */}
                  <video
                    src={(service as any).video || "/card-bg.mp4"}
                    loop
                    muted
                    playsInline
                    preload="none"
                    className="service-card-video absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 group-data-[playing=true]:opacity-100 transition-opacity duration-500 scale-100"
                  />
                  {/* Overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
                </div>

                {/* Hover Interaction Arrow */}
                <div className="absolute bottom-6 right-6 w-12 h-12 bg-[#E2F163] rounded-full flex items-center justify-center opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 group-data-[playing=true]:opacity-100 group-data-[playing=true]:translate-y-0 transition-all duration-300 z-20 shadow-[0_0_20px_rgba(226,241,99,0.3)]">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            );
          })}
          {/* Spacing element at end of track */}
          <div className="w-[10vw] sm:w-[20vw] shrink-0" />
        </div>

        {/* 
          Full-Screen Expanding Card:
          Hidden during horizontal scroll (autoAlpha: 0).
          Activates at Card 06's exact coordinates when horizontal scroll completes,
          then smoothly expands outward to 100vw and 100vh with cinematic video background.
        */}
        <div
          ref={expandCardRef}
          className="absolute z-30 pointer-events-none select-none overflow-hidden border border-white/10 [will-change:top,left,width,height,border-radius]"
          style={{ visibility: "hidden", opacity: 0 }}
        >
          {/* Background Video (optimized lazy decode) */}
          <video
            ref={expandMediaRef}
            src="/card-expanded-bg.mp4"
            loop
            muted
            playsInline
            preload="metadata"
            className="absolute inset-0 w-full h-full object-cover origin-center [will-change:transform]"
          />

          {/* Scrim */}
          <div
            ref={scrimRef}
            className="absolute inset-0 opacity-0 pointer-events-none bg-[linear-gradient(to_top,rgba(0,0,0,0.85),rgba(0,0,0,0.3)_45%,rgba(0,0,0,0.5))]"
          />

          {/* Full-Bleed Overlay Content (Reveals after card expands) */}
          <div
            ref={overlayRef}
            className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 md:px-8 opacity-0 select-none [will-change:opacity,transform] z-20 pointer-events-none w-full h-full"
          >
            {/* Title: ONLY RIEO - Massive Scale with Signature Glitch Effect */}
            <div className="select-none">
              <h2
                data-text="RIEO"
                className="glitch-text font-custom text-white tracking-tighter leading-none select-none text-center drop-shadow-[0_14px_50px_rgba(0,0,0,0.95)] uppercase m-0 p-0 whitespace-nowrap"
                style={{
                  fontFamily: "'YFFRarePowerBlack', var(--font-yff-rare), sans-serif",
                  fontSize: "clamp(5rem, min(25vw, 42vh), 22rem)",
                }}
              >
                RIEO
              </h2>
            </div>
          </div>

          {/* InfiniteMenu 3D Interactive Sphere Layer */}
          <div
            ref={menuRef}
            className="absolute inset-0 w-full h-full z-30 pointer-events-none opacity-0 [will-change:opacity,transform]"
          >
            <InfiniteMenu
              items={menuItems}
              count={72}
              tileSize={0.52}
              roundness={0.2}
              zoom={0.92}
              pullBack={0.8}
              stretch={0.4}
              inertia={0.65}
              autoplay={3}
              grayscale={true}
              dim={0.45}
              intro={true}
              showInfo={true}
              theme="dark"
              accentColor="#00FF41"
            />
          </div>
        </div>

      </div>
    </section>
  );
}
