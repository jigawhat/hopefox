import React, { useState } from 'react';
import { BookOpen } from 'lucide-react';

const CATEGORIES = ['all', 'hope', 'strength', 'peace', 'love', 'courage', 'healing', 'faith', 'wisdom'];

const QUOTES = [
  // Hope
  { verse: "For I know the plans I have for you, declares the Lord, plans to prosper you and not to harm you, plans to give you hope and a future.", reference: "Jeremiah 29:11", category: "hope" },
  { verse: "May the God of hope fill you with all joy and peace as you trust in him, so that you may overflow with hope by the power of the Holy Spirit.", reference: "Romans 15:13", category: "hope" },
  { verse: "But those who hope in the Lord will renew their strength. They will soar on wings like eagles; they will run and not grow weary, they will walk and not be faint.", reference: "Isaiah 40:31", category: "hope" },
  { verse: "The Lord is good to those whose hope is in him, to the one who seeks him.", reference: "Lamentations 3:25", category: "hope" },
  { verse: "Be strong and take heart, all you who hope in the Lord.", reference: "Psalm 31:24", category: "hope" },

  // Strength
  { verse: "I can do all this through him who gives me strength.", reference: "Philippians 4:13", category: "strength" },
  { verse: "The Lord is my strength and my shield; my heart trusts in him, and he helps me.", reference: "Psalm 28:7", category: "strength" },
  { verse: "Be strong and courageous. Do not be afraid; do not be discouraged, for the Lord your God will be with you wherever you go.", reference: "Joshua 1:9", category: "strength" },
  { verse: "God is our refuge and strength, an ever-present help in trouble.", reference: "Psalm 46:1", category: "strength" },
  { verse: "The Lord is my strength and my song; he has given me victory.", reference: "Exodus 15:2", category: "strength" },
  { verse: "Finally, be strong in the Lord and in his mighty power.", reference: "Ephesians 6:10", category: "strength" },

  // Peace
  { verse: "Peace I leave with you; my peace I give you. I do not give to you as the world gives. Do not let your hearts be troubled and do not be afraid.", reference: "John 14:27", category: "peace" },
  { verse: "And the peace of God, which transcends all understanding, will guard your hearts and your minds in Christ Jesus.", reference: "Philippians 4:7", category: "peace" },
  { verse: "You will keep in perfect peace those whose minds are steadfast, because they trust in you.", reference: "Isaiah 26:3", category: "peace" },
  { verse: "The Lord bless you and keep you; the Lord make his face shine on you and be gracious to you; the Lord turn his face toward you and give you peace.", reference: "Numbers 6:24-26", category: "peace" },
  { verse: "Do not be anxious about anything, but in every situation, by prayer and petition, with thanksgiving, present your requests to God.", reference: "Philippians 4:6", category: "peace" },

  // Love
  { verse: "For God so loved the world that he gave his one and only Son, that whoever believes in him shall not perish but have eternal life.", reference: "John 3:16", category: "love" },
  { verse: "Love is patient, love is kind. It does not envy, it does not boast, it is not proud.", reference: "1 Corinthians 13:4", category: "love" },
  { verse: "We love because he first loved us.", reference: "1 John 4:19", category: "love" },
  { verse: "And over all these virtues put on love, which binds them all together in perfect unity.", reference: "Colossians 3:14", category: "love" },
  { verse: "The Lord your God is with you, the Mighty Warrior who saves. He will take great delight in you; in his love he will no longer rebuke you, but will rejoice over you with singing.", reference: "Zephaniah 3:17", category: "love" },

  // Courage
  { verse: "Have I not commanded you? Be strong and courageous. Do not be afraid; do not be discouraged, for the Lord your God will be with you wherever you go.", reference: "Joshua 1:9", category: "courage" },
  { verse: "So do not fear, for I am with you; do not be dismayed, for I am your God. I will strengthen you and help you.", reference: "Isaiah 41:10", category: "courage" },
  { verse: "Be on your guard; stand firm in the faith; be courageous; be strong.", reference: "1 Corinthians 16:13", category: "courage" },
  { verse: "The Lord is my light and my salvation — whom shall I fear? The Lord is the stronghold of my life — of whom shall I be afraid?", reference: "Psalm 27:1", category: "courage" },
  { verse: "Wait for the Lord; be strong and take heart and wait for the Lord.", reference: "Psalm 27:14", category: "courage" },

  // Healing
  { verse: "He heals the brokenhearted and binds up their wounds.", reference: "Psalm 147:3", category: "healing" },
  { verse: "But he was pierced for our transgressions, he was crushed for our iniquities; the punishment that brought us peace was on him, and by his wounds we are healed.", reference: "Isaiah 53:5", category: "healing" },
  { verse: "Come to me, all you who are weary and burdened, and I will give you rest.", reference: "Matthew 11:28", category: "healing" },
  { verse: "The Lord is close to the brokenhearted and saves those who are crushed in spirit.", reference: "Psalm 34:18", category: "healing" },
  { verse: "He himself bore our sins in his body on the cross, so that we might die to sins and live for righteousness; by his wounds you have been healed.", reference: "1 Peter 2:24", category: "healing" },

  // Faith
  { verse: "Now faith is confidence in what we hope for and assurance about what we do not see.", reference: "Hebrews 11:1", category: "faith" },
  { verse: "For we live by faith, not by sight.", reference: "2 Corinthians 5:7", category: "faith" },
  { verse: "Trust in the Lord with all your heart and lean not on your own understanding; in all your ways submit to him, and he will make your paths straight.", reference: "Proverbs 3:5-6", category: "faith" },
  { verse: "Jesus replied, 'What is impossible with man is possible with God.'", reference: "Luke 18:27", category: "faith" },
  { verse: "And without faith it is impossible to please God, because anyone who comes to him must believe that he exists and that he rewards those who earnestly seek him.", reference: "Hebrews 11:6", category: "faith" },

  // Wisdom
  { verse: "If any of you lacks wisdom, you should ask God, who gives generously to all without finding fault, and it will be given to you.", reference: "James 1:5", category: "wisdom" },
  { verse: "The fear of the Lord is the beginning of wisdom; all who follow his precepts have good understanding.", reference: "Psalm 111:10", category: "wisdom" },
  { verse: "For the Lord gives wisdom; from his mouth come knowledge and understanding.", reference: "Proverbs 2:6", category: "wisdom" },
  { verse: "Your word is a lamp for my feet, a light on my path.", reference: "Psalm 119:105", category: "wisdom" },
  { verse: "The beginning of wisdom is this: Get wisdom, and whatever you get, get insight.", reference: "Proverbs 4:7", category: "wisdom" },
];

const categoryColors = {
  hope: 'bg-emerald-50 border-emerald-200 text-emerald-800',
  strength: 'bg-blue-50 border-blue-200 text-blue-800',
  peace: 'bg-sky-50 border-sky-200 text-sky-800',
  love: 'bg-rose-50 border-rose-200 text-rose-800',
  courage: 'bg-orange-50 border-orange-200 text-orange-800',
  healing: 'bg-purple-50 border-purple-200 text-purple-800',
  faith: 'bg-amber-50 border-amber-200 text-amber-800',
  wisdom: 'bg-teal-50 border-teal-200 text-teal-800',
};

const badgeColors = {
  hope: 'bg-emerald-100 text-emerald-700',
  strength: 'bg-blue-100 text-blue-700',
  peace: 'bg-sky-100 text-sky-700',
  love: 'bg-rose-100 text-rose-700',
  courage: 'bg-orange-100 text-orange-700',
  healing: 'bg-purple-100 text-purple-700',
  faith: 'bg-amber-100 text-amber-700',
  wisdom: 'bg-teal-100 text-teal-700',
};

export default function BiblicalQuotes() {
  const [activeCategory, setActiveCategory] = useState('all');

  const filtered = activeCategory === 'all'
    ? QUOTES
    : QUOTES.filter(q => q.category === activeCategory);

  return (
    <div>
      <div className="flex items-center gap-2 mb-6">
        <div className="w-8 h-8 rounded-lg bg-amber-100 flex items-center justify-center">
          <BookOpen className="w-4 h-4 text-amber-700" />
        </div>
        <div>
          <h2 className="text-lg font-semibold">Biblical Quotes</h2>
          <p className="text-xs text-muted-foreground">{filtered.length} verses</p>
        </div>
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap gap-2 mb-6">
        {CATEGORIES.map(cat => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium capitalize transition-colors ${
              activeCategory === cat
                ? 'bg-primary text-primary-foreground'
                : 'bg-muted text-muted-foreground hover:bg-muted/80'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Quotes Grid */}
      <div className="grid gap-4 sm:grid-cols-2">
        {filtered.map((q, idx) => (
          <div
            key={idx}
            className={`rounded-xl border p-4 ${categoryColors[q.category] || 'bg-card border-border'}`}
          >
            <p className="text-sm leading-relaxed italic mb-3">"{q.verse}"</p>
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold">{q.reference}</span>
              <span className={`text-xs px-2 py-0.5 rounded-full capitalize font-medium ${badgeColors[q.category]}`}>
                {q.category}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}