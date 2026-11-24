import { JourneyTimeline } from "@/components/ui/journey-timeline";
import { HeroAnimatedSection } from "@/components/ui/hero-animated-section";
import { RieoScrollPortal } from "@/components/ui/rieo-scroll-portal";
import { TextHoverSection } from "@/components/ui/text-hover-section";

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

      {/* RIEO Expanding & Reducing Portal Section */}
      <section id="works" className="w-full bg-[#050505]">
        <RieoScrollPortal />
      </section>

      {/* Interactive Typography Section */}
      <section id="typography" className="w-full">
        <TextHoverSection />
      </section>
    </div>
  );
}
