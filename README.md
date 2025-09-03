# ServiziFacili

Piattaforma italiana per mettere in contatto clienti e professionisti qualificati.

## Caratteristiche
- Preventivi gratuiti per i clienti
- Rete di oltre 87.500 professionisti verificati
- Sistema di pagamento sicuro per i professionisti
- Dashboard complete per clienti, professionisti e amministratori

## Configurazione

### 1. Variabili d'Ambiente

Crea un file `.env` nella root del progetto e configura le seguenti variabili:

```bash
# Stripe Configuration
VITE_STRIPE_PUBLIC_KEY=pk_test_your_stripe_publishable_key_here
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret_here
```

### 2. Ottenere le Chiavi Stripe

#### Chiave Pubblicabile (VITE_STRIPE_PUBLIC_KEY):
1. Vai su [Stripe Dashboard](https://dashboard.stripe.com/apikeys)
2. Assicurati di essere in modalità "Test" per lo sviluppo
3. Copia la "Publishable key" (inizia con `pk_test_`)
4. Per produzione, usa la chiave che inizia con `pk_live_`

#### Webhook Secret (STRIPE_WEBHOOK_SECRET):
1. Vai su [Stripe Webhooks](https://dashboard.stripe.com/webhooks)
2. Crea un nuovo endpoint webhook o seleziona uno esistente
3. Nella sezione "Signing secret", clicca "Reveal"
4. Copia il secret (inizia con `whsec_`)

### 3. Eventi Webhook Necessari

Configura il tuo endpoint webhook per ascoltare questi eventi:
- `payment_intent.succeeded`
- `payment_intent.payment_failed`
- `customer.subscription.created`
- `customer.subscription.deleted`
- `invoice.payment_succeeded`
- `invoice.payment_failed`

## Installazione

```bash
npm install
npm run dev
```

## Sicurezza

⚠️ **IMPORTANTE**: 
- Non committare mai il file `.env` nel repository
- Le chiavi segrete devono rimanere private
- Usa sempre le chiavi di test durante lo sviluppo
- Passa alle chiavi live solo in produzione

## Supporto

Per domande tecniche: [supporto@servizifacili.it](mailto:supporto@servizifacili.it)

## Configurazione Webhook Produzione

### 1. Endpoint Webhook
Il tuo endpoint webhook deve essere accessibile pubblicamente:
```
https://tuo-dominio.com/api/webhooks/stripe
```

### 2. Eventi da Configurare su Stripe
Nel tuo [Stripe Dashboard → Webhooks](https://dashboard.stripe.com/webhooks):

**Eventi Richiesti:**
- `payment_intent.succeeded` → Pagamento completato con successo
- `payment_intent.payment_failed` → Pagamento fallito
- `customer.subscription.created` → Nuovo abbonamento creato
- `customer.subscription.deleted` → Abbonamento cancellato
- `invoice.payment_succeeded` → Fattura pagata
- `invoice.payment_failed` → Pagamento fattura fallito

### 3. Configurazione Endpoint
1. **URL Endpoint:** `https://tuo-dominio.com/api/webhooks/stripe`
2. **Metodo HTTP:** POST
3. **Formato:** JSON
4. **Timeout:** 30 secondi
5. **Retry:** Automatico (Stripe riprova fino a 3 giorni)

### 4. Sicurezza
- ✅ **HTTPS obbligatorio** → Stripe richiede SSL
- ✅ **Verifica firma** → Ogni webhook è firmato
- ✅ **Idempotenza** → Gestisci eventi duplicati
- ✅ **Timeout rapido** → Rispondi entro 30 secondi

### 5. Test Webhook
```bash
# Test locale con ngrok
npm install -g ngrok
ngrok http 3000

# Usa l'URL ngrok come endpoint temporaneo
https://abc123.ngrok.io/api/webhooks/stripe
```

### 6. Monitoraggio
- 📊 **Stripe Dashboard** → Visualizza tutti gli eventi
- 📝 **Log applicazione** → Controlla elaborazione webhook
- 🚨 **Alert errori** → Notifiche per webhook falliti