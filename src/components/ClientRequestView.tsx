import React, { useState } from 'react';
import { User, Phone, Mail, Star, Clock, Euro, MessageSquare, CheckCircle } from 'lucide-react';
import { Quote } from '../types';

interface ClientRequestViewProps {
  requestId: string;
  clientId: string;
  onClose: () => void;
}

export default function ClientRequestView({ requestId, clientId, onClose }: ClientRequestViewProps) {
  // Mock data - in produzione verrebbe dal database filtrato per clientId
  const [quotes] = useState<Quote[]>([
    {
      id: 'quote-1',
      professionalId: 'prof-1',
      professionalName: 'Marco Fontana',
      requestId: requestId,
      price: 180,
      description: 'Riparazione caldaia Baxi con sostituzione valvola termostatica e pulizia scambiatore. Garanzia 2 anni sui ricambi.',
      timeline: 'Intervento entro 24 ore',
      createdAt: '2024-01-15T11:30:00Z',
      status: 'pending',
      isVisible: true
    },
    {
      id: 'quote-2',
      professionalId: 'prof-2',
      professionalName: 'Giuseppe Verdi',
      requestId: requestId,
      price: 150,
      description: 'Diagnosi completa e riparazione caldaia. Esperienza 15 anni su caldaie Baxi. Disponibile oggi stesso.',
      timeline: 'Intervento in giornata',
      createdAt: '2024-01-15T12:15:00Z',
      status: 'pending',
      isVisible: true
    },
    {
      id: 'quote-3',
      professionalId: 'prof-3',
      professionalName: 'Alessandro Conti',
      requestId: requestId,
      price: 200,
      description: 'Servizio premium con controllo completo impianto, pulizia e manutenzione preventiva inclusa.',
      timeline: 'Intervento domani mattina',
      createdAt: '2024-01-15T13:00:00Z',
      status: 'pending',
      isVisible: true
    }
  ]);

  const handleAcceptQuote = (quoteId: string) => {
    alert(`Preventivo ${quoteId} accettato! Il professionista ti contatterà a breve.`);
  };

  const handleRejectQuote = (quoteId: string) => {
    alert(`Preventivo ${quoteId} rifiutato.`);
  };

  const handleContactProfessional = (professionalName: string) => {
    alert(`Contattando ${professionalName}...`);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-gray-900">I Tuoi Preventivi</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600"
            >
              ✕
            </button>
          </div>
          <p className="text-gray-600 mt-2">
            Hai ricevuto {quotes.length} preventivi per la tua richiesta
          </p>
        </div>

        <div className="p-6">
          <div className="space-y-6">
            {quotes.map(quote => (
              <div key={quote.id} className="border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                      <User className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{quote.professionalName}</h3>
                      <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <Star className="h-4 w-4 text-yellow-400 fill-current" />
                        <span>4.8 (127 recensioni)</span>
                        <span>•</span>
                        <span>Verificato</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className="text-2xl font-bold text-blue-600">€{quote.price}</div>
                    <div className="text-sm text-gray-500">{quote.timeline}</div>
                  </div>
                </div>

                <div className="mb-4">
                  <p className="text-gray-700 leading-relaxed">{quote.description}</p>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <div className="flex items-center space-x-1">
                      <Clock className="h-4 w-4" />
                      <span>{new Date(quote.createdAt).toLocaleDateString('it-IT')}</span>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <button
                      onClick={() => handleContactProfessional(quote.professionalName)}
                      className="flex items-center space-x-2 px-4 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors"
                    >
                      <MessageSquare className="h-4 w-4" />
                      <span>Contatta</span>
                    </button>
                    <button
                      onClick={() => handleAcceptQuote(quote.id)}
                      className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
                    >
                      <CheckCircle className="h-4 w-4" />
                      <span>Accetta</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {quotes.length === 0 && (
            <div className="text-center py-12">
              <MessageSquare className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Nessun preventivo ancora</h3>
              <p className="text-gray-600">I professionisti inizieranno a inviarti preventivi a breve.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}