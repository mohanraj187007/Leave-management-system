const Leave = require('../models/leaveModel');
const Balance = require('../models/balanceModel');
const LeaveType = require('../models/leaveTypeModel');
const { sendNotificationEmail } = require('../utils/emailHelper');

const applyLeave = async (req, res) => {
  try {
    const { leaveTypeId, startDate, endDate, reason } = req.body;
    const userId = req.user.id;
    const start = new Date(startDate);
    const end = new Date(endDate);
    const days = Math.ceil((end - start) / (1000 * 60 * 60 * 24)) + 1;

    const year = start.getFullYear();
    const balances = await Balance.getByUser(userId, year);
    const balance = balances.find(b => b.leave_type_id == leaveTypeId);
    if (!balance || balance.remaining_days < days) {
      return res.status(400).json({ message: 'Insufficient leave balance' });
    }

    const leaveId = await Leave.create(userId, leaveTypeId, startDate, endDate, days, reason);
    res.status(201).json({ message: 'Leave applied successfully', leaveId });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getMyLeaves = async (req, res) => {
  try {
    const leaves = await Leave.getByUser(req.user.id);
    res.json(leaves);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getMyBalance = async (req, res) => {
  try {
    const year = new Date().getFullYear();
    const balances = await Balance.getByUser(req.user.id, year);
    res.json(balances);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const cancelLeave = async (req, res) => {
  try {
    await Leave.delete(req.params.id, req.user.id);
    res.json({ message: 'Leave cancelled successfully' });
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

module.exports = { applyLeave, getMyLeaves, getMyBalance, cancelLeave, getLeaveTypes };
