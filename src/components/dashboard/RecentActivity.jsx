import React from 'react';
import { MessageSquare, Brain, Code2, Clock } from 'lucide-react';

import { motion } from 'framer-motion';

const iconMap = {
  interview: MessageSquare,
  quiz: Brain,
  code: Code2,
};

const colorMap = {
  interview: 'text-blue-400 bg-blue-500/10',
  quiz: 'text-purple-400 bg-purple-500/10',
  code: 'text-emerald-400 bg-emerald-500/10',
};

export default function RecentActivity({ activities = [] }) {
  if (!activities?.length) {
    return (
      <div className="rounded-2xl border border-border/50 bg-card p-8 text-center">
        <Clock className="w-8 h-8 text-muted-foreground mx-auto mb-3" />
        <p className="text-sm text-muted-foreground">No recent activity yet</p>
        <p className="text-xs text-muted-foreground mt-1">Start an interview, quiz, or coding challenge</p>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-border/50 bg-card overflow-hidden">
      <div className="p-5 border-b border-border/50">
        <h3 className="text-sm font-semibold text-foreground">Recent Activity</h3>
      </div>
      <div className="divide-y divide-border/30">
        {activities.slice(0, 8).map((activity, i) => {
          const ActivityIcon = iconMap[activity.type] || Clock;
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: i * 0.05 }}
              className="flex items-center gap-4 px-5 py-3.5 hover:bg-secondary/30 transition-colors"
            >
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${colorMap[activity.type] || 'text-muted-foreground bg-muted'}`}>
                <ActivityIcon className="w-4 h-4" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground truncate">{activity.title}</p>
                <p className="text-xs text-muted-foreground">{activity.subtitle}</p>
              </div>
              {activity.score !== undefined && (
                <span className="text-sm font-semibold text-primary">{activity.score}/10</span>
              )}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}