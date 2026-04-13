import React, { useState, useEffect, useRef } from 'react';
import API from '../api/base44Client';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Send, Loader2, RotateCcw, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import ChatMessage from '../components/interview/ChatMessage';
import SessionSetup from '../components/interview/SessionSetup';

export default function Interview() {
  const [user, setUser] = useState(null);
  const [session, setSession] = useState(null);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [showSetup, setShowSetup] = useState(true);
  const scrollRef = useRef(null);

  useEffect(() => {
    setUser({ email: "demo@gmail.com" });
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const startSession = async (config) => {
    setLoading(true);

    const newSession = {
      id: Date.now(),
      ...config,
      questions_asked: 0,
      status: 'active'
    };

    setSession(newSession);

    const greeting = {
      greeting: "Hello! Let's begin your interview.",
      question: "Tell me about yourself."
    };

    const aiMsg = { 
      role: 'assistant', 
      content: `${greeting.greeting}\n\n${greeting.question}`,
      timestamp: new Date().toISOString()
    };

    setMessages([aiMsg]);
    setShowSetup(false);
    setLoading(false);
  };

  const sendMessage = async () => {
    if (!input.trim() || loading) return;

    const userMsg = { role: 'user', content: input.trim(), timestamp: new Date().toISOString() };
    const newMessages = [...messages, userMsg];

    setMessages(newMessages);
    setInput('');
    setLoading(true);

    const response = {
      score: 7,
      feedback: "Good answer, but can be more detailed.",
      response: "Nice attempt.",
      next_question: "Explain a project you worked on."
    };

    const aiMsg = {
      role: 'assistant',
      content: `${response.response}\n\n${response.next_question}`,
      score: response.score,
      feedback: response.feedback,
      timestamp: new Date().toISOString()
    };

    setMessages([...newMessages, aiMsg]);
    setLoading(false);
  };

  const endSession = async () => {
    setSession(null);
    setMessages([]);
    setShowSetup(true);
  };

  if (showSetup) {
    return (
      <div className="p-6 md:p-8 max-w-7xl mx-auto flex items-center justify-center min-h-[80vh]">
        <SessionSetup onStart={startSession} />
        {loading && (
          <div className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="flex items-center gap-3">
              <Loader2 className="w-5 h-5 animate-spin text-primary" />
              <span className="text-sm text-foreground">Preparing your interview...</span>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen max-h-screen">
      <div className="flex items-center justify-between px-6 py-4 border-b border-border/50 bg-card/50 backdrop-blur-xl">
        <div>
          <h2 className="text-sm font-semibold text-foreground">{session?.role} Interview</h2>
          <p className="text-xs text-muted-foreground">{session?.topic} · {session?.difficulty}</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={endSession}>
            <CheckCircle className="w-3.5 h-3.5 mr-1.5" />
            End Session
          </Button>
        </div>
      </div>

      <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-6">
        {messages.map((msg, i) => (
          <ChatMessage key={i} message={msg} />
        ))}
        {loading && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-3">
            <div className="w-8 h-8 rounded-xl bg-secondary flex items-center justify-center">
              <Loader2 className="w-4 h-4 animate-spin text-muted-foreground" />
            </div>
            <div className="bg-secondary rounded-2xl rounded-tl-md px-4 py-3">
              <div className="flex gap-1">
                <div className="w-2 h-2 rounded-full bg-muted-foreground/40 animate-bounce" />
                <div className="w-2 h-2 rounded-full bg-muted-foreground/40 animate-bounce" />
                <div className="w-2 h-2 rounded-full bg-muted-foreground/40 animate-bounce" />
              </div>
            </div>
          </motion.div>
        )}
      </div>

      <div className="p-4 border-t border-border/50 bg-card/50 backdrop-blur-xl">
        <div className="max-w-3xl mx-auto flex gap-3">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && sendMessage()}
            placeholder="Type your answer..."
            className="flex-1 bg-secondary border-border/50"
            disabled={loading}
          />
          <Button onClick={sendMessage} disabled={loading || !input.trim()} size="icon">
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}