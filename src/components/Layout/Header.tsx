import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, ShoppingCart, User, Heart, Menu, Home } from 'lucide-react';
import { useApp } from '../../contexts/AppContext';

export function Header() {
  const { state } = useApp();
  const location = useLocation();

  const cartItemCount = state.cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <Home className="h-8 w-8 text-blue-600" />
            <span className="text-2xl font-bold text-gray-900">Sellova</span>
          </Link>

          {/* Search Bar - Hidden on mobile */}
          <div className="hidden md:flex flex-1 max-w-lg mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Search for home décor..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Navigation Icons */}
          <div className="flex items-center space-x-4">
            {/* Mobile Menu */}
            <button className="md:hidden p-2 rounded-lg hover:bg-gray-100">
              <Menu className="h-6 w-6 text-gray-600" />
            </button>

            {/* Search - Mobile */}
            <button className="md:hidden p-2 rounded-lg hover:bg-gray-100">
              <Search className="h-6 w-6 text-gray-600" />
            </button>

            {/* Wishlist */}
            <button className="p-2 rounded-lg hover:bg-gray-100 relative">
              <Heart className="h-6 w-6 text-gray-600" />
            </button>

            {/* Cart */}
            <Link to="/cart" className="p-2 rounded-lg hover:bg-gray-100 relative">
              <ShoppingCart className="h-6 w-6 text-gray-600" />
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartItemCount}
                </span>
              )}
            </Link>

            {/* User Profile */}
            {state.user ? (
              <Link 
                to={state.user.role === 'seller' ? '/seller/dashboard' : '/buyer/dashboard'}
                className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100"
              >
                {state.user.avatar ? (
                  <img
                    src={state.user.avatar}
                    alt={state.user.name}
                    className="h-8 w-8 rounded-full object-cover"
                  />
                ) : (
                  <User className="h-6 w-6 text-gray-600" />
                )}
                <span className="hidden sm:block text-sm font-medium text-gray-700">
                  {state.user.name}
                </span>
              </Link>
            ) : (
              <Link
                to="/login"
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Sign In
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Search Bar */}
      <div className="md:hidden px-4 pb-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <input
            type="text"
            placeholder="Search for home décor..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>
    </header>
  );
}