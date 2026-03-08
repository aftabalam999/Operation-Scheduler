const express = require('express');
const router = express.Router();
const { getSchedules, addSchedule, updateSchedule, deleteSchedule } = require('../controllers/scheduleController');
const { protect, admin } = require('../middleware/authMiddleware');

router.route('/').get(protect, getSchedules).post(protect, admin, addSchedule);
router.route('/:id').put(protect, admin, updateSchedule).delete(protect, admin, deleteSchedule);

module.exports = router;
