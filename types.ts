export interface CoverSettings {
  prompt: string;
  negativePrompt: string;
  aspectRatio: '1:1' | '16:9' | '9:16' | '4:3' | '3:4';
  style: string;
}

export interface TypographySettings {
  title: string;
  theme: string;
  colors: string;
  elements: string;
  aspectRatio: '1:1' | '16:9' | '9:16' | '4:3' | '3:4';
}

export type GenerationState = 'idle' | 'loading' | 'success' | 'error';