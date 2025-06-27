import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, Package, Truck, Calendar, ArrowRight, Download, MessageCircle } from 'lucide-react';

interface OrderInfo {
  orderId: string;
  items: any[];
  total: string;
  shippingInfo: any;
  paymentInfo: any;
  promoDiscount: number;
  orderDate: string;
}

export function OrderConfirmationPage() {
  const [orderInfo, setOrderInfo] = useState<OrderInfo | null>(null);

  useEffect(() => {
    const savedOrder = localStorage.getItem('lastOrder');
    if (savedOrder) {
      setOrderInfo(JSON.parse(savedOrder));
    }
  }, []);

  if (!orderInfo) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Order not found</h1>
          <Link
            to="/"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Return Home
          </Link>
        </div>
      </div>
    );
  }

  const estimatedDelivery = new Date();
  estimatedDelivery.setDate(estimatedDelivery.getDate() + 7);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Success Header */}
        <div className="text-center mb-12">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="h-12 w-12 text-green-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Order Confirmed!</h1>
          <p className="text-xl text-gray-600 mb-2">
            Thank you for your purchase. Your order has been successfully placed.
          </p>
          <p className="text-lg text-gray-500">
            Order #{orderInfo.orderId}
          </p>
        </div>

        {/* Order Details */}
        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          {/* Order Summary */}
          <div className="lg:col-span-2 space-y-6">
            {/* Items */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Order Items</h2>
              <div className="space-y-4">
                {orderInfo.items.map((item, index) => (
                  <div key={index} className="flex space-x-4 pb-4 border-b border-gray-100 last:border-b-0 last:pb-0">
                    <img
                      src={item.product.images[0]}
                      alt={item.product.name}
                      className="w-20 h-20 object-cover rounded-lg flex-shrink-0"
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 mb-1">{item.product.name}</h3>
                      <p className="text-sm text-gray-600 mb-2">{item.product.sellerName}</p>
                      <div className="flex flex-wrap gap-2 mb-2">
                        {item.selectedColor && (
                          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                            {item.selectedColor}
                          </span>
                        )}
                        {item.selectedSize && (
                          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                            {item.selectedSize}
                          </span>
                        )}
                        {item.customization && (
                          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                            Custom
                          </span>
                        )}
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Qty: {item.quantity}</span>
                        <span className="font-semibold text-gray-900">
                          ${(item.product.price * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Shipping Address */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Shipping Address</h2>
              <div className="text-gray-700">
                <p className="font-medium">{orderInfo.shippingInfo.firstName} {orderInfo.shippingInfo.lastName}</p>
                <p>{orderInfo.shippingInfo.address}</p>
                {orderInfo.shippingInfo.apartment && <p>{orderInfo.shippingInfo.apartment}</p>}
                <p>{orderInfo.shippingInfo.city}, {orderInfo.shippingInfo.state} {orderInfo.shippingInfo.zipCode}</p>
                <p>{orderInfo.shippingInfo.country}</p>
                <div className="mt-3 pt-3 border-t border-gray-200">
                  <p className="text-sm text-gray-600">Email: {orderInfo.shippingInfo.email}</p>
                  <p className="text-sm text-gray-600">Phone: {orderInfo.shippingInfo.phone}</p>
                </div>
              </div>
            </div>

            {/* Payment Method */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Payment Method</h2>
              <div className="flex items-center space-x-3">
                <div className="w-12 h-8 bg-blue-600 rounded flex items-center justify-center">
                  <span className="text-white text-xs font-bold">CARD</span>
                </div>
                <div>
                  <p className="font-medium text-gray-900">•••• •••• •••• {orderInfo.paymentInfo.last4}</p>
                  <p className="text-sm text-gray-600">{orderInfo.paymentInfo.nameOnCard}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Order Summary & Actions */}
          <div className="space-y-6">
            {/* Order Total */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Order Total</h2>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="text-gray-900">${(parseFloat(orderInfo.total) + orderInfo.promoDiscount - 25 - (parseFloat(orderInfo.total) * 0.08)).toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span className="text-gray-900">$25.00</span>
                </div>
                {orderInfo.promoDiscount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Promo Discount</span>
                    <span>-${orderInfo.promoDiscount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-gray-600">Tax</span>
                  <span className="text-gray-900">${(parseFloat(orderInfo.total) * 0.08).toFixed(2)}</span>
                </div>
                <div className="border-t border-gray-200 pt-2 mt-2">
                  <div className="flex justify-between font-semibold text-lg">
                    <span>Total</span>
                    <span>${orderInfo.total}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Delivery Info */}
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
              <div className="flex items-center space-x-2 mb-3">
                <Truck className="h-5 w-5 text-blue-600" />
                <h3 className="font-semibold text-blue-900">Estimated Delivery</h3>
              </div>
              <p className="text-blue-800 font-medium mb-2">
                {estimatedDelivery.toLocaleDateString('en-US', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </p>
              <p className="text-sm text-blue-700">
                Standard shipping (5-7 business days)
              </p>
            </div>

            {/* Quick Actions */}
            <div className="space-y-3">
              <button className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2">
                <Package className="h-5 w-5" />
                <span>Track Your Order</span>
              </button>
              
              <button className="w-full border border-gray-300 text-gray-700 py-3 px-4 rounded-lg font-medium hover:bg-gray-50 transition-colors flex items-center justify-center space-x-2">
                <Download className="h-5 w-5" />
                <span>Download Receipt</span>
              </button>

              <button className="w-full border border-gray-300 text-gray-700 py-3 px-4 rounded-lg font-medium hover:bg-gray-50 transition-colors flex items-center justify-center space-x-2">
                <MessageCircle className="h-5 w-5" />
                <span>Contact Seller</span>
              </button>
            </div>
          </div>
        </div>

        {/* Next Steps */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">What happens next?</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Package className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Order Processing</h3>
              <p className="text-sm text-gray-600">
                We'll prepare your items and notify you when they're ready to ship.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Truck className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Shipping Updates</h3>
              <p className="text-sm text-gray-600">
                You'll receive tracking information via email once your order ships.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Calendar className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Delivery</h3>
              <p className="text-sm text-gray-600">
                Your order will arrive within 5-7 business days.
              </p>
            </div>
          </div>
        </div>

        {/* Continue Shopping */}
        <div className="text-center">
          <Link
            to="/products"
            className="inline-flex items-center space-x-2 bg-gray-100 text-gray-700 px-8 py-3 rounded-lg font-semibold hover:bg-gray-200 transition-colors"
          >
            <span>Continue Shopping</span>
            <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </div>
    </div>
  );
}