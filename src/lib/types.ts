export type Lang = 'ar' | 'en' | 'ur';

export interface LocalizedText {
  ar: string;
  en: string;
  ur: string;
}

export interface LocalizedList {
  ar: string[];
  en: string[];
  ur: string[];
}

export interface ServiceFAQ {
  q: LocalizedText;
  a: LocalizedText;
}

export interface ServiceItem {
  id: string;
  slug: string;
  icon: string;
  illustration: string;
  coverImage: string;
  name: LocalizedText;
  shortName: LocalizedText;
  tagline: LocalizedText;
  description: LocalizedText;
  features: LocalizedList;
  audience: LocalizedList;
  priceRange: LocalizedText;
  hashtags: string[];
  faqs: ServiceFAQ[];
}

export interface LetterTypeItem {
  id: string;
  image: string;
  name: LocalizedText;
  desc: LocalizedText;
  specs: LocalizedText;
}

export interface PortfolioItem {
  id: string;
  slug: string;
  category: string;
  type: 'image' | 'video';
  src: string;
  poster?: string;
  title: LocalizedText;
  summary: LocalizedText;
  description: LocalizedText;
  alt: LocalizedText;
  city: LocalizedText;
  duration: LocalizedText;
  warranty: LocalizedText;
  hashtags: string[];
  featured?: boolean;
}

export interface PartnerItem {
  id: string;
  slug: string;
  name: LocalizedText;
  sector: 'government' | 'healthcare' | 'commercial';
  logo: string;
  featured?: boolean;
}

export interface ReviewItem {
  id: string;
  name: string;
  role: string;
  service: string;
  rating: number;
  date: string;
  comment: string;
  reply?: string;
  approved: boolean;
  featured?: boolean;
}

export interface BlogPostItem {
  id: string;
  slug: string;
  category: string;
  image: string;
  date: string;
  title: LocalizedText;
  excerpt: LocalizedText;
  content: LocalizedText;
  hashtags: string[];
}

export interface KnowledgeRule {
  id: string;
  topic: string;
  keywords: string[];
  answer: string;
}

export interface LearnedQA {
  id: string;
  question: string;
  answer: string;
  createdAt: string;
}

export interface UnansweredQuestion {
  id: string;
  question: string;
  userLang: string;
  createdAt: string;
}

export interface KnowledgeBaseData {
  engineerName: LocalizedText;
  systemPersona: string;
  rules: KnowledgeRule[];
  learnedQA: LearnedQA[];
  unansweredQuestions: UnansweredQuestion[];
}

export interface LeadItem {
  id: string;
  name: string;
  phone: string;
  email?: string;
  customerType: 'b2c' | 'b2b';
  company?: string;
  service: string;
  requestType: 'quote' | 'consultation' | 'site-visit';
  city?: string;
  details: string;
  source: string;
  status: 'new' | 'contacted' | 'closed';
  createdAt: string;
}

export interface SiteSettings {
  companyName: LocalizedText;
  fullLegalName: LocalizedText;
  slogan: LocalizedText;
  phone: string;
  phoneClean: string;
  whatsappNumber: string;
  email: string;
  address: LocalizedText;
  workingHours: LocalizedText;
  whatsappGreeting: LocalizedText;
  logoDark: string;
  logoLight: string;
  favicon: string;
  primaryColor: string;
  accentColor: string;
  foundedYear: string;
  stats: {
    projectsCount: string;
    servicesCount: string;
    partnersCount: string;
    warrantyYears: string;
  };
  seoGlobalKeywords: string[];
  firebaseConfig: {
    enabled: boolean;
    projectId: string;
    apiKey: string;
    appId: string;
  };
  aiConfig: {
    provider: string;
    geminiApiKey: string;
    autoLearnEnabled: boolean;
  };
}

export interface DatabaseSchema {
  settings: SiteSettings;
  services: ServiceItem[];
  letterTypes: LetterTypeItem[];
  portfolio: PortfolioItem[];
  partners: PartnerItem[];
  reviews: ReviewItem[];
  blogPosts: BlogPostItem[];
  knowledgeBase: KnowledgeBaseData;
  leads: LeadItem[];
}
