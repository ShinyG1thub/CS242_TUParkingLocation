import type { ReactNode } from "react";
import { Link } from "react-router-dom";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <nav className="bg-white border-b sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 w-full flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <div className="w-9 h-9 bg-emerald-600 text-white rounded-2xl flex items-center justify-center text-2xl">
              🅿️
            </div>
            <h1 className="text-2xl font-semibold text-gray-900">
              TUparkingLocation
            </h1>
          </Link>
          <Link
            to="/"
            className="text-emerald-600 hover:text-emerald-700 font-medium"
          >
            Home
          </Link>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 py-6 w-full flex-grow">
        {children}
      </main>

      <footer className="bg-white border-t py-6 text-center text-sm text-gray-500 mt-auto">
        © 2026 Thammasat University • Prototype for demonstration
      </footer>
    </div>
  );
}
