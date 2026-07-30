import { getProducts } from "@/actions/product";

import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function StorePage() {
  const result = await getProducts();
  const products = result.success ? result.products : [];

  return (
    <div className="flex flex-col min-h-screen pt-32 pb-24 bg-[#050505] text-white">
      <div className="max-w-7xl mx-auto px-4 w-full relative z-10">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[300px] h-[300px] sm:w-[600px] sm:h-[600px] bg-white/5 blur-[100px] sm:blur-[120px] rounded-full pointer-events-none" />
        
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 lg:mb-24 gap-8 relative z-10">
          <div>
            <Link href="/" className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-8 text-sm uppercase tracking-widest font-bold">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5"/><path d="M12 19l-7-7 7-7"/></svg>
              Back to Home
            </Link>
            <h1 className="text-5xl sm:text-6xl md:text-8xl font-heading font-bold uppercase tracking-tight">
              Digital <br className="md:hidden" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-500 to-white">Store</span>
            </h1>
            <p className="mt-6 text-sm sm:text-base text-gray-400 uppercase tracking-widest">
              Premium tools for creators.
            </p>
          </div>

          <div className="flex items-center gap-4">
            <button className="flex items-center gap-3 bg-white/5 hover:bg-white/10 border border-white/10 text-gray-300 px-6 py-3 rounded-full transition-all backdrop-blur-sm group">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:text-white transition-colors"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
              <span className="text-sm font-bold tracking-widest uppercase">Search</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 relative z-10">
          {products.map((product: any) => (
            <div key={product.id} className="group relative rounded-3xl overflow-hidden bg-[#0A0A0A] border border-white/5 hover:border-white/20 transition-all duration-500 cursor-pointer shadow-2xl">
              {/* Video Background */}
              <div className="relative w-full aspect-video sm:aspect-[4/3] md:aspect-video overflow-hidden bg-[#050505]">
                <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-colors duration-500 z-10" />
                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out grayscale group-hover:grayscale-0 opacity-80 group-hover:opacity-100"
                >
                  <source src={product.videoUrl} type="video/mp4" />
                </video>
                
                {/* Category Badge */}
                <div className="absolute top-4 left-4 sm:top-6 sm:left-6 z-20">
                  <span className="bg-black/60 backdrop-blur-md text-white text-[9px] sm:text-[10px] uppercase tracking-widest font-bold px-3 py-1.5 rounded-full border border-white/10">
                    {product.category}
                  </span>
                </div>
              </div>

              {/* Card Content */}
              <div className="p-6 sm:p-8 flex justify-between items-end relative z-20">
                <div>
                  <h3 className="text-lg sm:text-xl lg:text-2xl font-bold font-heading text-white group-hover:text-gray-200 transition-colors mb-2 pr-4">
                    {product.title}
                  </h3>
                  <p className="text-gray-400 text-sm font-bold">{product.price}</p>
                </div>
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all duration-300 shrink-0">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                    <polyline points="12 5 19 12 12 19"></polyline>
                  </svg>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
