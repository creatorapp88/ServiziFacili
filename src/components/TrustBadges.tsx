import React from 'react';
import { Shield, Award, Users, Clock, CheckCircle, Star } from 'lucide-react';

export default function TrustBadges() {
  const badges = [
    {
      icon: Shield,
      title: 'Professionisti Verificati',
      description: 'Tutti i professionisti sono verificati con documenti e assicurazioni',
      color: 'text-green-600 bg-green-100'
    },
    {
      icon: Award,
      title: 'Qualità Garantita',
      description: 'Sistema di recensioni e valutazioni per garantire la qualità',
      color: 'text-blue-600 bg-blue-100'
    },
    {
      icon: Users,
      title: '87.500+ Professionisti',
      description: 'La più grande rete di professionisti qualificati in Italia',
      color: 'text-purple-600 bg-purple-100'
    },
    {
      icon: Clock,
      title: 'Risposta Rapida',
      description: 'Ricevi preventivi entro 24 ore, spesso in poche ore',
      color: 'text-orange-600 bg-orange-100'
    },
    {
      icon: CheckCircle,
      title: 'Servizio Gratuito',
      description: 'Completamente gratuito per i clienti, nessun costo nascosto',
      color: 'text-emerald-600 bg-emerald-100'
    },
    {
      icon: Star,
      title: '4.8/5 Stelle',
      description: 'Rating medio basato su oltre 12.000 recensioni verificate',
      color: 'text-yellow-600 bg-yellow-100'
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Perché Scegliere ServiziFacili
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            La piattaforma più affidabile d'Italia per trovare professionisti qualificati
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {badges.map((badge, index) => {
            const IconComponent = badge.icon;
            return (
              <div
                key={index}
                className="text-center p-6 rounded-xl hover:shadow-lg transition-all duration-300 group"
              >
                <div className={`inline-flex p-4 rounded-full ${badge.color} mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <IconComponent className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {badge.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {badge.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Trust Indicators */}
        <div className="mt-16 pt-12 border-t border-gray-200">
          <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-700">🏆</div>
              <div className="text-sm text-gray-600 mt-1">Miglior Piattaforma 2024</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-700">🔒</div>
              <div className="text-sm text-gray-600 mt-1">SSL Certificato</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-700">✅</div>
              <div className="text-sm text-gray-600 mt-1">GDPR Compliant</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-700">💳</div>
              <div className="text-sm text-gray-600 mt-1">Pagamenti Sicuri</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-700">📞</div>
              <div className="text-sm text-gray-600 mt-1">Supporto 24/7</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}