import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, Palette, Home, TrendingUp } from 'lucide-react';
import { ProductCard } from '../components/UI/ProductCard';
import { mockProducts } from '../data/mockData';

export function HomePage() {
  const trendingProducts = mockProducts.filter(p => p.trending);
  const newProducts = mockProducts.filter(p => p.new);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#fdf8f3] to-[#f6eee7] text-[#3d2f2f]">
      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Sparkles className="h-6 w-6 text-[#c2926b]" />
                <span className="text-[#9f6d42] font-medium">Timeless Home Style</span>
              </div>
              <h1 className="text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight mb-6 text-[#3d2f2f]">
                Craft a Cozy
                <span className="block text-[#a76e46]">Living Experience</span>
              </h1>
              <p className="text-lg text-[#6e5c52] mb-8 max-w-xl">
                Explore curated furnishings and décor that elevate warmth and character—one piece at a time.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/products"
                  className="bg-[#a76e46] text-white px-8 py-4 rounded-lg font-semibold hover:bg-[#8e5a38] transition"
                >
                  Shop Now
                </Link>
                <Link
                  to="/customize"
                  className="border-2 border-[#d3bba3] text-[#3d2f2f] px-8 py-4 rounded-lg font-semibold hover:bg-[#f9f2ec] transition"
                >
                  <Palette className="inline-block w-5 h-5 mr-2" />
                  AI Customize
                </Link>
              </div>
            </div>
            <div className="aspect-square overflow-hidden rounded-3xl shadow-xl">
              <img
                src="https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Living Room Cozy"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-[#3d2f2f] mb-4">Shop by Category</h2>
          <p className="text-[#6e5c52] max-w-2xl mx-auto mb-12">
            Thoughtfully curated pieces for every corner of your home.
          </p>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { name: 'Furniture', image: 'https://images.pexels.com/photos/1866149/pexels-photo-1866149.jpeg?auto=compress&cs=tinysrgb&w=400', count: '1,200+' },
              { name: 'Lighting', image: 'https://images.pexels.com/photos/1395967/pexels-photo-1395967.jpeg?auto=compress&cs=tinysrgb&w=400', count: '800+' },
              { name: 'Decor', image: 'https://images.pexels.com/photos/1571459/pexels-photo-1571459.jpeg?auto=compress&cs=tinysrgb&w=400', count: '2,000+' },
              { name: 'Rugs', image: 'https://images.pexels.com/photos/1571463/pexels-photo-1571463.jpeg?auto=compress&cs=tinysrgb&w=400', count: '600+' },
            ].map((cat) => (
              <Link
                key={cat.name}
                to={`/products?category=${cat.name.toLowerCase()}`}
                className="group relative rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition"
              >
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                />
                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors" />
                <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
                  <h3 className="text-xl font-bold mb-1">{cat.name}</h3>
                  <p className="text-sm">{cat.count} items</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Trending */}
      <section className="py-16 px-4 bg-[#f9f2ec]">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-3xl font-bold text-[#3d2f2f]">Trending Now</h2>
              <p className="text-[#6e5c52]">Popular picks loved by our community</p>
            </div>
            <Link
              to="/products?filter=trending"
              className="text-[#a76e46] font-medium hover:underline flex items-center"
            >
              View All <ArrowRight className="ml-1 w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {trendingProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </section>

      {/* New Arrivals */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-3xl font-bold text-[#3d2f2f]">New Arrivals</h2>
              <p className="text-[#6e5c52]">Fresh pieces to complement your space</p>
            </div>
            <Link
              to="/products?filter=new"
              className="text-[#a76e46] font-medium hover:underline flex items-center"
            >
              View All <ArrowRight className="ml-1 w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {newProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 bg-gradient-to-r from-[#a76e46] to-[#c08c5a] text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-4">Sell Your Creations with Us</h2>
          <p className="text-lg mb-8">
            Join a community of creators bringing warmth and individuality to homes everywhere.
          </p>
          <Link
            to="/seller/signup"
            className="bg-white text-[#a76e46] px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition"
          >
            Start Selling Today
          </Link>
        </div>
      </section>
    </div>
  );
}
