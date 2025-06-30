import React, { useState } from 'react';
import {
  Package,
  Heart,
  Store,
  User,
  Star,
  Eye,
  Trash2,
  Edit,
  Save,
  X,
  MapPin,
  Mail,
  Phone,
  Lock
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { mockProducts } from '../data/mockData';
import { ProductCard } from '../components/UI/ProductCard';
import { useApp } from '../contexts/AppContext';

export function BuyerDashboard() {
  const [activeTab, setActiveTab] = useState('orders');
  const [editingProfile, setEditingProfile] = useState(false);
  const { state } = useApp(); // context fallback
  const wishlistItems = state?.wishlist || mockProducts.slice(0, 6); // TODO: Replace with backend state once ready

  const [profileForm, setProfileForm] = useState({
    name: 'Alex Johnson',
    email: 'alex@example.com',
    phone: '(555) 123-4567',
    address: '123 Main Street',
    city: 'New York',
    state: 'NY',
    zipCode: '10001',
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const tabs = [
    { id: 'orders', label: 'My Orders', icon: Package },
    { id: 'wishlist', label: 'Wishlist', icon: Heart },
    { id: 'shops', label: 'Saved Shops', icon: Store },
    { id: 'profile', label: 'Profile Settings', icon: User },
  ];

  const orders = [
    {
      id: 'ORD-123456',
      date: '2024-01-15',
      products: ['Scandinavian Oak Coffee Table', 'Industrial Pendant Light'],
      total: 748,
      status: 'delivered',
      trackingNumber: 'TRK123456789'
    },
    {
      id: 'ORD-123455',
      date: '2024-01-12',
      products: ['Moroccan Geometric Rug'],
      total: 299,
      status: 'shipped',
      trackingNumber: 'TRK123456788'
    },
    {
      id: 'ORD-123454',
      date: '2024-01-10',
      products: ['Velvet Accent Chair'],
      total: 449,
      status: 'processing',
      trackingNumber: null
    },
    {
      id: 'ORD-123453',
      date: '2024-01-08',
      products: ['Minimalist Wall Mirror', 'Ceramic Vase Set'],
      total: 168,
      status: 'delivered',
      trackingNumber: 'TRK123456787'
    },
  ];

  const savedShops = [
    {
      id: '1',
      name: 'Modern Living Co.',
      description: 'Contemporary furniture and home accessories',
      banner: 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg',
      avatar: 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg',
      rating: 4.8,
      products: 45,
      followers: 1200
    },
    {
      id: '2',
      name: 'Artisan Rugs',
      description: 'Handcrafted rugs from around the world',
      banner: 'https://images.pexels.com/photos/1571463/pexels-photo-1571463.jpeg',
      avatar: 'https://images.pexels.com/photos/1571463/pexels-photo-1571463.jpeg',
      rating: 4.6,
      products: 28,
      followers: 850
    },
    {
      id: '3',
      name: 'Urban Lighting',
      description: 'Industrial and modern lighting solutions',
      banner: 'https://images.pexels.com/photos/1395967/pexels-photo-1395967.jpeg',
      avatar: 'https://images.pexels.com/photos/1395967/pexels-photo-1395967.jpeg',
      rating: 4.7,
      products: 62,
      followers: 2100
    },
  ];

  const statusColors = {
    delivered: 'bg-green-100 text-green-800',
    shipped: 'bg-blue-100 text-blue-800',
    processing: 'bg-yellow-100 text-yellow-800',
    cancelled: 'bg-red-100 text-red-800',
  };

  const handleProfileSave = () => {
    // TODO: Hook this up to backend API or state
    setEditingProfile(false);
  };

  const handleProfileCancel = () => {
    setEditingProfile(false);
  };

  const removeFromWishlist = (productId: string) => {
    // TODO: Remove item from wishlist state
    console.log('Remove from wishlist:', productId);
  };

  const unfollowShop = (shopId: string) => {
    // TODO: Unfollow shop logic
    console.log('Unfollow shop:', shopId);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">My Account</h1>
        <p className="text-gray-600 mb-8">Manage your orders, wishlist, and account settings</p>

        {/* Tab Navigation */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-8">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                      activeTab === tab.id
                        ? 'border-blue-500 text-blue-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>

          <div className="p-6">
            {/* Individual Tab Content */}
            {activeTab === 'orders' && (
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">My Orders</h2>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-200 text-left text-sm text-gray-500">
                        <th className="pb-3">Order ID</th>
                        <th className="pb-3">Products</th>
                        <th className="pb-3">Total</th>
                        <th className="pb-3">Date</th>
                        <th className="pb-3">Status</th>
                        <th className="pb-3">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {orders.map((order) => (
                        <tr key={order.id} className="border-b border-gray-100">
                          <td className="py-4 font-medium text-gray-900">{order.id}</td>
                          <td className="py-4">
                            <div className="max-w-xs">
                              {order.products[0]}
                              {order.products.length > 1 && (
                                <span className="block text-sm text-gray-500">
                                  +{order.products.length - 1} more item{order.products.length > 2 ? 's' : ''}
                                </span>
                              )}
                            </div>
                          </td>
                          <td className="py-4 font-semibold text-gray-900">${order.total}</td>
                          <td className="py-4 text-gray-600">{new Date(order.date).toLocaleDateString()}</td>
                          <td className="py-4">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[order.status as keyof typeof statusColors]}`}>
                              {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                            </span>
                          </td>
                          <td className="py-4">
                            <div className="flex items-center space-x-2">
                              <button title="View Details" className="p-1 rounded hover:bg-gray-100 transition-colors">
                                <Eye className="h-4 w-4 text-gray-600" />
                              </button>
                              {order.trackingNumber && (
                                <button title="Track Package" className="p-1 rounded hover:bg-gray-100 transition-colors">
                                  <Package className="h-4 w-4 text-blue-600" />
                                </button>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeTab === 'wishlist' && (
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">My Wishlist</h2>
                {wishlistItems.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {wishlistItems.map((product) => (
                      <div key={product.id} className="relative group">
                        <ProductCard product={product} />
                        <button
                          onClick={() => removeFromWishlist(product.id)}
                          className="absolute top-3 right-3 p-2 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-colors opacity-0 group-hover:opacity-100"
                          title="Remove from wishlist"
                        >
                          <Trash2 className="h-4 w-4 text-red-500" />
                        </button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Heart className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">Your wishlist is empty</h3>
                    <p className="text-gray-600 mb-6">Save items you love to your wishlist</p>
                    <Link to="/" className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors">
                      Browse Products
                    </Link>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'shops' && (
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Saved Shops</h2>
                {savedShops.length > 0 ? (
                  <div className="space-y-6">
                    {savedShops.map((shop) => (
                      <div key={shop.id} className="bg-gray-50 rounded-xl overflow-hidden">
                        <div className="relative h-32">
                          <img src={shop.banner} alt={shop.name} className="w-full h-full object-cover" />
                          <div className="absolute inset-0 bg-black/20"></div>
                        </div>
                        <div className="p-6">
                          <div className="flex items-start space-x-4">
                            <img src={shop.avatar} alt={shop.name} className="w-16 h-16 rounded-full border-4 border-white -mt-8 relative z-10 object-cover" />
                            <div className="flex-1">
                              <div className="flex items-center justify-between">
                                <div>
                                  <h3 className="text-lg font-semibold text-gray-900">{shop.name}</h3>
                                  <p className="text-gray-600 text-sm">{shop.description}</p>
                                  <div className="flex items-center space-x-4 text-sm text-gray-500 mt-2">
                                    <div className="flex items-center space-x-1">
                                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                      <span>{shop.rating}</span>
                                    </div>
                                    <span>{shop.products} products</span>
                                    <span>{shop.followers.toLocaleString()} followers</span>
                                  </div>
                                </div>
                                <div className="flex items-center space-x-3">
                                  <button onClick={() => unfollowShop(shop.id)} className="text-red-600 hover:text-red-700 p-2 rounded-lg hover:bg-red-50 transition-colors" title="Unfollow shop">
                                    <X className="h-5 w-5" />
                                  </button>
                                  <Link to={`/storefront/${shop.id}`} className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                                    Visit Store
                                  </Link>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Store className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No saved shops</h3>
                    <p className="text-gray-600 mb-6">Follow your favorite sellers to see their latest products</p>
                    <Link to="/" className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors">
                      Discover Shops
                    </Link>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
