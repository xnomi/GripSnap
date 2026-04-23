import Link from 'next/link';

const ALL_TOOLS = [
  { title: 'Bio Generator', href: '/bio-generator', icon: '✨', desc: 'AI-powered bios for Instagram, TikTok & LinkedIn' },
  { title: 'Hashtag Generator', href: '/hashtag-generator', icon: '#️⃣', desc: 'Find niche, trending & broad hashtags instantly' },
  { title: 'Image Resizer', href: '/image-resizer-social', icon: '🖼️', desc: 'Resize images for every social platform' },
  { title: 'Tweet Counter', href: '/tweet-counter', icon: '📝', desc: 'Count characters & split long posts into threads' },
  { title: 'YT Thumbnail Downloader', href: '/youtube-thumbnail', icon: '▶️', desc: 'Download any YouTube thumbnail in HD' },
];

type RelatedToolsProps = {
  exclude?: string; // href of current page to exclude
};

export default function RelatedTools({ exclude }: RelatedToolsProps) {
  const tools = ALL_TOOLS.filter(t => t.href !== exclude).slice(0, 3);

  return (
    <section className="mt-16 pt-8 border-t border-border">
      <h2 className="font-clash text-2xl font-bold mb-6">You Might Also Need</h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {tools.map(tool => (
          <Link
            key={tool.href}
            href={tool.href}
            className="group flex items-start gap-3 p-4 bg-surface border border-border rounded-xl hover:border-accent/50 transition-colors"
          >
            <span className="text-2xl flex-shrink-0">{tool.icon}</span>
            <div>
              <p className="font-semibold text-sm group-hover:text-accent transition-colors">{tool.title}</p>
              <p className="text-xs text-muted mt-0.5">{tool.desc}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
