// src/config/fetchSingleBlog.js
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1";

// 1. Fetch Single Post by ID
export async function fetchPostById(id) {
  try {
    const res = await fetch(`${API_BASE_URL}/blog/${id}`, {
      next: { revalidate: 60 }, // ISR Caching
    });

    if (!res.ok) return null;
    const json = await res.json();
    return json.data || json; 
  } catch (error) {
    console.error("Error fetching post:", error);
    return null;
  }
}

// 2. Fetch ALL IDs for SSG Build Time
export async function fetchAllIds() {
  try {
    // Fetch only IDs to keep the build light
    const res = await fetch(`${API_BASE_URL}/blog?limit=1000`);
    const json = await res.json();
    const posts = json.data.data.blogs || [];
    return posts.map(post => ({ id: post.id.toString() })); // Next.js params must be strings
  } catch (error) {
    return [];
  }
}