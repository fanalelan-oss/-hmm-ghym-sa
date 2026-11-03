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

  const siteUrl = 'https://hmm-ghym-sa--my-saudi-node.us-east4.hosted.app';

  const schemaData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': ['HomeAndConstructionBusiness', 'LocalBusiness', 'ProfessionalService'],
        '@id': `${siteUrl}/#organization`,
        name: db.settings.fullLegalName.ar,
        alternateName: [
          db.settings.companyName.ar,
          db.settings.companyName.en,
          db.settings.companyName.ur,
        ],
        description:
          'شركة همم غيم للدعاية والإعلان والمقاولات العامة في المملكة العربية السعودية (11 قسماً هندسياً): تصنيع وتركيب الأحرف البارزة واللوحات الإعلانية، واجهات الكلادينج ACP، الواجهات الزجاجية والزجاج السيكوريت، أعمال الجبس بورد والأسمنت بورد، تكسيات بديل الشيبورد وبديل الخشب والرخام، المظلات والسواتر والبرجولات، الاستيكرات وتغليف السيارات، تسوير المشاريع، تجهيز المعارض، أنظمة الأمن والسلامة، وكاميرات المراقبة.',
        url: siteUrl,
        telephone: db.settings.phoneClean,
        email: db.settings.email,
        logo: `${siteUrl}${db.settings.logoDark}`,
        image: `${siteUrl}${db.settings.logoDark}`,
        priceRange: '$$',
        address: {
          '@type': 'PostalAddress',
          addressCountry: 'SA',
          addressLocality: 'الرياض',
          addressRegion: 'الرياض، جدة، الدمام، المملكة العربية السعودية',
        },
        geo: {
          '@type': 'GeoCoordinates',
          latitude: 24.7136,
          longitude: 46.6753,
        },
        openingHoursSpecification: [
          {
            '@type': 'OpeningHoursSpecification',
            dayOfWeek: [
              'Saturday',
              'Sunday',
              'Monday',
              'Tuesday',
              'Wednesday',
              'Thursday',
            ],
            opens: '08:00',
            closes: '22:00',
          },
        ],
        areaServed: [
          { '@type': 'City', name: 'الرياض' },
          { '@type': 'City', name: 'جدة' },
          { '@type': 'City', name: 'الدمام' },
          { '@type': 'City', name: 'الخبر' },
          { '@type': 'City', name: 'مكة المكرمة' },
          { '@type': 'City', name: 'المدينة المنورة' },
          { '@type': 'Country', name: 'المملكة العربية السعودية' },
        ],
        aggregateRating: {
          '@type': 'AggregateRating',
          ratingValue: avgRating,
          reviewCount: String(Math.max(approvedReviews.length, 1)),
          bestRating: '5',
          worstRating: '1',
        },
        review: approvedReviews.slice(0, 6).map((r) => ({
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
          name: 'الأقسام الهندسية والإعلانية الـ 11 لشركة همم غيم',
          itemListElement: db.services.map((s, idx) => ({
            '@type': 'Offer',
            position: idx + 1,
            itemOffered: {
              '@type': 'Service',
              name: s.name.ar,
              alternateName: s.name.en,
              description: s.description.ar,
              url: `${siteUrl}/services/${s.slug}`,
            },
          })),
        },
      },
      {
        '@type': 'WebSite',
        '@id': `${siteUrl}/#website`,
        url: siteUrl,
        name: db.settings.fullLegalName.ar,
        inLanguage: ['ar-SA', 'en-US', 'ur-PK'],
        potentialAction: {
          '@type': 'SearchAction',
          target: `${siteUrl}/portfolio?q={search_term_string}`,
          'query-input': 'required name=search_term_string',
        },
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
