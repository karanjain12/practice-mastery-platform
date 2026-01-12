import { useState, useRef } from 'react';
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
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import ContentBuilder, { createBlock } from "@/components/admin/content-builder/ContentBuilder";
import type { ContentBlock } from "@/components/admin/content-builder/types";
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
  Lock,
  Unlock,
  Settings,
  BookOpen,
  Eye,
  Clock,
  FlaskConical
} from 'lucide-react';
import { cn } from '@/lib/utils';

const steps = [
  { id: 1, name: 'Basic Info', description: 'Course details' },
  { id: 2, name: 'Media & Syllabus', description: 'Videos & modules' },
  { id: 3, name: 'Labs & Content', description: 'Attach labs & content' },
  { id: 4, name: 'Settings', description: 'Access & pricing' },
  { id: 5, name: 'Preview', description: 'Review before submit' },
];

const categories = ['Web Development', 'Cloud Computing', 'Data Science', 'DevOps', 'Security', 'AI/ML'];
const levels = ['Beginner', 'Intermediate', 'Advanced', 'Expert'];
const durations = ['Hours', 'Days', 'Weeks'];

// Sample labs for selection
const availableLabs = [
  { id: 'lab1', title: 'Python Basics Lab', duration: '45 min', level: 'Beginner' },
  { id: 'lab2', title: 'React Components Lab', duration: '60 min', level: 'Intermediate' },
  { id: 'lab3', title: 'Docker Containers Lab', duration: '90 min', level: 'Advanced' },
  { id: 'lab4', title: 'AWS EC2 Setup Lab', duration: '30 min', level: 'Beginner' },
  { id: 'lab5', title: 'Kubernetes Deployment Lab', duration: '120 min', level: 'Expert' },
];

interface LearningOutcome {
  id: string;
  text: string;
}

interface Lesson {
  id: string;
  title: string;
  type: 'video' | 'article' | 'quiz' | 'code';
  duration: string;
  videoUrl?: string;
  videoFile?: File | null;
  content?: string;
}

interface Module {
  id: string;
  title: string;
  lessons: Lesson[];
  isExpanded: boolean;
}

interface SelectedLab {
  id: string;
  title: string;
  duration: string;
  level: string;
}

const AdminCourseCreate = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const thumbnailInputRef = useRef<HTMLInputElement>(null);
  const introVideoInputRef = useRef<HTMLInputElement>(null);
  const lessonVideoInputRef = useRef<HTMLInputElement>(null);
  
  // Step 1 - Basic Info
  const [title, setTitle] = useState('');
  const [shortDescription, setShortDescription] = useState('');
  const [fullDescription, setFullDescription] = useState('');
  const [category, setCategory] = useState('');
  const [level, setLevel] = useState('');
  const [techStack, setTechStack] = useState<string[]>(['React', 'Tailwind CSS']);
  const [techInput, setTechInput] = useState('');
  const [durationValue, setDurationValue] = useState('0');
  const [durationUnit, setDurationUnit] = useState('Hours');
  
  // Step 2 - Media
  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [thumbnailPreview, setThumbnailPreview] = useState<string>('');
  const [introVideoType, setIntroVideoType] = useState<'upload' | 'url'>('upload');
  const [introVideoUrl, setIntroVideoUrl] = useState('');
  const [introVideoFile, setIntroVideoFile] = useState<File | null>(null);
  const [learningOutcomes, setLearningOutcomes] = useState<LearningOutcome[]>([
    { id: '1', text: '' },
  ]);
  
  // Step 2 - Syllabus
  const [modules, setModules] = useState<Module[]>([]);
  const [editingLesson, setEditingLesson] = useState<{ moduleId: string; lesson: Lesson } | null>(null);
  const [editingModule, setEditingModule] = useState<{ id: string; title: string } | null>(null);

  // Step 3 - Labs
  const [selectedLabs, setSelectedLabs] = useState<SelectedLab[]>([]);

  // Step 3 - Content Builder blocks (drag & drop)
  const [contentBlocks, setContentBlocks] = useState<ContentBlock[]>([]);
  
  // Step 4 - Settings
  const [pricingModel, setPricingModel] = useState<'free' | 'paid'>('paid');
  const [price, setPrice] = useState('0.00');
  const [allowPreview, setAllowPreview] = useState(false);
  const [requirePrerequisites, setRequirePrerequisites] = useState(false);
  const [privateAccess, setPrivateAccess] = useState(false);

  // Submit
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  // Thumbnail handling
  const handleThumbnailUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setThumbnail(file);
      const reader = new FileReader();
      reader.onload = () => setThumbnailPreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  // Intro video handling
  const handleIntroVideoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setIntroVideoFile(file);
    }
  };

  // Module management
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

  const updateModuleTitle = (id: string, title: string) => {
    setModules(modules.map(m => m.id === id ? { ...m, title } : m));
  };

  const deleteModule = (id: string) => {
    setModules(modules.filter(m => m.id !== id));
  };

  // Lesson management
  const addLesson = (moduleId: string) => {
    const newLesson: Lesson = {
      id: `${moduleId}-${Date.now()}`,
      title: 'New Lesson',
      type: 'video',
      duration: '00:00',
      videoUrl: '',
      videoFile: null,
      content: '',
    };
    setEditingLesson({ moduleId, lesson: newLesson });
  };

  const saveLesson = () => {
    if (!editingLesson) return;
    const { moduleId, lesson } = editingLesson;
    setModules(modules.map(m => {
      if (m.id === moduleId) {
        const existingIndex = m.lessons.findIndex(l => l.id === lesson.id);
        if (existingIndex >= 0) {
          const updatedLessons = [...m.lessons];
          updatedLessons[existingIndex] = lesson;
          return { ...m, lessons: updatedLessons };
        }
        return { ...m, lessons: [...m.lessons, lesson] };
      }
      return m;
    }));
    setEditingLesson(null);
  };

  const editLesson = (moduleId: string, lesson: Lesson) => {
    setEditingLesson({ moduleId, lesson: { ...lesson } });
  };

  const deleteLesson = (moduleId: string, lessonId: string) => {
    setModules(modules.map(m => {
      if (m.id === moduleId) {
        return { ...m, lessons: m.lessons.filter(l => l.id !== lessonId) };
      }
      return m;
    }));
  };

  // Lab selection
  const toggleLabSelection = (lab: typeof availableLabs[0]) => {
    const exists = selectedLabs.find(l => l.id === lab.id);
    if (exists) {
      setSelectedLabs(selectedLabs.filter(l => l.id !== lab.id));
    } else {
      setSelectedLabs([...selectedLabs, lab]);
    }
  };

  const getLessonIcon = (type: string) => {
    switch (type) {
      case 'video': return <Video className="w-4 h-4 text-primary" />;
      case 'article': return <FileText className="w-4 h-4 text-green-600" />;
      case 'quiz': return <HelpCircle className="w-4 h-4 text-purple-600" />;
      case 'code': return <Code className="w-4 h-4 text-orange-600" />;
      default: return <FileText className="w-4 h-4" />;
    }
  };

  const handleSubmitForReview = () => {
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      navigate('/admin/course-approval');
    }, 1000);
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
                    <Textarea 
                      placeholder="Detailed course content..."
                      value={fullDescription}
                      onChange={(e) => setFullDescription(e.target.value)}
                      className="min-h-[120px] bg-muted/30"
                    />
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
                
                <div className="mb-6">
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

                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">Total Duration</label>
                    <div className="flex gap-2">
                      <Input 
                        type="number" 
                        value={durationValue}
                        onChange={(e) => setDurationValue(e.target.value)}
                        className="bg-muted/30" 
                      />
                      <Select value={durationUnit} onValueChange={setDurationUnit}>
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
                </div>
              </CardContent>
            </Card>
          </div>
        );
        
      case 2:
        return (
          <div className="space-y-6">
            {/* Thumbnail */}
            <Card className="border shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-6">
                  <ImageIcon className="w-5 h-5 text-primary" />
                  <h3 className="font-semibold text-sm uppercase tracking-wide text-muted-foreground">Course Thumbnail</h3>
                </div>
                
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <input
                      ref={thumbnailInputRef}
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleThumbnailUpload}
                    />
                    <div 
                      className="border-2 border-dashed rounded-lg p-8 text-center hover:border-primary/50 transition-colors cursor-pointer"
                      onClick={() => thumbnailInputRef.current?.click()}
                    >
                      <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                      <p className="text-sm text-muted-foreground">Click to upload or drag and drop</p>
                      <p className="text-xs text-muted-foreground mt-1">SVG, PNG, JPG or GIF (max. 800x600px)</p>
                      {thumbnail && <p className="text-sm text-primary mt-2">{thumbnail.name}</p>}
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Preview</label>
                    <div className="aspect-video bg-muted rounded-lg flex items-center justify-center overflow-hidden">
                      {thumbnailPreview ? (
                        <img src={thumbnailPreview} alt="Preview" className="w-full h-full object-cover" />
                      ) : (
                        <Badge className="bg-accent/10 text-accent border-accent/20">No image selected</Badge>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Intro Video */}
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
                  <div>
                    <input
                      ref={introVideoInputRef}
                      type="file"
                      accept="video/*"
                      className="hidden"
                      onChange={handleIntroVideoUpload}
                    />
                    <div 
                      className="border-2 border-dashed rounded-lg p-8 text-center hover:border-primary/50 transition-colors cursor-pointer"
                      onClick={() => introVideoInputRef.current?.click()}
                    >
                      <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                      <p className="text-sm text-muted-foreground">Click to upload or drag and drop</p>
                      <p className="text-xs text-muted-foreground mt-1">MP4, WebM or Ogg (Max 800MB)</p>
                      {introVideoFile && <p className="text-sm text-primary mt-2">{introVideoFile.name}</p>}
                    </div>
                  </div>
                ) : (
                  <div className="flex gap-2">
                    <Input 
                      placeholder="https://www.youtube.com/watch?v=..."
                      value={introVideoUrl}
                      onChange={(e) => setIntroVideoUrl(e.target.value)}
                      className="flex-1"
                    />
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Learning Outcomes */}
            <Card className="border shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="font-semibold">What students will learn</h3>
                    <p className="text-sm text-muted-foreground">List 3-5 key outcomes.</p>
                  </div>
                </div>
                
                <div className="space-y-3">
                  {learningOutcomes.map((outcome) => (
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

            {/* Course Syllabus */}
            <Card className="border shadow-sm">
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
                
                {modules.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    <BookOpen className="w-12 h-12 mx-auto mb-3 opacity-50" />
                    <p>No modules yet. Click "Add Module" to get started.</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {modules.map((module) => (
                      <div key={module.id} className="border rounded-lg">
                        <div className="flex items-center justify-between p-4 cursor-pointer hover:bg-muted/30">
                          <div className="flex items-center gap-3 flex-1" onClick={() => toggleModule(module.id)}>
                            {module.isExpanded ? (
                              <ChevronDown className="w-5 h-5 text-muted-foreground" />
                            ) : (
                              <ChevronUp className="w-5 h-5 text-muted-foreground" />
                            )}
                            <div>
                              <p className="font-medium">{module.title}</p>
                              <p className="text-sm text-primary">
                                {module.lessons.length} Lessons
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              className="h-8 w-8"
                              onClick={() => setEditingModule({ id: module.id, title: module.title })}
                            >
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              className="h-8 w-8 text-red-600"
                              onClick={() => deleteModule(module.id)}
                            >
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
                                  <Button 
                                    variant="ghost" 
                                    size="icon" 
                                    className="h-8 w-8"
                                    onClick={() => editLesson(module.id, lesson)}
                                  >
                                    <Edit className="w-4 h-4" />
                                  </Button>
                                  <Button 
                                    variant="ghost" 
                                    size="icon" 
                                    className="h-8 w-8 text-red-600"
                                    onClick={() => deleteLesson(module.id, lesson.id)}
                                  >
                                    <Trash2 className="w-4 h-4" />
                                  </Button>
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
                )}
              </CardContent>
            </Card>
          </div>
        );
        
      case 3:
        return (
          <div className="space-y-6">
            {/* Lab Selection */}
            <Card className="border shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-6">
                  <FlaskConical className="w-5 h-5 text-primary" />
                  <h3 className="font-semibold text-sm uppercase tracking-wide text-muted-foreground">Attach Labs to Course</h3>
                </div>
                
                <p className="text-sm text-muted-foreground mb-4">Select labs that students should complete as part of this course.</p>
                
                <div className="grid grid-cols-2 gap-4 mb-6">
                  {availableLabs.map((lab) => {
                    const isSelected = selectedLabs.some(l => l.id === lab.id);
                    return (
                      <div 
                        key={lab.id}
                        className={cn(
                          "p-4 border rounded-lg cursor-pointer transition-all",
                          isSelected 
                            ? "border-primary bg-primary/5" 
                            : "border-border hover:border-primary/50"
                        )}
                        onClick={() => toggleLabSelection(lab)}
                      >
                        <div className="flex items-start justify-between">
                          <div>
                            <p className="font-medium">{lab.title}</p>
                            <div className="flex items-center gap-3 mt-1 text-sm text-muted-foreground">
                              <span className="flex items-center gap-1">
                                <Clock className="w-3 h-3" />
                                {lab.duration}
                              </span>
                              <Badge variant="outline" className="text-xs">{lab.level}</Badge>
                            </div>
                          </div>
                          <Checkbox checked={isSelected} />
                        </div>
                      </div>
                    );
                  })}
                </div>

                {selectedLabs.length > 0 && (
                  <div className="p-4 bg-muted/30 rounded-lg">
                    <p className="text-sm font-medium mb-2">Selected Labs ({selectedLabs.length})</p>
                    <div className="flex flex-wrap gap-2">
                      {selectedLabs.map(lab => (
                        <Badge key={lab.id} className="bg-primary/10 text-primary gap-1">
                          {lab.title}
                          <X className="w-3 h-3 cursor-pointer" onClick={(e) => {
                            e.stopPropagation();
                            setSelectedLabs(selectedLabs.filter(l => l.id !== lab.id));
                          }} />
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Content Builder */}
            <ContentBuilder
              title="Additional Course Content"
              value={contentBlocks}
              onChange={setContentBlocks}
            />
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

                {pricingModel === 'paid' && (
                  <div className="mt-4 p-4 bg-muted/30 rounded-lg">
                    <label className="block text-sm font-medium mb-2">Price</label>
                    <div className="flex items-center gap-2">
                      <span className="text-muted-foreground">$</span>
                      <Input 
                        type="number" 
                        value={price} 
                        onChange={(e) => setPrice(e.target.value)}
                        className="w-32"
                      />
                      <Select defaultValue="USD">
                        <SelectTrigger className="w-24">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="USD">USD</SelectItem>
                          <SelectItem value="EUR">EUR</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
            
            {pricingModel === 'paid' && (
              <Card className="border shadow-sm">
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <Checkbox 
                      id="preview" 
                      checked={allowPreview}
                      onCheckedChange={(checked) => setAllowPreview(checked as boolean)}
                    />
                    <label htmlFor="preview" className="text-sm font-medium">
                      Allow "Free Preview" for the first lab
                    </label>
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
                      <p className="text-sm text-muted-foreground">Users must complete specific previous courses first.</p>
                    </div>
                    <Switch 
                      checked={requirePrerequisites}
                      onCheckedChange={setRequirePrerequisites}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Private Access Only</p>
                      <p className="text-sm text-muted-foreground">Only users in specific Groups can see this course.</p>
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

      case 5:
        return (
          <div className="max-w-3xl mx-auto space-y-6">
            <Card className="border shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-6">
                  <Eye className="w-5 h-5 text-primary" />
                  <h3 className="font-semibold text-lg">Course Preview</h3>
                </div>

                <div className="space-y-6">
                  {/* Thumbnail Preview */}
                  <div className="aspect-video bg-muted rounded-lg overflow-hidden">
                    {thumbnailPreview ? (
                      <img src={thumbnailPreview} alt="Course thumbnail" className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                        No thumbnail
                      </div>
                    )}
                  </div>

                  {/* Course Info */}
                  <div>
                    <h1 className="text-2xl font-bold">{title || 'Untitled Course'}</h1>
                    <p className="text-muted-foreground mt-2">{shortDescription || 'No description'}</p>
                    
                    <div className="flex items-center gap-4 mt-4">
                      <Badge variant="outline">{category || 'No category'}</Badge>
                      <Badge variant="outline">{level || 'No level'}</Badge>
                      <span className="text-sm text-muted-foreground">{durationValue} {durationUnit}</span>
                      <Badge variant={pricingModel === 'paid' ? 'paid' : 'free'}>{pricingModel}</Badge>
                      {pricingModel === 'paid' && <span className="font-semibold">${price}</span>}
                    </div>
                  </div>

                  {/* Tech Stack */}
                  {techStack.length > 0 && (
                    <div>
                      <h4 className="font-semibold mb-2">Technologies</h4>
                      <div className="flex flex-wrap gap-2">
                        {techStack.map(tech => (
                          <Badge key={tech} variant="secondary">{tech}</Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Learning Outcomes */}
                  {learningOutcomes.filter(o => o.text).length > 0 && (
                    <div>
                      <h4 className="font-semibold mb-2">What you'll learn</h4>
                      <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                        {learningOutcomes.filter(o => o.text).map(o => (
                          <li key={o.id}>{o.text}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Modules */}
                  {modules.length > 0 && (
                    <div>
                      <h4 className="font-semibold mb-2">Course Content</h4>
                      <div className="space-y-2">
                        {modules.map((m, i) => (
                          <div key={m.id} className="p-3 bg-muted/30 rounded-lg">
                            <p className="font-medium">{m.title}</p>
                            <p className="text-sm text-muted-foreground">{m.lessons.length} lessons</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Labs */}
                  {selectedLabs.length > 0 && (
                    <div>
                      <h4 className="font-semibold mb-2">Included Labs</h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedLabs.map(lab => (
                          <Badge key={lab.id} variant="outline" className="gap-1">
                            <FlaskConical className="w-3 h-3" />
                            {lab.title}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            <Card className="border-amber-200 bg-amber-50">
              <CardContent className="p-6">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-amber-200 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-amber-700 text-xs font-bold">!</span>
                  </div>
                  <div>
                    <p className="font-semibold text-amber-800">Ready to submit?</p>
                    <p className="text-sm text-amber-700 mt-1">
                      Once submitted, your course will be sent for review. An admin will approve or reject it.
                    </p>
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
    <AdminLayout title="Create Course">
      <div className="mb-6">
        <Button 
          variant="ghost" 
          className="mb-4 text-muted-foreground"
          onClick={() => navigate('/admin/courses')}
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Courses
        </Button>
        
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Create New Course</h1>
            <p className="text-muted-foreground mt-1">Step {currentStep} of {steps.length}</p>
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
                <div className="hidden md:block mx-4 h-px w-16 bg-border" />
              )}
            </div>
          ))}
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
          onClick={() => currentStep > 1 ? setCurrentStep(currentStep - 1) : navigate('/admin/courses')}
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>
        
        <div className="flex items-center gap-3">
          {currentStep < steps.length && (
            <Button variant="ghost">Save Draft</Button>
          )}
          {currentStep < steps.length ? (
            <Button onClick={() => setCurrentStep(currentStep + 1)}>
              Continue
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          ) : (
            <Button onClick={handleSubmitForReview} disabled={isSubmitting}>
              {isSubmitting ? 'Submitting...' : 'Submit for Review'}
            </Button>
          )}
        </div>
      </div>

      {/* Lesson Edit Dialog */}
      <Dialog open={!!editingLesson} onOpenChange={() => setEditingLesson(null)}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>{editingLesson?.lesson.id.includes(Date.now().toString().slice(0, 8)) ? 'Add' : 'Edit'} Lesson</DialogTitle>
          </DialogHeader>
          {editingLesson && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Lesson Title</label>
                <Input 
                  value={editingLesson.lesson.title}
                  onChange={(e) => setEditingLesson({
                    ...editingLesson,
                    lesson: { ...editingLesson.lesson, title: e.target.value }
                  })}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Type</label>
                  <Select 
                    value={editingLesson.lesson.type}
                    onValueChange={(v) => setEditingLesson({
                      ...editingLesson,
                      lesson: { ...editingLesson.lesson, type: v as any }
                    })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="video">Video</SelectItem>
                      <SelectItem value="article">Article</SelectItem>
                      <SelectItem value="quiz">Quiz</SelectItem>
                      <SelectItem value="code">Code</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Duration</label>
                  <Input 
                    placeholder="e.g. 10:30"
                    value={editingLesson.lesson.duration}
                    onChange={(e) => setEditingLesson({
                      ...editingLesson,
                      lesson: { ...editingLesson.lesson, duration: e.target.value }
                    })}
                  />
                </div>
              </div>
              {editingLesson.lesson.type === 'video' && (
                <div>
                  <label className="block text-sm font-medium mb-2">Video URL</label>
                  <Input 
                    placeholder="https://youtube.com/..."
                    value={editingLesson.lesson.videoUrl || ''}
                    onChange={(e) => setEditingLesson({
                      ...editingLesson,
                      lesson: { ...editingLesson.lesson, videoUrl: e.target.value }
                    })}
                  />
                </div>
              )}
              {(editingLesson.lesson.type === 'article' || editingLesson.lesson.type === 'code') && (
                <div>
                  <label className="block text-sm font-medium mb-2">Content</label>
                  <Textarea 
                    placeholder="Lesson content..."
                    value={editingLesson.lesson.content || ''}
                    onChange={(e) => setEditingLesson({
                      ...editingLesson,
                      lesson: { ...editingLesson.lesson, content: e.target.value }
                    })}
                    className="min-h-[150px]"
                  />
                </div>
              )}
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditingLesson(null)}>Cancel</Button>
            <Button onClick={saveLesson}>Save Lesson</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Module Edit Dialog */}
      <Dialog open={!!editingModule} onOpenChange={() => setEditingModule(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Module</DialogTitle>
          </DialogHeader>
          {editingModule && (
            <div>
              <label className="block text-sm font-medium mb-2">Module Title</label>
              <Input 
                value={editingModule.title}
                onChange={(e) => setEditingModule({ ...editingModule, title: e.target.value })}
              />
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditingModule(null)}>Cancel</Button>
            <Button onClick={() => {
              if (editingModule) {
                updateModuleTitle(editingModule.id, editingModule.title);
                setEditingModule(null);
              }
            }}>Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
};

export default AdminCourseCreate;
