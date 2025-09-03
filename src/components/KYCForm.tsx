import React, { useState } from 'react';
import { 
  User, 
  FileText, 
  Upload, 
  CheckCircle, 
  AlertCircle, 
  Calendar,
  MapPin,
  Building,
  CreditCard,
  Phone,
  Mail,
  X,
  Eye,
  Download
} from 'lucide-react';
import { KYCData, KYCDocument } from '../types';

interface KYCFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (kycData: KYCData) => void;
  currentKYC?: KYCData;
}

export default function KYCForm({ isOpen, onClose, onSubmit, currentKYC }: KYCFormProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [kycData, setKycData] = useState<Partial<KYCData>>(currentKYC || {
    personalInfo: {
      firstName: '',
      lastName: '',
      dateOfBirth: '',
      placeOfBirth: '',
      fiscalCode: '',
      vatNumber: ''
    },
    documents: {
      identityDocument: {} as KYCDocument,
      fiscalCodeDocument: {} as KYCDocument
    },
    address: {
      street: '',
      city: '',
      province: '',
      postalCode: '',
      country: 'Italia'
    },
    businessInfo: {
      companyName: '',
      companyType: 'individual',
      vatNumber: '',
      businessAddress: '',
      yearsOfExperience: 0,
      specializations: []
    },
    bankAccount: {
      iban: '',
      bankName: '',
      accountHolder: ''
    },
    references: []
  });
  const [errors, setErrors] = useState<string[]>([]);
  const [uploadingFiles, setUploadingFiles] = useState<{ [key: string]: boolean }>({});

  if (!isOpen) return null;

  const validateStep = (step: number): boolean => {
    const newErrors: string[] = [];

    switch (step) {
      case 1: // Personal Info
        if (!kycData.personalInfo?.firstName) newErrors.push('Nome richiesto');
        if (!kycData.personalInfo?.lastName) newErrors.push('Cognome richiesto');
        if (!kycData.personalInfo?.dateOfBirth) newErrors.push('Data di nascita richiesta');
        if (!kycData.personalInfo?.fiscalCode) newErrors.push('Codice fiscale richiesto');
        break;
      case 2: // Documents
        if (!kycData.documents?.identityDocument?.fileUrl) newErrors.push('Documento di identità richiesto');
        if (!kycData.documents?.fiscalCodeDocument?.fileUrl) newErrors.push('Tessera sanitaria/Codice fiscale richiesto');
        break;
      case 3: // Address
        if (!kycData.address?.street) newErrors.push('Indirizzo richiesto');
        if (!kycData.address?.city) newErrors.push('Città richiesta');
        if (!kycData.address?.postalCode) newErrors.push('CAP richiesto');
        break;
      case 4: // Business Info
        if (!kycData.businessInfo?.companyType) newErrors.push('Tipo attività richiesto');
        if (!kycData.businessInfo?.yearsOfExperience) newErrors.push('Anni di esperienza richiesti');
        break;
      case 5: // Bank Account
        if (!kycData.bankAccount?.iban) newErrors.push('IBAN richiesto');
        if (!kycData.bankAccount?.accountHolder) newErrors.push('Intestatario conto richiesto');
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
      onSubmit(kycData as KYCData);
      onClose();
    }
  };

  const handleFileUpload = async (documentType: string, file: File) => {
    setUploadingFiles(prev => ({ ...prev, [documentType]: true }));
    
    // Simula upload file
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const mockDocument: KYCDocument = {
      id: `doc-${Date.now()}`,
      type: documentType as any,
      fileName: file.name,
      fileUrl: URL.createObjectURL(file),
      uploadedAt: new Date().toISOString(),
      verified: false
    };

    setKycData(prev => ({
      ...prev,
      documents: {
        ...prev.documents,
        [documentType]: mockDocument
      }
    }));

    setUploadingFiles(prev => ({ ...prev, [documentType]: false }));
  };

  const addReference = () => {
    setKycData(prev => ({
      ...prev,
      references: [
        ...(prev.references || []),
        { name: '', phone: '', email: '', relationship: '' }
      ]
    }));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Verifica Identità (KYC)</h2>
              <p className="text-gray-600 mt-1">Passo {currentStep} di 6</p>
            </div>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
              <X className="h-6 w-6" />
            </button>
          </div>
          
          {/* Progress Bar */}
          <div className="mt-4">
            <div className="flex justify-between text-xs text-gray-500 mb-2">
              <span>Dati Personali</span>
              <span>Documenti</span>
              <span>Indirizzo</span>
              <span>Attività</span>
              <span>Conto Bancario</span>
              <span>Conferma</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${(currentStep / 6) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>

        <div className="p-6">
          {/* Step 1: Personal Information */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <div className="flex items-center space-x-3 mb-6">
                <User className="h-6 w-6 text-blue-600" />
                <h3 className="text-lg font-semibold text-gray-900">Informazioni Personali</h3>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Nome *</label>
                  <input
                    type="text"
                    value={kycData.personalInfo?.firstName || ''}
                    onChange={(e) => setKycData(prev => ({
                      ...prev,
                      personalInfo: { ...prev.personalInfo!, firstName: e.target.value }
                    }))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                    placeholder="Mario"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Cognome *</label>
                  <input
                    type="text"
                    value={kycData.personalInfo?.lastName || ''}
                    onChange={(e) => setKycData(prev => ({
                      ...prev,
                      personalInfo: { ...prev.personalInfo!, lastName: e.target.value }
                    }))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                    placeholder="Rossi"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Data di Nascita *</label>
                  <input
                    type="date"
                    value={kycData.personalInfo?.dateOfBirth || ''}
                    onChange={(e) => setKycData(prev => ({
                      ...prev,
                      personalInfo: { ...prev.personalInfo!, dateOfBirth: e.target.value }
                    }))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Luogo di Nascita *</label>
                  <input
                    type="text"
                    value={kycData.personalInfo?.placeOfBirth || ''}
                    onChange={(e) => setKycData(prev => ({
                      ...prev,
                      personalInfo: { ...prev.personalInfo!, placeOfBirth: e.target.value }
                    }))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                    placeholder="Milano (MI)"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Codice Fiscale *</label>
                  <input
                    type="text"
                    value={kycData.personalInfo?.fiscalCode || ''}
                    onChange={(e) => setKycData(prev => ({
                      ...prev,
                      personalInfo: { ...prev.personalInfo!, fiscalCode: e.target.value.toUpperCase() }
                    }))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                    placeholder="RSSMRA80A01F205X"
                    maxLength={16}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Partita IVA (opzionale)</label>
                  <input
                    type="text"
                    value={kycData.personalInfo?.vatNumber || ''}
                    onChange={(e) => setKycData(prev => ({
                      ...prev,
                      personalInfo: { ...prev.personalInfo!, vatNumber: e.target.value }
                    }))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                    placeholder="12345678901"
                    maxLength={11}
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Documents */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <div className="flex items-center space-x-3 mb-6">
                <FileText className="h-6 w-6 text-blue-600" />
                <h3 className="text-lg font-semibold text-gray-900">Documenti di Identità</h3>
              </div>

              {/* Identity Document */}
              <div className="border border-gray-200 rounded-lg p-6">
                <h4 className="font-medium text-gray-900 mb-4">Documento di Identità *</h4>
                <p className="text-sm text-gray-600 mb-4">
                  Carica una foto chiara del tuo documento di identità (Carta d'Identità, Passaporto o Patente)
                </p>
                
                {!kycData.documents?.identityDocument?.fileUrl ? (
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                    <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <label className="cursor-pointer">
                      <span className="text-blue-600 hover:text-blue-700 font-medium">
                        Clicca per caricare
                      </span>
                      <input
                        type="file"
                        accept="image/*,.pdf"
                        className="hidden"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) handleFileUpload('identityDocument', file);
                        }}
                      />
                    </label>
                    <p className="text-sm text-gray-500 mt-2">PNG, JPG o PDF (max 10MB)</p>
                    {uploadingFiles.identityDocument && (
                      <div className="mt-4">
                        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600 mx-auto"></div>
                        <p className="text-sm text-gray-600 mt-2">Caricamento...</p>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                      <span className="text-green-800 font-medium">
                        {kycData.documents.identityDocument.fileName}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button className="text-blue-600 hover:text-blue-700">
                        <Eye className="h-4 w-4" />
                      </button>
                      <button 
                        onClick={() => setKycData(prev => ({
                          ...prev,
                          documents: { ...prev.documents!, identityDocument: {} as KYCDocument }
                        }))}
                        className="text-red-600 hover:text-red-700"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Fiscal Code Document */}
              <div className="border border-gray-200 rounded-lg p-6">
                <h4 className="font-medium text-gray-900 mb-4">Tessera Sanitaria / Codice Fiscale *</h4>
                <p className="text-sm text-gray-600 mb-4">
                  Carica una foto della tua tessera sanitaria (fronte e retro) o del codice fiscale
                </p>
                
                {!kycData.documents?.fiscalCodeDocument?.fileUrl ? (
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                    <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <label className="cursor-pointer">
                      <span className="text-blue-600 hover:text-blue-700 font-medium">
                        Clicca per caricare
                      </span>
                      <input
                        type="file"
                        accept="image/*,.pdf"
                        className="hidden"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) handleFileUpload('fiscalCodeDocument', file);
                        }}
                      />
                    </label>
                    <p className="text-sm text-gray-500 mt-2">PNG, JPG o PDF (max 10MB)</p>
                    {uploadingFiles.fiscalCodeDocument && (
                      <div className="mt-4">
                        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600 mx-auto"></div>
                        <p className="text-sm text-gray-600 mt-2">Caricamento...</p>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                      <span className="text-green-800 font-medium">
                        {kycData.documents.fiscalCodeDocument.fileName}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button className="text-blue-600 hover:text-blue-700">
                        <Eye className="h-4 w-4" />
                      </button>
                      <button 
                        onClick={() => setKycData(prev => ({
                          ...prev,
                          documents: { ...prev.documents!, fiscalCodeDocument: {} as KYCDocument }
                        }))}
                        className="text-red-600 hover:text-red-700"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Step 3: Address */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <div className="flex items-center space-x-3 mb-6">
                <MapPin className="h-6 w-6 text-blue-600" />
                <h3 className="text-lg font-semibold text-gray-900">Indirizzo di Residenza</h3>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Via e Numero Civico *</label>
                <input
                  type="text"
                  value={kycData.address?.street || ''}
                  onChange={(e) => setKycData(prev => ({
                    ...prev,
                    address: { ...prev.address!, street: e.target.value }
                  }))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  placeholder="Via Roma 123"
                />
              </div>

              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Città *</label>
                  <input
                    type="text"
                    value={kycData.address?.city || ''}
                    onChange={(e) => setKycData(prev => ({
                      ...prev,
                      address: { ...prev.address!, city: e.target.value }
                    }))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                    placeholder="Milano"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Provincia *</label>
                  <input
                    type="text"
                    value={kycData.address?.province || ''}
                    onChange={(e) => setKycData(prev => ({
                      ...prev,
                      address: { ...prev.address!, province: e.target.value }
                    }))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                    placeholder="MI"
                    maxLength={2}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">CAP *</label>
                  <input
                    type="text"
                    value={kycData.address?.postalCode || ''}
                    onChange={(e) => setKycData(prev => ({
                      ...prev,
                      address: { ...prev.address!, postalCode: e.target.value }
                    }))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                    placeholder="20121"
                    maxLength={5}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Paese</label>
                <select
                  value={kycData.address?.country || 'Italia'}
                  onChange={(e) => setKycData(prev => ({
                    ...prev,
                    address: { ...prev.address!, country: e.target.value }
                  }))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                >
                  <option value="Italia">Italia</option>
                  <option value="San Marino">San Marino</option>
                  <option value="Vaticano">Vaticano</option>
                </select>
              </div>
            </div>
          )}

          {/* Step 4: Business Information */}
          {currentStep === 4 && (
            <div className="space-y-6">
              <div className="flex items-center space-x-3 mb-6">
                <Building className="h-6 w-6 text-blue-600" />
                <h3 className="text-lg font-semibold text-gray-900">Informazioni Attività</h3>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Tipo di Attività *</label>
                <select
                  value={kycData.businessInfo?.companyType || 'individual'}
                  onChange={(e) => setKycData(prev => ({
                    ...prev,
                    businessInfo: { ...prev.businessInfo!, companyType: e.target.value as any }
                  }))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                >
                  <option value="individual">Persona Fisica</option>
                  <option value="freelancer">Libero Professionista</option>
                  <option value="company">Società</option>
                </select>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Anni di Esperienza *</label>
                  <input
                    type="number"
                    min="0"
                    max="50"
                    value={kycData.businessInfo?.yearsOfExperience || ''}
                    onChange={(e) => setKycData(prev => ({
                      ...prev,
                      businessInfo: { ...prev.businessInfo!, yearsOfExperience: Number(e.target.value) }
                    }))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                    placeholder="5"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Nome Attività (se applicabile)</label>
                  <input
                    type="text"
                    value={kycData.businessInfo?.companyName || ''}
                    onChange={(e) => setKycData(prev => ({
                      ...prev,
                      businessInfo: { ...prev.businessInfo!, companyName: e.target.value }
                    }))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                    placeholder="Mario Rossi Impianti"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Specializzazioni</label>
                <textarea
                  value={kycData.businessInfo?.specializations?.join(', ') || ''}
                  onChange={(e) => setKycData(prev => ({
                    ...prev,
                    businessInfo: { 
                      ...prev.businessInfo!, 
                      specializations: e.target.value.split(',').map(s => s.trim()).filter(s => s)
                    }
                  }))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  rows={3}
                  placeholder="Impianti elettrici, Domotica, Sistemi di sicurezza..."
                />
                <p className="text-sm text-gray-500 mt-1">Separa le specializzazioni con virgole</p>
              </div>
            </div>
          )}

          {/* Step 5: Bank Account */}
          {currentStep === 5 && (
            <div className="space-y-6">
              <div className="flex items-center space-x-3 mb-6">
                <CreditCard className="h-6 w-6 text-blue-600" />
                <h3 className="text-lg font-semibold text-gray-900">Conto Bancario</h3>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-blue-800 text-sm">
                  <strong>Perché richiediamo il conto bancario?</strong><br />
                  Per garantire la sicurezza delle transazioni e per eventuali rimborsi. 
                  I tuoi dati bancari sono protetti e crittografati.
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">IBAN *</label>
                <input
                  type="text"
                  value={kycData.bankAccount?.iban || ''}
                  onChange={(e) => setKycData(prev => ({
                    ...prev,
                    bankAccount: { ...prev.bankAccount!, iban: e.target.value.toUpperCase() }
                  }))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  placeholder="IT60 X054 2811 1010 0000 0123 456"
                  maxLength={27}
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Nome Banca</label>
                  <input
                    type="text"
                    value={kycData.bankAccount?.bankName || ''}
                    onChange={(e) => setKycData(prev => ({
                      ...prev,
                      bankAccount: { ...prev.bankAccount!, bankName: e.target.value }
                    }))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                    placeholder="Intesa Sanpaolo"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Intestatario Conto *</label>
                  <input
                    type="text"
                    value={kycData.bankAccount?.accountHolder || ''}
                    onChange={(e) => setKycData(prev => ({
                      ...prev,
                      bankAccount: { ...prev.bankAccount!, accountHolder: e.target.value }
                    }))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                    placeholder="Mario Rossi"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 6: Confirmation */}
          {currentStep === 6 && (
            <div className="space-y-6">
              <div className="flex items-center space-x-3 mb-6">
                <CheckCircle className="h-6 w-6 text-green-600" />
                <h3 className="text-lg font-semibold text-gray-900">Conferma e Invio</h3>
              </div>

              <div className="bg-gray-50 rounded-lg p-6 space-y-4">
                <h4 className="font-medium text-gray-900">Riepilogo Dati Inseriti:</h4>
                
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-600">Nome Completo:</p>
                    <p className="font-medium">{kycData.personalInfo?.firstName} {kycData.personalInfo?.lastName}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Codice Fiscale:</p>
                    <p className="font-medium">{kycData.personalInfo?.fiscalCode}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Città:</p>
                    <p className="font-medium">{kycData.address?.city}, {kycData.address?.province}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Tipo Attività:</p>
                    <p className="font-medium">{kycData.businessInfo?.companyType}</p>
                  </div>
                </div>

                <div>
                  <p className="text-gray-600">Documenti Caricati:</p>
                  <ul className="list-disc list-inside text-sm mt-1">
                    {kycData.documents?.identityDocument?.fileName && (
                      <li>Documento di Identità: {kycData.documents.identityDocument.fileName}</li>
                    )}
                    {kycData.documents?.fiscalCodeDocument?.fileName && (
                      <li>Codice Fiscale: {kycData.documents.fiscalCodeDocument.fileName}</li>
                    )}
                  </ul>
                </div>
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <div className="flex items-start space-x-3">
                  <AlertCircle className="h-5 w-5 text-yellow-600 mt-0.5" />
                  <div className="text-yellow-800 text-sm">
                    <p className="font-medium mb-1">Cosa succede dopo?</p>
                    <ul className="list-disc list-inside space-y-1">
                      <li>I tuoi documenti saranno verificati entro 2-3 giorni lavorativi</li>
                      <li>Riceverai una notifica via email con l'esito</li>
                      <li>Una volta approvato, potrai accedere a tutte le funzionalità</li>
                      <li>In caso di problemi, ti contatteremo per chiarimenti</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  id="terms"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="terms" className="text-sm text-gray-700">
                  Confermo che tutti i dati inseriti sono veritieri e accetto i{' '}
                  <a href="#" className="text-blue-600 hover:text-blue-700">Termini di Servizio</a> e la{' '}
                  <a href="#" className="text-blue-600 hover:text-blue-700">Privacy Policy</a>
                </label>
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
            
            {currentStep < 6 ? (
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
                Invia per Verifica
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}