import React, { useState } from 'react';
import { MessageCircle, X, Phone } from 'lucide-react';

interface WhatsAppBannerProps {
  phoneNumber: string;
  message?: string;
}

export default function WhatsAppBanner({ 
  phoneNumber, 
  message = "Ciao! Ho bisogno di aiuto con ServiziFacili" 
}: WhatsAppBannerProps) {
  const [isVisible, setIsVisible] = useState(true);
  const [isMinimized, setIsMinimized] = useState(false);

  if (!isVisible) return null;

  const whatsappUrl = `https://wa.me/${phoneNumber.replace(/\D/g, '')}?text=${encodeURIComponent(message)}`;

  const handleWhatsAppClick = () => {
    window.open(whatsappUrl, '_blank');
  };

  if (isMinimized) {
    return (
      <div className="fixed bottom-20 right-6 z-40">
        <button
          onClick={() => setIsMinimized(false)}
          className="bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg transition-all duration-300 hover:scale-110 animate-pulse"
        >
          <MessageCircle className="h-6 w-6" />
        </button>
      </div>
    );
  }

  return (
    <div className="fixed bottom-6 left-6 z-40 max-w-sm">
      <div className="bg-white rounded-lg shadow-2xl border border-gray-200 overflow-hidden">
        {/* Header */}
        <div className="bg-green-500 text-white p-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
              <MessageCircle className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-semibold text-sm">Supporto WhatsApp</h3>
              <p className="text-xs opacity-90">Online ora</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setIsMinimized(true)}
              className="text-white hover:text-gray-200 transition-colors"
            >
              <div className="w-4 h-0.5 bg-current"></div>
            </button>
            <button
              onClick={() => setIsVisible(false)}
              className="text-white hover:text-gray-200 transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-4">
          <div className="flex items-start space-x-3 mb-4">
            <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
              <Phone className="h-4 w-4 text-green-600" />
            </div>
            <div className="flex-1">
              <p className="text-sm text-gray-800 mb-2">
                <strong>Hai bisogno di aiuto?</strong>
              </p>
              <p className="text-xs text-gray-600 mb-3">
                Contattaci su WhatsApp per supporto immediato. Rispondiamo in pochi minuti!
              </p>
              <div className="bg-gray-50 rounded-lg p-3 mb-3">
                <p className="text-xs text-gray-500 mb-1">Numero WhatsApp:</p>
                <p className="font-semibold text-green-600">+39 389 633 5889</p>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="space-y-2 mb-4">
            <button
              onClick={() => {
                const quickMessage = "Ciao! Vorrei informazioni sui vostri servizi";
                window.open(`https://wa.me/3896335889?text=${encodeURIComponent(quickMessage)}`, '_blank');
              }}
              className="w-full text-left p-2 text-xs bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors"
            >
              💬 Informazioni sui servizi
            </button>
            <button
              onClick={() => {
                const quickMessage = "Ciao! Ho un problema con la mia richiesta";
                window.open(`https://wa.me/3896335889?text=${encodeURIComponent(quickMessage)}`, '_blank');
              }}
              className="w-full text-left p-2 text-xs bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors"
            >
              🔧 Supporto tecnico
            </button>
            <button
              onClick={() => {
                const quickMessage = "Ciao! Sono un professionista interessato";
                window.open(`https://wa.me/3896335889?text=${encodeURIComponent(quickMessage)}`, '_blank');
              }}
              className="w-full text-left p-2 text-xs bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors"
            >
              👨‍💼 Info per professionisti
            </button>
          </div>

          {/* Main WhatsApp Button */}
          <button
            onClick={handleWhatsAppClick}
            className="w-full bg-green-500 hover:bg-green-600 text-white py-3 px-4 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2"
          >
            <MessageCircle className="h-4 w-4" />
            <span>Chatta su WhatsApp</span>
          </button>

          <p className="text-xs text-gray-500 text-center mt-2">
            Rispondiamo entro 5 minuti
          </p>
        </div>
      </div>
    </div>
  );
}