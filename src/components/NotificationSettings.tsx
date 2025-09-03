import React, { useState, useEffect } from 'react';
import { Bell, BellOff, Smartphone, Monitor, Settings, Check, X } from 'lucide-react';
import { pushNotificationService } from '../utils/pushNotifications';

interface NotificationSettingsProps {
  isOpen: boolean;
  onClose: () => void;
}

export const NotificationSettings: React.FC<NotificationSettingsProps> = ({ isOpen, onClose }) => {
  const [permissionStatus, setPermissionStatus] = useState<NotificationPermission>('default');
  const [isEnabled, setIsEnabled] = useState(false);
  const [settings, setSettings] = useState({
    newOpportunities: true,
    priceUpdates: true,
    messages: true,
    reminders: false,
    marketing: false
  });

  useEffect(() => {
    checkPermissionStatus();
    loadSettings();
  }, []);

  const checkPermissionStatus = () => {
    const status = pushNotificationService.getPermissionStatus();
    setPermissionStatus(status);
    setIsEnabled(status === 'granted');
  };

  const loadSettings = () => {
    const saved = localStorage.getItem('notificationSettings');
    if (saved) {
      setSettings(JSON.parse(saved));
    }
  };

  const saveSettings = (newSettings: typeof settings) => {
    setSettings(newSettings);
    localStorage.setItem('notificationSettings', JSON.stringify(newSettings));
  };

  const enableNotifications = async () => {
    const success = await pushNotificationService.initialize();
    if (success) {
      setIsEnabled(true);
      setPermissionStatus('granted');
      
      // Mostra notifica di test
      await pushNotificationService.showLocalNotification(
        '🎉 Notifiche Attivate!',
        {
          body: 'Riceverai aggiornamenti sulle nuove opportunità',
          tag: 'welcome-notification'
        }
      );
    }
  };

  const disableNotifications = async () => {
    await pushNotificationService.unsubscribe();
    setIsEnabled(false);
  };

  const testNotification = async () => {
    const testOpportunity = {
      id: 'test-123',
      title: 'Riparazione Impianto Elettrico',
      location: 'Milano, MI',
      budget: 350
    };
    
    await pushNotificationService.simulatePushNotification(testOpportunity);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <div className="flex items-center space-x-3">
            <Bell className="w-6 h-6 text-blue-600" />
            <h2 className="text-xl font-bold text-gray-900">Notifiche Push</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Status e Attivazione */}
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-3">
                {isEnabled ? (
                  <Bell className="w-5 h-5 text-green-600" />
                ) : (
                  <BellOff className="w-5 h-5 text-gray-400" />
                )}
                <div>
                  <p className="font-medium text-gray-900">
                    Notifiche Push
                  </p>
                  <p className="text-sm text-gray-500">
                    {isEnabled ? 'Attive' : 'Disattivate'}
                  </p>
                </div>
              </div>
              
              {!isEnabled ? (
                <button
                  onClick={enableNotifications}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Attiva
                </button>
              ) : (
                <button
                  onClick={disableNotifications}
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
                >
                  Disattiva
                </button>
              )}
            </div>

            {/* Stato Permessi */}
            <div className="flex items-center space-x-2 text-sm">
              <div className={`w-2 h-2 rounded-full ${
                permissionStatus === 'granted' ? 'bg-green-500' :
                permissionStatus === 'denied' ? 'bg-red-500' : 'bg-yellow-500'
              }`} />
              <span className="text-gray-600">
                Stato: {
                  permissionStatus === 'granted' ? 'Autorizzate' :
                  permissionStatus === 'denied' ? 'Bloccate' : 'In attesa'
                }
              </span>
            </div>
          </div>

          {/* Tipi di Notifiche */}
          {isEnabled && (
            <div className="space-y-4">
              <h3 className="font-medium text-gray-900">Tipi di Notifiche</h3>
              
              {[
                {
                  key: 'newOpportunities',
                  label: 'Nuove Opportunità',
                  description: 'Ricevi notifiche per nuovi lavori nella tua zona',
                  icon: Bell
                },
                {
                  key: 'priceUpdates',
                  label: 'Aggiornamenti Prezzi',
                  description: 'Notifiche quando cambiano i prezzi delle richieste',
                  icon: Settings
                },
                {
                  key: 'messages',
                  label: 'Messaggi',
                  description: 'Nuovi messaggi dai clienti',
                  icon: Monitor
                },
                {
                  key: 'reminders',
                  label: 'Promemoria',
                  description: 'Promemoria per appuntamenti e scadenze',
                  icon: Bell
                },
                {
                  key: 'marketing',
                  label: 'Offerte e Promozioni',
                  description: 'Offerte speciali e aggiornamenti del servizio',
                  icon: Smartphone
                }
              ].map(({ key, label, description, icon: Icon }) => (
                <div key={key} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-start space-x-3">
                    <Icon className="w-5 h-5 text-gray-400 mt-0.5" />
                    <div>
                      <p className="font-medium text-gray-900">{label}</p>
                      <p className="text-sm text-gray-500">{description}</p>
                    </div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={settings[key as keyof typeof settings]}
                      onChange={(e) => saveSettings({
                        ...settings,
                        [key]: e.target.checked
                      })}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
              ))}
            </div>
          )}

          {/* Test Notifica */}
          {isEnabled && (
            <div className="pt-4 border-t">
              <button
                onClick={testNotification}
                className="w-full flex items-center justify-center space-x-2 p-3 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors"
              >
                <Bell className="w-4 h-4" />
                <span>Invia Notifica di Test</span>
              </button>
            </div>
          )}

          {/* Info Browser */}
          <div className="text-xs text-gray-500 bg-gray-50 p-3 rounded-lg">
            <p className="font-medium mb-1">Compatibilità:</p>
            <p>• Web: Chrome, Firefox, Safari, Edge</p>
            <p>• Mobile: Android Chrome, iOS Safari (limitato)</p>
            <p>• Le notifiche funzionano anche quando il browser è chiuso</p>
          </div>
        </div>
      </div>
    </div>
  );
};