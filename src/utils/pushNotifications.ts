// Push Notifications Service
export class PushNotificationService {
  private static instance: PushNotificationService;
  private registration: ServiceWorkerRegistration | null = null;
  private subscription: PushSubscription | null = null;

  private constructor() {}

  static getInstance(): PushNotificationService {
    if (!PushNotificationService.instance) {
      PushNotificationService.instance = new PushNotificationService();
    }
    return PushNotificationService.instance;
  }

  // Inizializza il service worker e richiede permessi
  async initialize(): Promise<boolean> {
    try {
      // Verifica supporto browser
      if (!('serviceWorker' in navigator) || !('PushManager' in window)) {
        console.warn('Push notifications non supportate');
        return false;
      }

      // Registra service worker
      this.registration = await navigator.serviceWorker.register('/sw.js');
      console.log('Service Worker registrato:', this.registration);

      // Richiedi permessi notifiche
      const permission = await this.requestPermission();
      if (permission !== 'granted') {
        console.warn('Permessi notifiche negati');
        return false;
      }

      // Sottoscrivi alle push notifications
      await this.subscribe();
      return true;
    } catch (error) {
      console.error('Errore inizializzazione push notifications:', error);
      return false;
    }
  }

  // Richiede permessi per le notifiche
  private async requestPermission(): Promise<NotificationPermission> {
    if ('Notification' in window) {
      return await Notification.requestPermission();
    }
    return 'denied';
  }

  // Sottoscrive alle push notifications
  private async subscribe(): Promise<void> {
    if (!this.registration) return;

    try {
      // VAPID public key (in produzione dovrebbe essere configurabile)
      const vapidPublicKey = 'BEl62iUYgUivxIkv69yViEuiBIa40HI8YlOu_7YmFBVJcp4621MpJwpG7nRAGxOOQjXXXXXXXXXXXXXXXXXXXX';
      
      this.subscription = await this.registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: this.urlBase64ToUint8Array(vapidPublicKey)
      });

      console.log('Push subscription:', this.subscription);
      
      // Invia subscription al server (simulato)
      await this.sendSubscriptionToServer(this.subscription);
    } catch (error) {
      console.error('Errore sottoscrizione push:', error);
    }
  }

  // Converte VAPID key
  private urlBase64ToUint8Array(base64String: string): Uint8Array {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
      .replace(/-/g, '+')
      .replace(/_/g, '/');

    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
  }

  // Invia subscription al server
  private async sendSubscriptionToServer(subscription: PushSubscription): Promise<void> {
    // In produzione, inviare al backend
    console.log('Subscription inviata al server:', subscription);
    
    // Simula invio al server
    localStorage.setItem('pushSubscription', JSON.stringify(subscription));
  }

  // Mostra notifica locale
  async showLocalNotification(title: string, options: NotificationOptions = {}): Promise<void> {
    if ('Notification' in window && Notification.permission === 'granted') {
      new Notification(title, {
        icon: '/favicon.ico',
        badge: '/favicon.ico',
        ...options
      });
    }
  }

  // Simula notifica push per nuova opportunità
  async simulatePushNotification(opportunity: any): Promise<void> {
    const title = '🚀 Nuova Opportunità Disponibile!';
    const options: NotificationOptions = {
      body: `${opportunity.title} - ${opportunity.location}\nBudget: €${opportunity.budget}`,
      icon: '/favicon.ico',
      badge: '/favicon.ico',
      tag: `opportunity-${opportunity.id}`,
      requireInteraction: true,
      actions: [
        {
          action: 'view',
          title: 'Visualizza',
          icon: '/favicon.ico'
        },
        {
          action: 'dismiss',
          title: 'Ignora'
        }
      ],
      data: {
        opportunityId: opportunity.id,
        url: `/opportunities/${opportunity.id}`
      }
    };

    await this.showLocalNotification(title, options);
  }

  // Verifica stato permessi
  getPermissionStatus(): NotificationPermission {
    return 'Notification' in window ? Notification.permission : 'denied';
  }

  // Disabilita notifiche
  async unsubscribe(): Promise<void> {
    if (this.subscription) {
      await this.subscription.unsubscribe();
      this.subscription = null;
      localStorage.removeItem('pushSubscription');
    }
  }
}

// Export singleton instance
export const pushNotificationService = PushNotificationService.getInstance();