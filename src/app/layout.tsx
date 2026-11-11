import type { Metadata } from 'next';
import Script from 'next/script';
// fonts disabled for offline build
import './globals.css';
import { AppProvider } from '@/context/AppContext';
import LayoutShell from '@/components/layout/LayoutShell';
import PageTransition from '@/components/layout/PageTransition';
import JsonLdSchema from '@/components/seo/JsonLdSchema';

const cairo = { className: 'font-cairo', variable: '--font-cairo' };
const tajawal = { className: 'font-tajawal', variable: '--font-tajawal' };

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ||
  'https://hmm-ghym-sa--my-saudi-node.us-east4.hosted.app';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  alternates: {
    canonical: SITE_URL,
    languages: {
      'ar-SA': SITE_URL,
      ar: SITE_URL,
    },
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  title: {
    default:
      'شركة همم غيم للدعاية والإعلان والمقاولات العامة | من الحرف البارز إلى تسليم المفتاح',
    template: '%s | شركة همم غيم للدعاية والإعلان والمقاولات العامة',
  },
  description:
    'شركة همم غيم للدعاية والإعلان والمقاولات العامة في المملكة العربية السعودية (11 قسماً هندسياً متكاملاً): تصنيع وتركيب الأحرف البارزة واللوحات الإعلانية، واجهات الكلادينج المقاومة للحريق، الواجهات الزجاجية والزجاج السيكوريت، أعمال الجبس بورد والأسمنت بورد، تكسيات بديل الشيبورد وبديل الخشب والرخام، المظلات والسواتر والبرجولات، الاستيكرات وتغليف السيارات، تسوير المشاريع، تجهيز المعارض، أنظمة الأمن والسلامة، وكاميرات المراقبة. جوال: +966 56 546 7928 | إيميل: hmm.ghym.sa@gmail.com',
  keywords: [
    'شركة همم غيم',
    'همم غيم للدعاية والإعلان والمقاولات',
    'أحرف بارزة مضيئة الرياض',
    'تركيب لوحات محلات تجارية',
    'واجهات كلادينج ACP السعودية',
    'واجهات زجاج سيكوريت واستركشر',
    'أعمال جبس بورد وأسمنت بورد الرياض',
    'تكسيات بديل الشيبورد وخلفيات تلفزيون',
    'بديل الخشب والرخام وأبواب مخفية',
    'مظلات وسواتر الرياض وجدة',
    'برجولات حدائق وسواتر قص ليزر',
    'تسوير مشاريع عقارية وإنشائية',
    'تجهيز معارض وبوثات مؤتمرات',
    'استيكرات وتغليف سيارات الشحن',
    'شبكات إطفاء حريق وأمن وسلامة',
    'تركيب كاميرات مراقبة IP CCTV',
  ],
  icons: {
    icon: '/assets/images/brand/himam-ghaim-favicon-icon.svg',
  },
  openGraph: {
    type: 'website',
    locale: 'ar_SA',
    url: SITE_URL,
    siteName: 'شركة همم غيم للدعاية والإعلان والمقاولات العامة',
    title:
      'شركة همم غيم للدعاية والإعلان والمقاولات العامة | من الحرف البارز إلى تسليم المفتاح',
    description:
      '11 قسماً هندسياً وإعلانياً تحت إدارة واحدة في المملكة العربية السعودية: أحرف بارزة، واجهات كلادينج، زجاج سيكوريت، جبس بورد وأسمنت بورد، تكسيات بديل الشيبورد، مظلات وسواتر، استيكرات، تسوير مشاريع، معارض، أمن وسلامة، وكاميرات مراقبة.',
    images: [
      {
        url: `${SITE_URL}/api/og`,
        width: 1200,
        height: 630,
        type: 'image/jpeg',
        alt: 'شركة همم غيم للدعاية والإعلان والمقاولات العامة',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'شركة همم غيم | دعاية وإعلان ومقاولات عامة بالسعودية',
    description:
      'تصنيع وتركيب الأحرف البارزة والكلادينج، الزجاج السيكوريت، الجبس والأسمنت بورد، تكسيات بديل الشيبورد، المظلات، والمعارض بضمان 10 سنوات.',
    images: [`${SITE_URL}/api/og`],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar" dir="rtl" className={`${cairo.variable} ${tajawal.variable}`}>
      <head>
        {/* High-Priority LCP Hero Image Preload */}
        <link
          rel="preload"
          as="image"
          type="image/webp"
          href="/assets/images/portfolio/saudi-3d-signage-cladding-letters-black-stamp-cafe-sign-himam-ghaim.webp"
        />

        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="preload"
          as="style"
          href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700;800;900&family=Tajawal:wght@500;700;800&display=swap"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700;800;900&family=Tajawal:wght@500;700;800&display=swap"
        />
      </head>
      <body className="min-h-screen flex flex-col bg-white dark:bg-brand-950 text-slate-900 dark:text-slate-100 antialiased selection:bg-signal-500 selection:text-white">
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-P37LKGSK"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>

        {/* Google Tag Manager & Ads Tracking */}
        <Script
          id="google-tag-manager"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','GTM-P37LKGSK');
            `,
          }}
        />

        <AppProvider>
          <JsonLdSchema />
          <LayoutShell>
            <PageTransition>{children}</PageTransition>
          </LayoutShell>
        </AppProvider>
      </body>
    </html>
  );
}
