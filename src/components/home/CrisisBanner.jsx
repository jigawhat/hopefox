import React from 'react';
import { Phone, ExternalLink } from 'lucide-react';
import { Button } from "@/components/ui/button";

export default function CrisisBanner() {
  return (
    <section className="py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl bg-gradient-to-r from-primary/10 via-primary/5 to-accent/10 border border-primary/20 p-8 md:p-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-full bg-destructive/10 flex items-center justify-center flex-shrink-0">
              <Phone className="w-5 h-5 text-destructive" />
            </div>
            <div>
              <h3 className="text-lg font-semibold">Need immediate help?</h3>
              <p className="text-muted-foreground mt-1">
                If you or someone you know is in crisis, reach out now. You deserve support.
              </p>
            </div>
          </div>
          <div className="flex flex-wrap gap-3">
            <a href="tel:988">
              <Button variant="destructive" className="rounded-full gap-2">
                <Phone className="w-4 h-4" />
                Call 988
              </Button>
            </a>
            <a href="https://988lifeline.org/chat/" target="_blank" rel="noopener noreferrer">
              <Button variant="outline" className="rounded-full gap-2">
                Chat Online
                <ExternalLink className="w-3 h-3" />
              </Button>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}