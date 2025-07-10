// authRoutes.js
// Rutas de autenticación
const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/AuthController');

// POST /api/auth/login
router.post('/login', AuthController.login);

module.exports = router;
