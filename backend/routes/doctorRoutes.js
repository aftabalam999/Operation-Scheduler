const express = require('express');
const { getDoctors, addDoctor } = require('../controllers/doctorController');
const { protect, admin } = require('../middleware/authMiddleware');

const router = express.Router();

router.route('/')
    .get(getDoctors)
    .post(protect, admin, addDoctor);

module.exports = router;
