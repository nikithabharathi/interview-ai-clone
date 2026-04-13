import React from 'react';
import { cn } from "../../lib/utils";// ✅ fixed path
import { motion } from 'framer-motion';

export default function StatCard({
  icon: Icon,
  label = "",
  value = "",
  subtitle = "",
  gradient = "",
  delay = 0
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5 }}
      className={cn(
        "relative overflow-hidden rounded-2xl border border-border/50 p-6",
        "bg-card hover:border-primary/30 transition-all duration-300"
      )}
    >
      <div className={cn("absolute top-0 right-0 w-24 h-24 rounded-full blur-3xl opacity-20", gradient)} />
      <div className="relative z-10">
        <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center mb-4", gradient, "bg-opacity-20")}>
          {Icon && <Icon className="w-5 h-5 text-foreground" />} {/* ✅ fixed */}
        </div>
        <p className="text-2xl font-bold text-foreground">{value}</p>
        <p className="text-sm font-medium text-muted-foreground mt-1">{label}</p>
        {subtitle && <p className="text-xs text-primary mt-1">{subtitle}</p>}
      </div>
    </motion.div>
  );
}