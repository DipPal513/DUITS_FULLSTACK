

//name, position, session, department, email, year, phone, image

import pool from "../../config/db.js";


const executiveTable = async () => {
  const query = `
  CREATE TABLE IF NOT EXISTS executives (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  position TEXT NOT NULL,
  session TEXT,
  department TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  year TEXT NOT NULL,
  phone TEXT NOT NULL,
  image TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `;
  try {
    await pool.query(query);
    console.log("✅ Executives table created or already exists");
  } catch (err) {
    console.error("❌ Error creating executives table:", err);
  }
};

export default executiveTable;
   