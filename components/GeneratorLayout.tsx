
import React from 'react';

interface GeneratorLayoutProps {
  title: string;
  onBack: () => void;
  children: React.ReactNode;
}

export const GeneratorLayout: React.FC<GeneratorLayoutProps> = ({ title, onBack, children }) => {
  return (
    <div className="min-h-screen p-4 sm:p-6 lg:p-8 animate-slide-in-up">
      <div className="max-w-7xl mx-auto">
        <button
          onClick={onBack}
          className="flex items-center text-brand-text-secondary hover:text-brand-text mb-6 transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
          Back to Menu
        </button>
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-8 bg-clip-text text-transparent bg-gradient-to-r from-brand-secondary to-brand-accent">
          {title}
        </h1>
        {children}
      </div>
    </div>
  );
};
