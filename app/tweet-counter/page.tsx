'use client';

import React, { useState } from 'react';
import PlatformTabs from '@/components/PlatformTabs';
import CharCounter from '@/components/CharCounter';

const PLATFORMS = {
  'Twitter/X': 280,
  'LinkedIn': 3000,
  'Instagram': 2200,
  'Facebook': 63206,
  'TikTok': 2200,
};

export default function TweetCounter() {
  const [platform, setPlatform] = useState<keyof typeof PLATFORMS>('Twitter/X');
  const [text, setText] = useState('');
  const [copied, setCopied] = useState(false);
  const [threads, setThreads] = useState<string[]>([]);

  const limit = PLATFORMS[platform];

  // Twitter specific URL counting (URLs count as 23 chars)
  const getCharCount = (str: string, p: string) => {
    if (p !== 'Twitter/X') return str.length;
    // Basic regex for URL detection
    const urlRegex = /(?:https?:\/\/)?(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&//=]*)/gi;
    const urls = str.match(urlRegex) || [];
    let count = str.length;
    urls.forEach(url => {
      count = count - url.length + 23;
    });
    return count;
  };

  const count = getCharCount(text, platform);
  const isOver = count > limit;

  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const splitThread = () => {
    if (platform !== 'Twitter/X') return;
    const words = text.split(' ');
    let currentThread = '';
    const newThreads = [];
    
    for (let i = 0; i < words.length; i++) {
      const word = words[i];
      // +6 to account for space and numbering like " 1/X"
      if (getCharCount(currentThread + ' ' + word, 'Twitter/X') + 6 > 280) {
        newThreads.push(currentThread.trim());
        currentThread = word;
      } else {
        currentThread += (currentThread ? ' ' : '') + word;
      }
    }
    if (currentThread) {
      newThreads.push(currentThread.trim());
    }
    
    // Add numbering
    const total = newThreads.length;
    setThreads(newThreads.map((t, i) => `${t} ${i + 1}/${total}`));
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="font-clash text-4xl font-bold mb-4">Social Media Character Counter</h1>
      <p className="text-muted mb-8">Count characters for your posts and automatically split long texts into Twitter threads.</p>

      <PlatformTabs 
        platforms={Object.keys(PLATFORMS)} 
        activePlatform={platform} 
        onSelect={(p) => {
          setPlatform(p as keyof typeof PLATFORMS);
          setThreads([]);
        }} 
      />

      <div className="bg-surface border border-border rounded-2xl overflow-hidden mb-6">
        <div className="p-4 border-b border-border bg-surface2 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <CharCounter current={count} max={limit} />
            {platform === 'Twitter/X' && (
              <span className="text-xs text-muted hidden sm:inline-block">
                URLs count as 23 characters automatically.
              </span>
            )}
          </div>
          <div className="flex gap-2">
            <button 
              onClick={() => setText('')}
              className="px-3 py-1.5 text-sm text-muted hover:text-text hover:bg-surface rounded-md transition-colors"
            >
              Clear
            </button>
            <button 
              onClick={handleCopy}
              className="px-4 py-1.5 text-sm bg-surface2 border border-border text-text hover:border-accent hover:text-accent rounded-md transition-colors"
            >
              {copied ? 'Copied!' : 'Copy'}
            </button>
          </div>
        </div>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder={`What's happening? Type your ${platform} post here...`}
          className={`w-full h-64 p-6 bg-surface2 resize-none focus:outline-none focus:ring-2 focus:ring-accent/50 placeholder:text-muted ${isOver ? 'text-red-400' : 'text-text'}`}
        />
      </div>

      {platform === 'Twitter/X' && count > 280 && (
        <button
          onClick={splitThread}
          className="w-full py-3 rounded-xl bg-gradient text-bg font-bold shadow-lg transform transition-transform active:scale-95 mb-8"
        >
          Auto-Split into Thread
        </button>
      )}

      {threads.length > 0 && (
        <div className="space-y-4">
          <h3 className="font-clash text-2xl font-semibold">Your Thread</h3>
          {threads.map((thread, idx) => (
            <div key={idx} className="p-4 bg-surface rounded-xl border border-border flex justify-between gap-4">
              <p className="whitespace-pre-wrap flex-grow">{thread}</p>
              <button
                onClick={() => navigator.clipboard.writeText(thread)}
                className="flex-shrink-0 self-start px-3 py-1 bg-surface2 rounded text-xs hover:text-accent transition-colors"
              >
                Copy
              </button>
            </div>
          ))}
        </div>
      )}

      {/* SEO Content */}
      <div className="mt-16 pt-8 border-t border-border prose prose-invert max-w-none">
        <h2>About this tool</h2>
        <p>The free online social media character counter helps you perfectly size your posts for Twitter, LinkedIn, Instagram, Facebook, and TikTok. Prevent frustrating errors when you hit &quot;post&quot; by checking your character limits beforehand.</p>
      </div>
    </div>
  );
}
