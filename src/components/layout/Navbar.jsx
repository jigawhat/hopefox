import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Heart, Menu, X, MessageCircle, PenLine } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const navLinks = [
  { label: 'Home', path: '/' },
  { label: 'Resources', path: '/resources' },
  { label: 'Stories', path: '/stories' },
  { label: 'Quotes', path: '/quotes' },
  { label: 'Planner', path: '/planner' },
  { label: 'Music', path: '/music' },
  { label: 'My Contacts', path: '/my-contacts' },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  return (
    <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center transition-transform group-hover:scale-105">
              <Heart className="w-5 h-5 text-primary-foreground fill-primary-foreground" />
            </div>
            <span className="text-xl font-bold tracking-tight text-foreground">
              Hope<span className="text-primary">Fox</span>
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-1">
            {navLinks.map(link => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  location.pathname === link.path
                    ? 'bg-primary/10 text-primary'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-3">
            <Link to="/share-story">
              <Button variant="outline" className="gap-2 rounded-full">
                <PenLine className="w-4 h-4" />
                Share Your Story
              </Button>
            </Link>
            <Link to="/chat">
              <Button className="gap-2 rounded-full shadow-lg shadow-primary/20">
                <MessageCircle className="w-4 h-4" />
                Talk to HopeFox
              </Button>
            </Link>
          </div>

          <button
            className="md:hidden p-2 rounded-lg hover:bg-muted"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-border/50 bg-background"
          >
            <div className="px-4 py-4 space-y-1">
              {navLinks.map(link => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setMobileOpen(false)}
                  className={`block px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    location.pathname === link.path
                      ? 'bg-primary/10 text-primary'
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <Link to="/share-story" onClick={() => setMobileOpen(false)}>
                <Button variant="outline" className="w-full mt-3 gap-2 rounded-full">
                  <PenLine className="w-4 h-4" />
                  Share Your Story
                </Button>
              </Link>
              <Link to="/chat" onClick={() => setMobileOpen(false)}>
                <Button className="w-full mt-2 gap-2 rounded-full">
                  <MessageCircle className="w-4 h-4" />
                  Talk to HopeFox
                </Button>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}