'use client';

// LoginPage.tsx
// Authentication page for user login
import React from 'react';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { LoginForm } from '@/components/auth/LoginForm';

export default function LoginPage() {
  return (
    <ProtectedRoute requireAuth={false} redirectIfAuthenticated={true}>
      <LoginForm />
    </ProtectedRoute>
  );
}
