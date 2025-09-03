import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
}

export default function SEOHead({ 
  title = "ServiziFacili - Trova il Professionista Perfetto per Te",
  description = "Confronta preventivi gratuiti dai migliori professionisti della tua zona. Oltre 87.500 professionisti verificati per casa, riparazioni, design, montaggio mobili, pulizie e molto altro. Servizio gratuito per i clienti.",
  keywords = "professionisti, preventivi gratuiti, servizi casa, riparazioni, idraulico, elettricista, imbianchino, giardiniere, pulizie, montaggio mobili IKEA, caldaista, interior design, fotografo matrimoni, personal trainer, lezioni private, meccanico auto, parrucchiere, estetista",
  image = "https://images.pexels.com/photos/5691659/pexels-photo-5691659.jpeg?auto=compress&cs=tinysrgb&w=1200",
  url = "https://servizifacili.it"
}: SEOHeadProps) {
  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content="ServiziFacili" />
      <meta name="robots" content="index, follow" />
      <meta name="language" content="Italian" />
      <meta name="revisit-after" content="7 days" />

      {/* Open Graph Meta Tags */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="ServiziFacili" />
      <meta property="og:locale" content="it_IT" />

      {/* Twitter Card Meta Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* Additional Meta Tags */}
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="theme-color" content="#2563eb" />
      <link rel="canonical" href={url} />

      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          "name": "ServiziFacili",
          "description": description,
          "url": url,
          "telephone": "+39-389-633-5889",
          "email": "ionutflorerea264@yahoo.com",
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "Via Brera 28",
            "addressLocality": "Milano",
            "postalCode": "20121",
            "addressCountry": "IT"
          },
          "geo": {
            "@type": "GeoCoordinates",
            "latitude": "45.4654",
            "longitude": "9.1859"
          },
          "openingHours": "Mo-Fr 09:00-18:00, Sa 09:00-13:00",
          "priceRange": "€€",
          "paymentAccepted": "Cash, Credit Card, PayPal",
          "currenciesAccepted": "EUR",
          "potentialAction": {
            "@type": "SearchAction",
            "target": `${url}/search?q={search_term_string}`,
            "query-input": "required name=search_term_string"
          },
          "sameAs": [
            "https://www.facebook.com/servizifacili",
            "https://www.instagram.com/servizifacili",
            "https://www.linkedin.com/company/servizifacili"
          ],
          "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "4.8",
            "reviewCount": "12847",
            "bestRating": "5",
            "worstRating": "1"
          }
        })}
      </script>
    </Helmet>
  );
}