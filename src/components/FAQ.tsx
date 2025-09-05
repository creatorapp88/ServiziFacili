import React, { useState } from 'react';
import { ArrowLeft, ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';

interface FAQProps {
  onBack: () => void;
}

interface FAQItem {
  question: string;
  answer: string;
  category: 'clienti' | 'professionisti' | 'pagamenti' | 'generale';
}

export default function FAQ({ onBack }: FAQProps) {
  const [openItems, setOpenItems] = useState<number[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>('generale');

  const faqData: FAQItem[] = [
    // Domande Generali
    {
      question: "Cos'è ServiziFacili?",
      answer: "ServiziFacili è una piattaforma online che mette in contatto clienti e professionisti qualificati. I clienti possono richiedere preventivi gratuiti per qualsiasi tipo di servizio, mentre i professionisti possono trovare nuovi clienti nella loro zona.",
      category: 'generale'
    },
    {
      question: "Il servizio è davvero gratuito per i clienti?",
      answer: "Sì, per i clienti il servizio è completamente gratuito. Non ci sono costi nascosti, abbonamenti o commissioni. Ricevi preventivi gratuiti e scegli liberamente se procedere o meno.",
      category: 'generale'
    },
    {
      question: "In quali città operate?",
      answer: "Operiamo in tutta Italia. Abbiamo professionisti attivi in tutte le principali città e anche nei centri più piccoli. La nostra rete copre oltre 8.000 comuni italiani.",
      category: 'generale'
    },
    {
      question: "Come garantite la qualità dei professionisti?",
      answer: "Tutti i professionisti vengono verificati attraverso controlli su documenti, assicurazioni, referenze e competenze. Inoltre, il sistema di recensioni permette di valutare continuamente la qualità del servizio.",
      category: 'generale'
    },

    // Domande per Clienti
    {
      question: "Come faccio a richiedere un preventivo?",
      answer: "È semplicissimo: 1) Compila il form descrivendo il servizio che ti serve, 2) Ricevi fino a 4 preventivi gratuiti entro 24 ore, 3) Confronta e scegli il professionista che preferisci.",
      category: 'clienti'
    },
    {
      question: "Quanto tempo ci vuole per ricevere i preventivi?",
      answer: "Solitamente ricevi i primi preventivi entro poche ore. Il 90% delle richieste riceve almeno 2(3 preventivi entro 24 ore. Per servizi urgenti, molti professionisti rispondono entro 1-2 ore.",
      category: 'clienti'
    },
    {
      question: "Posso scegliere liberamente il professionista?",
      answer: "Assolutamente sì. Ricevi i preventivi, confronti profili e recensioni, e scegli liberamente chi preferisci. Non c'è nessun obbligo di accettare alcun preventivo.",
      category: 'clienti'
    },
    {
      question: "Cosa succede se non sono soddisfatto del lavoro?",
      answer: "Hai sempre la possibilità di lasciare una recensione e segnalare eventuali problemi al nostro supporto clienti. Lavoriamo per risolvere ogni controversia e mantenere alta la qualità del servizio.",
      category: 'clienti'
    },
    {
      question: "I miei dati personali sono al sicuro?",
      answer: "Sì, trattiamo i tuoi dati secondo il GDPR. I tuoi contatti vengono condivisi solo con i professionisti che scegli di contattare. Non vendiamo mai i dati a terze parti.",
      category: 'clienti'
    },

    // Domande per Professionisti
    {
      question: "Come funziona per i professionisti?",
      answer: "Ti registri gratuitamente, cerchi le richieste nella tua zona, paghi solo per i contatti che ti interessano (da €2,50 a €18,00 in base alla distanza), e contatti direttamente il cliente.",
      category: 'professionisti'
    },
    {
      question: "Quanto costano i contatti clienti?",
      answer: "I prezzi variano in base alla distanza: €2,50 (fino a 5km), €5,00 (fino a 15km), €8,50 (fino a 30km), €12,00 (fino a 50km), €18,00 (oltre 50km). Paghi solo per i contatti che acquisti.",
      category: 'professionisti'
    },
    {
      question: "Come posso aumentare le mie possibilità di essere scelto?",
      answer: "Completa il tuo profilo con foto, descrizione dettagliata, certificazioni. Rispondi velocemente alle richieste, mantieni prezzi competitivi e accumula recensioni positive dai clienti.",
      category: 'professionisti'
    },
    {
      question: "Posso vedere i dettagli della richiesta prima di pagare?",
      answer: "Vedi una descrizione generale del lavoro, la zona, il budget indicativo e quando è stata pubblicata. I contatti completi del cliente li ottieni solo dopo l'acquisto.",
      category: 'professionisti'
    },
    {
      question: "Cosa succede se il cliente non risponde?",
      answer: "Capita raramente perché i clienti sono motivati a trovare un professionista. Se non ricevi risposta entro 48 ore, puoi segnalarlo al supporto per una valutazione del rimborso.",
      category: 'professionisti'
    },

    // Domande sui Pagamenti
    {
      question: "Quali metodi di pagamento accettate?",
      answer: "Accettiamo tutte le principali carte di credito e debito (Visa, Mastercard, American Express), Apple Pay e Google Pay. Tutti i pagamenti sono protetti con crittografia SSL.",
      category: 'pagamenti'
    },
    {
      question: "Come funziona il sistema wallet?",
      answer: "I professionisti ricaricano il loro wallet e utilizzano il credito per acquistare i contatti clienti. È possibile ricaricare da €10 a €500 per volta. Il saldo non scade mai.",
      category: 'pagamenti'
    },
    {
      question: "Posso avere la fattura per i pagamenti?",
      answer: "Sì, per ogni ricarica wallet viene emessa automaticamente una fattura elettronica con IVA al 22%. Puoi scaricarla dalla tua dashboard in formato PDF.",
      category: 'pagamenti'
    },
    {
      question: "I pagamenti sono sicuri?",
      answer: "Assolutamente sì. Utilizziamo Stripe, uno dei processori di pagamento più sicuri al mondo, con crittografia SSL 256-bit e conformità PCI DSS. Non memorizziamo mai i dati delle tue carte.",
      category: 'pagamenti'
    },
    {
      question: "Posso ottenere un rimborso?",
      answer: "I rimborsi sono valutati caso per caso. Se un contatto risulta non valido o il cliente non risponde per motivi tecnici, valutiamo il rimborso. I crediti wallet non scadono mai.",
      category: 'pagamenti'
    }
  ];

  const categories = [
    { id: 'generale', name: 'Domande Generali', count: faqData.filter(item => item.category === 'generale').length },
    { id: 'clienti', name: 'Per i Clienti', count: faqData.filter(item => item.category === 'clienti').length },
    { id: 'professionisti', name: 'Per i Professionisti', count: faqData.filter(item => item.category === 'professionisti').length },
    { id: 'pagamenti', name: 'Pagamenti', count: faqData.filter(item => item.category === 'pagamenti').length }
  ];

  const filteredFAQ = faqData.filter(item => item.category === activeCategory);

  const toggleItem = (index: number) => {
    setOpenItems(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

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
          <div className="text-center mb-12">
            <HelpCircle className="h-16 w-16 text-blue-600 mx-auto mb-4" />
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Domande Frequenti</h1>
            <p className="text-xl text-gray-600">
              Trova le risposte alle domande più comuni su ServiziFacili
            </p>
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {categories.map(category => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  activeCategory === category.id
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {category.name} ({category.count})
              </button>
            ))}
          </div>

          {/* FAQ Items */}
          <div className="space-y-4">
            {filteredFAQ.map((item, index) => (
              <div key={index} className="border border-gray-200 rounded-lg">
                <button
                  onClick={() => toggleItem(index)}
                  className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 transition-colors"
                >
                  <span className="font-medium text-gray-900 pr-4">{item.question}</span>
                  {openItems.includes(index) ? (
                    <ChevronUp className="h-5 w-5 text-gray-500 flex-shrink-0" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-gray-500 flex-shrink-0" />
                  )}
                </button>
                
                {openItems.includes(index) && (
                  <div className="px-6 pb-4">
                    <div className="border-t border-gray-100 pt-4">
                      <p className="text-gray-700 leading-relaxed">{item.answer}</p>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Contact Support */}
          <div className="mt-12 bg-blue-50 rounded-lg p-6 text-center">
            <h3 className="text-lg font-semibold text-blue-900 mb-2">Non hai trovato la risposta?</h3>
            <p className="text-blue-800 mb-4">
              Il nostro team di supporto è sempre disponibile per aiutarti
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="mailto:supporto@servizifacili.it"
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Invia Email
              </a>
              <a 
                href="tel:+393896335889"
                className="bg-white text-blue-600 border border-blue-600 px-6 py-2 rounded-lg hover:bg-blue-50 transition-colors"
              >
                Chiama +39 389 633 5889
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}