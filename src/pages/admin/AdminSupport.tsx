import AdminLayout from '@/components/admin/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { 
  HelpCircle, 
  MessageSquare, 
  Book, 
  Video, 
  Mail,
  ExternalLink,
  Search,
  ChevronRight
} from 'lucide-react';

const faqs = [
  {
    question: 'How do I create a new course?',
    answer: 'Navigate to "Add Course" in the sidebar and follow the step-by-step wizard to create your course content.',
  },
  {
    question: 'How do I manage user roles?',
    answer: 'Go to the Users page, select a user, and use the "Change Role" option to assign Admin, Instructor, or Student roles.',
  },
  {
    question: 'How do payments work?',
    answer: 'Payments are processed through Stripe. Connect your Stripe account in Settings > Payments to start accepting payments.',
  },
  {
    question: 'Can I import content from other platforms?',
    answer: 'Yes, we support importing content from various formats. Contact support for assistance with bulk imports.',
  },
];

const resources = [
  {
    title: 'Getting Started Guide',
    description: 'Learn the basics of setting up your platform',
    icon: Book,
    type: 'Documentation',
  },
  {
    title: 'Video Tutorials',
    description: 'Watch step-by-step video guides',
    icon: Video,
    type: 'Video',
  },
  {
    title: 'API Documentation',
    description: 'Integrate with our REST API',
    icon: ExternalLink,
    type: 'Documentation',
  },
];

const AdminSupport = () => {
  return (
    <AdminLayout title="Support">
      <div className="grid grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="col-span-2 space-y-6">
          {/* Search */}
          <Card className="border-0 shadow-sm">
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-4">How can we help you?</h2>
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input 
                  placeholder="Search for help articles, tutorials, and more..."
                  className="pl-12 h-12 text-lg"
                />
              </div>
            </CardContent>
          </Card>

          {/* FAQs */}
          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-primary" />
                Frequently Asked Questions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {faqs.map((faq, index) => (
                <div key={index} className="p-4 bg-muted/30 rounded-lg">
                  <h4 className="font-medium mb-2">{faq.question}</h4>
                  <p className="text-sm text-muted-foreground">{faq.answer}</p>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Contact Form */}
          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-primary" />
                Contact Support
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Subject</label>
                  <Input placeholder="Brief description of your issue" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Priority</label>
                  <select className="w-full h-10 px-3 rounded-md border border-input bg-background">
                    <option>Low</option>
                    <option>Medium</option>
                    <option>High</option>
                    <option>Critical</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Message</label>
                <Textarea 
                  placeholder="Describe your issue in detail..."
                  className="min-h-[150px]"
                />
              </div>
              <Button>
                <Mail className="w-4 h-4 mr-2" />
                Submit Ticket
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Resources */}
          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg">Resources</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {resources.map((resource, index) => (
                <div 
                  key={index}
                  className="flex items-center gap-3 p-3 hover:bg-muted/30 rounded-lg cursor-pointer transition-colors group"
                >
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                    <resource.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-sm">{resource.title}</p>
                    <p className="text-xs text-muted-foreground">{resource.description}</p>
                  </div>
                  <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors" />
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Contact Info */}
          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg">Contact Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm text-muted-foreground">Email Support</p>
                <p className="font-medium">support@techskills.com</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Response Time</p>
                <Badge variant="secondary" className="bg-green-100 text-green-700">
                  Usually within 24 hours
                </Badge>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Business Hours</p>
                <p className="font-medium">Mon - Fri, 9am - 6pm EST</p>
              </div>
            </CardContent>
          </Card>

          {/* Status */}
          <Card className="border-0 shadow-sm bg-green-50">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <span className="font-medium text-green-700">All Systems Operational</span>
              </div>
              <p className="text-sm text-green-600">
                Platform is running smoothly with no reported issues.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminSupport;
