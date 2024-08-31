// src/routes/userRoutes.js
const express = require('express');
const { authUser, registerUser, getUserProfile } = require('../controllers/userController');
const { protect } = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/login', authUser);
router.post('/register', registerUser);
router.route('/profile').get(protect, getUserProfile);

module.exports = router;
