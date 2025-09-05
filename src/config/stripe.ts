// Stripe configuration
export const STRIPE_PUBLIC_KEY = import.meta.env.VITE_STRIPE_PUBLIC_KEY || '';
export const STRIPE_WEBHOOK_SECRET = import.meta.env.STRIPE_WEBHOOK_SECRET || '';

// Pricing configuration
export const WALLET_RECHARGE_OPTIONS = [
  { amount: 10, label: '€10', popular: false },
  { amount: 25, label: '€25', popular: true },
  { amount: 50, label: '€50', popular: false },
  { amount: 100, label: '€100', popular: false },
  { amount: 200, label: '€200', popular: false }
];

export const MINIMUM_RECHARGE = 5; // €5 minimum
export const MAXIMUM_RECHARGE = 500; // €500 maximum
