import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { 
  Heart, 
  Share2, 
  ShoppingCart, 
  Star, 
  Truck, 
  Shield, 
  RotateCcw, 
  MessageCircle,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Wand2,
  Eye,
  Maximize2
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
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Product Not Found</h1>
          <p className="text-gray-600">The product you're looking for doesn't exist.</p>
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
    setSelectedImageIndex((prev) => 
      prev === product.images.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setSelectedImageIndex((prev) => 
      prev === 0 ? product.images.length - 1 : prev - 1
    );
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-12 gap-8">
          {/* Left Column - Images and 3D Preview */}
          <div className="lg:col-span-7">
            {/* Main Image Gallery */}
            <div className="mb-6">
              <div className="relative aspect-square rounded-2xl overflow-hidden bg-gray-100 group">
                <img
                  src={product.images[selectedImageIndex]}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                
                {/* Image Navigation */}
                {product.images.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute left-4 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors opacity-0 group-hover:opacity-100"
                    >
                      <ChevronLeft className="h-5 w-5 text-gray-700" />
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors opacity-0 group-hover:opacity-100"
                    >
                      <ChevronRight className="h-5 w-5 text-gray-700" />
                    </button>
                  </>
                )}

                {/* Zoom Button */}
                <button className="absolute top-4 right-4 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors opacity-0 group-hover:opacity-100">
                  <Maximize2 className="h-5 w-5 text-gray-700" />
                </button>

                {/* Image Indicators */}
                {product.images.length > 1 && (
                  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                    {product.images.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedImageIndex(index)}
                        className={`w-2 h-2 rounded-full transition-colors ${
                          selectedImageIndex === index ? 'bg-white' : 'bg-white/50'
                        }`}
                      />
                    ))}
                  </div>
                )}
              </div>

              {/* Thumbnail Images */}
              {product.images.length > 1 && (
                <div className="flex space-x-3 mt-4 overflow-x-auto pb-2">
                  {product.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImageIndex(index)}
                      className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors ${
                        selectedImageIndex === index ? 'border-blue-600' : 'border-gray-200 hover:border-gray-300'
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

            {/* 3D Preview Placeholder */}
            <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-8 border-2 border-dashed border-gray-300">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Eye className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">3D Preview</h3>
                <p className="text-gray-600 mb-4">
                  Experience this product in 360° view and see how it fits in your space
                </p>
                <button className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
                  Launch 3D View
                </button>
              </div>
            </div>
          </div>

          {/* Middle Column - Product Info */}
          <div className="lg:col-span-3">
            {/* Seller */}
            <div className="flex items-center space-x-2 mb-3">
              <img
                src="https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=40&h=40&fit=crop"
                alt={product.sellerName}
                className="w-8 h-8 rounded-full object-cover"
              />
              <span className="text-blue-600 font-medium hover:text-blue-700 cursor-pointer">
                {product.sellerName}
              </span>
            </div>

            {/* Title */}
            <h1 className="text-3xl font-bold text-gray-900 mb-4 leading-tight">{product.name}</h1>

            {/* Rating */}
            <div className="flex items-center space-x-2 mb-6">
              <div className="flex items-center">
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
            <div className="flex items-center space-x-3 mb-6">
              <span className="text-3xl font-bold text-gray-900">${product.price}</span>
              {product.originalPrice && (
                <>
                  <span className="text-xl text-gray-500 line-through">${product.originalPrice}</span>
                  <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-medium">
                    Save ${product.originalPrice - product.price}
                  </span>
                </>
              )}
            </div>

            {/* Description */}
            <p className="text-gray-600 mb-8 leading-relaxed">{product.description}</p>

            {/* Options */}
            <div className="space-y-6 mb-8">
              {/* Colors */}
              {product.colors.length > 0 && (
                <div>
                  <h3 className="text-sm font-semibold text-gray-900 mb-3">Color</h3>
                  <div className="flex flex-wrap gap-3">
                    {product.colors.map((color) => (
                      <button
                        key={color}
                        onClick={() => setSelectedColor(color)}
                        className={`px-4 py-2 rounded-lg border-2 transition-colors ${
                          selectedColor === color
                            ? 'border-blue-600 bg-blue-50 text-blue-700'
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
                  <h3 className="text-sm font-semibold text-gray-900 mb-3">Size</h3>
                  <div className="flex flex-wrap gap-3">
                    {product.sizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`px-4 py-2 rounded-lg border-2 transition-colors ${
                          selectedSize === size
                            ? 'border-blue-600 bg-blue-50 text-blue-700'
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
                <h3 className="text-sm font-semibold text-gray-900 mb-3">Quantity</h3>
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-10 rounded-lg border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors"
                  >
                    -
                  </button>
                  <span className="w-12 text-center font-medium text-lg">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-10 h-10 rounded-lg border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-4 mb-8">
              <button
                onClick={handleAddToCart}
                className="w-full bg-blue-600 text-white py-4 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2"
              >
                <ShoppingCart className="h-5 w-5" />
                <span>Add to Cart</span>
              </button>

              <div className="flex space-x-3">
                <button
                  onClick={() => setIsWishlisted(!isWishlisted)}
                  className={`flex-1 py-3 px-4 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2 ${
                    isWishlisted
                      ? 'bg-red-50 text-red-700 border-2 border-red-200'
                      : 'border-2 border-gray-300 text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <Heart className={`h-5 w-5 ${isWishlisted ? 'fill-current' : ''}`} />
                  <span>{isWishlisted ? 'Saved' : 'Save to Wishlist'}</span>
                </button>
                <button className="p-3 border-2 border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                  <Share2 className="h-5 w-5 text-gray-700" />
                </button>
              </div>
            </div>

            {/* Features */}
            <div className="space-y-3 text-sm">
              <div className="flex items-center space-x-3 text-gray-600">
                <Truck className="h-5 w-5 text-green-600" />
                <span>Free shipping on orders over $200</span>
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
                <span>24/7 customer support</span>
              </div>
            </div>
          </div>

          {/* Right Column - AI Customize Sidebar */}
          <div className="lg:col-span-2">
            <div className="sticky top-8">
              <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl border-2 border-purple-200 p-6">
                <div className="flex items-center space-x-2 mb-4">
                  <Sparkles className="h-6 w-6 text-purple-600" />
                  <h2 className="text-xl font-bold text-gray-900">AI Customize</h2>
                </div>
                
                <p className="text-gray-600 text-sm mb-6">
                  Describe how you'd like to customize this piece. Our AI will generate a preview for you.
                </p>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Customization Request
                    </label>
                    <textarea
                      value={customRequest}
                      onChange={(e) => setCustomRequest(e.target.value)}
                      placeholder="e.g., Make it darker wood with brass handles and add carved details on the legs..."
                      className="w-full h-24 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
                    />
                  </div>

                  <button
                    onClick={handleCustomize}
                    disabled={!customRequest.trim() || isCustomizing}
                    className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 px-4 rounded-lg font-semibold hover:from-purple-700 hover:to-pink-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                  >
                    {isCustomizing ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                        <span>Generating...</span>
                      </>
                    ) : (
                      <>
                        <Wand2 className="h-4 w-4" />
                        <span>Preview AI Result</span>
                      </>
                    )}
                  </button>

                  {/* AI Preview Result */}
                  {showCustomPreview && (
                    <div className="mt-6 p-4 bg-white rounded-lg border border-purple-200">
                      <h3 className="font-semibold text-gray-900 mb-3">AI Preview</h3>
                      <div className="aspect-square bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg flex items-center justify-center mb-4">
                        <div className="text-center text-gray-500">
                          <Sparkles className="h-8 w-8 mx-auto mb-2 opacity-50" />
                          <p className="text-sm">Customized preview</p>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <button className="w-full bg-purple-600 text-white py-2 px-4 rounded-lg text-sm font-medium hover:bg-purple-700 transition-colors">
                          Order Custom Version
                        </button>
                        <button className="w-full border border-gray-300 text-gray-700 py-2 px-4 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors">
                          Refine Request
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Popular Customizations */}
                  <div className="mt-6">
                    <h3 className="text-sm font-semibold text-gray-900 mb-3">Popular Customizations</h3>
                    <div className="space-y-2">
                      {[
                        'Change wood finish',
                        'Adjust dimensions',
                        'Add metal accents',
                        'Custom engraving'
                      ].map((suggestion) => (
                        <button
                          key={suggestion}
                          onClick={() => setCustomRequest(suggestion)}
                          className="w-full text-left text-sm text-gray-600 hover:text-purple-600 py-1 px-2 rounded hover:bg-purple-50 transition-colors"
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
        </div>
      </div>
    </div>
  );
}