import React, { useState } from 'react';
import { X, CreditCard, Euro, Shield, AlertCircle, CheckCircle, Wallet, ArrowLeft } from 'lucide-react';
import { WALLET_RECHARGE_OPTIONS, MINIMUM_RECHARGE, MAXIMUM_RECHARGE, STRIPE_WEBHOOK_SECRET } from '../config/stripe';
import { formatCurrency } from '../utils/pricing';
import { stripeService } from '../utils/stripeService';
import StripePaymentForm from './StripePaymentForm';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPaymentSuccess: (amount: number) => void;
  currentBalance: number;
}

export default function PaymentModal({ isOpen, onClose, onPaymentSuccess, currentBalance }: PaymentModalProps) {
  const [selectedAmount, setSelectedAmount] = useState(25);
  const [customAmount, setCustomAmount] = useState('');
  const [useCustomAmount, setUseCustomAmount] = useState(false);
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);

  if (!isOpen) return null;

  const getAmount = () => {
    return useCustomAmount ? Number(customAmount) : selectedAmount;
  };

  const validatePayment = () => {
    const newErrors: string[] = [];
    const amount = getAmount();

    if (amount < MINIMUM_RECHARGE) {
      newErrors.push(`L'importo minimo è ${formatCurrency(MINIMUM_RECHARGE)}`);
    }
    if (amount > MAXIMUM_RECHARGE) {
      newErrors.push(`L'importo massimo è ${formatCurrency(MAXIMUM_RECHARGE)}`);
    }
    
    setErrors(newErrors);
    return newErrors.length === 0;
  };

  const handleProceedToPayment = () => {
    if (!validatePayment()) return;
    setShowPaymentForm(true);
  };

  const handlePaymentSuccess = (paymentIntent: any) => {
    try {
      const amount = getAmount();
      
      console.log('Payment successful:', paymentIntent);
      
      onPaymentSuccess(amount);
      onClose();
      
      // Reset form
      setCustomAmount('');
      setUseCustomAmount(false);
      setSelectedAmount(25);
      setShowPaymentForm(false);
      
    } catch (error) {
      console.error('Payment processing error:', error);
      setErrors(['Errore durante l\'elaborazione del pagamento.']);
    }
  };

  const handlePaymentError = (error: string) => {
    setErrors([error]);
    setShowPaymentForm(false);
  };

  const handlePaymentCancel = () => {
    setShowPaymentForm(false);
  };

  // Se stiamo mostrando il form di pagamento Stripe
  if (showPaymentForm) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
          <div className="p-4 border-b border-gray-200">
            <button
              onClick={() => setShowPaymentForm(false)}
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-900"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Torna alla selezione importo</span>
            </button>
          </div>
          <div className="p-4">
            <StripePaymentForm
              amount={getAmount()}
              currency="eur"
              description={`Ricarica wallet - ${formatCurrency(getAmount())}`}
              onSuccess={handlePaymentSuccess}
              onError={handlePaymentError}
              onCancel={handlePaymentCancel}
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold text-gray-900">Ricarica Wallet</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
          <p className="text-gray-600 mt-2">
            Saldo attuale: <span className="font-semibold">{formatCurrency(currentBalance)}</span>
          </p>
        </div>

        <div className="p-6">
          {/* Amount Selection */}
          <div className="mb-6">
            <h3 className="font-medium text-gray-900 mb-4">Seleziona importo</h3>
            
            {/* Preset Amounts */}
            <div className="grid grid-cols-3 gap-3 mb-4">
              {WALLET_RECHARGE_OPTIONS.map(option => (
                <button
                  key={option.amount}
                  onClick={() => {
                    setSelectedAmount(option.amount);
                    setUseCustomAmount(false);
                  }}
                  className={`relative p-3 border rounded-lg text-center transition-colors ${
                    !useCustomAmount && selectedAmount === option.amount
                      ? 'border-blue-500 bg-blue-50 text-blue-700'
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                >
                  {option.popular && (
                    <span className="absolute -top-2 left-1/2 transform -translate-x-1/2 bg-blue-600 text-white text-xs px-2 py-1 rounded-full">
                      Popolare
                    </span>
                  )}
                  <div className="font-semibold">{option.label}</div>
                </button>
              ))}
            </div>

            {/* Custom Amount */}
            <div className="border border-gray-300 rounded-lg p-3">
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  checked={useCustomAmount}
                  onChange={() => setUseCustomAmount(true)}
                  className="text-blue-600"
                />
                <span className="font-medium">Importo personalizzato</span>
              </label>
              {useCustomAmount && (
                <div className="mt-3">
                  <div className="relative">
                    <Euro className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type="number"
                      min={MINIMUM_RECHARGE}
                      max={MAXIMUM_RECHARGE}
                      value={customAmount}
                      onChange={(e) => setCustomAmount(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                      placeholder={`${MINIMUM_RECHARGE} - ${MAXIMUM_RECHARGE}`}
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    Min: {formatCurrency(MINIMUM_RECHARGE)} - Max: {formatCurrency(MAXIMUM_RECHARGE)}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Errors */}
          {errors.length > 0 && (
            <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4">
              {errors.map((error, index) => (
                <div key={index} className="flex items-center space-x-2 text-red-700">
                  <AlertCircle className="h-4 w-4" />
                  <span className="text-sm">{error}</span>
                </div>
              ))}
            </div>
          )}

          {/* Security Notice */}
          <div className="mb-6 bg-green-50 border border-green-200 rounded-lg p-4">
            <div className="flex items-center space-x-2 text-green-700">
              <Shield className="h-5 w-5" />
              <div>
                <p className="font-medium text-sm">Pagamento sicuro</p>
                <p className="text-xs">I tuoi dati sono protetti con crittografia SSL 256-bit</p>
              </div>
            </div>
          </div>

          {/* Summary */}
          <div className="mb-6 bg-gray-50 rounded-lg p-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-gray-600">Importo ricarica:</span>
              <span className="font-bold text-lg">{formatCurrency(getAmount())}</span>
            </div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-gray-600">Commissione:</span>
              <span className="text-green-600">Gratuita</span>
            </div>
            <div className="border-t border-gray-200 pt-2 mt-2">
              <div className="flex justify-between items-center">
                <span className="font-medium text-gray-900">Nuovo saldo:</span>
                <span className="font-bold text-lg text-blue-600">
                  {formatCurrency(currentBalance + getAmount())}
                </span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-3">
            <button
              onClick={onClose}
              className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Annulla
            </button>
            <button
              onClick={handleProceedToPayment}
              disabled={getAmount() < MINIMUM_RECHARGE}
              className="flex-1 bg-blue-600 text-white px-4 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Procedi al Pagamento
            </button>
          </div>

          {/* Payment Methods Info */}
          <div className="mt-6 text-center">
            <p className="text-xs text-gray-500 mb-2">Accettiamo:</p>
            <div className="flex justify-center space-x-4 text-xs text-gray-400">
              <span>Visa</span>
              <span>Mastercard</span>
              <span>American Express</span>
              <span>Apple Pay</span>
              <span>Google Pay</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}