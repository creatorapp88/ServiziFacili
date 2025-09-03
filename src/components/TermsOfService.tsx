import React from 'react';
import { ArrowLeft, FileText, AlertTriangle, CreditCard, Shield } from 'lucide-react';

interface TermsOfServiceProps {
  onBack: () => void;
}

export default function TermsOfService({ onBack }: TermsOfServiceProps) {
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
            <FileText className="h-8 w-8 text-blue-600" />
            <h1 className="text-3xl font-bold text-gray-900">Termini di Servizio</h1>
          </div>

          <div className="prose max-w-none">
            <p className="text-gray-600 mb-6">
              Ultimo aggiornamento: {new Date().toLocaleDateString('it-IT')}
            </p>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">1. Accettazione dei Termini</h2>
              <p className="text-gray-700">
                Utilizzando ServiziFacili, accetti questi termini di servizio. Se non accetti questi termini, 
                non utilizzare la piattaforma.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <CreditCard className="h-5 w-5 mr-2" />
                2. Pagamenti e Commissioni
              </h2>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>I professionisti pagano per visualizzare i contatti dei clienti</li>
                <li>Le tariffe variano in base alla distanza (€2,50 - €18,00)</li>
                <li>I pagamenti sono elaborati tramite provider sicuri</li>
                <li>Non sono previsti rimborsi per richieste già acquistate</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">3. Responsabilità degli Utenti</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium text-gray-900 mb-2">Clienti:</h3>
                  <ul className="list-disc pl-6 text-gray-700 space-y-1">
                    <li>Fornire informazioni accurate e complete</li>
                    <li>Rispondere ai professionisti in modo tempestivo</li>
                    <li>Pagare i servizi concordati</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-medium text-gray-900 mb-2">Professionisti:</h3>
                  <ul className="list-disc pl-6 text-gray-700 space-y-1">
                    <li>Possedere le qualifiche necessarie</li>
                    <li>Fornire servizi di qualità</li>
                    <li>Rispettare gli accordi presi con i clienti</li>
                  </ul>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <AlertTriangle className="h-5 w-5 mr-2" />
                4. Limitazioni di Responsabilità
              </h2>
              <p className="text-gray-700 mb-4">
                ServiziFacili è una piattaforma di intermediazione. Non siamo responsabili per:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>La qualità dei servizi forniti dai professionisti</li>
                <li>Danni derivanti dall'utilizzo dei servizi</li>
                <li>Controversie tra clienti e professionisti</li>
                <li>Perdite economiche dirette o indirette</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">5. Risoluzione delle Controversie</h2>
              <p className="text-gray-700">
                In caso di controversie, incoraggiamo la risoluzione amichevole. Per questioni non risolte, 
                è competente il foro di Milano.
              </p>
            </section>

            <div className="bg-yellow-50 rounded-lg p-6 mt-8">
              <div className="flex items-start space-x-3">
                <AlertTriangle className="h-6 w-6 text-yellow-600 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-yellow-900 mb-2">Importante</h3>
                  <p className="text-yellow-800">
                    Questi termini possono essere modificati in qualsiasi momento. 
                    Gli utenti saranno notificati delle modifiche significative.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}