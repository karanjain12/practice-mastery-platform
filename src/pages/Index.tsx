import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { LabCard } from "@/components/cards/LabCard";
import { CourseCard } from "@/components/cards/CourseCard";
import heroPerson from "@/assets/hero-person.jpg";
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
} from "lucide-react";
import { useRef } from "react";

// Sample data - First one paid, second one free
const featuredLabs = [
  {
    id: "1",
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
    id: "2",
    title: "Deploy Kubernetes on AWS EKS",
    description: "Learn to deploy and manage containerized applications using Amazon EKS.",
    thumbnail: "https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=500",
    isFree: true,
    duration: "2 hours",
    level: "Intermediate" as const,
    rating: 4.8,
    enrolledCount: 15420,
    platform: "AWS",
  },
  {
    id: "3",
    title: "Google Cloud Platform Basics",
    description: "Master GCP basics including Compute Engine, Cloud Storage, and BigQuery.",
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
    title: "CI/CD Pipeline with Jenkins",
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
    description: "From fundamentals to expert-level cloud architecture design patterns.",
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
    description: "Master CI/CD, containerization, and cloud automation.",
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
    title: "AWS Solutions Architect Prep",
    description: "Comprehensive preparation for the AWS SA certification exam.",
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
  {
    id: "4",
    title: "Kubernetes for Beginners",
    description: "Learn container orchestration from scratch with hands-on labs.",
    thumbnail: "https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=500",
    isFree: true,
    duration: "10 hours",
    level: "Beginner" as const,
    rating: 4.7,
    enrolledCount: 21000,
    modulesCount: 8,
    labsCount: 5,
  },
];

const stats = [
  { value: "50,000+", label: "Learners", icon: Users },
  { value: "500+", label: "Labs", icon: Beaker },
  { value: "25,000+", label: "Completions", icon: Trophy },
  { value: "100+", label: "Courses", icon: BookOpen },
  { value: "15+", label: "Platforms", icon: Target },
  { value: "1000+", label: "Certificates", icon: Award },
];

const partners = ["AWS", "Microsoft Azure", "Google Cloud", "IBM Cloud", "Oracle", "Alibaba"];

export default function Index() {
  const labsScrollRef = useRef<HTMLDivElement>(null);
  const coursesScrollRef = useRef<HTMLDivElement>(null);

  const scroll = (ref: React.RefObject<HTMLDivElement>, direction: "left" | "right") => {
    if (ref.current) {
      const scrollAmount = 320;
      ref.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-16 bg-muted">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8 items-center py-16 lg:py-24">
            <div className="animate-fade-in-up">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
                Learn. Practice.
                <span className="text-primary"> Prove Your Skill.</span>
              </h1>
              <p className="text-lg text-muted-foreground mb-8 max-w-lg">
                Master real-world tech skills with hands-on labs, structured courses, and industry certifications.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link to="/courses">
                  <Button size="lg" className="gap-2">
                    Browse Courses <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
                <Link to="/labs">
                  <Button size="lg" variant="outline" className="gap-2">
                    Explore Labs
                  </Button>
                </Link>
              </div>
            </div>
            <div className="relative animate-fade-in hidden lg:block">
              <img
                src={heroPerson}
                alt="Professional learning"
                className="rounded-2xl shadow-xl w-full h-auto object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Achievements Section */}
      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-semibold text-center text-foreground mb-10">
            Our Achievements
          </h2>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div
                  key={index}
                  className="text-center p-4 rounded-xl bg-muted animate-fade-in-up"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <Icon className="w-6 h-6 mx-auto mb-2 text-primary" />
                  <div className="text-xl md:text-2xl font-bold text-foreground">{stat.value}</div>
                  <div className="text-xs text-muted-foreground">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Partners */}
      <section className="py-10 border-y border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-sm text-muted-foreground text-center mb-6">Our Partners & Clients</p>
          <div className="flex flex-wrap justify-center gap-8 items-center">
            {partners.map((partner) => (
              <span key={partner} className="text-muted-foreground font-medium text-sm">
                {partner}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Digital Skills Courses - Horizontal Scroll */}
      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-semibold text-foreground mb-1">Digital Skills Courses</h2>
              <p className="text-muted-foreground text-sm">Structured learning paths for every level</p>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="icon"
                onClick={() => scroll(coursesScrollRef, "left")}
              >
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={() => scroll(coursesScrollRef, "right")}
              >
                <ChevronRight className="w-4 h-4" />
              </Button>
              <Link to="/courses">
                <Button variant="ghost" size="sm" className="gap-1 ml-2">
                  View All <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>
          </div>
          <div ref={coursesScrollRef} className="scroll-container">
            {featuredCourses.map((course) => (
              <div key={course.id} className="scroll-item">
                <CourseCard {...course} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Skill Builder Labs - Horizontal Scroll */}
      <section className="py-16 bg-muted">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-semibold text-foreground mb-1">Skill Builder Labs</h2>
              <p className="text-muted-foreground text-sm">Hands-on practice in real environments</p>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="icon"
                onClick={() => scroll(labsScrollRef, "left")}
              >
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={() => scroll(labsScrollRef, "right")}
              >
                <ChevronRight className="w-4 h-4" />
              </Button>
              <Link to="/labs">
                <Button variant="ghost" size="sm" className="gap-1 ml-2">
                  View All <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>
          </div>
          <div ref={labsScrollRef} className="scroll-container">
            {featuredLabs.map((lab) => (
              <div key={lab.id} className="scroll-item">
                <LabCard {...lab} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Learners Love Us */}
      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-semibold text-center text-foreground mb-10">
            Why Learners Love Us
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: Beaker, title: "Practical Learning", desc: "Real environments, real skills. No simulations." },
              { icon: TrendingUp, title: "Industry Recognition", desc: "Certificates valued by top employers." },
              { icon: Users, title: "Expert Support", desc: "Learn from industry professionals." },
            ].map((item, i) => (
              <Card key={i} variant="outline" className="text-center p-6">
                <CardContent className="pt-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <item.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Instructor Resources CTA */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl md:text-3xl font-semibold mb-4">
            Ready to Level Your Cloud Skills?
          </h2>
          <p className="text-primary-foreground/80 mb-6 max-w-2xl mx-auto">
            Join thousands of learners mastering real-world tech skills every day.
          </p>
          <Link to="/courses">
            <Button size="lg" variant="secondary" className="gap-2">
              Get Started Free <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}