export function PhotoRecognitionIllustration() {
  return (
    <div className="relative w-full h-full bg-gradient-to-br from-apricot-50 to-coral-50 rounded-2xl p-8 flex items-center justify-center overflow-hidden">
      {/* Ingredient List View (matching the review screen) */}
      <div className="w-full max-w-sm bg-white rounded-2xl shadow-2xl overflow-hidden border border-cream-200">
        {/* Header with photos */}
        <div className="bg-cream-100 p-3 border-b border-cream-200">
          <div className="flex gap-2 overflow-x-auto">
            {['🥖', '🥛', '🥬'].map((emoji, i) => (
              <div key={i} className="w-16 h-16 bg-gradient-to-br from-cream-200 to-apricot-100 rounded-lg flex items-center justify-center text-2xl flex-shrink-0">
                {emoji}
              </div>
            ))}
          </div>
        </div>
        
        {/* Title */}
        <div className="p-4 pb-2 text-center">
          <h3 className="font-bold text-lg text-pantry mb-1">Review & Edit Ingredients</h3>
          <p className="text-xs text-pantry-400">Add, remove, or correct items before generating recipes</p>
        </div>
        
        {/* Ingredient List */}
        <div className="px-4 pb-4 space-y-2">
          {[
            { name: 'Eggs', icon: '🥚' },
            { name: 'Milk', icon: '🥛' },
            { name: 'Cheddar Cheese', icon: '🧀' },
            { name: 'Fresh Spinach', icon: '🥬' },
            { name: 'Butter', icon: '🧈' },
            { name: 'Garlic', icon: '🧄' },
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-3 p-2 bg-white border border-cream-200 rounded-lg">
              <div className="w-6 h-6 rounded-full bg-apricot-600 text-white flex items-center justify-center text-xs">
                ✓
              </div>
              <span className="text-sm text-pantry flex-1">{item.name}</span>
              <button className="text-red-500 text-lg">×</button>
            </div>
          ))}
          
          {/* Add ingredient button */}
          <button className="flex items-center gap-2 p-2 w-full text-apricot-600 text-sm font-semibold">
            <div className="w-6 h-6 rounded-full bg-apricot-600 text-white flex items-center justify-center text-xs">
              +
            </div>
            <span>Add ingredient</span>
          </button>
        </div>
        
        {/* Generate button */}
        <div className="p-4 pt-2">
          <button className="w-full bg-apricot-600 text-white py-3 rounded-xl font-semibold">
            Generate Recipes
          </button>
        </div>
      </div>
    </div>
  );
}

export function RecipeGenerationIllustration() {
  return (
    <div className="relative w-full h-full bg-gradient-to-br from-coral-50 to-pantry-50 rounded-2xl p-8 flex items-center justify-center overflow-hidden">
      {/* Recipe Option Cards with images on RIGHT and rotated */}
      <div className="w-full max-w-md space-y-3">
        {[
          { name: 'Garlic Butter Shrimp', image: 'https://images.unsplash.com/photo-1633504581786-316c8002b1b9?w=300&q=80', ingredients: 8, steps: 6, selected: true },
          { name: 'Creamy Spinach Pasta', image: 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=300&q=80', ingredients: 6, steps: 5, selected: false },
          { name: 'One-Pan Chicken', image: 'https://images.unsplash.com/photo-1598103442097-8b74394b95c6?w=300&q=80', ingredients: 7, steps: 4, selected: true },
        ].map((recipe, i) => (
          <div
            key={i}
            className={`relative p-4 bg-white rounded-xl border-2 ${
              recipe.selected ? 'border-apricot-600 scale-[1.02]' : 'border-cream-200'
            } shadow-sm transition-all overflow-visible`}
          >
            <div className="flex items-start gap-3 mb-3 pr-16">
              {/* Recipe Info - LEFT SIDE */}
              <div className="flex-1 min-w-0">
                <h4 className="font-bold text-pantry text-base mb-1 leading-tight">{recipe.name}</h4>
                <p className="text-xs text-pantry-400 leading-relaxed">AI-generated recipe using your ingredients</p>
              </div>
              
              {/* Checkbox - TOP RIGHT */}
              <div className="flex-shrink-0 absolute top-4 right-4">
                {recipe.selected ? (
                  <div className="w-6 h-6 rounded-full bg-apricot-600 flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                ) : (
                  <div className="w-6 h-6 rounded-full border-2 border-gray-400" />
                )}
              </div>
            </div>
            
            {/* Meta info with heroicons */}
            <div className="flex items-center gap-4 text-xs text-pantry-400 pr-16">
              <div className="flex items-center gap-1">
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
                <span>{recipe.ingredients} ingredients</span>
              </div>
              <div className="flex items-center gap-1">
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" />
                </svg>
                <span>{recipe.steps} steps</span>
              </div>
            </div>
            
            {/* Recipe Image - RIGHT SIDE, ROTATED */}
            <div 
              className="absolute -right-1 top-1/2 -translate-y-1/2 w-[80px] h-[80px] rounded-xl overflow-hidden shadow-lg"
              style={{ transform: 'translateY(-50%) rotate(8deg)' }}
            >
              <img src={recipe.image} alt={recipe.name} className="w-full h-full object-cover" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function KitchenToolsIllustration() {
  return (
    <div className="relative w-full h-full bg-gradient-to-br from-pantry-50 to-apricot-50 rounded-2xl p-8 flex items-center justify-center">
      <div className="w-full max-w-sm space-y-4">
        {/* Timer Component (matching StepTimerView from SwiftUI) */}
        <div className="bg-white/80 rounded-2xl p-4 border-2 border-cream-200">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <span className="text-coral-500">⏱️</span>
              <span className="text-xs font-semibold text-pantry">Timer</span>
            </div>
            <div className="font-mono text-2xl font-bold text-coral-500">05:00</div>
          </div>
          <div className="flex gap-3">
            <button className="flex-1 flex items-center justify-center gap-2 bg-coral-500 text-white py-2 px-4 rounded-lg text-sm font-semibold">
              <span>▶️</span>
              <span>Start</span>
            </button>
            <button className="flex-1 flex items-center justify-center gap-2 bg-white border-2 border-coral-500 text-coral-500 py-2 px-4 rounded-lg text-sm font-semibold">
              <span>↺</span>
              <span>Reset</span>
            </button>
          </div>
        </div>

        {/* Step with "Why" explanation */}
        <div className="bg-white rounded-2xl p-4 border border-cream-200 shadow-sm">
          <div className="flex gap-3 mb-3">
            <div className="w-8 h-8 rounded-full bg-coral-500 text-white flex items-center justify-center text-sm font-bold flex-shrink-0">
              3
            </div>
            <p className="text-sm text-pantry leading-relaxed flex-1">
              Heat oil in a skillet over medium-high heat. Add shrimp and cook 2 minutes per side.
            </p>
          </div>
          <div className="ml-11 bg-cream-50 rounded-lg p-3">
            <p className="text-xs text-pantry-400 leading-relaxed">
              <span className="font-semibold text-pantry not-italic">Why:</span> High heat creates a golden sear. Removing shrimp prevents overcooking.
            </p>
          </div>
        </div>

        {/* Tips and Storage Info */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-cream-50 rounded-xl p-3 border border-cream-200">
            <div className="text-xl mb-1">💡</div>
            <div className="text-xs font-bold text-pantry mb-1">Pro Tip</div>
            <div className="text-[10px] text-pantry-400 leading-tight">
              Save pasta water
            </div>
          </div>
          <div className="bg-cream-50 rounded-xl p-3 border border-cream-200">
            <div className="text-xl mb-1">❄️</div>
            <div className="text-xs font-bold text-pantry mb-1">Storage</div>
            <div className="text-[10px] text-pantry-400 leading-tight">
              Fridge 3 days
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function CookbookIllustration() {
  return (
    <div className="relative w-full h-full bg-gradient-to-br from-cream-50 to-apricot-50 rounded-2xl p-8 flex items-center justify-center overflow-hidden">
      {/* Book stack */}
      <div className="relative">
        {/* Background books */}
        <div className="absolute -top-2 -left-2 w-64 h-80 bg-pantry-200 rounded-r-xl transform -rotate-3 opacity-50" />
        <div className="absolute -top-1 -left-1 w-64 h-80 bg-coral-200 rounded-r-xl transform -rotate-1 opacity-60" />
        
        {/* Main cookbook */}
        <div className="relative w-64 h-80 bg-white rounded-xl shadow-2xl border-l-8 border-apricot-600 overflow-hidden">
          <div className="h-full p-6 flex flex-col">
            <div className="border-b border-cream-200 pb-4 mb-4">
              <div className="text-xs text-pantry-400 font-semibold mb-2">MY COOKBOOK</div>
              <h3 className="font-serif text-2xl font-bold text-pantry">Saved Recipes</h3>
            </div>
            
            <div className="space-y-3 flex-1 overflow-hidden">
              {[
                { emoji: '🍝', name: 'Garlic Butter Pasta', tag: 'Quick' },
                { emoji: '🍗', name: 'Roasted Chicken', tag: 'Comfort' },
                { emoji: '🥗', name: 'Buddha Bowl', tag: 'Healthy' },
                { emoji: '🍛', name: 'Curry Delight', tag: 'Spicy' },
                { emoji: '🥘', name: 'One-Pot Wonder', tag: 'Easy' },
              ].map((recipe, i) => (
                <div key={i} className="flex items-center gap-3 p-2 bg-cream-50 rounded-lg hover:bg-cream-100 transition-colors cursor-pointer">
                  <span className="text-2xl">{recipe.emoji}</span>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-semibold text-pantry truncate">{recipe.name}</div>
                  </div>
                  <span className="text-[10px] bg-apricot-100 text-apricot-700 px-2 py-1 rounded-full font-semibold">
                    {recipe.tag}
                  </span>
                </div>
              ))}
            </div>
            
            <div className="mt-4 text-center text-xs text-pantry-400 font-semibold">
              32 saved recipes
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function MealPlanIllustration() {
  return (
    <div className="relative w-full h-full bg-gradient-to-br from-apricot-50 to-coral-50 rounded-2xl p-8 flex items-center justify-center">
      <div className="bg-white rounded-2xl shadow-2xl border border-cream-200 w-full max-w-md overflow-hidden">
        <div className="bg-gradient-to-r from-pantry to-pantry-600 text-white p-4">
          <div className="text-sm font-semibold mb-1">This Week</div>
          <div className="font-serif text-xl font-bold">My Meal Plan</div>
        </div>
        
        <div className="p-4 space-y-3">
          {[
            { day: 'Monday', date: 'Jan 15', meal: 'Garlic Butter Pasta', icon: '🍝', time: '25 min' },
            { day: 'Tuesday', date: 'Jan 16', meal: 'Roasted Chicken', icon: '🍗', time: '45 min' },
            { day: 'Wednesday', date: 'Jan 17', meal: 'Buddha Bowl', icon: '🥗', time: '30 min' },
            { day: 'Thursday', date: 'Jan 18', meal: 'Thai Curry', icon: '🍛', time: '35 min' },
            { day: 'Friday', date: 'Jan 19', meal: 'Margherita Pizza', icon: '🍕', time: '20 min' },
          ].map((item, i) => (
            <div key={i} className="bg-cream-50 rounded-xl p-3 border border-cream-200">
              <div className="flex items-center gap-3 mb-2">
                <div className="text-2xl">{item.icon}</div>
                <div className="flex-1">
                  <div className="text-xs font-semibold text-pantry-400 uppercase tracking-wide">{item.day}</div>
                  <div className="text-sm font-bold text-pantry">{item.meal}</div>
                </div>
              </div>
              <div className="flex items-center gap-4 text-xs text-pantry-400 ml-11">
                <div className="flex items-center gap-1">
                  <span>⏰</span>
                  <span>{item.time}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="p-4 bg-cream-50 border-t border-cream-200 flex items-center justify-between">
          <div className="flex gap-4 text-xs">
            <div className="flex items-center gap-1">
              <span className="font-semibold text-pantry">5</span>
              <span className="text-pantry-400">meals</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="font-semibold text-pantry">3</span>
              <span className="text-pantry-400">recipes</span>
            </div>
          </div>
          <button className="text-xs bg-coral-500 text-white px-4 py-2 rounded-lg font-semibold">
            Add to Shopping
          </button>
        </div>
      </div>
    </div>
  );
}
