

// src/routes/adminRoutes.js
const express = require('express');
const { getDashboard, createUser, updateUser, deleteUser } = require('../controllers/adminController');
const { protect, admin } = require('../middlewares/authMiddleware');

const router = express.Router();

router.route('/')
    .get(protect, admin, getDashboard);

router.route('/user')
    .post(protect, admin, createUser);

router.route('/user/:id')
    .put(protect, admin, updateUser)
    .delete(protect, admin, deleteUser);

module.exports = router;
