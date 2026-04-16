import React, { useState, useRef, useEffect } from 'react';
import { Music as MusicIcon, Volume2, VolumeX, SkipForward, X } from 'lucide-react';

const tracks = [
  { id: 'tck7E11SdR8', title: 'Peaceful Calm Soothing Music' },
  { id: 'kKJvGtqcnno', title: 'Deep Meditation & Bird Sounds' },
  { id: 'qiSXFe1QVtY', title: 'Beautiful Relaxing Hymns' },
  { id: '8Gu3ZgjiyGQ', title: 'Quiet Lake Morning Hymns' },
  { id: 'OW7TH2U4hps', title: 'Tibetan Singing Bowls' },
  { id: 'x6UITRjhijI', title: 'Tibetan Healing Sounds' },
  { id: 'm2Cb5QRMh6s', title: 'Ocean Waves Crashing' },
  { id: '4vgDaGrxXu8', title: 'Oregon Coast Nature Sounds' },
];

function randomTrack() {
  return tracks[Math.floor(Math.random() * tracks.length)];
}

export default function BackgroundMusicPlayer() {
  const [track] = useState(randomTrack);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const iframeRef = useRef(null);

  const embedSrc = `https://www.youtube.com/embed/${track.id}?autoplay=1&loop=1&playlist=${track.id}&controls=0&mute=${muted ? 1 : 0}&enablejsapi=1`;

  if (dismissed) return null;

  return (
    <div className="fixed bottom-5 left-5 z-50 flex items-center gap-3 bg-card border border-border shadow-xl rounded-2xl px-4 py-3 max-w-xs w-full">
      {/* Hidden iframe for audio */}
      {playing && (
        <iframe
          ref={iframeRef}
          src={embedSrc}
          className="hidden"
          allow="autoplay"
          title="background-music"
        />
      )}

      {/* Play / Pause toggle */}
      <button
        onClick={() => setPlaying(p => !p)}
        className="w-9 h-9 rounded-full bg-primary flex items-center justify-center shrink-0 hover:bg-primary/90 transition-colors"
      >
        <MusicIcon className="w-4 h-4 text-primary-foreground" />
      </button>

      {/* Track info */}
      <div className="flex-1 min-w-0">
        <p className="text-xs font-semibold truncate">{track.title}</p>
        <p className="text-xs text-muted-foreground">{playing ? 'Now playing' : 'Tap to play'}</p>
      </div>

      {/* Mute */}
      {playing && (
        <button
          onClick={() => setMuted(m => !m)}
          className="text-muted-foreground hover:text-foreground transition-colors"
        >
          {muted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
        </button>
      )}

      {/* Dismiss */}
      <button
        onClick={() => setDismissed(true)}
        className="text-muted-foreground hover:text-foreground transition-colors"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}