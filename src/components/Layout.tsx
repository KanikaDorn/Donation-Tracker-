import { useState } from "react";
import { Button } from "./ui/button";
import { Heart, Menu, X, Home, Info, Phone, Plus } from "lucide-react";

interface LayoutProps {
  children: React.ReactNode;
  currentView: string;
  onNavigate: (view: string) => void;
}

export function Layout({ children, currentView, onNavigate }: LayoutProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { id: "home", label: "Home", icon: Home },
    { id: "about", label: "About", icon: Info },
    { id: "contact", label: "Contact", icon: Phone },
  ];

  const handleNavClick = (viewId: string) => {
    if (viewId === "contact") {
      // For now, just scroll to footer contact info
      const footer = document.querySelector("footer");
      footer?.scrollIntoView({ behavior: "smooth" });
    } else {
      onNavigate(viewId);
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-green-50 to-orange-50">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-md border-b border-white/20 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <button
              onClick={() => handleNavClick("home")}
              className="flex items-center space-x-2 hover:opacity-80 transition-opacity"
            >
              <div className="bg-gradient-to-r from-blue-500 to-green-500 p-2 rounded-lg">
                <Heart className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-semibold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
                DonateTracker
              </span>
            </button>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`flex items-center space-x-1 px-3 py-2 rounded-lg transition-all duration-200 ${
                    currentView === item.id
                      ? "bg-blue-100 text-blue-600 font-medium"
                      : "text-gray-600 hover:text-blue-600 hover:bg-blue-50"
                  }`}
                >
                  <item.icon className="h-4 w-4" />
                  <span>{item.label}</span>
                </button>
              ))}
              <Button
                className="bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600"
                onClick={() => onNavigate("create-campaign")}
              >
                <Plus className="h-4 w-4 mr-2" />
                Start Campaign
              </Button>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </Button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMobileMenuOpen && (
            <div className="md:hidden">
              <div className="px-2 pt-2 pb-3 space-y-1 bg-white/90 backdrop-blur-sm rounded-lg mb-2">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    className={`flex items-center space-x-2 w-full px-3 py-2 rounded-lg transition-all duration-200 ${
                      currentView === item.id
                        ? "bg-blue-100 text-blue-600 font-medium"
                        : "text-gray-600 hover:text-blue-600 hover:bg-blue-50"
                    }`}
                  >
                    <item.icon className="h-4 w-4" />
                    <span>{item.label}</span>
                  </button>
                ))}
                <Button
                  className="w-full mt-2 bg-gradient-to-r from-blue-500 to-green-500"
                  onClick={() => {
                    onNavigate("create-campaign");
                    setIsMobileMenuOpen(false);
                  }}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Start Campaign
                </Button>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Main content */}
      <main>{children}</main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <button
                onClick={() => onNavigate("home")}
                className="flex items-center space-x-2 mb-4 hover:opacity-80 transition-opacity"
              >
                <div className="bg-gradient-to-r from-blue-500 to-green-500 p-2 rounded-lg">
                  <Heart className="h-6 w-6 text-white" />
                </div>
                <span className="text-xl font-semibold">DonateTracker</span>
              </button>
              <p className="text-gray-400">
                Empowering communities through transparent and impactful
                donations.
              </p>
            </div>
            <div>
              <h3 className="mb-4 font-semibold">Quick Links</h3>
              <div className="space-y-2">
                <button
                  onClick={() => onNavigate("about")}
                  className="block text-gray-400 hover:text-white transition-colors"
                >
                  About Us
                </button>
                <button
                  onClick={() => onNavigate("home")}
                  className="block text-gray-400 hover:text-white transition-colors"
                >
                  How it Works
                </button>
                <button
                  onClick={() => onNavigate("home")}
                  className="block text-gray-400 hover:text-white transition-colors"
                >
                  Success Stories
                </button>
              </div>
            </div>
            <div>
              <h3 className="mb-4 font-semibold">Support</h3>
              <div className="space-y-2">
                <a
                  href="mailto:contact@donatetracker.com"
                  className="block text-gray-400 hover:text-white transition-colors"
                >
                  Help Center
                </a>
                <a
                  href="mailto:contact@donatetracker.com"
                  className="block text-gray-400 hover:text-white transition-colors"
                >
                  Contact Us
                </a>
                <button className="block text-gray-400 hover:text-white transition-colors">
                  Terms of Service
                </button>
              </div>
            </div>
            <div>
              <h3 className="mb-4 font-semibold">Contact Info</h3>
              <div className="space-y-2 text-gray-400">
                <div>📧 contact@donatetracker.com</div>
                <div>📞 0177 777 888</div>
                <div>📍Phom Penh, Cambodia</div>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 DonateTracker. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
