import React from 'react';
import { cn } from "../../lib/utils";
import { motion } from 'framer-motion';
import { CheckCircle, XCircle } from 'lucide-react';

export default function QuizQuestion({ question, index, totalQuestions, selectedAnswer, onSelect, showResult }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-6"
    >
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium text-primary bg-primary/10 px-3 py-1 rounded-full">
          Question {index + 1} of {totalQuestions}
        </span>
        <div className="h-1.5 flex-1 mx-4 bg-secondary rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-primary rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${((index + 1) / totalQuestions) * 100}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
      </div>

      <h3 className="text-lg font-semibold text-foreground leading-relaxed">
        {question.question}
      </h3>

      <div className="space-y-3">
        {question.options?.map((option, i) => {
          const isSelected = selectedAnswer === option;
          const isCorrect = showResult && option === question.correct_answer;
          const isWrong = showResult && isSelected && option !== question.correct_answer;

          return (
            <motion.button
              key={i}
              whileHover={!showResult ? { scale: 1.01 } : {}}
              whileTap={!showResult ? { scale: 0.99 } : {}}
              onClick={() => !showResult && onSelect(option)}
              disabled={showResult}
              className={cn(
                "w-full text-left px-5 py-4 rounded-xl border transition-all duration-200 flex items-center gap-3",
                !showResult && !isSelected && "border-border/50 bg-card hover:border-primary/30 hover:bg-secondary/50",
                !showResult && isSelected && "border-primary bg-primary/10",
                isCorrect && "border-emerald-500 bg-emerald-500/10",
                isWrong && "border-red-500 bg-red-500/10"
              )}
            >
              <span className={cn(
                "w-8 h-8 rounded-lg flex items-center justify-center text-sm font-semibold shrink-0 border",
                !showResult && !isSelected && "border-border/50 text-muted-foreground",
                !showResult && isSelected && "border-primary bg-primary text-primary-foreground",
                isCorrect && "border-emerald-500 bg-emerald-500 text-white",
                isWrong && "border-red-500 bg-red-500 text-white"
              )}>
                {showResult && isCorrect ? <CheckCircle className="w-4 h-4" /> :
                 showResult && isWrong ? <XCircle className="w-4 h-4" /> :
                 String.fromCharCode(65 + i)}
              </span>
              <span className="text-sm font-medium">{option}</span>
            </motion.button>
          );
        })}
      </div>

      {showResult && question.explanation && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 rounded-xl bg-secondary/50 border border-border/50"
        >
          <p className="text-xs font-semibold text-primary mb-1">Explanation</p>
          <p className="text-sm text-muted-foreground">{question.explanation}</p>
        </motion.div>
      )}
    </motion.div>
  );
}