import React, { useEffect, useState } from 'react';
import API from '../api/base44Client';
import { useQuery } from '@tanstack/react-query';
import { MessageSquare, Brain, Code2, TrendingUp, Sparkles, Flame } from 'lucide-react';
import { motion } from 'framer-motion';
import StatCard from '../components/dashboard/StatCard';
import QuickActions from '../components/dashboard/QuickActions';
import RecentActivity from '../components/dashboard/RecentActivity';

export default function Dashboard() {
  const [user, setUser] = useState({ full_name: "User", email: "demo@gmail.com" });

  useEffect(() => {
    // removed base44 auth call
  }, []);

  const { data: profile } = useQuery({
    queryKey: ['userProfile'],
    queryFn: async () => ({
      target_role: 'Software Engineer',
      total_interviews: 0,
      total_quizzes: 0,
      total_coding_challenges: 0,
      streak_days: 0
    }),
  });

  const sessions = [];
  const quizzes = [];
  const challenges = [];

  const activities = [];

  const firstName = user?.full_name?.split(' ')[0] || 'there';

  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto space-y-8">
      <motion.div 
        initial={{ opacity: 0, y: -10 }} 
        animate={{ opacity: 1, y: 0 }}
        className="space-y-1"
      >
        <div className="flex items-center gap-2 mb-1">
          <Sparkles className="w-5 h-5 text-primary" />
          <span className="text-xs font-medium text-primary uppercase tracking-wider">CareerConnect AI</span>
        </div>
        <h1 className="text-2xl md:text-3xl font-bold text-foreground">
          Welcome back, {firstName}
        </h1>
        <p className="text-sm text-muted-foreground">
          Preparing for {profile?.target_role}
        </p>
      </motion.div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={MessageSquare} label="Interviews" value={0} gradient="bg-blue-500" delay={0}/>
        <StatCard icon={Brain} label="Quizzes" value={0} gradient="bg-purple-500" delay={0.1}/>
        <StatCard icon={Code2} label="Challenges" value={0} gradient="bg-emerald-500" delay={0.2}/>
        <StatCard icon={Flame} label="Day Streak" value={0} gradient="bg-amber-500" delay={0.3}/>
      </div>

      <div>
        <h2 className="text-lg font-semibold text-foreground mb-4">Quick Start</h2>
        <QuickActions />
      </div>

      <div>
        <h2 className="text-lg font-semibold text-foreground mb-4">Recent Activity</h2>
        <RecentActivity activities={activities} />
      </div>
    </div>
  );
}