// import mongoose from 'mongoose';

// const eventSchema = new mongoose.Schema({
//   title: { 
//     type: String, 
//     required: true, 
//     trim: true 
//   },
//   description: { 
//     type: String, 
//     trim: true 
//   },
//   registrationLink: { 
//     type: String, 
//     trim: true 
//   },
//   image: { 
//     type: String, 
//     trim: true 
//   },
//   date: { 
//     type: Date, 
//     required: true 
//   },
//   location: { 
//     type: String, 
//     trim: true 
//   },
//   createdAt: { 
//     type: Date, 
//     default: Date.now 
//   },
//   updatedAt: { 
//     type: Date, 
//     default: Date.now 
//   },
// });

// // Auto-update `updatedAt` before saving
// eventSchema.pre('save', function (next) {
//   this.updatedAt = Date.now();
//   next();
// });

// const Event = mongoose.model('Event', eventSchema);

// export default Event;


import pool from "../../config/db.js";

export const createEventService = async (data) => {
  const { title, description, registrationLink, image, date, location } = data;
  const query = 'INSERT INTO events (title, description, registration_link, image, date, location) VALUES (?, ?, ?, ?, ?, ?)';
  const values = [title, description, registrationLink, image, date, location];
  const [result] = await pool.query(query, values);
  return result;
};

export const getEventsService = async () => {
  const query = 'SELECT * FROM events ORDER BY created_at DESC;';
  const [rows] = await pool.query(query);
  return rows;
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
  const query = 'DELETE FROM events WHERE id = ?';
  const [result] = await pool.query(query, [id]);
  return result;
};  