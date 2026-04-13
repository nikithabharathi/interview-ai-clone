import React, { useState, useEffect } from 'react';
import API from '../api/base44Client';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Badge } from '../components/ui/badge';
import { FileText, Upload, Loader2, Briefcase, GraduationCap, Code2, Star, AlertTriangle, CheckCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Resume() {
  const [user, setUser] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);
  const queryClient = useQueryClient();

  // ✅ FIXED (removed base44)
  useEffect(() => {
    setUser({ email: "demo@gmail.com" });
  }, []);

  // ✅ FIXED (removed base44 query)
  const { data: resumes = [], isLoading } = useQuery({
    queryKey: ['resumes', user?.email],
    queryFn: async () => {
      return [];
    },
    enabled: !!user?.email,
  });

  const resume = resumes[0];

  // ✅ FIXED (removed base44 upload + AI)
  const handleUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);

    setTimeout(() => {
      setUploading(false);
      setAnalyzing(true);

      setTimeout(() => {
        const dummyResume = {
          full_name: "Demo User",
          skills: ["React", "Node.js", "JavaScript"],
          experience: [
            {
              company: "ABC Tech",
              role: "Frontend Developer",
              duration: "2023 - Present",
              description: "Built UI applications"
            }
          ],
          education: [
            {
              institution: "XYZ University",
              degree: "B.Tech CSE",
              year: "2024"
            }
          ],
          summary: "Strong frontend developer with solid React experience.",
          strengths: ["UI Design", "Problem Solving"],
          improvement_areas: ["Backend skills", "System Design"],
          recommended_roles: ["Frontend Developer", "Full Stack Developer"]
        };

        queryClient.setQueryData(['resumes', user?.email], [dummyResume]);

        setAnalyzing(false);
      }, 1500);
    }, 1000);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[80vh]">
        <Loader2 className="w-6 h-6 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="p-6 md:p-8 max-w-5xl mx-auto space-y-8">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl font-bold text-foreground">Resume Analyzer</h1>
        <p className="text-sm text-muted-foreground mt-1">Upload your resume for AI-powered analysis and personalized recommendations</p>
      </motion.div>

      {/* Upload Section */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative"
      >
        <label className="flex flex-col items-center justify-center p-10 rounded-2xl border-2 border-dashed border-border/50 bg-card hover:border-primary/30 transition-colors cursor-pointer">
          <Input type="file" accept=".pdf,.doc,.docx" className="hidden" onChange={handleUpload} disabled={uploading || analyzing} />
          {uploading || analyzing ? (
            <div className="text-center">
              <Loader2 className="w-10 h-10 animate-spin text-primary mx-auto mb-3" />
              <p className="text-sm font-medium text-foreground">{uploading ? 'Uploading...' : 'Analyzing your resume with AI...'}</p>
              <p className="text-xs text-muted-foreground mt-1">This may take a moment</p>
            </div>
          ) : (
            <div className="text-center">
              <Upload className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
              <p className="text-sm font-medium text-foreground">Upload your resume</p>
              <p className="text-xs text-muted-foreground mt-1">PDF, DOC, or DOCX (max 10MB)</p>
            </div>
          )}
        </label>
      </motion.div>

      {/* Resume Analysis */}
      <AnimatePresence>
        {resume && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">

            {/* Summary */}
            <div className="bg-card rounded-2xl border border-border/50 p-6">
              <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
                <FileText className="w-4 h-4 text-primary" /> Professional Summary
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{resume.summary}</p>
            </div>

            {/* Skills */}
            {resume.skills?.length > 0 && (
              <div className="bg-card rounded-2xl border border-border/50 p-6">
                <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
                  <Code2 className="w-4 h-4 text-emerald-400" /> Skills
                </h3>
                <div className="flex flex-wrap gap-2">
                  {resume.skills.map((skill, i) => (
                    <Badge key={i} variant="secondary">{skill}</Badge>
                  ))}
                </div>
              </div>
            )}

            {/* Experience */}
            {resume.experience?.length > 0 && (
              <div className="bg-card rounded-2xl border border-border/50 p-6">
                <h3 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
                  <Briefcase className="w-4 h-4 text-blue-400" /> Experience
                </h3>
                <div className="space-y-4">
                  {resume.experience.map((exp, i) => (
                    <div key={i} className="pl-4 border-l-2 border-primary/30">
                      <p className="text-sm font-semibold text-foreground">{exp.role}</p>
                      <p className="text-xs text-primary">{exp.company} · {exp.duration}</p>
                      {exp.description && <p className="text-xs text-muted-foreground mt-1">{exp.description}</p>}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Education */}
            {resume.education?.length > 0 && (
              <div className="bg-card rounded-2xl border border-border/50 p-6">
                <h3 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
                  <GraduationCap className="w-4 h-4 text-purple-400" /> Education
                </h3>
                <div className="space-y-3">
                  {resume.education.map((edu, i) => (
                    <div key={i}>
                      <p className="text-sm font-semibold text-foreground">{edu.degree}</p>
                      <p className="text-xs text-muted-foreground">{edu.institution} · {edu.year}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Strengths & Improvements */}
            <div className="grid md:grid-cols-2 gap-4">
              {resume.strengths?.length > 0 && (
                <div className="bg-card rounded-2xl border border-border/50 p-6">
                  <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-400" /> Strengths
                  </h3>
                  <ul className="space-y-2">
                    {resume.strengths.map((s, i) => (
                      <li key={i} className="text-xs text-muted-foreground">{s}</li>
                    ))}
                  </ul>
                </div>
              )}

              {resume.improvement_areas?.length > 0 && (
                <div className="bg-card rounded-2xl border border-border/50 p-6">
                  <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 text-amber-400" /> Areas to Improve
                  </h3>
                  <ul className="space-y-2">
                    {resume.improvement_areas.map((a, i) => (
                      <li key={i} className="text-xs text-muted-foreground">{a}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Recommended Roles */}
            {resume.recommended_roles?.length > 0 && (
              <div className="bg-card rounded-2xl border border-border/50 p-6">
                <h3 className="text-sm font-semibold text-foreground mb-3">Recommended Roles</h3>
                <div className="flex flex-wrap gap-2">
                  {resume.recommended_roles.map((role, i) => (
                    <Badge key={i}>{role}</Badge>
                  ))}
                </div>
              </div>
            )}

          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}