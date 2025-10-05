import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { 
  AnimatedSection, 
  StaggerContainer, 
  StaggerItem, 
  HoverAnimation, 
  FloatingElement, 
  PulseElement,
  fadeInVariants,
  scaleInVariants,
  slideUpVariants 
} from "@/components/ui/animated-components";
import { Brain, Target, TrendingUp, Sparkles, ArrowRight, MessageCircle, FileText, DollarSign, Users, Award, Zap, Star, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";

const Index = () => {
  const navigate = useNavigate();

  const coreFeatures = [
    {
      icon: Brain,
      title: "AI-Powered Analysis",
      description: "Advanced AI analyzes your resume and profile to provide deep career insights",
    },
    {
      icon: Target,
      title: "ATS Score Optimization",
      description: "Get your resume past applicant tracking systems with our scoring algorithm",
    },
    {
      icon: TrendingUp,
      title: "Skill Gap Insights",
      description: "Visualize your skills vs. market demands with interactive charts",
    },
    {
      icon: Sparkles,
      title: "Personalized Roadmap",
      description: "Receive tailored learning paths and job recommendations",
    },
  ];

  const newFeatures = [
    {
      icon: MessageCircle,
      title: "Interview Preparation",
      description: "AI-powered mock interviews with real-time feedback and tips",
      href: "/interview-prep",
      gradient: "bg-gradient-primary"
    },
    {
      icon: FileText,
      title: "Resume Builder",
      description: "Create professional resumes with multiple templates and AI suggestions",
      href: "/resume-builder",
      gradient: "bg-gradient-secondary"
    },
    {
      icon: DollarSign,
      title: "Salary Insights",
      description: "Market analysis, salary trends, and negotiation strategies",
      href: "/salary-insights",
      gradient: "bg-gradient-card"
    }
  ];

  const stats = [
    { number: "50K+", label: "Professionals Helped" },
    { number: "95%", label: "Interview Success Rate" },
    { number: "30%", label: "Average Salary Increase" },
    { number: "4.9★", label: "User Rating" }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <motion.nav 
        className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-xl border-b border-border"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <motion.div 
            className="flex items-center gap-2"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          >
            <FloatingElement>
              <div className="p-2 rounded-lg bg-gradient-primary">
                <Brain className="h-6 w-6 text-primary-foreground" />
              </div>
            </FloatingElement>
            <span className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              AI Career Advisor
            </span>
          </motion.div>
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <HoverAnimation hoverScale={1.05} hoverY={-2}>
              <Button variant="ghost" onClick={() => navigate("/auth")}>
                Sign In
              </Button>
            </HoverAnimation>
            <HoverAnimation hoverScale={1.05} hoverY={-2}>
              <Button onClick={() => navigate("/auth")} className="shimmer-button hover:shadow-glow transition-all duration-300">
                Get Started
              </Button>
            </HoverAnimation>
          </div>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        <div className="absolute inset-0 bg-gradient-mesh opacity-30" />
        
        {/* Floating background elements */}
        <FloatingElement delay={0} className="absolute top-20 left-10 w-32 h-32 bg-primary/5 rounded-full blur-xl" />
        <FloatingElement delay={2} className="absolute bottom-20 right-10 w-48 h-48 bg-secondary/5 rounded-full blur-xl" />
        <FloatingElement delay={1} className="absolute top-1/3 right-1/4 w-24 h-24 bg-tertiary/5 rounded-full blur-xl" />
        
        <div className="relative z-10 container mx-auto px-4 text-center">
          <AnimatedSection variants={scaleInVariants}>
            <PulseElement>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-8">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                >
                  <Sparkles className="h-4 w-4 text-primary" />
                </motion.div>
                <span className="text-sm text-primary font-medium">Powered by Advanced AI</span>
              </div>
            </PulseElement>
          </AnimatedSection>

          <AnimatedSection variants={fadeInVariants}>
            <motion.h1 
              className="text-5xl md:text-7xl font-bold mb-6"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
            >
              <motion.span 
                className="bg-gradient-primary bg-clip-text text-transparent"
                initial={{ backgroundPosition: "0% 50%" }}
                animate={{ backgroundPosition: "100% 50%" }}
                transition={{ duration: 3, repeat: Infinity, repeatType: "reverse" }}
              >
                AI-Powered
              </motion.span>
              <br />
              <motion.span
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
              >
                Career Advisor
              </motion.span>
            </motion.h1>
          </AnimatedSection>

          <AnimatedSection variants={slideUpVariants}>
            <motion.p 
              className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              Transform your job search with AI-driven resume analysis, ATS optimization,
              and personalized career guidance
            </motion.p>
          </AnimatedSection>

          <AnimatedSection>
            <motion.div 
              className="flex flex-col sm:flex-row gap-4 justify-center"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.2 }}
            >
              <HoverAnimation hoverScale={1.05} hoverY={-5}>
                <Button
                  size="lg"
                  onClick={() => navigate("/auth")}
                  className="shimmer-button text-lg px-8 shadow-glow group relative overflow-hidden"
                >
                  Get Started Free
                  <motion.div
                    className="ml-2 h-5 w-5"
                    whileHover={{ x: 5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ArrowRight className="h-5 w-5" />
                  </motion.div>
                </Button>
              </HoverAnimation>
              <HoverAnimation hoverScale={1.05} hoverY={-5}>
                <Button
                  size="lg"
                  variant="outline"
                  onClick={() => navigate("/auth")}
                  className="text-lg px-8 border-primary/20 hover:bg-primary/10 transition-all duration-300 hover:border-primary/40"
                >
                  Sign In
                </Button>
              </HoverAnimation>
            </motion.div>
          </AnimatedSection>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 relative">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">
              Everything You Need to
              <span className="bg-gradient-primary bg-clip-text text-transparent"> Succeed</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Comprehensive career tools powered by cutting-edge AI technology
            </p>
          </div>

          <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {coreFeatures.map((feature, index) => (
              <StaggerItem key={index}>
                <HoverAnimation 
                  hoverScale={1.05} 
                  hoverY={-8}
                  className="h-full"
                >
                  <motion.div
                    className="p-6 rounded-xl glass-card shadow-card h-full cursor-pointer group feature-card-hover"
                    onClick={() => {
                      // Navigate to relevant section or show modal
                      if (feature.title === "AI-Powered Analysis") {
                        document.getElementById('new-features')?.scrollIntoView({ behavior: 'smooth' });
                      } else if (feature.title === "ATS Score Optimization") {
                        navigate('/dashboard');
                      } else {
                        navigate('/auth');
                      }
                    }}
                    whileHover={{
                      borderColor: "hsl(var(--primary))",
                      boxShadow: "var(--shadow-floating)"
                    }}
                  >
                    <FloatingElement delay={index * 0.5}>
                      <div className="w-12 h-12 rounded-lg bg-gradient-primary flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                        <feature.icon className="h-6 w-6 text-primary-foreground" />
                      </div>
                    </FloatingElement>
                    <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">{feature.title}</h3>
                    <p className="text-muted-foreground group-hover:text-foreground transition-colors">{feature.description}</p>
                    
                    {/* Hover indicator */}
                    <motion.div
                      className="mt-4 flex items-center text-primary opacity-0 group-hover:opacity-100 transition-opacity"
                      initial={{ x: -10 }}
                      whileHover={{ x: 0 }}
                    >
                      <span className="text-sm font-medium">Learn More</span>
                      <ChevronRight className="h-4 w-4 ml-1" />
                    </motion.div>
                  </motion.div>
                </HoverAnimation>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* New Features Section */}
      <section id="new-features" className="py-24 relative">
        <div className="container mx-auto px-4">
          <AnimatedSection>
            <div className="text-center mb-16">
              <motion.div 
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-8"
                initial={{ scale: 0, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
              >
                <motion.div
                  animate={{ 
                    scale: [1, 1.2, 1],
                    rotate: [0, 180, 360] 
                  }}
                  transition={{ 
                    duration: 2, 
                    repeat: Infinity,
                    ease: "easeInOut" 
                  }}
                >
                  <Zap className="h-4 w-4 text-primary" />
                </motion.div>
                <span className="text-sm text-primary font-medium">New Features</span>
              </motion.div>
              <motion.h2 
                className="text-4xl font-bold mb-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                Enhanced Career Tools
                <span className="bg-gradient-primary bg-clip-text text-transparent"> Just Added</span>
              </motion.h2>
              <motion.p 
                className="text-xl text-muted-foreground max-w-2xl mx-auto"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
              >
                Discover our latest AI-powered features designed to accelerate your career growth
              </motion.p>
            </div>
          </AnimatedSection>

          <StaggerContainer className="grid md:grid-cols-3 gap-8 mb-16">
            {newFeatures.map((feature, index) => (
              <StaggerItem key={index}>
                <HoverAnimation hoverScale={1.02} hoverY={-10}>
                  <Card 
                    className="glass-card shadow-floating group cursor-pointer h-full transition-all duration-500 hover:shadow-floating border-2 border-transparent hover:border-primary/20" 
                    onClick={() => navigate(feature.href)}
                  >
                    <CardHeader>
                      <FloatingElement delay={index * 0.3}>
                        <div className={`w-16 h-16 rounded-2xl ${feature.gradient} flex items-center justify-center mb-4 group-hover:scale-110 transition-all duration-300 shadow-lg group-hover:shadow-xl`}>
                          <feature.icon className="h-8 w-8 text-white" />
                        </div>
                      </FloatingElement>
                      <CardTitle className="text-xl group-hover:text-primary transition-colors duration-300">{feature.title}</CardTitle>
                      <CardDescription className="text-base group-hover:text-foreground transition-colors">{feature.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Button variant="ghost" className="group-hover:bg-primary/10 w-full justify-between transition-all duration-300 group-hover:shadow-md">
                        <span>Explore Feature</span>
                        <motion.div
                          whileHover={{ x: 5 }}
                          transition={{ duration: 0.2 }}
                        >
                          <ArrowRight className="h-4 w-4" />
                        </motion.div>
                      </Button>
                    </CardContent>
                  </Card>
                </HoverAnimation>
              </StaggerItem>
            ))}
          </StaggerContainer>

          {/* Stats Section */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
            {stats.map((stat, index) => (
              <div key={index} className="text-center p-6 rounded-xl glass-card animate-bounce-in" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="text-3xl font-bold text-gradient mb-2">{stat.number}</div>
                <div className="text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center p-12 rounded-2xl glass-card shadow-floating">
            <div className="mb-8">
              <Award className="h-16 w-16 text-primary mx-auto mb-4 floating" />
            </div>
            <h2 className="text-4xl font-bold mb-4">
              Ready to Accelerate Your Career?
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Join thousands of professionals using AI to land their dream jobs
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                onClick={() => navigate("/auth")}
                className="bg-gradient-primary hover:opacity-90 transition-opacity text-lg px-8 glow group"
              >
                Start Your Journey Today
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => navigate("/auth")}
                className="text-lg px-8 border-primary/20 hover:bg-primary/10"
              >
                Explore Features
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;