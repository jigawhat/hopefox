import React, { useState } from 'react';
import { Music as MusicIcon, Play, Globe, Wind, BookOpen, Waves } from 'lucide-react';
import { motion } from 'framer-motion';

const categories = [
  { id: 'all', label: 'All', icon: MusicIcon },
  { id: 'hymns', label: 'Hymns', icon: BookOpen },
  { id: 'ambient', label: 'Ambient', icon: Wind },
  { id: 'nature', label: 'Nature Sounds', icon: Waves },
  { id: 'world', label: 'World Music', icon: Globe },
];

const tracks = [
  // Hymns
  {
    id: 1,
    category: 'hymns',
    title: 'Beautiful Relaxing Hymns',
    description: 'Peaceful instrumental hymns — Amazing Grace, Holy Holy Holy & more.',
    youtubeId: 'qiSXFe1QVtY',
    duration: '3 hrs',
  },
  {
    id: 2,
    category: 'hymns',
    title: 'Quiet Lake Morning Hymns',
    description: 'Soft piano hymns with gentle morning ambience by Tim Janis.',
    youtubeId: '8Gu3ZgjiyGQ',
    duration: '3 hrs',
  },
  {
    id: 3,
    category: 'hymns',
    title: '11 Hours of Relaxing Hymns for Sleep',
    description: 'A long hymn compilation perfect for rest and peaceful sleep.',
    youtubeId: 'vkQdUzune6E',
    duration: '11 hrs',
  },
  {
    id: 4,
    category: 'hymns',
    title: 'Finding Peace — Instrumental Hymns',
    description: 'Morning sunrise hymns to start the day with calm and faith.',
    youtubeId: 'kaC-VLF-ra4',
    duration: '3 hrs',
  },
  // Ambient
  {
    id: 5,
    category: 'ambient',
    title: 'Peaceful Calm Soothing Music',
    description: 'Flute, piano, harp and violin blend into a healing soundscape.',
    youtubeId: 'tck7E11SdR8',
    duration: '3 hrs',
  },
  {
    id: 6,
    category: 'ambient',
    title: 'Beautiful Relaxing Peaceful Music 24/7',
    description: 'Continuous calm music — great for studying, relaxing or sleeping.',
    youtubeId: 'dXIyMS61B68',
    duration: 'Live',
  },
  {
    id: 7,
    category: 'ambient',
    title: 'Deep Meditation & Bird Sounds',
    description: 'Soothing sounds of nature combined with gentle meditation music.',
    youtubeId: 'kKJvGtqcnno',
    duration: '3 hrs',
  },
  // Nature
  {
    id: 8,
    category: 'nature',
    title: 'Ocean Waves Crashing',
    description: 'Relaxing sound of ocean waves and gentle rain for deep calm.',
    youtubeId: 'm2Cb5QRMh6s',
    duration: '8 hrs',
  },
  {
    id: 9,
    category: 'nature',
    title: 'Oregon Coast Nature Sounds',
    description: 'Immersive 4K coastal sounds for sleep and relaxation.',
    youtubeId: '4vgDaGrxXu8',
    duration: '4 hrs',
  },
  {
    id: 10,
    category: 'nature',
    title: 'Forest, Ocean, Rain & Night Sounds',
    description: 'Immersive nature ambience — perfect for sleep and meditation.',
    youtubeId: 'aK8Pr092X8w',
    duration: '8 hrs',
  },
  // World
  {
    id: 11,
    category: 'world',
    title: 'Tibetan Singing Bowls — 9 Hours',
    description: 'Ancient healing sounds from Tibet for deep relaxation and sleep.',
    youtubeId: 'OW7TH2U4hps',
    duration: '9 hrs',
  },
  {
    id: 12,
    category: 'world',
    title: 'Tibetan Healing Sounds',
    description: 'Cleansing singing bowls and bell meditations for calm and healing.',
    youtubeId: 'x6UITRjhijI',
    duration: '3 hrs',
  },
  {
    id: 13,
    category: 'world',
    title: 'Tibetan Bowls — Inner Peace',
    description: 'Invoking inner peace and deep relaxation through ancient sound.',
    youtubeId: 'HhXDF8bmav8',
    duration: '1 hr',
  },
];

const categoryColors = {
  hymns: 'bg-amber-500/10 text-amber-700 border-amber-500/20',
  ambient: 'bg-purple-500/10 text-purple-700 border-purple-500/20',
  nature: 'bg-emerald-500/10 text-emerald-700 border-emerald-500/20',
  world: 'bg-blue-500/10 text-blue-700 border-blue-500/20',
};

const categoryLabels = {
  hymns: 'Hymns',
  ambient: 'Ambient',
  nature: 'Nature',
  world: 'World Music',
};

function TrackCard({ track }) {
  const [playing, setPlaying] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-card border border-border/50 rounded-2xl overflow-hidden hover:shadow-lg transition-shadow group"
    >
      {playing ? (
        <div className="aspect-video">
          <iframe
            className="w-full h-full"
            src={`https://www.youtube.com/embed/${track.youtubeId}?autoplay=1`}
            title={track.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      ) : (
        <div
          className="aspect-video bg-muted relative cursor-pointer"
          onClick={() => setPlaying(true)}
        >
          <img
            src={`https://img.youtube.com/vi/${track.youtubeId}/hqdefault.jpg`}
            alt={track.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/30 flex items-center justify-center group-hover:bg-black/40 transition-colors">
            <div className="w-14 h-14 rounded-full bg-white/90 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
              <Play className="w-6 h-6 text-foreground ml-1" fill="currentColor" />
            </div>
          </div>
          <div className="absolute top-3 right-3 bg-black/60 text-white text-xs px-2 py-0.5 rounded-full">
            {track.duration}
          </div>
        </div>
      )}

      <div className="p-4">
        <div className="flex items-start justify-between gap-2 mb-1">
          <h3 className="font-semibold text-sm leading-snug">{track.title}</h3>
          <span className={`shrink-0 text-xs px-2 py-0.5 rounded-full border ${categoryColors[track.category]}`}>
            {categoryLabels[track.category]}
          </span>
        </div>
        <p className="text-xs text-muted-foreground leading-relaxed">{track.description}</p>
      </div>
    </motion.div>
  );
}

export default function Music() {
  const [activeCategory, setActiveCategory] = useState('all');

  const filtered = activeCategory === 'all'
    ? tracks
    : tracks.filter(t => t.category === activeCategory);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
      {/* Header */}
      <div className="max-w-2xl mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
          <MusicIcon className="w-3.5 h-3.5" />
          Healing through sound
        </div>
        <h1 className="text-3xl sm:text-4xl font-serif font-bold mb-4">
          Music & Sounds
        </h1>
        <p className="text-muted-foreground text-lg leading-relaxed">
          Curated hymns, ambient music, nature sounds and world music to calm the mind, lift the spirit and aid relaxation.
        </p>
      </div>

      {/* Category filters */}
      <div className="flex flex-wrap gap-2 mb-10">
        {categories.map(cat => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              activeCategory === cat.id
                ? 'bg-primary text-primary-foreground'
                : 'bg-muted text-muted-foreground hover:bg-muted/80'
            }`}
          >
            <cat.icon className="w-3.5 h-3.5" />
            {cat.label}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map(track => (
          <TrackCard key={track.id} track={track} />
        ))}
      </div>
    </div>
  );
}