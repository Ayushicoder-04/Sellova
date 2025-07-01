import React, { useState } from 'react';
import {
  UserCircle, Heart, Settings, Package, LogOut, MapPin, CreditCard
} from 'lucide-react';

export function BuyerProfilePage() {
  const [activeTab, setActiveTab] = useState('orders');

  const renderContent = () => {
    switch (activeTab) {
      case 'orders':
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-800">Recent Orders</h3>
            <div className="bg-white rounded-xl shadow p-4 border border-gray-100">
              <p className="text-gray-600">You have no recent orders.</p>
            </div>
          </div>
        );
      case 'saved':
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-800">Saved Items</h3>
            <div className="bg-white rounded-xl shadow p-4 border border-gray-100">
              <p className="text-gray-600">You haven't saved any items yet.</p>
            </div>
          </div>
        );
      case 'settings':
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-800">Account Settings</h3>
            <div className="space-y-4">
              <div className="bg-white p-4 rounded-xl shadow border border-gray-100">
                <h4 className="font-semibold text-gray-700 flex items-center space-x-2">
                  <MapPin className="h-4 w-4 text-blue-500" />
                  <span>Shipping Address</span>
                </h4>
                <p className="text-sm text-gray-600 mt-2">No address saved.</p>
              </div>
              <div className="bg-white p-4 rounded-xl shadow border border-gray-100">
                <h4 className="font-semibold text-gray-700 flex items-center space-x-2">
                  <CreditCard className="h-4 w-4 text-emerald-500" />
                  <span>Payment Method</span>
                </h4>
                <p className="text-sm text-gray-600 mt-2">No card linked.</p>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 via-rose-50 to-orange-50 py-12 px-4">
      <div className="max-w-5xl mx-auto space-y-8">
        {/* Profile Header */}
        <div className="bg-white rounded-3xl shadow-lg p-6 flex flex-col sm:flex-row items-center justify-between">
          <div className="flex items-center space-x-4">
            <UserCircle className="h-16 w-16 text-rose-500" />
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Welcome, Alex!</h2>
              <p className="text-gray-500">alex@email.com</p>
            </div>
          </div>
          <button className="mt-4 sm:mt-0 flex items-center space-x-2 text-red-500 hover:text-red-600 font-medium">
            <LogOut className="h-5 w-5" />
            <span>Log Out</span>
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Tabs */}
          <div className="flex lg:flex-col bg-white rounded-3xl shadow border border-gray-100 p-4 lg:w-56">
            <button
              onClick={() => setActiveTab('orders')}
              className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition text-sm font-medium ${
                activeTab === 'orders'
                  ? 'bg-rose-100 text-rose-600'
                  : 'hover:bg-gray-100 text-gray-700'
              }`}
            >
              <Package className="h-5 w-5" />
              <span>Orders</span>
            </button>
            <button
              onClick={() => setActiveTab('saved')}
              className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition text-sm font-medium ${
                activeTab === 'saved'
                  ? 'bg-rose-100 text-rose-600'
                  : 'hover:bg-gray-100 text-gray-700'
              }`}
            >
              <Heart className="h-5 w-5" />
              <span>Saved</span>
            </button>
            <button
              onClick={() => setActiveTab('settings')}
              className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition text-sm font-medium ${
                activeTab === 'settings'
                  ? 'bg-rose-100 text-rose-600'
                  : 'hover:bg-gray-100 text-gray-700'
              }`}
            >
              <Settings className="h-5 w-5" />
              <span>Settings</span>
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 space-y-6">
            {renderContent()}
          </div>
        </div>
      </div>
    </div>
  );
}

