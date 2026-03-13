const express = require('express');
const { getPatients, addPatient } = require('../controllers/patientController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.route('/')
    .get(protect, getPatients)
    .post(protect, addPatient);

module.exports = router;
