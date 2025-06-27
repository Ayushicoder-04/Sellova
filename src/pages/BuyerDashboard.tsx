import React, { useState } from 'react';
import { 
  Package, 
  Heart, 
  Store, 
  User, 
  Star, 
  Calendar,
  ShoppingCart,
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
import { mockProducts } from '../data/mockData';
import { ProductCard } from '../components/UI/ProductCard';

export function BuyerDashboard() {
  const [activeTab, setActiveTab] = useState('orders');
  const [editingProfile, setEditingProfile] = useState(false);
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

  // Mock data
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

  const wishlistItems = mockProducts.slice(0, 6);

  const savedShops = [
    {
      id: '1',
      name: 'Modern Living Co.',
      description: 'Contemporary furniture and home accessories',
      banner: 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=800&h=200&fit=crop',
      avatar: 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
      rating: 4.8,
      products: 45,
      followers: 1200
    },
    {
      id: '2',
      name: 'Artisan Rugs',
      description: 'Handcrafted rugs from around the world',
      banner: 'https://images.pexels.com/photos/1571463/pexels-photo-1571463.jpeg?auto=compress&cs=tinysrgb&w=800&h=200&fit=crop',
      avatar: 'https://images.pexels.com/photos/1571463/pexels-photo-1571463.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
      rating: 4.6,
      products: 28,
      followers: 850
    },
    {
      id: '3',
      name: 'Urban Lighting',
      description: 'Industrial and modern lighting solutions',
      banner: 'https://images.pexels.com/photos/1395967/pexels-photo-1395967.jpeg?auto=compress&cs=tinysrgb&w=800&h=200&fit=crop',
      avatar: 'https://images.pexels.com/photos/1395967/pexels-photo-1395967.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
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
    // Handle profile update logic here
    setEditingProfile(false);
  };

  const handleProfileCancel = () => {
    setEditingProfile(false);
    // Reset form to original values
  };

  const removeFromWishlist = (productId: string) => {
    // Handle wishlist removal
    console.log('Remove from wishlist:', productId);
  };

  const unfollowShop = (shopId: string) => {
    // Handle shop unfollow
    console.log('Unfollow shop:', shopId);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">My Account</h1>
          <p className="text-gray-600">Manage your orders, wishlist, and account settings</p>
        </div>

        {/* Tabs */}
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
            {/* My Orders Tab */}
            {activeTab === 'orders' && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-gray-900">My Orders</h2>
                  <span className="text-sm text-gray-500">{orders.length} orders</span>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="text-left text-sm font-medium text-gray-500 pb-3">Order ID</th>
                        <th className="text-left text-sm font-medium text-gray-500 pb-3">Products</th>
                        <th className="text-left text-sm font-medium text-gray-500 pb-3">Total</th>
                        <th className="text-left text-sm font-medium text-gray-500 pb-3">Date</th>
                        <th className="text-left text-sm font-medium text-gray-500 pb-3">Status</th>
                        <th className="text-left text-sm font-medium text-gray-500 pb-3">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {orders.map((order) => (
                        <tr key={order.id} className="border-b border-gray-100">
                          <td className="py-4">
                            <span className="font-medium text-gray-900">{order.id}</span>
                          </td>
                          <td className="py-4">
                            <div className="max-w-xs">
                              {order.products.length === 1 ? (
                                <span className="text-gray-700">{order.products[0]}</span>
                              ) : (
                                <div>
                                  <span className="text-gray-700">{order.products[0]}</span>
                                  <span className="text-sm text-gray-500 block">
                                    +{order.products.length - 1} more item{order.products.length > 2 ? 's' : ''}
                                  </span>
                                </div>
                              )}
                            </div>
                          </td>
                          <td className="py-4">
                            <span className="font-semibold text-gray-900">${order.total}</span>
                          </td>
                          <td className="py-4">
                            <span className="text-gray-600">
                              {new Date(order.date).toLocaleDateString()}
                            </span>
                          </td>
                          <td className="py-4">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[order.status as keyof typeof statusColors]}`}>
                              {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                            </span>
                          </td>
                          <td className="py-4">
                            <div className="flex items-center space-x-2">
                              <button className="p-1 rounded hover:bg-gray-100 transition-colors" title="View Details">
                                <Eye className="h-4 w-4 text-gray-600" />
                              </button>
                              {order.trackingNumber && (
                                <button className="p-1 rounded hover:bg-gray-100 transition-colors" title="Track Package">
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

            {/* Wishlist Tab */}
            {activeTab === 'wishlist' && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-gray-900">My Wishlist</h2>
                  <span className="text-sm text-gray-500">{wishlistItems.length} items</span>
                </div>

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
                    <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors">
                      Browse Products
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Saved Shops Tab */}
            {activeTab === 'shops' && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-gray-900">Saved Shops</h2>
                  <span className="text-sm text-gray-500">{savedShops.length} shops</span>
                </div>

                {savedShops.length > 0 ? (
                  <div className="space-y-6">
                    {savedShops.map((shop) => (
                      <div key={shop.id} className="bg-gray-50 rounded-xl overflow-hidden">
                        {/* Shop Banner */}
                        <div className="relative h-32">
                          <img
                            src={shop.banner}
                            alt={shop.name}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 bg-black/20"></div>
                        </div>

                        {/* Shop Info */}
                        <div className="p-6">
                          <div className="flex items-start space-x-4">
                            {/* Shop Avatar */}
                            <img
                              src={shop.avatar}
                              alt={shop.name}
                              className="w-16 h-16 rounded-full object-cover border-4 border-white -mt-8 relative z-10"
                            />

                            {/* Shop Details */}
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between">
                                <div>
                                  <h3 className="text-lg font-semibold text-gray-900">{shop.name}</h3>
                                  <p className="text-gray-600 text-sm mb-2">{shop.description}</p>
                                  
                                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                                    <div className="flex items-center space-x-1">
                                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                      <span>{shop.rating}</span>
                                    </div>
                                    <span>{shop.products} products</span>
                                    <span>{shop.followers.toLocaleString()} followers</span>
                                  </div>
                                </div>

                                <div className="flex items-center space-x-3">
                                  <button
                                    onClick={() => unfollowShop(shop.id)}
                                    className="text-red-600 hover:text-red-700 p-2 rounded-lg hover:bg-red-50 transition-colors"
                                    title="Unfollow shop"
                                  >
                                    <X className="h-5 w-5" />
                                  </button>
                                  <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                                    Visit Store
                                  </button>
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
                    <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors">
                      Discover Shops
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Profile Settings Tab */}
            {activeTab === 'profile' && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-gray-900">Profile Settings</h2>
                  {!editingProfile && (
                    <button
                      onClick={() => setEditingProfile(true)}
                      className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 font-medium"
                    >
                      <Edit className="h-4 w-4" />
                      <span>Edit Profile</span>
                    </button>
                  )}
                </div>

                <div className="space-y-8">
                  {/* Personal Information */}
                  <div className="bg-gray-50 rounded-xl p-6">
                    <div className="flex items-center space-x-2 mb-6">
                      <User className="h-5 w-5 text-blue-600" />
                      <h3 className="text-lg font-semibold text-gray-900">Personal Information</h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                        {editingProfile ? (
                          <input
                            type="text"
                            value={profileForm.name}
                            onChange={(e) => setProfileForm({...profileForm, name: e.target.value})}
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                        ) : (
                          <p className="text-gray-900 py-2">{profileForm.name}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                        {editingProfile ? (
                          <div className="relative">
                            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                            <input
                              type="email"
                              value={profileForm.email}
                              onChange={(e) => setProfileForm({...profileForm, email: e.target.value})}
                              className="w-full border border-gray-300 rounded-lg pl-10 pr-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                          </div>
                        ) : (
                          <p className="text-gray-900 py-2">{profileForm.email}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                        {editingProfile ? (
                          <div className="relative">
                            <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                            <input
                              type="tel"
                              value={profileForm.phone}
                              onChange={(e) => setProfileForm({...profileForm, phone: e.target.value})}
                              className="w-full border border-gray-300 rounded-lg pl-10 pr-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                          </div>
                        ) : (
                          <p className="text-gray-900 py-2">{profileForm.phone}</p>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Default Address */}
                  <div className="bg-gray-50 rounded-xl p-6">
                    <div className="flex items-center space-x-2 mb-6">
                      <MapPin className="h-5 w-5 text-blue-600" />
                      <h3 className="text-lg font-semibold text-gray-900">Default Shipping Address</h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Street Address</label>
                        {editingProfile ? (
                          <input
                            type="text"
                            value={profileForm.address}
                            onChange={(e) => setProfileForm({...profileForm, address: e.target.value})}
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                        ) : (
                          <p className="text-gray-900 py-2">{profileForm.address}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
                        {editingProfile ? (
                          <input
                            type="text"
                            value={profileForm.city}
                            onChange={(e) => setProfileForm({...profileForm, city: e.target.value})}
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                        ) : (
                          <p className="text-gray-900 py-2">{profileForm.city}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">State</label>
                        {editingProfile ? (
                          <input
                            type="text"
                            value={profileForm.state}
                            onChange={(e) => setProfileForm({...profileForm, state: e.target.value})}
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                        ) : (
                          <p className="text-gray-900 py-2">{profileForm.state}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">ZIP Code</label>
                        {editingProfile ? (
                          <input
                            type="text"
                            value={profileForm.zipCode}
                            onChange={(e) => setProfileForm({...profileForm, zipCode: e.target.value})}
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                        ) : (
                          <p className="text-gray-900 py-2">{profileForm.zipCode}</p>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Change Password */}
                  {editingProfile && (
                    <div className="bg-gray-50 rounded-xl p-6">
                      <div className="flex items-center space-x-2 mb-6">
                        <Lock className="h-5 w-5 text-blue-600" />
                        <h3 className="text-lg font-semibold text-gray-900">Change Password</h3>
                      </div>

                      <div className="space-y-4 max-w-md">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Current Password</label>
                          <input
                            type="password"
                            value={profileForm.currentPassword}
                            onChange={(e) => setProfileForm({...profileForm, currentPassword: e.target.value})}
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="Enter current password"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">New Password</label>
                          <input
                            type="password"
                            value={profileForm.newPassword}
                            onChange={(e) => setProfileForm({...profileForm, newPassword: e.target.value})}
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="Enter new password"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Confirm New Password</label>
                          <input
                            type="password"
                            value={profileForm.confirmPassword}
                            onChange={(e) => setProfileForm({...profileForm, confirmPassword: e.target.value})}
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="Confirm new password"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Action Buttons */}
                  {editingProfile && (
                    <div className="flex items-center space-x-4">
                      <button
                        onClick={handleProfileSave}
                        className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center space-x-2"
                      >
                        <Save className="h-4 w-4" />
                        <span>Save Changes</span>
                      </button>
                      <button
                        onClick={handleProfileCancel}
                        className="border border-gray-300 text-gray-700 px-6 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors flex items-center space-x-2"
                      >
                        <X className="h-4 w-4" />
                        <span>Cancel</span>
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}