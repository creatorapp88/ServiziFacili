import { PAYPAL_CLIENT_ID, PAYPAL_CLIENT_SECRET, PAYPAL_EMAIL } from '../config/stripe';

export interface PayPalOrder {
  id: string;
  status: 'CREATED' | 'APPROVED' | 'COMPLETED' | 'CANCELLED';
  amount: number;
  currency: string;
  payer_email?: string;
  create_time: string;
}

export interface PayPalPayment {
  id: string;
  amount: number;
  currency: string;
  status: 'pending' | 'completed' | 'failed';
  payer_email: string;
  merchant_email: string;
  transaction_id: string;
  created_at: string;
}

export class PayPalService {
  private clientId: string;
  private clientSecret: string;
  private merchantEmail: string;
  private sandboxMode: boolean;

  constructor() {
    this.clientId = PAYPAL_CLIENT_ID;
    this.clientSecret = PAYPAL_CLIENT_SECRET;
    this.merchantEmail = PAYPAL_EMAIL;
    this.sandboxMode = true; // Cambia a false per produzione
  }

  // Crea ordine PayPal
  async createOrder(amount: number, currency: string = 'EUR'): Promise<PayPalOrder> {
    const orderData = {
      intent: 'CAPTURE',
      purchase_units: [{
        amount: {
          currency_code: currency,
          value: amount.toFixed(2)
        },
        description: 'Ricarica Wallet ServiziFacili',
        payee: {
          email_address: this.merchantEmail
        }
      }],
      application_context: {
        brand_name: 'ServiziFacili',
        landing_page: 'NO_PREFERENCE',
        user_action: 'PAY_NOW',
        return_url: `${window.location.origin}/payment/success`,
        cancel_url: `${window.location.origin}/payment/cancel`
      }
    };

    try {
      // In produzione, questa chiamata andrebbe al tuo backend
      const response = await fetch('/api/paypal/create-order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${await this.getAccessToken()}`
        },
        body: JSON.stringify(orderData)
      });

      if (!response.ok) {
        throw new Error('Errore nella creazione dell\'ordine PayPal');
      }

      const order = await response.json();
      
      return {
        id: order.id,
        status: order.status,
        amount: amount,
        currency: currency,
        create_time: new Date().toISOString()
      };
    } catch (error) {
      console.error('PayPal order creation error:', error);
      throw new Error('Impossibile creare l\'ordine PayPal');
    }
  }

  // Cattura pagamento PayPal
  async captureOrder(orderId: string): Promise<PayPalPayment> {
    try {
      const response = await fetch(`/api/paypal/capture-order/${orderId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${await this.getAccessToken()}`
        }
      });

      if (!response.ok) {
        throw new Error('Errore nella cattura del pagamento');
      }

      const captureData = await response.json();
      
      return {
        id: captureData.id,
        amount: parseFloat(captureData.purchase_units[0].payments.captures[0].amount.value),
        currency: captureData.purchase_units[0].payments.captures[0].amount.currency_code,
        status: 'completed',
        payer_email: captureData.payer.email_address,
        merchant_email: this.merchantEmail,
        transaction_id: captureData.purchase_units[0].payments.captures[0].id,
        created_at: new Date().toISOString()
      };
    } catch (error) {
      console.error('PayPal capture error:', error);
      throw new Error('Impossibile completare il pagamento PayPal');
    }
  }

  // Ottieni token di accesso PayPal
  private async getAccessToken(): Promise<string> {
    const auth = btoa(`${this.clientId}:${this.clientSecret}`);
    const baseUrl = this.sandboxMode 
      ? 'https://api-m.sandbox.paypal.com'
      : 'https://api-m.paypal.com';

    try {
      const response = await fetch(`${baseUrl}/v1/oauth2/token`, {
        method: 'POST',
        headers: {
          'Authorization': `Basic ${auth}`,
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: 'grant_type=client_credentials'
      });

      const data = await response.json();
      return data.access_token;
    } catch (error) {
      console.error('PayPal token error:', error);
      throw new Error('Impossibile ottenere token PayPal');
    }
  }

  // Simula pagamento PayPal per demo
  async simulatePayPalPayment(amount: number): Promise<PayPalPayment> {
    // Simula delay di rete
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Simula successo/fallimento (98% successo per PayPal)
    const success = Math.random() > 0.02;
    
    if (success) {
      return {
        id: `PAYPAL_${Date.now()}`,
        amount: amount,
        currency: 'EUR',
        status: 'completed',
        payer_email: 'cliente@example.com',
        merchant_email: this.merchantEmail,
        transaction_id: `TXN_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        created_at: new Date().toISOString()
      };
    } else {
      throw new Error('Pagamento PayPal rifiutato');
    }
  }

  // Gestisce webhook PayPal
  async handlePayPalWebhook(payload: any, headers: any): Promise<{ success: boolean; message: string }> {
    try {
      // Verifica firma webhook PayPal
      if (!this.verifyWebhookSignature(payload, headers)) {
        return { success: false, message: 'Invalid PayPal webhook signature' };
      }

      const eventType = payload.event_type;
      
      switch (eventType) {
        case 'PAYMENT.CAPTURE.COMPLETED':
          return await this.handlePaymentCompleted(payload.resource);
        
        case 'PAYMENT.CAPTURE.DENIED':
          return await this.handlePaymentDenied(payload.resource);
        
        case 'BILLING.SUBSCRIPTION.CREATED':
          return await this.handleSubscriptionCreated(payload.resource);
        
        case 'BILLING.SUBSCRIPTION.CANCELLED':
          return await this.handleSubscriptionCancelled(payload.resource);
        
        default:
          console.log(`Unhandled PayPal event: ${eventType}`);
          return { success: true, message: `Event ${eventType} received but not processed` };
      }
    } catch (error) {
      console.error('PayPal webhook error:', error);
      return { success: false, message: 'PayPal webhook processing failed' };
    }
  }

  private verifyWebhookSignature(payload: any, headers: any): boolean {
    // In produzione, verifica la firma usando PayPal SDK
    // Per ora simuliamo la verifica
    return headers['paypal-transmission-id'] && headers['paypal-cert-id'];
  }

  private async handlePaymentCompleted(resource: any): Promise<{ success: boolean; message: string }> {
    console.log('PayPal payment completed:', resource.id);
    
    const amount = parseFloat(resource.amount.value);
    const payerEmail = resource.payer?.email_address;
    
    // Aggiorna wallet utente
    console.log(`Adding ${amount}€ to user wallet from PayPal payment`);
    
    return { success: true, message: 'PayPal payment processed successfully' };
  }

  private async handlePaymentDenied(resource: any): Promise<{ success: boolean; message: string }> {
    console.log('PayPal payment denied:', resource.id);
    
    // Gestisci pagamento rifiutato
    return { success: true, message: 'PayPal payment denial handled' };
  }

  private async handleSubscriptionCreated(resource: any): Promise<{ success: boolean; message: string }> {
    console.log('PayPal subscription created:', resource.id);
    
    // Gestisci nuovo abbonamento
    return { success: true, message: 'PayPal subscription created' };
  }

  private async handleSubscriptionCancelled(resource: any): Promise<{ success: boolean; message: string }> {
    console.log('PayPal subscription cancelled:', resource.id);
    
    // Gestisci cancellazione abbonamento
    return { success: true, message: 'PayPal subscription cancelled' };
  }
}

export const paypalService = new PayPalService();

// Utility functions per PayPal
export function formatPayPalAmount(amount: number): string {
  return amount.toFixed(2);
}

export function validatePayPalEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function getPayPalButtonStyle() {
  return {
    layout: 'vertical',
    color: 'blue',
    shape: 'rect',
    label: 'paypal',
    height: 45
  };
}