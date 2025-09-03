import React from 'react';
import { Star, MapPin, Phone, Mail, CheckCircle, Award, Clock, Euro } from 'lucide-react';

interface Professional {
  id: string;
  name: string;
  service: string;
  rating: number;
  reviews: number;
  location: string;
  distance: string;
  price: string;
  availability: string;
  verified: boolean;
  premium: boolean;
  image: string;
  description: string;
  completedJobs: number;
  responseTime: string;
  specialties: string[];
}

interface ProfessionalCardProps {
  professional: Professional;
  onContact: (professional: Professional) => void;
  onViewProfile: (professional: Professional) => void;
}

export default function ProfessionalCard({ professional, onContact, onViewProfile }: ProfessionalCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-lg transition-all duration-300 overflow-hidden">
      {/* Header with Image and Basic Info */}
      <div className="p-6">
        <div className="flex items-start space-x-4">
          <div className="relative">
            <img
              src={professional.image}
              alt={professional.name}
              className="w-16 h-16 rounded-full object-cover"
            />
            {professional.verified && (
              <div className="absolute -bottom-1 -right-1 bg-green-500 text-white rounded-full p-1">
                <CheckCircle className="h-4 w-4" />
              </div>
            )}
          </div>
          
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">{professional.name}</h3>
              {professional.premium && (
                <span className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs px-2 py-1 rounded-full font-medium">
                  PREMIUM
                </span>
              )}
            </div>
            
            <p className="text-blue-600 font-medium mb-1">{professional.service}</p>
            
            <div className="flex items-center space-x-4 text-sm text-gray-600">
              <div className="flex items-center space-x-1">
                <Star className="h-4 w-4 text-yellow-400 fill-current" />
                <span className="font-medium">{professional.rating}</span>
                <span>({professional.reviews} recensioni)</span>
              </div>
              
              <div className="flex items-center space-x-1">
                <MapPin className="h-4 w-4" />
                <span>{professional.location} • {professional.distance}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Description */}
        <p className="text-gray-600 mt-4 text-sm leading-relaxed">
          {professional.description}
        </p>

        {/* Specialties */}
        <div className="flex flex-wrap gap-2 mt-4">
          {professional.specialties.map((specialty, index) => (
            <span
              key={index}
              className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs"
            >
              {specialty}
            </span>
          ))}
        </div>
      </div>

      {/* Stats Section */}
      <div className="px-6 py-4 bg-gray-50 border-t border-gray-100">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="flex items-center justify-center space-x-1 text-green-600 mb-1">
              <Award className="h-4 w-4" />
              <span className="text-sm font-medium">{professional.completedJobs}</span>
            </div>
            <p className="text-xs text-gray-500">Lavori completati</p>
          </div>
          
          <div>
            <div className="flex items-center justify-center space-x-1 text-blue-600 mb-1">
              <Clock className="h-4 w-4" />
              <span className="text-sm font-medium">{professional.responseTime}</span>
            </div>
            <p className="text-xs text-gray-500">Tempo risposta</p>
          </div>
          
          <div>
            <div className="flex items-center justify-center space-x-1 text-purple-600 mb-1">
              <Euro className="h-4 w-4" />
              <span className="text-sm font-medium">{professional.price}</span>
            </div>
            <p className="text-xs text-gray-500">Prezzo medio</p>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="p-6 pt-4">
        <div className="flex space-x-3">
          <button
            onClick={() => onViewProfile(professional)}
            className="flex-1 border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium"
          >
            Vedi Profilo
          </button>
          <button
            onClick={() => onContact(professional)}
            className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
          >
            Contatta Ora
          </button>
        </div>
        
        <div className="mt-3 text-center">
          <span className="text-xs text-gray-500">
            Disponibile: <span className="text-green-600 font-medium">{professional.availability}</span>
          </span>
        </div>
      </div>
    </div>
  );
}