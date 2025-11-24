interface RecipeCardProps {
  name: string;
  summary?: string;
  imageUrl?: string;
  servings?: string;
  prepTime?: string;
  cookTime?: string;
  dietaryLabels?: Array<'Vegetarian' | 'Vegan' | 'Gluten-Free' | 'Dairy-Free' | 'Nut-Free' | 'Low-Carb' | 'High-Protein'>;
  isAIGenerated?: boolean;
  onClick?: () => void;
}

export default function RecipeCard({
  name,
  summary,
  imageUrl,
  servings,
  prepTime,
  cookTime,
  dietaryLabels = [],
  isAIGenerated = false,
  onClick,
}: RecipeCardProps) {
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

  const getDietaryLabelIcon = (label: string): string => {
    const iconMap: Record<string, string> = {
      'Vegetarian': '🌱',
      'Vegan': '🌿',
      'Gluten-Free': '🌾',
      'Dairy-Free': '🥛',
      'Nut-Free': '🥜',
      'Low-Carb': '🥗',
      'High-Protein': '💪',
    };
    return iconMap[label] || '✓';
  };

  return (
    <div
      className={`bg-white rounded-2xl shadow-medium overflow-hidden border border-cream-200 transition-all duration-300 hover:shadow-large hover:-translate-y-1 ${
        onClick ? 'cursor-pointer' : ''
      }`}
      onClick={onClick}
    >
      {/* Image */}
      <div className="relative aspect-[4/3] bg-gradient-to-br from-apricot-100 to-coral-100 overflow-hidden">
        {imageUrl ? (
          <img src={imageUrl} alt={name} className="w-full h-full object-cover" />
        ) : (
          <div className="flex items-center justify-center h-full">
            <span className="text-6xl">🍽️</span>
          </div>
        )}
        {isAIGenerated && (
          <div className="absolute top-3 right-3 bg-black/70 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1">
            <span>✨</span>
            <span>AI-Generated</span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="font-serif text-2xl font-bold text-pantry mb-2 line-clamp-2">{name}</h3>
        
        {summary && (
          <p className="text-sm text-pantry-400 mb-4 line-clamp-2">{summary}</p>
        )}

        {/* Recipe Meta */}
        {(servings || prepTime || cookTime) && (
          <div className="flex flex-wrap gap-3 mb-4 text-sm text-pantry-400">
            {servings && (
              <div className="flex items-center gap-1">
                <span>👥</span>
                <span>{servings}</span>
              </div>
            )}
            {prepTime && (
              <div className="flex items-center gap-1">
                <span>⏱️</span>
                <span>{prepTime}</span>
              </div>
            )}
            {cookTime && (
              <div className="flex items-center gap-1">
                <span>🔥</span>
                <span>{cookTime}</span>
              </div>
            )}
          </div>
        )}

        {/* Dietary Labels */}
        {dietaryLabels.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {dietaryLabels.map((label) => (
              <span
                key={label}
                className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium ${getDietaryLabelColor(label)}`}
              >
                <span className="text-sm">{getDietaryLabelIcon(label)}</span>
                {label}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
