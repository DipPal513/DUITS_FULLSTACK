import pool from "../../config/db.js";



const eventTableCreator = async () => {
  const query = `
    CREATE TABLE IF NOT EXISTS events (
      id SERIAL PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      description TEXT,
      registrationLink VARCHAR(255),
      date TIMESTAMP,
      image VARCHAR(255),
      location VARCHAR(100),
      created_at TIMESTAMP DEFAULT NOW(),
      updated_at TIMESTAMP DEFAULT NOW()
    );
  `;
  try {
    await pool.query(query);
    console.log("✅ Events table created or already exists");
  } catch (err) {
    console.error("❌ Error creating events table:", err);
  }
};

export default eventTableCreator;