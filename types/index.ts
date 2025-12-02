// ============================================================================
// ENUMS & UNION TYPES
// ============================================================================
export type AppMode = 
  | 'LANDING' 
  | 'AUTH' 
  | 'CLIENT_AREA' 
  | 'ADMIN_DASHBOARD' 
  | 'PARTNER_REGISTER' 
  | 'PARTNER_DASHBOARD' 
  | 'SUPPORT';

export type AuthMode = 'LOGIN' | 'REGISTER';
export type VoucherType = 'Nacional' | 'Internacional';
export type AdminRole = 'Admin' | 'Suporte' | 'Financeiro';
export type VoucherStatus = 'Ativo' | 'Resgatado' | 'Expirado' | 'Processando';
export type PartnerStatus = 'Ativo' | 'Pendente' | 'Bloqueado';
export type PartnerCategory = 'Motorista' | 'Influencer' | 'Agência';
export type TransactionStatus = 'Agendado' | 'Pago' | 'Cancelado';
export type PixType = 'CPF' | 'Email' | 'Telefone' | 'Aleatoria';
export type FAQCategory = 'Geral' | 'Acesso' | 'Financeiro' | 'Técnico';
export type BenefitCategory = 'Transporte' | 'Shopping' | 'Hospedagem';
export type MarketingCategory = 'Stories' | 'Feed' | 'Documentos' | 'Copy';
export type MarketingType = 'Image' | 'PDF' | 'Text';

export type ViewState = 
  | 'dashboard' | 'members' | 'concierge' | 'settings' 
  | 'analytics' | 'partners' | 'marketing' | 'benefits' 
  | 'products' | 'travel-hub' | 'faq' | 'email';

// ============================================================================
// CORE ENTITIES
// ============================================================================
export interface CustomerVoucher {
  id: string;
  packName: string;
  code: string;
  remainingAccess: number;
  totalAccess: number;
  status: VoucherStatus;
  purchaseDate: string;
  qrCodeUrl?: string;
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  password?: string;
  phone?: string;
  dragonPassId?: string;
  avatarUrl: string;
  totalSpend: number;
  activeVouchers: CustomerVoucher[];
  lastPurchaseDate: string;
  location: string;
}

export interface Partner {
  id: string;
  name: string;
  email: string;
  phone: string;
  instagram: string;
  category: PartnerCategory;
  pixKey: string;
  pixType: PixType;
  status: PartnerStatus;
  totalSales: number;
  totalEarned: number;
  commissionType: 'Fixed' | 'Percentage';
  commissionValue: number;
  couponCode: string;
  avatarUrl: string;
}

export interface PartnerTransaction {
  id: string;
  partnerId: string;
  customerName: string;
  productName: string;
  saleValue: number;
  commissionValue: number;
  date: string;
  status: TransactionStatus;
  scheduledDate: string;
  archived?: boolean;
}

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: AdminRole;
  avatarUrl: string;
  lastActive: string;
  password?: string;
}

// ============================================================================
// PRODUCTS & CONTENT
// ============================================================================
export interface VoucherPack {
  id: string;
  name: string;
  description: string;
  type: VoucherType;
  accessCount: 1 | 2 | 4;
  price: number;
  features: string[];
  isActive?: boolean;
}

export interface PartnerBenefit {
  id: string;
  name: string;
  description: string;
  discount: string;
  image: string;
  category: BenefitCategory;
  code: string;
}

export interface MarketingAsset {
  id: string;
  title: string;
  description: string;
  type: MarketingType;
  url?: string;
  content?: string;
  thumbnail?: string;
  category: MarketingCategory;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category?: FAQCategory;
}

export interface EmailCampaign {
  id: string;
  subject: string;
  content: string;
  recipientType: 'ALL' | 'CUSTOMERS' | 'PARTNERS';
  sentDate: string;
  status: 'Sent' | 'Draft';
  sentCount: number;
}

// ============================================================================
// UI & ANALYTICS
// ============================================================================
export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}

export interface ChartDataPoint {
  name: string;
  nacional: number;
  internacional: number;
}

export interface AnalyticsData {
  totalVisitors: number;
  activeNow: number;
  bounceRate: string;
  avgSession: string;
  devices: Array<{ name: string; value: number; color: string }>;
  sources: Array<{ name: string; value: number; icon: string }>;
  topCities: Array<{ city: string; country: string; visitors: number; percentage: number }>;
  liveSessions: Array<{ id: string; ip: string; device: string; location: string; page: string; time: string }>;
}

// ============================================================================
// APP STATE
// ============================================================================
export interface AppState {
  benefits: PartnerBenefit[];
  partners: Partner[];
  customers: Customer[];
  products: VoucherPack[];
  marketingAssets: MarketingAsset[];
  faqItems: FAQItem[];
  staffMembers: AdminUser[];
  transactions: PartnerTransaction[];
  emailCampaigns: EmailCampaign[];
  adminProfile: AdminUser;
}
