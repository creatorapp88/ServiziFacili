import React from 'react';
import { ArrowLeft, Search, Users, CheckCircle, Shield, Clock, Star, Euro } from 'lucide-react';

interface HowItWorksProps {
  onBack: () => void;
}

export default function HowItWorks({ onBack }: HowItWorksProps) {
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
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Come Funziona ServiziFacili</h1>
            <p className="text-xl text-gray-600">
              Trovare il professionista perfetto non è mai stato così semplice
            </p>
          </div>

          {/* Per i Clienti */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Per i Clienti</h2>
            
            <div className="grid md:grid-cols-3 gap-8 mb-12">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6">
                  1
                </div>
                <div className="mb-4">
                  <Search className="h-12 w-12 text-blue-600 mx-auto mb-3" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Descrivi il tuo progetto</h3>
                <p className="text-gray-600">
                  Compila il form con i dettagli del servizio che ti serve. Più informazioni fornisci, 
                  più precisi saranno i preventivi che riceverai.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-green-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6">
                  2
                </div>
                <div className="mb-4">
                  <Users className="h-12 w-12 text-green-600 mx-auto mb-3" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Ricevi i preventivi</h3>
                <p className="text-gray-600">
                  Entro 24 ore riceverai fino a 5 preventivi gratuiti da professionisti qualificati 
                  della tua zona. Nessun impegno, completamente gratuito.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-orange-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6">
                  3
                </div>
                <div className="mb-4">
                  <CheckCircle className="h-12 w-12 text-orange-600 mx-auto mb-3" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Scegli e inizia</h3>
                <p className="text-gray-600">
                  Confronta profili, recensioni e prezzi. Scegli il professionista che preferisci 
                  e inizia il tuo progetto in tutta sicurezza.
                </p>
              </div>
            </div>

            <div className="bg-blue-50 rounded-lg p-6">
              <h4 className="font-semibold text-blue-900 mb-3">Vantaggi per i Clienti:</h4>
              <ul className="space-y-2 text-blue-800">
                <li className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4" />
                  <span>Preventivi completamente gratuiti</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4" />
                  <span>Professionisti verificati e recensiti</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4" />
                  <span>Risparmio di tempo nella ricerca</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4" />
                  <span>Confronto facile di prezzi e servizi</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4" />
                  <span>Supporto clienti dedicato</span>
                </li>
              </ul>
            </div>
          </section>

          {/* Per i Professionisti */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Per i Professionisti</h2>
            
            <div className="grid md:grid-cols-4 gap-6 mb-12">
              <div className="text-center">
                <div className="w-12 h-12 bg-purple-600 text-white rounded-full flex items-center justify-center text-lg font-bold mx-auto mb-4">
                  1
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Registrati</h4>
                <p className="text-sm text-gray-600">
                  Crea il tuo profilo professionale gratuito
                </p>
              </div>

              <div className="text-center">
                <div className="w-12 h-12 bg-purple-600 text-white rounded-full flex items-center justify-center text-lg font-bold mx-auto mb-4">
                  2
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Cerca Lavori</h4>
                <p className="text-sm text-gray-600">
                  Trova richieste nella tua zona di competenza
                </p>
              </div>

              <div className="text-center">
                <div className="w-12 h-12 bg-purple-600 text-white rounded-full flex items-center justify-center text-lg font-bold mx-auto mb-4">
                  3
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Acquista Contatti</h4>
                <p className="text-sm text-gray-600">
                  Paga solo per i contatti che ti interessano
                </p>
              </div>

              <div className="text-center">
                <div className="w-12 h-12 bg-purple-600 text-white rounded-full flex items-center justify-center text-lg font-bold mx-auto mb-4">
                  4
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Lavora</h4>
                <p className="text-sm text-gray-600">
                  Contatta il cliente e inizia il lavoro
                </p>
              </div>
            </div>

            <div className="bg-purple-50 rounded-lg p-6">
              <h4 className="font-semibold text-purple-900 mb-3">Vantaggi per i Professionisti:</h4>
              <div className="grid md:grid-cols-2 gap-4">
                <ul className="space-y-2 text-purple-800">
                  <li className="flex items-center space-x-2">
                    <Euro className="h-4 w-4" />
                    <span>Prezzi trasparenti per ogni contatto</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <Clock className="h-4 w-4" />
                    <span>Clienti pronti a iniziare subito</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <Shield className="h-4 w-4" />
                    <span>Pagamenti sicuri e garantiti</span>
                  </li>
                </ul>
                <ul className="space-y-2 text-purple-800">
                  <li className="flex items-center space-x-2">
                    <Star className="h-4 w-4" />
                    <span>Sistema di recensioni per crescere</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <Users className="h-4 w-4" />
                    <span>Accesso a migliaia di clienti</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4" />
                    <span>Supporto dedicato ai professionisti</span>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* Prezzi per Professionisti */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Tariffe per Professionisti</h2>
            
            <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-4">
              <div className="bg-white border border-gray-200 rounded-lg p-4 text-center">
                <h4 className="font-semibold text-gray-900 mb-2">Zona Locale</h4>
                <p className="text-sm text-gray-600 mb-3">Fino a 5km</p>
                <p className="text-2xl font-bold text-green-600">€2,50</p>
              </div>
              
              <div className="bg-white border border-gray-200 rounded-lg p-4 text-center">
                <h4 className="font-semibold text-gray-900 mb-2">Zona Urbana</h4>
                <p className="text-sm text-gray-600 mb-3">Fino a 15km</p>
                <p className="text-2xl font-bold text-blue-600">€5,00</p>
              </div>
              
              <div className="bg-white border border-gray-200 rounded-lg p-4 text-center border-orange-300 bg-orange-50">
                <div className="bg-orange-500 text-white text-xs px-2 py-1 rounded-full mb-2 inline-block">
                  PIÙ RICHIESTO
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Zona Provinciale</h4>
                <p className="text-sm text-gray-600 mb-3">Fino a 30km</p>
                <p className="text-2xl font-bold text-orange-600">€8,50</p>
              </div>
              
              <div className="bg-white border border-gray-200 rounded-lg p-4 text-center">
                <h4 className="font-semibold text-gray-900 mb-2">Zona Regionale</h4>
                <p className="text-sm text-gray-600 mb-3">Fino a 50km</p>
                <p className="text-2xl font-bold text-purple-600">€12,00</p>
              </div>
              
              <div className="bg-white border border-gray-200 rounded-lg p-4 text-center">
                <h4 className="font-semibold text-gray-900 mb-2">Zona Nazionale</h4>
                <p className="text-sm text-gray-600 mb-3">Oltre 50km</p>
                <p className="text-2xl font-bold text-red-600">€18,00</p>
              </div>
            </div>
            
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                * Prezzi per singolo contatto cliente. Nessun abbonamento o costo fisso.
              </p>
            </div>
          </section>

          {/* Garanzie */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Le Nostre Garanzie</h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <Shield className="h-16 w-16 text-green-500 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Professionisti Verificati</h3>
                <p className="text-gray-600">
                  Tutti i professionisti sono verificati con documenti, assicurazioni e referenze.
                </p>
              </div>
              
              <div className="text-center">
                <Euro className="h-16 w-16 text-blue-500 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Pagamenti Sicuri</h3>
                <p className="text-gray-600">
                  Tutti i pagamenti sono protetti con crittografia SSL e processati da Stripe.
                </p>
              </div>
              
              <div className="text-center">
                <Clock className="h-16 w-16 text-orange-500 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Supporto 24/7</h3>
                <p className="text-gray-600">
                  Il nostro team di supporto è sempre disponibile per aiutarti in caso di problemi.
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}