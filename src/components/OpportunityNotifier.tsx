import React, { useEffect, useState } from 'react';
import { Bell, MapPin, Euro, Clock, User } from 'lucide-react';
import { pushNotificationService } from '../utils/pushNotifications';

interface Opportunity {
  id: string;
  title: string;
  description: string;
  location: string;
  budget: number;
  category: string;
  urgency: 'low' | 'medium' | 'high';
  clientName: string;
  postedAt: Date;
}

export const OpportunityNotifier: React.FC = () => {
  const [recentOpportunities, setRecentOpportunities] = useState<Opportunity[]>([]);
  const [isNotificationsEnabled, setIsNotificationsEnabled] = useState(false);

  useEffect(() => {
    // Verifica se le notifiche sono abilitate
    const checkNotifications = () => {
      const status = pushNotificationService.getPermissionStatus();
      setIsNotificationsEnabled(status === 'granted');
    };

    checkNotifications();

    // Simula nuove opportunità ogni 30 secondi (in produzione sarebbe WebSocket/SSE)
    const interval = setInterval(() => {
      if (Math.random() > 0.7) { // 30% di probabilità
        generateNewOpportunity();
      }
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  const generateNewOpportunity = () => {
    const opportunities = [
      {
        title: 'Riparazione Impianto Elettrico',
        description: 'Necessaria riparazione urgente di impianto elettrico in appartamento',
        location: 'Milano, MI',
        budget: 350,
        category: 'Elettricista',
        urgency: 'high' as const,
        clientName: 'Marco Rossi'
      },
      {
        title: 'Installazione Condizionatore',
        description: 'Installazione condizionatore split in soggiorno',
        location: 'Roma, RM',
        budget: 450,
        category: 'Climatizzazione',
        urgency: 'medium' as const,
        clientName: 'Laura Bianchi'
      },
      {
        title: 'Riparazione Perdita Rubinetto',
        description: 'Riparazione perdita rubinetto cucina',
        location: 'Torino, TO',
        budget: 120,
        category: 'Idraulico',
        urgency: 'high' as const,
        clientName: 'Giuseppe Verdi'
      },
      {
        title: 'Tinteggiatura Appartamento',
        description: 'Tinteggiatura completa appartamento 80mq',
        location: 'Napoli, NA',
        budget: 800,
        category: 'Imbianchino',
        urgency: 'low' as const,
        clientName: 'Anna Ferrari'
      },
      {
        title: 'Montaggio Mobili IKEA',
        description: 'Montaggio cucina completa IKEA',
        location: 'Firenze, FI',
        budget: 200,
        category: 'Montaggio',
        urgency: 'medium' as const,
        clientName: 'Paolo Conti'
      }
    ];

    const randomOpportunity = opportunities[Math.floor(Math.random() * opportunities.length)];
    const newOpportunity: Opportunity = {
      id: `opp-${Date.now()}`,
      ...randomOpportunity,
      postedAt: new Date()
    };

    // Aggiungi alla lista
    setRecentOpportunities(prev => [newOpportunity, ...prev.slice(0, 4)]);

    // Invia notifica push se abilitata
    if (isNotificationsEnabled) {
      pushNotificationService.simulatePushNotification(newOpportunity);
    }

    // Notifica browser se non supporta push
    if (!isNotificationsEnabled && 'Notification' in window) {
      if (Notification.permission === 'granted') {
        new Notification('🚀 Nuova Opportunità!', {
          body: `${newOpportunity.title} - ${newOpportunity.location}`,
          icon: '/favicon.ico'
        });
      }
    }
  };

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'high': return 'text-red-600 bg-red-50';
      case 'medium': return 'text-yellow-600 bg-yellow-50';
      case 'low': return 'text-green-600 bg-green-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getUrgencyText = (urgency: string) => {
    switch (urgency) {
      case 'high': return 'Urgente';
      case 'medium': return 'Normale';
      case 'low': return 'Non urgente';
      default: return 'Normale';
    }
  };

  const formatTimeAgo = (date: Date) => {
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    
    if (diffMins < 1) return 'Ora';
    if (diffMins < 60) return `${diffMins}m fa`;
    const diffHours = Math.floor(diffMins / 60);
    if (diffHours < 24) return `${diffHours}h fa`;
    const diffDays = Math.floor(diffHours / 24);
    return `${diffDays}g fa`;
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Bell className="w-5 h-5 text-blue-600" />
          <h3 className="font-semibold text-gray-900">Opportunità Recenti</h3>
          {recentOpportunities.length > 0 && (
            <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
              {recentOpportunities.length}
            </span>
          )}
        </div>
        
        {!isNotificationsEnabled && (
          <button
            onClick={() => pushNotificationService.initialize()}
            className="text-xs text-blue-600 hover:text-blue-700 underline"
          >
            Abilita Notifiche
          </button>
        )}
      </div>

      {/* Lista Opportunità */}
      <div className="space-y-3">
        {recentOpportunities.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <Bell className="w-8 h-8 mx-auto mb-2 text-gray-300" />
            <p>Nessuna nuova opportunità</p>
            <p className="text-sm">Le notifiche appariranno qui</p>
          </div>
        ) : (
          recentOpportunities.map((opportunity) => (
            <div
              key={opportunity.id}
              className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer"
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900 mb-1">
                    {opportunity.title}
                  </h4>
                  <p className="text-sm text-gray-600 line-clamp-2">
                    {opportunity.description}
                  </p>
                </div>
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${getUrgencyColor(opportunity.urgency)}`}>
                  {getUrgencyText(opportunity.urgency)}
                </span>
              </div>

              {/* Dettagli */}
              <div className="flex items-center justify-between text-sm text-gray-500">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-1">
                    <MapPin className="w-4 h-4" />
                    <span>{opportunity.location}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Euro className="w-4 h-4" />
                    <span>€{opportunity.budget}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <User className="w-4 h-4" />
                    <span>{opportunity.clientName}</span>
                  </div>
                </div>
                <div className="flex items-center space-x-1">
                  <Clock className="w-4 h-4" />
                  <span>{formatTimeAgo(opportunity.postedAt)}</span>
                </div>
              </div>

              {/* Azioni */}
              <div className="flex items-center justify-between mt-3 pt-3 border-t">
                <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                  {opportunity.category}
                </span>
                <div className="flex space-x-2">
                  <button className="text-xs text-gray-600 hover:text-gray-800 px-3 py-1 border rounded hover:bg-gray-50">
                    Dettagli
                  </button>
                  <button className="text-xs text-white bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded">
                    Candidati
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Test Button (solo in sviluppo) */}
      {process.env.NODE_ENV === 'development' && (
        <button
          onClick={generateNewOpportunity}
          className="w-full p-2 text-sm text-blue-600 border border-blue-200 rounded-lg hover:bg-blue-50 transition-colors"
        >
          🧪 Simula Nuova Opportunità (Dev)
        </button>
      )}
    </div>
  );
};