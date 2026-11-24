"use client";

import { ReactLenis, useLenis } from "lenis/react";
import type { LenisRef } from "lenis/react";
import { ReactNode, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

function ScrollTriggerSync({ lenisRef }: { lenisRef: React.RefObject<LenisRef | null> }) {
  useLenis(() => {
    ScrollTrigger.update();
  });

  useEffect(() => {
    function update(time: number) {
      lenisRef.current?.lenis?.raf(time * 1000);
    }

    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(update);
    };
  }, [lenisRef]);

  return null;
}

export function LenisProvider({ children }: { children: ReactNode }) {
  const lenisRef = useRef<LenisRef>(null);

  return (
    <ReactLenis
      ref={lenisRef}
      root
      options={{
        autoRaf: false,
        lerp: 0.085,
        smoothWheel: true,
        wheelMultiplier: 1.0,
        touchMultiplier: 1.15,
      }}
    >
      <ScrollTriggerSync lenisRef={lenisRef} />
      {children}
    </ReactLenis>
  );
}
