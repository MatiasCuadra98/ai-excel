// UserInfoCard.tsx
// User information card component
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { User } from '@/types/auth';

interface UserInfoCardProps {
  user: User;
}

/**
 * User information display card
 */
export function UserInfoCard({ user }: UserInfoCardProps) {
  return (
    <Card className="mt-8">
      <CardHeader>
        <CardTitle>Account Information</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <p><span className="font-medium">Email:</span> {user.email}</p>
          <p><span className="font-medium">User ID:</span> {user.id}</p>
        </div>
      </CardContent>
    </Card>
  );
}
