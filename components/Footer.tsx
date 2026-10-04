import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="border-t border-border mt-auto bg-surface/90 text-sm no-print">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          {/* Col 1: Brand & Mission */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-gradient flex items-center justify-center font-bold text-gray-950">
                <svg
                  className="w-4 h-4"
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
              <span className="font-clash font-bold text-xl text-white">GridSnap</span>
            </div>
            <p className="text-muted text-sm leading-relaxed max-w-sm">
              Free, private, and client-side wage, timesheet, and overtime calculation engine. Engineered for hourly workers, contractors, payroll managers, and HR professionals across the United States, Canada, Australia, and New Zealand.
            </p>
            <div className="flex items-center gap-2 text-xs text-muted pt-1">
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-400"></span>
              <span>All calculations run 100% locally in your browser. Zero cloud tracking.</span>
            </div>
          </div>

          {/* Col 2: Calculators */}
          <div className="space-y-3">
            <h3 className="font-semibold text-white uppercase tracking-wider text-xs font-mono">
              Calculators
            </h3>
            <ul className="space-y-2 text-muted">
              <li>
                <Link href="/" className="hover:text-accent transition-colors">
                  Time Card Calculator
                </Link>
              </li>
              <li>
                <Link href="/overtime-calculator" className="hover:text-accent transition-colors">
                  Overtime Hub
                </Link>
              </li>
              <li>
                <Link href="/hours-worked-calculator" className="hover:text-accent transition-colors">
                  Hours Worked & Decimals
                </Link>
              </li>
              <li>
                <Link href="/overtime-calculator/california" className="hover:text-accent transition-colors">
                  California Daily Overtime
                </Link>
              </li>
              <li>
                <Link href="/overtime-calculator/ontario" className="hover:text-accent transition-colors">
                  Ontario ESA 44-Hour Overtime
                </Link>
              </li>
              <li>
                <Link href="/overtime-calculator/australia-fair-work" className="hover:text-accent transition-colors">
                  Australia Fair Work & Casual
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Statutory Sources */}
          <div className="space-y-3">
            <h3 className="font-semibold text-white uppercase tracking-wider text-xs font-mono">
              Labor Standards
            </h3>
            <ul className="space-y-2 text-muted text-xs">
              <li>
                <a
                  href="https://www.dol.gov/agencies/whd/flsa"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  U.S. Fair Labor Standards Act (FLSA) ↗
                </a>
              </li>
              <li>
                <a
                  href="https://www.dir.ca.gov/dlse/faq_overtime.htm"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  California Labor Code § 510 ↗
                </a>
              </li>
              <li>
                <a
                  href="https://www.fairwork.gov.au/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  Fair Work Ombudsman Australia ↗
                </a>
              </li>
              <li>
                <a
                  href="https://www.ontario.ca/document/your-guide-employment-standards-act-0/overtime-pay"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  Ontario Ministry of Labour (ESA) ↗
                </a>
              </li>
              <li>
                <a
                  href="https://www.employment.govt.nz/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  Employment New Zealand ↗
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Trust & Legal */}
          <div className="space-y-3">
            <h3 className="font-semibold text-white uppercase tracking-wider text-xs font-mono">
              Trust & Legal
            </h3>
            <ul className="space-y-2 text-muted">
              <li>
                <Link href="/about" className="hover:text-accent transition-colors">
                  About & Methodology
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-accent transition-colors">
                  Contact Support
                </Link>
              </li>
              <li>
                <Link href="/privacy-policy" className="hover:text-accent transition-colors">
                  Privacy Policy (CCPA/GDPR)
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-accent transition-colors">
                  Terms of Service & Disclaimer
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Statutory Disclaimer & Bottom Bar */}
        <div className="pt-8 border-t border-border/60 flex flex-col space-y-4">
          <div className="p-4 rounded-xl bg-surface2/60 border border-border/80 text-xs text-muted leading-relaxed">
            <span className="font-semibold text-gray-200">Statutory Legal & Payroll Disclaimer: </span>
            This tool provides mathematical estimates based on statutory labor standards and is not formal legal, accounting, tax, or payroll advice. Wage thresholds, overtime exemptions, collective bargaining agreements, meal break penalty entitlements, and local municipal ordinances (e.g., San Francisco, Seattle, or New York City wage rules) may alter employee compensation obligations. Always verify specific payroll deductions and classifications with a certified public accountant (CPA) or labor employment attorney.
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted">
            <p>© {new Date().getFullYear()} GridSnap Work Tools. All rights reserved.</p>
            <div className="flex gap-4">
              <Link href="/privacy-policy" className="hover:underline">
                Privacy
              </Link>
              <span>•</span>
              <Link href="/terms" className="hover:underline">
                Terms
              </Link>
              <span>•</span>
              <Link href="/contact" className="hover:underline">
                support@gridsnap.studio
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
