import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
  Code,
  Puzzle,
  FileText,
  Award,
  Copy,
  Check,
  Timer,
  Pause,
  RotateCcw,
} from "lucide-react";
import { toast } from "sonner";

// Mock lab data
const labData = {
  id: "1",
  title: "Deploy a Kubernetes Cluster on AWS EKS",
  description: "Learn how to deploy and manage containerized applications using Amazon Elastic Kubernetes Service (EKS). This comprehensive lab covers cluster creation, node management, and application deployment.",
  thumbnail: "https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=800",
  introVideo: "https://www.youtube.com/embed/dQw4w9WgXcQ",
  isFree: true,
  price: 29,
  duration: "2 hours",
  level: "Intermediate" as const,
  rating: 4.8,
  enrolledCount: 15420,
  platform: "AWS",
  whatYouWillLearn: [
    "Create and configure an EKS cluster",
    "Deploy containerized applications to Kubernetes",
    "Manage node groups and scaling policies",
    "Implement service discovery and load balancing",
    "Monitor cluster health and performance",
    "Implement security best practices",
  ],
  prerequisites: [
    "Basic understanding of Docker and containers",
    "Familiarity with AWS console",
    "Basic Linux command line skills",
  ],
  isPurchased: true, // Toggle this to simulate purchase state
};

const labContent = {
  overview: `
## Lab Overview

In this hands-on lab, you'll learn how to deploy and manage a production-ready Kubernetes cluster on Amazon EKS. You'll work with real AWS infrastructure and apply best practices for container orchestration.

### What is Amazon EKS?

Amazon Elastic Kubernetes Service (EKS) is a managed container service to run and scale Kubernetes applications in the cloud or on-premises.

### Lab Environment

You'll have access to:
- A pre-configured AWS environment
- AWS CLI with proper permissions
- kubectl pre-installed and configured
- Helm package manager
  `,
  instructions: `
## Step 1: Create the EKS Cluster

First, let's create an EKS cluster using the AWS CLI:

\`\`\`bash
eksctl create cluster \\
  --name my-cluster \\
  --region us-west-2 \\
  --nodegroup-name standard-workers \\
  --node-type t3.medium \\
  --nodes 3
\`\`\`

This command will take about 15-20 minutes to complete.

## Step 2: Configure kubectl

Once the cluster is created, configure kubectl:

\`\`\`bash
aws eks update-kubeconfig --name my-cluster --region us-west-2
\`\`\`

## Step 3: Verify the Cluster

Check that your cluster is running:

\`\`\`bash
kubectl get nodes
kubectl cluster-info
\`\`\`

## Step 4: Deploy a Sample Application

Deploy a sample nginx application:

\`\`\`bash
kubectl create deployment nginx --image=nginx
kubectl expose deployment nginx --port=80 --type=LoadBalancer
\`\`\`

## Step 5: Access the Application

Get the external IP:

\`\`\`bash
kubectl get services nginx
\`\`\`
  `,
  codeExamples: [
    {
      title: "Create Deployment YAML",
      language: "yaml",
      code: `apiVersion: apps/v1
kind: Deployment
metadata:
  name: my-app
  labels:
    app: my-app
spec:
  replicas: 3
  selector:
    matchLabels:
      app: my-app
  template:
    metadata:
      labels:
        app: my-app
    spec:
      containers:
      - name: my-app
        image: nginx:latest
        ports:
        - containerPort: 80
        resources:
          requests:
            memory: "64Mi"
            cpu: "250m"
          limits:
            memory: "128Mi"
            cpu: "500m"`,
    },
    {
      title: "Create Service YAML",
      language: "yaml",
      code: `apiVersion: v1
kind: Service
metadata:
  name: my-app-service
spec:
  selector:
    app: my-app
  ports:
  - protocol: TCP
    port: 80
    targetPort: 80
  type: LoadBalancer`,
    },
  ],
  puzzleQuestions: [
    {
      question: "What command is used to create an EKS cluster?",
      options: ["kubectl create cluster", "aws eks create-cluster", "eksctl create cluster", "docker create cluster"],
      correctAnswer: 2,
    },
    {
      question: "Which Kubernetes resource type exposes a deployment externally?",
      options: ["Pod", "Deployment", "Service", "ConfigMap"],
      correctAnswer: 2,
    },
  ],
};

export default function LabDetailPage() {
  const { id } = useParams();
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [isLabStarted, setIsLabStarted] = useState(false);
  const [timerSeconds, setTimerSeconds] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});

  const copyToClipboard = (code: string, index: number) => {
    navigator.clipboard.writeText(code);
    setCopiedIndex(index);
    toast.success("Code copied to clipboard!");
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const formatTime = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs.toString().padStart(2, "0")}:${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const handleStartLab = () => {
    setIsLabStarted(true);
    setIsTimerRunning(true);
    toast.success("Lab environment is starting...");
  };

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
                  <Badge variant={labData.isFree ? "free" : "paid"}>
                    {labData.isFree ? "FREE" : `$${labData.price}`}
                  </Badge>
                  <Badge variant="level" className="bg-blue-100 text-blue-700">
                    {labData.level}
                  </Badge>
                  <Badge variant="outline">{labData.platform}</Badge>
                </div>

                <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                  {labData.title}
                </h1>

                <p className="text-lg text-muted-foreground mb-6">
                  {labData.description}
                </p>

                <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    <span>{labData.duration}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Star className="w-4 h-4 fill-premium text-premium" />
                    <span className="font-medium">{labData.rating}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    <span>{labData.enrolledCount.toLocaleString()} enrolled</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <BarChart3 className="w-4 h-4" />
                    <span>{labData.level}</span>
                  </div>
                </div>
              </div>

              {/* Thumbnail / Video */}
              <div className="lg:col-span-1">
                <Card variant="elevated" className="overflow-hidden">
                  <div className="aspect-video relative">
                    <img
                      src={labData.thumbnail}
                      alt={labData.title}
                      className="w-full h-full object-cover"
                    />
                    {!labData.isPurchased && !labData.isFree && (
                      <div className="absolute inset-0 bg-foreground/50 backdrop-blur-sm flex items-center justify-center">
                        <Lock className="w-12 h-12 text-primary-foreground" />
                      </div>
                    )}
                  </div>
                  <CardContent className="p-4">
                    {labData.isPurchased || labData.isFree ? (
                      <div className="space-y-3">
                        {isLabStarted ? (
                          <div className="flex items-center justify-between bg-muted rounded-lg p-3">
                            <div className="flex items-center gap-2">
                              <Timer className="w-5 h-5 text-primary" />
                              <span className="font-mono text-lg font-bold">{formatTime(timerSeconds)}</span>
                            </div>
                            <div className="flex gap-2">
                              <Button
                                size="icon"
                                variant="ghost"
                                onClick={() => setIsTimerRunning(!isTimerRunning)}
                              >
                                {isTimerRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                              </Button>
                              <Button
                                size="icon"
                                variant="ghost"
                                onClick={() => {
                                  setTimerSeconds(0);
                                  setIsTimerRunning(false);
                                }}
                              >
                                <RotateCcw className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>
                        ) : (
                          <Button
                            size="lg"
                            className="w-full"
                            variant="success"
                            onClick={handleStartLab}
                          >
                            <Play className="w-5 h-5 mr-2" />
                            Start Lab
                          </Button>
                        )}
                      </div>
                    ) : (
                      <div className="space-y-3">
                        <div className="text-center">
                          <div className="text-3xl font-bold text-foreground mb-1">${labData.price}</div>
                          <p className="text-sm text-muted-foreground">One-time purchase</p>
                        </div>
                        <Button size="lg" className="w-full" variant="premium">
                          <Lock className="w-5 h-5 mr-2" />
                          Unlock Lab
                        </Button>
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
          {/* What You'll Learn - Always Visible */}
          <Card className="mb-8">
            <CardContent className="p-6">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-success" />
                What You'll Learn
              </h2>
              <div className="grid sm:grid-cols-2 gap-3">
                {labData.whatYouWillLearn.map((item, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-success mt-0.5 shrink-0" />
                    <span className="text-muted-foreground">{item}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Lab Content - Conditional */}
          {labData.isPurchased || labData.isFree ? (
            <Tabs defaultValue="overview" className="space-y-6">
              <TabsList className="grid w-full max-w-2xl grid-cols-5">
                <TabsTrigger value="overview" className="gap-1">
                  <BookOpen className="w-4 h-4" />
                  <span className="hidden sm:inline">Overview</span>
                </TabsTrigger>
                <TabsTrigger value="instructions" className="gap-1">
                  <FileText className="w-4 h-4" />
                  <span className="hidden sm:inline">Instructions</span>
                </TabsTrigger>
                <TabsTrigger value="code" className="gap-1">
                  <Code className="w-4 h-4" />
                  <span className="hidden sm:inline">Code</span>
                </TabsTrigger>
                <TabsTrigger value="puzzle" className="gap-1">
                  <Puzzle className="w-4 h-4" />
                  <span className="hidden sm:inline">Quiz</span>
                </TabsTrigger>
                <TabsTrigger value="complete" className="gap-1">
                  <Award className="w-4 h-4" />
                  <span className="hidden sm:inline">Complete</span>
                </TabsTrigger>
              </TabsList>

              <TabsContent value="overview">
                <Card>
                  <CardContent className="p-6 prose prose-slate max-w-none">
                    <div dangerouslySetInnerHTML={{ __html: labContent.overview.replace(/\n/g, '<br/>') }} />
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="instructions">
                <Card>
                  <CardContent className="p-6 prose prose-slate max-w-none">
                    <div className="space-y-6">
                      {labContent.instructions.split('```').map((segment, index) => {
                        if (index % 2 === 1) {
                          const [lang, ...codeLines] = segment.split('\n');
                          const code = codeLines.join('\n').trim();
                          return (
                            <div key={index} className="relative group">
                              <div className="bg-sidebar rounded-lg overflow-hidden">
                                <div className="flex items-center justify-between px-4 py-2 border-b border-sidebar-border">
                                  <span className="text-xs font-mono text-sidebar-foreground/60">{lang || 'bash'}</span>
                                  <Button
                                    size="sm"
                                    variant="ghost"
                                    className="text-sidebar-foreground/60 hover:text-sidebar-foreground h-7"
                                    onClick={() => copyToClipboard(code, index)}
                                  >
                                    {copiedIndex === index ? (
                                      <Check className="w-3.5 h-3.5 mr-1" />
                                    ) : (
                                      <Copy className="w-3.5 h-3.5 mr-1" />
                                    )}
                                    {copiedIndex === index ? 'Copied!' : 'Copy'}
                                  </Button>
                                </div>
                                <pre className="p-4 overflow-x-auto">
                                  <code className="text-sm text-sidebar-foreground">{code}</code>
                                </pre>
                              </div>
                            </div>
                          );
                        }
                        return (
                          <div key={index} className="whitespace-pre-line">
                            {segment}
                          </div>
                        );
                      })}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="code">
                <div className="space-y-6">
                  {labContent.codeExamples.map((example, index) => (
                    <Card key={index}>
                      <CardContent className="p-0">
                        <div className="bg-sidebar rounded-lg overflow-hidden">
                          <div className="flex items-center justify-between px-4 py-3 border-b border-sidebar-border">
                            <span className="font-medium text-sidebar-foreground">{example.title}</span>
                            <Button
                              size="sm"
                              variant="ghost"
                              className="text-sidebar-foreground/60 hover:text-sidebar-foreground"
                              onClick={() => copyToClipboard(example.code, index + 100)}
                            >
                              {copiedIndex === index + 100 ? (
                                <Check className="w-4 h-4 mr-1" />
                              ) : (
                                <Copy className="w-4 h-4 mr-1" />
                              )}
                              {copiedIndex === index + 100 ? 'Copied!' : 'Copy'}
                            </Button>
                          </div>
                          <pre className="p-4 overflow-x-auto">
                            <code className="text-sm text-sidebar-foreground">{example.code}</code>
                          </pre>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="puzzle">
                <Card>
                  <CardContent className="p-6">
                    <h2 className="text-xl font-bold mb-6">Knowledge Check</h2>
                    <div className="space-y-8">
                      {labContent.puzzleQuestions.map((q, qIndex) => (
                        <div key={qIndex} className="space-y-4">
                          <p className="font-medium text-foreground">
                            {qIndex + 1}. {q.question}
                          </p>
                          <div className="grid gap-2">
                            {q.options.map((option, oIndex) => (
                              <button
                                key={oIndex}
                                className={`text-left p-4 rounded-lg border transition-colors ${
                                  selectedAnswers[qIndex] === oIndex
                                    ? selectedAnswers[qIndex] === q.correctAnswer
                                      ? 'border-success bg-success-light'
                                      : 'border-destructive bg-destructive/10'
                                    : 'border-border hover:border-primary/50 hover:bg-accent'
                                }`}
                                onClick={() => setSelectedAnswers({ ...selectedAnswers, [qIndex]: oIndex })}
                              >
                                {option}
                              </button>
                            ))}
                          </div>
                          {selectedAnswers[qIndex] !== undefined && (
                            <p className={`text-sm ${selectedAnswers[qIndex] === q.correctAnswer ? 'text-success' : 'text-destructive'}`}>
                              {selectedAnswers[qIndex] === q.correctAnswer ? '✓ Correct!' : '✗ Try again!'}
                            </p>
                          )}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="complete">
                <Card className="text-center">
                  <CardContent className="p-12">
                    <div className="w-24 h-24 rounded-full bg-gradient-to-br from-success to-success/70 flex items-center justify-center mx-auto mb-6">
                      <Award className="w-12 h-12 text-success-foreground" />
                    </div>
                    <h2 className="text-2xl font-bold mb-4">Complete This Lab</h2>
                    <p className="text-muted-foreground mb-8 max-w-md mx-auto">
                      Once you've finished all the lab tasks, click the button below to mark this lab as completed and receive your certificate.
                    </p>
                    <Button size="lg" variant="success" className="gap-2">
                      <CheckCircle2 className="w-5 h-5" />
                      Mark as Completed
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          ) : (
            /* Locked Content Preview */
            <Card className="relative overflow-hidden">
              <div className="absolute inset-0 backdrop-blur-sm bg-background/80 z-10 flex items-center justify-center">
                <div className="text-center p-8">
                  <Lock className="w-16 h-16 text-premium mx-auto mb-4" />
                  <h3 className="text-xl font-bold mb-2">Unlock Full Lab Content</h3>
                  <p className="text-muted-foreground mb-6 max-w-md">
                    Get access to all lab instructions, code examples, quizzes, and earn your certificate.
                  </p>
                  <Button variant="premium" size="lg">
                    Unlock for ${labData.price}
                  </Button>
                </div>
              </div>
              <CardContent className="p-6 min-h-[400px]">
                <div className="space-y-4">
                  <div className="h-8 bg-muted rounded w-3/4" />
                  <div className="h-4 bg-muted rounded w-full" />
                  <div className="h-4 bg-muted rounded w-5/6" />
                  <div className="h-4 bg-muted rounded w-4/5" />
                  <div className="h-32 bg-muted rounded mt-8" />
                  <div className="h-4 bg-muted rounded w-full" />
                  <div className="h-4 bg-muted rounded w-3/4" />
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
