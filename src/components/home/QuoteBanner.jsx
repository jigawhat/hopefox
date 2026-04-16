import React, { useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';
import { useQuery } from '@tanstack/react-query';
import { Quote } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function QuoteBanner() {
  const [index, setIndex] = useState(0);

  const { data: quotes = [] } = useQuery({
    queryKey: ['home-quotes'],
    queryFn: () => base44.entities.InspirationQuote.list('-created_date', 10),
    initialData: [],
  });

  useEffect(() => {
    if (quotes.length <= 1) return;
    const timer = setInterval(() => {
      setIndex(prev => (prev + 1) % quotes.length);
    }, 8000);
    return () => clearInterval(timer);
  }, [quotes.length]);

  if (quotes.length === 0) return null;

  const quote = quotes[index];

  return (
    <section className="py-16 md:py-24 bg-primary/[0.04]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <Quote className="w-10 h-10 text-primary/30 mx-auto mb-6" />
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-2xl sm:text-3xl font-serif font-medium leading-relaxed text-foreground">
              "{quote.quote}"
            </p>
            {quote.author && (
              <p className="mt-4 text-muted-foreground font-medium">
                — {quote.author}
              </p>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}