import { useState } from 'react';
import { MotionConfig } from 'motion/react';
import { QUIZ_QUESTIONS } from './data/quizData';
import { CourseBlogPage } from './components/CourseBlogPage';
import { StartScreen } from './components/StartScreen';
import { QuestionScreen } from './components/QuestionScreen';
import { QuestionAnswerRecord, ResultScreen } from './components/ResultScreen';

type QuizPhase = 'blog' | 'start' | 'quiz' | 'result';

export default function App() {
  const [phase, setPhase] = useState<QuizPhase>('blog');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [isRevealed, setIsRevealed] = useState(false);
  const [records, setRecords] = useState<QuestionAnswerRecord[]>([]);

  const currentQuestion = QUIZ_QUESTIONS[currentIndex];

  const handleOpenQuiz = () => {
    setPhase('start');
    setCurrentIndex(0);
    setSelectedIds([]);
    setIsRevealed(false);
    setRecords([]);
    window.scrollTo({ top: 0, behavior: 'auto' });
  };

  const handleBackToBlog = () => {
    setPhase('blog');
    window.scrollTo({ top: 0, behavior: 'auto' });
  };

  const handleStart = () => {
    setPhase('quiz');
    setCurrentIndex(0);
    setSelectedIds([]);
    setIsRevealed(false);
    setRecords([]);
  };

  const handleSelectOption = (optionId: string) => {
    if (isRevealed) return;

    if (currentQuestion.multiSelect) {
      setSelectedIds((prev) =>
        prev.includes(optionId) ? prev.filter((id) => id !== optionId) : [...prev, optionId],
      );
      return;
    }

    const chosen = currentQuestion.options.find((o) => o.id === optionId);
    const isCorrect = Boolean(chosen?.isCorrect);

    setSelectedIds([optionId]);
    setIsRevealed(true);
    setRecords((prev) => [
      ...prev.filter((r) => r.questionId !== currentQuestion.id),
      {
        questionId: currentQuestion.id,
        selectedOptionIds: [optionId],
        isCorrect,
      },
    ]);
  };

  const handleConfirmMultiSelect = () => {
    if (isRevealed || selectedIds.length === 0) return;

    const correctOptionIds = currentQuestion.options
      .filter((o) => o.isCorrect)
      .map((o) => o.id);

    const isCorrect =
      selectedIds.length === correctOptionIds.length &&
      correctOptionIds.every((id) => selectedIds.includes(id));

    setIsRevealed(true);
    setRecords((prev) => [
      ...prev.filter((r) => r.questionId !== currentQuestion.id),
      {
        questionId: currentQuestion.id,
        selectedOptionIds: selectedIds,
        isCorrect,
      },
    ]);
  };

  const handleNext = () => {
    if (currentIndex < QUIZ_QUESTIONS.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedIds([]);
      setIsRevealed(false);
    } else {
      setPhase('result');
    }
  };

  const handleRestart = () => {
    setPhase('start');
    setCurrentIndex(0);
    setSelectedIds([]);
    setIsRevealed(false);
    setRecords([]);
  };

  const currentRecord = records.find((r) => r.questionId === currentQuestion.id);

  return (
    <MotionConfig reducedMotion="user">
      {phase === 'blog' && <CourseBlogPage onOpenQuiz={handleOpenQuiz} />}
      {phase === 'start' && (
        <StartScreen
          onStart={handleStart}
          onBackToBlog={handleBackToBlog}
          totalQuestions={QUIZ_QUESTIONS.length}
        />
      )}
      {phase === 'quiz' && (
        <QuestionScreen
          question={currentQuestion}
          questionIndex={currentIndex}
          totalQuestions={QUIZ_QUESTIONS.length}
          selectedIds={selectedIds}
          isRevealed={isRevealed}
          isAnswerCorrect={currentRecord ? currentRecord.isCorrect : null}
          onSelectOption={handleSelectOption}
          onConfirmMultiSelect={handleConfirmMultiSelect}
          onNext={handleNext}
          onRestart={handleRestart}
        />
      )}
      {phase === 'result' && (
        <ResultScreen
          questions={QUIZ_QUESTIONS}
          records={records}
          onRestart={handleRestart}
          onBackToBlog={handleBackToBlog}
        />
      )}
    </MotionConfig>
  );
}
