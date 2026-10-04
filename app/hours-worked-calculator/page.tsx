import type { Metadata } from 'next';
import HoursWorkedCalculator from '@/components/HoursWorkedCalculator';
import FaqAccordion from '@/components/FaqAccordion';
import Link from 'next/link';

const BASE = 'https://gridsnap.studio';

export const metadata: Metadata = {
  title: 'Hours Worked Calculator | Elapsed Time & Decimal Hours Converter',
  description:
    'Calculate elapsed hours and minutes between start and end times, deduct unpaid breaks, and convert time clock minutes into payroll decimals instantly.',
  alternates: {
    canonical: `${BASE}/hours-worked-calculator`,
  },
  openGraph: {
    title: 'Hours Worked Calculator | Elapsed Time & Decimal Converter',
    description:
      'Free, client-side elapsed hours calculator with decimal conversions, unpaid break deductions, and gross pay preview.',
    url: `${BASE}/hours-worked-calculator`,
    siteName: 'GridSnap Work Tools',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Hours Worked Calculator | Decimal Hours Converter',
    description: 'Calculate elapsed hours, punch times, and convert minutes to payroll decimals.',
  },
};

const hwFaqs = [
  {
    question: 'How do you convert clock minutes into decimal hours for payroll?',
    answer:
      'To convert clock minutes into decimal hours, divide the number of minutes by 60. For example, 15 minutes is 15 ÷ 60 = 0.25 hours; 30 minutes is 30 ÷ 60 = 0.50 hours; and 45 minutes is 45 ÷ 60 = 0.75 hours. If an employee works 7 hours and 38 minutes, 38 ÷ 60 is approximately 0.63, yielding 7.63 decimal hours for payroll multiplication.',
  },
  {
    question: 'What is the FLSA 7-minute rounding rule (29 CFR § 785.48(b))?',
    answer:
      'Under the U.S. Fair Labor Standards Act (29 CFR § 785.48(b)), employers are permitted to round employee punch times to the nearest 15-minute interval (quarter of an hour), provided that the rounding works both ways without consistently favoring the employer. Under the 7-minute rule: time between 1 and 7 minutes is rounded down to the nearest 15 minutes, while time between 8 and 14 minutes is rounded up to the next 15 minutes.',
  },
  {
    question: 'How do you calculate shift hours that cross midnight (overnight shifts)?',
    answer:
      'When a shift crosses midnight (for example, starting at 10:00 PM / 22:00 and ending at 6:30 AM / 06:30), add 24 hours (1,440 minutes) to the end time before subtracting the start time. In this example: (6.5 + 24) - 22 = 8.5 total elapsed hours. Subtract any unpaid lunch break (such as 30 minutes / 0.5 hours) to determine net compensable work hours (8.0 hours).',
  },
  {
    question: 'Are employers required to pay for short rest breaks under federal law?',
    answer:
      'Yes. Under federal regulation 29 CFR § 785.18, rest periods of short duration—running from 5 minutes to about 20 minutes—are customary in industry, promote the efficiency of the employee, and must be counted as hours worked. Employers cannot deduct short coffee or restroom breaks from an employee’s recorded hours.',
  },
];

export default function HoursWorkedPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebApplication',
        name: 'GridSnap Hours Worked Calculator & Decimal Converter',
        url: `${BASE}/hours-worked-calculator`,
        applicationCategory: 'BusinessApplication',
        operatingSystem: 'All',
        browserRequirements: 'Requires JavaScript. Runs client-side.',
        description:
          'Free elapsed hours worked calculator with punch shift tracking, break deductions, and instant minutes to decimal hours converter.',
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
            name: 'Hours Worked Calculator',
            item: `${BASE}/hours-worked-calculator`,
          },
        ],
      },
      {
        '@type': 'FAQPage',
        mainEntity: hwFaqs.map((f) => ({
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
          <span className="text-emerald-400 font-medium">Hours Worked Calculator</span>
        </nav>

        {/* Hero Header */}
        <div className="text-center max-w-3xl mx-auto mb-8">
          <div className="no-print inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface2 border border-border text-xs font-semibold text-emerald-400 mb-4">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            Precision Elapsed Time & Decimal Conversion Engine
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Hours Worked Calculator & Decimal Converter
          </h1>
          <p className="mt-3 text-base sm:text-lg text-muted leading-relaxed">
            Calculate exact elapsed shift duration between punch times, deduct unpaid lunch breaks, and convert work minutes into payroll decimal hours.
          </p>
        </div>

        {/* Interactive Tool */}
        <div className="max-w-5xl mx-auto">
          <HoursWorkedCalculator />
        </div>
      </section>

      {/* ── Editorial Section: Time Tracking & Decimal Math (AdSense & E-E-A-T) ── */}
      <section className="w-full py-12 px-4 bg-surface/40 border-t border-border no-print">
        <div className="max-w-4xl mx-auto space-y-12">
          {/* Direct Answer Block */}
          <div className="p-6 sm:p-8 rounded-2xl bg-surface2/70 border border-emerald-500/30 shadow-lg">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-400 mb-2">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Direct Answer • Decimal Conversion Rule
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white mb-3">
              How do you calculate total hours worked and convert to decimals?
            </h2>
            <p className="text-base sm:text-lg text-gray-200 leading-relaxed font-medium">
              To calculate total hours worked, subtract start time from end time in minutes, subtract any unpaid break duration, and divide the resulting net minutes by 60 to obtain decimal hours. For payroll, 15 minutes equals 0.25 hours, 30 minutes equals 0.50 hours, and 45 minutes equals 0.75 hours.
            </p>
          </div>

          <article className="prose prose-invert max-w-none text-muted leading-relaxed space-y-8">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
                The Mathematics of Time Tracking: Clock Time vs. Decimal Hours
              </h2>
              <p>
                In standard everyday life, time is tracked using sexagesimal notation (base-60), where each hour contains 60 minutes and each minute contains 60 seconds. However, automated accounting platforms, enterprise resource planning (ERP) software, and modern payroll processors require centesimal notation (base-100 decimal format) to multiply hours worked by monetary hourly wage rates.
              </p>
              <p>
                Multiplying $20.00 per hour by a time card showing &ldquo;8 hours and 30 minutes&rdquo; cannot be performed by entering 8.30 into an accounting calculator. Because 30 minutes is exactly half of an hour, 8 hours and 30 minutes equals <strong>8.50 decimal hours</strong> (8.50 × $20.00 = $170.00). Entering 8.30 would produce $166.00, erroneously underpaying the employee by $4.00.
              </p>
            </div>

            {/* Comprehensive Minutes to Decimals Chart */}
            <div>
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-3">
                Full 60-Minute to Decimal Hours Conversion Table
              </h3>
              <p className="text-sm mb-4">
                Use this reference table to convert any number of minutes directly into its two-decimal payroll equivalent:
              </p>
              <div className="overflow-x-auto rounded-xl border border-border bg-surface2 max-h-96">
                <table className="w-full text-left text-xs">
                  <thead className="bg-surface3/50 text-white font-semibold border-b border-border uppercase tracking-wider sticky top-0">
                    <tr>
                      <th className="py-2.5 px-3">Min</th>
                      <th className="py-2.5 px-3">Dec</th>
                      <th className="py-2.5 px-3">Min</th>
                      <th className="py-2.5 px-3">Dec</th>
                      <th className="py-2.5 px-3">Min</th>
                      <th className="py-2.5 px-3">Dec</th>
                      <th className="py-2.5 px-3">Min</th>
                      <th className="py-2.5 px-3">Dec</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border/60 text-gray-300 font-mono">
                    {Array.from({ length: 15 }, (_, i) => {
                      const m1 = i + 1;
                      const m2 = i + 16;
                      const m3 = i + 31;
                      const m4 = i + 46;
                      return (
                        <tr key={i} className="hover:bg-surface3/30">
                          <td className="py-1.5 px-3 font-semibold text-white">{m1}m</td>
                          <td className="py-1.5 px-3 text-emerald-400 font-bold">{(m1 / 60).toFixed(2)}</td>
                          <td className="py-1.5 px-3 font-semibold text-white">{m2}m</td>
                          <td className="py-1.5 px-3 text-emerald-400 font-bold">{(m2 / 60).toFixed(2)}</td>
                          <td className="py-1.5 px-3 font-semibold text-white">{m3}m</td>
                          <td className="py-1.5 px-3 text-emerald-400 font-bold">{(m3 / 60).toFixed(2)}</td>
                          <td className="py-1.5 px-3 font-semibold text-white">{m4}m</td>
                          <td className="py-1.5 px-3 text-emerald-400 font-bold">{(m4 / 60).toFixed(2)}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>

            {/* The FLSA Rounding Rule */}
            <div>
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-3">
                The FLSA 7-Minute Rounding Rule (29 CFR § 785.48(b))
              </h3>
              <p>
                In high-volume hourly workplaces, employees frequently punch in or out a few minutes before or after their designated shift times. Under Section 785.48(b) of the Code of Federal Regulations, the U.S. Department of Labor recognizes the practice of rounding time clock punches to the nearest quarter of an hour (15 minutes).
              </p>
              <p>
                This standard is commonly known as the <strong>7-minute rule</strong>:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-300">
                <li><strong>1 to 7 minutes:</strong> The clock time is rounded down to the previous 15-minute increment. For example, a punch at 8:07 AM rounds down to 8:00 AM.</li>
                <li><strong>8 to 14 minutes:</strong> The clock time is rounded up to the subsequent 15-minute increment. For example, a punch at 8:08 AM rounds up to 8:15 AM.</li>
                <li><strong>Neutrality Requirement:</strong> Federal courts have repeatedly held that time-rounding policies must be neutral both facially and as applied. If an employer rounds punch-ins up (favoring the company) but does not round punch-outs up (favoring the worker), the practice violates the FLSA and exposes the employer to back-wage liability.</li>
              </ul>
            </div>

            {/* Overnight Shift Handling */}
            <div>
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-3">
                Calculating Night Shifts Crossing Midnight
              </h3>
              <p>
                Shifts operating across midnight represent a common pitfall in amateur spreadsheets. Because the clock resets from 23:59 to 00:00, simple subtraction (End Time - Start Time) results in negative values. To accurately compute an overnight shift:
              </p>
              <div className="bg-surface2 p-6 rounded-xl border border-border space-y-2 font-mono text-sm">
                <div>Shift: 21:00 (9:00 PM) to 05:30 (5:30 AM) with a 30m break</div>
                <div>Elapsed Time = (05:30 + 24:00) - 21:00 = 29.5 - 21.0 = 8.5 hours</div>
                <div>Net Work Hours = 8.5 hours - 0.5 hours (unpaid break) = 8.0 decimal hours</div>
              </div>
            </div>

            {/* Disclaimer */}
            <div className="p-4 rounded-xl bg-surface2/60 border border-border text-xs text-muted leading-relaxed">
              <strong className="text-gray-200">Statutory Recordkeeping Disclaimer: </strong>
              This tool provides mathematical calculations of elapsed work time and decimal hour conversions. Under FLSA Section 11(c), employers are required to preserve payroll records for at least three years, and time cards for at least two years. Always verify digital calculations against signed employee punch logs and certified payroll ledgers.
            </div>
          </article>

          {/* FAQ Accordion */}
          <div className="pt-8 border-t border-border">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">
              Frequently Asked Questions About Hours Worked & Decimals
            </h2>
            <FaqAccordion items={hwFaqs} />
          </div>
        </div>
      </section>
    </div>
  );
}
