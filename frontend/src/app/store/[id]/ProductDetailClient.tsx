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

  const isGoogleDrive = product.videoUrl?.includes('drive.google.com');
  const googleDriveIdMatch = product.videoUrl?.match(/\/d\/([a-zA-Z0-9_-]+)/) || product.videoUrl?.match(/id=([a-zA-Z0-9_-]+)/);
  const videoSrcUrl = isGoogleDrive && googleDriveIdMatch 
    ? `https://drive.google.com/uc?export=download&id=${googleDriveIdMatch[1]}` 
    : product.videoUrl;

  const telegramUsername = "RIEOEDIT";
  const telegramMessage = `Hello! I want to buy:

**\` ${product.title} \`**
Price: **\` ₹${product.price.replace(/^[^0-9]+/, '')} \`**`;
  const finalBuyUrl = product.buyUrl || `https://t.me/${telegramUsername}?text=${encodeURIComponent(telegramMessage)}`;

  return (
    <div className="min-h-screen bg-[#050505] text-white pt-24 pb-20 px-6 flex items-center justify-center relative overflow-hidden">
      
      {/* Background ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-white/5 blur-[120px] rounded-full pointer-events-none" />

      {/* Back Button */}
      <div className="absolute top-8 left-6 md:left-12 z-50">
        <Link href="/store" className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-white/5 backdrop-blur-md border border-white/10 text-gray-300 hover:bg-white hover:text-black hover:scale-105 active:scale-95 transition-all duration-300 shadow-xl">
          <ArrowLeft size={20} />
        </Link>
      </div>

      <div className="max-w-6xl w-full mx-auto flex flex-col md:flex-row items-center gap-10 lg:gap-20 relative z-10">
        
        {/* LEFT: Media Section (Contained) */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="w-full md:w-5/12 lg:w-1/2 relative aspect-[3/4] sm:aspect-square md:aspect-[4/5] rounded-[2rem] overflow-hidden shadow-2xl border border-white/10 bg-[#0A0A0A] group"
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 pointer-events-none z-10" />
          
          {product.videoUrl ? (
            isInstagram ? (
              <iframe 
                src={instaEmbedUrl}
                className="w-full h-full object-cover rounded-[2rem]" 
                frameBorder="0" 
                scrolling="no" 
                allowTransparency={true}
                allow="encrypted-media"
              ></iframe>
            ) : (
              <video
                autoPlay
                loop
                muted
                playsInline
                controls
                poster={product.thumbnailUrl || undefined}
                className="w-full h-full object-cover scale-105"
              >
                <source src={videoSrcUrl} type="video/mp4" />
              </video>
            )
          ) : product.thumbnailUrl ? (
            <img
              src={product.thumbnailUrl}
              alt={product.title}
              className="w-full h-full object-cover scale-105"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-white/20">
              No Media Available
            </div>
          )}
        </motion.div>

        {/* RIGHT: Content Section */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          className="w-full md:w-7/12 lg:w-1/2 flex flex-col justify-center"
        >
          <div className="max-w-lg">
            {/* Category */}
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="mb-6 inline-flex"
            >
              <span className="bg-white/5 backdrop-blur-md text-gray-300 text-[11px] uppercase tracking-[0.2em] font-bold px-4 py-2 rounded-full border border-white/10 shadow-lg">
                {product.category}
              </span>
            </motion.div>

            {/* Title */}
            <motion.h1 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold leading-tight mb-4 text-white uppercase tracking-tight"
            >
              {product.title}
            </motion.h1>

            {/* Price */}
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="mb-8 flex items-baseline gap-2"
            >
              <span className="text-2xl lg:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-gray-300 to-white">
                ₹{product.price.replace(/^[^0-9]+/, '')}
              </span>
              <span className="text-xs text-gray-500 font-bold uppercase tracking-widest">
                INR
              </span>
            </motion.div>

            {/* Description */}
            {product.description && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.6 }}
                className="mb-10 text-gray-300 text-sm sm:text-base leading-relaxed bg-white/[0.02] border border-white/[0.05] p-6 rounded-2xl backdrop-blur-sm shadow-inner"
              >
                <p className="break-words whitespace-pre-wrap">{product.description}</p>
              </motion.div>
            )}

            {/* Action Button */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.6 }}
              className="pt-4 border-t border-white/5"
            >
              <a 
                href={finalBuyUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="group relative inline-flex items-center justify-center gap-3 w-full sm:w-auto px-8 py-4 bg-white text-black font-bold uppercase tracking-widest text-xs rounded-xl overflow-hidden transition-all hover:scale-105 active:scale-95 shadow-2xl shadow-white/10"
              >
                <div className="absolute inset-0 w-full h-full bg-gray-200 transform scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500 ease-out" />
                <span className="relative z-10 flex items-center gap-3">
                  Purchase Now
                  <ExternalLink size={16} className="transform group-hover:translate-x-1 transition-transform" />
                </span>
              </a>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
