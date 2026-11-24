'use client';

import { useEffect } from "react";
import Dock from "@/components/ui/dock";
import { Home, Briefcase, Video, ShoppingBag } from "lucide-react";
import { useRouter, usePathname } from "next/navigation";
import { motion } from "framer-motion";

export function DockNavigation() {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // Pre-render and prefetch routes for instant loading speed
    router.prefetch('/store');
    router.prefetch('/');
  }, [router]);

  if (pathname.startsWith("/admin")) return null;

  const navigateWithTransition = (href: string) => {
    if (typeof document !== 'undefined' && 'startViewTransition' in document) {
      (document as any).startViewTransition(() => {
        router.push(href);
      });
    } else {
      router.push(href);
    }
  };

  const dockItems = [
    { icon: <Home size={18} />, label: 'Home', onClick: () => navigateWithTransition('/#home') },
    { icon: <Briefcase size={18} />, label: 'Services', onClick: () => navigateWithTransition('/#services') },
    { icon: <ShoppingBag size={18} />, label: 'Store', onClick: () => navigateWithTransition('/store') },
  ];

  return (
    <motion.div 
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 200, damping: 20, delay: 0.8 }}
      className="dock-navigation-container fixed bottom-0 left-0 w-full z-50 flex justify-center pointer-events-none [&_>_*]:pointer-events-auto text-neutral-300 pb-[max(1rem,env(safe-area-inset-bottom,16px))] px-[max(1rem,env(safe-area-inset-left,16px))]"
    >
      <Dock 
        items={dockItems}
        panelHeight={68}
        baseItemSize={50}
        magnification={70}
      />
    </motion.div>
  );
}
