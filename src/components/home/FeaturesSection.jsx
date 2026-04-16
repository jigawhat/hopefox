import React from 'react';
import { Link } from 'react-router-dom';
import { MessageCircle, BookOpen, Heart, Quote } from 'lucide-react';
import { motion } from 'framer-motion';

const features = [
  {
    icon: MessageCircle,
    title: 'AI Companion',
    description: 'Chat with HopeFox, a compassionate AI companion who listens without judgment and helps you navigate tough moments.',
    link: '/chat',
    color: 'bg-primary/10 text-primary',
  },
  {
    icon: BookOpen,
    title: 'Resource Hub',
    description: 'Find trusted mental health services, helplines, and support organizations — all in one place.',
    link: '/resources',
    color: 'bg-blue-500/10 text-blue-600',
  },
  {
    icon: Heart,
    title: 'Recovery Stories',
    description: 'Read real stories from people who\'ve been through it and come out stronger. You\'re not the first, and you won\'t be the last.',
    link: '/stories',
    color: 'bg-rose-500/10 text-rose-600',
  },
  {
    icon: Quote,
    title: 'Daily Inspiration',
    description: 'Words of hope, strength, and encouragement to carry with you through your day.',
    link: '/quotes',
    color: 'bg-amber-500/10 text-amber-600',
  },
];

export default function FeaturesSection() {
  return (
    <section className="py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-serif font-bold">How HopeFox helps</h2>
          <p className="mt-4 text-muted-foreground max-w-xl mx-auto">
            Multiple ways to find support, connection, and hope — whatever you need right now.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <Link to={feature.link}>
                <div className="group p-8 rounded-2xl border border-border/50 bg-card hover:shadow-lg hover:shadow-primary/5 transition-all duration-300 hover:-translate-y-1 h-full">
                  <div className={`w-12 h-12 rounded-xl ${feature.color} flex items-center justify-center mb-5`}>
                    <feature.icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}