import { MetadataRoute } from 'next';

const BASE = 'https://gridsnap.studio';

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    '',
    '/about',
    '/contact',
    '/privacy',
    '/terms',
    '/bio-generator',
    '/hashtag-generator',
    '/image-resizer-social',
    '/tweet-counter',
    '/youtube-thumbnail',
  ];

  return routes.map((route) => ({
    url: `${BASE}${route}`,
    lastModified: new Date(),
    changeFrequency: route === '' ? 'weekly' : 'monthly',
    priority: route === '' ? 1.0 : (route.includes('-') ? 0.9 : 0.6), // Give tools 0.9, info pages 0.6
  }));
}
