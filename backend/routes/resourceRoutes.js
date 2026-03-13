const express = require('express');
const { getResources, addResource } = require('../controllers/resourceController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.route('/')
    .get(protect, getResources)
    .post(protect, addResource);

module.exports = router;
