import { useState, useEffect } from 'react';
import { Layout } from './components/Layout';
import { HeroSection } from './components/HeroSection';
import { CampaignCard } from './components/CampaignCard';
import { CampaignDetails } from './components/CampaignDetails';
import { CreateCampaignForm } from './components/CreateCampaignForm';
import { AboutUs } from './components/AboutUs';
import { Button } from './components/ui/button';
import { Input } from './components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './components/ui/select';
import { Badge } from './components/ui/badge';
import { Toaster } from './components/ui/sonner';
import { toast } from 'sonner';
import { Search, Filter, TrendingUp, Award, Clock, Loader2 } from 'lucide-react';
import { Campaign, DonationForm, CreateCampaignForm as CreateCampaignFormType } from './types';
import { mockCampaigns, categories } from './data/mockData';
import { donationAPI } from './utils/supabase/client';

export default function App() {
  const [currentView, setCurrentView] = useState('home');
  const [selectedCampaign, setSelectedCampaign] = useState<Campaign | null>(null);
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [sortBy, setSortBy] = useState('featured');

  // Load campaigns from Supabase on mount
  useEffect(() => {
    loadCampaigns();
  }, []);

  const loadCampaigns = async () => {
    try {
      setLoading(true);
      const response = await donationAPI.getCampaigns();
      
      // If no campaigns in database, use mock data
      if (!response.campaigns || response.campaigns.length === 0) {
        console.log('No campaigns found in database, using mock data');
        setCampaigns(mockCampaigns);
      } else {
        // Parse dates from string format
        const parsedCampaigns = response.campaigns.map((campaign: any) => ({
          ...campaign,
          createdAt: new Date(campaign.createdAt),
          deadline: new Date(campaign.deadline),
          donors: campaign.donors?.map((donor: any) => ({
            ...donor,
            donatedAt: new Date(donor.donatedAt)
          })) || []
        }));
        setCampaigns(parsedCampaigns);
      }
    } catch (error) {
      console.error('Error loading campaigns:', error);
      toast.error('Failed to load campaigns. Using offline data.');
      setCampaigns(mockCampaigns);
    } finally {
      setLoading(false);
    }
  };

  const featuredCampaigns = campaigns.filter(c => c.featured);
  
  const filteredCampaigns = campaigns.filter(campaign => {
    const matchesSearch = campaign.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         campaign.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All Categories' || campaign.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const sortedCampaigns = [...filteredCampaigns].sort((a, b) => {
    switch (sortBy) {
      case 'newest':
        return b.createdAt.getTime() - a.createdAt.getTime();
      case 'ending-soon':
        return a.deadline.getTime() - b.deadline.getTime();
      case 'most-funded':
        return (b.currentAmount / b.goal) - (a.currentAmount / a.goal);
      case 'featured':
      default:
        return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
    }
  });

  const handleViewCampaignDetails = (campaign: Campaign) => {
    setSelectedCampaign(campaign);
    setCurrentView('campaign-details');
  };

  const handleDonate = async (campaignId: string, donation?: DonationForm) => {
    if (donation) {
      try {
        const response = await donationAPI.addDonation(campaignId, donation);
        
        // Update local state
        setCampaigns(prev => prev.map(campaign => 
          campaign.id === campaignId 
            ? {
                ...campaign,
                currentAmount: response.campaign.currentAmount,
                donors: response.campaign.donors.map((donor: any) => ({
                  ...donor,
                  donatedAt: new Date(donor.donatedAt)
                }))
              }
            : campaign
        ));

        // Update selected campaign if it's the same one
        if (selectedCampaign?.id === campaignId) {
          setSelectedCampaign(prev => prev ? {
            ...prev,
            currentAmount: response.campaign.currentAmount,
            donors: response.campaign.donors.map((donor: any) => ({
              ...donor,
              donatedAt: new Date(donor.donatedAt)
            }))
          } : prev);
        }

        toast.success(`Thank you for your donation of $${donation.amount}!`, {
          description: 'Your contribution will make a real difference.'
        });
      } catch (error) {
        console.error('Error processing donation:', error);
        toast.error('Failed to process donation. Please try again.');
      }
    } else {
      // Just show donation form (handled by CampaignDetails component)
      const campaign = campaigns.find(c => c.id === campaignId);
      if (campaign) {
        handleViewCampaignDetails(campaign);
      }
    }
  };

  const handleCreateCampaign = async (campaignData: CreateCampaignFormType) => {
    try {
      let imageUrl = 'https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=800&h=400&fit=crop';
      
      // Upload image if provided
      if (campaignData.image) {
        try {
          const uploadResponse = await donationAPI.uploadImage(campaignData.image);
          imageUrl = uploadResponse.imageUrl;
        } catch (error) {
          console.error('Error uploading image:', error);
          toast.error('Failed to upload image, using default image.');
        }
      }

      const newCampaignData = {
        title: campaignData.title,
        description: campaignData.description,
        shortDescription: campaignData.shortDescription,
        goal: campaignData.goal,
        category: campaignData.category,
        deadline: campaignData.deadline.toISOString(),
        imageUrl,
        createdBy: 'You'
      };

      const response = await donationAPI.createCampaign(newCampaignData);
      
      // Parse the response campaign
      const newCampaign = {
        ...response.campaign,
        createdAt: new Date(response.campaign.createdAt),
        deadline: new Date(response.campaign.deadline),
        donors: []
      };

      setCampaigns(prev => [newCampaign, ...prev]);
      setCurrentView('home');
      toast.success('Campaign created successfully!', {
        description: 'Your campaign is now live and ready to receive donations.'
      });
    } catch (error) {
      console.error('Error creating campaign:', error);
      toast.error('Failed to create campaign. Please try again.');
    }
  };

  const renderContent = () => {
    if (loading && currentView === 'home') {
      return (
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-blue-600" />
            <p className="text-gray-600">Loading campaigns...</p>
          </div>
        </div>
      );
    }

    switch (currentView) {
      case 'about':
        return (
          <AboutUs
            onStartCampaign={() => setCurrentView('create-campaign')}
            onContact={() => {
              toast.info('Contact form coming soon!', {
                description: 'For now, reach out to us at contact@donatetracker.com'
              });
            }}
            onExploreCampaigns={() => setCurrentView('home')}
          />
        );

      case 'campaign-details':
        return selectedCampaign ? (
          <CampaignDetails
            campaign={selectedCampaign}
            onBack={() => setCurrentView('home')}
            onDonate={handleDonate}
          />
        ) : null;

      case 'create-campaign':
        return (
          <CreateCampaignForm
            onBack={() => setCurrentView('home')}
            onSubmit={handleCreateCampaign}
          />
        );

      case 'home':
      default:
        return (
          <div className="space-y-16">
            {/* Hero Section */}
            <HeroSection
              onStartCampaign={() => setCurrentView('create-campaign')}
              onExploreCampaigns={() => {
                document.getElementById('campaigns')?.scrollIntoView({ behavior: 'smooth' });
              }}
            />

            {/* Featured Campaigns */}
            {featuredCampaigns.length > 0 && (
              <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                  <div className="inline-flex items-center space-x-2 bg-orange-100 text-orange-800 px-4 py-2 rounded-full mb-4">
                    <Award className="h-4 w-4" />
                    <span className="text-sm font-medium">Featured Campaigns</span>
                  </div>
                  <h2 className="text-3xl font-bold mb-4">Making the Biggest Impact</h2>
                  <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                    These campaigns are creating extraordinary change in communities around the world.
                  </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {featuredCampaigns.map((campaign) => (
                    <CampaignCard
                      key={campaign.id}
                      campaign={campaign}
                      onViewDetails={handleViewCampaignDetails}
                      onDonate={handleDonate}
                    />
                  ))}
                </div>
              </section>
            )}

            {/* All Campaigns */}
            <section id="campaigns" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold mb-4">All Campaigns</h2>
                <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                  Discover causes that matter to you and make a difference today.
                </p>
              </div>

              {/* Filters and Search */}
              <div className="bg-white/80 backdrop-blur-sm rounded-lg p-6 mb-8 border border-white/20">
                <div className="grid md:grid-cols-4 gap-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="Search campaigns..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>

                  <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="featured">Featured First</SelectItem>
                      <SelectItem value="newest">Newest First</SelectItem>
                      <SelectItem value="ending-soon">Ending Soon</SelectItem>
                      <SelectItem value="most-funded">Most Funded</SelectItem>
                    </SelectContent>
                  </Select>

                  <Button
                    variant="outline"
                    onClick={() => setCurrentView('create-campaign')}
                    className="bg-gradient-to-r from-blue-500 to-green-500 text-white border-0 hover:from-blue-600 hover:to-green-600"
                  >
                    <TrendingUp className="mr-2 h-4 w-4" />
                    Start Campaign
                  </Button>
                </div>

                {/* Active filters */}
                <div className="flex flex-wrap gap-2 mt-4">
                  {searchTerm && (
                    <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                      Search: "{searchTerm}"
                      <button
                        className="ml-2 hover:bg-blue-200 rounded-full w-4 h-4 flex items-center justify-center text-xs"
                        onClick={() => setSearchTerm('')}
                      >
                        ×
                      </button>
                    </Badge>
                  )}
                  {selectedCategory !== 'All Categories' && (
                    <Badge variant="secondary" className="bg-green-100 text-green-800">
                      Category: {selectedCategory}
                      <button
                        className="ml-2 hover:bg-green-200 rounded-full w-4 h-4 flex items-center justify-center text-xs"
                        onClick={() => setSelectedCategory('All Categories')}
                      >
                        ×
                      </button>
                    </Badge>
                  )}
                </div>
              </div>

              {/* Campaign Grid */}
              {sortedCampaigns.length > 0 ? (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {sortedCampaigns.map((campaign) => (
                    <CampaignCard
                      key={campaign.id}
                      campaign={campaign}
                      onViewDetails={handleViewCampaignDetails}
                      onDonate={handleDonate}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="bg-gray-100 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                    <Search className="h-8 w-8 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No campaigns found</h3>
                  <p className="text-gray-600 mb-4">
                    Try adjusting your search terms or filters to find more campaigns.
                  </p>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setSearchTerm('');
                      setSelectedCategory('All Categories');
                    }}
                  >
                    Clear Filters
                  </Button>
                </div>
              )}
            </section>
          </div>
        );
    }
  };

  return (
    <Layout currentView={currentView} onNavigate={setCurrentView}>
      {renderContent()}
      <Toaster />
    </Layout>
  );
}