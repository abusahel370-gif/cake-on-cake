"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Search, ShoppingBag, Sparkles, Shield, X, Plus, Minus, Trash2, Calendar, MapPin, User } from "lucide-react";

const SEED_PRODUCTS = [
  { id: "c1", name: "Red Velvet Romance", price: 42.00, img: "https://images.unsplash.com/photo-1586788280802-941ac08994d5?q=80&w=600&auto=format&fit=crop", category: "Signature" },
  { id: "c2", name: "Classic Chocolate Fudge", price: 38.00, img: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?q=80&w=600&auto=format&fit=crop", category: "Signature" },
  { id: "c3", name: "Vanilla Bean Dream", price: 35.00, img: "https://images.unsplash.com/photo-1465014949162-e461f5408bc2?q=80&w=600&auto=format&fit=crop", category: "Pastries" },
  { id: "c4", name: "Strawberry Shortcake", price: 45.00, img: "https://images.unsplash.com/photo-1565958011703-44f9829ba187?q=80&w=600&auto=format&fit=crop", category: "Signature" },
  { id: "c5", name: "Lemon Blueberry Tart", price: 28.00, img: "https://images.unsplash.com/photo-1488477181946-6428a0291777?q=80&w=600&auto=format&fit=crop", category: "Pastries" },
  { id: "c6", name: "Matcha Green Tea Crepe", price: 48.00, img: "https://images.unsplash.com/photo-1536680465769-a36969fdfe70?q=80&w=600&auto=format&fit=crop", category: "Pastries" }
];

export default function StorefrontHome() {
  const [products, setProducts] = useState<typeof SEED_PRODUCTS>([]);
  const [cart, setCart] = useState<{ product: typeof SEED_PRODUCTS[0]; quantity: number }[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const [customerName, setCustomerName] = useState("");
  const [deliveryAddress, setDeliveryAddress] = useState("");
  const [deliveryDate, setDeliveryDate] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("cake_store_products");
    if (saved) {
      setProducts(JSON.parse(saved));
    } else {
      localStorage.setItem("cake_store_products", JSON.stringify(SEED_PRODUCTS));
      setProducts(SEED_PRODUCTS);
    }
  }, []);

  const addToCart = (product: typeof SEED_PRODUCTS[0]) => {
    setCart((prevCart) => {
      const existing = prevCart.find((item) => item.product.id === product.id);
      if (existing) {
        return prevCart.map((item) =>
          item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { product, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const updateQuantity = (id: string, delta: number) => {
    setCart((prevCart) =>
      prevCart
        .map((item) => (item.product.id === id ? { ...item, quantity: item.quantity + delta } : item))
        .filter((item) => item.quantity > 0)
    );
  };

  const removeFromCart = (id: string) => {
    setCart((prevCart) => prevCart.filter((item) => item.product.id !== id));
  };

  const handleCheckoutSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName || !deliveryAddress || !deliveryDate) return;
    setIsSubmitting(true);
    setTimeout(() => {
      alert(`🎉 Order Confirmed!\nThank you ${customerName}. Your order is recorded!`);
      setCart([]);
      setCustomerName("");
      setDeliveryAddress("");
      setDeliveryDate("");
      setIsCartOpen(false);
      setIsSubmitting(false);
    }, 1000);
  };

  const cartTotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const totalItemsCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const filteredProducts = products.filter((cake) => {
    const matchesSearch = cake.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "All" || cake.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#3E2723] antialiased">
      <header className="sticky top-0 z-40 bg-white border-b border-[#EFEBE9] px-6 py-4 flex flex-wrap justify-between items-center gap-4">
        <Link href="/" className="text-2xl font-bold tracking-tight text-[#5D4037] flex items-center gap-2">🍰 Cake-On-Cake Store</Link>
        <div className="flex items-center gap-3">
          <Link href="/custom-order" className="inline-flex items-center gap-1.5 border border-[#8D6E63] text-[#8D6E63] hover:bg-[#FAF7F2] px-4 py-2 rounded-full font-bold text-xs"><Sparkles className="w-3.5 h-3.5" /> Design Custom Cake</Link>
          <Link href="/admin" className="inline-flex items-center gap-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 px-4 py-2 rounded-full font-bold text-xs"><Shield className="w-3.5 h-3.5" /> Admin Desk</Link>
          <button onClick={() => setIsCartOpen(true)} className="bg-[#8D6E63] text-white px-5 py-2 rounded-full font-bold text-xs flex items-center gap-2 relative cursor-pointer">
            <ShoppingBag className="w-3.5 h-3.5" /> View Dessert Box
            {totalItemsCount > 0 && <span className="absolute -top-1.5 -right-1.5 bg-amber-500 text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center border-2 border-white">{totalItemsCount}</span>}
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-12 space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <h1 className="text-4xl sm:text-5xl font-black text-[#4E342E] tracking-tight">Freshly Baked Bliss, Delivered To Your Doorstep</h1>
          <p className="text-sm sm:text-base text-[#795548] font-medium">Browse our artisanal dessert queues and claim your perfect slice below.</p>
        </div>

        <div className="max-w-xl mx-auto space-y-6">
          <div className="relative bg-white shadow-xs rounded-2xl border border-[#EFEBE9] p-1">
            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-[#A1887F]"><Search className="w-5 h-5" /></div>
            <input type="text" placeholder="Search for your favorite cake flavor..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full pl-12 pr-4 py-3 bg-transparent text-sm focus:outline-hidden text-slate-800" />
          </div>

          <div className="flex justify-center gap-3">
            {["All", "Signature", "Pastries"].map((cat) => (
              <button key={cat} onClick={() => setSelectedCategory(cat)} className={`px-5 py-1.5 text-xs font-bold rounded-full border transition-all cursor-pointer ${selectedCategory === cat ? "bg-[#5D4037] text-white border-[#5D4037]" : "bg-white text-[#5D4037] border-[#E7E0D9]"}`}>{cat === "All" ? "All Cakes" : cat}</button>
            ))}
          </div>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 pt-4">
          {filteredProducts.map((cake) => (
            <div key={cake.id} className="group bg-white border border-[#EFEBE9] rounded-2xl p-4 shadow-xs flex flex-col justify-between">
              <div>
                <div className="relative mb-4 overflow-hidden rounded-xl bg-[#FAF7F2] aspect-4/3 w-full">
                  <img src={cake.img || "https://images.unsplash.com/photo-1578985545062-69928b1d9587?q=80&w=600&auto=format&fit=crop"} alt={cake.name} className="w-full h-48 object-cover" />
                  <span className="absolute top-3 right-3 bg-white/95 px-2.5 py-0.5 rounded-md text-[10px] font-bold text-[#5D4037] border border-[#EFEBE9]">{cake.category}</span>
                </div>
                <h3 className="text-lg font-bold text-[#4E342E]">{cake.name}</h3>
                <p className="text-xl font-black text-[#5D4037] mt-1">${cake.price.toFixed(2)}</p>
              </div>
              <button onClick={() => addToCart(cake)} className="w-full bg-[#FAF7F2] hover:bg-[#8D6E63] text-[#5D4037] hover:text-white font-bold py-3 px-4 rounded-xl text-sm transition-colors mt-5 cursor-pointer border border-[#EFEBE9]">Add to Box</button>
            </div>
          ))}
        </div>
      </main>

      {isCartOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-xs" onClick={() => setIsCartOpen(false)} />
          <div className="absolute inset-y-0 right-0 max-w-md w-full bg-white shadow-2xl flex flex-col justify-between border-l border-[#EFEBE9]">
            <div className="p-6 border-b border-[#FAF7F2] flex justify-between items-center bg-[#FAF7F2]/60">
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-[#5D4037]" />
                <h2 className="text-lg font-bold text-[#4E342E]">Your Dessert Box</h2>
              </div>
              <button onClick={() => setIsCartOpen(false)} className="p-1 text-[#A1887F] cursor-pointer"><X className="w-5 h-5" /></button>
            </div>

            <form onSubmit={handleCheckoutSubmit} className="flex-1 overflow-y-auto flex flex-col justify-between">
              <div className="p-6 space-y-6">
                <div className="space-y-3">
                  <h3 className="text-xs font-bold text-[#8D6E63] uppercase tracking-wider">Items Selected</h3>
                  {cart.length === 0 ? (
                    <div className="text-center py-12 text-[#A1887F]"><p className="text-xs font-medium">Your box is empty.</p></div>
                  ) : (
                    cart.map((item) => (
                      <div key={item.product.id} className="flex gap-4 border border-[#FAF7F2] p-3 rounded-xl bg-white shadow-2xs">
                        <img src={item.product.img || "https://images.unsplash.com/photo-1578985545062-69928b1d9587?q=80&w=600&auto=format&fit=crop"} alt={item.product.name} className="w-14 h-14 object-cover rounded-lg" />
                        <div className="flex-1 flex flex-col justify-between">
                          <div>
                            <h4 className="text-xs font-bold text-[#4E342E]">{item.product.name}</h4>
                            <p className="text-xs text-[#8D6E63] font-black">${item.product.price.toFixed(2)}</p>
                          </div>
                          <div className="flex items-center justify-between mt-1">
                            <div className="flex items-center border border-[#E7E0D9] rounded-md bg-white">
                              <button type="button" onClick={() => updateQuantity(item.product.id, -1)} className="p-1 text-[#8D6E63]"><Minus className="w-2.5 h-2.5" /></button>
                              <span className="px-2 text-xs font-bold text-[#4E342E]">{item.quantity}</span>
                              <button type="button" onClick={() => updateQuantity(item.product.id, 1)} className="p-1 text-[#8D6E63]"><Plus className="w-2.5 h-2.5" /></button>
                            </div>
                            <button type="button" onClick={() => removeFromCart(item.product.id)} className="text-red-400 p-1"><Trash2 className="w-3.5 h-3.5" /></button>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>

                {cart.length > 0 && (
                  <div className="space-y-4 border-t border-[#FAF7F2] pt-4 text-slate-800">
                    <h3 className="text-xs font-bold text-[#8D6E63] uppercase tracking-wider">Delivery Details</h3>
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-[#5D4037] flex items-center gap-1.5"><User className="w-3.5 h-3.5" /> Full Name</label>
                      <input type="text" required placeholder="John Doe" value={customerName} onChange={(e) => setCustomerName(e.target.value)} className="w-full text-xs px-3 py-2.5 bg-[#FAF7F2]/50 border border-[#EFEBE9] rounded-xl focus:outline-hidden" />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-[#5D4037] flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5" /> Delivery Address</label>
                      <input type="text" required placeholder="123 Bakery Lane" value={deliveryAddress} onChange={(e) => setDeliveryAddress(e.target.value)} className="w-full text-xs px-3 py-2.5 bg-[#FAF7F2]/50 border border-[#EFEBE9] rounded-xl focus:outline-hidden" />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-[#5D4037] flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" /> Preferred Date</label>
                      <input type="date" required value={deliveryDate} onChange={(e) => setDeliveryDate(e.target.value)} className="w-full text-xs px-3 py-2.5 bg-[#FAF7F2]/50 border border-[#EFEBE9] rounded-xl focus:outline-hidden" />
                    </div>
                  </div>
                )}
              </div>

              {cart.length > 0 && (
                <div className="p-6 border-t border-[#EFEBE9] space-y-4 bg-[#FAF7F2]/40 mt-auto">
                  <div className="flex justify-between items-center text-[#4E342E]">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#8D6E63]">Total Subtotal:</span>
                    <span className="text-2xl font-black">${cartTotal.toFixed(2)}</span>
                  </div>
                  <button type="submit" disabled={isSubmitting} className="w-full bg-[#8D6E63] text-white py-3.5 rounded-xl font-bold text-sm cursor-pointer">{isSubmitting ? "Processing..." : "Confirm Purchase Checkout"}</button>
                </div>
              )}
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
