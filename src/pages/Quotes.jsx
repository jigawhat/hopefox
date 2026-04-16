import React, { useState } from 'react';
import { base44 } from '@/api/base44Client';
import { useQuery } from '@tanstack/react-query';
import { Quote, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import BiblicalQuotes from '../components/planner/BiblicalQuotes';

const categories = [
  { value: 'all', label: 'All' },
  { value: 'hope', label: 'Hope' },
  { value: 'strength', label: 'Strength' },
  { value: 'healing', label: 'Healing' },
  { value: 'courage', label: 'Courage' },
  { value: 'self_care', label: 'Self-Care' },
  { value: 'resilience', label: 'Resilience' },
];

const cardColors = [
  'bg-primary/5 border-primary/10',
  'bg-blue-500/5 border-blue-500/10',
  'bg-amber-500/5 border-amber-500/10',
  'bg-rose-500/5 border-rose-500/10',
  'bg-purple-500/5 border-purple-500/10',
  'bg-emerald-500/5 border-emerald-500/10',
];

export default function Quotes() {
  const [activeCategory, setActiveCategory] = useState('all');

  const { data: quotes = [], isLoading } = useQuery({
    queryKey: ['quotes'],
    queryFn: () => base44.entities.InspirationQuote.list('-created_date', 100),
    initialData: [],
  });

  const filtered = activeCategory === 'all'
    ? quotes
    : quotes.filter(q => q.category === activeCategory);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
      <div className="max-w-2xl mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/20 text-accent-foreground text-sm font-medium mb-4">
          <Sparkles className="w-3.5 h-3.5" />
          Words of wisdom
        </div>
        <h1 className="text-3xl sm:text-4xl font-serif font-bold mb-4">
          Inspirational Quotes
        </h1>
        <p className="text-muted-foreground text-lg leading-relaxed">
          Words to carry with you. Let these quotes remind you of your strength.
        </p>
      </div>

      <div className="flex flex-wrap gap-2 mb-10">
        {categories.map(cat => (
          <button
            key={cat.value}
            onClick={() => setActiveCategory(cat.value)}
            className={`px-3.5 py-1.5 rounded-full text-sm font-medium transition-colors ${
              activeCategory === cat.value
                ? 'bg-primary text-primary-foreground'
                : 'bg-muted text-muted-foreground hover:bg-muted/80'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {isLoading ? (
        <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
          {Array(6).fill(0).map((_, i) => (
            <div key={i} className="h-40 rounded-2xl bg-muted animate-pulse break-inside-avoid" />
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-muted-foreground">No quotes found in this category yet.</p>
        </div>
      ) : (
        <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
          {filtered.map((quote, i) => (
            <motion.div
              key={quote.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: i * 0.03 }}
              className={`break-inside-avoid p-6 rounded-2xl border ${cardColors[i % cardColors.length]}`}
            >
              <Quote className="w-6 h-6 text-primary/30 mb-3" />
              <p className="text-lg font-serif leading-relaxed mb-3">
                "{quote.quote}"
              </p>
              {quote.author && (
                <p className="text-sm text-muted-foreground font-medium">
                  — {quote.author}
                </p>
              )}
              {quote.category && (
                <span className="inline-block mt-3 text-xs text-muted-foreground bg-background/60 px-2.5 py-1 rounded-full capitalize">
                  {quote.category.replace('_', ' ')}
                </span>
              )}
            </motion.div>
          ))}
        </div>
      )}

      {/* Biblical Quotes Section */}
      <div className="mt-20 border-t border-border/50 pt-16">
        <BiblicalQuotes />
      </div>
    </div>
  );
}