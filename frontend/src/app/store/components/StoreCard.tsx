"use client";

import { useRouter } from "next/navigation";

export function StoreCard({ product }: { product: any }) {
  const router = useRouter();
  
  const isInstagram = product.videoUrl?.includes('instagram.com');
  const instaEmbedUrl = isInstagram 
    ? (product.videoUrl.split('?')[0].replace(/\/$/, '') + '/embed') 
    : '';

  const isGoogleDrive = product.videoUrl?.includes('drive.google.com');
  const googleDriveIdMatch = product.videoUrl?.match(/\/d\/([a-zA-Z0-9_-]+)/) || product.videoUrl?.match(/id=([a-zA-Z0-9_-]+)/);
  const videoSrcUrl = isGoogleDrive && googleDriveIdMatch 
    ? `https://drive.google.com/uc?export=download&id=${googleDriveIdMatch[1]}` 
    : product.videoUrl;

  const handleCardClick = () => {
    router.push(`/store/${product.id}`);
  };

  const telegramUsername = "RIEOEDIT";
  const textMessage = encodeURIComponent(`Hello, I want to buy "${product.title}" for ₹${product.price.replace(/^[^0-9]+/, '')}.`);
  const finalBuyUrl = product.buyUrl || `https://t.me/${telegramUsername}?text=${textMessage}`;

  return (
    <div 
      onClick={handleCardClick}
      className="group relative rounded-3xl overflow-hidden bg-[#0A0A0A] border border-white/5 hover:border-white/20 transition-all duration-500 cursor-pointer shadow-2xl aspect-[3/4] sm:aspect-[4/5] w-full flex flex-col justify-end"
    >
      
      {/* Media Background */}
      <div className="absolute inset-0 w-full h-full overflow-hidden bg-[#050505] z-0">
        <div className="absolute inset-0 bg-black/40 group-hover:bg-black/10 transition-colors duration-500 z-10 pointer-events-none" />
        
        {product.videoUrl ? (
          isInstagram ? (
            <iframe 
              src={instaEmbedUrl}
              className="w-full h-full object-cover scale-[1.02] pointer-events-none opacity-90 group-hover:opacity-100" 
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
              poster={product.thumbnailUrl || undefined}
              className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out grayscale group-hover:grayscale-0 opacity-80 group-hover:opacity-100"
            >
              <source src={videoSrcUrl} type="video/mp4" />
            </video>
          )
        ) : product.thumbnailUrl ? (
          <img
            src={product.thumbnailUrl}
            alt={product.title}
            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out grayscale group-hover:grayscale-0 opacity-80 group-hover:opacity-100"
          />
        ) : null}
      </div>

      {/* Category Badge */}
      <div className="absolute top-4 left-4 sm:top-6 sm:left-6 z-20">
        <span className="bg-black/60 backdrop-blur-md text-white text-[9px] sm:text-[10px] uppercase tracking-widest font-bold px-3 py-1.5 rounded-full border border-white/10 shadow-lg">
          {product.category}
        </span>
      </div>

      {/* Card Content Overlay */}
      <div className="p-5 sm:p-8 flex flex-col gap-3 relative z-20 bg-gradient-to-t from-black via-black/80 to-transparent pt-24">
        <div className="flex justify-between items-end gap-3">
          <div className="flex-1 min-w-0">
            <h3 className="text-xl sm:text-2xl font-bold font-heading text-white group-hover:text-gray-200 transition-colors leading-tight mb-1 truncate">
              {product.title}
            </h3>
            {product.description && (
              <p className="text-xs sm:text-sm text-gray-300 line-clamp-2">
                {product.description}
              </p>
            )}
          </div>
          <div className="bg-white/10 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/20 shrink-0 flex items-center justify-center shadow-xl mb-1">
            <span className="text-white text-sm sm:text-base font-bold tracking-wider">₹{product.price.replace(/^[^0-9]+/, '')}</span>
          </div>
        </div>
        
        <a 
          href={finalBuyUrl} 
          target="_blank" 
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          className="w-full py-3 mt-1 rounded-xl bg-white text-black font-bold uppercase tracking-widest text-xs sm:text-sm hover:bg-gray-200 transition-all duration-300 flex items-center justify-center gap-2 group/btn"
        >
          <span>Buy Now</span>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transform group-hover/btn:translate-x-1 transition-transform">
            <line x1="5" y1="12" x2="19" y2="12"></line>
            <polyline points="12 5 19 12 12 19"></polyline>
          </svg>
        </a>
      </div>
    </div>
  );
}
