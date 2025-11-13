import pool from "../../config/db.js";


const createAchievementTable = async () => {
  const query = `
    CREATE TABLE IF NOT EXISTS achievements (
      id SERIAL PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      description TEXT,
      deadline TIMESTAMP,
      image VARCHAR(255),
      created_at TIMESTAMP DEFAULT NOW(),
      updated_at TIMESTAMP DEFAULT NOW()
    );
  `;
  try {
    await pool.query(query);
    console.log("✅ Achievements table created or already exists");
  } catch (err) {
    console.error("❌ Error creating achievements table:", err);
  }
};

export default createAchievementTable;