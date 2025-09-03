import React, { useState } from 'react';
import { 
  User, 
  LogOut, 
  Plus, 
  FileText, 
  Clock, 
  CheckCircle, 
  Star,
  MapPin,
  Phone,
  Mail,
  Calendar,
  Euro,
  X
} from 'lucide-react';

interface UserData {
  name: string;
  email: string;
  phone: string;
  city: string;
}

interface UserRequest {
  id: string;
  service: string;
  description: string;
  budget: string;
  status: 'pending' | 'active' | 'completed';
  createdAt: string;
  quotesReceived: number;
}

interface UserDashboardProps {
  user: UserData;
  onLogout: () => void;
}

export default function UserDashboard({ user, onLogout }: UserDashboardProps) {
  const [activeTab, setActiveTab] = useState('requests');
  const [showNewRequestModal, setShowNewRequestModal] = useState(false);
  const [newRequest, setNewRequest] = useState({
    service: '',
    description: '',
    budget: ''
  });

  // Mock user requests
  const [userRequests, setUserRequests] = useState<UserRequest[]>([
    {
      id: 'req-user-1',
      service: 'Riparazione Caldaia Baxi Luna Duo-tec',
      description: 'Caldaia Baxi modello Luna Duo-tec MP 1.35 che non si accende più da 2 giorni. Display spento, nessun errore visibile. Appartamento 90mq, riscaldamento autonomo. Necessario intervento tecnico specializzato entro 24 ore per ripristinare il riscaldamento.',
      budget: '€150-250',
      status: 'active',
      createdAt: '2024-01-15T10:30:00Z',
      quotesReceived: 5
    },
    {
      id: 'req-user-2',
      service: 'Imbiancatura Appartamento 75mq',
      description: 'Imbiancatura completa appartamento 75mq: 3 camere da letto, soggiorno con cucina a vista, bagno e corridoio. Pareti già preparate e stuccate. Preferenza per pittura lavabile bianca o colori neutri. Disponibilità flessibile, no urgenza.',
      budget: '€600-900',
      status: 'completed',
      createdAt: '2024-01-10T14:20:00Z',
      quotesReceived: 7
    },
    {
      id: 'req-user-3',
      service: 'Montaggio Cucina IKEA KNOXHULT',
      description: 'Montaggio cucina IKEA modello KNOXHULT completa: 8 pensili, 6 basi, piano lavoro in laminato, lavello inox, elettrodomestici da incasso (forno, piano cottura a induzione, cappa aspirante). Cucina già consegnata, istruzioni e accessori disponibili.',
      budget: '€300-450',
      status: 'pending',
      createdAt: '2024-01-08T09:15:00Z',
      quotesReceived: 2
    },
    {
      id: 'req-user-4',
      service: 'Lezioni Private di Inglese',
      description: 'Cerco insegnante madrelingua inglese per lezioni private. Livello intermedio (B1), obiettivo raggiungere B2 per certificazione. Preferenza per lezioni a domicilio, 2 volte a settimana, durata 1.5 ore. Disponibilità sera dopo le 18:00.',
      budget: '€25-35/ora',
      status: 'active',
      createdAt: '2024-01-05T16:30:00Z',
      quotesReceived: 4
    },
    {
      id: 'req-user-5',
      service: 'Servizio Pulizie Settimanali',
      description: 'Cerco persona affidabile per pulizie domestiche settimanali. Appartamento 80mq: 2 camere, soggiorno, cucina, 2 bagni. Servizio completo: aspirapolvere, lavaggio pavimenti, bagni, cucina, spolverare. Ogni martedì mattina dalle 9:00 alle 12:00.',
      budget: '€15-20/ora',
      status: 'completed',
      createdAt: '2024-01-02T11:00:00Z',
      quotesReceived: 6
    }
  ]);

  const handleNewRequestSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const request: UserRequest = {
      id: `req-user-${Date.now()}`,
      service: newRequest.service,
      description: newRequest.description,
      status: 'active', // Mostra come attiva al cliente (auto-approvata)
      status: 'pending',
      createdAt: new Date().toISOString(),
      quotesReceived: 0
    };

    setUserRequests(prev => [request, ...prev]);
    setNewRequest({ service: '', description: '', budget: '' });
    setShowNewRequestModal(false);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'active': return 'bg-blue-100 text-blue-800';
      case 'completed': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return <Clock className="h-4 w-4" />;
      case 'active': return <FileText className="h-4 w-4" />;
      case 'completed': return <CheckCircle className="h-4 w-4" />;
      default: return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                ServiziFacili
              </h1>
              <span className="text-gray-400">•</span>
              <span className="text-gray-600">Dashboard Cliente</span>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm text-gray-600">Benvenuto,</p>
                <p className="font-semibold text-gray-900">{user.name}</p>
              </div>
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
              { id: 'requests', name: 'Le mie Richieste', icon: FileText },
              { id: 'profile', name: 'Profilo', icon: User }
            ].map(tab => {
              const IconComponent = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-lg font-medium transition-colors ${
                    activeTab === tab.id
                      ? 'bg-purple-100 text-purple-700'
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

        {/* Requests Tab */}
        {activeTab === 'requests' && (
          <div className="space-y-6">
            {/* New Request Button */}
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold text-gray-900">Le tue richieste</h2>
              <button
                onClick={() => setShowNewRequestModal(true)}
                className="flex items-center space-x-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2 rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-200"
              >
                <Plus className="h-4 w-4" />
                <span>Nuova Richiesta</span>
              </button>
            </div>

            {/* Requests List */}
            <div className="grid gap-6">
              {userRequests.map(request => (
                <div key={request.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex-1">
                      <h4 className="text-lg font-semibold text-gray-900 mb-2">{request.service}</h4>
                      <p className="text-gray-600 mb-3">{request.description}</p>
                      
                      <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                        <div className="flex items-center space-x-1">
                          <Euro className="h-4 w-4" />
                          <span>Budget: {request.budget}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Calendar className="h-4 w-4" />
                          <span>{new Date(request.createdAt).toLocaleDateString('it-IT')}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Star className="h-4 w-4" />
                          <span>{request.quotesReceived} preventivi ricevuti</span>
                        </div>
                      </div>
                    </div>

                    <div className="ml-6 text-right">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium flex items-center space-x-1 w-fit ml-auto mb-2 ${getStatusColor(request.status)}`}>
                        {getStatusIcon(request.status)}
                        <span className="capitalize">{request.status}</span>
                      </span>
                      
                      {request.status === 'active' && (
                        <button className="text-purple-600 hover:text-purple-700 text-sm font-medium">
                          Visualizza Preventivi
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {userRequests.length === 0 && (
              <div className="bg-white rounded-xl shadow-sm p-12 text-center">
                <FileText className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Nessuna richiesta</h3>
                <p className="text-gray-600 mb-4">Non hai ancora creato nessuna richiesta di servizio.</p>
                <button
                  onClick={() => setShowNewRequestModal(true)}
                  className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-2 rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-200"
                >
                  Crea la tua prima richiesta
                </button>
              </div>
            )}
          </div>
        )}

        {/* Profile Tab */}
        {activeTab === 'profile' && (
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Il tuo Profilo</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <label className="text-sm text-gray-600">Nome</label>
                  <p className="font-medium text-gray-900">{user.name}</p>
                </div>
                <div>
                  <label className="text-sm text-gray-600">Email</label>
                  <p className="font-medium text-gray-900">{user.email}</p>
                </div>
                <div>
                  <label className="text-sm text-gray-600">Telefono</label>
                  <p className="font-medium text-gray-900">{user.phone}</p>
                </div>
                <div>
                  <label className="text-sm text-gray-600">Città</label>
                  <p className="font-medium text-gray-900">{user.city}</p>
                </div>
              </div>
              
              <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg p-6">
                <h4 className="font-medium text-gray-900 mb-4">Statistiche Account</h4>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Richieste totali</span>
                    <span className="font-medium">{userRequests.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Preventivi ricevuti</span>
                    <span className="font-medium">{userRequests.reduce((sum, req) => sum + req.quotesReceived, 0)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Lavori completati</span>
                    <span className="font-medium">{userRequests.filter(req => req.status === 'completed').length}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* New Request Modal */}
      {showNewRequestModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-md w-full p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Nuova Richiesta</h3>
              <button
                onClick={() => setShowNewRequestModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <form onSubmit={handleNewRequestSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Servizio richiesto</label>
                <input
                  type="text"
                  value={newRequest.service}
                  onChange={(e) => setNewRequest({ ...newRequest, service: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
                  placeholder="es. Riparazione Caldaia"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Descrizione</label>
                <textarea
                  value={newRequest.description}
                  onChange={(e) => setNewRequest({ ...newRequest, description: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
                  rows={4}
                  placeholder="Descrivi dettagliatamente il lavoro che ti serve..."
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Budget indicativo</label>
                <select
                  value={newRequest.budget}
                  onChange={(e) => setNewRequest({ ...newRequest, budget: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
                  required
                >
                  <option value="">Seleziona un budget</option>
                  <option value="€50-100">€50-100</option>
                  <option value="€100-200">€100-200</option>
                  <option value="€200-500">€200-500</option>
                  <option value="€500-1000">€500-1000</option>
                  <option value="€1000-2000">€1000-2000</option>
                  <option value="€2000+">€2000+</option>
                </select>
              </div>

              <div className="flex space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowNewRequestModal(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Annulla
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white py-2 rounded-lg font-medium hover:from-purple-700 hover:to-pink-700 transition-all duration-200"
                >
                  Pubblica Richiesta
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}