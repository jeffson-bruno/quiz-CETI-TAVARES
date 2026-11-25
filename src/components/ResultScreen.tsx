import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2, XCircle, RotateCcw, ListChecks, ChevronUp } from 'lucide-react';
import { QUIZ_RATINGS, QuizQuestion } from '../data/quizData';
import {
  AiBrainHeadWireframe,
  AiChipCloudWireframe,
  ComputerGearsWireframe,
  WavyNetworkLines,
} from './BackgroundDecor';
import { SpideyPresenter } from './SpideyCharacter';

export interface QuestionAnswerRecord {
  questionId: number;
  selectedOptionIds: string[];
  isCorrect: boolean;
}

interface ResultScreenProps {
  questions: QuizQuestion[];
  records: QuestionAnswerRecord[];
  onRestart: () => void;
}

export const ResultScreen: React.FC<ResultScreenProps> = ({
  questions,
  records,
  onRestart,
}) => {
  const [selectedRating, setSelectedRating] = useState<string | null>(null);
  const [showReview, setShowReview] = useState(false);

  const correctCount = records.filter((r) => r.isCorrect).length;
  const wrongCount = records.length - correctCount;
  const activeRating = QUIZ_RATINGS.find((r) => r.id === selectedRating);

  return (
    <div className="relative min-h-screen w-full overflow-x-hidden bg-[#352D6B] flex flex-col justify-between px-5 sm:px-8 py-8 sm:py-10">
      {/* Background wavy lines & wireframes */}
      <WavyNetworkLines className="absolute inset-0 w-full h-full" />
      <AiChipCloudWireframe className="absolute top-2 left-2 sm:top-4 sm:left-6 w-28 sm:w-40 md:w-48 opacity-80" />
      <AiBrainHeadWireframe className="hidden sm:block absolute top-1/3 right-4 md:right-10 w-32 md:w-44 lg:w-52 opacity-80" />
      <ComputerGearsWireframe className="hidden sm:block absolute bottom-6 left-4 md:left-10 w-32 md:w-44 lg:w-52 opacity-80" />

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 w-full max-w-3xl mx-auto flex-1 flex flex-col justify-between gap-8"
      >
        {/* Top Title + Cyan Badge */}
        <header className="flex flex-col items-center text-center pt-2">
          <div className="relative inline-block mb-4 sm:mb-5">
            <h1 className="font-display font-black text-white quiz-title-shadow text-5xl sm:text-7xl md:text-[5.5rem] leading-none tracking-tight select-none">
              Resultado
            </h1>
            <svg
              viewBox="0 0 64 56"
              aria-hidden="true"
              className="absolute -top-4 -right-9 sm:-top-6 sm:-right-12 w-10 h-10 sm:w-14 sm:h-14 pointer-events-none"
            >
              <g stroke="#504496" strokeWidth="4.5" strokeLinecap="round">
                <line x1="8" y1="38" x2="18" y2="8" />
                <line x1="22" y1="42" x2="44" y2="18" />
                <line x1="28" y1="49" x2="56" y2="35" />
              </g>
            </svg>
          </div>

          <div className="bg-[#06C8E8] text-white font-bold rounded-2xl px-6 sm:px-9 py-2 sm:py-2.5 text-base sm:text-xl md:text-2xl shadow-[0_8px_22px_rgba(6,200,232,0.28)]">
            —Desenvolvimento de sistemas—
          </div>
        </header>

        {/* Acertos / Erros Rows */}
        <section
          aria-label="Pontuação final"
          className="w-full max-w-md mx-auto flex flex-col gap-5 sm:gap-6 my-auto"
        >
          <div className="flex items-center gap-4 sm:gap-6 text-2xl sm:text-4xl font-extrabold text-white quiz-subtitle-shadow">
            <svg
              viewBox="0 0 68 28"
              aria-hidden="true"
              className="w-12 sm:w-16 h-6 shrink-0 text-white"
            >
              <line x1="2" y1="14" x2="52" y2="14" stroke="currentColor" strokeWidth="3.5" />
              <polygon points="48,5 66,14 48,23" fill="currentColor" />
            </svg>
            <div className="flex items-baseline gap-3">
              <span>Acertos :</span>
              <span className="tabular-nums text-[#0FD057]">{correctCount}</span>
            </div>
          </div>

          <div className="flex items-center gap-4 sm:gap-6 text-2xl sm:text-4xl font-extrabold text-white quiz-subtitle-shadow">
            <svg
              viewBox="0 0 68 28"
              aria-hidden="true"
              className="w-12 sm:w-16 h-6 shrink-0 text-white"
            >
              <line x1="2" y1="14" x2="52" y2="14" stroke="currentColor" strokeWidth="3.5" />
              <polygon points="48,5 66,14 48,23" fill="currentColor" />
            </svg>
            <div className="flex items-baseline gap-3">
              <span>Erros :</span>
              <span className="tabular-nums text-[#FF5757]">{wrongCount}</span>
            </div>
          </div>
        </section>

        {/* Rating Section (4 colored circles) + Actions */}
        <section className="relative flex flex-col items-center text-center gap-5">
          <div>
            <p className="text-xl sm:text-2xl font-medium text-[#06C8E8] mb-4">
              —Nota para o quiz—
            </p>
            <div
              role="group"
              aria-label="Avalie o quiz"
              className="flex items-center justify-center gap-4 sm:gap-6"
            >
              {QUIZ_RATINGS.map((rating) => {
                const isActive = selectedRating === rating.id;
                return (
                  <button
                    key={rating.id}
                    type="button"
                    onClick={() => setSelectedRating(rating.id)}
                    aria-label={rating.label}
                    aria-pressed={isActive}
                    title={rating.label}
                    style={{ backgroundColor: rating.color }}
                    className={`w-12 h-12 sm:w-14 sm:h-14 rounded-full border-4 border-white transition-all duration-150 cursor-pointer focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#06C8E8] ${
                      isActive
                        ? `scale-115 ring-6 ${rating.hoverRing} shadow-[0_0_20px_rgba(255,255,255,0.45)]`
                        : 'hover:scale-105 opacity-90 hover:opacity-100'
                    }`}
                  />
                );
              })}
            </div>
            <div className="min-h-6 mt-3">
              {activeRating && (
                <p className="text-sm sm:text-base font-semibold text-white/90">
                  Obrigado pela sua avaliação:{' '}
                  <span className="text-[#06C8E8]">{activeRating.label}</span>
                </p>
              )}
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3.5 sm:gap-4 z-20">
            <button
              type="button"
              onClick={onRestart}
              className="inline-flex items-center gap-2 bg-[#06C8E8] hover:bg-[#19D4F3] active:scale-[0.98] text-white font-extrabold text-base sm:text-lg px-7 py-3 rounded-2xl shadow-[0_8px_22px_rgba(6,200,232,0.3)] transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-white/80 whitespace-nowrap"
            >
              <RotateCcw className="w-5 h-5" aria-hidden="true" />
              <span>Refazer Quiz</span>
            </button>

            <button
              type="button"
              onClick={() => setShowReview((prev) => !prev)}
              aria-expanded={showReview}
              className="inline-flex items-center gap-2 bg-[#282156]/90 hover:bg-[#493E8C] text-white font-bold text-base sm:text-lg px-6 py-3 rounded-2xl border border-[#5B4EA8] transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#06C8E8] whitespace-nowrap"
            >
              {showReview ? (
                <>
                  <ChevronUp className="w-5 h-5" aria-hidden="true" />
                  <span>Ocultar revisão</span>
                </>
              ) : (
                <>
                  <ListChecks className="w-5 h-5" aria-hidden="true" />
                  <span>Revisar respostas</span>
                </>
              )}
            </button>
          </div>
        </section>

        {/* Optional Collapsible Answer Review */}
        <AnimatePresence>
          {showReview && (
            <motion.section
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              aria-label="Revisão das respostas"
              className="w-full bg-[#282156]/95 rounded-[24px] p-5 sm:p-7 space-y-4 shadow-xl border border-[#4B3F8F]"
            >
              <h2 className="text-lg sm:text-xl font-extrabold text-white">
                Resumo das Questões
              </h2>
              <div className="divide-y divide-[#41367E]">
                {questions.map((q, idx) => {
                  const rec = records.find((r) => r.questionId === q.id);
                  const correctLabels = q.options
                    .filter((o) => o.isCorrect)
                    .map((o) => o.label)
                    .join(' e ');
                  const userLabels = q.options
                    .filter((o) => rec?.selectedOptionIds.includes(o.id))
                    .map((o) => o.label)
                    .join(', ');

                  return (
                    <div key={q.id} className="py-3.5 first:pt-1 last:pb-1 flex items-start gap-3">
                      {rec?.isCorrect ? (
                        <CheckCircle2
                          className="w-5 h-5 text-[#0FD057] shrink-0 mt-0.5"
                          aria-label="Correta"
                        />
                      ) : (
                        <XCircle
                          className="w-5 h-5 text-[#FF5757] shrink-0 mt-0.5"
                          aria-label="Incorreta"
                        />
                      )}
                      <div className="space-y-1 text-sm sm:text-base">
                        <p className="font-bold text-white">
                          <span className="tabular-nums text-[#06C8E8] mr-1.5">{idx + 1}.</span>
                          {q.prompt}
                        </p>
                        <p className="text-white/75">
                          Sua resposta:{' '}
                          <span
                            className={
                              rec?.isCorrect
                                ? 'text-[#0FD057] font-semibold'
                                : 'text-[#FF7A7A] font-semibold'
                            }
                          >
                            {userLabels || '—'}
                          </span>
                        </p>
                        {!rec?.isCorrect && (
                          <p className="text-[#0FD057] font-semibold">
                            Resposta correta: {correctLabels}
                          </p>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.section>
          )}
        </AnimatePresence>

        {/* Bottom Bar + Spider-Man Presenter Mascot */}
        <footer className="relative flex items-end justify-between gap-4 pt-2">
          <div className="flex-1 max-w-md">
            <p className="text-center text-sm sm:text-base font-medium text-white/90 mb-2">
              2ª série DS
            </p>
            <div className="h-2.5 bg-[#4B3F8F] rounded-full relative flex items-center justify-center">
              <div
                aria-hidden="true"
                className="w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-t-[10px] border-t-[#4B3F8F] translate-y-2.5"
              />
            </div>
          </div>

          <SpideyPresenter className="w-24 sm:w-32 md:w-36 shrink-0 -mb-2 sm:-mb-4" />
        </footer>
      </motion.div>
    </div>
  );
};
