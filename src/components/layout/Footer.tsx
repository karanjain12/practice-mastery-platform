import { Link } from "react-router-dom";
import { GraduationCap, Mail, MapPin, Phone, Facebook, Twitter, Linkedin, Youtube } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-sidebar text-sidebar-foreground">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                <GraduationCap className="w-6 h-6 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold text-sidebar-foreground">EduFree</span>
            </Link>
            <p className="text-sidebar-foreground/70 text-sm leading-relaxed">
              Learn, Practice & Master Real-World Tech Skills with hands-on labs and expert-led courses.
            </p>
            <div className="flex gap-3">
              <a href="#" className="w-9 h-9 rounded-lg bg-sidebar-accent flex items-center justify-center hover:bg-primary transition-colors">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 rounded-lg bg-sidebar-accent flex items-center justify-center hover:bg-primary transition-colors">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 rounded-lg bg-sidebar-accent flex items-center justify-center hover:bg-primary transition-colors">
                <Linkedin className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 rounded-lg bg-sidebar-accent flex items-center justify-center hover:bg-primary transition-colors">
                <Youtube className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Products */}
          <div>
            <h4 className="font-bold text-sidebar-foreground mb-4">Products</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/labs" className="text-sidebar-foreground/70 hover:text-sidebar-foreground transition-colors text-sm">
                  Skill Builder Labs
                </Link>
              </li>
              <li>
                <Link to="/courses" className="text-sidebar-foreground/70 hover:text-sidebar-foreground transition-colors text-sm">
                  Digital Skills Programs
                </Link>
              </li>
              <li>
                <Link to="/training" className="text-sidebar-foreground/70 hover:text-sidebar-foreground transition-colors text-sm">
                  Expert-Led Training
                </Link>
              </li>
              <li>
                <Link to="/certifications" className="text-sidebar-foreground/70 hover:text-sidebar-foreground transition-colors text-sm">
                  Certifications
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-bold text-sidebar-foreground mb-4">Company</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/about" className="text-sidebar-foreground/70 hover:text-sidebar-foreground transition-colors text-sm">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/careers" className="text-sidebar-foreground/70 hover:text-sidebar-foreground transition-colors text-sm">
                  Careers
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-sidebar-foreground/70 hover:text-sidebar-foreground transition-colors text-sm">
                  Blog
                </Link>
              </li>
              <li>
                <Link to="/partners" className="text-sidebar-foreground/70 hover:text-sidebar-foreground transition-colors text-sm">
                  Partners
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold text-sidebar-foreground mb-4">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-3 text-sidebar-foreground/70 text-sm">
                <MapPin className="w-4 h-4 shrink-0" />
                <span>123 Tech Street, Jakarta, Indonesia</span>
              </li>
              <li className="flex items-center gap-3 text-sidebar-foreground/70 text-sm">
                <Mail className="w-4 h-4 shrink-0" />
                <span>hello@edufree.com</span>
              </li>
              <li className="flex items-center gap-3 text-sidebar-foreground/70 text-sm">
                <Phone className="w-4 h-4 shrink-0" />
                <span>+62 21 1234 5678</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-sidebar-border flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sidebar-foreground/50 text-sm">
            © 2024 EduFree. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link to="/privacy" className="text-sidebar-foreground/50 hover:text-sidebar-foreground transition-colors text-sm">
              Privacy Policy
            </Link>
            <Link to="/terms" className="text-sidebar-foreground/50 hover:text-sidebar-foreground transition-colors text-sm">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
