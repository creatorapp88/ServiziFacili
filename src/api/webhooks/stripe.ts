import { webhookHandler } from '../../utils/webhook';

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Ottieni il payload raw e la firma
    const payload = JSON.stringify(req.body);
    const signature = req.headers['stripe-signature'];

    if (!signature) {
      return res.status(400).json({ error: 'Missing Stripe signature' });
    }

    // Verifica e processa il webhook
    const result = await webhookHandler.handleWebhookEvent(req.body);

    if (result.success) {
      console.log('Webhook processed successfully:', result.message);
      return res.status(200).json({ received: true, message: result.message });
    } else {
      console.error('Webhook processing failed:', result.message);
      return res.status(400).json({ error: result.message });
    }

  } catch (error) {
    console.error('Webhook error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}