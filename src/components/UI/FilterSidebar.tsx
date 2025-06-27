import React, { useState } from 'react';
import { X, ChevronDown, ChevronUp } from 'lucide-react';

interface FilterSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export function FilterSidebar({ isOpen, onClose }: FilterSidebarProps) {
  const [expandedSections, setExpandedSections] = useState<string[]>(['category', 'price']);

  const toggleSection = (section: string) => {
    setExpandedSections(prev =>
      prev.includes(section)
        ? prev.filter(s => s !== section)
        : [...prev, section]
    );
  };

  const categories = ['Furniture', 'Lighting', 'Decor', 'Rugs', 'Art'];
  const colors = ['White', 'Black', 'Brown', 'Blue', 'Green', 'Red', 'Gold', 'Silver'];
  const priceRanges = [
    { label: 'Under $50', min: 0, max: 50 },
    { label: '$50 - $100', min: 50, max: 100 },
    { label: '$100 - $250', min: 100, max: 250 },
    { label: '$250 - $500', min: 250, max: 500 },
    { label: 'Over $500', min: 500, max: null },
  ];

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div
        className={`
          fixed lg:sticky top-0 left-0 h-full lg:h-auto bg-white z-50 lg:z-0
          w-80 lg:w-full border-r lg:border-r-0 lg:border border-gray-200 lg:rounded-lg
          transform transition-transform duration-300 ease-in-out lg:transform-none
          ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 lg:hidden">
          <h2 className="text-lg font-semibold">Filters</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Filters */}
        <div className="p-4 space-y-6 lg:space-y-4">
          {/* Category */}
          <div>
            <button
              onClick={() => toggleSection('category')}
              className="flex items-center justify-between w-full text-left font-semibold text-gray-900 mb-3"
            >
              Category
              {expandedSections.includes('category') ? (
                <ChevronUp className="h-4 w-4" />
              ) : (
                <ChevronDown className="h-4 w-4" />
              )}
            </button>
            {expandedSections.includes('category') && (
              <div className="space-y-2">
                {categories.map(category => (
                  <label key={category} className="flex items-center">
                    <input
                      type="checkbox"
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="ml-2 text-sm text-gray-700">{category}</span>
                  </label>
                ))}
              </div>
            )}
          </div>

          {/* Price Range */}
          <div>
            <button
              onClick={() => toggleSection('price')}
              className="flex items-center justify-between w-full text-left font-semibold text-gray-900 mb-3"
            >
              Price Range
              {expandedSections.includes('price') ? (
                <ChevronUp className="h-4 w-4" />
              ) : (
                <ChevronDown className="h-4 w-4" />
              )}
            </button>
            {expandedSections.includes('price') && (
              <div className="space-y-2">
                {priceRanges.map((range, index) => (
                  <label key={index} className="flex items-center">
                    <input
                      type="radio"
                      name="priceRange"
                      className="border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="ml-2 text-sm text-gray-700">{range.label}</span>
                  </label>
                ))}
              </div>
            )}
          </div>

          {/* Color */}
          <div>
            <button
              onClick={() => toggleSection('color')}
              className="flex items-center justify-between w-full text-left font-semibold text-gray-900 mb-3"
            >
              Color
              {expandedSections.includes('color') ? (
                <ChevronUp className="h-4 w-4" />
              ) : (
                <ChevronDown className="h-4 w-4" />
              )}
            </button>
            {expandedSections.includes('color') && (
              <div className="grid grid-cols-4 gap-2">
                {colors.map(color => (
                  <label key={color} className="flex flex-col items-center cursor-pointer">
                    <div
                      className="w-8 h-8 rounded-full border-2 border-gray-300 hover:border-gray-400 transition-colors"
                      style={{
                        backgroundColor: color.toLowerCase() === 'white' ? '#FFFFFF' :
                                       color.toLowerCase() === 'black' ? '#000000' :
                                       color.toLowerCase() === 'brown' ? '#8B4513' :
                                       color.toLowerCase() === 'blue' ? '#3B82F6' :
                                       color.toLowerCase() === 'green' ? '#10B981' :
                                       color.toLowerCase() === 'red' ? '#EF4444' :
                                       color.toLowerCase() === 'gold' ? '#F59E0B' :
                                       color.toLowerCase() === 'silver' ? '#6B7280' :
                                       '#9CA3AF'
                      }}
                    />
                    <span className="text-xs text-gray-600 mt-1">{color}</span>
                  </label>
                ))}
              </div>
            )}
          </div>

          {/* Rating */}
          <div>
            <button
              onClick={() => toggleSection('rating')}
              className="flex items-center justify-between w-full text-left font-semibold text-gray-900 mb-3"
            >
              Rating
              {expandedSections.includes('rating') ? (
                <ChevronUp className="h-4 w-4" />
              ) : (
                <ChevronDown className="h-4 w-4" />
              )}
            </button>
            {expandedSections.includes('rating') && (
              <div className="space-y-2">
                {[4, 3, 2, 1].map(rating => (
                  <label key={rating} className="flex items-center">
                    <input
                      type="checkbox"
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="ml-2 text-sm text-gray-700">
                      {rating}+ stars
                    </span>
                  </label>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Footer - Mobile */}
        <div className="lg:hidden border-t border-gray-200 p-4 space-y-3">
          <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors">
            Apply Filters
          </button>
          <button className="w-full text-gray-600 py-2 rounded-lg hover:bg-gray-100 transition-colors">
            Clear All
          </button>
        </div>
      </div>
    </>
  );
}