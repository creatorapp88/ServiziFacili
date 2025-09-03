import React, { useState } from 'react';
import { Filter, SortAsc, MapPin, Star, X } from 'lucide-react';
import ProfessionalCard from './ProfessionalCard';
import SearchFilters from './SearchFilters';

interface SearchResultsProps {
  isOpen: boolean;
  onClose: () => void;
  searchQuery: string;
  location: string;
}

export default function SearchResults({ isOpen, onClose, searchQuery, location }: SearchResultsProps) {
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState('relevance');

  if (!isOpen) return null;

  // Mock professionals data
  const professionals = [
    {
      id: '1',
      name: 'Marco Fontana',
      service: 'Riparazione Caldaie',
      rating: 4.9,
      reviews: 127,
      location: 'Milano Centro',
      distance: '2.3 km',
      price: '€45-65/h',
      availability: 'Oggi',
      verified: true,
      premium: true,
      image: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=150',
      description: 'Tecnico specializzato in caldaie Baxi, Vaillant e Ariston. 15 anni di esperienza, interventi rapidi e garanzia sui lavori.',
      completedJobs: 340,
      responseTime: '< 1h',
      specialties: ['Caldaie Baxi', 'Manutenzione', 'Emergenze']
    },
    {
      id: '2',
      name: 'Giuseppe Verdi',
      service: 'Idraulico',
      rating: 4.8,
      reviews: 89,
      location: 'Milano Sud',
      distance: '4.1 km',
      price: '€40-55/h',
      availability: 'Domani',
      verified: true,
      premium: false,
      image: 'https://images.pexels.com/photos/1516680/pexels-photo-1516680.jpeg?auto=compress&cs=tinysrgb&w=150',
      description: 'Idraulico qualificato per riparazioni, installazioni e manutenzioni. Disponibile per emergenze 24/7.',
      completedJobs: 256,
      responseTime: '2h',
      specialties: ['Perdite', 'Scarichi', 'Installazioni']
    },
    {
      id: '3',
      name: 'Alessandro Conti',
      service: 'Elettricista',
      rating: 4.7,
      reviews: 156,
      location: 'Milano Nord',
      distance: '6.8 km',
      price: '€35-50/h',
      availability: 'Questa settimana',
      verified: true,
      premium: false,
      image: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=150',
      description: 'Elettricista certificato per impianti civili e industriali. Specializzato in domotica e sistemi di sicurezza.',
      completedJobs: 198,
      responseTime: '3h',
      specialties: ['Impianti', 'Domotica', 'Sicurezza']
    },
    {
      id: '4',
      name: 'Francesca Martini',
      service: 'Imbianchino',
      rating: 4.9,
      reviews: 203,
      location: 'Milano Ovest',
      distance: '5.2 km',
      price: '€25-35/h',
      availability: 'Prossima settimana',
      verified: true,
      premium: true,
      image: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150',
      description: 'Imbianchino professionale con 12 anni di esperienza. Specializzata in tecniche decorative e restauro.',
      completedJobs: 445,
      responseTime: '1h',
      specialties: ['Decorazioni', 'Restauro', 'Tecniche speciali']
    },
    {
      id: '5',
      name: 'Roberto Ferrari',
      service: 'Giardiniere',
      rating: 4.6,
      reviews: 78,
      location: 'Milano Est',
      distance: '7.5 km',
      price: '€30-40/h',
      availability: 'Oggi',
      verified: true,
      premium: false,
      image: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150',
      description: 'Giardiniere esperto in progettazione e manutenzione giardini. Servizi di potatura e cura del verde.',
      completedJobs: 167,
      responseTime: '4h',
      specialties: ['Potatura', 'Progettazione', 'Manutenzione']
    }
  ];

  const handleContact = (professional: any) => {
    alert(`Contattando ${professional.name}...`);
  };

  const handleViewProfile = (professional: any) => {
    alert(`Visualizzando profilo di ${professional.name}...`);
  };

  const handleSearch = (filters: any) => {
    console.log('Filtri applicati:', filters);
    setShowFilters(false);
  };

  return (
    <div className="fixed inset-0 bg-white z-50 overflow-y-auto">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="h-6 w-6" />
              </button>
              <div>
                <h1 className="text-lg font-semibold text-gray-900">
                  Risultati per "{searchQuery}"
                </h1>
                <p className="text-sm text-gray-600 flex items-center">
                  <MapPin className="h-4 w-4 mr-1" />
                  {location} • {professionals.length} professionisti trovati
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <button
                onClick={() => setShowFilters(true)}
                className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <Filter className="h-4 w-4" />
                <span>Filtri</span>
              </button>
              
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              >
                <option value="relevance">Più rilevanti</option>
                <option value="rating">Valutazione</option>
                <option value="distance">Distanza</option>
                <option value="price">Prezzo</option>
                <option value="availability">Disponibilità</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {professionals.map(professional => (
            <ProfessionalCard
              key={professional.id}
              professional={professional}
              onContact={handleContact}
              onViewProfile={handleViewProfile}
            />
          ))}
        </div>

        {/* Load More */}
        <div className="text-center mt-12">
          <button className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors">
            Carica altri professionisti
          </button>
        </div>
      </div>

      {/* Search Filters Modal */}
      {showFilters && (
        <SearchFilters
          onSearch={handleSearch}
          onClose={() => setShowFilters(false)}
        />
      )}
    </div>
  );
}