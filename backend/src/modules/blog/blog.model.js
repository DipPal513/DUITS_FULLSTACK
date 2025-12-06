import pool from "../../config/db.js";

export const createBlogService = async (data) => {
  // 1. Destructure the fields we actually need
  // content = The Markdown string from Jodit/Turndown
  // slug = "my-blog-title" (generated on frontend or here)
  const { title, content, slug, image, description, date } = data;

  const query = `
    INSERT INTO blogs (
      title, 
      content,      -- The full blog post (Markdown)
      slug,         -- unique url string
      description,  -- short summary for SEO (optional)
      image,        -- featured image URL
      date
    )
    VALUES ($1, $2, $3, $4, $5, $6)
    RETURNING *;
  `;

  // 2. Prepare values
  const values = [
    title, 
    content, 
    slug, 
    description || title.substring(0, 150), // Auto-generate description if missing
    image, 
    date || new Date() // Default to now if missing
  ];

  const result = await pool.query(query, values);
  return result.rows[0];
};
export const getBlogsService = async (limit, page) => {
  const offset = (page - 1) * limit;

  
  const dataQuery = `
    SELECT * FROM blogs
    ORDER BY date DESC
    LIMIT $1 
    OFFSET $2;
  `;

  
  const countQuery = `
    SELECT COUNT(*) 
    FROM blogs;
  `;

  const [dataResult, countResult] = await Promise.all([
    pool.query(dataQuery, [limit, offset]),
    pool.query(countQuery)
  ]);

  
  return {
    blogs: dataResult.rows,
    totalCount: parseInt(countResult.rows[0].count, 10), 
    currentPage: page,
    totalPages: Math.ceil(parseInt(countResult.rows[0].count, 10) / limit),
    limit: limit
  };
}
export const updateBlogService = async (id, data) => {
  const { title, description, image, date, location } = data;
    const query = `
    UPDATE blogs 
    SET title = $1, description = $2, image = $3, date = $4, location = $5 
    WHERE id = $6 
    RETURNING *
  `;
  
  const values = [title, description, image, date, location, id];
  const result = await pool.query(query, values);
  return result.rows[0];
};
export const deleteBlogService = async (id) => {
  const query = `
    DELETE FROM blogs
    WHERE id = $1;
  `;
  const result = await pool.query(query, [id]);
  return result;
};
export const getBlogByIdService = async (id) => {
  const query = `
    SELECT * FROM blogs
    WHERE id = $1;
  `;
  const result = await pool.query(query, [id]);
  return result.rows[0];
};