import { supabase } from '@/lib/supabase';

// Supabase API client for dashboard with admin operations
const supabaseApi = {
  // Users
  getUsers: async () => {
    try {
      const { data, error } = await supabase
        .from('users')
        .select('id, name, email, role, created_at')
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Error fetching users:', error);
      throw error;
    }
  },

  updateUserRole: async (userId, role) => {
    try {
      const { data, error } = await supabase
        .from('users')
        .update({ role })
        .eq('id', userId)
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error updating user role:', error);
      throw error;
    }
  },

  deleteUser: async (userId) => {
    try {
      const { error } = await supabase
        .from('users')
        .delete()
        .eq('id', userId);

      if (error) throw error;
      return true;
    } catch (error) {
      console.error('Error deleting user:', error);
      throw error;
    }
  },

  // Events
  getEvents: async (page = 1, limit = 10) => {
    try {
      const { data, error, count } = await supabase
        .from('events')
        .select('*', { count: 'exact' })
        .order('date', { ascending: false })
        .range((page - 1) * limit, page * limit - 1);

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
      throw error;
    }
  },

  createEvent: async (eventData) => {
    try {
      const { data, error } = await supabase
        .from('events')
        .insert([{
          title: eventData.title,
          description: eventData.description,
          registration_link: eventData.registrationLink,
          image: eventData.image,
          date: eventData.date,
          location: eventData.location
        }])
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error creating event:', error);
      throw error;
    }
  },

  updateEvent: async (id, eventData) => {
    try {
      const { data, error } = await supabase
        .from('events')
        .update({
          title: eventData.title,
          description: eventData.description,
          registration_link: eventData.registrationLink,
          image: eventData.image,
          date: eventData.date,
          location: eventData.location
        })
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error updating event:', error);
      throw error;
    }
  },

  deleteEvent: async (id) => {
    try {
      const { error } = await supabase
        .from('events')
        .delete()
        .eq('id', id);

      if (error) throw error;
      return true;
    } catch (error) {
      console.error('Error deleting event:', error);
      throw error;
    }
  },

  // Executives
  getExecutives: async (filters = {}) => {
    try {
      let query = supabase
        .from('executives')
        .select('*', { count: 'exact' })
        .order('created_at', { ascending: false });

      if (filters.year) {
        query = query.gte('created_at', `${filters.year}-01-01`).lte('created_at', `${filters.year}-12-31`);
      }

      if (filters.batch) {
        query = query.eq('duits_batch', parseInt(filters.batch));
      }

      const { data, error, count } = await query;

      if (error) throw error;

      return {
        executives: data || [],
        totalCount: count || 0,
        filters: filters
      };
    } catch (error) {
      console.error('Error fetching executives:', error);
      throw error;
    }
  },

  createExecutive: async (executiveData) => {
    try {
      const { data, error } = await supabase
        .from('executives')
        .insert([{
          name: executiveData.name,
          position: executiveData.position,
          session: executiveData.session,
          department: executiveData.department,
          email: executiveData.email,
          year: executiveData.year,
          phone: executiveData.phone,
          image: executiveData.image,
          duits_batch: executiveData.duits_batch
        }])
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error creating executive:', error);
      throw error;
    }
  },

  updateExecutive: async (id, executiveData) => {
    try {
      const { data, error } = await supabase
        .from('executives')
        .update({
          name: executiveData.name,
          position: executiveData.position,
          session: executiveData.session,
          department: executiveData.department,
          email: executiveData.email,
          year: executiveData.year,
          phone: executiveData.phone,
          image: executiveData.image,
          duits_batch: executiveData.duits_batch
        })
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error updating executive:', error);
      throw error;
    }
  },

  deleteExecutive: async (id) => {
    try {
      const { error } = await supabase
        .from('executives')
        .delete()
        .eq('id', id);

      if (error) throw error;
      return true;
    } catch (error) {
      console.error('Error deleting executive:', error);
      throw error;
    }
  },

  // Gallery
  getGallery: async (page = 1, limit = 10) => {
    try {
      const { data, error, count } = await supabase
        .from('gallery')
        .select('*', { count: 'exact' })
        .order('date', { ascending: false })
        .range((page - 1) * limit, page * limit - 1);

      if (error) throw error;

      return {
        galleries: data || [],
        totalPages: Math.ceil((count || 0) / limit),
        totalCount: count || 0,
        currentPage: page,
        limit,
      };
    } catch (error) {
      console.error('Error fetching gallery:', error);
      throw error;
    }
  },

  createGallery: async (galleryData) => {
    try {
      const { data, error } = await supabase
        .from('gallery')
        .insert([{
          title: galleryData.title,
          description: galleryData.description,
          category: galleryData.category,
          date: galleryData.date,
          image: galleryData.image
        }])
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error creating gallery item:', error);
      throw error;
    }
  },

  updateGallery: async (id, galleryData) => {
    try {
      const { data, error } = await supabase
        .from('gallery')
        .update({
          title: galleryData.title,
          description: galleryData.description,
          category: galleryData.category,
          date: galleryData.date,
          image: galleryData.image
        })
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error updating gallery item:', error);
      throw error;
    }
  },

  deleteGallery: async (id) => {
    try {
      const { error } = await supabase
        .from('gallery')
        .delete()
        .eq('id', id);

      if (error) throw error;
      return true;
    } catch (error) {
      console.error('Error deleting gallery item:', error);
      throw error;
    }
  },

  // Notices
  getNotices: async (page = 1, limit = 10) => {
    try {
      const { data, error, count } = await supabase
        .from('notices')
        .select('*', { count: 'exact' })
        .order('created_at', { ascending: false })
        .range((page - 1) * limit, page * limit - 1);

      if (error) throw error;

      return {
        notices: data || [],
        totalPages: Math.ceil((count || 0) / limit),
        totalCount: count || 0,
        currentPage: page,
        limit,
      };
    } catch (error) {
      console.error('Error fetching notices:', error);
      throw error;
    }
  },

  createNotice: async (noticeData) => {
    try {
      const { data, error } = await supabase
        .from('notices')
        .        insert([{
          title: noticeData.title,
          description: noticeData.description,
          registration_link: noticeData.registration_link || noticeData.registrationLink || null,
          image: noticeData.image,
          deadline: noticeData.deadline
        }])
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error creating notice:', error);
      throw error;
    }
  },

  updateNotice: async (id, noticeData) => {
    try {
      const { data, error } = await supabase
        .from('notices')
        .        update({
          title: noticeData.title,
          description: noticeData.description,
          registration_link: noticeData.registration_link || noticeData.registrationLink || null,
          image: noticeData.image,
          deadline: noticeData.deadline
        })
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error updating notice:', error);
      throw error;
    }
  },

  deleteNotice: async (id) => {
    try {
      const { error } = await supabase
        .from('notices')
        .delete()
        .eq('id', id);

      if (error) throw error;
      return true;
    } catch (error) {
      console.error('Error deleting notice:', error);
      throw error;
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
      throw error;
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
      throw error;
    }
  },

  createBlog: async (blogData) => {
    try {
      const { data, error } = await supabase
        .from('blogs')
        .insert([{
          title: blogData.title,
          slug: blogData.slug,
          content: blogData.content,
          description: blogData.description,
          image: blogData.image,
          date: blogData.date
        }])
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error creating blog:', error);
      throw error;
    }
  },

  updateBlog: async (id, blogData) => {
    try {
      const { data, error } = await supabase
        .from('blogs')
        .update({
          title: blogData.title,
          slug: blogData.slug,
          content: blogData.content,
          description: blogData.description,
          image: blogData.image,
          date: blogData.date
        })
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error updating blog:', error);
      throw error;
    }
  },

  deleteBlog: async (id) => {
    try {
      const { error } = await supabase
        .from('blogs')
        .delete()
        .eq('id', id);

      if (error) throw error;
      return true;
    } catch (error) {
      console.error('Error deleting blog:', error);
      throw error;
    }
  },

  // Achievements
  getAchievements: async (page = 1, limit = 10) => {
    try {
      const { data, error, count } = await supabase
        .from('achievements')
        .select('*', { count: 'exact' })
        .order('date', { ascending: false })
        .range((page - 1) * limit, page * limit - 1);

      if (error) throw error;

      return {
        achievements: data || [],
        totalPages: Math.ceil((count || 0) / limit),
        totalCount: count || 0,
        currentPage: page,
        limit,
      };
    } catch (error) {
      console.error('Error fetching achievements:', error);
      throw error;
    }
  },

  createAchievement: async (achievementData) => {
    try {
      const { data, error } = await supabase
        .from('achievements')
        .insert([{
          title: achievementData.title,
          description: achievementData.description,
          date: achievementData.date,
          image: achievementData.image
        }])
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error creating achievement:', error);
      throw error;
    }
  },

  updateAchievement: async (id, achievementData) => {
    try {
      const { data, error } = await supabase
        .from('achievements')
        .update({
          title: achievementData.title,
          description: achievementData.description,
          date: achievementData.date,
          image: achievementData.image
        })
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error updating achievement:', error);
      throw error;
    }
  },

  deleteAchievement: async (id) => {
    try {
      const { error } = await supabase
        .from('achievements')
        .delete()
        .eq('id', id);

      if (error) throw error;
      return true;
    } catch (error) {
      console.error('Error deleting achievement:', error);
      throw error;
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
      throw error;
    }
  },

  updateMember: async (id, memberData) => {
    try {
      const { data, error } = await supabase
        .from('duits_members')
        .update({
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
          payment_status: memberData.payment_status
        })
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error updating member:', error);
      throw error;
    }
  },

  deleteMember: async (id) => {
    try {
      const { error } = await supabase
        .from('duits_members')
        .delete()
        .eq('id', id);

      if (error) throw error;
      return true;
    } catch (error) {
      console.error('Error deleting member:', error);
      throw error;
    }
  },

  getDashboardCounts: async () => {
    try {
      const [members, executives, events, gallery] = await Promise.all([
        supabase.from('duits_members').select('*', { count: 'exact', head: true }),
        supabase.from('executives').select('*', { count: 'exact', head: true }),
        supabase.from('events').select('*', { count: 'exact', head: true }),
        supabase.from('gallery').select('*', { count: 'exact', head: true }),
      ]);
      const error = members.error || executives.error || events.error || gallery.error;
      if (error) throw error;

      return {
        members: members.count || 0,
        executives: executives.count || 0,
        events: events.count || 0,
        gallery: gallery.count || 0,
      };
    } catch (error) {
      console.error('Error fetching dashboard counts:', error);
      throw error;
    }
  },
};

export default supabaseApi;
