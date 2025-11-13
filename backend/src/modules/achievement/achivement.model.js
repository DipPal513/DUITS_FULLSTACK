// import mongoose from 'mongoose';

// const achievementSchema = new mongoose.Schema({
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
// achievementSchema.pre('save', function (next) {
//   this.updatedAt = Date.now();
//   next();
// });

// const Achievement = mongoose.model('Achievement', achievementSchema);

// export default Achievement;


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

export const getAllAchievementsService = async () => {
  const query = `
    SELECT * FROM achievements
    ORDER BY date DESC;
  `;
  const result = await pool.query(query);
  return result.rows;
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
