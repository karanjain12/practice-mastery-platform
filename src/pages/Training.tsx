import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Calendar, Clock, Star, Award, Video, MessageSquare, CheckCircle2 } from "lucide-react";

const upcomingTrainings = [
  {
    id: "1",
    title: "AWS Solutions Architect Bootcamp",
    instructor: "John Smith",
    instructorImage: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150",
    date: "Jan 15-17, 2025",
    time: "9:00 AM - 5:00 PM EST",
    duration: "3 days",
    price: 499,
    rating: 4.9,
    enrolledCount: 24,
    maxCapacity: 30,
    topics: ["VPC Design", "EC2 & Load Balancing", "S3 & Storage", "RDS & Databases", "Security Best Practices"],
  },
  {
    id: "2",
    title: "Kubernetes Advanced Workshop",
    instructor: "Sarah Johnson",
    instructorImage: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150",
    date: "Jan 22-23, 2025",
    time: "10:00 AM - 6:00 PM EST",
    duration: "2 days",
    price: 349,
    rating: 4.8,
    enrolledCount: 18,
    maxCapacity: 25,
    topics: ["Cluster Management", "Helm Charts", "Service Mesh", "Monitoring & Logging", "CI/CD Integration"],
  },
  {
    id: "3",
    title: "Azure DevOps Masterclass",
    instructor: "Michael Chen",
    instructorImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150",
    date: "Feb 5-7, 2025",
    time: "9:00 AM - 4:00 PM EST",
    duration: "3 days",
    price: 449,
    rating: 4.9,
    enrolledCount: 20,
    maxCapacity: 30,
    topics: ["Azure Pipelines", "ARM Templates", "Container Registry", "Kubernetes on AKS", "Infrastructure as Code"],
  },
];

const instructors = [
  {
    name: "John Smith",
    title: "AWS Solutions Architect",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200",
    expertise: ["AWS", "Cloud Architecture", "DevOps"],
    experience: "15+ years",
  },
  {
    name: "Sarah Johnson",
    title: "Kubernetes Expert",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200",
    expertise: ["Kubernetes", "Docker", "CI/CD"],
    experience: "12+ years",
  },
  {
    name: "Michael Chen",
    title: "Azure MVP",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200",
    expertise: ["Azure", "DevOps", "Security"],
    experience: "10+ years",
  },
];

export default function TrainingPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-premium to-premium/70 flex items-center justify-center mx-auto mb-6">
              <Users className="w-8 h-8 text-premium-foreground" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Expert-Led Training
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Live, interactive sessions with industry experts. Get personalized guidance, 
              real-time Q&A, and career-focused training.
            </p>
          </div>

          {/* Features */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {[
              { icon: Video, title: "Live Sessions", desc: "Real-time interactive training" },
              { icon: MessageSquare, title: "Q&A Support", desc: "Ask questions directly" },
              { icon: Award, title: "Certificate", desc: "Industry-recognized credentials" },
              { icon: Users, title: "Small Groups", desc: "Personalized attention" },
            ].map((feature, index) => (
              <Card key={index} variant="outline" className="text-center">
                <CardContent className="pt-6">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-premium/20 to-premium/5 flex items-center justify-center mx-auto mb-4">
                    <feature.icon className="w-6 h-6 text-premium" />
                  </div>
                  <h3 className="font-semibold mb-1">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Upcoming Trainings */}
          <div className="mb-16">
            <h2 className="text-2xl font-bold mb-8">Upcoming Training Sessions</h2>
            <div className="space-y-6">
              {upcomingTrainings.map((training) => (
                <Card key={training.id} variant="elevated" className="overflow-hidden">
                  <div className="grid md:grid-cols-4 gap-6 p-6">
                    {/* Instructor */}
                    <div className="flex items-center gap-4">
                      <img
                        src={training.instructorImage}
                        alt={training.instructor}
                        className="w-16 h-16 rounded-full object-cover"
                      />
                      <div>
                        <p className="font-semibold text-foreground">{training.instructor}</p>
                        <p className="text-sm text-muted-foreground">Lead Instructor</p>
                        <div className="flex items-center gap-1 mt-1">
                          <Star className="w-3.5 h-3.5 fill-premium text-premium" />
                          <span className="text-sm font-medium">{training.rating}</span>
                        </div>
                      </div>
                    </div>

                    {/* Details */}
                    <div className="md:col-span-2">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge variant="paid">${training.price}</Badge>
                        <Badge variant="outline">{training.duration}</Badge>
                      </div>
                      <h3 className="text-xl font-bold mb-2">{training.title}</h3>
                      <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-3">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          <span>{training.date}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          <span>{training.time}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Users className="w-4 h-4" />
                          <span>{training.enrolledCount}/{training.maxCapacity} enrolled</span>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {training.topics.map((topic, i) => (
                          <Badge key={i} variant="level" className="bg-muted">
                            {topic}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* CTA */}
                    <div className="flex flex-col justify-center items-end gap-3">
                      <div className="text-right">
                        <p className="text-2xl font-bold text-foreground">${training.price}</p>
                        <p className="text-xs text-muted-foreground">per person</p>
                      </div>
                      <Button variant="premium" size="lg">
                        Enroll Now
                      </Button>
                      <p className="text-xs text-muted-foreground">
                        {training.maxCapacity - training.enrolledCount} spots left
                      </p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Instructors */}
          <div className="mb-16">
            <h2 className="text-2xl font-bold mb-8">Meet Our Instructors</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {instructors.map((instructor, index) => (
                <Card key={index} variant="elevated">
                  <CardContent className="p-6 text-center">
                    <img
                      src={instructor.image}
                      alt={instructor.name}
                      className="w-24 h-24 rounded-full object-cover mx-auto mb-4"
                    />
                    <h3 className="text-lg font-bold mb-1">{instructor.name}</h3>
                    <p className="text-sm text-muted-foreground mb-3">{instructor.title}</p>
                    <Badge variant="outline" className="mb-4">
                      {instructor.experience}
                    </Badge>
                    <div className="flex flex-wrap justify-center gap-2">
                      {instructor.expertise.map((skill, i) => (
                        <Badge key={i} variant="secondary">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Why Choose */}
          <Card className="bg-gradient-to-br from-primary to-primary-dark text-primary-foreground">
            <CardContent className="p-8 md:p-12">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <h2 className="text-2xl md:text-3xl font-bold mb-4">
                    Why Choose Expert-Led Training?
                  </h2>
                  <ul className="space-y-3">
                    {[
                      "Direct interaction with industry professionals",
                      "Real-world scenarios and case studies",
                      "Networking opportunities with peers",
                      "Hands-on labs in live environments",
                      "Personalized feedback and guidance",
                      "Career advice and mentorship",
                    ].map((item, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <CheckCircle2 className="w-5 h-5 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="text-center">
                  <div className="text-5xl font-bold mb-2">95%</div>
                  <p className="text-primary-foreground/80 mb-6">
                    of our students report career advancement after completing training
                  </p>
                  <Button size="lg" variant="hero-outline">
                    Browse All Training
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
}
