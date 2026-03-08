const express = require('express');
const router = express.Router();
const { getDoctors, addDoctor, updateDoctor, deleteDoctor, getDoctorProfile, saveDoctorProfile } = require('../controllers/doctorController');
const { protect, admin, doctorOrAdmin } = require('../middleware/authMiddleware');

router.route('/profile').get(protect, doctorOrAdmin, getDoctorProfile).post(protect, doctorOrAdmin, saveDoctorProfile).put(protect, doctorOrAdmin, saveDoctorProfile);
router.route('/').get(protect, getDoctors).post(protect, admin, addDoctor);
router.route('/:id').put(protect, admin, updateDoctor).delete(protect, admin, deleteDoctor);

module.exports = router;
