import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Menu, X, Beaker, GraduationCap, Award, Compass, Users, Cloud, Briefcase, ClipboardCheck, ChevronDown } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

const mainNavItems = [
  {
    label: "Assessments",
    href: "/assessment",
    icon: ClipboardCheck,
    description: "Technology Readiness Assessment",
    tagline: "Benchmark Your Brilliance"
  },
  {
    label: "Training",
    href: "/training",
    icon: Users,
    description: "Expert-Led Technology Training",
    tagline: "Learn From The Masters"
  },
  {
    label: "Labs",
    href: "/labs",
    icon: Beaker,
    description: "Skill Builder Labs",
    tagline: "Practice Makes Perfect"
  },
  {
    label: "Programs",
    href: "/courses",
    icon: GraduationCap,
    description: "Digital Skills Programs",
    tagline: "Master The Tools"
  },
  {
    label: "Certification",
    href: "/certification",
    icon: Award,
    description: "Certification Readiness Program",
    tagline: "Invest In Your Future"
  },
  {
    label: "Vouchers",
    href: "/vouchers",
    icon: Award,
    description: "Certification Voucher Hub",
    tagline: "Unlock Your Potential"
  },
  {
    label: "Cloud Services",
    href: "/cloud-services",
    icon: Cloud,
    description: "Cloud Access Services",
    tagline: "Scale Without Limits"
  },
  {
    label: "Careers",
    href: "/careers",
    icon: Briefcase,
    description: "Tech Career Pathways",
    tagline: "Bridge to Hire"
  },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-lg bg-primary flex items-center justify-center">
              <Beaker className="w-5 h-5 text-primary-foreground" />
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-bold text-foreground leading-tight">ALAR Labs</span>
              <span className="text-[10px] text-muted-foreground leading-none hidden sm:block">Learning & Innovation</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {mainNavItems.slice(0, 6).map((item) => {
              const isActive = location.pathname === item.href;
              return (
                <Link
                  key={item.href}
                  to={item.href}
                  className={cn(
                    "px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                    isActive
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
            {/* More dropdown for remaining items */}
            <div className="relative group">
              <button className="px-3 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted flex items-center gap-1">
                More <ChevronDown className="w-3 h-3" />
              </button>
              <div className="absolute top-full right-0 mt-1 w-56 bg-popover border border-border rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                <div className="p-2">
                  {mainNavItems.slice(6).map((item) => (
                    <Link
                      key={item.href}
                      to={item.href}
                      className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-muted transition-colors"
                    >
                      <item.icon className="w-4 h-4 text-primary" />
                      <div>
                        <div className="text-sm font-medium text-foreground">{item.label}</div>
                        <div className="text-xs text-muted-foreground">{item.tagline}</div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="hidden lg:flex items-center gap-2">
            <Button variant="ghost" size="sm">
              Sign In
            </Button>
            <Button size="sm">Get Started</Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 rounded-lg hover:bg-muted"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="lg:hidden py-4 border-t border-border animate-fade-in max-h-[calc(100vh-4rem)] overflow-y-auto">
            <div className="flex flex-col gap-1">
              {mainNavItems.map((item) => {
                const isActive = location.pathname === item.href;
                const Icon = item.icon;
                return (
                  <Link
                    key={item.href}
                    to={item.href}
                    onClick={() => setIsOpen(false)}
                    className={cn(
                      "flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors",
                      isActive
                        ? "bg-primary text-primary-foreground"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted"
                    )}
                  >
                    <Icon className="w-5 h-5" />
                    <div>
                      <div>{item.label}</div>
                      <div className="text-xs opacity-70">{item.tagline}</div>
                    </div>
                  </Link>
                );
              })}
              <div className="flex flex-col gap-2 mt-4 pt-4 border-t border-border">
                <Button variant="ghost" className="justify-start">
                  Sign In
                </Button>
                <Button className="justify-start">Get Started</Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
