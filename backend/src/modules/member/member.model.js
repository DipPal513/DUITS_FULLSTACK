
export const createMemberService = async (data) => {
  const { name, email, year, studentId, department, interests, status } = data;
  
  try {
    const insertQuery = `
      INSERT INTO members (name, email, year, studentid, department, interests, status, joined_at)
      VALUES ($1, $2, $3, $4, $5, $6, $7, NOW())
      RETURNING *;
    `;
    const values = [name, email, year, studentId, department, interests, status || 'PENDING'];
    const res = await client.query(insertQuery, values);
    return res.rows[0];
  } catch (err) {
    throw err;
  } finally {
    client.release();
  }
};

export const getAllMembersService = async () => {
  
  try {
    const res = await client.query('SELECT * FROM members;');
    return res.rows;
  } catch (err) {
    throw err;
  } finally {
    client.release();
  }
};

export const getMemberByIdService = async (id) => {
 
  try {
    const res = await client.query('SELECT * FROM members WHERE id = $1;', [id]);
    return res.rows[0];
  } catch (err) {
    throw err;
  } finally {
    client.release();
  }
}

export const updateMemberService = async (id, data) => {
  const { name, email, year, studentId, department, interests, status } = data;
  
  try {
    const updateQuery = `
      UPDATE members
      SET name = $1, email = $2, year = $3, studentid = $4, department = $5, interests = $6, status = $7
      WHERE id = $8
      RETURNING *;
    `;
    const values = [name, email, year, studentId, department, interests, status, id];
    const res = await client.query(updateQuery, values);
    return res.rows[0];
  } catch (err) {
    throw err;
  } finally {
    client.release();
  }
};

export const deleteMemberService = async (id) => {
  
  try {
    const res = await client.query('DELETE FROM members WHERE id = $1 RETURNING *;', [id]);
    return res.rows[0];
  } catch (err) {
    throw err;
  } finally {
    client.release();
  }
};
