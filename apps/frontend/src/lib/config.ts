// config.ts
// Application configuration
export const config = {
  app: {
    name: 'AI Excel',
    description: 'AI-powered Excel processing with image recognition',
    version: '1.0.0',
  },
  
  api: {
    baseUrl: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001',
    timeout: 30000, // 30 seconds
  },
  
  upload: {
    maxExcelSize: 10 * 1024 * 1024, // 10MB
    maxImageSize: 5 * 1024 * 1024,  // 5MB
    allowedExcelTypes: [
      'application/vnd.ms-excel',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    ],
    allowedImageTypes: [
      'image/jpeg',
      'image/png', 
      'image/webp',
      'image/gif',
    ],
  },
  
  auth: {
    tokenKey: 'auth_token',
    sessionTimeout: 24 * 60 * 60 * 1000, // 24 hours
  },
  
  ui: {
    theme: {
      primary: 'blue',
      secondary: 'slate',
    },
    pagination: {
      defaultPageSize: 10,
      pageSizeOptions: [5, 10, 25, 50],
    },
  },
  
  features: {
    enableImageProcessing: true,
    enableExcelProcessing: true,
    enableBatchProcessing: false, // Future feature
    enableRealTimeUpdates: false, // Future feature
  },
} as const;
