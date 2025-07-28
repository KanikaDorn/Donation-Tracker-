import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { 
  Heart, 
  Users, 
  Target, 
  Globe, 
  Award, 
  Shield, 
  TrendingUp,
  MessageCircle,
  Star,
  ArrowRight,
  Mail,
  Phone,
  MapPin
} from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface AboutUsProps {
  onStartCampaign: () => void;
  onContact: () => void;
  onExploreCampaigns: () => void;
}

export function AboutUs({ onStartCampaign, onContact, onExploreCampaigns }: AboutUsProps) {
  const stats = [
    { icon: Users, label: 'Active Donors', value: '50,000+', color: 'text-blue-600' },
    { icon: Heart, label: 'Campaigns Funded', value: '1,200+', color: 'text-red-600' },
    { icon: Globe, label: 'Countries Reached', value: '45+', color: 'text-green-600' },
    { icon: TrendingUp, label: 'Total Raised', value: '$2.5M+', color: 'text-orange-600' },
  ];

  const values = [
    {
      icon: Shield,
      title: 'Transparency',
      description: 'Every donation is tracked and reported. See exactly where your money goes and the impact it creates.',
      color: 'bg-blue-50 text-blue-600'
    },
    {
      icon: Heart,
      title: 'Compassion',
      description: 'We believe in the power of human kindness to create positive change in communities worldwide.',
      color: 'bg-red-50 text-red-600'
    },
    {
      icon: Target,
      title: 'Impact',
      description: 'Focus on measurable outcomes. We support campaigns that create lasting, meaningful change.',
      color: 'bg-green-50 text-green-600'
    },
    {
      icon: Users,
      title: 'Community',
      description: 'Building connections between donors and recipients, creating a global community of changemakers.',
      color: 'bg-orange-50 text-orange-600'
    }
  ];

  const teamMembers = [
    {
      name: 'Sarah Johnson',
      role: 'Founder & CEO',
      image: 'https://images.unsplash.com/photo-1494790108755-2616b612b898?w=300&h=300&fit=crop&crop=face',
      bio: 'Former nonprofit director with 15+ years in humanitarian work.'
    },
    {
      name: 'Michael Chen',
      role: 'CTO',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face',
      bio: 'Technology leader passionate about using tech for social good.'
    },
    {
      name: 'Emma Rodriguez',
      role: 'Director of Impact',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop&crop=face',
      bio: 'Global development expert ensuring campaigns create real change.'
    }
  ];

  const testimonials = [
    {
      name: 'Maria Santos',
      role: 'Campaign Creator',
      image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&h=100&fit=crop&crop=face',
      text: 'DonateTracker helped us build a school in our village. The transparency and support were incredible.',
      campaign: 'Education for Rural Children'
    },
    {
      name: 'David Kim',
      role: 'Regular Donor',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
      text: 'I love seeing exactly how my donations are used. The impact reports give me confidence in my giving.',
      campaign: 'Clean Water Initiative'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-blue-50 via-green-50 to-orange-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="mb-6 bg-gradient-to-r from-blue-500 to-green-500 text-white px-6 py-2">
              Our Story
            </Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Connecting Hearts,
              <span className="bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
                {' '}Creating Change
              </span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              DonateTracker was born from a simple belief: when people can see the direct impact 
              of their generosity, they're inspired to give more. We're building a world where 
              every donation creates transparent, measurable change.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600"
                onClick={onStartCampaign}
              >
                Start Your Campaign
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                onClick={onExploreCampaigns}
              >
                Explore Campaigns
              </Button>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <Card key={index} className="text-center bg-white/80 backdrop-blur-sm border-white/20 hover:shadow-lg transition-all duration-300">
                <CardContent className="p-6">
                  <div className={`inline-flex items-center justify-center w-12 h-12 rounded-lg mb-4 ${stat.color.includes('blue') ? 'bg-blue-100' : stat.color.includes('red') ? 'bg-red-100' : stat.color.includes('green') ? 'bg-green-100' : 'bg-orange-100'}`}>
                    <stat.icon className={`h-6 w-6 ${stat.color}`} />
                  </div>
                  <div className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Our Mission</h2>
              <p className="text-lg text-gray-600 mb-8">
                To democratize charitable giving by providing a transparent, efficient, and 
                impactful platform that connects donors directly with causes they care about. 
                We believe everyone deserves to see the tangible difference their generosity makes.
              </p>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="bg-green-100 p-2 rounded-lg">
                    <Shield className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">100% Transparency</h3>
                    <p className="text-gray-600 text-sm">Track every dollar from donation to impact</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="bg-blue-100 p-2 rounded-lg">
                    <Globe className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Global Reach</h3>
                    <p className="text-gray-600 text-sm">Supporting communities worldwide</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="bg-orange-100 p-2 rounded-lg">
                    <Target className="h-5 w-5 text-orange-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Measurable Impact</h3>
                    <p className="text-gray-600 text-sm">Real results you can see and verify</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=600&h=500&fit=crop"
                alt="People working together"
                className="rounded-2xl shadow-2xl"
              />
              <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-xl shadow-lg">
                <div className="flex items-center space-x-3">
                  <div className="bg-green-500 w-4 h-4 rounded-full animate-pulse"></div>
                  <div>
                    <div className="font-semibold">Live Impact</div>
                    <div className="text-sm text-gray-600">Real-time campaign updates</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Our Values</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              These core principles guide everything we do and shape how we serve our community.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <Card key={index} className="text-center bg-white hover:shadow-lg transition-all duration-300 cursor-pointer group">
                <CardContent className="p-8">
                  <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-6 ${value.color} group-hover:scale-110 transition-transform duration-300`}>
                    <value.icon className="h-8 w-8" />
                  </div>
                  <h3 className="text-xl font-bold mb-4">{value.title}</h3>
                  <p className="text-gray-600">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Meet Our Team</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Passionate individuals working together to make charitable giving more impactful and transparent.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <Card key={index} className="text-center bg-white hover:shadow-lg transition-all duration-300 group cursor-pointer">
                <CardContent className="p-8">
                  <div className="relative mb-6">
                    <ImageWithFallback
                      src={member.image}
                      alt={member.name}
                      className="w-32 h-32 rounded-full mx-auto object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute -bottom-2 -right-2 bg-gradient-to-r from-blue-500 to-green-500 p-2 rounded-full">
                      <Award className="h-4 w-4 text-white" />
                    </div>
                  </div>
                  <h3 className="text-xl font-bold mb-2">{member.name}</h3>
                  <p className="text-blue-600 font-medium mb-4">{member.role}</p>
                  <p className="text-gray-600">{member.bio}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-green-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">What People Say</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Hear from campaign creators and donors who have experienced the impact of transparent giving.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="bg-white/80 backdrop-blur-sm border-white/20 hover:shadow-lg transition-all duration-300">
                <CardContent className="p-8">
                  <div className="flex items-center mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-700 mb-6 italic">"{testimonial.text}"</p>
                  <div className="flex items-center space-x-4">
                    <ImageWithFallback
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div>
                      <div className="font-semibold">{testimonial.name}</div>
                      <div className="text-sm text-gray-600">{testimonial.role}</div>
                      <div className="text-xs text-blue-600">{testimonial.campaign}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Make a Difference?</h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
            Whether you want to start a campaign or support existing causes, we're here to help you create meaningful impact.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600"
              onClick={onStartCampaign}
            >
              Start a Campaign
              <Heart className="ml-2 h-5 w-5" />
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-gray-600 text-white hover:bg-gray-800"
              onClick={onContact}
            >
              Get in Touch
              <MessageCircle className="ml-2 h-5 w-5" />
            </Button>
          </div>
          
          {/* Contact Info */}
          <div className="grid md:grid-cols-3 gap-8 pt-8 border-t border-gray-800">
            <div className="flex items-center justify-center space-x-3">
              <Mail className="h-5 w-5 text-blue-400" />
              <span>contact@donatetracker.com</span>
            </div>
            <div className="flex items-center justify-center space-x-3">
              <Phone className="h-5 w-5 text-green-400" />
              <span>+1 (555) 123-4567</span>
            </div>
            <div className="flex items-center justify-center space-x-3">
              <MapPin className="h-5 w-5 text-orange-400" />
              <span>San Francisco, CA</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}