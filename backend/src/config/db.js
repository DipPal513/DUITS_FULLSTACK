import pkg from 'pg';
const { Pool } = pkg;


const pool = new Pool({
  host: "127.0.0.1",
  user:"bvranzct_central_user",
  password:"iecfbestiud",
  database:"bvranzct_central",
  port:5433,
});

pool.on('connect', () => {
  console.log(' Connected to PostgreSQL database');
});

pool.on('error', (err) => {
  console.error(' PostgreSQL database connection error:', err);
});

export default pool;