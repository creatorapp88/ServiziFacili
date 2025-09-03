import React, { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { 
  CreditCard, 
  Lock, 
  AlertCircle, 
  CheckCircle, 
  Euro,
  Shield
} from 'lucide-react';
import { STRIPE_PUBLIC_KEY } from '../config/stripe';
import { stripeService, formatCardNumber, formatExpiryDate, validateExpiryDate, validateCVC } from '../utils/stripeService';
import { formatCurrency } from '../utils/pricing';

interface StripePaymentFormProps {
  amount: number;
  currency?: string;
  description: string;
  onSuccess: (paymentIntent: any) => void;
  onError: (error: string) => void;
  onCancel: () => void;
}

export default function StripePaymentForm({
  amount,
  currency = 'eur',
  description,
  onSuccess,
  onError,
  onCancel
}: StripePaymentFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [cardDetails, setCardDetails] = useState({
    number: '',
    expiry: '',
    cvc: '',
    name: ''
  });
  const [billingDetails, setBillingDetails] = useState({
    email: '',
    phone: '',
    address: {
      line1: '',
      city: '',
      postal_code: '',
      country: 'IT'
    }
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [stripe, setStripe] = useState<any>(null);

  useEffect(() => {
    const initializeStripe = async () => {
      const stripeInstance = await loadStripe(STRIPE_PUBLIC_KEY);
      setStripe(stripeInstance);
    };
    
    initializeStripe();
  }, []);

  const validateForm = (): boolean => {
    const newErrors: { [key: string]: string } = {};

    // Validazione carta
    if (!cardDetails.number || !stripeService.validateCardNumber(cardDetails.number.replace(/\s/g, ''))) {
      newErrors.number = 'Numero carta non valido';
    }

    if (!cardDetails.expiry || !validateExpiryDate(cardDetails.expiry)) {
      newErrors.expiry = 'Data scadenza non valida';
    }

    if (!cardDetails.cvc || !validateCVC(cardDetails.cvc)) {
      newErrors.cvc = 'CVC non valido';
    }

    if (!cardDetails.name.trim()) {
      newErrors.name = 'Nome intestatario richiesto';
    }

    // Validazione dati fatturazione
    if (!billingDetails.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(billingDetails.email)) {
      newErrors.email = 'Email non valida';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm() || !stripe) {
      return;
    }

    setIsLoading(true);

    try {
      // Crea Payment Intent
      const paymentIntent = await stripeService.createPaymentIntent(amount, currency);

      // Crea Payment Method
      const { error: paymentMethodError, paymentMethod } = await stripe.createPaymentMethod({
        type: 'card',
        card: {
          number: cardDetails.number.replace(/\s/g, ''),
          exp_month: parseInt(cardDetails.expiry.split('/')[0]),
          exp_year: parseInt(`20${cardDetails.expiry.split('/')[1]}`),
          cvc: cardDetails.cvc
        },
        billing_details: {
          name: cardDetails.name,
          email: billingDetails.email,
          phone: billingDetails.phone,
          address: billingDetails.address
        }
      });

      if (paymentMethodError) {
        throw new Error(paymentMethodError.message);
      }

      // Conferma pagamento
      const { error: confirmError, paymentIntent: confirmedPayment } = await stripe.confirmCardPayment(
        paymentIntent.clientSecret,
        {
          payment_method: paymentMethod.id
        }
      );

      if (confirmError) {
        throw new Error(confirmError.message);
      }

      if (confirmedPayment.status === 'succeeded') {
        onSuccess(confirmedPayment);
      } else {
        throw new Error('Pagamento non completato');
      }

    } catch (error: any) {
      console.error('Payment error:', error);
      onError(error.message || 'Errore durante il pagamento');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatCardNumber(e.target.value);
    setCardDetails({ ...cardDetails, number: formatted });
    
    // Rimuovi errore se presente
    if (errors.number) {
      setErrors({ ...errors, number: '' });
    }
  };

  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatExpiryDate(e.target.value);
    setCardDetails({ ...cardDetails, expiry: formatted });
    
    if (errors.expiry) {
      setErrors({ ...errors, expiry: '' });
    }
  };

  const cardType = stripeService.getCardType(cardDetails.number);

  return (
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-lg p-6">
      {/* Header */}
      <div className="text-center mb-6">
        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <CreditCard className="h-8 w-8 text-blue-600" />
        </div>
        <h2 className="text-xl font-bold text-gray-900">Pagamento Sicuro</h2>
        <p className="text-gray-600 mt-1">{description}</p>
      </div>

      {/* Amount Display */}
      <div className="bg-gray-50 rounded-lg p-4 mb-6 text-center">
        <div className="text-2xl font-bold text-gray-900 mb-1">
          {formatCurrency(amount)}
        </div>
        <div className="text-sm text-gray-600">Importo da pagare</div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Card Details */}
        <div className="space-y-4">
          <h3 className="font-medium text-gray-900 flex items-center">
            <CreditCard className="h-4 w-4 mr-2" />
            Dettagli Carta
          </h3>

          {/* Card Number */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Numero Carta *
            </label>
            <div className="relative">
              <input
                type="text"
                value={cardDetails.number}
                onChange={handleCardNumberChange}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none ${
                  errors.number ? 'border-red-300' : 'border-gray-300'
                }`}
                placeholder="1234 5678 9012 3456"
                maxLength={19}
              />
              {cardType !== 'unknown' && (
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                  <span className="text-xs font-medium text-gray-500 uppercase">
                    {cardType}
                  </span>
                </div>
              )}
            </div>
            {errors.number && (
              <p className="text-red-600 text-sm mt-1 flex items-center">
                <AlertCircle className="h-4 w-4 mr-1" />
                {errors.number}
              </p>
            )}
          </div>

          {/* Expiry and CVC */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Scadenza *
              </label>
              <input
                type="text"
                value={cardDetails.expiry}
                onChange={handleExpiryChange}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none ${
                  errors.expiry ? 'border-red-300' : 'border-gray-300'
                }`}
                placeholder="MM/YY"
                maxLength={5}
              />
              {errors.expiry && (
                <p className="text-red-600 text-sm mt-1">{errors.expiry}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                CVC *
              </label>
              <input
                type="text"
                value={cardDetails.cvc}
                onChange={(e) => {
                  const value = e.target.value.replace(/\D/g, '');
                  setCardDetails({ ...cardDetails, cvc: value });
                  if (errors.cvc) setErrors({ ...errors, cvc: '' });
                }}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none ${
                  errors.cvc ? 'border-red-300' : 'border-gray-300'
                }`}
                placeholder="123"
                maxLength={cardType === 'amex' ? 4 : 3}
              />
              {errors.cvc && (
                <p className="text-red-600 text-sm mt-1">{errors.cvc}</p>
              )}
            </div>
          </div>

          {/* Cardholder Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nome Intestatario *
            </label>
            <input
              type="text"
              value={cardDetails.name}
              onChange={(e) => {
                setCardDetails({ ...cardDetails, name: e.target.value });
                if (errors.name) setErrors({ ...errors, name: '' });
              }}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none ${
                errors.name ? 'border-red-300' : 'border-gray-300'
              }`}
              placeholder="Mario Rossi"
            />
            {errors.name && (
              <p className="text-red-600 text-sm mt-1">{errors.name}</p>
            )}
          </div>
        </div>

        {/* Billing Details */}
        <div className="space-y-4">
          <h3 className="font-medium text-gray-900">Dati Fatturazione</h3>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email *
            </label>
            <input
              type="email"
              value={billingDetails.email}
              onChange={(e) => {
                setBillingDetails({ ...billingDetails, email: e.target.value });
                if (errors.email) setErrors({ ...errors, email: '' });
              }}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none ${
                errors.email ? 'border-red-300' : 'border-gray-300'
              }`}
              placeholder="mario@email.com"
            />
            {errors.email && (
              <p className="text-red-600 text-sm mt-1">{errors.email}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Telefono
            </label>
            <input
              type="tel"
              value={billingDetails.phone}
              onChange={(e) => setBillingDetails({ ...billingDetails, phone: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              placeholder="+39 123 456 7890"
            />
          </div>
        </div>

        {/* Security Notice */}
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <div className="flex items-center space-x-2 text-green-700">
            <Shield className="h-5 w-5" />
            <div>
              <p className="font-medium text-sm">Pagamento Sicuro</p>
              <p className="text-xs">I tuoi dati sono protetti con crittografia SSL 256-bit</p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-3 pt-4">
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Annulla
          </button>
          <button
            type="submit"
            disabled={isLoading}
            className="flex-1 bg-blue-600 text-white px-4 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
          >
            {isLoading ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                <span>Elaborazione...</span>
              </>
            ) : (
              <>
                <Lock className="h-4 w-4" />
                <span>Paga {formatCurrency(amount)}</span>
              </>
            )}
          </button>
        </div>
      </form>

      {/* Payment Methods */}
      <div className="mt-6 text-center">
        <p className="text-xs text-gray-500 mb-2">Accettiamo:</p>
        <div className="flex justify-center space-x-4 text-xs text-gray-400">
          <span>Visa</span>
          <span>Mastercard</span>
          <span>American Express</span>
        </div>
      </div>
    </div>
  );
}