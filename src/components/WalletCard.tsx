import React from 'react';
import { Wallet, CreditCard, TrendingUp, TrendingDown, Plus } from 'lucide-react';
import { formatCurrency } from '../utils/pricing';
import { Wallet as WalletType, Transaction } from '../types';
import PaymentModal from './PaymentModal';
import InvoiceModal from './InvoiceModal';

interface WalletCardProps {
  wallet: WalletType;
  showAddFunds?: boolean;
  onWalletUpdate?: (newBalance: number, transaction: Transaction) => void;
}

export default function WalletCard({ wallet, showAddFunds = true, onWalletUpdate }: WalletCardProps) {
  const [showPaymentModal, setShowPaymentModal] = React.useState(false);
  const [showInvoiceModal, setShowInvoiceModal] = React.useState(false);
  const [selectedInvoice, setSelectedInvoice] = React.useState<any>(null);

  const recentTransactions = wallet.transactions
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 5);

  const handlePaymentSuccess = (amount: number) => {
    const newTransaction: Transaction = {
      id: `tx-${Date.now()}`,
      walletId: wallet.id,
      type: 'credit',
      amount: amount,
      description: 'Ricarica wallet',
      createdAt: new Date().toISOString(),
      status: 'completed'
    };

    if (onWalletUpdate) {
      onWalletUpdate(wallet.balance + amount, newTransaction);
    }

    // Genera fattura
    const invoice = {
      id: `INV-${Date.now()}`,
      date: new Date().toISOString(),
      amount: amount,
      description: `Ricarica wallet - ${formatCurrency(amount)}`,
      vatRate: 22,
      vatAmount: amount * 0.22,
      totalAmount: amount * 1.22
    };

    setSelectedInvoice(invoice);
    setShowInvoiceModal(true);
  };

  return (
    <>
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        {/* Wallet Header */}
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Wallet className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Il tuo Wallet</h3>
                <p className="text-sm text-gray-500">Saldo disponibile</p>
              </div>
            </div>
            {showAddFunds && (
              <button
                onClick={() => setShowPaymentModal(true)}
                className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Plus className="h-4 w-4" />
                <span>Ricarica</span>
              </button>
            )}
          </div>
        </div>

        {/* Balance */}
        <div className="p-6 border-b border-gray-100">
          <div className="text-center">
            <div className="text-4xl font-bold text-gray-900 mb-2">
              {formatCurrency(wallet.balance)}
            </div>
            <div className="flex items-center justify-center space-x-4 text-sm">
              <div className="flex items-center space-x-1 text-green-600">
                <TrendingUp className="h-4 w-4" />
                <span>Entrate: {formatCurrency(
                  wallet.transactions
                    .filter(t => t.type === 'credit' && t.status === 'completed')
                    .reduce((sum, t) => sum + t.amount, 0)
                )}</span>
              </div>
              <div className="flex items-center space-x-1 text-red-600">
                <TrendingDown className="h-4 w-4" />
                <span>Uscite: {formatCurrency(
                  wallet.transactions
                    .filter(t => t.type === 'debit' && t.status === 'completed')
                    .reduce((sum, t) => sum + t.amount, 0)
                )}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Transactions */}
        <div className="p-6">
          <h4 className="text-sm font-medium text-gray-900 mb-4">Transazioni Recenti</h4>
          <div className="space-y-3">
            {recentTransactions.length > 0 ? (
              recentTransactions.map(transaction => (
                <div key={transaction.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      transaction.type === 'credit' ? 'bg-green-100' : 'bg-red-100'
                    }`}>
                      {transaction.type === 'credit' ? (
                        <TrendingUp className="h-4 w-4 text-green-600" />
                      ) : (
                        <TrendingDown className="h-4 w-4 text-red-600" />
                      )}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">{transaction.description}</p>
                      <p className="text-xs text-gray-500">
                        {new Date(transaction.createdAt).toLocaleDateString('it-IT')}
                        {transaction.type === 'credit' && transaction.description.includes('Ricarica') && (
                          <button
                            onClick={() => {
                              const invoice = {
                                id: `INV-${transaction.id}`,
                                date: transaction.createdAt,
                                amount: transaction.amount,
                                description: transaction.description,
                                vatRate: 22,
                                vatAmount: transaction.amount * 0.22,
                                totalAmount: transaction.amount * 1.22
                              };
                              setSelectedInvoice(invoice);
                              setShowInvoiceModal(true);
                            }}
                            className="ml-2 text-blue-600 hover:text-blue-700 text-xs underline"
                          >
                            Fattura
                          </button>
                        )}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={`text-sm font-medium ${
                      transaction.type === 'credit' ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {transaction.type === 'credit' ? '+' : '-'}{formatCurrency(transaction.amount)}
                    </p>
                    <p className={`text-xs ${
                      transaction.status === 'completed' ? 'text-green-500' : 
                      transaction.status === 'pending' ? 'text-yellow-500' : 'text-red-500'
                    }`}>
                      {transaction.status}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-sm text-gray-500 text-center py-4">Nessuna transazione</p>
            )}
          </div>
        </div>
      </div>

      {/* Payment Modal */}
      <PaymentModal
        isOpen={showPaymentModal}
        onClose={() => setShowPaymentModal(false)}
        onPaymentSuccess={handlePaymentSuccess}
        currentBalance={wallet.balance}
      />

      {/* Invoice Modal */}
      {selectedInvoice && (
        <InvoiceModal
          isOpen={showInvoiceModal}
          onClose={() => setShowInvoiceModal(false)}
          invoice={selectedInvoice}
          companyInfo={{
            name: 'ServiziFacili S.r.l.',
            address: 'Via Roma 123, 20121 Milano (MI)',
            vatNumber: 'IT12345678901',
            fiscalCode: '12345678901'
          }}
          customerInfo={{
            name: 'Professionista',
            email: 'professionista@email.com'
          }}
        />
      )}
    </>
  );
}