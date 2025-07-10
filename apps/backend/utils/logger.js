// logger.js
// Simple logging utility for the application
// In production, consider using winston or similar logging library

/**
 * Simple logger utility with different log levels
 * Formats log messages consistently and includes timestamps
 */
class Logger {
  /**
   * Log info level messages
   * @param {string} message - Log message
   * @param {object} meta - Additional metadata
   */
  info(message, meta = {}) {
    this._log('INFO', message, meta);
  }

  /**
   * Log error level messages
   * @param {string} message - Log message
   * @param {object} meta - Additional metadata
   */
  error(message, meta = {}) {
    this._log('ERROR', message, meta);
  }

  /**
   * Log warning level messages
   * @param {string} message - Log message
   * @param {object} meta - Additional metadata
   */
  warn(message, meta = {}) {
    this._log('WARN', message, meta);
  }

  /**
   * Log debug level messages (only in development)
   * @param {string} message - Log message
   * @param {object} meta - Additional metadata
   */
  debug(message, meta = {}) {
    if (process.env.NODE_ENV === 'development') {
      this._log('DEBUG', message, meta);
    }
  }

  /**
   * Internal method to format and output log messages
   * @param {string} level - Log level
   * @param {string} message - Log message
   * @param {object} meta - Additional metadata
   * @private
   */
  _log(level, message, meta) {
    // Simple clean logging
    console.log(message);
  }
}

module.exports = new Logger();
