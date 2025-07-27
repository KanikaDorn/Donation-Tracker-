import { useState } from 'react';
import { Button } from './ui/button';
import { Heart, Menu, X } from 'lucide-react';
import React from "react";


interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-green-50 to-orange-50">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-md border-b border-white/20 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center space-x-2">
              <div className="bg-gradient-to-r from-blue-500 to-green-500 p-2 rounded-lg">
                <Heart className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-semibold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
                DonateTracker
              </span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <a href="#home" className="text-gray-600 hover:text-blue-600 transition-colors">Home</a>
              <a href="#campaigns" className="text-gray-600 hover:text-blue-600 transition-colors">Campaigns</a>
              <a href="#about" className="text-gray-600 hover:text-blue-600 transition-colors">About</a>
              <a href="#contact" className="text-gray-600 hover:text-blue-600 transition-colors">Contact</a>
              <Button className="bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600">
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
                {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </Button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMobileMenuOpen && (
            <div className="md:hidden">
              <div className="px-2 pt-2 pb-3 space-y-1 bg-white/90 backdrop-blur-sm rounded-lg mb-2">
                <a href="#home" className="block px-3 py-2 text-gray-600 hover:text-blue-600">Home</a>
                <a href="#campaigns" className="block px-3 py-2 text-gray-600 hover:text-blue-600">Campaigns</a>
                <a href="#about" className="block px-3 py-2 text-gray-600 hover:text-blue-600">About</a>
                <a href="#contact" className="block px-3 py-2 text-gray-600 hover:text-blue-600">Contact</a>
                <Button className="w-full mt-2 bg-gradient-to-r from-blue-500 to-green-500">
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
              <div className="flex items-center space-x-2 mb-4">
                <div className="bg-gradient-to-r from-blue-500 to-green-500 p-2 rounded-lg">
                  <Heart className="h-6 w-6 text-white" />
                </div>
                <span className="text-xl font-semibold">DonateTracker</span>
              </div>
              <p className="text-gray-400">
                Empowering communities through transparent and impactful donations.
              </p>
            </div>
            <div>
              <h3 className="mb-4">Quick Links</h3>
              <div className="space-y-2">
                <a href="#" className="block text-gray-400 hover:text-white transition-colors">How it Works</a>
                <a href="#" className="block text-gray-400 hover:text-white transition-colors">Success Stories</a>
                <a href="#" className="block text-gray-400 hover:text-white transition-colors">FAQ</a>
              </div>
            </div>
            <div>
              <h3 className="mb-4">Support</h3>
              <div className="space-y-2">
                <a href="#" className="block text-gray-400 hover:text-white transition-colors">Help Center</a>
                <a href="#" className="block text-gray-400 hover:text-white transition-colors">Contact Us</a>
                <a href="#" className="block text-gray-400 hover:text-white transition-colors">Terms of Service</a>
              </div>
            </div>
            <div>
              <h3 className="mb-4">Categories</h3>
              <div className="space-y-2">
                <a href="#" className="block text-gray-400 hover:text-white transition-colors">Education</a>
                <a href="#" className="block text-gray-400 hover:text-white transition-colors">Healthcare</a>
                <a href="#" className="block text-gray-400 hover:text-white transition-colors">Environment</a>
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