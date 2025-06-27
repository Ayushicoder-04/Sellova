import React from 'react';
import { 
  DollarSign, 
  Package, 
  TrendingUp, 
  Star, 
  Plus, 
  Eye, 
  ShoppingCart,
  MessageCircle,
  BarChart3 
} from 'lucide-react';
import { mockSellerStats } from '../data/mockData';

export function SellerDashboard() {
  const stats = mockSellerStats;

  const recentOrders = [
    { id: '#12345', customer: 'Sarah Johnson', product: 'Scandinavian Oak Coffee Table', amount: 599, status: 'processing' },
    { id: '#12344', customer: 'Mike Chen', product: 'Industrial Pendant Light', amount: 149, status: 'shipped' },
    { id: '#12343', customer: 'Emma Wilson', product: 'Velvet Accent Chair', amount: 449, status: 'delivered' },
  ];

  const statusColors = {
    processing: 'bg-yellow-100 text-yellow-800',
    shipped: 'bg-blue-100 text-blue-800',
    delivered: 'bg-green-100 text-green-800',
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Seller Dashboard</h1>
            <p className="text-gray-600">Manage your store and track your success</p>
          </div>
          <button className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center space-x-2 mt-4 sm:mt-0">
            <Plus className="h-5 w-5" />
            <span>Add Product</span>
          </button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <DollarSign className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">${stats.totalSales.toLocaleString()}</p>
                <p className="text-sm text-gray-600">Total Sales</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Package className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{stats.totalOrders}</p>
                <p className="text-sm text-gray-600">Total Orders</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <TrendingUp className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{stats.totalProducts}</p>
                <p className="text-sm text-gray-600">Products Listed</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center">
                <Star className="h-6 w-6 text-amber-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{stats.avgRating}</p>
                <p className="text-sm text-gray-600">Average Rating</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 mb-8">
          {/* Revenue Chart */}
          <div className="lg:col-span-2 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-2">
                <BarChart3 className="h-5 w-5 text-blue-600" />
                <h2 className="text-xl font-semibold text-gray-900">Monthly Revenue</h2>
              </div>
            </div>
            
            <div className="h-64 flex items-end justify-between space-x-1">
              {stats.monthlyRevenue.map((amount, index) => (
                <div key={index} className="flex flex-col items-center flex-1">
                  <div
                    className="w-full bg-blue-600 rounded-t"
                    style={{ height: `${(amount / Math.max(...stats.monthlyRevenue)) * 100}%` }}
                  />
                  <span className="text-xs text-gray-500 mt-2">
                    {new Date(2024, index).toLocaleDateString('en', { month: 'short' })}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Top Products */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Top Products</h2>
            <div className="space-y-4">
              {stats.topProducts.map((product, index) => (
                <div key={product.id} className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-sm font-medium text-blue-600">#{index + 1}</span>
                  </div>
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="w-12 h-12 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <p className="font-medium text-gray-900 text-sm line-clamp-1">
                      {product.name}
                    </p>
                    <p className="text-xs text-gray-600">${product.price}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Orders */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Recent Orders</h2>
            <button className="text-blue-600 hover:text-blue-700 font-medium text-sm">
              View All Orders
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left text-sm font-medium text-gray-500 pb-3">Order ID</th>
                  <th className="text-left text-sm font-medium text-gray-500 pb-3">Customer</th>
                  <th className="text-left text-sm font-medium text-gray-500 pb-3">Product</th>
                  <th className="text-left text-sm font-medium text-gray-500 pb-3">Amount</th>
                  <th className="text-left text-sm font-medium text-gray-500 pb-3">Status</th>
                  <th className="text-left text-sm font-medium text-gray-500 pb-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.map((order) => (
                  <tr key={order.id} className="border-b border-gray-100">
                    <td className="py-4 text-sm font-medium text-gray-900">{order.id}</td>
                    <td className="py-4 text-sm text-gray-600">{order.customer}</td>
                    <td className="py-4 text-sm text-gray-600 max-w-xs truncate">{order.product}</td>
                    <td className="py-4 text-sm font-medium text-gray-900">${order.amount}</td>
                    <td className="py-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[order.status as keyof typeof statusColors]}`}>
                        {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                      </span>
                    </td>
                    <td className="py-4">
                      <div className="flex items-center space-x-2">
                        <button className="p-1 rounded hover:bg-gray-100 transition-colors">
                          <Eye className="h-4 w-4 text-gray-600" />
                        </button>
                        <button className="p-1 rounded hover:bg-gray-100 transition-colors">
                          <MessageCircle className="h-4 w-4 text-gray-600" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <button className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 text-left hover:shadow-md transition-shadow">
            <div className="flex items-center space-x-3 mb-3">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <Plus className="h-5 w-5 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-900">Add Product</h3>
            </div>
            <p className="text-sm text-gray-600">List a new item in your store</p>
          </button>

          <button className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 text-left hover:shadow-md transition-shadow">
            <div className="flex items-center space-x-3 mb-3">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <Package className="h-5 w-5 text-green-600" />
              </div>
              <h3 className="font-semibold text-gray-900">Manage Inventory</h3>
            </div>
            <p className="text-sm text-gray-600">Update stock and product details</p>
          </button>

          <button className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 text-left hover:shadow-md transition-shadow">
            <div className="flex items-center space-x-3 mb-3">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                <MessageCircle className="h-5 w-5 text-purple-600" />
              </div>
              <h3 className="font-semibold text-gray-900">Customer Messages</h3>
            </div>
            <p className="text-sm text-gray-600">Respond to buyer inquiries</p>
          </button>

          <button className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 text-left hover:shadow-md transition-shadow">
            <div className="flex items-center space-x-3 mb-3">
              <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center">
                <BarChart3 className="h-5 w-5 text-amber-600" />
              </div>
              <h3 className="font-semibold text-gray-900">View Analytics</h3>
            </div>
            <p className="text-sm text-gray-600">Detailed performance insights</p>
          </button>
        </div>
      </div>
    </div>
  );
}