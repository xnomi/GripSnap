'use client';

import React, { useState } from 'react';

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
      <h1 className="font-clash text-4xl font-bold mb-4">YouTube Thumbnail Downloader</h1>
      <p className="text-muted mb-8">Enter any YouTube URL to preview and download its thumbnail in all available qualities instantly. No API key needed.</p>

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
      
      {/* SEO Content */}
      <div className="mt-16 pt-8 border-t border-border prose prose-invert max-w-none">
        <h2>About this tool</h2>
        <p>This YouTube Thumbnail Downloader allows you to easily view and download thumbnails from any YouTube video in Full HD (1080p), High Quality (720p), and Standard qualities. Just paste the video link and get the images instantly.</p>
      </div>
    </div>
  );
}
