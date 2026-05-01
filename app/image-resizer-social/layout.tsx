import type { Metadata } from 'next';

const BASE = 'https://gridsnap.studio';

export const metadata: Metadata = {
  title: 'Social Media Image Resizer Free — All Platform Sizes | GridSnap',
  description: 'Resize any image for Instagram, Twitter/X, Facebook, LinkedIn, YouTube & TikTok in one click. 20+ size presets. Free, works in your browser — no upload, no signup needed.',
  keywords: ['social media image resizer free', 'instagram image size tool', 'resize image for instagram', 'facebook image resizer', 'youtube thumbnail size', 'social media image dimensions'],
  alternates: { canonical: `${BASE}/image-resizer-social` },
  openGraph: {
    title: 'Social Media Image Resizer — All Platform Sizes | GridSnap',
    description: 'Resize images for Instagram, Twitter, Facebook, YouTube & TikTok. 20+ presets. Free, in-browser, no signup.',
    url: `${BASE}/image-resizer-social`,
    siteName: 'GridSnap',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Social Media Image Resizer | GridSnap',
    description: 'Resize images for all platforms — Instagram, Twitter, Facebook, YouTube & TikTok. Free & instant.',
  },
};

const breadcrumb = JSON.stringify({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: BASE },
    { '@type': 'ListItem', position: 2, name: 'Image Resizer', item: `${BASE}/image-resizer-social` },
  ],
});

const howTo = JSON.stringify({
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to resize an image for social media',
  description: 'Step-by-step guide to resize any image for Instagram, Twitter, Facebook, and other platforms.',
  step: [
    { '@type': 'HowToStep', position: 1, name: 'Upload your image', text: 'Drag and drop or click to upload any JPG, PNG, or WEBP image.' },
    { '@type': 'HowToStep', position: 2, name: 'Select a platform', text: 'Choose Instagram, Twitter, Facebook, YouTube, LinkedIn, or TikTok.' },
    { '@type': 'HowToStep', position: 3, name: 'Download', text: 'Click "Download PNG" for a single size, or "Download All (ZIP)" for every size at once.' },
  ],
});

const faq = JSON.stringify({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    { '@type': 'Question', name: 'What is the correct image size for Instagram posts?', acceptedAnswer: { '@type': 'Answer', text: 'Instagram supports: Square (1080×1080 px), Portrait (1080×1350 px), Landscape (1080×566 px). Stories and Reels use 1080×1920 px.' } },
    { '@type': 'Question', name: 'What is the Twitter/X header image size?', acceptedAnswer: { '@type': 'Answer', text: 'The recommended Twitter/X header size is 1500×500 pixels. For posts, use 1200×675 px.' } },
    { '@type': 'Question', name: 'What size should a YouTube thumbnail be?', acceptedAnswer: { '@type': 'Answer', text: 'YouTube recommends 1280×720 pixels (16:9 ratio), under 2 MB, in JPG, PNG, or WEBP format.' } },
    { '@type': 'Question', name: 'Does this image resizer upload my photos to a server?', acceptedAnswer: { '@type': 'Answer', text: "No! GridSnap's resizer works entirely in your browser using the Canvas API. Your images are never uploaded to any server." } },
    { '@type': 'Question', name: 'Can I download all Instagram sizes at once?', acceptedAnswer: { '@type': 'Answer', text: "Yes! Select Instagram, then click 'Download All (ZIP)' to get all 5 Instagram sizes in a single ZIP file." } },
  ],
});

export default function ImageResizerLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: breadcrumb }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: howTo }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: faq }} />
      {children}
    </>
  );
}
