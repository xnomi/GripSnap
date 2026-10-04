import type { Metadata } from 'next';
import Link from 'next/link';

const BASE = 'https://gridsnap.studio';

export const metadata: Metadata = {
  title: 'About GridSnap Work Tools | Editorial Standards & Calculation Methodology',
  description:
    'Learn about GridSnap Work Tools: our engineering standards, editorial board, statutory labor data sources, and client-side privacy architecture.',
  alternates: {
    canonical: `${BASE}/about`,
  },
  openGraph: {
    title: 'About GridSnap Work Tools | Editorial Standards & Methodology',
    description:
      'Learn about our engineering principles, statutory compliance verification, and editorial review standards for Tier-1 wage and overtime tools.',
    url: `${BASE}/about`,
    siteName: 'GridSnap Work Tools',
    locale: 'en_US',
    type: 'website',
  },
};

export default function AboutPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    name: 'About GridSnap Work Tools',
    url: `${BASE}/about`,
    description:
      'Editorial standards, statutory labor verification methodology, and company background for GridSnap Work Tools.',
    mainEntity: {
      '@type': 'Organization',
      name: 'GridSnap Work Tools',
      url: BASE,
      logo: `${BASE}/icon.svg`,
      founder: 'GridSnap Work Tools Editorial & Engineering Board',
      foundingDate: '2024',
      knowsAbout: [
        'U.S. Fair Labor Standards Act (FLSA)',
        'California Labor Code Section 510',
        'Ontario Employment Standards Act (ESA)',
        'Fair Work Act 2009 (Australia)',
        'Employment Relations Act 2000 (New Zealand)',
        'Payroll Mathematics & Decimal Time Tracking',
      ],
    },
  };

  return (
    <div className="w-full">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="max-w-4xl mx-auto px-4 py-16">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface2 border border-border text-xs font-semibold text-emerald-400 mb-4">
            <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
            E-E-A-T Editorial Profile & Standards
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight mb-4">
            About GridSnap Work Tools
          </h1>
          <p className="text-lg text-muted max-w-2xl mx-auto">
            High-precision, privacy-first wage, timesheet, and overtime calculation software engineered for workers, payroll administrators, and business owners across Tier-1 economies.
          </p>
        </div>

        <div className="space-y-12 text-muted leading-relaxed text-base">
          {/* Mission */}
          <section className="bg-surface border border-border rounded-2xl p-6 sm:p-8">
            <h2 className="text-2xl font-bold text-white mb-4">Our Purpose & Founding Mission</h2>
            <p className="mb-4">
              GridSnap Work Tools was established to address a persistent failure in online financial utilities: thin, ad-cluttered micro-calculators that run inaccurate mathematical formulas, sell or store sensitive user timesheet inputs on remote databases, or fail to adhere to regional labor statutes.
            </p>
            <p>
              We believe that every hourly employee, independent contractor, trade worker, and small enterprise payroll manager deserves <strong>flawless, immediate, and 100% private mathematical tooling</strong> without mandatory user registration, paywalls, or privacy compromises.
            </p>
          </section>

          {/* Core Principles */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-6">Our Three Core Architectural Pillars</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-surface2/60 border border-border rounded-xl p-5">
                <div className="text-2xl mb-2">🔒</div>
                <h3 className="font-bold text-white text-lg mb-2">Client-Side Privacy</h3>
                <p className="text-sm text-muted">
                  All calculation logic runs purely on your device using client-side JavaScript. Timesheet entries, hourly wages, and shift punch logs are stored in your browser’s local storage and never transmitted to our servers.
                </p>
              </div>

              <div className="bg-surface2/60 border border-border rounded-xl p-5">
                <div className="text-2xl mb-2">⚖️</div>
                <h3 className="font-bold text-white text-lg mb-2">Statutory Rigor</h3>
                <p className="text-sm text-muted">
                  Our calculation engines are not generic calculators. They are hard-coded to mirror exact statutory frameworks: U.S. FLSA, California Labor Code § 510, Ontario ESA 2000, and Australian Modern Awards.
                </p>
              </div>

              <div className="bg-surface2/60 border border-border rounded-xl p-5">
                <div className="text-2xl mb-2">⚡</div>
                <h3 className="font-bold text-white text-lg mb-2">Mobile-First Touch</h3>
                <p className="text-sm text-muted">
                  Engineered with 48px touch targets, responsive card rows, sticky bottom summaries, and instant CSV/PDF export so shift workers can log hours directly on mobile phones at the job site.
                </p>
              </div>
            </div>
          </section>

          {/* Statutory Verification & Editorial Sources */}
          <section className="bg-surface border border-border rounded-2xl p-6 sm:p-8">
            <h2 className="text-2xl font-bold text-white mb-4">Statutory Data Sources & Legal Reference Authorities</h2>
            <p className="mb-6">
              Our calculation engines and educational documentation are systematically cross-referenced against authoritative governmental bodies and statutory employment codes:
            </p>

            <div className="space-y-4 text-sm">
              <div className="p-4 rounded-xl bg-surface2 border border-border/80">
                <div className="font-semibold text-white">United States (Federal)</div>
                <div className="text-xs text-emerald-400 font-mono mt-0.5">U.S. Department of Labor (DOL) • Wage and Hour Division (WHD)</div>
                <p className="text-muted mt-2">
                  Governed by the Fair Labor Standards Act of 1938 (29 U.S.C. § 201 et seq.) and Title 29 of the Code of Federal Regulations, specifically Part 778 (Overtime Compensation) and Part 785 (Hours Worked).
                </p>
              </div>

              <div className="p-4 rounded-xl bg-surface2 border border-border/80">
                <div className="font-semibold text-white">State of California</div>
                <div className="text-xs text-emerald-400 font-mono mt-0.5">California Department of Industrial Relations (DIR) • Labor Commissioner&apos;s Office</div>
                <p className="text-muted mt-2">
                  Governed by California Labor Code Section 510 (Day&apos;s work; overtime compensation) and Industrial Welfare Commission (IWC) Wage Orders 1 through 17 governing daily overtime, double time, and meal period compliance.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-surface2 border border-border/80">
                <div className="font-semibold text-white">Commonwealth of Australia</div>
                <div className="text-xs text-emerald-400 font-mono mt-0.5">Fair Work Ombudsman (FWO) • Fair Work Commission (FWC)</div>
                <p className="text-muted mt-2">
                  Governed by the Fair Work Act 2009 (Cth), the 11 National Employment Standards (NES), statutory 25% casual loading provisions, and industry Modern Award determinations.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-surface2 border border-border/80">
                <div className="font-semibold text-white">Province of Ontario (Canada)</div>
                <div className="text-xs text-emerald-400 font-mono mt-0.5">Ontario Ministry of Labour, Immigration, Training and Skills Development</div>
                <p className="text-muted mt-2">
                  Governed by the Employment Standards Act, 2000 (S.O. 2000, c. 41), specifically Part VIII (Overtime Pay, Section 22 44-hour threshold) and Ontario Regulation 285/01 (Exemptions).
                </p>
              </div>
            </div>
          </section>

          {/* Editorial Review & Update Cycle */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">Editorial Verification & Revision Schedule</h2>
            <p>
              All mathematical algorithms and educational guides on GridSnap are maintained by our technical engineering and payroll compliance editorial board. When statutory wage thresholds, minimum wages, or overtime regulations are adjusted by legislative amendment (e.g., annual Fair Work Annual Wage Reviews or California DIR minimum wage indexations), our software rules are updated within <strong>72 hours of statutory enactment</strong>.
            </p>
            <p className="mt-3">
              Each calculation module undergoes regression unit testing against dozens of complex real-world shift scenarios, including overnight shifts crossing midnight, irregular lunch punch increments, alternative workweek schedules, and statutory holiday penalty tiers.
            </p>
          </section>

          {/* Contact & Transparency */}
          <section className="bg-surface2/40 border border-border rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div>
              <h3 className="font-bold text-white text-lg mb-1">Have a Statutory Question or Feedback?</h3>
              <p className="text-sm text-muted">
                Our editorial and technical team welcomes inquiries, bug reports, and suggestions for new regional calculators.
              </p>
            </div>
            <div className="flex shrink-0 gap-3">
              <Link
                href="/contact"
                className="px-6 py-3 bg-gradient text-gray-950 font-bold rounded-xl text-sm shadow-md hover:opacity-90 transition-opacity"
              >
                Contact Editorial Team
              </Link>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
