import type { Metadata } from 'next';

const BASE = 'https://gridsnap.app';

export const metadata: Metadata = {
  title: 'Free Hashtag Generator Online — Instagram TikTok Twitter | GridSnap',
  description: 'Find the best hashtags for Instagram, TikTok, Twitter & LinkedIn instantly. AI groups tags into niche, trending & broad categories with estimated reach. Free online hashtag finder — no signup.',
  keywords: ['hashtag generator free', 'instagram hashtag generator', 'tiktok hashtag generator', 'twitter hashtag generator', 'best hashtags for instagram', 'trending hashtags', 'niche hashtags'],
  alternates: { canonical: `${BASE}/hashtag-generator` },
  openGraph: {
    title: 'Free Hashtag Generator — Instagram, TikTok, Twitter | GridSnap',
    description: 'Find niche, trending & broad hashtags to boost your reach on Instagram, TikTok, Twitter & LinkedIn. Free, AI-powered.',
    url: `${BASE}/hashtag-generator`,
    siteName: 'GridSnap',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Hashtag Generator Online | GridSnap',
    description: 'Find niche, trending & broad hashtags for Instagram, TikTok, Twitter & LinkedIn. Free.',
  },
};

const breadcrumb = JSON.stringify({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: BASE },
    { '@type': 'ListItem', position: 2, name: 'Hashtag Generator', item: `${BASE}/hashtag-generator` },
  ],
});

const faq = JSON.stringify({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    { '@type': 'Question', name: 'How many hashtags should I use on Instagram?', acceptedAnswer: { '@type': 'Answer', text: 'Instagram allows up to 30 hashtags per post. Best practices suggest using 3–10 highly relevant hashtags for maximum impact in 2025.' } },
    { '@type': 'Question', name: 'Do hashtags still work on Instagram in 2025?', acceptedAnswer: { '@type': 'Answer', text: 'Yes, hashtags are still a critical part of Instagram SEO. They categorize your content so it appears in search results and Explore pages.' } },
    { '@type': 'Question', name: 'What are the best hashtags for getting followers?', acceptedAnswer: { '@type': 'Answer', text: 'The best hashtags mix broad (high reach) and niche (low competition) tags. Avoid generic tags like #followforfollow.' } },
    { '@type': 'Question', name: 'Should I use popular or niche hashtags?', acceptedAnswer: { '@type': 'Answer', text: 'Use both. Popular tags give a short burst of wide exposure. Niche tags help you rank in a smaller category for longer.' } },
    { '@type': 'Question', name: 'How do I find trending hashtags?', acceptedAnswer: { '@type': 'Answer', text: 'Enter your topic in our free hashtag generator above. Our AI identifies currently trending hashtags related to your niche instantly.' } },
  ],
});

const webApp = JSON.stringify({
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Free Hashtag Generator',
  url: `${BASE}/hashtag-generator`,
  description: 'AI-powered hashtag generator for Instagram, TikTok, Twitter, and LinkedIn.',
  applicationCategory: 'UtilitiesApplication',
  operatingSystem: 'All',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
});

export default function HashtagLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: breadcrumb }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: faq }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: webApp }} />
      {children}
    </>
  );
}
