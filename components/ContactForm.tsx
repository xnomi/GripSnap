'use client';

export default function ContactForm() {
  return (
    <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); alert("Thanks for your message! Since this is a demo, it hasn't actually been sent. Please reach out via email instead."); }}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label htmlFor="name" className="text-sm font-medium text-text">Name</label>
          <input 
            type="text" 
            id="name" 
            placeholder="Your Name"
            className="w-full bg-surface border border-border rounded-xl px-4 py-3 text-text focus:outline-none focus:border-accent transition-colors"
            required
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="email" className="text-sm font-medium text-text">Email</label>
          <input 
            type="email" 
            id="email" 
            placeholder="you@example.com"
            className="w-full bg-surface border border-border rounded-xl px-4 py-3 text-text focus:outline-none focus:border-accent transition-colors"
            required
          />
        </div>
      </div>
      
      <div className="space-y-2">
        <label htmlFor="subject" className="text-sm font-medium text-text">Subject</label>
        <input 
          type="text" 
          id="subject" 
          placeholder="How can we help?"
          className="w-full bg-surface border border-border rounded-xl px-4 py-3 text-text focus:outline-none focus:border-accent transition-colors"
          required
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="message" className="text-sm font-medium text-text">Message</label>
        <textarea 
          id="message" 
          rows={5}
          placeholder="Your message here..."
          className="w-full bg-surface border border-border rounded-xl px-4 py-3 text-text focus:outline-none focus:border-accent transition-colors resize-none"
          required
        ></textarea>
      </div>

      <button 
        type="submit" 
        className="w-full py-4 bg-gradient text-bg font-bold rounded-xl hover:opacity-90 transition-opacity"
      >
        Send Message
      </button>
    </form>
  );
}
