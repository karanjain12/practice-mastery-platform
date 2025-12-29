import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import {
  Clock,
  Star,
  Users,
  Lock,
  Play,
  CheckCircle2,
  ArrowLeft,
  BarChart3,
  BookOpen,
  Beaker,
  Award,
  PlayCircle,
  Copy,
  Check,
} from "lucide-react";
import { toast } from "sonner";

// Mock course data
const courseData = {
  id: "1",
  title: "Complete Cloud Architecture Masterclass",
  description: "From fundamentals to expert-level cloud architecture design patterns and best practices. Learn to design, deploy, and manage scalable cloud infrastructure across AWS, Azure, and GCP.",
  thumbnail: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800",
  isFree: false,
  price: 99,
  duration: "20 hours",
  level: "Intermediate" as const,
  rating: 4.9,
  enrolledCount: 12500,
  modulesCount: 12,
  labsCount: 8,
  objectives: [
    "Design highly available and fault-tolerant architectures",
    "Implement security best practices across cloud platforms",
    "Optimize costs and performance for cloud workloads",
    "Build and deploy microservices architectures",
    "Master infrastructure as code with Terraform",
    "Implement CI/CD pipelines for cloud deployments",
  ],
  isPurchased: true, // Toggle to simulate purchase state
};

const modules = [
  {
    id: "m1",
    title: "Introduction to Cloud Architecture",
    duration: "1.5 hours",
    lessons: [
      { id: "l1", title: "What is Cloud Architecture?", type: "video", duration: "15 min", completed: true },
      { id: "l2", title: "Cloud Service Models (IaaS, PaaS, SaaS)", type: "video", duration: "20 min", completed: true },
      { id: "l3", title: "Design Principles Overview", type: "text", duration: "10 min", completed: true },
      { id: "l4", title: "Quiz: Cloud Fundamentals", type: "quiz", duration: "15 min", completed: false },
    ],
    completed: false,
  },
  {
    id: "m2",
    title: "High Availability & Fault Tolerance",
    duration: "2 hours",
    lessons: [
      { id: "l5", title: "Understanding Availability Zones", type: "video", duration: "20 min", completed: true },
      { id: "l6", title: "Load Balancing Strategies", type: "video", duration: "25 min", completed: false },
      { id: "l7", title: "Auto Scaling Deep Dive", type: "video", duration: "30 min", completed: false },
      { id: "l8", title: "Hands-on: Deploy Multi-AZ Application", type: "lab", duration: "45 min", completed: false },
    ],
    completed: false,
  },
  {
    id: "m3",
    title: "Security Best Practices",
    duration: "2.5 hours",
    lessons: [
      { id: "l9", title: "Identity and Access Management", type: "video", duration: "25 min", completed: false },
      { id: "l10", title: "Network Security Fundamentals", type: "video", duration: "30 min", completed: false },
      { id: "l11", title: "Encryption at Rest and Transit", type: "text", duration: "15 min", completed: false },
      { id: "l12", title: "Security Compliance Frameworks", type: "video", duration: "20 min", completed: false },
      { id: "l13", title: "Lab: Implement VPC Security", type: "lab", duration: "60 min", completed: false },
    ],
    completed: false,
  },
  {
    id: "m4",
    title: "Microservices Architecture",
    duration: "3 hours",
    lessons: [
      { id: "l14", title: "Microservices vs Monolith", type: "video", duration: "20 min", completed: false },
      { id: "l15", title: "Container Orchestration with Kubernetes", type: "video", duration: "35 min", completed: false },
      { id: "l16", title: "Service Mesh Implementation", type: "video", duration: "25 min", completed: false },
      { id: "l17", title: "API Gateway Patterns", type: "text", duration: "15 min", completed: false },
      { id: "l18", title: "Lab: Deploy Microservices on EKS", type: "lab", duration: "90 min", completed: false },
    ],
    completed: false,
  },
];

const sampleCode = `# Terraform configuration for AWS VPC
resource "aws_vpc" "main" {
  cidr_block           = "10.0.0.0/16"
  enable_dns_hostnames = true
  enable_dns_support   = true

  tags = {
    Name        = "main-vpc"
    Environment = "production"
  }
}

resource "aws_subnet" "public" {
  count             = 3
  vpc_id            = aws_vpc.main.id
  cidr_block        = cidrsubnet(aws_vpc.main.cidr_block, 8, count.index)
  availability_zone = data.aws_availability_zones.available.names[count.index]

  tags = {
    Name = "public-subnet-\${count.index + 1}"
  }
}`;

export default function CourseDetailPage() {
  const { id } = useParams();
  const [copiedCode, setCopiedCode] = useState(false);
  const [activeLesson, setActiveLesson] = useState<string | null>(null);

  const completedLessons = modules.flatMap(m => m.lessons).filter(l => l.completed).length;
  const totalLessons = modules.flatMap(m => m.lessons).length;
  const progressPercent = Math.round((completedLessons / totalLessons) * 100);

  const copyToClipboard = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(true);
    toast.success("Code copied to clipboard!");
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const getLessonIcon = (type: string) => {
    switch (type) {
      case "video":
        return <PlayCircle className="w-4 h-4" />;
      case "text":
        return <BookOpen className="w-4 h-4" />;
      case "quiz":
        return <Award className="w-4 h-4" />;
      case "lab":
        return <Beaker className="w-4 h-4" />;
      default:
        return <BookOpen className="w-4 h-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="pt-20">
        {/* Header */}
        <div className="bg-gradient-to-b from-primary/10 to-background border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <Link to="/courses" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6 transition-colors">
              <ArrowLeft className="w-4 h-4" />
              Back to Courses
            </Link>

            <div className="grid lg:grid-cols-3 gap-8">
              {/* Main Info */}
              <div className="lg:col-span-2">
                <div className="flex items-center gap-3 mb-4">
                  <Badge variant={courseData.isFree ? "free" : "paid"}>
                    {courseData.isFree ? "FREE" : `$${courseData.price}`}
                  </Badge>
                  <Badge variant="level" className="bg-blue-100 text-blue-700">
                    {courseData.level}
                  </Badge>
                </div>

                <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                  {courseData.title}
                </h1>

                <p className="text-lg text-muted-foreground mb-6">
                  {courseData.description}
                </p>

                <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    <span>{courseData.duration}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Star className="w-4 h-4 fill-premium text-premium" />
                    <span className="font-medium">{courseData.rating}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    <span>{courseData.enrolledCount.toLocaleString()} enrolled</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <BookOpen className="w-4 h-4" />
                    <span>{courseData.modulesCount} modules</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Beaker className="w-4 h-4" />
                    <span>{courseData.labsCount} labs</span>
                  </div>
                </div>
              </div>

              {/* Sidebar Card */}
              <div className="lg:col-span-1">
                <Card variant="elevated" className="overflow-hidden sticky top-24">
                  <div className="aspect-video relative">
                    <img
                      src={courseData.thumbnail}
                      alt={courseData.title}
                      className="w-full h-full object-cover"
                    />
                    {!courseData.isPurchased && !courseData.isFree && (
                      <div className="absolute inset-0 bg-foreground/50 backdrop-blur-sm flex items-center justify-center">
                        <Lock className="w-12 h-12 text-primary-foreground" />
                      </div>
                    )}
                  </div>
                  <CardContent className="p-4">
                    {courseData.isPurchased || courseData.isFree ? (
                      <div className="space-y-4">
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-medium">Your Progress</span>
                            <span className="text-sm text-muted-foreground">{progressPercent}%</span>
                          </div>
                          <Progress value={progressPercent} className="h-2" />
                          <p className="text-xs text-muted-foreground mt-1">
                            {completedLessons} of {totalLessons} lessons completed
                          </p>
                        </div>
                        <Button size="lg" className="w-full" variant="success">
                          <Play className="w-5 h-5 mr-2" />
                          Continue Learning
                        </Button>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        <div className="text-center">
                          <div className="text-3xl font-bold text-foreground mb-1">${courseData.price}</div>
                          <p className="text-sm text-muted-foreground">Lifetime access</p>
                        </div>
                        <Button size="lg" className="w-full" variant="premium">
                          <Lock className="w-5 h-5 mr-2" />
                          Enroll Now
                        </Button>
                        <p className="text-xs text-center text-muted-foreground">
                          30-day money-back guarantee
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              {/* Objectives */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-success" />
                    What You'll Learn
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {courseData.objectives.map((objective, index) => (
                      <div key={index} className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-success mt-0.5 shrink-0" />
                        <span className="text-muted-foreground text-sm">{objective}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Course Content */}
              <Card>
                <CardHeader>
                  <CardTitle>Course Content</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    {modules.length} modules • {totalLessons} lessons • {courseData.duration} total
                  </p>
                </CardHeader>
                <CardContent className="p-0">
                  {courseData.isPurchased || courseData.isFree ? (
                    <Accordion type="single" collapsible className="w-full">
                      {modules.map((module) => (
                        <AccordionItem key={module.id} value={module.id}>
                          <AccordionTrigger className="px-6 hover:no-underline">
                            <div className="flex items-center gap-3 text-left">
                              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                                module.completed ? 'bg-success text-success-foreground' : 'bg-muted'
                              }`}>
                                {module.completed ? (
                                  <CheckCircle2 className="w-4 h-4" />
                                ) : (
                                  <span className="text-sm font-medium">{modules.indexOf(module) + 1}</span>
                                )}
                              </div>
                              <div>
                                <p className="font-medium">{module.title}</p>
                                <p className="text-xs text-muted-foreground">{module.duration} • {module.lessons.length} lessons</p>
                              </div>
                            </div>
                          </AccordionTrigger>
                          <AccordionContent className="px-6 pb-4">
                            <div className="space-y-2 ml-11">
                              {module.lessons.map((lesson) => (
                                <button
                                  key={lesson.id}
                                  className={`w-full flex items-center justify-between p-3 rounded-lg border transition-colors ${
                                    lesson.completed
                                      ? 'bg-success-light border-success/20'
                                      : 'hover:bg-accent border-border'
                                  }`}
                                  onClick={() => setActiveLesson(lesson.id)}
                                >
                                  <div className="flex items-center gap-3">
                                    <div className={`${lesson.completed ? 'text-success' : 'text-muted-foreground'}`}>
                                      {lesson.completed ? (
                                        <CheckCircle2 className="w-4 h-4" />
                                      ) : (
                                        getLessonIcon(lesson.type)
                                      )}
                                    </div>
                                    <span className={`text-sm ${lesson.completed ? 'text-success' : ''}`}>
                                      {lesson.title}
                                    </span>
                                  </div>
                                  <span className="text-xs text-muted-foreground">{lesson.duration}</span>
                                </button>
                              ))}
                            </div>
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  ) : (
                    <div className="relative">
                      <div className="absolute inset-0 backdrop-blur-sm bg-background/80 z-10 flex items-center justify-center">
                        <div className="text-center p-8">
                          <Lock className="w-12 h-12 text-premium mx-auto mb-4" />
                          <h3 className="text-lg font-bold mb-2">Unlock Full Course</h3>
                          <p className="text-muted-foreground mb-4 text-sm max-w-sm">
                            Enroll to access all modules, videos, and hands-on labs.
                          </p>
                          <Button variant="premium">
                            Enroll for ${courseData.price}
                          </Button>
                        </div>
                      </div>
                      <div className="p-6 space-y-4">
                        {[1, 2, 3, 4].map((i) => (
                          <div key={i} className="flex items-center gap-4">
                            <div className="w-8 h-8 rounded-full bg-muted" />
                            <div className="flex-1">
                              <div className="h-4 bg-muted rounded w-3/4 mb-2" />
                              <div className="h-3 bg-muted rounded w-1/4" />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Sample Code */}
              {(courseData.isPurchased || courseData.isFree) && (
                <Card>
                  <CardHeader>
                    <CardTitle>Sample Code</CardTitle>
                    <p className="text-sm text-muted-foreground">
                      Example Terraform configuration from Module 4
                    </p>
                  </CardHeader>
                  <CardContent className="p-0">
                    <div className="bg-sidebar rounded-b-lg overflow-hidden">
                      <div className="flex items-center justify-between px-4 py-2 border-b border-sidebar-border">
                        <span className="text-xs font-mono text-sidebar-foreground/60">main.tf</span>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="text-sidebar-foreground/60 hover:text-sidebar-foreground h-7"
                          onClick={() => copyToClipboard(sampleCode)}
                        >
                          {copiedCode ? (
                            <Check className="w-3.5 h-3.5 mr-1" />
                          ) : (
                            <Copy className="w-3.5 h-3.5 mr-1" />
                          )}
                          {copiedCode ? 'Copied!' : 'Copy'}
                        </Button>
                      </div>
                      <pre className="p-4 overflow-x-auto">
                        <code className="text-sm text-sidebar-foreground">{sampleCode}</code>
                      </pre>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Right Sidebar - Only visible on large screens */}
            <div className="hidden lg:block">
              {/* This space is reserved for the sticky card */}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
