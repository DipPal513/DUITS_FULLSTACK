// import mongoose from 'mongoose';

// const noticeSchema = new mongoose.Schema({
//   title: { 
//     type: String, 
//     required: true, 
//     trim: true 
//   },
//   description: { 
//     type: String, 
//     trim: true 
//   },
//   registrationLink: { 
//     type: String, 
//     trim: true 
//   },
//   image: { 
//     type: String, 
//     trim: true 
//   },
//   deadline: { 
//     type: Date, 
//     required: true 
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
// noticeSchema.pre('save', function (next) {
//   this.updatedAt = Date.now();
//   next();
// });

// const Notice = mongoose.model('Notice', noticeSchema);

// export default Notice;
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

export const getNoticesService = async () => {
  const query = `
    SELECT * FROM notices
    ORDER BY created_at DESC;
  `;
  const result = await pool.query(query);
  return result.rows;
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