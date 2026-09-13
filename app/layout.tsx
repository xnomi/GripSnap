import type { Metadata } from 'next';
import Script from 'next/script';
import './globals.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import CookieConsent from '../components/CookieConsent';

const BASE = 'https://gridsnap.studio';

export const metadata: Metadata = {
  metadataBase: new URL(BASE),
  title: {
    default: 'Free Social Media Tools for Creators',
    template: '%s | GridSnap',
  },
  description: 'Free tools for Instagram bios, hashtags, image resizing, character counting, and YouTube thumbnails. No signup, no watermark, and instant results.',
  authors: [{ name: 'GridSnap', url: BASE }],
  creator: 'GridSnap',
  publisher: 'GridSnap',
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 },
  },
  alternates: { canonical: BASE },
  openGraph: {
    title: 'Free Social Media Tools for Creators | GridSnap',
    description: 'Create social media bios, find hashtags, resize images, count characters, and download YouTube thumbnails for free.',
    url: BASE,
    siteName: 'GridSnap',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Social Media Tools for Creators | GridSnap',
    description: 'Free tools for social media bios, hashtags, image sizes, character counts, and YouTube thumbnails.',
    creator: '@gridsnap',
    site: '@gridsnap',
  },
  other: {
    'google-adsense-account': 'ca-pub-1360321193594177',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const siteSchemas = [
    {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: 'GridSnap',
      url: BASE,
      description: 'Free social media tools for creators and marketers.',
    },
    {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: 'GridSnap',
      url: BASE,
      logo: `${BASE}/favicon.svg`,
      sameAs: [],
      contactPoint: {
        '@type': 'ContactPoint',
        contactType: 'customer service',
        email: 'hello@gridsnap.studio',
        url: `${BASE}/contact`,
        availableLanguage: 'English',
      },
    },
  ];

  return (
    <html lang="en">
      <head>
        {siteSchemas.map((s, i) => (
          <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }} />
        ))}
      </head>
      <body className="flex flex-col min-h-screen">
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
