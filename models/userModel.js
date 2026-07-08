const db = require('../config/db');

const User = {
  findByEmail: async (email) => {
    const [rows] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
    return rows[0];
  },
  findById: async (id) => {
    const [rows] = await db.query('SELECT id, name, email, role, department FROM users WHERE id = ?', [id]);
    return rows[0];
  },
  create: async (name, email, hashedPassword, role, department) => {
    const [result] = await db.query(
      'INSERT INTO users (name, email, password, role, department) VALUES (?, ?, ?, ?, ?)',
      [name, email, hashedPassword, role, department]
    );
    return result.insertId;
  },
  getAll: async () => {
    const [rows] = await db.query('SELECT id, name, email, role, department, created_at FROM users');
    return rows;
  },
  update: async (id, name, role, department) => {
    await db.query('UPDATE users SET name=?, role=?, department=? WHERE id=?', [name, role, department, id]);
  },
  delete: async (id) => {
    await db.query('DELETE FROM users WHERE id = ?', [id]);
  }
};

module.exports = User;
