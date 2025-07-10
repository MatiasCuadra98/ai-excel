require('dotenv').config({ silent: true });
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const app = express();
const PORT = process.env.PORT || 3001;
const db = require('./db');
const { errorHandler, notFoundHandler } = require('./middlewares/errorMiddleware');

// Log environment loaded
console.log('.env read correctly');

// Security and CORS middleware
app.use(helmet());
app.use(cors());

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Request logging middleware (in development)
if (process.env.NODE_ENV === 'development') {
  app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
  });
}

// Health check route
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

// Import and use routes here
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);

// 404 handler - must be after all routes
app.use(notFoundHandler);

// Global error handler middleware - must be last
app.use(errorHandler);

// Test DB connection on startup
(async () => {
  try {
    await db.sequelize.authenticate();
    console.log('Database conection established successfully');
  } catch (error) {
    console.error('Error connecting to the database:', error.message);
    process.exit(1);
  }
})();

app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
});
