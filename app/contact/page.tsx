import type { Metadata } from 'next';
import ContactForm from '@/components/ContactForm';
import Link from 'next/link';

const BASE = 'https://gridsnap.studio';

export const metadata: Metadata = {
  title: 'Contact GridSnap Work Tools | Technical Support & Publisher Office',
  description:
    'Get in touch with GridSnap Work Tools. Contact our editorial board, report calculation bugs, or request custom regional wage calculators. Dedicated support: support@gridsnap.studio.',
  alternates: {
    canonical: `${BASE}/contact`,
  },
  openGraph: {
    title: 'Contact GridSnap Work Tools | Support & Publisher Office',
    description:
      'Reach the GridSnap engineering and payroll compliance editorial team. Dedicated email: support@gridsnap.studio.',
    url: `${BASE}/contact`,
    siteName: 'GridSnap Work Tools',
    locale: 'en_US',
    type: 'website',
  },
};

export default function ContactPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    name: 'Contact GridSnap Work Tools',
    url: `${BASE}/contact`,
    description: 'Contact information, customer support, and editorial channels for GridSnap Work Tools.',
    mainEntity: {
      '@type': 'Organization',
      name: 'GridSnap Work Tools',
      url: BASE,
      email: 'support@gridsnap.studio',
      contactPoint: {
        '@type': 'ContactPoint',
        contactType: 'technical support',
        email: 'support@gridsnap.studio',
        url: `${BASE}/contact`,
        availableLanguage: 'English',
        hoursAvailable: 'Mo-Fr 09:00-17:00',
      },
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
            Verified Communication Channels
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight mb-4">
            Contact Support & Editorial Office
          </h1>
          <p className="text-lg text-muted max-w-2xl mx-auto">
            Have questions about statutory overtime rules, calculation formulas, or need technical assistance? Our engineering and compliance team is here to assist.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Details Card */}
          <div className="space-y-6 lg:col-span-1">
            <div className="bg-surface border border-border rounded-2xl p-6 space-y-4">
              <h2 className="font-bold text-white text-lg">Direct Channels</h2>

              <div className="space-y-3 text-sm">
                <div>
                  <span className="block text-xs uppercase tracking-wider text-muted font-semibold">
                    Support & Editorial Email
                  </span>
                  <a
                    href="mailto:support@gridsnap.studio"
                    className="text-emerald-400 hover:underline font-mono text-sm break-all font-semibold"
                  >
                    support@gridsnap.studio
                  </a>
                </div>

                <div>
                  <span className="block text-xs uppercase tracking-wider text-muted font-semibold">
                    Response Commitment
                  </span>
                  <span className="text-white">Within 24 business hours (Mon–Fri)</span>
                </div>

                <div>
                  <span className="block text-xs uppercase tracking-wider text-muted font-semibold">
                    Operating Hours
                  </span>
                  <span className="text-white">9:00 AM – 5:00 PM (EST / UTC-5)</span>
                </div>
              </div>
            </div>

            <div className="bg-surface border border-border rounded-2xl p-6 space-y-3">
              <h2 className="font-bold text-white text-lg">Publisher Identity</h2>
              <div className="text-xs text-muted leading-relaxed space-y-2">
                <p>
                  <strong className="text-white">Entity:</strong> GridSnap Digital Work Tools & Publications
                </p>
                <p>
                  <strong className="text-white">Domain:</strong> gridsnap.studio
                </p>
                <p>
                  <strong className="text-white">Jurisdictional Coverage:</strong> United States, Canada, Australia, and New Zealand.
                </p>
                <p>
                  <strong className="text-white">Compliance Standard:</strong> ISO/IEC 27001 privacy principles, CCPA/CPRA, and PIPEDA client-side data isolation.
                </p>
              </div>
            </div>
          </div>

          {/* Form Card */}
          <div className="lg:col-span-2">
            <div className="bg-surface border border-border rounded-2xl p-6 sm:p-8">
              <h2 className="text-2xl font-bold text-white mb-2">Send an Inquiry</h2>
              <p className="text-sm text-muted mb-6">
                Fill out the form below and your message will be routed directly to the appropriate engineering or editorial reviewer.
              </p>
              <ContactForm />
            </div>
          </div>
        </div>

        {/* Quick FAQ Strip */}
        <div className="mt-16 pt-8 border-t border-border grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm text-muted">
          <div className="p-4 rounded-xl bg-surface2/40 border border-border">
            <h3 className="font-bold text-white mb-1">Found a calculation discrepancy?</h3>
            <p className="text-xs">
              Please include your jurisdiction (e.g., California or Ontario), exact punch times, and applicable award or labor code so our compliance engineers can review the formula immediately.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-surface2/40 border border-border">
            <h3 className="font-bold text-white mb-1">Do you store entered payroll data?</h3>
            <p className="text-xs">
              No. We have zero server-side access to any timesheet inputs. All calculations run client-side in your browser via HTML5 LocalStorage. Review our{' '}
              <Link href="/privacy-policy" className="text-emerald-400 hover:underline">
                Privacy Policy
              </Link>{' '}
              for details.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
