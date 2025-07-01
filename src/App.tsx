import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppProvider, useApp } from './contexts/AppContext';
import { Header } from './components/Layout/Header';
import { Footer } from './components/Layout/Footer';
import { HomePage } from './pages/HomePage';
import { ProductsPage } from './pages/ProductsPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { CartPage } from './pages/CartPage';
import { ShippingPage } from './pages/ShippingPage';
import { PaymentPage } from './pages/PaymentPage';
import { OrderConfirmationPage } from './pages/OrderConfirmationPage';
import { CustomizePage } from './pages/CustomizePage';
import { BuyerDashboard } from './pages/BuyerDashboard';
import { SellerDashboard } from './pages/SellerDashboard';
import { BuyerHomePage } from './pages/BuyerHomePage';
import { mockUser, mockSeller, mockProducts } from './data/mockData';

function AppContent() {
  const { dispatch } = useApp();

  useEffect(() => {
    // Set mock user (buyer by default)
    dispatch({ type: 'SET_USER', payload: mockUser });
    
    // Set mock products
    dispatch({ type: 'SET_PRODUCTS', payload: mockProducts });
  }, [dispatch]);

  return (
    <Router>
      <div className="min-h-screen bg-white">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/product/:id" element={<ProductDetailPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/checkout/shipping" element={<ShippingPage />} />
            <Route path="/checkout/payment" element={<PaymentPage />} />
            <Route path="/checkout/confirmation" element={<OrderConfirmationPage />} />
            <Route path="/customize" element={<CustomizePage />} />
            <Route path="/buyer/dashboard" element={<BuyerDashboard />} />
            <Route path="/seller/dashboard" element={<SellerDashboard />} />
            <Route path="/buyer/home" element={<BuyerHomePage />} />

          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}

export default App;
