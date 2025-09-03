# 🔗 Configurazione Webhook Stripe - Guida Completa

## 📋 Panoramica

I webhook Stripe sono notifiche HTTP che Stripe invia alla tua applicazione quando si verificano eventi specifici (pagamenti, abbonamenti, etc.).

## 🚀 Setup Produzione

### 1. Preparazione Endpoint

Il tuo endpoint webhook è già configurato in:
```
src/api/webhooks/stripe.ts
```

**URL Produzione:**
```
https://tuo-dominio.com/api/webhooks/stripe
```

### 2. Configurazione su Stripe Dashboard

#### Passo 1: Accedi a Stripe
1. Vai su [Stripe Dashboard](https://dashboard.stripe.com)
2. Assicurati di essere in modalità **LIVE** (non Test)
3. Naviga su **Developers → Webhooks**

#### Passo 2: Crea Endpoint
1. Clicca **"Add endpoint"**
2. **Endpoint URL:** `https://tuo-dominio.com/api/webhooks/stripe`
3. **Description:** `ServiziFacili Production Webhook`

#### Passo 3: Seleziona Eventi
Seleziona questi eventi essenziali:

**💳 Pagamenti:**
- `payment_intent.succeeded`
- `payment_intent.payment_failed`
- `payment_intent.requires_action`

**👥 Clienti:**
- `customer.created`
- `customer.updated`
- `customer.deleted`

**📋 Abbonamenti:**
- `customer.subscription.created`
- `customer.subscription.updated`
- `customer.subscription.deleted`

**🧾 Fatture:**
- `invoice.payment_succeeded`
- `invoice.payment_failed`
- `invoice.finalized`

#### Passo 4: Salva e Ottieni Secret
1. Clicca **"Add endpoint"**
2. Nella pagina dell'endpoint, clicca **"Reveal signing secret"**
3. Copia il secret (inizia con `whsec_`)
4. Aggiornalo nel tuo `.env` se diverso

## 🧪 Test in Sviluppo

### Opzione 1: ngrok (Consigliato)
```bash
# Installa ngrok
npm install -g ngrok

# Avvia la tua app
npm run dev

# In un altro terminale, esponi il localhost
ngrok http 3000

# Usa l'URL ngrok come endpoint temporaneo
# Esempio: https://abc123.ngrok.io/api/webhooks/stripe
```

### Opzione 2: Stripe CLI
```bash
# Installa Stripe CLI
# https://stripe.com/docs/stripe-cli

# Login
stripe login

# Forward eventi al tuo localhost
stripe listen --forward-to localhost:3000/api/webhooks/stripe

# Testa un evento
stripe trigger payment_intent.succeeded
```

## 🔍 Verifica Funzionamento

### 1. Log dell'Applicazione
Controlla i log per vedere se i webhook vengono ricevuti:
```bash
✅ Payment succeeded: pi_1234567890
💰 Adding 25€ to user user_123 wallet
📧 Sending confirmation email to user user_123 for 25€
```

### 2. Stripe Dashboard
1. Vai su **Developers → Webhooks**
2. Clicca sul tuo endpoint
3. Controlla la sezione **"Recent deliveries"**
4. Verifica che gli eventi abbiano status **200 OK**

### 3. Test Manuale
```bash
# Simula un pagamento di test
curl -X POST https://tuo-dominio.com/api/webhooks/stripe \
  -H "Content-Type: application/json" \
  -H "Stripe-Signature: whsec_test" \
  -d '{
    "id": "evt_test",
    "type": "payment_intent.succeeded",
    "data": {
      "object": {
        "id": "pi_test",
        "amount": 2500,
        "currency": "eur",
        "metadata": {
          "userId": "user_test"
        }
      }
    }
  }'
```

## 🛡️ Sicurezza

### Verifica Firma
Il webhook verifica automaticamente la firma Stripe:
```typescript
const signature = req.headers['stripe-signature'];
const isValid = webhookHandler.verifyWebhookSignature(payload, signature);
```

### Best Practices
- ✅ **Risposta rapida** → Rispondi entro 30 secondi
- ✅ **Idempotenza** → Gestisci eventi duplicati
- ✅ **Log dettagliati** → Registra tutti gli eventi
- ✅ **Retry logic** → Stripe riprova automaticamente
- ✅ **Monitoring** → Alert per webhook falliti

## 🚨 Troubleshooting

### Webhook Non Ricevuti
1. **Controlla URL** → Deve essere pubblicamente accessibile
2. **Verifica HTTPS** → Stripe richiede SSL
3. **Controlla firewall** → Porta 443 aperta
4. **Test connettività** → `curl https://tuo-dominio.com/api/webhooks/stripe`

### Errori 400/500
1. **Controlla log** → Errori nell'elaborazione
2. **Verifica firma** → Webhook secret corretto
3. **Formato JSON** → Payload valido
4. **Timeout** → Risposta entro 30 secondi

### Eventi Duplicati
```typescript
// Gestisci idempotenza
const processedEvents = new Set();

if (processedEvents.has(event.id)) {
  return { success: true, message: 'Event already processed' };
}

processedEvents.add(event.id);
// ... elabora evento
```

## 📊 Monitoraggio

### Metriche da Monitorare
- 📈 **Success rate** → % webhook elaborati con successo
- ⏱️ **Response time** → Tempo di risposta medio
- 🔄 **Retry rate** → % webhook che richiedono retry
- 🚨 **Error rate** → % webhook falliti

### Alert Consigliati
- 🚨 **Webhook falliti** → > 5% error rate
- ⏰ **Timeout** → Response time > 25 secondi
- 🔄 **Retry eccessivi** → > 10% retry rate

## 📞 Supporto

Per problemi con i webhook:
1. **Stripe Support** → [support.stripe.com](https://support.stripe.com)
2. **Documentazione** → [stripe.com/docs/webhooks](https://stripe.com/docs/webhooks)
3. **Community** → [stackoverflow.com/questions/tagged/stripe-payments](https://stackoverflow.com/questions/tagged/stripe-payments)