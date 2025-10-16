import React, { useState } from 'react';
import { generateTypographyImage } from '../services/geminiService';
import type { TypographySettings, GenerationState } from '../types';
import { AnimatedPlaceholderInput } from './AnimatedPlaceholderInput';
import { GeneratorLayout } from './GeneratorLayout';
import { ImageDisplay } from './ImageDisplay';

const defaultOptions = {
    themes: ['Epic Fantasy with magical glows', 'Sleek High-Tech Sci-Fi', 'Elegant Dark Romance', 'Mysterious Cosmic Horror', 'Painted Storybook style'],
    colors: ['glowing gold and deep purple', 'electric blue and neon pink', 'blood red and silver', 'black and ethereal white', 'earthy greens and browns'],
    elements: ['swirling magical energy', 'circuit board patterns and data streams', 'thorny roses and filigree', 'ancient, cryptic runes', 'delicate constellations'],
};

const getRandomItem = (arr: string[]) => arr[Math.floor(Math.random() * arr.length)];


export const TypographyGenerator: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const [settings, setSettings] = useState<TypographySettings>({
    title: '',
    theme: '',
    colors: '',
    elements: '',
    aspectRatio: '16:9',
  });
  const [state, setState] = useState<GenerationState>('idle');
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setSettings(prev => ({ ...prev, [name]: value }));
  };

  const handleGenerate = async () => {
    if (!settings.title.trim()) {
      setError("Novel Title is required.");
      setState('error');
      return;
    }
    setState('loading');
    setError(null);
    setImageUrl(null);

    const finalSettings = { ...settings };

    if (!finalSettings.theme.trim()) {
        finalSettings.theme = getRandomItem(defaultOptions.themes);
    }
    if (!finalSettings.colors.trim()) {
        finalSettings.colors = getRandomItem(defaultOptions.colors);
    }
    if (!finalSettings.elements.trim()) {
        finalSettings.elements = getRandomItem(defaultOptions.elements);
    }

    try {
      const url = await generateTypographyImage(finalSettings);
      setImageUrl(url);
      setState('success');
    } catch (err: any) {
      setError(err.message || 'An unknown error occurred.');
      setState('error');
    }
  };

  return (
    <GeneratorLayout title="Typography Generator" onBack={onBack}>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-brand-surface rounded-2xl p-6 border border-gray-700/50 flex flex-col space-y-6">
          <AnimatedPlaceholderInput
            label="Novel Title (Required)"
            name="title"
            value={settings.title}
            onChange={handleChange}
            placeholders={['Chronicles of Atheria', 'Cybernetic Dawn', 'Echoes of the Void']}
          />
          <AnimatedPlaceholderInput
            label="Theme / Design (Optional)"
            name="theme"
            value={settings.theme}
            onChange={handleChange}
            placeholders={['epic fantasy, magical', 'high-tech sci-fi, neon', 'dark romance, elegant']}
          />
          <AnimatedPlaceholderInput
            label="Colors (Optional)"
            name="colors"
            value={settings.colors}
            onChange={handleChange}
            placeholders={['deep purple, glowing gold', 'electric blue, cyberpunk pink', 'blood red, black, silver']}
          />
          <AnimatedPlaceholderInput
            label="Elements to Include (Optional)"
            name="elements"
            value={settings.elements}
            onChange={handleChange}
            placeholders={['ancient runes, swirling magical energy', 'circuits, data streams, glitch effect', 'thorny roses, ornate filigree']}
          />
           <div>
              <label htmlFor="aspectRatio" className="block text-sm font-medium text-brand-text-secondary mb-2">Aspect Ratio</label>
              <select
                id="aspectRatio"
                name="aspectRatio"
                value={settings.aspectRatio}
                onChange={handleChange}
                className="w-full p-3 bg-gray-800/50 border-2 border-gray-700 rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-brand-primary transition-colors duration-300"
              >
                <option value="16:9">Widescreen (16:9)</option>
                <option value="9:16">Tall (9:16)</option>
                <option value="4:3">Landscape (4:3)</option>
                <option value="3:4">Portrait (3:4)</option>
                <option value="1:1">Square (1:1)</option>
              </select>
            </div>
           <div className="flex space-x-4 pt-4">
                <button 
                    onClick={handleGenerate} 
                    disabled={state === 'loading'}
                    className="w-full px-6 py-3 bg-gradient-to-r from-brand-primary to-brand-secondary text-white font-bold rounded-full hover:scale-105 transition-transform duration-300 focus:outline-none focus:ring-4 focus:ring-purple-400 disabled:opacity-50 disabled:cursor-not-allowed disabled:scale-100"
                >
                    {state === 'loading' ? 'Generating...' : 'Generate'}
                </button>
                 <button 
                    onClick={() => setState('idle')}
                    disabled={!imageUrl}
                    className="w-full px-6 py-3 bg-brand-surface text-brand-text font-bold rounded-full border-2 border-brand-primary hover:bg-brand-primary/20 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    Refine
                </button>
            </div>
        </div>
        
        <ImageDisplay
            state={state}
            imageUrl={imageUrl}
            error={error}
            fileName="webnovel-typography"
        />
      </div>
    </GeneratorLayout>
  );
};