"use client";

import Link from "next/link";
import { Mail } from "lucide-react";
import { FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";

export function Footer() {
  return (
    <footer className="w-full py-12 px-4 md:px-8 border-t border-[var(--color-border-subtle)] bg-[var(--color-bg-primary)] mt-24">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="col-span-1 md:col-span-2">
          <Link href="/" className="text-3xl font-heading font-bold tracking-wider uppercase">
            RI<span className="text-[var(--color-accent-primary)]">EO</span>
          </Link>
          <p className="mt-4 text-[var(--color-text-secondary)] max-w-sm text-sm">
            Elevating visual storytelling through premium video editing and motion graphics. 
            Transforming raw footage into cinematic masterpieces.
          </p>
        </div>
        
        <div className="flex flex-col gap-4">
          <h4 className="font-semibold uppercase tracking-widest text-sm mb-2">Navigation</h4>
          <Link href="/#services" className="text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors text-sm">Services</Link>
          <Link href="/#portfolio" className="text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors text-sm">Portfolio</Link>
          <Link href="/store" className="text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors text-sm">Digital Store</Link>
          <Link href="/contact" className="text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors text-sm">Contact</Link>
        </div>

        <div className="flex flex-col gap-4">
          <h4 className="font-semibold uppercase tracking-widest text-sm mb-2">Socials</h4>
          <div className="flex gap-4">
            <a href="#" className="p-2 rounded-full bg-[var(--color-bg-card)] border border-[var(--color-border-subtle)] hover:border-[var(--color-accent-primary)] hover:text-[var(--color-accent-primary)] transition-all">
              <FaYoutube size={18} />
            </a>
            <a href="#" className="p-2 rounded-full bg-[var(--color-bg-card)] border border-[var(--color-border-subtle)] hover:border-[var(--color-accent-primary)] hover:text-[var(--color-accent-primary)] transition-all">
              <FaInstagram size={18} />
            </a>
            <a href="#" className="p-2 rounded-full bg-[var(--color-bg-card)] border border-[var(--color-border-subtle)] hover:border-[var(--color-accent-primary)] hover:text-[var(--color-accent-primary)] transition-all">
              <FaTwitter size={18} />
            </a>
            <a href="#" className="p-2 rounded-full bg-[var(--color-bg-card)] border border-[var(--color-border-subtle)] hover:border-[var(--color-accent-primary)] hover:text-[var(--color-accent-primary)] transition-all">
              <Mail size={18} />
            </a>
          </div>
        </div>
      </div>
      <div className="container mx-auto mt-12 pt-8 border-t border-[var(--color-border-subtle)] flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-[var(--color-text-secondary)]">
        <p>© {new Date().getFullYear()} RIEO. All rights reserved.</p>
        <div className="flex gap-4">
          <Link href="/privacy" className="hover:text-[var(--color-text-primary)] transition-colors">Privacy Policy</Link>
          <Link href="/terms" className="hover:text-[var(--color-text-primary)] transition-colors">Terms of Service</Link>
        </div>
      </div>
    </footer>
  );
}
