import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  MessageSquare, Brain, Code2, FileText, BarChart3, 
  Home, Settings, ChevronLeft, ChevronRight, Sparkles,
  GraduationCap
} from 'lucide-react';
import { cn } from "../../lib/utils";
import { motion, AnimatePresence } from 'framer-motion';

const navItems = [
  { path: '/', icon: Home, label: 'Dashboard' },
  { path: '/interview', icon: MessageSquare, label: 'Interview' },
  { path: '/quiz', icon: Brain, label: 'Quiz' },
  { path: '/code', icon: Code2, label: 'Code Lab' },
  { path: '/resume', icon: FileText, label: 'Resume' },
  { path: '/analytics', icon: BarChart3, label: 'Analytics' },
  { path: '/settings', icon: Settings, label: 'Settings' },
];

export default function Sidebar({ collapsed, onToggle }) {
  const location = useLocation();

  return (
    <motion.aside
      initial={false}
      animate={{ width: collapsed ? 72 : 256 }}
      transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
      className="fixed left-0 top-0 h-screen bg-sidebar border-r border-sidebar-border z-40 flex flex-col"
    >
      {/* Logo */}
      <div className="h-16 flex items-center px-4 border-b border-sidebar-border">
        <div className="flex items-center gap-3 overflow-hidden">
          <div className="w-9 h-9 rounded-xl bg-primary/20 flex items-center justify-center shrink-0">
            <Sparkles className="w-5 h-5 text-primary" />
          </div>
          <AnimatePresence>
            {!collapsed && (
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                className="whitespace-nowrap"
              >
                <h1 className="text-sm font-bold text-foreground tracking-tight">CareerConnect</h1>
                <p className="text-[10px] font-medium text-primary">AI Platform</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-4 px-3 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200",
                isActive 
                  ? "bg-primary/15 text-primary" 
                  : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
              )}
            >
              <item.icon className={cn("w-5 h-5 shrink-0", isActive && "text-primary")} />
              <AnimatePresence>
                {!collapsed && (
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="whitespace-nowrap"
                  >
                    {item.label}
                  </motion.span>
                )}
              </AnimatePresence>
              {isActive && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute left-0 w-1 h-6 rounded-r-full bg-primary"
                />
              )}
            </Link>
          );
        })}
      </nav>

      {/* Collapse toggle */}
      <div className="p-3 border-t border-sidebar-border">
        <button
          onClick={onToggle}
          className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-xl text-sm text-sidebar-foreground hover:bg-sidebar-accent transition-colors"
        >
          {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          {!collapsed && <span>Collapse</span>}
        </button>
      </div>
    </motion.aside>
  );
}