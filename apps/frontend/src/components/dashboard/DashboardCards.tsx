// DashboardCards.tsx
// Action cards component for the dashboard
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

/**
 * Dashboard action cards for main features
 */
export function DashboardCards() {
  const cards = [
    {
      title: 'Upload Excel',
      description: 'Upload your Excel file to start processing',
      action: 'Upload File',
      disabled: true,
    },
    {
      title: 'Process Images',
      description: 'Use AI to analyze and categorize product images',
      action: 'Process Images',
      disabled: true,
    },
    {
      title: 'View Results',
      description: 'Review and download your processed Excel files',
      action: 'View Results',
      disabled: true,
    },
  ];

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {cards.map((card, index) => (
        <Card key={index}>
          <CardHeader>
            <CardTitle>{card.title}</CardTitle>
            <CardDescription>{card.description}</CardDescription>
          </CardHeader>
          <CardContent>
            <Button className="w-full" disabled={card.disabled}>
              {card.disabled ? 'Coming Soon' : card.action}
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
