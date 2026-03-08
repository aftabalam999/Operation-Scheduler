const express = require('express');
const router = express.Router();
const { getPatients, addPatient, updatePatient, deletePatient } = require('../controllers/patientController');
const { protect, admin } = require('../middleware/authMiddleware');

router.route('/').get(protect, admin, getPatients).post(protect, admin, addPatient);
router.route('/:id').put(protect, admin, updatePatient).delete(protect, admin, deletePatient);

module.exports = router;
