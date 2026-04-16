import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Phone } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-foreground/[0.03] border-t border-border/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center">
                <Heart className="w-5 h-5 text-primary-foreground fill-primary-foreground" />
              </div>
              <span className="text-xl font-bold tracking-tight">
                Hope<span className="text-primary">Fox</span>
              </span>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed max-w-sm">
              A safe space for mental health support, resources, and hope. 
              You are not alone — and it's okay to ask for help.
            </p>
            <div className="flex items-center gap-2 mt-4 p-3 rounded-lg bg-destructive/10 border border-destructive/20">
              <Phone className="w-4 h-4 text-destructive flex-shrink-0" />
              <p className="text-xs text-destructive font-medium">
                In crisis? Call or text 988 (Suicide & Crisis Lifeline) — available 24/7
              </p>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-sm mb-4">Navigate</h4>
            <div className="space-y-2.5">
              {[
                { label: 'Home', path: '/' },
                { label: 'Resources', path: '/resources' },
                { label: 'Recovery Stories', path: '/stories' },
                { label: 'Quotes', path: '/quotes' },
                { label: 'Chat with HopeFox', path: '/chat' },
              ].map(link => (
                <Link
                  key={link.path}
                  to={link.path}
                  className="block text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-sm mb-4">Important</h4>
            <div className="space-y-2.5 text-sm text-muted-foreground">
              <p>HopeFox is not a substitute for professional mental health care.</p>
              <p>If you are in immediate danger, please contact emergency services.</p>
            </div>
          </div>
        </div>

        <div className="border-t border-border/50 mt-10 pt-6 text-center space-y-1">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} HopeFox. Made with care for those who need it most.
          </p>
          <p className="text-xs text-muted-foreground">
            Founded by <span className="font-medium text-foreground">Alfonso White</span> & <span className="font-medium text-foreground">Ollie Thompson</span>
          </p>
        </div>
      </div>
    </footer>
  );
}