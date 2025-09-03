import React, { useState, useEffect } from 'react';
import { 
  Search, 
  MapPin, 
  Star, 
  Users, 
  CheckCircle, 
  ArrowRight, 
  Menu, 
  X, 
  Phone, 
  Mail,
  MessageCircle,
  User,
  Briefcase,
  Shield
} from 'lucide-react';

// Components
import ServiceRequestForm from './components/ServiceRequestForm';
import SearchResults from './components/SearchResults';
import LoginModal from './components/LoginModal';
import UserDashboard from './components/UserDashboard';
import ProfessionalDashboard from './components/ProfessionalDashboard';
import AdminDashboard from './components/AdminDashboard';
import ProfessionalLogin from './components/ProfessionalLogin';
import AdminLogin from './components/AdminLogin';
import ReviewsSection from './components/ReviewsSection';
import TrustBadges from './components/TrustBadges';
import ChatWidget from './components/ChatWidget';
import WhatsAppBanner from './components/WhatsAppBanner';
import CookieBanner from './components/CookieBanner';
import NotificationSystem from './components/NotificationSystem';
import ContactForm from './components/ContactForm';
import SEOHead from './components/SEOHead';
import HowItWorks from './components/HowItWorks';
import ServiceCatalog from './components/ServiceCatalog';
import PrivacyPolicy from './components/PrivacyPolicy';
import CookiePolicy from './components/CookiePolicy';
import TermsOfService from './components/TermsOfService';
import LegalInfo from './components/LegalInfo';
import FAQ from './components/FAQ';

// Types
import { User as UserType, Professional, ServiceRequest, Transaction } from './types';
import { Service } from './data/services';

// Utils
import { formatCurrency } from './utils/pricing';

interface Notification {
  id: string;
  type: 'success' | 'error' | 'info' | 'warning';
  title: string;
  message: string;
  duration?: number;
}

function App() {
  // State management
  const [currentView, setCurrentView] = useState<'home' | 'professional-login' | 'admin-login' | 'how-it-works' | 'services' | 'privacy' | 'cookies' | 'terms' | 'legal' | 'faq'>('home');
  const [adminView, setAdminView] = useState<'login' | 'dashboard'>('login');
  const [showServiceForm, setShowServiceForm] = useState(false);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showContactForm, setShowContactForm] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [location, setLocation] = useState('');
  const [currentUser, setCurrentUser] = useState<UserType | Professional | null>(null);
  const [notifications, setNotifications] = useState<Notification[]>([]);

  // Check for admin route on load
  useEffect(() => {
    const path = window.location.pathname;
    if (path === '/admin') {
      setCurrentView('admin-login');
      setAdminView('login');
    }
  }, []);

  // Mock professional data
  const mockProfessional: Professional = {
    id: 'prof-1',
    name: 'Marco Fontana',
    email: 'marco.fontana@email.com',
    phone: '+39 347 123 4567',
    type: 'professional',
    createdAt: '2024-01-01T00:00:00Z',
    wallet: {
      id: 'wallet-1',
      userId: 'prof-1',
      balance: 45.50,
      currency: 'EUR',
      transactions: [
        {
          id: 'tx-1',
          walletId: 'wallet-1',
          type: 'debit',
          amount: 8.50,
          description: 'Acquisto richiesta: Riparazione Caldaia',
          relatedRequestId: 'req-1',
          createdAt: '2024-01-15T10:30:00Z',
          status: 'completed'
        },
        {
          id: 'tx-2',
          walletId: 'wallet-1',
          type: 'credit',
          amount: 50.00,
          description: 'Ricarica wallet',
          createdAt: '2024-01-14T15:20:00Z',
          status: 'completed'
        }
      ]
    },
    services: ['Riparazione Caldaie', 'Manutenzione Impianti', 'Assistenza Tecnica'],
    location: {
      city: 'Milano',
      province: 'MI'
    },
    verified: true,
    rating: 4.8,
    completedJobs: 127,
    kycStatus: 'approved',
    kycApprovedAt: '2024-01-01T00:00:00Z'
  };

  // Cookie management
  const handleCookieAcceptAll = () => {
    console.log('All cookies accepted');
  };

  const handleCookieRejectAll = () => {
    console.log('All cookies rejected');
  };

  const handleCookieCustomize = () => {
    console.log('Cookie preferences customized');
  };

  // Notification management
  const addNotification = (notification: Omit<Notification, 'id'>) => {
    const id = Date.now().toString();
    setNotifications(prev => [...prev, { ...notification, id }]);
  };

  const removeNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  // Authentication handlers
  const handleLogin = (credentials: { email: string; password: string }) => {
    // Mock login - in produzione verificare con backend
    const mockUser: UserType = {
      id: 'user-1',
      name: 'Mario Rossi',
      email: credentials.email,
      phone: '+39 123 456 7890',
      type: 'client',
      createdAt: new Date().toISOString()
    };
    
    setCurrentUser(mockUser);
    setShowLoginModal(false);
    
    // Notifica immediata di login
    setTimeout(() => {
      addNotification({
        type: 'success',
        title: 'Login effettuato con successo!',
        message: `Benvenuto ${mockUser.name}! Ora puoi accedere a tutte le funzionalità.`,
        duration: 4000
      });
    }, 100);
  };

  const handleRegister = (userData: any) => {
    // Mock registration
    const newUser: UserType = {
      id: `user-${Date.now()}`,
      name: userData.name,
      email: userData.email,
      phone: userData.phone,
      type: 'client',
      createdAt: new Date().toISOString()
    };
    
    setCurrentUser(newUser);
    setShowLoginModal(false);
    
    // Notifica immediata di registrazione
    setTimeout(() => {
      addNotification({
        type: 'success',
        title: 'Registrazione completata!',
        message: `Benvenuto ${newUser.name}! Il tuo account è stato creato con successo.`,
        duration: 5000
      });
    }, 100);
  };

  const handleProfessionalLogin = (credentials: { username: string; password: string }) => {
    // Demo credentials: pro / pro123
    if (credentials.username === 'pro' && credentials.password === 'pro123') {
      setCurrentUser(mockProfessional);
      setCurrentView('home');
      
      // Notifica immediata login professionista
      setTimeout(() => {
        addNotification({
          type: 'success',
          title: 'Accesso Professionista Effettuato!',
          message: `Benvenuto ${mockProfessional.name}! Dashboard professionista caricata.`,
          duration: 4000
        });
      }, 100);
    } else {
      // Notifica immediata errore login
      setTimeout(() => {
        addNotification({
          type: 'error',
          title: 'Login Fallito!',
          message: 'Credenziali non valide. Usa: pro / pro123',
          duration: 5000
        });
      }, 100);
    }
  };

  const handleAdminLogin = (credentials: { username: string; password: string }) => {
    // Demo credentials from AdminLogin component
    if (credentials.username === 'ionutflorea264@yahoo.com' && credentials.password === 'Affitto2017') {
      const adminUser: UserType = {
        id: 'admin-1',
        name: 'Amministratore',
        email: credentials.username,
        phone: '+39 389 633 5889',
        type: 'admin',
        createdAt: new Date().toISOString()
      };
      
      setCurrentUser(adminUser);
      setAdminView('dashboard');
      
      // Notifica immediata login admin
      setTimeout(() => {
        addNotification({
          type: 'success',
          title: 'Accesso Amministratore Effettuato!',
          message: 'Benvenuto nel pannello di controllo amministratore.',
          duration: 4000
        });
      }, 100);
    } else {
      // Notifica immediata errore admin
      setTimeout(() => {
        addNotification({
          type: 'error',
          title: 'Accesso Negato!',
          message: 'Credenziali amministratore non valide.',
          duration: 5000
        });
      }, 100);
    }
  };

  const handleLogout = () => {
    const userName = currentUser?.name || 'Utente';
    
    setCurrentUser(null);
    setCurrentView('home');
    
    // Notifica immediata di logout
    setTimeout(() => {
      addNotification({
        type: 'info',
        title: 'Logout Effettuato!',
        message: `Arrivederci ${userName}! Torna presto a trovarci.`,
        duration: 4000
      });
    }, 100);
    
    if (window.location.pathname === '/admin' || window.location.hash === '#/admin') {
      window.location.href = '/';
    }
  };

  // Service request handler
  const handleServiceRequest = (requestData: any) => {
    console.log('Service request submitted:', requestData);
    
    // Notifica immediata richiesta servizio
    setTimeout(() => {
      addNotification({
        type: 'success',
        title: 'Richiesta Inviata con Successo!',
        message: 'Riceverai i primi preventivi entro poche ore. Controlla la tua email!',
        duration: 6000
      });
    }, 100);
  };

  // Search handler
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim() && location.trim()) {
      setShowSearchResults(true);
    }
  };

  // Render different views based on current user and view state
  if (currentUser?.type === 'client') {
    return <UserDashboard user={currentUser} onLogout={handleLogout} />;
  }

  if (currentUser?.type === 'professional') {
    return <ProfessionalDashboard professional={currentUser as Professional} onLogout={handleLogout} />;
  }

  if (currentUser?.type === 'admin') {
    return <AdminDashboard onLogout={handleLogout} />;
  }

  if (currentView === 'professional-login') {
    return (
      <ProfessionalLogin
        onLogin={handleProfessionalLogin}
        onBack={() => setCurrentView('home')}
      />
    );
  }

  if (currentView === 'admin-login') {
    return (
      <AdminLogin
        onLogin={handleAdminLogin}
        onBack={window.location.pathname === '/admin' ? undefined : () => setCurrentView('home')}
      />
    );
  }

  if (currentView === 'how-it-works') {
    return <HowItWorks onBack={() => setCurrentView('home')} />;
  }

  if (currentView === 'services') {
    return (
      <ServiceCatalog
        onBack={() => setCurrentView('home')}
        onServiceSelect={(service: Service) => {
          setSearchQuery(service.name);
          setShowServiceForm(true);
          setCurrentView('home');
        }}
      />
    );
  }

  if (currentView === 'privacy') {
    return <PrivacyPolicy onBack={() => setCurrentView('home')} />;
  }

  if (currentView === 'cookies') {
    return <CookiePolicy onBack={() => setCurrentView('home')} />;
  }

  if (currentView === 'terms') {
    return <TermsOfService onBack={() => setCurrentView('home')} />;
  }

  if (currentView === 'legal') {
    return <LegalInfo onBack={() => setCurrentView('home')} />;
  }

  if (currentView === 'faq') {
    return <FAQ onBack={() => setCurrentView('home')} />;
  }

  // Main homepage
  return (
    <div className="min-h-screen bg-white">
      <SEOHead />
      
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                ServiziFacili
              </h1>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <button
                onClick={() => setCurrentView('how-it-works')}
                className="text-gray-600 hover:text-gray-900"
              >
                Come Funziona
              </button>
              <button
                onClick={() => setCurrentView('services')}
                className="text-gray-600 hover:text-gray-900"
              >
                Servizi
              </button>
              <button
                onClick={() => setCurrentView('faq')}
                className="text-gray-600 hover:text-gray-900"
              >
                FAQ
              </button>
              <button
                onClick={() => setShowContactForm(true)}
                className="text-gray-600 hover:text-gray-900"
              >
                Contatti
              </button>
              <button
                onClick={() => setCurrentView('professional-login')}
                className="flex items-center space-x-1 text-blue-600 hover:text-blue-700"
              >
                <Briefcase className="h-4 w-4" />
                <span>Professionisti</span>
              </button>
              <button
                onClick={() => setShowLoginModal(true)}
                className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2 rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-200"
              >
                Accedi
              </button>
            </nav>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2"
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {isMobileMenuOpen && (
            <div className="md:hidden py-4 border-t border-gray-200">
              <div className="flex flex-col space-y-4">
                <button
                  onClick={() => {
                    setCurrentView('how-it-works');
                    setIsMobileMenuOpen(false);
                  }}
                  className="text-left text-gray-600 hover:text-gray-900"
                >
                  Come Funziona
                </button>
                <button
                  onClick={() => {
                    setCurrentView('services');
                    setIsMobileMenuOpen(false);
                  }}
                  className="text-left text-gray-600 hover:text-gray-900"
                >
                  Servizi
                </button>
                <button
                  onClick={() => {
                    setCurrentView('faq');
                    setIsMobileMenuOpen(false);
                  }}
                  className="text-left text-gray-600 hover:text-gray-900"
                >
                  FAQ
                </button>
                <button
                  onClick={() => {
                    setShowContactForm(true);
                    setIsMobileMenuOpen(false);
                  }}
                  className="text-left text-gray-600 hover:text-gray-900"
                >
                  Contatti
                </button>
                <button
                  onClick={() => {
                    setCurrentView('professional-login');
                    setIsMobileMenuOpen(false);
                  }}
                  className="text-left text-blue-600 hover:text-blue-700"
                >
                  Area Professionisti
                </button>
                <button
                  onClick={() => {
                    setShowLoginModal(true);
                    setIsMobileMenuOpen(false);
                  }}
                  className="text-left bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2 rounded-lg w-fit"
                >
                  Accedi
                </button>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-purple-50 to-pink-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Trova il <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Professionista</span> Perfetto per Te
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Confronta preventivi gratuiti dai migliori professionisti della tua zona. 
              Oltre 87.500 professionisti verificati per casa, riparazioni, design e molto altro.
            </p>
            
            {/* Search Form */}
            <form onSubmit={handleSearch} className="max-w-4xl mx-auto">
              <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="relative">
                    <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Che servizio ti serve?"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none text-lg"
                    />
                  </div>
                  <div className="relative">
                    <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Dove?"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none text-lg"
                    />
                  </div>
                  <button
                    type="submit"
                    className="bg-gradient-to-r from-purple-600 to-pink-600 text-white py-4 px-8 rounded-xl font-semibold text-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-200 flex items-center justify-center space-x-2"
                  >
                    <Search className="h-5 w-5" />
                    <span>Cerca</span>
                  </button>
                </div>
                
                <div className="mt-6 text-center">
                  <button
                    onClick={() => setShowServiceForm(true)}
                    className="text-purple-600 hover:text-purple-700 font-medium flex items-center space-x-2 mx-auto"
                  >
                    <span>Oppure richiedi preventivi gratuiti</span>
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </form>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-purple-600 mb-2">87.500+</div>
              <div className="text-gray-600">Professionisti</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-pink-600 mb-2">12.847</div>
              <div className="text-gray-600">Clienti Soddisfatti</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-purple-600 mb-2">4.8</div>
              <div className="text-gray-600">Rating Medio</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-pink-600 mb-2">24h</div>
              <div className="text-gray-600">Tempo Risposta</div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Servizi Più Richiesti
            </h2>
            <p className="text-xl text-gray-600">
              Trova il professionista giusto per ogni esigenza
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-6">
            {[
              { name: 'Idraulico', icon: '🔧', color: 'bg-blue-100 text-blue-600', category: 'riparazioni' },
              { name: 'Elettricista', icon: '⚡', color: 'bg-yellow-100 text-yellow-600', category: 'riparazioni' },
              { name: 'Imbianchino', icon: '🎨', color: 'bg-green-100 text-green-600', category: 'casa-giardino' },
              { name: 'Giardiniere', icon: '🌱', color: 'bg-emerald-100 text-emerald-600', category: 'casa-giardino' },
              { name: 'Pulizie', icon: '🧽', color: 'bg-purple-100 text-purple-600', category: 'casa-giardino' },
              { name: 'Fotografo', icon: '📸', color: 'bg-pink-100 text-pink-600', category: 'fotografia' },
              { name: 'Personal Trainer', icon: '💪', color: 'bg-red-100 text-red-600', category: 'benessere' },
              { name: 'Tutti i Servizi', icon: '🔍', color: 'bg-gray-100 text-gray-600', category: 'all' }
            ].map((service, index) => (
              <div
                key={index}
                className="text-center p-6 rounded-xl hover:shadow-lg transition-all duration-300 cursor-pointer group"
                onClick={() => {
                  if (service.category === 'all') {
                    setCurrentView('services');
                  } else {
                    setSearchQuery(service.name);
                    setShowServiceForm(true);
                  }
                }}
              >
                <div className={`w-16 h-16 ${service.color} rounded-full flex items-center justify-center text-2xl mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  {service.icon}
                </div>
                <h3 className="font-semibold text-gray-900 group-hover:text-purple-600 transition-colors">
                  {service.name}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <TrustBadges />

      {/* Reviews Section */}
      <ReviewsSection />

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-purple-600 to-pink-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Pronto a Trovare il Tuo Professionista?
          </h2>
          <p className="text-xl text-purple-100 mb-8 max-w-2xl mx-auto">
            Ricevi preventivi gratuiti in pochi minuti. Nessun impegno, massima qualità.
          </p>
          <button
            onClick={() => setShowServiceForm(true)}
            className="bg-white text-purple-600 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-gray-100 transition-colors inline-flex items-center space-x-2"
          >
            <span>Richiedi Preventivi Gratuiti</span>
            <ArrowRight className="h-5 w-5" />
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-4">
                ServiziFacili
              </h3>
              <p className="text-gray-400 mb-4">
                La piattaforma italiana per trovare professionisti qualificati nella tua zona.
              </p>
              <div className="flex space-x-4">
                <a href="tel:+393896335889" className="text-gray-400 hover:text-white">
                  <Phone className="h-5 w-5" />
                </a>
                <a href="mailto:ionutflorerea264@yahoo.com" className="text-gray-400 hover:text-white">
                  <Mail className="h-5 w-5" />
                </a>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Servizi</h4>
              <ul className="space-y-2 text-gray-400">
               <li>
                 <button 
                   onClick={() => setCurrentView('services')}
                   className="hover:text-white"
                 >
                   Tutti i Servizi
                 </button>
               </li>
               <li><button className="hover:text-white">Casa e Giardino</button></li>
               <li><button className="hover:text-white">Riparazioni</button></li>
               <li><button className="hover:text-white">Design</button></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Azienda</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <button 
                    onClick={() => setCurrentView('how-it-works')}
                    className="hover:text-white"
                  >
                    Come Funziona
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => setCurrentView('faq')}
                    className="hover:text-white"
                  >
                    FAQ
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => setShowContactForm(true)}
                    className="hover:text-white"
                  >
                    Contatti
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => setCurrentView('legal')}
                    className="hover:text-white"
                  >
                    Info Legali
                  </button>
                </li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Legale</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <button 
                    onClick={() => setCurrentView('privacy')}
                    className="hover:text-white"
                  >
                    Privacy Policy
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => setCurrentView('cookies')}
                    className="hover:text-white"
                  >
                    Cookie Policy
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => setCurrentView('terms')}
                    className="hover:text-white"
                  >
                    Termini di Servizio
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => setCurrentView('admin-login')}
                    className="hover:text-white text-xs opacity-50"
                  >
                    Admin
                  </button>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; 2024 ServiziFacili. Tutti i diritti riservati.</p>
          </div>
        </div>
      </footer>

      {/* Modals and Components */}
      <ServiceRequestForm
        isOpen={showServiceForm}
        onClose={() => setShowServiceForm(false)}
        onSubmit={handleServiceRequest}
      />

      <SearchResults
        isOpen={showSearchResults}
        onClose={() => setShowSearchResults(false)}
        searchQuery={searchQuery}
        location={location}
      />

      <LoginModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        onLogin={handleLogin}
        onRegister={handleRegister}
      />

      {showContactForm && (
        <ContactForm onClose={() => setShowContactForm(false)} />
      )}

      <ChatWidget
        isOpen={isChatOpen}
        onToggle={() => setIsChatOpen(!isChatOpen)}
      />

      <WhatsAppBanner phoneNumber="+393896335889" />

      <CookieBanner
        onAcceptAll={handleCookieAcceptAll}
        onRejectAll={handleCookieRejectAll}
        onCustomize={handleCookieCustomize}
      />

      <NotificationSystem
        notifications={notifications}
        onRemove={removeNotification}
      />
    </div>
  );
}

export default App;