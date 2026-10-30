'use client';

import React from 'react';
import { useApp } from '@/context/AppContext';

export default function JsonLdSchema() {
  const { db } = useApp();
  const approvedReviews = (db.reviews || []).filter((r) => r.approved);
  const avgRating =
    approvedReviews.length > 0
      ? (
          approvedReviews.reduce((acc, r) => acc + Number(r.rating || 5), 0) /
          approvedReviews.length
        ).toFixed(1)
      : '5.0';

  const schemaData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': ['HomeAndConstructionBusiness', 'LocalBusiness', 'ProfessionalService'],
        '@id': 'https://hamamghaym.com/#organization',
        name: db.settings.fullLegalName.ar,
        alternateName: [db.settings.companyName.ar, db.settings.companyName.en, db.settings.companyName.ur],
        description:
          'شركة همم غيم للدعاية والإعلان والمقاولات العامة في المملكة العربية السعودية: تصنيع وتركيب الأحرف البارزة والواجهات واللوحات الإعلانية، الاستيكرات وتغليف السيارات، تسوير المشاريع، تجهيز المعارض، المظلات والسواتر، الديكور والتشطيبات الداخلية، المقاولات العامة، والأمن والسلامة.',
        url: 'https://hamamghaym.com',
        telephone: db.settings.phoneClean,
        email: db.settings.email,
        logo: `https://hamamghaym.com${db.settings.logoDark}`,
        image: `https://hamamghaym.com${db.settings.logoDark}`,
        priceRange: '$$',
        address: {
          '@type': 'PostalAddress',
          addressCountry: 'SA',
          addressRegion: 'الرياض، جدة، الدمام، المملكة العربية السعودية',
        },
        areaServed: [
          { '@type': 'City', name: 'الرياض' },
          { '@type': 'City', name: 'جدة' },
          { '@type': 'City', name: 'الدمام' },
          { '@type': 'City', name: 'الخبر' },
          { '@type': 'City', name: 'مكة المكرمة' },
          { '@type': 'Country', name: 'المملكة العربية السعودية' },
        ],
        aggregateRating: {
          '@type': 'AggregateRating',
          ratingValue: avgRating,
          reviewCount: String(Math.max(approvedReviews.length, 1)),
          bestRating: '5',
          worstRating: '1',
        },
        review: approvedReviews.slice(0, 5).map((r) => ({
          '@type': 'Review',
          author: { '@type': 'Person', name: r.name },
          datePublished: r.date,
          reviewBody: r.comment,
          reviewRating: {
            '@type': 'Rating',
            ratingValue: String(r.rating),
            bestRating: '5',
          },
        })),
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: 'خدمات شركة همم غيم الهندسية والإعلانية',
          itemListElement: db.services.map((s, idx) => ({
            '@type': 'Offer',
            position: idx + 1,
            itemOffered: {
              '@type': 'Service',
              name: s.name.ar,
              description: s.description.ar,
              url: `https://hamamghaym.com/services/${s.slug}`,
            },
          })),
        },
      },
      {
        '@type': 'WebSite',
        '@id': 'https://hamamghaym.com/#website',
        url: 'https://hamamghaym.com',
        name: db.settings.fullLegalName.ar,
        inLanguage: ['ar-SA', 'en-US', 'ur-PK'],
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
    />
  );
}
