import { JourneyTimeline } from "@/components/ui/journey-timeline";
import { HeroAnimatedSection } from "@/components/ui/hero-animated-section";
import { RieoScrollPortal } from "@/components/ui/rieo-scroll-portal";
import { TextHoverSection } from "@/components/ui/text-hover-section";
import ColorBends from "@/components/ui/color-bends";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section id="home">
        <HeroAnimatedSection />
      </section>

      {/* Journey Timeline Section / Services */}
      <section id="services">
        <JourneyTimeline />
      </section>

      {/* Shared Shader Stage: RIEO Portal -> RIEO exits up -> Platforms Card rises over same ColorBends */}
      <div className="relative w-full bg-[#050505]">
        <div className="sticky top-0 h-[100dvh] w-full -mb-[100dvh] z-0 overflow-hidden pointer-events-none">
          <ColorBends
            colors={["#ff5c7a", "#8a5cff", "#00ffd1"]}
            rotation={90}
            speed={0.2}
            scale={1}
            frequency={1}
            warpStrength={1}
            mouseInfluence={1}
            noise={0.08}
            parallax={0.5}
            iterations={1}
            intensity={1.05}
            bandWidth={6}
            transparent
          />
          <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-[#050505] to-transparent pointer-events-none" />
          <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#050505] to-transparent pointer-events-none" />
        </div>

        {/* RIEO Expanding & Reducing Portal Section */}
        <section id="works" className="relative z-10 w-full">
          <RieoScrollPortal />
        </section>

        {/* Interactive Platforms Card rising over the same ColorBends background */}
        <section id="typography" className="relative z-20 w-full -mt-[75dvh] sm:-mt-[80dvh]">
          <TextHoverSection />
        </section>
      </div>
    </div>
  );
}
