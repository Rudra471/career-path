import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Clock, ExternalLink } from "lucide-react";

interface Resource {
  title: string;
  url: string;
  type: string;
}

interface LearningPathItem {
  skill: string;
  resources: Resource[];
  estimatedHours: number;
  priority: string;
}

interface LearningPathProps {
  learningPath: LearningPathItem[];
}

const LearningPath = ({ learningPath }: LearningPathProps) => {
  const getPriorityColor = (priority: string) => {
    switch (priority.toLowerCase()) {
      case 'high':
        return 'bg-destructive';
      case 'medium':
        return 'bg-warning';
      default:
        return 'bg-muted';
    }
  };

  return (
    <Card className="bg-gradient-card backdrop-blur-xl border-primary/20 shadow-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BookOpen className="h-5 w-5 text-secondary" />
          Personalized Learning Roadmap
        </CardTitle>
        <CardDescription>
          Recommended courses and resources to advance your career
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {learningPath.map((item, index) => (
          <div
            key={index}
            className="p-4 rounded-lg border border-border bg-background/50 space-y-3"
          >
            <div className="flex items-start justify-between">
              <h3 className="font-semibold text-lg">{item.skill}</h3>
              <div className="flex items-center gap-2">
                <Badge className={getPriorityColor(item.priority)}>
                  {item.priority} Priority
                </Badge>
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <Clock className="h-3 w-3" />
                  {item.estimatedHours}h
                </div>
              </div>
            </div>

            <div className="space-y-2">
              {item.resources.slice(0, 3).map((resource, i) => (
                <a
                  key={i}
                  href={resource.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-2 rounded hover:bg-primary/10 transition-colors group"
                >
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="text-xs">
                      {resource.type}
                    </Badge>
                    <span className="text-sm">{resource.title}</span>
                  </div>
                  <ExternalLink className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
              ))}
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default LearningPath;