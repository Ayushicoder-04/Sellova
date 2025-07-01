import React from 'react';
import { ShoppingCart, Heart, Star } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../contexts/AppContext';

interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  images: string[];
}

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const navigate = useNavigate();
  const { dispatch } = useApp();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch({
      type: 'ADD_TO_CART',
      payload: {
        product,
        quantity: 1,
      },
    });
  };

  const handleNavigate = () => {
    navigate(`/product/${product.id}`);
  };

  return (
    <div
      onClick={handleNavigate}
      className="group bg-gradient-to-br from-[#fff7f5] via-[#fefdfb] to-[#faf7f2] border border-rose-100 rounded-3xl shadow-sm hover:shadow-md transition-all cursor-pointer overflow-hidden flex flex-col"
    >
      {/* Product Image */}
      <div className="relative aspect-square overflow-hidden">
        <img
          src={product.images[0]}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <button
          onClick={(e) => e.stopPropagation()}
          className="absolute top-3 right-3 bg-white/80 backdrop-blur-md rounded-full p-2 hover:bg-white shadow-sm"
        >
          <Heart className="h-5 w-5 text-gray-600 group-hover:text-rose-500" />
        </button>
      </div>

      {/* Product Info */}
      <div className="p-4 flex flex-col flex-1 space-y-2">
        <h3 className="text-lg font-semibold text-gray-900 group-hover:text-rose-700 transition">
          {product.name}
        </h3>

        {/* Price */}
        <div className="flex items-center space-x-2">
          <span className="text-xl font-bold text-gray-900">${product.price}</span>
          {product.originalPrice && (
            <span className="text-sm text-gray-400 line-through">
              ${product.originalPrice}
            </span>
          )}
        </div>

        {/* Rating */}
        <div className="flex items-center space-x-2 text-sm">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-4 w-4 ${
                  i < Math.floor(product.rating)
                    ? 'fill-yellow-400 text-yellow-400'
                    : 'text-gray-300'
                }`}
              />
            ))}
          </div>
          <span className="text-gray-500">({product.reviewCount})</span>
        </div>

        {/* Add to Cart */}
        <button
          onClick={handleAddToCart}
          className="mt-auto bg-rose-600 hover:bg-rose-700 text-white w-full py-2 rounded-lg flex items-center justify-center space-x-2 font-medium transition"
        >
          <ShoppingCart className="h-5 w-5" />
          <span>Add to Cart</span>
        </button>
      </div>
    </div>
  );
}
