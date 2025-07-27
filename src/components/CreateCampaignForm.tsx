import { useState } from 'react';
import { CreateCampaignForm as CreateCampaignFormType } from '../types';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Calendar } from './ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { ArrowLeft, CalendarIcon, Upload, Eye } from 'lucide-react';
import { categories } from '../data/mockData';
import { format } from 'date-fns';
import React from "react";


interface CreateCampaignFormProps {
  onBack: () => void;
  onSubmit: (campaign: CreateCampaignFormType) => void;
}

export function CreateCampaignForm({ onBack, onSubmit }: CreateCampaignFormProps) {
  const [form, setForm] = useState<CreateCampaignFormType>({
    title: '',
    description: '',
    shortDescription: '',
    goal: 0,
    category: '',
    deadline: new Date(),
  });
  const [isPreview, setIsPreview] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(form);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setForm(prev => ({ ...prev, image: file }));
    }
  };

  if (isPreview) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-6">
          <Button variant="ghost" onClick={() => setIsPreview(false)}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Edit
          </Button>
          <Button onClick={handleSubmit} className="bg-gradient-to-r from-blue-500 to-green-500">
            Publish Campaign
          </Button>
        </div>

        <Card className="bg-white/80 backdrop-blur-sm">
          <div className="h-64 bg-gradient-to-r from-blue-200 to-green-200 flex items-center justify-center">
            <div className="text-gray-600">
              {form.image ? 'Image Preview' : 'No image uploaded'}
            </div>
          </div>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2 mb-4">
              <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                {form.category || 'No category'}
              </span>
            </div>
            <h1 className="text-3xl font-bold mb-4">{form.title || 'Campaign Title'}</h1>
            <p className="text-gray-600 mb-6">{form.description || 'Campaign description will appear here...'}</p>
            <div className="grid grid-cols-2 gap-4 p-4 bg-gray-50 rounded-lg">
              <div>
                <div className="text-sm text-gray-600">Goal</div>
                <div className="text-xl font-bold">${form.goal?.toLocaleString() || '0'}</div>
              </div>
              <div>
                <div className="text-sm text-gray-600">Deadline</div>
                <div className="text-xl font-bold">{format(form.deadline, 'MMM dd, yyyy')}</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Button variant="ghost" className="mb-6" onClick={onBack}>
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Home
      </Button>

      <Card className="bg-white/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Create New Campaign</CardTitle>
          <p className="text-gray-600">
            Share your cause with the world and start making a difference today.
          </p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic Info */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Basic Information</h3>
              
              <div>
                <Label htmlFor="title">Campaign Title *</Label>
                <Input
                  id="title"
                  value={form.title}
                  onChange={(e) => setForm(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="Enter a compelling title for your campaign"
                  required
                />
              </div>

              <div>
                <Label htmlFor="shortDescription">Short Description *</Label>
                <Input
                  id="shortDescription"
                  value={form.shortDescription}
                  onChange={(e) => setForm(prev => ({ ...prev, shortDescription: e.target.value }))}
                  placeholder="Brief summary (will appear on campaign cards)"
                  required
                />
              </div>

              <div>
                <Label htmlFor="description">Full Description *</Label>
                <Textarea
                  id="description"
                  value={form.description}
                  onChange={(e) => setForm(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Tell your story. Explain what you're raising money for, why it matters, and how donations will be used."
                  rows={6}
                  required
                />
              </div>
            </div>

            {/* Campaign Details */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Campaign Details</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="goal">Fundraising Goal ($) *</Label>
                  <Input
                    id="goal"
                    type="number"
                    min="100"
                    value={form.goal || ''}
                    onChange={(e) => setForm(prev => ({ ...prev, goal: parseInt(e.target.value) || 0 }))}
                    placeholder="Enter target amount"
                    required
                  />
                </div>

                <div>
                  <Label>Category *</Label>
                  <Select
                    value={form.category}
                    onValueChange={(value) => setForm(prev => ({ ...prev, category: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.slice(1).map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label>Campaign Deadline *</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-start text-left font-normal"
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {form.deadline ? format(form.deadline, 'PPP') : 'Pick a date'}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={form.deadline}
                      onSelect={(date) => date && setForm(prev => ({ ...prev, deadline: date }))}
                      disabled={(date) => date < new Date()}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>

            {/* Image Upload */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Campaign Image</h3>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
                <div className="text-center">
                  <Upload className="mx-auto h-12 w-12 text-gray-400" />
                  <div className="mt-4">
                    <Label htmlFor="image" className="cursor-pointer">
                      <span className="text-blue-600 hover:text-blue-500">Upload an image</span>
                      <span className="text-gray-600"> or drag and drop</span>
                    </Label>
                    <Input
                      id="image"
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                  </div>
                  <p className="text-sm text-gray-500">PNG, JPG, GIF up to 10MB</p>
                  {form.image && (
                    <p className="text-sm text-green-600 mt-2">
                      ✓ {form.image.name} uploaded
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-4 pt-6">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsPreview(true)}
                className="flex-1"
              >
                <Eye className="mr-2 h-4 w-4" />
                Preview Campaign
              </Button>
              <Button
                type="submit"
                className="flex-1 bg-gradient-to-r from-blue-500 to-green-500"
              >
                Publish Campaign
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}