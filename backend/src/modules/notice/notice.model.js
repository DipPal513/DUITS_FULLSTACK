
import pool from "../../config/db.js";

export const createNoticeService = async (data) => {
  const { title, description, registrationLink, image, deadline } = data;
  const query = `
    INSERT INTO notices (title, description, registration_link, image, deadline, created_at, updated_at)
    VALUES ($1, $2, $3, $4, $5, NOW(), NOW())
    RETURNING *;
  `;
  const values = [title, description, registrationLink, image, deadline];
  const result = await pool.query(query, values);
  return result.rows[0];
};

export const getNoticesService = async (limit = 10, page = 1) => {
  const offset = (page - 1) * limit;

  
  const dataQuery = `
    SELECT * FROM notices
    ORDER BY created_at DESC
    LIMIT $1 
    OFFSET $2;
  `;

  const countQuery = `
    SELECT COUNT(*) 
    FROM notices;
  `;

  const [dataResult, countResult] = await Promise.all([
    pool.query(dataQuery, [limit, offset]),
    pool.query(countQuery)
  ]);

  
  return {
    notices: dataResult.rows,
    totalCount: parseInt(countResult.rows[0].count, 10), 
    currentPage: page,
    limit: limit
  };
};

export const updateNoticeService = async (id, data) => {
  const { title, description, registrationLink, image, deadline } = data;
  const query = `
    UPDATE notices
    SET title = $1,
        description = $2,
        registration_link = $3,
        image = $4,
        deadline = $5,
        updated_at = NOW()
    WHERE id = $6
    RETURNING *;
  `;
  const values = [title, description, registrationLink, image, deadline, id];
  const result = await pool.query(query, values);
  return result.rows[0];
};

export const getNoticeByIdService = async (id) => {
  const query = `
    SELECT * FROM notices
    WHERE id = $1;
  `;
  const result = await pool.query(query, [id]);
  return result.rows[0];
};

export const deleteNoticeService = async (id) => {
  const query = `
    DELETE FROM notices
    WHERE id = $1;
  `;
  await pool.query(query, [id]);
};