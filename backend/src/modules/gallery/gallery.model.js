// import mongoose from 'mongoose';

// const gallerySchema = new mongoose.Schema({
//   title: { 
//     type: String, 
//     required: true, 
//     trim: true 
//   },
//   description: { 
//     type: String, 
//     trim: true 
//   },
 
//   image: { 
//     type: String, 
//     trim: true 
//   },
//   date: { 
//     type: Date, 
//     required: true 
//   },
//   category: { 
//     type: String, 
//     required: true, 
//     trim: true 
//   },
//   createdAt: { 
//     type: Date, 
//     default: Date.now 
//   },
//   updatedAt: { 
//     type: Date, 
//     default: Date.now 
//   },
// });

// // Auto-update `updatedAt` before saving
// gallerySchema.pre('save', function (next) {
//   this.updatedAt = Date.now();
//   next();
// });

// const Gallery = mongoose.model('Gallery', gallerySchema);

// export default Gallery;


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

export const getAllGalleryService = async () => {
  
  try {
    const res = await pool.query('SELECT * FROM gallery ORDER BY date DESC;');
    return res.rows;
  } catch (err) {
    throw err;
  }
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
