import { ReactNode } from 'react';
import AdminSidebar from './AdminSidebar';
import AdminHeader from './AdminHeader';

interface AdminLayoutProps {
  children: ReactNode;
  title?: string;
}

export const AdminLayout = ({ children, title }: AdminLayoutProps) => {
  return (
    <div className="min-h-screen bg-muted/30">
      <AdminSidebar />
      <div className="ml-60 transition-all duration-300">
        <AdminHeader title={title} />
        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
