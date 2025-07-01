import React from 'react';
import { Link } from 'react-router-dom';
import { mockProducts } from '../data/mockData';
import { ProductCard } from '../components/UI/ProductCard';

export function BuyerHomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#fef8f4] via-[#fefdfb] to-[#faf7f2] pb-16">
      {/* Hero Banner */}
      <div className="bg-gradient-to-br from-rose-100 via-amber-50 to-orange-100 py-16 px-6 sm:px-12 text-center rounded-b-3xl shadow-inner">
        <h1 className="text-5xl font-bold text-gray-900 mb-4 leading-tight">
          Discover Unique Pieces for a Cozier Home
        </h1>
        <p className="text-lg text-gray-700 mb-6 max-w-2xl mx-auto">
          Browse curated home décor by independent creators. Customize, preview in 3D, and bring warmth into your space.
        </p>
        <Link to="/products">
          <button className="bg-rose-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-rose-700 transition shadow-md">
            Shop All Products
          </button>
        </Link>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 space-y-16">
        {/* Trending Products */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Trending Now</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
            {mockProducts.slice(0, 6).map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>

        {/* Popular Collections */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Popular Collections</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: 'Boho Living', image: 'https://images.unsplash.com/photo-1615874959474-d609969a09f3' },
              { title: 'Minimalist Decor', image: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d' },
              { title: 'Rustic Charm', image: 'https://images.unsplash.com/photo-1560184897-2c8000c5d8e2' },
            ].map((collection, idx) => (
              <Link
                key={idx}
                to="/products"
                className="rounded-3xl overflow-hidden group relative shadow-md"
              >
                <img
                  src={`${collection.image}?auto=compress&cs=tinysrgb&dpr=2&w=600`}
                  alt={collection.title}
                  className="w-full h-64 object-cover transform transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                  <h3 className="text-white text-lg font-semibold">{collection.title}</h3>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="text-center mt-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Want Something Personalized?</h2>
          <p className="text-gray-700 mb-4">
            Customize your favorite products with AI. Preview before you purchase.
          </p>
          <Link to="/products">
            <button className="bg-gradient-to-r from-rose-600 to-pink-500 text-white px-6 py-3 rounded-xl font-semibold hover:from-rose-700 hover:to-pink-600 transition shadow-md">
              Start Customizing
            </button>
          </Link>
        </section>
      </div>
    </div>
  );
}

