export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  type: 'client' | 'professional' | 'admin';
  createdAt: string;
}

export interface Professional extends User {
  type: 'professional';
  wallet: Wallet;
  services: string[];
  location: {
    city: string;
    province: string;
    coordinates?: { lat: number; lng: number };
  };
  verified: boolean;
  rating: number;
  completedJobs: number;
}

export interface Wallet {
  id: string;
  userId: string;
  balance: number;
  currency: 'EUR';
  transactions: Transaction[];
}

export interface Transaction {
  id: string;
  walletId: string;
  type: 'credit' | 'debit';
  amount: number;
  description: string;
  relatedRequestId?: string;
  createdAt: string;
  status: 'pending' | 'completed' | 'failed';
}

export interface ServiceRequest {
  id: string;
  clientId: string;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  service: string;
  description: string;
  location: {
    city: string;
    province: string;
    address?: string;
  };
  budget?: string;
  status: 'open' | 'assigned' | 'completed' | 'cancelled';
  createdAt: string;
  assignedProfessionalId?: string;
  cost?: number;
  distance?: number;
}

export interface PricingTier {
  maxDistance: number; // km
  price: number; // EUR
  name: string;
}