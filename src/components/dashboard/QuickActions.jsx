import React from 'react';
import { Link } from 'react-router-dom';
import { MessageSquare, Brain, Code2, FileText, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from "../../lib/utils";

const actions = [
  { 
    path: '/interview', 
    icon: MessageSquare, 
    title: 'Start Interview',
    description: 'Practice with AI interviewer',
    color: 'bg-blue-500/10 text-blue-400 border-blue-500/20'
  },
  { 
    path: '/quiz', 
    icon: Brain, 
    title: 'Take a Quiz',
    description: 'Test your knowledge',
    color: 'bg-purple-500/10 text-purple-400 border-purple-500/20'
  },
  { 
    path: '/code', 
    icon: Code2, 
    title: 'Code Challenge',
    description: 'Solve coding problems',
    color: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
  },
  { 
    path: '/resume', 
    icon: FileText, 
    title: 'Analyze Resume',
    description: 'Get AI resume feedback',
    color: 'bg-amber-500/10 text-amber-400 border-amber-500/20'
  },
];

export default function QuickActions() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {actions.map((action, i) => (
        <motion.div
          key={action.path}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 * i, duration: 0.4 }}
        >
          <Link
            to={action.path}
            className={cn(
              "group block p-5 rounded-2xl border border-border/50 bg-card",
              "hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300"
            )}
          >
            <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center mb-4 border", action.color)}>
              <action.icon className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-semibold text-foreground mb-1">{action.title}</h3>
            <p className="text-xs text-muted-foreground mb-3">{action.description}</p>
            <div className="flex items-center gap-1 text-xs text-primary font-medium opacity-0 group-hover:opacity-100 transition-opacity">
              <span>Get started</span>
              <ArrowRight className="w-3 h-3" />
            </div>
          </Link>
        </motion.div>
      ))}
    </div>
  );
}