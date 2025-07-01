import React, { useState } from 'react';
import { Filter, Grid, List, SortAsc } from 'lucide-react';
import { ProductCard } from '../components/UI/ProductCard';
import { FilterSidebar } from '../components/UI/FilterSidebar';
import { mockProducts } from '../data/mockData';

export function ProductsPage() {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState('featured');

  const sortOptions = [
    { value: 'featured', label: 'Featured' },
    { value: 'price-low', label: 'Price: Low to High' },
    { value: 'price-high', label: 'Price: High to Low' },
    { value: 'newest', label: 'Newest First' },
    { value: 'rating', label: 'Highest Rated' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#fdf8f4] via-[#fefdfb] to-[#faf7f2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-10">
          <div>
            <h1 className="text-4xl font-bold text-rose-900 mb-2">Explore All Products</h1>
            <p className="text-rose-500 text-sm">{mockProducts.length} items available</p>
          </div>

          {/* Controls */}
          <div className="flex items-center space-x-4 mt-4 sm:mt-0">
            {/* Sort */}
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="appearance-none bg-white border border-rose-300 text-gray-800 rounded-lg px-4 py-2 pr-8 shadow-sm focus:ring-2 focus:ring-rose-500 focus:outline-none"
              >
                {sortOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              <SortAsc className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
            </div>

            {/* View Toggle */}
            <div className="flex border border-rose-300 rounded-lg overflow-hidden">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 ${
                  viewMode === 'grid'
                    ? 'bg-rose-600 text-white'
                    : 'bg-white text-rose-600 hover:bg-rose-50'
                }`}
              >
                <Grid className="h-4 w-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 ${
                  viewMode === 'list'
                    ? 'bg-rose-600 text-white'
                    : 'bg-white text-rose-600 hover:bg-rose-50'
                }`}
              >
                <List className="h-4 w-4" />
              </button>
            </div>

            {/* Filter Toggle */}
            <button
              onClick={() => setIsFilterOpen(true)}
              className="lg:hidden flex items-center space-x-2 bg-white border border-rose-300 text-rose-700 rounded-lg px-4 py-2 hover:bg-rose-50"
            >
              <Filter className="h-4 w-4" />
              <span>Filters</span>
            </button>
          </div>
        </div>

        <div className="flex gap-10">
          {/* Filters - Desktop */}
          <div className="hidden lg:block w-64 flex-shrink-0">
            <FilterSidebar isOpen={true} onClose={() => {}} />
          </div>

          {/* Filters - Mobile */}
          <FilterSidebar isOpen={isFilterOpen} onClose={() => setIsFilterOpen(false)} />

          {/* Products */}
          <div className="flex-1">
            {viewMode === 'grid' ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
                {mockProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="space-y-6">
                {mockProducts.map((product) => (
                  <div
                    key={product.id}
                    className="bg-white rounded-2xl border border-rose-100 shadow-sm p-6 transition hover:shadow-md"
                  >
                    <div className="flex space-x-5">
                      <img
                        src={product.images[0]}
                        alt={product.name}
                        className="w-32 h-32 object-cover rounded-xl border border-rose-200"
                      />
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold text-rose-900 mb-2">{product.name}</h3>
                        <p className="text-rose-600 text-sm mb-3 line-clamp-2">{product.description}</p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <span className="text-lg font-bold text-gray-900">${product.price}</span>
                            {product.originalPrice && (
                              <span className="text-sm text-gray-400 line-through">
                                ${product.originalPrice}
                              </span>
                            )}
                          </div>
                          <button className="bg-rose-600 text-white px-4 py-2 rounded-lg hover:bg-rose-700 transition-colors text-sm font-medium">
                            Add to Cart
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
