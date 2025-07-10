'use client';

// useRouteProtection.ts
// Hook for protecting routes and handling authentication redirects
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

interface RouteProtectionOptions {
  redirectTo?: string;
  requireAuth?: boolean;
  redirectIfAuthenticated?: boolean;
}

/**
 * Hook to protect routes based on authentication status
 * @param options - Configuration for route protection
 */
export function useRouteProtection({
  redirectTo = '/login',
  requireAuth = true,
  redirectIfAuthenticated = false,
}: RouteProtectionOptions = {}) {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isLoading) return;

    if (requireAuth && !isAuthenticated) {
      router.push(redirectTo);
    }

    if (redirectIfAuthenticated && isAuthenticated) {
      router.push('/dashboard');
    }
  }, [isAuthenticated, isLoading, router, redirectTo, requireAuth, redirectIfAuthenticated]);

  return {
    isAuthenticated,
    isLoading,
    shouldRender: isLoading || (requireAuth ? isAuthenticated : !redirectIfAuthenticated || !isAuthenticated),
  };
}
