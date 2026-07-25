"use client";

import React, { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform, HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

interface GlassCardProps extends HTMLMotionProps<"div"> {
  children: React.ReactNode;
  tilt?: boolean;
  glow?: boolean;
}

export function GlassCard({ children, className, tilt = true, glow = true, ...props }: GlassCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });
  
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["7.5deg", "-7.5deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-7.5deg", "7.5deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!tilt || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    if (!tilt) return;
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateY: tilt ? rotateY : 0,
        rotateX: tilt ? rotateX : 0,
        transformStyle: "preserve-3d",
      }}
      className={cn(
        "relative group bg-[var(--color-bg-card)]/60 backdrop-blur-xl border border-[var(--color-border-subtle)] rounded-2xl overflow-hidden transition-colors hover:border-white/20",
        className
      )}
      {...props}
    >
      <div className="relative z-10 w-full h-full" style={{ transform: tilt ? "translateZ(20px)" : "none" }}>
        {children}
      </div>

      {glow && (
        <div className="absolute inset-0 z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none mix-blend-screen overflow-hidden">
          <div className="absolute inset-[-50%] bg-gradient-to-r from-[var(--color-accent-primary)]/10 via-[var(--color-accent-secondary)]/10 to-[var(--color-accent-primary)]/10 blur-3xl animate-shimmer" />
        </div>
      )}
    </motion.div>
  );
}
