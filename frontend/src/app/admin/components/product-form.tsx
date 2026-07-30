"use client";

import { useState } from "react";
import { createProduct, updateProduct, deleteProduct } from "@/actions/product";

export function ProductForm({ products }: { products: any[] }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);

  // Form states
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [buyUrl, setBuyUrl] = useState("");

  function startEditing(product: any) {
    setEditingId(product.id);
    setTitle(product.title);
    setPrice(product.price);
    setVideoUrl(product.videoUrl);
    setCategory(product.category);
    setDescription(product.description || "");
    setBuyUrl(product.buyUrl || "");
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function cancelEditing() {
    setEditingId(null);
    setTitle("");
    setPrice("");
    setVideoUrl("");
    setCategory("");
    setDescription("");
    setBuyUrl("");
    setError(null);
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    const formData = new FormData();
    formData.append("title", title);
    formData.append("price", price);
    formData.append("videoUrl", videoUrl);
    formData.append("category", category);
    formData.append("description", description);
    formData.append("buyUrl", buyUrl);

    let result;
    if (editingId) {
      result = await updateProduct(editingId, formData);
    } else {
      result = await createProduct(formData);
    }
    
    if (result.success) {
      cancelEditing(); // Reset form
    } else {
      setError(result.error || "Something went wrong");
    }
    setLoading(false);
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
      {/* Form Sidebar */}
      <div className="lg:col-span-4 bg-[#0A0A0A] p-5 sm:p-8 rounded-2xl border border-white/10 shadow-2xl h-fit lg:sticky lg:top-8 order-1">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold font-heading uppercase tracking-widest text-white">
            {editingId ? "Edit Product" : "Add Product"}
          </h2>
          {editingId && (
            <button onClick={cancelEditing} className="text-sm text-gray-400 hover:text-white uppercase tracking-widest">
              Cancel
            </button>
          )}
        </div>
        
        {error && <div className="p-3 bg-red-500/10 border border-red-500/20 text-red-500 text-sm mb-6 rounded-lg">{error}</div>}
        
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div>
            <label className="text-xs text-gray-400 mb-1.5 block uppercase tracking-widest font-bold">Title</label>
            <input value={title} onChange={e => setTitle(e.target.value)} required className="w-full bg-[#111] border border-white/10 p-3 rounded-lg text-white focus:outline-none focus:border-white/30 transition-colors" placeholder="e.g. Lightroom Presets" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs text-gray-400 mb-1.5 block uppercase tracking-widest font-bold">Price</label>
              <input value={price} onChange={e => setPrice(e.target.value)} required className="w-full bg-[#111] border border-white/10 p-3 rounded-lg text-white focus:outline-none focus:border-white/30 transition-colors" placeholder="e.g. ₹3999" />
            </div>
            <div>
              <label className="text-xs text-gray-400 mb-1.5 block uppercase tracking-widest font-bold">Category</label>
              <input value={category} onChange={e => setCategory(e.target.value)} required className="w-full bg-[#111] border border-white/10 p-3 rounded-lg text-white focus:outline-none focus:border-white/30 transition-colors" placeholder="e.g. Graphics" />
            </div>
          </div>
          <div>
            <label className="text-xs text-gray-400 mb-1.5 block uppercase tracking-widest font-bold">Video URL</label>
            <input value={videoUrl} onChange={e => setVideoUrl(e.target.value)} required className="w-full bg-[#111] border border-white/10 p-3 rounded-lg text-white focus:outline-none focus:border-white/30 transition-colors" placeholder="/hero-bg.mp4" />
          </div>
          <div>
            <label className="text-xs text-gray-400 mb-1.5 block uppercase tracking-widest font-bold">Description (Optional)</label>
            <textarea value={description} onChange={e => setDescription(e.target.value)} rows={2} className="w-full bg-[#111] border border-white/10 p-3 rounded-lg text-white focus:outline-none focus:border-white/30 transition-colors resize-none" placeholder="Short description of the product..." />
          </div>
          <div>
            <label className="text-xs text-gray-400 mb-1.5 block uppercase tracking-widest font-bold">Buy / Download URL (Optional)</label>
            <input value={buyUrl} onChange={e => setBuyUrl(e.target.value)} className="w-full bg-[#111] border border-white/10 p-3 rounded-lg text-white focus:outline-none focus:border-white/30 transition-colors" placeholder="https://..." />
            <p className="text-[10px] text-gray-500 mt-1">Leave empty to show standard Buy Now button</p>
          </div>
          <button 
            type="submit" 
            disabled={loading}
            className="mt-2 w-full bg-white text-black font-bold py-3.5 rounded-lg uppercase tracking-widest hover:bg-gray-200 transition-colors disabled:opacity-50"
          >
            {loading ? "Saving..." : (editingId ? "Update Product" : "Publish Product")}
          </button>
        </form>
      </div>

      {/* Product List */}
      <div className="lg:col-span-8 order-2 min-w-0">
        <div className="bg-[#0A0A0A] p-5 sm:p-8 rounded-2xl border border-white/10 shadow-2xl">
          <h2 className="text-2xl font-bold font-heading uppercase tracking-widest text-white mb-6">Manage Products</h2>
          <div className="flex flex-col gap-4">
            {products.map((product) => (
              <div key={product.id} className="bg-[#111] p-5 rounded-xl border border-white/5 hover:border-white/10 transition-colors flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-1">
                    <h3 className="font-bold text-lg text-white">{product.title}</h3>
                    <span className="bg-white/10 text-white text-xs px-2 py-0.5 rounded-full font-bold">₹{product.price.replace(/^[^0-9]+/, '')}</span>
                  </div>
                  <p className="text-sm text-gray-400 mb-2">
                    <span className="uppercase tracking-widest text-xs font-bold text-gray-500">{product.category}</span>
                    {product.description && <span className="ml-2 border-l border-gray-700 pl-2">{product.description}</span>}
                  </p>
                  <div className="mt-2 text-[10px] uppercase tracking-widest text-gray-500 font-bold w-full overflow-hidden space-y-2">
                    <div className="bg-black/50 px-2 py-1.5 rounded truncate" title={product.videoUrl}>VID: {product.videoUrl}</div>
                    {product.buyUrl && <div className="bg-blue-500/10 text-blue-400 px-2 py-1.5 rounded truncate" title={product.buyUrl}>LINK: {product.buyUrl}</div>}
                  </div>
                </div>
                <div className="flex gap-2 w-full sm:w-auto">
                  <button 
                    onClick={() => startEditing(product)}
                    className="flex-1 sm:flex-none text-white hover:bg-white/10 text-xs font-bold uppercase tracking-widest px-4 py-2 border border-white/10 rounded transition-colors"
                  >
                    Edit
                  </button>
                  <button 
                    onClick={async () => {
                      if (confirm("Are you sure you want to delete this product?")) await deleteProduct(product.id);
                    }}
                    className="flex-1 sm:flex-none text-red-500 hover:text-red-400 hover:bg-red-500/10 text-xs font-bold uppercase tracking-widest px-4 py-2 border border-red-500/20 rounded transition-colors"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
            {products.length === 0 && (
              <div className="text-center py-12 border border-dashed border-white/10 rounded-xl bg-white/5">
                <p className="text-gray-400 text-sm uppercase tracking-widest">No products found.</p>
                <p className="text-gray-500 text-xs mt-2">Use the form to add your first product.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
