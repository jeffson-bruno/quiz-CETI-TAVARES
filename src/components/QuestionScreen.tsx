import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2, XCircle, ArrowRight, RotateCcw } from 'lucide-react';
import { QuizQuestion } from '../data/quizData';
import {
  preloadSpideyPoses,
  SpideyPullingHero,
  SpideySad,
  SpideyThinking,
} from './SpideyCharacter';
import { CircularSpiderWeb, CornerRightSpiderWeb } from './SpiderWebs';

interface QuestionScreenProps {
  question: QuizQuestion;
  questionIndex: number;
  totalQuestions: number;
  selectedIds: string[];
  isRevealed: boolean;
  isAnswerCorrect: boolean | null;
  onSelectOption: (optionId: string) => void;
  onConfirmMultiSelect: () => void;
  onNext: () => void;
  onRestart: () => void;
}

interface WebStrandLine {
  id: string;
  x1: number;
  y1: number;
  x2: number;
  y2: number;
}

export const QuestionScreen: React.FC<QuestionScreenProps> = ({
  question,
  questionIndex,
  totalQuestions,
  selectedIds,
  isRevealed,
  isAnswerCorrect,
  onSelectOption,
  onConfirmMultiSelect,
  onNext,
  onRestart,
}) => {
  const isLast = questionIndex === totalQuestions - 1;
  const stageRef = useRef<HTMLElement | null>(null);
  const mascotAnchorRef = useRef<HTMLDivElement | null>(null);
  const optionRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const [webLines, setWebLines] = useState<WebStrandLine[]>([]);
  const [pullOffset, setPullOffset] = useState<{ x: number; y: number } | null>(null);

  useEffect(() => {
    preloadSpideyPoses();
  }, []);

  useLayoutEffect(() => {
    if (!isRevealed) {
      setWebLines([]);
      setPullOffset(null);
      return;
    }

    const computeLinesAndPull = () => {
      const stageEl = stageRef.current;
      const mascotEl = mascotAnchorRef.current;
      if (!stageEl || !mascotEl) return;

      const stageRect = stageEl.getBoundingClientRect();
      const mascotRect = mascotEl.getBoundingClientRect();

      // Posição exata da mão do boneco (canto inferior direito, acima do rodapé do card)
      const mascotCenterX = mascotRect.left + mascotRect.width / 2;
      const mascotCenterY = mascotRect.top + mascotRect.height / 2;
      const handStartX = mascotRect.left - stageRect.left + mascotRect.width * 0.35;
      const handStartY = mascotRect.top - stageRect.top + mascotRect.height * 0.35;

      const nextLines: WebStrandLine[] = [];
      let firstPullTarget: { x: number; y: number } | null = null;

      question.options.forEach((opt) => {
        if (!opt.isCorrect) return;
        const optEl = optionRefs.current[opt.id];
        if (!optEl) return;

        const optRect = optEl.getBoundingClientRect();

        if (isAnswerCorrect === true) {
          // Alvo da teia: borda esquerda do form correto; boneco para na borda sem cobrir o texto
          const targetWebX = optRect.left + 8;
          const targetWebY = optRect.top + optRect.height * 0.5;
          const targetMascotX = optRect.left - 4;
          const targetMascotY = optRect.top + optRect.height * 0.5;

          nextLines.push({
            id: opt.id,
            x1: handStartX,
            y1: handStartY,
            x2: targetWebX - stageRect.left,
            y2: targetWebY - stageRect.top,
          });

          if (!firstPullTarget) {
            firstPullTarget = {
              x: targetMascotX - mascotCenterX,
              y: targetMascotY - mascotCenterY,
            };
          }
        } else if (isAnswerCorrect === false) {
          // Teia vinda do lado direito grudando na resposta certa
          const startX = stageRect.width + 12;
          const startY = Math.max(0, optRect.top - stageRect.top - 14);
          const endX = optRect.right - stageRect.left - 18;
          const endY = optRect.top - stageRect.top + 14;

          nextLines.push({
            id: opt.id,
            x1: startX,
            y1: startY,
            x2: endX,
            y2: endY,
          });
        }
      });

      setWebLines((prev) => {
        if (
          prev.length === nextLines.length &&
          prev.every(
            (l, idx) =>
              l.id === nextLines[idx].id &&
              Math.abs(l.x1 - nextLines[idx].x1) < 2 &&
              Math.abs(l.y1 - nextLines[idx].y1) < 2 &&
              Math.abs(l.x2 - nextLines[idx].x2) < 2 &&
              Math.abs(l.y2 - nextLines[idx].y2) < 2,
          )
        ) {
          return prev;
        }
        return nextLines;
      });
      setPullOffset((prev) => {
        if (!firstPullTarget) return null;
        if (
          prev &&
          Math.abs(prev.x - firstPullTarget.x) < 2 &&
          Math.abs(prev.y - firstPullTarget.y) < 2
        ) {
          return prev;
        }
        return firstPullTarget;
      });
    };

    computeLinesAndPull();
    const rafId = requestAnimationFrame(computeLinesAndPull);
    const timerId = window.setTimeout(computeLinesAndPull, 60);

    const observer = new ResizeObserver(computeLinesAndPull);
    if (stageRef.current) observer.observe(stageRef.current);
    window.addEventListener('resize', computeLinesAndPull);

    return () => {
      cancelAnimationFrame(rafId);
      clearTimeout(timerId);
      observer.disconnect();
      window.removeEventListener('resize', computeLinesAndPull);
    };
  }, [isRevealed, isAnswerCorrect, question]);

  return (
    <div className="relative min-h-screen w-full overflow-x-hidden bg-[#352D6B] outer-dot-grid flex flex-col justify-between px-4 sm:px-6 lg:px-10 py-5 sm:py-8">
      <div className="relative z-10 w-full max-w-3xl lg:max-w-4xl mx-auto flex-1 flex flex-col justify-between gap-5 sm:gap-7">
        {/* Top Question Speech Bubble (original purple + cyan) */}
        <motion.header
          key={`header-${question.id}`}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full pt-2"
        >
          {/* Cyan 3 diagonal lines at top-right */}
          <svg
            viewBox="0 0 60 52"
            aria-hidden="true"
            className="absolute -top-2 -right-1 sm:-top-3 sm:-right-2 w-10 h-10 sm:w-12 sm:h-12 z-20 pointer-events-none"
          >
            <g stroke="#06C8E8" strokeWidth="4.2" strokeLinecap="round">
              <line x1="12" y1="34" x2="19" y2="7" />
              <line x1="25" y1="39" x2="43" y2="17" />
              <line x1="31" y1="46" x2="54" y2="34" />
            </g>
          </svg>

          <div className="relative">
            <div
              aria-hidden="true"
              className="absolute inset-0 translate-y-1.5 -translate-x-1 sm:translate-y-2 sm:-translate-x-1.5 rounded-[36px] sm:rounded-[48px] bg-[#06C8E8]"
            />
            <svg
              viewBox="0 0 44 36"
              aria-hidden="true"
              className="absolute -bottom-2.5 left-3 sm:left-5 w-8 h-7 text-[#06C8E8]"
            >
              <path d="M 16 0 C 12 16, 6 24, 0 32 C 14 29, 26 24, 34 14 Z" fill="currentColor" />
            </svg>

            <div className="relative bg-[#282156] rounded-[36px] sm:rounded-[48px] px-6 sm:px-10 py-5 sm:py-7 text-center shadow-lg">
              <h2 className="text-lg sm:text-2xl md:text-[1.65rem] font-extrabold text-white leading-snug text-balance">
                {question.prompt}
              </h2>
              {question.hint && (
                <p className="mt-1.5 text-sm sm:text-lg font-bold text-[#06C8E8]">
                  {question.hint}
                </p>
              )}
            </div>
          </div>
        </motion.header>

        {/* Middle Halftone Options Card + Web Animation Overlay */}
        <main ref={stageRef} className="relative w-full my-auto">
          {/* Fio da teia saindo diretamente do boneco até a resposta correta */}
          {isRevealed && webLines.length > 0 && (
            <svg
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 w-full h-full z-25 overflow-visible"
            >
              {webLines.map((line, i) =>
                isAnswerCorrect === true ? (
                  <g key={line.id}>
                    <motion.line
                      stroke="#FFFFFF"
                      strokeWidth="3.5"
                      strokeLinecap="round"
                      initial={{
                        x1: line.x1,
                        y1: line.y1,
                        x2: line.x1,
                        y2: line.y1,
                        opacity: 0.95,
                      }}
                      animate={{
                        x1: [
                          line.x1,
                          line.x1,
                          line.x1 + (line.x2 - line.x1) * 0.42,
                          line.x2,
                        ],
                        y1: [
                          line.y1,
                          line.y1,
                          line.y1 + (line.y2 - line.y1) * 0.52,
                          line.y2,
                        ],
                        x2: [line.x1, line.x2, line.x2, line.x2],
                        y2: [line.y1, line.y2, line.y2, line.y2],
                        opacity: [0.95, 0.95, 0.85, 0],
                      }}
                      transition={{
                        duration: 0.85,
                        delay: i * 0.05,
                        times: [0, 0.28, 0.62, 1],
                        ease: [0.22, 1, 0.36, 1],
                      }}
                    />
                    <motion.line
                      stroke="#06C8E8"
                      strokeWidth="1.5"
                      strokeDasharray="6 4"
                      strokeLinecap="round"
                      initial={{
                        x1: line.x1,
                        y1: line.y1,
                        x2: line.x1,
                        y2: line.y1,
                        opacity: 0.85,
                      }}
                      animate={{
                        x1: [
                          line.x1,
                          line.x1,
                          line.x1 + (line.x2 - line.x1) * 0.42,
                          line.x2,
                        ],
                        y1: [
                          line.y1,
                          line.y1,
                          line.y1 + (line.y2 - line.y1) * 0.52,
                          line.y2,
                        ],
                        x2: [line.x1, line.x2, line.x2, line.x2],
                        y2: [line.y1, line.y2, line.y2, line.y2],
                        opacity: [0.85, 0.85, 0.75, 0],
                      }}
                      transition={{
                        duration: 0.85,
                        delay: i * 0.05,
                        times: [0, 0.28, 0.62, 1],
                        ease: [0.22, 1, 0.36, 1],
                      }}
                    />
                  </g>
                ) : (
                  <g key={line.id}>
                    <motion.line
                      x1={line.x1}
                      y1={line.y1}
                      x2={line.x2}
                      y2={line.y2}
                      stroke="#FFFFFF"
                      strokeWidth="3.5"
                      strokeLinecap="round"
                      initial={{ pathLength: 0, opacity: 0.95 }}
                      animate={{ pathLength: 1, opacity: 0.95 }}
                      transition={{ duration: 0.22, delay: i * 0.05, ease: 'easeOut' }}
                    />
                    <motion.line
                      x1={line.x1}
                      y1={line.y1}
                      x2={line.x2}
                      y2={line.y2}
                      stroke="#06C8E8"
                      strokeWidth="1.5"
                      strokeDasharray="6 4"
                      strokeLinecap="round"
                      initial={{ pathLength: 0, opacity: 0.85 }}
                      animate={{ pathLength: 1, opacity: 0.85 }}
                      transition={{ duration: 0.22, delay: i * 0.05, ease: 'easeOut' }}
                    />
                  </g>
                ),
              )}
            </svg>
          )}

          <div className="halftone-card rounded-[28px] sm:rounded-[38px] px-4 sm:px-8 md:px-12 py-7 sm:py-10 shadow-[0_14px_36px_rgba(18,13,48,0.35)]">
            <AnimatePresence mode="wait">
              <motion.div
                key={`options-${question.id}`}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-col gap-5 sm:gap-7"
              >
                {question.options.map((option) => {
                  const isSelected = selectedIds.includes(option.id);
                  const showExpandedExplanation =
                    isRevealed && option.isCorrect && Boolean(option.expandedExplanation);

                  let pillBg = 'bg-[#4B3F8F] hover:bg-[#5B4EA8] text-white';
                  let dotBg = 'bg-[#06C8E8]';
                  let statusIcon: React.ReactNode = null;

                  if (!isRevealed && isSelected) {
                    pillBg =
                      'bg-[#5D4FB0] text-white ring-3 ring-[#06C8E8] shadow-[0_0_0_2px_rgba(6,200,232,0.25)]';
                    dotBg = 'bg-[#06C8E8] ring-4 ring-white/80';
                  } else if (isRevealed) {
                    if (option.isCorrect) {
                      pillBg = 'bg-[#0FD057] text-[#053B1A] shadow-[0_6px_18px_rgba(15,208,87,0.3)]';
                      dotBg = 'bg-[#06C8E8] ring-2 ring-[#0FD057]/60';
                      statusIcon = (
                        <CheckCircle2
                          className="w-6 h-6 sm:w-7 sm:h-7 shrink-0 text-[#053B1A] relative z-10"
                          aria-label="Resposta correta"
                        />
                      );
                    } else {
                      pillBg = 'bg-[#C90C0C] text-white shadow-[0_6px_18px_rgba(201,12,12,0.28)]';
                      dotBg = isSelected ? 'bg-[#06C8E8] ring-3 ring-white/80' : 'bg-[#06C8E8]';
                      statusIcon = (
                        <XCircle
                          className="w-6 h-6 sm:w-7 sm:h-7 shrink-0 text-white/95 relative z-10"
                          aria-label="Resposta incorreta"
                        />
                      );
                    }
                  }

                  return (
                    <div key={option.id} className="flex items-center gap-3.5 sm:gap-5">
                      <span
                        aria-hidden="true"
                        className={`w-5 h-5 sm:w-6 sm:h-6 rounded-full shrink-0 transition-all duration-150 ${dotBg}`}
                      />

                      <button
                        ref={(el) => {
                          optionRefs.current[option.id] = el;
                        }}
                        type="button"
                        disabled={isRevealed}
                        onClick={() => onSelectOption(option.id)}
                        aria-pressed={isSelected}
                        className={`relative overflow-hidden flex-1 min-h-[60px] sm:min-h-[76px] ${
                          showExpandedExplanation
                            ? 'rounded-[30px] sm:rounded-[36px] py-6 sm:py-8'
                            : 'rounded-full py-3.5 sm:py-4'
                        } px-5 sm:px-8 flex items-center justify-between gap-3 text-center transition-all duration-200 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#06C8E8] ${
                          isRevealed ? 'cursor-default' : 'cursor-pointer active:scale-[0.99]'
                        } ${pillBg}`}
                      >
                        {isRevealed && option.isCorrect && isAnswerCorrect === true && (
                          <CircularSpiderWeb
                            className="absolute left-1 sm:left-2 top-1/2 -translate-y-1/2 w-14 h-14 sm:w-18 sm:h-18 opacity-85"
                            delay={0.2}
                          />
                        )}
                        {isRevealed && option.isCorrect && isAnswerCorrect === false && (
                          <CornerRightSpiderWeb
                            className="absolute top-0 right-1 sm:right-2 w-16 h-16 sm:w-22 sm:h-22 opacity-90"
                            delay={0.12}
                          />
                        )}

                        <div className="relative z-10 flex-1 flex flex-col items-center justify-center">
                          <span
                            className={`font-extrabold leading-snug ${
                              showExpandedExplanation
                                ? 'text-2xl sm:text-3xl mb-3'
                                : 'text-base sm:text-xl md:text-2xl'
                            }`}
                          >
                            {option.label}
                          </span>
                          {showExpandedExplanation && (
                            <p className="text-base sm:text-xl md:text-2xl font-bold leading-snug text-[#053B1A] max-w-xl">
                              {option.expandedExplanation}
                            </p>
                          )}
                        </div>
                        {statusIcon}
                      </button>
                    </div>
                  );
                })}
              </motion.div>
            </AnimatePresence>

            {/* Interactive Controls inside card bottom */}
            <div className="mt-7 sm:mt-9 flex flex-wrap items-center justify-between gap-4 pr-2 sm:pr-36 md:pr-44">
              {question.multiSelect && !isRevealed ? (
                <button
                  type="button"
                  disabled={selectedIds.length === 0}
                  onClick={onConfirmMultiSelect}
                  className="bg-[#06C8E8] hover:bg-[#19D4F3] disabled:opacity-45 disabled:cursor-not-allowed text-white font-bold text-base sm:text-lg px-6 py-3 rounded-xl shadow-md transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-white/80 whitespace-nowrap"
                >
                  Confirmar resposta
                </button>
              ) : isRevealed ? (
                <motion.button
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.18 }}
                  type="button"
                  onClick={onNext}
                  className="inline-flex items-center gap-2.5 bg-[#06C8E8] hover:bg-[#19D4F3] active:scale-[0.98] text-white font-extrabold text-base sm:text-lg px-7 py-3.5 rounded-xl shadow-[0_8px_20px_rgba(6,200,232,0.3)] transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-white/80 whitespace-nowrap"
                >
                  <span>{isLast ? 'Ver resultado' : 'Próxima pergunta'}</span>
                  <ArrowRight className="w-5 h-5" aria-hidden="true" />
                </motion.button>
              ) : (
                <p className="text-sm sm:text-base text-white/75 font-medium">
                  {question.multiSelect
                    ? 'Selecione uma ou mais alternativas'
                    : 'Escolha uma alternativa'}
                </p>
              )}
            </div>
          </div>

          {/* Âncora fixa do Homem-Aranha no canto inferior direito do card; ao acertar, ele sobe pela teia até ficar em cima da resposta certa */}
          <div className="pointer-events-none flex justify-end -mt-14 sm:-mt-20 md:-mt-24 pr-1 sm:pr-3 relative z-30">
            <div
              ref={mascotAnchorRef}
              className="w-24 h-24 sm:w-32 sm:h-32 md:w-36 md:h-36 relative"
            >
              {!isRevealed ? (
                <SpideyThinking />
              ) : isAnswerCorrect === false ? (
                <SpideySad />
              ) : (
                <SpideyPullingHero pullOffset={pullOffset} />
              )}
            </div>
          </div>
        </main>

        {/* Bottom Divider Bar + Course Label + Progress */}
        <footer className="relative z-10 w-full pt-1 pb-2">
          <div className="w-full max-w-xl mx-auto">
            <div className="h-2.5 bg-[#282156] rounded-full relative flex items-center justify-center">
              <div
                aria-hidden="true"
                className="w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-t-[10px] border-t-[#282156] translate-y-2.5"
              />
            </div>
            <div className="mt-4 flex flex-wrap items-center justify-between gap-3 text-xs sm:text-sm text-[#7B71BC] font-semibold">
              <span>Desenvolvimento de Sistemas</span>
              <div className="flex items-center gap-4">
                <span className="tabular-nums text-white/80">
                  Pergunta {questionIndex + 1} de {totalQuestions}
                </span>
                <button
                  type="button"
                  onClick={onRestart}
                  className="inline-flex items-center gap-1.5 text-white/70 hover:text-white transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#06C8E8] rounded px-1.5 py-0.5"
                >
                  <RotateCcw className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>Reiniciar</span>
                </button>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};
