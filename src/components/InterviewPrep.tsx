import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { 
  MessageCircle, 
  Play, 
  Pause, 
  RotateCcw, 
  CheckCircle, 
  Clock, 
  Target, 
  Brain,
  Mic,
  MicOff 
} from "lucide-react";

interface Question {
  id: string;
  question: string;
  category: string;
  difficulty: "Easy" | "Medium" | "Hard";
  tips: string[];
}

interface InterviewSession {
  role: string;
  questions: Question[];
  currentIndex: number;
  responses: Record<string, string>;
  isRecording: boolean;
  timeRemaining: number;
}

const SAMPLE_QUESTIONS: Question[] = [
  {
    id: "1",
    question: "Tell me about yourself and your background in software development.",
    category: "General",
    difficulty: "Easy",
    tips: [
      "Keep it concise (2-3 minutes)",
      "Focus on relevant experience",
      "End with why you're interested in this role"
    ]
  },
  {
    id: "2", 
    question: "Describe a challenging project you worked on and how you overcame obstacles.",
    category: "Behavioral",
    difficulty: "Medium",
    tips: [
      "Use the STAR method (Situation, Task, Action, Result)",
      "Focus on your problem-solving approach",
      "Quantify the impact of your solution"
    ]
  },
  {
    id: "3",
    question: "How do you handle conflicts in a team environment?",
    category: "Behavioral", 
    difficulty: "Medium",
    tips: [
      "Show emotional intelligence",
      "Demonstrate communication skills",
      "Provide a specific example"
    ]
  },
  {
    id: "4",
    question: "Explain the difference between REST and GraphQL APIs.",
    category: "Technical",
    difficulty: "Hard",
    tips: [
      "Compare key differences clearly",
      "Mention use cases for each",
      "Discuss pros and cons"
    ]
  }
];

const InterviewPrep = () => {
  const [selectedRole, setSelectedRole] = useState<string>("");
  const [session, setSession] = useState<InterviewSession | null>(null);
  const [currentResponse, setCurrentResponse] = useState("");

  const roles = [
    "Frontend Developer",
    "Backend Developer", 
    "Full Stack Developer",
    "Data Scientist",
    "Product Manager",
    "UX Designer"
  ];

  const startInterview = () => {
    if (!selectedRole) return;
    
    setSession({
      role: selectedRole,
      questions: SAMPLE_QUESTIONS,
      currentIndex: 0,
      responses: {},
      isRecording: false,
      timeRemaining: 300 // 5 minutes per question
    });
  };

  const nextQuestion = () => {
    if (!session) return;
    
    const newResponses = { ...session.responses };
    newResponses[session.questions[session.currentIndex].id] = currentResponse;
    
    setSession({
      ...session,
      currentIndex: session.currentIndex + 1,
      responses: newResponses,
      timeRemaining: 300
    });
    setCurrentResponse("");
  };

  const previousQuestion = () => {
    if (!session || session.currentIndex === 0) return;
    
    setSession({
      ...session,
      currentIndex: session.currentIndex - 1,
      timeRemaining: 300
    });
    
    const prevResponse = session.responses[session.questions[session.currentIndex - 1].id] || "";
    setCurrentResponse(prevResponse);
  };

  const toggleRecording = () => {
    if (!session) return;
    
    setSession({
      ...session,
      isRecording: !session.isRecording
    });
  };

  const restartInterview = () => {
    setSession(null);
    setCurrentResponse("");
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy": return "bg-success";
      case "Medium": return "bg-warning";
      case "Hard": return "bg-destructive";
      default: return "bg-muted";
    }
  };

  if (!session) {
    return (
      <Card className="glass-card shadow-floating">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageCircle className="h-6 w-6 text-primary" />
            Interview Preparation
          </CardTitle>
          <CardDescription>
            Practice with AI-powered mock interviews tailored to your target role
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 rounded-lg bg-background/50 border border-border">
              <Target className="h-8 w-8 text-primary mx-auto mb-2" />
              <h3 className="font-semibold mb-1">Role-Specific</h3>
              <p className="text-sm text-muted-foreground">Questions tailored to your target position</p>
            </div>
            <div className="text-center p-4 rounded-lg bg-background/50 border border-border">
              <Brain className="h-8 w-8 text-secondary mx-auto mb-2" />
              <h3 className="font-semibold mb-1">AI Feedback</h3>
              <p className="text-sm text-muted-foreground">Get insights on your responses</p>
            </div>
            <div className="text-center p-4 rounded-lg bg-background/50 border border-border">
              <Clock className="h-8 w-8 text-tertiary mx-auto mb-2" />
              <h3 className="font-semibold mb-1">Timed Practice</h3>
              <p className="text-sm text-muted-foreground">Simulate real interview conditions</p>
            </div>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium">Select Target Role</label>
              <Select onValueChange={setSelectedRole}>
                <SelectTrigger className="bg-background/50">
                  <SelectValue placeholder="Choose your target position" />
                </SelectTrigger>
                <SelectContent>
                  {roles.map((role) => (
                    <SelectItem key={role} value={role}>{role}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <Button 
              onClick={startInterview}
              disabled={!selectedRole}
              className="w-full bg-gradient-primary hover:opacity-90"
              size="lg"
            >
              <Play className="mr-2 h-4 w-4" />
              Start Mock Interview
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  const currentQuestion = session.questions[session.currentIndex];
  const isLastQuestion = session.currentIndex === session.questions.length - 1;
  const progress = ((session.currentIndex + 1) / session.questions.length) * 100;

  if (session.currentIndex >= session.questions.length) {
    return (
      <Card className="glass-card shadow-floating">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle className="h-6 w-6 text-success" />
            Interview Complete!
          </CardTitle>
          <CardDescription>
            Great job! You've completed the mock interview for {session.role}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center p-8 rounded-lg bg-gradient-primary/10 border border-primary/20">
            <CheckCircle className="h-16 w-16 text-success mx-auto mb-4" />
            <h3 className="text-2xl font-bold mb-2">Well Done!</h3>
            <p className="text-muted-foreground mb-4">
              You answered {session.questions.length} questions for the {session.role} position.
            </p>
            <div className="flex gap-4 justify-center">
              <Button onClick={restartInterview} variant="outline">
                <RotateCcw className="mr-2 h-4 w-4" />
                Practice Again
              </Button>
              <Button className="bg-gradient-primary hover:opacity-90">
                View Detailed Feedback
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="glass-card shadow-floating">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <MessageCircle className="h-6 w-6 text-primary" />
            Mock Interview - {session.role}
          </CardTitle>
          <Badge variant="outline">
            Question {session.currentIndex + 1} of {session.questions.length}
          </Badge>
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Progress</span>
            <span className="text-sm font-medium">{Math.round(progress)}%</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>
      </CardHeader>
      
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Badge className={getDifficultyColor(currentQuestion.difficulty)}>
              {currentQuestion.difficulty}
            </Badge>
            <Badge variant="outline">{currentQuestion.category}</Badge>
          </div>
          
          <div className="p-4 rounded-lg bg-primary/5 border border-primary/20">
            <h3 className="text-lg font-semibold mb-2">Question:</h3>
            <p className="text-foreground">{currentQuestion.question}</p>
          </div>
          
          <div className="p-4 rounded-lg bg-secondary/5 border border-secondary/20">
            <h4 className="font-semibold mb-2 flex items-center gap-2">
              <Brain className="h-4 w-4" />
              Tips for a great answer:
            </h4>
            <ul className="space-y-1">
              {currentQuestion.tips.map((tip, index) => (
                <li key={index} className="text-sm text-muted-foreground flex items-start gap-2">
                  <span className="text-secondary mt-1">•</span>
                  {tip}
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium">Your Response:</label>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost" 
                size="sm"
                onClick={toggleRecording}
                className={session.isRecording ? "text-destructive" : ""}
              >
                {session.isRecording ? (
                  <>
                    <MicOff className="h-4 w-4 mr-1" />
                    Stop Recording
                  </>
                ) : (
                  <>
                    <Mic className="h-4 w-4 mr-1" />
                    Record Answer
                  </>
                )}
              </Button>
              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <Clock className="h-4 w-4" />
                5:00
              </div>
            </div>
          </div>
          
          <Textarea
            value={currentResponse}
            onChange={(e) => setCurrentResponse(e.target.value)}
            placeholder="Type your response here or use voice recording..."
            className="min-h-32 bg-background/50"
          />
        </div>
        
        <div className="flex gap-3 justify-between">
          <Button
            variant="outline"
            onClick={previousQuestion}
            disabled={session.currentIndex === 0}
          >
            Previous
          </Button>
          
          <div className="flex gap-2">
            <Button variant="ghost" onClick={restartInterview}>
              <RotateCcw className="h-4 w-4" />
            </Button>
            
            <Button
              onClick={nextQuestion}
              className="bg-gradient-primary hover:opacity-90"
            >
              {isLastQuestion ? "Finish Interview" : "Next Question"}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default InterviewPrep;