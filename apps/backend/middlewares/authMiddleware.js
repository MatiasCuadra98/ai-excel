// authMiddleware.js
// Middleware para verificar autenticación JWT
const jwt = require('jsonwebtoken');
const db = require('../db');

/**
 * Middleware to verify JWT token and authenticate user
 * Extracts token from Authorization header and validates it
 * Adds user information to req.user for subsequent middleware/routes
 * 
 * @param {Request} req - Express request object
 * @param {Response} res - Express response object
 * @param {NextFunction} next - Express next function
 */
const authenticateToken = async (req, res, next) => {
  try {
    // Extract token from Authorization header (Bearer <token>)
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

    if (!token) {
      return res.status(401).json({ 
        error: 'Access token required',
        message: 'Please provide a valid authorization token' 
      });
    }

    // Verify JWT token
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'changeme');
    
    // Get user from database to ensure user still exists and is active
    const user = await db.User.findByPk(decoded.id);
    
    if (!user) {
      return res.status(401).json({ 
        error: 'Invalid token',
        message: 'User associated with token no longer exists' 
      });
    }

    // Add user info to request object for use in protected routes
    req.user = {
      id: user.id,
      email: user.email,
      username: user.username
    };

    next();
  } catch (error) {
    // Handle JWT specific errors
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ 
        error: 'Invalid token',
        message: 'The provided token is malformed or invalid' 
      });
    }
    
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ 
        error: 'Token expired',
        message: 'The provided token has expired, please login again' 
      });
    }

    // Log unexpected errors for debugging
    console.error('Authentication middleware error:', error.message);
    return res.status(500).json({ 
      error: 'Internal server error',
      message: 'An error occurred during authentication' 
    });
  }
};

/**
 * Optional authentication middleware
 * Similar to authenticateToken but doesn't fail if no token is provided
 * Useful for routes that can work with or without authentication
 * 
 * @param {Request} req - Express request object
 * @param {Response} res - Express response object
 * @param {NextFunction} next - Express next function
 */
const optionalAuth = async (req, res, next) => {
  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
      // No token provided, continue without user info
      req.user = null;
      return next();
    }

    // If token is provided, validate it
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'changeme');
    const user = await db.User.findByPk(decoded.id);
    
    req.user = user ? { id: user.id, email: user.email, username: user.username } : null;
    next();
  } catch (error) {
    // If token validation fails, continue without user info
    req.user = null;
    next();
  }
};

module.exports = {
  authenticateToken,
  optionalAuth
};
