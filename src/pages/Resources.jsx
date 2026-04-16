import React, { useState } from 'react';
import { base44 } from '@/api/base44Client';
import { useQuery } from '@tanstack/react-query';
import { Search, Filter, Phone, MapPin } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import ResourceCard from '../components/resources/ResourceCard';
import { motion } from 'framer-motion';

const categories = [
  { value: 'all', label: 'All' },
  { value: 'crisis_support', label: 'Crisis Support' },
  { value: 'helpline', label: 'Helplines' },
  { value: 'therapy', label: 'Therapy' },
  { value: 'self_help', label: 'Self-Help' },
  { value: 'community', label: 'Community' },
  { value: 'online_tools', label: 'Online Tools' },
  { value: 'youth', label: 'Youth' },
  { value: 'substance_abuse', label: 'Substance Abuse' },
];

export default function Resources() {
  const [search, setSearch] = useState('');
  const [locationSearch, setLocationSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');

  const { data: resources = [], isLoading } = useQuery({
    queryKey: ['resources'],
    queryFn: () => base44.entities.MentalHealthResource.list('-created_date', 200),
    initialData: [],
  });

  const filtered = resources.filter(r => {
    const q = search.toLowerCase();
    const matchesSearch = !search || 
      r.name?.toLowerCase().includes(q) || 
      r.description?.toLowerCase().includes(q) ||
      r.location?.toLowerCase().includes(q);
    const matchesCategory = activeCategory === 'all' || r.category === activeCategory;
    const loc = locationSearch.toLowerCase().trim();
    const matchesLocation = !loc || 
      (r.is_national === true || r.is_national === undefined) ||
      r.location?.toLowerCase().includes(loc);
    return matchesSearch && matchesCategory && matchesLocation;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
      {/* Header */}
      <div className="max-w-2xl mb-12">
        <h1 className="text-3xl sm:text-4xl font-serif font-bold mb-4">
          Mental Health Resources
        </h1>
        <p className="text-muted-foreground text-lg leading-relaxed">
          Trusted organisations, helplines, and local services to support your mental health journey.
        </p>
      </div>

      {/* Crisis banner */}
      <div className="flex items-center gap-3 p-4 rounded-xl bg-destructive/5 border border-destructive/20 mb-8">
        <Phone className="w-5 h-5 text-destructive flex-shrink-0" />
        <p className="text-sm">
          <span className="font-semibold text-destructive">In crisis?</span>{' '}
          <span className="text-muted-foreground">Call Samaritans free on </span>
          <a href="tel:116123" className="font-semibold text-destructive hover:underline">116 123</a>
          <span className="text-muted-foreground"> — available 24/7, or text SHOUT to </span>
          <a href="sms:85258" className="font-semibold text-destructive hover:underline">85258</a>
        </p>
      </div>

      {/* Search and filters */}
      <div className="space-y-4 mb-8">
        <div className="flex flex-col sm:flex-row gap-3 max-w-2xl">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search resources..."
              className="pl-10 rounded-xl"
            />
          </div>
          <div className="relative flex-1">
            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              value={locationSearch}
              onChange={(e) => setLocationSearch(e.target.value)}
              placeholder="Filter by county or region..."
              className="pl-10 rounded-xl"
            />
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
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
      </div>

      {/* Resource grid */}
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array(6).fill(0).map((_, i) => (
            <div key={i} className="h-48 rounded-2xl bg-muted animate-pulse" />
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-muted-foreground">No resources found matching your criteria.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((resource, i) => (
            <motion.div
              key={resource.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: i * 0.05 }}
            >
              <ResourceCard resource={resource} />
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}