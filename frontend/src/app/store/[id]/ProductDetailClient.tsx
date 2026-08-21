"use client";

import { motion } from "framer-motion";
import { ArrowLeft, ExternalLink } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export function ProductDetailClient({ product }: { product: any }) {
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const isInstagram = product.videoUrl?.includes('instagram.com');
  const instaEmbedUrl = isInstagram 
    ? (product.videoUrl.split('?')[0].replace(/\/$/, '') + '/embed') 
    : '';

  return (
    <div className="min-h-screen bg-[#050505] text-white flex flex-col md:flex-row">
      
      {/* LEFT: Media Section */}
      <motion.div 
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="w-full md:w-1/2 relative min-h-[50vh] md:min-h-screen bg-black overflow-hidden flex items-center justify-center border-b md:border-b-0 md:border-r border-white/10"
      >
        {/* Glow effect behind video */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-white/5 blur-[120px] rounded-full pointer-events-none" />
        
        {/* Back Button Overlay */}
        <div className="absolute top-6 left-6 z-50">
          <Link href="/store" className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-black/40 backdrop-blur-md border border-white/10 text-white hover:bg-white hover:text-black transition-all duration-300">
            <ArrowLeft size={20} />
          </Link>
        </div>

        <div className="relative w-full h-full max-h-screen flex items-center justify-center z-10 p-0 md:p-8">
          <div className="w-full h-full rounded-none md:rounded-3xl overflow-hidden relative shadow-2xl bg-black">
            {product.videoUrl ? (
              isInstagram ? (
                <iframe 
                  src={instaEmbedUrl}
                  className="w-full h-full object-cover scale-[1.02]" 
                  frameBorder="0" 
                  scrolling="no" 
                  allowTransparency={true}
                ></iframe>
              ) : (
                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  controls
                  className="w-full h-full object-contain md:object-cover bg-black"
                >
                  <source src={product.videoUrl} type="video/mp4" />
                </video>
              )
            ) : product.thumbnailUrl ? (
              <img
                src={product.thumbnailUrl}
                alt={product.title}
                className="w-full h-full object-contain md:object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-white/20">
                No Media Available
              </div>
            )}
          </div>
        </div>
      </motion.div>

      {/* RIGHT: Content Section */}
      <motion.div 
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
        className="w-full md:w-1/2 relative p-8 md:p-16 lg:p-24 flex flex-col justify-center min-h-[50vh]"
      >
        <div className="max-w-xl">
          {/* Category */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="mb-6"
          >
            <span className="bg-white/10 text-white text-xs uppercase tracking-[0.2em] font-bold px-4 py-2 rounded-full border border-white/20">
              {product.category}
            </span>
          </motion.div>

          {/* Title */}
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-4xl sm:text-5xl lg:text-7xl font-heading font-bold leading-tight mb-4 uppercase"
          >
            {product.title}
          </motion.h1>

          {/* Price */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="mb-10 flex items-end gap-3"
          >
            <span className="text-3xl lg:text-4xl font-bold text-gray-300">
              ₹{product.price.replace(/^[^0-9]+/, '')}
            </span>
            <span className="text-sm text-gray-500 font-medium uppercase tracking-widest mb-1">
              INR
            </span>
          </motion.div>

          {/* Description */}
          {product.description && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="mb-12 prose prose-invert prose-p:text-gray-400 prose-p:leading-relaxed prose-p:text-base sm:prose-p:text-lg max-w-none"
            >
              <p>{product.description}</p>
            </motion.div>
          )}

          {/* Action Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.6 }}
          >
            {product.buyUrl ? (
              <a 
                href={product.buyUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="group relative inline-flex items-center justify-center gap-3 w-full sm:w-auto px-10 py-5 bg-white text-black font-bold uppercase tracking-widest text-sm rounded-xl overflow-hidden transition-all hover:scale-[1.02] active:scale-95"
              >
                <div className="absolute inset-0 w-full h-full bg-gray-200 transform scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500 ease-out" />
                <span className="relative z-10 flex items-center gap-3">
                  Purchase Now
                  <ExternalLink size={18} className="transform group-hover:translate-x-1 transition-transform" />
                </span>
              </a>
            ) : (
              <button className="group relative inline-flex items-center justify-center gap-3 w-full sm:w-auto px-10 py-5 bg-white text-black font-bold uppercase tracking-widest text-sm rounded-xl overflow-hidden transition-all opacity-50 cursor-not-allowed">
                <span className="relative z-10">Currently Unavailable</span>
              </button>
            )}
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
