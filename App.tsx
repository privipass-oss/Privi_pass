import { useState, useEffect, useCallback, lazy, Suspense } from 'react';
import { useToast } from '@/hooks';
import { customersService, partnersService, productsService, benefitsService, faqService, marketingService, transactionsService, emailService, adminService, vouchersService } from '@/services/database';

// ... resto dos imports

export default function App() {
  const [appMode, setAppMode] = useState<AppMode>('LANDING');
  const [loading, setLoading] = useState(true);
  
  // States
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [partners, setPartners] = useState<Partner[]>([]);
  const [products, setProducts] = useState<VoucherPack[]>([]);
  const [benefits, setBenefits] = useState<PartnerBenefit[]>([]);
  const [faqItems, setFaqItems] = useState<FAQItem[]>([]);
  const [marketingAssets, setMarketingAssets] = useState<MarketingAsset[]>([]);
  const [transactions, setTransactions] = useState<PartnerTransaction[]>([]);
  const [emailCampaigns, setEmailCampaigns] = useState<EmailCampaign[]>([]);
  const [staffMembers, setStaffMembers] = useState<AdminUser[]>([]);
  const [adminProfile, setAdminProfile] = useState<AdminUser | null>(null);

  const toast = useToast();

  // Load all data from Supabase
  useEffect(() => {
    const loadData = async () => {
      try {
        const [
          customersData,
          partnersData,
          productsData,
          benefitsData,
          faqData,
          marketingData,
          transactionsData,
          campaignsData,
          staffData,
          adminData,
        ] = await Promise.all([
          customersService.getAll(),
          partnersService.getAll(),
          productsService.getAll(),
          benefitsService.getAll(),
          faqService.getAll(),
          marketingService.getAll(),
          transactionsService.getAll(),
          emailService.getAll(),
          adminService.getStaff(),
          adminService.getProfile(),
        ]);

        setCustomers(customersData);
        setPartners(partnersData);
        setProducts(productsData);
        setBenefits(benefitsData);
        setFaqItems(faqData);
        setMarketingAssets(marketingData);
        setTransactions(transactionsData);
        setEmailCampaigns(campaignsData);
        setStaffMembers(staffData);
        setAdminProfile(adminData);
      } catch (error) {
        console.error('Error loading data:', error);
        toast.error('Erro ao carregar dados');
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  // Customer handlers
  const handleAddCustomer = async (data: Partial<Customer>) => {
    try {
      const newCustomer = await customersService.create(data);
      setCustomers(prev => [newCustomer, ...prev]);
      toast.success('Cliente adicionado');
    } catch (error) {
      toast.error('Erro ao adicionar cliente');
    }
  };

  const handleUpdateCustomer = async (id: string, updates: Partial<Customer>) => {
    try {
      await customersService.update(id, updates);
      setCustomers(prev => prev.map(c => c.id === id ? { ...c, ...updates } : c));
      
      // Update vouchers if needed
      if (updates.activeVouchers) {
        const customer = customers.find(c => c.id === id);
        if (customer) {
          const newVouchers = updates.activeVouchers.filter(
            v => !customer.activeVouchers.find(cv => cv.id === v.id)
          );
          for (const voucher of newVouchers) {
            await vouchersService.create(id, voucher);
          }
        }
      }
      
      toast.success('Cliente atualizado');
    } catch (error) {
      toast.error('Erro ao atualizar cliente');
    }
  };

  // ... adicione handlers similares para partners, products, etc.

  if (loading) return <LoadingScreen />;

  // ... resto do componente
}
