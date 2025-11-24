interface NutritionLabelProps {
  servingsMin: number;
  servingsMax: number;
  calories?: number;
  fat?: number;
  saturatedFat?: number;
  transFat?: number;
  cholesterol?: number;
  sodium?: number;
  carbs?: number;
  fiber?: number;
  sugars?: number;
  protein?: number;
  dietaryLabels?: Array<'Vegetarian' | 'Vegan' | 'Gluten-Free' | 'Dairy-Free' | 'Nut-Free' | 'Low-Carb' | 'High-Protein'>;
  isAIGenerated?: boolean;
}

export default function NutritionLabel({
  servingsMin,
  servingsMax,
  calories,
  fat,
  saturatedFat,
  transFat,
  cholesterol,
  sodium,
  carbs,
  fiber,
  sugars,
  protein,
  dietaryLabels = [],
  isAIGenerated = false,
}: NutritionLabelProps) {
  const formatValue = (value: number): string => {
    return value % 1 === 0 ? String(Math.floor(value)) : value.toFixed(1);
  };

  const servingsText =
    servingsMin === servingsMax
      ? `Per serving • ${servingsMin} serving${servingsMin === 1 ? '' : 's'} per recipe`
      : `Per serving • ${servingsMin}-${servingsMax} servings per recipe`;

  const getDietaryLabelColor = (label: string): string => {
    const colorMap: Record<string, string> = {
      'Vegetarian': 'bg-green-100 text-green-700',
      'Vegan': 'bg-green-100 text-green-700',
      'Gluten-Free': 'bg-amber-100 text-amber-700',
      'Dairy-Free': 'bg-blue-100 text-blue-700',
      'Nut-Free': 'bg-orange-100 text-orange-700',
      'Low-Carb': 'bg-purple-100 text-purple-700',
      'High-Protein': 'bg-red-100 text-red-700',
    };
    return colorMap[label] || 'bg-gray-100 text-gray-700';
  };

  const getDietaryLabelIcon = (label: string): string => {
    const iconMap: Record<string, string> = {
      'Vegetarian': '🌱',
      'Vegan': '🌿',
      'Gluten-Free': '🌾',
      'Dairy-Free': '🥛',
      'Nut-Free': '🥜',
      'Low-Carb': '📉',
      'High-Protein': '💪',
    };
    return iconMap[label] || '✓';
  };

  return (
    <div className="bg-white dark:bg-black border-2 border-black dark:border-white rounded-xl overflow-hidden max-w-sm">
      {/* Header */}
      <div className="px-4 pt-4 pb-2">
        <h2 className="text-3xl font-black leading-none mb-1">Nutrition Facts</h2>
        <p className="text-sm">{servingsText}</p>
      </div>

      {/* Thick divider */}
      <div className="h-2 bg-black dark:bg-white mx-4"></div>

      {/* Calories */}
      {calories !== undefined && (
        <>
          <div className="px-4 py-2">
            <div className="flex items-end justify-between">
              <span className="text-2xl font-bold">Calories</span>
              <span className="text-2xl font-bold">{calories}</span>
            </div>
          </div>
          <div className="h-[5px] bg-black dark:bg-white mx-4"></div>
        </>
      )}

      {/* Main nutrients */}
      <div className="divide-y divide-gray-300 dark:divide-gray-700">
        {/* Fat */}
        {fat !== undefined && (
          <>
            <div className="px-4 py-1 flex justify-between">
              <span className="font-bold">Total Fat</span>
              <span className="font-bold">{formatValue(fat)}g</span>
            </div>
            {saturatedFat !== undefined && (
              <div className="px-4 py-1 flex justify-between pl-9">
                <span>Saturated Fat</span>
                <span>{formatValue(saturatedFat)}g</span>
              </div>
            )}
            {transFat !== undefined && (
              <div className="px-4 py-1 flex justify-between pl-9">
                <span>Trans Fat</span>
                <span>{formatValue(transFat)}g</span>
              </div>
            )}
          </>
        )}

        {/* Cholesterol */}
        {cholesterol !== undefined && (
          <div className="px-4 py-1 flex justify-between">
            <span className="font-bold">Cholesterol</span>
            <span className="font-bold">{Math.round(cholesterol)}mg</span>
          </div>
        )}

        {/* Sodium */}
        {sodium !== undefined && (
          <div className="px-4 py-1 flex justify-between">
            <span className="font-bold">Salt</span>
            <span className="font-bold">{Math.round(sodium)}mg</span>
          </div>
        )}

        {/* Carbs */}
        {carbs !== undefined && (
          <>
            <div className="px-4 py-1 flex justify-between">
              <span className="font-bold">Total Carbohydrate</span>
              <span className="font-bold">{formatValue(carbs)}g</span>
            </div>
            {fiber !== undefined && (
              <div className="px-4 py-1 flex justify-between pl-9">
                <span>Dietary Fiber</span>
                <span>{formatValue(fiber)}g</span>
              </div>
            )}
            {sugars !== undefined && (
              <div className="px-4 py-1 flex justify-between pl-9">
                <span>Total Sugars</span>
                <span>{formatValue(sugars)}g</span>
              </div>
            )}
          </>
        )}

        {/* Protein */}
        {protein !== undefined && (
          <>
            <div className="h-[5px] bg-black dark:bg-white mx-4"></div>
            <div className="px-4 py-1 flex justify-between">
              <span className="font-bold">Protein</span>
              <span className="font-bold">{formatValue(protein)}g</span>
            </div>
          </>
        )}
      </div>

      {/* Bottom thick divider */}
      <div className="h-2 bg-black dark:bg-white mx-4 mt-2"></div>

      {/* Dietary labels */}
      {dietaryLabels.length > 0 && (
        <div className="px-4 py-3">
          <div className="flex flex-wrap gap-2">
            {dietaryLabels.map((label) => (
              <span
                key={label}
                className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${getDietaryLabelColor(label)}`}
              >
                <span>{getDietaryLabelIcon(label)}</span>
                {label}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* AI Generated indicator */}
      {isAIGenerated && (
        <div className="px-4 pb-2 flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
          <span>✨</span>
          <span className="font-medium">AI-Generated Recipe</span>
        </div>
      )}

      {/* Legal disclaimer */}
      <div className="px-4 py-4 bg-black/5 dark:bg-white/5 border-t border-gray-300 dark:border-gray-700">
        <p className="text-xs font-black mb-2">IMPORTANT DISCLAIMER</p>
        <p className="text-xs text-gray-600 dark:text-gray-400 mb-2">
          Nutritional information is estimated and may not be accurate. This app is for informational purposes only and should not be used as a substitute for professional dietary advice. Always consult with a qualified healthcare provider or nutritionist for personalized guidance. The developer assumes no liability for any decisions made based on this information.
        </p>
        <p className="text-xs text-gray-600 dark:text-gray-400">
          Not evaluated by the FDA. Individual results may vary. May contain allergens not listed. Users with food allergies or dietary restrictions should verify all ingredients independently.
        </p>
      </div>
    </div>
  );
}
