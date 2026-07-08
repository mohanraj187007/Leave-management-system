const db = require('../config/db');

const Balance = {
  getByUser: async (userId, year) => {
    const [rows] = await db.query(
      `SELECT lb.*, lt.name as leave_type_name
       FROM leave_balances lb
       JOIN leave_types lt ON lb.leave_type_id = lt.id
       WHERE lb.user_id = ? AND lb.year = ?`,
      [userId, year]
    );
    return rows;
  },
  deduct: async (userId, leaveTypeId, days, year) => {
    await db.query(
      'UPDATE leave_balances SET used_days = used_days + ?, remaining_days = remaining_days - ? WHERE user_id=? AND leave_type_id=? AND year=?',
      [days, days, userId, leaveTypeId, year]
    );
  },
  restore: async (userId, leaveTypeId, days, year) => {
    await db.query(
      'UPDATE leave_balances SET used_days = used_days - ?, remaining_days = remaining_days + ? WHERE user_id=? AND leave_type_id=? AND year=?',
      [days, days, userId, leaveTypeId, year]
    );
  },
  initForUser: async (userId, leaveTypeId, totalDays, year) => {
    await db.query(
      'INSERT INTO leave_balances (user_id, leave_type_id, total_days, used_days, remaining_days, year) VALUES (?,?,?,0,?,?)',
      [userId, leaveTypeId, totalDays, totalDays, year]
    );
  }
};

module.exports = Balance;
