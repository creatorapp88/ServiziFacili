import React, { useState, useEffect } from 'react';
import { 
  Users, 
  FileText, 
  DollarSign, 
  Settings, 
  LogOut, 
  Bell,
  TrendingUp,
  Calendar,
  Search,
  Filter,
  Download,
  Eye,
  CheckCircle,
  XCircle,
  Clock,
  Wallet,
  CreditCard
} from 'lucide-react';
import { formatCurrency } from '../utils/pricing';
import { Transaction, Wallet as WalletType } from '../types';
import WalletCard from './WalletCard';

interface AdminDashboardProps {
  onLogout: () => void;
}

interface Request {
  id: number;
  name: string;
  email: string;
  phone: string;
  service: string;
  description: string;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: string;
  budget?: string;
}

export default function AdminDashboard({ onLogout }: AdminDashboardProps) {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [requests, setRequests] = useState<Request[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [adminWallet, setAdminWallet] = useState<WalletType>({
    id: 'admin-wallet',
    userId: 'admin',
    balance: 100.75,
    currency: 'EUR',
    transactions: [
      {
        id: 'tx-1',
        walletId: 'admin-wallet',
        type: 'credit',
        amount: 8.50,
        description: 'Commissione da richiesta: Riparazione Caldaia',
        relatedRequestId: 'req-1',
        createdAt: '2024-01-15T11:00:00Z',
        status: 'completed'
      },
      {
        id: 'tx-2',
        walletId: 'admin-wallet',
        type: 'credit',
        amount: 5.00,
        description: 'Commissione da richiesta: Imbiancatura Casa',
        relatedRequestId: 'req-2',
        createdAt: '2024-01-14T16:30:00Z',
        status: 'completed'
      },
      {
        id: 'tx-3',
        walletId: 'admin-wallet',
        type: 'credit',
        amount: 12.00,
        description: 'Commissione da richiesta: Riparazione Auto',
        relatedRequestId: 'req-3',
        createdAt: '2024-01-13T14:15:00Z',
        status: 'completed'
      }
    ]
  });

  // Mock data - in a real app this would come from an API
  useEffect(() => {
    const mockRequests: Request[] = [
      {
        id: 1,
        name: 'Mario Rossi',
        email: 'mario.rossi@email.com',
        phone: '+39 123 456 7890',
        service: 'Riparazione Caldaia',
        description: 'La caldaia non si accende più da ieri sera',
        status: 'pending',
        createdAt: '2024-01-15T10:30:00Z',
        budget: '€150-250'
      },
      {
        id: 2,
        name: 'Laura Bianchi',
        email: 'laura.bianchi@email.com',
        phone: '+39 987 654 3210',
        service: 'Imbiancatura Casa',
        description: 'Necessito di imbiancare un appartamento di 80mq',
        status: 'approved',
        createdAt: '2024-01-14T15:45:00Z',
        budget: '€800-1200'
      },
      {
        id: 3,
        name: 'Giuseppe Verdi',
        email: 'giuseppe.verdi@email.com',
        phone: '+39 555 123 4567',
        service: 'Riparazione Elettrodomestici',
        description: 'Lavatrice che perde acqua',
        status: 'rejected',
        createdAt: '2024-01-13T09:15:00Z',
        budget: '€100-150'
      }
    ];
    setRequests(mockRequests);
  }, []);

  const stats = {
    totalRequests: requests.length,
    pendingRequests: requests.filter(r => r.status === 'pending').length,
    approvedRequests: requests.filter(r => r.status === 'approved').length,
    rejectedRequests: requests.filter(r => r.status === 'rejected').length,
    totalRevenue: adminWallet.transactions
      .filter(t => t.type === 'credit' && t.status === 'completed')
      .reduce((sum, t) => sum + t.amount, 0),
    monthlyRevenue: adminWallet.transactions
      .filter(t => {
        const transactionDate = new Date(t.createdAt);
        const currentMonth = new Date().getMonth();
        return t.type === 'credit' && t.status === 'completed' && transactionDate.getMonth() === currentMonth;
      })
      .reduce((sum, t) => sum + t.amount, 0)
  };

  const filteredRequests = requests.filter(request => {
    const matchesSearch = request.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         request.service.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || request.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const updateRequestStatus = (id: number, status: 'approved' | 'rejected') => {
    setRequests(prev => prev.map(req => 
      req.id === id ? { ...req, status } : req
    ));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'approved': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return <Clock className="h-4 w-4" />;
      case 'approved': return <CheckCircle className="h-4 w-4" />;
      case 'rejected': return <XCircle className="h-4 w-4" />;
      default: return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-blue-600">ServiziFacili Admin</h1>
            </div>
            <div className="flex items-center space-x-4">
              <button className="p-2 text-gray-400 hover:text-gray-600 relative">
                <Bell className="h-6 w-6" />
                <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                  {stats.pendingRequests}
                </span>
              </button>
              <button
                onClick={onLogout}
                className="flex items-center space-x-2 text-gray-600 hover:text-gray-900"
              >
                <LogOut className="h-5 w-5" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Navigation Tabs */}
        <div className="mb-8">
          <nav className="flex space-x-8">
            {[
              { id: 'dashboard', name: 'Dashboard', icon: TrendingUp },
              { id: 'requests', name: 'Richieste', icon: FileText },
              { id: 'wallet', name: 'Wallet', icon: Wallet },
              { id: 'users', name: 'Utenti', icon: Users },
              { id: 'settings', name: 'Impostazioni', icon: Settings }
            ].map(tab => {
              const IconComponent = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-lg font-medium transition-colors ${
                    activeTab === tab.id
                      ? 'bg-blue-100 text-blue-700'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <IconComponent className="h-5 w-5" />
                  <span>{tab.name}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Dashboard Content */}
        {activeTab === 'dashboard' && (
          <div className="space-y-8">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Richieste Totali</p>
                    <p className="text-3xl font-bold text-gray-900">{stats.totalRequests}</p>
                  </div>
                  <FileText className="h-8 w-8 text-blue-600" />
                </div>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">In Attesa</p>
                    <p className="text-3xl font-bold text-yellow-600">{stats.pendingRequests}</p>
                  </div>
                  <Clock className="h-8 w-8 text-yellow-600" />
                </div>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Ricavi Totali</p>
                    <p className="text-3xl font-bold text-green-600">{formatCurrency(stats.totalRevenue)}</p>
                  </div>
                  <DollarSign className="h-8 w-8 text-green-600" />
                </div>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Saldo Wallet</p>
                    <p className="text-3xl font-bold text-blue-600">{formatCurrency(adminWallet.balance)}</p>
                  </div>
                  <CreditCard className="h-8 w-8 text-blue-600" />
                </div>
              </div>
            </div>

            {/* Recent Requests */}
            <div className="bg-white rounded-xl shadow-sm">
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">Richieste Recenti</h3>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {requests.slice(0, 5).map(request => (
                    <div key={request.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900">{request.name}</h4>
                        <p className="text-sm text-gray-600">{request.service}</p>
                      </div>
                      <div className="flex items-center space-x-3">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium flex items-center space-x-1 ${getStatusColor(request.status)}`}>
                          {getStatusIcon(request.status)}
                          <span className="capitalize">{request.status}</span>
                        </span>
                        <span className="text-sm text-gray-500">
                          {new Date(request.createdAt).toLocaleDateString('it-IT')}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Requests Tab */}
        {activeTab === 'requests' && (
          <div className="space-y-6">
            {/* Filters */}
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Cerca per nome o servizio..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                    />
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  >
                    <option value="all">Tutti gli stati</option>
                    <option value="pending">In attesa</option>
                    <option value="approved">Approvate</option>
                    <option value="rejected">Rifiutate</option>
                  </select>
                  <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                    <Download className="h-4 w-4" />
                    <span>Esporta</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Requests List */}
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cliente</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Servizio</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Budget</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stato</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Data</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Azioni</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredRequests.map(request => (
                      <tr key={request.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div>
                            <div className="text-sm font-medium text-gray-900">{request.name}</div>
                            <div className="text-sm text-gray-500">{request.email}</div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-gray-900">{request.service}</div>
                          <div className="text-sm text-gray-500 max-w-xs truncate">{request.description}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {request.budget || 'Non specificato'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-3 py-1 rounded-full text-xs font-medium flex items-center space-x-1 w-fit ${getStatusColor(request.status)}`}>
                            {getStatusIcon(request.status)}
                            <span className="capitalize">{request.status}</span>
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {new Date(request.createdAt).toLocaleDateString('it-IT')}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex items-center space-x-2">
                            <button className="text-blue-600 hover:text-blue-900">
                              <Eye className="h-4 w-4" />
                            </button>
                            {request.status === 'pending' && (
                              <>
                                <button
                                  onClick={() => updateRequestStatus(request.id, 'approved')}
                                  className="text-green-600 hover:text-green-900"
                                >
                                  <CheckCircle className="h-4 w-4" />
                                </button>
                                <button
                                  onClick={() => updateRequestStatus(request.id, 'rejected')}
                                  className="text-red-600 hover:text-red-900"
                                >
                                  <XCircle className="h-4 w-4" />
                                </button>
                              </>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Wallet Tab */}
        {activeTab === 'wallet' && (
          <div className="space-y-6">
            <WalletCard 
              wallet={adminWallet} 
              showAddFunds={false}
            />
            
            {/* Revenue Analytics */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Ricavi per Categoria</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Riparazioni</span>
                    <span className="font-medium">{formatCurrency(450.25)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Casa e Giardino</span>
                    <span className="font-medium">{formatCurrency(320.50)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Design</span>
                    <span className="font-medium">{formatCurrency(280.00)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Altri</span>
                    <span className="font-medium">{formatCurrency(200.00)}</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Statistiche Mensili</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Ricavi questo mese</span>
                    <span className="font-medium text-green-600">{formatCurrency(stats.monthlyRevenue)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Transazioni</span>
                    <span className="font-medium">{adminWallet.transactions.length}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Commissione media</span>
                    <span className="font-medium">{formatCurrency(stats.totalRevenue / adminWallet.transactions.length || 0)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Other tabs content */}
        {activeTab === 'users' && (
          <div className="bg-white p-8 rounded-xl shadow-sm text-center">
            <Users className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Gestione Utenti</h3>
            <p className="text-gray-600">Funzionalità in sviluppo</p>
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="bg-white p-8 rounded-xl shadow-sm text-center">
            <Settings className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Impostazioni</h3>
            <p className="text-gray-600">Funzionalità in sviluppo</p>
          </div>
        )}
      </div>
    </div>
  );
}