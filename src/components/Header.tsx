"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronDown } from "lucide-react";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const navLinks: { name: string; href: string; hasDropdown?: boolean }[] = [
    { name: "Trang chủ", href: "/" },
    { name: "Dịch vụ", href: "/dich-vu" },
    { name: "Báo giá", href: "/bao-gia" },
    { name: "Tin tức", href: "/tin-tuc" },
    { name: "Liên hệ", href: "/contact" },
  ];

  return (
    <header className="w-full bg-white border-b border-slate-100 z-50 sticky top-0 shadow-sm">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Custom SVG Logo */}
          <Link href="/" className="flex items-center space-x-2.5 shrink-0 py-1 select-none group">
            <div className="flex items-center justify-center w-10 h-10 rounded-xl border-2 border-brand-green text-brand-green bg-white p-1.5 shadow-sm group-hover:scale-102 transition-transform">
              <svg className="w-full h-full" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                {/* Hand Outline */}
                <path d="M18 11V6a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v5" />
                <path d="M14 10V4a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v6" />
                <path d="M10 10.5V6a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v8" />
                <path d="M8 14H4a2 2 0 0 0-2 2v3a2 2 0 0 0 2 2h12a4 4 0 0 0 4-4v-7" />
              </svg>
            </div>
            <div className="flex flex-col">
              <span className="text-sm sm:text-base font-black tracking-tight text-slate-800 leading-none">
                TAPVU<span className="text-brand-green font-extrabold">247</span>
              </span>
              <div className="flex items-center space-x-1 mt-0.5">
                <span className="text-[9px] font-bold text-slate-500 leading-none uppercase tracking-wider">Home clean</span>
                <span className="bg-brand-green text-white text-[8px] font-black px-1 py-0.5 rounded leading-none">24/24</span>
              </div>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center space-x-6 lg:space-x-8">
            {navLinks.map((link) => {
              const isActive =
                pathname === link.href ||
                (link.href !== "/" && pathname.startsWith(link.href) && !link.href.startsWith("/#"));
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-base font-bold transition-all duration-200 py-5 px-1 flex items-center gap-1 ${
                    isActive
                      ? "text-brand-green border-b-2 border-brand-green"
                      : "text-slate-700 hover:text-brand-green"
                  }`}
                >
                  {link.name}
                  {link.hasDropdown && <ChevronDown className="w-3.5 h-3.5 opacity-70" />}
                </Link>
              );
            })}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-slate-600 hover:text-brand-green focus:outline-none p-1.5 rounded-lg hover:bg-slate-100 transition-colors"
              aria-label="Toggle Menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            isOpen ? "max-h-[350px] border-t border-slate-100 py-3 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="space-y-1">
            {navLinks.map((link) => {
              const isActive =
                pathname === link.href ||
                (link.href !== "/" && pathname.startsWith(link.href) && !link.href.startsWith("/#"));
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={`block px-4 py-2.5 rounded-xl text-xs font-bold transition-colors ${
                    isActive
                      ? "bg-brand-green-light text-brand-green"
                      : "text-slate-700 hover:bg-slate-50 hover:text-brand-green"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
            <div className="pt-3 px-4 border-t border-slate-100 mt-2">
              <a
                href="tel:0911976839"
                onClick={() => setIsOpen(false)}
                className="w-full flex items-center justify-center bg-brand-green text-white font-bold py-2.5 rounded-full text-xs shadow-sm hover:bg-brand-green-hover transition-colors"
              >
                Hotline: 0911 976 839
              </a>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
