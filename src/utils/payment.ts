import { loadStripe } from '@stripe/stripe-js';
import { STRIPE_PUBLIC_KEY } from '../config/stripe';
import { webhookHandler } from './webhook';

// Initialize Stripe
const stripePromise = loadStripe(STRIPE_PUBLIC_KEY);

export interface PaymentIntent {
  id: string;
  amount: number;
  currency: string;
  status: 'succeeded' | 'pending' | 'failed';
  clientSecret: string;
}

export interface PaymentMethod {
  id: string;
  type: 'card' | 'paypal' | 'bank_transfer';
  last4?: string;
  brand?: string;
  expiryMonth?: number;
  expiryYear?: number;
}

export class PaymentService {
  private stripe: any;

  constructor() {
    this.initializeStripe();
  }

  private async initializeStripe() {
    this.stripe = await stripePromise;
  }

  async createPaymentIntent(amount: number, currency: string = 'eur'): Promise<PaymentIntent> {
    // In produzione, questa chiamata andrebbe al tuo backend
    const response = await fetch('/api/create-payment-intent', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        amount: amount * 100, // Stripe usa centesimi
        currency,
      }),
    });

    if (!response.ok) {
      throw new Error('Errore nella creazione del pagamento');
    }

    return await response.json();
  }

  async confirmPayment(clientSecret: string, paymentMethod: any): Promise<{ success: boolean; error?: string }> {
    if (!this.stripe) {
      await this.initializeStripe();
    }

    const { error, paymentIntent } = await this.stripe.confirmCardPayment(clientSecret, {
      payment_method: paymentMethod
    });

    if (error) {
      return { success: false, error: error.message };
    }

    return { success: true };
  }

  async createSetupIntent(): Promise<{ clientSecret: string }> {
    // Per salvare metodi di pagamento per uso futuro
    const response = await fetch('/api/create-setup-intent', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return await response.json();
  }

  // Gestisce webhook Stripe
  async handleWebhook(payload: string, signature: string): Promise<{ success: boolean; message: string }> {
    // Verifica firma webhook
    if (!webhookHandler.verifyWebhookSignature(payload, signature)) {
      return { success: false, message: 'Invalid webhook signature' };
    }

    try {
      const event = JSON.parse(payload);
      return await webhookHandler.handleWebhookEvent(event);
    } catch (error) {
      console.error('Error parsing webhook payload:', error);
      return { success: false, message: 'Invalid webhook payload' };
    }
  }

  // Simula pagamento per demo
  async simulatePayment(amount: number): Promise<{ success: boolean; transactionId: string }> {
    // Simula delay di rete
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Simula successo/fallimento (95% successo)
    const success = Math.random() > 0.05;
    
    if (success) {
      return {
        success: true,
        transactionId: `txn_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
      };
    } else {
      throw new Error('Pagamento rifiutato dalla banca');
    }
  }
}

export const paymentService = new PaymentService();

// Utility functions
export function formatCardNumber(cardNumber: string): string {
  return cardNumber.replace(/\s/g, '').replace(/(.{4})/g, '$1 ').trim();
}

export function validateCardNumber(cardNumber: string): boolean {
  const cleaned = cardNumber.replace(/\s/g, '');
  return /^\d{13,19}$/.test(cleaned);
}

export function validateExpiryDate(expiry: string): boolean {
  const match = expiry.match(/^(\d{2})\/(\d{2})$/);
  if (!match) return false;
  
  const month = parseInt(match[1]);
  const year = parseInt(`20${match[2]}`);
  const now = new Date();
  const expiryDate = new Date(year, month - 1);
  
  return month >= 1 && month <= 12 && expiryDate > now;
}

export function validateCVC(cvc: string): boolean {
  return /^\d{3,4}$/.test(cvc);
}