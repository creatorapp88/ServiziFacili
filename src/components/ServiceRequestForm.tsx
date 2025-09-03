import React, { useState } from 'react';
import { X, MapPin, Euro, Calendar, Clock, AlertCircle, CheckCircle } from 'lucide-react';

interface ServiceRequestFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (requestData: any) => void;
}

export default function ServiceRequestForm({ isOpen, onClose, onSubmit }: ServiceRequestFormProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    service: '',
    category: '',
    description: '',
    location: {
      city: '',
      address: '',
      province: ''
    },
    urgency: 'normal',
    availability: '',
    contactPreference: 'phone',
    additionalInfo: ''
  });
  const [errors, setErrors] = useState<string[]>([]);

  if (!isOpen) return null;

  const categories = [
    { id: 'casa-giardino', name: 'Casa e Giardino', services: ['Giardinaggio', 'Pulizie', 'Ristrutturazione', 'Manutenzione'] },
    { id: 'riparazioni', name: 'Riparazioni', services: ['Elettricista', 'Idraulico', 'Caldaista', 'Riparazione Elettrodomestici'] },
    { id: 'design', name: 'Design', services: ['Interior Design', 'Grafica', 'Web Design', 'Architettura'] },
    { id: 'fotografia', name: 'Fotografia', services: ['Matrimoni', 'Eventi', 'Ritratti', 'Commerciale'] },
    { id: 'formazione', name: 'Formazione', services: ['Lezioni Private', 'Corsi di Lingua', 'Ripetizioni', 'Musica'] },
    { id: 'benessere', name: 'Benessere', services: ['Personal Trainer', 'Massaggi', 'Nutrizionista', 'Yoga'] },
    { id: 'automotive', name: 'Auto e Moto', services: ['Meccanico', 'Carrozziere', 'Gommista', 'Elettrauto'] },
    { id: 'beauty', name: 'Beauty', services: ['Parrucchiere', 'Estetista', 'Nail Art', 'Barbiere'] }
  ];

  const budgetRanges = [
    { value: '50-100', label: '€50 - €100' },
    { value: '100-250', label: '€100 - €250' },
    { value: '250-500', label: '€250 - €500' },
    { value: '500-1000', label: '€500 - €1.000' },
    { value: '1000-2500', label: '€1.000 - €2.500' },
    { value: '2500-5000', label: '€2.500 - €5.000' },
    { value: '5000+', label: 'Oltre €5.000' }
  ];

  const urgencyLevels = [
    { value: 'urgent', label: 'Urgente (entro 24h)', color: 'text-red-600' },
    { value: 'soon', label: 'Presto (entro 1 settimana)', color: 'text-orange-600' },
    { value: 'normal', label: 'Normale (entro 1 mese)', color: 'text-blue-600' },
    { value: 'flexible', label: 'Flessibile (quando possibile)', color: 'text-green-600' }
  ];

  const validateStep = (step: number) => {
    const newErrors: string[] = [];

    switch (step) {
      case 1:
        if (!formData.category) newErrors.push('Seleziona una categoria');
        if (!formData.service) newErrors.push('Seleziona un servizio');
        break;
      case 2:
        if (!formData.description.trim()) newErrors.push('Descrivi il servizio richiesto');
        if (formData.description.length < 20) newErrors.push('La descrizione deve essere di almeno 20 caratteri');
        break;
      case 3:
        if (!formData.location.city.trim()) newErrors.push('Inserisci la città');
        break;
    }

    setErrors(newErrors);
    return newErrors.length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleSubmit = () => {
    if (validateStep(currentStep)) {
      // Auto-approva la richiesta
      const requestData = {
        ...formData,
        status: 'approved',
        autoApproved: true,
        approvedAt: new Date().toISOString()
      };
      onSubmit(requestData);
      onClose();
      // Reset form
      setFormData({
        service: '',
        category: '',
        description: '',
        location: { city: '', address: '', province: '' },
        budget: '',
        urgency: 'normal',
        availability: '',
        contactPreference: 'phone',
        additionalInfo: ''
      });
      setCurrentStep(1);
    }
  };

  const selectedCategory = categories.find(cat => cat.id === formData.category);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Richiedi Preventivi Gratuiti</h2>
              <p className="text-gray-600 mt-1">Passo {currentStep} di 4</p>
            </div>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
              <X className="h-6 w-6" />
            </button>
          </div>
          
          {/* Progress Bar */}
          <div className="mt-4">
            <div className="flex justify-between text-xs text-gray-500 mb-2">
              <span>Servizio</span>
              <span>Dettagli</span>
              <span>Località</span>
              <span>Conferma</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${(currentStep / 4) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>

        <div className="p-6">
          {/* Step 1: Category and Service */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Che tipo di servizio ti serve?</h3>
                <div className="grid grid-cols-2 gap-3">
                  {categories.map(category => (
                    <button
                      key={category.id}
                      onClick={() => setFormData({ ...formData, category: category.id, service: '' })}
                      className={`p-4 border rounded-lg text-left transition-colors ${
                        formData.category === category.id
                          ? 'border-blue-500 bg-blue-50 text-blue-700'
                          : 'border-gray-300 hover:border-gray-400'
                      }`}
                    >
                      <div className="font-medium">{category.name}</div>
                    </button>
                  ))}
                </div>
              </div>

              {selectedCategory && (
                <div>
                  <h4 className="font-medium text-gray-900 mb-3">Seleziona il servizio specifico:</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {selectedCategory.services.map(service => (
                      <button
                        key={service}
                        onClick={() => setFormData({ ...formData, service })}
                        className={`p-3 border rounded-lg text-sm transition-colors ${
                          formData.service === service
                            ? 'border-blue-500 bg-blue-50 text-blue-700'
                            : 'border-gray-300 hover:border-gray-400'
                        }`}
                      >
                        {service}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Step 2: Description */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Descrivi il tuo progetto</h3>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  rows={6}
                  placeholder="Descrivi dettagliatamente il servizio che ti serve. Più informazioni fornisci, più precisi saranno i preventivi che riceverai..."
                />
                <p className="text-sm text-gray-500 mt-2">
                  {formData.description.length}/500 caratteri
                </p>
              </div>

              <div>
                <h4 className="font-medium text-gray-900 mb-3">Quando ti serve?</h4>
                <div className="space-y-2">
                  {urgencyLevels.map(level => (
                    <label key={level.value} className="flex items-center space-x-3 cursor-pointer">
                      <input
                        type="radio"
                        name="urgency"
                        value={level.value}
                        checked={formData.urgency === level.value}
                        onChange={(e) => setFormData({ ...formData, urgency: e.target.value })}
                        className="text-blue-600"
                      />
                      <span className={`font-medium ${level.color}`}>{level.label}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Location and Budget */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Dove ti serve il servizio?</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Città *</label>
                    <input
                      type="text"
                      value={formData.location.city}
                      onChange={(e) => setFormData({ 
                        ...formData, 
                        location: { ...formData.location, city: e.target.value }
                      })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                      placeholder="Milano"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Provincia</label>
                    <input
                      type="text"
                      value={formData.location.province}
                      onChange={(e) => setFormData({ 
                        ...formData, 
                        location: { ...formData.location, province: e.target.value }
                      })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                      placeholder="MI"
                    />
                  </div>
                </div>
                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Indirizzo (opzionale)</label>
                  <input
                    type="text"
                    value={formData.location.address}
                    onChange={(e) => setFormData({ 
                      ...formData, 
                      location: { ...formData.location, address: e.target.value }
                    })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                    placeholder="Via Roma 123"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Confirmation */}
          {currentStep === 4 && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Conferma la tua richiesta</h3>
                <div className="bg-gray-50 rounded-lg p-6 space-y-4">
                  <div>
                    <h4 className="font-medium text-gray-900">Servizio</h4>
                    <p className="text-gray-700">{formData.service}</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">Descrizione</h4>
                    <p className="text-gray-700">{formData.description}</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">Località</h4>
                    <p className="text-gray-700">
                      {formData.location.city}
                      {formData.location.province && `, ${formData.location.province}`}
                    </p>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">Urgenza</h4>
                    <p className="text-gray-700">
                      {urgencyLevels.find(level => level.value === formData.urgency)?.label}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <div className="flex items-center space-x-2 text-green-700">
                  <CheckCircle className="h-5 w-5" />
                  <div>
                    <p className="font-medium">Cosa succede dopo?</p>
                    <p className="text-sm">Riceverai fino a 5 preventivi gratuiti entro 24 ore dai migliori professionisti della tua zona.</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Errors */}
          {errors.length > 0 && (
            <div className="mt-6 bg-red-50 border border-red-200 rounded-lg p-4">
              {errors.map((error, index) => (
                <div key={index} className="flex items-center space-x-2 text-red-700">
                  <AlertCircle className="h-4 w-4" />
                  <span className="text-sm">{error}</span>
                </div>
              ))}
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8 pt-6 border-t border-gray-200">
            <button
              onClick={() => currentStep > 1 ? setCurrentStep(currentStep - 1) : onClose()}
              className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              {currentStep > 1 ? 'Indietro' : 'Annulla'}
            </button>
            
            {currentStep < 4 ? (
              <button
                onClick={handleNext}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Continua
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                Invia Richiesta
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}