import type { Metadata } from 'next';
import OntarioOvertimeCalculator from '@/components/OntarioOvertimeCalculator';
import FaqAccordion from '@/components/FaqAccordion';
import Link from 'next/link';

const BASE = 'https://gridsnap.studio';

export const metadata: Metadata = {
  title: 'Ontario Overtime Pay Calculator | ESA 44-Hour Threshold',
  description:
    'Calculate Ontario overtime pay in compliance with the Employment Standards Act (ESA). Accurate 1.5x pay calculations after 44 hours per workweek.',
  alternates: {
    canonical: `${BASE}/overtime-calculator/ontario`,
  },
  openGraph: {
    title: 'Ontario Overtime Pay Calculator | ESA 44-Hour Threshold',
    description:
      'Compliant Ontario overtime calculator based on the Employment Standards Act (ESA). Calculate 1.5x pay after 44 hours and averaging agreements.',
    url: `${BASE}/overtime-calculator/ontario`,
    siteName: 'GridSnap Work Tools',
    locale: 'en_CA',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ontario Overtime Pay Calculator | ESA 44-Hour Threshold',
    description: 'Calculate Ontario overtime pay after 44 hours per week under the ESA.',
  },
};

const ontarioFaqs = [
  {
    question: 'What is the overtime threshold in Ontario under the Employment Standards Act (ESA)?',
    answer:
      'Under Part VIII (Overtime Pay) of the Ontario Employment Standards Act, 2000 (ESA), an employer must pay an employee overtime pay of at least 1.5 times the employee’s regular rate for each hour worked in excess of 44 hours in a workweek. Unlike many other jurisdictions that set the threshold at 40 hours, Ontario statutory law explicitly establishes 44 hours as the overtime trigger point.',
  },
  {
    question: 'Does Ontario law require daily overtime pay?',
    answer:
      'No. The Ontario Employment Standards Act does not mandate daily overtime. Unless an individual employment contract or collective bargaining agreement explicitly provides for daily overtime (e.g., after 8 hours in a day), overtime eligibility in Ontario is strictly determined on a weekly basis once an employee exceeds 44 hours worked in that workweek.',
  },
  {
    question: 'How do overtime averaging agreements work in Ontario?',
    answer:
      'Under Section 22(2) of the ESA, an employee and employer may agree in writing to average an employee’s hours of work over a period of two or more consecutive weeks (up to a maximum of 4 weeks) for the purpose of determining overtime pay entitlement. For example, under a two-week averaging agreement, overtime is paid only for hours worked in excess of 88 hours across the two-week period.',
  },
  {
    question: 'Which jobs are exempt from overtime pay in Ontario?',
    answer:
      'The Ontario ESA exempts several categories of employees from overtime pay provisions (under Ontario Regulation 285/01). Notable exemptions include managers and supervisors (provided they perform managerial work and only perform non-managerial tasks on an irregular basis), information technology (IT) professionals, licensed professionals (lawyers, doctors, accountants, engineers), and certain agricultural and residential care workers.',
  },
];

export default function OntarioOvertimePage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebApplication',
        name: 'GridSnap Ontario Overtime Pay Calculator',
        url: `${BASE}/overtime-calculator/ontario`,
        applicationCategory: 'BusinessApplication',
        operatingSystem: 'All',
        browserRequirements: 'Requires JavaScript. Runs client-side.',
        description:
          'Ontario Employment Standards Act (ESA) overtime calculator calculating 1.5x premium pay after 44 hours per workweek and averaging agreements.',
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
            name: 'Ontario',
            item: `${BASE}/overtime-calculator/ontario`,
          },
        ],
      },
      {
        '@type': 'FAQPage',
        mainEntity: ontarioFaqs.map((f) => ({
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
          <span className="text-emerald-400 font-medium">Ontario (ESA)</span>
        </nav>

        {/* Hero Header */}
        <div className="text-center max-w-3xl mx-auto mb-8">
          <div className="no-print inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface2 border border-border text-xs font-semibold text-emerald-400 mb-4">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            Ontario Employment Standards Act (ESA 2000) Compliant
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Ontario Overtime Pay Calculator
          </h1>
          <p className="mt-3 text-base sm:text-lg text-muted leading-relaxed">
            Calculate Ontario overtime pay in strict compliance with the Employment Standards Act (ESA). Features the statutory 44-hour weekly threshold and written averaging agreements.
          </p>
        </div>

        {/* Interactive Tool */}
        <div className="max-w-5xl mx-auto">
          <OntarioOvertimeCalculator />
        </div>
      </section>

      {/* ── Editorial Section: Ontario ESA Labor Standards (AdSense & E-E-A-T) ── */}
      <section className="w-full py-12 px-4 bg-surface/40 border-t border-border no-print">
        <div className="max-w-4xl mx-auto space-y-12">
          {/* Direct Answer Block */}
          <div className="p-6 sm:p-8 rounded-2xl bg-surface2/70 border border-emerald-500/30 shadow-lg">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-400 mb-2">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Direct Answer • Ontario ESA Overtime Summary
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white mb-3">
              How does overtime pay work in Ontario?
            </h2>
            <p className="text-base sm:text-lg text-gray-200 leading-relaxed font-medium">
              In Ontario, the Employment Standards Act (ESA) requires employers to pay non-exempt employees 1.5 times their regular hourly rate (time-and-a-half) for all hours worked exceeding 44 hours in a workweek. Overtime is not calculated on a daily basis unless specified in an employment contract, and may be averaged across multiple weeks only with a valid written averaging agreement.
            </p>
          </div>

          <article className="prose prose-invert max-w-none text-muted leading-relaxed space-y-8">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
                Statutory Guidelines of the Ontario Employment Standards Act (ESA 2000)
              </h2>
              <p>
                In the Province of Ontario, employment rights, wages, and maximum hours of work are regulated by the <strong>Ministry of Labour, Immigration, Training and Skills Development</strong> under the <strong>Employment Standards Act, 2000 (ESA)</strong>.
              </p>
              <p>
                A widespread point of confusion among Canadian workers is the difference between provincial labor standards. While the Canadian federal jurisdiction and several provinces (such as British Columbia and Quebec) apply overtime thresholds after 40 hours per week, Ontario law explicitly sets the overtime threshold at <strong>44 hours per workweek</strong> under Section 22 of the ESA.
              </p>
            </div>

            {/* Overtime Mathematical Formula */}
            <div>
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-3">
                Ontario Overtime Rate Formula & Worked Example
              </h3>
              <div className="bg-surface2 p-6 rounded-xl border border-border space-y-3 font-mono text-sm">
                <div className="text-emerald-400 font-bold font-sans text-base">Mathematical Formula:</div>
                <div>Regular Hours = Total Hours up to 44.0</div>
                <div>Overtime Hours = Total Hours - 44.0</div>
                <div>Overtime Pay Rate = Regular Hourly Wage × 1.5</div>
                <div>Total Gross Pay = (Regular Hours × Wage) + (Overtime Hours × Overtime Rate)</div>
              </div>
              <p className="mt-4">
                <strong>Worked Example:</strong> An employee in Toronto earning the general minimum wage (C$17.20/hour) works 50 hours during a Monday-to-Saturday schedule:
              </p>
              <ul className="list-disc pl-6 space-y-1 text-gray-300">
                <li>Regular Hours: 44.0 hours × C$17.20/hr = C$756.80</li>
                <li>Overtime Hours: 6.0 hours × (C$17.20 × 1.5 = C$25.80/hr) = C$154.80</li>
                <li>Total Gross Weekly Earnings = C$911.60 (prior to CPP, EI, and Ontario provincial tax deductions).</li>
              </ul>
            </div>

            {/* Overtime Averaging Agreements */}
            <div>
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-3">
                Written Averaging Agreements under Section 22(2)
              </h3>
              <p>
                Employers and employees in Ontario may enter into a written agreement to average hours of work over a specific period of two or more consecutive weeks (up to 4 weeks) for the purpose of calculating overtime pay:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-300">
                <li>
                  <strong>2-Week Averaging Agreement:</strong> Overtime is paid for hours exceeding 88 hours across the 2-week cycle (44 hrs × 2 weeks).
                </li>
                <li>
                  <strong>3-Week Averaging Agreement:</strong> Overtime is paid for hours exceeding 132 hours across the 3-week cycle (44 hrs × 3 weeks).
                </li>
                <li>
                  <strong>4-Week Averaging Agreement:</strong> Overtime is paid for hours exceeding 176 hours across the 4-week cycle (44 hrs × 4 weeks).
                </li>
                <li>
                  <strong>Agreement Validity:</strong> Under current ESA rules, averaging agreements must have a clear expiry date (maximum 2 years for non-unionized employees) and cannot be unilaterally imposed by an employer without written employee consent.
                </li>
              </ul>
            </div>

            {/* Exemptions under Ontario Regulation 285/01 */}
            <div>
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-3">
                Key Overtime Exemptions in Ontario (O. Reg. 285/01)
              </h3>
              <p>
                Not all workers in Ontario are entitled to overtime pay. Key exemptions under Ontario Regulation 285/01 include:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 not-prose my-4">
                <div className="p-4 rounded-xl bg-surface2 border border-border">
                  <div className="font-bold text-white text-sm mb-1">Managers & Supervisors</div>
                  <p className="text-xs text-muted">
                    Exempt if their work is primarily managerial or supervisory, and non-managerial tasks are performed only on an irregular or emergency basis.
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-surface2 border border-border">
                  <div className="font-bold text-white text-sm mb-1">Information Technology Professionals</div>
                  <p className="text-xs text-muted">
                    Systems analysts, software developers, and IT engineers who analyze, design, or implement computer hardware or software systems.
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-surface2 border border-border">
                  <div className="font-bold text-white text-sm mb-1">Licensed Professionals</div>
                  <p className="text-xs text-muted">
                    Registered lawyers, physicians, accountants, architects, engineers, and optometrists practicing under professional statutes.
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-surface2 border border-border">
                  <div className="font-bold text-white text-sm mb-1">Commission Salespersons</div>
                  <p className="text-xs text-muted">
                    Employees who customarily make sales outside of the employer’s place of business and whose earnings rely on commissions.
                  </p>
                </div>
              </div>
            </div>

            {/* Disclaimer */}
            <div className="p-4 rounded-xl bg-surface2/60 border border-border text-xs text-muted leading-relaxed">
              <strong className="text-gray-200">Ontario ESA Legal & Payroll Disclaimer: </strong>
              This calculator provides mathematical simulations in accordance with Part VIII of the Ontario Employment Standards Act, 2000. It does not constitute formal legal or payroll advice. Special rules and variations exist for specific industries (e.g., road building, sewer and watermain construction, fruit and vegetable canning). Consult the Ontario Ministry of Labour (ontario.ca/labour) or an Ontario employment lawyer for binding statutory determinations.
            </div>
          </article>

          {/* FAQ Accordion */}
          <div className="pt-8 border-t border-border">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">
              Frequently Asked Questions About Ontario Overtime
            </h2>
            <FaqAccordion items={ontarioFaqs} />
          </div>
        </div>
      </section>
    </div>
  );
}
