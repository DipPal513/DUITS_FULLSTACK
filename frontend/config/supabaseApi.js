import { supabase } from '@/lib/supabase';

// Supabase API client to replace backend API calls
const supabaseApi = {
  // Events
  getEvents: async (page = 1, limit = 10, filter = 'all') => {
    try {
      let query = supabase
        .from('events')
        .select('*', { count: 'exact' })
        .order('date', { ascending: false })
        .range((page - 1) * limit, page * limit - 1);

      const { data, error, count } = await query;

      if (error) throw error;

      return {
        events: data || [],
        totalPages: Math.ceil((count || 0) / limit),
        totalCount: count || 0,
        currentPage: page,
        limit: limit
      };
    } catch (error) {
      console.error('Error fetching events:', error);
      return { events: [], totalPages: 1, totalCount: 0 };
    }
  },

  getEventById: async (id) => {
    try {
      const { data, error } = await supabase
        .from('events')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error fetching event:', error);
      return null;
    }
  },

  // Executives
  getExecutives: async (year = '', batch = '') => {
    try {
      let query = supabase
        .from('executives')
        .select('*', { count: 'exact' })
        .order('created_at', { ascending: false });

      if (year) {
        query = query.filter('created_at', 'gte', `${year}-01-01`).filter('created_at', 'lte', `${year}-12-31`);
      }

      if (batch) {
        query = query.eq('duits_batch', parseInt(batch));
      }

      const { data, error, count } = await query;

      if (error) throw error;

      return {
        executives: data || [],
        totalCount: count || 0,
        filters: { year, batch }
      };
    } catch (error) {
      console.error('Error fetching executives:', error);
      return { executives: [], totalCount: 0 };
    }
  },

  getExecutiveById: async (id) => {
    try {
      const { data, error } = await supabase
        .from('executives')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error fetching executive:', error);
      return null;
    }
  },

  // Gallery
  getGallery: async () => {
    try {
      const { data, error } = await supabase
        .from('gallery')
        .select('*')
        .order('date', { ascending: false });

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Error fetching gallery:', error);
      return [];
    }
  },

  getGalleryById: async (id) => {
    try {
      const { data, error } = await supabase
        .from('gallery')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error fetching gallery item:', error);
      return null;
    }
  },

  // Notices
  getNotices: async () => {
    try {
      const { data, error } = await supabase
        .from('notices')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Error fetching notices:', error);
      return [];
    }
  },

  getNoticeById: async (id) => {
    try {
      const { data, error } = await supabase
        .from('notices')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error fetching notice:', error);
      return null;
    }
  },

  // Blogs
  getBlogs: async (page = 1, limit = 10) => {
    try {
      const { data, error, count } = await supabase
        .from('blogs')
        .select('*', { count: 'exact' })
        .order('date', { ascending: false })
        .range((page - 1) * limit, page * limit - 1);

      if (error) throw error;

      return {
        blogs: data || [],
        totalPages: Math.ceil((count || 0) / limit),
        totalCount: count || 0,
        currentPage: page,
        limit: limit
      };
    } catch (error) {
      console.error('Error fetching blogs:', error);
      return { blogs: [], totalPages: 1, totalCount: 0 };
    }
  },

  getBlogById: async (id) => {
    try {
      const { data, error } = await supabase
        .from('blogs')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error fetching blog:', error);
      return null;
    }
  },

  getBlogBySlug: async (slug) => {
    try {
      const { data, error } = await supabase
        .from('blogs')
        .select('*')
        .eq('slug', slug)
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error fetching blog by slug:', error);
      return null;
    }
  },

  // Achievements
  getAchievements: async () => {
    try {
      const { data, error } = await supabase
        .from('achievements')
        .select('*')
        .order('date', { ascending: false });

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Error fetching achievements:', error);
      return [];
    }
  },

  getAchievementById: async (id) => {
    try {
      const { data, error } = await supabase
        .from('achievements')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error fetching achievement:', error);
      return null;
    }
  },

  // Members
  getMembers: async () => {
    try {
      const { data, error } = await supabase
        .from('duits_members')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Error fetching members:', error);
      return [];
    }
  },

  getMemberByTransactionId: async (transactionId) => {
    try {
      const { data, error } = await supabase
        .from('duits_members')
        .select('*')
        .eq('transaction_id', transactionId)
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error fetching member by transaction ID:', error);
      return null;
    }
  },

  // Create Member
  createMember: async (memberData) => {
    try {
      const { data, error } = await supabase
        .from('duits_members')
        .insert([{
          full_name: memberData.full_name,
          department: memberData.department,
          hall: memberData.hall,
          email: memberData.email,
          mobile: memberData.mobile,
          blood_group: memberData.blood_group,
          guardian_name: memberData.guardian_name,
          guardian_contact: memberData.guardian_contact,
          guardian_address: memberData.guardian_address,
          ssc_board: memberData.ssc_board,
          ssc_year: memberData.ssc_year,
          hsc_board: memberData.hsc_board,
          hsc_year: memberData.hsc_year,
          activities: memberData.activities,
          motivation: memberData.motivation,
          transaction_id: memberData.transaction_id,
          payment_amount: memberData.payment_amount || 100.00,
          payment_status: memberData.payment_status || 'Successful'
        }])
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error creating member:', error);
      throw error;
    }
  }
};

export default supabaseApi;
