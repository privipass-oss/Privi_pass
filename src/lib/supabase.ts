import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// ============================================================================
// DATABASE TYPES
// ============================================================================

export interface Database {
  public: {
    Tables: {
      customers: {
        Row: {
          id: string;
          name: string;
          email: string;
          phone: string | null;
          password: string;
          avatar_url: string | null;
          total_spend: number;
          location: string;
          last_purchase_date: string | null;
          dragon_pass_id: string;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database['public']['Tables']['customers']['Row'], 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Database['public']['Tables']['customers']['Insert']>;
      };
      vouchers: {
        Row: {
          id: string;
          customer_id: string;
          pack_name: string;
          code: string;
          remaining_access: number;
          total_access: number;
          status: string;
          purchase_date: string;
          qr_code_url: string | null;
          created_at: string;
        };
      };
      partners: {
        Row: {
          id: string;
          name: string;
          email: string;
          phone: string;
          instagram: string | null;
          category: string;
          status: string;
          avatar_url: string | null;
          coupon_code: string;
          commission_type: string;
          commission_value: number;
          pix_key: string;
          pix_type: string;
          total_sales: number;
          total_earned: number;
          created_at: string;
        };
      };
      products: {
        Row: {
          id: string;
          name: string;
          description: string | null;
          type: string;
          access_count: number;
          price: number;
          features: string[];
          is_active: boolean;
          created_at: string;
        };
      };
      benefits: {
        Row: {
          id: string;
          name: string;
          description: string | null;
          discount: string;
          code: string;
          category: string;
          image: string | null;
          created_at: string;
        };
      };
    };
  };
}
