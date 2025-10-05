import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { CheckCircle2, AlertCircle } from "lucide-react";

interface ATSScoreProps {
  score: number;
}

const ATSScore = ({ score }: ATSScoreProps) => {
  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-success";
    if (score >= 60) return "text-warning";
    return "text-destructive";
  };

  const getScoreLabel = (score: number) => {
    if (score >= 80) return "Excellent";
    if (score >= 60) return "Good";
    return "Needs Improvement";
  };

  return (
    <Card className="bg-gradient-card backdrop-blur-xl border-primary/20 shadow-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          {score >= 70 ? (
            <CheckCircle2 className="h-5 w-5 text-success" />
          ) : (
            <AlertCircle className="h-5 w-5 text-warning" />
          )}
          ATS Score
        </CardTitle>
        <CardDescription>
          How well your resume performs with Applicant Tracking Systems
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-5xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            {score}
          </span>
          <span className={`text-lg font-semibold ${getScoreColor(score)}`}>
            {getScoreLabel(score)}
          </span>
        </div>
        <Progress value={score} className="h-3" />
        <div className="space-y-2 text-sm text-muted-foreground">
          <p>• {score >= 80 ? "Your resume is well-optimized for ATS systems" : "Consider improving keyword usage and formatting"}</p>
          <p>• {score >= 70 ? "Good structure and readability" : "Enhance section headers and bullet points"}</p>
          <p>• {score >= 60 ? "Relevant skills are highlighted" : "Add more industry-specific keywords"}</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default ATSScore;