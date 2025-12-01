
import pool from "../../config/db.js";

export const createExecutiveService = async (data) => {
  const { name, position, session, department, email, year, phone, image,duits_batch } = data;

  const query = `
    INSERT INTO executives (name, position, session, department, email, year, phone, image,duits_batch)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8,$9)
    RETURNING *;
  `;
  const values = [name, position, session, department, email, year, phone, image,duits_batch];
  const result = await pool.query(query, values);
  return result.rows[0];
};

export const getExecutivesService = async (filters = {}) => {
  const { year, batch } = filters;
  
  let whereConditions = [];
  let queryParams = [];
  let paramIndex = 1;

  // Add year filter if provided
  if (year) {
    whereConditions.push(`EXTRACT(YEAR FROM created_at) = $${paramIndex}`);
    queryParams.push(year);
    paramIndex++;
  }

  // Add batch filter if provided
  if (batch) {
    whereConditions.push(`duits_batch = $${paramIndex}`);
    queryParams.push(batch);
    paramIndex++;
  }

  // Build WHERE clause
  const whereClause = whereConditions.length > 0 
    ? `WHERE ${whereConditions.join(' AND ')}`
    : '';

  const dataQuery = `
    SELECT * FROM executives
    ${whereClause}
    ORDER BY created_at DESC;
  `;
  
  const countQuery = `
    SELECT COUNT(*) 
    FROM executives
    ${whereClause};
  `;

  const [dataResult, countResult] = await Promise.all([
    pool.query(dataQuery, queryParams),
    pool.query(countQuery, queryParams)
  ]);

  return {
    executives: dataResult.rows,
    totalCount: parseInt(countResult.rows[0].count, 10),
    filters: { year, batch }
  };
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
