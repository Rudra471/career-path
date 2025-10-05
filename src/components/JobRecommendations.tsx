import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Briefcase, MapPin, Building } from "lucide-react";

interface Job {
  title: string;
  company?: string;
  location?: string;
  matchScore: number;
  requiredSkills: string[];
}

interface JobRecommendationsProps {
  jobs: Job[];
}

const JobRecommendations = ({ jobs }: JobRecommendationsProps) => {
  return (
    <Card className="bg-gradient-card backdrop-blur-xl border-primary/20 shadow-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Briefcase className="h-5 w-5 text-primary" />
          Job Recommendations
        </CardTitle>
        <CardDescription>
          Top career opportunities based on your profile
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {jobs.slice(0, 5).map((job, index) => (
          <div
            key={index}
            className="p-4 rounded-lg border border-border bg-background/50 hover:bg-background/70 transition-colors space-y-2"
          >
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-semibold text-lg">{job.title}</h3>
                {job.company && (
                  <div className="flex items-center gap-1 text-sm text-muted-foreground mt-1">
                    <Building className="h-3 w-3" />
                    {job.company}
                  </div>
                )}
                {job.location && (
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <MapPin className="h-3 w-3" />
                    {job.location}
                  </div>
                )}
              </div>
              <Badge
                variant={job.matchScore >= 80 ? "default" : "secondary"}
                className="bg-gradient-primary"
              >
                {job.matchScore}% Match
              </Badge>
            </div>
            <div className="flex flex-wrap gap-2">
              {job.requiredSkills.slice(0, 4).map((skill, i) => (
                <Badge key={i} variant="outline" className="text-xs">
                  {skill}
                </Badge>
              ))}
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default JobRecommendations;