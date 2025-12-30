import { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  ClipboardCheck,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Server,
  Code,
  Cloud,
  Shield,
  Database,
  Network,
  TestTube,
  Settings,
  HelpCircle,
  Star,
  Users,
  BookOpen,
  Award,
  Beaker,
} from "lucide-react";

const primaryInterests = [
  { id: "it-admin", label: "IT Administration & Operations", icon: Server },
  { id: "programming", label: "Programming / Software Development", icon: Code },
  { id: "cloud-devops", label: "Cloud & DevOps Engineering", icon: Cloud },
  { id: "security", label: "Cybersecurity", icon: Shield },
  { id: "data-ai", label: "Data, AI & Analytics", icon: Database },
  { id: "networking", label: "Networking & Infrastructure", icon: Network },
  { id: "qa-testing", label: "QA / Testing & Automation", icon: TestTube },
  { id: "itsm", label: "IT Service Management (ITSM)", icon: Settings },
  { id: "not-sure", label: "Not Sure (Guide Me)", icon: HelpCircle },
];

const specializationsByPath: Record<string, { id: string; label: string }[]> = {
  "it-admin": [
    { id: "windows", label: "Windows Administration" },
    { id: "linux", label: "Linux Administration" },
    { id: "hybrid", label: "Hybrid (Windows + Linux)" },
    { id: "cloud-admin", label: "Cloud Administration" },
    { id: "euc", label: "End-User / EUC Administration" },
  ],
  "programming": [
    { id: "web", label: "Web Applications" },
    { id: "backend", label: "Backend APIs" },
    { id: "mobile", label: "Mobile Applications" },
    { id: "automation", label: "Automation / Scripting" },
    { id: "cloud-native", label: "Cloud-Native Applications" },
  ],
  "cloud-devops": [
    { id: "cloud-engineer", label: "Cloud Engineer" },
    { id: "devops-engineer", label: "DevOps Engineer" },
    { id: "sre", label: "Site Reliability Engineer" },
    { id: "platform-engineer", label: "Platform Engineer" },
  ],
  "security": [
    { id: "soc", label: "SOC / Blue Team" },
    { id: "red-team", label: "Ethical Hacking / Red Team" },
    { id: "cloud-security", label: "Cloud Security" },
    { id: "iam", label: "IAM & Zero Trust" },
    { id: "grc", label: "GRC & Compliance" },
  ],
  "data-ai": [
    { id: "data-analyst", label: "Data Analyst" },
    { id: "data-engineer", label: "Data Engineer" },
    { id: "ml-engineer", label: "Machine Learning Engineer" },
    { id: "genai", label: "Generative AI Engineer" },
  ],
};

const cloudOptions = [
  { id: "aws", label: "AWS" },
  { id: "azure", label: "Azure" },
  { id: "gcp", label: "GCP" },
  { id: "multi", label: "Multi-Cloud" },
  { id: "not-now", label: "Not now" },
];

export default function AssessmentPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [selections, setSelections] = useState<{
    primaryPath?: string;
    specialization?: string;
    cloudPreference?: string;
  }>({});
  const [showResults, setShowResults] = useState(false);

  const handleSelect = (key: string, value: string) => {
    setSelections({ ...selections, [key]: value });
  };

  const handleNext = () => {
    if (currentStep < 2) {
      setCurrentStep(currentStep + 1);
    } else {
      setShowResults(true);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const progress = ((currentStep + 1) / 3) * 100;

  const getRecommendation = () => {
    const path = selections.primaryPath;
    const spec = selections.specialization;
    const cloud = selections.cloudPreference;

    return {
      careerTitle: `${spec?.replace(/-/g, " ")} Specialist`,
      skills: ["Linux", "Docker", "Kubernetes", "Terraform", "CI/CD"],
      tools: ["VS Code", "Git", "Jenkins", "Ansible", "Prometheus"],
      cloudPlatform: cloud === "not-now" ? "AWS (Recommended)" : cloud?.toUpperCase(),
      certifications: ["AWS Solutions Architect", "CKA", "Terraform Associate"],
    };
  };

  if (showResults) {
    const rec = getRecommendation();
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="pt-24 pb-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8 animate-fade-in-up">
              <div className="w-16 h-16 rounded-full bg-success/10 flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 className="w-8 h-8 text-success" />
              </div>
              <h1 className="text-3xl font-bold text-foreground mb-2">Your Career Path Recommendation</h1>
              <p className="text-muted-foreground">Based on your selections, here's your personalized roadmap</p>
            </div>

            <div className="grid gap-6">
              <Card className="animate-fade-in-up" style={{ animationDelay: "100ms" }}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Star className="w-5 h-5 text-secondary" />
                    Recommended Career Path
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-primary capitalize">{rec.careerTitle}</div>
                </CardContent>
              </Card>

              <div className="grid md:grid-cols-2 gap-6">
                <Card className="animate-fade-in-up" style={{ animationDelay: "200ms" }}>
                  <CardHeader>
                    <CardTitle className="text-lg">Key Skills to Learn</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {rec.skills.map((skill) => (
                        <Badge key={skill} variant="outline">{skill}</Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card className="animate-fade-in-up" style={{ animationDelay: "300ms" }}>
                  <CardHeader>
                    <CardTitle className="text-lg">Tools & Technologies</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {rec.tools.map((tool) => (
                        <Badge key={tool} variant="secondary">{tool}</Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card className="animate-fade-in-up" style={{ animationDelay: "400ms" }}>
                <CardHeader>
                  <CardTitle className="text-lg">Recommended Certifications</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {rec.certifications.map((cert, i) => (
                      <div key={cert} className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-sm font-bold text-primary">
                          {i + 1}
                        </div>
                        <span>{cert}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="animate-fade-in-up bg-primary/5 border-primary/20" style={{ animationDelay: "500ms" }}>
                <CardHeader>
                  <CardTitle className="text-lg">Recommended Next Steps</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid sm:grid-cols-3 gap-4">
                    <Button className="h-auto py-4 flex-col gap-2" asChild>
                      <a href="/courses">
                        <BookOpen className="w-5 h-5" />
                        Start a Course
                      </a>
                    </Button>
                    <Button variant="outline" className="h-auto py-4 flex-col gap-2" asChild>
                      <a href="/labs">
                        <Beaker className="w-5 h-5" />
                        Try a Lab
                      </a>
                    </Button>
                    <Button variant="outline" className="h-auto py-4 flex-col gap-2" asChild>
                      <a href="/certification">
                        <Award className="w-5 h-5" />
                        Certification Prep
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="text-center mt-8">
              <Button variant="ghost" onClick={() => { setShowResults(false); setCurrentStep(0); setSelections({}); }}>
                <ArrowLeft className="w-4 h-4 mr-2" /> Take Assessment Again
              </Button>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <ClipboardCheck className="w-6 h-6 text-primary" />
              </div>
            </div>
            <Badge className="mb-3 bg-secondary/10 text-secondary border-secondary/20">
              Benchmark Your Brilliance
            </Badge>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
              Technology Readiness Assessment
            </h1>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Let us guide you to the right career path—step by step.
            </p>
          </div>

          {/* Progress */}
          <div className="mb-8">
            <div className="flex justify-between text-sm text-muted-foreground mb-2">
              <span>Step {currentStep + 1} of 3</span>
              <span>{Math.round(progress)}% Complete</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>

          {/* Step Content */}
          <Card className="animate-fade-in">
            <CardContent className="p-6">
              {currentStep === 0 && (
                <div>
                  <h2 className="text-xl font-semibold text-foreground mb-4">
                    Step 1: Choose Your Primary Interest
                  </h2>
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {primaryInterests.map((item) => {
                      const Icon = item.icon;
                      const isSelected = selections.primaryPath === item.id;
                      return (
                        <button
                          key={item.id}
                          onClick={() => handleSelect("primaryPath", item.id)}
                          className={`p-4 rounded-lg border-2 text-left transition-all ${
                            isSelected
                              ? "border-primary bg-primary/5"
                              : "border-border hover:border-primary/50"
                          }`}
                        >
                          <Icon className={`w-5 h-5 mb-2 ${isSelected ? "text-primary" : "text-muted-foreground"}`} />
                          <div className={`font-medium ${isSelected ? "text-primary" : "text-foreground"}`}>
                            {item.label}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {currentStep === 1 && (
                <div>
                  <h2 className="text-xl font-semibold text-foreground mb-4">
                    Step 2: Choose Your Specialization
                  </h2>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {(specializationsByPath[selections.primaryPath || ""] || []).map((item) => {
                      const isSelected = selections.specialization === item.id;
                      return (
                        <button
                          key={item.id}
                          onClick={() => handleSelect("specialization", item.id)}
                          className={`p-4 rounded-lg border-2 text-left transition-all ${
                            isSelected
                              ? "border-primary bg-primary/5"
                              : "border-border hover:border-primary/50"
                          }`}
                        >
                          <div className={`font-medium ${isSelected ? "text-primary" : "text-foreground"}`}>
                            {item.label}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {currentStep === 2 && (
                <div>
                  <h2 className="text-xl font-semibold text-foreground mb-4">
                    Step 3: Cloud Platform Preference
                  </h2>
                  <p className="text-muted-foreground mb-4">
                    Do you want to add Cloud skills to your learning path?
                  </p>
                  <div className="grid sm:grid-cols-3 gap-3">
                    {cloudOptions.map((item) => {
                      const isSelected = selections.cloudPreference === item.id;
                      return (
                        <button
                          key={item.id}
                          onClick={() => handleSelect("cloudPreference", item.id)}
                          className={`p-4 rounded-lg border-2 text-center transition-all ${
                            isSelected
                              ? "border-primary bg-primary/5"
                              : "border-border hover:border-primary/50"
                          }`}
                        >
                          <div className={`font-medium ${isSelected ? "text-primary" : "text-foreground"}`}>
                            {item.label}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Navigation */}
          <div className="flex justify-between mt-6">
            <Button
              variant="ghost"
              onClick={handleBack}
              disabled={currentStep === 0}
            >
              <ArrowLeft className="w-4 h-4 mr-2" /> Back
            </Button>
            <Button
              onClick={handleNext}
              disabled={
                (currentStep === 0 && !selections.primaryPath) ||
                (currentStep === 1 && !selections.specialization) ||
                (currentStep === 2 && !selections.cloudPreference)
              }
            >
              {currentStep === 2 ? "Get Recommendations" : "Next"} <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
