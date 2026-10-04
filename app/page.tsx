import type { Metadata } from 'next';
import TimeCardCalculator from '@/components/TimeCardCalculator';
import FaqAccordion from '@/components/FaqAccordion';
import Link from 'next/link';

const BASE = 'https://gridsnap.studio';

export const metadata: Metadata = {
  title: 'Time Card Calculator with Lunch Breaks | Free Hours & Pay Tracker',
  description:
    'Calculate your weekly and biweekly work hours, unpaid lunch breaks, overtime, and gross hourly pay with our free, private time card calculator. Export to PDF & CSV.',
  alternates: {
    canonical: BASE,
  },
  openGraph: {
    title: 'Time Card Calculator with Lunch Breaks | Free Hours & Pay Tracker',
    description:
      'Free, client-side weekly and biweekly work hours, lunch break deductions, overtime, and gross pay calculator with instant PDF/CSV export.',
    url: BASE,
    siteName: 'GridSnap Work Tools',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Time Card Calculator with Lunch Breaks | Free Hours & Pay Tracker',
    description: 'Calculate work hours and overtime with instant PDF/CSV export.',
  },
};

const faqs = [
  {
    question: 'How do you calculate total hours worked with lunch breaks deducted?',
    answer:
      'To calculate total hours worked with lunch deductions, first convert your shift start and end times into military (24-hour) decimal format. Subtract the start time from the end time to determine raw elapsed time. Next, convert your unpaid lunch break into decimal hours (for example, 30 minutes equals 0.5 hours, and 45 minutes equals 0.75 hours) and subtract it from the elapsed time. Finally, multiply the remaining regular hours (up to 40 per week under FLSA) by your base hourly rate, and multiply any overtime hours by 1.5 times your rate to determine total gross pay.',
  },
  {
    question: 'Does federal law require employers to provide paid lunch breaks?',
    answer:
      'Under the U.S. Fair Labor Standards Act (FLSA), federal law does not mandate that employers provide meal or rest breaks. However, federal regulations stipulate that if an employer offers a bona fide meal break (usually 30 minutes or longer), the employee must be completely relieved of all work duties for the break to be unpaid. If the employee is required to perform any active or inactive duties during lunch—such as answering phones or monitoring equipment—the entire break must be paid as hours worked.',
  },
  {
    question: 'How does overtime work on a biweekly pay schedule?',
    answer:
      'Under FLSA regulations (29 CFR § 778.104), overtime cannot be averaged across two weeks of a biweekly pay period. Each standard workweek stands alone as a fixed 7-consecutive-day period (168 hours). If a non-exempt employee works 48 hours in Week 1 and 32 hours in Week 2 (totaling 80 hours across the pay period), the employer is legally obligated to pay 8 hours of overtime for Week 1 at 1.5x regular pay. The employer cannot average the two weeks to avoid overtime liability.',
  },
  {
    question: 'What is the standard formula to convert work minutes into payroll decimals?',
    answer:
      'To convert minutes into payroll decimal hours, divide the exact number of minutes by 60. For example: 15 minutes ÷ 60 = 0.25 hours; 30 minutes ÷ 60 = 0.50 hours; 45 minutes ÷ 60 = 0.75 hours. Many payroll systems also utilize the FLSA 7-minute rounding rule (29 CFR § 785.48(b)), where punches between 1 and 7 minutes round down to the nearest 15-minute quarter-hour, and punches between 8 and 14 minutes round up to the nearest quarter-hour.',
  },
  {
    question: 'Is my timesheet and payroll data kept private on GridSnap?',
    answer:
      'Yes. GridSnap operates 100% client-side in your web browser using HTML5 LocalStorage. None of your entered work hours, shift schedules, hourly wage rates, employee identities, or gross pay totals are ever transmitted to, processed by, or stored on remote web servers.',
  },
];

export default function HomePage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebApplication',
        name: 'GridSnap Time Card & Wage Calculator',
        url: BASE,
        applicationCategory: 'BusinessApplication',
        operatingSystem: 'All',
        browserRequirements: 'Requires JavaScript. Runs client-side.',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD',
        },
        description:
          'Free client-side weekly and biweekly time card calculator with unpaid lunch break deductions, overtime calculations, CSV export, and PDF printable timesheets.',
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
            name: 'Time Card Calculator',
            item: BASE,
          },
        ],
      },
      {
        '@type': 'FAQPage',
        mainEntity: faqs.map((f) => ({
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

      {/* Hero Section */}
      <section className="w-full pt-10 pb-6 px-4 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-8">
          <div className="no-print inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface2 border border-border text-xs font-semibold text-emerald-400 mb-4">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            Private Client-Side Calculator • Zero Server Data Storage
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Free Time Card Calculator with Lunch Breaks
          </h1>
          <p className="mt-3 text-base sm:text-lg text-muted leading-relaxed">
            Track weekly and biweekly work hours, deduct unpaid lunch breaks, compute FLSA overtime, and estimate gross hourly pay. Export ready-to-file timesheets to PDF and CSV instantly.
          </p>
        </div>

        {/* Interactive Tool Component */}
        <div className="max-w-5xl mx-auto">
          <TimeCardCalculator />
        </div>
      </section>

      {/* ── Editorial & Educational Content (AdSense & E-E-A-T Compliant) ── */}
      <section className="w-full py-12 px-4 bg-surface/40 border-t border-border no-print">
        <div className="max-w-4xl mx-auto space-y-12">
          {/* Direct AEO / GEO Answer Block */}
          <div className="p-6 sm:p-8 rounded-2xl bg-surface2/70 border border-emerald-500/30 shadow-lg">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-400 mb-2">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Direct Answer • Executive Summary
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white mb-3">
              How to calculate total hours worked with lunch deductions?
            </h2>
            <p className="text-base sm:text-lg text-gray-200 leading-relaxed font-medium">
              To calculate total hours worked, subtract your start time from your end time in 24-hour decimal format, then subtract your unpaid lunch break in decimal minutes (e.g., 30 minutes = 0.5 hours). Multiply the remaining regular hours by your base wage, and hours over 40 by 1.5 for overtime gross pay.
            </p>
          </div>

          {/* Educational Copy: In-depth FLSA, Lunch, and Overtime Guide */}
          <article className="prose prose-invert max-w-none text-muted leading-relaxed space-y-8">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
                Complete Guide to Work Hours, Lunch Break Deductions & Overtime Rules
              </h2>
              <p>
                Accurate time tracking is the cornerstone of fair compensation and payroll compliance across all Tier-1 economies, including the United States, Canada, Australia, and New Zealand. Whether you are an hourly employee auditing your paycheck, an independent contractor submitting an invoice, or a small business manager running weekly payroll, understanding how shift punch times translate into decimal hours and statutory overtime is critical.
              </p>
              <p>
                In the United States, the primary governing statute is the federal <strong>Fair Labor Standards Act (FLSA)</strong>, enforced by the Wage and Hour Division (WHD) of the U.S. Department of Labor. The FLSA sets baseline requirements for minimum wage, overtime pay, recordkeeping, and youth employment standards for non-exempt workers.
              </p>
            </div>

            {/* Quick Reference Table: Minutes to Decimal Hours */}
            <div>
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-3">
                Quick-Reference: Minutes to Payroll Decimal Hours Conversion
              </h3>
              <p className="text-sm mb-4">
                Because traditional clocks track time in base-60 (60 minutes per hour) while financial payroll systems operate in base-100 (decimals), minutes must be converted prior to calculating gross wages. The table below outlines the standard decimal equivalents used by ADP, Paychex, QuickBooks, and federal payroll auditors:
              </p>

              <div className="overflow-x-auto rounded-xl border border-border bg-surface2">
                <table className="w-full text-left text-sm">
                  <thead className="bg-surface3/50 text-white font-semibold border-b border-border text-xs uppercase tracking-wider">
                    <tr>
                      <th className="py-3 px-4">Minutes</th>
                      <th className="py-3 px-4">Decimal Equivalent</th>
                      <th className="py-3 px-4">Fraction of Hour</th>
                      <th className="py-3 px-4">FLSA 7-Minute Rounding Interval</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border/60 text-gray-300 font-mono">
                    <tr>
                      <td className="py-2.5 px-4">5 mins</td>
                      <td className="py-2.5 px-4 text-emerald-400 font-bold">0.08 hrs</td>
                      <td className="py-2.5 px-4">1/12 hour</td>
                      <td className="py-2.5 px-4 font-sans text-xs text-muted">Rounds to 0.00h (if between 1–7m)</td>
                    </tr>
                    <tr>
                      <td className="py-2.5 px-4">15 mins</td>
                      <td className="py-2.5 px-4 text-emerald-400 font-bold">0.25 hrs</td>
                      <td className="py-2.5 px-4">1/4 hour</td>
                      <td className="py-2.5 px-4 font-sans text-xs text-muted">Rounds to 0.25h (if between 8–22m)</td>
                    </tr>
                    <tr>
                      <td className="py-2.5 px-4">30 mins</td>
                      <td className="py-2.5 px-4 text-emerald-400 font-bold">0.50 hrs</td>
                      <td className="py-2.5 px-4">1/2 hour</td>
                      <td className="py-2.5 px-4 font-sans text-xs text-muted">Standard unpaid meal break interval</td>
                    </tr>
                    <tr>
                      <td className="py-2.5 px-4">45 mins</td>
                      <td className="py-2.5 px-4 text-emerald-400 font-bold">0.75 hrs</td>
                      <td className="py-2.5 px-4">3/4 hour</td>
                      <td className="py-2.5 px-4 font-sans text-xs text-muted">Rounds to 0.75h (if between 38–52m)</td>
                    </tr>
                    <tr>
                      <td className="py-2.5 px-4">60 mins</td>
                      <td className="py-2.5 px-4 text-emerald-400 font-bold">1.00 hrs</td>
                      <td className="py-2.5 px-4">Full hour</td>
                      <td className="py-2.5 px-4 font-sans text-xs text-muted">Standard 60-minute shift block</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Statutory Lunch Break Rules */}
            <div>
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-3">
                Federal vs. State Meal & Lunch Break Regulations
              </h3>
              <p>
                One of the most frequent sources of wage litigation is the improper deduction of lunch breaks. Under federal law (29 CFR § 785.19), <strong>bona fide meal periods</strong> are not considered work time and are not compensable if the following strict conditions are met:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-300">
                <li>
                  <strong>Complete Relief from Duty:</strong> The employee must be completely relieved from all duties, whether active or inactive. An office worker required to eat lunch at their desk while monitoring incoming customer phone calls has not received a bona fide meal break, and all 30 or 60 minutes must be paid.
                </li>
                <li>
                  <strong>Duration Threshold:</strong> Bona fide meal periods ordinarily must last at least 30 minutes. Rest periods of short duration—running from 5 minutes to about 20 minutes—are customary in industry, promote employee efficiency, and must be counted as compensable hours worked under federal law.
                </li>
                <li>
                  <strong>State-Specific Mandates:</strong> While federal law does not mandate meal breaks, over 20 states enforce explicit statutory meal break requirements. For example, California Labor Code § 512 mandates a 30-minute unpaid meal period before the end of the 5th hour of work; failure to provide it triggers a statutory penalty of one additional hour of pay at the regular rate.
                </li>
              </ul>
            </div>

            {/* Overtime Calculations: FLSA Standards & Biweekly Rules */}
            <div>
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-3">
                How Federal Overtime is Calculated: The 40-Hour Workweek Rule
              </h3>
              <p>
                Unless exempt under the executive, administrative, professional, or outside sales exemptions, non-exempt employees covered by the FLSA must receive overtime pay for all hours worked over 40 in a workweek at a rate not less than <strong>one and one-half times (1.5x)</strong> their regular rate of pay.
              </p>
              <div className="bg-surface2 p-6 rounded-xl border border-border space-y-3 font-mono text-sm">
                <div className="text-emerald-400 font-bold font-sans text-base">Mathematical Formula:</div>
                <div>Regular Pay = Regular Hours (up to 40) × Base Hourly Wage</div>
                <div>Overtime Pay = Overtime Hours (Hours &gt; 40) × (Base Hourly Wage × 1.5)</div>
                <div>Total Gross Pay = Regular Pay + Overtime Pay</div>
              </div>
              <p className="mt-4">
                <strong>Worked Example:</strong> If an hourly construction employee earning $25.00/hour works 48 hours in a standard Monday-to-Sunday workweek with a 30-minute daily lunch break deducted:
              </p>
              <ul className="list-disc pl-6 space-y-1 text-gray-300">
                <li>Regular Hours: 40.0 hours × $25.00/hr = $1,000.00</li>
                <li>Overtime Hours: 8.0 hours × ($25.00 × 1.5 = $37.50/hr) = $300.00</li>
                <li>Total Weekly Gross Earnings = $1,300.00 (prior to FICA, Medicare, federal, and state withholdings).</li>
              </ul>
            </div>

            {/* Regional Nuances: California, Ontario, Australia */}
            <div>
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-3">
                Regional Jurisdictional Variations (US, Canada, Australia)
              </h3>
              <p>
                While the federal FLSA sets a 40-hour weekly threshold without daily overtime limits, regional jurisdictions enforce stricter labor codes:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 not-prose my-6">
                <Link
                  href="/overtime-calculator/california"
                  className="p-4 rounded-xl bg-surface2 border border-border hover:border-emerald-500/50 transition-colors block group"
                >
                  <div className="text-emerald-400 font-bold text-base group-hover:underline">
                    California Daily Overtime →
                  </div>
                  <p className="text-xs text-muted mt-2">
                    Enforces 1.5x after 8 hours in a workday, 2.0x Double Time after 12 hours, and special 7th consecutive day wage multipliers.
                  </p>
                </Link>

                <Link
                  href="/overtime-calculator/ontario"
                  className="p-4 rounded-xl bg-surface2 border border-border hover:border-emerald-500/50 transition-colors block group"
                >
                  <div className="text-emerald-400 font-bold text-base group-hover:underline">
                    Ontario Overtime (ESA) →
                  </div>
                  <p className="text-xs text-muted mt-2">
                    Employment Standards Act sets overtime at 1.5x after 44 hours per week, with statutory averaging agreement provisions.
                  </p>
                </Link>

                <Link
                  href="/overtime-calculator/australia-fair-work"
                  className="p-4 rounded-xl bg-surface2 border border-border hover:border-emerald-500/50 transition-colors block group"
                >
                  <div className="text-emerald-400 font-bold text-base group-hover:underline">
                    Australia Fair Work Awards →
                  </div>
                  <p className="text-xs text-muted mt-2">
                    Governed by 38-hour workweeks, 25% statutory casual loading, escalating overtime tiers, and weekend penalty rates.
                  </p>
                </Link>
              </div>
            </div>

            {/* Legal Disclaimer */}
            <div className="p-4 rounded-xl bg-surface2/60 border border-border text-xs text-muted leading-relaxed">
              <strong className="text-gray-200">Statutory Compliance Disclaimer: </strong>
              This tool provides mathematical calculations based on standardized labor guidelines. It does not account for specific collective bargaining agreements (CBAs), fluctuating workweek methods (salaried non-exempt half-time), alternative workweek schedules (e.g., California 4x10 schedules approved by 2/3 secret ballot vote), or industry-specific exemptions (e.g., agriculture, interstate motor carriers). Consult a licensed labor attorney or CPA for certified payroll verification.
            </div>
          </article>

          {/* FAQ Section */}
          <div className="pt-8 border-t border-border">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">
              Frequently Asked Questions (FAQ)
            </h2>
            <FaqAccordion items={faqs} />
          </div>
        </div>
      </section>
    </div>
  );
}
