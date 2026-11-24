import { JourneyTimeline } from "@/components/ui/journey-timeline";
import { HeroAnimatedSection } from "@/components/ui/hero-animated-section";
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

      {/* Interactive Typography Section */}
      <section id="typography" className="w-full">
        <TextHoverSection />
      </section>
    </div>
  );
}
