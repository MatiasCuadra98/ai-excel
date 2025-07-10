// constants.ts
// Application constants and configuration values

export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/api/auth/login',
    PROFILE: '/api/users/profile',
  },
  EXCEL: {
    UPLOAD: '/api/excel/upload',
    PROCESS: '/api/excel/process',
    DOWNLOAD: '/api/excel/download',
  },
  IMAGES: {
    UPLOAD: '/api/images/upload',
    ANALYZE: '/api/images/analyze',
  },
} as const;

export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  DASHBOARD: '/dashboard',
  UPLOAD: '/upload',
  PROCESS: '/process',
  RESULTS: '/results',
} as const;

export const LOCAL_STORAGE_KEYS = {
  AUTH_TOKEN: 'auth_token',
  USER_PREFERENCES: 'user_preferences',
} as const;

export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Network error. Please check your connection.',
  AUTH_REQUIRED: 'Authentication required. Please log in.',
  INVALID_CREDENTIALS: 'Invalid email or password.',
  UPLOAD_FAILED: 'File upload failed. Please try again.',
  PROCESSING_FAILED: 'Processing failed. Please try again.',
} as const;

export const SUCCESS_MESSAGES = {
  LOGIN_SUCCESS: 'Successfully logged in!',
  LOGOUT_SUCCESS: 'Successfully logged out!',
  UPLOAD_SUCCESS: 'File uploaded successfully!',
  PROCESSING_SUCCESS: 'Processing completed successfully!',
} as const;
