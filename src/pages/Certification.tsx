import { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Award,
  Search,
  BookOpen,
  FileQuestion,
  Clock,
  Star,
  Users,
  Lock,
  Play,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";
import { Link } from "react-router-dom";

const certPrograms = [
  {
    id: "1",
    title: "AWS Solutions Architect Associate",
    description: "Comprehensive preparation for the AWS SAA-C03 certification exam.",
    thumbnail: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=500",
    isFree: false,
    price: 149,
    duration: "40 hours",
    level: "Intermediate",
    rating: 4.9,
    enrolledCount: 18500,
    practiceQuestions: 500,
    examSimulations: 5,
    platform: "AWS",
  },
  {
    id: "2",
    title: "Azure Administrator AZ-104",
    description: "Complete guide to becoming a certified Azure Administrator.",
    thumbnail: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=500",
    isFree: false,
    price: 139,
    duration: "35 hours",
    level: "Intermediate",
    rating: 4.8,
    enrolledCount: 12300,
    practiceQuestions: 450,
    examSimulations: 4,
    platform: "Azure",
  },
  {
    id: "3",
    title: "Google Cloud Associate Engineer",
    description: "Prepare for the GCP Associate Cloud Engineer certification.",
    thumbnail: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=500",
    isFree: true,
    duration: "30 hours",
    level: "Intermediate",
    rating: 4.7,
    enrolledCount: 9800,
    practiceQuestions: 400,
    examSimulations: 3,
    platform: "GCP",
  },
  {
    id: "4",
    title: "Kubernetes Administrator CKA",
    description: "Master Kubernetes and prepare for the CKA certification exam.",
    thumbnail: "https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=500",
    isFree: false,
    price: 179,
    duration: "45 hours",
    level: "Advanced",
    rating: 4.9,
    enrolledCount: 7500,
    practiceQuestions: 350,
    examSimulations: 4,
    platform: "Kubernetes",
  },
  {
    id: "5",
    title: "Terraform Associate",
    description: "Complete preparation for the HashiCorp Terraform Associate cert.",
    thumbnail: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=500",
    isFree: false,
    price: 99,
    duration: "25 hours",
    level: "Beginner",
    rating: 4.6,
    enrolledCount: 6200,
    practiceQuestions: 300,
    examSimulations: 3,
    platform: "Multi-Cloud",
  },
  {
    id: "6",
    title: "CompTIA Security+",
    description: "Cybersecurity fundamentals and Security+ exam preparation.",
    thumbnail: "https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?w=500",
    isFree: true,
    duration: "35 hours",
    level: "Beginner",
    rating: 4.8,
    enrolledCount: 21000,
    practiceQuestions: 600,
    examSimulations: 5,
    platform: "Security",
  },
];

export default function CertificationPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [priceFilter, setPriceFilter] = useState("all");
  const [platformFilter, setPlatformFilter] = useState("all");

  const filteredPrograms = certPrograms.filter((program) => {
    const matchesSearch = program.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesPrice = priceFilter === "all" || 
      (priceFilter === "free" && program.isFree) || 
      (priceFilter === "paid" && !program.isFree);
    const matchesPlatform = platformFilter === "all" || program.platform === platformFilter;
    return matchesSearch && matchesPrice && matchesPlatform;
  });

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <Award className="w-6 h-6 text-primary" />
              </div>
              <div>
                <Badge className="mb-1 bg-secondary/10 text-secondary border-secondary/20">
                  Invest In Your Future
                </Badge>
                <h1 className="text-3xl md:text-4xl font-bold text-foreground">
                  Certification Readiness Program
                </h1>
              </div>
            </div>
            <p className="text-muted-foreground max-w-2xl">
              Comprehensive exam preparation with practice tests, study guides, and hands-on labs.
            </p>
          </div>

          {/* Tabs */}
          <Tabs defaultValue="programs" className="mb-8">
            <TabsList className="grid w-full max-w-md grid-cols-2">
              <TabsTrigger value="programs" className="gap-2">
                <BookOpen className="w-4 h-4" />
                Learning Mode
              </TabsTrigger>
              <TabsTrigger value="exams" className="gap-2">
                <FileQuestion className="w-4 h-4" />
                Exam Mode
              </TabsTrigger>
            </TabsList>

            <TabsContent value="programs" className="mt-6">
              {/* Filters */}
              <div className="flex flex-col md:flex-row gap-4 mb-8">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="Search certification programs..."
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
                  <Select value={platformFilter} onValueChange={setPlatformFilter}>
                    <SelectTrigger className="w-36">
                      <SelectValue placeholder="Platform" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Platforms</SelectItem>
                      <SelectItem value="AWS">AWS</SelectItem>
                      <SelectItem value="Azure">Azure</SelectItem>
                      <SelectItem value="GCP">GCP</SelectItem>
                      <SelectItem value="Kubernetes">Kubernetes</SelectItem>
                      <SelectItem value="Security">Security</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Programs Grid */}
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredPrograms.map((program) => (
                  <Card key={program.id} className="overflow-hidden card-hover">
                    <div className="relative aspect-video">
                      <img
                        src={program.thumbnail}
                        alt={program.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-3 left-3">
                        <Badge variant={program.isFree ? "free" : "paid"}>
                          {program.isFree ? "FREE" : `$${program.price}`}
                        </Badge>
                      </div>
                      {!program.isFree && (
                        <div className="absolute inset-0 bg-foreground/30 backdrop-blur-[2px] flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                          <Lock className="w-8 h-8 text-primary-foreground" />
                        </div>
                      )}
                    </div>
                    <CardContent className="p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge variant="level">{program.level}</Badge>
                        <Badge variant="outline">{program.platform}</Badge>
                      </div>
                      <h3 className="font-semibold text-foreground mb-2 line-clamp-2">
                        {program.title}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                        {program.description}
                      </p>
                      <div className="flex items-center gap-4 text-xs text-muted-foreground mb-3">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" /> {program.duration}
                        </span>
                        <span className="flex items-center gap-1">
                          <FileQuestion className="w-3 h-3" /> {program.practiceQuestions} Q's
                        </span>
                        <span className="flex items-center gap-1">
                          <Star className="w-3 h-3 fill-secondary text-secondary" /> {program.rating}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-muted-foreground">
                          <Users className="w-3 h-3 inline mr-1" />
                          {program.enrolledCount.toLocaleString()} enrolled
                        </span>
                        <Button size="sm" variant={program.isFree ? "default" : "outline"}>
                          {program.isFree ? "Start Now" : "View Details"}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="exams" className="mt-6">
              <Card className="p-8 text-center">
                <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
                  <FileQuestion className="w-8 h-8 text-muted-foreground" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">Exam Simulation Mode</h3>
                <p className="text-muted-foreground mb-4 max-w-md mx-auto">
                  Take timed practice exams that simulate the real certification experience. 
                  Track your progress and identify areas for improvement.
                </p>
                <Button>
                  Start Practice Exam <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <Footer />
    </div>
  );
}
