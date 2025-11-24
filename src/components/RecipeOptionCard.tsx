'use client';

import { useState, useEffect } from 'react';

interface RecipeOptionCardProps {
  recipe: {
    name: string;
    summary: string;
    imageUrl?: string;
  };
  isSelected: boolean;
  onToggle: () => void;
  onPreview: () => void;
  index: number;
}

export default function RecipeOptionCard({
  recipe,
  isSelected,
  onToggle,
  onPreview,
  index,
}: RecipeOptionCardProps) {
  const [imageLoading, setImageLoading] = useState(!recipe.imageUrl);

  useEffect(() => {
    if (recipe.imageUrl) {
      setImageLoading(false);
    }
  }, [recipe.imageUrl]);

  return (
    <button
      onClick={onPreview}
      className="w-full text-left group"
    >
      <div className={`p-4 bg-white rounded-2xl border-2 transition-all duration-300 ${
        isSelected 
          ? 'border-apricot-600 shadow-lg' 
          : 'border-cream-200 hover:border-cream-300 hover:shadow-medium'
      }`}>
        <div className="flex items-start gap-4">
          {/* Recipe Image */}
          <div className="relative w-16 h-16 flex-shrink-0 rounded-xl overflow-hidden bg-gradient-to-br from-cream-100 to-cream-200">
            {imageLoading ? (
              <div className="w-full h-full flex items-center justify-center">
                <div className="animate-spin rounded-full h-6 w-6 border-2 border-apricot-200 border-t-apricot-600" />
              </div>
            ) : recipe.imageUrl ? (
              <img 
                src={recipe.imageUrl} 
                alt={recipe.name} 
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-2xl">
                📷
              </div>
            )}
          </div>

          {/* Recipe Info */}
          <div className="flex-1 min-w-0">
            <h3 className="font-serif text-lg font-bold text-pantry mb-1 group-hover:text-apricot-600 transition-colors line-clamp-2">
              {recipe.name}
            </h3>
            <p className="text-sm text-pantry-400 line-clamp-2">
              {recipe.summary}
            </p>
          </div>

          {/* Selection Checkbox */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggle();
            }}
            className={`flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
              isSelected
                ? 'bg-apricot-600 border-apricot-600'
                : 'border-cream-300 hover:border-apricot-400'
            }`}
          >
            {isSelected && (
              <svg
                className="w-4 h-4 text-white"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M5 13l4 4L19 7" />
              </svg>
            )}
          </button>
        </div>

        {/* Preview hint */}
        {!isSelected && (
          <div className="mt-3 pt-3 border-t border-cream-100 text-xs text-pantry-400 flex items-center gap-1">
            <span>👁️</span>
            <span>Tap to preview full recipe</span>
          </div>
        )}
      </div>
    </button>
  );
}
