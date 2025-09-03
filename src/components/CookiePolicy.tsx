import React from 'react';
import { ArrowLeft, Cookie, Shield, Eye, Settings } from 'lucide-react';

interface CookiePolicyProps {
  onBack: () => void;
}

export default function CookiePolicy({ onBack }: CookiePolicyProps) {
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
            <Cookie className="h-8 w-8 text-blue-600" />
            <h1 className="text-3xl font-bold text-gray-900">Cookie Policy</h1>
          </div>

          <div className="prose max-w-none">
            <p className="text-gray-600 mb-6">
              Ultimo aggiornamento: {new Date().toLocaleDateString('it-IT')}
            </p>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Cosa sono i Cookie</h2>
              <p className="text-gray-700 mb-4">
                I cookie sono piccoli file di testo che vengono memorizzati sul tuo dispositivo quando visiti un sito web. 
                Ci aiutano a fornire una migliore esperienza utente e a migliorare i nostri servizi.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <Shield className="h-5 w-5 mr-2" />
                Cookie Tecnici (Necessari)
              </h2>
              <p className="text-gray-700 mb-4">
                Questi cookie sono essenziali per il funzionamento del sito:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>Cookie di sessione per mantenere il login</li>
                <li>Cookie di sicurezza per prevenire attacchi</li>
                <li>Cookie per il carrello e le preferenze</li>
                <li>Cookie per il bilanciamento del carico</li>
              </ul>
              <div className="bg-blue-50 p-4 rounded-lg mt-4">
                <p className="text-blue-800 text-sm">
                  <strong>Base legale:</strong> Interesse legittimo (art. 6, par. 1, lett. f GDPR)
                </p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <Eye className="h-5 w-5 mr-2" />
                Cookie Analitici
              </h2>
              <p className="text-gray-700 mb-4">
                Utilizziamo cookie analitici per comprendere come gli utenti interagiscono con il sito:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li><strong>Google Analytics:</strong> Analisi del traffico e comportamento utenti</li>
                <li><strong>Hotjar:</strong> Registrazione sessioni e heatmap</li>
                <li><strong>Cookie interni:</strong> Statistiche personalizzate</li>
              </ul>
              <div className="bg-green-50 p-4 rounded-lg mt-4">
                <p className="text-green-800 text-sm">
                  <strong>Base legale:</strong> Consenso (art. 6, par. 1, lett. a GDPR)
                </p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Cookie di Marketing</h2>
              <p className="text-gray-700 mb-4">
                Cookie utilizzati per mostrare pubblicità personalizzata:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li><strong>Google Ads:</strong> Remarketing e conversioni</li>
                <li><strong>Facebook Pixel:</strong> Pubblicità su social media</li>
                <li><strong>LinkedIn Insight:</strong> Targeting professionale</li>
              </ul>
              <div className="bg-orange-50 p-4 rounded-lg mt-4">
                <p className="text-orange-800 text-sm">
                  <strong>Base legale:</strong> Consenso (art. 6, par. 1, lett. a GDPR)
                </p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <Settings className="h-5 w-5 mr-2" />
                Gestione delle Preferenze
              </h2>
              <p className="text-gray-700 mb-4">
                Puoi gestire le tue preferenze sui cookie in qualsiasi momento:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>Tramite il banner cookie presente sul sito</li>
                <li>Nelle impostazioni del tuo browser</li>
                <li>Contattando il nostro supporto</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Durata dei Cookie</h2>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse border border-gray-300">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="border border-gray-300 px-4 py-2 text-left">Tipo Cookie</th>
                      <th className="border border-gray-300 px-4 py-2 text-left">Durata</th>
                      <th className="border border-gray-300 px-4 py-2 text-left">Scopo</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-gray-300 px-4 py-2">Sessione</td>
                      <td className="border border-gray-300 px-4 py-2">Fino alla chiusura browser</td>
                      <td className="border border-gray-300 px-4 py-2">Login e navigazione</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-4 py-2">Persistenti</td>
                      <td className="border border-gray-300 px-4 py-2">1-24 mesi</td>
                      <td className="border border-gray-300 px-4 py-2">Preferenze e analytics</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-4 py-2">Marketing</td>
                      <td className="border border-gray-300 px-4 py-2">30-90 giorni</td>
                      <td className="border border-gray-300 px-4 py-2">Pubblicità personalizzata</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            <div className="bg-blue-50 rounded-lg p-6 mt-8">
              <h3 className="font-semibold text-blue-900 mb-2">Contatti per Cookie Policy</h3>
              <p className="text-blue-800">
               Per domande sui cookie: <a href="mailto:privacy@servizifacili.it" className="underline">privacy@servizifacili.it</a><br />
               Data Protection Officer: <a href="mailto:dpo@servizifacili.it" className="underline">dpo@servizifacili.it</a><br />
               Telefono: <a href="tel:+393896335889" className="underline">+39 389 633 5889</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}