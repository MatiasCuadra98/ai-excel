// DashboardPage.tsx
// Protected dashboard page
'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { useAuth } from '@/context/AuthContext';
import { DashboardHeader } from '@/components/dashboard/DashboardHeader';
import { DashboardCards } from '@/components/dashboard/DashboardCards';
import { UserInfoCard } from '@/components/dashboard/UserInfoCard';
import { ChatComponent } from '@/components/chat/ChatComponent';

export default function DashboardPage() {
  const { user, logout } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  return (
    <ProtectedRoute requireAuth={true}>
      <div className="min-h-screen bg-slate-50 py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {user && (
            <>
              <DashboardHeader user={user} onLogout={handleLogout} />
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
                {/* Left Column - Dashboard Info */}
                <div className="space-y-6">
                  <DashboardCards />
                  <UserInfoCard user={user} />
                </div>
                
                {/* Right Column - AI Chat */}
                <div>
                  <ChatComponent />
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </ProtectedRoute>
  );
}
