import React, { useState } from 'react';
import { CoverGenerator } from './components/CoverGenerator';
import { TypographyGenerator } from './components/TypographyGenerator';

type AppView = 'intro' | 'menu' | 'cover' | 'typography';

const IntroScreen: React.FC<{ onNext: () => void }> = ({ onNext }) => (
  <div className="flex flex-col items-center justify-center min-h-screen p-6 animate-fade-in">
    <div className="w-full max-w-2xl text-center bg-brand-surface p-8 rounded-2xl shadow-2xl border border-gray-700">
      <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-brand-secondary to-brand-accent">
        GenVoid
      </h1>
      <p className="text-brand-text-secondary mb-4">
        This app was created by <span className="font-semibold text-brand-text">Genius_Void</span> to help webnovel authors.
      </p>
      <p className="text-brand-text-secondary mb-8">
        As of now, this app can create stunning webnovel covers and title typography. If you encounter any issues, please contact Genius_Void on Discord.
      </p>
      <button
        onClick={onNext}
        className="px-8 py-3 bg-gradient-to-r from-brand-primary to-brand-secondary text-white font-bold rounded-full hover:scale-105 transition-transform duration-300 focus:outline-none focus:ring-4 focus:ring-purple-400"
      >
        Get Started
      </button>
    </div>
  </div>
);

const MenuScreen: React.FC<{ onSelect: (view: AppView) => void }> = ({ onSelect }) => (
  <div className="flex flex-col items-center justify-center min-h-[calc(100vh-80px)] p-6 animate-fade-in">
     <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">What would you like to create?</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl">
      <div 
        onClick={() => onSelect('cover')} 
        className="group bg-brand-surface p-8 rounded-2xl shadow-lg border border-gray-700/50 cursor-pointer transition-all duration-300 hover:border-brand-primary hover:shadow-2xl hover:-translate-y-2">
        <h3 className="text-2xl font-bold mb-4 text-brand-accent">Create Cover</h3>
        <p className="text-brand-text-secondary">Generate breathtaking cover art for your novel from a simple text description.</p>
      </div>
      <div 
        onClick={() => onSelect('typography')} 
        className="group bg-brand-surface p-8 rounded-2xl shadow-lg border border-gray-700/50 cursor-pointer transition-all duration-300 hover:border-brand-primary hover:shadow-2xl hover:-translate-y-2">
        <h3 className="text-2xl font-bold mb-4 text-brand-accent">Create Typography</h3>
        <p className="text-brand-text-secondary">Design a unique and stylized title for your story with custom themes, colors, and elements.</p>
      </div>
    </div>
  </div>
);


const App: React.FC = () => {
  const [view, setView] = useState<AppView>('intro');

  const renderView = () => {
    switch (view) {
      case 'intro':
        return <IntroScreen onNext={() => setView('menu')} />;
      case 'menu':
        return <MenuScreen onSelect={setView} />;
      case 'cover':
        return <CoverGenerator onBack={() => setView('menu')} />;
      case 'typography':
        return <TypographyGenerator onBack={() => setView('menu')} />;
      default:
        return <IntroScreen onNext={() => setView('menu')} />;
    }
  };

  return (
    <div className="bg-brand-bg min-h-screen font-sans">
       {view !== 'intro' && (
        <header className="p-4 text-center sticky top-0 bg-brand-bg/80 backdrop-blur-sm z-10">
          <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-brand-secondary to-brand-accent">
            GenVoid
          </h1>
        </header>
      )}
      {renderView()}
    </div>
  );
};

export default App;