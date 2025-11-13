// import mongoose from 'mongoose';

// const ExecutiveSchema = new mongoose.Schema({
//   name: {
//     type: String,
//     required: true,
//   },
//   position: {
//     type: String,
//     required: true,
//   },
//   session: {
//     type: String,
//     required: false,
//   },
//   department: {
//     type: String,
//     required: true,
//   },
//   email: {
//     type: String,
//     required: true,
//     unique: true,
//   },
//   year: {
//     type: String,
//     required: true,
//   },
//   phone: {
//     type: String,
//     required: true,
//   },
//   image: {
//     type: String,
//     required: false,
//   },
// }, { timestamps: true });

// const Executive = mongoose.model('Executive', ExecutiveSchema);

// export default Executive;

import pool from "../../config/db.js";

export const createExecutiveService = async (data) => {
  const { name, position, session, department, email, year, phone, image } = data;

  const query = `
    INSERT INTO executives (name, position, session, department, email, year, phone, image)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
    RETURNING *;
  `;
  const values = [name, position, session, department, email, year, phone, image];
  const result = await pool.query(query, values);
  return result.rows[0];
};

export const getExecutivesService = async () => {
  const query = 'SELECT * FROM executives';
  const result = await pool.query(query);
  return result.rows;
};

export const getExecutiveByIdService = async (id) => {
  console.log("Getting executive by ID:", id);
  const query = 'SELECT * FROM executives WHERE id = $1';
  const result = await pool.query(query, [id]);
  return result.rows[0];
};

export const updateExecutiveService = async (id, data) => {

  console.log("update triggered for id:", id, "with data:", data);
  const intid = parseInt(id);
  if (isNaN(intid)) {
    throw new Error('Invalid ID format');
  }
  console.log("this is the id",id);

  const { name, position, session, department, email, year, phone, image } = data;

  const query = `
    UPDATE executives
    SET name = $1, position = $2, session = $3, department = $4, email = $5, year = $6, phone = $7, image = $8
    WHERE id = $9
    RETURNING *;
  `;
  const values = [name, position, session, department, email, year, phone, image, intid];

  const result = await pool.query(query, values);

  if (!result.rows[0]) {
    // Row not found for this ID
    return null;  // Or throw an error if you prefer
  }

  return result.rows[0];
};


export const deleteExecutiveService = async (id) => {
  const intid = parseInt(id);
  if (isNaN(intid)) {
    throw new Error('Invalid ID format');
  }
  const query = 'DELETE FROM executives WHERE id = $1 RETURNING *';
  const result = await pool.query(query, [intid]);
  return result.rows[0];
};
