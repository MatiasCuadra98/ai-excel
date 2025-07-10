// ProtectedRoute.tsx
// Higher-order component for protecting routes
'use client';

import React from 'react';
import { useRouteProtection } from '@/hooks/useRouteProtection';
import { FullScreenLoading } from '@/components/ui/LoadingSpinner';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireAuth?: boolean;
  redirectTo?: string;
  redirectIfAuthenticated?: boolean;
}

/**
 * Higher-order component to protect routes based on authentication
 */
export function ProtectedRoute({
  children,
  requireAuth = true,
  redirectTo = '/login',
  redirectIfAuthenticated = false,
}: ProtectedRouteProps) {
  const { isLoading, shouldRender } = useRouteProtection({
    requireAuth,
    redirectTo,
    redirectIfAuthenticated,
  });

  if (isLoading) {
    return <FullScreenLoading />;
  }

  if (!shouldRender) {
    return null;
  }

  return <>{children}</>;
}
