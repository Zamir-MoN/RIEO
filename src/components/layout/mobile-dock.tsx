import Link from 'next/link';
import { FiGrid, FiFolder, FiShoppingBag, FiFileText, FiChevronDown } from 'react-icons/fi';

export function MobileDock() {
  return (
    <div className="md:hidden fixed bottom-0 left-0 w-full z-50 flex flex-col items-center pb-6 px-4 pointer-events-none">
      
      {/* Scroll Down Arrow */}
      <div className="w-full flex justify-center items-center px-4 mb-6 pointer-events-auto relative">
        <FiChevronDown className="text-white/50 text-3xl" />
      </div>

      {/* Dock */}
      <div className="bg-[#0A0A0A] border border-white/10 rounded-3xl w-full max-w-md py-5 px-8 flex justify-between items-center pointer-events-auto shadow-2xl">
        <Link href="/#services" className="flex flex-col items-center gap-2 text-white/50 hover:text-white transition-colors">
          <FiGrid className="text-[1.35rem]" />
          <span className="text-[8px] uppercase tracking-widest font-bold">Services</span>
        </Link>
        <Link href="/#portfolio" className="flex flex-col items-center gap-2 text-white/50 hover:text-white transition-colors">
          <FiFolder className="text-[1.35rem]" />
          <span className="text-[8px] uppercase tracking-widest font-bold">Portfolio</span>
        </Link>
        <Link href="/store" className="flex flex-col items-center gap-2 text-white/50 hover:text-white transition-colors">
          <FiShoppingBag className="text-[1.35rem]" />
          <span className="text-[8px] uppercase tracking-widest font-bold">Store</span>
        </Link>
        <Link href="/#blog" className="flex flex-col items-center gap-2 text-white/50 hover:text-white transition-colors">
          <FiFileText className="text-[1.35rem]" />
          <span className="text-[8px] uppercase tracking-widest font-bold">Blog</span>
        </Link>
      </div>
    </div>
  );
}
