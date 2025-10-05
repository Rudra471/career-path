import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { User } from "@supabase/supabase-js";
import ResumeUpload from "@/components/ResumeUpload";
import ATSScore from "@/components/ATSScore";
import SkillGapChart from "@/components/SkillGapChart";
import JobRecommendations from "@/components/JobRecommendations";
import LearningPath from "@/components/LearningPath";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AnimatedSection, HoverAnimation, FloatingElement, StaggerContainer, StaggerItem } from "@/components/ui/animated-components";
import { LogOut, Brain, MessageCircle, FileText, DollarSign, Users, Target, TrendingUp, ArrowRight, User as UserIcon, Star, Calendar, Trophy } from "lucide-react";
import { motion } from "framer-motion";

const Dashboard = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [analysisData, setAnalysisData] = useState<any>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate("/auth");
        return;
      }
      setUser(session.user);
      setLoading(false);
    };

    checkUser();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session) {
        navigate("/auth");
      } else {
        setUser(session.user);
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    toast({ title: "Logged out successfully" });
    navigate("/");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-pulse">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card/50 backdrop-blur-xl sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-gradient-primary">
              <Brain className="h-6 w-6 text-primary-foreground" />
            </div>
            <h1 className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              AI Career Advisor
            </h1>
          </div>
          <div className="flex items-center gap-2">
            <HoverAnimation hoverScale={1.05} hoverY={-2}>
              <Button
                variant="ghost"
                onClick={() => navigate("/profile")}
                className="gap-2"
              >
                <UserIcon className="h-4 w-4" />
                Profile
              </Button>
            </HoverAnimation>
            <ThemeToggle />
            <HoverAnimation hoverScale={1.05} hoverY={-2}>
              <Button variant="outline" onClick={handleLogout} className="gap-2">
                <LogOut className="h-4 w-4" />
                Logout
              </Button>
            </HoverAnimation>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <AnimatedSection className="mb-8">
          <div className="relative overflow-hidden rounded-2xl glass-card shadow-floating p-8 mb-8">
            {/* Background decoration */}
            <FloatingElement delay={0} className="absolute -top-10 -right-10 w-32 h-32 bg-primary/10 rounded-full blur-xl" />
            <FloatingElement delay={1} className="absolute -bottom-10 -left-10 w-40 h-40 bg-secondary/10 rounded-full blur-xl" />
            
            <div className="relative z-10">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                  >
                    <h2 className="text-4xl font-bold mb-2 bg-gradient-primary bg-clip-text text-transparent">
                      Welcome back, {user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'User'}!
                    </h2>
                    <motion.p 
                      className="text-lg text-muted-foreground"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.8, delay: 0.2 }}
                    >
                      Ready to accelerate your career journey? Let's get started.
                    </motion.p>
                  </motion.div>
                </div>
                
                <motion.div
                  className="flex items-center gap-4"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                >
                  <div className="text-center p-4 rounded-xl bg-primary/10 border border-primary/20">
                    <motion.div
                      animate={{ rotate: [0, 360] }}
                      transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                    >
                      <Trophy className="h-8 w-8 text-primary mx-auto mb-2" />
                    </motion.div>
                    <div className="text-sm font-semibold">Career Level</div>
                    <div className="text-xs text-muted-foreground">Rising Star</div>
                  </div>
                </motion.div>
              </div>
              
              {/* Progress indicators */}
              <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <StaggerItem>
                  <motion.div 
                    className="flex items-center gap-3 p-3 rounded-lg bg-background/30 border border-border"
                    whileHover={{ scale: 1.02, backgroundColor: "hsl(var(--primary) / 0.1)" }}
                  >
                    <div className="p-2 rounded-lg bg-success/20">
                      <Star className="h-4 w-4 text-success" />
                    </div>
                    <div>
                      <div className="text-sm font-medium">Profile Score</div>
                      <div className="text-xs text-muted-foreground">85% Complete</div>
                    </div>
                  </motion.div>
                </StaggerItem>
                
                <StaggerItem>
                  <motion.div 
                    className="flex items-center gap-3 p-3 rounded-lg bg-background/30 border border-border"
                    whileHover={{ scale: 1.02, backgroundColor: "hsl(var(--primary) / 0.1)" }}
                  >
                    <div className="p-2 rounded-lg bg-info/20">
                      <Calendar className="h-4 w-4 text-info" />
                    </div>
                    <div>
                      <div className="text-sm font-medium">Last Activity</div>
                      <div className="text-xs text-muted-foreground">Today</div>
                    </div>
                  </motion.div>
                </StaggerItem>
                
                <StaggerItem>
                  <motion.div 
                    className="flex items-center gap-3 p-3 rounded-lg bg-background/30 border border-border"
                    whileHover={{ scale: 1.02, backgroundColor: "hsl(var(--primary) / 0.1)" }}
                  >
                    <div className="p-2 rounded-lg bg-warning/20">
                      <TrendingUp className="h-4 w-4 text-warning" />
                    </div>
                    <div>
                      <div className="text-sm font-medium">Growth Track</div>
                      <div className="text-xs text-muted-foreground">On Target</div>
                    </div>
                  </motion.div>
                </StaggerItem>
              </StaggerContainer>
            </div>
          </div>
        </AnimatedSection>

        <div className="space-y-8">
          {/* Quick Actions */}
          <Card className="glass-card shadow-floating">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-6 w-6 text-primary" />
                Quick Actions
              </CardTitle>
              <CardDescription>
                Access all career development tools in one place
              </CardDescription>
            </CardHeader>
            <CardContent>
              <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <StaggerItem>
                  <HoverAnimation hoverScale={1.05} hoverY={-5}>
                    <Button
                      onClick={() => navigate("/interview-prep")}
                      className="h-28 flex-col gap-2 shimmer-button text-left justify-center relative overflow-hidden group w-full"
                    >
                      <FloatingElement>
                        <MessageCircle className="h-8 w-8 group-hover:scale-110 transition-transform duration-300" />
                      </FloatingElement>
                      <div className="text-center">
                        <div className="font-semibold">Interview Prep</div>
                        <div className="text-xs opacity-90">AI-powered mock interviews</div>
                      </div>
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                        initial={{ x: '-100%' }}
                        whileHover={{ x: '100%' }}
                        transition={{ duration: 0.5 }}
                      />
                    </Button>
                  </HoverAnimation>
                </StaggerItem>
                
                <StaggerItem>
                  <HoverAnimation hoverScale={1.05} hoverY={-5}>
                    <Button
                      onClick={() => navigate("/resume-builder")}
                      className="h-28 flex-col gap-2 bg-gradient-secondary hover:opacity-90 text-left justify-center group w-full relative overflow-hidden"
                      variant="outline"
                    >
                      <FloatingElement delay={0.2}>
                        <FileText className="h-8 w-8 group-hover:scale-110 transition-transform duration-300" />
                      </FloatingElement>
                      <div className="text-center">
                        <div className="font-semibold">Resume Builder</div>
                        <div className="text-xs opacity-70">Create professional resumes</div>
                      </div>
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/20 to-transparent"
                        initial={{ x: '-100%' }}
                        whileHover={{ x: '100%' }}
                        transition={{ duration: 0.5 }}
                      />
                    </Button>
                  </HoverAnimation>
                </StaggerItem>
                
                <StaggerItem>
                  <HoverAnimation hoverScale={1.05} hoverY={-5}>
                    <Button
                      onClick={() => navigate("/salary-insights")}
                      className="h-28 flex-col gap-2 glass-card hover:shadow-floating text-left justify-center group w-full relative overflow-hidden"
                      variant="outline"
                    >
                      <FloatingElement delay={0.4}>
                        <DollarSign className="h-8 w-8 group-hover:scale-110 transition-transform duration-300 text-success" />
                      </FloatingElement>
                      <div className="text-center">
                        <div className="font-semibold">Salary Insights</div>
                        <div className="text-xs opacity-70">Market analysis & trends</div>
                      </div>
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-success/20 to-transparent"
                        initial={{ x: '-100%' }}
                        whileHover={{ x: '100%' }}
                        transition={{ duration: 0.5 }}
                      />
                    </Button>
                  </HoverAnimation>
                </StaggerItem>
              </StaggerContainer>
            </CardContent>
          </Card>

          {/* Resume Analysis */}
          <div className="grid gap-6">
            <ResumeUpload onAnalysisComplete={setAnalysisData} />

            {analysisData && (
              <>
                <ATSScore score={analysisData.atsScore} />
                
                <div className="grid md:grid-cols-2 gap-6">
                  <SkillGapChart data={analysisData.skillGaps || []} />
                  <JobRecommendations jobs={analysisData.jobRecommendations || []} />
                </div>

                <LearningPath learningPath={analysisData.learningPath || []} />
              </>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;