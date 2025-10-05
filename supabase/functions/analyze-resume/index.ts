import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { resumeText, linkedinProfile } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
    
    if (!LOVABLE_API_KEY) {
      throw new Error('LOVABLE_API_KEY is not configured');
    }

    const systemPrompt = `You are an expert career advisor and resume analyzer. Analyze the provided resume and LinkedIn profile to:
1. Calculate an ATS (Applicant Tracking System) score (0-100) based on formatting, keywords, and structure
2. Identify key skills and categorize them by proficiency level (Beginner, Intermediate, Advanced, Expert)
3. Recommend 5 best-fit job titles based on the candidate's experience
4. Identify skill gaps for target roles
5. Generate a personalized learning roadmap with specific resources

Respond ONLY with valid JSON in this exact format:
{
  "atsScore": number,
  "skills": [{"name": string, "level": string, "yearsExperience": number}],
  "jobRecommendations": [{"title": string, "matchScore": number, "requiredSkills": string[], "company": string, "location": string}],
  "skillGaps": [{"skill": string, "currentLevel": string, "targetLevel": string, "priority": string}],
  "learningPath": [{"skill": string, "resources": [{"title": string, "url": string, "type": string}], "estimatedHours": number, "priority": string}]
}`;

    const userPrompt = `Resume:\n${resumeText}\n\nLinkedIn Profile:\n${linkedinProfile || 'Not provided'}`;

    const response = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${LOVABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt }
        ],
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('AI API Error:', response.status, errorText);
      throw new Error(`AI API error: ${response.status}`);
    }

    const data = await response.json();
    const analysisText = data.choices[0].message.content;
    
    // Parse JSON from response
    const jsonMatch = analysisText.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error('Failed to parse AI response');
    }
    
    const analysis = JSON.parse(jsonMatch[0]);

    return new Response(
      JSON.stringify(analysis),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error in analyze-resume function:', error);
    return new Response(
      JSON.stringify({ 
        error: error instanceof Error ? error.message : 'Unknown error occurred',
        details: error 
      }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  }
});