'use client';

import { useState } from 'react';
import RecipeCard from './RecipeCard';
import RecipePreviewModal from './RecipePreviewModal';
import NutritionLabel from './NutritionLabel';

type DietaryLabel = 'Vegetarian' | 'Vegan' | 'Gluten-Free' | 'Dairy-Free' | 'Nut-Free' | 'Low-Carb' | 'High-Protein';

const sampleRecipes: Array<{
  name: string;
  summary: string;
  imageUrl: string;
  servings: string;
  prepTime: string;
  cookTime: string;
  totalTime: string;
  origin: string;
  flavorProfile: string;
  equipment: string[];
  tags: string[];
  tips: string[];
  science: string;
  storageCounter: string;
  storageFreezer: string;
  storageReheat: string;
  ingredients: Array<{ quantity: number; unit: string; name: string }>;
  steps: Array<{
    text: string;
    why?: string;
    hasTimer?: boolean;
    timerMinutes?: number;
    timerSeconds?: number;
  }>;
  nutrition: {
    calories: number;
    fat: number;
    saturatedFat: number;
    transFat: number;
    cholesterol: number;
    sodium: number;
    carbohydrates: number;
    fiber: number;
    sugars: number;
    protein: number;
  };
  dietaryLabels: DietaryLabel[];
  isAIGenerated: boolean;
}> = [
  {
    name: 'Garlic Butter Shrimp Pasta',
    summary: 'Quick weeknight pasta with juicy shrimp, garlic, and fresh herbs',
    imageUrl: 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=800&q=80',
    servings: '4 servings',
    prepTime: '10 min',
    cookTime: '15 min',
    totalTime: '25 min',
    origin: 'Italian-American fusion',
    flavorProfile: 'Savory, garlicky, and buttery with a hint of lemon brightness',
    equipment: ['Large pot', 'Large skillet', 'Colander', 'Tongs'],
    tags: ['Quick', 'Seafood', 'Pasta', 'Weeknight'],
    tips: [
      'Don\'t overcook the shrimp—they\'re done when they turn pink',
      'Save some pasta water to help the sauce stick',
      'Add a squeeze of lemon at the end for brightness',
    ],
    science: 'Emulsifying pasta water with butter creates a silky sauce that coats every strand. The starch in pasta water acts as a natural thickener.',
    storageCounter: 'Store in airtight container for up to 2 days',
    storageFreezer: 'Not recommended—shrimp texture degrades',
    storageReheat: 'Reheat gently in a skillet with a splash of water or broth',
    ingredients: [
      { quantity: 12, unit: 'oz', name: 'linguine or spaghetti' },
      { quantity: 1, unit: 'lb', name: 'large shrimp, peeled and deveined' },
      { quantity: 6, unit: 'cloves', name: 'garlic, minced' },
      { quantity: 4, unit: 'tbsp', name: 'butter' },
      { quantity: 2, unit: 'tbsp', name: 'olive oil' },
      { quantity: 0.25, unit: 'cup', name: 'white wine (optional)' },
      { quantity: 1, unit: 'piece', name: 'lemon' },
      { quantity: 0.25, unit: 'cup', name: 'fresh parsley, chopped' },
      { quantity: 1, unit: 'tsp', name: 'red pepper flakes' },
      { quantity: 1, unit: 'pinch', name: 'salt and pepper' },
    ],
    steps: [
      {
        text: 'Bring a large pot of salted water to boil. Cook pasta according to package directions until al dente. Reserve 1 cup pasta water before draining.',
        why: 'Salted water seasons the pasta from the inside out. Pasta water contains starch that helps create a silky sauce.',
        hasTimer: true,
        timerMinutes: 10,
      },
      {
        text: 'While pasta cooks, pat shrimp dry with paper towels and season with salt and pepper.',
        why: 'Dry shrimp sear better and develop a golden crust instead of steaming in their own moisture.',
      },
      {
        text: 'Heat olive oil in a large skillet over medium-high heat. Add shrimp in a single layer and cook 2 minutes per side until pink. Remove to a plate.',
        why: 'High heat and minimal movement creates a golden sear. Removing shrimp prevents overcooking while you build the sauce.',
        hasTimer: true,
        timerMinutes: 2,
      },
      {
        text: 'In the same skillet, reduce heat to medium. Add butter and garlic, cook 30 seconds until fragrant. Add wine if using and let reduce by half.',
        why: 'Cooking garlic in butter infuses it with flavor. Wine adds acidity to balance the richness.',
        hasTimer: false,
        timerSeconds: 30,
      },
      {
        text: 'Add drained pasta, shrimp, red pepper flakes, and 1/2 cup pasta water. Toss everything together, adding more pasta water if needed to create a silky sauce.',
        why: 'Pasta water emulsifies with the butter to create a glossy coating that clings to every strand.',
      },
      {
        text: 'Remove from heat. Add lemon juice, zest, and parsley. Toss and serve immediately.',
        why: 'Adding citrus off-heat preserves its bright, fresh flavor without cooking it away.',
      },
    ],
    nutrition: {
      calories: 520,
      fat: 18,
      saturatedFat: 8,
      transFat: 0,
      cholesterol: 215,
      sodium: 580,
      carbohydrates: 58,
      fiber: 3,
      sugars: 2,
      protein: 32,
    },
    dietaryLabels: ['Dairy-Free'],
    isAIGenerated: true,
  },
  {
    name: 'One-Pan Roasted Chicken & Vegetables',
    summary: 'Crispy chicken thighs with caramelized root vegetables and herbs',
    imageUrl: 'https://images.unsplash.com/photo-1598103442097-8b74394b95c6?w=800&q=80',
    servings: '4 servings',
    prepTime: '15 min',
    cookTime: '45 min',
    totalTime: '1 hour',
    origin: 'Classic American comfort food',
    flavorProfile: 'Savory, herbaceous, with sweet caramelized vegetables',
    equipment: ['Sheet pan', 'Mixing bowl'],
    tags: ['One-Pan', 'Chicken', 'Healthy', 'Meal Prep'],
    tips: [
      'Pat chicken dry for crispier skin',
      'Cut vegetables the same size for even cooking',
      'Let chicken rest 5 minutes before serving',
    ],
    science: 'High oven heat renders chicken fat and crisps the skin while sugars in vegetables caramelize, creating deep, complex flavors.',
    storageCounter: 'Not recommended',
    storageFreezer: 'Freeze for up to 3 months',
    storageReheat: 'Reheat at 350°F for 15-20 minutes until warmed through',
    ingredients: [
      { quantity: 8, unit: 'piece', name: 'bone-in, skin-on chicken thighs' },
      { quantity: 1, unit: 'lb', name: 'baby potatoes, halved' },
      { quantity: 3, unit: 'piece', name: 'carrots, cut into chunks' },
      { quantity: 1, unit: 'piece', name: 'red onion, cut into wedges' },
      { quantity: 3, unit: 'tbsp', name: 'olive oil' },
      { quantity: 2, unit: 'tsp', name: 'dried thyme' },
      { quantity: 1, unit: 'tsp', name: 'garlic powder' },
      { quantity: 1, unit: 'tsp', name: 'paprika' },
      { quantity: 1, unit: 'pinch', name: 'salt and pepper' },
    ],
    steps: [
      {
        text: 'Preheat oven to 425°F. Line a large sheet pan with parchment paper.',
        why: 'High heat ensures crispy chicken skin and caramelized vegetables.',
        hasTimer: false,
      },
      {
        text: 'In a large bowl, toss potatoes, carrots, and onion with 2 tbsp olive oil, thyme, salt, and pepper. Spread on sheet pan.',
        why: 'Coating vegetables evenly ensures consistent browning and prevents sticking.',
      },
      {
        text: 'Pat chicken thighs dry. Rub with remaining oil, garlic powder, paprika, salt, and pepper. Place skin-side up on top of vegetables.',
        why: 'Dry skin crisps better. Placing chicken on top allows juices to flavor the vegetables below.',
      },
      {
        text: 'Roast for 40-45 minutes until chicken reaches 165°F internal temp and skin is golden brown.',
        why: 'Internal temperature ensures food safety while crispy skin provides textural contrast.',
        hasTimer: true,
        timerMinutes: 40,
      },
      {
        text: 'Let rest 5 minutes before serving.',
        why: 'Resting redistributes juices throughout the meat for maximum tenderness.',
        hasTimer: true,
        timerMinutes: 5,
      },
    ],
    nutrition: {
      calories: 485,
      fat: 24,
      saturatedFat: 6,
      transFat: 0,
      cholesterol: 165,
      sodium: 420,
      carbohydrates: 28,
      fiber: 4,
      sugars: 5,
      protein: 38,
    },
    dietaryLabels: ['Gluten-Free', 'Dairy-Free'],
    isAIGenerated: true,
  },
  {
    name: 'Vegetarian Buddha Bowl',
    summary: 'Nourishing bowl with quinoa, roasted veggies, chickpeas, and tahini dressing',
    imageUrl: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&q=80',
    servings: '2 servings',
    prepTime: '15 min',
    cookTime: '30 min',
    totalTime: '45 min',
    origin: 'Modern wellness cuisine',
    flavorProfile: 'Nutty, earthy, with tangy tahini and fresh herbs',
    equipment: ['Sheet pan', 'Small pot', 'Whisk', 'Bowl'],
    tags: ['Healthy', 'Vegetarian', 'Bowl', 'Meal Prep'],
    tips: [
      'Prep ingredients ahead for quick assembly',
      'Extra tahini sauce keeps in fridge for 5 days',
      'Swap vegetables based on what you have',
    ],
    science: 'Quinoa is a complete protein, containing all essential amino acids. Pairing with chickpeas provides additional fiber and protein for sustained energy.',
    storageCounter: 'Assemble fresh daily',
    storageFreezer: 'Not recommended—vegetables lose texture',
    storageReheat: 'Reheat roasted components separately; add fresh greens',
    ingredients: [
      { quantity: 1, unit: 'cup', name: 'quinoa, uncooked' },
      { quantity: 1, unit: 'can', name: 'chickpeas (15 oz), drained' },
      { quantity: 2, unit: 'cup', name: 'broccoli florets' },
      { quantity: 1, unit: 'piece', name: 'sweet potato, cubed' },
      { quantity: 3, unit: 'tbsp', name: 'olive oil' },
      { quantity: 2, unit: 'cup', name: 'fresh spinach or kale' },
      { quantity: 0.25, unit: 'cup', name: 'tahini' },
      { quantity: 2, unit: 'tbsp', name: 'lemon juice' },
      { quantity: 1, unit: 'clove', name: 'garlic, minced' },
      { quantity: 1, unit: 'pinch', name: 'cumin, salt, pepper' },
    ],
    steps: [
      {
        text: 'Preheat oven to 400°F. Cook quinoa according to package directions.',
        why: 'Cooking quinoa separately ensures fluffy texture. Rinsing removes bitter saponins.',
        hasTimer: true,
        timerMinutes: 15,
      },
      {
        text: 'Toss chickpeas, broccoli, and sweet potato with olive oil, cumin, salt, and pepper. Spread on sheet pan and roast 25-30 minutes.',
        why: 'Roasting caramelizes natural sugars and creates crispy edges on chickpeas.',
        hasTimer: true,
        timerMinutes: 25,
      },
      {
        text: 'Make tahini dressing: whisk tahini, lemon juice, garlic, 2-3 tbsp water, salt, and pepper until smooth.',
        why: 'Water helps thin tahini to pourable consistency. Lemon adds brightness and balances richness.',
      },
      {
        text: 'Assemble bowls: divide quinoa between two bowls, top with roasted vegetables, chickpeas, and fresh greens.',
      },
      {
        text: 'Drizzle generously with tahini dressing and serve.',
      },
    ],
    nutrition: {
      calories: 580,
      fat: 26,
      saturatedFat: 3,
      transFat: 0,
      cholesterol: 0,
      sodium: 380,
      carbohydrates: 68,
      fiber: 14,
      sugars: 9,
      protein: 20,
    },
    dietaryLabels: ['Vegetarian', 'Vegan', 'Dairy-Free'],
    isAIGenerated: true,
  },
];

export default function RecipeDemo() {
  const [selectedRecipe, setSelectedRecipe] = useState<typeof sampleRecipes[0] | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [savedRecipes, setSavedRecipes] = useState<Set<string>>(new Set());

  const handlePreview = (recipe: typeof sampleRecipes[0]) => {
    setSelectedRecipe(recipe);
    setIsModalOpen(true);
  };

  const handleSave = () => {
    if (selectedRecipe) {
      setSavedRecipes(new Set([...savedRecipes, selectedRecipe.name]));
    }
  };

  const handleRemove = () => {
    if (selectedRecipe) {
      const newSaved = new Set(savedRecipes);
      newSaved.delete(selectedRecipe.name);
      setSavedRecipes(newSaved);
    }
  };

  return (
    <div className="space-y-8">
      {/* Demo Header */}
      <div className="text-center max-w-2xl mx-auto">
        <h2 className="font-serif text-3xl sm:text-4xl font-bold text-pantry mb-4">
          See the magic in action
        </h2>
        <p className="text-lg text-pantry-400 mb-3">
          These recipes were created from real fridge photos. No extra ingredients added.
        </p>
        <p className="text-base text-pantry-400">
          Click any recipe to explore the full details, nutrition info, and step-by-step instructions.
        </p>
      </div>

      {/* Recipe Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {sampleRecipes.map((recipe, index) => (
          <RecipeCard
            key={index}
            name={recipe.name}
            summary={recipe.summary}
            imageUrl={recipe.imageUrl}
            servings={recipe.servings}
            prepTime={recipe.prepTime}
            cookTime={recipe.cookTime}
            dietaryLabels={recipe.dietaryLabels}
            isAIGenerated={recipe.isAIGenerated}
            onClick={() => handlePreview(recipe)}
          />
        ))}
      </div>

      {/* Nutrition Label Sample */}
      <div className="mt-16">
        <div className="text-center max-w-2xl mx-auto mb-8">
          <h3 className="font-serif text-2xl sm:text-3xl font-bold text-pantry mb-3">
            Complete nutrition information
          </h3>
          <p className="text-pantry-400">
            Every AI-generated recipe includes FDA-compliant nutrition facts, dietary labels, and disclaimers.
          </p>
        </div>
        <div className="max-w-md mx-auto">
          <NutritionLabel
            servingsMin={4}
            servingsMax={4}
            calories={520}
            fat={18}
            saturatedFat={8}
            transFat={0}
            cholesterol={215}
            sodium={580}
            carbs={58}
            fiber={3}
            sugars={2}
            protein={32}
            dietaryLabels={['Dairy-Free']}
            isAIGenerated={true}
          />
        </div>
      </div>

      {/* Modal */}
      {selectedRecipe && (
        <RecipePreviewModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          recipe={selectedRecipe}
          isAlreadySelected={savedRecipes.has(selectedRecipe.name)}
          onSave={handleSave}
          onRemove={handleRemove}
        />
      )}
    </div>
  );
}
