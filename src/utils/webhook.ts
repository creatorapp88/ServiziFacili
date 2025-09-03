import { STRIPE_WEBHOOK_SECRET } from '../config/stripe';

export interface WebhookEvent {
  id: string;
  type: string;
  data: {
    object: any;
  };
  created: number;
}

export class StripeWebhookHandler {
  private webhookSecret: string;

  constructor() {
    this.webhookSecret = STRIPE_WEBHOOK_SECRET;
  }

  // Verifica la firma del webhook Stripe
  verifyWebhookSignature(payload: string, signature: string): boolean {
    try {
      // Verifica base della firma Stripe
      if (!signature || !signature.includes('whsec_')) {
        console.error('Invalid signature format');
        return false;
      }

      // In produzione, qui useresti stripe.webhooks.constructEvent
      // per una verifica completa della firma HMAC
      const expectedSignature = this.webhookSecret;
      
      // Verifica che la firma contenga il nostro webhook secret
      return signature.includes(expectedSignature.substring(6, 20));
    } catch (error) {
      console.error('Webhook signature verification failed:', error);
      return false;
    }
  }

  // Gestisce gli eventi webhook di Stripe
  async handleWebhookEvent(event: WebhookEvent): Promise<{ success: boolean; message: string }> {
    try {
      switch (event.type) {
        case 'payment_intent.succeeded':
          return await this.handlePaymentSuccess(event.data.object);
        
        case 'payment_intent.payment_failed':
          return await this.handlePaymentFailed(event.data.object);
        
        case 'customer.subscription.created':
          return await this.handleSubscriptionCreated(event.data.object);
        
        case 'customer.subscription.deleted':
          return await this.handleSubscriptionCanceled(event.data.object);
        
        case 'invoice.payment_succeeded':
          return await this.handleInvoicePaymentSucceeded(event.data.object);
        
        case 'invoice.payment_failed':
          return await this.handleInvoicePaymentFailed(event.data.object);
        
        default:
          console.log(`Unhandled event type: ${event.type}`);
          return { success: true, message: `Event ${event.type} received but not processed` };
      }
    } catch (error) {
      console.error('Error handling webhook event:', error);
      return { success: false, message: 'Internal server error' };
    }
  }

  private async handlePaymentSuccess(paymentIntent: any): Promise<{ success: boolean; message: string }> {
    console.log('✅ Payment succeeded:', paymentIntent.id);
    
    // Aggiorna il wallet del professionista
    const amount = paymentIntent.amount / 100; // Stripe usa centesimi
    const userId = paymentIntent.metadata?.userId;
    
    if (userId) {
      // In produzione: aggiorna database
      console.log(`💰 Adding ${amount}€ to user ${userId} wallet`);
      
      // Simula aggiornamento database
      await this.updateUserWallet(userId, amount);
      
      // Invia email di conferma
      await this.sendPaymentConfirmationEmail(userId, amount);
    }
    
    return { success: true, message: 'Payment processed successfully' };
  }

  private async handlePaymentFailed(paymentIntent: any): Promise<{ success: boolean; message: string }> {
    console.log('❌ Payment failed:', paymentIntent.id);
    
    const userId = paymentIntent.metadata?.userId;
    if (userId) {
      // Notifica l'utente del fallimento
      await this.sendPaymentFailedEmail(userId, paymentIntent.last_payment_error?.message);
    }
    
    return { success: true, message: 'Payment failure handled' };
  }

  private async handleSubscriptionCreated(subscription: any): Promise<{ success: boolean; message: string }> {
    console.log('Subscription created:', subscription.id);
    
    // Gestisci nuovi abbonamenti premium
    const customerId = subscription.customer;
    await this.upgradeToPremium(customerId);
    
    return { success: true, message: 'Subscription created successfully' };
  }

  private async handleSubscriptionCanceled(subscription: any): Promise<{ success: boolean; message: string }> {
    console.log('Subscription canceled:', subscription.id);
    
    // Rimuovi benefici premium
    const customerId = subscription.customer;
    await this.downgradePremium(customerId);
    
    return { success: true, message: 'Subscription canceled successfully' };
  }

  private async handleInvoicePaymentSucceeded(invoice: any): Promise<{ success: boolean; message: string }> {
    console.log('Invoice payment succeeded:', invoice.id);
    
    // Gestisci pagamenti ricorrenti
    const customerId = invoice.customer;
    await this.processRecurringPayment(customerId, invoice.amount_paid / 100);
    
    return { success: true, message: 'Invoice payment processed' };
  }

  private async handleInvoicePaymentFailed(invoice: any): Promise<{ success: boolean; message: string }> {
    console.log('Invoice payment failed:', invoice.id);
    
    // Gestisci fallimenti pagamenti ricorrenti
    const customerId = invoice.customer;
    await this.handleRecurringPaymentFailure(customerId);
    
    return { success: true, message: 'Invoice payment failure handled' };
  }

  // Metodi helper (in produzione connessi al database)
  private async updateUserWallet(userId: string, amount: number): Promise<void> {
    // TODO: Connetti al database reale
    console.log(`💳 Wallet updated: User ${userId} +${amount}€`);
    
    // Esempio di aggiornamento database:
    // await db.wallets.update({
    //   where: { userId },
    //   data: { balance: { increment: amount } }
    // });
  }

  private async sendPaymentConfirmationEmail(userId: string, amount: number): Promise<void> {
    console.log(`📧 Sending confirmation email to user ${userId} for ${amount}€`);
    
    // TODO: Integra servizio email (SendGrid, Mailgun, etc.)
    // await emailService.send({
    //   to: userEmail,
    //   template: 'payment-confirmation',
    //   data: { amount, transactionId: paymentIntent.id }
    // });
  }

  private async sendPaymentFailedEmail(userId: string, error?: string): Promise<void> {
    console.log(`Sending payment failed email to user ${userId}:`, error);
  }

  private async upgradeToPremium(customerId: string): Promise<void> {
    console.log(`Upgrading customer ${customerId} to premium`);
  }

  private async downgradePremium(customerId: string): Promise<void> {
    console.log(`Downgrading customer ${customerId} from premium`);
  }

  private async processRecurringPayment(customerId: string, amount: number): Promise<void> {
    console.log(`Processing recurring payment: ${customerId} - ${amount}€`);
  }

  private async handleRecurringPaymentFailure(customerId: string): Promise<void> {
    console.log(`Handling recurring payment failure for customer ${customerId}`);
  }
}

export const webhookHandler = new StripeWebhookHandler();