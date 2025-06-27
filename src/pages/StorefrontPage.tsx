import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { mockSellers } from '../data/mockSellers';
import { Star, Heart, ShoppingCart, Search } from 'lucide-react';
import { ProductCard } from '../components/UI/ProductCard';

export function StorefrontPage() {
  const { sellerId } = useParams();
  const seller = mockSellers.find((s) => s.id === sellerId);

  const [search, setSearch] = useState('');

  if (!seller) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Shop Not Found</h1>
        <p className="text-gray-600">The seller you're looking for doesn't exist.</p>
      </div>
    );
  }

  const filtered = seller.products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-white">
      {/* Banner */}
      <div className="relative">
        <img src={seller.banner} alt="Banner" className="h-64 w-full object-cover" />
        <div className="absolute bottom-0 left-0 p-6 bg-black bg-opacity-50 w-full flex items-center space-x-6">
          <img src={seller.avatar} alt={seller.name} className="w-20 h-20 rounded-full border-4 border-white" />
          <div>
            <h1 className="text-white text-2xl font-bold">{seller.name}</h1>
            <p className="text-white text-sm">{seller.description}</p>
            <div className="flex items-center space-x-4 mt-1 text-sm text-white">
              <span className="flex items-center space-x-1">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <span>{seller.rating}</span>
              </span>
              <span>{seller.products.length} products</span>
              <span>{seller.followers} followers</span>
            </div>
          </div>
          <button className="ml-auto bg-white text-blue-600 px-4 py-2 rounded-md font-semibold hover:bg-gray-100 transition">
            Follow +
          </button>
        </div>
      </div>

      {/* Search */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex items-center space-x-4">
          <div className="flex items-center bg-gray-100 rounded-md px-3 py-2 w-full max-w-lg">
            <Search className="h-4 w-4 text-gray-500 mr-2" />
            <input
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-transparent w-full focus:outline-none text-sm"
            />
          </div>
        </div>
      </div>

      {/* Products */}
      <div className="max-w-7xl mx-auto px-4 pb-16">
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {filtered.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-center py-12">No products found.</p>
        )}
      </div>
    </div>
  );
}


