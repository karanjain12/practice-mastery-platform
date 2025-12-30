import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Cloud,
  Server,
  Shield,
  Settings,
  Users,
  CheckCircle2,
  ArrowRight,
  Mail,
  Phone,
} from "lucide-react";

const services = [
  {
    id: "1",
    title: "AWS Account Setup",
    description: "Get help setting up and configuring your AWS account with best practices.",
    icon: Cloud,
    features: ["Account creation", "IAM setup", "Billing alerts", "Security baseline"],
  },
  {
    id: "2",
    title: "Azure Subscription Management",
    description: "Expert guidance for Azure subscription setup and management.",
    icon: Server,
    features: ["Subscription setup", "RBAC configuration", "Cost management", "Resource groups"],
  },
  {
    id: "3",
    title: "GCP Project Configuration",
    description: "Professional setup for Google Cloud Platform projects.",
    icon: Cloud,
    features: ["Project creation", "IAM policies", "Billing accounts", "API enablement"],
  },
  {
    id: "4",
    title: "Multi-Cloud Strategy",
    description: "Consultation for multi-cloud architecture and implementation.",
    icon: Settings,
    features: ["Architecture design", "Cost optimization", "Security review", "Migration planning"],
  },
  {
    id: "5",
    title: "Cloud Security Assessment",
    description: "Comprehensive security review of your cloud infrastructure.",
    icon: Shield,
    features: ["Security audit", "Compliance check", "Vulnerability scan", "Recommendations"],
  },
  {
    id: "6",
    title: "Enterprise Support",
    description: "Dedicated support for enterprise cloud environments.",
    icon: Users,
    features: ["24/7 support", "Dedicated engineer", "SLA guarantee", "Priority response"],
  },
];

export default function CloudServicesPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <Cloud className="w-6 h-6 text-primary" />
              </div>
            </div>
            <Badge className="mb-3 bg-secondary/10 text-secondary border-secondary/20">
              Scale Without Limits
            </Badge>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Cloud Access Services
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Get help setting up and managing your cloud accounts with expert guidance. 
              We provide end-to-end support for AWS, Azure, and GCP.
            </p>
          </div>

          {/* Services Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {services.map((service) => {
              const Icon = service.icon;
              return (
                <Card key={service.id} className="card-hover">
                  <CardHeader>
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <CardTitle className="text-lg">{service.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">
                      {service.description}
                    </p>
                    <ul className="space-y-2">
                      {service.features.map((feature) => (
                        <li key={feature} className="flex items-center gap-2 text-sm">
                          <CheckCircle2 className="w-4 h-4 text-success" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Contact Form */}
          <Card className="max-w-2xl mx-auto">
            <CardHeader className="text-center">
              <CardTitle>Request Cloud Services</CardTitle>
              <p className="text-muted-foreground">
                Fill out the form below and our team will get back to you within 24 hours.
              </p>
            </CardHeader>
            <CardContent>
              <form className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-foreground mb-1 block">
                      Name
                    </label>
                    <Input placeholder="Your name" />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground mb-1 block">
                      Email
                    </label>
                    <Input type="email" placeholder="your@email.com" />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-1 block">
                    Organization
                  </label>
                  <Input placeholder="Company name" />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-1 block">
                    Service Required
                  </label>
                  <Input placeholder="e.g., AWS Account Setup, Multi-Cloud Strategy" />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-1 block">
                    Requirements
                  </label>
                  <Textarea placeholder="Describe your requirements..." rows={4} />
                </div>
                <Button type="submit" className="w-full">
                  Submit Request <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
}
