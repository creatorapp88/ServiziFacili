import { loadStripe } from '@stripe/stripe-js';
import { STRIPE_PUBLIC_KEY } from '../config/stripe';

// Initialize Stripe
const stripePromise = loadStripe(STRIPE_PUBLIC_KEY);

export interface PaymentIntent {
  id: string;
  amount: number;
  currency: string;
  status: 'succeeded' | 'pending' | 'failed';
  clientSecret: string;
}

export interface StripePaymentResult {
  success: boolean;
  paymentIntent?: any;
  error?: string;
}

export class StripeService {
  private stripe: any = null;

  async initialize() {
    if (!this.stripe) {
      this.stripe = await stripePromise;
    }
    return this.stripe;
  }

  // Crea Payment Intent per ricarica wallet
  async createPaymentIntent(amount: number, currency: string = 'eur'): Promise<PaymentIntent> {
    try {
      // In produzione, questa chiamata andrebbe al tuo backend
      const response = await fetch('/api/create-payment-intent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: Math.round(amount * 100), // Stripe usa centesimi
          currency,
          metadata: {
            type: 'wallet_recharge',
            userId: 'current_user_id' // Sostituire con ID utente reale
          }
        }),
      });

      if (!response.ok) {
        throw new Error('Errore nella creazione del pagamento');
      }

      const paymentIntent = await response.json();
      
      return {
        id: paymentIntent.id,
        amount: amount,
        currency: currency,
        status: paymentIntent.status,
        clientSecret: paymentIntent.client_secret
      };
    } catch (error) {
      console.error('Error creating payment intent:', error);
      throw new Error('Impossibile inizializzare il pagamento');
    }
  }

  // Conferma pagamento con carta
  async confirmCardPayment(
    clientSecret: string, 
    cardElement: any,
    billingDetails?: any
  ): Promise<StripePaymentResult> {
    try {
      await this.initialize();
      
      const { error, paymentIntent } = await this.stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardElement,
          billing_details: billingDetails
        }
      });

      if (error) {
        return {
          success: false,
          error: this.getErrorMessage(error)
        };
      }

      return {
        success: true,
        paymentIntent
      };
    } catch (error) {
      return {
        success: false,
        error: 'Errore durante il pagamento'
      };
    }
  }

  // Crea Setup Intent per salvare metodi di pagamento
  async createSetupIntent(customerId?: string): Promise<{ clientSecret: string }> {
    try {
      const response = await fetch('/api/create-setup-intent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          customer: customerId,
          usage: 'off_session'
        }),
      });

      if (!response.ok) {
        throw new Error('Errore nella creazione del setup intent');
      }

      return await response.json();
    } catch (error) {
      console.error('Error creating setup intent:', error);
      throw new Error('Impossibile configurare il metodo di pagamento');
    }
  }

  // Conferma Setup Intent
  async confirmCardSetup(
    clientSecret: string,
    cardElement: any,
    billingDetails?: any
  ): Promise<StripePaymentResult> {
    try {
      await this.initialize();
      
      const { error, setupIntent } = await this.stripe.confirmCardSetup(clientSecret, {
        payment_method: {
          card: cardElement,
          billing_details: billingDetails
        }
      });

      if (error) {
        return {
          success: false,
          error: this.getErrorMessage(error)
        };
      }

      return {
        success: true,
        paymentIntent: setupIntent
      };
    } catch (error) {
      return {
        success: false,
        error: 'Errore durante la configurazione del pagamento'
      };
    }
  }

  // Simula pagamento per demo (da rimuovere in produzione)
  async simulatePayment(amount: number): Promise<StripePaymentResult> {
    // Simula delay di rete
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Simula successo/fallimento (95% successo)
    const success = Math.random() > 0.05;
    
    if (success) {
      return {
        success: true,
        paymentIntent: {
          id: `pi_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
          amount: amount * 100,
          currency: 'eur',
          status: 'succeeded'
        }
      };
    } else {
      return {
        success: false,
        error: 'Pagamento rifiutato dalla banca'
      };
    }
  }

  // Gestisce messaggi di errore Stripe
  private getErrorMessage(error: any): string {
    switch (error.code) {
      case 'card_declined':
        return 'La tua carta è stata rifiutata. Prova con un\'altra carta.';
      case 'expired_card':
        return 'La tua carta è scaduta. Verifica la data di scadenza.';
      case 'incorrect_cvc':
        return 'Il codice CVC non è corretto.';
      case 'processing_error':
        return 'Errore durante l\'elaborazione. Riprova tra qualche minuto.';
      case 'incorrect_number':
        return 'Il numero della carta non è corretto.';
      case 'incomplete_number':
        return 'Il numero della carta è incompleto.';
      case 'incomplete_cvc':
        return 'Il codice CVC è incompleto.';
      case 'incomplete_expiry':
        return 'La data di scadenza è incompleta.';
      case 'insufficient_funds':
        return 'Fondi insufficienti sulla carta.';
      default:
        return error.message || 'Si è verificato un errore durante il pagamento.';
    }
  }

  // Formatta importo per visualizzazione
  formatAmount(amount: number, currency: string = 'EUR'): string {
    return new Intl.NumberFormat('it-IT', {
      style: 'currency',
      currency: currency
    }).format(amount);
  }

  // Valida numero carta (algoritmo di Luhn)
  validateCardNumber(cardNumber: string): boolean {
    const cleaned = cardNumber.replace(/\s/g, '');
    
    if (!/^\d+$/.test(cleaned) || cleaned.length < 13 || cleaned.length > 19) {
      return false;
    }

    let sum = 0;
    let isEven = false;

    for (let i = cleaned.length - 1; i >= 0; i--) {
      let digit = parseInt(cleaned[i]);

      if (isEven) {
        digit *= 2;
        if (digit > 9) {
          digit -= 9;
        }
      }

      sum += digit;
      isEven = !isEven;
    }

    return sum % 10 === 0;
  }

  // Identifica tipo di carta
  getCardType(cardNumber: string): string {
    const cleaned = cardNumber.replace(/\s/g, '');
    
    if (/^4/.test(cleaned)) return 'visa';
    if (/^5[1-5]/.test(cleaned)) return 'mastercard';
    if (/^3[47]/.test(cleaned)) return 'amex';
    if (/^6(?:011|5)/.test(cleaned)) return 'discover';
    
    return 'unknown';
  }
}

export const stripeService = new StripeService();

// Utility functions
export function formatCardNumber(value: string): string {
  const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
  const matches = v.match(/\d{4,16}/g);
  const match = matches && matches[0] || '';
  const parts = [];

  for (let i = 0, len = match.length; i < len; i += 4) {
    parts.push(match.substring(i, i + 4));
  }

  if (parts.length) {
    return parts.join(' ');
  } else {
    return v;
  }
}

export function formatExpiryDate(value: string): string {
  const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
  
  if (v.length >= 2) {
    return v.substring(0, 2) + '/' + v.substring(2, 4);
  }
  
  return v;
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

export function validateCVC(cvc: string, cardType: string = 'unknown'): boolean {
  if (cardType === 'amex') {
    return /^\d{4}$/.test(cvc);
  }
  return /^\d{3}$/.test(cvc);
}