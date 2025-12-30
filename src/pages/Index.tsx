import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
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
  Award,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Star,
  BookOpen,
  Trophy,
  Target,
  TrendingUp,
  ClipboardCheck,
  Cloud,
  Briefcase,
  Play,
  CheckCircle2,
} from "lucide-react";
import { useRef } from "react";

// Sample data
const featuredLabs = [
  {
    id: "1",
    title: "AWS EC2 and VPC Configuration",
    description: "Configure AWS EC2 instances and Virtual Private Cloud networking.",
    thumbnail: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=500",
    isFree: false,
    price: 29,
    duration: "3 hours",
    level: "Advanced" as const,
    rating: 4.9,
    enrolledCount: 8750,
    platform: "AWS",
  },
  {
    id: "2",
    title: "Kubernetes Container Orchestration",
    description: "Learn container orchestration with Kubernetes on cloud platforms.",
    thumbnail: "https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=500",
    isFree: true,
    duration: "2 hours",
    level: "Intermediate" as const,
    rating: 4.8,
    enrolledCount: 15420,
    platform: "Multi-Cloud",
  },
  {
    id: "3",
    title: "Azure DevOps Pipeline Setup",
    description: "Build CI/CD pipelines using Azure DevOps for automated deployments.",
    thumbnail: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=500",
    isFree: false,
    price: 35,
    duration: "4 hours",
    level: "Intermediate" as const,
    rating: 4.7,
    enrolledCount: 12100,
    platform: "Azure",
  },
  {
    id: "4",
    title: "Docker Container Management",
    description: "Master containerization basics with Docker from images to orchestration.",
    thumbnail: "https://images.unsplash.com/photo-1605745341112-85968b19335b?w=500",
    isFree: true,
    duration: "2.5 hours",
    level: "Beginner" as const,
    rating: 4.8,
    enrolledCount: 28500,
    platform: "DevOps",
  },
];

const featuredCourses = [
  {
    id: "1",
    title: "Complete AWS Cloud Practitioner Course",
    description: "Comprehensive preparation for the AWS Cloud Practitioner certification.",
    thumbnail: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=500",
    isFree: false,
    price: 99,
    duration: "20 hours",
    level: "Beginner" as const,
    rating: 4.9,
    enrolledCount: 12500,
    modulesCount: 12,
    labsCount: 8,
  },
  {
    id: "2",
    title: "Master Azure Fundamentals",
    description: "Learn Azure fundamentals and prepare for AZ-900 certification.",
    thumbnail: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=500",
    isFree: true,
    duration: "15 hours",
    level: "Beginner" as const,
    rating: 4.8,
    enrolledCount: 18900,
    modulesCount: 10,
    labsCount: 6,
  },
  {
    id: "3",
    title: "DevOps Engineering Professional",
    description: "Master CI/CD, containerization, and cloud automation.",
    thumbnail: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=500",
    isFree: false,
    price: 129,
    duration: "25 hours",
    level: "Advanced" as const,
    rating: 4.9,
    enrolledCount: 8200,
    modulesCount: 15,
    labsCount: 10,
  },
  {
    id: "4",
    title: "Google Cloud Professional",
    description: "Prepare for the GCP Professional certification with hands-on labs.",
    thumbnail: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=500",
    isFree: true,
    duration: "18 hours",
    level: "Intermediate" as const,
    rating: 4.7,
    enrolledCount: 14000,
    modulesCount: 12,
    labsCount: 7,
  },
];

const stats = [
  { value: "50,000+", label: "Learners Enrolled", icon: Users },
  { value: "500+", label: "Hands-on Labs", icon: Beaker },
  { value: "100+", label: "Courses", icon: BookOpen },
  { value: "25,000+", label: "Certifications", icon: Award },
];

const partners = [
  "Amazon Web Services",
  "Microsoft Azure", 
  "Google Cloud",
  "IBM Cloud",
  "Oracle Cloud",
  "Red Hat",
];

const productSections = [
  {
    id: "assessment",
    title: "Technology Readiness Assessment",
    tagline: "Benchmark Your Brilliance",
    description: "Discover your ideal IT career path with our guided assessment tool.",
    icon: ClipboardCheck,
    href: "/assessment",
    color: "primary",
  },
  {
    id: "training",
    title: "Expert-Led Technology Training",
    tagline: "Learn From The Masters",
    description: "Live instructor-led sessions with industry experts and mentors.",
    icon: Users,
    href: "/training",
    color: "secondary",
  },
  {
    id: "labs",
    title: "Skill Builder Labs",
    tagline: "Practice Makes Perfect",
    description: "Hands-on practice in real cloud environments with guided labs.",
    icon: Beaker,
    href: "/labs",
    color: "primary",
  },
  {
    id: "programs",
    title: "Digital Skills Programs",
    tagline: "Master The Tools",
    description: "On-demand video courses with structured learning paths.",
    icon: GraduationCap,
    href: "/courses",
    color: "secondary",
  },
  {
    id: "certification",
    title: "Certification Readiness Program",
    tagline: "Invest In Your Future",
    description: "Comprehensive exam preparation with practice tests and labs.",
    icon: Award,
    href: "/certification",
    color: "primary",
  },
  {
    id: "careers",
    title: "Tech Career Pathways",
    tagline: "Bridge to Hire",
    description: "Resume building, interview prep, and job placement support.",
    icon: Briefcase,
    href: "/careers",
    color: "secondary",
  },
];

export default function Index() {
  const labsScrollRef = useRef<HTMLDivElement>(null);
  const coursesScrollRef = useRef<HTMLDivElement>(null);

  const scroll = (ref: React.RefObject<HTMLDivElement>, direction: "left" | "right") => {
    if (ref.current) {
      const scrollAmount = 340;
      ref.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section with Background */}
      <section className="relative pt-16 min-h-[600px] flex items-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${heroBg})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/95 to-background/70" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="max-w-2xl animate-fade-in-up">
            <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">
              ALAR Labs - Learning & Innovation
            </Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
              Learn, Practice &
              <span className="text-primary"> Master Real-World Tech Skills</span>
            </h1>
            <p className="text-lg text-muted-foreground mb-8 max-w-xl">
              Industry-leading hands-on labs, expert-led training, and certification programs to accelerate your tech career.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/labs">
                <Button size="lg" className="gap-2">
                  <Beaker className="w-5 h-5" /> Explore Labs
                </Button>
              </Link>
              <Link to="/courses">
                <Button size="lg" variant="outline" className="gap-2">
                  <GraduationCap className="w-5 h-5" /> Browse Courses
                </Button>
              </Link>
              <Link to="/training">
                <Button size="lg" variant="ghost" className="gap-2">
                  <Users className="w-5 h-5" /> Instructor-Led Training
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Product Sections Overview */}
      <section className="py-16 bg-muted">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-3">Our Learning Solutions</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Comprehensive tech education from assessment to career placement
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {productSections.map((section, index) => {
              const Icon = section.icon;
              return (
                <Link key={section.id} to={section.href}>
                  <Card 
                    className="h-full card-hover border-2 border-transparent hover:border-primary/20 cursor-pointer group"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <CardContent className="p-6">
                      <div className={`w-12 h-12 rounded-xl bg-${section.color}/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                        <Icon className={`w-6 h-6 text-${section.color}`} />
                      </div>
                      <div className="text-xs font-semibold text-secondary uppercase tracking-wide mb-1">
                        {section.tagline}
                      </div>
                      <h3 className="text-lg font-semibold text-foreground mb-2">
                        {section.title}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {section.description}
                      </p>
                      <div className="flex items-center gap-1 mt-4 text-primary text-sm font-medium">
                        Explore <ArrowRight className="w-4 h-4" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Achievements Section */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-semibold mb-2">Our Achievements</h2>
            <p className="text-primary-foreground/70">Trusted by learners and organizations worldwide</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div
                  key={index}
                  className="text-center p-6 rounded-xl bg-primary-foreground/10 backdrop-blur-sm animate-fade-in-up"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <Icon className="w-8 h-8 mx-auto mb-3 text-primary-foreground/80" />
                  <div className="text-3xl md:text-4xl font-bold mb-1">{stat.value}</div>
                  <div className="text-sm text-primary-foreground/70">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Partners */}
      <section className="py-12 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-sm text-muted-foreground text-center mb-8">Our Partners & Technology Platforms</p>
          <div className="flex flex-wrap justify-center gap-x-12 gap-y-4 items-center">
            {partners.map((partner) => (
              <span key={partner} className="text-muted-foreground font-medium text-sm hover:text-foreground transition-colors">
                {partner}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Skill Builder Labs - Horizontal Scroll */}
      <section className="py-16 bg-background" id="labs-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <div className="text-xs font-semibold text-secondary uppercase tracking-wide mb-1">
                Practice Makes Perfect
              </div>
              <h2 className="text-2xl font-bold text-foreground mb-1">Skill Builder Labs</h2>
              <p className="text-muted-foreground text-sm">Hands-on practice in real cloud environments</p>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="icon"
                onClick={() => scroll(labsScrollRef, "left")}
                className="rounded-full"
              >
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={() => scroll(labsScrollRef, "right")}
                className="rounded-full"
              >
                <ChevronRight className="w-4 h-4" />
              </Button>
              <Link to="/labs">
                <Button variant="ghost" size="sm" className="gap-1 ml-2">
                  Explore All Labs <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>
          </div>
          <div ref={labsScrollRef} className="scroll-container">
            {featuredLabs.map((lab) => (
              <div key={lab.id} className="scroll-item w-[320px]">
                <LabCard {...lab} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Digital Skills Programs - Horizontal Scroll */}
      <section className="py-16 bg-muted" id="courses-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <div className="text-xs font-semibold text-secondary uppercase tracking-wide mb-1">
                Master The Tools
              </div>
              <h2 className="text-2xl font-bold text-foreground mb-1">Digital Skills Programs</h2>
              <p className="text-muted-foreground text-sm">On-demand digital training for real-world skill building</p>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="icon"
                onClick={() => scroll(coursesScrollRef, "left")}
                className="rounded-full"
              >
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={() => scroll(coursesScrollRef, "right")}
                className="rounded-full"
              >
                <ChevronRight className="w-4 h-4" />
              </Button>
              <Link to="/courses">
                <Button variant="ghost" size="sm" className="gap-1 ml-2">
                  Explore All Programs <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>
          </div>
          <div ref={coursesScrollRef} className="scroll-container">
            {featuredCourses.map((course) => (
              <div key={course.id} className="scroll-item w-[320px]">
                <CourseCard {...course} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Learning Journey */}
      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-3">Your Learning Journey</h2>
            <p className="text-muted-foreground">A step-by-step path to mastery</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                title: "Learn Concepts",
                description: "Start with structured courses and video content to build your foundation.",
                icon: BookOpen,
                link: "/courses",
              },
              {
                step: "02", 
                title: "Practice Skills",
                description: "Apply knowledge with hands-on labs in real cloud environments.",
                icon: Beaker,
                link: "/labs",
              },
              {
                step: "03",
                title: "Get Certified",
                description: "Validate your skills with industry-recognized certifications.",
                icon: Award,
                link: "/certification",
              },
            ].map((item, index) => {
              const Icon = item.icon;
              return (
                <div key={index} className="relative">
                  <div className="text-6xl font-bold text-muted/50 absolute -top-4 -left-2">
                    {item.step}
                  </div>
                  <Card className="relative z-10 h-full">
                    <CardContent className="p-6 pt-8">
                      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                        <Icon className="w-6 h-6 text-primary" />
                      </div>
                      <h3 className="text-xl font-semibold text-foreground mb-2">{item.title}</h3>
                      <p className="text-muted-foreground mb-4">{item.description}</p>
                      <Link to={item.link}>
                        <Button variant="ghost" size="sm" className="gap-1 p-0 h-auto">
                          Get Started <ArrowRight className="w-4 h-4" />
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                  {index < 2 && (
                    <div className="hidden md:block absolute top-1/2 -right-4 w-8 text-muted-foreground">
                      <ArrowRight className="w-8 h-8" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-primary to-primary/80 text-primary-foreground">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Ready to Level Up Your Cloud Skills?
          </h2>
          <p className="text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
            Join thousands of learners mastering real-world tech skills every day. Start your journey with free labs and courses.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/labs">
              <Button size="lg" variant="secondary" className="gap-2">
                Start Free Lab <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
            <Link to="/assessment">
              <Button size="lg" variant="outline" className="gap-2 border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/10">
                Take Assessment
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
