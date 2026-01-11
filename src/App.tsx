import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Labs from "./pages/Labs";
import LabDetail from "./pages/LabDetail";
import Courses from "./pages/Courses";
import CourseDetail from "./pages/CourseDetail";
import Training from "./pages/Training";
import GroupLabDetail from "./pages/GroupLabDetail";
import Assessment from "./pages/Assessment";
import Certification from "./pages/Certification";
import Vouchers from "./pages/Vouchers";
import CloudServices from "./pages/CloudServices";
import Careers from "./pages/Careers";
import NotFound from "./pages/NotFound";

// Admin Pages
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminUsers from "./pages/admin/AdminUsers";
import AdminCourses from "./pages/admin/AdminCourses";
import AdminLabs from "./pages/admin/AdminLabs";
import AdminCourseCreate from "./pages/admin/AdminCourseCreate";
import AdminLabCreate from "./pages/admin/AdminLabCreate";
import AdminWebinarCreate from "./pages/admin/AdminWebinarCreate";
import AdminSettings from "./pages/admin/AdminSettings";
import AdminSupport from "./pages/admin/AdminSupport";
import AdminAccessControl from "./pages/admin/AdminAccessControl";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/labs" element={<Labs />} />
          <Route path="/labs/:id" element={<LabDetail />} />
          <Route path="/group-labs/:id" element={<GroupLabDetail />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/courses/:id" element={<CourseDetail />} />
          <Route path="/training" element={<Training />} />
          <Route path="/assessment" element={<Assessment />} />
          <Route path="/certification" element={<Certification />} />
          <Route path="/vouchers" element={<Vouchers />} />
          <Route path="/cloud-services" element={<CloudServices />} />
          <Route path="/careers" element={<Careers />} />
          
          {/* Admin Routes */}
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/users" element={<AdminUsers />} />
          <Route path="/admin/access-control" element={<AdminAccessControl />} />
          <Route path="/admin/courses" element={<AdminCourses />} />
          <Route path="/admin/courses/new" element={<AdminCourseCreate />} />
          <Route path="/admin/labs" element={<AdminLabs />} />
          <Route path="/admin/labs/new" element={<AdminLabCreate />} />
          <Route path="/admin/webinars/new" element={<AdminWebinarCreate />} />
          <Route path="/admin/settings" element={<AdminSettings />} />
          <Route path="/admin/support" element={<AdminSupport />} />
          
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
