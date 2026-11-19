"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState, FormEvent, Suspense } from "react";

function SearchInputInner() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(searchParams.get("q") || "");

  const handleSearch = (e: FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/store?q=${encodeURIComponent(query)}`);
    } else {
      router.push(`/store`);
    }
  };

  return (
    <form onSubmit={handleSearch} className="relative flex items-center w-full min-w-[250px]">
      <button type="submit" className="absolute left-4 text-gray-400 hover:text-white transition-colors">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="11" cy="11" r="8"/>
          <line x1="21" y1="21" x2="16.65" y2="16.65"/>
        </svg>
      </button>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="SEARCH"
        className="w-full bg-white/5 hover:bg-white/10 border border-white/10 text-white placeholder-gray-400 pl-12 pr-4 py-3 rounded-full transition-all backdrop-blur-sm focus:outline-none focus:border-white/30 focus:ring-1 focus:ring-white/30 text-sm font-bold tracking-widest uppercase"
      />
    </form>
  );
}

export default function SearchInput() {
  return (
    <Suspense fallback={<div className="w-full min-w-[250px] h-[46px] bg-white/5 rounded-full animate-pulse" />}>
      <SearchInputInner />
    </Suspense>
  );
}
