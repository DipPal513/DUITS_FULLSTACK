import { supabase } from '@/lib/supabase';

// 1. Fetch Single Post by ID
export async function fetchPostById(id) {
  try {
    let query = supabase
      .from('blogs')
      .select('*');

    query = /^\d+$/.test(String(id))
      ? query.eq('id', Number(id))
      : query.eq('slug', id);

    const { data, error } = await query.single();

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
    
    return data.flatMap(post => [
      { id: post.id.toString() },
      ...(post.slug ? [{ id: post.slug }] : []),
    ]);
  } catch (error) {
    console.error("Error fetching blog IDs:", error);
    return [];
  }
}