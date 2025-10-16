import React from 'react';
import { Spinner } from './Spinner';
import type { GenerationState } from '../types';

interface ImageDisplayProps {
  state: GenerationState;
  imageUrl: string | null;
  error: string | null;
  fileName: string;
}

const DownloadIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
    </svg>
);


export const ImageDisplay: React.FC<ImageDisplayProps> = ({ state, imageUrl, error, fileName }) => {
    
  const handleDownload = () => {
    if (!imageUrl) return;
    const link = document.createElement('a');
    link.href = imageUrl;
    link.download = `${fileName}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
    
  return (
    <div className="w-full bg-brand-surface rounded-2xl p-6 border border-gray-700/50 flex items-center justify-center min-h-[400px] lg:min-h-[600px] transition-all duration-300">
      {state === 'loading' && <Spinner message="Generating your masterpiece..." />}
      {state === 'error' && <p className="text-red-400 text-center">{error}</p>}
      {state === 'success' && imageUrl && (
        <div className="relative group animate-fade-in">
          <img src={imageUrl} alt="Generated Art" className="rounded-lg max-h-[550px] object-contain shadow-2xl" />
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg">
            <button
                onClick={handleDownload}
                className="flex items-center px-6 py-3 bg-gradient-to-r from-brand-primary to-brand-secondary text-white font-bold rounded-full hover:scale-105 transition-transform duration-300 focus:outline-none focus:ring-4 focus:ring-purple-400"
            >
                <DownloadIcon />
                Download
            </button>
          </div>
        </div>
      )}
      {state === 'idle' && (
        <div className="text-center text-brand-text-secondary">
          <p>Your generated image will appear here.</p>
          <p className="text-sm">Fill out the options and click "Generate".</p>
        </div>
      )}
    </div>
  );
};