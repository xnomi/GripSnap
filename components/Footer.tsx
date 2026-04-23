import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="border-t border-border mt-auto bg-surface">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="font-clash font-bold text-xl text-gradient">GridSnap</span>
            <span className="text-muted text-sm">© {new Date().getFullYear()}</span>
          </div>
          <div className="flex gap-6 text-sm text-muted">
            <Link href="/" className="hover:text-text transition-colors">Privacy</Link>
            <Link href="/" className="hover:text-text transition-colors">About</Link>
            <Link href="/" className="hover:text-text transition-colors">Tools</Link>
            <Link href="/" className="hover:text-text transition-colors">Creator Resources</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
