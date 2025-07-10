'use client';

// HomePage.tsx
// Main landing page component
import React from 'react';
import { useAuth } from '@/context/AuthContext';
import { HeroSection } from '@/components/home/HeroSection';
import { FeaturesSection } from '@/components/home/FeaturesSection';
import { HowItWorksSection } from '@/components/home/HowItWorksSection';

export default function HomePage() {
  const { isAuthenticated, isLoading } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <HeroSection isAuthenticated={isAuthenticated} isLoading={isLoading} />
      <FeaturesSection />
      <HowItWorksSection />
    </div>
  );
}
