const express = require('express');
const { createSurgery, getSurgeries, updateSurgeryStatus } = require('../controllers/surgeryController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.use(protect); // Ensure user is authenticated

router.route('/')
    .post(createSurgery)
    .get(getSurgeries);

router.route('/:id/status')
    .put(updateSurgeryStatus);

module.exports = router;
