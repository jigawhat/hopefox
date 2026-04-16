import React, { useState } from 'react';
import { base44 } from '@/api/base44Client';
import { useQuery } from '@tanstack/react-query';
import StoryCard from '../components/stories/StoryCard';
import { motion } from 'framer-motion';

const categories = [
  { value: 'all', label: 'All Stories' },
  { value: 'anxiety', label: 'Anxiety' },
  { value: 'depression', label: 'Depression' },
  { value: 'ptsd', label: 'PTSD' },
  { value: 'addiction', label: 'Addiction' },
  { value: 'grief', label: 'Grief' },
  { value: 'eating_disorder', label: 'Eating Disorder' },
  { value: 'general', label: 'General' },
];

export default function Stories() {
  const [activeCategory, setActiveCategory] = useState('all');

  const { data: stories = [], isLoading } = useQuery({
    queryKey: ['stories'],
    queryFn: () => base44.entities.RecoveryStory.list('-created_date', 50),
    initialData: [],
  });

  const filtered = activeCategory === 'all'
    ? stories
    : stories.filter(s => s.category === activeCategory);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
      <div className="max-w-2xl mb-12">
        <h1 className="text-3xl sm:text-4xl font-serif font-bold mb-4">
          Recovery Stories
        </h1>
        <p className="text-muted-foreground text-lg leading-relaxed">
          Real stories from real people. Recovery is possible — these voices prove it.
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array(6).fill(0).map((_, i) => (
            <div key={i} className="h-64 rounded-2xl bg-muted animate-pulse" />
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-muted-foreground">No stories found in this category yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((story, i) => (
            <motion.div
              key={story.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: i * 0.05 }}
            >
              <StoryCard story={story} />
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}