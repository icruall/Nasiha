"use client";

import { useState, useRef } from 'react';
import type { Adhkar } from '@/lib/hisn';

export function AdhkarCard({ adhkar }: { adhkar: Adhkar }) {
  const [count, setCount] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const handleIncrement = () => {
    if (count < adhkar.REPEAT) {
      setCount(current => current + 1);
    }
  };

  const toggleAudio = () => {
    if (!audioRef.current) return;
    if (isPlaying) audioRef.current.pause();
    else audioRef.current.play();
    setIsPlaying(!isPlaying);
  };

  const handleAudioEnded = () => {
    setIsPlaying(false);
  };

  const isDone = count >= adhkar.REPEAT;

  return (
    <div className={`group relative p-10 rounded-[2.5rem] border transition-all duration-700 overflow-hidden glass-card ${
      isDone 
      ? 'border-emerald-500/40 bg-emerald-500/[0.03] shadow-[0_20px_50px_rgba(16,185,129,0.1)]' 
      : 'bg-white/[0.02] border-orange-500/20 hover:border-orange-400/50 hover:bg-white/[0.04]'
    }`}>
      {/* Signature Border Light */}
      <div className={`absolute inset-0 border-2 rounded-[2.5rem] pointer-events-none transition-colors duration-700 ${
        isDone ? 'border-emerald-500/30' : 'border-orange-500/10 group-hover:border-orange-400/30'
      }`} />

      <div className="relative space-y-10">
        <div className="text-right space-y-8" dir="rtl">
          {(() => {
            const eveningRegex = /(?:وَإِذَا أَمْسَى قَالَ|وإذا أمسى قال)\s*[:：]?\s*/;
            const match = adhkar.ARABIC_TEXT.match(eveningRegex);
            
            if (match && match.index !== undefined) {
              const morning = adhkar.ARABIC_TEXT.slice(0, match.index);
              const eveningContent = adhkar.ARABIC_TEXT.slice(match.index + match[0].length);
              
              return (
                <div className="space-y-8">
                  <div className="space-y-4">
                    <span className="text-[10px] uppercase tracking-[0.3em] text-emerald-400/50 font-bold block mb-2 border-b border-white/5 pb-1 w-fit mr-0 ml-auto">
                      Morning / أذكار الصباح
                    </span>
                    <p className="text-3xl md:text-4xl leading-[2.2] text-white/90 selection:bg-orange-500/30 whitespace-pre-wrap" style={{ fontFamily: "'UthmanicHafs', serif" }}>
                      {morning.trim()}
                    </p>
                  </div>
                  <div className="space-y-4 pt-6 border-t border-white/5">
                    <span className="text-[10px] uppercase tracking-[0.3em] text-orange-400/50 font-bold block mb-2 border-b border-white/5 pb-1 w-fit mr-0 ml-auto">
                      Evening / أذكار المساء
                    </span>
                    <p className="text-3xl md:text-4xl leading-[2.2] text-white/90 selection:bg-orange-500/30 whitespace-pre-wrap" style={{ fontFamily: "'UthmanicHafs', serif" }}>
                      {eveningContent.trim()}
                    </p>
                  </div>
                </div>
              );
            }
            return (
              <p className="text-3xl md:text-4xl leading-[2.2] text-white/90 selection:bg-orange-500/30 whitespace-pre-wrap" style={{ fontFamily: "'UthmanicHafs', serif" }}>
                {adhkar.ARABIC_TEXT}
              </p>
            );
          })()}
        </div>

        <div className="space-y-4">
          <p className="text-sky-100/60 leading-relaxed text-lg font-sans italic">
            {adhkar.TRANSLATED_TEXT}
          </p>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-6 border-t border-white/5">
          <div className="flex items-center gap-6 w-full sm:w-auto">
            <button
              onClick={handleIncrement}
              className={`relative flex-1 sm:flex-none px-8 py-3.5 rounded-2xl text-sm font-bold tracking-widest uppercase transition-all duration-500 overflow-hidden ${
                isDone 
                ? 'bg-emerald-500/20 text-emerald-400 shadow-[inset_0_0_15px_rgba(16,185,129,0.2)]' 
                : 'bg-orange-500/10 text-orange-400 hover:bg-orange-500/20 active:scale-95 border border-orange-500/20'
              } flex items-center justify-center gap-4`}
            >
              <span>{isDone ? 'Finished' : `Count: ${count} / ${adhkar.REPEAT}`}</span>
              
              <div className="flex gap-1">
                {[...Array(adhkar.REPEAT)].map((_, i) => (
                  <div key={i} className={`w-1.5 h-1.5 rounded-full transition-all duration-500 ${i < count ? 'bg-orange-400' : 'bg-white/10'}`} />
                ))}
              </div>
            </button>

            {adhkar.AUDIO && (
              <>
                <audio ref={audioRef} src={adhkar.AUDIO} onEnded={handleAudioEnded} preload="none" />
                <button 
                  onClick={toggleAudio}
                  className={`w-14 h-14 flex items-center justify-center rounded-2xl transition-all duration-500 ${
                    isPlaying 
                    ? 'bg-orange-500 text-slate-900 shadow-[0_0_20px_rgba(255,127,80,0.4)]' 
                    : 'bg-white/[0.03] text-orange-400 hover:bg-white/[0.08] border border-white/10'
                  }`}
                >
                  {isPlaying ? (
                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
                  )}
                </button>
              </>
            )}
          </div>

          <span className="text-[10px] uppercase tracking-[0.4em] text-white/20 font-bold">
            Ref: {adhkar.ID}
          </span>
        </div>
      </div>
    </div>
  );
}
