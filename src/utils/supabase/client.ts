import { createClient } from '@supabase/supabase-js'
import { projectId, publicAnonKey } from './info'

export const supabase = createClient(
  `https://${projectId}.supabase.co`,
  publicAnonKey
)

// API client for our server endpoints
export class DonationAPI {
  private baseUrl = `https://${projectId}.supabase.co/functions/v1/make-server-925815b9`
  
  private async request(endpoint: string, options: RequestInit = {}) {
    const url = `${this.baseUrl}${endpoint}`
    const response = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${publicAnonKey}`,
        ...options.headers,
      },
    })
    
    if (!response.ok) {
      const error = await response.json().catch(() => ({ error: 'Network error' }))
      throw new Error(error.error || 'Request failed')
    }
    
    return response.json()
  }
  
  // Get all campaigns
  async getCampaigns() {
    return this.request('/campaigns')
  }
  
  // Get single campaign
  async getCampaign(id: string) {
    return this.request(`/campaigns/${id}`)
  }
  
  // Create new campaign
  async createCampaign(campaign: any) {
    return this.request('/campaigns', {
      method: 'POST',
      body: JSON.stringify(campaign),
    })
  }
  
  // Add donation
  async addDonation(campaignId: string, donation: any) {
    return this.request(`/campaigns/${campaignId}/donate`, {
      method: 'POST',
      body: JSON.stringify(donation),
    })
  }
  
  // Upload image
  async uploadImage(file: File) {
    const formData = new FormData()
    formData.append('image', file)
    
    const response = await fetch(`${this.baseUrl}/upload-image`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${publicAnonKey}`,
      },
      body: formData,
    })
    
    if (!response.ok) {
      throw new Error('Failed to upload image')
    }
    
    return response.json()
  }
  
  // Sign up user
  async signUp(email: string, password: string, name: string) {
    return this.request('/auth/signup', {
      method: 'POST',
      body: JSON.stringify({ email, password, name }),
    })
  }
}

export const donationAPI = new DonationAPI()