import type { Metadata } from 'next';
import './globals.css';
import Header from '../components/Header';
import Footer from '../components/Footer';

export const metadata: Metadata = {
  title: 'GridSnap — Free Social Media Tools: Hashtag Generator, Bio, Image Resizer',
  description: 'AI-powered bio generator, hashtag finder, image resizer for every platform including Instagram, TikTok, and Twitter.',
  openGraph: {
    title: 'GridSnap — Free Social Media Tools',
    description: 'Grow your audience faster with free tools for Instagram, TikTok, and Twitter.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'GridSnap — Free Social Media Tools',
    description: 'Grow your audience faster with free tools for Instagram, TikTok, and Twitter.',
  },
  alternates: {
    canonical: '/',
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "GridSnap",
    "description": "Free online social media tools suite including hashtag generator, bio generator, and image resizer.",
    "applicationCategory": "UtilitiesApplication",
    "operatingSystem": "All",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    }
  };

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      </head>
      <body className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
