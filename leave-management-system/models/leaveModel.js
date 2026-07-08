const db = require('../config/db');

const Leave = {
  create: async (userId, leaveTypeId, startDate, endDate, days, reason) => {
    const [result] = await db.query(
      'INSERT INTO leave_requests (user_id, leave_type_id, start_date, end_date, days, reason) VALUES (?, ?, ?, ?, ?, ?)',
      [userId, leaveTypeId, startDate, endDate, days, reason]
    );
    return result.insertId;
  },
  getByUser: async (userId) => {
    const [rows] = await db.query(
      `SELECT lr.*, lt.name as leave_type_name, u.name as approved_by_name
       FROM leave_requests lr
       JOIN leave_types lt ON lr.leave_type_id = lt.id
       LEFT JOIN users u ON lr.approved_by = u.id
       WHERE lr.user_id = ? ORDER BY lr.created_at DESC`,
      [userId]
    );
    return rows;
  },
  getAll: async () => {
    const [rows] = await db.query(
      `SELECT lr.*, u.name as employee_name, u.department, lt.name as leave_type_name
       FROM leave_requests lr
       JOIN users u ON lr.user_id = u.id
       JOIN leave_types lt ON lr.leave_type_id = lt.id
       ORDER BY lr.created_at DESC`
    );
    return rows;
  },
  getPending: async () => {
    const [rows] = await db.query(
      `SELECT lr.*, u.name as employee_name, u.department, lt.name as leave_type_name
       FROM leave_requests lr
       JOIN users u ON lr.user_id = u.id
       JOIN leave_types lt ON lr.leave_type_id = lt.id
       WHERE lr.status = 'pending' ORDER BY lr.created_at ASC`
    );
    return rows;
  },
  updateStatus: async (id, status, managerId, comment) => {
    await db.query(
      'UPDATE leave_requests SET status=?, approved_by=?, manager_comment=? WHERE id=?',
      [status, managerId, comment, id]
    );
  },
  delete: async (id, userId) => {
    await db.query('DELETE FROM leave_requests WHERE id=? AND user_id=? AND status="pending"', [id, userId]);
  }
};

module.exports = Leave;
