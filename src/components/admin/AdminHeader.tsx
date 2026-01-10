import { Search, Bell, MessageSquare } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';

interface AdminHeaderProps {
  title?: string;
}

export const AdminHeader = ({ title = 'Dashboard' }: AdminHeaderProps) => {
  return (
    <header className="h-16 bg-white border-b border-border flex items-center justify-between px-6">
      <h1 className="text-lg font-semibold text-foreground">{title}</h1>

      <div className="flex items-center gap-4">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input 
            placeholder="Search courses, labs..." 
            className="w-64 pl-10 bg-muted/50 border-0 focus-visible:ring-1"
          />
        </div>

        {/* Notifications */}
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="w-5 h-5 text-muted-foreground" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-accent rounded-full" />
        </Button>

        {/* Messages */}
        <Button variant="ghost" size="icon">
          <MessageSquare className="w-5 h-5 text-muted-foreground" />
        </Button>

        {/* Avatar */}
        <Avatar className="w-9 h-9 cursor-pointer">
          <AvatarImage src="" />
          <AvatarFallback className="bg-primary/10 text-primary text-sm font-medium">
            SA
          </AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
};

export default AdminHeader;
