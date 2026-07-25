"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { Menu, X } from "lucide-react";
import { MagneticButton } from "@/components/ui/magnetic-button";

export function Navbar() {
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 50);
  });

  const navLinks = [
    { name: "Services", href: "/#services" },
    { name: "Portfolio", href: "/#portfolio" },
    { name: "Store", href: "/store" },
  ];

  const pathname = usePathname();
  const isDarkPage = pathname === "/store";
  const useLightText = isDarkPage && !isScrolled;

  const textColor = useLightText ? "text-white" : "text-[var(--color-text-primary)]";
  const hoverTextColor = useLightText ? "hover:text-gray-300" : "hover:text-[var(--color-text-secondary)]";
  const logoAccentColor = useLightText ? "text-white" : "text-[var(--color-accent-primary)]";
  const buttonClasses = useLightText ? "bg-white text-black hover:bg-gray-200" : "bg-[#0A0A0A] text-white hover:bg-black/80";

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        isScrolled ? "py-4" : "py-6"
      }`}
    >
      <div className="container mx-auto px-4 md:px-8">
        <div className={`flex items-center justify-between rounded-full px-6 py-3 transition-all duration-500 ${
          isScrolled 
            ? "bg-white/30 backdrop-blur-xl border border-white/40 shadow-[0_8px_32px_rgba(0,0,0,0.1)]" 
            : "bg-transparent border-transparent"
        }`}>
          
          {/* Logo */}
          <Link href="/" className={`relative z-10 group flex items-center gap-2 ${textColor}`}>
            <span className="text-xl font-heading font-bold tracking-wider uppercase">
              RI<span className={logoAccentColor}>EO</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`text-sm font-bold ${textColor} ${hoverTextColor} transition-colors uppercase tracking-widest relative group`}
              >
                {link.name}
                <span className={`absolute -bottom-1 left-0 w-0 h-0.5 ${useLightText ? "bg-white" : "bg-[var(--color-accent-primary)]"} transition-all duration-300 group-hover:w-full`} />
              </Link>
            ))}
          </nav>


          {/* Hire Me & Mobile Toggle */}
          <div className="flex items-center gap-4">
            <Link href="/contact" className={`${buttonClasses} text-[10px] sm:text-xs font-bold px-4 py-2 rounded-full uppercase tracking-widest transition-colors shadow-lg`}>
              Hire Me
            </Link>
            <button
              className={`md:hidden relative z-50 p-2 ${textColor}`}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <motion.div
        initial={false}
        animate={mobileMenuOpen ? { opacity: 1, y: 0, display: "block" } : { opacity: 0, y: "-100%", transitionEnd: { display: "none" } }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="fixed inset-0 z-40 bg-[var(--color-bg-primary)]/95 backdrop-blur-xl flex flex-col items-center justify-center pt-20 pb-8"
      >
        <nav className="flex flex-col items-center gap-8">
          {navLinks.map((link, i) => (
            <motion.div
              key={link.name}
              initial={{ opacity: 0, y: 20 }}
              animate={mobileMenuOpen ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: i * 0.1, duration: 0.4 }}
            >
              <Link
                href={link.href}
                className="text-3xl font-heading font-bold uppercase tracking-widest text-[var(--color-text-primary)] hover:text-[var(--color-accent-primary)] transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.name}
              </Link>
            </motion.div>
          ))}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={mobileMenuOpen ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ delay: navLinks.length * 0.1, duration: 0.4 }}
            className="mt-8"
          >
            <MagneticButton size="lg" variant="primary" onClick={() => setMobileMenuOpen(false)}>
              Hire Me
            </MagneticButton>
          </motion.div>
        </nav>
      </motion.div>
    </header>
  );
}
