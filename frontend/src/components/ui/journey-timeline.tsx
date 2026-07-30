"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { PlaySquare, Type, Video, Megaphone, Scissors, Sparkles, Copy } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const timelineData = [
  {
    year: "01",
    title: "Motion Graphics",
    desc: "Bespoke 2D/3D animations that elevate brand identity. We turn complex ideas into engaging visual stories.",
    icon: <PlaySquare size={16} />,
    top: 400,
    side: "left",
  },
  {
    year: "02",
    title: "Typography",
    desc: "Kinetic, bold, and unapologetic text design. We animate words to match the rhythm and emotion of your narrative.",
    icon: <Type size={16} />,
    top: 900,
    side: "right",
  },
  {
    year: "03",
    title: "Documentary Editing",
    desc: "Weaving hours of raw footage into authentic narratives. Pacing and structure that honor the story and captivate audiences.",
    icon: <Video size={16} />,
    top: 1400,
    side: "left",
  },
  {
    year: "04",
    title: "Social Media Ads",
    desc: "High-impact, fast-paced content designed to convert. Thumb-stopping visuals optimized for maximum ROI.",
    icon: <Megaphone size={16} />,
    top: 1900,
    side: "right",
  },
  {
    year: "05",
    title: "Cinematic Editing",
    desc: "Feature-level pacing and emotional resonance. We transform standard footage into an immersive cinematic experience.",
    icon: <Scissors size={16} />,
    top: 2400,
    side: "left",
  },
  {
    year: "06",
    title: "Animated Titles",
    desc: "Custom title sequences that set the perfect tone. We build the aesthetic world of your film before the first scene begins.",
    icon: <Sparkles size={16} />,
    top: 2900,
    side: "right",
  }
];

const NavItem = ({ icon, text, active }: { icon: React.ReactNode, text: string, active?: boolean }) => (
  <button className={`flex items-center gap-3 px-5 py-3 rounded-xl text-sm font-black tracking-widest uppercase transition-colors ${
    active ? "bg-[#E2F163] text-black" : "bg-black/5 text-gray-600 hover:bg-black/10 hover:text-black"
  }`}>
    {icon}
    <span>{text}</span>
  </button>
);

export function JourneyTimeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const svgContainerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

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

    // Card pop-in and nav tracking
    gsap.utils.toArray<HTMLElement>(".journey-card").forEach((card, index) => {
      // Pop in
      gsap.from(card, {
        opacity: 0,
        y: 40,
        scale: 0.95,
        scrollTrigger: {
          trigger: card,
          start: "top 85%",
          end: "top 65%",
          scrub: true,
        }
      });

      // Track active state
      ScrollTrigger.create({
        trigger: card,
        start: "top 60%", // When card enters middle of screen
        end: "bottom 40%",
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

  const svgPath = "M 500 0 C 150 0, 150 200, 150 400 C 150 650, 850 650, 850 900 C 850 1150, 150 1150, 150 1400 C 150 1650, 850 1650, 850 1900 C 850 2150, 150 2150, 150 2400 C 150 2650, 850 2650, 850 2900 C 850 3100, 500 3200, 500 3200";

  return (
    <section ref={containerRef} className="relative w-full bg-[#050505] pt-16 md:pt-32 pb-16 md:pb-32">
      <div className="relative w-full bg-[#D5D1C3] text-[#1A1A1A] flex rounded-[2.5rem] md:rounded-[4rem]">
      
      {/* Left Sidebar (Sticky) */}
      <div className="hidden lg:flex flex-col w-[320px] shrink-0 sticky top-0 h-screen p-6 py-20 overflow-y-auto scrollbar-hide z-50">
        
        {/* Card 1 */}
        <div className="sidebar-anim bg-black/[0.03] border border-black/5 rounded-2xl p-5 mb-4">
          <div className="bg-[#E2F163] inline-block px-3 py-1 rounded-md font-black text-sm mb-4 text-black">
            RIEO
          </div>
          <p className="text-[13px] font-medium leading-relaxed text-gray-700">
            Crafting high-end video editing and motion graphics that merge creativity, technical excellence, and long-term value.
          </p>
        </div>

        {/* Card 2 */}
        <div className="sidebar-anim bg-black/[0.03] border border-black/5 rounded-2xl p-5 mb-6 flex items-center justify-between">
          <div className="text-center flex flex-col items-center">
            <div className="font-black text-3xl text-black">80+</div>
            <div className="text-[11px] font-bold uppercase mt-1.5 text-gray-600">Projects</div>
          </div>
          <div className="w-px h-10 bg-black/10"></div>
          <div className="text-center flex flex-col items-center">
            <div className="font-black text-3xl text-[#B5C237]">3+</div>
            <div className="text-[11px] font-bold uppercase mt-1.5 text-gray-600">Years of<br/>experience</div>
          </div>
        </div>

        {/* Nav */}
        <nav className="sidebar-anim flex flex-col gap-1.5 mb-8">
          {timelineData.map((item, i) => (
            <NavItem 
              key={i} 
              icon={item.icon} 
              text={item.title} 
              active={activeIndex === i} 
            />
          ))}
        </nav>

        {/* Footer */}
        <div className="sidebar-anim mt-auto flex flex-col gap-4">
          <button className="flex items-center justify-between w-full bg-black/[0.03] border border-black/5 px-5 py-4 rounded-xl text-[13px] font-bold text-gray-700 hover:bg-black/10 hover:text-black transition-colors">
            <span>contact@rieo.co</span>
            <Copy size={16} />
          </button>
          
          <button className="w-full bg-[#E2F163] text-black font-black uppercase tracking-widest text-[13px] py-4 rounded-xl hover:bg-[#d4e25a] transition-colors shadow-sm">
            Book a Call
          </button>
        </div>
      </div>

      {/* Right Content */}
      <div className="flex-1 relative overflow-hidden pb-40">
        
        {/* Blurry Gradient Blob */}
        <div className="absolute top-[10%] left-[20%] w-[600px] h-[600px] bg-black/5 blur-[120px] rounded-full pointer-events-none" />

        {/* Header */}
        <div className="pt-32 md:pt-48 px-8 md:px-16 lg:px-24 mb-32 relative z-10">
          <div className="overflow-hidden pb-4">
            <h2 className="timeline-header-text text-6xl md:text-[6rem] lg:text-[7rem] font-black tracking-tighter leading-[0.95] text-black">
              Services (&) <br /> Expertise
            </h2>
          </div>
          <div className="overflow-hidden">
            <p className="timeline-header-sub mt-4 text-sm md:text-base text-gray-600 max-w-sm font-medium leading-relaxed">
              From raw footage to cinematic experiences. The process of bringing your vision to life.
            </p>
          </div>
        </div>

        {/* Timeline Area */}
        <div ref={svgContainerRef} className="relative w-full h-[3200px]">
          
          {/* SVG Animated Line */}
          <svg 
            className="absolute top-0 left-0 w-full h-full pointer-events-none z-0"
            viewBox="0 0 1000 3200"
            preserveAspectRatio="none"
          >
            <path 
              d={svgPath}
              fill="none" 
              stroke="rgba(0,0,0,0.05)" 
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
                className="journey-card absolute bg-[#E3E1D9] p-8 rounded-[2rem] shadow-xl border border-white/20 z-10 flex flex-col -translate-y-1/2"
                style={{
                  top: item.top,
                  ...(isLeft 
                    ? { left: '15%', width: 'calc(85% - 20px)', maxWidth: '450px' } 
                    : { right: '15%', width: 'calc(85% - 20px)', maxWidth: '450px' }),
                }}
              >
                {/* Yellow Dot */}
                <div className={`absolute top-1/2 -translate-y-1/2 ${isLeft ? 'left-0 -translate-x-1/2' : 'right-0 translate-x-1/2'} w-4 h-4 rounded-full bg-[#E2F163] border-[3px] border-black z-20`} />

                <h3 className="text-7xl font-black text-[#E2F163] tracking-tighter leading-none mb-2">
                  {item.year}
                </h3>
              <div className="relative z-10 mt-4">
                <h4 className="text-3xl font-black text-black mb-3 tracking-tight">
                  {item.title}
                </h4>
                <p className="text-gray-700 text-sm md:text-base leading-relaxed font-medium mb-8">
                  {item.desc}
                </p>
                
                {/* Card Footer */}
                <div className="flex items-center justify-between pt-4 mt-auto">
                  <div className="flex items-center gap-3">
                    <div className="flex -space-x-3">
                      <div className="w-10 h-10 rounded-full bg-[#D1CFC7] flex items-center justify-center border-2 border-[#E3E1D9] relative z-10">
                        {/* House Icon */}
                        <svg className="w-4 h-4 text-[#E2F163]" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12 3l8 7h-2v9h-4v-5H10v5H6v-9H4l8-7z" />
                        </svg>
                      </div>
                      <div className="w-10 h-10 rounded-full bg-gray-300 border-2 border-[#E3E1D9] relative z-0 overflow-hidden">
                        <Image src={`https://i.pravatar.cc/100?img=${i + 10}`} width={40} height={40} alt="avatar" className="w-full h-full object-cover" />
                      </div>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-sm font-bold text-gray-800">@creative</span>
                      <span className="text-xs font-medium text-gray-500">2 years ago</span>
                    </div>
                  </div>
                  
                  <button className="px-5 py-2.5 bg-[#F0EEE6] hover:bg-white text-black text-xs font-bold rounded-xl transition-colors shadow-sm">
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
