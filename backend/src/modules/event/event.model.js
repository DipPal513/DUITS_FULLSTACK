import pool from "../../config/db.js";

export const createEventService = async (data) => {
  const { title, description, registrationLink, image, date, location } = data;
  const query = 'INSERT INTO events (title, description, registration_link, image, date, location) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *';
  const values = [title, description, registrationLink, image, date, location];
  const result = await pool.query(query, values);
  return result;
};
export const getEventsService = async (limit = 10, page = 1) => {
  const offset = (page - 1) * limit;

  
  const dataQuery = `
    SELECT * FROM events
    ORDER BY created_at DESC
    LIMIT $1 
    OFFSET $2;
  `;

  
  const countQuery = `
    SELECT COUNT(*) 
    FROM events;
  `;

  const [dataResult, countResult] = await Promise.all([
    pool.query(dataQuery, [limit, offset]),
    pool.query(countQuery)
  ]);

  
  return {
    events: dataResult.rows,
    totalCount: parseInt(countResult.rows[0].count, 10), 
    currentPage: page,
    totalPages: Math.ceil(parseInt(countResult.rows[0].count, 10) / limit),
    limit: limit
  };
};



export const getEventByIdService = async (id) => {
  const query = 'SELECT * FROM events WHERE id = ?';
  const [rows] = await pool.query(query, [id]);
  return rows;
};

export const updateEventService = async (id, data) => {
  const { title, description, registrationLink, image, date, location } = data;
  const query = 'UPDATE events SET title = ?, description = ?, registration_link = ?, image = ?, date = ?, location = ? WHERE id = ?';
  const values = [title, description, registrationLink, image, date, location, id];
  const [result] = await pool.query(query, values);
  return result;
};

export const deleteEventService = async (id) => {
  const query = 'DELETE FROM events WHERE id = $1';
  const result = await pool.query(query, [id]);
  return result;
};  