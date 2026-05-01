'use client';

import React, { useState } from 'react';
import RelatedTools from '@/components/RelatedTools';
import AdUnit from '@/components/AdUnit';

type ThumbSize = {
  label: string;
  urlCode: string;
  width: number;
  height: number;
};

const SIZES: ThumbSize[] = [
  { label: 'Max Resolution (1280x720)', urlCode: 'maxresdefault', width: 1280, height: 720 },
  { label: 'High Quality (480x360)', urlCode: 'hqdefault', width: 480, height: 360 },
  { label: 'Standard Quality (640x480)', urlCode: 'sddefault', width: 640, height: 480 },
  { label: 'Medium Quality (320x180)', urlCode: 'mqdefault', width: 320, height: 180 },
  { label: 'Default (120x90)', urlCode: 'default', width: 120, height: 90 },
];

export default function YouTubeThumbnail() {
  const [inputUrl, setInputUrl] = useState('');
  const [videoId, setVideoId] = useState<string | null>(null);

  const extractVideoId = (url: string) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  const handleFetch = (e: React.FormEvent) => {
    e.preventDefault();
    const id = extractVideoId(inputUrl) || (inputUrl.length === 11 ? inputUrl : null);
    if (id) {
      setVideoId(id);
    } else {
      alert("Invalid YouTube URL or Video ID");
    }
  };

  const handleDownload = async (url: string, filename: string) => {
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      const objectUrl = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = objectUrl;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(objectUrl);
    } catch {
      // Fallback if fetch fails due to CORS, open in new tab
      window.open(url, '_blank');
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="font-clash text-4xl font-bold mb-4">YouTube Thumbnail Downloader — Free HD Download</h1>
      <p className="text-muted mb-8">Paste any YouTube URL to instantly preview and download the thumbnail in Max Resolution, HQ, SD & MQ quality. No API key, no signup, works instantly.</p>

      <AdUnit slot="auto-slot" format="auto" className="my-6" />

      <form onSubmit={handleFetch} className="flex flex-col sm:flex-row gap-4 mb-12">
        <input
          type="text"
          value={inputUrl}
          onChange={(e) => setInputUrl(e.target.value)}
          placeholder="https://www.youtube.com/watch?v=..."
          className="flex-grow p-4 rounded-xl bg-surface2 text-text placeholder:text-muted border border-border focus:outline-none focus:ring-2 focus:ring-accent"
        />
        <button
          type="submit"
          className="px-8 py-4 rounded-xl bg-gradient text-bg font-bold whitespace-nowrap hover:opacity-90 transition-opacity"
        >
          Get Thumbnails
        </button>
      </form>

      {videoId && (
        <div className="space-y-12">
          {SIZES.map((size) => {
            const imgUrl = `https://img.youtube.com/vi/${videoId}/${size.urlCode}.jpg`;
            return (
              <div key={size.urlCode} className="bg-surface rounded-2xl p-6 border border-border flex flex-col items-center">
                <div className="w-full flex justify-between items-center mb-4">
                  <div>
                    <h3 className="font-clash text-xl font-semibold">{size.label}</h3>
                    <p className="text-sm text-muted">{size.width} × {size.height}</p>
                  </div>
                  <button
                    onClick={() => handleDownload(imgUrl, `yt-thumb-${videoId}-${size.urlCode}.jpg`)}
                    className="px-4 py-2 bg-surface2 text-text rounded-md hover:text-accent hover:border-accent border border-border transition-colors"
                  >
                    Download
                  </button>
                </div>
                <div className="w-full bg-black rounded-lg overflow-hidden flex items-center justify-center relative min-h-[200px]">
                  {/* Next.js Image component might have strict CORS or hostname config, using standard img tag for external unpredictable URLs is easier here */}
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={imgUrl}
                    alt={`YouTube Thumbnail ${size.label}`}
                    className="max-w-full h-auto object-contain"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = '/og-image.png'; // Placeholder if missing
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      )}
      
      <AdUnit slot="auto-slot-2" format="auto" className="my-10" />

      {/* SEO Content & FAQ */}
      <section className="mt-16 pt-8 border-t border-border space-y-8">
        <div>
          <h2 className="font-clash text-2xl font-bold mb-3">How to Download a YouTube Thumbnail for Free</h2>
          <p className="text-muted leading-relaxed">
            Our <strong className="text-text">free YouTube thumbnail downloader</strong> works without any API key or browser extension.
            YouTube thumbnails are publicly accessible at standard URLs — we simply fetch and display them for you. You can download
            thumbnails in <strong className="text-text">Max Resolution (1280×720 px HD)</strong>, High Quality (480×360), Standard (640×480),
            Medium (320×180), and Default (120×90). Not every video has a maxresdefault thumbnail — older videos may only have hqdefault.
            Want to resize a thumbnail you create? Use our free <a href="/image-resizer-social" className="text-accent hover:underline">Image Resizer</a> to match the exact YouTube recommended size (1280×720).
          </p>
        </div>

        <div>
          <h2 className="font-clash text-2xl font-bold mb-4">Frequently Asked Questions</h2>
          <div className="space-y-5">
            {[
              { q: "How do I download a YouTube thumbnail for free?", a: "Paste the YouTube video URL into the input above and click 'Get Thumbnails.' All available sizes appear instantly with download buttons. No signup or extension required." },
              { q: "What is the highest quality YouTube thumbnail?", a: "The highest quality thumbnail is 'maxresdefault' at 1280×720 pixels (HD). Not all videos have this — older videos may only have 'hqdefault' at 480×360." },
              { q: "Is it legal to download YouTube thumbnails?", a: "YouTube thumbnails are publicly accessible images. However, they may be copyrighted by the content creator. Use downloaded thumbnails for personal use, research, or with the creator's permission only." },
              { q: "Can I download thumbnails without a YouTube API key?", a: "Yes! YouTube thumbnails are served at predictable public URLs (img.youtube.com/vi/VIDEO_ID/quality.jpg). No API key is needed. Our tool accesses these public URLs directly." },
              { q: "What thumbnail size should I use for my own YouTube videos?", a: "YouTube recommends 1280×720 pixels (16:9 ratio), under 2 MB, in JPG, PNG, or WEBP format. Use our free Social Media Image Resizer to resize your thumbnail to the exact correct dimensions." },
            ].map((item, i) => (
              <details key={i} className="group bg-surface border border-border rounded-xl p-5 cursor-pointer">
                <summary className="font-semibold list-none flex justify-between items-center gap-2">
                  {item.q}
                  <span className="text-muted group-open:rotate-180 transition-transform flex-shrink-0">▼</span>
                </summary>
                <p className="text-muted mt-3 text-sm leading-relaxed">{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <RelatedTools exclude="/youtube-thumbnail" />
    </div>
  );
}
