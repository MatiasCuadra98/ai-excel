// utils/validation.ts
// Utility functions for data validation

/**
 * Validate email format
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Validate password strength
 */
export function isValidPassword(password: string): boolean {
  // At least 5 characters (for demo purposes, in production should be stronger)
  return password.length >= 5;
}

/**
 * Validate file type for Excel files
 */
export function isValidExcelFile(file: File): boolean {
  const allowedTypes = [
    'application/vnd.ms-excel',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    '.xlsx',
    '.xls',
  ];
  
  return allowedTypes.some(type => 
    file.type === type || file.name.toLowerCase().endsWith(type)
  );
}

/**
 * Validate file type for images
 */
export function isValidImageFile(file: File): boolean {
  const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
  return allowedTypes.includes(file.type);
}

/**
 * Validate file size (in bytes)
 */
export function isValidFileSize(file: File, maxSizeInMB: number): boolean {
  const maxSizeInBytes = maxSizeInMB * 1024 * 1024;
  return file.size <= maxSizeInBytes;
}

/**
 * Get validation error messages
 */
export const getValidationErrors = {
  email: (email: string) => {
    if (!email) return 'Email is required';
    if (!isValidEmail(email)) return 'Please enter a valid email address';
    return null;
  },
  
  password: (password: string) => {
    if (!password) return 'Password is required';
    if (!isValidPassword(password)) return 'Password must be at least 5 characters long';
    return null;
  },
  
  excelFile: (file: File) => {
    if (!isValidExcelFile(file)) return 'Please select a valid Excel file (.xlsx or .xls)';
    if (!isValidFileSize(file, 10)) return 'File size must be less than 10MB';
    return null;
  },
  
  imageFile: (file: File) => {
    if (!isValidImageFile(file)) return 'Please select a valid image file (JPEG, PNG, WebP, or GIF)';
    if (!isValidFileSize(file, 5)) return 'Image size must be less than 5MB';
    return null;
  },
};
