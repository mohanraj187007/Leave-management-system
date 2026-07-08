const db = require('../config/db');

const LeaveType = {
  getAll: async () => {
    const [rows] = await db.query('SELECT * FROM leave_types');
    return rows;
  },
  create: async (name, maxDays, description) => {
    const [result] = await db.query(
      'INSERT INTO leave_types (name, max_days, description) VALUES (?, ?, ?)',
      [name, maxDays, description]
    );
    return result.insertId;
  },
  update: async (id, name, maxDays, description) => {
    await db.query(
      'UPDATE leave_types SET name=?, max_days=?, description=? WHERE id=?',
      [name, maxDays, description, id]
    );
  },
  delete: async (id) => {
    await db.query('DELETE FROM leave_types WHERE id=?', [id]);
  }
};

module.exports = LeaveType;
