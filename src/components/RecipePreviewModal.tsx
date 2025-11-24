'use client';

import { useEffect, useState } from 'react';
import NutritionLabel from './NutritionLabel';

interface Ingredient {
  quantity: number;
  unit: string;
  name: string;
}

interface Step {
  text: string;
  why?: string;
  hasTimer?: boolean;
  timerMinutes?: number;
  timerSeconds?: number;
}

interface RecipePreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  recipe: {
    name: string;
    summary?: string;
    imageUrl?: string;
    servings?: string;
    prepTime?: string;
    cookTime?: string;
    totalTime?: string;
    origin?: string;
    equipment?: string[];
    tags?: string[];
    tips?: string[];
    science?: string;
    storageCounter?: string;
    storageFreezer?: string;
    storageReheat?: string;
    flavorProfile?: string;
    ingredients: Ingredient[];
    steps: Step[];
    nutrition?: {
      calories?: number;
      fat?: number;
      saturatedFat?: number;
      transFat?: number;
      cholesterol?: number;
      sodium?: number;
      carbohydrates?: number;
      fiber?: number;
      sugars?: number;
      protein?: number;
    };
    dietaryLabels?: Array<'Vegetarian' | 'Vegan' | 'Gluten-Free' | 'Dairy-Free' | 'Nut-Free' | 'Low-Carb' | 'High-Protein'>;
    isAIGenerated?: boolean;
  };
  isAlreadySelected: boolean;
  onSave: () => void;
  onRemove: () => void;
}

export default function RecipePreviewModal({
  isOpen,
  onClose,
  recipe,
  isAlreadySelected,
  onSave,
  onRemove,
}: RecipePreviewModalProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [showSaveConfirmation, setShowSaveConfirmation] = useState(false);
  const [showRemoveConfirmation, setShowRemoveConfirmation] = useState(false);
  const [isCurrentlySelected, setIsCurrentlySelected] = useState(isAlreadySelected);
  const [activeTab, setActiveTab] = useState<'ingredients' | 'steps' | 'nutrition' | 'details'>('ingredients');

  useEffect(() => {
    if (isOpen) {
      setIsLoading(true);
      // Simulate model ready state like SwiftUI version
      const timer = setTimeout(() => setIsLoading(false), 100);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  useEffect(() => {
    setIsCurrentlySelected(isAlreadySelected);
  }, [isAlreadySelected]);

  const handleSave = () => {
    onSave();
    setIsCurrentlySelected(true);
    setShowSaveConfirmation(true);
    setTimeout(() => {
      onClose();
    }, 1500);
  };

  const handleRemove = () => {
    onRemove();
    setIsCurrentlySelected(false);
    setShowRemoveConfirmation(true);
    setTimeout(() => {
      onClose();
    }, 1500);
  };

  if (!isOpen) return null;

  const getDietaryLabelColor = (label: string): string => {
    const colorMap: Record<string, string> = {
      'Vegetarian': 'bg-green-100 text-green-700',
      'Vegan': 'bg-green-100 text-green-700',
      'Gluten-Free': 'bg-amber-100 text-amber-700',
      'Dairy-Free': 'bg-blue-100 text-blue-700',
      'Nut-Free': 'bg-purple-100 text-purple-700',
      'Low-Carb': 'bg-rose-100 text-rose-700',
      'High-Protein': 'bg-indigo-100 text-indigo-700',
    };
    return colorMap[label] || 'bg-gray-100 text-gray-700';
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="relative w-full max-w-4xl max-h-[90vh] bg-white rounded-3xl shadow-xl overflow-hidden flex flex-col">
        {/* Header with Close and Action buttons */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-cream-200 bg-white">
          <button
            onClick={onClose}
            className="text-pantry-400 hover:text-pantry transition-colors font-medium"
          >
            Close
          </button>
          <h2 className="font-serif text-xl font-bold text-pantry">Preview</h2>
          {isCurrentlySelected ? (
            <button
              onClick={handleRemove}
              className="text-apricot-600 hover:text-apricot-700 transition-colors font-semibold"
            >
              Remove
            </button>
          ) : (
            <button
              onClick={handleSave}
              className="text-apricot-600 hover:text-apricot-700 transition-colors font-semibold"
            >
              Add to Collection
            </button>
          )}
        </div>

        {/* Banner notifications */}
        {(showSaveConfirmation || showRemoveConfirmation || !isLoading) && (
          <div className={`px-6 py-3 text-center text-sm font-semibold ${
            showSaveConfirmation 
              ? 'bg-apricot-600 text-white'
              : showRemoveConfirmation
              ? 'bg-coral-500 text-white'
              : isCurrentlySelected
              ? 'bg-apricot-100 text-pantry'
              : 'bg-cream-200 text-pantry-400'
          }`}>
            {showSaveConfirmation ? (
              <div className="flex items-center justify-center gap-2">
                <span>✓</span>
                <span>Added to your collection!</span>
              </div>
            ) : showRemoveConfirmation ? (
              <div className="flex items-center justify-center gap-2">
                <span>−</span>
                <span>Removed from your collection!</span>
              </div>
            ) : isCurrentlySelected ? (
              <div className="flex items-center justify-center gap-2">
                <span>✓</span>
                <span>Already in your collection - Tap remove to unselect</span>
              </div>
            ) : (
              <div className="flex items-center justify-center gap-2">
                <span>👁️</span>
                <span>Preview Mode - Add to collection to save permanently</span>
              </div>
            )}
          </div>
        )}

        {/* Content */}
        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-apricot-200 border-t-apricot-600" />
          </div>
        ) : (
          <div className="flex-1 overflow-y-auto">
            {/* Hero Image */}
            {recipe.imageUrl && (
              <div className="relative w-full aspect-[16/9] bg-gradient-to-br from-apricot-100 to-coral-100">
                <img src={recipe.imageUrl} alt={recipe.name} className="w-full h-full object-cover" />
                {recipe.isAIGenerated && (
                  <div className="absolute top-4 right-4 bg-black/70 backdrop-blur-sm text-white px-3 py-2 rounded-full text-sm font-medium flex items-center gap-2">
                    <span>✨</span>
                    <span>AI-Generated</span>
                  </div>
                )}
              </div>
            )}

            {/* Recipe Header */}
            <div className="px-6 py-6">
              <h1 className="font-serif text-4xl font-bold text-pantry mb-3">{recipe.name}</h1>
              {recipe.summary && <p className="text-lg text-pantry-400 mb-4">{recipe.summary}</p>}

              {/* Meta Info */}
              <div className="flex flex-wrap gap-4 text-sm text-pantry-400 mb-4">
                {recipe.servings && <div className="flex items-center gap-1"><span>👥</span>{recipe.servings}</div>}
                {recipe.prepTime && <div className="flex items-center gap-1"><span>⏱️</span>Prep: {recipe.prepTime}</div>}
                {recipe.cookTime && <div className="flex items-center gap-1"><span>🔥</span>Cook: {recipe.cookTime}</div>}
                {recipe.totalTime && <div className="flex items-center gap-1"><span>⏰</span>Total: {recipe.totalTime}</div>}
              </div>

              {/* Dietary Labels */}
              {recipe.dietaryLabels && recipe.dietaryLabels.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-6">
                  {recipe.dietaryLabels.map((label) => (
                    <span key={label} className={`px-3 py-1 rounded-full text-xs font-medium ${getDietaryLabelColor(label)}`}>
                      {label}
                    </span>
                  ))}
                </div>
              )}

              {/* Tabs */}
              <div className="flex gap-2 border-b border-cream-200 mb-6">
                {(['ingredients', 'steps', 'nutrition', 'details'] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-4 py-2 font-medium capitalize transition-colors ${
                      activeTab === tab
                        ? 'text-apricot-600 border-b-2 border-apricot-600'
                        : 'text-pantry-400 hover:text-pantry'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              {/* Tab Content */}
              {activeTab === 'ingredients' && (
                <div className="space-y-3">
                  <h3 className="font-serif text-2xl font-bold text-pantry mb-4">Ingredients</h3>
                  {recipe.ingredients.map((ingredient, index) => (
                    <div key={index} className="flex items-start gap-3 p-3 bg-cream-50 rounded-lg">
                      <div className="w-6 h-6 rounded-full bg-apricot-100 text-apricot-600 flex items-center justify-center text-sm font-semibold flex-shrink-0">
                        {index + 1}
                      </div>
                      <div className="flex-1">
                        <span className="font-medium text-pantry">{ingredient.quantity} {ingredient.unit}</span>
                        <span className="text-pantry ml-2">{ingredient.name}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === 'steps' && (
                <div className="space-y-4">
                  <h3 className="font-serif text-2xl font-bold text-pantry mb-4">Instructions</h3>
                  {recipe.steps.map((step, index) => (
                    <div key={index} className="flex gap-4">
                      <div className="w-8 h-8 rounded-full bg-apricot-600 text-white flex items-center justify-center text-sm font-bold flex-shrink-0">
                        {index + 1}
                      </div>
                      <div className="flex-1">
                        <p className="text-pantry mb-2">{step.text}</p>
                        {step.why && (
                          <p className="text-sm text-pantry-400 italic bg-cream-50 p-3 rounded-lg">
                            <span className="font-semibold not-italic">Why:</span> {step.why}
                          </p>
                        )}
                        {step.hasTimer && (step.timerMinutes || step.timerSeconds) && (
                          <div className="flex items-center gap-2 mt-2 text-sm text-apricot-600">
                            <span>⏱️</span>
                            <span className="font-medium">
                              Timer: {step.timerMinutes ? `${step.timerMinutes}m` : ''}{step.timerSeconds ? ` ${step.timerSeconds}s` : ''}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === 'nutrition' && recipe.nutrition && (
                <NutritionLabel
                  servingsMin={parseInt(recipe.servings?.split(' ')[0] || '4')}
                  servingsMax={parseInt(recipe.servings?.split(' ')[0] || '4')}
                  calories={recipe.nutrition.calories}
                  fat={recipe.nutrition.fat}
                  saturatedFat={recipe.nutrition.saturatedFat}
                  transFat={recipe.nutrition.transFat}
                  cholesterol={recipe.nutrition.cholesterol}
                  sodium={recipe.nutrition.sodium}
                  carbs={recipe.nutrition.carbohydrates}
                  fiber={recipe.nutrition.fiber}
                  sugars={recipe.nutrition.sugars}
                  protein={recipe.nutrition.protein}
                  dietaryLabels={recipe.dietaryLabels}
                  isAIGenerated={recipe.isAIGenerated}
                />
              )}

              {activeTab === 'details' && (
                <div className="space-y-6">
                  {recipe.origin && (
                    <div>
                      <h4 className="font-serif text-xl font-bold text-pantry mb-2">Origin</h4>
                      <p className="text-pantry-400">{recipe.origin}</p>
                    </div>
                  )}
                  {recipe.flavorProfile && (
                    <div>
                      <h4 className="font-serif text-xl font-bold text-pantry mb-2">Flavor Profile</h4>
                      <p className="text-pantry-400">{recipe.flavorProfile}</p>
                    </div>
                  )}
                  {recipe.equipment && recipe.equipment.length > 0 && (
                    <div>
                      <h4 className="font-serif text-xl font-bold text-pantry mb-2">Equipment</h4>
                      <ul className="list-disc list-inside text-pantry-400 space-y-1">
                        {recipe.equipment.map((item, index) => (
                          <li key={index}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {recipe.tips && recipe.tips.length > 0 && (
                    <div>
                      <h4 className="font-serif text-xl font-bold text-pantry mb-2">Tips</h4>
                      <ul className="list-disc list-inside text-pantry-400 space-y-1">
                        {recipe.tips.map((tip, index) => (
                          <li key={index}>{tip}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {recipe.science && (
                    <div>
                      <h4 className="font-serif text-xl font-bold text-pantry mb-2">The Science</h4>
                      <p className="text-pantry-400">{recipe.science}</p>
                    </div>
                  )}
                  {(recipe.storageCounter || recipe.storageFreezer || recipe.storageReheat) && (
                    <div>
                      <h4 className="font-serif text-xl font-bold text-pantry mb-3">Storage</h4>
                      {recipe.storageCounter && (
                        <div className="mb-2">
                          <span className="font-semibold text-pantry">Counter:</span>
                          <span className="text-pantry-400 ml-2">{recipe.storageCounter}</span>
                        </div>
                      )}
                      {recipe.storageFreezer && (
                        <div className="mb-2">
                          <span className="font-semibold text-pantry">Freezer:</span>
                          <span className="text-pantry-400 ml-2">{recipe.storageFreezer}</span>
                        </div>
                      )}
                      {recipe.storageReheat && (
                        <div>
                          <span className="font-semibold text-pantry">Reheat:</span>
                          <span className="text-pantry-400 ml-2">{recipe.storageReheat}</span>
                        </div>
                      )}
                    </div>
                  )}
                  {recipe.tags && recipe.tags.length > 0 && (
                    <div>
                      <h4 className="font-serif text-xl font-bold text-pantry mb-2">Tags</h4>
                      <div className="flex flex-wrap gap-2">
                        {recipe.tags.map((tag, index) => (
                          <span key={index} className="px-3 py-1 bg-cream-100 text-pantry-400 rounded-full text-sm">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
