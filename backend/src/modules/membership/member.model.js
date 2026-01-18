import pool  from "../../config/db.js";
// 1. CREATE MEMBER (Register after payment)
export const createMemberService = async (data) => {
  const {
    full_name, department, hall, email, mobile, blood_group,
    guardian_name, guardian_contact, guardian_address,
    ssc_board, ssc_year, hsc_board, hsc_year,
    activities, motivation, transaction_id, 
    payment_amount, payment_status
  } = data;
  
  try {
    const insertQuery = `
      INSERT INTO duits_members (
        full_name, department, hall, email, mobile, blood_group,
        guardian_name, guardian_contact, guardian_address,
        ssc_board, ssc_year, hsc_board, hsc_year,
        activities, motivation, transaction_id, 
        payment_amount, payment_status, created_at
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, NOW())
      RETURNING *;
    `;
    
    const values = [
      full_name, department, hall, email, mobile, blood_group,
      guardian_name, guardian_contact, guardian_address,
      ssc_board, ssc_year, hsc_board, hsc_year,
      activities, motivation, transaction_id, 
      payment_amount || 100.00, payment_status || 'Successful'
    ];

    const res = await pool.query(insertQuery, values);
    return res.rows[0];
  } catch (err) {
    throw err;
  } 
};

// 2. GET ALL MEMBERS (For Admin Panel)
export const getAllMembersService = async () => {
  try {
    const res = await pool.query('SELECT * FROM duits_members ORDER BY created_at DESC;');
    return res.rows;
  } catch (err) {
    throw err;
  } 
};

// 3. GET MEMBER BY TRANSACTION ID (To recheck payment)
export const getMemberByTransactionService = async (tranId) => {
  try {
    const res = await pool.query('SELECT * FROM duits_members WHERE transaction_id = $1;', [tranId]);
    return res.rows[0];
  } catch (err) {
    throw err;
  } 
};

// 4. UPDATE MEMBER
export const updateMemberService = async (id, data) => {
  const {
    full_name, department, hall, email, mobile, blood_group,
    guardian_name, guardian_contact, guardian_address,
    ssc_board, ssc_year, hsc_board, hsc_year,
    activities, motivation, payment_status
  } = data;
  
  try {
    const updateQuery = `
      UPDATE duits_members
      SET 
        full_name = $1, department = $2, hall = $3, email = $4, mobile = $5, 
        blood_group = $6, guardian_name = $7, guardian_contact = $8, 
        guardian_address = $9, ssc_board = $10, ssc_year = $11, 
        hsc_board = $12, hsc_year = $13, activities = $14, 
        motivation = $15, payment_status = $16
      WHERE id = $17
      RETURNING *;
    `;
    const values = [
      full_name, department, hall, email, mobile, blood_group,
      guardian_name, guardian_contact, guardian_address,
      ssc_board, ssc_year, hsc_board, hsc_year,
      activities, motivation, payment_status, id
    ];
    const res = await pool.query(updateQuery, values);
    return res.rows[0];
  } catch (err) {
    throw err;
  } 
};

// 5. DELETE MEMBER
export const deleteMemberService = async (id) => {
  try {
    const res = await pool.query('DELETE FROM duits_members WHERE id = $1 RETURNING *;', [id]);
    return res.rows[0];
  } catch (err) {
    throw err;
  } 
};