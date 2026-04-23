import Link from 'next/link';

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-bg/80 backdrop-blur-md">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <svg width="32" height="32" viewBox="0 0 32 32" className="flex-shrink-0" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="2" y="2" width="8" height="8" rx="2" fill="#ff6ec7" />
            <rect x="12" y="2" width="8" height="8" rx="2" fill="#ffd700" />
            <rect x="22" y="2" width="8" height="8" rx="2" fill="#00f5d4" />
            
            <rect x="2" y="12" width="8" height="8" rx="2" fill="#0f0f0f" stroke="#ff6ec7" strokeWidth="2" />
            <rect x="12" y="12" width="8" height="8" rx="2" fill="#0f0f0f" stroke="#ffd700" strokeWidth="2" />
            <rect x="22" y="12" width="8" height="8" rx="2" fill="#0f0f0f" stroke="#00f5d4" strokeWidth="2" />
            
            <rect x="2" y="22" width="8" height="8" rx="2" fill="#0f0f0f" stroke="#ff6ec7" strokeWidth="2" />
            <rect x="12" y="22" width="8" height="8" rx="2" fill="#0f0f0f" stroke="#ffd700" strokeWidth="2" />
            <rect x="22" y="22" width="8" height="8" rx="2" fill="#0f0f0f" stroke="#00f5d4" strokeWidth="2" />
          </svg>
          <span className="font-clash font-bold text-2xl tracking-tight text-gradient">
            GridSnap
          </span>
        </Link>
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
          <Link href="/bio-generator" className="text-text hover:text-accent transition-colors">Bio Generator</Link>
          <Link href="/hashtag-generator" className="text-text hover:text-accent2 transition-colors">Hashtags</Link>
          <Link href="/image-resizer-social" className="text-text hover:text-accent3 transition-colors">Image Resizer</Link>
          <Link href="/tweet-counter" className="text-text hover:text-accent transition-colors">Tweet Counter</Link>
          <Link href="/youtube-thumbnail" className="text-text hover:text-accent2 transition-colors">YT Thumbnail</Link>
        </nav>
      </div>
    </header>
  );
}
