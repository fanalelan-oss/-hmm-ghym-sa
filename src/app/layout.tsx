import type { Metadata } from 'next';
// fonts disabled for offline build
import './globals.css';
import { AppProvider } from '@/context/AppContext';
import LayoutShell from '@/components/layout/LayoutShell';
import PageTransition from '@/components/layout/PageTransition';
import JsonLdSchema from '@/components/seo/JsonLdSchema';

const cairo = { className: "font-cairo", variable: "--font-cairo" };

const tajawal = { className: "font-tajawal", variable: "--font-tajawal" };

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || 'https://hmm-ghym-sa--my-saudi-node.us-east4.hosted.app'
  ),
  title: {
    default:
      'شركة همم غيم للدعاية والإعلان والمقاولات العامة | من الحرف البارز إلى تسليم المفتاح',
    template: '%s | شركة همم غيم للدعاية والإعلان والمقاولات العامة',
  },
  description:
    'شركة همم غيم للدعاية والإعلان والمقاولات العامة في المملكة العربية السعودية: تصنيع وتركيب الأحرف البارزة والواجهات والكلادينج، الاستيكرات وتغليف السيارات، تسوير المشاريع، تجهيز المعارض، المظلات والسواتر، الديكور والتشطيبات الداخلية، المقاولات العامة، والأمن والسلامة. جوال: +966 56 546 7928 | إيميل: hmm.ghym.sa@gmail.com',
  keywords: [
    'شركة همم غيم',
    'همم غيم للدعاية والإعلان والمقاولات',
    'أحرف بارزة مضيئة الرياض',
    'تركيب لوحات محلات تجارية',
    'واجهات كلادينج ACP السعودية',
    'مظلات وسواتر الرياض وجدة',
    'برجولات حدائق وسواتر قص ليزر',
    'تسوير مشاريع عقارية وإنشائية',
    'تجهيز معارض وبوثات مؤتمرات',
    'ديكورات وتشطيبات داخلية',
    'مقاولات عامة وزجاج سيكوريت',
    'كاميرات مراقبة وشبكات إطفاء حريق',
  ],
  icons: {
    icon: '/assets/images/brand/himam-ghaim-favicon-icon.svg',
  },
  openGraph: {
    type: 'website',
    locale: 'ar_SA',
    url: 'https://hmm-ghym-sa--my-saudi-node.us-east4.hosted.app',
    siteName: 'شركة همم غيم للدعاية والإعلان والمقاولات العامة',
    title: 'شركة همم غيم للدعاية والإعلان والمقاولات العامة | من الحرف البارز إلى تسليم المفتاح',
    description:
      'ثماني خدمات هندسية وإعلانية تحت إدارة واحدة في المملكة العربية السعودية: أحرف بارزة وكلادينج، استيكرات، تسوير مشاريع، معارض، مظلات وسواتر، ديكور وتشطيبات، مقاولات عامة، وأمن وسلامة.',
    images: [
      {
        url: 'https://hmm-ghym-sa--my-saudi-node.us-east4.hosted.app/api/og',
        width: 1200,
        height: 630,
        type: 'image/jpeg',
        alt: 'شركة همم غيم للدعاية والإعلان والمقاولات',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'شركة همم غيم | دعاية وإعلان ومقاولات عامة بالسعودية',
    description:
      'تصنيع وتركيب الأحرف البارزة والكلادينج، المعارض، المظلات، والديكور الداخلي بضمان 10 سنوات.',
    images: ['https://hmm-ghym-sa--my-saudi-node.us-east4.hosted.app/api/og'],
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
