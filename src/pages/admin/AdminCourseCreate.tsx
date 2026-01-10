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
  Video,
  FileText,
  Code,
  HelpCircle,
  Puzzle,
  Trash2,
  Edit,
  ChevronDown,
  ChevronUp,
  Link as LinkIcon,
  PlayCircle,
  Lock,
  Unlock,
  Settings,
  BookOpen
} from 'lucide-react';
import { cn } from '@/lib/utils';

const steps = [
  { id: 1, name: 'Basic Info', description: 'Course details' },
  { id: 2, name: 'Media', description: 'Videos & images' },
  { id: 3, name: 'Content', description: 'Modules & lessons' },
  { id: 4, name: 'Settings', description: 'Access & pricing' },
];

const categories = ['Web Development', 'Cloud Computing', 'Data Science', 'DevOps', 'Security', 'AI/ML'];
const levels = ['Beginner', 'Intermediate', 'Advanced', 'Expert'];
const durations = ['Hours', 'Days', 'Weeks'];

interface LearningOutcome {
  id: string;
  text: string;
}

interface Lesson {
  id: string;
  title: string;
  type: 'video' | 'article' | 'quiz' | 'code';
  duration: string;
}

interface Module {
  id: string;
  title: string;
  lessons: Lesson[];
  isExpanded: boolean;
}

const AdminCourseCreate = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  
  // Step 1 - Basic Info
  const [title, setTitle] = useState('');
  const [shortDescription, setShortDescription] = useState('');
  const [fullDescription, setFullDescription] = useState('');
  const [category, setCategory] = useState('');
  const [level, setLevel] = useState('');
  const [techStack, setTechStack] = useState<string[]>(['React', 'Tailwind CSS']);
  const [techInput, setTechInput] = useState('');
  
  // Step 2 - Media
  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [introVideoType, setIntroVideoType] = useState<'upload' | 'url'>('upload');
  const [introVideoUrl, setIntroVideoUrl] = useState('');
  const [learningOutcomes, setLearningOutcomes] = useState<LearningOutcome[]>([
    { id: '1', text: 'Understand the core principles of UI design' },
    { id: '2', text: 'Master layout systems and responsive design' },
    { id: '3', text: '' },
  ]);
  
  // Step 3 - Content
  const [modules, setModules] = useState<Module[]>([
    {
      id: '1',
      title: 'Module 1: Introduction to Design Theory',
      lessons: [
        { id: '1-1', title: 'Welcome to the course', type: 'video', duration: '05:20' },
        { id: '1-2', title: 'History of UI/UX', type: 'article', duration: '10 min read' },
      ],
      isExpanded: true,
    },
    {
      id: '2',
      title: 'Module 2: Layout & Grids',
      lessons: [],
      isExpanded: false,
    },
  ]);
  
  // Step 4 - Settings
  const [pricingModel, setPricingModel] = useState<'free' | 'paid'>('paid');
  const [price, setPrice] = useState('0.00');
  const [allowPreview, setAllowPreview] = useState(false);
  const [requirePrerequisites, setRequirePrerequisites] = useState(false);
  const [privateAccess, setPrivateAccess] = useState(false);

  const handleAddTech = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && techInput.trim()) {
      e.preventDefault();
      if (!techStack.includes(techInput.trim())) {
        setTechStack([...techStack, techInput.trim()]);
      }
      setTechInput('');
    }
  };

  const removeTech = (tech: string) => {
    setTechStack(techStack.filter(t => t !== tech));
  };

  const addLearningOutcome = () => {
    setLearningOutcomes([...learningOutcomes, { id: Date.now().toString(), text: '' }]);
  };

  const updateOutcome = (id: string, text: string) => {
    setLearningOutcomes(learningOutcomes.map(o => o.id === id ? { ...o, text } : o));
  };

  const removeOutcome = (id: string) => {
    setLearningOutcomes(learningOutcomes.filter(o => o.id !== id));
  };

  const addModule = () => {
    setModules([...modules, {
      id: Date.now().toString(),
      title: `Module ${modules.length + 1}: New Module`,
      lessons: [],
      isExpanded: true,
    }]);
  };

  const toggleModule = (id: string) => {
    setModules(modules.map(m => m.id === id ? { ...m, isExpanded: !m.isExpanded } : m));
  };

  const addLesson = (moduleId: string) => {
    setModules(modules.map(m => {
      if (m.id === moduleId) {
        return {
          ...m,
          lessons: [...m.lessons, {
            id: `${moduleId}-${Date.now()}`,
            title: 'New Lesson',
            type: 'video' as const,
            duration: '00:00',
          }],
        };
      }
      return m;
    }));
  };

  const getLessonIcon = (type: string) => {
    switch (type) {
      case 'video': return <PlayCircle className="w-4 h-4 text-primary" />;
      case 'article': return <FileText className="w-4 h-4 text-green-600" />;
      case 'quiz': return <HelpCircle className="w-4 h-4 text-purple-600" />;
      case 'code': return <Code className="w-4 h-4 text-orange-600" />;
      default: return <FileText className="w-4 h-4" />;
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <Card className="border shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-6">
                  <BookOpen className="w-5 h-5 text-primary" />
                  <h3 className="font-semibold text-sm uppercase tracking-wide text-muted-foreground">Basic Details</h3>
                </div>
                
                <div className="space-y-5">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Course Title <span className="text-red-500">*</span>
                    </label>
                    <Input 
                      placeholder="e.g. Advanced React Patterns & Performance"
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
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Full Description</label>
                    <div className="border rounded-lg overflow-hidden">
                      <div className="flex items-center gap-1 p-2 bg-muted/30 border-b">
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0 font-bold">B</Button>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0 italic">I</Button>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0 underline">U</Button>
                        <span className="w-px h-4 bg-border mx-1" />
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">•</Button>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">1.</Button>
                        <span className="w-px h-4 bg-border mx-1" />
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0"><LinkIcon className="w-4 h-4" /></Button>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0"><ImageIcon className="w-4 h-4" /></Button>
                      </div>
                      <Textarea 
                        placeholder="Detailed course content..."
                        value={fullDescription}
                        onChange={(e) => setFullDescription(e.target.value)}
                        className="border-0 rounded-none min-h-[120px] focus-visible:ring-0"
                      />
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
                    <label className="block text-sm font-medium mb-2">Course Thumbnail</label>
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
                  <Settings className="w-5 h-5 text-primary" />
                  <h3 className="font-semibold text-sm uppercase tracking-wide text-muted-foreground">Classification</h3>
                </div>
                
                <div className="grid grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">Category</label>
                    <Select value={category} onValueChange={setCategory}>
                      <SelectTrigger className="bg-muted/30">
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map(cat => (
                          <SelectItem key={cat} value={cat}>{cat}</SelectItem>
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
                        {levels.map(lvl => (
                          <SelectItem key={lvl} value={lvl}>{lvl}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Technology Stack</label>
                  <div className="flex flex-wrap gap-2 p-3 bg-muted/30 rounded-lg min-h-[48px]">
                    {techStack.map(tech => (
                      <Badge key={tech} className="bg-primary/10 text-primary hover:bg-primary/20 gap-1">
                        {tech}
                        <X className="w-3 h-3 cursor-pointer" onClick={() => removeTech(tech)} />
                      </Badge>
                    ))}
                    <input
                      type="text"
                      placeholder="Type and press Enter..."
                      className="bg-transparent border-0 outline-none text-sm flex-1 min-w-[150px]"
                      value={techInput}
                      onChange={(e) => setTechInput(e.target.value)}
                      onKeyDown={handleAddTech}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="border shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-6">
                  <Settings className="w-5 h-5 text-primary" />
                  <h3 className="font-semibold text-sm uppercase tracking-wide text-muted-foreground">Settings</h3>
                </div>
                
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">Total Duration</label>
                    <div className="flex gap-2">
                      <Input type="number" defaultValue="0" className="bg-muted/30" />
                      <Select defaultValue="Hours">
                        <SelectTrigger className="w-28 bg-muted/30">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {durations.map(d => (
                            <SelectItem key={d} value={d}>{d}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Paid Course</label>
                    <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                      <div>
                        <p className="text-sm font-medium">Enable to set a price for this course</p>
                        <div className="flex items-center gap-2 mt-2">
                          <span className="text-muted-foreground">$</span>
                          <Input 
                            type="number" 
                            value={price} 
                            onChange={(e) => setPrice(e.target.value)}
                            className="w-24 h-8"
                            disabled={pricingModel === 'free'}
                          />
                          <Select defaultValue="USD" disabled={pricingModel === 'free'}>
                            <SelectTrigger className="w-20 h-8">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="USD">USD</SelectItem>
                              <SelectItem value="EUR">EUR</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <Switch 
                        checked={pricingModel === 'paid'} 
                        onCheckedChange={(checked) => setPricingModel(checked ? 'paid' : 'free')}
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
          <div className="grid grid-cols-2 gap-6">
            <Card className="border shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold">Intro Video</h3>
                  <Video className="w-5 h-5 text-muted-foreground" />
                </div>
                
                <div className="flex border-b mb-4">
                  <button
                    className={cn(
                      "px-4 py-2 text-sm font-medium border-b-2 -mb-px transition-colors",
                      introVideoType === 'upload' 
                        ? "border-primary text-primary" 
                        : "border-transparent text-muted-foreground hover:text-foreground"
                    )}
                    onClick={() => setIntroVideoType('upload')}
                  >
                    Upload File
                  </button>
                  <button
                    className={cn(
                      "px-4 py-2 text-sm font-medium border-b-2 -mb-px transition-colors",
                      introVideoType === 'url' 
                        ? "border-primary text-primary" 
                        : "border-transparent text-muted-foreground hover:text-foreground"
                    )}
                    onClick={() => setIntroVideoType('url')}
                  >
                    External URL
                  </button>
                </div>
                
                {introVideoType === 'upload' ? (
                  <div className="border-2 border-dashed rounded-lg p-8 text-center hover:border-primary/50 transition-colors cursor-pointer">
                    <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                    <p className="text-sm text-muted-foreground">Click to upload or drag and drop</p>
                    <p className="text-xs text-muted-foreground mt-1">MP4, WebM or Ogg (Max 800MB)</p>
                  </div>
                ) : (
                  <div className="flex gap-2">
                    <Input 
                      placeholder="https://www.youtube.com/watch?v=..."
                      value={introVideoUrl}
                      onChange={(e) => setIntroVideoUrl(e.target.value)}
                      className="flex-1"
                    />
                    <Button>Fetch</Button>
                  </div>
                )}
              </CardContent>
            </Card>
            
            <Card className="border shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="font-semibold">What students will learn</h3>
                    <p className="text-sm text-muted-foreground">List 3-5 key outcomes.</p>
                  </div>
                  <Puzzle className="w-5 h-5 text-muted-foreground" />
                </div>
                
                <div className="space-y-3">
                  {learningOutcomes.map((outcome, index) => (
                    <div key={outcome.id} className="flex items-center gap-2">
                      <GripVertical className="w-4 h-4 text-muted-foreground cursor-grab" />
                      <Input 
                        placeholder="e.g. Build a complete design system from scratch"
                        value={outcome.text}
                        onChange={(e) => updateOutcome(outcome.id, e.target.value)}
                        className="flex-1"
                      />
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-9 w-9 text-muted-foreground hover:text-red-600"
                        onClick={() => removeOutcome(outcome.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                  
                  <Button 
                    variant="ghost" 
                    className="text-primary hover:text-primary w-full justify-start"
                    onClick={addLearningOutcome}
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add new outcome
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            <Card className="border shadow-sm col-span-2">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="font-semibold">Course Syllabus</h3>
                    <p className="text-sm text-muted-foreground">Organize your course into modules and lessons.</p>
                  </div>
                  <Button onClick={addModule}>
                    <Plus className="w-4 h-4 mr-2" />
                    Add Module
                  </Button>
                </div>
                
                <div className="space-y-4">
                  {modules.map((module) => (
                    <div key={module.id} className="border rounded-lg">
                      <div 
                        className="flex items-center justify-between p-4 cursor-pointer hover:bg-muted/30"
                        onClick={() => toggleModule(module.id)}
                      >
                        <div className="flex items-center gap-3">
                          {module.isExpanded ? (
                            <ChevronDown className="w-5 h-5 text-muted-foreground" />
                          ) : (
                            <ChevronUp className="w-5 h-5 text-muted-foreground" />
                          )}
                          <div>
                            <p className="font-medium">{module.title}</p>
                            <p className="text-sm text-primary">
                              {module.lessons.length} Lessons • {module.lessons.length * 5} Mins
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <Trash2 className="w-4 h-4" />
                          </Button>
                          <GripVertical className="w-4 h-4 text-muted-foreground cursor-grab" />
                        </div>
                      </div>
                      
                      {module.isExpanded && (
                        <div className="border-t px-4 pb-4">
                          <div className="space-y-2 mt-4">
                            {module.lessons.map((lesson) => (
                              <div key={lesson.id} className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg">
                                {getLessonIcon(lesson.type)}
                                <div className="flex-1">
                                  <p className="text-sm font-medium">{lesson.title}</p>
                                  <p className="text-xs text-muted-foreground capitalize">
                                    {lesson.type} • {lesson.duration}
                                  </p>
                                </div>
                              </div>
                            ))}
                          </div>
                          
                          <Button 
                            variant="ghost" 
                            className="text-primary hover:text-primary mt-3"
                            onClick={() => addLesson(module.id)}
                          >
                            <Plus className="w-4 h-4 mr-2" />
                            Add Lesson
                          </Button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        );
        
      case 3:
        return (
          <div className="grid grid-cols-3 gap-6">
            <div className="col-span-2 space-y-4">
              {/* Text Module */}
              <Card className="border shadow-sm">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <GripVertical className="w-4 h-4 text-muted-foreground cursor-grab" />
                      <FileText className="w-4 h-4 text-primary" />
                      <span className="font-medium text-sm">Text Module</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Settings className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                      <ChevronUp className="w-4 h-4 text-muted-foreground" />
                    </div>
                  </div>
                  
                  <h4 className="font-semibold mb-3">Introduction to Python Variables</h4>
                  
                  <div className="flex items-center gap-1 mb-2">
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0 font-bold">B</Button>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0 italic">I</Button>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0"><LinkIcon className="w-4 h-4" /></Button>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">•</Button>
                  </div>
                  
                  <div className="p-3 bg-muted/30 rounded-lg text-sm">
                    In Python, variables are created when you assign a value to it. Unlike other programming languages, Python has no command for declaring a variable.
                  </div>
                </CardContent>
              </Card>
              
              {/* Video Module */}
              <Card className="border shadow-sm">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <GripVertical className="w-4 h-4 text-muted-foreground cursor-grab" />
                      <Video className="w-4 h-4 text-red-500" />
                      <span className="font-medium text-sm">Video Lesson</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className="bg-accent/10 text-accent border-accent/20">
                        <Lock className="w-3 h-3 mr-1" />
                        PREMIUM
                      </Badge>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                      <ChevronUp className="w-4 h-4 text-muted-foreground" />
                    </div>
                  </div>
                  
                  <h4 className="font-semibold mb-3">Variables Explained</h4>
                  
                  <div className="flex border-b mb-4">
                    <button className="px-4 py-2 text-sm font-medium border-b-2 border-primary text-primary -mb-px">
                      URL Embed
                    </button>
                    <button className="px-4 py-2 text-sm font-medium border-b-2 border-transparent text-muted-foreground -mb-px">
                      Upload File
                    </button>
                  </div>
                  
                  <div className="flex gap-2 mb-4">
                    <div className="flex items-center gap-2 flex-1 px-3 py-2 bg-muted/30 rounded-lg">
                      <LinkIcon className="w-4 h-4 text-muted-foreground" />
                      <input 
                        type="text" 
                        placeholder="https://www.youtube.com/watch?v=..." 
                        className="bg-transparent border-0 outline-none text-sm flex-1"
                        defaultValue="https://www.youtube.com/watch?v=kqtD5dpn9C8"
                      />
                    </div>
                    <Button>Fetch</Button>
                  </div>
                  
                  <div className="aspect-video bg-gray-900 rounded-lg flex items-center justify-center">
                    <PlayCircle className="w-16 h-16 text-white/50" />
                  </div>
                </CardContent>
              </Card>
              
              {/* Code Challenge */}
              <Card className="border shadow-sm">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <GripVertical className="w-4 h-4 text-muted-foreground cursor-grab" />
                      <Code className="w-4 h-4 text-orange-500" />
                      <span className="font-medium text-sm">Code Challenge</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                      <ChevronUp className="w-4 h-4 text-muted-foreground" />
                    </div>
                  </div>
                  
                  <h4 className="font-semibold mb-3">Hands-on: Declare a Variable</h4>
                  
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="text-xs font-medium uppercase text-muted-foreground">Language</label>
                      <Select defaultValue="python">
                        <SelectTrigger className="mt-1">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="python">Python 3.10</SelectItem>
                          <SelectItem value="javascript">JavaScript</SelectItem>
                          <SelectItem value="typescript">TypeScript</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <label className="text-xs font-medium uppercase text-muted-foreground">Points</label>
                      <Input type="number" defaultValue="10" className="mt-1" />
                    </div>
                  </div>
                  
                  <div className="bg-gray-900 rounded-lg overflow-hidden">
                    <div className="flex items-center justify-between px-4 py-2 bg-gray-800">
                      <span className="text-xs text-gray-400">main.py</span>
                      <Button variant="ghost" size="sm" className="text-primary text-xs h-7">
                        Copy Code
                      </Button>
                    </div>
                    <pre className="p-4 text-sm text-green-400 font-mono">
                      <code>{`# Create a variable named 'x' and assign it value 5
x = 5

print(x)`}</code>
                    </pre>
                  </div>
                </CardContent>
              </Card>
              
              {/* Drop zone */}
              <div className="border-2 border-dashed rounded-lg p-8 text-center">
                <Plus className="w-6 h-6 text-muted-foreground mx-auto mb-2" />
                <p className="text-sm text-muted-foreground">Drag a module from the sidebar or click here to add</p>
              </div>
            </div>
            
            {/* Sidebar - Content Modules */}
            <div>
              <Card className="border shadow-sm sticky top-6">
                <CardContent className="p-4">
                  <h3 className="font-semibold text-sm uppercase tracking-wide text-primary mb-4">Content Modules</h3>
                  
                  <div className="space-y-2">
                    <div className="flex items-center gap-3 p-3 border rounded-lg hover:bg-muted/30 cursor-pointer transition-colors">
                      <FileText className="w-5 h-5 text-primary" />
                      <div>
                        <p className="font-medium text-sm">Text Block</p>
                        <p className="text-xs text-muted-foreground">Rich text & images</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3 p-3 border rounded-lg hover:bg-muted/30 cursor-pointer transition-colors">
                      <Video className="w-5 h-5 text-red-500" />
                      <div>
                        <p className="font-medium text-sm">Video Embed</p>
                        <p className="text-xs text-muted-foreground">Youtube, Vimeo, Upload</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3 p-3 border rounded-lg hover:bg-muted/30 cursor-pointer transition-colors">
                      <Code className="w-5 h-5 text-orange-500" />
                      <div>
                        <p className="font-medium text-sm">Code Challenge</p>
                        <p className="text-xs text-muted-foreground">Monaco Editor / IDE</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3 p-3 border rounded-lg hover:bg-muted/30 cursor-pointer transition-colors">
                      <HelpCircle className="w-5 h-5 text-purple-500" />
                      <div>
                        <p className="font-medium text-sm">Quiz / MCQ</p>
                        <p className="text-xs text-muted-foreground">Single or multiple choice</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3 p-3 border rounded-lg hover:bg-muted/30 cursor-pointer transition-colors">
                      <Puzzle className="w-5 h-5 text-accent" />
                      <div>
                        <p className="font-medium text-sm">Puzzle / Task</p>
                        <p className="text-xs text-muted-foreground">Drag & drop sorting</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-6 p-3 bg-muted/30 rounded-lg">
                    <h4 className="font-medium text-sm text-accent mb-1">Tips</h4>
                    <p className="text-xs text-muted-foreground">
                      You can drag items to reorder them. Use the "Lock" icon on blocks to make them accessible only to premium users.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        );
        
      case 4:
        return (
          <div className="max-w-2xl mx-auto space-y-6">
            <Card className="border shadow-sm">
              <CardContent className="p-6">
                <h3 className="font-semibold mb-4">Course Pricing Model</h3>
                
                <div className="grid grid-cols-2 gap-4">
                  <div 
                    className={cn(
                      "p-4 border-2 rounded-lg cursor-pointer transition-all",
                      pricingModel === 'free' 
                        ? "border-primary bg-primary/5" 
                        : "border-border hover:border-primary/50"
                    )}
                    onClick={() => setPricingModel('free')}
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                        <Unlock className="w-5 h-5 text-green-600" />
                      </div>
                      <span className="font-semibold">Free Course</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Users can access all content and labs without payment.
                    </p>
                  </div>
                  
                  <div 
                    className={cn(
                      "p-4 border-2 rounded-lg cursor-pointer transition-all relative",
                      pricingModel === 'paid' 
                        ? "border-primary bg-primary/5" 
                        : "border-border hover:border-primary/50"
                    )}
                    onClick={() => setPricingModel('paid')}
                  >
                    {pricingModel === 'paid' && (
                      <div className="absolute top-3 right-3 w-5 h-5 bg-primary rounded-full flex items-center justify-center">
                        <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                    )}
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                        <Lock className="w-5 h-5 text-primary" />
                      </div>
                      <span className="font-semibold">Paid Course</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Labs remain locked until the user purchases the course.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {pricingModel === 'paid' && (
              <Card className="border shadow-sm">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold">Lab Access Policy</h3>
                      <HelpCircle className="w-4 h-4 text-muted-foreground" />
                    </div>
                    <Badge className="bg-red-100 text-red-600 border-red-200">
                      <Lock className="w-3 h-3 mr-1" />
                      LABS LOCKED
                    </Badge>
                  </div>
                  
                  <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg mb-4">
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-amber-200 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-amber-700 text-xs font-bold">!</span>
                      </div>
                      <div>
                        <p className="font-semibold text-sm text-amber-800">Access Restriction Active</p>
                        <p className="text-sm text-amber-700 mt-1">
                          Because this is a <strong>Paid Course</strong>, all hands-on labs are locked by default. Students can view video content (if marked as preview) but cannot start lab environments until purchase.
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2 mt-4 ml-9">
                      <Checkbox 
                        id="preview" 
                        checked={allowPreview}
                        onCheckedChange={(checked) => setAllowPreview(checked as boolean)}
                      />
                      <label htmlFor="preview" className="text-sm font-medium text-amber-800">
                        Allow "Free Preview" for the first lab
                      </label>
                    </div>
                    <p className="text-xs text-amber-600 ml-14 mt-1">
                      Checking this lets non-paying users launch Lab #1 only.
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}
            
            <Card className="border shadow-sm">
              <CardContent className="p-6">
                <h3 className="font-semibold mb-4">Additional Restrictions</h3>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Require Prerequisites</p>
                      <p className="text-sm text-primary">Users must complete specific previous courses first.</p>
                    </div>
                    <Switch 
                      checked={requirePrerequisites}
                      onCheckedChange={setRequirePrerequisites}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Private Access Only</p>
                      <p className="text-sm text-primary">Only users in specific Groups can see this course.</p>
                    </div>
                    <Switch 
                      checked={privateAccess}
                      onCheckedChange={setPrivateAccess}
                    />
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
          Back to Course Details
        </Button>
        
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">
              {currentStep === 1 ? 'Course Information' : 
               currentStep === 2 ? 'Create New Course' : 
               currentStep === 3 ? 'Step 3: Lab Content Builder' : 
               'Step 4: Access Rules'}
            </h1>
            <p className="text-muted-foreground mt-1">
              {currentStep === 1 ? 'Step 1 of 4: Fill in the basic details about the new course.' :
               currentStep === 2 ? 'Step 3 of 4: Define course content and structure' :
               currentStep === 3 ? 'Construct your learning path by stacking interactive modules.' :
               'Define how students access this course and its associated labs.'}
            </p>
          </div>
          <Button variant="outline">Save Draft</Button>
        </div>
      </div>
      
      {/* Progress Steps */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          {steps.map((step, index) => (
            <div key={step.id} className="flex items-center">
              <div 
                className={cn(
                  "text-sm font-medium transition-colors cursor-pointer",
                  currentStep === step.id 
                    ? "text-primary" 
                    : currentStep > step.id 
                      ? "text-primary" 
                      : "text-muted-foreground"
                )}
                onClick={() => setCurrentStep(step.id)}
              >
                {step.id}. {step.name}
              </div>
              {index < steps.length - 1 && (
                <div className="hidden md:block mx-4 h-px w-24 bg-border" />
              )}
            </div>
          ))}
          <span className="text-sm text-muted-foreground">
            {currentStep === 3 ? 'Next: Review & Publish' : `Next: ${steps[currentStep]?.name || 'Finish'}`}
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
          Back
        </Button>
        
        <div className="flex items-center gap-3">
          {currentStep < steps.length && (
            <Button variant="ghost">Save Draft</Button>
          )}
          <Button onClick={() => currentStep < steps.length ? setCurrentStep(currentStep + 1) : null}>
            {currentStep < steps.length ? (
              <>
                Continue
                <ArrowRight className="w-4 h-4 ml-2" />
              </>
            ) : (
              'Publish Course'
            )}
          </Button>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminCourseCreate;
