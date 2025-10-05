import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { User } from "@supabase/supabase-js";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { AnimatedSection, HoverAnimation } from "@/components/ui/animated-components";
import { 
  LogOut, 
  User as UserIcon, 
  ArrowLeft, 
  Camera, 
  Save, 
  Mail, 
  Phone, 
  MapPin, 
  Globe,
  Edit3,
  CheckCircle
} from "lucide-react";
import { motion } from "framer-motion";

interface UserProfile {
  id: string;
  full_name: string;
  email: string;
  phone?: string;
  location?: string;
  website?: string;
  bio?: string;
  avatar_url?: string;
  job_title?: string;
  company?: string;
  linkedin_url?: string;
  github_url?: string;
}

const Profile = () => {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate("/auth");
        return;
      }
      setUser(session.user);
      await loadProfile(session.user.id);
      setLoading(false);
    };

    checkUser();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session) {
        navigate("/auth");
      } else {
        setUser(session.user);
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const loadProfile = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (error && error.code !== 'PGRST116') { // PGRST116 means no rows returned
        throw error;
      }

      if (data) {
        setProfile(data);
      } else {
        // Create initial profile
        const { data: newProfile, error: createError } = await supabase
          .from('user_profiles')
          .insert({
            id: userId,
            full_name: user?.user_metadata?.full_name || '',
            email: user?.email || ''
          })
          .select()
          .single();

        if (createError) throw createError;
        setProfile(newProfile);
      }
    } catch (error: any) {
      console.error('Error loading profile:', error);
      toast({
        title: "Error loading profile",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    toast({ title: "Logged out successfully" });
    navigate("/");
  };

  const handleSaveProfile = async () => {
    if (!profile || !user) return;

    setSaving(true);
    try {
      const { error } = await supabase
        .from('user_profiles')
        .upsert({
          id: user.id,
          ...profile,
          updated_at: new Date().toISOString()
        });

      if (error) throw error;

      toast({ 
        title: "Profile updated successfully!",
        description: "Your changes have been saved."
      });
      setIsEditing(false);
    } catch (error: any) {
      console.error('Error saving profile:', error);
      toast({
        title: "Error saving profile",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  const updateProfile = (field: keyof UserProfile, value: string) => {
    if (profile) {
      setProfile({ ...profile, [field]: value });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <motion.div 
          className="animate-pulse text-lg"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          Loading your profile...
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-xl sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate("/dashboard")}
              className="gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Dashboard
            </Button>
            
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-lg bg-gradient-primary">
                <UserIcon className="h-6 w-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                  Profile Settings
                </h1>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Button variant="outline" onClick={handleLogout} className="gap-2">
              <LogOut className="h-4 w-4" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <AnimatedSection className="max-w-4xl mx-auto space-y-8">
          {/* Profile Header */}
          <Card className="glass-card shadow-floating">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-2xl">Personal Information</CardTitle>
                  <CardDescription>
                    Manage your profile details and preferences
                  </CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  {isEditing ? (
                    <>
                      <Button
                        variant="outline"
                        onClick={() => setIsEditing(false)}
                        disabled={saving}
                      >
                        Cancel
                      </Button>
                      <HoverAnimation>
                        <Button
                          onClick={handleSaveProfile}
                          disabled={saving}
                          className="bg-gradient-primary hover:opacity-90 gap-2"
                        >
                          {saving ? (
                            <motion.div 
                              className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
                              animate={{ rotate: 360 }}
                              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                            />
                          ) : (
                            <Save className="h-4 w-4" />
                          )}
                          Save Changes
                        </Button>
                      </HoverAnimation>
                    </>
                  ) : (
                    <HoverAnimation>
                      <Button
                        onClick={() => setIsEditing(true)}
                        className="gap-2"
                      >
                        <Edit3 className="h-4 w-4" />
                        Edit Profile
                      </Button>
                    </HoverAnimation>
                  )}
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Avatar Section */}
              <div className="flex items-center gap-6">
                <div className="relative">
                  <motion.div
                    className="w-24 h-24 rounded-full bg-gradient-primary flex items-center justify-center text-white text-2xl font-bold"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.2 }}
                  >
                    {profile?.avatar_url ? (
                      <img
                        src={profile.avatar_url}
                        alt="Profile"
                        className="w-full h-full rounded-full object-cover"
                      />
                    ) : (
                      profile?.full_name?.charAt(0)?.toUpperCase() || user?.email?.charAt(0)?.toUpperCase() || 'U'
                    )}
                  </motion.div>
                  {isEditing && (
                    <motion.button
                      className="absolute -bottom-2 -right-2 p-2 bg-primary text-primary-foreground rounded-full shadow-lg hover:bg-primary/90 transition-colors"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <Camera className="h-4 w-4" />
                    </motion.button>
                  )}
                </div>
                <div>
                  <h3 className="text-xl font-semibold">{profile?.full_name || 'User'}</h3>
                  <p className="text-muted-foreground">{profile?.job_title || 'No job title set'}</p>
                  {profile?.company && (
                    <p className="text-sm text-muted-foreground">@ {profile.company}</p>
                  )}
                </div>
              </div>

              {/* Profile Form */}
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="full_name">Full Name</Label>
                    <Input
                      id="full_name"
                      value={profile?.full_name || ''}
                      onChange={(e) => updateProfile('full_name', e.target.value)}
                      disabled={!isEditing}
                      className="bg-background/50"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="email"
                        type="email"
                        value={profile?.email || ''}
                        onChange={(e) => updateProfile('email', e.target.value)}
                        disabled={!isEditing}
                        className="bg-background/50 pl-10"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="phone">Phone</Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="phone"
                        value={profile?.phone || ''}
                        onChange={(e) => updateProfile('phone', e.target.value)}
                        disabled={!isEditing}
                        className="bg-background/50 pl-10"
                        placeholder="+1 (555) 123-4567"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="location">Location</Label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="location"
                        value={profile?.location || ''}
                        onChange={(e) => updateProfile('location', e.target.value)}
                        disabled={!isEditing}
                        className="bg-background/50 pl-10"
                        placeholder="City, Country"
                      />
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="job_title">Job Title</Label>
                    <Input
                      id="job_title"
                      value={profile?.job_title || ''}
                      onChange={(e) => updateProfile('job_title', e.target.value)}
                      disabled={!isEditing}
                      className="bg-background/50"
                      placeholder="e.g., Senior Software Engineer"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="company">Company</Label>
                    <Input
                      id="company"
                      value={profile?.company || ''}
                      onChange={(e) => updateProfile('company', e.target.value)}
                      disabled={!isEditing}
                      className="bg-background/50"
                      placeholder="e.g., Tech Corp"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="website">Website</Label>
                    <div className="relative">
                      <Globe className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="website"
                        value={profile?.website || ''}
                        onChange={(e) => updateProfile('website', e.target.value)}
                        disabled={!isEditing}
                        className="bg-background/50 pl-10"
                        placeholder="https://yourwebsite.com"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="linkedin_url">LinkedIn URL</Label>
                    <Input
                      id="linkedin_url"
                      value={profile?.linkedin_url || ''}
                      onChange={(e) => updateProfile('linkedin_url', e.target.value)}
                      disabled={!isEditing}
                      className="bg-background/50"
                      placeholder="https://linkedin.com/in/username"
                    />
                  </div>
                </div>
              </div>
              
              {/* Bio Section */}
              <div>
                <Label htmlFor="bio">Bio</Label>
                <Textarea
                  id="bio"
                  value={profile?.bio || ''}
                  onChange={(e) => updateProfile('bio', e.target.value)}
                  disabled={!isEditing}
                  className="bg-background/50 min-h-24"
                  placeholder="Tell us about yourself..."
                />
              </div>
            </CardContent>
          </Card>

          {/* Account Settings */}
          <Card className="glass-card shadow-floating">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-success" />
                Account Status
              </CardTitle>
              <CardDescription>
                Your account information and preferences
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="p-4 rounded-lg bg-success/10 border border-success/20">
                    <h4 className="font-medium text-success">Account Active</h4>
                    <p className="text-sm text-muted-foreground">
                      Your account is in good standing
                    </p>
                  </div>
                  
                  <div className="p-4 rounded-lg bg-primary/10 border border-primary/20">
                    <h4 className="font-medium">Member since</h4>
                    <p className="text-sm text-muted-foreground">
                      {user?.created_at ? new Date(user.created_at).toLocaleDateString() : 'Unknown'}
                    </p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="p-4 rounded-lg bg-background/30 border border-border">
                    <h4 className="font-medium">Email Verification</h4>
                    <p className="text-sm text-muted-foreground">
                      {user?.email_confirmed_at ? (
                        <span className="text-success">✓ Verified</span>
                      ) : (
                        <span className="text-warning">⚠ Pending verification</span>
                      )}
                    </p>
                  </div>
                  
                  <div className="p-4 rounded-lg bg-background/30 border border-border">
                    <h4 className="font-medium">Last Login</h4>
                    <p className="text-sm text-muted-foreground">
                      {user?.last_sign_in_at ? new Date(user.last_sign_in_at).toLocaleString() : 'Unknown'}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </AnimatedSection>
      </main>
    </div>
  );
};

export default Profile;