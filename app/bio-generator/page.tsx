'use client';

import React, { useState } from 'react';
import PlatformTabs from '@/components/PlatformTabs';
import CharCounter from '@/components/CharCounter';
import RelatedTools from '@/components/RelatedTools';
import AdUnit from '@/components/AdUnit';

const PLATFORMS = {
  'Instagram': 150,
  'Twitter/X': 160,
  'LinkedIn': 220,
  'TikTok': 80,
};

export default function BioGenerator() {
  const [platform, setPlatform] = useState<keyof typeof PLATFORMS>('Instagram');
  const [name, setName] = useState('');
  const [profession, setProfession] = useState('');
  const [keywords, setKeywords] = useState('');
  const [tone, setTone] = useState('creative');
  const [bios, setBios] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const maxChars = PLATFORMS[platform];

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('/api/generate-bio', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, profession, keywords, tone }),
      });
      const data = await res.json();
      if (data.bios) setBios(data.bios);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  const copyBio = (bio: string, idx: number) => {
    navigator.clipboard.writeText(bio);
    // Simple visual feedback could be added here
    const btn = document.getElementById(`copy-btn-${idx}`);
    if (btn) {
      btn.innerText = 'Copied!';
      setTimeout(() => { btn.innerText = 'Copy'; }, 2000);
    }
  };

  const loadTemplate = (type: string) => {
    switch (type) {
      case 'Creator':
        setProfession('Digital Creator');
        setKeywords('Video editing, YouTube, Tech reviews');
        setTone('casual');
        break;
      case 'Business':
        setProfession('Marketing Agency');
        setKeywords('SEO, Growth, B2B');
        setTone('professional');
        break;
      case 'Influencer':
        setProfession('Fashion Influencer');
        setKeywords('OOTD, Lifestyle, Travel');
        setTone('funny');
        break;
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="font-clash text-4xl md:text-5xl font-bold mb-4">Instagram & Social Bio Generator</h1>
        <p className="text-muted max-w-2xl mx-auto">Generate engaging, AI-powered bios optimized for Instagram, TikTok, Twitter, and LinkedIn.</p>
      </div>

      <PlatformTabs 
        platforms={Object.keys(PLATFORMS)} 
        activePlatform={platform} 
        onSelect={(p) => setPlatform(p as keyof typeof PLATFORMS)} 
      />

      <AdUnit slot="auto-slot" format="auto" className="my-6" />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-5 bg-surface border border-border p-6 rounded-2xl">
          <div className="flex justify-between items-center mb-6">
            <h2 className="font-clash text-2xl font-bold">Details</h2>
            <div className="flex gap-2 text-xs">
              <button onClick={() => loadTemplate('Creator')} className="px-2 py-1 bg-surface2 rounded hover:text-accent">Creator</button>
              <button onClick={() => loadTemplate('Business')} className="px-2 py-1 bg-surface2 rounded hover:text-accent">Business</button>
            </div>
          </div>
          
          <form onSubmit={handleGenerate} className="space-y-4">
            <div>
              <label className="block text-sm text-muted mb-1">Name / Brand</label>
              <input 
                required type="text" value={name} onChange={e => setName(e.target.value)}
                className="w-full p-3 rounded-xl bg-surface2 text-text placeholder:text-muted border border-border focus:border-accent outline-none"
                placeholder="e.g. Alex Morgan"
              />
            </div>
            <div>
              <label className="block text-sm text-muted mb-1">Profession / Niche</label>
              <input 
                required type="text" value={profession} onChange={e => setProfession(e.target.value)}
                className="w-full p-3 rounded-xl bg-surface2 text-text placeholder:text-muted border border-border focus:border-accent outline-none"
                placeholder="e.g. Fitness Coach"
              />
            </div>
            <div>
              <label className="block text-sm text-muted mb-1">Keywords</label>
              <input 
                required type="text" value={keywords} onChange={e => setKeywords(e.target.value)}
                className="w-full p-3 rounded-xl bg-surface2 text-text placeholder:text-muted border border-border focus:border-accent outline-none"
                placeholder="e.g. Weightlifting, Nutrition, Online Coaching"
              />
            </div>
            <div>
              <label className="block text-sm text-muted mb-1">Tone</label>
              <select 
                value={tone} onChange={e => setTone(e.target.value)}
                className="w-full p-3 rounded-xl bg-surface2 text-text border border-border focus:border-accent outline-none"
              >
                <option value="professional">Professional</option>
                <option value="casual">Casual & Friendly</option>
                <option value="funny">Funny & Witty</option>
                <option value="creative">Creative & Poetic</option>
              </select>
            </div>
            <button 
              type="submit" disabled={loading}
              className="w-full py-4 mt-4 bg-gradient text-bg font-bold rounded-xl hover:opacity-90 transition-opacity disabled:opacity-50"
            >
              {loading ? 'Generating...' : 'Generate Bios ✨'}
            </button>
          </form>
        </div>

        <div className="lg:col-span-7 space-y-4">
          <h2 className="font-clash text-2xl font-bold mb-6">Generated Bios</h2>
          {bios.length === 0 ? (
            <div className="p-12 text-center border-2 border-dashed border-border rounded-2xl text-muted flex flex-col items-center">
              <span className="text-4xl mb-4">✍️</span>
              <p>Fill out the form and generate AI bios to see them here.</p>
            </div>
          ) : (
            bios.map((bio, idx) => {
              const charCount = bio.length;
              return (
                <div key={idx} className="card-hover group bg-surface border border-border p-5 rounded-2xl flex flex-col gap-3">
                  <p className="whitespace-pre-wrap text-lg">{bio}</p>
                  <div className="flex justify-between items-center mt-2 pt-3 border-t border-border/50">
                    <CharCounter current={charCount} max={maxChars} />
                    <button 
                      id={`copy-btn-${idx}`}
                      onClick={() => copyBio(bio, idx)}
                      className="px-4 py-2 bg-surface2 hover:bg-bg border border-border rounded-lg text-sm transition-colors"
                    >
                      Copy
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

      <AdUnit slot="auto-slot-2" format="auto" className="my-10" />

      {/* SEO Content & FAQ */}
      <section className="mt-16 pt-8 border-t border-border space-y-8">
        <div>
          <h2 className="font-clash text-2xl font-bold mb-3">Free Instagram Bio Generator — How It Works</h2>
          <p className="text-muted leading-relaxed">
            Your bio is the first thing people read when they visit your profile — it needs to be compelling in just a few words.
            Our <strong className="text-text">free Instagram bio generator</strong> uses AI to craft 5 unique variations based on your name, profession, keywords, and tone.
            Each bio respects your selected platform limit: <strong className="text-text">Instagram (150 chars)</strong>, <strong className="text-text">Twitter/X (160 chars)</strong>,
            <strong className="text-text"> LinkedIn (220 chars)</strong>, and <strong className="text-text">TikTok (80 chars)</strong>.
            After generating, check the character counter on each card and copy your favourite in one click.
            Then pair it with the right hashtags using our free <a href="/hashtag-generator" className="text-accent hover:underline">Hashtag Generator</a>.
          </p>
        </div>

        <div>
          <h2 className="font-clash text-2xl font-bold mb-4">Frequently Asked Questions</h2>
          <div className="space-y-5">
            {[
              { q: "How do I write a good Instagram bio?", a: "A great Instagram bio includes your name or brand, what you do, a value proposition or personality hook, a call-to-action (link in bio), and relevant emojis. Keep it under 150 characters for Instagram." },
              { q: "How many characters can an Instagram bio have?", a: "Instagram allows up to 150 characters in your bio. Our generator shows a live character counter on every variation so you never exceed the limit." },
              { q: "What is a good LinkedIn headline?", a: "A good LinkedIn headline is professional, keyword-rich, and tells your career story in 220 characters. Focus on your role, key skills, and the value you bring to potential clients or employers." },
              { q: "Can I use emojis in my Instagram bio?", a: "Yes! Emojis are highly encouraged in Instagram bios. They add personality, break up text, and communicate your niche quickly. Our AI automatically adds relevant emojis to every bio variation." },
              { q: "Is this bio generator really free?", a: "Yes! GridSnap's bio generator is 100% free with no signup required. Generate unlimited bio variations for Instagram, Twitter, LinkedIn, and TikTok instantly." },
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

      <RelatedTools exclude="/bio-generator" />
    </div>
  );
}
