import { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import {
  Briefcase,
  FileText,
  MessageSquare,
  Target,
  BookOpen,
  Star,
  Users,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";

const offerings = [
  {
    title: "Resume Building",
    icon: FileText,
    items: [
      "ATS-friendly resume templates",
      "Role-based resumes (Cloud, DevOps, Security, GenAI)",
      "Project & experience structuring",
      "Keyword optimization for job portals",
      "LinkedIn profile optimization",
    ],
  },
  {
    title: "Interview Preparation",
    icon: MessageSquare,
    items: [
      "Technical interview question banks",
      "Scenario & architecture-based questions",
      "Behavioral & HR interview guidance",
      "Mock interviews with expert feedback",
      "Confidence & communication coaching",
    ],
  },
  {
    title: "Role-Specific Prep",
    icon: Target,
    items: [
      "Cloud (AWS, Azure, GCP)",
      "DevOps & SRE roles",
      "Security & Platform Engineering",
      "GenAI & AI-enabled roles",
      "Hands-on project discussion prep",
    ],
  },
  {
    title: "Learning Modes",
    icon: BookOpen,
    items: [
      "Self-paced preparation kits",
      "Instructor-led sessions",
      "Mock interview simulations",
      "Resume review workshops",
      "Career guidance sessions",
    ],
  },
];

const whoIsThisFor = [
  {
    title: "Freshers",
    description: "Build your first professional resume, prepare for entry-level interviews, and learn how to present projects effectively.",
  },
  {
    title: "Mid-Level Professionals",
    description: "Transition into specialized cloud and DevOps roles with targeted preparation and skill mapping.",
  },
  {
    title: "Experienced Engineers",
    description: "Refine your leadership narrative, prepare for senior/lead roles, and master architectural discussions.",
  },
];

export default function CareersPage() {
  const [experienceType, setExperienceType] = useState("fresher");
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center">
                <Briefcase className="w-6 h-6 text-secondary" />
              </div>
            </div>
            <Badge className="mb-3 bg-secondary/10 text-secondary border-secondary/20">
              Bridge to Hire
            </Badge>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Tech Career Pathways
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Your Roadmap to a Successful Tech Career
            </p>
            
            <div className="flex items-center justify-center gap-6 mt-6 text-sm">
              <div className="flex items-center gap-2">
                <Star className="w-5 h-5 text-secondary fill-secondary" />
                <span className="font-medium">4.9 Rating</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-primary" />
                <span className="font-medium">5,000+ Professionals Enrolled</span>
              </div>
            </div>
          </div>

          {/* Main Content Grid */}
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Tagline */}
              <div className="text-center lg:text-left">
                <p className="text-xl text-foreground font-medium">
                  Crack technical interviews and stand out with industry-ready resumes — 
                  designed for freshers, mid-level, and experienced professionals.
                </p>
              </div>

              {/* Our Offerings */}
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-2">Our Offerings</h2>
                <p className="text-muted-foreground mb-6">
                  End-to-end support to help you prepare, present, and perform with confidence.
                </p>
                
                <div className="grid sm:grid-cols-2 gap-6">
                  {offerings.map((offering) => {
                    const Icon = offering.icon;
                    return (
                      <Card key={offering.title} className="h-full">
                        <CardHeader className="pb-3">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                              <Icon className="w-5 h-5 text-primary" />
                            </div>
                            <CardTitle className="text-lg">{offering.title}</CardTitle>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <ul className="space-y-2">
                            {offering.items.map((item) => (
                              <li key={item} className="flex items-start gap-2 text-sm text-muted-foreground">
                                <CheckCircle2 className="w-4 h-4 text-success shrink-0 mt-0.5" />
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              </div>

              {/* Who Is This For */}
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-6">Who Is This For?</h2>
                <div className="grid gap-4">
                  {whoIsThisFor.map((item) => (
                    <Card key={item.title}>
                      <CardContent className="p-4">
                        <h3 className="font-semibold text-foreground mb-2">{item.title}</h3>
                        <p className="text-sm text-muted-foreground">{item.description}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Sidebar - Contact Form */}
            <div>
              <Card className="sticky top-24">
                <CardHeader>
                  <CardTitle>Get in Touch</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    Submit your details and our team will reach out to help you plan your career journey.
                  </p>
                </CardHeader>
                <CardContent>
                  <form className="space-y-4">
                    <div>
                      <Label htmlFor="name">Name</Label>
                      <Input id="name" placeholder="Your full name" />
                    </div>
                    
                    <div>
                      <Label htmlFor="email">Email Address</Label>
                      <Input id="email" type="email" placeholder="your@email.com" />
                    </div>
                    
                    <div className="grid grid-cols-3 gap-2">
                      <div>
                        <Label htmlFor="country">Country</Label>
                        <Select defaultValue="+91">
                          <SelectTrigger id="country">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="+91">+91</SelectItem>
                            <SelectItem value="+1">+1</SelectItem>
                            <SelectItem value="+44">+44</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="col-span-2">
                        <Label htmlFor="phone">Phone</Label>
                        <Input id="phone" placeholder="Phone number" />
                      </div>
                    </div>
                    
                    <div>
                      <Label htmlFor="requirement">Requirement</Label>
                      <Textarea id="requirement" placeholder="Describe your career goals..." rows={3} />
                    </div>
                    
                    <div>
                      <Label>Experience Level</Label>
                      <RadioGroup value={experienceType} onValueChange={setExperienceType} className="flex gap-4 mt-2">
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="fresher" id="fresher" />
                          <Label htmlFor="fresher" className="font-normal">Fresher</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="experienced" id="experienced" />
                          <Label htmlFor="experienced" className="font-normal">Experienced</Label>
                        </div>
                      </RadioGroup>
                    </div>
                    
                    {experienceType === "experienced" && (
                      <div>
                        <Label htmlFor="experience">Total Experience (years)</Label>
                        <Input id="experience" placeholder="e.g., 5" />
                      </div>
                    )}
                    
                    <div className="flex items-start gap-2">
                      <Checkbox 
                        id="terms" 
                        checked={agreedToTerms}
                        onCheckedChange={(checked) => setAgreedToTerms(checked as boolean)}
                      />
                      <Label htmlFor="terms" className="text-xs text-muted-foreground leading-tight">
                        By submitting your contact details, you acknowledge and agree to our Terms of Use and Privacy Policy.
                      </Label>
                    </div>
                    
                    <Button type="submit" className="w-full" disabled={!agreedToTerms}>
                      Get in Touch <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
