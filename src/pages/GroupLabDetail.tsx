import { useParams, Link } from "react-router-dom";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LabCard } from "@/components/cards/LabCard";
import { ArrowLeft, Clock, Star, Users, Lock, Layers, Award, CheckCircle2 } from "lucide-react";

// Mock group lab data
const groupLabData = {
  id: "group-1",
  title: "AWS Solutions Architect Lab Bundle",
  description: "Complete lab bundle covering all AWS Solutions Architect Associate exam topics. Practice with 10 hands-on labs that will prepare you for real-world cloud architecture challenges and the certification exam.",
  thumbnail: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800",
  isFree: false,
  price: 149,
  duration: "30 hours",
  labsCount: 10,
  rating: 4.9,
  enrolledCount: 4500,
  isPurchased: true, // Toggle to simulate purchase state
  whatYouWillLearn: [
    "Design highly available and fault-tolerant architectures",
    "Implement AWS security best practices",
    "Select appropriate AWS services for specific use cases",
    "Optimize costs and performance",
    "Migrate complex workloads to AWS",
  ],
};

const includedLabs = [
  {
    id: "1",
    title: "VPC Design and Implementation",
    description: "Create a multi-tier VPC with public and private subnets, NAT gateway, and security groups.",
    thumbnail: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=500",
    isFree: false,
    price: 29,
    duration: "2 hours",
    level: "Intermediate" as const,
    rating: 4.8,
    enrolledCount: 8200,
    completed: true,
  },
  {
    id: "2",
    title: "EC2 Auto Scaling Deep Dive",
    description: "Configure auto scaling groups with launch templates and scaling policies.",
    thumbnail: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=500",
    isFree: false,
    price: 29,
    duration: "2.5 hours",
    level: "Intermediate" as const,
    rating: 4.7,
    enrolledCount: 6800,
    completed: true,
  },
  {
    id: "3",
    title: "Application Load Balancer Setup",
    description: "Deploy and configure ALB with path-based routing and SSL termination.",
    thumbnail: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=500",
    isFree: false,
    price: 25,
    duration: "1.5 hours",
    level: "Intermediate" as const,
    rating: 4.9,
    enrolledCount: 7100,
    completed: false,
  },
  {
    id: "4",
    title: "S3 Advanced Features",
    description: "Implement versioning, lifecycle policies, cross-region replication, and S3 events.",
    thumbnail: "https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=500",
    isFree: false,
    price: 25,
    duration: "2 hours",
    level: "Intermediate" as const,
    rating: 4.8,
    enrolledCount: 9200,
    completed: false,
  },
  {
    id: "5",
    title: "RDS Multi-AZ Deployment",
    description: "Set up highly available RDS instances with read replicas and automated backups.",
    thumbnail: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=500",
    isFree: false,
    price: 35,
    duration: "3 hours",
    level: "Advanced" as const,
    rating: 4.9,
    enrolledCount: 5400,
    completed: false,
  },
];

export default function GroupLabDetailPage() {
  const { id } = useParams();
  
  const completedLabs = includedLabs.filter(l => l.completed).length;
  const progressPercent = Math.round((completedLabs / includedLabs.length) * 100);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="pt-20">
        {/* Header */}
        <div className="bg-gradient-to-b from-primary/10 to-background border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <Link to="/labs" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6 transition-colors">
              <ArrowLeft className="w-4 h-4" />
              Back to Labs
            </Link>

            <div className="grid lg:grid-cols-3 gap-8">
              {/* Main Info */}
              <div className="lg:col-span-2">
                <div className="flex items-center gap-3 mb-4">
                  <Badge variant={groupLabData.isFree ? "free" : "paid"}>
                    {groupLabData.isFree ? "FREE" : `$${groupLabData.price}`}
                  </Badge>
                  <Badge variant="secondary" className="bg-primary text-primary-foreground">
                    <Layers className="w-3 h-3 mr-1" />
                    {groupLabData.labsCount} Labs Bundle
                  </Badge>
                </div>

                <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                  {groupLabData.title}
                </h1>

                <p className="text-lg text-muted-foreground mb-6">
                  {groupLabData.description}
                </p>

                <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    <span>{groupLabData.duration}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Star className="w-4 h-4 fill-premium text-premium" />
                    <span className="font-medium">{groupLabData.rating}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    <span>{groupLabData.enrolledCount.toLocaleString()} enrolled</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Layers className="w-4 h-4" />
                    <span>{groupLabData.labsCount} labs included</span>
                  </div>
                </div>
              </div>

              {/* Sidebar Card */}
              <div className="lg:col-span-1">
                <Card variant="elevated" className="overflow-hidden">
                  <div className="aspect-video relative">
                    <img
                      src={groupLabData.thumbnail}
                      alt={groupLabData.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4">
                      <Badge variant="secondary" className="bg-primary-foreground/90 text-foreground">
                        <Layers className="w-3 h-3 mr-1" />
                        {groupLabData.labsCount} Labs Bundle
                      </Badge>
                    </div>
                  </div>
                  <CardContent className="p-4">
                    {groupLabData.isPurchased ? (
                      <div className="space-y-4">
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-medium">Bundle Progress</span>
                            <span className="text-sm text-muted-foreground">{progressPercent}%</span>
                          </div>
                          <div className="h-2 bg-muted rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-gradient-to-r from-primary to-secondary transition-all duration-500"
                              style={{ width: `${progressPercent}%` }}
                            />
                          </div>
                          <p className="text-xs text-muted-foreground mt-1">
                            {completedLabs} of {includedLabs.length} labs completed
                          </p>
                        </div>
                        {progressPercent === 100 && (
                          <Button size="lg" className="w-full" variant="success">
                            <Award className="w-5 h-5 mr-2" />
                            Claim Certificate
                          </Button>
                        )}
                      </div>
                    ) : (
                      <div className="space-y-3">
                        <div className="text-center">
                          <div className="flex items-baseline justify-center gap-2">
                            <span className="text-sm text-muted-foreground line-through">$290</span>
                            <span className="text-3xl font-bold text-foreground">${groupLabData.price}</span>
                          </div>
                          <p className="text-sm text-success font-medium">Save 49%</p>
                        </div>
                        <Button size="lg" className="w-full" variant="premium">
                          <Lock className="w-5 h-5 mr-2" />
                          Unlock Bundle
                        </Button>
                        <p className="text-xs text-center text-muted-foreground">
                          Lifetime access to all labs
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
          {/* What You'll Learn */}
          <Card className="mb-8">
            <CardContent className="p-6">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-success" />
                What You'll Learn
              </h2>
              <div className="grid sm:grid-cols-2 gap-3">
                {groupLabData.whatYouWillLearn.map((item, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-success mt-0.5 shrink-0" />
                    <span className="text-muted-foreground">{item}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Included Labs */}
          <h2 className="text-2xl font-bold mb-6">Labs Included in This Bundle</h2>
          
          {groupLabData.isPurchased ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {includedLabs.map((lab) => (
                <div key={lab.id} className="relative">
                  {lab.completed && (
                    <div className="absolute -top-2 -right-2 z-10">
                      <div className="w-8 h-8 rounded-full bg-success flex items-center justify-center shadow-md">
                        <CheckCircle2 className="w-5 h-5 text-success-foreground" />
                      </div>
                    </div>
                  )}
                  <LabCard 
                    {...lab} 
                    isFree={true} // Labs are unlocked when bundle is purchased
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className="relative">
              <div className="absolute inset-0 backdrop-blur-sm bg-background/80 z-10 flex items-center justify-center">
                <div className="text-center p-8">
                  <Lock className="w-16 h-16 text-premium mx-auto mb-4" />
                  <h3 className="text-xl font-bold mb-2">Unlock All Labs</h3>
                  <p className="text-muted-foreground mb-6 max-w-md">
                    Get access to all {groupLabData.labsCount} labs and earn your bundle certificate.
                  </p>
                  <Button variant="premium" size="lg">
                    Unlock for ${groupLabData.price}
                  </Button>
                </div>
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 opacity-50">
                {includedLabs.slice(0, 3).map((lab) => (
                  <LabCard key={lab.id} {...lab} />
                ))}
              </div>
            </div>
          )}

          {/* Bundle Certificate */}
          {groupLabData.isPurchased && (
            <Card className="mt-12 bg-gradient-to-br from-premium/10 to-background border-premium/20">
              <CardContent className="p-8 text-center">
                <Award className="w-16 h-16 text-premium mx-auto mb-4" />
                <h3 className="text-2xl font-bold mb-2">Bundle Certificate</h3>
                <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                  Complete all {groupLabData.labsCount} labs to unlock your AWS Solutions Architect Lab Bundle certificate.
                </p>
                <div className="flex items-center justify-center gap-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-foreground">{completedLabs}</div>
                    <p className="text-sm text-muted-foreground">Completed</p>
                  </div>
                  <div className="w-px h-12 bg-border" />
                  <div className="text-center">
                    <div className="text-3xl font-bold text-muted-foreground">{includedLabs.length - completedLabs}</div>
                    <p className="text-sm text-muted-foreground">Remaining</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
