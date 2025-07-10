// userRoutes.js
// Routes for user-related operations
const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../middlewares/authMiddleware');

/**
 * GET /api/users/profile
 * Protected route to get current user profile
 * Requires valid JWT token
 */
router.get('/profile', authenticateToken, (req, res) => {
  try {
    // User info is available from authMiddleware
    res.json({
      success: true,
      user: {
        id: req.user.id,
        email: req.user.email
      },
      message: 'Profile retrieved successfully'
    });
  } catch (error) {
    res.status(500).json({
      error: 'Failed to retrieve profile',
      message: 'An error occurred while getting user profile'
    });
  }
});

module.exports = router;
