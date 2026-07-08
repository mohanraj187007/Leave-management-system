const express = require('express');
const router = express.Router();
const { getAllUsers, createUser, updateUser, deleteUser, getLeaveTypes, createLeaveType, deleteLeaveType, getReport } = require('../controllers/adminController');
const { verifyToken } = require('../middleware/authMiddleware');
const { authorizeRoles } = require('../middleware/roleMiddleware');

router.use(verifyToken, authorizeRoles('admin'));
router.get('/users', getAllUsers);
router.post('/users', createUser);
router.put('/users/:id', updateUser);
router.delete('/users/:id', deleteUser);
router.get('/leave-types', getLeaveTypes);
router.post('/leave-types', createLeaveType);
router.delete('/leave-types/:id', deleteLeaveType);
router.get('/report', getReport);

module.exports = router;
