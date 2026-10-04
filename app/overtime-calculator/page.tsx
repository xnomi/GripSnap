import type { Metadata } from 'next';
import OvertimeHubCalculator from '@/components/OvertimeHubCalculator';
import FaqAccordion from '@/components/FaqAccordion';
import Link from 'next/link';

const BASE = 'https://gridsnap.studio';

export const metadata: Metadata = {
  title: 'Overtime Calculator | Multi-Tier Wage & Overtime Hub (US, CA, AU, NZ)',
  description:
    'Calculate overtime wages across Tier-1 jurisdictions. Compare US 40-hour FLSA rules, California daily & double time, Ontario ESA 44-hour threshold, and Australian Modern Awards.',
  alternates: {
    canonical: `${BASE}/overtime-calculator`,
  },
  openGraph: {
    title: 'Overtime Calculator | Multi-Tier Wage & Overtime Hub',
    description:
      'Multi-jurisdiction overtime calculator comparing US, California, Ontario, and Australian labor standards.',
    url: `${BASE}/overtime-calculator`,
    siteName: 'GridSnap Work Tools',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Overtime Calculator | Multi-Tier Wage & Overtime Hub',
    description: 'Calculate overtime pay across US, California, Ontario, and Australia.',
  },
};

const hubFaqs = [
  {
    question: 'How do overtime thresholds compare between the US, Canada, and Australia?',
    answer:
      'In the United States, the federal FLSA mandates overtime at 1.5x after 40 hours worked in a 7-day workweek, with states like California additionally requiring daily overtime after 8 hours and double time after 12 hours. In Ontario, Canada, the statutory threshold under the Employment Standards Act is 44 hours per week at 1.5x. In Australia, the standard full-time week is 38 hours under Fair Work Modern Awards, with escalating overtime tiers (1.5x for the first two hours and 2.0x thereafter) and 25% casual loading for non-permanent staff.',
  },
  {
    question: 'Can employers average overtime across a two-week pay period to avoid paying overtime?',
    answer:
      'Under U.S. federal law (FLSA 29 CFR § 778.104), employers cannot average hours across weeks; each 7-day workweek stands alone. In Ontario, Canada, employers may only average hours if they possess a valid, written averaging agreement signed by the employee under ESA Section 22. In Australia, roster averaging is permitted only when strictly contemplated within the terms of the applicable Modern Award or Enterprise Agreement.',
  },
  {
    question: 'What is the difference between exempt and non-exempt employees?',
    answer:
      'Non-exempt employees are legally entitled to statutory overtime pay when working beyond designated daily or weekly thresholds. Exempt employees (typically executives, administrative managers, or licensed professionals earning above statutory salary thresholds, such as $66,560 in California or $43,888 federally under FLSA) are not eligible for overtime compensation, provided their primary job duties satisfy statutory exemption tests.',
  },
  {
    question: 'How does New Zealand handle overtime pay?',
    answer:
      'Under New Zealand employment law (Employment Relations Act 2000), there is no statutory overtime rate mandated by general law; the legal maximum workweek is 40 hours (exclusive of overtime) unless agreed otherwise. However, overtime pay (commonly 1.5x regular pay) is established through individual employment agreements, collective agreements, or industry custom, and must comply with the Minimum Wage Act and Holidays Act 2003.',
  },
];

export default function OvertimeHubPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebApplication',
        name: 'GridSnap Multi-Tier Overtime Calculator Hub',
        url: `${BASE}/overtime-calculator`,
        applicationCategory: 'BusinessApplication',
        operatingSystem: 'All',
        browserRequirements: 'Requires JavaScript. Runs client-side.',
        description:
          'Universal multi-tier overtime calculator for US FLSA, California Daily, Ontario ESA, and Australia Fair Work Modern Awards.',
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: BASE,
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Overtime Calculator',
            item: `${BASE}/overtime-calculator`,
          },
        ],
      },
      {
        '@type': 'FAQPage',
        mainEntity: hubFaqs.map((f) => ({
          '@type': 'Question',
          name: f.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: f.answer,
          },
        })),
      },
    ],
  };

  return (
    <div className="w-full">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <section className="w-full pt-10 pb-6 px-4 max-w-7xl mx-auto">
        {/* Breadcrumb Navigation */}
        <nav className="no-print flex items-center gap-2 text-xs text-muted mb-4 max-w-5xl mx-auto">
          <Link href="/" className="hover:text-white">Home</Link>
          <span>/</span>
          <span className="text-emerald-400 font-medium">Overtime Calculator Hub</span>
        </nav>

        {/* Hero Header */}
        <div className="text-center max-w-3xl mx-auto mb-8">
          <div className="no-print inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface2 border border-border text-xs font-semibold text-emerald-400 mb-4">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            Tier-1 Statutory Wage & Overtime Engine
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Multi-Tier Overtime Calculator Hub
          </h1>
          <p className="mt-3 text-base sm:text-lg text-muted leading-relaxed">
            Select your country or state jurisdiction to accurately compute statutory regular, overtime (1.5x), and double-time (2.0x) gross wages.
          </p>
        </div>

        {/* Interactive Multi-Tier Calculator */}
        <div className="max-w-5xl mx-auto">
          <OvertimeHubCalculator />
        </div>
      </section>

      {/* ── Editorial Section: International Overtime Comparison (AdSense & E-E-A-T) ── */}
      <section className="w-full py-12 px-4 bg-surface/40 border-t border-border no-print">
        <div className="max-w-4xl mx-auto space-y-12">
          {/* Direct Answer */}
          <div className="p-6 sm:p-8 rounded-2xl bg-surface2/70 border border-emerald-500/30 shadow-lg">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-400 mb-2">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Direct Answer • Multi-Tier Overtime Overview
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white mb-3">
              How do overtime rules vary by country and jurisdiction?
            </h2>
            <p className="text-base sm:text-lg text-gray-200 leading-relaxed font-medium">
              Overtime rules vary significantly by jurisdiction: the U.S. federal FLSA requires 1.5x after 40 weekly hours, while California adds daily overtime (1.5x after 8h, 2.0x after 12h, and 7th day rules). Canada’s Ontario ESA sets a 44-hour weekly threshold at 1.5x, and Australia’s Fair Work system operates on a 38-hour standard week with 25% casual loading, escalating overtime tiers (1.5x first 2h, then 2.0x), and weekend penalty rates.
            </p>
          </div>

          <article className="prose prose-invert max-w-none text-muted leading-relaxed space-y-8">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
                Comparative Jurisdictional Analysis: Tier-1 Labor Standards
              </h2>
              <p>
                Wage calculations across international payroll environments require strict adherence to local statutory thresholds. A single, one-size-fits-all calculation formula cannot legally accommodate the diverse labor laws of the United States, Canada, Australia, and New Zealand.
              </p>
            </div>

            {/* Jurisdiction Comparison Matrix Table */}
            <div>
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-3">
                Jurisdictional Overtime Comparison Matrix
              </h3>
              <div className="overflow-x-auto rounded-xl border border-border bg-surface2">
                <table className="w-full text-left text-sm">
                  <thead className="bg-surface3/50 text-white font-semibold border-b border-border text-xs uppercase tracking-wider">
                    <tr>
                      <th className="py-3 px-4">Jurisdiction</th>
                      <th className="py-3 px-4">Standard Workweek</th>
                      <th className="py-3 px-4">Overtime Rate</th>
                      <th className="py-3 px-4">Daily Overtime Mandated?</th>
                      <th className="py-3 px-4">Statute</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border/60 text-gray-300 font-mono text-xs">
                    <tr>
                      <td className="py-2.5 px-4 font-sans text-white font-semibold">US Federal (FLSA)</td>
                      <td className="py-2.5 px-4">40 Hours</td>
                      <td className="py-2.5 px-4 text-emerald-400">1.5x regular pay</td>
                      <td className="py-2.5 px-4 font-sans text-muted">No (Weekly only)</td>
                      <td className="py-2.5 px-4 font-sans text-muted">29 U.S.C. § 207</td>
                    </tr>
                    <tr>
                      <td className="py-2.5 px-4 font-sans text-white font-semibold">California (State)</td>
                      <td className="py-2.5 px-4">40 Hours</td>
                      <td className="py-2.5 px-4 text-emerald-400">1.5x & 2.0x Double</td>
                      <td className="py-2.5 px-4 font-sans text-emerald-400 font-bold">Yes (&gt;8h 1.5x, &gt;12h 2x)</td>
                      <td className="py-2.5 px-4 font-sans text-muted">CA Labor Code § 510</td>
                    </tr>
                    <tr>
                      <td className="py-2.5 px-4 font-sans text-white font-semibold">Ontario, Canada</td>
                      <td className="py-2.5 px-4">44 Hours</td>
                      <td className="py-2.5 px-4 text-emerald-400">1.5x regular wage</td>
                      <td className="py-2.5 px-4 font-sans text-muted">No (Weekly only)</td>
                      <td className="py-2.5 px-4 font-sans text-muted">ESA 2000, Part VIII</td>
                    </tr>
                    <tr>
                      <td className="py-2.5 px-4 font-sans text-white font-semibold">Australia (Fair Work)</td>
                      <td className="py-2.5 px-4">38 Hours</td>
                      <td className="py-2.5 px-4 text-emerald-400">1.5x first 2h, then 2.0x</td>
                      <td className="py-2.5 px-4 font-sans text-amber-400 font-semibold">Varies by Modern Award</td>
                      <td className="py-2.5 px-4 font-sans text-muted">Fair Work Act 2009</td>
                    </tr>
                    <tr>
                      <td className="py-2.5 px-4 font-sans text-white font-semibold">New Zealand</td>
                      <td className="py-2.5 px-4">40 Hours</td>
                      <td className="py-2.5 px-4 text-emerald-400">Contractual / 1.5x typical</td>
                      <td className="py-2.5 px-4 font-sans text-muted">Determined by contract</td>
                      <td className="py-2.5 px-4 font-sans text-muted">Employment Relations Act</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Deep-dive Regional Links Cards */}
            <div>
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-3">
                Explore Dedicated Jurisdiction Calculators
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 not-prose my-4">
                <Link
                  href="/overtime-calculator/california"
                  className="p-5 rounded-xl bg-surface2 border border-border hover:border-emerald-500/50 transition-colors block"
                >
                  <div className="text-emerald-400 font-bold text-base mb-1">California Overtime →</div>
                  <p className="text-xs text-muted">
                    Dedicated daily calculator with double time, 7th consecutive day overtime, and IWC meal break penalty rules.
                  </p>
                </Link>

                <Link
                  href="/overtime-calculator/ontario"
                  className="p-5 rounded-xl bg-surface2 border border-border hover:border-emerald-500/50 transition-colors block"
                >
                  <div className="text-emerald-400 font-bold text-base mb-1">Ontario ESA Overtime →</div>
                  <p className="text-xs text-muted">
                    Calculates Ontario 44-hour weekly overtime thresholds, written averaging agreements, and statutory holiday premiums.
                  </p>
                </Link>

                <Link
                  href="/overtime-calculator/australia-fair-work"
                  className="p-5 rounded-xl bg-surface2 border border-border hover:border-emerald-500/50 transition-colors block"
                >
                  <div className="text-emerald-400 font-bold text-base mb-1">Australia Fair Work →</div>
                  <p className="text-xs text-muted">
                    Engineered for Modern Awards with 25% casual loading, escalating overtime tiers, weekend penalties, and 11.5% superannuation.
                  </p>
                </Link>
              </div>
            </div>

            {/* Disclaimer */}
            <div className="p-4 rounded-xl bg-surface2/60 border border-border text-xs text-muted leading-relaxed">
              <strong className="text-gray-200">Statutory Labor Disclaimer: </strong>
              This tool provides mathematical estimates based on statutory labor standards and is not formal legal, accounting, or payroll advice. Always cross-reference your specific calculation with certified payroll specialists or regional labor enforcement agencies.
            </div>
          </article>

          {/* FAQ */}
          <div className="pt-8 border-t border-border">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">
              Frequently Asked Questions (FAQ)
            </h2>
            <FaqAccordion items={hubFaqs} />
          </div>
        </div>
      </section>
    </div>
  );
}
