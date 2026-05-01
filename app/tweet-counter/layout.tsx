import type { Metadata } from 'next';

const BASE = 'https://gridsnap.studio';

export const metadata: Metadata = {
  title: 'Twitter Character Counter Free Online — Thread Splitter | GridSnap',
  description: 'Free character counter for Twitter/X (280), LinkedIn (3000), Instagram (2200), Facebook & TikTok. Auto-split long posts into numbered tweet threads. Live count, no signup needed.',
  keywords: ['tweet character counter', 'twitter character counter online free', 'twitter thread splitter', 'linkedin character limit', 'social media character counter', '280 character limit checker'],
  alternates: { canonical: `${BASE}/tweet-counter` },
  openGraph: {
    title: 'Twitter Character Counter & Thread Splitter — Free | GridSnap',
    description: 'Count characters for Twitter, LinkedIn, Instagram & more. Auto-split long text into tweet threads. Free, instant.',
    url: `${BASE}/tweet-counter`,
    siteName: 'GridSnap',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Twitter Character Counter & Thread Splitter | GridSnap',
    description: 'Count characters for all social platforms and auto-split long texts into numbered Twitter threads.',
  },
};

const breadcrumb = JSON.stringify({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: BASE },
    { '@type': 'ListItem', position: 2, name: 'Tweet Counter', item: `${BASE}/tweet-counter` },
  ],
});

const faq = JSON.stringify({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    { '@type': 'Question', name: "What is Twitter's character limit in 2025?", acceptedAnswer: { '@type': 'Answer', text: 'Twitter/X has a 280-character limit. URLs always count as 23 characters regardless of length. Our counter handles this automatically.' } },
    { '@type': 'Question', name: "What is LinkedIn's character limit for posts?", acceptedAnswer: { '@type': 'Answer', text: 'LinkedIn allows up to 3,000 characters for regular posts.' } },
    { '@type': 'Question', name: 'How do I split a long tweet into a thread automatically?', acceptedAnswer: { '@type': 'Answer', text: "Type your full text, select Twitter/X, and when it exceeds 280 characters the 'Auto-Split into Thread' button appears. Click it to split your text into numbered tweet-sized pieces." } },
    { '@type': 'Question', name: 'Do URLs count as 23 characters on Twitter?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. Twitter wraps all URLs using t.co, making every link count as exactly 23 characters. Our counter accounts for this in real time.' } },
    { '@type': 'Question', name: 'What is the Instagram caption character limit?', acceptedAnswer: { '@type': 'Answer', text: 'Instagram captions can be up to 2,200 characters. Only the first 125 appear before the "more" button, so put key info first.' } },
  ],
});

export default function TweetCounterLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: breadcrumb }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: faq }} />
      {children}
    </>
  );
}
