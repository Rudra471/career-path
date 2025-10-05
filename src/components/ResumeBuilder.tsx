import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  FileText, 
  Download, 
  Eye, 
  Plus, 
  Trash2, 
  Sparkles, 
  Palette, 
  Save,
  Copy 
} from "lucide-react";

interface PersonalInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  location: string;
  website: string;
  summary: string;
}

interface Experience {
  id: string;
  company: string;
  position: string;
  location: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string[];
}

interface Education {
  id: string;
  institution: string;
  degree: string;
  field: string;
  startDate: string;
  endDate: string;
  gpa?: string;
}

interface ResumeData {
  personalInfo: PersonalInfo;
  experiences: Experience[];
  education: Education[];
  skills: string[];
  certifications: string[];
}

const TEMPLATES = [
  { id: "modern", name: "Modern", preview: "/templates/modern.png" },
  { id: "classic", name: "Classic", preview: "/templates/classic.png" },
  { id: "creative", name: "Creative", preview: "/templates/creative.png" },
  { id: "minimal", name: "Minimal", preview: "/templates/minimal.png" }
];

const ResumeBuilder = () => {
  const [selectedTemplate, setSelectedTemplate] = useState("modern");
  const [resumeData, setResumeData] = useState<ResumeData>({
    personalInfo: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      location: "",
      website: "",
      summary: ""
    },
    experiences: [],
    education: [],
    skills: [],
    certifications: []
  });

  const [newSkill, setNewSkill] = useState("");
  const [newCertification, setNewCertification] = useState("");

  const updatePersonalInfo = (field: keyof PersonalInfo, value: string) => {
    setResumeData(prev => ({
      ...prev,
      personalInfo: {
        ...prev.personalInfo,
        [field]: value
      }
    }));
  };

  const addExperience = () => {
    const newExp: Experience = {
      id: Date.now().toString(),
      company: "",
      position: "",
      location: "",
      startDate: "",
      endDate: "",
      current: false,
      description: [""]
    };
    setResumeData(prev => ({
      ...prev,
      experiences: [...prev.experiences, newExp]
    }));
  };

  const updateExperience = (id: string, field: keyof Experience, value: any) => {
    setResumeData(prev => ({
      ...prev,
      experiences: prev.experiences.map(exp => 
        exp.id === id ? { ...exp, [field]: value } : exp
      )
    }));
  };

  const removeExperience = (id: string) => {
    setResumeData(prev => ({
      ...prev,
      experiences: prev.experiences.filter(exp => exp.id !== id)
    }));
  };

  const addEducation = () => {
    const newEdu: Education = {
      id: Date.now().toString(),
      institution: "",
      degree: "",
      field: "",
      startDate: "",
      endDate: "",
      gpa: ""
    };
    setResumeData(prev => ({
      ...prev,
      education: [...prev.education, newEdu]
    }));
  };

  const updateEducation = (id: string, field: keyof Education, value: string) => {
    setResumeData(prev => ({
      ...prev,
      education: prev.education.map(edu => 
        edu.id === id ? { ...edu, [field]: value } : edu
      )
    }));
  };

  const removeEducation = (id: string) => {
    setResumeData(prev => ({
      ...prev,
      education: prev.education.filter(edu => edu.id !== id)
    }));
  };

  const addSkill = () => {
    if (newSkill.trim()) {
      setResumeData(prev => ({
        ...prev,
        skills: [...prev.skills, newSkill.trim()]
      }));
      setNewSkill("");
    }
  };

  const removeSkill = (index: number) => {
    setResumeData(prev => ({
      ...prev,
      skills: prev.skills.filter((_, i) => i !== index)
    }));
  };

  const addCertification = () => {
    if (newCertification.trim()) {
      setResumeData(prev => ({
        ...prev,
        certifications: [...prev.certifications, newCertification.trim()]
      }));
      setNewCertification("");
    }
  };

  const removeCertification = (index: number) => {
    setResumeData(prev => ({
      ...prev,
      certifications: prev.certifications.filter((_, i) => i !== index)
    }));
  };

  const generateAISuggestions = async () => {
    // Mock AI suggestions
    const suggestions = [
      "Quantify your achievements with specific numbers and percentages",
      "Use strong action verbs to start each bullet point",
      "Tailor your summary to match the job description keywords",
      "Include relevant certifications and training"
    ];
    
    alert("AI Suggestions:\n" + suggestions.join("\n"));
  };

  return (
    <div className="space-y-6">
      <Card className="glass-card shadow-floating">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-6 w-6 text-primary" />
            Resume Builder
          </CardTitle>
          <CardDescription>
            Create a professional resume with AI-powered suggestions and multiple templates
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2 mb-6">
            <Button variant="outline" onClick={generateAISuggestions} className="gap-2">
              <Sparkles className="h-4 w-4" />
              AI Suggestions
            </Button>
            <Button variant="outline" className="gap-2">
              <Eye className="h-4 w-4" />
              Preview
            </Button>
            <Button variant="outline" className="gap-2">
              <Download className="h-4 w-4" />
              Download PDF
            </Button>
            <Button variant="outline" className="gap-2">
              <Save className="h-4 w-4" />
              Save Draft
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Form Section */}
        <div className="lg:col-span-2 space-y-6">
          <Tabs defaultValue="personal" className="w-full">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="personal">Personal</TabsTrigger>
              <TabsTrigger value="experience">Experience</TabsTrigger>
              <TabsTrigger value="education">Education</TabsTrigger>
              <TabsTrigger value="skills">Skills</TabsTrigger>
              <TabsTrigger value="templates">Templates</TabsTrigger>
            </TabsList>
            
            {/* Personal Info Tab */}
            <TabsContent value="personal" className="space-y-4">
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle>Personal Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName">First Name</Label>
                      <Input
                        id="firstName"
                        value={resumeData.personalInfo.firstName}
                        onChange={(e) => updatePersonalInfo("firstName", e.target.value)}
                        className="bg-background/50"
                      />
                    </div>
                    <div>
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input
                        id="lastName"
                        value={resumeData.personalInfo.lastName}
                        onChange={(e) => updatePersonalInfo("lastName", e.target.value)}
                        className="bg-background/50"
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={resumeData.personalInfo.email}
                        onChange={(e) => updatePersonalInfo("email", e.target.value)}
                        className="bg-background/50"
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone">Phone</Label>
                      <Input
                        id="phone"
                        value={resumeData.personalInfo.phone}
                        onChange={(e) => updatePersonalInfo("phone", e.target.value)}
                        className="bg-background/50"
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="location">Location</Label>
                      <Input
                        id="location"
                        value={resumeData.personalInfo.location}
                        onChange={(e) => updatePersonalInfo("location", e.target.value)}
                        className="bg-background/50"
                      />
                    </div>
                    <div>
                      <Label htmlFor="website">Website/Portfolio</Label>
                      <Input
                        id="website"
                        value={resumeData.personalInfo.website}
                        onChange={(e) => updatePersonalInfo("website", e.target.value)}
                        className="bg-background/50"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="summary">Professional Summary</Label>
                    <Textarea
                      id="summary"
                      value={resumeData.personalInfo.summary}
                      onChange={(e) => updatePersonalInfo("summary", e.target.value)}
                      className="bg-background/50 min-h-24"
                      placeholder="Write a compelling summary of your professional background..."
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            {/* Experience Tab */}
            <TabsContent value="experience" className="space-y-4">
              <Card className="glass-card">
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle>Work Experience</CardTitle>
                  <Button onClick={addExperience} size="sm" className="gap-2">
                    <Plus className="h-4 w-4" />
                    Add Experience
                  </Button>
                </CardHeader>
                <CardContent className="space-y-6">
                  {resumeData.experiences.map((exp, index) => (
                    <div key={exp.id} className="p-4 rounded-lg border border-border bg-background/30 space-y-4">
                      <div className="flex justify-between items-start">
                        <h4 className="font-medium">Experience {index + 1}</h4>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeExperience(exp.id)}
                          className="text-destructive hover:text-destructive"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label>Company</Label>
                          <Input
                            value={exp.company}
                            onChange={(e) => updateExperience(exp.id, "company", e.target.value)}
                            className="bg-background/50"
                          />
                        </div>
                        <div>
                          <Label>Position</Label>
                          <Input
                            value={exp.position}
                            onChange={(e) => updateExperience(exp.id, "position", e.target.value)}
                            className="bg-background/50"
                          />
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-3 gap-4">
                        <div>
                          <Label>Location</Label>
                          <Input
                            value={exp.location}
                            onChange={(e) => updateExperience(exp.id, "location", e.target.value)}
                            className="bg-background/50"
                          />
                        </div>
                        <div>
                          <Label>Start Date</Label>
                          <Input
                            type="month"
                            value={exp.startDate}
                            onChange={(e) => updateExperience(exp.id, "startDate", e.target.value)}
                            className="bg-background/50"
                          />
                        </div>
                        <div>
                          <Label>End Date</Label>
                          <Input
                            type="month"
                            value={exp.endDate}
                            onChange={(e) => updateExperience(exp.id, "endDate", e.target.value)}
                            className="bg-background/50"
                            disabled={exp.current}
                            placeholder={exp.current ? "Present" : ""}
                          />
                        </div>
                      </div>
                      
                      <div>
                        <Label>Description</Label>
                        <Textarea
                          value={exp.description.join('\n')}
                          onChange={(e) => updateExperience(exp.id, "description", e.target.value.split('\n'))}
                          className="bg-background/50 min-h-20"
                          placeholder="• Describe your achievements and responsibilities..."
                        />
                      </div>
                    </div>
                  ))}
                  
                  {resumeData.experiences.length === 0 && (
                    <div className="text-center py-8 text-muted-foreground">
                      No work experience added yet. Click "Add Experience" to get started.
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
            
            {/* Skills Tab */}
            <TabsContent value="skills" className="space-y-4">
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle>Skills & Certifications</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <Label>Technical Skills</Label>
                    <div className="flex gap-2 mt-2">
                      <Input
                        value={newSkill}
                        onChange={(e) => setNewSkill(e.target.value)}
                        placeholder="Add a skill..."
                        className="bg-background/50"
                        onKeyPress={(e) => e.key === 'Enter' && addSkill()}
                      />
                      <Button onClick={addSkill} size="sm">
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="flex flex-wrap gap-2 mt-3">
                      {resumeData.skills.map((skill, index) => (
                        <Badge key={index} variant="secondary" className="gap-1">
                          {skill}
                          <button
                            onClick={() => removeSkill(index)}
                            className="ml-1 hover:text-destructive"
                          >
                            ×
                          </button>
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <Label>Certifications</Label>
                    <div className="flex gap-2 mt-2">
                      <Input
                        value={newCertification}
                        onChange={(e) => setNewCertification(e.target.value)}
                        placeholder="Add a certification..."
                        className="bg-background/50"
                        onKeyPress={(e) => e.key === 'Enter' && addCertification()}
                      />
                      <Button onClick={addCertification} size="sm">
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="space-y-2 mt-3">
                      {resumeData.certifications.map((cert, index) => (
                        <div key={index} className="flex items-center justify-between p-2 rounded border border-border bg-background/30">
                          <span>{cert}</span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeCertification(index)}
                            className="text-destructive hover:text-destructive"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            {/* Templates Tab */}
            <TabsContent value="templates" className="space-y-4">
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Palette className="h-5 w-5" />
                    Choose Template
                  </CardTitle>
                  <CardDescription>
                    Select a template that matches your industry and personal style
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    {TEMPLATES.map((template) => (
                      <div
                        key={template.id}
                        className={`p-4 rounded-lg border-2 cursor-pointer transition-all hover:scale-105 ${
                          selectedTemplate === template.id
                            ? "border-primary bg-primary/10"
                            : "border-border bg-background/30"
                        }`}
                        onClick={() => setSelectedTemplate(template.id)}
                      >
                        <div className="aspect-[8.5/11] bg-muted rounded mb-2 flex items-center justify-center">
                          <span className="text-muted-foreground text-sm">Preview</span>
                        </div>
                        <h4 className="font-medium text-center">{template.name}</h4>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Preview Section */}
        <div className="space-y-6">
          <Card className="glass-card shadow-floating sticky top-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Eye className="h-5 w-5" />
                Live Preview
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="aspect-[8.5/11] bg-white text-black p-4 rounded shadow-lg text-xs overflow-hidden">
                <div className="space-y-4">
                  {/* Header */}
                  <div className="text-center border-b pb-2">
                    <h1 className="text-lg font-bold">
                      {resumeData.personalInfo.firstName} {resumeData.personalInfo.lastName}
                    </h1>
                    <div className="text-xs text-gray-600 space-y-1">
                      <div>{resumeData.personalInfo.email}</div>
                      <div>{resumeData.personalInfo.phone} • {resumeData.personalInfo.location}</div>
                      {resumeData.personalInfo.website && <div>{resumeData.personalInfo.website}</div>}
                    </div>
                  </div>
                  
                  {/* Summary */}
                  {resumeData.personalInfo.summary && (
                    <div>
                      <h2 className="font-semibold text-sm border-b mb-1">SUMMARY</h2>
                      <p className="text-xs">{resumeData.personalInfo.summary}</p>
                    </div>
                  )}
                  
                  {/* Experience */}
                  {resumeData.experiences.length > 0 && (
                    <div>
                      <h2 className="font-semibold text-sm border-b mb-1">EXPERIENCE</h2>
                      <div className="space-y-2">
                        {resumeData.experiences.map((exp) => (
                          <div key={exp.id}>
                            <div className="flex justify-between">
                              <h3 className="font-medium text-xs">{exp.position}</h3>
                              <span className="text-xs text-gray-600">{exp.startDate} - {exp.current ? "Present" : exp.endDate}</span>
                            </div>
                            <div className="text-xs text-gray-700">{exp.company}, {exp.location}</div>
                            {exp.description[0] && (
                              <ul className="text-xs mt-1 space-y-0.5">
                                {exp.description.slice(0, 2).map((item, i) => (
                                  <li key={i}>• {item}</li>
                                ))}
                              </ul>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {/* Skills */}
                  {resumeData.skills.length > 0 && (
                    <div>
                      <h2 className="font-semibold text-sm border-b mb-1">SKILLS</h2>
                      <div className="text-xs">{resumeData.skills.join(", ")}</div>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="mt-4 flex gap-2">
                <Button size="sm" className="flex-1 gap-2">
                  <Download className="h-4 w-4" />
                  Export PDF
                </Button>
                <Button variant="outline" size="sm" className="gap-2">
                  <Copy className="h-4 w-4" />
                  Copy Link
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ResumeBuilder;