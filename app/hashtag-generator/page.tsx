'use client';

import React, { useState } from 'react';
import PlatformTabs from '@/components/PlatformTabs';
import RelatedTools from '@/components/RelatedTools';
import AdUnit from '@/components/AdUnit';

const PLATFORMS = {
  'Instagram': { max: 30 },
  'TikTok': { max: 33 }, // Typically ~33 based on character limits, we'll use 33
  'Twitter/X': { max: 5 }, // Recommended
  'LinkedIn': { max: 5 }, // Recommended
};

type Hashtag = { tag: string; reach: 'low' | 'medium' | 'high' };
type HashtagGroups = { niche: Hashtag[]; trending: Hashtag[]; broad: Hashtag[] };

export default function HashtagGenerator() {
  const [platform, setPlatform] = useState<keyof typeof PLATFORMS>('Instagram');
  const [topic, setTopic] = useState('');
  const [loading, setLoading] = useState(false);
  const [hashtags, setHashtags] = useState<HashtagGroups | null>(null);
  const [selectedTags, setSelectedTags] = useState<Set<string>>(new Set());

  const maxTags = PLATFORMS[platform].max;

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('/api/generate-hashtags', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic }),
      });
      const data = await res.json();
      if (!data.error) {
        setHashtags(data);
        setSelectedTags(new Set()); // Reset selections
      }
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  const toggleTag = (tag: string) => {
    const newSelected = new Set(selectedTags);
    if (newSelected.has(tag)) {
      newSelected.delete(tag);
    } else {
      if (newSelected.size < maxTags) {
        newSelected.add(tag);
      } else {
        alert(`Maximum ${maxTags} hashtags allowed for ${platform}`);
      }
    }
    setSelectedTags(newSelected);
  };

  const copySelected = () => {
    const text = Array.from(selectedTags).join(' ');
    navigator.clipboard.writeText(text);
    alert('Copied!');
  };

  const selectCategory = (category: keyof HashtagGroups) => {
    if (!hashtags) return;
    const newSelected = new Set(selectedTags);
    hashtags[category].forEach(h => {
      if (newSelected.size < maxTags) newSelected.add(h.tag);
    });
    setSelectedTags(newSelected);
  };

  const getReachColor = (reach: string) => {
    switch(reach) {
      case 'high': return 'bg-accent/20 text-accent border-accent/30';
      case 'medium': return 'bg-accent2/20 text-accent2 border-accent2/30';
      case 'low': return 'bg-accent3/20 text-accent3 border-accent3/30';
      default: return 'bg-surface2 text-muted';
    }
  };



  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="font-clash text-4xl md:text-5xl font-bold mb-4">Free Hashtag Generator for Instagram, TikTok &amp; Twitter</h1>
        <p className="text-muted max-w-2xl mx-auto">Discover the perfect mix of niche, trending, and broad hashtags to maximize your reach on every platform.</p>
      </div>

      <PlatformTabs 
        platforms={Object.keys(PLATFORMS)} 
        activePlatform={platform} 
        onSelect={(p) => setPlatform(p as keyof typeof PLATFORMS)} 
      />

      <AdUnit slot="auto-slot" format="auto" className="my-6" />

      <div className="bg-surface border border-border rounded-2xl p-6 mb-8">
        <form onSubmit={handleGenerate} className="flex flex-col md:flex-row gap-4">
          <input
            required
            type="text"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="Enter a topic or keywords (e.g., minimalist web design)"
            className="flex-grow p-4 rounded-xl bg-surface2 text-text placeholder:text-muted border border-border focus:border-accent outline-none text-lg"
          />
          <button
            type="submit"
            disabled={loading}
            className="px-8 py-4 bg-gradient text-bg font-bold rounded-xl whitespace-nowrap hover:opacity-90 disabled:opacity-50"
          >
            {loading ? 'Finding Tags...' : 'Generate Hashtags'}
          </button>
        </form>
      </div>

      {hashtags && (
        <div className="space-y-8">
          <div className="sticky top-16 z-40 bg-surface/90 backdrop-blur-md border border-border p-4 rounded-xl flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-4">
              <div className="font-fira font-bold text-xl">
                <span className={selectedTags.size === maxTags ? 'text-red-400' : 'text-accent'}>{selectedTags.size}</span>
                <span className="text-muted"> / {maxTags}</span>
              </div>
              <span className="text-sm text-muted">Selected for {platform}</span>
            </div>
            <div className="flex gap-2">
              <button onClick={() => setSelectedTags(new Set())} className="px-4 py-2 text-sm text-muted hover:text-text">Clear</button>
              <button onClick={copySelected} className="px-6 py-2 bg-text text-bg font-bold rounded-lg hover:bg-muted transition-colors">Copy Selected</button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {(Object.keys(hashtags) as Array<keyof HashtagGroups>).map(category => (
              <div key={category} className="bg-surface border border-border rounded-2xl p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-clash text-xl font-bold capitalize">{category}</h3>
                  <button onClick={() => selectCategory(category)} className="text-xs text-accent hover:underline">Select All</button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {hashtags[category].map((h, i) => {
                    const isSelected = selectedTags.has(h.tag);
                    return (
                      <button
                        key={i}
                        onClick={() => toggleTag(h.tag)}
                        className={`px-3 py-1.5 rounded-full text-sm border transition-all ${
                          isSelected 
                            ? 'bg-gradient text-bg border-transparent scale-105 shadow-md' 
                            : `border-border hover:border-text ${getReachColor(h.reach)}`
                        }`}
                      >
                        {h.tag} <span className="opacity-60 text-[10px] uppercase ml-1">• {h.reach}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <AdUnit slot="auto-slot-2" format="auto" className="my-10" />

      {/* SEO Content & FAQ */}
      <section className="mt-16 pt-8 border-t border-border space-y-8">
        <div>
          <h2 className="font-clash text-2xl font-bold mb-3">How the Free Hashtag Generator Works</h2>
          <p className="text-muted leading-relaxed">
            Our <strong className="text-text">AI hashtag generator</strong> analyses your topic and groups hashtags into three categories:
            <strong className="text-text"> Niche</strong> (highly specific, less competition, longer visibility),
            <strong className="text-text"> Trending</strong> (currently popular, high reach burst), and
            <strong className="text-text"> Broad</strong> (large audiences, highly competitive).
            Each hashtag shows its estimated reach level — use a balanced mix for optimal results.
            Click any tag to select it, and hit <strong className="text-text">Copy Selected</strong> to copy all chosen hashtags as a single block of text ready to paste.
            For <strong className="text-text">Instagram</strong>, the limit is 30 hashtags. For TikTok, aim for 3–5 focused ones.
            Pair your hashtags with a compelling caption using our free <a href="/bio-generator" className="text-accent hover:underline">Bio Generator</a>.
          </p>
        </div>

        <div>
          <h2 className="font-clash text-2xl font-bold mb-4">Frequently Asked Questions</h2>
          <div className="space-y-5">
            {[
              { q: "How many hashtags should I use on Instagram?", a: "Instagram allows up to 30 hashtags per post. Best practices in 2025 suggest using 3–10 highly relevant hashtags. Quality beats quantity — use our niche and trending categories for the best results." },
              { q: "Do hashtags still work on Instagram in 2025?", a: "Yes, hashtags are still a critical part of Instagram SEO. They help the algorithm categorize your content so it appears in search results and relevant Explore pages for new audiences." },
              { q: "What are the best hashtags for getting more followers?", a: "The best strategy is mixing niche hashtags (low competition, longer ranking time) with trending ones (high reach, short burst). Avoid generic tags like #followforfollow which attract bots, not real followers." },
              { q: "Should I use popular or niche hashtags?", a: "Both. Popular tags give you a short burst of wide exposure. Niche tags let you rank in a smaller category for longer. Our generator automatically provides both categories for the perfect mix." },
              { q: "How do I find trending hashtags for my niche?", a: "Enter your topic into the input above and click Generate. Our AI identifies currently trending hashtags in your specific niche alongside broader and more specific alternatives." },
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

      <RelatedTools exclude="/hashtag-generator" />
    </div>
  );
}
