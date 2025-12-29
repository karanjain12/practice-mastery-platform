import { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CourseCard } from "@/components/cards/CourseCard";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, GraduationCap } from "lucide-react";

const allCourses = [
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
  {
    id: "4",
    title: "Kubernetes for Beginners",
    description: "Learn container orchestration from scratch with hands-on Kubernetes labs.",
    thumbnail: "https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=500",
    isFree: true,
    duration: "10 hours",
    level: "Beginner" as const,
    rating: 4.7,
    enrolledCount: 21000,
    modulesCount: 8,
    labsCount: 5,
  },
  {
    id: "5",
    title: "Azure Administrator Certification Path",
    description: "Complete guide to becoming a certified Azure Administrator.",
    thumbnail: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=500",
    isFree: false,
    price: 89,
    duration: "30 hours",
    level: "Intermediate" as const,
    rating: 4.8,
    enrolledCount: 9500,
    modulesCount: 18,
    labsCount: 12,
  },
  {
    id: "6",
    title: "Python for Cloud Automation",
    description: "Automate cloud infrastructure using Python, Boto3, and Azure SDK.",
    thumbnail: "https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=500",
    isFree: true,
    duration: "12 hours",
    level: "Intermediate" as const,
    rating: 4.6,
    enrolledCount: 14200,
    modulesCount: 10,
    labsCount: 7,
  },
  {
    id: "7",
    title: "Google Cloud Professional Data Engineer",
    description: "Prepare for the GCP Data Engineer certification with real-world projects.",
    thumbnail: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=500",
    isFree: false,
    price: 109,
    duration: "35 hours",
    level: "Expert" as const,
    rating: 4.9,
    enrolledCount: 6800,
    modulesCount: 20,
    labsCount: 15,
  },
  {
    id: "8",
    title: "Infrastructure as Code with Terraform",
    description: "Master Terraform for multi-cloud infrastructure provisioning and management.",
    thumbnail: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=500",
    isFree: false,
    price: 69,
    duration: "18 hours",
    level: "Intermediate" as const,
    rating: 4.8,
    enrolledCount: 11300,
    modulesCount: 12,
    labsCount: 8,
  },
  {
    id: "9",
    title: "Cloud Security Fundamentals",
    description: "Learn essential security concepts for AWS, Azure, and GCP environments.",
    thumbnail: "https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?w=500",
    isFree: true,
    duration: "8 hours",
    level: "Beginner" as const,
    rating: 4.5,
    enrolledCount: 16500,
    modulesCount: 6,
    labsCount: 4,
  },
];

export default function CoursesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [priceFilter, setPriceFilter] = useState("all");
  const [levelFilter, setLevelFilter] = useState("all");

  const filteredCourses = allCourses.filter((course) => {
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesPrice = priceFilter === "all" || 
      (priceFilter === "free" && course.isFree) || 
      (priceFilter === "paid" && !course.isFree);
    const matchesLevel = levelFilter === "all" || course.level.toLowerCase() === levelFilter;
    
    return matchesSearch && matchesPrice && matchesLevel;
  });

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center">
                <GraduationCap className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-foreground">
                  Digital Skills Programs
                </h1>
                <p className="text-muted-foreground">
                  Structured courses from beginner to expert
                </p>
              </div>
            </div>
          </div>

          {/* Filters */}
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search courses..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <div className="flex gap-3">
              <Select value={priceFilter} onValueChange={setPriceFilter}>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Price" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Prices</SelectItem>
                  <SelectItem value="free">Free</SelectItem>
                  <SelectItem value="paid">Paid</SelectItem>
                </SelectContent>
              </Select>

              <Select value={levelFilter} onValueChange={setLevelFilter}>
                <SelectTrigger className="w-36">
                  <SelectValue placeholder="Level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Levels</SelectItem>
                  <SelectItem value="beginner">Beginner</SelectItem>
                  <SelectItem value="intermediate">Intermediate</SelectItem>
                  <SelectItem value="advanced">Advanced</SelectItem>
                  <SelectItem value="expert">Expert</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Results count */}
          <div className="flex items-center justify-between mb-6">
            <p className="text-muted-foreground">
              Showing <span className="font-semibold text-foreground">{filteredCourses.length}</span> courses
            </p>
            <div className="flex gap-2">
              {priceFilter !== "all" && (
                <Badge variant={priceFilter === "free" ? "free" : "paid"}>
                  {priceFilter === "free" ? "Free" : "Paid"}
                </Badge>
              )}
              {levelFilter !== "all" && (
                <Badge variant="level">{levelFilter}</Badge>
              )}
            </div>
          </div>

          {/* Courses Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCourses.map((course) => (
              <CourseCard key={course.id} {...course} />
            ))}
          </div>

          {filteredCourses.length === 0 && (
            <div className="text-center py-16">
              <GraduationCap className="w-16 h-16 text-muted-foreground/30 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-foreground mb-2">No courses found</h3>
              <p className="text-muted-foreground">
                Try adjusting your filters or search query
              </p>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
