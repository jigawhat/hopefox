import React from 'react';
import { Phone, Mail, Building2, Trash2, StickyNote } from 'lucide-react';

export default function ContactCard({ contact, onDelete }) {
  return (
    <div className="bg-card border border-border/50 rounded-2xl p-5 group hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between gap-3 mb-3">
        <div>
          <h3 className="font-semibold text-foreground">{contact.name}</h3>
          {contact.role && (
            <span className="text-xs font-medium text-primary bg-primary/10 px-2 py-0.5 rounded-full mt-1 inline-block">
              {contact.role}
            </span>
          )}
        </div>
        <button
          onClick={() => onDelete(contact.id)}
          className="opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground hover:text-destructive"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>

      <div className="space-y-2">
        {contact.organisation && (
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Building2 className="w-3.5 h-3.5 shrink-0" />
            <span>{contact.organisation}</span>
          </div>
        )}
        {contact.phone && (
          <div className="flex items-center gap-2 text-sm">
            <Phone className="w-3.5 h-3.5 shrink-0 text-muted-foreground" />
            <a href={`tel:${contact.phone}`} className="text-primary hover:underline">
              {contact.phone}
            </a>
          </div>
        )}
        {contact.email && (
          <div className="flex items-center gap-2 text-sm">
            <Mail className="w-3.5 h-3.5 shrink-0 text-muted-foreground" />
            <a href={`mailto:${contact.email}`} className="text-primary hover:underline truncate">
              {contact.email}
            </a>
          </div>
        )}
        {contact.notes && (
          <div className="flex items-start gap-2 text-sm text-muted-foreground mt-3 pt-3 border-t border-border/50">
            <StickyNote className="w-3.5 h-3.5 shrink-0 mt-0.5" />
            <span className="italic">{contact.notes}</span>
          </div>
        )}
      </div>
    </div>
  );
}