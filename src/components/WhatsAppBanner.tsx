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
      <div className="fixed bottom-16 right-2 z-40">
        <button
          onClick={() => setIsMinimized(false)}
          className="bg-green-500 hover:bg-green-600 text-white p-2 rounded-full shadow-lg transition-all duration-300 hover:scale-110 animate-pulse"
        >
          <MessageCircle className="h-4 w-4" />
        </button>
      </div>
    );
  }

  return (
    <div className="fixed bottom-2 left-2 z-40 max-w-[200px]">
      <div className="bg-white rounded-lg shadow-xl border border-gray-200 overflow-hidden">
        {/* Header */}
        <div className="bg-green-500 text-white p-2 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
              <MessageCircle className="h-3 w-3" />
            </div>
            <div>
              <h3 className="font-semibold text-[10px]">WhatsApp</h3>
              <p className="text-[9px] opacity-90">Online</p>
            </div>
          </div>
          <div className="flex items-center space-x-1">
            <button
              onClick={() => setIsMinimized(true)}
              className="text-white hover:text-gray-200 transition-colors"
            >
              <div className="w-2 h-0.5 bg-current"></div>
            </button>
            <button
              onClick={() => setIsVisible(false)}
              className="text-white hover:text-gray-200 transition-colors"
            >
              <X className="h-2.5 w-2.5" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-2">
          <div className="flex items-start space-x-1 mb-2">
            <div className="w-4 h-4 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
              <Phone className="h-2.5 w-2.5 text-green-600" />
            </div>
            <div className="flex-1">
              <p className="text-[9px] text-gray-800 mb-1">
                <strong>Hai bisogno di aiuto?</strong>
              </p>
              <div className="bg-gray-50 rounded p-1 mb-1">
                <p className="font-semibold text-green-600 text-[9px]">+39 389 633 5889</p>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="space-y-0.5 mb-2">
            <button
              onClick={() => {
                const quickMessage = "Ciao! Vorrei informazioni sui vostri servizi";
                window.open(`https://wa.me/3896335889?text=${encodeURIComponent(quickMessage)}`, '_blank');
              }}
              className="w-full text-left p-1 text-[9px] bg-gray-50 hover:bg-gray-100 rounded transition-colors"
            >
              💬 Info servizi
            </button>
            <button
              onClick={() => {
                const quickMessage = "Ciao! Ho un problema con la mia richiesta";
                window.open(`https://wa.me/3896335889?text=${encodeURIComponent(quickMessage)}`, '_blank');
              }}
              className="w-full text-left p-1 text-[9px] bg-gray-50 hover:bg-gray-100 rounded transition-colors"
            >
              🔧 Supporto
            </button>
          </div>

          {/* Main WhatsApp Button */}
          <button
            onClick={handleWhatsAppClick}
            className="w-full bg-green-500 hover:bg-green-600 text-white py-1.5 px-2 rounded-lg font-medium transition-colors flex items-center justify-center space-x-1 text-[10px]"
          >
            <MessageCircle className="h-3 w-3" />
            <span>WhatsApp</span>
          </button>

          <p className="text-[8px] text-gray-500 text-center mt-1">
            Risposta rapida
          </p>
        </div>
      </div>
    </div>
  );
}