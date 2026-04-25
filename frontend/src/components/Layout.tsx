import type { ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";

export default function Layout({ children }: { children: ReactNode }) {
  const location = useLocation();
  const isHome = location.pathname === "/";

  return (
    <div className="min-h-screen flex flex-col bg-[#f8fafc]">
      <nav className="glass-panel sticky top-0 z-50 transition-all duration-300">
        <div className="mx-auto flex h-16 w-full max-w-7xl items-center px-4 sm:px-6">
          <Link to="/" className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-tr from-[#006400] to-[#00a651] text-lg text-white shadow-lg shadow-emerald-500/30 transition-transform hover:scale-105">
              P
            </div>
            <h1 className="bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-xl font-bold tracking-tight text-transparent">
              TUparkingLocation
            </h1>
          </Link>

          <div className="ml-auto flex items-center gap-2">
            <Link
              to="/"
              className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                location.pathname === "/"
                  ? "bg-slate-900 text-white"
                  : "text-slate-600 hover:bg-slate-100"
              }`}
            >
              Dashboard
            </Link>
            <Link
              to="/test"
              className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                location.pathname === "/test"
                  ? "bg-sky-600 text-white"
                  : "text-slate-600 hover:bg-sky-50 hover:text-sky-700"
              }`}
            >
              Testing
            </Link>
          </div>
        </div>
      </nav>

      <main className="flex w-full flex-grow flex-col">{children}</main>

      {!isHome && (
        <footer className="mt-auto py-6 text-center text-xs font-medium text-gray-400">
          © 2026 Thammasat University
        </footer>
      )}
    </div>
  );
}
