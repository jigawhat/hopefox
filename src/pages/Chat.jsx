import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { base44 } from '@/api/base44Client';
import { Heart, AlertTriangle, RotateCcw, ArrowLeft } from 'lucide-react';
import { Button } from "@/components/ui/button";
import ChatMessage from '../components/chat/ChatMessage';
import ChatInput from '../components/chat/ChatInput';
import TypingIndicator from '../components/chat/TypingIndicator';

const SYSTEM_PROMPT = `You are HopeFox, a warm, compassionate, and supportive AI companion for mental health. 

Your role:
- Listen with empathy and validate feelings
- Offer gentle coping strategies and grounding techniques
- Suggest relevant professional resources when appropriate
- Share words of encouragement and hope
- Never diagnose or prescribe medication
- Always remind users that you're an AI companion, not a therapist
- If someone expresses suicidal thoughts or self-harm, immediately provide crisis resources (988 Suicide & Crisis Lifeline)

Personality: Warm, gentle, patient, and hopeful. Use a conversational tone. Keep responses concise but meaningful. Use occasional emojis sparingly (💚, 🌱, ✨) to feel approachable.

IMPORTANT: You are NOT a replacement for professional help. Always encourage seeking professional support when needed.`;

const WELCOME_MESSAGE = {
  role: 'assistant',
  content: `Hi there, I'm HopeFox 💚\n\nI'm here to listen, support, and walk with you — no matter what you're going through. Think of me as a friend who's always available.\n\nYou can share what's on your mind, ask for coping strategies, or just talk. Whatever feels right.\n\n**Remember:** I'm an AI companion, not a therapist. If you're in crisis, please call or text **988** anytime.\n\nHow are you feeling today?`
};

export default function Chat() {
  const [messages, setMessages] = useState([WELCOME_MESSAGE]);
  const [isLoading, setIsLoading] = useState(false);
  const [notified, setNotified] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const handleSend = async (content) => {
    const userMessage = { role: 'user', content };
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setIsLoading(true);

    if (!notified) {
      setNotified(true);
      base44.integrations.Core.SendEmail({
        to: 'alfewhite@gmail.com',
        from_name: 'HopeFox',
        subject: '💚 Someone is chatting with HopeFox',
        body: `A user just started a conversation with HopeFox.\n\nTheir first message:\n"${content}"\n\nTime: ${new Date().toLocaleString('en-GB', { timeZone: 'Europe/London' })}`,
      });
    }

    const conversationHistory = updatedMessages
      .map(m => `${m.role === 'user' ? 'User' : 'HopeFox'}: ${m.content}`)
      .join('\n\n');

    const response = await base44.integrations.Core.InvokeLLM({
      prompt: `${SYSTEM_PROMPT}\n\nConversation so far:\n${conversationHistory}\n\nRespond as HopeFox to the user's latest message. Be warm, supportive, and concise.`,
    });

    setMessages(prev => [...prev, { role: 'assistant', content: response }]);
    setIsLoading(false);
  };

  const handleReset = () => {
    setMessages([WELCOME_MESSAGE]);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-64px)]">
      {/* Header */}
      <div className="border-b border-border/50 bg-background/80 backdrop-blur-sm px-4 py-3">
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link to="/" className="w-10 h-10 rounded-full bg-muted flex items-center justify-center hover:bg-muted/80 transition-colors">
              <ArrowLeft className="w-5 h-5 text-muted-foreground" />
            </Link>
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
              <Heart className="w-5 h-5 text-primary fill-primary" />
            </div>
            <div>
              <h1 className="font-semibold text-sm">HopeFox</h1>
              <p className="text-xs text-muted-foreground">Your AI companion • Always here for you</p>
            </div>
          </div>
          <Button variant="ghost" size="sm" onClick={handleReset} className="gap-1.5 text-muted-foreground">
            <RotateCcw className="w-3.5 h-3.5" />
            New chat
          </Button>
        </div>
      </div>

      {/* Disclaimer */}
      <div className="bg-amber-50 dark:bg-amber-950/20 border-b border-amber-200/50 dark:border-amber-800/30 px-4 py-2">
        <div className="max-w-3xl mx-auto flex items-center gap-2">
          <AlertTriangle className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400 flex-shrink-0" />
          <p className="text-xs text-amber-700 dark:text-amber-400">
            HopeFox is an AI companion, not a mental health professional. In crisis, call <a href="tel:988" className="font-semibold underline">988</a>.
          </p>
        </div>
      </div>

      {/* Messages */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-6">
        <div className="max-w-3xl mx-auto space-y-6">
          {messages.map((msg, i) => (
            <ChatMessage key={i} message={msg} />
          ))}
          {isLoading && <TypingIndicator />}
        </div>
      </div>

      {/* Quick prompts for empty state */}
      {messages.length <= 1 && (
        <div className="px-4 pb-2">
          <div className="max-w-3xl mx-auto flex flex-wrap gap-2">
            {[
              "I'm feeling anxious today",
              "I need a coping strategy",
              "Can you help me with breathing exercises?",
              "I just need someone to talk to",
            ].map(prompt => (
              <button
                key={prompt}
                onClick={() => handleSend(prompt)}
                className="px-3.5 py-2 rounded-full text-sm bg-muted hover:bg-muted/80 text-muted-foreground hover:text-foreground transition-colors"
              >
                {prompt}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input */}
      <div className="border-t border-border/50 bg-background/80 backdrop-blur-sm px-4 py-4">
        <div className="max-w-3xl mx-auto">
          <ChatInput onSend={handleSend} disabled={isLoading} />
        </div>
      </div>
    </div>
  );
}