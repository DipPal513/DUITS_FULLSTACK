import pool from "../../config/db.js";


export const createGalleryService = async (data) => {
  const { title, description, category, date, image } = data;
  
  try {
    const insertQuery = `
      INSERT INTO gallery (title, description, category, date, image, created_at, updated_at)
      VALUES ($1, $2, $3, $4, $5, NOW(), NOW())
      RETURNING *;
    `;
    const values = [title, description, category, date, image];
    const res = await pool.query(insertQuery, values);
    return res.rows[0];
  } catch (err) {
    throw err;
  }
};
// remove pagination for gallery
export const getAllGalleryService = async () => {
 

  const res = await pool.query('SELECT * FROM gallery ORDER BY created_at DESC;');
  return res.rows;
};


export const getGalleryByIdService = async (id) => {
 
  try {
    const res = await pool.query('SELECT * FROM gallery WHERE id = $1;', [id]);
    return res.rows[0];
  } catch (err) {
    throw err;
  }
}

export const updateGalleryService = async (id, data) => {
  const { title, description, category, date, image } = data;
  
  try {
    const updateQuery = `
      UPDATE gallery
      SET title = $1, description = $2, category = $3, date = $4, image = $5, updated_at = NOW()
      WHERE id = $6
      RETURNING *;
    `;
    const values = [title, description, category, date, image, id];
    const res = await pool.query(updateQuery, values);
    return res.rows[0];
  } catch (err) {
    throw err;
  }
};

export const deleteGalleryService = async (id) => {
  try {
    const deleteQuery = 'DELETE FROM gallery WHERE id = $1 RETURNING *;';
    const res = await pool.query(deleteQuery, [id]);
    return res.rows[0];
  } catch (err) {
    throw err;
  }
};
