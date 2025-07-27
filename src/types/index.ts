export interface Campaign {
  id: string;
  title: string;
  description: string;
  shortDescription: string;
  imageUrl: string;
  goal: number;
  currentAmount: number;
  category: string;
  deadline: Date;
  createdAt: Date;
  createdBy: string;
  donors: Donor[];
  featured?: boolean;
}

export interface Donor {
  id: string;
  name: string;
  amount: number;
  message?: string;
  donatedAt: Date;
  anonymous?: boolean;
}

export interface DonationForm {
  name: string;
  email: string;
  amount: number;
  message?: string;
  anonymous?: boolean;
}

export interface CreateCampaignForm {
  title: string;
  description: string;
  shortDescription: string;
  goal: number;
  category: string;
  deadline: Date;
  image?: File;
}