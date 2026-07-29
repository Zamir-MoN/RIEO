'use client';

import Dock from "@/components/ui/dock";
import { Home, Briefcase, Video, ShoppingBag } from "lucide-react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export function DockNavigation() {
  const router = useRouter();

  const dockItems = [
    { icon: <Home size={18} />, label: 'Home', onClick: () => router.push('/#home') },
    { icon: <Briefcase size={18} />, label: 'Services', onClick: () => router.push('/#services') },
    { icon: <Video size={18} />, label: 'Works', onClick: () => router.push('/#works') },
    { icon: <ShoppingBag size={18} />, label: 'Store', onClick: () => router.push('/store') },
  ];

  return (
    <motion.div 
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 200, damping: 20, delay: 0.8 }}
      className="fixed bottom-0 left-0 w-full z-50 flex justify-center pointer-events-none [&_>_*]:pointer-events-auto text-neutral-300 pb-4"
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
