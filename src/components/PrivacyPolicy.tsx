import React from 'react';
import { ArrowLeft, Shield, Eye, Lock, Users, FileText } from 'lucide-react';

interface PrivacyPolicyProps {
  onBack: () => void;
}

export default function PrivacyPolicy({ onBack }: PrivacyPolicyProps) {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <button
          onClick={onBack}
          className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 mb-8"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Torna al sito</span>
        </button>

        <div className="bg-white rounded-xl shadow-sm p-8">
          <div className="flex items-center space-x-3 mb-8">
            <Shield className="h-8 w-8 text-blue-600" />
            <h1 className="text-3xl font-bold text-gray-900">Privacy Policy</h1>
          </div>

          <div className="prose max-w-none">
            <p className="text-gray-600 mb-6">
              Ultimo aggiornamento: {new Date().toLocaleDateString('it-IT')}
            </p>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <Eye className="h-5 w-5 mr-2" />
                Raccolta dei Dati
              </h2>
              <p className="text-gray-700 mb-4">
                ServiziFacili raccoglie i seguenti dati personali:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>Nome, cognome, email e numero di telefono</li>
                <li>Indirizzo e località per la ricerca di professionisti</li>
                <li>Informazioni sui servizi richiesti</li>
                <li>Dati di pagamento (gestiti tramite provider sicuri)</li>
                <li>Recensioni e valutazioni</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <Lock className="h-5 w-5 mr-2" />
                Utilizzo dei Dati
              </h2>
              <p className="text-gray-700 mb-4">
                I tuoi dati vengono utilizzati per:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>Connettere clienti e professionisti</li>
                <li>Elaborare pagamenti e transazioni</li>
                <li>Migliorare i nostri servizi</li>
                <li>Inviare comunicazioni relative al servizio</li>
                <li>Garantire la sicurezza della piattaforma</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <Users className="h-5 w-5 mr-2" />
                Condivisione dei Dati
              </h2>
              <p className="text-gray-700 mb-4">
                I tuoi dati possono essere condivisi con:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>Professionisti per l'erogazione del servizio</li>
                <li>Provider di pagamento per elaborare transazioni</li>
                <li>Autorità competenti quando richiesto dalla legge</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">I Tuoi Diritti</h2>
              <p className="text-gray-700 mb-4">
                Hai il diritto di:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>Accedere ai tuoi dati personali</li>
                <li>Correggere dati inesatti</li>
                <li>Richiedere la cancellazione dei dati</li>
                <li>Limitare il trattamento</li>
                <li>Portabilità dei dati</li>
              </ul>
            </section>

            <div className="bg-blue-50 rounded-lg p-6 mt-8">
              <h3 className="font-semibold text-blue-900 mb-2">Contatti</h3>
              <p className="text-blue-800">
                Per domande sulla privacy: <a href="mailto:ionutflorerea264@yahoo.com" className="underline">ionutflorerea264@yahoo.com</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}