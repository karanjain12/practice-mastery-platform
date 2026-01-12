import { useState } from "react";
import { Link } from "react-router-dom";
import AdminLayout from "@/components/admin/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Search, MoreHorizontal, Eye, Check, X, Edit, Trash2, Clock, CheckCircle, XCircle } from "lucide-react";

interface Course {
  id: string;
  title: string;
  author: string;
  category: string;
  level: string;
  status: 'pending' | 'approved' | 'rejected';
  submittedAt: string;
  rejectionReason?: string;
}

const seedCourses: Course[] = [
  { id: "c1", title: "Python Fundamentals", author: "John Doe", category: "Data Science", level: "Beginner", status: "pending", submittedAt: "2026-01-10" },
  { id: "c2", title: "AWS Cloud Practitioner", author: "Jane Smith", category: "Cloud Computing", level: "Beginner", status: "pending", submittedAt: "2026-01-09" },
  { id: "c3", title: "Kubernetes in Production", author: "Mike Johnson", category: "DevOps", level: "Advanced", status: "approved", submittedAt: "2026-01-05" },
  { id: "c4", title: "React Advanced Patterns", author: "Sarah Wilson", category: "Web Development", level: "Intermediate", status: "rejected", submittedAt: "2026-01-03", rejectionReason: "Content quality needs improvement. Please add more practical examples." },
];

export default function AdminCourseApproval() {
  const [courses, setCourses] = useState<Course[]>(seedCourses);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [viewDialogOpen, setViewDialogOpen] = useState(false);
  const [rejectDialogOpen, setRejectDialogOpen] = useState(false);
  const [rejectionReason, setRejectionReason] = useState("");

  const filteredCourses = courses.filter(c => 
    c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.author.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleApprove = (courseId: string) => {
    setCourses(courses.map(c => 
      c.id === courseId ? { ...c, status: 'approved' as const } : c
    ));
    setViewDialogOpen(false);
  };

  const handleReject = () => {
    if (selectedCourse && rejectionReason.trim()) {
      setCourses(courses.map(c => 
        c.id === selectedCourse.id 
          ? { ...c, status: 'rejected' as const, rejectionReason: rejectionReason.trim() } 
          : c
      ));
      setRejectDialogOpen(false);
      setViewDialogOpen(false);
      setRejectionReason("");
    }
  };

  const handleDelete = (courseId: string) => {
    setCourses(courses.filter(c => c.id !== courseId));
  };

  const getStatusIcon = (status: Course['status']) => {
    switch (status) {
      case 'pending': return <Clock className="w-4 h-4 text-amber-500" />;
      case 'approved': return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'rejected': return <XCircle className="w-4 h-4 text-red-500" />;
    }
  };

  const getStatusBadge = (status: Course['status']) => {
    switch (status) {
      case 'pending': return <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">Pending</Badge>;
      case 'approved': return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Approved</Badge>;
      case 'rejected': return <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">Rejected</Badge>;
    }
  };

  return (
    <AdminLayout title="Course Approval">
      <Card className="shadow-sm">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between gap-4">
            <CardTitle className="text-lg">Course Approval Management</CardTitle>
            <Badge variant="outline" className="bg-amber-50 text-amber-700">
              {courses.filter(c => c.status === 'pending').length} Pending Review
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              className="pl-9" 
              placeholder="Search courses or authors..." 
              value={searchQuery} 
              onChange={(e) => setSearchQuery(e.target.value)} 
            />
          </div>

          <div className="rounded-lg border">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50">
                  <TableHead>Course</TableHead>
                  <TableHead>Author</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Level</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Submitted</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCourses.map((course) => (
                  <TableRow key={course.id}>
                    <TableCell className="font-medium">{course.title}</TableCell>
                    <TableCell>{course.author}</TableCell>
                    <TableCell>{course.category}</TableCell>
                    <TableCell>{course.level}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {getStatusIcon(course.status)}
                        {getStatusBadge(course.status)}
                      </div>
                    </TableCell>
                    <TableCell className="text-muted-foreground">{course.submittedAt}</TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => {
                            setSelectedCourse(course);
                            setViewDialogOpen(true);
                          }}>
                            <Eye className="mr-2 h-4 w-4" />
                            View Details
                          </DropdownMenuItem>
                          {course.status === 'pending' && (
                            <>
                              <DropdownMenuItem 
                                className="text-green-600"
                                onClick={() => handleApprove(course.id)}
                              >
                                <Check className="mr-2 h-4 w-4" />
                                Approve
                              </DropdownMenuItem>
                              <DropdownMenuItem 
                                className="text-red-600"
                                onClick={() => {
                                  setSelectedCourse(course);
                                  setRejectDialogOpen(true);
                                }}
                              >
                                <X className="mr-2 h-4 w-4" />
                                Reject
                              </DropdownMenuItem>
                            </>
                          )}
                          <DropdownMenuItem asChild>
                            <Link to={`/admin/courses/${course.id}/edit`}>
                              <Edit className="mr-2 h-4 w-4" />
                              Edit
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem 
                            className="text-red-600"
                            onClick={() => handleDelete(course.id)}
                          >
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* View Course Dialog */}
      <Dialog open={viewDialogOpen} onOpenChange={setViewDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Course Details</DialogTitle>
          </DialogHeader>
          {selectedCourse && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Title</label>
                  <p className="font-medium">{selectedCourse.title}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Author</label>
                  <p>{selectedCourse.author}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Category</label>
                  <p>{selectedCourse.category}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Level</label>
                  <p>{selectedCourse.level}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Status</label>
                  <div className="mt-1">{getStatusBadge(selectedCourse.status)}</div>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Submitted</label>
                  <p>{selectedCourse.submittedAt}</p>
                </div>
              </div>

              {selectedCourse.rejectionReason && (
                <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                  <label className="text-sm font-medium text-red-700">Rejection Reason</label>
                  <p className="text-red-600 mt-1">{selectedCourse.rejectionReason}</p>
                </div>
              )}

              {selectedCourse.status === 'pending' && (
                <DialogFooter className="gap-2">
                  <Button 
                    variant="outline" 
                    className="text-red-600 border-red-200 hover:bg-red-50"
                    onClick={() => {
                      setRejectDialogOpen(true);
                    }}
                  >
                    <X className="w-4 h-4 mr-2" />
                    Reject
                  </Button>
                  <Button 
                    className="bg-green-600 hover:bg-green-700"
                    onClick={() => handleApprove(selectedCourse.id)}
                  >
                    <Check className="w-4 h-4 mr-2" />
                    Approve
                  </Button>
                </DialogFooter>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Reject Dialog */}
      <Dialog open={rejectDialogOpen} onOpenChange={setRejectDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Reject Course</DialogTitle>
            <DialogDescription>
              Please provide a reason for rejecting this course. The author will be notified.
            </DialogDescription>
          </DialogHeader>
          <div>
            <label className="block text-sm font-medium mb-2">Rejection Reason</label>
            <Textarea 
              placeholder="e.g. Content quality needs improvement, missing prerequisites..."
              value={rejectionReason}
              onChange={(e) => setRejectionReason(e.target.value)}
              className="min-h-[120px]"
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => {
              setRejectDialogOpen(false);
              setRejectionReason("");
            }}>
              Cancel
            </Button>
            <Button 
              variant="destructive"
              onClick={handleReject}
              disabled={!rejectionReason.trim()}
            >
              Reject Course
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
}
