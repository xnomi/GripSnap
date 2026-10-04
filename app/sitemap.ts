import { MetadataRoute } from 'next';

const BASE = 'https://gridsnap.studio';

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    { path: '', priority: 1.0, changeFrequency: 'daily' as const },
    { path: '/overtime-calculator', priority: 0.95, changeFrequency: 'weekly' as const },
    { path: '/overtime-calculator/california', priority: 0.95, changeFrequency: 'weekly' as const },
    { path: '/overtime-calculator/ontario', priority: 0.9, changeFrequency: 'weekly' as const },
    { path: '/overtime-calculator/australia-fair-work', priority: 0.9, changeFrequency: 'weekly' as const },
    { path: '/hours-worked-calculator', priority: 0.9, changeFrequency: 'weekly' as const },
    { path: '/about', priority: 0.7, changeFrequency: 'monthly' as const },
    { path: '/contact', priority: 0.7, changeFrequency: 'monthly' as const },
    { path: '/privacy-policy', priority: 0.6, changeFrequency: 'monthly' as const },
    { path: '/terms', priority: 0.6, changeFrequency: 'monthly' as const },
  ];

  return routes.map((r) => ({
    url: `${BASE}${r.path}`,
    lastModified: new Date(),
    changeFrequency: r.changeFrequency,
    priority: r.priority,
  }));
}
