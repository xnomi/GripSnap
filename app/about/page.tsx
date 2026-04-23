import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'About GridSnap | Free Social Media Tools for Creators',
  description: 'Learn about GridSnap, the all-in-one suite of free social media tools built to help creators, marketers, and influencers grow their audience faster.',
};

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <div className="text-center mb-16">
        <h1 className="font-clash text-4xl md:text-6xl font-bold mb-6 text-gradient leading-tight">Empowering Creators <br className="hidden md:block"/> Everywhere</h1>
        <p className="text-xl text-muted max-w-2xl mx-auto">
          GridSnap is an all-in-one suite of free, fast, and privacy-focused social media tools designed to help you build your audience without the friction.
        </p>
      </div>

      <div className="prose prose-invert max-w-none space-y-8 text-muted leading-relaxed">
        <section>
          <h2 className="text-text font-clash text-3xl font-bold mb-4">Our Mission</h2>
          <p>
            In 2025, being a creator is harder than ever. Between algorithm changes, platform updates, and content burnout, creating the actual content is only half the battle. The other half is packaging it perfectly for every single platform.
          </p>
          <p>
            We built GridSnap because we were tired of encountering paywalls, watermarks, and slow, ad-ridden websites just to perform simple tasks like resizing an image, counting characters, or finding the right hashtags. Our mission is to provide <strong>premium-quality creator tools completely free of charge.</strong>
          </p>
        </section>

        <section className="bg-surface2 rounded-2xl p-8 my-12 border border-border">
          <h2 className="text-text font-clash text-2xl font-bold mb-6 mt-0">Why GridSnap?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-text font-semibold text-lg flex items-center gap-2"><span className="text-accent">⚡</span> Blazing Fast</h3>
              <p className="text-sm mt-2">No loading spinners or waiting queues. Our tools run directly in your browser or are powered by highly optimized edge APIs.</p>
            </div>
            <div>
              <h3 className="text-text font-semibold text-lg flex items-center gap-2"><span className="text-accent">🔒</span> Privacy First</h3>
              <p className="text-sm mt-2">Tools like our Image Resizer and Tweet Counter run entirely on your device. Your data never touches our servers.</p>
            </div>
            <div>
              <h3 className="text-text font-semibold text-lg flex items-center gap-2"><span className="text-accent">💸</span> 100% Free</h3>
              <p className="text-sm mt-2">No premium tiers, no credit cards, no &quot;unlock for high resolution.&quot; Every feature is available to everyone, always.</p>
            </div>
            <div>
              <h3 className="text-text font-semibold text-lg flex items-center gap-2"><span className="text-accent">🤖</span> AI Powered</h3>
              <p className="text-sm mt-2">We leverage state-of-the-art AI to take the guesswork out of writing bios and finding high-reach hashtags.</p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-text font-clash text-3xl font-bold mb-4">The Tools</h2>
          <p>Currently, GridSnap offers five core utilities tailored for modern social media platforms:</p>
          <ul className="list-none pl-0 space-y-4 mt-6">
            <li className="flex items-start gap-4 p-4 bg-surface rounded-xl border border-border">
              <span className="text-3xl">✨</span>
              <div>
                <Link href="/bio-generator" className="text-text font-semibold hover:text-accent transition-colors">Bio Generator</Link>
                <p className="text-sm mt-1">Craft AI-optimized profiles for Instagram, Twitter, LinkedIn, and TikTok.</p>
              </div>
            </li>
            <li className="flex items-start gap-4 p-4 bg-surface rounded-xl border border-border">
              <span className="text-3xl">#️⃣</span>
              <div>
                <Link href="/hashtag-generator" className="text-text font-semibold hover:text-accent transition-colors">Hashtag Generator</Link>
                <p className="text-sm mt-1">Discover the perfect mix of niche and trending hashtags to maximize organic reach.</p>
              </div>
            </li>
            <li className="flex items-start gap-4 p-4 bg-surface rounded-xl border border-border">
              <span className="text-3xl">🖼️</span>
              <div>
                <Link href="/image-resizer-social" className="text-text font-semibold hover:text-accent transition-colors">Image Resizer</Link>
                <p className="text-sm mt-1">Instantly crop and resize images for 20+ platform presets without uploading them to a server.</p>
              </div>
            </li>
            <li className="flex items-start gap-4 p-4 bg-surface rounded-xl border border-border">
              <span className="text-3xl">📝</span>
              <div>
                <Link href="/tweet-counter" className="text-text font-semibold hover:text-accent transition-colors">Tweet Counter</Link>
                <p className="text-sm mt-1">Check character limits and automatically split long texts into numbered Twitter threads.</p>
              </div>
            </li>
            <li className="flex items-start gap-4 p-4 bg-surface rounded-xl border border-border">
              <span className="text-3xl">▶️</span>
              <div>
                <Link href="/youtube-thumbnail" className="text-text font-semibold hover:text-accent transition-colors">YouTube Thumbnail Downloader</Link>
                <p className="text-sm mt-1">Extract high-resolution thumbnail images directly from any YouTube video URL.</p>
              </div>
            </li>
          </ul>
        </section>
        
        <section className="text-center mt-16 pt-8 border-t border-border">
          <h2 className="text-text font-clash text-2xl font-bold mb-4">Ready to grow?</h2>
          <Link href="/" className="inline-block px-8 py-4 bg-gradient text-bg font-bold rounded-xl hover:opacity-90 transition-opacity">
            Explore All Tools
          </Link>
        </section>
      </div>
    </div>
  );
}
