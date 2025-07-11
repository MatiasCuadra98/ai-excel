// chatRoutes.js
// Rutas para el chat con IA
const express = require('express');
const { authenticateToken } = require('../middlewares/authMiddleware');
const { chat } = require('../controllers/ChatController');

const router = express.Router();

// POST /api/chat - Send message to AI
router.post('/chat', authenticateToken, chat);

module.exports = router;
