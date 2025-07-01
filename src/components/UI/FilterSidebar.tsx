import React from 'react';
import { X, SlidersHorizontal, ChevronDown } from 'lucide-react';

interface FilterSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export function FilterSidebar({ isOpen, onClose }: FilterSidebarProps) {
  return (
    <div
      className={`fixed lg:static z-40 inset-y-0 left-0 w-72 bg-gradient-to-b from-[#fdf2f8] to-[#fefefe] shadow-xl border-r border-rose-100 transform transition-transform duration-300 ease-in-out ${
        isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
      }`}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-rose-200 bg-white/80 backdrop-blur-md rounded-tr-3xl rounded-tl-3xl">
        <div className="flex items-center space-x-2 text-rose-600 font-bold text-lg">
          <SlidersHorizontal className="h-5 w-5" />
          <span>Filters</span>
        </div>
        <button
          onClick={onClose}
          className="lg:hidden p-1 rounded-full hover:bg-rose-100 text-rose-600 transition"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      {/* Filter Sections */}
      <div className="p-6 space-y-8 overflow-y-auto h-full pb-20">
        {/* Category */}
        <div>
          <h3 className="text-sm font-semibold text-gray-800 mb-2 flex items-center space-x-1">
            <span>Category</span>
            <ChevronDown className="h-4 w-4 text-gray-400" />
          </h3>
          <div className="space-y-2">
            {['Furniture', 'Wall Art', 'Lighting', 'Rugs'].map((cat) => (
              <label key={cat} className="flex items-center space-x-2 text-sm text-gray-700">
                <input type="checkbox" className="accent-rose-500" />
                <span>{cat}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Price Range */}
        <div>
          <h3 className="text-sm font-semibold text-gray-800 mb-2 flex items-center space-x-1">
            <span>Price Range</span>
            <ChevronDown className="h-4 w-4 text-gray-400" />
          </h3>
          <div className="space-y-2">
            {['Under $100', '$100–$300', '$300–$500', 'Over $500'].map((price) => (
              <label key={price} className="flex items-center space-x-2 text-sm text-gray-700">
                <input type="checkbox" className="accent-rose-500" />
                <span>{price}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Colors */}
        <div>
          <h3 className="text-sm font-semibold text-gray-800 mb-2 flex items-center space-x-1">
            <span>Color</span>
            <ChevronDown className="h-4 w-4 text-gray-400" />
          </h3>
          <div className="flex flex-wrap gap-2">
            {['Beige', 'White', 'Black', 'Pink', 'Wood'].map((color) => (
              <label
                key={color}
                className="px-3 py-1 border border-gray-300 text-sm rounded-full hover:bg-rose-50 text-gray-700 cursor-pointer"
              >
                <input type="checkbox" className="hidden" />
                {color}
              </label>
            ))}
          </div>
        </div>

        {/* Size */}
        <div>
          <h3 className="text-sm font-semibold text-gray-800 mb-2 flex items-center space-x-1">
            <span>Size</span>
            <ChevronDown className="h-4 w-4 text-gray-400" />
          </h3>
          <div className="flex flex-wrap gap-2">
            {['Small', 'Medium', 'Large', 'XL'].map((size) => (
              <label
                key={size}
                className="px-3 py-1 border border-gray-300 text-sm rounded-full hover:bg-rose-50 text-gray-700 cursor-pointer"
              >
                <input type="checkbox" className="hidden" />
                {size}
              </label>
            ))}
          </div>
        </div>

        {/* Reset & Apply */}
        <div className="space-y-2 pt-4 border-t border-rose-100">
          <button className="w-full text-sm font-medium text-rose-600 hover:underline">
            Clear All Filters
          </button>
          <button className="w-full bg-rose-600 text-white py-2 rounded-lg text-sm font-semibold hover:bg-rose-700 transition">
            Apply Filters
          </button>
        </div>
      </div>
    </div>
  );
}
