const express = require('express');
const router = express.Router();
const { applyLeave, getMyLeaves, getMyBalance, cancelLeave, getLeaveTypes } = require('../controllers/leaveController');
const { verifyToken } = require('../middleware/authMiddleware');

router.use(verifyToken);
router.post('/apply', applyLeave);
router.get('/my-leaves', getMyLeaves);
router.get('/balance', getMyBalance);
router.delete('/cancel/:id', cancelLeave);
router.get('/types', getLeaveTypes);

module.exports = router;
