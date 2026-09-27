import { supabase } from '@/lib/supabase';

// 1. Fetch Single Post by ID
export async function fetchPostById(id) {
  try {
    const { data, error } = await supabase
      .from('blogs')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      console.error("Error fetching post:", error);
      return null;
    }
    return data; 
  } catch (error) {
    console.error("Error fetching post:", error);
    return null;
  }
}

// 2. Fetch ALL IDs for SSG Build Time
export async function fetchAllIds() {
  try {
    const { data, error } = await supabase
      .from('blogs')
      .select('id, slug');
    
    if (error) {
      console.error("Error fetching blog IDs:", error);
      return [];
    }
    
    return data.map(post => ({ 
      id: post.id.toString(),
      slug: post.slug 
    })); // Next.js params must be strings
  } catch (error) {
    console.error("Error fetching blog IDs:", error);
    return [];
  }
}