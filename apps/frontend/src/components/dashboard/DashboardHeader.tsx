// DashboardHeader.tsx
// Header component for the dashboard page
'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { User } from '@/types/auth';

interface DashboardHeaderProps {
  user: User;
  onLogout: () => void;
}

/**
 * Dashboard header with user info and logout button
 */
export function DashboardHeader({ user, onLogout }: DashboardHeaderProps) {
  return (
    <div className="mb-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Dashboard</h1>
          <p className="text-slate-600 mt-1">Welcome back, {user.email}</p>
        </div>
        <Button variant="outline" onClick={onLogout}>
          Sign Out
        </Button>
      </div>
    </div>
  );
}
