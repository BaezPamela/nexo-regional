const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

// Ruta de login
router.post('/login', adminController.login);

// Ruta de registro (opcional, para crear nuevos admins)
router.post('/register', adminController.register);

module.exports = router;