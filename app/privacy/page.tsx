import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Privacy Policy for GridSnap. Learn how we handle your data and protect your privacy while using our free social media tools.',
};

export default function PrivacyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16 prose prose-invert">
      <h1 className="font-clash text-4xl md:text-5xl font-bold mb-8">Privacy Policy</h1>
      <p className="text-muted mb-8">Last updated: April 23, 2025</p>

      <section className="space-y-6 text-muted leading-relaxed">
        <h2 className="text-text font-semibold text-2xl mt-8 mb-4">1. Introduction</h2>
        <p>
          Welcome to GridSnap (&quot;we&quot;, &quot;our&quot;, or &quot;us&quot;). We are committed to protecting your personal information and your right to privacy. This Privacy Policy explains what information we collect, how we use it, and what rights you have in relation to it.
        </p>

        <h2 className="text-text font-semibold text-2xl mt-8 mb-4">2. Information We Do Not Collect</h2>
        <p>
          We take your privacy seriously. For the vast majority of our tools, we operate strictly locally in your browser. Specifically:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>Image Resizer:</strong> Images are processed entirely locally on your device using the HTML5 Canvas API. We do not upload, store, or view any of the images you process.</li>
          <li><strong>Tweet Counter:</strong> Character counting and thread splitting happen entirely on your device. We do not store or transmit the text you write.</li>
          <li><strong>YouTube Thumbnail Downloader:</strong> We use publicly available YouTube endpoints to fetch thumbnails. We do not store a log of the URLs you download.</li>
        </ul>

        <h2 className="text-text font-semibold text-2xl mt-8 mb-4">3. Information We Collect via Third Parties</h2>
        <p>
          When you use our AI-powered tools (such as the Bio Generator and Hashtag Generator), the inputs you provide (e.g., name, profession, topic) are temporarily sent to our third-party AI provider (Anthropic Claude) solely for the purpose of generating the requested output. We do not store these inputs or outputs on our servers after the session ends.
        </p>
        <p>
          We also use <strong>Google Analytics</strong> to monitor and analyze web traffic and understand how our users interact with the site. Google Analytics collects data such as your IP address, browser type, and pages visited. You can opt out of Google Analytics tracking via browser extensions or settings.
        </p>

        <h2 className="text-text font-semibold text-2xl mt-8 mb-4">4. Cookies and Tracking Technologies</h2>
        <p>
          We may use cookies and similar tracking technologies (like web beacons and pixels) to access or store information to help improve your experience and to allow analytics tools like Google Analytics to function properly.
        </p>

        <h2 className="text-text font-semibold text-2xl mt-8 mb-4">5. Third-Party Links</h2>
        <p>
          Our website may contain links to third-party websites or services that are not owned or controlled by GridSnap. We have no control over, and assume no responsibility for, the content, privacy policies, or practices of any third-party websites or services.
        </p>

        <h2 className="text-text font-semibold text-2xl mt-8 mb-4">6. Changes to This Privacy Policy</h2>
        <p>
          We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the &quot;Last updated&quot; date. You are advised to review this Privacy Policy periodically for any changes.
        </p>

        <h2 className="text-text font-semibold text-2xl mt-8 mb-4">7. Contact Us</h2>
        <p>
          If you have any questions or suggestions about our Privacy Policy, please contact us at <a href="mailto:privacy@gridsnap.studio" className="text-accent hover:underline">privacy@gridsnap.studio</a>.
        </p>
      </section>
    </div>
  );
}
