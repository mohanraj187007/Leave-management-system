const Leave = require('../models/leaveModel');
const Balance = require('../models/balanceModel');

const getPendingLeaves = async (req, res) => {
  try {
    const leaves = await Leave.getPending();
    res.json(leaves);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const updateLeaveStatus = async (req, res) => {
  try {
    const { status, comment } = req.body;
    const leaveId = req.params.id;
    const managerId = req.user.id;

    const allLeaves = await Leave.getAll();
    const leave = allLeaves.find(l => l.id == leaveId);
    if (!leave) return res.status(404).json({ message: 'Leave request not found' });

    await Leave.updateStatus(leaveId, status, managerId, comment);

    if (status === 'approved') {
      const year = new Date(leave.start_date).getFullYear();
      await Balance.deduct(leave.user_id, leave.leave_type_id, leave.days, year);
    }

    res.json({ message: `Leave ${status} successfully` });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getAllLeaves = async (req, res) => {
  try {
    const leaves = await Leave.getAll();
    res.json(leaves);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { getPendingLeaves, updateLeaveStatus, getAllLeaves };
