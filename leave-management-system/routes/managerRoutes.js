const express = require('express');
const router = express.Router();
const { getPendingLeaves, updateLeaveStatus, getAllLeaves } = require('../controllers/managerController');
const { verifyToken } = require('../middleware/authMiddleware');
const { authorizeRoles } = require('../middleware/roleMiddleware');

router.use(verifyToken, authorizeRoles('manager', 'admin'));
router.get('/pending', getPendingLeaves);
router.get('/all', getAllLeaves);
router.put('/status/:id', updateLeaveStatus);

module.exports = router;
