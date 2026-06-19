'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Search } from 'lucide-react';
import { useCart } from '@/lib/cart-context';
import type { Cake } from '@/lib/types';

const CAKE_PRODUCTS: Cake[] = [
  { id: 'c1', name: 'Red Velvet Romance', price: 42.00, category: 'Signature', description: '', image_url: 'https://images.unsplash.com/photo-1586788280802-941ac08994d5?auto=format&fit=crop&w=600&q=80', images: [], rating: 0, review_count: 0, weight_options: [], flavour_options: [], ingredients: [], stock: 0, created_at: '' },
  { id: 'c2', name: 'Classic Chocolate Fudge', price: 38.00, category: 'Signature', description: '', image_url: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=600&q=80', images: [], rating: 0, review_count: 0, weight_options: [], flavour_options: [], ingredients: [], stock: 0, created_at: '' },
  { id: 'c3', name: 'Vanilla Bean Dream', price: 35.00, category: 'Pastries', description: '', image_url: 'https://images.unsplash.com/photo-1465014949162-e461f5408bc2?auto=format&fit=crop&w=600&q=80', images: [], rating: 0, review_count: 0, weight_options: [], flavour_options: [], ingredients: [], stock: 0, created_at: '' },
  { id: 'c4', name: 'Strawberry Shortcake', price: 45.00, category: 'Signature', description: '', image_url: 'https://images.unsplash.com/photo-1565958011703-44f9829ba187?auto=format&fit=crop&w=600&q=80', images: [], rating: 0, review_count: 0, weight_options: [], flavour_options: [], ingredients: [], stock: 0, created_at: '' },
  { id: 'c5', name: 'Lemon Blueberry Tart', price: 28.00, category: 'Pastries', description: '', image_url: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=600&q=80', images: [], rating: 0, review_count: 0, weight_options: [], flavour_options: [], ingredients: [], stock: 0, created_at: '' },
  { id: 'c6', name: 'Matcha Green Tea Crepe', price: 48.00, category: 'Pastries', description: '', image_url: 'https://images.unsplash.com/photo-1536680465769-a36969fdfe70?auto=format&fit=crop&w=600&q=80', images: [], rating: 0, review_count: 0, weight_options: [], flavour_options: [], ingredients: [], stock: 0, created_at: '' }
];

const CATEGORIES = ['All Cakes', 'Signature', 'Pastries'];

export default function StorefrontPage() {
  const { addToCart, setIsOpen: setIsCartOpen } = useCart();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Cakes');

  const filteredProducts = CAKE_PRODUCTS.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All Cakes' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#3E2723]">
      <header className="sticky top-0 z-10 bg-white border-b border-[#EFEBE9] px-6 py-4 flex flex-wrap justify-between items-center gap-4 shadow-sm">
        <Link href="/" className="text-2xl font-bold tracking-tight text-[#5D4037] hover:opacity-90 transition-opacity">
          🍰 Cake-On-Cake Store
        </Link>
        <div className="flex items-center gap-3">
          <Link
            href="/custom-order"
            className="border border-[#8D6E63] text-[#8D6E63] hover:bg-[#FAF7F2] px-4 py-2 rounded-full font-medium text-sm transition-colors"
          >
            ✨ Design Custom Cake
          </Link>
          <Link
            href="/admin"
            className="bg-slate-100 hover:bg-slate-200 text-slate-700 px-4 py-2 rounded-full font-medium text-sm transition-colors"
          >
            🛡️ Admin Desk
          </Link>
          <button
            onClick={() => setIsCartOpen(true)}
            className="bg-[#D7CCC8] hover:bg-[#BCAAA4] text-[#3E2723] px-5 py-2 rounded-full font-medium text-sm transition-colors"
          >
            View Dessert Box
          </button>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-extrabold mb-3 text-[#4E342E]">
            Freshly Baked Bliss, Delivered To Your Doorstep
          </h2>
          <p className="text-lg text-[#795548]">
            Browse our artisanal dessert queues and claim your perfect slice below.
          </p>
        </div>

        <div className="max-w-2xl mx-auto mb-10 space-y-5">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#A1887F] w-5 h-5" />
            <input
              type="text"
              placeholder="Search for your favorite cake flavor..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-xl border border-[#D7CCC8] bg-white text-[#3E2723] placeholder-[#A1887F] focus:outline-none focus:ring-2 focus:ring-[#8D6E63] shadow-sm transition-all"
            />
          </div>

          <div className="flex justify-center gap-3 flex-wrap">
            {CATEGORIES.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-5 py-2 rounded-full text-sm font-semibold tracking-wide border transition-all ${
                  selectedCategory === category
                    ? 'bg-[#5D4037] text-white border-[#5D4037] shadow-md scale-105'
                    : 'bg-white text-[#5D4037] border-[#D7CCC8] hover:bg-[#F5F5F5]'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((cake) => (
              <div
                key={cake.id}
                className="bg-white rounded-2xl p-6 border border-[#EFEBE9] shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow relative overflow-hidden group"
              >
                <span className="absolute top-3 right-3 text-xs bg-[#F5F5F5] text-[#795548] px-2.5 py-1 rounded-md font-medium">
                  {cake.category}
                </span>

                <div>
                  <div className="mb-4 overflow-hidden rounded-xl bg-[#FAF7F2]">
                    <img 
                      src={cake.image_url} 
                      alt={cake.name} 
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <h3 className="text-xl font-bold mb-1 text-[#4E342E]">{cake.name}</h3>
                  <p className="text-2xl font-black text-[#8D6E63] mb-6">
                    ${cake.price.toFixed(2)}
                  </p>
                </div>

                <button
                  onClick={() => addToCart(cake)}
                  className="w-full bg-[#8D6E63] hover:bg-[#795548] text-white py-3 rounded-xl font-bold transition-colors shadow-sm"
                >
                  Add to Box
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-2xl border border-dashed border-[#D7CCC8] max-w-md mx-auto">
            <span className="text-4xl block mb-3">🔍</span>
            <h4 className="text-lg font-bold text-[#4E342E] mb-1">No sweet treats found</h4>
            <p className="text-sm text-[#A1887F]">
              Try adjusting your spelling or choosing a different tag filter.
            </p>
          </div>
        )}
      </main>
    </div>
  );
}
