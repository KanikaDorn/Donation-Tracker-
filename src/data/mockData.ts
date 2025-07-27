import { Campaign } from '../types';

export const mockCampaigns: Campaign[] = [
  {
    id: '1',
    title: 'Help Build Clean Water Wells in Rural Communities',
    description: 'Access to clean water is a basic human right, yet millions of people around the world still lack this essential resource. Our mission is to build sustainable water wells in rural communities across sub-Saharan Africa. Each well serves approximately 300 people and provides clean, safe drinking water for generations to come. Your donation will directly fund the drilling equipment, materials, and local training programs needed to maintain these vital water sources.',
    shortDescription: 'Building sustainable water wells in rural communities to provide clean drinking water for generations.',
    imageUrl: 'https://images.unsplash.com/photo-1594736797933-d0f06ba5719d?w=800&h=400&fit=crop',
    goal: 25000,
    currentAmount: 18750,
    category: 'Water & Sanitation',
    deadline: new Date('2025-02-15'),
    createdAt: new Date('2024-12-01'),
    createdBy: 'WaterForAll Foundation',
    featured: true,
    donors: [
      { id: '1', name: 'Anonymous', amount: 500, donatedAt: new Date('2025-01-20'), anonymous: true },
      { id: '2', name: 'Sarah Johnson', amount: 250, message: 'Happy to support this cause!', donatedAt: new Date('2025-01-19') },
      { id: '3', name: 'Mike Chen', amount: 1000, message: 'Clean water for all!', donatedAt: new Date('2025-01-18') },
      { id: '4', name: 'Emma Davis', amount: 100, donatedAt: new Date('2025-01-17') },
      { id: '5', name: 'Anonymous', amount: 750, donatedAt: new Date('2025-01-16'), anonymous: true },
    ]
  },
  {
    id: '2',
    title: 'Emergency Food Relief for Displaced Families',
    description: 'Natural disasters and conflicts have displaced thousands of families, leaving them without access to basic necessities like food and shelter. Our emergency food relief program provides immediate assistance to those in need, delivering nutritious meals, clean water, and essential supplies directly to affected communities. Every dollar donated helps feed a family for a day and provides hope during their most challenging times.',
    shortDescription: 'Providing emergency food relief and essential supplies to displaced families in crisis.',
    imageUrl: 'https://images.unsplash.com/photo-1593113646773-028c64a8f1b8?w=800&h=400&fit=crop',
    goal: 15000,
    currentAmount: 8900,
    category: 'Emergency Relief',
    deadline: new Date('2025-01-31'),
    createdAt: new Date('2024-12-15'),
    createdBy: 'Global Relief Network',
    featured: true,
    donors: [
      { id: '6', name: 'David Wilson', amount: 300, message: 'Every family deserves food security', donatedAt: new Date('2025-01-25') },
      { id: '7', name: 'Lisa Anderson', amount: 150, donatedAt: new Date('2025-01-24') },
      { id: '8', name: 'Anonymous', amount: 500, donatedAt: new Date('2025-01-23'), anonymous: true },
    ]
  },
  {
    id: '3',
    title: 'Education Support for Underprivileged Children',
    description: 'Education is the key to breaking the cycle of poverty. Our program provides school supplies, uniforms, and tuition assistance to children from low-income families. We believe every child deserves the opportunity to learn, grow, and build a better future. Your contribution will directly support students in their educational journey and help create lasting change in their communities.',
    shortDescription: 'Supporting education for underprivileged children with supplies, uniforms, and tuition assistance.',
    imageUrl: 'https://images.unsplash.com/photo-1497486751825-1233686d5d80?w=800&h=400&fit=crop',
    goal: 20000,
    currentAmount: 12300,
    category: 'Education',
    deadline: new Date('2025-03-01'),
    createdAt: new Date('2024-11-20'),
    createdBy: 'Education For All',
    donors: [
      { id: '9', name: 'Jennifer Lee', amount: 200, message: 'Education changes lives!', donatedAt: new Date('2025-01-22') },
      { id: '10', name: 'Robert Taylor', amount: 400, donatedAt: new Date('2025-01-21') },
    ]
  },
  {
    id: '4',
    title: 'Wildlife Conservation in Amazon Rainforest',
    description: 'The Amazon rainforest is home to countless species of wildlife, many of which are endangered due to deforestation and climate change. Our conservation program works to protect critical habitats, support anti-poaching efforts, and conduct research to better understand and preserve these ecosystems. Your donation helps fund ranger patrols, research expeditions, and community education programs.',
    shortDescription: 'Protecting endangered wildlife and preserving critical Amazon rainforest habitats.',
    imageUrl: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&h=400&fit=crop',
    goal: 30000,
    currentAmount: 15600,
    category: 'Environment',
    deadline: new Date('2025-04-15'),
    createdAt: new Date('2024-10-01'),
    createdBy: 'Amazon Conservation Alliance',
    donors: [
      { id: '11', name: 'Maria Rodriguez', amount: 350, message: 'Save the rainforest!', donatedAt: new Date('2025-01-26') },
      { id: '12', name: 'Anonymous', amount: 1000, donatedAt: new Date('2025-01-25'), anonymous: true },
    ]
  }
];

export const categories = [
  'All Categories',
  'Water & Sanitation',
  'Emergency Relief',
  'Education',
  'Environment',
  'Healthcare',
  'Community Development'
];