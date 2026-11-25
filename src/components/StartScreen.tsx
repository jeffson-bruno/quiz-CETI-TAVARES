import React from 'react';
import { motion } from 'motion/react';
import {
  AiBrainHeadWireframe,
  ComputerGearsWireframe,
  WavyNetworkLines,
} from './BackgroundDecor';

interface StartScreenProps {
  onStart: () => void;
  totalQuestions: number;
}

export const StartScreen: React.FC<StartScreenProps> = ({ onStart, totalQuestions }) => {
  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-[#352D6B] flex flex-col items-center justify-center px-5 py-12">
      {/* Background wavy circuit network */}
      <WavyNetworkLines className="absolute inset-0 w-full h-full" />

      {/* Top-right computer + gears wireframe */}
      <ComputerGearsWireframe className="absolute top-3 right-3 sm:top-6 sm:right-8 w-28 sm:w-40 md:w-52 lg:w-60 opacity-85" />

      {/* Bottom-left AI brain head wireframe */}
      <AiBrainHeadWireframe className="absolute bottom-3 left-2 sm:bottom-6 sm:left-8 w-28 sm:w-40 md:w-52 lg:w-60 opacity-85" />

      {/* Centered hero content */}
      <motion.main
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 w-full max-w-2xl mx-auto flex flex-col items-center text-center"
      >
        {/* Title + 3 diagonal accent strokes */}
        <div className="relative inline-block mb-5 sm:mb-7">
          <h1 className="font-display font-black text-white quiz-title-shadow text-[4.5rem] sm:text-[6.5rem] md:text-[7.75rem] leading-none tracking-tight select-none">
            Quiz
          </h1>
          <svg
            viewBox="0 0 64 56"
            aria-hidden="true"
            className="absolute -top-4 -right-10 sm:-top-5 sm:-right-14 w-10 h-10 sm:w-14 sm:h-14 pointer-events-none"
          >
            <g stroke="#504496" strokeWidth="4.5" strokeLinecap="round">
              <line x1="8" y1="38" x2="18" y2="8" />
              <line x1="22" y1="42" x2="44" y2="18" />
              <line x1="28" y1="49" x2="56" y2="35" />
            </g>
          </svg>
        </div>

        {/* Cyan course badge */}
        <div className="bg-[#06C8E8] text-white font-bold rounded-2xl px-6 sm:px-10 py-2.5 sm:py-3.5 text-base sm:text-xl md:text-2xl shadow-[0_8px_22px_rgba(6,200,232,0.28)] mb-6 sm:mb-8">
          —Desenvolvimento de sistemas—
        </div>

        {/* Subtitle */}
        <p className="text-xl sm:text-2xl md:text-3xl font-medium text-white quiz-subtitle-shadow mb-8 sm:mb-10 text-balance">
          Teste seus conhecimentos
        </p>

        {/* Primary CTA with pulse */}
        <div className="relative inline-flex items-center justify-center">
          <span
            aria-hidden="true"
            className="absolute inset-0 rounded-2xl bg-[#06C8E8]/55 pointer-events-none animate-cta-ring"
          />
          <button
            type="button"
            onClick={onStart}
            className="relative bg-[#06C8E8] hover:bg-[#19D4F3] active:scale-[0.98] text-white font-extrabold text-lg sm:text-2xl px-9 sm:px-12 py-3.5 sm:py-4 rounded-2xl shadow-[0_10px_28px_rgba(6,200,232,0.45)] transition-colors duration-150 cursor-pointer focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-white/80 whitespace-nowrap animate-cta-pulse"
          >
            Iniciar Quiz
          </button>
        </div>

        {/* Clean unboxed metadata */}
        <p className="mt-6 text-sm sm:text-base text-white/70 font-medium tracking-wide">
          {totalQuestions} questões · Lógica, Web e Tecnologia
        </p>
      </motion.main>
    </div>
  );
};
