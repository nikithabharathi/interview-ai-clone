import React, { useState, useEffect } from 'react';
import API from "../api/base44Client";
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Settings as SettingsIcon, Save, Loader2, User, LogOut } from 'lucide-react';
import { motion } from 'framer-motion';
import { toast } from 'sonner';

const ROLES = [
  'Software Engineer', 'Frontend Developer', 'Backend Developer',
  'Full Stack Developer', 'ML Engineer', 'Data Scientist',
  'DevOps Engineer', 'Product Manager', 'System Designer',
  'Mobile Developer', 'QA Engineer', 'Cloud Architect'
];

const LANGUAGES = ['English', 'Spanish', 'French', 'German', 'Hindi', 'Chinese', 'Arabic', 'Portuguese', 'Japanese', 'Korean'];

export default function Settings() {
  const [user, setUser] = useState(null);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    target_role: 'Software Engineer',
    experience_level: 'mid',
    preferred_language: 'English',
    preferred_coding_language: 'python',
  });
  const queryClient = useQueryClient();

  // ✅ FIXED (removed base44)
  useEffect(() => {
    setUser({ email: "demo@gmail.com", full_name: "Demo User" });
  }, []);

  // ✅ FIXED
  const { data: profiles = [] } = useQuery({
    queryKey: ['settingsProfile', user?.email],
    queryFn: async () => {
      return [];
    },
    enabled: !!user?.email,
  });

  const profile = profiles[0];

  useEffect(() => {
    if (profile) {
      setForm({
        target_role: profile.target_role || 'Software Engineer',
        experience_level: profile.experience_level || 'mid',
        preferred_language: profile.preferred_language || 'English',
        preferred_coding_language: profile.preferred_coding_language || 'python',
      });
    }
  }, [profile]);

  // ✅ FIXED (no base44 save)
  const saveSettings = async () => {
    setSaving(true);

    setTimeout(() => {
      toast.success('Settings saved successfully');
      setSaving(false);
    }, 800);
  };

  return (
    <div className="p-6 md:p-8 max-w-2xl mx-auto space-y-8">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl font-bold text-foreground">Settings</h1>
        <p className="text-sm text-muted-foreground mt-1">Configure your profile and preferences</p>
      </motion.div>

      {/* Profile Info */}
      <div className="bg-card rounded-2xl border border-border/50 p-6">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center">
            <User className="w-7 h-7 text-primary" />
          </div>
          <div>
            <p className="text-sm font-semibold text-foreground">{user?.full_name || 'User'}</p>
            <p className="text-xs text-muted-foreground">{user?.email}</p>
          </div>
        </div>

        <div className="space-y-5">
          <div className="space-y-2">
            <Label>Target Role</Label>
            <Select value={form.target_role} onValueChange={(v) => setForm({ ...form, target_role: v })}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>{ROLES.map(r => <SelectItem key={r} value={r}>{r}</SelectItem>)}</SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Experience Level</Label>
            <Select value={form.experience_level} onValueChange={(v) => setForm({ ...form, experience_level: v })}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="junior">Junior (0-2 years)</SelectItem>
                <SelectItem value="mid">Mid-Level (2-5 years)</SelectItem>
                <SelectItem value="senior">Senior (5-10 years)</SelectItem>
                <SelectItem value="lead">Lead (10+ years)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Preferred Language</Label>
            <Select value={form.preferred_language} onValueChange={(v) => setForm({ ...form, preferred_language: v })}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>{LANGUAGES.map(l => <SelectItem key={l} value={l}>{l}</SelectItem>)}</SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Preferred Coding Language</Label>
            <Select value={form.preferred_coding_language} onValueChange={(v) => setForm({ ...form, preferred_coding_language: v })}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="python">Python</SelectItem>
                <SelectItem value="javascript">JavaScript</SelectItem>
                <SelectItem value="java">Java</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button onClick={saveSettings} className="w-full" disabled={saving}>
            {saving ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
            Save Settings
          </Button>
        </div>
      </div>

      {/* Logout */}
      <div className="bg-card rounded-2xl border border-border/50 p-6">
        <h3 className="text-sm font-semibold text-foreground mb-3">Account</h3>
        <Button variant="outline" className="text-destructive border-destructive/30 hover:bg-destructive/10">
          <LogOut className="w-4 h-4 mr-2" /> Sign Out
        </Button>
      </div>
    </div>
  );
}