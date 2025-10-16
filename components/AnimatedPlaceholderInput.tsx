
import React, { useState, useEffect, useRef } from 'react';

interface AnimatedPlaceholderInputProps {
  placeholders: string[];
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  isTextarea?: boolean;
  name: string;
  label: string;
}

export const AnimatedPlaceholderInput: React.FC<AnimatedPlaceholderInputProps> = ({
  placeholders,
  value,
  onChange,
  isTextarea = false,
  name,
  label,
}) => {
  const [placeholder, setPlaceholder] = useState(placeholders[0]);
  const [isTyping, setIsTyping] = useState(false);
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    if (!isTyping && placeholders.length > 1) {
      let i = 0;
      intervalRef.current = window.setInterval(() => {
        i = (i + 1) % placeholders.length;
        setPlaceholder(placeholders[i]);
      }, 3000);
    } else if (intervalRef.current) {
      window.clearInterval(intervalRef.current);
    }

    return () => {
      if (intervalRef.current) {
        window.clearInterval(intervalRef.current);
      }
    };
  }, [isTyping, placeholders]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (!isTyping) setIsTyping(true);
    onChange(e);
  };

  const commonProps = {
    name,
    value,
    onChange: handleChange,
    placeholder: `e.g., ${placeholder}`,
    className: 'w-full p-3 bg-gray-800/50 border-2 border-gray-700 rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-brand-primary transition-colors duration-300 placeholder-gray-500'
  };

  return (
    <div className="w-full">
      <label htmlFor={name} className="block text-sm font-medium text-brand-text-secondary mb-2">{label}</label>
      {isTextarea ? (
        <textarea {...commonProps} rows={4}></textarea>
      ) : (
        <input {...commonProps} type="text" />
      )}
    </div>
  );
};
