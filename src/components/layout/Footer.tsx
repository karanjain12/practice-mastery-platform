import { Link } from "react-router-dom";
import { GraduationCap, Mail, Linkedin, Twitter, Youtube } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-foreground text-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link to="/" className="flex items-center gap-2.5 mb-4">
              <div className="w-9 h-9 rounded-lg bg-primary flex items-center justify-center">
                <GraduationCap className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="text-lg font-semibold">SkillPath</span>
            </Link>
            <p className="text-background/60 text-sm mb-4">
              Master real-world tech skills with hands-on labs and courses.
            </p>
            <div className="flex gap-2">
              <a href="#" className="w-8 h-8 rounded-lg bg-background/10 flex items-center justify-center hover:bg-primary transition-colors">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#" className="w-8 h-8 rounded-lg bg-background/10 flex items-center justify-center hover:bg-primary transition-colors">
                <Linkedin className="w-4 h-4" />
              </a>
              <a href="#" className="w-8 h-8 rounded-lg bg-background/10 flex items-center justify-center hover:bg-primary transition-colors">
                <Youtube className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Products */}
          <div>
            <h4 className="font-semibold mb-4 text-sm">Products</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/labs" className="text-background/60 hover:text-background transition-colors text-sm">
                  Labs
                </Link>
              </li>
              <li>
                <Link to="/courses" className="text-background/60 hover:text-background transition-colors text-sm">
                  Courses
                </Link>
              </li>
              <li>
                <Link to="/training" className="text-background/60 hover:text-background transition-colors text-sm">
                  Training
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold mb-4 text-sm">Company</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="text-background/60 hover:text-background transition-colors text-sm">
                  About
                </Link>
              </li>
              <li>
                <Link to="/careers" className="text-background/60 hover:text-background transition-colors text-sm">
                  Careers
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-background/60 hover:text-background transition-colors text-sm">
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4 text-sm">Contact</h4>
            <div className="flex items-center gap-2 text-background/60 text-sm">
              <Mail className="w-4 h-4" />
              <span>hello@skillpath.com</span>
            </div>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-background/10 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-background/40 text-xs">
            © 2024 SkillPath. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link to="/privacy" className="text-background/40 hover:text-background transition-colors text-xs">
              Privacy
            </Link>
            <Link to="/terms" className="text-background/40 hover:text-background transition-colors text-xs">
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}