// src/lib/blogService.js

// ⚠️ SERVER COMPONENTS NEED ABSOLUTE URLS
const API_BASE_URL = process.env.NEXT_PUBLIC_BASE_URL 

export async function fetchBlogs(page = 1, category = "All") {
  try {
    const url = new URL(`${API_BASE_URL}/blog`);
    url.searchParams.append("page", page.toString());
    url.searchParams.append("limit", "10");
    
    if (category && category !== "All") {
      url.searchParams.append("category", category);
    }

    console.log("Fetching:", url.toString()); // Debugging log

    const res = await fetch(url.toString(), {
      next: { revalidate: 60 }, // ISR Caching
      headers: { "Content-Type": "application/json" }
    });

    if (!res.ok) {
      console.error(`Fetch Error: ${res.status}`);
      return { posts: [], totalPages: 0 };
    }

    const json = await res.json();
    console.log("Fetched Data:", res); // Debugging log
    // Adapt this to match your API response exactly
    return {
      posts: json.data.blogs || [], 
      totalPages: json?.totalPages || json.totalPages || 1, 
    };

  } catch (error) {
    console.error("Network Error:", error);
    return { posts: [], totalPages: 0 };
  }
}