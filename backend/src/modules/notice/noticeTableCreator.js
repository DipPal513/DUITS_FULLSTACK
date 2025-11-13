import pool from "../../config/db.js";


const noticeTableCreator = async () => {
  const query = `
    CREATE TABLE IF NOT EXISTS notices (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        description TEXT,
        registration_link VARCHAR(255),
        image VARCHAR(255),
        deadline TIMESTAMP,
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
    );
  `;
  try {
    await pool.query(query);
    console.log("✅ Notices table created or already exists");
  } catch (err) {
    console.error("❌ Error creating notices table:", err);
  }
}; 

export default noticeTableCreator;