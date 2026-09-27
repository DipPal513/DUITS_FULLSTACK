import { supabase } from '@/lib/supabase';

export async function fetchBlogs(page = 1, category = "All") {
  try {
    let query = supabase
      .from('blogs')
      .select('*', { count: 'exact' })
      .order('date', { ascending: false })
      .range((page - 1) * 10, page * 10 - 1);

    // Note: Category filtering would need a category column in blogs table
    // For now, we'll fetch all blogs and filter client-side if needed

    const { data, error, count } = await query;

    if (error) {
      console.error("Supabase Error:", error);
      return { posts: [], totalPages: 0 };
    }

    console.log("Fetched Blogs:", data);
    return {
      posts: data || [],
      totalPages: Math.ceil((count || 0) / 10),
    };

  } catch (error) {
    console.error("Network Error:", error);
    return { posts: [], totalPages: 0 };
  }
}