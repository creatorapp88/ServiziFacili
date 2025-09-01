import { PricingTier } from '../types';

export const PRICING_TIERS: PricingTier[] = [
  { maxDistance: 5, price: 2.50, name: 'Zona Locale' },
  { maxDistance: 15, price: 5.00, name: 'Zona Urbana' },
  { maxDistance: 30, price: 8.50, name: 'Zona Provinciale' },
  { maxDistance: 50, price: 12.00, name: 'Zona Regionale' },
  { maxDistance: Infinity, price: 18.00, name: 'Zona Nazionale' }
];

export function calculateRequestCost(distance: number): { cost: number; tier: PricingTier } {
  const tier = PRICING_TIERS.find(tier => distance <= tier.maxDistance) || PRICING_TIERS[PRICING_TIERS.length - 1];
  return { cost: tier.price, tier };
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('it-IT', {
    style: 'currency',
    currency: 'EUR'
  }).format(amount);
}

// Simula il calcolo della distanza (in un'app reale useresti Google Maps API)
export function calculateDistance(from: string, to: string): number {
  // Mock calculation - returns random distance between 1-100km
  return Math.floor(Math.random() * 100) + 1;
}