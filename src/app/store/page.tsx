import { getProducts } from "@/actions/product";
import Link from "next/link";
import SearchInput from "@/components/SearchInput";
import { StoreCard } from "./components/StoreCard";

export const dynamic = "force-dynamic";

export default async function StorePage(props: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const searchParams = await props.searchParams;
  
  const result = await getProducts();
  let products = result.success ? result.products : [];

  const query = typeof searchParams?.q === "string" ? searchParams.q.toLowerCase() : "";

  if (query) {
    products = products.filter((product: any) => 
      product.title.toLowerCase().includes(query) || 
      product.category.toLowerCase().includes(query) ||
      (product.description && product.description.toLowerCase().includes(query))
    );
  }

  return (
    <div className="flex flex-col min-h-screen pt-[max(4rem,calc(env(safe-area-inset-top,0px)+2rem))] md:pt-32 pb-[max(6rem,calc(env(safe-area-inset-bottom,0px)+4rem))] bg-[#050505] text-white">
      <div className="max-w-7xl mx-auto px-4 w-full relative z-10">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[300px] h-[300px] sm:w-[600px] sm:h-[600px] bg-white/5 blur-[100px] sm:blur-[120px] rounded-full pointer-events-none" />
        
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 lg:mb-24 gap-8 relative z-10">
          <div>
            <Link href="/" prefetch={true} className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-8 text-sm uppercase tracking-widest font-bold">
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

          <div className="flex items-center gap-4 w-full md:w-auto">
            <SearchInput />
          </div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6 lg:gap-8 relative z-10">
          {products.map((product: any) => (
            <StoreCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}
