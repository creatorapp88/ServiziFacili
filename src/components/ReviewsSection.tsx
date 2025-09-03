import React, { useState } from 'react';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';

interface Review {
  id: string;
  name: string;
  service: string;
  rating: number;
  text: string;
  date: string;
  avatar: string;
  verified: boolean;
}

export default function ReviewsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const reviews: Review[] = [
    {
      id: '1',
      name: 'Maria Rossi',
      service: 'Riparazione Caldaia',
      rating: 5,
      text: 'Servizio eccellente! Ho ricevuto 4 preventivi in poche ore e ho trovato un tecnico bravissimo. La caldaia ora funziona perfettamente e ho risparmiato rispetto al primo preventivo che avevo ricevuto.',
      date: '2024-01-10',
      avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150',
      verified: true
    },
    {
      id: '2',
      name: 'Giuseppe Bianchi',
      service: 'Imbiancatura Casa',
      rating: 5,
      text: 'Fantastico! Cercavo un imbianchino per casa mia e tramite ServiziFacili ho trovato un professionista serio e competente. Lavoro impeccabile, prezzi onesti. Lo consiglio a tutti!',
      date: '2024-01-08',
      avatar: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=150',
      verified: true
    },
    {
      id: '3',
      name: 'Anna Verdi',
      service: 'Montaggio Mobili IKEA',
      rating: 5,
      text: 'Avevo una cucina IKEA da montare e non sapevo a chi rivolgermi. Grazie a ServiziFacili ho trovato un montatore esperto che ha fatto tutto in una giornata. Perfetto!',
      date: '2024-01-05',
      avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150',
      verified: true
    },
    {
      id: '4',
      name: 'Marco Ferrari',
      service: 'Riparazione Auto',
      rating: 5,
      text: 'La mia auto aveva un problema al motore. Ho ricevuto 3 preventivi e ho scelto il meccanico più vicino. Riparazione veloce e prezzo giusto. Servizio top!',
      date: '2024-01-03',
      avatar: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=150',
      verified: true
    },
    {
      id: '5',
      name: 'Lucia Conti',
      service: 'Pulizie Casa',
      rating: 5,
      text: 'Cercavo una persona affidabile per le pulizie settimanali. Ho trovato una signora bravissima che ora viene ogni settimana. Casa sempre perfetta!',
      date: '2024-01-01',
      avatar: 'https://images.pexels.com/photos/1516680/pexels-photo-1516680.jpeg?auto=compress&cs=tinysrgb&w=150',
      verified: true
    }
  ];

  const nextReview = () => {
    setCurrentIndex((prev) => (prev + 1) % reviews.length);
  };

  const prevReview = () => {
    setCurrentIndex((prev) => (prev - 1 + reviews.length) % reviews.length);
  };

  const currentReview = reviews[currentIndex];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Cosa Dicono i Nostri Clienti
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Oltre 12.000 clienti soddisfatti hanno trovato il professionista perfetto grazie a ServiziFacili
          </p>
        </div>

        {/* Main Review Card */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 relative">
            <Quote className="h-12 w-12 text-blue-600 opacity-20 absolute top-6 left-6" />
            
            <div className="flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-8">
              <div className="flex-shrink-0">
                <img
                  src={currentReview.avatar}
                  alt={currentReview.name}
                  className="w-20 h-20 rounded-full object-cover"
                />
                {currentReview.verified && (
                  <div className="flex items-center justify-center mt-2">
                    <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                      ✓ Verificato
                    </span>
                  </div>
                )}
              </div>
              
              <div className="flex-1 text-center md:text-left">
                <div className="flex justify-center md:justify-start mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-6 w-6 ${
                        i < currentReview.rating
                          ? 'text-yellow-400 fill-current'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                
                <blockquote className="text-lg md:text-xl text-gray-700 mb-6 leading-relaxed">
                  "{currentReview.text}"
                </blockquote>
                
                <div>
                  <cite className="font-semibold text-gray-900 text-lg">
                    {currentReview.name}
                  </cite>
                  <p className="text-blue-600 font-medium">
                    {currentReview.service}
                  </p>
                  <p className="text-gray-500 text-sm">
                    {new Date(currentReview.date).toLocaleDateString('it-IT', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </p>
                </div>
              </div>
            </div>

            {/* Navigation */}
            <div className="flex justify-between items-center mt-8">
              <button
                onClick={prevReview}
                className="p-3 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
              >
                <ChevronLeft className="h-6 w-6 text-gray-600" />
              </button>
              
              <div className="flex space-x-2">
                {reviews.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`w-3 h-3 rounded-full transition-colors ${
                      index === currentIndex ? 'bg-blue-600' : 'bg-gray-300'
                    }`}
                  />
                ))}
              </div>
              
              <button
                onClick={nextReview}
                className="p-3 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
              >
                <ChevronRight className="h-6 w-6 text-gray-600" />
              </button>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16">
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600 mb-2">12.847</div>
            <div className="text-gray-600">Clienti Soddisfatti</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600 mb-2">4.8</div>
            <div className="text-gray-600">Rating Medio</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-purple-600 mb-2">87.500</div>
            <div className="text-gray-600">Professionisti</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-orange-600 mb-2">98%</div>
            <div className="text-gray-600">Raccomandazioni</div>
          </div>
        </div>
      </div>
    </section>
  );
}