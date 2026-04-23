import type { Metadata } from 'next';

const BASE = 'https://gridsnap.app';

export const metadata: Metadata = {
  title: 'YouTube Thumbnail Downloader Free — All Quality Sizes HD | GridSnap',
  description: 'Download any YouTube video thumbnail in Max Resolution (1280×720), HQ, MQ, SD & default quality. Just paste the URL — no API key, no login. Works instantly, 100% free.',
  keywords: ['youtube thumbnail downloader free', 'download youtube thumbnail', 'youtube thumbnail hd download', 'youtube thumbnail extractor', 'save youtube thumbnail', 'youtube maxresdefault'],
  alternates: { canonical: `${BASE}/youtube-thumbnail` },
  openGraph: {
    title: 'YouTube Thumbnail Downloader Free — HD Quality | GridSnap',
    description: 'Download any YouTube thumbnail in HD, HQ, MQ & SD quality instantly. No API key, no login required.',
    url: `${BASE}/youtube-thumbnail`,
    siteName: 'GridSnap',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free YouTube Thumbnail Downloader | GridSnap',
    description: 'Download YouTube thumbnails in all quality sizes instantly. No API key or signup needed.',
  },
};

const breadcrumb = JSON.stringify({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: BASE },
    { '@type': 'ListItem', position: 2, name: 'YouTube Thumbnail Downloader', item: `${BASE}/youtube-thumbnail` },
  ],
});

const howTo = JSON.stringify({
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to download a YouTube video thumbnail',
  description: 'Download any YouTube thumbnail in HD quality in just two steps.',
  step: [
    { '@type': 'HowToStep', position: 1, name: 'Paste the YouTube URL', text: 'Copy the URL of any YouTube video and paste it into the input box.' },
    { '@type': 'HowToStep', position: 2, name: 'Click Get Thumbnails', text: "Click 'Get Thumbnails' to instantly preview all available thumbnail sizes." },
    { '@type': 'HowToStep', position: 3, name: 'Download your chosen quality', text: "Click 'Download' next to the resolution you want to save it to your device." },
  ],
});

const faq = JSON.stringify({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    { '@type': 'Question', name: 'How do I download a YouTube thumbnail for free?', acceptedAnswer: { '@type': 'Answer', text: "Paste the YouTube video URL into GridSnap's downloader and click 'Get Thumbnails.' All available sizes appear instantly with download buttons." } },
    { '@type': 'Question', name: 'What is the highest quality YouTube thumbnail?', acceptedAnswer: { '@type': 'Answer', text: "The highest quality is 'maxresdefault' at 1280×720 pixels (HD). Older videos may only have 'hqdefault' at 480×360." } },
    { '@type': 'Question', name: 'Is it legal to download YouTube thumbnails?', acceptedAnswer: { '@type': 'Answer', text: "YouTube thumbnails are publicly accessible images but may be copyrighted. Use them for personal use or with the creator's permission." } },
    { '@type': 'Question', name: 'Can I download thumbnails without a YouTube API key?', acceptedAnswer: { '@type': 'Answer', text: 'Yes! YouTube thumbnails are served at public URLs (img.youtube.com/vi/VIDEO_ID/quality.jpg). No API key is needed.' } },
    { '@type': 'Question', name: 'What YouTube thumbnail size should I use for my own videos?', acceptedAnswer: { '@type': 'Answer', text: 'YouTube recommends 1280×720 pixels (16:9 ratio), under 2 MB, in JPG, PNG, or WEBP format.' } },
  ],
});

export default function YoutubeThumbnailLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: breadcrumb }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: howTo }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: faq }} />
      {children}
    </>
  );
}
