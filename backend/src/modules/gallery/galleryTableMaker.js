import pool from "../../config/db.js";


const galleryTableCreator = async () => {
  const query = `
    CREATE TABLE IF NOT EXISTS gallery (
      id SERIAL PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      description TEXT,
      date TIMESTAMP,
      image VARCHAR(255),
      category VARCHAR(100),
      created_at TIMESTAMP DEFAULT NOW(),
      updated_at TIMESTAMP DEFAULT NOW()
    );
  `;
  try {
    await pool.query(query);
    console.log("✅ Gallery table created or already exists");
  } catch (err) {
    console.error("❌ Error creating gallery table:", err);
  }
};

export default galleryTableCreator;