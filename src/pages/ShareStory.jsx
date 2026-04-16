import React, { useState } from 'react';
import { base44 } from '@/api/base44Client';
import { Heart, Send, CheckCircle } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const categories = [
  { value: 'anxiety', label: 'Anxiety' },
  { value: 'depression', label: 'Depression' },
  { value: 'ptsd', label: 'PTSD' },
  { value: 'addiction', label: 'Addiction' },
  { value: 'grief', label: 'Grief' },
  { value: 'eating_disorder', label: 'Eating Disorder' },
  { value: 'general', label: 'General / Other' },
];

export default function ShareStory() {
  const [form, setForm] = useState({
    title: '',
    author_name: '',
    email: '',
    category: '',
    excerpt: '',
    content: '',
    consent: false,
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const set = (field, value) => setForm(prev => ({ ...prev, [field]: value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    await base44.integrations.Core.SendEmail({
      to: 'alfewhite@gmail.com',
      from_name: 'HopeFox – Story Submission',
      subject: `New Story Submission: "${form.title}"`,
      body: `A new recovery story has been submitted for moderation on HopeFox.\n\n` +
        `━━━━━━━━━━━━━━━━━━━━━━━━\n` +
        `TITLE: ${form.title}\n` +
        `AUTHOR: ${form.author_name || 'Anonymous'}\n` +
        `EMAIL: ${form.email || 'Not provided'}\n` +
        `CATEGORY: ${form.category}\n` +
        `━━━━━━━━━━━━━━━━━━━━━━━━\n\n` +
        `EXCERPT:\n${form.excerpt}\n\n` +
        `FULL STORY:\n${form.content}\n\n` +
        `━━━━━━━━━━━━━━━━━━━━━━━━\n` +
        `The author has given consent to publish: Yes\n\n` +
        `To publish this story, log in to HopeFox and add it to the Recovery Stories section.`,
    });

    setSubmitted(true);
    setLoading(false);
  };

  if (submitted) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-24 text-center">
        <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="w-10 h-10 text-primary" />
        </div>
        <h1 className="text-3xl font-serif font-bold mb-4">Thank you for sharing 💚</h1>
        <p className="text-muted-foreground text-lg leading-relaxed mb-6">
          Your story has been received and will be reviewed by our team. If approved, it will be published to inspire others on their journey.
        </p>
        <p className="text-sm text-muted-foreground">
          We review all submissions carefully. You may hear back from us if we have any questions.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-12 md:py-20">
      {/* Header */}
      <div className="mb-10">
        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
          <Heart className="w-6 h-6 text-primary fill-primary/30" />
        </div>
        <h1 className="text-3xl sm:text-4xl font-serif font-bold mb-3">Share Your Story</h1>
        <p className="text-muted-foreground text-lg leading-relaxed">
          Your journey could be the light someone else needs. Stories are reviewed by our team before being published.
        </p>
      </div>

      <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-sm text-amber-800 mb-8">
        <strong>Your privacy matters.</strong> You can use a pseudonym or first name only. All submissions are reviewed before publishing. We will never share your contact details.
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="title">Story Title <span className="text-destructive">*</span></Label>
          <Input
            id="title"
            placeholder="e.g. Finding Light After Darkness"
            value={form.title}
            onChange={e => set('title', e.target.value)}
            required
            className="rounded-xl"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="author_name">Your Name (or pseudonym)</Label>
            <Input
              id="author_name"
              placeholder="e.g. Sarah, or Anonymous"
              value={form.author_name}
              onChange={e => set('author_name', e.target.value)}
              className="rounded-xl"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email (optional, for follow-up)</Label>
            <Input
              id="email"
              type="email"
              placeholder="your@email.com"
              value={form.email}
              onChange={e => set('email', e.target.value)}
              className="rounded-xl"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="category">Category <span className="text-destructive">*</span></Label>
          <select
            id="category"
            value={form.category}
            onChange={e => set('category', e.target.value)}
            required
            className="w-full h-9 rounded-xl border border-input bg-background px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
          >
            <option value="">Select a category...</option>
            {categories.map(c => (
              <option key={c.value} value={c.value}>{c.label}</option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="excerpt">Brief Summary <span className="text-destructive">*</span></Label>
          <textarea
            id="excerpt"
            placeholder="A short summary of your story (1–3 sentences) that will appear in the preview..."
            value={form.excerpt}
            onChange={e => set('excerpt', e.target.value)}
            required
            rows={3}
            className="w-full resize-none rounded-xl border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all placeholder:text-muted-foreground"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="content">Your Full Story <span className="text-destructive">*</span></Label>
          <textarea
            id="content"
            placeholder="Share as much or as little as you feel comfortable with. What did you go through? What helped? What would you say to others in a similar situation?"
            value={form.content}
            onChange={e => set('content', e.target.value)}
            required
            rows={12}
            className="w-full resize-none rounded-xl border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all placeholder:text-muted-foreground"
          />
        </div>

        <div className="flex items-start gap-3 p-4 rounded-xl bg-muted/50 border border-border">
          <input
            type="checkbox"
            id="consent"
            checked={form.consent}
            onChange={e => set('consent', e.target.checked)}
            required
            className="mt-0.5 h-4 w-4 rounded border-input accent-primary"
          />
          <label htmlFor="consent" className="text-sm text-muted-foreground leading-relaxed cursor-pointer">
            I give HopeFox permission to publish my story on this platform. I understand it will be reviewed before publishing and I can withdraw consent at any time by contacting us.
          </label>
        </div>

        <Button
          type="submit"
          disabled={loading || !form.consent}
          className="w-full h-12 rounded-xl text-base gap-2 shadow-lg shadow-primary/20"
        >
          {loading ? (
            <div className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
          ) : (
            <Send className="w-4 h-4" />
          )}
          {loading ? 'Submitting...' : 'Submit My Story'}
        </Button>
      </form>
    </div>
  );
}