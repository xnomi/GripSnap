import type { Metadata } from 'next';
import ContactForm from '@/components/ContactForm';

export const metadata: Metadata = {
  title: 'Contact GridSnap',
  description: 'Get in touch with the GridSnap team. We would love to hear your feedback, feature requests, or answer any questions you might have.',
};

export default function ContactPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <div className="text-center mb-16">
        <h1 className="font-clash text-4xl md:text-5xl font-bold mb-6">Contact Us</h1>
        <p className="text-xl text-muted max-w-2xl mx-auto">
          Have a question, feedback, or a feature request? We&apos;d love to hear from you.
        </p>
      </div>

      <div className="bg-surface2 rounded-2xl p-8 border border-border max-w-2xl mx-auto">
        <ContactForm />
      </div>

      <div className="mt-16 text-center text-muted">
        <p>Prefer email? Reach us directly at <a href="mailto:hello@gridsnap.studio" className="text-accent hover:underline">hello@gridsnap.studio</a></p>
      </div>
    </div>
  );
}
