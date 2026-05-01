'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

interface AdUnitProps {
  slot: string;
  format?: 'auto' | 'fluid' | 'rectangle';
  layout?: string;
  className?: string;
  style?: React.CSSProperties;
}

export default function AdUnit({ slot, format = 'auto', layout, className, style }: AdUnitProps) {
  const pathname = usePathname();

  useEffect(() => {
    try {
      // @ts-expect-error: window.adsbygoogle is injected by AdSense script
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (err) {
      console.error('AdSense error:', err);
    }
  }, [pathname]); // Reload ad when route changes

  return (
    <div className={`ad-container bg-surface2/50 border border-border/50 rounded-xl overflow-hidden flex items-center justify-center my-8 ${className || ''}`} style={{ minHeight: '100px', ...style }}>
      {/* Fallback text while ad loads or if adblock is enabled */}
      <span className="text-xs text-muted absolute -z-10">Advertisement</span>
      
      <ins
        className="adsbygoogle block w-full"
        style={{ display: 'block' }}
        data-ad-client="ca-pub-1360321193594177"
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive="true"
        {...(layout ? { 'data-ad-layout': layout } : {})}
      />
    </div>
  );
}
