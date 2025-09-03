import React, { useState } from 'react';
import AdminLogin from './components/AdminLogin';
import AdminDashboard from './components/AdminDashboard';
import ProfessionalLogin from './components/ProfessionalLogin';
import ProfessionalDashboard from './components/ProfessionalDashboard';
import LoginModal from './components/LoginModal';
import UserDashboard from './components/UserDashboard';
import { Professional, Wallet as WalletType, Transaction } from './types';
import { 
  Search, 
  Menu, 
  X, 
  Star, 
  Users, 
  CheckCircle, 
  Home, 
  Wrench, 
  Palette, 
  Camera, 
  GraduationCap, 
  Heart, 
  Car, 
  Scissors,
  ArrowRight,
  Shield,
  Clock,
  Award,
  Briefcase
} from 'lucide-react';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showAdmin, setShowAdmin] = useState(false);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [showProfessional, setShowProfessional] = useState(false);
  const [isProfessionalLoggedIn, setIsProfessionalLoggedIn] = useState(false);
  const [currentProfessional, setCurrentProfessional] = useState<Professional | null>(null);
  const [loginError, setLoginError] = useState('');
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState<{
    name: string; email: string; phone: string; city: string;
  } | null>(null);

  // Check URL for admin access
  React.useEffect(() => {
    if (window.location.pathname === '/admin' || window.location.hash === '#admin') {
      setShowAdmin(true);
    } else if (window.location.pathname === '/professional' || window.location.hash === '#professional') {
      setShowProfessional(true);
    }
  }, []);

  // Mock professional data
  const mockProfessional: Professional = {
    id: 'prof-1',
    name: 'Marco Fontana',
    email: 'marco.fontana@email.com',
    phone: '+39 333 123 4567',
    type: 'professional',
    services: ['Riparazione Caldaia', 'Impianti Idraulici', 'Manutenzione'],
    location: {
      city: 'Milano',
      province: 'MI'
    },
    verified: true,
    rating: 4.8,
    completedJobs: 127,
    wallet: {
      id: 'wallet-prof-1',
      userId: 'prof-1',
      balance: 45.50,
      currency: 'EUR',
      transactions: [
        {
          id: 'tx-prof-1',
          walletId: 'wallet-prof-1',
          type: 'debit',
          amount: 8.50,
          description: 'Acquisto richiesta: Riparazione Caldaia',
          relatedRequestId: 'req-1',
          createdAt: '2024-01-15T10:45:00Z',
          status: 'completed'
        },
        {
          id: 'tx-prof-2',
          walletId: 'wallet-prof-1',
          type: 'credit',
          amount: 50.00,
          description: 'Ricarica wallet',
          createdAt: '2024-01-14T09:00:00Z',
          status: 'completed'
        }
      ]
    },
    createdAt: '2023-06-15T10:00:00Z'
  };
  const handleAdminLogin = (credentials: { username: string; password: string }) => {
    // Simple authentication - in production use proper authentication
    if (credentials.username.trim() === 'ionutflorea264@yahoo.com' && credentials.password.trim() === 'Affitto2017') {
      setIsAdminLoggedIn(true);
      setLoginError('');
    } else {
      setLoginError('Credenziali non valide. Usa: ionutflorea264@yahoo.com / Affitto2017');
    }
  };

  const handleProfessionalLogin = (credentials: { username: string; password: string }) => {
    if (credentials.username.trim() === 'pro' && credentials.password.trim() === 'pro123') {
      setIsProfessionalLoggedIn(true);
      setCurrentProfessional(mockProfessional);
      setLoginError('');
    } else {
      setLoginError('Credenziali non valide. Usa: pro / pro123');
    }
  };

  const handleUserLogin = (credentials: { email: string; password: string }) => {
    // Mock login - in production use proper authentication
    setCurrentUser({
      name: 'Mario Rossi',
      email: credentials.email,
      phone: '+39 123 456 7890',
      city: 'Milano'
    });
    setIsUserLoggedIn(true);
    setShowLoginModal(false);
  };

  const handleUserRegister = (userData: any) => {
    setCurrentUser({
      name: userData.name,
      email: userData.email,
      phone: userData.phone,
      city: userData.city
    });
    setIsUserLoggedIn(true);
    setShowLoginModal(false);
  };
  const handleAdminLogout = () => {
    setIsAdminLoggedIn(false);
    setShowAdmin(false);
    window.location.hash = '';
  };

  const handleProfessionalLogout = () => {
    setIsProfessionalLoggedIn(false);
    setShowProfessional(false);
    setCurrentProfessional(null);
    window.location.hash = '';
  };

  const handleUserLogout = () => {
    setIsUserLoggedIn(false);
    setCurrentUser(null);
  };
  // Show admin interface
  if (showAdmin) {
    if (!isAdminLoggedIn) {
      return <AdminLogin onLogin={handleAdminLogin} error={loginError} />;
    }
    return <AdminDashboard onLogout={handleAdminLogout} />;
  }

  // Show professional interface
  if (showProfessional) {
    if (!isProfessionalLoggedIn || !currentProfessional) {
      return (
        <ProfessionalLogin 
          onLogin={handleProfessionalLogin} 
          onBack={() => setShowProfessional(false)}
          error={loginError} 
        />
      );
    }
    return <ProfessionalDashboard professional={currentProfessional} onLogout={handleProfessionalLogout} />;
  }

  // Show user dashboard if logged in
  if (isUserLoggedIn && currentUser) {
    return <UserDashboard user={currentUser} onLogout={handleUserLogout} />;
  }

  const categories = [
    { 
      name: 'Giardino', 
      icon: Home, 
      color: 'bg-green-100 text-green-600',
      image: 'https://images.pexels.com/photos/1301856/pexels-photo-1301856.jpeg?auto=compress&cs=tinysrgb&w=400',
      description: 'Giardinaggio, potatura, manutenzione verde e progettazione giardini'
    },
    { 
      name: 'Pulizie', 
      icon: Home, 
      color: 'bg-blue-100 text-blue-600',
      image: 'https://images.pexels.com/photos/4239146/pexels-photo-4239146.jpeg?auto=compress&cs=tinysrgb&w=400',
      description: 'Pulizie domestiche, uffici, condomini e servizi di sanificazione'
    },
    { 
      name: 'Ristrutturazione', 
      icon: Home, 
      color: 'bg-orange-100 text-orange-600',
      image: 'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=400',
      description: 'Ristrutturazioni complete, lavori edili e manutenzione casa'
    },
    { 
      name: 'Riparazioni', 
      icon: Wrench, 
      color: 'bg-red-100 text-red-600',
      image: 'https://images.pexels.com/photos/1249611/pexels-photo-1249611.jpeg?auto=compress&cs=tinysrgb&w=400',
      description: 'Elettricisti, idraulici, tecnici caldaie e riparazioni varie'
    },
    { 
      name: 'Design', 
      icon: Palette, 
      color: 'bg-purple-100 text-purple-600',
      image: 'https://images.pexels.com/photos/1779487/pexels-photo-1779487.jpeg?auto=compress&cs=tinysrgb&w=400',
      description: 'Interior design, grafica, web design e consulenza creativa'
    },
    { 
      name: 'Fotografia', 
      icon: Camera, 
      color: 'bg-orange-100 text-orange-600',
      image: 'https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg?auto=compress&cs=tinysrgb&w=400',
      description: 'Matrimoni, eventi, ritratti e servizi fotografici professionali'
    },
    { 
      name: 'Lezioni', 
      icon: GraduationCap, 
      color: 'bg-indigo-100 text-indigo-600',
      image: 'https://images.pexels.com/photos/5212345/pexels-photo-5212345.jpeg?auto=compress&cs=tinysrgb&w=400',
      description: 'Ripetizioni, corsi di lingua, musica e formazione professionale'
    },
    { 
      name: 'Benessere', 
      icon: Heart, 
      color: 'bg-pink-100 text-pink-600',
      image: 'https://images.pexels.com/photos/3757942/pexels-photo-3757942.jpeg?auto=compress&cs=tinysrgb&w=400',
      description: 'Massaggi, personal trainer, nutrizionisti e servizi wellness'
    },
    { 
      name: 'Auto e Moto', 
      icon: Car, 
      color: 'bg-slate-100 text-slate-600',
      image: 'https://images.pexels.com/photos/3806288/pexels-photo-3806288.jpeg?auto=compress&cs=tinysrgb&w=400',
      description: 'Meccanici, carrozzieri, gommisti e servizi automotive'
    },
    { 
      name: 'Beauty', 
      icon: Scissors, 
      color: 'bg-emerald-100 text-emerald-600',
      image: 'https://images.pexels.com/photos/3993449/pexels-photo-3993449.jpeg?auto=compress&cs=tinysrgb&w=400',
      description: 'Parrucchieri, estetiste, nail art e trattamenti di bellezza'
    },
    { 
      name: 'Montaggio Mobili', 
      icon: Wrench, 
      color: 'bg-amber-100 text-amber-600',
      image: 'https://images.pexels.com/photos/6585751/pexels-photo-6585751.jpeg?auto=compress&cs=tinysrgb&w=400',
      description: 'Montaggio mobili IKEA, armadi, cucine e assemblaggio complementi d\'arredo'
    },
  ];

  const testimonials = [
    {
      name: 'Marco Rossi',
      service: 'Ristrutturazione Bagno',
      rating: 5,
      text: 'Ho trovato il professionista perfetto per ristrutturare il mio bagno. Servizio eccellente e prezzo competitivo!',
      location: 'Milano'
    },
    {
      name: 'Laura Bianchi',
      service: 'Lezioni di Inglese',
      rating: 5,
      text: 'Grazie a questa piattaforma ho trovato un\'insegnante fantastica. Molto professionale e disponibile.',
      location: 'Roma'
    },
    {
      name: 'Giuseppe Verdi',
      service: 'Riparazione Caldaia',
      rating: 5,
      text: 'Servizio rapidissimo! In poche ore avevo già 3 preventivi e ho risolto il problema della caldaia.',
      location: 'Napoli'
    },
    {
      name: 'Francesca Neri',
      service: 'Wedding Photography',
      rating: 5,
      text: 'Fotografo eccezionale per il mio matrimonio! Foto stupende e servizio impeccabile. Consigliatissimo!',
      location: 'Firenze'
    },
    {
      name: 'Alessandro Conti',
      service: 'Impianto Elettrico',
      rating: 5,
      text: 'Elettricista molto competente, ha risolto tutti i problemi dell\'impianto in tempi record. Prezzi onesti.',
      location: 'Torino'
    },
    {
      name: 'Giulia Martini',
      service: 'Personal Trainer',
      rating: 5,
      text: 'Ho trovato la personal trainer perfetta! Programmi personalizzati e risultati fantastici in pochi mesi.',
      location: 'Bologna'
    },
    {
      name: 'Roberto Ferrari',
      service: 'Giardinaggio',
      rating: 5,
      text: 'Il mio giardino non è mai stato così bello! Lavoro professionale e cura dei dettagli eccezionale.',
      location: 'Venezia'
    },
    {
      name: 'Chiara Lombardi',
      service: 'Pulizie Casa',
      rating: 5,
      text: 'Servizio di pulizie affidabile e accurato. Personale gentile e casa sempre perfetta!',
      location: 'Genova'
    },
    {
      name: 'Davide Ricci',
      service: 'Riparazione Auto',
      rating: 5,
      text: 'Meccanico onesto e competente. Ha riparato la mia auto spendendo molto meno del previsto.',
      location: 'Palermo'
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-blue-600">ServiziFacili</h1>
            </div>
            
            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-8">
              <a href="#" className="text-gray-600 hover:text-blue-500 transition-colors">Come funziona</a>
              <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">Categorie</a>
              <a href="#" className="text-gray-600 hover:text-blue-700 transition-colors">Per Professionisti</a>
            </nav>

            <div className="hidden md:flex items-center space-x-4">
              <button 
                onClick={() => setShowLoginModal(true)}
                className="text-gray-600 hover:text-blue-600 transition-colors"
              >Accedi</button>
              <button 
                onClick={() => setShowLoginModal(true)}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                Registrati
              </button>
              <button 
                onClick={() => setShowProfessional(true)}
                className="flex items-center space-x-1 text-gray-600 hover:text-blue-600 transition-colors"
              >
                <Briefcase className="h-4 w-4" />
                <span>Pro</span>
              </button>
              <button 
                onClick={() => setShowAdmin(true)}
                className="text-xs text-gray-400 hover:text-gray-600 transition-colors"
              >
                Admin
              </button>
            </div>

            {/* Mobile menu button */}
            <button 
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-100">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <a href="#" className="block px-3 py-2 text-gray-600">Come funziona</a>
              <a href="#" className="block px-3 py-2 text-gray-600">Categorie</a>
              <a href="#" className="block px-3 py-2 text-gray-600">Per Professionisti</a>
              <button onClick={() => setShowLoginModal(true)} className="block px-3 py-2 text-gray-600 w-full text-left">Accedi</button>
              <button onClick={() => setShowLoginModal(true)} className="block px-3 py-2 bg-blue-600 text-white rounded-lg mx-3 w-full text-left">Registrati</button>
              <button 
                onClick={() => setShowProfessional(true)}
                className="block px-3 py-2 text-gray-600 w-full text-left"
              >
                Dashboard Pro
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Login Modal */}
      <LoginModal 
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        onLogin={handleUserLogin}
        onRegister={handleUserRegister}
      />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-indigo-100 py-20 relative overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 opacity-95">
          <img 
            src="https://images.pexels.com/photos/5691659/pexels-photo-5691659.jpeg?auto=compress&cs=tinysrgb&w=1200"
            alt="Professionisti che offrono servizi"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50/80 to-indigo-100/80"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Trova il <span className="text-blue-600">professionista</span><br />
            perfetto per te
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Confronta preventivi gratuiti dai migliori professionisti della tua zona in pochi minuti
          </p>

          {/* Search Form */}
          <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-lg p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <input 
                  type="text"
                  placeholder="Che servizio ti serve?"
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                />
              </div>
              <div className="flex-1">
                <input 
                  type="text"
                  placeholder="Dove?"
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                />
              </div>
              <button className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 min-w-[140px]">
                <Search className="h-5 w-5" />
                Cerca
              </button>
            </div>
          </div>

          <div className="mt-8 flex flex-wrap justify-center gap-4 text-sm text-gray-600">
            <span className="bg-white px-4 py-2 rounded-full shadow-sm">✓ Preventivi gratuiti</span>
            <span className="bg-white px-4 py-2 rounded-full shadow-sm">✓ Professionisti verificati</span>
            <span className="bg-white px-4 py-2 rounded-full shadow-sm">✓ Senza impegno</span>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Esplora le nostre categorie
            </h3>
            <p className="text-xl text-gray-600">
              Trova il servizio che fa per te tra centinaia di categorie
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {categories.map((category, index) => {
              const IconComponent = category.icon;
              return (
                <div 
                  key={index}
                  className="group bg-white rounded-xl border border-gray-100 hover:border-purple-200 hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden"
                >
                  <div className="relative h-32 overflow-hidden">
                    <img 
                      src={category.image} 
                      alt={category.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                    <div className={`absolute top-3 left-3 w-10 h-10 ${category.color} rounded-lg flex items-center justify-center`}>
                      <IconComponent className="h-5 w-5" />
                    </div>
                  </div>
                  <div className="p-4">
                    <h4 className="font-semibold text-gray-900 group-hover:text-purple-600 transition-colors mb-2">
                      {category.name}
                    </h4>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {category.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Come funziona
            </h3>
            <p className="text-xl text-gray-600">
              Tre semplici passaggi per trovare il professionista perfetto
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6">
                1
              </div>
              <h4 className="text-xl font-semibold text-gray-900 mb-4">Descrivi il tuo progetto</h4>
              <p className="text-gray-600">
                Raccontaci di cosa hai bisogno e ricevi preventivi personalizzati dai migliori professionisti
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-green-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6">
                2
              </div>
              <h4 className="text-xl font-semibold text-gray-900 mb-4">Confronta i preventivi</h4>
              <p className="text-gray-600">
                Ricevi fino a 5 preventivi gratuiti e confronta profili, recensioni e prezzi
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-orange-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6">
                3
              </div>
              <h4 className="text-xl font-semibold text-gray-900 mb-4">Scegli il migliore</h4>
              <p className="text-gray-600">
                Seleziona il professionista che preferisci e inizia il tuo progetto in tutta sicurezza
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 text-center text-white">
            <div>
              <div className="text-4xl font-bold mb-2">150K+</div>
              <div className="text-white/80">Professionisti attivi</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">2M+</div>
              <div className="text-white/80">Progetti completati</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">4.8</div>
              <div className="text-white/80">Valutazione media</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">500+</div>
              <div className="text-white/80">Categorie di servizi</div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Cosa dicono i nostri clienti
            </h3>
            <p className="text-xl text-gray-600">
              Migliaia di clienti soddisfatti ogni giorno
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.slice(0, 6).map((testimonial, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                  <span className="ml-2 text-sm text-gray-500">{testimonial.rating}.0</span>
                </div>
                <p className="text-gray-700 mb-4 italic leading-relaxed">"{testimonial.text}"</p>
                <div>
                  <div className="font-semibold text-gray-900 mb-1">{testimonial.name}</div>
                  <div className="text-sm text-gray-600 mb-1">{testimonial.service}</div>
                  <div className="text-xs text-gray-500 flex items-center">
                    <span className="w-2 h-2 bg-green-400 rounded-full mr-2"></span>
                    {testimonial.location}
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Show more testimonials button */}
          <div className="text-center mt-12">
            <button className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-3 rounded-lg font-semibold hover:from-purple-700 hover:to-pink-700 transition-all duration-300 shadow-lg hover:shadow-xl">
              Vedi tutte le recensioni ({testimonials.length})
            </button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-indigo-700">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Sei un professionista?
          </h3>
          <p className="text-xl text-blue-100 mb-8">
            Unisciti alla nostra rete di professionisti e fai crescere la tua attività
          </p>
          <button className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-50 transition-colors inline-flex items-center gap-2">
            <span onClick={() => setShowProfessional(true)}>Accedi come professionista</span>
            <ArrowRight className="h-5 w-5" />
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h4 className="text-2xl font-bold text-white mb-4">ServiziFacili</h4>
              <p className="text-gray-400 mb-4">
                La piattaforma leader in Italia per trovare professionisti qualificati
              </p>
              <div className="flex items-center gap-4">
                <Shield className="h-5 w-5 text-green-400" />
                <span className="text-sm text-gray-400">Professionisti verificati</span>
              </div>
            </div>

            <div>
              <h5 className="font-semibold mb-4">Servizi</h5>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Casa e Giardino</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Riparazioni</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Design</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Tutti i servizi</a></li>
              </ul>
            </div>

            <div>
              <h5 className="font-semibold mb-4">Supporto</h5>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Centro assistenza</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Come funziona</a></li>
                <li><a href="#" className="hover:text-white transition-colors">FAQ</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contattaci</a></li>
              </ul>
            </div>

            <div>
              <h5 className="font-semibold mb-4">Azienda</h5>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Chi siamo</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Carriere</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Privacy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Termini di servizio</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400">© 2013 ServiziFacili. Tutti i diritti riservati.</p>
            <div className="flex items-center gap-6 mt-4 md:mt-0">
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <Clock className="h-4 w-4" />
                Risposta in 24h/7
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <Award className="h-4 w-4" />
                Servizi di qualità
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;