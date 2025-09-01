import React from 'react';
import { Wallet, CreditCard, TrendingUp, TrendingDown, Plus } from 'lucide-react';
import { formatCurrency } from '../utils/pricing';
import { Wallet as WalletType, Transaction } from '../types';

interface WalletCardProps {
  wallet: WalletType;
  onAddFunds?: () => void;
  showAddFunds?: boolean;
}

export default function WalletCard({ wallet, onAddFunds, showAddFunds = true }: WalletCardProps) {
  const recentTransactions = wallet.transactions
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 5);

  return (
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
              onClick={onAddFunds}
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
  );
}