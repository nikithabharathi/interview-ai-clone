import React from 'react';
import ReactMarkdown from 'react-markdown';
import { cn } from "../../lib/utils";
import { Bot, User, Star } from 'lucide-react';
import { motion } from 'framer-motion';

export default function ChatMessage({ message = {} }) {
  const isUser = message.role === 'user';

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn("flex gap-3", isUser ? "flex-row-reverse" : "flex-row")}
    >
      <div className={cn(
        "w-8 h-8 rounded-xl flex items-center justify-center shrink-0 mt-0.5",
        isUser ? "bg-primary/20" : "bg-secondary"
      )}>
        {isUser ? <User className="w-4 h-4 text-primary" /> : <Bot className="w-4 h-4 text-muted-foreground" />}
      </div>

      <div className={cn("max-w-[80%] space-y-2", isUser && "items-end")}>
        <div className={cn(
          "rounded-2xl px-4 py-3",
          isUser 
            ? "bg-primary text-primary-foreground rounded-tr-md" 
            : "bg-secondary text-secondary-foreground rounded-tl-md"
        )}>
          {isUser ? (
            <p className="text-sm leading-relaxed">{message.content}</p>
          ) : (
            <div className="text-sm prose prose-invert prose-sm max-w-none [&>*:first-child]:mt-0 [&>*:last-child]:mb-0 prose-p:my-1 prose-li:my-0">
              <ReactMarkdown>
                {message.content}
              </ReactMarkdown>
            </div>
          )}
        </div>

        {message.score !== undefined && message.score !== null && (
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-card border border-border/50">
            <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
            <span className="text-xs font-semibold text-foreground">{message.score}/10</span>
            {message.feedback && (
              <span className="text-xs text-muted-foreground ml-1">— {message.feedback}</span>
            )}
          </div>
        )}
      </div>
    </motion.div>
  );
}