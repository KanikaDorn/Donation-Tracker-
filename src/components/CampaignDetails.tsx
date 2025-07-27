import { useState } from 'react';
import React from "react";
import { Campaign, DonationForm } from '../types';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Progress } from './ui/progress';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Label } from './ui/label';
import { Checkbox } from './ui/checkbox';
import { Separator } from './ui/separator';
import { 
  Calendar, 
  Users, 
  DollarSign, 
  Clock, 
  ArrowLeft, 
  Heart,
  Trophy,
  Target
} from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface CampaignDetailsProps {
  campaign: Campaign;
  onBack: () => void;
  onDonate: (campaignId: string, donation: DonationForm) => void;
}

export function CampaignDetails({ campaign, onBack, onDonate }: CampaignDetailsProps) {
  const [donationForm, setDonationForm] = useState<DonationForm>({
    name: '',
    email: '',
    amount: 0,
    message: '',
    anonymous: false
  });
  const [showDonationForm, setShowDonationForm] = useState(false);

  const progressPercentage = (campaign.currentAmount / campaign.goal) * 100;
  const daysLeft = Math.ceil((campaign.deadline.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
  const averageDonation = campaign.currentAmount / campaign.donors.length;

  const handleSubmitDonation = (e: React.FormEvent) => {
    e.preventDefault();
    onDonate(campaign.id, donationForm);
    setDonationForm({ name: '', email: '', amount: 0, message: '', anonymous: false });
    setShowDonationForm(false);
  };

  const topDonors = [...campaign.donors]
    .sort((a, b) => b.amount - a.amount)
    .slice(0, 5);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Back button */}
      <Button 
        variant="ghost" 
        className="mb-6 -ml-4 hover:bg-blue-50"
        onClick={onBack}
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Campaigns
      </Button>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Main content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Hero image and basic info */}
          <Card className="overflow-hidden bg-white/80 backdrop-blur-sm">
            <div className="relative">
              <ImageWithFallback
                src={campaign.imageUrl}
                alt={campaign.title}
                className="w-full h-64 object-cover"
              />
              {campaign.featured && (
                <Badge className="absolute top-4 left-4 bg-gradient-to-r from-orange-500 to-red-500 text-white">
                  Featured Campaign
                </Badge>
              )}
              <Badge variant="secondary" className="absolute top-4 right-4 bg-white/90">
                {campaign.category}
              </Badge>
            </div>
            
            <CardContent className="p-6">
              <h1 className="text-3xl font-bold mb-4">{campaign.title}</h1>
              <p className="text-gray-600 mb-6">{campaign.description}</p>
              
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <span>Created by</span>
                <span className="font-medium text-blue-600">{campaign.createdBy}</span>
                <span>•</span>
                <span>{campaign.createdAt.toLocaleDateString()}</span>
              </div>
            </CardContent>
          </Card>

          {/* Donor leaderboard */}
          <Card className="bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Trophy className="h-5 w-5 text-yellow-500" />
                <span>Top Supporters</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topDonors.map((donor, index) => (
                  <div key={donor.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-medium ${
                        index === 0 ? 'bg-yellow-500' : 
                        index === 1 ? 'bg-gray-400' : 
                        index === 2 ? 'bg-orange-600' : 'bg-blue-500'
                      }`}>
                        {index + 1}
                      </div>
                      <div>
                        <div className="font-medium">
                          {donor.anonymous ? 'Anonymous Donor' : donor.name}
                        </div>
                        {donor.message && (
                          <div className="text-sm text-gray-600 italic">"{donor.message}"</div>
                        )}
                      </div>
                    </div>
                    <div className="font-medium text-green-600">
                      ${donor.amount.toLocaleString()}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Campaign stats */}
          <Card className="bg-white/80 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="space-y-6">
                {/* Progress */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-2xl font-bold text-green-600">
                      ${campaign.currentAmount.toLocaleString()}
                    </span>
                    <span className="text-gray-600">
                      {progressPercentage.toFixed(0)}%
                    </span>
                  </div>
                  <div className="text-sm text-gray-600 mb-3">
                    raised of ${campaign.goal.toLocaleString()} goal
                  </div>
                  <Progress value={progressPercentage} className="h-3" />
                </div>

                {/* Stats grid */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <div className="flex items-center space-x-2 mb-1">
                      <Users className="h-4 w-4 text-blue-600" />
                      <span className="text-sm text-blue-600">Donors</span>
                    </div>
                    <div className="text-xl font-bold">{campaign.donors.length}</div>
                  </div>
                  
                  <div className="bg-green-50 p-4 rounded-lg">
                    <div className="flex items-center space-x-2 mb-1">
                      <DollarSign className="h-4 w-4 text-green-600" />
                      <span className="text-sm text-green-600">Average</span>
                    </div>
                    <div className="text-xl font-bold">${Math.round(averageDonation)}</div>
                  </div>
                </div>

                {/* Time remaining */}
                <div className="bg-orange-50 p-4 rounded-lg">
                  <div className="flex items-center space-x-2 mb-1">
                    <Clock className="h-4 w-4 text-orange-600" />
                    <span className="text-sm text-orange-600">Time Remaining</span>
                  </div>
                  <div className={`text-xl font-bold ${daysLeft < 7 ? 'text-red-600' : 'text-gray-900'}`}>
                    {daysLeft > 0 ? `${daysLeft} days` : 'Campaign ended'}
                  </div>
                  <div className="text-sm text-gray-600">
                    Ends {campaign.deadline.toLocaleDateString()}
                  </div>
                </div>

                {/* Donate button */}
                <Button
                  className="w-full bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600"
                  size="lg"
                  onClick={() => setShowDonationForm(true)}
                  disabled={daysLeft <= 0}
                >
                  <Heart className="mr-2 h-5 w-5" />
                  {daysLeft > 0 ? 'Donate Now' : 'Campaign Ended'}
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Donation form */}
          {showDonationForm && (
            <Card className="bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Target className="h-5 w-5 text-blue-600" />
                  <span>Make a Donation</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmitDonation} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        value={donationForm.name}
                        onChange={(e) => setDonationForm(prev => ({ ...prev, name: e.target.value }))}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={donationForm.email}
                        onChange={(e) => setDonationForm(prev => ({ ...prev, email: e.target.value }))}
                        required
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="amount">Donation Amount ($)</Label>
                    <Input
                      id="amount"
                      type="number"
                      min="1"
                      value={donationForm.amount || ''}
                      onChange={(e) => setDonationForm(prev => ({ ...prev, amount: parseInt(e.target.value) || 0 }))}
                      required
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="message">Message (Optional)</Label>
                    <Textarea
                      id="message"
                      value={donationForm.message}
                      onChange={(e) => setDonationForm(prev => ({ ...prev, message: e.target.value }))}
                      placeholder="Share why this cause matters to you..."
                    />
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="anonymous"
                      checked={donationForm.anonymous}
                      onCheckedChange={(checked) => setDonationForm(prev => ({ ...prev, anonymous: !!checked }))}
                    />
                    <Label htmlFor="anonymous" className="text-sm">
                      Make this donation anonymous
                    </Label>
                  </div>
                  
                  <Separator />
                  
                  <div className="flex space-x-2">
                    <Button
                      type="button"
                      variant="outline"
                      className="flex-1"
                      onClick={() => setShowDonationForm(false)}
                    >
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      className="flex-1 bg-gradient-to-r from-blue-500 to-green-500"
                    >
                      Donate ${donationForm.amount || 0}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}