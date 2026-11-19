import { Metadata } from "next";
import { logout } from "@/actions/auth";

export const metadata: Metadata = {
  title: "Admin Dashboard - RIEO",
  description: "Manage products and website content.",
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#050505] text-white pt-24 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <header className="mb-8 border-b border-white/10 pb-6 flex justify-between items-end">
          <div>
            <h1 className="text-3xl font-heading font-bold uppercase tracking-widest text-white">Admin Dashboard</h1>
            <p className="text-gray-400 mt-2">Manage your digital store products.</p>
          </div>
          <form action={logout}>
            <button type="submit" className="text-sm bg-red-500/10 text-red-500 hover:bg-red-500/20 px-4 py-2 rounded-lg transition-colors border border-red-500/20">
              Logout
            </button>
          </form>
        </header>
        <main>{children}</main>
      </div>
    </div>
  );
}
