

import pool from "../../config/db.js";

export const createAchievementService = async ({ title, description, date, image }) => {
  const query = `
    INSERT INTO achievements (title, description, date, image, created_at, updated_at)
    VALUES ($1, $2, $3, $4, NOW(), NOW())
    RETURNING *;
  `;
  const values = [title, description, date, image];
  const result = await pool.query(query, values);
  return result.rows[0];
};

export const getAllAchievementsService = async (limit = 10, page = 1) => {
  const offset = (page - 1) * limit;

  
  const dataQuery = `
    SELECT * FROM achievements
    ORDER BY created_at DESC
    LIMIT $1 
    OFFSET $2;
  `;

  
  const countQuery = `
    SELECT COUNT(*) 
    FROM achievements;
  `;

  const [dataResult, countResult] = await Promise.all([
    pool.query(dataQuery, [limit, offset]),
    pool.query(countQuery)
  ]);

  
  return {
    achievements: dataResult.rows,
    totalCount: parseInt(countResult.rows[0].count, 10), 
    currentPage: page,
    limit: limit
  };
};

export const updateAchievementByIdService = async (id, { title, description, date, image }) => {
  const query = `
    UPDATE achievements
    SET title = $1,
        description = $2,
        date = $3,
        image = $4,
        updated_at = NOW()
    WHERE id = $5
    RETURNING *;
  `;
  const values = [title, description, date, image, id];
  const result = await pool.query(query, values);
  return result.rows[0];
};

export const deleteAchievementByIdService = async (id) => {
  const query = `
    DELETE FROM achievements
    WHERE id = $1;
  `;
  const values = [id];
  await pool.query(query, values);
};

export const getSingleAchievementByIdService = async (id) => {
  const query = `
    SELECT * FROM achievements
    WHERE id = $1;
  `;
  const values = [id];
  const result = await pool.query(query, values);
  return result.rows[0];
}
