import type { ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";

export default function Layout({ children }: { children: ReactNode }) {
  const location = useLocation();
  // Don't add padding globally, let pages handle it so Map can be edge-to-edge
  const isHome = location.pathname === "/";

  return (
    <div className="min-h-screen flex flex-col bg-[#f8fafc]">
      <nav className="glass-panel sticky top-0 z-50 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 w-full flex items-center h-16">
          <Link to="/" className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#006400] to-[#00a651] shadow-lg shadow-emerald-500/30 text-white flex items-center justify-center text-lg transform hover:scale-105 transition-transform">
              🅿️
            </div>
            <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600 tracking-tight">
              TUparkingLocation
            </h1>
          </Link>
        </div>
      </nav>

      <main className="w-full flex-grow flex flex-col">
        {children}
      </main>

      {!isHome && (
        <footer className="py-6 text-center text-xs font-medium text-gray-400 mt-auto">
          © 2026 Thammasat University
        </footer>
      )}
    </div>
  );
}
