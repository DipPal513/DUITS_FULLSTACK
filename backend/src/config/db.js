import pkg from 'pg';
const { Pool } = pkg;


const pool = new Pool({
  host: process.env.PG_HOST,
  user:process.env.PG_USER,
  password:process.env.PG_PASS,
  database:process.env.PG_DB,
  port:process.env.PG_PORT,
});

pool.on('connect', () => {
  console.log(' Connected to PostgreSQL database');
});

pool.on('error', (err) => {
  console.error(' PostgreSQL database connection error:', err);
});

export default pool;