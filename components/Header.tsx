'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isOvertimeOpen, setIsOvertimeOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-bg/90 backdrop-blur-md no-print">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-9 h-9 rounded-xl bg-gradient flex items-center justify-center shadow-lg shadow-emerald-500/20 group-hover:scale-105 transition-transform">
            <svg
              className="w-5 h-5 text-gray-950 font-bold"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="10" />
              <polyline points="12 6 12 12 16 14" />
            </svg>
          </div>
          <div className="flex flex-col">
            <span className="font-clash font-bold text-xl tracking-tight text-white flex items-center gap-1.5">
              GridSnap
              <span className="text-[10px] font-mono uppercase px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 tracking-wider">
                Wage Engine
              </span>
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-1 text-sm font-medium">
          <Link
            href="/"
            className={`px-3 py-2 rounded-lg transition-colors ${
              pathname === '/' ? 'text-accent font-semibold bg-surface2' : 'text-gray-300 hover:text-white hover:bg-surface'
            }`}
          >
            Time Card
          </Link>

          {/* Overtime Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setIsOvertimeOpen(true)}
            onMouseLeave={() => setIsOvertimeOpen(false)}
          >
            <Link
              href="/overtime-calculator"
              className={`px-3 py-2 rounded-lg flex items-center gap-1 transition-colors ${
                pathname.startsWith('/overtime-calculator')
                  ? 'text-accent font-semibold bg-surface2'
                  : 'text-gray-300 hover:text-white hover:bg-surface'
              }`}
            >
              Overtime Hub
              <svg
                className={`w-4 h-4 transition-transform ${isOvertimeOpen ? 'rotate-180' : ''}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </Link>

            {isOvertimeOpen && (
              <div className="absolute top-full left-0 w-72 bg-surface border border-border rounded-xl shadow-2xl py-2 mt-1 z-50">
                <Link
                  href="/overtime-calculator"
                  className="block px-4 py-2.5 text-xs font-semibold uppercase tracking-wider text-muted hover:text-white border-b border-border/50"
                  onClick={() => setIsOvertimeOpen(false)}
                >
                  All Overtime Calculations →
                </Link>
                <Link
                  href="/overtime-calculator/california"
                  className="block px-4 py-2.5 text-sm text-gray-200 hover:bg-surface2 hover:text-accent transition-colors"
                  onClick={() => setIsOvertimeOpen(false)}
                >
                  <div className="font-medium text-white">California Overtime</div>
                  <div className="text-xs text-muted">Daily 8h / 12h & 7th day rules</div>
                </Link>
                <Link
                  href="/overtime-calculator/ontario"
                  className="block px-4 py-2.5 text-sm text-gray-200 hover:bg-surface2 hover:text-accent transition-colors"
                  onClick={() => setIsOvertimeOpen(false)}
                >
                  <div className="font-medium text-white">Ontario Overtime (ESA)</div>
                  <div className="text-xs text-muted">44-hour weekly statutory threshold</div>
                </Link>
                <Link
                  href="/overtime-calculator/australia-fair-work"
                  className="block px-4 py-2.5 text-sm text-gray-200 hover:bg-surface2 hover:text-accent transition-colors"
                  onClick={() => setIsOvertimeOpen(false)}
                >
                  <div className="font-medium text-white">Australia Fair Work</div>
                  <div className="text-xs text-muted">38h week, 25% casual loading & penalties</div>
                </Link>
              </div>
            )}
          </div>

          <Link
            href="/hours-worked-calculator"
            className={`px-3 py-2 rounded-lg transition-colors ${
              pathname === '/hours-worked-calculator'
                ? 'text-accent font-semibold bg-surface2'
                : 'text-gray-300 hover:text-white hover:bg-surface'
            }`}
          >
            Hours Worked
          </Link>

          <Link
            href="/about"
            className={`px-3 py-2 rounded-lg transition-colors ${
              pathname === '/about' ? 'text-accent font-semibold bg-surface2' : 'text-gray-300 hover:text-white hover:bg-surface'
            }`}
          >
            About & Methodology
          </Link>

          <Link
            href="/contact"
            className={`px-3 py-2 rounded-lg transition-colors ${
              pathname === '/contact' ? 'text-accent font-semibold bg-surface2' : 'text-gray-300 hover:text-white hover:bg-surface'
            }`}
          >
            Contact
          </Link>
        </nav>

        {/* Quick Regional Indicator / Mobile Toggle */}
        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-1.5 text-xs text-muted bg-surface px-2.5 py-1.5 rounded-lg border border-border">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>US • CA • AU • NZ</span>
          </div>

          {/* Mobile Menu Button */}
          <button
            type="button"
            className="lg:hidden p-2.5 rounded-xl bg-surface border border-border text-gray-300 hover:text-white focus:outline-none"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle navigation menu"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {isMobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isMobileMenuOpen && (
        <div className="lg:hidden border-b border-border bg-surface px-4 py-4 space-y-2">
          <Link
            href="/"
            className="block py-3 px-3 rounded-lg text-base font-medium text-white hover:bg-surface2"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Time Card Calculator (7/14 Day)
          </Link>
          <div className="border-t border-border/50 pt-2 pb-1">
            <span className="block px-3 text-xs uppercase tracking-wider font-semibold text-muted mb-1">
              Overtime Calculators
            </span>
            <Link
              href="/overtime-calculator"
              className="block py-2.5 px-3 rounded-lg text-sm text-gray-200 hover:bg-surface2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Overtime Hub Overview
            </Link>
            <Link
              href="/overtime-calculator/california"
              className="block py-2.5 px-3 rounded-lg text-sm text-gray-200 hover:bg-surface2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              California Daily (8h / 12h / 7th Day)
            </Link>
            <Link
              href="/overtime-calculator/ontario"
              className="block py-2.5 px-3 rounded-lg text-sm text-gray-200 hover:bg-surface2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Ontario Weekly (ESA 44-Hour Threshold)
            </Link>
            <Link
              href="/overtime-calculator/australia-fair-work"
              className="block py-2.5 px-3 rounded-lg text-sm text-gray-200 hover:bg-surface2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Australia Fair Work & Casual Loading
            </Link>
          </div>
          <div className="border-t border-border/50 pt-2">
            <Link
              href="/hours-worked-calculator"
              className="block py-3 px-3 rounded-lg text-base font-medium text-white hover:bg-surface2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Hours Worked & Decimal Converter
            </Link>
            <Link
              href="/about"
              className="block py-2.5 px-3 rounded-lg text-sm text-gray-300 hover:bg-surface2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              About & Editorial Standards
            </Link>
            <Link
              href="/contact"
              className="block py-2.5 px-3 rounded-lg text-sm text-gray-300 hover:bg-surface2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Contact Support
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
