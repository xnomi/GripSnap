import type { Metadata } from 'next';
import AustraliaFairWorkCalculator from '@/components/AustraliaFairWorkCalculator';
import FaqAccordion from '@/components/FaqAccordion';
import Link from 'next/link';

const BASE = 'https://gridsnap.studio';

export const metadata: Metadata = {
  title: 'Australia Fair Work Overtime & Casual Loading Calculator',
  description:
    'Calculate Australian hourly wages under Fair Work Modern Awards. Includes 25% casual loading, Saturday/Sunday penalty rates, and daily overtime tiers.',
  alternates: {
    canonical: `${BASE}/overtime-calculator/australia-fair-work`,
  },
  openGraph: {
    title: 'Australia Fair Work Overtime & Casual Loading Calculator',
    description:
      'Accurate Australian wage calculator for Fair Work Modern Awards, 25% casual loading, overtime tiers, and penalty rates.',
    url: `${BASE}/overtime-calculator/australia-fair-work`,
    siteName: 'GridSnap Work Tools',
    locale: 'en_AU',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Australia Fair Work Overtime & Casual Loading Calculator',
    description: 'Calculate Australian Modern Award wages, 25% casual loading, and weekend penalty rates.',
  },
};

const auFaqs = [
  {
    question: 'What is casual loading and why is it set at 25% in Australia?',
    answer:
      'Under the Fair Work Act 2009 and Australian Modern Awards, casual employees do not receive paid annual leave, paid personal/carer’s leave, notice of termination, or redundancy pay. To compensate for the lack of these statutory benefits guaranteed to permanent full-time and part-time workers under the National Employment Standards (NES), casual workers receive a statutory 25% casual loading added directly onto the base Modern Award hourly rate.',
  },
  {
    question: 'What is the standard full-time workweek in Australia under Fair Work?',
    answer:
      'Under Section 62 of the Fair Work Act 2009, the maximum weekly hours for a full-time employee is 38 hours, plus reasonable additional hours. For an employee other than a full-time employee, the maximum hours are the lesser of 38 hours or the employee’s ordinary hours of work in a week. Any hours worked in excess of 38 ordinary hours are classified as overtime.',
  },
  {
    question: 'How are overtime penalty rates tiered under Australian Modern Awards?',
    answer:
      'Most Australian Modern Awards (such as the Clerks Private Sector Award, Hospitality Award, and General Retail Industry Award) utilize an escalating overtime tier: overtime worked Monday to Saturday is paid at time-and-a-half (1.5x) for the first two or three hours, and double time (2.0x) thereafter. Sunday overtime is commonly paid at double time (2.0x) for all hours, and public holiday work is paid at double time and a half (2.5x).',
  },
  {
    question: 'Is superannuation paid on overtime hours in Australia?',
    answer:
      'Generally, under Australian Taxation Office (ATO) Superannuation Guarantee rulings, employers are required to pay superannuation (11.5% for the 2024–2026 financial years) only on an employee’s Ordinary Time Earnings (OTE). Pure overtime hours worked outside standard rostered hours are excluded from OTE and are typically not subject to mandatory superannuation contributions, unless stipulated by an individual enterprise agreement or award clause.',
  },
];

export default function AustraliaFairWorkPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebApplication',
        name: 'GridSnap Australia Fair Work & Casual Loading Calculator',
        url: `${BASE}/overtime-calculator/australia-fair-work`,
        applicationCategory: 'BusinessApplication',
        operatingSystem: 'All',
        browserRequirements: 'Requires JavaScript. Runs client-side.',
        description:
          'Australian Fair Work Modern Award wage calculator with statutory 25% casual loading, 38-hour workweek, escalating overtime tiers, and superannuation estimation.',
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
            name: 'Australia Fair Work',
            item: `${BASE}/overtime-calculator/australia-fair-work`,
          },
        ],
      },
      {
        '@type': 'FAQPage',
        mainEntity: auFaqs.map((f) => ({
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
          <span className="text-emerald-400 font-medium">Australia Fair Work</span>
        </nav>

        {/* Hero Header */}
        <div className="text-center max-w-3xl mx-auto mb-8">
          <div className="no-print inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface2 border border-border text-xs font-semibold text-emerald-400 mb-4">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            Fair Work Act 2009 & Modern Awards Standard
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Australia Fair Work Overtime & Casual Loading Calculator
          </h1>
          <p className="mt-3 text-base sm:text-lg text-muted leading-relaxed">
            Calculate statutory Australian wages under Fair Work Modern Awards. Computes 25% casual loading, 38-hour standard workweeks, Saturday/Sunday penalty rates, and 11.5% superannuation.
          </p>
        </div>

        {/* Interactive Tool */}
        <div className="max-w-5xl mx-auto">
          <AustraliaFairWorkCalculator />
        </div>
      </section>

      {/* ── Editorial Section: Australian Labor Standards (AdSense & E-E-A-T) ── */}
      <section className="w-full py-12 px-4 bg-surface/40 border-t border-border no-print">
        <div className="max-w-4xl mx-auto space-y-12">
          {/* Direct Answer Block */}
          <div className="p-6 sm:p-8 rounded-2xl bg-surface2/70 border border-emerald-500/30 shadow-lg">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-400 mb-2">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Direct Answer • Fair Work & Casual Loading Summary
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white mb-3">
              How does overtime and casual loading work in Australia?
            </h2>
            <p className="text-base sm:text-lg text-gray-200 leading-relaxed font-medium">
              In Australia, casual employees receive a mandatory 25% casual loading added to their base Modern Award hourly rate (Base Rate × 1.25) to compensate for lack of paid leave. Standard full-time hours are capped at 38 hours per week. Overtime is generally paid at 1.5x for the first two hours and 2.0x thereafter, while weekend penalty rates typically grant 1.5x on Saturdays, 2.0x on Sundays, and 2.5x on public holidays.
            </p>
          </div>

          <article className="prose prose-invert max-w-none text-muted leading-relaxed space-y-8">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
                Understanding the Fair Work System & National Employment Standards (NES)
              </h2>
              <p>
                In Australia, employment conditions for the vast majority of private sector employees are established by the <strong>Fair Work Act 2009</strong> and industry-specific <strong>Modern Awards</strong> administered by the <strong>Fair Work Commission (FWC)</strong> and enforced by the <strong>Fair Work Ombudsman (FWO)</strong>.
              </p>
              <p>
                The foundation of the system is the 11 National Employment Standards (NES), which set legal minimum entitlements that cannot be overridden by employment contracts, including maximum weekly hours (38 hours per week for full-time workers), requests for flexible working arrangements, parental leave, and annual leave.
              </p>
            </div>

            {/* Casual Loading Explanation */}
            <div>
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-3">
                The Mechanics of 25% Casual Loading
              </h3>
              <p>
                Under Section 11 of the Fair Work Act, a casual employee has no firm advance commitment to continuing and indefinite work according to an agreed pattern of work. Because casual workers are not entitled to paid personal (sick) leave, paid annual leave (4 weeks per year for permanent workers), paid compassionate leave, or notice of termination, the Australian industrial relations framework incorporates a mandatory <strong>25% casual loading</strong>.
              </p>
              <div className="bg-surface2 p-6 rounded-xl border border-border space-y-3 font-mono text-sm">
                <div className="text-emerald-400 font-bold font-sans text-base">Casual Wage Formula:</div>
                <div>Ordinary Casual Rate = Award Base Rate × 1.25</div>
                <div>Example: If Base Rate = A$28.00/hr, Casual Rate = A$28.00 × 1.25 = A$35.00/hr</div>
              </div>
            </div>

            {/* Overtime and Penalty Rates Comparison Table */}
            <div>
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-3">
                Modern Award Penalty Rates & Overtime Tiers Matrix
              </h3>
              <div className="overflow-x-auto rounded-xl border border-border bg-surface2">
                <table className="w-full text-left text-sm">
                  <thead className="bg-surface3/50 text-white font-semibold border-b border-border text-xs uppercase tracking-wider">
                    <tr>
                      <th className="py-3 px-4">Shift Type / Timing</th>
                      <th className="py-3 px-4">Standard Award Multiplier</th>
                      <th className="py-3 px-4">Description</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border/60 text-gray-300 font-mono">
                    <tr>
                      <td className="py-2.5 px-4 font-sans text-white">Ordinary Hours (Mon–Fri)</td>
                      <td className="py-2.5 px-4 text-emerald-400 font-bold">1.0x (or 1.25x Casual)</td>
                      <td className="py-2.5 px-4 font-sans text-xs text-muted">Up to 7.6 hours/day or 38 hours/week</td>
                    </tr>
                    <tr>
                      <td className="py-2.5 px-4 font-sans text-white">Overtime Tier 1 (First 2 Hours)</td>
                      <td className="py-2.5 px-4 text-amber-400 font-bold">1.5x (Time & a half)</td>
                      <td className="py-2.5 px-4 font-sans text-xs text-muted">Excess hours beyond ordinary rostered shift</td>
                    </tr>
                    <tr>
                      <td className="py-2.5 px-4 font-sans text-white">Overtime Tier 2 (After 2 Hours)</td>
                      <td className="py-2.5 px-4 text-rose-400 font-bold">2.0x (Double time)</td>
                      <td className="py-2.5 px-4 font-sans text-xs text-muted">Extended overtime shifts</td>
                    </tr>
                    <tr>
                      <td className="py-2.5 px-4 font-sans text-white">Saturday Penalty Rate</td>
                      <td className="py-2.5 px-4 text-cyan-400 font-bold">1.5x Base Rate</td>
                      <td className="py-2.5 px-4 font-sans text-xs text-muted">Weekend penalty loading under retail/clerical awards</td>
                    </tr>
                    <tr>
                      <td className="py-2.5 px-4 font-sans text-white">Sunday Penalty Rate</td>
                      <td className="py-2.5 px-4 text-amber-400 font-bold">2.0x (or 1.75x–2.0x)</td>
                      <td className="py-2.5 px-4 font-sans text-xs text-muted">Higher weekend rate across hospitality & services</td>
                    </tr>
                    <tr>
                      <td className="py-2.5 px-4 font-sans text-white">Public Holiday Rate</td>
                      <td className="py-2.5 px-4 text-rose-400 font-bold">2.5x (Double time & half)</td>
                      <td className="py-2.5 px-4 font-sans text-xs text-muted">Australia Day, ANZAC Day, Christmas, etc.</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Superannuation Guarantee */}
            <div>
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-3">
                Superannuation Guarantee (SG) Contributions (11.5%)
              </h3>
              <p>
                In Australia, employers are legally mandated under the <em>Superannuation Guarantee (Administration) Act 1992</em> to make contributions to eligible employees’ complying superannuation funds. Effective 1 July 2024 through 30 June 2025, the statutory SG rate is <strong>11.5%</strong> of the employee’s <strong>Ordinary Time Earnings (OTE)</strong>, scheduled to increase to 12% on 1 July 2025.
              </p>
              <p>
                Importantly, the $450 monthly wage threshold was repealed in 2022. Today, employees are entitled to superannuation contributions regardless of how much they earn in a month, provided they are over 18 years of age (or work more than 30 hours in a week if under 18).
              </p>
            </div>

            {/* Disclaimer */}
            <div className="p-4 rounded-xl bg-surface2/60 border border-border text-xs text-muted leading-relaxed">
              <strong className="text-gray-200">Fair Work Australian Statutory Disclaimer: </strong>
              This calculator provides general estimates based on benchmark Modern Award standards. Over 120 different Modern Awards exist in Australia (e.g., Hospitality Industry Award MA000009, General Retail Industry Award MA000004, Building and Construction Award MA000020), each with specific overtime calculation methods (e.g., compounding vs. cumulative overtime on casual loading). Consult the Fair Work Ombudsman (fwo.gov.au) or an Australian registered workplace relations specialist to confirm award classification.
            </div>
          </article>

          {/* FAQ Accordion */}
          <div className="pt-8 border-t border-border">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">
              Frequently Asked Questions About Fair Work & Casual Loading
            </h2>
            <FaqAccordion items={auFaqs} />
          </div>
        </div>
      </section>
    </div>
  );
}
