import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, Area, AreaChart, PieChart, Pie, Cell } from "recharts";
import { 
  DollarSign, 
  TrendingUp, 
  MapPin, 
  Briefcase, 
  GraduationCap, 
  Users, 
  Target,
  Calendar,
  Award
} from "lucide-react";

interface SalaryData {
  role: string;
  location: string;
  experience: string;
  minSalary: number;
  maxSalary: number;
  medianSalary: number;
  averageSalary: number;
}

interface LocationData {
  city: string;
  averageSalary: number;
  costOfLiving: number;
  adjustedSalary: number;
}

interface TrendData {
  year: string;
  salary: number;
}

const SAMPLE_SALARY_DATA: SalaryData[] = [
  {
    role: "Frontend Developer",
    location: "San Francisco",
    experience: "Entry Level",
    minSalary: 80000,
    maxSalary: 120000,
    medianSalary: 95000,
    averageSalary: 98000
  },
  {
    role: "Frontend Developer",
    location: "San Francisco", 
    experience: "Mid Level",
    minSalary: 120000,
    maxSalary: 180000,
    medianSalary: 145000,
    averageSalary: 150000
  },
  {
    role: "Frontend Developer",
    location: "San Francisco",
    experience: "Senior Level",
    minSalary: 180000,
    maxSalary: 280000,
    medianSalary: 225000,
    averageSalary: 230000
  },
  {
    role: "Backend Developer",
    location: "San Francisco",
    experience: "Mid Level", 
    minSalary: 130000,
    maxSalary: 190000,
    medianSalary: 155000,
    averageSalary: 160000
  }
];

const LOCATION_DATA: LocationData[] = [
  { city: "San Francisco", averageSalary: 150000, costOfLiving: 100, adjustedSalary: 150000 },
  { city: "New York", averageSalary: 140000, costOfLiving: 95, adjustedSalary: 147368 },
  { city: "Seattle", averageSalary: 135000, costOfLiving: 85, adjustedSalary: 158824 },
  { city: "Austin", averageSalary: 120000, costOfLiving: 70, adjustedSalary: 171429 },
  { city: "Denver", averageSalary: 110000, costOfLiving: 65, adjustedSalary: 169231 },
  { city: "Remote", averageSalary: 125000, costOfLiving: 60, adjustedSalary: 208333 }
];

const TREND_DATA: TrendData[] = [
  { year: "2020", salary: 120000 },
  { year: "2021", salary: 125000 },
  { year: "2022", salary: 135000 },
  { year: "2023", salary: 145000 },
  { year: "2024", salary: 150000 }
];

const SKILL_IMPACT_DATA = [
  { skill: "React", impact: 15000, color: "#8884d8" },
  { skill: "TypeScript", impact: 12000, color: "#82ca9d" },
  { skill: "Node.js", impact: 18000, color: "#ffc658" },
  { skill: "AWS", impact: 20000, color: "#ff7300" },
  { skill: "Docker", impact: 10000, color: "#8dd1e1" }
];

const SalaryInsights = () => {
  const [selectedRole, setSelectedRole] = useState("Frontend Developer");
  const [selectedLocation, setSelectedLocation] = useState("San Francisco");
  const [selectedExperience, setSelectedExperience] = useState("Mid Level");
  const [customSalary, setCustomSalary] = useState("");

  const roles = ["Frontend Developer", "Backend Developer", "Full Stack Developer", "Data Scientist", "Product Manager", "UX Designer"];
  const locations = ["San Francisco", "New York", "Seattle", "Austin", "Denver", "Remote"];
  const experienceLevels = ["Entry Level", "Mid Level", "Senior Level", "Lead Level"];

  const getCurrentSalaryData = () => {
    return SAMPLE_SALARY_DATA.find(
      data => data.role === selectedRole && 
              data.location === selectedLocation && 
              data.experience === selectedExperience
    ) || SAMPLE_SALARY_DATA[0];
  };

  const salaryData = getCurrentSalaryData();

  const formatSalary = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const getSalaryComparison = () => {
    if (!customSalary) return null;
    
    const userSalary = parseInt(customSalary);
    const marketMedian = salaryData.medianSalary;
    const difference = userSalary - marketMedian;
    const percentage = ((difference / marketMedian) * 100).toFixed(1);
    
    return {
      difference,
      percentage: parseFloat(percentage),
      isAbove: difference > 0
    };
  };

  const comparison = getSalaryComparison();

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="glass-card shadow-floating">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <DollarSign className="h-6 w-6 text-primary" />
            Salary Insights & Market Analysis
          </CardTitle>
          <CardDescription>
            Discover competitive salary ranges and market trends for your role and location
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <Label>Role</Label>
              <Select value={selectedRole} onValueChange={setSelectedRole}>
                <SelectTrigger className="bg-background/50">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {roles.map((role) => (
                    <SelectItem key={role} value={role}>{role}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label>Location</Label>
              <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                <SelectTrigger className="bg-background/50">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {locations.map((location) => (
                    <SelectItem key={location} value={location}>{location}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label>Experience</Label>
              <Select value={selectedExperience} onValueChange={setSelectedExperience}>
                <SelectTrigger className="bg-background/50">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {experienceLevels.map((level) => (
                    <SelectItem key={level} value={level}>{level}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label>Your Current Salary (Optional)</Label>
              <Input
                type="number"
                placeholder="e.g. 120000"
                value={customSalary}
                onChange={(e) => setCustomSalary(e.target.value)}
                className="bg-background/50"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Salary Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="glass-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Average Salary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gradient">{formatSalary(salaryData.averageSalary)}</div>
            <p className="text-xs text-muted-foreground mt-1">
              <TrendingUp className="inline h-3 w-3 mr-1" />
              +8% from last year
            </p>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Median Salary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatSalary(salaryData.medianSalary)}</div>
            <p className="text-xs text-muted-foreground mt-1">
              50th percentile
            </p>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Salary Range</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatSalary(salaryData.minSalary)} - {formatSalary(salaryData.maxSalary)}</div>
            <p className="text-xs text-muted-foreground mt-1">
              25th - 75th percentile
            </p>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Your Position</CardTitle>
          </CardHeader>
          <CardContent>
            {comparison ? (
              <>
                <div className={`text-2xl font-bold ${comparison.isAbove ? 'text-success' : 'text-warning'}`}>
                  {comparison.isAbove ? '+' : ''}{comparison.percentage}%
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  {comparison.isAbove ? 'Above' : 'Below'} market median
                </p>
              </>
            ) : (
              <>
                <div className="text-2xl font-bold text-muted-foreground">--</div>
                <p className="text-xs text-muted-foreground mt-1">
                  Enter your salary above
                </p>
              </>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Salary by Location */}
        <Card className="glass-card shadow-floating">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5 text-secondary" />
              Salary by Location (Cost-Adjusted)
            </CardTitle>
            <CardDescription>
              Salary data adjusted for cost of living differences
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={LOCATION_DATA}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="city" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <YAxis 
                  stroke="hsl(var(--muted-foreground))" 
                  fontSize={12}
                  tickFormatter={(value) => `$${(value / 1000).toFixed(0)}K`}
                />
                <Tooltip 
                  formatter={(value) => [formatSalary(value as number), "Adjusted Salary"]}
                  labelStyle={{ color: "hsl(var(--foreground))" }}
                  contentStyle={{ 
                    backgroundColor: "hsl(var(--popover))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "6px"
                  }}
                />
                <Bar dataKey="adjustedSalary" fill="hsl(var(--primary))" radius={4} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Salary Trends */}
        <Card className="glass-card shadow-floating">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-tertiary" />
              5-Year Salary Trend
            </CardTitle>
            <CardDescription>
              Historical salary growth for {selectedRole}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={TREND_DATA}>
                <defs>
                  <linearGradient id="salaryGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="year" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <YAxis 
                  stroke="hsl(var(--muted-foreground))" 
                  fontSize={12}
                  tickFormatter={(value) => `$${(value / 1000).toFixed(0)}K`}
                />
                <Tooltip 
                  formatter={(value) => [formatSalary(value as number), "Average Salary"]}
                  labelStyle={{ color: "hsl(var(--foreground))" }}
                  contentStyle={{ 
                    backgroundColor: "hsl(var(--popover))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "6px"
                  }}
                />
                <Area 
                  type="monotone" 
                  dataKey="salary" 
                  stroke="hsl(var(--primary))" 
                  fillOpacity={1} 
                  fill="url(#salaryGradient)"
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Skills Impact */}
      <Card className="glass-card shadow-floating">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Award className="h-5 w-5 text-primary" />
            Skills Impact on Salary
          </CardTitle>
          <CardDescription>
            How different skills can boost your earning potential
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              {SKILL_IMPACT_DATA.map((skill, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-background/30 border border-border">
                  <div className="flex items-center gap-3">
                    <div 
                      className="w-4 h-4 rounded-full"
                      style={{ backgroundColor: skill.color }}
                    />
                    <span className="font-medium">{skill.skill}</span>
                  </div>
                  <Badge variant="secondary" className="bg-gradient-primary">
                    +{formatSalary(skill.impact)}
                  </Badge>
                </div>
              ))}
            </div>
            
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={SKILL_IMPACT_DATA}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ skill, impact }) => `${skill}: ${formatSalary(impact)}`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="impact"
                  fontSize={10}
                >
                  {SKILL_IMPACT_DATA.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value) => [formatSalary(value as number), "Salary Impact"]}
                  contentStyle={{ 
                    backgroundColor: "hsl(var(--popover))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "6px"
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Market Intelligence */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5 text-success" />
              Negotiation Tips
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-start gap-3 p-3 rounded-lg bg-success/10 border border-success/20">
              <div className="w-2 h-2 rounded-full bg-success mt-2 flex-shrink-0" />
              <div>
                <h4 className="font-medium">Research Market Rates</h4>
                <p className="text-sm text-muted-foreground">You're currently {comparison?.isAbove ? 'above' : 'at'} market median</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3 p-3 rounded-lg bg-primary/10 border border-primary/20">
              <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
              <div>
                <h4 className="font-medium">Highlight Your Skills</h4>
                <p className="text-sm text-muted-foreground">AWS and Node.js skills can add $20K+ to your salary</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3 p-3 rounded-lg bg-warning/10 border border-warning/20">
              <div className="w-2 h-2 rounded-full bg-warning mt-2 flex-shrink-0" />
              <div>
                <h4 className="font-medium">Consider Remote Work</h4>
                <p className="text-sm text-muted-foreground">Remote positions often offer higher adjusted salaries</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5 text-info" />
              Market Insights
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 rounded-lg bg-gradient-primary/10 border border-primary/20">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Job Market Demand</span>
                <Badge className="bg-success">High</Badge>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div className="bg-success h-2 rounded-full" style={{ width: "85%" }} />
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                85% increase in job postings for {selectedRole} roles
              </p>
            </div>
            
            <div className="p-4 rounded-lg bg-gradient-secondary/10 border border-secondary/20">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Competition Level</span>
                <Badge variant="outline">Moderate</Badge>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div className="bg-warning h-2 rounded-full" style={{ width: "60%" }} />
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                Average 15 applications per position
              </p>
            </div>
            
            <div className="p-4 rounded-lg bg-gradient-card border border-border">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Salary Growth</span>
                <Badge className="bg-gradient-primary">+8% YoY</Badge>
              </div>
              <p className="text-xs text-muted-foreground">
                Salaries for {selectedRole} have grown 8% year-over-year
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SalaryInsights;