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
  kycStatus: 'pending' | 'in_review' | 'approved' | 'rejected' | 'expired';
  kycData?: KYCData;
  kycSubmittedAt?: string;
  kycApprovedAt?: string;
  kycExpiresAt?: string;
}

export interface KYCData {
  personalInfo: {
    firstName: string;
    lastName: string;
    dateOfBirth: string;
    placeOfBirth: string;
    fiscalCode: string;
    vatNumber?: string;
  };
  documents: {
    identityDocument: KYCDocument;
    fiscalCodeDocument: KYCDocument;
    businessLicense?: KYCDocument;
    insurance?: KYCDocument;
    certifications?: KYCDocument[];
  };
  address: {
    street: string;
    city: string;
    province: string;
    postalCode: string;
    country: string;
  };
  businessInfo?: {
    companyName: string;
    companyType: 'individual' | 'company' | 'freelancer';
    vatNumber: string;
    businessAddress: string;
    yearsOfExperience: number;
    specializations: string[];
  };
  bankAccount: {
    iban: string;
    bankName: string;
    accountHolder: string;
  };
  references?: {
    name: string;
    phone: string;
    email: string;
    relationship: string;
  }[];
}

export interface KYCDocument {
  id: string;
  type: 'identity_card' | 'passport' | 'driving_license' | 'fiscal_code' | 'business_license' | 'insurance' | 'certification';
  fileName: string;
  fileUrl: string;
  uploadedAt: string;
  verified: boolean;
  verifiedAt?: string;
  verifiedBy?: string;
  notes?: string;
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
  status: 'pending' | 'approved' | 'rejected' | 'open' | 'assigned' | 'completed' | 'cancelled';
  createdAt: string;
  approvedAt?: string;
  autoApproved: boolean;
  assignedProfessionalId?: string;
  cost?: number;
  distance?: number;
  quotesReceived: number;
  maxQuotes: number;
  isExpired: boolean;
  purchasedBy?: string[]; // IDs dei professionisti che hanno acquistato
  quotes?: Quote[];
}

export interface Quote {
  id: string;
  professionalId: string;
  professionalName: string;
  requestId: string;
  price: number;
  description: string;
  timeline: string;
  createdAt: string;
  status: 'pending' | 'accepted' | 'rejected';
  isVisible: boolean; // Visibile solo al professionista che l'ha creato
}

export interface PricingTier {
  maxDistance: number; // km
  price: number; // EUR
  name: string;
}

export interface PaymentMethod {
  id: string;
  type: 'card' | 'paypal' | 'bank_transfer';
  last4?: string;
  brand?: string;
  expiryMonth?: number;
  expiryYear?: number;
  isDefault: boolean;
  createdAt: string;
}

export interface Invoice {
  id: string;
  number: string;
  userId: string;
  amount: number;
  vatRate: number;
  vatAmount: number;
  totalAmount: number;
  description: string;
  status: 'paid' | 'pending' | 'overdue' | 'cancelled';
  paymentMethod: string;
  createdAt: string;
  dueDate: string;
  paidAt?: string;
}

export interface PaymentHistory {
  id: string;
  userId: string;
  amount: number;
  currency: string;
  status: 'succeeded' | 'pending' | 'failed' | 'cancelled';
  paymentMethod: PaymentMethod;
  description: string;
  stripePaymentIntentId?: string;
  invoiceId?: string;
  createdAt: string;
  updatedAt: string;
}