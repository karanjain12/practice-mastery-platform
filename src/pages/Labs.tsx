import { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { LabCard } from "@/components/cards/LabCard";
import { GroupLabCard } from "@/components/cards/GroupLabCard";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Filter, Beaker, Layers, SlidersHorizontal } from "lucide-react";

const allLabs = [
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
  {
    id: "5",
    title: "Terraform Infrastructure as Code",
    description: "Learn to provision and manage cloud infrastructure using Terraform.",
    thumbnail: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=500",
    isFree: true,
    duration: "3 hours",
    level: "Intermediate" as const,
    rating: 4.6,
    enrolledCount: 11200,
    platform: "Multi-Cloud",
  },
  {
    id: "6",
    title: "AWS Lambda Deep Dive",
    description: "Build and deploy serverless functions with AWS Lambda and API Gateway.",
    thumbnail: "https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=500",
    isFree: false,
    price: 35,
    duration: "4 hours",
    level: "Advanced" as const,
    rating: 4.8,
    enrolledCount: 9400,
    platform: "AWS",
  },
  {
    id: "7",
    title: "Docker Container Essentials",
    description: "Master containerization basics with Docker from images to orchestration.",
    thumbnail: "https://images.unsplash.com/photo-1605745341112-85968b19335b?w=500",
    isFree: true,
    duration: "2.5 hours",
    level: "Beginner" as const,
    rating: 4.7,
    enrolledCount: 28500,
    platform: "DevOps",
  },
  {
    id: "8",
    title: "Azure Active Directory Integration",
    description: "Implement identity and access management with Azure AD.",
    thumbnail: "https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?w=500",
    isFree: false,
    price: 45,
    duration: "5 hours",
    level: "Expert" as const,
    rating: 4.9,
    enrolledCount: 5800,
    platform: "Azure",
  },
];

const groupLabs = [
  {
    id: "group-1",
    title: "AWS Solutions Architect Lab Bundle",
    description: "Complete lab bundle covering all AWS SA Associate exam topics with 10 hands-on labs.",
    thumbnail: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=500",
    isFree: false,
    price: 149,
    duration: "30 hours",
    labsCount: 10,
    rating: 4.9,
    enrolledCount: 4500,
  },
  {
    id: "group-2",
    title: "DevOps Fundamentals Bundle",
    description: "Master DevOps essentials with Docker, Kubernetes, CI/CD, and monitoring tools.",
    thumbnail: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=500",
    isFree: false,
    price: 129,
    duration: "25 hours",
    labsCount: 8,
    rating: 4.8,
    enrolledCount: 3200,
  },
  {
    id: "group-3",
    title: "Cloud Security Essentials",
    description: "Learn security best practices across AWS, Azure, and GCP platforms.",
    thumbnail: "https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?w=500",
    isFree: true,
    duration: "15 hours",
    labsCount: 5,
    rating: 4.7,
    enrolledCount: 6800,
  },
];

export default function LabsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [priceFilter, setPriceFilter] = useState("all");
  const [levelFilter, setLevelFilter] = useState("all");
  const [platformFilter, setPlatformFilter] = useState("all");

  const filteredLabs = allLabs.filter((lab) => {
    const matchesSearch = lab.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lab.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesPrice = priceFilter === "all" || 
      (priceFilter === "free" && lab.isFree) || 
      (priceFilter === "paid" && !lab.isFree);
    const matchesLevel = levelFilter === "all" || lab.level.toLowerCase() === levelFilter;
    const matchesPlatform = platformFilter === "all" || lab.platform === platformFilter;
    
    return matchesSearch && matchesPrice && matchesLevel && matchesPlatform;
  });

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-secondary to-secondary/70 flex items-center justify-center">
                <Beaker className="w-6 h-6 text-secondary-foreground" />
              </div>
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-foreground">
                  Skill Builder Labs
                </h1>
                <p className="text-muted-foreground">
                  Hands-on practice with real cloud environments
                </p>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <Tabs defaultValue="individual" className="mb-8">
            <TabsList className="grid w-full max-w-md grid-cols-2">
              <TabsTrigger value="individual" className="gap-2">
                <Beaker className="w-4 h-4" />
                Individual Labs
              </TabsTrigger>
              <TabsTrigger value="bundles" className="gap-2">
                <Layers className="w-4 h-4" />
                Lab Bundles
              </TabsTrigger>
            </TabsList>

            <TabsContent value="individual" className="mt-6">
              {/* Filters */}
              <div className="flex flex-col md:flex-row gap-4 mb-8">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="Search labs..."
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

                  <Select value={platformFilter} onValueChange={setPlatformFilter}>
                    <SelectTrigger className="w-36">
                      <SelectValue placeholder="Platform" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Platforms</SelectItem>
                      <SelectItem value="AWS">AWS</SelectItem>
                      <SelectItem value="Azure">Azure</SelectItem>
                      <SelectItem value="GCP">GCP</SelectItem>
                      <SelectItem value="DevOps">DevOps</SelectItem>
                      <SelectItem value="Multi-Cloud">Multi-Cloud</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Results count */}
              <div className="flex items-center justify-between mb-6">
                <p className="text-muted-foreground">
                  Showing <span className="font-semibold text-foreground">{filteredLabs.length}</span> labs
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
                  {platformFilter !== "all" && (
                    <Badge variant="outline">{platformFilter}</Badge>
                  )}
                </div>
              </div>

              {/* Labs Grid */}
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredLabs.map((lab) => (
                  <LabCard key={lab.id} {...lab} />
                ))}
              </div>

              {filteredLabs.length === 0 && (
                <div className="text-center py-16">
                  <Beaker className="w-16 h-16 text-muted-foreground/30 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-foreground mb-2">No labs found</h3>
                  <p className="text-muted-foreground">
                    Try adjusting your filters or search query
                  </p>
                </div>
              )}
            </TabsContent>

            <TabsContent value="bundles" className="mt-6">
              <div className="mb-6">
                <p className="text-muted-foreground">
                  Lab bundles offer a complete learning experience with multiple related labs at a discounted price.
                </p>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {groupLabs.map((group) => (
                  <GroupLabCard key={group.id} {...group} />
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <Footer />
    </div>
  );
}
