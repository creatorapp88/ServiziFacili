export interface ServiceCategory {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  image: string;
  services: Service[];
}

export interface Service {
  id: string;
  name: string;
  description: string;
  averagePrice: string;
  duration: string;
  image: string;
  tags: string[];
}

export const SERVICE_CATEGORIES: ServiceCategory[] = [
  {
    id: 'casa-giardino',
    name: 'Casa e Giardino',
    description: 'Servizi completi per la cura e manutenzione della tua casa e del tuo giardino. Dai piccoli interventi alle ristrutturazioni complete.',
    icon: '🏠',
    color: 'bg-green-100 text-green-600',
    image: 'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=800',
    services: [
      {
        id: 'giardinaggio',
        name: 'Giardinaggio',
        description: 'Progettazione, realizzazione e manutenzione di giardini, terrazzi e spazi verdi. Potatura, semina, irrigazione e cura delle piante.',
        averagePrice: '€25-45/ora',
        duration: '2-8 ore',
        image: 'https://images.pexels.com/photos/416978/pexels-photo-416978.jpeg?auto=compress&cs=tinysrgb&w=600',
        tags: ['Potatura', 'Semina', 'Irrigazione', 'Progettazione giardini']
      },
      {
        id: 'pulizie',
        name: 'Pulizie Domestiche',
        description: 'Servizi di pulizia professionale per case, uffici e condomini. Pulizie ordinarie, straordinarie e post-ristrutturazione.',
        averagePrice: '€15-25/ora',
        duration: '2-6 ore',
        image: 'https://images.pexels.com/photos/4239146/pexels-photo-4239146.jpeg?auto=compress&cs=tinysrgb&w=600',
        tags: ['Pulizie ordinarie', 'Pulizie straordinarie', 'Sanificazione', 'Stiratura']
      },
      {
        id: 'ristrutturazione',
        name: 'Ristrutturazione',
        description: 'Lavori di ristrutturazione completa o parziale di abitazioni. Muratura, pavimenti, bagni, cucine e impianti.',
        averagePrice: '€200-500/giorno',
        duration: '1-30 giorni',
        image: 'https://images.pexels.com/photos/1249611/pexels-photo-1249611.jpeg?auto=compress&cs=tinysrgb&w=600',
        tags: ['Muratura', 'Pavimenti', 'Bagni', 'Cucine', 'Pittura']
      },
      {
        id: 'manutenzione',
        name: 'Manutenzione Casa',
        description: 'Piccoli lavori di manutenzione domestica, riparazioni, montaggio mobili e interventi di bricolage.',
        averagePrice: '€30-50/ora',
        duration: '1-4 ore',
        image: 'https://images.pexels.com/photos/5691659/pexels-photo-5691659.jpeg?auto=compress&cs=tinysrgb&w=600',
        tags: ['Riparazioni', 'Montaggio mobili', 'Bricolage', 'Piccoli lavori']
      }
    ]
  },
  {
    id: 'riparazioni',
    name: 'Riparazioni',
    description: 'Professionisti specializzati in riparazioni e manutenzioni tecniche. Interventi rapidi e qualificati per ogni emergenza.',
    icon: '🔧',
    color: 'bg-blue-100 text-blue-600',
    image: 'https://images.pexels.com/photos/1216589/pexels-photo-1216589.jpeg?auto=compress&cs=tinysrgb&w=800',
    services: [
      {
        id: 'elettricista',
        name: 'Elettricista',
        description: 'Installazione e riparazione impianti elettrici, domotica, illuminazione e sistemi di sicurezza. Interventi certificati.',
        averagePrice: '€35-60/ora',
        duration: '1-6 ore',
        image: 'https://images.pexels.com/photos/257736/pexels-photo-257736.jpeg?auto=compress&cs=tinysrgb&w=600',
        tags: ['Impianti elettrici', 'Domotica', 'Illuminazione', 'Quadri elettrici']
      },
      {
        id: 'idraulico',
        name: 'Idraulico',
        description: 'Riparazione perdite, installazione sanitari, manutenzione caldaie e impianti idraulici. Pronto intervento 24/7.',
        averagePrice: '€40-65/ora',
        duration: '1-4 ore',
        image: 'https://images.pexels.com/photos/8486944/pexels-photo-8486944.jpeg?auto=compress&cs=tinysrgb&w=600',
        tags: ['Perdite', 'Sanitari', 'Caldaie', 'Scarichi', 'Pronto intervento']
      },
      {
        id: 'caldaista',
        name: 'Caldaista',
        description: 'Manutenzione, riparazione e installazione caldaie e impianti di riscaldamento. Controlli di efficienza energetica.',
        averagePrice: '€45-70/ora',
        duration: '1-3 ore',
        image: 'https://images.pexels.com/photos/5691654/pexels-photo-5691654.jpeg?auto=compress&cs=tinysrgb&w=600',
        tags: ['Caldaie', 'Riscaldamento', 'Manutenzione', 'Efficienza energetica']
      },
      {
        id: 'elettrodomestici',
        name: 'Riparazione Elettrodomestici',
        description: 'Riparazione di lavatrici, lavastoviglie, frigoriferi, forni e tutti gli elettrodomestici. Ricambi originali garantiti.',
        averagePrice: '€35-55/ora',
        duration: '1-3 ore',
        image: 'https://images.pexels.com/photos/4107120/pexels-photo-4107120.jpeg?auto=compress&cs=tinysrgb&w=600',
        tags: ['Lavatrici', 'Lavastoviglie', 'Frigoriferi', 'Forni', 'Ricambi originali']
      }
    ]
  },
  {
    id: 'design',
    name: 'Design e Creatività',
    description: 'Servizi creativi e di design per valorizzare i tuoi spazi e la tua immagine. Dalla progettazione alla realizzazione.',
    icon: '🎨',
    color: 'bg-purple-100 text-purple-600',
    image: 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=800',
    services: [
      {
        id: 'interior-design',
        name: 'Interior Design',
        description: 'Progettazione e arredamento di interni. Consulenza su colori, mobili, illuminazione e ottimizzazione degli spazi.',
        averagePrice: '€50-100/ora',
        duration: '2-8 ore',
        image: 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=600',
        tags: ['Arredamento', 'Colori', 'Illuminazione', 'Ottimizzazione spazi']
      },
      {
        id: 'grafica',
        name: 'Grafica e Logo',
        description: 'Creazione di loghi, brochure, biglietti da visita e materiale pubblicitario. Design professionale per la tua attività.',
        averagePrice: '€25-60/ora',
        duration: '3-10 ore',
        image: 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=600',
        tags: ['Loghi', 'Brochure', 'Biglietti da visita', 'Brand identity']
      },
      {
        id: 'web-design',
        name: 'Web Design',
        description: 'Progettazione e sviluppo di siti web responsive, e-commerce e applicazioni web. SEO e ottimizzazione inclusi.',
        averagePrice: '€30-80/ora',
        duration: '10-50 ore',
        image: 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=600',
        tags: ['Siti web', 'E-commerce', 'Responsive', 'SEO']
      },
      {
        id: 'architettura',
        name: 'Architettura',
        description: 'Progettazione architettonica, ristrutturazioni, pratiche edilizie e direzione lavori. Progetti chiavi in mano.',
        averagePrice: '€60-120/ora',
        duration: '20-100 ore',
        image: 'https://images.pexels.com/photos/3862132/pexels-photo-3862132.jpeg?auto=compress&cs=tinysrgb&w=600',
        tags: ['Progettazione', 'Ristrutturazioni', 'Pratiche edilizie', 'Direzione lavori']
      }
    ]
  },
  {
    id: 'fotografia',
    name: 'Fotografia e Video',
    description: 'Servizi fotografici e video professionali per ogni occasione. Dalla documentazione di eventi alla creazione di contenuti.',
    icon: '📸',
    color: 'bg-pink-100 text-pink-600',
    image: 'https://images.pexels.com/photos/1264210/pexels-photo-1264210.jpeg?auto=compress&cs=tinysrgb&w=800',
    services: [
      {
        id: 'matrimoni',
        name: 'Fotografia Matrimoni',
        description: 'Servizi fotografici completi per matrimoni. Reportage, ritratti, album personalizzati e video emozionali.',
        averagePrice: '€800-2500/evento',
        duration: '8-12 ore',
        image: 'https://images.pexels.com/photos/1024993/pexels-photo-1024993.jpeg?auto=compress&cs=tinysrgb&w=600',
        tags: ['Reportage', 'Ritratti', 'Album', 'Video matrimonio']
      },
      {
        id: 'eventi',
        name: 'Fotografia Eventi',
        description: 'Documentazione fotografica di eventi aziendali, feste private, conferenze e celebrazioni. Consegna rapida.',
        averagePrice: '€200-800/evento',
        duration: '2-8 ore',
        image: 'https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg?auto=compress&cs=tinysrgb&w=600',
        tags: ['Eventi aziendali', 'Feste private', 'Conferenze', 'Celebrazioni']
      },
      {
        id: 'ritratti',
        name: 'Ritratti e Book',
        description: 'Servizi fotografici per ritratti professionali, book fotografici, foto famiglia e sessioni in studio o esterni.',
        averagePrice: '€100-400/sessione',
        duration: '1-3 ore',
        image: 'https://images.pexels.com/photos/1264210/pexels-photo-1264210.jpeg?auto=compress&cs=tinysrgb&w=600',
        tags: ['Ritratti professionali', 'Book fotografici', 'Foto famiglia', 'Studio']
      },
      {
        id: 'commerciale',
        name: 'Fotografia Commerciale',
        description: 'Fotografia per prodotti, immobili, ristoranti e attività commerciali. Immagini professionali per marketing e web.',
        averagePrice: '€150-600/progetto',
        duration: '2-6 ore',
        image: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=600',
        tags: ['Prodotti', 'Immobili', 'Ristoranti', 'Marketing']
      }
    ]
  },
  {
    id: 'formazione',
    name: 'Formazione e Lezioni',
    description: 'Lezioni private e corsi personalizzati per ogni età e livello. Apprendimento efficace con insegnanti qualificati.',
    icon: '📚',
    color: 'bg-indigo-100 text-indigo-600',
    image: 'https://images.pexels.com/photos/5212345/pexels-photo-5212345.jpeg?auto=compress&cs=tinysrgb&w=800',
    services: [
      {
        id: 'lezioni-private',
        name: 'Lezioni Private',
        description: 'Lezioni individuali personalizzate per tutte le materie scolastiche e universitarie. Metodo di studio efficace.',
        averagePrice: '€15-35/ora',
        duration: '1-2 ore',
        image: 'https://images.pexels.com/photos/5212345/pexels-photo-5212345.jpeg?auto=compress&cs=tinysrgb&w=600',
        tags: ['Matematica', 'Italiano', 'Inglese', 'Scienze', 'Metodo di studio']
      },
      {
        id: 'lingue',
        name: 'Corsi di Lingua',
        description: 'Lezioni di lingue straniere con madrelingua qualificati. Inglese, francese, spagnolo, tedesco e altre lingue.',
        averagePrice: '€20-40/ora',
        duration: '1-2 ore',
        image: 'https://images.pexels.com/photos/5428836/pexels-photo-5428836.jpeg?auto=compress&cs=tinysrgb&w=600',
        tags: ['Inglese', 'Francese', 'Spagnolo', 'Tedesco', 'Madrelingua']
      },
      {
        id: 'ripetizioni',
        name: 'Ripetizioni Scolastiche',
        description: 'Supporto scolastico per studenti di ogni livello. Recupero debiti, preparazione esami e potenziamento.',
        averagePrice: '€12-25/ora',
        duration: '1-2 ore',
        image: 'https://images.pexels.com/photos/5905709/pexels-photo-5905709.jpeg?auto=compress&cs=tinysrgb&w=600',
        tags: ['Recupero debiti', 'Preparazione esami', 'Potenziamento', 'Tutte le materie']
      },
      {
        id: 'musica',
        name: 'Lezioni di Musica',
        description: 'Lezioni di strumenti musicali e canto con insegnanti diplomati. Pianoforte, chitarra, violino, batteria e altro.',
        averagePrice: '€20-45/ora',
        duration: '1 ora',
        image: 'https://images.pexels.com/photos/164743/pexels-photo-164743.jpeg?auto=compress&cs=tinysrgb&w=600',
        tags: ['Pianoforte', 'Chitarra', 'Violino', 'Batteria', 'Canto']
      }
    ]
  },
  {
    id: 'benessere',
    name: 'Benessere e Fitness',
    description: 'Servizi per il tuo benessere fisico e mentale. Allenamento personalizzato, massaggi e consulenze nutrizionali.',
    icon: '💪',
    color: 'bg-orange-100 text-orange-600',
    image: 'https://images.pexels.com/photos/416809/pexels-photo-416809.jpeg?auto=compress&cs=tinysrgb&w=800',
    services: [
      {
        id: 'personal-trainer',
        name: 'Personal Trainer',
        description: 'Allenamento personalizzato a domicilio o in palestra. Programmi su misura per dimagrimento, tonificazione e forza.',
        averagePrice: '€30-60/ora',
        duration: '1-2 ore',
        image: 'https://images.pexels.com/photos/416809/pexels-photo-416809.jpeg?auto=compress&cs=tinysrgb&w=600',
        tags: ['Dimagrimento', 'Tonificazione', 'Forza', 'Allenamento funzionale']
      },
      {
        id: 'massaggi',
        name: 'Massaggi e Trattamenti',
        description: 'Massaggi rilassanti, decontratturanti e terapeutici. Trattamenti estetici e di benessere a domicilio.',
        averagePrice: '€40-80/sessione',
        duration: '1-2 ore',
        image: 'https://images.pexels.com/photos/3757942/pexels-photo-3757942.jpeg?auto=compress&cs=tinysrgb&w=600',
        tags: ['Rilassante', 'Decontratturante', 'Terapeutico', 'Estetico']
      },
      {
        id: 'nutrizionista',
        name: 'Nutrizionista',
        description: 'Consulenze nutrizionali personalizzate, piani alimentari e educazione alimentare. Supporto per diete specifiche.',
        averagePrice: '€50-100/consulenza',
        duration: '1-2 ore',
        image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=600',
        tags: ['Piani alimentari', 'Diete specifiche', 'Educazione alimentare', 'Consulenze']
      },
      {
        id: 'yoga',
        name: 'Yoga e Pilates',
        description: 'Lezioni private di yoga, pilates e meditazione. Miglioramento della flessibilità, forza e benessere mentale.',
        averagePrice: '€25-50/ora',
        duration: '1-1.5 ore',
        image: 'https://images.pexels.com/photos/3822622/pexels-photo-3822622.jpeg?auto=compress&cs=tinysrgb&w=600',
        tags: ['Yoga', 'Pilates', 'Meditazione', 'Flessibilità', 'Benessere mentale']
      }
    ]
  },
  {
    id: 'automotive',
    name: 'Auto e Moto',
    description: 'Servizi completi per la manutenzione e riparazione di auto e moto. Professionisti qualificati e ricambi originali.',
    icon: '🚗',
    color: 'bg-red-100 text-red-600',
    image: 'https://images.pexels.com/photos/3806288/pexels-photo-3806288.jpeg?auto=compress&cs=tinysrgb&w=800',
    services: [
      {
        id: 'meccanico',
        name: 'Meccanico Auto',
        description: 'Riparazione e manutenzione auto, diagnosi computerizzata, tagliandi e revisioni. Servizio a domicilio disponibile.',
        averagePrice: '€35-65/ora',
        duration: '1-8 ore',
        image: 'https://images.pexels.com/photos/3806288/pexels-photo-3806288.jpeg?auto=compress&cs=tinysrgb&w=600',
        tags: ['Riparazioni', 'Manutenzione', 'Diagnosi', 'Tagliandi', 'Revisioni']
      },
      {
        id: 'carrozziere',
        name: 'Carrozziere',
        description: 'Riparazione carrozzeria, verniciatura, eliminazione graffi e ammaccature. Ripristino estetico completo.',
        averagePrice: '€40-70/ora',
        duration: '2-10 ore',
        image: 'https://images.pexels.com/photos/3806288/pexels-photo-3806288.jpeg?auto=compress&cs=tinysrgb&w=600',
        tags: ['Carrozzeria', 'Verniciatura', 'Graffi', 'Ammaccature', 'Ripristino']
      },
      {
        id: 'gommista',
        name: 'Gommista',
        description: 'Cambio pneumatici, equilibratura, convergenza e riparazione gomme. Servizio stagionale e di emergenza.',
        averagePrice: '€20-40/ora',
        duration: '0.5-2 ore',
        image: 'https://images.pexels.com/photos/3806288/pexels-photo-3806288.jpeg?auto=compress&cs=tinysrgb&w=600',
        tags: ['Pneumatici', 'Equilibratura', 'Convergenza', 'Riparazione gomme']
      },
      {
        id: 'elettrauto',
        name: 'Elettrauto',
        description: 'Riparazione impianti elettrici auto, batterie, alternatori, motorini di avviamento e sistemi elettronici.',
        averagePrice: '€35-60/ora',
        duration: '1-4 ore',
        image: 'https://images.pexels.com/photos/3806288/pexels-photo-3806288.jpeg?auto=compress&cs=tinysrgb&w=600',
        tags: ['Impianti elettrici', 'Batterie', 'Alternatori', 'Sistemi elettronici']
      }
    ]
  },
  {
    id: 'beauty',
    name: 'Beauty e Estetica',
    description: 'Servizi di bellezza e cura della persona. Trattamenti professionali a domicilio per il tuo benessere estetico.',
    icon: '💄',
    color: 'bg-rose-100 text-rose-600',
    image: 'https://images.pexels.com/photos/3993449/pexels-photo-3993449.jpeg?auto=compress&cs=tinysrgb&w=800',
    services: [
      {
        id: 'parrucchiere',
        name: 'Parrucchiere a Domicilio',
        description: 'Servizi di parrucchiere professionali a casa tua. Taglio, piega, colore, trattamenti e acconciature per eventi.',
        averagePrice: '€25-80/servizio',
        duration: '1-3 ore',
        image: 'https://images.pexels.com/photos/3993449/pexels-photo-3993449.jpeg?auto=compress&cs=tinysrgb&w=600',
        tags: ['Taglio', 'Piega', 'Colore', 'Trattamenti', 'Acconciature']
      },
      {
        id: 'estetista',
        name: 'Estetista a Domicilio',
        description: 'Trattamenti estetici professionali: pulizia viso, massaggi, depilazione, manicure e pedicure nel comfort di casa.',
        averagePrice: '€30-100/trattamento',
        duration: '1-2 ore',
        image: 'https://images.pexels.com/photos/3757942/pexels-photo-3757942.jpeg?auto=compress&cs=tinysrgb&w=600',
        tags: ['Pulizia viso', 'Massaggi', 'Depilazione', 'Manicure', 'Pedicure']
      },
      {
        id: 'nail-art',
        name: 'Nail Art',
        description: 'Servizi di nail art creativi, ricostruzione unghie, gel, semipermanente e decorazioni artistiche personalizzate.',
        averagePrice: '€20-60/servizio',
        duration: '1-2 ore',
        image: 'https://images.pexels.com/photos/3997379/pexels-photo-3997379.jpeg?auto=compress&cs=tinysrgb&w=600',
        tags: ['Ricostruzione', 'Gel', 'Semipermanente', 'Decorazioni', 'Arte']
      },
      {
        id: 'barbiere',
        name: 'Barbiere a Domicilio',
        description: 'Servizi di barbiere tradizionale e moderno: taglio barba, rasatura, styling e trattamenti specifici per uomo.',
        averagePrice: '€20-50/servizio',
        duration: '0.5-1.5 ore',
        image: 'https://images.pexels.com/photos/1319460/pexels-photo-1319460.jpeg?auto=compress&cs=tinysrgb&w=600',
        tags: ['Taglio barba', 'Rasatura', 'Styling', 'Trattamenti uomo']
      }
    ]
  }
];

export const getAllServices = (): Service[] => {
  return SERVICE_CATEGORIES.flatMap(category => category.services);
};

export const getServicesByCategory = (categoryId: string): Service[] => {
  const category = SERVICE_CATEGORIES.find(cat => cat.id === categoryId);
  return category ? category.services : [];
};

export const getServiceById = (serviceId: string): Service | undefined => {
  return getAllServices().find(service => service.id === serviceId);
};

export const getCategoryById = (categoryId: string): ServiceCategory | undefined => {
  return SERVICE_CATEGORIES.find(category => category.id === categoryId);
};