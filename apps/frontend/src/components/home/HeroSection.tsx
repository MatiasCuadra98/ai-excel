// HeroSection.tsx
// Hero section component for the landing page
import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

interface HeroSectionProps {
  isAuthenticated: boolean;
  isLoading: boolean;
}

/**
 * Hero section with main heading and call-to-action buttons
 */
export function HeroSection({ isAuthenticated, isLoading }: HeroSectionProps) {
  return (
    <section className="pt-20 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 mb-6">
          AI-Powered Excel
          <span className="block text-blue-600">Processing</span>
        </h1>
        <p className="text-xl text-slate-600 mb-8 max-w-2xl mx-auto">
          Transform your Excel files with intelligent image recognition and automatic 
          categorization. Upload images, let AI analyze them, and get enhanced spreadsheets.
        </p>
        
        {!isLoading && (
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {isAuthenticated ? (
              <Link href="/dashboard">
                <Button size="lg" className="w-full sm:w-auto">
                  Go to Dashboard
                </Button>
              </Link>
            ) : (
              <>
                <Link href="/login">
                  <Button size="lg" className="w-full sm:w-auto">
                    Get Started
                  </Button>
                </Link>
                <Button variant="outline" size="lg" className="w-full sm:w-auto">
                  Watch Demo
                </Button>
              </>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
