import type { Metadata } from 'next';
import Script from 'next/script';
import './globals.css';
import Header from '../components/Header';
import Footer from '../components/Footer';

const BASE = 'https://gridsnap.app';

export const metadata: Metadata = {
  metadataBase: new URL(BASE),
  title: {
    default: 'GridSnap — Free Social Media Tools: Hashtag Generator, Bio, Image Resizer',
    template: '%s | GridSnap',
  },
  description: 'Free AI-powered social media tools: Instagram bio generator, hashtag finder, image resizer for every platform, tweet character counter & YouTube thumbnail downloader. No signup — instant results.',
  keywords: [
    'free social media tools',
    'instagram tools online free',
    'social media tools for creators',
    'hashtag generator free',
    'instagram bio generator free',
    'social media image resizer free',
    'tweet character counter online',
    'youtube thumbnail downloader free',
  ],
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
    title: 'GridSnap — Free Social Media Tools for Creators',
    description: 'AI bio generator, hashtag finder, image resizer, tweet counter & YouTube thumbnail downloader. All free, no signup.',
    url: BASE,
    siteName: 'GridSnap',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'GridSnap — Free Social Media Tools',
    description: 'AI bio generator, hashtag finder, image resizer & more. Free, no signup required.',
    creator: '@gridsnap',
    site: '@gridsnap',
  },
  verification: {
    // google: 'YOUR_GOOGLE_VERIFICATION_CODE', // Add after Google Search Console setup
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
      potentialAction: {
        '@type': 'SearchAction',
        target: { '@type': 'EntryPoint', urlTemplate: `${BASE}/?q={search_term_string}` },
        'query-input': 'required name=search_term_string',
      },
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
        <Script src="https://www.googletagmanager.com/gtag/js?id=G-S5NNCHC7V3" strategy="afterInteractive" />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-S5NNCHC7V3');
          `}
        </Script>
        <Header />
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
