import React from 'react';
import { ArrowLeft, Building, FileText, Shield, Mail, Phone, MapPin } from 'lucide-react';

interface LegalInfoProps {
  onBack: () => void;
}

export default function LegalInfo({ onBack }: LegalInfoProps) {
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
            <Building className="h-8 w-8 text-blue-600" />
            <h1 className="text-3xl font-bold text-gray-900">Informazioni Legali</h1>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Company Information */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
                <FileText className="h-5 w-5 mr-2" />
                Dati Societari
              </h2>
              
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium text-gray-900 mb-1">Ragione Sociale</h3>
                  <p className="text-gray-700">ServiziFacili S.r.l.</p>
                </div>
                
                <div>
                  <h3 className="font-medium text-gray-900 mb-1">Partita IVA</h3>
                  <p className="text-gray-700">IT08756432109</p>
                </div>
                
                <div>
                  <h3 className="font-medium text-gray-900 mb-1">Codice Fiscale</h3>
                  <p className="text-gray-700">08756432109</p>
                </div>
                
                <div>
                  <h3 className="font-medium text-gray-900 mb-1">Numero REA</h3>
                  <p className="text-gray-700">MI-2087564</p>
                </div>
                
                <div>
                  <h3 className="font-medium text-gray-900 mb-1">Capitale Sociale</h3>
                  <p className="text-gray-700">€ 50.000,00 i.v.</p>
                </div>
                
                <div>
                  <h3 className="font-medium text-gray-900 mb-1">Registro Imprese</h3>
                  <p className="text-gray-700">Milano n. 08756432109</p>
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
                <Mail className="h-5 w-5 mr-2" />
                Contatti
              </h2>
              
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <MapPin className="h-5 w-5 text-gray-400 mt-1" />
                  <div>
                    <h3 className="font-medium text-gray-900 mb-1">Sede Legale</h3>
                    <p className="text-gray-700">
                      Via Brevira 18<br />
                      20121 Milano (MI)<br />
                      Italia
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <Building className="h-5 w-5 text-gray-400 mt-1" />
                  <div>
                    <h3 className="font-medium text-gray-900 mb-1">Sede Operativa</h3>
                    <p className="text-gray-700">
                      Corso Buenos Aires 77<br />
                      20124 Milano (MI)<br />
                      Italia
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <Phone className="h-5 w-5 text-gray-400 mt-1" />
                  <div>
                    <h3 className="font-medium text-gray-900 mb-1">Telefono</h3>
                    <p className="text-gray-700">+39 389 633 5889</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <Mail className="h-5 w-5 text-gray-400 mt-1" />
                  <div>
                    <h3 className="font-medium text-gray-900 mb-1">Email</h3>
                    <p className="text-gray-700">ionutflorerea264@yahoo.com</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <Mail className="h-5 w-5 text-gray-400 mt-1" />
                  <div>
                    <h3 className="font-medium text-gray-900 mb-1">PEC</h3>
                    <p className="text-gray-700">ionutflorerea264@yahoo.com</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Legal Notices */}
          <div className="mt-12 pt-8 border-t border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
              <Shield className="h-5 w-5 mr-2" />
              Note Legali
            </h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="font-medium text-gray-900 mb-2">Attività Svolta</h3>
                <p className="text-gray-700">
                  ServiziFacili S.r.l. opera come piattaforma digitale di intermediazione tra clienti e professionisti 
                  per servizi di varia natura. La società non fornisce direttamente i servizi ma facilita il contatto 
                  tra domanda e offerta.
                </p>
              </div>
              
              <div>
                <h3 className="font-medium text-gray-900 mb-2">Responsabilità</h3>
                <p className="text-gray-700">
                  ServiziFacili S.r.l. agisce esclusivamente come intermediario. La responsabilità per la qualità 
                  dei servizi forniti rimane in capo ai singoli professionisti iscritti alla piattaforma.
                </p>
              </div>
              
              <div>
                <h3 className="font-medium text-gray-900 mb-2">Risoluzione Controversie</h3>
                <p className="text-gray-700">
                  Per eventuali controversie è competente il Foro di Milano. Prima di ricorrere all'autorità 
                  giudiziaria, le parti si impegnano a tentare una risoluzione amichevole tramite mediazione.
                </p>
              </div>
              
              <div>
                <h3 className="font-medium text-gray-900 mb-2">Diritto di Recesso</h3>
                <p className="text-gray-700">
                  Ai sensi del Codice del Consumo, i consumatori hanno diritto di recedere dai contratti conclusi 
                  a distanza entro 14 giorni dalla conclusione del contratto, salvo le eccezioni previste dalla legge.
                </p>
              </div>
            </div>
          </div>

          {/* Compliance Certifications */}
          <div className="mt-12 pt-8 border-t border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Certificazioni e Compliance</h2>
            
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <Shield className="h-8 w-8 text-green-600 mx-auto mb-2" />
                <h3 className="font-medium text-green-900 mb-1">GDPR Compliant</h3>
                <p className="text-sm text-green-700">Conforme al Regolamento Europeo sulla Privacy</p>
              </div>
              
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <FileText className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                <h3 className="font-medium text-blue-900 mb-1">ISO 27001</h3>
                <p className="text-sm text-blue-700">Sicurezza delle informazioni certificata</p>
              </div>
              
              <div className="text-center p-4 bg-purple-50 rounded-lg">
                <Building className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                <h3 className="font-medium text-purple-900 mb-1">PCI DSS</h3>
                <p className="text-sm text-purple-700">Standard di sicurezza per pagamenti</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}