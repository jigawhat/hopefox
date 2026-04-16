import React from 'react';
import { Link } from 'react-router-dom';
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Play, ExternalLink } from 'lucide-react';

const categoryLabels = {
  anxiety: 'Anxiety',
  depression: 'Depression',
  ptsd: 'PTSD',
  addiction: 'Addiction',
  grief: 'Grief',
  eating_disorder: 'Eating Disorder',
  general: 'General',
};

export default function StoryCard({ story }) {
  return (
    <Link to={`/stories/${story.id}`}>
      <div className="group h-full rounded-2xl border border-border/50 bg-card overflow-hidden hover:shadow-lg hover:shadow-primary/5 transition-all duration-300 hover:-translate-y-1">
        {story.video_url ? (
          <div className="aspect-video overflow-hidden bg-muted flex items-center justify-center relative">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
              <div className="w-14 h-14 rounded-full bg-primary/90 flex items-center justify-center shadow-lg">
                <Play className="w-6 h-6 text-white fill-white ml-1" />
              </div>
            </div>
          </div>
        ) : story.image_url && (
          <div className="aspect-video overflow-hidden">
            <img
              src={story.image_url}
              alt={story.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </div>
        )}
        <div className="p-6">
          {story.category && (
            <Badge variant="secondary" className="text-xs mb-3">
              {categoryLabels[story.category] || story.category}
            </Badge>
          )}
          <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors line-clamp-2">
            {story.title}
          </h3>
          {story.author_name && (
            <p className="text-sm text-muted-foreground mb-2">
              By {story.author_name}
            </p>
          )}
          {story.excerpt && (
            <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">
              {story.excerpt}
            </p>
          )}
          <div className="flex items-center justify-between mt-4">
            <div className="flex items-center gap-1.5 text-primary text-sm font-medium">
              {story.video_url ? 'Watch story' : 'Read story'}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
            {story.source_name && (
              <span className="text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded-full">{story.source_name}</span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}