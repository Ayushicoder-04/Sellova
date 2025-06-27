import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, CreditCard, Lock, Tag, Gift } from 'lucide-react';
import { useApp } from '../contexts/AppContext';

export function PaymentPage() {
  const { state, dispatch } = useApp();
  const navigate = useNavigate();
  
  const [paymentForm, setPaymentForm] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    nameOnCard: '',
    promoCode: '',
  });

  const [promoApplied, setPromoApplied] = useState(false);
  const [promoDiscount, setPromoDiscount] = useState(0);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isProcessing, setIsProcessing] = useState(false);

  // Get shipping info from localStorage
  const shippingInfo = JSON.parse(localStorage.getItem('shippingInfo') || '{}');

  const subtotal = state.cart.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
  const shipping = subtotal > 200 ? 0 : 25;
  const tax = (subtotal - promoDiscount) * 0.08;
  const total = subtotal + shipping + tax - promoDiscount;

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!paymentForm.cardNumber.replace(/\s/g, '')) {
      newErrors.cardNumber = 'Card number is required';
    } else if (paymentForm.cardNumber.replace(/\s/g, '').length < 16) {
      newErrors.cardNumber = 'Card number must be 16 digits';
    }

    if (!paymentForm.expiryDate) {
      newErrors.expiryDate = 'Expiry date is required';
    } else if (!/^\d{2}\/\d{2}$/.test(paymentForm.expiryDate)) {
      newErrors.expiryDate = 'Invalid format (MM/YY)';
    }

    if (!paymentForm.cvv) {
      newErrors.cvv = 'CVV is required';
    } else if (paymentForm.cvv.length < 3) {
      newErrors.cvv = 'CVV must be 3-4 digits';
    }

    if (!paymentForm.nameOnCard.trim()) {
      newErrors.nameOnCard = 'Name on card is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field: string, value: string) => {
    let formattedValue = value;

    // Format card number with spaces
    if (field === 'cardNumber') {
      formattedValue = value.replace(/\s/g, '').replace(/(.{4})/g, '$1 ').trim();
      if (formattedValue.length > 19) formattedValue = formattedValue.slice(0, 19);
    }

    // Format expiry date
    if (field === 'expiryDate') {
      formattedValue = value.replace(/\D/g, '').replace(/(\d{2})(\d)/, '$1/$2');
      if (formattedValue.length > 5) formattedValue = formattedValue.slice(0, 5);
    }

    // Format CVV
    if (field === 'cvv') {
      formattedValue = value.replace(/\D/g, '').slice(0, 4);
    }

    setPaymentForm(prev => ({ ...prev, [field]: formattedValue }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const applyPromoCode = () => {
    const validCodes = {
      'SAVE10': 10,
      'WELCOME20': 20,
      'FIRST15': 15,
    };

    const discount = validCodes[paymentForm.promoCode.toUpperCase() as keyof typeof validCodes];
    if (discount) {
      setPromoDiscount(discount);
      setPromoApplied(true);
    } else {
      setErrors(prev => ({ ...prev, promoCode: 'Invalid promo code' }));
    }
  };

  const removePromoCode = () => {
    setPromoDiscount(0);
    setPromoApplied(false);
    setPaymentForm(prev => ({ ...prev, promoCode: '' }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsProcessing(true);

    // Simulate payment processing
    setTimeout(() => {
      // Generate order ID
      const orderId = 'ORD-' + Date.now().toString().slice(-6);
      
      // Store order info
      const orderInfo = {
        orderId,
        items: state.cart,
        total: total.toFixed(2),
        shippingInfo,
        paymentInfo: {
          last4: paymentForm.cardNumber.slice(-4),
          nameOnCard: paymentForm.nameOnCard,
        },
        promoDiscount,
        orderDate: new Date().toISOString(),
      };
      
      localStorage.setItem('lastOrder', JSON.stringify(orderInfo));
      
      // Clear cart
      dispatch({ type: 'CLEAR_CART' });
      
      // Navigate to confirmation
      navigate('/checkout/confirmation');
    }, 2000);
  };

  if (state.cart.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Your cart is empty</h1>
          <Link
            to="/products"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center space-x-4 mb-8">
          <Link
            to="/checkout/shipping"
            className="p-2 rounded-lg hover:bg-gray-200 transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Payment</h1>
            <p className="text-gray-600">Complete your order securely</p>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-center space-x-4">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-medium">✓</span>
              </div>
              <span className="ml-2 text-sm font-medium text-green-600">Cart</span>
            </div>
            <div className="w-16 h-1 bg-green-500 rounded"></div>
            <div className="flex items-center">
              <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-medium">✓</span>
              </div>
              <span className="ml-2 text-sm font-medium text-green-600">Shipping</span>
            </div>
            <div className="w-16 h-1 bg-blue-600 rounded"></div>
            <div className="flex items-center">
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-medium">3</span>
              </div>
              <span className="ml-2 text-sm font-medium text-blue-600">Payment</span>
            </div>
            <div className="w-16 h-1 bg-gray-300 rounded"></div>
            <div className="flex items-center">
              <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                <span className="text-gray-500 text-sm font-medium">4</span>
              </div>
              <span className="ml-2 text-sm font-medium text-gray-500">Confirmation</span>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Payment Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Payment Method */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center space-x-2 mb-6">
                  <CreditCard className="h-5 w-5 text-blue-600" />
                  <h2 className="text-xl font-semibold text-gray-900">Payment Method</h2>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Card Number *
                    </label>
                    <input
                      type="text"
                      value={paymentForm.cardNumber}
                      onChange={(e) => handleInputChange('cardNumber', e.target.value)}
                      className={`w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                        errors.cardNumber ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="1234 5678 9012 3456"
                    />
                    {errors.cardNumber && <p className="text-red-500 text-sm mt-1">{errors.cardNumber}</p>}
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Expiry Date *
                      </label>
                      <input
                        type="text"
                        value={paymentForm.expiryDate}
                        onChange={(e) => handleInputChange('expiryDate', e.target.value)}
                        className={`w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                          errors.expiryDate ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="MM/YY"
                      />
                      {errors.expiryDate && <p className="text-red-500 text-sm mt-1">{errors.expiryDate}</p>}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        CVV *
                      </label>
                      <input
                        type="text"
                        value={paymentForm.cvv}
                        onChange={(e) => handleInputChange('cvv', e.target.value)}
                        className={`w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                          errors.cvv ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="123"
                      />
                      {errors.cvv && <p className="text-red-500 text-sm mt-1">{errors.cvv}</p>}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Name on Card *
                    </label>
                    <input
                      type="text"
                      value={paymentForm.nameOnCard}
                      onChange={(e) => handleInputChange('nameOnCard', e.target.value)}
                      className={`w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                        errors.nameOnCard ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="John Doe"
                    />
                    {errors.nameOnCard && <p className="text-red-500 text-sm mt-1">{errors.nameOnCard}</p>}
                  </div>
                </div>
              </div>

              {/* Promo Code */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center space-x-2 mb-4">
                  <Tag className="h-5 w-5 text-green-600" />
                  <h2 className="text-xl font-semibold text-gray-900">Promo Code</h2>
                </div>

                {promoApplied ? (
                  <div className="flex items-center justify-between bg-green-50 border border-green-200 rounded-lg p-4">
                    <div className="flex items-center space-x-2">
                      <Gift className="h-5 w-5 text-green-600" />
                      <span className="text-green-800 font-medium">
                        Code applied: ${promoDiscount} off
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={removePromoCode}
                      className="text-green-600 hover:text-green-700 text-sm font-medium"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <div className="flex space-x-3">
                    <input
                      type="text"
                      value={paymentForm.promoCode}
                      onChange={(e) => handleInputChange('promoCode', e.target.value)}
                      className={`flex-1 border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                        errors.promoCode ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="Enter promo code"
                    />
                    <button
                      type="button"
                      onClick={applyPromoCode}
                      className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors font-medium"
                    >
                      Apply
                    </button>
                  </div>
                )}
                {errors.promoCode && <p className="text-red-500 text-sm mt-2">{errors.promoCode}</p>}
                
                <div className="mt-3 text-sm text-gray-600">
                  <p>Try: SAVE10, WELCOME20, or FIRST15</p>
                </div>
              </div>

              {/* Place Order Button */}
              <button
                type="submit"
                disabled={isProcessing}
                className="w-full bg-blue-600 text-white py-4 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
              >
                {isProcessing ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    <span>Processing Payment...</span>
                  </>
                ) : (
                  <>
                    <Lock className="h-5 w-5" />
                    <span>Place Order - ${total.toFixed(2)}</span>
                  </>
                )}
              </button>

              <p className="text-xs text-gray-500 text-center">
                Your payment information is secure and encrypted. We never store your card details.
              </p>
            </form>
          </div>

          {/* Order Summary */}
          <div className="lg:sticky lg:top-8">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Order Summary</h2>

              {/* Items */}
              <div className="space-y-4 mb-6 max-h-64 overflow-y-auto">
                {state.cart.map((item) => (
                  <div key={`${item.product.id}-${item.selectedColor}-${item.selectedSize}`} className="flex space-x-3">
                    <img
                      src={item.product.images[0]}
                      alt={item.product.name}
                      className="w-16 h-16 object-cover rounded-lg flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-gray-900 text-sm line-clamp-1">{item.product.name}</h3>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {item.selectedColor && (
                          <span className="text-xs text-gray-600">{item.selectedColor}</span>
                        )}
                        {item.selectedSize && (
                          <span className="text-xs text-gray-600">• {item.selectedSize}</span>
                        )}
                      </div>
                      <div className="flex justify-between items-center mt-2">
                        <span className="text-xs text-gray-600">Qty: {item.quantity}</span>
                        <span className="font-medium text-gray-900 text-sm">
                          ${(item.product.price * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Shipping Address */}
              {shippingInfo.firstName && (
                <div className="border-t border-gray-200 pt-4 mb-6">
                  <h3 className="font-medium text-gray-900 mb-2">Shipping to:</h3>
                  <div className="text-sm text-gray-600">
                    <p>{shippingInfo.firstName} {shippingInfo.lastName}</p>
                    <p>{shippingInfo.address}</p>
                    {shippingInfo.apartment && <p>{shippingInfo.apartment}</p>}
                    <p>{shippingInfo.city}, {shippingInfo.state} {shippingInfo.zipCode}</p>
                  </div>
                </div>
              )}

              {/* Totals */}
              <div className="border-t border-gray-200 pt-4 space-y-2">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  <span>{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
                </div>
                {promoDiscount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Promo Discount</span>
                    <span>-${promoDiscount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between text-gray-600">
                  <span>Tax</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-xl font-bold text-gray-900 pt-2 border-t border-gray-200">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>
            </div>

            {/* Security Info */}
            <div className="mt-6 bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-2">
                <Lock className="h-5 w-5 text-green-600" />
                <span className="font-medium text-green-900">Secure Payment</span>
              </div>
              <p className="text-sm text-green-700">
                Your payment is protected by 256-bit SSL encryption
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}