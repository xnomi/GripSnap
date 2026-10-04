import type { Metadata } from 'next';
import CaliforniaOvertimeCalculator from '@/components/CaliforniaOvertimeCalculator';
import FaqAccordion from '@/components/FaqAccordion';
import Link from 'next/link';

const BASE = 'https://gridsnap.studio';

export const metadata: Metadata = {
  title: 'California Overtime Calculator | Daily Overtime & Double Time Rules',
  description:
    'Calculate California daily overtime and double-time wages accurately. Compliant with CA Labor Code Section 510: 1.5x after 8 hours and 2x after 12 hours.',
  alternates: {
    canonical: `${BASE}/overtime-calculator/california`,
  },
  openGraph: {
    title: 'California Overtime Calculator | Daily Overtime & Double Time Rules',
    description:
      'Accurate California daily overtime and double time calculator based on CA Labor Code Section 510 and IWC wage orders.',
    url: `${BASE}/overtime-calculator/california`,
    siteName: 'GridSnap Work Tools',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'California Overtime Calculator | Daily & Double Time',
    description: 'Calculate California overtime (1.5x after 8h, 2x after 12h, 7th day rules).',
  },
};

const caFaqs = [
  {
    question: 'How does California daily overtime differ from federal FLSA overtime?',
    answer:
      'Under the federal Fair Labor Standards Act (FLSA), overtime is strictly calculated on a weekly basis after 40 hours worked in a 7-day workweek; federal law does not mandate daily overtime. In contrast, California Labor Code § 510 mandates daily overtime: non-exempt employees must be paid 1.5x their regular rate for all hours worked over 8 up to 12 in a single workday, and 2.0x (Double Time) for all hours worked over 12 in a single workday, regardless of total weekly hours.',
  },
  {
    question: 'What is the California 7th consecutive day overtime rule?',
    answer:
      'Under California Labor Code § 510, if an employee works on all seven consecutive days of an employer’s designated workweek, the compensation on that 7th day is subject to premium rates: the employee is entitled to 1.5x their regular rate for the first 8 hours worked on the 7th day, and 2.0x (Double Time) for all hours worked in excess of 8 hours on that 7th day.',
  },
  {
    question: 'What is the salary threshold for overtime exemption in California?',
    answer:
      'To qualify as an exempt employee under the administrative, executive, or professional exemptions in California, an employee must meet the duties test and earn a fixed monthly salary equivalent to at least twice the state minimum wage for full-time employment (40 hours per week). With the 2024–2026 California minimum wage reaching $16.50+ per hour, the minimum annualized salary for exemption is at least $66,560 per year ($5,546.67 per month). Employees earning below this threshold remain non-exempt and legally entitled to daily overtime.',
  },
  {
    question: 'What happens if a California employer fails to provide a 30-minute lunch break?',
    answer:
      'Under California Labor Code § 226.7 and § 512, an employer must provide an uninterrupted 30-minute unpaid meal period before the end of the fifth hour of work. If the employer fails to provide the meal period or fails to relieve the employee of all duty, the employer must pay the employee one additional hour of pay at the employee’s regular rate of compensation for each workday that the meal period was not provided (known as meal break premium pay).',
  },
];

export default function CaliforniaOvertimePage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebApplication',
        name: 'GridSnap California Overtime Calculator',
        url: `${BASE}/overtime-calculator/california`,
        applicationCategory: 'BusinessApplication',
        operatingSystem: 'All',
        browserRequirements: 'Requires JavaScript. Runs client-side.',
        description:
          'California Labor Code § 510 compliant overtime calculator computing 1.5x after 8 hours, 2.0x double time after 12 hours, and 7th day rules.',
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
          {
            '@type': 'ListItem',
            position: 3,
            name: 'California',
            item: `${BASE}/overtime-calculator/california`,
          },
        ],
      },
      {
        '@type': 'FAQPage',
        mainEntity: caFaqs.map((f) => ({
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
          <Link href="/overtime-calculator" className="hover:text-white">Overtime Hub</Link>
          <span>/</span>
          <span className="text-emerald-400 font-medium">California</span>
        </nav>

        {/* Hero Header */}
        <div className="text-center max-w-3xl mx-auto mb-8">
          <div className="no-print inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface2 border border-border text-xs font-semibold text-emerald-400 mb-4">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            California Labor Code Section 510 & IWC Compliant
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
            California Daily & Weekly Overtime Calculator
          </h1>
          <p className="mt-3 text-base sm:text-lg text-muted leading-relaxed">
            Calculate accurate daily overtime (1.5x after 8 hours), double-time wages (2.0x after 12 hours), and 7th consecutive workday rates under California Labor Code § 510.
          </p>
        </div>

        {/* Interactive Tool */}
        <div className="max-w-5xl mx-auto">
          <CaliforniaOvertimeCalculator />
        </div>
      </section>

      {/* ── Editorial Section: California Overtime Laws (AdSense & E-E-A-T) ── */}
      <section className="w-full py-12 px-4 bg-surface/40 border-t border-border no-print">
        <div className="max-w-4xl mx-auto space-y-12">
          {/* Direct Answer Block */}
          <div className="p-6 sm:p-8 rounded-2xl bg-surface2/70 border border-emerald-500/30 shadow-lg">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-400 mb-2">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Direct Answer • California Labor Code 510 Summary
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white mb-3">
              How is overtime calculated in California?
            </h2>
            <p className="text-base sm:text-lg text-gray-200 leading-relaxed font-medium">
              In California, overtime is calculated on both a daily and weekly basis. Non-exempt employees receive 1.5x their regular rate for hours worked beyond 8 up to 12 in a single workday and for the first 8 hours on the 7th consecutive day of work. Double time (2.0x regular rate) applies to all hours worked beyond 12 in a single workday and beyond 8 hours on the 7th consecutive day of a workweek.
            </p>
          </div>

          <article className="prose prose-invert max-w-none text-muted leading-relaxed space-y-8">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
                Statutory Architecture of California Labor Code Section 510
              </h2>
              <p>
                California maintains some of the most robust worker protection statutes in the United States. While federal law relies on a simple 40-hour weekly threshold under the FLSA, California employers are governed by <strong>California Labor Code Section 510</strong> and the wage orders issued by the <strong>Industrial Welfare Commission (IWC)</strong>.
              </p>
              <p>
                Under Section 510(a), eight hours of labor constitutes a day’s work. Any work in excess of eight hours in one workday, any work in excess of 40 hours in any one workweek, and the first eight hours worked on the seventh day of work in any one workweek shall be compensated at the rate of no less than one and one-half times (1.5x) the regular rate of pay. Furthermore, any work in excess of 12 hours in one day, and any work in excess of eight hours on any seventh day of a workweek, must be compensated at no less than twice (2.0x) the regular rate of pay.
              </p>
            </div>

            {/* Statutory Tier Breakdown Table */}
            <div>
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-3">
                California Overtime Wage Multiplier Matrix
              </h3>
              <div className="overflow-x-auto rounded-xl border border-border bg-surface2">
                <table className="w-full text-left text-sm">
                  <thead className="bg-surface3/50 text-white font-semibold border-b border-border text-xs uppercase tracking-wider">
                    <tr>
                      <th className="py-3 px-4">Threshold Condition</th>
                      <th className="py-3 px-4">Multiplier</th>
                      <th className="py-3 px-4">Statutory Basis</th>
                      <th className="py-3 px-4">Example ($30.00/hr Base)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border/60 text-gray-300 font-mono">
                    <tr>
                      <td className="py-2.5 px-4 font-sans text-white">Up to 8 hours in a workday</td>
                      <td className="py-2.5 px-4 text-emerald-400 font-bold">1.0x (Regular)</td>
                      <td className="py-2.5 px-4 font-sans text-xs text-muted">CA Labor Code § 510</td>
                      <td className="py-2.5 px-4">$30.00 / hr</td>
                    </tr>
                    <tr>
                      <td className="py-2.5 px-4 font-sans text-white">Over 8 hrs up to 12 hrs in a workday</td>
                      <td className="py-2.5 px-4 text-amber-400 font-bold">1.5x (Daily Overtime)</td>
                      <td className="py-2.5 px-4 font-sans text-xs text-muted">CA Labor Code § 510</td>
                      <td className="py-2.5 px-4">$45.00 / hr</td>
                    </tr>
                    <tr>
                      <td className="py-2.5 px-4 font-sans text-white">Over 12 hours in a single workday</td>
                      <td className="py-2.5 px-4 text-rose-400 font-bold">2.0x (Double Time)</td>
                      <td className="py-2.5 px-4 font-sans text-xs text-muted">CA Labor Code § 510</td>
                      <td className="py-2.5 px-4">$60.00 / hr</td>
                    </tr>
                    <tr>
                      <td className="py-2.5 px-4 font-sans text-white">First 8 hours on 7th consecutive day</td>
                      <td className="py-2.5 px-4 text-amber-400 font-bold">1.5x (7th Day OT)</td>
                      <td className="py-2.5 px-4 font-sans text-xs text-muted">CA Labor Code § 510</td>
                      <td className="py-2.5 px-4">$45.00 / hr</td>
                    </tr>
                    <tr>
                      <td className="py-2.5 px-4 font-sans text-white">Over 8 hours on 7th consecutive day</td>
                      <td className="py-2.5 px-4 text-rose-400 font-bold">2.0x (7th Day Double)</td>
                      <td className="py-2.5 px-4 font-sans text-xs text-muted">CA Labor Code § 510</td>
                      <td className="py-2.5 px-4">$60.00 / hr</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* The 7th Consecutive Day Rule Detailed */}
            <div>
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-3">
                How the 7th Consecutive Day Rule Functions
              </h3>
              <p>
                A widespread misconception is that working any seven days triggers the 7th day rule. Under California law, the rule applies only when an employee works on <strong>all seven consecutive days within the employer’s established 7-day workweek</strong> (such as Monday through Sunday). If an employer’s workweek runs Sunday midnight to Saturday midnight, and an employee works Wednesday through Tuesday across two different workweeks, the 7th consecutive day rule does not apply because the shifts did not occur within a single payroll workweek.
              </p>
            </div>

            {/* Alternative Workweek Schedules (4x10) */}
            <div>
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-3">
                Alternative Workweek Schedules (AWS) & 4x10 Agreements
              </h3>
              <p>
                An exception to daily overtime occurs when an employer and a designated work unit adopt an <strong>Alternative Workweek Schedule (AWS)</strong> under California Labor Code § 511. Under a valid AWS (e.g., four 10-hour days per week), employees may work up to 10 hours per day without daily overtime pay. However:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-300">
                <li>The agreement requires approval by a two-thirds secret ballot election among the affected employees.</li>
                <li>The results must be formally registered with the California Division of Labor Standards Enforcement (DLSE).</li>
                <li>Work performed beyond 10 hours in a day must still be paid at 1.5x regular pay, and work beyond 12 hours must be paid at double time (2.0x).</li>
              </ul>
            </div>

            {/* Meal & Rest Break Premiums */}
            <div>
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-3">
                Meal & Rest Period Compliance (California Labor Code § 226.7 & § 512)
              </h3>
              <p>
                California law requires that employers provide an uninterrupted, off-duty meal period of not less than 30 minutes before the end of the fifth hour of work. A second 30-minute meal period must be provided before the end of the tenth hour. If an employer fails to provide an off-duty meal or rest break, the employer must pay the employee <strong>one additional hour of pay at the employee’s regular rate</strong> for each day a meal break was missed, and an additional hour for missed rest breaks.
              </p>
            </div>

            {/* Disclaimer */}
            <div className="p-4 rounded-xl bg-surface2/60 border border-border text-xs text-muted leading-relaxed">
              <strong className="text-gray-200">Statutory California Legal Disclaimer: </strong>
              This calculator provides mathematical simulations in accordance with California Labor Code § 510 and general IWC Wage Orders. It does not account for specialized industry exceptions (such as Union Collective Bargaining Agreements under Labor Code § 514, agricultural wage orders under Wage Order 14, or live-in personal attendants). Always consult with the California Department of Industrial Relations (DIR) or legal counsel for formal payroll verification.
            </div>
          </article>

          {/* FAQ Accordion */}
          <div className="pt-8 border-t border-border">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">
              Frequently Asked Questions About California Overtime
            </h2>
            <FaqAccordion items={caFaqs} />
          </div>
        </div>
      </section>
    </div>
  );
}
