import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer, Legend } from "recharts";
import { TrendingUp } from "lucide-react";

interface SkillGap {
  skill: string;
  currentLevel: string;
  targetLevel: string;
  priority: string;
}

interface SkillGapChartProps {
  data: SkillGap[];
}

const SkillGapChart = ({ data }: SkillGapChartProps) => {
  const levelToScore = (level: string) => {
    const levels: Record<string, number> = {
      Beginner: 1,
      Intermediate: 2,
      Advanced: 3,
      Expert: 4,
    };
    return levels[level] || 0;
  };

  const chartData = data.slice(0, 6).map((gap) => ({
    skill: gap.skill,
    current: levelToScore(gap.currentLevel),
    target: levelToScore(gap.targetLevel),
  }));

  return (
    <Card className="bg-gradient-card backdrop-blur-xl border-primary/20 shadow-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-secondary" />
          Skill Gap Analysis
        </CardTitle>
        <CardDescription>
          Your current skills vs. target skills for desired roles
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <RadarChart data={chartData}>
            <PolarGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <PolarAngleAxis 
              dataKey="skill" 
              tick={{ fill: 'hsl(var(--foreground))', fontSize: 12 }}
            />
            <PolarRadiusAxis 
              angle={90} 
              domain={[0, 4]} 
              tick={{ fill: 'hsl(var(--muted-foreground))' }}
            />
            <Radar
              name="Current Level"
              dataKey="current"
              stroke="hsl(var(--primary))"
              fill="hsl(var(--primary))"
              fillOpacity={0.3}
            />
            <Radar
              name="Target Level"
              dataKey="target"
              stroke="hsl(var(--secondary))"
              fill="hsl(var(--secondary))"
              fillOpacity={0.3}
            />
            <Legend />
          </RadarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default SkillGapChart;