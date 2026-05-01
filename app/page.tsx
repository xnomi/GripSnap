import Link from 'next/link';
import type { Metadata } from 'next';
import AdUnit from '@/components/AdUnit';

const BASE = 'https://gridsnap.studio';

export const metadata: Metadata = {
  title: 'GridSnap — Free Social Media Tools: Hashtag Generator, Bio, Image Resizer',
  description: 'Free AI-powered social media tools for creators: Instagram bio generator, hashtag finder, image resizer for every platform, tweet character counter & YouTube thumbnail downloader. No signup needed.',
  alternates: { canonical: BASE },
};

const tools = [
  {
    title: 'Instagram Bio Generator',
    description: 'Generate 5 AI-powered bio variations for Instagram, Twitter, LinkedIn & TikTok with perfect character counts.',
    href: '/bio-generator',
    icon: '✨',
    platforms: ['Instagram', 'Twitter', 'LinkedIn', 'TikTok'],
    cta: 'Generate Bio',
  },
  {
    title: 'Hashtag Generator',
    description: 'Find niche, trending & broad hashtags with estimated reach levels to maximize your content discovery.',
    href: '/hashtag-generator',
    icon: '#️⃣',
    platforms: ['Instagram', 'TikTok', 'Twitter', 'LinkedIn'],
    cta: 'Find Hashtags',
  },
  {
    title: 'Social Media Image Resizer',
    description: 'Resize any image to exact platform dimensions for Instagram, Twitter, Facebook, YouTube, TikTok & LinkedIn.',
    href: '/image-resizer-social',
    icon: '🖼️',
    platforms: ['Instagram', 'Twitter', 'Facebook', 'YouTube', 'LinkedIn', 'TikTok'],
    cta: 'Resize Image',
  },
  {
    title: 'Tweet Character Counter',
    description: 'Count characters across Twitter, LinkedIn, Instagram & Facebook. Auto-split long text into numbered threads.',
    href: '/tweet-counter',
    icon: '📝',
    platforms: ['Twitter', 'LinkedIn', 'Instagram', 'Facebook'],
    cta: 'Count Characters',
  },
  {
    title: 'YouTube Thumbnail Downloader',
    description: 'Download any YouTube thumbnail in Max HD, HQ, MQ & SD quality instantly — no API key, no login.',
    href: '/youtube-thumbnail',
    icon: '▶️',
    platforms: ['YouTube'],
    cta: 'Download Thumbnail',
  },
];

const stats = [
  { value: '50,000+', label: 'Creators use GridSnap' },
  { value: '5', label: 'Free tools, no signup' },
  { value: '20+', label: 'Platform size presets' },
  { value: '100%', label: 'Runs in your browser' },
];

const platformSizes = [
  { platform: 'Instagram', type: 'Square Post', size: '1080 × 1080 px' },
  { platform: 'Instagram', type: 'Portrait Post', size: '1080 × 1350 px' },
  { platform: 'Instagram', type: 'Story / Reel', size: '1080 × 1920 px' },
  { platform: 'Instagram', type: 'Profile Photo', size: '110 × 110 px' },
  { platform: 'Twitter/X', type: 'Profile Header', size: '1500 × 500 px' },
  { platform: 'Twitter/X', type: 'Post Image', size: '1200 × 675 px' },
  { platform: 'Twitter/X', type: 'Profile Photo', size: '400 × 400 px' },
  { platform: 'Facebook', type: 'Cover Photo', size: '851 × 315 px' },
  { platform: 'Facebook', type: 'Post Image', size: '1200 × 630 px' },
  { platform: 'LinkedIn', type: 'Banner', size: '1584 × 396 px' },
  { platform: 'LinkedIn', type: 'Post Image', size: '1200 × 627 px' },
  { platform: 'YouTube', type: 'Thumbnail', size: '1280 × 720 px' },
  { platform: 'YouTube', type: 'Channel Banner', size: '2560 × 1440 px' },
  { platform: 'TikTok', type: 'Video Cover', size: '1080 × 1920 px' },
  { platform: 'TikTok', type: 'Profile Photo', size: '200 × 200 px' },
];

export default function Home() {
  return (
    <div className="flex flex-col items-center">

      {/* ── Hero ── */}
      <section className="w-full relative py-24 px-4 overflow-hidden flex flex-col items-center justify-center text-center">
        <div className="absolute inset-0 bg-gradient-primary opacity-10 z-0 animate-gradient-x" />
        <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center gap-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-surface2 border border-border text-sm font-medium">
            <span className="animate-pulse">🔥</span> Used by 50,000+ creators worldwide
          </div>
          <h1 className="font-clash text-5xl md:text-7xl font-bold tracking-tight leading-tight">
            <span className="text-gradient">Free Social Media Tools</span>
            <br />
            <span className="text-text">Grow Your Audience Faster</span>
          </h1>
          <p className="text-lg md:text-xl text-muted max-w-2xl">
            AI-powered Instagram bio generator, hashtag finder, image resizer for every platform, tweet character counter, and YouTube thumbnail downloader — all free, all instant.
          </p>
          <div className="flex flex-wrap justify-center gap-4 mt-4">
            <Link href="/bio-generator" className="px-6 py-3 bg-gradient rounded-xl text-bg font-bold hover:opacity-90 transition-opacity">
              ✨ Generate Bio
            </Link>
            <Link href="/hashtag-generator" className="px-6 py-3 bg-surface2 border border-border rounded-xl text-text font-bold hover:border-accent transition-colors">
              #️⃣ Find Hashtags
            </Link>
          </div>
        </div>
      </section>

      {/* ── Stats Bar ── */}
      <section className="w-full bg-surface border-y border-border py-8 px-4">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {stats.map(s => (
            <div key={s.label}>
              <p className="font-clash text-3xl font-bold text-gradient">{s.value}</p>
              <p className="text-sm text-muted mt-1">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4">
        <AdUnit slot="auto-slot" format="auto" className="my-10" />
      </div>

      {/* ── Tools Grid ── */}
      <section className="w-full max-w-7xl mx-auto px-4 py-16" aria-label="Free social media tools">
        <h2 className="font-clash text-4xl font-bold mb-3 text-center">All Free Social Media Tools</h2>
        <p className="text-muted text-center mb-12 max-w-2xl mx-auto">
          Every tool works instantly in your browser. No accounts, no installs, no watermarks.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tools.map(tool => (
            <Link key={tool.href} href={tool.href} className="card-hover group block p-1 rounded-2xl bg-surface border border-border">
              <div className="bg-surface h-full rounded-xl p-6 flex flex-col gap-4">
                <div className="text-4xl">{tool.icon}</div>
                <h3 className="font-clash text-xl font-semibold group-hover:text-accent transition-colors">{tool.title}</h3>
                <p className="text-muted flex-grow text-sm">{tool.description}</p>
                <div className="flex flex-wrap gap-2 mb-3">
                  {tool.platforms.map(p => (
                    <span key={p} className="text-xs font-medium px-2 py-1 rounded-md bg-surface2 text-muted">{p}</span>
                  ))}
                </div>
                <span className="text-sm font-semibold text-accent group-hover:underline">{tool.cta} →</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ── How It Works ── */}
      <section className="w-full bg-surface border-y border-border py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-clash text-4xl font-bold mb-3">How GridSnap Works</h2>
          <p className="text-muted mb-12">Three simple steps — no account, no waiting.</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { step: '01', title: 'Pick a Tool', desc: 'Choose from bio generator, hashtag finder, image resizer, tweet counter, or YouTube thumbnail downloader.' },
              { step: '02', title: 'Enter Your Info', desc: 'Type your keywords, topic, or upload an image. Our AI does the heavy lifting in seconds.' },
              { step: '03', title: 'Copy & Post', desc: 'Copy your result directly to your clipboard and paste it straight into Instagram, TikTok, or wherever you post.' },
            ].map(item => (
              <div key={item.step} className="flex flex-col items-center gap-3">
                <div className="w-14 h-14 rounded-full bg-gradient flex items-center justify-center text-bg font-clash font-bold text-lg">{item.step}</div>
                <h3 className="font-clash text-xl font-semibold">{item.title}</h3>
                <p className="text-muted text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Platform Size Guide (Link Magnet) ── */}
      <section className="w-full max-w-5xl mx-auto px-4 py-16" id="social-media-image-sizes">
        <h2 className="font-clash text-4xl font-bold mb-3">Social Media Image Sizes Guide 2025</h2>
        <p className="text-muted mb-8">
          Use this reference table to find the correct image dimensions for every platform. Use our free{' '}
          <Link href="/image-resizer-social" className="text-accent hover:underline">social media image resizer</Link> to resize in one click.
        </p>
        <div className="overflow-x-auto rounded-2xl border border-border">
          <table className="w-full text-sm" aria-label="Social media image size guide 2025">
            <thead className="bg-surface2">
              <tr>
                <th className="px-4 py-3 text-left font-semibold text-text">Platform</th>
                <th className="px-4 py-3 text-left font-semibold text-text">Image Type</th>
                <th className="px-4 py-3 text-left font-semibold text-accent font-fira">Dimensions</th>
              </tr>
            </thead>
            <tbody>
              {platformSizes.map((row, i) => (
                <tr key={i} className={`border-t border-border ${i % 2 === 0 ? 'bg-surface' : 'bg-surface/50'} hover:bg-surface2 transition-colors`}>
                  <td className="px-4 py-3 text-text font-medium">{row.platform}</td>
                  <td className="px-4 py-3 text-muted">{row.type}</td>
                  <td className="px-4 py-3 font-fira text-accent3 font-medium">{row.size}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-muted mt-4">
          Need to resize? Use our free <Link href="/image-resizer-social" className="text-accent hover:underline">Social Media Image Resizer</Link> — no upload required, works in your browser.
        </p>
      </section>

      {/* ── Why GridSnap (E-E-A-T) ── */}
      <section className="w-full bg-surface border-y border-border py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-clash text-4xl font-bold mb-10 text-center">Why Creators Choose GridSnap</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {[
              { icon: '🔒', title: 'Private by Default', desc: 'All tools run in your browser. Your images and text never leave your device.' },
              { icon: '⚡', title: 'Instant Results', desc: 'No loading spinners. Character counts are live, images resize instantly.' },
              { icon: '🆓', title: 'Always Free', desc: 'No premium tiers, no paywalls, no watermarks. Every tool is 100% free forever.' },
              { icon: '📱', title: 'Mobile-First', desc: 'Built for creators on the go. Works perfectly on every phone and tablet.' },
            ].map(item => (
              <div key={item.title} className="flex gap-4 p-5 bg-surface2 rounded-xl border border-border">
                <span className="text-3xl flex-shrink-0">{item.icon}</span>
                <div>
                  <h3 className="font-semibold text-base mb-1">{item.title}</h3>
                  <p className="text-muted text-sm">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
