import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  BookOpen, 
  FlaskConical, 
  Video, 
  Settings, 
  HelpCircle,
  ChevronLeft,
  ChevronRight,
  GraduationCap
} from 'lucide-react';
import { cn } from '@/lib/utils';

const menuItems = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/admin' },
  { icon: Users, label: 'Users', path: '/admin/users' },
  { icon: BookOpen, label: 'Add Course', path: '/admin/courses/new' },
  { icon: FlaskConical, label: 'Add Labs', path: '/admin/labs/new' },
  { icon: Video, label: 'Add Webinar', path: '/admin/webinars/new' },
];

const bottomItems = [
  { icon: Settings, label: 'Settings', path: '/admin/settings' },
  { icon: HelpCircle, label: 'Support', path: '/admin/support' },
];

export const AdminSidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => {
    if (path === '/admin') {
      return location.pathname === '/admin';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <aside 
      className={cn(
        "fixed left-0 top-0 z-40 h-screen bg-white border-r border-border transition-all duration-300",
        collapsed ? "w-16" : "w-60"
      )}
    >
      {/* Logo */}
      <div className="flex items-center h-16 px-4 border-b border-border">
        <Link to="/admin" className="flex items-center gap-3">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <GraduationCap className="w-5 h-5 text-primary-foreground" />
          </div>
          {!collapsed && (
            <div>
              <p className="font-semibold text-sm text-foreground">Super Admin</p>
              <p className="text-xs text-muted-foreground">e-Learning Platform</p>
            </div>
          )}
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex flex-col h-[calc(100vh-4rem)] justify-between p-3">
        <div className="space-y-1">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                isActive(item.path)
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              <item.icon className="w-5 h-5 flex-shrink-0" />
              {!collapsed && <span>{item.label}</span>}
            </Link>
          ))}
        </div>

        <div className="space-y-1">
          {bottomItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                isActive(item.path)
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              <item.icon className="w-5 h-5 flex-shrink-0" />
              {!collapsed && <span>{item.label}</span>}
            </Link>
          ))}
        </div>
      </nav>

      {/* Collapse button */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="absolute -right-3 top-20 w-6 h-6 bg-white border border-border rounded-full flex items-center justify-center shadow-sm hover:bg-muted transition-colors"
      >
        {collapsed ? (
          <ChevronRight className="w-3 h-3" />
        ) : (
          <ChevronLeft className="w-3 h-3" />
        )}
      </button>
    </aside>
  );
};

export default AdminSidebar;
