import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Use | GridSnap',
  description: 'Terms of Use and Service for GridSnap. Please read these terms carefully before using our free social media tools.',
};

export default function TermsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16 prose prose-invert">
      <h1 className="font-clash text-4xl md:text-5xl font-bold mb-8">Terms of Use</h1>
      <p className="text-muted mb-8">Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>

      <section className="space-y-6 text-muted leading-relaxed">
        <h2 className="text-text font-semibold text-2xl mt-8 mb-4">1. Acceptance of Terms</h2>
        <p>
          By accessing and using GridSnap (&quot;we&quot;, &quot;our&quot;, or &quot;us&quot;), you agree to be bound by these Terms of Use. If you do not agree to these terms, please do not use our website or tools.
        </p>

        <h2 className="text-text font-semibold text-2xl mt-8 mb-4">2. Description of Service</h2>
        <p>
          GridSnap provides a collection of free online tools designed for social media creators, including but not limited to an Image Resizer, Bio Generator, Hashtag Generator, Tweet Counter, and YouTube Thumbnail Downloader.
        </p>

        <h2 className="text-text font-semibold text-2xl mt-8 mb-4">3. Fair Use and Acceptable Use</h2>
        <p>
          Our tools are provided for free. You agree not to:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Use the services for any illegal or unauthorized purpose.</li>
          <li>Attempt to reverse engineer, scrape, or otherwise maliciously interact with our website or APIs.</li>
          <li>Overload or attempt to disrupt the normal functioning of the site.</li>
        </ul>

        <h2 className="text-text font-semibold text-2xl mt-8 mb-4">4. Intellectual Property</h2>
        <p>
          The content, design, and branding of GridSnap are owned by us. The content you generate (such as bios or cropped images) belongs to you. When using third-party content (like downloading YouTube thumbnails), you are responsible for ensuring you have the right to use that content according to the respective platform&apos;s terms.
        </p>

        <h2 className="text-text font-semibold text-2xl mt-8 mb-4">5. Disclaimer of Warranties</h2>
        <p>
          Our tools are provided &quot;as is&quot; and &quot;as available&quot; without any warranties of any kind, either express or implied. We do not guarantee that the service will be uninterrupted, secure, or error-free.
        </p>
        
        <h2 className="text-text font-semibold text-2xl mt-8 mb-4">6. Advertising and Monetization</h2>
        <p>
          To keep our tools free, we use third-party advertising services like Google AdSense. By using our website, you acknowledge that you may see advertisements and that these third-party providers may use cookies to serve personalized ads based on your prior visits to our website or other websites. Please review our Privacy Policy for more information.
        </p>

        <h2 className="text-text font-semibold text-2xl mt-8 mb-4">7. Limitation of Liability</h2>
        <p>
          In no event shall GridSnap be liable for any indirect, incidental, special, or consequential damages arising out of or in connection with your use of our services.
        </p>

        <h2 className="text-text font-semibold text-2xl mt-8 mb-4">8. Changes to Terms</h2>
        <p>
          We reserve the right to modify these Terms of Use at any time. We will indicate the date of the last update at the top of this page. Your continued use of the site following any changes signifies your acceptance of the new terms.
        </p>

        <h2 className="text-text font-semibold text-2xl mt-8 mb-4">9. Contact Information</h2>
        <p>
          If you have any questions about these Terms, please contact us at <a href="mailto:legal@gridsnap.studio" className="text-accent hover:underline">legal@gridsnap.studio</a>.
        </p>
      </section>
    </div>
  );
}
