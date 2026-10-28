import type { Metadata } from 'next';
import { Cairo, Tajawal } from 'next/font/google';
import './globals.css';
import { AppProvider } from '@/context/AppContext';
import SiteHeader from '@/components/layout/SiteHeader';
import SiteFooter from '@/components/layout/SiteFooter';
import FloatingActions from '@/components/layout/FloatingActions';
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
    siteName: 'شركة همم غيم للدعاية والإعلان والمقاولات',
    title: 'شركة همم غيم — من الحرف البارز إلى تسليم المفتاح',
    description:
      'ثماني خدمات هندسية وإعلانية تحت إدارة واحدة في المملكة العربية السعودية: أحرف بارزة وكلادينج، استيكرات، تسوير مشاريع، معارض، مظلات وسواتر، ديكور وتشطيبات، مقاولات عامة، وأمن وسلامة.',
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
          <SiteHeader />
          <main className="flex-1 page-enter">{children}</main>
          <SiteFooter />
          <FloatingActions />
        </AppProvider>
      </body>
    </html>
  );
}
