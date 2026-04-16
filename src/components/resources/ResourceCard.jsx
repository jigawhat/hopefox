import React from 'react';
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Phone, Clock, CheckCircle, MapPin } from 'lucide-react';

const categoryLabels = {
  crisis_support: 'Crisis Support',
  therapy: 'Therapy',
  self_help: 'Self-Help',
  community: 'Community',
  helpline: 'Helpline',
  online_tools: 'Online Tools',
  youth: 'Youth',
  substance_abuse: 'Substance Abuse',
};

const availabilityLabels = {
  '24_7': '24/7',
  business_hours: 'Business Hours',
  varies: 'Hours Vary',
};

export default function ResourceCard({ resource }) {
  return (
    <div className="group p-6 rounded-2xl border border-border/50 bg-card hover:shadow-lg hover:shadow-primary/5 transition-all duration-300">
      <div className="flex items-start justify-between mb-3">
        <div className="flex flex-wrap gap-1.5">
          <Badge variant="secondary" className="text-xs">
            {categoryLabels[resource.category] || resource.category}
          </Badge>
          {resource.location && (
            <Badge variant="outline" className="text-xs gap-1 text-muted-foreground">
              <MapPin className="w-2.5 h-2.5" />
              {resource.location}
            </Badge>
          )}
        </div>
        {resource.is_free && (
          <Badge className="bg-primary/10 text-primary border-0 text-xs gap-1 shrink-0 ml-2">
            <CheckCircle className="w-3 h-3" />
            Free
          </Badge>
        )}
      </div>

      <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors">
        {resource.name}
      </h3>
      <p className="text-sm text-muted-foreground leading-relaxed mb-4">
        {resource.description}
      </p>

      <div className="flex flex-wrap items-center gap-3 text-sm">
        {resource.availability && (
          <span className="flex items-center gap-1.5 text-muted-foreground">
            <Clock className="w-3.5 h-3.5" />
            {availabilityLabels[resource.availability] || resource.availability}
          </span>
        )}
        {resource.phone_number && (
          <a href={`tel:${resource.phone_number}`} className="flex items-center gap-1.5 text-primary hover:underline">
            <Phone className="w-3.5 h-3.5" />
            {resource.phone_number}
          </a>
        )}
        {resource.website_url && (
          <a href={resource.website_url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-primary hover:underline">
            <ExternalLink className="w-3.5 h-3.5" />
            Visit Website
          </a>
        )}
      </div>
    </div>
  );
}