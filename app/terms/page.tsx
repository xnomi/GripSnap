import type { Metadata } from 'next';
import Link from 'next/link';

const BASE = 'https://gridsnap.studio';

export const metadata: Metadata = {
  title: 'Terms of Use & Statutory Disclaimer | GridSnap Work Tools',
  description:
    'Terms of service, mathematical calculation limitations, acceptable use, and statutory labor disclaimer for GridSnap Work Tools.',
  alternates: {
    canonical: `${BASE}/terms`,
  },
  openGraph: {
    title: 'Terms of Use & Statutory Disclaimer | GridSnap Work Tools',
    description:
      'Legal terms of service and statutory calculation accuracy disclaimers for GridSnap wage and overtime calculators.',
    url: `${BASE}/terms`,
    siteName: 'GridSnap Work Tools',
    locale: 'en_US',
    type: 'website',
  },
};

export default function TermsPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Terms of Use and Statutory Disclaimer',
    url: `${BASE}/terms`,
    description: 'Terms and conditions governing the use of GridSnap calculation engines.',
  };

  return (
    <div className="w-full">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="max-w-4xl mx-auto px-4 py-16">
        <div className="mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface2 border border-border text-xs font-semibold text-emerald-400 mb-4">
            <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
            Legal Terms & Conditions
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight mb-3">
            Terms of Use & Statutory Disclaimer
          </h1>
          <p className="text-sm text-muted">
            Last Updated & Reviewed: April 2025 • Effective Date: January 1, 2025
          </p>
        </div>

        <article className="prose prose-invert max-w-none text-muted leading-relaxed space-y-8 text-base">
          {/* Section 1 */}
          <section>
            <h2 className="text-xl sm:text-2xl font-bold text-white mb-3">1. Agreement to Terms</h2>
            <p>
              By accessing, browsing, or utilizing GridSnap Work Tools (available at https://gridsnap.studio and all associated regional routes), you acknowledge that you have read, understood, and agree to be bound by these Terms of Use and our accompanying{' '}
              <Link href="/privacy-policy" className="text-emerald-400 underline">
                Privacy Policy
              </Link>. If you do not accept these terms in their entirety, you must discontinue use of this site immediately.
            </p>
          </section>

          {/* Section 2: Statutory Disclaimer (Prominent Box) */}
          <section className="bg-surface border border-emerald-500/40 rounded-2xl p-6 sm:p-8">
            <h2 className="text-xl sm:text-2xl font-bold text-white mb-3 flex items-center gap-2">
              <span className="text-emerald-400">⚠️</span> 2. Statutory Labor & Financial Disclaimer
            </h2>
            <p className="text-gray-200 font-medium mb-3">
              This tool provides mathematical estimates based on statutory labor standards and is not formal legal, accounting, tax, or certified payroll advice.
            </p>
            <p className="text-sm text-muted leading-relaxed">
              Calculation engines on GridSnap are programmed to simulate baseline statutes, including the U.S. Fair Labor Standards Act (FLSA), California Labor Code § 510, the Ontario Employment Standards Act (ESA), and Australian Modern Awards. However, actual employee compensation obligations may be altered by collective bargaining agreements (CBAs), fluctuating workweek arrangements, specific alternative workweek schedule (AWS) approvals, employer-specific bona fide meal break policies, or local municipal wage ordinances.
            </p>
            <p className="text-sm text-muted leading-relaxed mt-3">
              Neither GridSnap nor its operators guarantee that calculations will satisfy all specific legal requirements of any jurisdiction. You should always verify calculation results with a qualified labor attorney, Certified Public Accountant (CPA), or certified payroll professional (CPP) prior to executing payroll disbursements or filing formal wage claims.
            </p>
          </section>

          {/* Section 3 */}
          <section>
            <h2 className="text-xl sm:text-2xl font-bold text-white mb-3">3. Acceptable Use Policy</h2>
            <p>
              You agree to use our calculators and informational resources only for lawful personal, informational, or internal business purposes. You agree that you will not:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-300 text-sm mt-3">
              <li>
                Engage in any automated scraping, data mining, or extraction of website content without prior written permission from GridSnap.
              </li>
              <li>
                Attempt to bypass, disable, or interfere with security features or advertising units delivered on the platform.
              </li>
              <li>
                Frame, mirror, or republish the calculation engines without proper attribution and prior written authorization.
              </li>
              <li>
                Use the service in any manner that could disable, overburden, damage, or impair our infrastructure or interfere with any other party&apos;s use of the site.
              </li>
            </ul>
          </section>

          {/* Section 4 */}
          <section>
            <h2 className="text-xl sm:text-2xl font-bold text-white mb-3">4. Intellectual Property Rights</h2>
            <p>
              The design, code, user interface, brand assets, logos, and educational documentation on GridSnap Work Tools are the proprietary property of GridSnap and are protected by applicable intellectual property and copyright laws.
            </p>
            <p className="mt-3">
              You retain 100% full and unconditional ownership of all timesheet data, employee hours, hourly wage figures, and exported CSV or PDF reports generated on your device.
            </p>
          </section>

          {/* Section 5 */}
          <section>
            <h2 className="text-xl sm:text-2xl font-bold text-white mb-3">5. Third-Party Advertising & Links</h2>
            <p>
              GridSnap displays third-party advertisements via Google AdSense and may provide links to external governmental reference websites (such as the U.S. Department of Labor, the California Department of Industrial Relations, and the Fair Work Ombudsman). We do not endorse and assume no responsibility for the content, privacy practices, or accuracy of any third-party websites or services.
            </p>
          </section>

          {/* Section 6 */}
          <section>
            <h2 className="text-xl sm:text-2xl font-bold text-white mb-3">6. Limitation of Liability</h2>
            <p>
              To the maximum extent permitted by applicable law, in no event shall GridSnap, its founders, engineers, or editorial reviewers be liable for any direct, indirect, punitive, incidental, special, consequential, or exemplary damages—including but not limited to loss of profits, back-wage liabilities, labor penalties, or tax assessments—arising out of or in connection with the use or inability to use the calculators or services provided on this website.
            </p>
          </section>

          {/* Section 7 */}
          <section>
            <h2 className="text-xl sm:text-2xl font-bold text-white mb-3">7. Modifications to Terms</h2>
            <p>
              We reserve the right to revise or modify these Terms of Use at any time. Changes become effective immediately upon posting to this page. Your continued use of the website following any modifications constitutes your formal acceptance of the updated terms.
            </p>
          </section>

          {/* Section 8 */}
          <section className="border-t border-border pt-6">
            <h2 className="text-xl sm:text-2xl font-bold text-white mb-3">8. Contact Information</h2>
            <p>
              For inquiries regarding these Terms of Use, please reach out to our legal and publisher desk at:
            </p>
            <div className="mt-3 p-4 rounded-xl bg-surface2 border border-border text-sm">
              <p className="font-semibold text-white">GridSnap Work Tools Legal Affairs</p>
              <p className="text-muted">
                Email:{' '}
                <a href="mailto:legal@gridsnap.studio" className="text-emerald-400 underline font-mono">
                  legal@gridsnap.studio
                </a>{' '}
                or{' '}
                <a href="mailto:support@gridsnap.studio" className="text-emerald-400 underline font-mono">
                  support@gridsnap.studio
                </a>
              </p>
            </div>
          </section>
        </article>
      </div>
    </div>
  );
}
