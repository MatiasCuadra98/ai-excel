// HowItWorksSection.tsx
// How it works section component for the landing page
import React from 'react';

/**
 * How it works section explaining the process steps
 */
export function HowItWorksSection() {
  const steps = [
    {
      number: 1,
      title: 'Upload Excel File',
      description: 'Upload your Excel file containing product data or image references',
    },
    {
      number: 2,
      title: 'Add Images',
      description: 'Upload product images that need to be analyzed and categorized',
    },
    {
      number: 3,
      title: 'AI Processing',
      description: 'Our AI analyzes images and matches them with your Excel data',
    },
    {
      number: 4,
      title: 'Download Results',
      description: 'Get your enhanced Excel file with AI-generated insights and categories',
    },
  ];

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">
            How It Works
          </h2>
          <p className="text-lg text-slate-600">
            Simple steps to enhance your Excel files with AI
          </p>
        </div>
        
        <div className="space-y-8">
          {steps.map((step) => (
            <div key={step.number} className="flex items-center space-x-4">
              <div className="flex-shrink-0 w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                {step.number}
              </div>
              <div>
                <h3 className="text-lg font-semibold text-slate-900">{step.title}</h3>
                <p className="text-slate-600">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
