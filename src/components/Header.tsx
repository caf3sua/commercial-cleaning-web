"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
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
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2.5 shrink-0 py-1">
            <img src="/logo.png" alt="Vệ Sinh 247 Ánh Ngọc Logo" className="h-12 w-auto object-contain" />
            <span className="text-xs sm:text-sm font-black tracking-wide text-brand-blue font-sans">
              Vệ sinh nhà Ánh Ngọc 24/7
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => {
              const isActive =
                pathname === link.href ||
                (link.href !== "/" && pathname.startsWith(link.href));
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-xs sm:text-sm font-semibold transition-all duration-200 py-5 px-1 relative ${
                    isActive
                      ? "text-brand-blue border-b-2 border-brand-blue"
                      : "text-slate-500 hover:text-brand-blue"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </div>

          {/* Desktop Hotline Pill */}
          <div className="hidden md:flex items-center">
            <a
              href="tel:0911976839"
              className="bg-brand-blue hover:bg-brand-blue-hover text-white font-bold px-6 py-2.5 rounded-full text-xs tracking-wider transition-colors duration-200 shadow-sm shadow-brand-blue/10"
            >
              Hotline: 0911 976 839
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-slate-600 hover:text-brand-blue focus:outline-none p-1.5 rounded-lg hover:bg-slate-100 transition-colors"
              aria-label="Toggle Menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            isOpen ? "max-h-[300px] border-t border-slate-100 py-3 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="space-y-1">
            {navLinks.map((link) => {
              const isActive =
                pathname === link.href ||
                (link.href !== "/" && pathname.startsWith(link.href));
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={`block px-4 py-2.5 rounded-xl text-xs font-bold transition-colors ${
                    isActive
                      ? "bg-brand-blue-light text-brand-blue"
                      : "text-slate-600 hover:bg-slate-50 hover:text-brand-blue"
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
                className="w-full flex items-center justify-center bg-brand-blue text-white font-bold py-2.5 rounded-full text-xs shadow-sm hover:bg-brand-blue-hover transition-colors"
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
