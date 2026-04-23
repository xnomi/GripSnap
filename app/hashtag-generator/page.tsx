'use client';

import React, { useState } from 'react';
import PlatformTabs from '@/components/PlatformTabs';

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

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "How many hashtags should I use on Instagram?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Instagram allows up to 30 hashtags per post. However, best practices suggest using between 3 to 5 highly relevant hashtags to keep your post focused, though some creators still see success with using all 30."
        }
      },
      {
        "@type": "Question",
        "name": "Do hashtags still work on Instagram in 2025?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, hashtags are still a critical part of Instagram SEO. They help categorize your content so it appears in search results and relevant explore pages."
        }
      },
      {
        "@type": "Question",
        "name": "What are the best hashtags for getting followers?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "The best hashtags are a mix of broad (high reach) and niche (low competition) tags specific to your content. Avoid generic tags like #followforfollow."
        }
      },
      {
        "@type": "Question",
        "name": "Should I use popular or niche hashtags?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "You should use a combination of both. Popular tags expose you to a large audience temporarily, while niche tags give you a chance to rank higher for a longer period."
        }
      },
      {
        "@type": "Question",
        "name": "How do I find trending hashtags?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "You can use our free hashtag generator above! Simply type your topic, and our AI will identify currently trending hashtags related to your niche."
        }
      }
    ]
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <div className="text-center mb-12">
        <h1 className="font-clash text-4xl md:text-5xl font-bold mb-4">Hashtag Generator</h1>
        <p className="text-muted max-w-2xl mx-auto">Discover the perfect mix of niche, trending, and broad hashtags to maximize your reach.</p>
      </div>

      <PlatformTabs 
        platforms={Object.keys(PLATFORMS)} 
        activePlatform={platform} 
        onSelect={(p) => setPlatform(p as keyof typeof PLATFORMS)} 
      />

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

      {/* SEO Content */}
      <div className="mt-16 pt-8 border-t border-border prose prose-invert max-w-none">
        <h2>About this tool</h2>
        <p>Our Free Hashtag Generator creates optimized groups of hashtags based on your topic. By mixing niche, trending, and broad tags, you can bypass the algorithm and maximize organic reach on Instagram, TikTok, Twitter, and LinkedIn.</p>
        <h3>Frequently Asked Questions</h3>
        <dl>
          <dt className="font-bold mt-4">How many hashtags should I use on Instagram?</dt>
          <dd>Instagram allows up to 30 hashtags per post. However, best practices suggest using between 3 to 5 highly relevant hashtags to keep your post focused, though some creators still see success with using all 30.</dd>
          <dt className="font-bold mt-4">Do hashtags still work on Instagram in 2025?</dt>
          <dd>Yes, hashtags are still a critical part of Instagram SEO. They help categorize your content so it appears in search results and relevant explore pages.</dd>
          <dt className="font-bold mt-4">What are the best hashtags for getting followers?</dt>
          <dd>The best hashtags are a mix of broad (high reach) and niche (low competition) tags specific to your content. Avoid generic tags like #followforfollow.</dd>
          <dt className="font-bold mt-4">Should I use popular or niche hashtags?</dt>
          <dd>You should use a combination of both. Popular tags expose you to a large audience temporarily, while niche tags give you a chance to rank higher for a longer period.</dd>
          <dt className="font-bold mt-4">How do I find trending hashtags?</dt>
          <dd>You can use our free hashtag generator above! Simply type your topic, and our AI will identify currently trending hashtags related to your niche.</dd>
        </dl>
      </div>
    </div>
  );
}
