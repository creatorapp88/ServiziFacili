import React, { useState, useEffect } from 'react';
import { 
  MapPin, 
  Euro, 
  Eye, 
  CheckCircle, 
  XCircle, 
  Clock,
  AlertCircle,
  CreditCard,
  Star,
  User,
  LogOut
} from 'lucide-react';
import { ServiceRequest, Professional, Transaction } from '../types';
import { calculateDistance, calculateRequestCost, formatCurrency } from '../utils/pricing';
import WalletCard from './WalletCard';
import KYCStatusCard from './KYCStatusCard';
import KYCForm from './KYCForm';

interface ProfessionalDashboardProps {
  professional: Professional;
  onLogout: () => void;
}

export default function ProfessionalDashboard({ professional, onLogout }: ProfessionalDashboardProps) {
  const [activeTab, setActiveTab] = useState('requests');
  const [availableRequests, setAvailableRequests] = useState<ServiceRequest[]>([]);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState<ServiceRequest | null>(null);
  const [paymentDetails, setPaymentDetails] = useState<{ cost: number; distance: number } | null>(null);
  const [showKYCForm, setShowKYCForm] = useState(false);

  const handleWalletUpdate = (newBalance: number, transaction: Transaction) => {
    // Aggiorna il wallet del professionista
    professional.wallet.balance = newBalance;
    professional.wallet.transactions.push(transaction);
  };

  // Mock data per richieste disponibili
  useEffect(() => {
    const mockRequests: ServiceRequest[] = [
      {
        id: 'req-1',
        clientId: 'client-1',
        clientName: 'Alessandro Conti',
        clientEmail: 'alessandro.conti@gmail.com',
        clientPhone: '+39 347 892 1456',
        service: 'Riparazione Caldaia Baxi',
        description: 'Caldaia Baxi modello Luna Duo-tec MP 1.35 che non si accende più da 2 giorni. Display spento, nessun errore visibile. Appartamento 90mq, necessario intervento tecnico specializzato entro 24 ore.',
        location: {
          city: 'Milano',
          province: 'MI',
          address: 'Via Brera 45, 20121 Milano'
        },
        status: 'approved',
        autoApproved: true,
        approvedAt: '2024-01-15T10:31:00Z',
        status: 'open',
        createdAt: '2024-01-15T10:30:00Z',
        cost: 8.50,
        distance: 12,
        quotesReceived: 2,
        maxQuotes: 4,
        isExpired: false,
        purchasedBy: ['prof-123', 'prof-456'] // Altri professionisti che hanno già acquistato
      },
      {
        id: 'req-2',
        clientId: 'client-2',
        clientName: 'Francesca Martini',
        clientEmail: 'francesca.martini@outlook.it',
        clientPhone: '+39 335 674 8923',
        service: 'Imbiancatura Appartamento',
        description: 'Imbiancatura completa appartamento 75mq: 3 camere da letto, soggiorno, cucina, bagno e corridoio. Pareti già preparate e stuccate. Preferenza per pittura lavabile bianca. Disponibilità immediata.',
        location: {
          city: 'Roma',
          province: 'RM',
          address: 'Via del Corso 234, 00186 Roma'
        },
        status: 'approved',
        autoApproved: true,
        approvedAt: '2024-01-14T15:46:00Z',
        status: 'open',
        createdAt: '2024-01-14T15:45:00Z',
        cost: 18.00,
        distance: 65,
        quotesReceived: 1,
        maxQuotes: 4,
        isExpired: false,
        purchasedBy: ['prof-789']
      },
      {
        id: 'req-3',
        clientId: 'client-3',
        clientName: 'Roberto Ferrari',
        clientEmail: 'roberto.ferrari@libero.it',
        clientPhone: '+39 328 456 7891',
        service: 'Riparazione Lavatrice Samsung',
        description: 'Lavatrice Samsung WW80J5555FA da 8kg che perde acqua dal fondo durante il ciclo di lavaggio. Acquistata 3 anni fa, fuori garanzia. Perdita visibile sotto l\'elettrodomestico.',
        location: {
          city: 'Milano',
          province: 'MI',
          address: 'Corso Buenos Aires 156, 20124 Milano'
        },
        status: 'approved',
        autoApproved: true,
        approvedAt: '2024-01-13T09:16:00Z',
        status: 'open',
        createdAt: '2024-01-13T09:15:00Z',
        cost: 5.00,
        distance: 8,
        quotesReceived: 3,
        maxQuotes: 4,
        isExpired: false
      },
      {
        id: 'req-4',
        clientId: 'client-4',
        clientName: 'Giulia Romano',
        clientEmail: 'giulia.romano@yahoo.it',
        clientPhone: '+39 342 789 1234',
        service: 'Montaggio Cucina IKEA Completa',
        description: 'Montaggio cucina IKEA modello KNOXHULT completa: 8 pensili, 6 basi, piano lavoro, lavello, elettrodomestici da incasso (forno, piano cottura, cappa). Cucina già consegnata, istruzioni disponibili.',
        location: {
          city: 'Torino',
          province: 'TO',
          address: 'Via Po 89, 10124 Torino'
        },
        status: 'approved',
        autoApproved: true,
        approvedAt: '2024-01-12T14:21:00Z',
        status: 'open',
        createdAt: '2024-01-12T14:20:00Z',
        cost: 12.00,
        distance: 45,
        quotesReceived: 4,
        maxQuotes: 4,
        isExpired: true
      },
      {
        id: 'req-5',
        clientId: 'client-5',
        clientName: 'Marco Bianchi',
        clientEmail: 'marco.bianchi@gmail.com',
        clientPhone: '+39 339 567 8912',
        service: 'Riparazione Perdita Idraulica Urgente',
        description: 'Perdita d\'acqua dal soffitto del bagno al primo piano, probabilmente dai tubi del piano superiore. Situazione urgente, rischio danni. Condominio anni \'80, impianto misto rame/multistrato.',
        location: {
          city: 'Milano',
          province: 'MI',
          address: 'Viale Monza 78, 20127 Milano'
        },
        status: 'approved',
        autoApproved: true,
        approvedAt: '2024-01-11T08:46:00Z',
        status: 'open',
        createdAt: '2024-01-11T08:45:00Z',
        cost: 8.50,
        distance: 15,
        quotesReceived: 1,
        maxQuotes: 4,
        isExpired: false
      }
    ];
    setAvailableRequests(mockRequests);
  }, []);

  const handleViewRequest = (request: ServiceRequest) => {
    const distance = calculateDistance(professional.location.city, request.location.city);
    const { cost } = calculateRequestCost(distance);
    
    setSelectedRequest(request);
    setPaymentDetails({ cost, distance });
    setShowPaymentModal(true);
  };

  const handlePurchaseRequest = async () => {
    if (!selectedRequest || !paymentDetails) return;

    // Verifica se la richiesta è ancora disponibile
    if (selectedRequest.isExpired || selectedRequest.quotesReceived >= selectedRequest.maxQuotes) {
      alert('Questa richiesta non è più disponibile. Ha già raggiunto il limite massimo di preventivi.');
      setShowPaymentModal(false);
      setSelectedRequest(null);
      setPaymentDetails(null);
      return;
    }

    // Verifica saldo sufficiente
    if (professional.wallet.balance < paymentDetails.cost) {
      alert('Saldo insufficiente! Ricarica il tuo wallet per acquistare questa richiesta.');
      return;
    }

    // Verifica se ha già acquistato questa richiesta
    if (selectedRequest.purchasedBy?.includes(professional.id)) {
      alert('Hai già acquistato questa richiesta!');
      setShowPaymentModal(false);
      setSelectedRequest(null);
      setPaymentDetails(null);
      return;
    }
    // Simula il pagamento
    const newTransaction: Transaction = {
      id: `tx-${Date.now()}`,
      walletId: professional.wallet.id,
      type: 'debit',
      amount: paymentDetails.cost,
      description: `Acquisto richiesta: ${selectedRequest.service}`,
      relatedRequestId: selectedRequest.id,
      createdAt: new Date().toISOString(),
      status: 'completed'
    };

    // Aggiorna il wallet del professionista
    professional.wallet.balance -= paymentDetails.cost;
    professional.wallet.transactions.push(newTransaction);

    // Aggiorna il contatore dei preventivi
    const updatedRequests = availableRequests.map(req => {
      if (req.id === selectedRequest.id) {
        const newQuotesCount = req.quotesReceived + 1;
        const updatedPurchasedBy = [...(req.purchasedBy || []), professional.id];
        return {
          ...req,
          quotesReceived: newQuotesCount,
          purchasedBy: updatedPurchasedBy,
          isExpired: newQuotesCount >= req.maxQuotes
        };
      }
      return req;
    });

    // Rimuovi le richieste scadute dalla vista ma mantienile nella chat
    setAvailableRequests(updatedRequests.filter(req => !req.isExpired));
    
    setShowPaymentModal(false);
    setSelectedRequest(null);
    setPaymentDetails(null);

    const remainingSlots = selectedRequest.maxQuotes - (selectedRequest.quotesReceived + 1);
    if (remainingSlots > 0) {
      alert(`Richiesta acquistata con successo! Ora puoi contattare il cliente. Rimangono ${remainingSlots} slot per altri professionisti.`);
    } else {
      alert('Richiesta acquistata con successo! Ora puoi contattare il cliente. Questa era l\'ultima disponibilità.');
    }
  };

  const handleAddFunds = () => {
    const amount = prompt('Inserisci l\'importo da aggiungere (€):');
    if (amount && !isNaN(Number(amount))) {
      const addAmount = Number(amount);
      const newTransaction: Transaction = {
        id: `tx-${Date.now()}`,
        walletId: professional.wallet.id,
        type: 'credit',
        amount: addAmount,
        description: 'Ricarica wallet',
        createdAt: new Date().toISOString(),
        status: 'completed'
      };

      professional.wallet.balance += addAmount;
      professional.wallet.transactions.push(newTransaction);
      
      alert(`Wallet ricaricato con ${formatCurrency(addAmount)}!`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold text-blue-600">Dashboard Professionista</h1>
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Star className="h-4 w-4 text-yellow-400" />
                <span>{professional.rating.toFixed(1)}</span>
                <span>•</span>
                <span>{professional.completedJobs} lavori completati</span>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm text-gray-600">Benvenuto,</p>
                <p className="font-semibold text-gray-900">{professional.name}</p>
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
              { id: 'requests', name: 'Richieste Disponibili', icon: Eye },
              { id: 'wallet', name: 'Wallet', icon: CreditCard },
              { id: 'kyc', name: 'Verifica Identità', icon: User },
              { id: 'profile', name: 'Profilo', icon: User }
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

        {/* Requests Tab */}
        {activeTab === 'requests' && (
          <div className="space-y-6">
            {/* KYC Warning */}
            {professional.kycStatus !== 'approved' && (
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <div className="flex items-center space-x-2">
                  <AlertCircle className="h-5 w-5 text-yellow-600" />
                  <p className="text-yellow-800">
                    <strong>Verifica la tua identità</strong> per accedere a tutte le richieste e aumentare la fiducia dei clienti.
                    <button 
                      onClick={() => setActiveTab('kyc')}
                      className="ml-2 text-yellow-900 underline hover:no-underline"
                    >
                      Inizia ora
                    </button>
                  </p>
                </div>
              </div>
            )}

            {/* Balance Alert */}
            {professional.wallet.balance < 10 && (
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <div className="flex items-center space-x-2">
                  <AlertCircle className="h-5 w-5 text-yellow-600" />
                  <p className="text-yellow-800">
                    <strong>Saldo basso:</strong> Ricarica il tuo wallet per continuare ad acquistare richieste.
                    Saldo attuale: {formatCurrency(professional.wallet.balance)}
                  </p>
                </div>
              </div>
            )}

            {/* Available Requests */}
            <div className="grid gap-6">
              {availableRequests.map(request => {
                const distance = calculateDistance(professional.location.city, request.location.city);
                const { cost, tier } = calculateRequestCost(distance);
                
                return (
                  <div key={request.id} className={`bg-white rounded-xl shadow-sm border p-6 ${
                    request.isExpired ? 'border-red-200 opacity-60' : 'border-gray-200'
                  }`}>
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                        <h4 className="text-lg font-semibold text-gray-900 mb-2">{request.service}</h4>
                          {request.isExpired && (
                            <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full">
                              SCADUTA
                            </span>
                          )}
                        </div>
                        <p className="text-gray-600 mb-3">{request.description}</p>
                        
                        <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                          <div className="flex items-center space-x-1">
                            <User className="h-4 w-4" />
                            <span>{request.clientName}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <MapPin className="h-4 w-4" />
                            <span>{request.location.city}, {request.location.province}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Clock className="h-4 w-4" />
                            <span>{new Date(request.createdAt).toLocaleDateString('it-IT')}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <span className="text-blue-600">📊</span>
                            <span>Preventivi: {request.quotesReceived}/{request.maxQuotes}</span>
                          </div>
                          {request.purchasedBy?.includes(professional.id) && (
                            <div className="flex items-center space-x-1">
                              <span className="text-green-600">✅</span>
                              <span className="text-green-600 font-medium">Acquistata da te</span>
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="ml-6 text-right">
                        <div className="bg-blue-50 rounded-lg p-4 mb-4">
                          <p className="text-sm text-gray-600 mb-1">Costo per visualizzare</p>
                          <p className="text-2xl font-bold text-blue-600">{formatCurrency(cost)}</p>
                          <p className="text-xs text-gray-500">{tier.name} • {distance}km</p>
                          <p className="text-xs text-orange-600 mt-1">
                            {request.maxQuotes - request.quotesReceived} slot rimasti
                          </p>
                        </div>
                        
                        <button
                          onClick={() => handleViewRequest(request)}
                          disabled={professional.wallet.balance < cost || request.isExpired || request.purchasedBy?.includes(professional.id)}
                          className={`w-full px-4 py-2 rounded-lg font-medium transition-colors ${
                            request.isExpired
                              ? 'bg-red-300 text-red-700 cursor-not-allowed'
                              : request.purchasedBy?.includes(professional.id)
                              ? 'bg-green-300 text-green-700 cursor-not-allowed'
                              : professional.wallet.balance >= cost
                              ? 'bg-blue-600 text-white hover:bg-blue-700'
                              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                          }`}
                        >
                          {request.isExpired 
                            ? 'Non Disponibile' 
                            : request.purchasedBy?.includes(professional.id)
                            ? 'Già Acquistata'
                            : professional.wallet.balance >= cost 
                              ? 'Acquista Richiesta' 
                              : 'Saldo Insufficiente'
                          }
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {availableRequests.length === 0 && (
              <div className="bg-white rounded-xl shadow-sm p-12 text-center">
                <Eye className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Nessuna richiesta disponibile</h3>
                <p className="text-gray-600">Al momento non ci sono nuove richieste nella tua zona.</p>
              </div>
            )}
          </div>
        )}

        {/* KYC Tab */}
        {activeTab === 'kyc' && (
          <div className="space-y-6">
            <KYCStatusCard
              professional={professional}
              onStartKYC={() => setShowKYCForm(true)}
              onViewKYC={() => setShowKYCForm(true)}
            />
          </div>
        )}

        {/* Wallet Tab */}
        {activeTab === 'wallet' && (
          <div className="space-y-6">
            <WalletCard 
              wallet={professional.wallet} 
              onWalletUpdate={handleWalletUpdate}
            />
            
            {/* Pricing Info */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Tariffe per Distanza</h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[
                  { maxDistance: 5, price: 2.50, name: 'Zona Locale' },
                  { maxDistance: 15, price: 5.00, name: 'Zona Urbana' },
                  { maxDistance: 30, price: 8.50, name: 'Zona Provinciale' },
                  { maxDistance: 50, price: 12.00, name: 'Zona Regionale' },
                  { maxDistance: Infinity, price: 18.00, name: 'Zona Nazionale' }
                ].map((tier, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4">
                    <h4 className="font-medium text-gray-900">{tier.name}</h4>
                    <p className="text-sm text-gray-600 mb-2">
                      {tier.maxDistance === Infinity ? 'Oltre 50km' : `Fino a ${tier.maxDistance}km`}
                    </p>
                    <p className="text-lg font-bold text-blue-600">{formatCurrency(tier.price)}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Profile Tab */}
        {activeTab === 'profile' && (
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Profilo Professionista</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium text-gray-900 mb-4">Informazioni Personali</h4>
                <div className="space-y-3">
                  <div>
                    <label className="text-sm text-gray-600">Nome</label>
                    <p className="font-medium">{professional.name}</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-600">Email</label>
                    <p className="font-medium">{professional.email}</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-600">Telefono</label>
                    <p className="font-medium">{professional.phone}</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-600">Località</label>
                    <p className="font-medium">{professional.location.city}, {professional.location.province}</p>
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="font-medium text-gray-900 mb-4">Servizi Offerti</h4>
                <div className="flex flex-wrap gap-2">
                  {professional.services.map((service, index) => (
                    <span key={index} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                      {service}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* KYC Form Modal */}
      <KYCForm
        isOpen={showKYCForm}
        onClose={() => setShowKYCForm(false)}
        onSubmit={(kycData) => {
          // Update professional KYC data
          professional.kycData = kycData;
          professional.kycStatus = 'in_review';
          professional.kycSubmittedAt = new Date().toISOString();
          alert('Documenti inviati per la verifica! Riceverai una risposta entro 2-3 giorni lavorativi.');
        }}
        currentKYC={professional.kycData}
      />

      {/* Payment Modal */}
      {showPaymentModal && selectedRequest && paymentDetails && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-md w-full p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Conferma Acquisto</h3>
            
            <div className="space-y-4 mb-6">
              <div>
                <h4 className="font-medium text-gray-900">{selectedRequest.service}</h4>
                <p className="text-sm text-gray-600">{selectedRequest.clientName}</p>
                <p className="text-sm text-gray-600">{selectedRequest.location.city}, {selectedRequest.location.province}</p>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-gray-600">Distanza:</span>
                  <span className="font-medium">{paymentDetails.distance}km</span>
                </div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-gray-600">Costo:</span>
                  <span className="font-bold text-blue-600">{formatCurrency(paymentDetails.cost)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Saldo attuale:</span>
                  <span className="font-medium">{formatCurrency(professional.wallet.balance)}</span>
                </div>
              </div>

              {professional.wallet.balance < paymentDetails.cost && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                  <p className="text-red-700 text-sm">
                    Saldo insufficiente! Ricarica il wallet per procedere.
                  </p>
                </div>
              )}
            </div>

            <div className="flex space-x-3">
              <button
                onClick={() => setShowPaymentModal(false)}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Annulla
              </button>
              <button
                onClick={handlePurchaseRequest}
                disabled={professional.wallet.balance < paymentDetails.cost}
                className={`flex-1 px-4 py-2 rounded-lg font-medium transition-colors ${
                  professional.wallet.balance >= paymentDetails.cost
                    ? 'bg-blue-600 text-white hover:bg-blue-700'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                Conferma Acquisto
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}