import React, { useState } from 'react';
import { generateCoverImage } from '../services/geminiService';
import type { CoverSettings, GenerationState } from '../types';
import { AnimatedPlaceholderInput } from './AnimatedPlaceholderInput';
import { GeneratorLayout } from './GeneratorLayout';
import { ImageDisplay } from './ImageDisplay';

export const CoverGenerator: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const [settings, setSettings] = useState<CoverSettings>({
    prompt: '',
    negativePrompt: 'bad limbs, unattached limbs, ugly, disfigured, blurry',
    aspectRatio: '3:4',
    style: 'Anime/Manga',
  });
  const [state, setState] = useState<GenerationState>('idle');
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setSettings(prev => ({ ...prev, [name]: value }));
  };
  
  const handleGenerate = async () => {
    if (!settings.prompt) {
      setError("Prompt cannot be empty.");
      return;
    }
    setState('loading');
    setError(null);
    setImageUrl(null);
    try {
      const url = await generateCoverImage(settings);
      setImageUrl(url);
      setState('success');
    } catch (err: any) {
      setError(err.message || 'An unknown error occurred.');
      setState('error');
    }
  };

  return (
    <GeneratorLayout title="Cover Generator" onBack={onBack}>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-brand-surface rounded-2xl p-6 border border-gray-700/50 flex flex-col space-y-6">
          <AnimatedPlaceholderInput
            label="Prompt"
            name="prompt"
            value={settings.prompt}
            onChange={handleChange}
            isTextarea={true}
            placeholders={[
                'A lone knight in glowing armor standing on a cliff overlooking a kingdom of clouds',
                'A young woman with silver hair holding a glowing crystal in a dark forest',
                'A futuristic city with flying cars and holographic billboards at night',
                'Two lovers embracing under a sky filled with two moons and swirling nebulae',
            ]}
          />
          <AnimatedPlaceholderInput
            label="Negative Prompt"
            name="negativePrompt"
            value={settings.negativePrompt}
            onChange={handleChange}
            isTextarea={true}
            placeholders={['']}
          />
            <div>
              <label htmlFor="style" className="block text-sm font-medium text-brand-text-secondary mb-2">Art Style</label>
              <select
                id="style"
                name="style"
                value={settings.style}
                onChange={handleChange}
                className="w-full p-3 bg-gray-800/50 border-2 border-gray-700 rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-brand-primary transition-colors duration-300"
              >
                <option value="Anime/Manga">Anime/Manga</option>
                <option value="Default">Default</option>
                <option value="Photorealistic">Photorealistic</option>
                <option value="Fantasy Art">Fantasy Art</option>
                <option value="Sci-Fi Concept Art">Sci-Fi Concept Art</option>
                <option value="Oil Painting">Oil Painting</option>
              </select>
            </div>
           <div>
              <label htmlFor="aspectRatio" className="block text-sm font-medium text-brand-text-secondary mb-2">Aspect Ratio</label>
              <select
                id="aspectRatio"
                name="aspectRatio"
                value={settings.aspectRatio}
                onChange={handleChange}
                className="w-full p-3 bg-gray-800/50 border-2 border-gray-700 rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-brand-primary transition-colors duration-300"
              >
                <option value="3:4">Portrait (3:4)</option>
                <option value="1:1">Square (1:1)</option>
                <option value="4:3">Landscape (4:3)</option>
                <option value="16:9">Widescreen (16:9)</option>
                <option value="9:16">Tall (9:16)</option>
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
                    onClick={() => {
                        // This "Refine" is simple: it just keeps the settings for re-generation.
                        // A more complex implementation could alter the prompt.
                        setState('idle');
                    }}
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
            fileName="webnovel-cover"
        />
      </div>
    </GeneratorLayout>
  );
};