import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminLayout from '@/components/admin/AdminLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  ArrowLeft, 
  ArrowRight, 
  Upload, 
  X, 
  Plus, 
  GripVertical,
  Image as ImageIcon,
  FlaskConical,
  Edit,
  Trash2,
  Search,
  Filter,
  Clock,
  Lock,
  Unlock
} from 'lucide-react';
import { cn } from '@/lib/utils';

const steps = [
  { id: 1, name: 'Basic Details', description: 'Lab information' },
  { id: 2, name: 'Lab Management', description: 'Configure labs' },
  { id: 3, name: 'Content Builder', description: 'Add content modules' },
  { id: 4, name: 'Review & Publish', description: 'Final review' },
];

const platforms = ['AWS', 'Google Cloud', 'Azure', 'Docker', 'Kubernetes', 'Linux'];
const levels = ['Beginner', 'Intermediate', 'Advanced', 'Expert'];
const labTypes = ['Self-paced', 'Video-guided', 'Instructor-led'];

interface SelectedLab {
  id: string;
  title: string;
  duration: string;
  level: string;
  type: 'free' | 'paid';
  icon: string;
}

interface AvailableLab {
  id: string;
  name: string;
  duration: string;
  category: string;
  type: 'free' | 'paid';
}

const AdminLabCreate = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  
  // Step 1 - Basic Details
  const [title, setTitle] = useState('');
  const [shortDescription, setShortDescription] = useState('');
  const [platform, setPlatform] = useState('');
  const [level, setLevel] = useState('');
  const [labType, setLabType] = useState('');
  const [duration, setDuration] = useState('60');
  const [isPaid, setIsPaid] = useState(true);
  const [price, setPrice] = useState('29.99');
  
  // Step 2 - Selected Labs
  const [selectedLabs, setSelectedLabs] = useState<SelectedLab[]>([
    { id: '1', title: 'Intro to Docker Containers', duration: '45m', level: 'Beginner', type: 'free', icon: '🐳' },
    { id: '2', title: 'Kubernetes Pods & Services', duration: '60m', level: 'Intermediate', type: 'paid', icon: '☸️' },
    { id: '3', title: 'Advanced Networking with NGINX', duration: '90m', level: 'Advanced', type: 'paid', icon: '🌐' },
  ]);
  
  const [availableLabs] = useState<AvailableLab[]>([
    { id: 'a1', name: 'AWS EC2 Basics', duration: '30 min', category: 'Cloud', type: 'free' },
    { id: 'a2', name: 'Python Data Science', duration: '120 min', category: 'Data', type: 'paid' },
    { id: 'a3', name: 'React Hooks Deep Dive', duration: '50 min', category: 'Frontend', type: 'free' },
    { id: 'a4', name: 'Go Concurrency', duration: '75 min', category: 'Backend', type: 'paid' },
    { id: 'a5', name: 'Terraform on Azure', duration: '90 min', category: 'DevOps', type: 'paid' },
  ]);
  
  const [labSearchQuery, setLabSearchQuery] = useState('');
  const [selectedAvailableLabs, setSelectedAvailableLabs] = useState<string[]>([]);

  const toggleSelectLab = (id: string) => {
    if (selectedAvailableLabs.includes(id)) {
      setSelectedAvailableLabs(selectedAvailableLabs.filter(lid => lid !== id));
    } else {
      setSelectedAvailableLabs([...selectedAvailableLabs, id]);
    }
  };

  const addSelectedLabs = () => {
    const labsToAdd = availableLabs
      .filter(lab => selectedAvailableLabs.includes(lab.id))
      .map(lab => ({
        id: lab.id,
        title: lab.name,
        duration: lab.duration,
        level: 'Beginner',
        type: lab.type,
        icon: '📦',
      }));
    setSelectedLabs([...selectedLabs, ...labsToAdd]);
    setSelectedAvailableLabs([]);
  };

  const removeLab = (id: string) => {
    setSelectedLabs(selectedLabs.filter(lab => lab.id !== id));
  };

  const getLabIcon = (index: number) => {
    const icons = ['🐳', '☸️', '🌐', '📦', '⚡'];
    return icons[index % icons.length];
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <Card className="border shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-6">
                  <FlaskConical className="w-5 h-5 text-primary" />
                  <h3 className="font-semibold text-sm uppercase tracking-wide text-muted-foreground">Lab Details</h3>
                </div>
                
                <div className="space-y-5">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Lab Title <span className="text-red-500">*</span>
                    </label>
                    <Input 
                      placeholder="e.g. Deploy Kubernetes Cluster on AWS"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      className="bg-muted/30"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Short Description</label>
                    <Textarea 
                      placeholder="A brief summary of what students will learn..."
                      value={shortDescription}
                      onChange={(e) => setShortDescription(e.target.value)}
                      className="bg-muted/30 min-h-[80px]"
                    />
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Platform</label>
                      <Select value={platform} onValueChange={setPlatform}>
                        <SelectTrigger className="bg-muted/30">
                          <SelectValue placeholder="Select platform" />
                        </SelectTrigger>
                        <SelectContent>
                          {platforms.map(p => (
                            <SelectItem key={p} value={p}>{p}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Level</label>
                      <Select value={level} onValueChange={setLevel}>
                        <SelectTrigger className="bg-muted/30">
                          <SelectValue placeholder="Select level" />
                        </SelectTrigger>
                        <SelectContent>
                          {levels.map(l => (
                            <SelectItem key={l} value={l}>{l}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Lab Type</label>
                      <Select value={labType} onValueChange={setLabType}>
                        <SelectTrigger className="bg-muted/30">
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                          {labTypes.map(t => (
                            <SelectItem key={t} value={t}>{t}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="border shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-6">
                  <ImageIcon className="w-5 h-5 text-primary" />
                  <h3 className="font-semibold text-sm uppercase tracking-wide text-muted-foreground">Media</h3>
                </div>
                
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">Lab Thumbnail</label>
                    <div className="border-2 border-dashed rounded-lg p-8 text-center hover:border-primary/50 transition-colors cursor-pointer">
                      <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                      <p className="text-sm text-muted-foreground">Click to upload or drag and drop</p>
                      <p className="text-xs text-muted-foreground mt-1">SVG, PNG, JPG or GIF (max. 800x600px)</p>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Preview</label>
                    <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                      <Badge className="bg-accent/10 text-accent border-accent/20">No image selected</Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="border shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-6">
                  <Clock className="w-5 h-5 text-primary" />
                  <h3 className="font-semibold text-sm uppercase tracking-wide text-muted-foreground">Settings</h3>
                </div>
                
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">Duration (minutes)</label>
                    <Input 
                      type="number" 
                      value={duration}
                      onChange={(e) => setDuration(e.target.value)}
                      className="bg-muted/30"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Pricing</label>
                    <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium">Paid Lab</span>
                        {isPaid && (
                          <div className="flex items-center gap-1 ml-4">
                            <span className="text-muted-foreground">$</span>
                            <Input 
                              type="number" 
                              value={price} 
                              onChange={(e) => setPrice(e.target.value)}
                              className="w-24 h-8"
                            />
                          </div>
                        )}
                      </div>
                      <Switch 
                        checked={isPaid} 
                        onCheckedChange={setIsPaid}
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        );
        
      case 2:
        return (
          <div className="grid grid-cols-5 gap-6">
            {/* Selected Labs */}
            <div className="col-span-3">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Selected Labs (Curriculum)</h3>
                <Badge variant="secondary">{selectedLabs.length} Labs</Badge>
              </div>
              
              <Card className="border shadow-sm">
                <CardContent className="p-4 space-y-3">
                  {selectedLabs.map((lab, index) => (
                    <div 
                      key={lab.id}
                      className="flex items-center justify-between p-4 border rounded-lg bg-white"
                    >
                      <div className="flex items-center gap-3">
                        <GripVertical className="w-4 h-4 text-muted-foreground cursor-grab" />
                        <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center text-lg">
                          {getLabIcon(index)}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-medium">{lab.title}</span>
                            <Badge variant={lab.type === 'free' ? 'free' : 'paid'} className="text-xs">
                              {lab.type === 'free' ? 'Free' : 'Paid'}
                            </Badge>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Clock className="w-3 h-3" />
                            <span>{lab.duration}</span>
                            <span>•</span>
                            <span>{lab.level}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-1">
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-8 w-8 text-muted-foreground hover:text-red-600"
                          onClick={() => removeLab(lab.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                  
                  {/* Drop zone */}
                  <div className="border-2 border-dashed rounded-lg p-6 text-center">
                    <Plus className="w-6 h-6 text-muted-foreground mx-auto mb-2" />
                    <p className="text-sm text-muted-foreground">Drag more labs here from the library below</p>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            {/* Available Lab Library */}
            <div className="col-span-2">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold">Available Lab Library</h3>
                <Button variant="ghost" size="sm" className="text-primary">
                  <Plus className="w-4 h-4 mr-1" />
                  Create New
                </Button>
              </div>
              
              <Card className="border shadow-sm">
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="relative flex-1">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input 
                        placeholder="Search labs..." 
                        className="pl-10"
                        value={labSearchQuery}
                        onChange={(e) => setLabSearchQuery(e.target.value)}
                      />
                    </div>
                    <Button variant="outline" size="icon">
                      <Filter className="w-4 h-4" />
                    </Button>
                  </div>
                  
                  <div className="space-y-1">
                    <div className="grid grid-cols-12 gap-2 px-3 py-2 text-xs font-medium text-muted-foreground uppercase">
                      <div className="col-span-1"></div>
                      <div className="col-span-6">Lab Name</div>
                      <div className="col-span-3">Type</div>
                      <div className="col-span-2">Action</div>
                    </div>
                    
                    {availableLabs
                      .filter(lab => lab.name.toLowerCase().includes(labSearchQuery.toLowerCase()))
                      .map(lab => (
                      <div 
                        key={lab.id}
                        className="grid grid-cols-12 gap-2 items-center px-3 py-3 hover:bg-muted/30 rounded-lg"
                      >
                        <div className="col-span-1">
                          <Checkbox 
                            checked={selectedAvailableLabs.includes(lab.id)}
                            onCheckedChange={() => toggleSelectLab(lab.id)}
                          />
                        </div>
                        <div className="col-span-6">
                          <p className="font-medium text-sm">{lab.name}</p>
                          <p className="text-xs text-muted-foreground">{lab.duration} • {lab.category}</p>
                        </div>
                        <div className="col-span-3">
                          <Badge variant={lab.type === 'free' ? 'free' : 'paid'} className="text-xs">
                            {lab.type === 'free' ? 'Free' : 'Paid'}
                          </Badge>
                        </div>
                        <div className="col-span-2">
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="text-primary text-xs h-7"
                            onClick={() => {
                              setSelectedLabs([...selectedLabs, {
                                id: lab.id,
                                title: lab.name,
                                duration: lab.duration,
                                level: 'Beginner',
                                type: lab.type,
                                icon: '📦',
                              }]);
                            }}
                          >
                            ADD
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="flex items-center justify-between mt-4 pt-4 border-t">
                    <span className="text-sm text-muted-foreground">
                      {selectedAvailableLabs.length} selected
                    </span>
                    <Button 
                      size="sm"
                      disabled={selectedAvailableLabs.length === 0}
                      onClick={addSelectedLabs}
                    >
                      Add Selected
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        );
        
      case 3:
        return (
          <div className="text-center py-12">
            <FlaskConical className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Lab Content Builder</h3>
            <p className="text-muted-foreground mb-6">
              This step uses the same content builder as courses.<br />
              Add text blocks, videos, code challenges, and puzzles.
            </p>
            <Button onClick={() => setCurrentStep(4)}>
              Skip to Review
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        );
        
      case 4:
        return (
          <div className="max-w-3xl mx-auto">
            <Card className="border shadow-sm">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-6">Review Lab Details</h3>
                
                <div className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Title</p>
                      <p className="font-medium">{title || 'Untitled Lab'}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Platform</p>
                      <p className="font-medium">{platform || 'Not specified'}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Level</p>
                      <p className="font-medium">{level || 'Not specified'}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Duration</p>
                      <p className="font-medium">{duration} minutes</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Pricing</p>
                      <Badge variant={isPaid ? 'paid' : 'free'}>
                        {isPaid ? `$${price}` : 'Free'}
                      </Badge>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Labs Included</p>
                      <p className="font-medium">{selectedLabs.length} labs</p>
                    </div>
                  </div>
                  
                  <div className="pt-6 border-t">
                    <h4 className="font-medium mb-3">Included Labs</h4>
                    <div className="space-y-2">
                      {selectedLabs.map((lab, index) => (
                        <div key={lab.id} className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg">
                          <span className="text-lg">{getLabIcon(index)}</span>
                          <div className="flex-1">
                            <p className="font-medium text-sm">{lab.title}</p>
                            <p className="text-xs text-muted-foreground">{lab.duration} • {lab.level}</p>
                          </div>
                          <Badge variant={lab.type === 'free' ? 'free' : 'paid'} className="text-xs">
                            {lab.type === 'free' ? 'Free' : 'Paid'}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        );
        
      default:
        return null;
    }
  };

  return (
    <AdminLayout title="Dashboard">
      <div className="mb-6">
        <Button 
          variant="ghost" 
          className="mb-4 text-muted-foreground"
          onClick={() => navigate('/admin')}
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Details
        </Button>
        
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Create New Lab</h1>
            <p className="text-muted-foreground mt-1">
              {currentStep === 2 
                ? 'Configure the practical labs for your students.' 
                : `Step ${currentStep} of ${steps.length}`}
            </p>
          </div>
          <Button variant="outline">Save Draft</Button>
        </div>
      </div>
      
      {/* Progress Steps */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-primary uppercase tracking-wide">
            Step {currentStep}: {steps[currentStep - 1]?.name}
          </span>
          <span className="text-sm text-muted-foreground">
            Step {currentStep} of {steps.length}
          </span>
        </div>
        <div className="h-1 bg-muted rounded-full overflow-hidden">
          <div 
            className="h-full bg-primary transition-all duration-300"
            style={{ width: `${(currentStep / steps.length) * 100}%` }}
          />
        </div>
      </div>
      
      {/* Step Content */}
      {renderStepContent()}
      
      {/* Navigation */}
      <div className="flex items-center justify-between mt-8 pt-6 border-t">
        <Button 
          variant="outline"
          onClick={() => currentStep > 1 ? setCurrentStep(currentStep - 1) : navigate('/admin')}
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          {currentStep === 2 ? 'Back to Details' : 'Back'}
        </Button>
        
        <Button onClick={() => currentStep < steps.length ? setCurrentStep(currentStep + 1) : null}>
          {currentStep < steps.length ? (
            <>
              {currentStep === 2 ? 'Continue to Modules' : 'Continue'}
              <ArrowRight className="w-4 h-4 ml-2" />
            </>
          ) : (
            'Publish Lab'
          )}
        </Button>
      </div>
    </AdminLayout>
  );
};

export default AdminLabCreate;
