import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  Heart, Share2, ShoppingCart, Star, Truck, Shield, RotateCcw, MessageCircle,
  ChevronLeft, ChevronRight, Sparkles, Wand2, Eye, Maximize2
} from 'lucide-react';
import { mockProducts } from '../data/mockData';
import { useApp } from '../contexts/AppContext';

export function ProductDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { dispatch } = useApp();
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [customRequest, setCustomRequest] = useState('');
  const [isCustomizing, setIsCustomizing] = useState(false);
  const [showCustomPreview, setShowCustomPreview] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);

  const product = mockProducts.find(p => p.id === id);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-rose-50">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-rose-800 mb-2">Product Not Found</h1>
          <p className="text-rose-500">The product you're looking for doesn't exist.</p>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    dispatch({
      type: 'ADD_TO_CART',
      payload: {
        product,
        quantity,
        selectedColor,
        selectedSize,
        customization: customRequest || undefined,
      },
    });
  };

  const handleCustomize = () => {
    setIsCustomizing(true);
    setTimeout(() => {
      setIsCustomizing(false);
      setShowCustomPreview(true);
    }, 3000);
  };

  const nextImage = () => {
    setSelectedImageIndex((prev) => prev === product.images.length - 1 ? 0 : prev + 1);
  };

  const prevImage = () => {
    setSelectedImageIndex((prev) => prev === 0 ? product.images.length - 1 : prev - 1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#fef8f4] via-[#fefdfb] to-[#faf7f2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-12 gap-10">
          {/* Left Column */}
          <div className="lg:col-span-7">
            <div className="mb-8">
              <div className="relative aspect-square rounded-3xl overflow-hidden bg-rose-100 group shadow-xl">
                <img
                  src={product.images[selectedImageIndex]}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                {product.images.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute left-4 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-white/90 rounded-full flex items-center justify-center hover:bg-white shadow-md transition-all opacity-0 group-hover:opacity-100"
                    >
                      <ChevronLeft className="h-5 w-5 text-gray-700" />
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-white/90 rounded-full flex items-center justify-center hover:bg-white shadow-md transition-all opacity-0 group-hover:opacity-100"
                    >
                      <ChevronRight className="h-5 w-5 text-gray-700" />
                    </button>
                  </>
                )}

                <button className="absolute top-4 right-4 w-10 h-10 bg-white/90 rounded-full flex items-center justify-center hover:bg-white transition-all opacity-0 group-hover:opacity-100 shadow-md">
                  <Maximize2 className="h-5 w-5 text-gray-700" />
                </button>

                {product.images.length > 1 && (
                  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                    {product.images.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedImageIndex(index)}
                        className={`w-2.5 h-2.5 rounded-full transition-colors ${
                          selectedImageIndex === index ? 'bg-white' : 'bg-white/50'
                        }`}
                      />
                    ))}
                  </div>
                )}
              </div>

              {product.images.length > 1 && (
                <div className="flex space-x-3 mt-4 overflow-x-auto pb-2">
                  {product.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImageIndex(index)}
                      className={`flex-shrink-0 w-20 h-20 rounded-xl overflow-hidden border-2 transition-all ${
                        selectedImageIndex === index ? 'border-rose-500' : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <img
                        src={image}
                        alt={`${product.name} ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* 3D Preview Section */}
            <div className="bg-gradient-to-br from-rose-50 to-orange-50 rounded-3xl p-8 border-2 border-dashed border-rose-300 shadow-inner">
              <div className="text-center">
                <div className="w-16 h-16 bg-rose-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Eye className="h-8 w-8 text-rose-600" />
                </div>
                <h3 className="text-lg font-semibold text-rose-900 mb-2">3D Preview</h3>
                <p className="text-rose-500 mb-4">
                  View this product in your space with our immersive 360° viewer.
                </p>
                <button className="bg-rose-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-rose-700 transition-colors">
                  Launch 3D View
                </button>
              </div>
            </div>
          </div>
          {/* Right Column - AI Customize Sidebar */}
<div className="lg:col-span-2">
  <div className="sticky top-8">
    <div className="bg-gradient-to-br from-[#fff0f3] to-[#fffdfd] border-2 border-dashed border-rose-200 rounded-3xl p-6 shadow-md">
      <div className="flex items-center space-x-2 mb-4">
        <Sparkles className="h-6 w-6 text-rose-600" />
        <h2 className="text-xl font-bold text-gray-900">AI Customize</h2>
      </div>

      <p className="text-gray-600 text-sm mb-5">
        Tell us how you'd like this product customized. Our AI will show you a visual preview.
      </p>

      <div className="space-y-4">
        {/* Customization Input */}
        <div>
          <label className="block text-sm font-medium text-gray-800 mb-1">Your Request</label>
          <textarea
            value={customRequest}
            onChange={(e) => setCustomRequest(e.target.value)}
            placeholder="e.g., Make it beige linen with golden knobs and softer curves..."
            className="w-full h-24 px-4 py-2 text-sm border border-rose-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:outline-none resize-none"
          />
        </div>

        {/* AI Generate Button */}
        <button
          onClick={handleCustomize}
          disabled={!customRequest.trim() || isCustomizing}
          className="w-full bg-gradient-to-r from-rose-600 to-pink-500 text-white py-3 px-4 rounded-xl font-semibold hover:from-rose-700 hover:to-pink-600 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
        >
          {isCustomizing ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
              <span>Generating...</span>
            </>
          ) : (
            <>
              <Wand2 className="h-5 w-5" />
              <span>Preview Custom Look</span>
            </>
          )}
        </button>

        {/* AI Preview Output */}
        {showCustomPreview && (
          <div className="mt-5 p-4 bg-white rounded-xl border border-rose-200 shadow-sm">
            <h3 className="font-semibold text-gray-900 mb-2">Your AI Preview</h3>
            <div className="aspect-square bg-gradient-to-br from-rose-50 to-orange-50 rounded-lg flex items-center justify-center mb-3">
              <div className="text-center text-rose-400">
                <Sparkles className="h-8 w-8 mx-auto mb-2" />
                <p className="text-sm">AI-enhanced visualization</p>
              </div>
            </div>
            <div className="space-y-2">
              <button className="w-full bg-rose-600 text-white py-2 px-4 rounded-lg text-sm font-medium hover:bg-rose-700 transition">
                Order Custom Version
              </button>
              <button className="w-full border border-gray-300 text-gray-700 py-2 px-4 rounded-lg text-sm font-medium hover:bg-gray-50 transition">
                Refine Request
              </button>
            </div>
          </div>
        )}

        {/* Popular Suggestions */}
        <div className="mt-6">
          <h4 className="text-sm font-semibold text-gray-800 mb-2">Popular Customizations</h4>
          <div className="space-y-2">
            {[
              'Change fabric type',
              'Add drawers',
              'Switch to metal legs',
              'Custom engraving'
            ].map((suggestion) => (
              <button
                key={suggestion}
                onClick={() => setCustomRequest(suggestion)}
                className="w-full text-left text-sm text-rose-600 hover:text-rose-700 py-1 px-2 rounded hover:bg-rose-50 transition"
              >
                {suggestion}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

                    {/* Middle Column - Product Info */}
          <div className="lg:col-span-3">
            <div className="sticky top-8 space-y-6">
              {/* Seller Info */}
              <div className="flex items-center space-x-3 mb-2">
                <img
                  src="https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=40&h=40&fit=crop"
                  alt={product.sellerName}
                  className="w-9 h-9 rounded-full object-cover"
                />
                <span className="text-rose-600 font-semibold hover:underline cursor-pointer">
                  {product.sellerName}
                </span>
              </div>

              {/* Product Title */}
              <h1 className="text-4xl font-bold text-gray-900 leading-tight">{product.name}</h1>

              {/* Rating */}
              <div className="flex items-center space-x-2">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${
                        i < Math.floor(product.rating)
                          ? 'fill-yellow-400 text-yellow-400'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm font-medium text-gray-700">{product.rating}</span>
                <span className="text-sm text-gray-500">({product.reviewCount} reviews)</span>
              </div>

              {/* Price */}
              <div className="flex items-center space-x-3">
                <span className="text-3xl font-bold text-gray-900">${product.price}</span>
                {product.originalPrice && (
                  <>
                    <span className="text-xl text-gray-400 line-through">${product.originalPrice}</span>
                    <span className="bg-red-100 text-red-600 px-2 py-1 rounded-full text-sm font-medium">
                      Save ${product.originalPrice - product.price}
                    </span>
                  </>
                )}
              </div>

              {/* Description */}
              <p className="text-gray-700 leading-relaxed">{product.description}</p>

              {/* Colors */}
              {product.colors.length > 0 && (
                <div>
                  <h3 className="text-sm font-medium text-gray-900 mb-2">Color</h3>
                  <div className="flex flex-wrap gap-2">
                    {product.colors.map((color) => (
                      <button
                        key={color}
                        onClick={() => setSelectedColor(color)}
                        className={`px-4 py-2 rounded-lg border-2 transition-all ${
                          selectedColor === color
                            ? 'border-rose-500 bg-rose-50 text-rose-700'
                            : 'border-gray-300 hover:border-gray-400'
                        }`}
                      >
                        {color}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Sizes */}
              {product.sizes.length > 0 && (
                <div>
                  <h3 className="text-sm font-medium text-gray-900 mb-2">Size</h3>
                  <div className="flex flex-wrap gap-2">
                    {product.sizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`px-4 py-2 rounded-lg border-2 transition-all ${
                          selectedSize === size
                            ? 'border-rose-500 bg-rose-50 text-rose-700'
                            : 'border-gray-300 hover:border-gray-400'
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity */}
              <div>
                <h3 className="text-sm font-medium text-gray-900 mb-2">Quantity</h3>
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-10 rounded-lg border border-gray-300 text-lg font-bold hover:bg-gray-50"
                  >
                    −
                  </button>
                  <span className="w-12 text-center font-medium text-lg">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-10 h-10 rounded-lg border border-gray-300 text-lg font-bold hover:bg-gray-50"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Buttons */}
              <div className="space-y-4">
                <button
                  onClick={handleAddToCart}
                  className="w-full bg-rose-600 text-white py-4 rounded-lg font-semibold hover:bg-rose-700 transition-colors flex items-center justify-center space-x-2"
                >
                  <ShoppingCart className="h-5 w-5" />
                  <span>Add to Cart</span>
                </button>

                <div className="flex space-x-3">
                  <button
                    onClick={() => setIsWishlisted(!isWishlisted)}
                    className={`flex-1 py-3 px-4 rounded-lg font-medium flex items-center justify-center space-x-2 border-2 ${
                      isWishlisted
                        ? 'bg-red-50 border-red-300 text-red-700'
                        : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <Heart className={`h-5 w-5 ${isWishlisted ? 'fill-current' : ''}`} />
                    <span>{isWishlisted ? 'Saved' : 'Save to Wishlist'}</span>
                  </button>
                  <button className="p-3 border-2 border-gray-300 rounded-lg hover:bg-gray-50">
                    <Share2 className="h-5 w-5 text-gray-700" />
                  </button>
                </div>
              </div>

              {/* Features */}
              <div className="space-y-3 text-sm">
                <div className="flex items-center space-x-3 text-gray-600">
                  <Truck className="h-5 w-5 text-green-600" />
                  <span>Free shipping over $200</span>
                </div>
                <div className="flex items-center space-x-3 text-gray-600">
                  <Shield className="h-5 w-5 text-blue-600" />
                  <span>1-year warranty included</span>
                </div>
                <div className="flex items-center space-x-3 text-gray-600">
                  <RotateCcw className="h-5 w-5 text-purple-600" />
                  <span>30-day easy returns</span>
                </div>
                <div className="flex items-center space-x-3 text-gray-600">
                  <MessageCircle className="h-5 w-5 text-amber-600" />
                  <span>24/7 support</span>
                </div>
              </div>
            </div>
          </div>
