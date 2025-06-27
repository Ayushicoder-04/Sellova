import React, { useState } from 'react';
import { Sparkles, Upload, Palette, Wand2, Download, RotateCcw } from 'lucide-react';

export function CustomizePage() {
  const [selectedProduct, setSelectedProduct] = useState<string>('');
  const [prompt, setPrompt] = useState('');
  const [roomImage, setRoomImage] = useState<string>('');
  const [isGenerating, setIsGenerating] = useState(false);

  const productTypes = [
    'Coffee Table',
    'Sofa',
    'Dining Chair',
    'Bookshelf',
    'Pendant Light',
    'Wall Art',
    'Rug',
    'Vase',
  ];

  const handleGenerate = () => {
    setIsGenerating(true);
    // Simulate AI generation
    setTimeout(() => {
      setIsGenerating(false);
    }, 3000);
  };

  const handleRoomUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setRoomImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Sparkles className="h-8 w-8 text-purple-600" />
            <h1 className="text-4xl font-bold text-gray-900">AI Customization</h1>
          </div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Transform your ideas into reality with our AI-powered design assistant. 
            Create unique pieces tailored to your exact vision.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Input Panel */}
          <div className="space-y-8">
            {/* Product Type */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center space-x-2">
                <Palette className="h-5 w-5 text-purple-600" />
                <span>Choose Product Type</span>
              </h2>
              <div className="grid grid-cols-2 gap-3">
                {productTypes.map((type) => (
                  <button
                    key={type}
                    onClick={() => setSelectedProduct(type)}
                    className={`p-3 rounded-lg border-2 transition-colors text-left ${
                      selectedProduct === type
                        ? 'border-purple-600 bg-purple-50 text-purple-700'
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            {/* Description */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center space-x-2">
                <Wand2 className="h-5 w-5 text-purple-600" />
                <span>Describe Your Vision</span>
              </h2>
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Describe your ideal piece... e.g., 'A modern coffee table with clean lines, made from dark walnut wood with brass accents and geometric legs'"
                className="w-full h-32 border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
              />
            </div>

            {/* Room Upload */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center space-x-2">
                <Upload className="h-5 w-5 text-purple-600" />
                <span>Upload Your Room (Optional)</span>
              </h2>
              <p className="text-gray-600 mb-4">
                Upload a photo of your room to see how the customized piece will look in your space.
              </p>
              
              {roomImage ? (
                <div className="relative">
                  <img
                    src={roomImage}
                    alt="Your room"
                    className="w-full h-48 object-cover rounded-lg"
                  />
                  <button
                    onClick={() => setRoomImage('')}
                    className="absolute top-2 right-2 p-2 bg-red-600 text-white rounded-full hover:bg-red-700 transition-colors"
                  >
                    <RotateCcw className="h-4 w-4" />
                  </button>
                </div>
              ) : (
                <label className="block cursor-pointer">
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-gray-400 transition-colors">
                    <Upload className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                    <p className="text-gray-600">Click to upload or drag and drop</p>
                    <p className="text-sm text-gray-500">PNG, JPG up to 10MB</p>
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleRoomUpload}
                    className="hidden"
                  />
                </label>
              )}
            </div>

            {/* Generate Button */}
            <button
              onClick={handleGenerate}
              disabled={!selectedProduct || !prompt || isGenerating}
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-4 px-6 rounded-xl font-semibold hover:from-purple-700 hover:to-pink-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
            >
              {isGenerating ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  <span>Generating...</span>
                </>
              ) : (
                <>
                  <Sparkles className="h-5 w-5" />
                  <span>Generate Design</span>
                </>
              )}
            </button>
          </div>

          {/* Preview Panel */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Preview</h2>
            
            {isGenerating ? (
              <div className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
                  <p className="text-gray-600">Creating your custom design...</p>
                </div>
              </div>
            ) : selectedProduct && prompt ? (
              <div className="space-y-6">
                {/* Generated Design */}
                <div className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center">
                  <div className="text-center text-gray-500">
                    <Sparkles className="h-16 w-16 mx-auto mb-4 opacity-50" />
                    <p>Generated design will appear here</p>
                    <p className="text-sm mt-2">Click "Generate Design" to create your custom piece</p>
                  </div>
                </div>

                {/* Room Integration */}
                {roomImage && (
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-3">In Your Room</h3>
                    <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center">
                      <p className="text-gray-500">Room integration preview</p>
                    </div>
                  </div>
                )}

                {/* Actions */}
                <div className="flex space-x-3">
                  <button className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2">
                    <Download className="h-4 w-4" />
                    <span>Save Design</span>
                  </button>
                  <button className="flex-1 border border-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-50 transition-colors">
                    Order Custom
                  </button>
                </div>
              </div>
            ) : (
              <div className="aspect-square bg-gray-50 rounded-lg flex items-center justify-center">
                <div className="text-center text-gray-400">
                  <Palette className="h-16 w-16 mx-auto mb-4" />
                  <p>Select a product type and describe your vision to get started</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}