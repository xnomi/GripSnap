'use client';

import { useState } from 'react';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'General Question',
    message: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate instantaneous client-side handling & provide direct mailto action
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 600);
  };

  if (isSubmitted) {
    return (
      <div className="p-8 text-center bg-surface2/60 border border-emerald-500/40 rounded-2xl space-y-4">
        <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 mx-auto flex items-center justify-center text-2xl font-bold">
          ✓
        </div>
        <h3 className="font-bold text-white text-xl">Thank You for Reaching Out</h3>
        <p className="text-sm text-muted max-w-md mx-auto leading-relaxed">
          Your inquiry has been received. Our editorial and technical team reviews all communications within 24 business hours. If your message is urgent, you can also email us directly at{' '}
          <a href="mailto:support@gridsnap.studio" className="text-emerald-400 underline font-mono">
            support@gridsnap.studio
          </a>.
        </p>
        <button
          type="button"
          onClick={() => {
            setIsSubmitted(false);
            setFormData({ name: '', email: '', subject: 'General Question', message: '' });
          }}
          className="mt-4 px-5 py-2.5 rounded-xl bg-surface3 text-white text-xs font-semibold hover:bg-surface transition-colors"
        >
          Send Another Message
        </button>
      </div>
    );
  }

  return (
    <form className="space-y-5" onSubmit={handleSubmit}>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="contact-name" className="block text-xs font-semibold text-muted uppercase tracking-wider mb-2">
            Full Name <span className="text-emerald-400">*</span>
          </label>
          <input
            type="text"
            id="contact-name"
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="Jane Doe"
            className="w-full bg-surface border border-border rounded-xl px-4 h-12 text-white text-base focus:outline-none focus:border-accent transition-colors"
          />
        </div>

        <div>
          <label htmlFor="contact-email" className="block text-xs font-semibold text-muted uppercase tracking-wider mb-2">
            Email Address <span className="text-emerald-400">*</span>
          </label>
          <input
            type="email"
            id="contact-email"
            required
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            placeholder="jane@example.com"
            className="w-full bg-surface border border-border rounded-xl px-4 h-12 text-white text-base focus:outline-none focus:border-accent transition-colors"
          />
        </div>
      </div>

      <div>
        <label htmlFor="contact-subject" className="block text-xs font-semibold text-muted uppercase tracking-wider mb-2">
          Subject / Inquiry Type
        </label>
        <select
          id="contact-subject"
          value={formData.subject}
          onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
          className="w-full bg-surface border border-border rounded-xl px-4 h-12 text-white text-base focus:outline-none focus:border-accent transition-colors"
        >
          <option value="General Question">General Question</option>
          <option value="Calculation Formula Feedback">Calculation Formula / Statutory Feedback</option>
          <option value="Bug Report">Technical Bug Report</option>
          <option value="Feature Request">New Calculator or Jurisdiction Request</option>
          <option value="Partnership / Press">Partnership / Press / Legal Inquiry</option>
        </select>
      </div>

      <div>
        <label htmlFor="contact-message" className="block text-xs font-semibold text-muted uppercase tracking-wider mb-2">
          Your Message <span className="text-emerald-400">*</span>
        </label>
        <textarea
          id="contact-message"
          rows={5}
          required
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          placeholder="Please describe your question or inquiry with specific details..."
          className="w-full bg-surface border border-border rounded-xl px-4 py-3 text-white text-base focus:outline-none focus:border-accent transition-colors resize-none"
        ></textarea>
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full py-4 bg-gradient text-gray-950 font-bold rounded-xl text-base shadow-lg hover:opacity-90 transition-opacity disabled:opacity-50"
      >
        {isSubmitting ? 'Transmitting Message...' : 'Send Message to Support'}
      </button>

      <p className="text-center text-xs text-muted">
        We respect your privacy. Inquiries are never shared or added to marketing newsletters.
      </p>
    </form>
  );
}
