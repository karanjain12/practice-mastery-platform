import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { LabCard } from "@/components/cards/LabCard";
import { CourseCard } from "@/components/cards/CourseCard";
import heroBg from "@/assets/hero-bg.jpg";
import {
  Beaker,
  GraduationCap,
  Users,
  CheckCircle2,
  Award,
  BookOpen,
  Play,
  ArrowRight,
  Star,
  Clock,
  Globe,
  Shield,
  Zap,
  Target,
} from "lucide-react";

// Sample data
const featuredLabs = [
  {
    id: "1",
    title: "Deploy a Kubernetes Cluster on AWS EKS",
    description: "Learn how to deploy and manage containerized applications using Amazon EKS.",
    thumbnail: "https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=500",
    isFree: true,
    duration: "2 hours",
    level: "Intermediate" as const,
    rating: 4.8,
    enrolledCount: 15420,
    platform: "AWS",
  },
  {
    id: "2",
    title: "Build a Serverless API with Azure Functions",
    description: "Create scalable serverless applications using Azure Functions and Cosmos DB.",
    thumbnail: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=500",
    isFree: false,
    price: 29,
    duration: "3 hours",
    level: "Advanced" as const,
    rating: 4.9,
    enrolledCount: 8750,
    platform: "Azure",
  },
  {
    id: "3",
    title: "Google Cloud Platform Fundamentals",
    description: "Master the basics of GCP including Compute Engine, Cloud Storage, and BigQuery.",
    thumbnail: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=500",
    isFree: true,
    duration: "4 hours",
    level: "Beginner" as const,
    rating: 4.7,
    enrolledCount: 23100,
    platform: "GCP",
  },
  {
    id: "4",
    title: "CI/CD Pipeline with Jenkins and Docker",
    description: "Automate your deployment workflow with industry-standard DevOps tools.",
    thumbnail: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=500",
    isFree: false,
    price: 39,
    duration: "5 hours",
    level: "Expert" as const,
    rating: 4.9,
    enrolledCount: 6200,
    platform: "DevOps",
  },
];

const featuredCourses = [
  {
    id: "1",
    title: "Complete Cloud Architecture Masterclass",
    description: "From fundamentals to expert-level cloud architecture design patterns and best practices.",
    thumbnail: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=500",
    isFree: false,
    price: 99,
    duration: "20 hours",
    level: "Intermediate" as const,
    rating: 4.9,
    enrolledCount: 12500,
    modulesCount: 12,
    labsCount: 8,
  },
  {
    id: "2",
    title: "DevOps Engineering Professional",
    description: "Master CI/CD, containerization, infrastructure as code, and cloud automation.",
    thumbnail: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=500",
    isFree: true,
    duration: "15 hours",
    level: "Advanced" as const,
    rating: 4.8,
    enrolledCount: 8900,
    modulesCount: 10,
    labsCount: 6,
  },
  {
    id: "3",
    title: "AWS Solutions Architect Preparation",
    description: "Comprehensive preparation course for the AWS Solutions Architect certification exam.",
    thumbnail: "https://images.unsplash.com/photo-1573164713988-8665fc963095?w=500",
    isFree: false,
    price: 79,
    duration: "25 hours",
    level: "Advanced" as const,
    rating: 4.9,
    enrolledCount: 18200,
    modulesCount: 15,
    labsCount: 10,
  },
];

const stats = [
  { value: "55,000+", label: "Learners" },
  { value: "500+", label: "Labs" },
  { value: "25,000+", label: "Completions" },
  { value: "100+", label: "Courses" },
  { value: "15+", label: "Platforms" },
  { value: "1000+", label: "Certificates" },
];

const partners = [
  "Amazon Web Services",
  "Microsoft Azure",
  "Google Cloud",
  "IBM Cloud",
  "Oracle Cloud",
  "Alibaba Cloud",
];

export default function Index() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center pt-16 overflow-hidden">
        <div 
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: `url(${heroBg})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-foreground/90 via-foreground/80 to-foreground/95" />
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-20">
          <Badge className="mb-6 bg-primary/20 text-primary-foreground border-primary/30 px-4 py-1.5">
            <Zap className="w-4 h-4 mr-2" />
            Trusted by 55,000+ Learners Worldwide
          </Badge>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground mb-6 leading-tight">
            Learn, Practice & Master
            <br />
            <span className="bg-gradient-to-r from-secondary to-primary-light bg-clip-text text-transparent">
              Real-World Tech Skills
            </span>
          </h1>
          
          <p className="text-lg md:text-xl text-primary-foreground/80 max-w-3xl mx-auto mb-10">
            Build expertise with hands-on labs, structured courses, and expert-led training. 
            Get certified and accelerate your tech career.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link to="/labs">
              <Button size="xl" variant="hero" className="gap-2">
                <Beaker className="w-5 h-5" />
                Explore Labs
              </Button>
            </Link>
            <Link to="/courses">
              <Button size="xl" variant="hero-outline" className="gap-2">
                <GraduationCap className="w-5 h-5" />
                Browse Courses
              </Button>
            </Link>
            <Link to="/training">
              <Button size="xl" variant="hero-outline" className="gap-2">
                <Users className="w-5 h-5" />
                Instructor-Led Training
              </Button>
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 md:grid-cols-6 gap-4 max-w-4xl mx-auto">
            {stats.map((stat, index) => (
              <div 
                key={index} 
                className="bg-primary-foreground/10 backdrop-blur-sm rounded-xl p-4 border border-primary-foreground/10"
              >
                <div className="text-2xl md:text-3xl font-bold text-primary-foreground">{stat.value}</div>
                <div className="text-sm text-primary-foreground/60">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Product Comparison Section */}
      <section className="py-20 bg-muted/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Choose Your Learning Path
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Three distinct products designed for different learning needs and preferences.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Skill Builder Labs */}
            <Card variant="feature" className="relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-secondary/20 to-transparent rounded-bl-full" />
              <CardHeader>
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-secondary to-secondary/70 flex items-center justify-center mb-4">
                  <Beaker className="w-7 h-7 text-secondary-foreground" />
                </div>
                <CardTitle className="text-2xl">Skill Builder Labs</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  Hands-on practice in real cloud environments. Task-based labs with instant feedback.
                </p>
                <ul className="space-y-2">
                  {["Real environments", "Task-based learning", "Instant feedback", "Self-paced"].map((item) => (
                    <li key={item} className="flex items-center gap-2 text-sm">
                      <CheckCircle2 className="w-4 h-4 text-success" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <Link to="/labs">
                  <Button className="w-full mt-4" variant="secondary">
                    Explore Labs <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Digital Skills Programs */}
            <Card variant="feature" className="relative overflow-hidden border-primary/30">
              <div className="absolute -top-4 -right-4">
                <Badge variant="paid" className="text-xs">Most Popular</Badge>
              </div>
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-primary/20 to-transparent rounded-bl-full" />
              <CardHeader>
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center mb-4">
                  <GraduationCap className="w-7 h-7 text-primary-foreground" />
                </div>
                <CardTitle className="text-2xl">Digital Skills Programs</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  On-demand video courses with structured learning paths from beginner to expert.
                </p>
                <ul className="space-y-2">
                  {["Video lessons", "Structured paths", "Progress tracking", "Certificates"].map((item) => (
                    <li key={item} className="flex items-center gap-2 text-sm">
                      <CheckCircle2 className="w-4 h-4 text-success" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <Link to="/courses">
                  <Button className="w-full mt-4">
                    Browse Courses <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Expert-Led Training */}
            <Card variant="feature" className="relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-premium/20 to-transparent rounded-bl-full" />
              <CardHeader>
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-premium to-premium/70 flex items-center justify-center mb-4">
                  <Users className="w-7 h-7 text-premium-foreground" />
                </div>
                <CardTitle className="text-2xl">Expert-Led Training</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  Live sessions with industry mentors. Career-focused training with personalized guidance.
                </p>
                <ul className="space-y-2">
                  {["Live sessions", "Industry mentors", "Q&A support", "Career focused"].map((item) => (
                    <li key={item} className="flex items-center gap-2 text-sm">
                      <CheckCircle2 className="w-4 h-4 text-success" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <Link to="/training">
                  <Button className="w-full mt-4" variant="premium">
                    View Training <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Learning Journey Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Your Learning Journey
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              A structured path from learning concepts to validating your skills.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 relative">
            {/* Connector line */}
            <div className="hidden md:block absolute top-1/2 left-1/4 right-1/4 h-0.5 bg-gradient-to-r from-primary via-secondary to-success -translate-y-1/2 z-0" />

            {/* Step 1 */}
            <div className="relative z-10 text-center">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center mx-auto mb-6 shadow-lg">
                <BookOpen className="w-10 h-10 text-primary-foreground" />
              </div>
              <div className="bg-card rounded-xl p-6 shadow-lg border">
                <Badge variant="outline" className="mb-3">Step 1</Badge>
                <h3 className="text-xl font-bold mb-2">Learn Concepts</h3>
                <p className="text-muted-foreground text-sm">
                  Master theory with structured courses and video lessons.
                </p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="relative z-10 text-center">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-secondary to-secondary/70 flex items-center justify-center mx-auto mb-6 shadow-lg">
                <Beaker className="w-10 h-10 text-secondary-foreground" />
              </div>
              <div className="bg-card rounded-xl p-6 shadow-lg border">
                <Badge variant="outline" className="mb-3">Step 2</Badge>
                <h3 className="text-xl font-bold mb-2">Practice Skills</h3>
                <p className="text-muted-foreground text-sm">
                  Apply knowledge with hands-on labs in real environments.
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="relative z-10 text-center">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-success to-success/70 flex items-center justify-center mx-auto mb-6 shadow-lg">
                <Award className="w-10 h-10 text-success-foreground" />
              </div>
              <div className="bg-card rounded-xl p-6 shadow-lg border">
                <Badge variant="outline" className="mb-3">Step 3</Badge>
                <h3 className="text-xl font-bold mb-2">Validate Skills</h3>
                <p className="text-muted-foreground text-sm">
                  Earn certificates and badges to showcase your expertise.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Labs */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
                Skill Builder Labs
              </h2>
              <p className="text-muted-foreground">
                Hands-on practice with real cloud environments
              </p>
            </div>
            <Link to="/labs">
              <Button variant="outline" className="gap-2">
                View All Labs <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredLabs.map((lab) => (
              <LabCard key={lab.id} {...lab} />
            ))}
          </div>
        </div>
      </section>

      {/* Featured Courses */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
                Digital Skills Programs
              </h2>
              <p className="text-muted-foreground">
                Structured courses from beginner to expert
              </p>
            </div>
            <Link to="/courses">
              <Button variant="outline" className="gap-2">
                View All Courses <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredCourses.map((course) => (
              <CourseCard key={course.id} {...course} />
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-gradient-to-br from-primary to-primary-dark text-primary-foreground">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Why Learners Love Us
            </h2>
            <p className="text-lg opacity-80 max-w-2xl mx-auto">
              Join thousands of professionals who accelerated their careers with our platform.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Globe, title: "Real Environments", desc: "Practice in actual cloud platforms, not simulations" },
              { icon: Shield, title: "Industry Recognized", desc: "Certificates valued by top employers worldwide" },
              { icon: Clock, title: "Learn at Your Pace", desc: "24/7 access to all content and labs" },
              { icon: Target, title: "Practical Skills", desc: "Focus on job-ready, applicable knowledge" },
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 rounded-2xl bg-primary-foreground/10 flex items-center justify-center mx-auto mb-4">
                  <item.icon className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                <p className="text-primary-foreground/70">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Partners */}
      <section className="py-16 border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-muted-foreground mb-8">
            Trusted by learners from leading companies worldwide
          </p>
          <div className="flex flex-wrap justify-center gap-8 md:gap-16 items-center opacity-60">
            {partners.map((partner) => (
              <div key={partner} className="text-lg font-semibold text-muted-foreground">
                {partner}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-muted/50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Ready to Start Your Journey?
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join 55,000+ learners mastering cloud technologies. Start with free labs and courses today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/labs">
              <Button size="xl" className="gap-2">
                <Play className="w-5 h-5" />
                Start Free Lab
              </Button>
            </Link>
            <Link to="/courses">
              <Button size="xl" variant="outline" className="gap-2">
                <BookOpen className="w-5 h-5" />
                Browse Courses
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
