// errorMiddleware.js
// Centralized error handling middleware

/**
 * Global error handler middleware
 * Catches all unhandled errors and formats them consistently
 * Logs errors for debugging while hiding sensitive information from clients
 * 
 * @param {Error} err - Error object
 * @param {Request} req - Express request object
 * @param {Response} res - Express response object
 * @param {NextFunction} next - Express next function
 */
const errorHandler = (err, req, res, next) => {
  // Log the full error for debugging
  console.error('Error caught by global handler:', {
    error: err.message,
    stack: err.stack,
    url: req.url,
    method: req.method
  });

  // Determine error status code
  const statusCode = err.statusCode || err.status || 500;

  // Prepare error response
  const errorResponse = {
    error: 'Internal server error',
    message: 'Something went wrong on our end',
    timestamp: new Date().toISOString(),
    path: req.url
  };

  // In development, include more error details
  if (process.env.NODE_ENV === 'development') {
    errorResponse.error = err.message;
    errorResponse.stack = err.stack;
  }

  // Send error response
  res.status(statusCode).json(errorResponse);
};

/**
 * Middleware to handle 404 errors (routes not found)
 * Should be placed after all route handlers
 * 
 * @param {Request} req - Express request object
 * @param {Response} res - Express response object
 */
const notFoundHandler = (req, res) => {
  res.status(404).json({
    error: 'Route not found',
    message: `The requested endpoint ${req.method} ${req.url} was not found`,
    timestamp: new Date().toISOString(),
    path: req.url
  });
};

module.exports = {
  errorHandler,
  notFoundHandler
};
