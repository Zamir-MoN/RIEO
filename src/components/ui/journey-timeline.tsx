"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { PlaySquare, Type, Video, Megaphone, Scissors, Sparkles, Copy, Check } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const timelineData = [
  {
    year: "01",
    title: "Motion Graphics",
    desc: "Bespoke 2D/3D animations that elevate brand identity. We turn complex ideas into engaging visual stories.",
    icon: <PlaySquare size={16} />,
    top: 350,
    side: "left",
  },
  {
    year: "02",
    title: "Typography",
    desc: "Kinetic, bold, and unapologetic text design. We animate words to match the rhythm and emotion of your narrative.",
    icon: <Type size={16} />,
    top: 800,
    side: "right",
  },
  {
    year: "03",
    title: "Documentary Editing",
    desc: "Weaving hours of raw footage into authentic narratives. Pacing and structure that honor the story and captivate audiences.",
    icon: <Video size={16} />,
    top: 1250,
    side: "left",
  },
  {
    year: "04",
    title: "Social Media Ads",
    desc: "High-impact, fast-paced content designed to convert. Thumb-stopping visuals optimized for maximum ROI.",
    icon: <Megaphone size={16} />,
    top: 1700,
    side: "right",
  },
  {
    year: "05",
    title: "Cinematic Editing",
    desc: "Feature-level pacing and emotional resonance. We transform standard footage into an immersive cinematic experience.",
    icon: <Scissors size={16} />,
    top: 2150,
    side: "left",
  },
  {
    year: "06",
    title: "Animated Titles",
    desc: "Custom title sequences that set the perfect tone. We build the aesthetic world of your film before the first scene begins.",
    icon: <Sparkles size={16} />,
    top: 2600,
    side: "right",
  }
];

const NavItem = ({ 
  icon, 
  text, 
  active, 
  onClick 
}: { 
  icon: React.ReactNode; 
  text: string; 
  active?: boolean;
  onClick?: () => void;
}) => (
  <button 
    onClick={onClick}
    className={`relative flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-xs font-black tracking-wider uppercase transition-all duration-300 text-left w-full cursor-pointer select-none ${
      active 
        ? "bg-[#E2F163] text-black shadow-md scale-[1.02]" 
        : "bg-black/5 text-gray-600 hover:bg-black/10 hover:text-black"
    }`}
  >
    <span className="shrink-0">{icon}</span>
    <span className="truncate">{text}</span>
  </button>
);

export function JourneyTimeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const sidebarRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const svgContainerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [copied, setCopied] = useState(false);

  const scrollToCard = (index: number) => {
    const cards = document.querySelectorAll<HTMLElement>(".journey-card");
    if (cards[index]) {
      cards[index].scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  useGSAP(() => {
    if (!pathRef.current) return;
    
    const length = pathRef.current.getTotalLength();
    
    gsap.set(pathRef.current, {
      strokeDasharray: length,
      strokeDashoffset: length,
    });

    // Animate the line drawing
    gsap.to(pathRef.current, {
      strokeDashoffset: 0,
      ease: "none",
      scrollTrigger: {
        trigger: svgContainerRef.current,
        start: "top 80%", 
        end: "bottom 80%", 
        scrub: 1, 
      }
    });

    // Track active state with smooth thresholds
    gsap.utils.toArray<HTMLElement>(".journey-card").forEach((card, index) => {
      // Pop in with hardware accelerated GPU transform
      gsap.from(card, {
        opacity: 0,
        y: 40,
        scale: 0.95,
        force3D: true,
        scrollTrigger: {
          trigger: card,
          start: "top 85%",
          end: "top 65%",
          scrub: true,
        }
      });

      // Active state tracking
      ScrollTrigger.create({
        trigger: card,
        start: "top 65%",
        end: "bottom 35%",
        onEnter: () => setActiveIndex(index),
        onEnterBack: () => setActiveIndex(index),
      });
    });

    // Premium Reveal Animations for Header and Sidebar
    gsap.from(".timeline-header-text", {
      y: 150,
      opacity: 0,
      duration: 1.2,
      ease: "power4.out",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 75%",
      }
    });

    gsap.from(".timeline-header-sub", {
      y: 50,
      opacity: 0,
      duration: 1,
      delay: 0.2,
      ease: "power3.out",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 75%",
      }
    });

    gsap.from(".sidebar-anim", {
      x: -50,
      opacity: 0,
      duration: 0.8,
      stagger: 0.1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 75%",
      }
    });

  }, { scope: containerRef });

  const svgPath = "M 500 0 C 80 0, 80 175, 80 350 C 80 575, 920 575, 920 800 C 920 1025, 80 1025, 80 1250 C 80 1475, 920 1475, 920 1700 C 920 1925, 80 1925, 80 2150 C 80 2375, 920 2375, 920 2600 C 920 2800, 500 2950, 500 2950";

  return (
    <section ref={containerRef} className="relative w-full bg-[#050505] py-6 sm:py-10 md:py-16">
      <div ref={innerRef} className="relative w-full bg-[#D5D1C3] text-[#1A1A1A] flex flex-col lg:flex-row rounded-t-[2.5rem] md:rounded-t-[4rem] rounded-b-[2.5rem] md:rounded-b-[4rem] shadow-2xl">
      
      {/* Left Sidebar Column - Sticky in the vertical middle of the screen */}
      <div className="hidden lg:block w-[280px] xl:w-[310px] 2xl:w-[340px] shrink-0 self-stretch relative pl-4 lg:pl-6 pb-20 pointer-events-none">
        <div className="sticky top-0 h-[100dvh] flex flex-col justify-center py-6 pointer-events-none">
          <div 
            ref={sidebarRef}
            className="flex flex-col w-full h-fit p-4 xl:p-5 justify-between z-40 border border-black/5 bg-[#D5D1C3]/95 backdrop-blur-md rounded-2xl shadow-xl pointer-events-auto"
          >
            <div>
              {/* Card 1 */}
              <div className="sidebar-anim bg-black/[0.03] border border-black/5 rounded-xl p-3 mb-2">
                <div className="bg-[#E2F163] inline-block px-2 py-0.5 rounded-md font-black text-[11px] mb-1.5 text-black">
                  RIEO
                </div>
                <p className="text-[11px] font-medium leading-relaxed text-gray-700">
                  Crafting high-end video editing and motion graphics that merge creativity, technical excellence, and long-term value.
                </p>
              </div>

              {/* Card 2 */}
              <div className="sidebar-anim bg-black/[0.03] border border-black/5 rounded-xl p-2.5 mb-2.5 flex items-center justify-between">
                <div className="text-center flex flex-col items-center justify-center">
                  <div className="font-black text-xl text-black leading-none tabular-nums">80+</div>
                  <div className="text-[9px] font-bold uppercase mt-1 text-gray-600 tracking-wider">Projects</div>
                </div>
                <div className="w-px h-7 bg-black/10"></div>
                <div className="text-center flex flex-col items-center justify-center">
                  <div className="font-black text-xl text-[#B5C237] leading-none tabular-nums">3+</div>
                  <div className="text-[9px] font-bold uppercase mt-1 text-gray-600 tracking-wider">Years of<br/>exp</div>
                </div>
              </div>

              {/* Nav */}
              <nav className="sidebar-anim flex flex-col gap-1 mb-2.5">
                {timelineData.map((item, i) => (
                  <NavItem 
                    key={i} 
                    icon={item.icon} 
                    text={item.title} 
                    active={activeIndex === i} 
                    onClick={() => scrollToCard(i)}
                  />
                ))}
              </nav>
            </div>

            {/* Footer */}
            <div className="sidebar-anim mt-auto flex flex-col gap-1.5 pt-2 border-t border-black/5">
              <button 
                onClick={() => {
                  navigator.clipboard?.writeText("contact@rieo.co");
                  setCopied(true);
                  setTimeout(() => setCopied(false), 2000);
                }}
                className="flex items-center justify-between w-full bg-black/[0.03] border border-black/5 px-3.5 py-2 rounded-lg text-[11px] font-bold text-gray-700 hover:bg-black/10 hover:text-black transition-colors cursor-pointer select-none"
                title="Click to copy email"
              >
                <span>{copied ? "Copied to clipboard!" : "contact@rieo.co"}</span>
                {copied ? <Check size={13} className="text-emerald-600" /> : <Copy size={13} />}
              </button>
              
              <a 
                href="mailto:contact@rieo.co"
                className="w-full bg-[#E2F163] text-black font-black uppercase tracking-widest text-[11px] py-2.5 rounded-lg hover:bg-[#d4e25a] transition-colors shadow-sm text-center block"
              >
                Book a Call
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Right Content */}
      <div className="flex-1 relative overflow-hidden pb-32 md:pb-40">
        
        {/* Blurry Gradient Blob */}
        <div className="absolute top-[10%] left-[20%] w-[600px] h-[600px] bg-black/5 blur-[120px] rounded-full pointer-events-none" />

        {/* Header */}
        <div className="pt-12 md:pt-16 lg:pt-20 px-6 md:px-12 lg:px-16 mb-12 md:mb-16 relative z-10">
          <div className="overflow-hidden pb-3">
            <h2 className="timeline-header-text text-[clamp(2.5rem,5vw,5.5rem)] font-black tracking-tighter leading-[0.95] text-black">
              Services (&) <br /> Expertise
            </h2>
          </div>
          <div className="overflow-hidden">
            <p className="timeline-header-sub mt-3 text-sm md:text-base text-gray-600 max-w-sm font-medium leading-relaxed">
              From raw footage to cinematic experiences. The process of bringing your vision to life.
            </p>
          </div>
        </div>

        {/* Timeline Area */}
        <div ref={svgContainerRef} className="relative w-full h-[3000px]">
          
          {/* SVG Animated Line (Desktop) */}
          <svg 
            className="hidden lg:block absolute top-0 left-0 w-full h-full pointer-events-none z-0"
            viewBox="0 0 1000 3000"
            preserveAspectRatio="none"
          >
            <path 
              d={svgPath}
              fill="none" 
              stroke="rgba(0,0,0,0.06)" 
              strokeWidth="4" 
            />
            <path 
              ref={pathRef}
              d={svgPath}
              fill="none" 
              stroke="black" 
              strokeWidth="4" 
            />
          </svg>

          {/* Cards */}
          {timelineData.map((item, i) => {
            const isLeft = item.side === "left";
            return (
              <div 
                key={i} 
                className={`journey-card absolute bg-[#E3E1D9] p-[clamp(1.25rem,2vw,2rem)] rounded-[1.5rem] md:rounded-[2rem] shadow-xl border border-white/30 z-10 flex flex-col -translate-y-1/2 w-[clamp(280px,32vw,440px)] ${
                  isLeft 
                    ? 'left-1/2 -translate-x-1/2 lg:left-[clamp(1.5rem,5vw,5rem)] lg:translate-x-0' 
                    : 'left-1/2 -translate-x-1/2 lg:left-auto lg:right-[clamp(1.5rem,5vw,5rem)] lg:translate-x-0'
                }`}
                style={{
                  top: item.top,
                }}
              >
                {/* Yellow Dot (Desktop) */}
                <div className={`hidden lg:block absolute top-1/2 -translate-y-1/2 ${isLeft ? 'left-0 -translate-x-1/2' : 'right-0 translate-x-1/2'} w-4 h-4 rounded-full bg-[#E2F163] border-[3px] border-black z-20`} />

                <h3 className="text-5xl sm:text-6xl font-black text-[#E2F163] tracking-tighter leading-none mb-1.5 tabular-nums">
                  {item.year}
                </h3>
              <div className="relative z-10 mt-2.5">
                <h4 className="text-xl sm:text-2xl font-black text-black mb-2 tracking-tight">
                  {item.title}
                </h4>
                <p className="text-gray-700 text-xs sm:text-sm leading-relaxed font-medium mb-5">
                  {item.desc}
                </p>
                
                {/* Card Footer */}
                <div className="flex items-center justify-between pt-3.5 mt-auto border-t border-black/5">
                  <div className="flex items-center gap-2">
                    <div className="flex -space-x-2">
                      <div className="w-7 h-7 rounded-full bg-[#D1CFC7] flex items-center justify-center border-2 border-[#E3E1D9] relative z-10">
                        <svg className="w-3 h-3 text-[#E2F163]" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12 3l8 7h-2v9h-4v-5H10v5H6v-9H4l8-7z" />
                        </svg>
                      </div>
                      <div className="w-7 h-7 rounded-full bg-gray-300 border-2 border-[#E3E1D9] relative z-0 overflow-hidden shrink-0">
                        <Image src={`https://i.pravatar.cc/100?img=${i + 10}`} width={28} height={28} alt="avatar" loading="lazy" className="w-full h-full object-cover" />
                      </div>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[11px] font-bold text-gray-800">@creative</span>
                      <span className="text-[9px] font-medium text-gray-500">2 years ago</span>
                    </div>
                  </div>
                  
                  <button className="px-3.5 py-1.5 bg-[#F0EEE6] hover:bg-white text-black text-[11px] font-bold rounded-lg transition-colors shadow-sm">
                    Read more
                  </button>
                </div>
              </div>
            </div>
            );
          })}

        </div>
      </div>
      </div>
    </section>
  );
}
