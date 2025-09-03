// Sistema di gestione richieste con limite preventivi
export interface RequestQuoteManager {
  requestId: string;
  quotesReceived: number;
  maxQuotes: number;
  isExpired: boolean;
  professionalIds: string[];
}

export class RequestManager {
  private requests: Map<string, RequestQuoteManager> = new Map();
  private readonly MAX_QUOTES = 4;

  // Inizializza una nuova richiesta
  initializeRequest(requestId: string): RequestQuoteManager {
    const requestManager: RequestQuoteManager = {
      requestId,
      quotesReceived: 0,
      maxQuotes: this.MAX_QUOTES,
      isExpired: false,
      professionalIds: []
    };
    
    this.requests.set(requestId, requestManager);
    return requestManager;
  }

  // Verifica se una richiesta può ricevere altri preventivi
  canReceiveQuote(requestId: string): boolean {
    const request = this.requests.get(requestId);
    if (!request) return false;
    
    return !request.isExpired && request.quotesReceived < request.maxQuotes;
  }

  // Aggiunge un preventivo alla richiesta
  addQuote(requestId: string, professionalId: string): { success: boolean; message: string; remainingSlots: number } {
    const request = this.requests.get(requestId);
    
    if (!request) {
      return { success: false, message: 'Richiesta non trovata', remainingSlots: 0 };
    }

    if (request.isExpired) {
      return { success: false, message: 'Richiesta scaduta - limite preventivi raggiunto', remainingSlots: 0 };
    }

    if (request.quotesReceived >= request.maxQuotes) {
      request.isExpired = true;
      return { success: false, message: 'Limite massimo preventivi raggiunto', remainingSlots: 0 };
    }

    if (request.professionalIds.includes(professionalId)) {
      return { success: false, message: 'Hai già inviato un preventivo per questa richiesta', remainingSlots: request.maxQuotes - request.quotesReceived };
    }

    // Aggiungi il preventivo
    request.quotesReceived++;
    request.professionalIds.push(professionalId);

    // Verifica se ha raggiunto il limite
    if (request.quotesReceived >= request.maxQuotes) {
      request.isExpired = true;
    }

    const remainingSlots = request.maxQuotes - request.quotesReceived;
    
    return {
      success: true,
      message: remainingSlots > 0 
        ? `Preventivo aggiunto! Rimangono ${remainingSlots} slot disponibili.`
        : 'Preventivo aggiunto! Questa richiesta è ora completa.',
      remainingSlots
    };
  }

  // Ottiene lo stato di una richiesta
  getRequestStatus(requestId: string): RequestQuoteManager | null {
    return this.requests.get(requestId) || null;
  }

  // Ottiene tutte le richieste attive (non scadute)
  getActiveRequests(): RequestQuoteManager[] {
    return Array.from(this.requests.values()).filter(req => !req.isExpired);
  }

  // Ottiene tutte le richieste scadute
  getExpiredRequests(): RequestQuoteManager[] {
    return Array.from(this.requests.values()).filter(req => req.isExpired);
  }

  // Rimuove una richiesta dal sistema
  removeRequest(requestId: string): boolean {
    return this.requests.delete(requestId);
  }

  // Statistiche sistema
  getSystemStats(): {
    totalRequests: number;
    activeRequests: number;
    expiredRequests: number;
    totalQuotes: number;
    averageQuotesPerRequest: number;
  } {
    const allRequests = Array.from(this.requests.values());
    const activeRequests = allRequests.filter(req => !req.isExpired);
    const expiredRequests = allRequests.filter(req => req.isExpired);
    const totalQuotes = allRequests.reduce((sum, req) => sum + req.quotesReceived, 0);
    
    return {
      totalRequests: allRequests.length,
      activeRequests: activeRequests.length,
      expiredRequests: expiredRequests.length,
      totalQuotes,
      averageQuotesPerRequest: allRequests.length > 0 ? totalQuotes / allRequests.length : 0
    };
  }
}

// Istanza singleton del manager
export const requestManager = new RequestManager();

// Utility functions
export function formatQuoteStatus(quotesReceived: number, maxQuotes: number): string {
  const remaining = maxQuotes - quotesReceived;
  if (remaining === 0) return 'COMPLETA';
  if (remaining === 1) return `${remaining} slot rimasto`;
  return `${remaining} slot rimasti`;
}

export function getQuoteProgressColor(quotesReceived: number, maxQuotes: number): string {
  const percentage = (quotesReceived / maxQuotes) * 100;
  if (percentage >= 100) return 'text-red-600';
  if (percentage >= 75) return 'text-orange-600';
  if (percentage >= 50) return 'text-yellow-600';
  return 'text-green-600';
}

export function shouldShowUrgencyBadge(quotesReceived: number, maxQuotes: number): boolean {
  return quotesReceived >= maxQuotes - 1; // Mostra quando rimane solo 1 slot
}