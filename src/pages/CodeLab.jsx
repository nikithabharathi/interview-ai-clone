import React, { useState, useEffect } from 'react';
import API from '../api/base44Client';
import { Button } from '../components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { Code2, Loader2, Play, RotateCcw, Lightbulb, CheckCircle, Star } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import ReactMarkdown from 'react-markdown';

const TOPICS = [
  'Arrays', 'Strings', 'Linked Lists', 'Trees', 'Graphs',
  'Dynamic Programming', 'Sorting', 'Searching', 'Stack & Queue',
  'Hash Tables', 'Recursion', 'Greedy Algorithms'
];

export default function CodeLab() {
  const [user, setUser] = useState(null);
  const [phase, setPhase] = useState('setup');
  const [challenge, setChallenge] = useState(null);
  const [code, setCode] = useState('');
  const [language, setLanguage] = useState('python');
  const [difficulty, setDifficulty] = useState('medium');
  const [topic, setTopic] = useState('Arrays');
  const [loading, setLoading] = useState(false);
  const [evaluation, setEvaluation] = useState(null);
  const [showHint, setShowHint] = useState(false);

  // ✅ FIXED (removed base44)
  useEffect(() => {
    setUser({ email: "demo@gmail.com" });
  }, []);

  // ✅ FIXED (dummy challenge instead of base44)
  const generateChallenge = async () => {
    setLoading(true);

    const res = {
      title: "Two Sum Problem",
      description: "Find two numbers in an array that add up to a target.",
      examples: "Input: [2,7,11,15], target=9 → Output: [0,1]",
      constraints: "Only one valid answer exists.",
      starter_code: "def two_sum(nums, target):\n    # write your code here\n    pass",
      hints: ["Use a hash map", "Check complement"],
      expected_approach: "Use hashmap for O(n) solution"
    };

    setChallenge(res);
    setCode(res.starter_code || '');
    setPhase('coding');
    setEvaluation(null);
    setShowHint(false);
    setLoading(false);
  };

  // ✅ FIXED (dummy evaluation instead of base44)
  const submitCode = async () => {
    setLoading(true);

    const res = {
      score: 7,
      correctness: "Works for basic cases",
      efficiency: "Could be optimized to O(n)",
      quality: "Readable code",
      edge_cases: "Missing edge cases",
      improvements: "Handle duplicates",
      overall_feedback: "Good attempt, improve edge cases"
    };

    setEvaluation(res);
    setPhase('results');
    setLoading(false);
  };

  if (phase === 'setup') {
    return (
      <div className="p-6 md:p-8 max-w-lg mx-auto flex items-center justify-center min-h-[80vh]">
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="w-full">
          <div className="text-center mb-8">
            <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 flex items-center justify-center mx-auto mb-4">
              <Code2 className="w-8 h-8 text-emerald-400" />
            </div>
            <h2 className="text-xl font-bold text-foreground">Code Lab</h2>
            <p className="text-sm text-muted-foreground mt-1">Solve coding challenges with AI evaluation</p>
          </div>

          <div className="space-y-5 bg-card rounded-2xl border border-border/50 p-6">
            <div className="space-y-2">
              <Label>Topic</Label>
              <Select value={topic} onValueChange={setTopic}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>{TOPICS.map(t => <SelectItem key={t} value={t}>{t}</SelectItem>)}</SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Language</Label>
              <Select value={language} onValueChange={setLanguage}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="python">Python</SelectItem>
                  <SelectItem value="javascript">JavaScript</SelectItem>
                  <SelectItem value="java">Java</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Difficulty</Label>
              <Select value={difficulty} onValueChange={setDifficulty}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="easy">Easy</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="hard">Hard</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button onClick={generateChallenge} className="w-full" size="lg" disabled={loading}>
              {loading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Play className="w-4 h-4 mr-2" />}
              {loading ? 'Generating...' : 'Generate Challenge'}
            </Button>
          </div>
        </motion.div>
      </div>
    );
  }

  if (phase === 'results' && evaluation) {
    return (
      <div className="p-6 md:p-8 max-w-3xl mx-auto space-y-6">
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="text-center">
          <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
            <Star className="w-10 h-10 text-primary" />
          </div>
          <h2 className="text-2xl font-bold text-foreground">Score: {evaluation.score}/10</h2>
          <p className="text-sm text-muted-foreground mt-1">{challenge.title}</p>
        </motion.div>

        <div className="grid gap-4">
          {[
            { label: 'Correctness', value: evaluation.correctness },
            { label: 'Efficiency', value: evaluation.efficiency },
            { label: 'Code Quality', value: evaluation.quality },
            { label: 'Edge Cases', value: evaluation.edge_cases },
            { label: 'Improvements', value: evaluation.improvements },
          ].map((item, i) => (
            <motion.div 
              key={i} 
              initial={{ opacity: 0, y: 10 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ delay: i * 0.1 }}
              className="bg-card rounded-xl border border-border/50 p-5"
            >
              <h4 className="text-xs font-semibold text-primary uppercase tracking-wider mb-2">{item.label}</h4>
              <p className="text-sm text-muted-foreground">{item.value}</p>
            </motion.div>
          ))}
        </div>

        <div className="flex justify-center">
          <Button variant="outline" onClick={() => { setPhase('setup'); setChallenge(null); setCode(''); setEvaluation(null); }}>
            <RotateCcw className="w-4 h-4 mr-2" /> New Challenge
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col lg:flex-row h-screen max-h-screen">
      {/* Problem panel */}
      <div className="lg:w-1/2 border-b lg:border-b-0 lg:border-r border-border/50 overflow-y-auto">
        <div className="p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-foreground">{challenge?.title}</h2>
            <span className="text-xs font-medium text-primary bg-primary/10 px-3 py-1 rounded-full">{difficulty}</span>
          </div>
          <div className="prose prose-sm prose-invert max-w-none">
            <div className="text-sm text-muted-foreground leading-relaxed">
  <ReactMarkdown>
    {challenge?.description}
  </ReactMarkdown>
</div>
          </div>
          {challenge?.examples && (
            <div className="bg-secondary/50 rounded-xl p-4">
              <p className="text-xs font-semibold text-foreground mb-2">Examples</p>
              <pre className="text-xs text-muted-foreground whitespace-pre-wrap font-mono">{challenge.examples}</pre>
            </div>
          )}
          {challenge?.constraints && (
            <div className="bg-secondary/50 rounded-xl p-4">
              <p className="text-xs font-semibold text-foreground mb-2">Constraints</p>
              <p className="text-xs text-muted-foreground">{challenge.constraints}</p>
            </div>
          )}

          <AnimatePresence>
            {showHint && challenge?.hints && (
              <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}>
                <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-4 space-y-2">
                  {challenge.hints.map((hint, i) => (
                    <p key={i} className="text-xs text-amber-200/80">💡 {hint}</p>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <Button variant="ghost" size="sm" onClick={() => setShowHint(!showHint)}>
            <Lightbulb className="w-4 h-4 mr-1" /> {showHint ? 'Hide Hints' : 'Show Hints'}
          </Button>
        </div>
      </div>

      {/* Code editor panel */}
      <div className="lg:w-1/2 flex flex-col">
        <div className="flex items-center justify-between px-4 py-3 border-b border-border/50 bg-card/50">
          <span className="text-xs font-medium text-muted-foreground">{language}</span>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={() => { setPhase('setup'); setChallenge(null); setCode(''); }}>
              <RotateCcw className="w-3.5 h-3.5 mr-1" /> Reset
            </Button>
            <Button size="sm" onClick={submitCode} disabled={loading || !code.trim()}>
              {loading ? <Loader2 className="w-3.5 h-3.5 mr-1 animate-spin" /> : <CheckCircle className="w-3.5 h-3.5 mr-1" />}
              Submit
            </Button>
          </div>
        </div>
        <Textarea
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder={`Write your ${language} code here...`}
          className="flex-1 rounded-none border-0 resize-none font-mono text-sm bg-background focus-visible:ring-0 p-4"
          style={{ minHeight: '300px' }}
        />
      </div>
    </div>
  );
}