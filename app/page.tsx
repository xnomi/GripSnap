import Link from 'next/link';

export default function Home() {
  const tools = [
    {
      title: 'Bio Generator',
      description: 'AI-powered bio variations for Instagram, Twitter, LinkedIn & TikTok.',
      href: '/bio-generator',
      icon: '✨',
      platforms: ['Instagram', 'Twitter', 'LinkedIn', 'TikTok'],
    },
    {
      title: 'Hashtag Generator',
      description: 'Find relevant, trending, and niche hashtags to boost your reach.',
      href: '/hashtag-generator',
      icon: '#️⃣',
      platforms: ['Instagram', 'TikTok', 'Twitter', 'LinkedIn'],
    },
    {
      title: 'Image Resizer',
      description: 'Resize any image perfectly for all social media platforms in seconds.',
      href: '/image-resizer-social',
      icon: '🖼️',
      platforms: ['All Platforms'],
    },
    {
      title: 'Tweet Counter',
      description: 'Check character limits and automatically split long texts into threads.',
      href: '/tweet-counter',
      icon: '📝',
      platforms: ['Twitter', 'LinkedIn', 'Instagram', 'Facebook'],
    },
    {
      title: 'YT Thumbnail Downloader',
      description: 'Download any YouTube video thumbnail in max resolution instantly.',
      href: '/youtube-thumbnail',
      icon: '▶️',
      platforms: ['YouTube'],
    },
  ];

  return (
    <div className="flex flex-col items-center">
      {/* Hero Section */}
      <section className="w-full relative py-24 px-4 overflow-hidden flex flex-col items-center justify-center text-center">
        <div className="absolute inset-0 bg-gradient-x bg-gradient-primary opacity-10 z-0"></div>
        <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center gap-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-surface2 border border-border text-sm font-medium mb-4">
            <span className="animate-pulse">🔥</span> Used by 50,000+ creators
          </div>
          <h1 className="font-clash text-5xl md:text-7xl font-bold tracking-tight text-gradient leading-tight">
            Free Social Media Tools
            <br />
            <span className="text-text">Grow Your Audience Faster</span>
          </h1>
          <p className="text-lg md:text-xl text-muted max-w-2xl mt-4">
            AI-powered bio generator, hashtag finder, image resizer, and more. The ultimate suite for creators on every platform.
          </p>
        </div>
      </section>

      {/* Tools Grid Section */}
      <section className="w-full max-w-7xl mx-auto px-4 py-16">
        <h2 className="font-clash text-3xl font-bold mb-10 text-center">Select a Tool</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tools.map((tool) => (
            <Link key={tool.href} href={tool.href} className="card-hover group block p-1 rounded-2xl bg-surface border border-border">
              <div className="bg-surface h-full rounded-xl p-6 flex flex-col gap-4">
                <div className="text-4xl">{tool.icon}</div>
                <h3 className="font-clash text-2xl font-semibold group-hover:text-accent transition-colors">{tool.title}</h3>
                <p className="text-muted flex-grow">{tool.description}</p>
                <div className="flex flex-wrap gap-2 mt-4">
                  {tool.platforms.map(p => (
                    <span key={p} className="text-xs font-medium px-2 py-1 rounded-md bg-surface2 text-muted">
                      {p}
                    </span>
                  ))}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
