"use client";

import { useState } from "react";
import { createProduct, deleteProduct } from "@/actions/product";

export function ProductForm({ products }: { products: any[] }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    const formData = new FormData(e.currentTarget);
    const result = await createProduct(formData);
    
    if (result.success) {
      (e.target as HTMLFormElement).reset();
    } else {
      setError(result.error || "Something went wrong");
    }
    setLoading(false);
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Form */}
      <div className="lg:col-span-1 bg-[#0A0A0A] p-6 rounded-xl border border-white/10">
        <h2 className="text-xl font-bold mb-4 font-heading">Add Product</h2>
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="text-sm text-gray-400 mb-1 block">Title</label>
            <input name="title" required className="w-full bg-[#111] border border-white/10 p-2 rounded text-white" />
          </div>
          <div>
            <label className="text-sm text-gray-400 mb-1 block">Price (e.g. ₹3999)</label>
            <input name="price" required className="w-full bg-[#111] border border-white/10 p-2 rounded text-white" />
          </div>
          <div>
            <label className="text-sm text-gray-400 mb-1 block">Video URL (/hero-bg.mp4)</label>
            <input name="videoUrl" required className="w-full bg-[#111] border border-white/10 p-2 rounded text-white" />
          </div>
          <div>
            <label className="text-sm text-gray-400 mb-1 block">Category</label>
            <input name="category" required className="w-full bg-[#111] border border-white/10 p-2 rounded text-white" />
          </div>
          <button 
            type="submit" 
            disabled={loading}
            className="mt-4 bg-white text-black font-bold py-2 rounded uppercase tracking-widest hover:bg-gray-200 transition-colors disabled:opacity-50"
          >
            {loading ? "Adding..." : "Add Product"}
          </button>
        </form>
      </div>

      {/* Product List */}
      <div className="lg:col-span-2">
        <h2 className="text-xl font-bold mb-4 font-heading">Current Products</h2>
        <div className="flex flex-col gap-4">
          {products.map((product) => (
            <div key={product.id} className="bg-[#0A0A0A] p-4 rounded-xl border border-white/10 flex justify-between items-center">
              <div>
                <h3 className="font-bold">{product.title} <span className="text-gray-500 font-normal ml-2">{product.price.replace('$', '₹')}</span></h3>
                <p className="text-sm text-gray-400">{product.category} • {product.videoUrl}</p>
              </div>
              <button 
                onClick={async () => {
                  if (confirm("Are you sure?")) await deleteProduct(product.id);
                }}
                className="text-red-500 hover:text-red-400 text-sm font-bold uppercase tracking-widest px-3 py-1 border border-red-500/20 rounded"
              >
                Delete
              </button>
            </div>
          ))}
          {products.length === 0 && (
            <p className="text-gray-500 italic p-4 border border-dashed border-white/10 rounded-xl">No products yet.</p>
          )}
        </div>
      </div>
    </div>
  );
}
