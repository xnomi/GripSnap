import type { Metadata } from 'next';

const BASE = 'https://gridsnap.studio';

export const metadata: Metadata = {
  title: 'Privacy Policy | Client-Side Data Protection & AdSense Compliance',
  description:
    'GridSnap Work Tools Privacy Policy. Explains our client-side LocalStorage architecture, Google AdSense third-party cookies, and CCPA/CPRA/GDPR rights.',
  alternates: {
    canonical: `${BASE}/privacy-policy`,
  },
  openGraph: {
    title: 'Privacy Policy | GridSnap Work Tools',
    description:
      'Comprehensive privacy policy covering zero-server timesheet storage, Google AdSense advertising cookies, and international data protection compliance.',
    url: `${BASE}/privacy-policy`,
    siteName: 'GridSnap Work Tools',
    locale: 'en_US',
    type: 'website',
  },
};

export default function PrivacyPolicyPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'PrivacyPolicy',
    name: 'GridSnap Work Tools Privacy Policy',
    url: `${BASE}/privacy-policy`,
    description:
      'Information privacy, local storage disclosures, Google AdSense advertising policies, and international compliance standards for GridSnap Work Tools.',
    publisher: {
      '@type': 'Organization',
      name: 'GridSnap Work Tools',
      url: BASE,
    },
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
            Statutory Data Privacy Policy
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight mb-3">
            Privacy Policy
          </h1>
          <p className="text-sm text-muted">
            Last Updated & Statutorily Reviewed: April 2025 • Effective Date: January 1, 2025
          </p>
        </div>

        <article className="prose prose-invert max-w-none text-muted leading-relaxed space-y-8 text-base">
          {/* Section 1 */}
          <section>
            <h2 className="text-xl sm:text-2xl font-bold text-white mb-3">1. Introduction & Scope</h2>
            <p>
              Welcome to GridSnap Work Tools (&ldquo;GridSnap&rdquo;, &ldquo;we&rdquo;, &ldquo;our&rdquo;, or &ldquo;us&rdquo;), accessible at{' '}
              <a href="https://gridsnap.studio" className="text-emerald-400 underline">
                https://gridsnap.studio
              </a>. GridSnap provides authoritative, browser-based wage, timesheet, and overtime calculation tools.
            </p>
            <p>
              We are committed to maintaining the highest privacy and data integrity standards. This Privacy Policy outlines how we treat user information in compliance with the California Consumer Privacy Act (CCPA) as amended by the California Privacy Rights Act (CPRA), Canada’s Personal Information Protection and Electronic Documents Act (PIPEDA), the Australian Privacy Act 1988, the New Zealand Privacy Act 2020, and the European Union General Data Protection Regulation (GDPR).
            </p>
          </section>

          {/* Section 2 */}
          <section className="bg-surface border border-border rounded-2xl p-6 sm:p-8">
            <h2 className="text-xl sm:text-2xl font-bold text-white mb-3">
              2. Core Architecture: 100% Client-Side Local Data Isolation
            </h2>
            <p className="mb-4">
              Unlike conventional web-based payroll software that requires user accounts and uploads sensitive employee wages to remote cloud databases, <strong>GridSnap operates entirely on the client side (in your web browser)</strong>:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-300 text-sm">
              <li>
                <strong>No Server Storage of Financial Data:</strong> Shift start times, end times, unpaid lunch durations, hourly pay rates, overtime thresholds, and calculated gross earnings are processed exclusively via client-side JavaScript.
              </li>
              <li>
                <strong>HTML5 LocalStorage Persistence:</strong> When you use our calculators, your timesheet preferences and entries are saved strictly on your local device within your browser&apos;s HTML5 LocalStorage. Our web servers never receive, transmit, or record this data.
              </li>
              <li>
                <strong>User Data Control:</strong> You may wipe all stored timesheet records at any time simply by clicking the &ldquo;Clear All&rdquo; button inside the calculator or clearing your browser cache and local storage.
              </li>
            </ul>
          </section>

          {/* Section 3: Google AdSense & Third-Party Cookies */}
          <section>
            <h2 className="text-xl sm:text-2xl font-bold text-white mb-3">
              3. Google AdSense & Third-Party Advertising Disclosures
            </h2>
            <p>
              To maintain our wage and overtime calculation utilities as a free public resource without paywalls or subscriptions, we display third-party advertisements delivered by <strong>Google AdSense</strong> (Google LLC, 1600 Amphitheatre Parkway, Mountain View, CA 94043, USA).
            </p>
            <p className="mt-3">
              Google AdSense uses cookies and web beacons to serve advertisements based on your prior visits to our website or other websites across the Internet:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-300 text-sm mt-3">
              <li>
                <strong>DoubleClick DART Cookies:</strong> Google and its advertising partners use the DART cookie to serve personalized ads to users based on their visits to GridSnap and other sites on the Internet.
              </li>
              <li>
                <strong>Opt-Out of Personalized Advertising:</strong> You may opt out of personalized advertising by visiting{' '}
                <a
                  href="https://adssettings.google.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-emerald-400 underline"
                >
                  Google Ads Settings
                </a>. Alternatively, you can opt out of a third-party vendor&apos;s use of cookies for personalized advertising by visiting{' '}
                <a
                  href="https://www.aboutads.info/choices/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-emerald-400 underline"
                >
                  www.aboutads.info
                </a>{' '}
                or the Network Advertising Initiative at{' '}
                <a
                  href="https://optout.networkadvertising.org/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-emerald-400 underline"
                >
                  optout.networkadvertising.org
                </a>.
              </li>
              <li>
                <strong>Non-Personalized Ads:</strong> For users located in the European Economic Area (EEA), the UK, and Switzerland, advertisements served adhere to consent choices submitted via our Interactive Advertising Bureau (IAB) compliant cookie consent mechanism.
              </li>
            </ul>
          </section>

          {/* Section 4: Web Analytics */}
          <section>
            <h2 className="text-xl sm:text-2xl font-bold text-white mb-3">
              4. Web Analytics (Google Analytics 4)
            </h2>
            <p>
              We utilize Google Analytics 4 (GA4) to evaluate aggregate website traffic, understand which regional calculators (e.g., California vs. Ontario) are most frequently utilized, and diagnose technical errors. GA4 collects pseudonymized metrics including device type, operating system, browser configuration, page views, and approximate geographic region (city/state level).
            </p>
            <p className="mt-3">
              GA4 IP anonymization is active by default. You can prevent Google Analytics from identifying you on any website by installing the official{' '}
              <a
                href="https://tools.google.com/dlpage/gaoptout"
                target="_blank"
                rel="noopener noreferrer"
                className="text-emerald-400 underline"
              >
                Google Analytics Opt-out Browser Add-on
              </a>.
            </p>
          </section>

          {/* Section 5: International Privacy Rights */}
          <section className="bg-surface border border-border rounded-2xl p-6 sm:p-8">
            <h2 className="text-xl sm:text-2xl font-bold text-white mb-3">
              5. Regional Data Protection Rights
            </h2>

            <div className="space-y-4 text-sm">
              <div>
                <h3 className="font-bold text-white">United States (CCPA / CPRA)</h3>
                <p className="text-muted mt-1">
                  California residents have the right to request disclosure of personal information collected, request deletion of personal information, and opt out of the sale or sharing of personal information. Because GridSnap operates client-side and does not sell or share personal data, we do not monetize user timesheet data under any circumstance.
                </p>
              </div>

              <div>
                <h3 className="font-bold text-white">Canada (PIPEDA)</h3>
                <p className="text-muted mt-1">
                  Under the Personal Information Protection and Electronic Documents Act, Canadian individuals have the right to know why their information is collected, how it is used, and to ensure its accuracy.
                </p>
              </div>

              <div>
                <h3 className="font-bold text-white">Australia (Privacy Act 1988) & New Zealand (Privacy Act 2020)</h3>
                <p className="text-muted mt-1">
                  Users in Australia and New Zealand enjoy the statutory rights outlined under the Australian Privacy Principles (APPs) and Information Privacy Principles (IPPs), ensuring open and transparent management of personal data.
                </p>
              </div>

              <div>
                <h3 className="font-bold text-white">European Union & UK (GDPR)</h3>
                <p className="text-muted mt-1">
                  Residents of the EEA and United Kingdom possess the right of access, rectification, erasure, restriction of processing, and data portability in accordance with Articles 15–20 of Regulation (EU) 2016/679.
                </p>
              </div>
            </div>
          </section>

          {/* Section 6: Children's Privacy */}
          <section>
            <h2 className="text-xl sm:text-2xl font-bold text-white mb-3">6. Children&apos;s Privacy (COPPA)</h2>
            <p>
              GridSnap Work Tools is intended for use by working adults, wage earners, payroll managers, and contractors. We do not knowingly solicit or collect personal information from individuals under the age of 13.
            </p>
          </section>

          {/* Section 7: Contact Information */}
          <section className="border-t border-border pt-6">
            <h2 className="text-xl sm:text-2xl font-bold text-white mb-3">7. Privacy Officer Contact Details</h2>
            <p>
              If you have any questions, comments, or statutory rights requests regarding this Privacy Policy, please contact our designated Data Protection Officer:
            </p>
            <div className="mt-3 p-4 rounded-xl bg-surface2 border border-border text-sm">
              <p className="font-semibold text-white">GridSnap Work Tools Privacy Compliance Office</p>
              <p className="text-muted">
                Email:{' '}
                <a href="mailto:privacy@gridsnap.studio" className="text-emerald-400 underline font-mono">
                  privacy@gridsnap.studio
                </a>{' '}
                or{' '}
                <a href="mailto:support@gridsnap.studio" className="text-emerald-400 underline font-mono">
                  support@gridsnap.studio
                </a>
              </p>
              <p className="text-muted">Website: https://gridsnap.studio</p>
            </div>
          </section>
        </article>
      </div>
    </div>
  );
}
