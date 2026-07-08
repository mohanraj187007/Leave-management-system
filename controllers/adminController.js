const User = require('../models/userModel');
const LeaveType = require('../models/leaveTypeModel');
const Balance = require('../models/balanceModel');
const Leave = require('../models/leaveModel');
const bcrypt = require('bcryptjs');

const getAllUsers = async (req, res) => {
  try {
    const users = await User.getAll();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const createUser = async (req, res) => {
  try {
    const { name, email, password, role, department } = req.body;
    const existing = await User.findByEmail(email);
    if (existing) return res.status(400).json({ message: 'Email already exists' });
    const hashed = await bcrypt.hash(password, 10);
    const userId = await User.create(name, email, hashed, role, department);
    const types = await LeaveType.getAll();
    const year = new Date().getFullYear();
    for (const t of types) {
      await Balance.initForUser(userId, t.id, t.max_days, year);
    }
    res.status(201).json({ message: 'User created', userId });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const updateUser = async (req, res) => {
  try {
    const { name, role, department } = req.body;
    await User.update(req.params.id, name, role, department);
    res.json({ message: 'User updated successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    await User.delete(req.params.id);
    res.json({ message: 'User deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getLeaveTypes = async (req, res) => {
  try {
    const types = await LeaveType.getAll();
    res.json(types);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const createLeaveType = async (req, res) => {
  try {
    const { name, maxDays, description } = req.body;
    const id = await LeaveType.create(name, maxDays, description);
    res.status(201).json({ message: 'Leave type created', id });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const deleteLeaveType = async (req, res) => {
  try {
    await LeaveType.delete(req.params.id);
    res.json({ message: 'Leave type deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getReport = async (req, res) => {
  try {
    const leaves = await Leave.getAll();
    res.json(leaves);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { getAllUsers, createUser, updateUser, deleteUser, getLeaveTypes, createLeaveType, deleteLeaveType, getReport };
