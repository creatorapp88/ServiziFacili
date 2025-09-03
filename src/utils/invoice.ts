import { Transaction } from '../types';

export interface InvoiceData {
  id: string;
  number: string;
  date: string;
  dueDate: string;
  amount: number;
  vatRate: number;
  vatAmount: number;
  totalAmount: number;
  description: string;
  status: 'paid' | 'pending' | 'overdue';
  paymentMethod: string;
}

export function generateInvoiceFromTransaction(transaction: Transaction): InvoiceData {
  const vatRate = 22; // IVA italiana standard
  const vatAmount = transaction.amount * (vatRate / 100);
  const totalAmount = transaction.amount + vatAmount;
  
  return {
    id: `INV-${transaction.id}`,
    number: `2024/${transaction.id.slice(-6)}`,
    date: transaction.createdAt,
    dueDate: transaction.createdAt, // Pagamento immediato
    amount: transaction.amount,
    vatRate,
    vatAmount,
    totalAmount,
    description: transaction.description,
    status: 'paid',
    paymentMethod: 'Carta di credito'
  };
}

export function calculateVAT(amount: number, rate: number = 22): { vatAmount: number; totalAmount: number } {
  const vatAmount = amount * (rate / 100);
  const totalAmount = amount + vatAmount;
  
  return { vatAmount, totalAmount };
}

export function formatInvoiceNumber(id: string): string {
  const year = new Date().getFullYear();
  const number = id.slice(-6).padStart(6, '0');
  return `${year}/${number}`;
}