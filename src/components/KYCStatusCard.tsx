import React from 'react';
import { 
  CheckCircle, 
  Clock, 
  XCircle, 
  AlertTriangle, 
  FileText, 
  Calendar,
  User,
  Shield
} from 'lucide-react';
import { Professional } from '../types';

interface KYCStatusCardProps {
  professional: Professional;
  onStartKYC: () => void;
  onViewKYC: () => void;
}

export default function KYCStatusCard({ professional, onStartKYC, onViewKYC }: KYCStatusCardProps) {
  const getStatusInfo = (status: string) => {
    switch (status) {
      case 'pending':
        return {
          icon: Clock,
          color: 'text-yellow-600 bg-yellow-100',
          title: 'Verifica in Attesa',
          description: 'Completa la verifica della tua identità per accedere a tutte le funzionalità',
          action: 'Inizia Verifica',
          actionColor: 'bg-yellow-600 hover:bg-yellow-700'
        };
      case 'in_review':
        return {
          icon: FileText,
          color: 'text-blue-600 bg-blue-100',
          title: 'Documenti in Revisione',
          description: 'I tuoi documenti sono in fase di verifica. Riceverai una risposta entro 2-3 giorni lavorativi',
          action: 'Visualizza Stato',
          actionColor: 'bg-blue-600 hover:bg-blue-700'
        };
      case 'approved':
        return {
          icon: CheckCircle,
          color: 'text-green-600 bg-green-100',
          title: 'Identità Verificata',
          description: 'La tua identità è stata verificata con successo. Hai accesso completo alla piattaforma',
          action: 'Visualizza Certificato',
          actionColor: 'bg-green-600 hover:bg-green-700'
        };
      case 'rejected':
        return {
          icon: XCircle,
          color: 'text-red-600 bg-red-100',
          title: 'Verifica Respinta',
          description: 'I documenti forniti non sono stati accettati. Riprova con documenti aggiornati',
          action: 'Riprova Verifica',
          actionColor: 'bg-red-600 hover:bg-red-700'
        };
      case 'expired':
        return {
          icon: AlertTriangle,
          color: 'text-orange-600 bg-orange-100',
          title: 'Verifica Scaduta',
          description: 'La tua verifica è scaduta. Rinnova i documenti per continuare ad utilizzare la piattaforma',
          action: 'Rinnova Verifica',
          actionColor: 'bg-orange-600 hover:bg-orange-700'
        };
      default:
        return {
          icon: User,
          color: 'text-gray-600 bg-gray-100',
          title: 'Verifica Non Iniziata',
          description: 'Inizia il processo di verifica per accedere a tutte le funzionalità',
          action: 'Inizia Verifica',
          actionColor: 'bg-gray-600 hover:bg-gray-700'
        };
    }
  };

  const statusInfo = getStatusInfo(professional.kycStatus);
  const IconComponent = statusInfo.icon;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-start justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className={`p-3 rounded-full ${statusInfo.color}`}>
            <IconComponent className="h-6 w-6" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">{statusInfo.title}</h3>
            <p className="text-sm text-gray-600 mt-1">{statusInfo.description}</p>
          </div>
        </div>
        
        {professional.kycStatus === 'approved' && (
          <div className="flex items-center space-x-2 text-green-600">
            <Shield className="h-5 w-5" />
            <span className="text-sm font-medium">Verificato</span>
          </div>
        )}
      </div>

      {/* KYC Details */}
      {professional.kycData && (
        <div className="bg-gray-50 rounded-lg p-4 mb-6">
          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-gray-600">Nome:</p>
              <p className="font-medium">
                {professional.kycData.personalInfo.firstName} {professional.kycData.personalInfo.lastName}
              </p>
            </div>
            <div>
              <p className="text-gray-600">Codice Fiscale:</p>
              <p className="font-medium">{professional.kycData.personalInfo.fiscalCode}</p>
            </div>
            {professional.kycSubmittedAt && (
              <div>
                <p className="text-gray-600">Data Invio:</p>
                <p className="font-medium">
                  {new Date(professional.kycSubmittedAt).toLocaleDateString('it-IT')}
                </p>
              </div>
            )}
            {professional.kycApprovedAt && (
              <div>
                <p className="text-gray-600">Data Approvazione:</p>
                <p className="font-medium">
                  {new Date(professional.kycApprovedAt).toLocaleDateString('it-IT')}
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Expiration Warning */}
      {professional.kycStatus === 'approved' && professional.kycExpiresAt && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
          <div className="flex items-center space-x-2">
            <Calendar className="h-4 w-4 text-yellow-600" />
            <p className="text-yellow-800 text-sm">
              <strong>Scadenza verifica:</strong> {new Date(professional.kycExpiresAt).toLocaleDateString('it-IT')}
            </p>
          </div>
        </div>
      )}

      {/* Action Button */}
      <div className="flex justify-end">
        <button
          onClick={professional.kycStatus === 'pending' ? onStartKYC : onViewKYC}
          className={`px-6 py-2 text-white rounded-lg font-medium transition-colors ${statusInfo.actionColor}`}
        >
          {statusInfo.action}
        </button>
      </div>

      {/* Benefits */}
      {professional.kycStatus !== 'approved' && (
        <div className="mt-6 pt-6 border-t border-gray-200">
          <h4 className="font-medium text-gray-900 mb-3">Vantaggi della Verifica:</h4>
          <ul className="space-y-2 text-sm text-gray-600">
            <li className="flex items-center space-x-2">
              <CheckCircle className="h-4 w-4 text-green-500" />
              <span>Badge "Verificato" sul tuo profilo</span>
            </li>
            <li className="flex items-center space-x-2">
              <CheckCircle className="h-4 w-4 text-green-500" />
              <span>Maggiore fiducia dai clienti</span>
            </li>
            <li className="flex items-center space-x-2">
              <CheckCircle className="h-4 w-4 text-green-500" />
              <span>Accesso prioritario alle richieste</span>
            </li>
            <li className="flex items-center space-x-2">
              <CheckCircle className="h-4 w-4 text-green-500" />
              <span>Limiti di pagamento più alti</span>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}