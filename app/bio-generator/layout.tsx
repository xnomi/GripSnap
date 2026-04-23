import type { Metadata } from 'next';

const BASE = 'https://gridsnap.app';

export const metadata: Metadata = {
  title: 'Free Instagram Bio Generator Online — AI-Powered Social Bios | GridSnap',
  description: 'Generate the perfect Instagram bio instantly with AI. Get 5 unique bio variations optimized for Instagram (150 chars), Twitter/X (160), LinkedIn (220) & TikTok (80). Free, no signup needed.',
  keywords: ['instagram bio generator free', 'ai bio generator', 'social media bio generator', 'tiktok bio generator', 'twitter bio generator', 'linkedin bio generator'],
  alternates: { canonical: `${BASE}/bio-generator` },
  openGraph: {
    title: 'Free Instagram Bio Generator Online — AI-Powered | GridSnap',
    description: 'Generate 5 AI bio variations for Instagram, Twitter, LinkedIn & TikTok in seconds. Free, no signup.',
    url: `${BASE}/bio-generator`,
    siteName: 'GridSnap',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Instagram Bio Generator — AI-Powered | GridSnap',
    description: 'Generate 5 AI bio variations for Instagram, Twitter, LinkedIn & TikTok in seconds.',
  },
};

const breadcrumb = JSON.stringify({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: BASE },
    { '@type': 'ListItem', position: 2, name: 'Bio Generator', item: `${BASE}/bio-generator` },
  ],
});

const faq = JSON.stringify({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    { '@type': 'Question', name: 'How do I write a good Instagram bio?', acceptedAnswer: { '@type': 'Answer', text: 'A great Instagram bio includes your name, what you do, a value proposition, a CTA, and relevant emojis. Keep it under 150 characters.' } },
    { '@type': 'Question', name: 'How many characters can an Instagram bio be?', acceptedAnswer: { '@type': 'Answer', text: 'Instagram allows up to 150 characters in your bio. Our generator shows a live counter so you never exceed the limit.' } },
    { '@type': 'Question', name: 'Can I use emojis in my Instagram bio?', acceptedAnswer: { '@type': 'Answer', text: 'Yes! Emojis add personality and help communicate your niche quickly. Our AI automatically includes relevant emojis.' } },
    { '@type': 'Question', name: 'What is a good LinkedIn bio?', acceptedAnswer: { '@type': 'Answer', text: 'A good LinkedIn headline is professional, keyword-rich, and explains your value in 220 characters. Focus on your role and achievements.' } },
    { '@type': 'Question', name: 'Is this bio generator really free?', acceptedAnswer: { '@type': 'Answer', text: "Yes! GridSnap's bio generator is 100% free with no signup. Generate unlimited bios for Instagram, Twitter, LinkedIn, and TikTok." } },
  ],
});

const webApp = JSON.stringify({
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Free Instagram Bio Generator',
  url: `${BASE}/bio-generator`,
  description: 'AI-powered bio generator for Instagram, TikTok, Twitter, and LinkedIn.',
  applicationCategory: 'UtilitiesApplication',
  operatingSystem: 'All',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
});

export default function BioLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: breadcrumb }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: faq }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: webApp }} />
      {children}
    </>
  );
}
