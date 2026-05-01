'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function CookieConsent() {
  const [showConsent, setShowConsent] = useState(false);

  useEffect(() => {
    // Check if the user has already consented
    const hasConsented = localStorage.getItem('cookieConsent');
    if (!hasConsented) {
      setShowConsent(true);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem('cookieConsent', 'true');
    setShowConsent(false);
  };

  if (!showConsent) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-surface border-t border-border p-4 shadow-[0_-10px_40px_rgba(0,0,0,0.1)] z-50 flex flex-col sm:flex-row items-center justify-between gap-4">
      <div className="text-sm text-muted">
        We use cookies to personalize content, serve targeted advertisements via Google AdSense, and analyze our traffic. 
        By clicking &quot;Accept&quot;, you consent to our use of cookies. 
        Read our <Link href="/privacy" className="text-accent hover:underline">Privacy Policy</Link> for more details.
      </div>
      <div className="flex shrink-0 gap-3">
        <button 
          onClick={acceptCookies}
          className="px-6 py-2 bg-gradient text-bg font-bold rounded-lg hover:opacity-90 transition-opacity whitespace-nowrap"
        >
          Accept
        </button>
      </div>
    </div>
  );
}
