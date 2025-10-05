import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Upload, Loader2 } from "lucide-react";

interface ResumeUploadProps {
  onAnalysisComplete: (data: any) => void;
}

const ResumeUpload = ({ onAnalysisComplete }: ResumeUploadProps) => {
  const [file, setFile] = useState<File | null>(null);
  const [linkedinUrl, setLinkedinUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const extractTextFromFile = async (file: File): Promise<string> => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        resolve(e.target?.result as string);
      };
      reader.readAsText(file);
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) {
      toast({ title: "Please select a resume file", variant: "destructive" });
      return;
    }

    setLoading(true);

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      // Upload file to storage
      const fileName = `${user.id}/${Date.now()}-${file.name}`;
      const { error: uploadError } = await supabase.storage
        .from('resumes')
        .upload(fileName, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('resumes')
        .getPublicUrl(fileName);

      // Extract text from file
      const resumeText = await extractTextFromFile(file);

      // Call AI analysis function
      const { data: analysisData, error: functionError } = await supabase.functions.invoke(
        'analyze-resume',
        {
          body: {
            resumeText,
            linkedinProfile: linkedinUrl,
          },
        }
      );

      if (functionError) throw functionError;

      // Save to database
      const { error: dbError } = await supabase
        .from('resumes')
        .insert({
          user_id: user.id,
          file_name: file.name,
          file_url: publicUrl,
          resume_text: resumeText,
          analysis_data: analysisData,
          ats_score: analysisData.atsScore,
        });

      if (dbError) throw dbError;

      toast({ title: "Resume analyzed successfully!" });
      onAnalysisComplete(analysisData);
    } catch (error: any) {
      console.error('Upload error:', error);
      toast({
        title: "Error analyzing resume",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="bg-gradient-card backdrop-blur-xl border-primary/20 shadow-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Upload className="h-5 w-5 text-primary" />
          Upload Resume
        </CardTitle>
        <CardDescription>
          Upload your resume and LinkedIn profile for AI-powered analysis
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="resume">Resume (PDF, DOC, TXT)</Label>
            <Input
              id="resume"
              type="file"
              accept=".pdf,.doc,.docx,.txt"
              onChange={handleFileChange}
              className="bg-background/50 cursor-pointer"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="linkedin">LinkedIn Profile URL (Optional)</Label>
            <Textarea
              id="linkedin"
              placeholder="https://linkedin.com/in/yourprofile or paste your profile text"
              value={linkedinUrl}
              onChange={(e) => setLinkedinUrl(e.target.value)}
              className="bg-background/50 min-h-[100px]"
            />
          </div>
          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-primary hover:opacity-90 transition-opacity"
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Analyzing...
              </>
            ) : (
              "Analyze Resume"
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default ResumeUpload;