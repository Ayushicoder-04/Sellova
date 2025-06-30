import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../contexts/AppContext';
import { v4 as uuidv4 } from 'uuid';

export default function AddProductPage() {
  const { dispatch, state } = useApp();
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newProduct = {
      id: uuidv4(),
      name,
      description,
      price: parseFloat(price),
      images: [image],
      sellerId: state.user?.id || 'anonymous',
      sellerName: state.user?.name || 'Anonymous Seller',
      rating: 0,
      reviewCount: 0,
      colors: [],
      sizes: [],
      trending: false,
      new: true,
    };

    dispatch({ type: 'ADD_PRODUCT', payload: newProduct });
    navigate('/seller-dashboard');
  };

  return (
    <div className="max-w-2xl mx-auto py-10 px-4">
      <h1 className="text-2xl font-bold mb-6">Add New Product</h1>
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Product Name</label>
          <input
            type="text"
            className="w-full border border-gray-300 rounded-lg px-3 py-2"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
          <textarea
            className="w-full border border-gray-300 rounded-lg px-3 py-2"
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Price ($)</label>
          <input
            type="number"
            step="0.01"
            className="w-full border border-gray-300 rounded-lg px-3 py-2"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
          <input
            type="url"
            className="w-full border border-gray-300 rounded-lg px-3 py-2"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Add Product
        </button>
      </form>
    </div>
  );
}
