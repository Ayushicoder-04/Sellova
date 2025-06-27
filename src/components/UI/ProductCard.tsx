import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Star, ShoppingCart } from 'lucide-react';
import { Product } from '../../types';
import { useApp } from '../../contexts/AppContext';

interface ProductCardProps {
  product: Product;
  className?: string;
}

export function ProductCard({ product, className = '' }: ProductCardProps) {
  const { dispatch } = useApp();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    dispatch({
      type: 'ADD_TO_CART',
      payload: {
        product,
        quantity: 1,
      },
    });
  };

  return (
    <Link to={`/product/${product.id}`} className={`group ${className}`}>
      <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden border border-gray-100">
        {/* Image */}
        <div className="relative aspect-square overflow-hidden">
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          
          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col space-y-2">
            {product.trending && (
              <span className="bg-blue-600 text-white text-xs px-2 py-1 rounded-full font-medium">
                Trending
              </span>
            )}
            {product.new && (
              <span className="bg-emerald-600 text-white text-xs px-2 py-1 rounded-full font-medium">
                New
              </span>
            )}
            {product.originalPrice && (
              <span className="bg-red-600 text-white text-xs px-2 py-1 rounded-full font-medium">
                Sale
              </span>
            )}
          </div>

          {/* Wishlist Button */}
          <button className="absolute top-3 right-3 p-2 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-colors group/btn">
            <Heart className="h-4 w-4 text-gray-600 group-hover/btn:text-red-500 transition-colors" />
          </button>

          {/* Quick Add to Cart */}
          <button
            onClick={handleAddToCart}
            className="absolute bottom-3 right-3 p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0"
          >
            <ShoppingCart className="h-4 w-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4">
          {/* Seller */}
          <p className="text-xs text-gray-500 mb-1">{product.sellerName}</p>

          {/* Name */}
          <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
            {product.name}
          </h3>

          {/* Rating */}
          <div className="flex items-center space-x-1 mb-2">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm font-medium text-gray-700">{product.rating}</span>
            <span className="text-sm text-gray-500">({product.reviewCount})</span>
          </div>

          {/* Price */}
          <div className="flex items-center space-x-2">
            <span className="text-lg font-bold text-gray-900">${product.price}</span>
            {product.originalPrice && (
              <span className="text-sm text-gray-500 line-through">${product.originalPrice}</span>
            )}
          </div>

          {/* Colors */}
          {product.colors.length > 0 && (
            <div className="flex items-center space-x-1 mt-2">
              <span className="text-xs text-gray-500">Colors:</span>
              <div className="flex space-x-1">
                {product.colors.slice(0, 3).map((color, index) => (
                  <div
                    key={index}
                    className="w-3 h-3 rounded-full border border-gray-200"
                    style={{ 
                      backgroundColor: color.toLowerCase().includes('oak') ? '#D2691E' :
                                     color.toLowerCase().includes('white') ? '#FFFFFF' :
                                     color.toLowerCase().includes('black') ? '#000000' :
                                     color.toLowerCase().includes('blue') ? '#3B82F6' :
                                     color.toLowerCase().includes('red') ? '#EF4444' :
                                     color.toLowerCase().includes('green') ? '#10B981' :
                                     color.toLowerCase().includes('brass') ? '#B45309' :
                                     '#9CA3AF'
                    }}
                  />
                ))}
                {product.colors.length > 3 && (
                  <span className="text-xs text-gray-400">+{product.colors.length - 3}</span>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}