import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Send } from 'lucide-react';

export default function ChatInput({ onSend, disabled }) {
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!message.trim() || disabled) return;
    onSend(message.trim());
    setMessage('');
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-end gap-3">
      <div className="flex-1 relative">
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              handleSubmit(e);
            }
          }}
          placeholder="Share what's on your mind..."
          disabled={disabled}
          rows={1}
          className="w-full resize-none rounded-2xl border border-border bg-card px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all disabled:opacity-50 placeholder:text-muted-foreground"
          style={{ minHeight: '48px', maxHeight: '120px' }}
        />
      </div>
      <Button
        type="submit"
        size="icon"
        disabled={!message.trim() || disabled}
        className="rounded-full h-12 w-12 shrink-0 shadow-lg shadow-primary/20"
      >
        <Send className="w-4 h-4" />
      </Button>
    </form>
  );
}