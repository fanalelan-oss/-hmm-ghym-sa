import type { Metadata } from 'next';
import { Cairo, Tajawal } from 'next/font/google';
import './globals.css';
import { AppProvider } from '@/context/AppContext';
import LayoutShell from '@/components/layout/LayoutShell';
import PageTransition from '@/components/layout/PageTransition';
import JsonLdSchema from '@/components/seo/JsonLdSchema';

const cairo = Cairo({
  subsets: ['arabic', 'latin'],
  weight: ['600', '700', '800', '900'],
  variable: '--font-display',
  display: 'swap',
});

const tajawal = Tajawal({
  subsets: ['arabic', 'latin'],
  weight: ['400', '500', '700', '800'],
  variable: '--font-tajawal',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default:
      'شركة همم غيم | أحرف بارزة ولوحات إعلانية، مظلات وسواتر، تشطيبات ومقاولات عامة بالسعودية',
    template: '%s | شركة همم غيم للدعاية والإعلان والمقاولات',
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
    siteName: 'شركة همم غيم للدعاية والإعلان والمقاولات',
    title: 'شركة همم غيم — من الحرف البارز إلى تسليم المفتاح',
    description:
      'ثماني خدمات هندسية وإعلانية تحت إدارة واحدة في المملكة العربية السعودية: أحرف بارزة وكلادينج، استيكرات، تسوير مشاريع، معارض، مظلات وسواتر، ديكور وتشطيبات، مقاولات عامة، وأمن وسلامة.',
    images: [
      {
        url: 'https://hmm-ghym-sa--my-saudi-node.us-east4.hosted.app/api/og',
        width: 1200,
        height: 630,
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
