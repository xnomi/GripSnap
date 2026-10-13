import type { Metadata } from 'next';
import Script from 'next/script';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CookieConsent from '@/components/CookieConsent';

const BASE = 'https://gridsnap.studio';

export const metadata: Metadata = {
  metadataBase: new URL(BASE),
  title: {
    default: 'Time Card Calculator with Lunch Breaks | Free Hours & Pay Tracker',
    template: '%s | GridSnap Work Tools',
  },
  description:
    'Calculate weekly and biweekly work hours, unpaid lunch breaks, overtime, and gross hourly pay with our free, private time card calculator. Export to PDF and CSV instantly.',
  keywords: [
    'time card calculator',
    'time card calculator with lunch breaks',
    'free time card calculator',
    'timesheet calculator',
    'hours worked calculator',
    'biweekly time card calculator',
    'overtime calculator',
    'calculate work hours',
    'decimal hours converter',
    'FLSA overtime calculator',
    'California daily overtime calculator',
    'Ontario overtime calculator',
    'Australia Fair Work calculator',
  ],
  authors: [{ name: 'GridSnap Work Tools Engineering & Editorial Board', url: `${BASE}/about` }],
  creator: 'GridSnap Work Tools',
  publisher: 'GridSnap Work Tools',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: BASE,
  },
  openGraph: {
    title: 'Time Card Calculator with Lunch Breaks | Free Hours & Pay Tracker',
    description:
      'Private, client-side weekly and biweekly work hours, unpaid lunch breaks, and gross overtime wage calculator. Export to PDF and CSV.',
    url: BASE,
    siteName: 'GridSnap Work Tools',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: `${BASE}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: 'GridSnap Work Tools - Time Card & Overtime Calculator',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Time Card Calculator with Lunch Breaks | Free Hours & Pay Tracker',
    description: 'Calculate work hours, overtime, and gross pay with instant PDF/CSV export.',
    images: [`${BASE}/og-image.jpg`],
  },
  verification: {
    google: 'googled1272d8019641336.html',
  },
  other: {
    'google-adsense-account': 'ca-pub-1360321193594177',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const globalSchemas = [
    {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: 'GridSnap Work Tools',
      url: BASE,
      description:
        'Authoritative, client-side wage, timesheet, and overtime calculation engine for US, Canada, Australia, and New Zealand.',
    },
    {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: 'GridSnap Work Tools',
      url: BASE,
      logo: `${BASE}/icon.svg`,
      email: 'support@gridsnap.studio',
      publishingPrinciples: `${BASE}/about`,
      contactPoint: {
        '@type': 'ContactPoint',
        contactType: 'customer support',
        email: 'support@gridsnap.studio',
        url: `${BASE}/contact`,
        availableLanguage: ['English'],
      },
      knowsAbout: [
        'U.S. Fair Labor Standards Act (FLSA)',
        'California Labor Code Section 510',
        'Ontario Employment Standards Act (ESA)',
        'Fair Work Act 2009 (Australia)',
        'Payroll Mathematics & Decimal Time Tracking',
      ],
    },
  ];

  return (
    <html lang="en">
      <head>
        {globalSchemas.map((schema, index) => (
          <script
            key={index}
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
          />
        ))}
      </head>
      <body className="flex flex-col min-h-screen bg-bg text-text antialiased">
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1360321193594177"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
        <Script src="https://www.googletagmanager.com/gtag/js?id=G-XC11P6N0EH" strategy="afterInteractive" />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-XC11P6N0EH');
          `}
        </Script>
        <Header />
        <main className="flex-grow">{children}</main>
        <Footer />
        <CookieConsent />
      </body>
    </html>
  );
}
