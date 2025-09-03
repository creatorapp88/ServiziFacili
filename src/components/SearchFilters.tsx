import React, { useState } from 'react';
import { Search, MapPin, Filter, X, Star, Euro, Clock } from 'lucide-react';

interface SearchFiltersProps {
  onSearch: (filters: SearchFilters) => void;
  onClose: () => void;
}

interface SearchFilters {
  service: string;
  location: string;
  category: string;
  priceRange: string;
  rating: number;
  availability: string;
}

export default function SearchFilters({ onSearch, onClose }: SearchFiltersProps) {
  const [filters, setFilters] = useState<SearchFilters>({
    service: '',
    location: '',
    category: '',
    priceRange: '',
    rating: 0,
    availability: ''
  });

  const categories = [
    'Casa e Giardino',
    'Riparazioni',
    'Design',
    'Fotografia',
    'Formazione',
    'Benessere',
    'Auto e Moto',
    'Beauty'
  ];

  const priceRanges = [
    { value: '0-50', label: '€0 - €50' },
    { value: '50-100', label: '€50 - €100' },
    { value: '100-250', label: '€100 - €250' },
    { value: '250-500', label: '€250 - €500' },
    { value: '500+', label: '€500+' }
  ];

  const availabilityOptions = [
    { value: 'today', label: 'Oggi' },
    { value: 'week', label: 'Questa settimana' },
    { value: 'month', label: 'Questo mese' },
    { value: 'flexible', label: 'Flessibile' }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(filters);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold text-gray-900">Ricerca Avanzata</h2>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
              <X className="h-6 w-6" />
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Service and Location */}
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Servizio
              </label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  value={filters.service}
                  onChange={(e) => setFilters({ ...filters, service: e.target.value })}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  placeholder="es. Riparazione caldaia"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Località
              </label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  value={filters.location}
                  onChange={(e) => setFilters({ ...filters, location: e.target.value })}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  placeholder="Milano, Roma, Napoli..."
                />
              </div>
            </div>
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Categoria
            </label>
            <select
              value={filters.category}
              onChange={(e) => setFilters({ ...filters, category: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            >
              <option value="">Tutte le categorie</option>
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>

          {/* Price Range */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Fascia di prezzo
            </label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {priceRanges.map(range => (
                <button
                  key={range.value}
                  type="button"
                  onClick={() => setFilters({ ...filters, priceRange: range.value })}
                  className={`p-3 border rounded-lg text-center transition-colors ${
                    filters.priceRange === range.value
                      ? 'border-blue-500 bg-blue-50 text-blue-700'
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                >
                  <Euro className="h-4 w-4 mx-auto mb-1" />
                  <span className="text-sm">{range.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Rating */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Valutazione minima
            </label>
            <div className="flex items-center space-x-2">
              {[1, 2, 3, 4, 5].map(rating => (
                <button
                  key={rating}
                  type="button"
                  onClick={() => setFilters({ ...filters, rating })}
                  className={`p-2 rounded-lg transition-colors ${
                    filters.rating >= rating
                      ? 'text-yellow-400'
                      : 'text-gray-300 hover:text-yellow-300'
                  }`}
                >
                  <Star className="h-6 w-6 fill-current" />
                </button>
              ))}
              <span className="text-sm text-gray-600 ml-2">
                {filters.rating > 0 ? `${filters.rating}+ stelle` : 'Qualsiasi'}
              </span>
            </div>
          </div>

          {/* Availability */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Disponibilità
            </label>
            <div className="grid grid-cols-2 gap-3">
              {availabilityOptions.map(option => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => setFilters({ ...filters, availability: option.value })}
                  className={`p-3 border rounded-lg text-center transition-colors ${
                    filters.availability === option.value
                      ? 'border-blue-500 bg-blue-50 text-blue-700'
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                >
                  <Clock className="h-4 w-4 mx-auto mb-1" />
                  <span className="text-sm">{option.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-3 pt-4">
            <button
              type="button"
              onClick={() => setFilters({
                service: '',
                location: '',
                category: '',
                priceRange: '',
                rating: 0,
                availability: ''
              })}
              className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancella Filtri
            </button>
            <button
              type="submit"
              className="flex-1 bg-blue-600 text-white px-4 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
            >
              Cerca Professionisti
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}