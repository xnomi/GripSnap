import React from 'react';

type PlatformTabsProps = {
  platforms: string[];
  activePlatform: string;
  onSelect: (platform: string) => void;
};

export default function PlatformTabs({ platforms, activePlatform, onSelect }: PlatformTabsProps) {
  return (
    <div className="flex overflow-x-auto pb-2 -mx-4 px-4 md:mx-0 md:px-0 gap-2 mb-6 scrollbar-hide">
      {platforms.map((platform) => {
        const isActive = activePlatform === platform;
        return (
          <button
            key={platform}
            onClick={() => onSelect(platform)}
            className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium transition-all ${
              isActive
                ? 'bg-gradient text-bg'
                : 'bg-surface2 text-muted hover:text-text hover:bg-surface'
            }`}
          >
            {platform}
          </button>
        );
      })}
    </div>
  );
}
