import React, { useState, useEffect } from 'react';
import API from '../api/base44Client';
import { useQuery } from '@tanstack/react-query';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, Radar } from 'recharts';
import { TrendingUp, Target, Brain, Code2, MessageSquare, Award } from 'lucide-react';
import { motion } from 'framer-motion';
import StatCard from '../components/dashboard/StatCard';

const CHART_COLORS = ['hsl(217,91%,60%)', 'hsl(262,83%,58%)', 'hsl(142,71%,45%)', 'hsl(38,92%,50%)', 'hsl(0,84%,60%)'];

export default function Analytics() {
  const [user, setUser] = useState(null);

  // ✅ FIXED (removed base44)
  useEffect(() => {
    setUser({ email: "demo@gmail.com" });
  }, []);

  // ✅ FIXED
  const { data: profile } = useQuery({
    queryKey: ['profileAnalytics', user?.email],
    queryFn: async () => {
      return null;
    },
    enabled: !!user?.email,
  });

  // ✅ FIXED
  const { data: sessions = [] } = useQuery({
    queryKey: ['allSessions', user?.email],
    queryFn: async () => {
      return [];
    },
    enabled: !!user?.email,
  });

  // ✅ FIXED
  const { data: quizzes = [] } = useQuery({
    queryKey: ['allQuizzes', user?.email],
    queryFn: async () => {
      return [];
    },
    enabled: !!user?.email,
  });

  // ✅ FIXED
  const { data: challenges = [] } = useQuery({
    queryKey: ['allChallenges', user?.email],
    queryFn: async () => {
      return [];
    },
    enabled: !!user?.email,
  });

  // Performance over time
  const performanceData = [...sessions, ...quizzes, ...challenges]
    .sort((a, b) => new Date(a.created_date) - new Date(b.created_date))
    .slice(-20)
    .map((item, i) => ({
      name: `#${i + 1}`,
      score: item.average_score || item.score || 0,
    }));

  // Topic distribution
  const topicCounts = {};
  [...sessions, ...quizzes, ...challenges].forEach(item => {
    const topic = item.topic || item.role || 'General';
    topicCounts[topic] = (topicCounts[topic] || 0) + 1;
  });
  const topicData = Object.entries(topicCounts).slice(0, 6).map(([name, value]) => ({ name, value }));

  // Score by category
  const categoryScores = [
    { subject: 'Interviews', score: profile?.average_interview_score || 0, fullMark: 10 },
    { subject: 'Quizzes', score: profile?.average_quiz_score || 0, fullMark: 10 },
    { subject: 'Coding', score: profile?.average_coding_score || 0, fullMark: 10 },
  ];

  // Difficulty distribution
  const difficultyData = [
    { name: 'Beginner', count: [...sessions, ...quizzes].filter(i => i.difficulty === 'beginner' || i.difficulty === 'easy').length },
    { name: 'Medium', count: [...sessions, ...quizzes, ...challenges].filter(i => i.difficulty === 'intermediate' || i.difficulty === 'medium').length },
    { name: 'Advanced', count: [...sessions, ...quizzes, ...challenges].filter(i => i.difficulty === 'advanced' || i.difficulty === 'hard').length },
  ];

  const totalActivities = (profile?.total_interviews || 0) + (profile?.total_quizzes || 0) + (profile?.total_coding_challenges || 0);
  const overallAvg = totalActivities > 0 
    ? (((profile?.average_interview_score || 0) * (profile?.total_interviews || 0)) + 
       ((profile?.average_quiz_score || 0) * (profile?.total_quizzes || 0)) + 
       ((profile?.average_coding_score || 0) * (profile?.total_coding_challenges || 0))) / totalActivities
    : 0;

  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto space-y-8">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl font-bold text-foreground">Analytics</h1>
        <p className="text-sm text-muted-foreground mt-1">Track your progress and identify areas for improvement</p>
      </motion.div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={Target} label="Overall Score" value={`${overallAvg.toFixed(1)}/10`} gradient="bg-blue-500" delay={0} />
        <StatCard icon={MessageSquare} label="Total Sessions" value={totalActivities} gradient="bg-purple-500" delay={0.1} />
        <StatCard icon={TrendingUp} label="Best Category" value={
          profile?.average_interview_score >= (profile?.average_quiz_score || 0) && profile?.average_interview_score >= (profile?.average_coding_score || 0) ? 'Interviews' :
          profile?.average_quiz_score >= (profile?.average_coding_score || 0) ? 'Quizzes' : 'Coding'
        } gradient="bg-emerald-500" delay={0.2} />
        <StatCard icon={Award} label="Streak" value={`${profile?.streak_days || 0} days`} gradient="bg-amber-500" delay={0.3} />
      </div>

      {/* Charts */}
      <div className="grid lg:grid-cols-2 gap-6">

        {/* Performance Trend */}
        <motion.div className="bg-card rounded-2xl border border-border/50 p-6">
          <h3 className="text-sm font-semibold text-foreground mb-6">Performance Trend</h3>
          <div className="h-[250px] flex items-center justify-center text-sm text-muted-foreground">
            No data yet
          </div>
        </motion.div>

        {/* Topic Distribution */}
        <motion.div className="bg-card rounded-2xl border border-border/50 p-6">
          <h3 className="text-sm font-semibold text-foreground mb-6">Topic Distribution</h3>
          <div className="h-[250px] flex items-center justify-center text-sm text-muted-foreground">
            No data yet
          </div>
        </motion.div>

      </div>
    </div>
  );
}