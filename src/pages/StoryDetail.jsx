import React from 'react';
import { base44 } from '@/api/base44Client';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { ArrowLeft, Heart, ExternalLink, Play } from 'lucide-react';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import ReactMarkdown from 'react-markdown';

function getYouTubeEmbedUrl(url) {
  if (!url) return null;
  const shortMatch = url.match(/youtube\.com\/shorts\/([a-zA-Z0-9_-]+)/);
  if (shortMatch) return `https://www.youtube.com/embed/${shortMatch[1]}`;
  const watchMatch = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]+)/);
  if (watchMatch) return `https://www.youtube.com/embed/${watchMatch[1]}`;
  return null;
}

const categoryLabels = {
  anxiety: 'Anxiety', depression: 'Depression', ptsd: 'PTSD',
  addiction: 'Addiction', grief: 'Grief', eating_disorder: 'Eating Disorder', general: 'General',
};

export default function StoryDetail() {
  const urlParams = new URLSearchParams(window.location.search);
  const storyId = window.location.pathname.split('/').pop();

  const { data: story, isLoading } = useQuery({
    queryKey: ['story', storyId],
    queryFn: async () => {
      const stories = await base44.entities.RecoveryStory.filter({ id: storyId });
      return stories[0];
    },
    enabled: !!storyId,
  });

  if (isLoading) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20">
        <div className="space-y-4 animate-pulse">
          <div className="h-8 bg-muted rounded w-3/4" />
          <div className="h-4 bg-muted rounded w-1/4" />
          <div className="h-64 bg-muted rounded-2xl mt-8" />
        </div>
      </div>
    );
  }

  if (!story) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center">
        <p className="text-muted-foreground">Story not found.</p>
        <Link to="/stories">
          <Button variant="outline" className="mt-4 gap-2">
            <ArrowLeft className="w-4 h-4" />
            Back to Stories
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12 md:py-20">
      <Link to="/stories" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8">
        <ArrowLeft className="w-4 h-4" />
        Back to Stories
      </Link>

      {story.video_url && getYouTubeEmbedUrl(story.video_url) ? (
        <div className="aspect-video rounded-2xl overflow-hidden mb-8 shadow-lg">
          <iframe
            src={getYouTubeEmbedUrl(story.video_url)}
            title={story.title}
            className="w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      ) : story.image_url && (
        <div className="aspect-video rounded-2xl overflow-hidden mb-8">
          <img src={story.image_url} alt={story.title} className="w-full h-full object-cover" />
        </div>
      )}

      <div className="flex items-center gap-3 mb-4">
        {story.category && (
          <Badge variant="secondary">{categoryLabels[story.category]}</Badge>
        )}
      </div>

      <h1 className="text-3xl sm:text-4xl font-serif font-bold mb-3">{story.title}</h1>
      
      {story.author_name && (
        <p className="text-muted-foreground mb-2">By {story.author_name}</p>
      )}
      {story.source_name && (
        <div className="flex items-center gap-2 mb-8">
          <span className="text-xs text-muted-foreground">Source:</span>
          {story.source_url ? (
            <a href={story.source_url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-xs text-primary hover:underline">
              {story.source_name} <ExternalLink className="w-3 h-3" />
            </a>
          ) : (
            <span className="text-xs text-muted-foreground">{story.source_name}</span>
          )}
        </div>
      )}

      <div className="prose prose-lg max-w-none prose-headings:font-serif prose-p:text-muted-foreground prose-p:leading-relaxed">
        <ReactMarkdown>{story.content}</ReactMarkdown>
      </div>

      <div className="mt-12 p-6 rounded-2xl bg-primary/5 border border-primary/10 text-center">
        <Heart className="w-8 h-8 text-primary mx-auto mb-3" />
        <p className="font-semibold mb-1">This story inspires hope</p>
        <p className="text-sm text-muted-foreground">
          If you're going through something similar, know that recovery is possible.
        </p>
      </div>
    </div>
  );
}