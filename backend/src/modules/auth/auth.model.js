// import mongoose from 'mongoose';

// const userSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   email: { type: String, required: true, unique: true },
//   password: { type: String, required: true },
//   role: { type: String, enum: ['ADMIN', 'EDITOR', 'PENDING'], default: 'PENDING' },
//   createdAt: { type: Date, default: Date.now },
// });

// const User = mongoose.model('User', userSchema);
// export default User;




import pool from "../../config/db.js";


export const registerUserService = async ({ name, email, password, role }) => {
  const query = `
    INSERT INTO users (name, email, password, role, created_at)
    VALUES ($1, $2, $3, $4, NOW())
    RETURNING *;
  `;
  const values = [name, email, password, role];
  const result = await pool.query(query, values);
  return result.rows[0];
};

export const findUserByEmail = async (email) => {
  const query = `
    SELECT * FROM users WHERE email = $1;
  `;
  const values = [email];
  const result = await pool.query(query, values);
  return result.rows[0];
};


export const loginUser = async (email) => {
  const query = `
    SELECT * FROM users WHERE email = $1;
  `;
  const values = [email];
  const result = await pool.query(query, values);
  return result.rows[0];
};

export const roleChangeService = async (userId, role) => {
  const query = `
    UPDATE users
    SET role = $1
    WHERE id = $2
    RETURNING *;
  `;
  const values = [role, userId];
  const result = await pool.query(query, values);
  return result.rows[0];
};

export const checkMeService = async (userId) => {
  const query = `
    SELECT id, name, email, role, created_at FROM users WHERE id = $1;
  `;
  const values = [userId];
  const result = await pool.query(query, values);
  return result.rows[0];
};

export const getAllUsersService = async () => {
  const query = `
    SELECT id, name, email, role, created_at FROM users;
  `;
  const result = await pool.query(query);
  return result.rows;
};

export const deleteUserService = async (userId) => {
  const query = `
    DELETE FROM users
    WHERE id = $1;
  `;
  const values = [userId];
  await pool.query(query, values);
};    

export const logoutService = async (userId) => {
  return;
};