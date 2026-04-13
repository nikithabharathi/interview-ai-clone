import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { MessageSquare, Brain, Code2, FileText, BarChart3, Home } from 'lucide-react';
import { cn } from "../../lib/utils";

const items = [
  { path: '/', icon: Home, label: 'Home' },
  { path: '/interview', icon: MessageSquare, label: 'Chat' },
  { path: '/quiz', icon: Brain, label: 'Quiz' },
  { path: '/code', icon: Code2, label: 'Code' },
  { path: '/resume', icon: FileText, label: 'Resume' },
  { path: '/analytics', icon: BarChart3, label: 'Stats' },
];

export default function MobileNav() {
  const location = useLocation();

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-card/95 backdrop-blur-xl border-t border-border z-50">
      <div className="flex items-center justify-around px-2 py-2">
        {items.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-xl transition-colors",
                isActive ? "text-primary" : "text-muted-foreground"
              )}
            >
              <item.icon className="w-5 h-5" />
              <span className="text-[10px] font-medium">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}