import React from "react";
import { Button } from "./ui/button";
import { ArrowRight, Heart, Users, DollarSign } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface HeroSectionProps {
  onStartCampaign: () => void;
  onExploreCampaigns: () => void;
}

export function HeroSection({
  onStartCampaign,
  onExploreCampaigns,
}: HeroSectionProps) {
  return (
    <section className="relative py-20 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-green-600/10 to-orange-600/10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left content */}
          <div>
            <div className="inline-flex items-center space-x-2 bg-blue-100 text-blue-800 px-4 py-2 rounded-full mb-6">
              <Heart className="h-4 w-4" />
              <span className="text-sm font-medium">
                Making a Difference Together
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Transform Lives Through
              <span className="bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
                {" "}
                Transparent Giving
              </span>
            </h1>

            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Join thousands of changemakers who are creating lasting impact.
              Track every donation, see real progress, and connect directly with
              the communities you're helping.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <Button
                size="lg"
                className="bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600 px-8"
                onClick={onExploreCampaigns}
              >
                Explore Campaigns
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="px-8"
                onClick={onStartCampaign}
              >
                Start Your Campaign
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8">
              <div className="text-center">
                <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-lg mb-2 mx-auto">
                  <Users className="h-6 w-6 text-blue-600" />
                </div>
                <div className="text-2xl font-bold text-gray-900">50K+</div>
                <div className="text-sm text-gray-600">Active Donors</div>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center w-12 h-12 bg-green-100 rounded-lg mb-2 mx-auto">
                  <DollarSign className="h-6 w-6 text-green-600" />
                </div>
                <div className="text-2xl font-bold text-gray-900">$2.5M+</div>
                <div className="text-sm text-gray-600">Raised</div>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center w-12 h-12 bg-orange-100 rounded-lg mb-2 mx-auto">
                  <Heart className="h-6 w-6 text-orange-600" />
                </div>
                <div className="text-2xl font-bold text-gray-900">1,200+</div>
                <div className="text-sm text-gray-600">Projects</div>
              </div>
            </div>
          </div>

          {/* Right content - Hero image */}
          <div className="relative">
            <div className="relative z-10 bg-white/20 backdrop-blur-sm rounded-2xl p-8 border border-white/30">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=600&h=400&fit=crop"
                alt="People making a difference"
                className="w-full h-80 object-cover rounded-xl"
              />

              {/* Floating card */}
              <div className="absolute -bottom-4 -left-4 bg-white rounded-xl p-4 shadow-lg border border-gray-100">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                  <div>
                    <div className="text-sm font-medium text-gray-900">
                      Live Impact
                    </div>
                    <div className="text-xs text-gray-600">
                      127 people helped today
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Background decorative elements */}
            <div className="absolute -top-4 -right-4 w-32 h-32 bg-gradient-to-br from-blue-400 to-green-400 rounded-full opacity-20 blur-xl"></div>
            <div className="absolute -bottom-8 -left-8 w-24 h-24 bg-gradient-to-br from-orange-400 to-red-400 rounded-full opacity-20 blur-xl"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
