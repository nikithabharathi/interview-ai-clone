import React, { useState, useEffect } from 'react';
import API from '../api/base44Client';
import { Button } from '../components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Label } from '../components/ui/label';
import { Brain, Loader2, Play, RotateCcw, Trophy, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import QuizQuestion from '../components/quiz/QuizQuestion';

const TOPICS = [
  'JavaScript', 'Python', 'React', 'Node.js', 'Data Structures',
  'Algorithms', 'System Design', 'SQL', 'Machine Learning',
  'Cloud Computing', 'DevOps', 'Computer Networks', 'Operating Systems', 'OOP'
];

export default function Quiz() {
  const [user, setUser] = useState(null);
  const [phase, setPhase] = useState('setup');
  const [topic, setTopic] = useState('JavaScript');
  const [difficulty, setDifficulty] = useState('intermediate');
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(false);
  const [score, setScore] = useState(0);
  const [startTime, setStartTime] = useState(null);

  // ✅ FIXED (removed base44)
  useEffect(() => {
    setUser({ email: "demo@gmail.com" });
  }, []);

  // ✅ FIXED (dummy questions instead of base44)
  const generateQuiz = async () => {
    setLoading(true);

    const res = {
      questions: [
        {
          question: "What is React?",
          options: ["Library", "Framework", "Language", "Tool"],
          correct_answer: "Library",
          explanation: "React is a JavaScript library."
        },
        {
          question: "What is useState?",
          options: ["Hook", "API", "Library", "Tool"],
          correct_answer: "Hook",
          explanation: "useState is a React Hook."
        }
      ]
    };

    setQuestions(res.questions || []);
    setPhase('playing');
    setCurrentIndex(0);
    setAnswers({});
    setShowResult(false);
    setStartTime(Date.now());
    setLoading(false);
  };

  const selectAnswer = (answer) => {
    setAnswers({ ...answers, [currentIndex]: answer });
    setShowResult(true);
  };

  const nextQuestion = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setShowResult(false);
    } else {
      finishQuiz();
    }
  };

  // ✅ FIXED (removed base44 calls)
  const finishQuiz = async () => {
    const timeTaken = Math.round((Date.now() - startTime) / 1000);
    let correct = 0;

    const evaluatedQuestions = questions.map((q, i) => {
      const isCorrect = answers[i] === q.correct_answer;
      if (isCorrect) correct++;
      return { ...q, user_answer: answers[i] || '', is_correct: isCorrect };
    });

    const finalScore = Math.round((correct / questions.length) * 10 * 10) / 10;
    setScore(finalScore);

    setPhase('results');
  };

  if (phase === 'setup') {
    return (
      <div className="p-6 md:p-8 max-w-lg mx-auto flex items-center justify-center min-h-[80vh]">
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="w-full">
          <div className="text-center mb-8">
            <div className="w-16 h-16 rounded-2xl bg-purple-500/10 flex items-center justify-center mx-auto mb-4">
              <Brain className="w-8 h-8 text-purple-400" />
            </div>
            <h2 className="text-xl font-bold text-foreground">Knowledge Quiz</h2>
            <p className="text-sm text-muted-foreground mt-1">Test your skills with AI-generated questions</p>
          </div>

          <div className="space-y-5 bg-card rounded-2xl border border-border/50 p-6">
            <div className="space-y-2">
              <Label>Topic</Label>
              <Select value={topic} onValueChange={setTopic}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  {TOPICS.map(t => <SelectItem key={t} value={t}>{t}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Difficulty</Label>
              <Select value={difficulty} onValueChange={setDifficulty}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="beginner">Beginner</SelectItem>
                  <SelectItem value="intermediate">Intermediate</SelectItem>
                  <SelectItem value="advanced">Advanced</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button onClick={generateQuiz} className="w-full" size="lg" disabled={loading}>
              {loading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Play className="w-4 h-4 mr-2" />}
              {loading ? 'Generating Questions...' : 'Start Quiz'}
            </Button>
          </div>
        </motion.div>
      </div>
    );
  }

  if (phase === 'results') {
    const correct = questions.filter((q, i) => answers[i] === q.correct_answer).length;

    return (
      <div className="p-6 md:p-8 max-w-lg mx-auto flex items-center justify-center min-h-[80vh]">
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="w-full text-center">
          <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
            <Trophy className="w-10 h-10 text-primary" />
          </div>
          <h2 className="text-2xl font-bold text-foreground mb-2">Quiz Complete!</h2>
          <p className="text-4xl font-bold text-primary mb-2">{score}/10</p>
          <p className="text-sm text-muted-foreground mb-8">{correct} out of {questions.length} correct · {topic}</p>

          <div className="grid grid-cols-5 gap-2 mb-8 max-w-xs mx-auto">
            {questions.map((q, i) => (
              <div key={i} className={`h-2 rounded-full ${answers[i] === q.correct_answer ? 'bg-emerald-500' : 'bg-red-500'}`} />
            ))}
          </div>

          <div className="flex gap-3 justify-center">
            <Button variant="outline" onClick={() => { setPhase('setup'); setQuestions([]); }}>
              <RotateCcw className="w-4 h-4 mr-2" /> New Quiz
            </Button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="p-6 md:p-8 max-w-2xl mx-auto">
      <AnimatePresence mode="wait">
        <QuizQuestion
          key={currentIndex}
          question={questions[currentIndex]}
          index={currentIndex}
          totalQuestions={questions.length}
          selectedAnswer={answers[currentIndex]}
          onSelect={selectAnswer}
          showResult={showResult}
        />
      </AnimatePresence>

      {showResult && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-6 flex justify-end">
          <Button onClick={nextQuestion}>
            {currentIndex < questions.length - 1 ? (
              <>Next Question <ArrowRight className="w-4 h-4 ml-2" /></>
            ) : (
              <>Finish Quiz <Trophy className="w-4 h-4 ml-2" /></>
            )}
          </Button>
        </motion.div>
      )}
    </div>
  );
}