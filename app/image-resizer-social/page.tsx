'use client';

import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import JSZip from 'jszip';
import RelatedTools from '@/components/RelatedTools';

type SocialSize = {
  label: string;
  width: number;
  height: number;
};

type Platforms = {
  [key: string]: SocialSize[];
};

const PLATFORMS: Platforms = {
  Instagram: [
    { label: 'Post (Square)', width: 1080, height: 1080 },
    { label: 'Post (Portrait)', width: 1080, height: 1350 },
    { label: 'Post (Landscape)', width: 1080, height: 566 },
    { label: 'Story/Reel', width: 1080, height: 1920 },
    { label: 'Profile', width: 110, height: 110 },
  ],
  'Twitter/X': [
    { label: 'Header', width: 1500, height: 500 },
    { label: 'Post', width: 1200, height: 675 },
    { label: 'Profile', width: 400, height: 400 },
  ],
  Facebook: [
    { label: 'Cover', width: 851, height: 315 },
    { label: 'Post', width: 1200, height: 630 },
    { label: 'Profile', width: 170, height: 170 },
  ],
  LinkedIn: [
    { label: 'Banner', width: 1584, height: 396 },
    { label: 'Post', width: 1200, height: 627 },
  ],
  YouTube: [
    { label: 'Thumbnail', width: 1280, height: 720 },
    { label: 'Banner', width: 2560, height: 1440 },
  ],
  TikTok: [
    { label: 'Cover', width: 1080, height: 1920 },
    { label: 'Profile', width: 200, height: 200 },
  ],
};

export default function ImageResizer() {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [activePlatform, setActivePlatform] = useState<string>('Instagram');
  const [maintainAspect, setMaintainAspect] = useState(false);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => setImageSrc(e.target?.result as string);
      reader.readAsDataURL(file);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/*': [] },
    maxFiles: 1,
  });

  const resizeImage = (width: number, height: number): Promise<Blob> => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (!ctx) return reject('No context');

        if (maintainAspect) {
          // Fit within maintaining aspect ratio (letterboxing)
          ctx.fillStyle = '#000000';
          ctx.fillRect(0, 0, width, height);
          const ratio = Math.min(width / img.width, height / img.height);
          const newWidth = img.width * ratio;
          const newHeight = img.height * ratio;
          const x = (width - newWidth) / 2;
          const y = (height - newHeight) / 2;
          ctx.drawImage(img, x, y, newWidth, newHeight);
        } else {
          // Cover (crop to fit)
          const imgRatio = img.width / img.height;
          const canvasRatio = width / height;
          let renderWidth, renderHeight, x, y;

          if (imgRatio < canvasRatio) {
            renderWidth = width;
            renderHeight = width / imgRatio;
            x = 0;
            y = (height - renderHeight) / 2;
          } else {
            renderHeight = height;
            renderWidth = height * imgRatio;
            y = 0;
            x = (width - renderWidth) / 2;
          }
          ctx.drawImage(img, x, y, renderWidth, renderHeight);
        }

        canvas.toBlob((blob) => {
          if (blob) resolve(blob);
          else reject('Blob error');
        }, 'image/png');
      };
      img.src = imageSrc!;
    });
  };

  const handleDownloadSingle = async (size: SocialSize) => {
    if (!imageSrc) return;
    try {
      const blob = await resizeImage(size.width, size.height);
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${activePlatform}-${size.label.replace(/\s+/g, '-')}-${size.width}x${size.height}.png`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
    } catch (e) {
      console.error(e);
    }
  };

  const handleDownloadAll = async () => {
    if (!imageSrc) return;
    const zip = new JSZip();
    const folder = zip.folder(`${activePlatform}-Resized`);
    if (!folder) return;

    for (const size of PLATFORMS[activePlatform]) {
      const blob = await resizeImage(size.width, size.height);
      folder.file(`${size.label.replace(/\s+/g, '-')}-${size.width}x${size.height}.png`, blob);
    }

    const content = await zip.generateAsync({ type: 'blob' });
    const url = URL.createObjectURL(content);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${activePlatform}-All-Sizes.zip`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <h1 className="font-clash text-4xl font-bold mb-4">Free Social Media Image Resizer — All Platform Sizes</h1>
      <p className="text-muted mb-8">Upload once. Download perfectly sized images for Instagram, Twitter/X, Facebook, LinkedIn, YouTube &amp; TikTok — 20+ size presets, free, no upload to server.</p>

      {!imageSrc ? (
        <div 
          {...getRootProps()} 
          className={`border-2 border-dashed rounded-2xl p-12 text-center cursor-pointer transition-colors ${
            isDragActive ? 'border-accent bg-accent/10' : 'border-border bg-surface hover:bg-surface2'
          }`}
        >
          <input {...getInputProps()} />
          <div className="text-6xl mb-4">📸</div>
          <h3 className="font-clash text-xl font-semibold mb-2">Drag & Drop your image here</h3>
          <p className="text-muted">or click to browse your files</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1 flex flex-col gap-4">
            <div className="bg-surface rounded-2xl p-4 border border-border">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={imageSrc} alt="Original upload" className="w-full rounded-lg object-contain max-h-[300px]" />
              <button 
                onClick={() => setImageSrc(null)}
                className="w-full mt-4 py-2 text-sm border border-border rounded-lg hover:text-red-400 hover:border-red-400 transition-colors"
              >
                Upload Different Image
              </button>
            </div>
            
            <div className="bg-surface rounded-2xl p-4 border border-border">
              <h3 className="font-semibold mb-3">Resize Settings</h3>
              <label className="flex items-center gap-2 cursor-pointer text-sm">
                <input 
                  type="checkbox" 
                  checked={maintainAspect} 
                  onChange={(e) => setMaintainAspect(e.target.checked)}
                  className="accent-accent w-4 h-4"
                />
                Maintain aspect ratio (adds black bars)
              </label>
              <p className="text-xs text-muted mt-2">By default, images are cropped to fit perfectly.</p>
            </div>
          </div>

          <div className="lg:col-span-2">
            <div className="flex overflow-x-auto pb-2 -mx-4 px-4 md:mx-0 md:px-0 gap-2 mb-6 scrollbar-hide">
              {Object.keys(PLATFORMS).map((platform) => (
                <button
                  key={platform}
                  onClick={() => setActivePlatform(platform)}
                  className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    activePlatform === platform
                      ? 'bg-gradient text-bg'
                      : 'bg-surface2 text-muted hover:text-text hover:bg-surface'
                  }`}
                >
                  {platform}
                </button>
              ))}
            </div>

            <div className="flex justify-between items-center mb-6">
              <h2 className="font-clash text-2xl font-bold">{activePlatform} Sizes</h2>
              <button 
                onClick={handleDownloadAll}
                className="px-4 py-2 bg-gradient text-bg rounded-lg font-bold shadow-md hover:opacity-90 transition-opacity"
              >
                Download All (ZIP)
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {PLATFORMS[activePlatform].map((size) => (
                <div key={size.label} className="bg-surface border border-border rounded-xl p-4 flex flex-col justify-between">
                  <div className="mb-4">
                    <h4 className="font-semibold">{size.label}</h4>
                    <p className="text-xs text-muted font-fira">{size.width} × {size.height} px</p>
                  </div>
                  <button
                    onClick={() => handleDownloadSingle(size)}
                    className="w-full py-2 bg-surface2 rounded-lg text-sm hover:text-accent hover:bg-surface transition-colors border border-transparent hover:border-accent/30"
                  >
                    Download PNG
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* SEO Content & FAQ */}
      <section className="mt-16 pt-8 border-t border-border space-y-8">
        <div>
          <h2 className="font-clash text-2xl font-bold mb-3">Free Social Media Image Resizer — How It Works</h2>
          <p className="text-muted leading-relaxed">
            Our <strong className="text-text">social media image resizer</strong> runs entirely in your browser using the Canvas API — your images never leave your device.
            Upload any JPG, PNG, or WEBP image, select a platform, and choose a size preset. For <strong className="text-text">Instagram</strong>, get all 5 sizes
            (1080×1080, 1080×1350, 1080×566, Story 1080×1920, Profile 110×110) at once as a ZIP file.
            Toggle <strong className="text-text">Maintain Aspect Ratio</strong> to add letterboxing instead of cropping.
            Want the right thumbnail for your YouTube channel too? Use our free <a href="/youtube-thumbnail" className="text-accent hover:underline">YouTube Thumbnail Downloader</a> to grab existing ones as reference.
          </p>
        </div>

        <div>
          <h2 className="font-clash text-2xl font-bold mb-4">Frequently Asked Questions</h2>
          <div className="space-y-5">
            {[
              { q: "What is the correct image size for Instagram posts?", a: "Instagram supports three post sizes: Square (1080×1080 px), Portrait (1080×1350 px), and Landscape (1080×566 px). For Stories and Reels, use 1080×1920 px." },
              { q: "What is the Twitter/X header image size?", a: "The recommended Twitter/X profile header size is 1500×500 pixels. For image posts, use 1200×675 px for the optimal 16:9 display ratio." },
              { q: "What size should a YouTube thumbnail be?", a: "YouTube recommends 1280×720 pixels (16:9 ratio), under 2 MB, in JPG, PNG, or WEBP. Our resizer includes this preset in the YouTube tab." },
              { q: "Does this image resizer upload my photos to a server?", a: "No. GridSnap's resizer works entirely in your browser using the Canvas API. Your images are processed locally and are never uploaded to any server, ensuring complete privacy." },
              { q: "Can I download all Instagram sizes at once?", a: "Yes! After uploading, select the Instagram tab and click 'Download All (ZIP)' to receive all 5 Instagram sizes (square, portrait, landscape, story, profile) in a single ZIP file." },
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

      <RelatedTools exclude="/image-resizer-social" />
    </div>
  );
}
