import { supabase } from '@/lib/supabase';
import type { Customer, CustomerVoucher, Partner, VoucherPack, PartnerBenefit, FAQItem, MarketingAsset, PartnerTransaction, EmailCampaign, AdminUser } from '@/types';

// ============================================================================
// CUSTOMERS
// ============================================================================

export const customersService = {
  async getAll(): Promise<Customer[]> {
    const { data: customers, error } = await supabase
      .from('customers')
      .select('*, vouchers(*)')
      .order('created_at', { ascending: false });

    if (error) throw error;

    return customers.map(c => ({
      id: c.id,
      name: c.name,
      email: c.email,
      phone: c.phone || '',
      password: c.password,
      avatarUrl: c.avatar_url || '',
      totalSpend: Number(c.total_spend),
      location: c.location,
      lastPurchaseDate: c.last_purchase_date || '-',
      dragonPassId: c.dragon_pass_id,
      activeVouchers: (c.vouchers || []).map((v: any) => ({
        id: v.id,
        packName: v.pack_name,
        code: v.code,
        remainingAccess: v.remaining_access,
        totalAccess: v.total_access,
        status: v.status,
        purchaseDate: v.purchase_date,
        qrCodeUrl: v.qr_code_url,
      })),
    }));
  },

  async getByEmail(email: string): Promise<Customer | null> {
    const { data, error } = await supabase
      .from('customers')
      .select('*, vouchers(*)')
      .eq('email', email.toLowerCase())
      .single();

    if (error) return null;

    return {
      id: data.id,
      name: data.name,
      email: data.email,
      phone: data.phone || '',
      password: data.password,
      avatarUrl: data.avatar_url || '',
      totalSpend: Number(data.total_spend),
      location: data.location,
      lastPurchaseDate: data.last_purchase_date || '-',
      dragonPassId: data.dragon_pass_id,
      activeVouchers: (data.vouchers || []).map((v: any) => ({
        id: v.id,
        packName: v.pack_name,
        code: v.code,
        remainingAccess: v.remaining_access,
        totalAccess: v.total_access,
        status: v.status,
        purchaseDate: v.purchase_date,
        qrCodeUrl: v.qr_code_url,
      })),
    };
  },

  async create(customer: Partial<Customer>): Promise<Customer> {
    const { data, error } = await supabase
      .from('customers')
      .insert({
        name: customer.name!,
        email: customer.email!.toLowerCase(),
        phone: customer.phone,
        password: customer.password!,
        avatar_url: customer.avatarUrl,
        location: customer.location || 'Brasil',
      })
      .select()
      .single();

    if (error) throw error;

    return {
      id: data.id,
      name: data.name,
      email: data.email,
      phone: data.phone || '',
      password: data.password,
      avatarUrl: data.avatar_url || '',
      totalSpend: 0,
      location: data.location,
      lastPurchaseDate: '-',
      dragonPassId: 'PENDENTE',
      activeVouchers: [],
    };
  },

  async update(id: string, updates: Partial<Customer>): Promise<void> {
    const { error } = await supabase
      .from('customers')
      .update({
        name: updates.name,
        email: updates.email?.toLowerCase(),
        phone: updates.phone,
        total_spend: updates.totalSpend,
        last_purchase_date: updates.lastPurchaseDate,
      })
      .eq('id', id);

    if (error) throw error;
  },

  async delete(id: string): Promise<void> {
    const { error } = await supabase.from('customers').delete().eq('id', id);
    if (error) throw error;
  },
};

// ============================================================================
// VOUCHERS
// ============================================================================

export const vouchersService = {
  async create(customerId: string, voucher: CustomerVoucher): Promise<void> {
    const { error } = await supabase.from('vouchers').insert({
      customer_id: customerId,
      pack_name: voucher.packName,
      code: voucher.code,
      remaining_access: voucher.remainingAccess,
      total_access: voucher.totalAccess,
      status: voucher.status,
      purchase_date: voucher.purchaseDate,
      qr_code_url: voucher.qrCodeUrl,
    });

    if (error) throw error;
  },

  async update(id: string, updates: Partial<CustomerVoucher>): Promise<void> {
    const { error } = await supabase
      .from('vouchers')
      .update({
        remaining_access: updates.remainingAccess,
        status: updates.status,
      })
      .eq('id', id);

    if (error) throw error;
  },
};

// ============================================================================
// PARTNERS
// ============================================================================

export const partnersService = {
  async getAll(): Promise<Partner[]> {
    const { data, error } = await supabase
      .from('partners')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;

    return data.map(p => ({
      id: p.id,
      name: p.name,
      email: p.email,
      phone: p.phone,
      instagram: p.instagram || '',
      category: p.category as any,
      status: p.status as any,
      avatarUrl: p.avatar_url || '',
      couponCode: p.coupon_code,
      commissionType: p.commission_type as any,
      commissionValue: Number(p.commission_value),
      pixKey: p.pix_key,
      pixType: p.pix_type as any,
      totalSales: p.total_sales,
      totalEarned: Number(p.total_earned),
    }));
  },

  async getByEmail(email: string): Promise<Partner | null> {
    const { data, error } = await supabase
      .from('partners')
      .select('*')
      .eq('email', email.toLowerCase())
      .single();

    if (error) return null;

    return {
      id: data.id,
      name: data.name,
      email: data.email,
      phone: data.phone,
      instagram: data.instagram || '',
      category: data.category as any,
      status: data.status as any,
      avatarUrl: data.avatar_url || '',
      couponCode: data.coupon_code,
      commissionType: data.commission_type as any,
      commissionValue: Number(data.commission_value),
      pixKey: data.pix_key,
      pixType: data.pix_type as any,
      totalSales: data.total_sales,
      totalEarned: Number(data.total_earned),
    };
  },

  async create(partner: Partial<Partner>): Promise<Partner> {
    const { data, error } = await supabase
      .from('partners')
      .insert({
        name: partner.name!,
        email: partner.email!.toLowerCase(),
        phone: partner.phone!,
        instagram: partner.instagram,
        category: partner.category!,
        status: 'Pendente',
        avatar_url: partner.avatarUrl,
        coupon_code: partner.couponCode!,
        commission_type: partner.commissionType!,
        commission_value: partner.commissionValue!,
        pix_key: partner.pixKey!,
        pix_type: partner.pixType!,
      })
      .select()
      .single();

    if (error) throw error;

    return {
      id: data.id,
      name: data.name,
      email: data.email,
      phone: data.phone,
      instagram: data.instagram || '',
      category: data.category as any,
      status: data.status as any,
      avatarUrl: data.avatar_url || '',
      couponCode: data.coupon_code,
      commissionType: data.commission_type as any,
      commissionValue: Number(data.commission_value),
      pixKey: data.pix_key,
      pixType: data.pix_type as any,
      totalSales: 0,
      totalEarned: 0,
    };
  },

  async update(id: string, updates: Partial<Partner>): Promise<void> {
    const { error } = await supabase
      .from('partners')
      .update({
        status: updates.status,
        total_sales: updates.totalSales,
        total_earned: updates.totalEarned,
      })
      .eq('id', id);

    if (error) throw error;
  },

  async delete(id: string): Promise<void> {
    const { error } = await supabase.from('partners').delete().eq('id', id);
    if (error) throw error;
  },
};

// ============================================================================
// PRODUCTS
// ============================================================================

export const productsService = {
  async getAll(): Promise<VoucherPack[]> {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('type', { ascending: true });

    if (error) throw error;

    return data.map(p => ({
      id: p.id,
      name: p.name,
      description: p.description || '',
      type: p.type as any,
      accessCount: p.access_count as any,
      price: Number(p.price),
      features: p.features,
      isActive: p.is_active,
    }));
  },

  async update(id: string, updates: Partial<VoucherPack>): Promise<void> {
    const { error } = await supabase
      .from('products')
      .update({
        price: updates.price,
        is_active: updates.isActive,
      })
      .eq('id', id);

    if (error) throw error;
  },
};

// ============================================================================
// BENEFITS
// ============================================================================

export const benefitsService = {
  async getAll(): Promise<PartnerBenefit[]> {
    const { data, error } = await supabase.from('benefits').select('*');
    if (error) throw error;

    return data.map(b => ({
      id: b.id,
      name: b.name,
      description: b.description || '',
      discount: b.discount,
      code: b.code,
      category: b.category as any,
      image: b.image || '',
    }));
  },

  async create(benefit: PartnerBenefit): Promise<void> {
    const { error } = await supabase.from('benefits').insert({
      name: benefit.name,
      description: benefit.description,
      discount: benefit.discount,
      code: benefit.code,
      category: benefit.category,
      image: benefit.image,
    });

    if (error) throw error;
  },

  async delete(id: string): Promise<void> {
    const { error } = await supabase.from('benefits').delete().eq('id', id);
    if (error) throw error;
  },
};

// ============================================================================
// FAQ
// ============================================================================

export const faqService = {
  async getAll(): Promise<FAQItem[]> {
    const { data, error } = await supabase.from('faq_items').select('*');
    if (error) throw error;
    return data;
  },

  async create(item: FAQItem): Promise<void> {
    const { error } = await supabase.from('faq_items').insert(item);
    if (error) throw error;
  },

  async update(item: FAQItem): Promise<void> {
    const { error } = await supabase.from('faq_items').update(item).eq('id', item.id);
    if (error) throw error;
  },

  async delete(id: string): Promise<void> {
    const { error } = await supabase.from('faq_items').delete().eq('id', id);
    if (error) throw error;
  },
};

// ============================================================================
// MARKETING ASSETS
// ============================================================================

export const marketingService = {
  async getAll(): Promise<MarketingAsset[]> {
    const { data, error } = await supabase.from('marketing_assets').select('*');
    if (error) throw error;
    return data as MarketingAsset[];
  },

  async create(asset: MarketingAsset): Promise<void> {
    const { error } = await supabase.from('marketing_assets').insert(asset);
    if (error) throw error;
  },

  async delete(id: string): Promise<void> {
    const { error } = await supabase.from('marketing_assets').delete().eq('id', id);
    if (error) throw error;
  },
};

// ============================================================================
// TRANSACTIONS
// ============================================================================

export const transactionsService = {
  async getAll(): Promise<PartnerTransaction[]> {
    const { data, error } = await supabase.from('transactions').select('*').order('date', { ascending: false });
    if (error) throw error;

    return data.map(t => ({
      id: t.id,
      partnerId: t.partner_id,
      customerName: t.customer_name,
      productName: t.product_name,
      commissionValue: Number(t.commission_value),
      status: t.status as any,
      date: t.date,
      archived: t.archived,
    }));
  },

  async update(id: string, updates: Partial<PartnerTransaction>): Promise<void> {
    const { error } = await supabase.from('transactions').update(updates).eq('id', id);
    if (error) throw error;
  },
};

// ============================================================================
// EMAIL CAMPAIGNS
// ============================================================================

export const emailService = {
  async getAll(): Promise<EmailCampaign[]> {
    const { data, error } = await supabase.from('email_campaigns').select('*').order('sent_date', { ascending: false });
    if (error) throw error;

    return data.map(c => ({
      id: c.id,
      subject: c.subject,
      content: c.content,
      recipientType: c.recipient_type as any,
      sentCount: c.sent_count,
      status: c.status as any,
      sentDate: c.sent_date,
    }));
  },

  async create(campaign: EmailCampaign): Promise<void> {
    const { error } = await supabase.from('email_campaigns').insert({
      subject: campaign.subject,
      content: campaign.content,
      recipient_type: campaign.recipientType,
      sent_count: campaign.sentCount,
      status: campaign.status,
      sent_date: campaign.sentDate,
    });

    if (error) throw error;
  },
};

// ============================================================================
// ADMIN
// ============================================================================

export const adminService = {
  async getProfile(): Promise<AdminUser | null> {
    const { data, error } = await supabase.from('admin_profile').select('*').single();
    if (error) return null;

    return {
      id: data.id,
      name: data.name,
      email: data.email,
      password: data.password,
      role: data.role as any,
      avatarUrl: data.avatar_url || '',
      lastActive: new Date().toISOString(),
    };
  },

  async updateProfile(updates: Partial<AdminUser>): Promise<void> {
    const { data } = await supabase.from('admin_profile').select('id').single();
    if (!data) return;

    const { error } = await supabase.from('admin_profile').update(updates).eq('id', data.id);
    if (error) throw error;
  },

  async getStaff(): Promise<AdminUser[]> {
    const { data, error } = await supabase.from('admin_users').select('*');
    if (error) throw error;

    return data.map(u => ({
      id: u.id,
      name: u.name,
      email: u.email,
      password: u.password,
      role: u.role as any,
      avatarUrl: u.avatar_url || '',
      lastActive: u.last_active,
    }));
  },

  async addStaff(staff: AdminUser): Promise<void> {
    const { error } = await supabase.from('admin_users').insert({
      name: staff.name,
      email: staff.email.toLowerCase(),
      password: staff.password,
      role: staff.role,
      avatar_url: staff.avatarUrl,
    });

    if (error) throw error;
  },

  async removeStaff(id: string): Promise<void> {
    const { error } = await supabase.from('admin_users').delete().eq('id', id);
    if (error) throw error;
  },
};
