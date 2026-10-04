/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/privacy',
        destination: '/privacy-policy',
        permanent: true,
      },
      {
        source: '/bio-generator',
        destination: '/',
        permanent: true,
      },
      {
        source: '/hashtag-generator',
        destination: '/',
        permanent: true,
      },
      {
        source: '/image-resizer-social',
        destination: '/hours-worked-calculator',
        permanent: true,
      },
      {
        source: '/tweet-counter',
        destination: '/hours-worked-calculator',
        permanent: true,
      },
      {
        source: '/youtube-thumbnail',
        destination: '/',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
