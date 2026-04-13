
import { motion } from 'framer-motion';
import { Sparkles, Play } from 'lucide-react';import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Input } from '../ui/input';
import { Label } from '../ui/label';

const ROLES = [
  'Software Engineer', 'Frontend Developer', 'Backend Developer',
  'Full Stack Developer', 'ML Engineer', 'Data Scientist',
  'DevOps Engineer', 'Product Manager', 'System Designer',
  'Mobile Developer', 'QA Engineer', 'Cloud Architect'
];

const TOPICS = [
  'General', 'Data Structures & Algorithms', 'System Design',
  'Behavioral', 'React & Frontend', 'Node.js & Backend',
  'Python', 'Java', 'Machine Learning', 'SQL & Databases',
  'Cloud & DevOps', 'API Design', 'Security'
];

const LANGUAGES = ['English', 'Spanish', 'French', 'German', 'Hindi', 'Chinese', 'Arabic', 'Portuguese', 'Japanese', 'Korean'];

export default function SessionSetup({ onStart }) {
  const [config, setConfig] = useState({
    role: 'Software Engineer',
    topic: 'General',
    difficulty: 'intermediate',
    language: 'English',
  });

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="max-w-lg mx-auto"
    >
      <div className="text-center mb-8">
        <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
          <Sparkles className="w-8 h-8 text-primary" />
        </div>
        <h2 className="text-xl font-bold text-foreground">Start Interview Session</h2>
        <p className="text-sm text-muted-foreground mt-1">Configure your practice interview</p>
      </div>

      <div className="space-y-5 bg-card rounded-2xl border border-border/50 p-6">
        <div className="space-y-2">
          <Label className="text-sm font-medium">Target Role</Label>
          <Select value={config.role} onValueChange={(v) => setConfig({ ...config, role: v })}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              {ROLES.map(r => <SelectItem key={r} value={r}>{r}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label className="text-sm font-medium">Topic Focus</Label>
          <Select value={config.topic} onValueChange={(v) => setConfig({ ...config, topic: v })}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              {TOPICS.map(t => <SelectItem key={t} value={t}>{t}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label className="text-sm font-medium">Difficulty</Label>
          <Select value={config.difficulty} onValueChange={(v) => setConfig({ ...config, difficulty: v })}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="beginner">Beginner</SelectItem>
              <SelectItem value="intermediate">Intermediate</SelectItem>
              <SelectItem value="advanced">Advanced</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label className="text-sm font-medium">Language</Label>
          <Select value={config.language} onValueChange={(v) => setConfig({ ...config, language: v })}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              {LANGUAGES.map(l => <SelectItem key={l} value={l}>{l}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>

        <Button onClick={() => onStart(config)} className="w-full mt-4" size="lg">
          <Play className="w-4 h-4 mr-2" />
          Start Interview
        </Button>
      </div>
    </motion.div>
  );
}