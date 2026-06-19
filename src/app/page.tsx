"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { 
  ShoppingBag, X, Trash2, Info
} from "lucide-react";

interface Product {
  id: string;
  name: string;
  price: number;
  img: string;
  category: string;
  description?: string;
}

interface CartItem {
  id: string;
  name: string;
  price: number;
  img: string;
  quantity: number;
  selectedWeight: string;
  cakeLettering: string;
}

const SEED_PRODUCTS = [
  { id: "c1", name: "Red Velvet Romance", price: 3507, img: "https://images.unsplash.com/photo-1586788280802-941ac08994d5?q=80&w=600&auto=format&fit=crop", category: "Signature", description: "Garnished with premium velvet crumbles and luxurious whipped cream cheese frosting layer blends." },
  { id: "c2", name: "Classic Chocolate Fudge", price: 3173, img: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?q=80&w=600&auto=format&fit=crop", category: "Signature", description: "Rich, dense chocolate layers smothered in silky smooth house-crafted Belgian dark fudge couverture." },
  { id: "c3", name: "Vanilla Bean Dream", price: 2922, img: "https://images.unsplash.com/photo-1465014949162-e461f5408bc2?q=80&w=600&auto=format&fit=crop", category: "Pastries", description: "Infused with genuine Madagascar vanilla pod extracts and light airy buttercream sponges." },
  { id: "c4", name: "Strawberry Shortcake", price: 3757, img: "https://images.unsplash.com/photo-1565958011703-44f9829ba187?q=80&w=600&auto=format&fit=crop", category: "Signature", description: "Garnished with hand-picked farm strawberries and sweet cream glaze layers. Perfectly balanced." },
  { id: "c5", name: "Lemon Blueberry Tart", price: 2338, img: "https://images.unsplash.com/photo-1488477181946-6428a0291777?q=80&w=600&auto=format&fit=crop", category: "Pastries", description: "Zesty classic lemon curd nested gracefully into a crisp buttery shell crust alongside glazed wild blueberries." },
  { id: "c6", name: "Matcha Green Tea Crepe", price: 4008, img: "https://images.unsplash.com/photo-1536680465769-a36969fdfe70?q=80&w=600&auto=format&fit=crop", category: "Pastries", description: "Delicate multi-layered crepes micro-dusted with ceremonial Japanese matcha extract between white chocolate cream." }
];

export default function CakeOnCakeStorefront() {
  const [products, setProducts] = useState<Product[]>([]);
  const [activeCategory, setActiveCategory] = useState("All");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [activeWeight, setActiveWeight] = useState("0.5 Kg");
  const [cakeLettering, setCakeLettering] = useState("");
  
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [deliveryAddress, setDeliveryAddress] = useState("");

  useEffect(() => {
    const savedProducts = localStorage.getItem("cake_store_products");
    if (savedProducts) {
      setProducts(JSON.parse(savedProducts));
    } else {
      setProducts(SEED_PRODUCTS);
    }
  }, []);

  const getPriceForWeight = (basePrice: number, weight: string) => {
    if (weight === "1 Kg") return basePrice * 1.8;
    if (weight === "1.5 Kg") return basePrice * 2.6;
    if (weight === "2 Kg") return basePrice * 3.4;
    if (weight === "4 Kg") return basePrice * 6.5;
    return basePrice;
  };

  const filteredProducts = activeCategory === "All" 
    ? products 
    : products.filter(p => p.category.toLowerCase() === activeCategory.toLowerCase());

  const handleBuyNowSubmit = () => {
    if (!selectedProduct) return;

    const precisePrice = Math.round(getPriceForWeight(selectedProduct.price, activeWeight));
    
    const itemToAdd: CartItem = {
      id: `${selectedProduct.id}-${activeWeight}-${Date.now()}`,
      name: selectedProduct.name,
      price: precisePrice,
      img: selectedProduct.img,
      quantity: 1,
      selectedWeight: activeWeight,
      cakeLettering: cakeLettering.trim() || "None Specified"
    };

    setCart(prev => [...prev, itemToAdd]);
    setSelectedProduct(null);
    setCakeLettering("");
    setActiveWeight("0.5 Kg");
    setIsCartOpen(true);
  };

  const removeFromCart = (id: string) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
  const totalAmount = cart.reduce((total, item) => total + (item.price * item.quantity), 0);

  const handleCheckoutSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (cart.length === 0) return;

    alert(
      `🎂 Order Dispatched Successfully!\n\n` +
      `👤 Customer: ${customerName}\n` +
      `📞 Contact Phone: ${customerPhone}\n` +
      `📍 Destination Address: ${deliveryAddress}\n` +
      `💰 Total Final Bill: ₹${totalAmount.toLocaleString("en-IN")}\n\n` +
      `Thank you for ordering with Cake-On-Cake!`
    );

    setCart([]);
    setCustomerName("");
    setCustomerPhone("");
    setDeliveryAddress("");
    setIsCartOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#3E2723] font-sans antialiased">
      
      <header className="sticky top-0 z-40 bg-white border-b border-[#EFEBE9] px-4 sm:px-8 py-3.5 flex items-center justify-between shadow-xs">
        <Link href="/" className="flex items-center gap-2 group">
          <span className="text-2xl">🍰</span>
          <span className="font-black text-xl tracking-tight text-[#E63946] group-hover:opacity-80 transition-opacity">
            bakingo <span className="text-[#6D4C41] font-light text-xs tracking-normal">clone</span>
          </span>
        </Link>
        <button onClick={() => setIsCartOpen(true)} className="inline-flex items-center gap-2 px-5 py-2 bg-[#E63946] hover:bg-red-600 text-white rounded-full text-xs font-bold transition-all relative cursor-pointer">
          <ShoppingBag className="w-3.5 h-3.5" /> Cart Summary
          {cartCount > 0 && (
            <span className="absolute -top-1.5 -right-1.5 bg-black text-white text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center border-2 border-white">
              {cartCount}
            </span>
          )}
        </button>
      </header>

      {selectedProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-0 sm:p-4 animate-fadeIn">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-xs" onClick={() => setSelectedProduct(null)} />
          
          <div className="relative w-full max-w-4xl bg-white h-full sm:h-auto sm:rounded-3xl shadow-2xl flex flex-col md:flex-row overflow-hidden z-10 max-h-[100vh] sm:max-h-[90vh]">
            <button onClick={() => setSelectedProduct(null)} className="absolute top-4 right-4 z-20 p-2 bg-black/10 hover:bg-black/20 text-slate-700 rounded-full transition-colors">
              <X className="w-5 h-5" />
            </button>

            <div className="w-full md:w-1/2 bg-[#F9F9F9] flex items-center justify-center p-6 border-b md:border-b-0 md:border-r border-[#EFEBE9]">
              <img 
                src={selectedProduct.img} 
                alt={selectedProduct.name} 
                className="max-h-64 md:max-h-96 w-full object-cover rounded-2xl shadow-sm"
              />
            </div>

            <div className="w-full md:w-1/2 p-6 flex flex-col justify-between overflow-y-auto">
              <div className="space-y-4">
                <div>
                  <span className="text-[11px] bg-emerald-50 text-emerald-700 font-extrabold px-2 py-0.5 rounded border border-emerald-200 uppercase tracking-wider">100% Eggless</span>
                  <h2 className="text-xl sm:text-2xl font-black text-slate-900 mt-2 tracking-tight">{selectedProduct.name}</h2>
                  
                  <div className="flex items-baseline gap-2 mt-1.5">
                    <span className="text-2xl font-black text-slate-900">
                      ₹{Math.round(getPriceForWeight(selectedProduct.price, activeWeight)).toLocaleString("en-IN")}
                    </span>
                    <span className="text-[11px] text-amber-700 bg-amber-50 px-1.5 py-0.5 rounded font-medium border border-amber-100">
                      Inclusive of GST
                    </span>
                  </div>
                </div>

                <p className="text-xs text-slate-500 leading-relaxed">
                  {selectedProduct.description || "Freshly baked customized tier premium celebration delicacy composition."}
                </p>

                <hr className="border-[#EFEBE9]" />

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-black text-slate-800 uppercase tracking-wider">Select Weight</label>
                    <span className="text-[11px] text-[#E63946] font-bold flex items-center gap-1"><Info className="w-3 h-3" /> Serving Info</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {["0.5 Kg", "1 Kg", "1.5 Kg", "2 Kg", "4 Kg"].map((weight) => (
                      <button
                        key={weight}
                        type="button"
                        onClick={() => setActiveWeight(weight)}
                        className={`px-4 py-2 text-xs font-bold rounded-lg border transition-all ${
                          activeWeight === weight 
                            ? "border-[#E63946] bg-red-50 text-[#E63946] shadow-2xs" 
                            : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
                        }`}
                      >
                        {weight}
                      </button>
                    ))}
                  </div>
                  <span className="text-[10px] text-slate-400 block font-medium">
                    {activeWeight === "0.5 Kg" && "Ideal for 4 - 5 People"}
                    {activeWeight === "1 Kg" && "Ideal for 8 - 10 People"}
                    {activeWeight === "1.5 Kg" && "Ideal for 12 - 14 People"}
                    {activeWeight === "2 Kg" && "Ideal for 18 - 20 People"}
                    {activeWeight === "4 Kg" && "Ideal for Large Parties"}
                  </span>
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between items-center">
                    <label className="text-xs font-black text-slate-800 uppercase tracking-wider">Cake Message</label>
                    <span className="text-[10px] text-slate-400">{cakeLettering.length}/25</span>
                  </div>
                  <input 
                    type="text" 
                    placeholder="Write A Sweet Wish!" 
                    maxLength={25}
                    value={cakeLettering}
                    onChange={(e) => setCakeLettering(e.target.value)}
                    className="w-full text-xs px-3 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:border-red-400 text-slate-800 bg-[#FAFBFD]"
                  />
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-[#EFEBE9]">
                <button 
                  onClick={handleBuyNowSubmit}
                  className="w-full bg-[#E63946] hover:bg-red-600 text-white font-black py-3 px-6 rounded-xl text-xs sm:text-sm tracking-wider shadow-md transition-all flex items-center justify-center gap-1 cursor-pointer uppercase"
                >
                  Buy Now | ₹{Math.round(getPriceForWeight(selectedProduct.price, activeWeight)).toLocaleString("en-IN")}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {isCartOpen && (
        <div className="fixed inset-0 z-50 flex justify-end animate-fadeIn">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-xs" onClick={() => setIsCartOpen(false)} />
          <div className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col justify-between overflow-y-auto z-10 border-l border-[#EFEBE9]">
            <div className="p-4 border-b border-[#EFEBE9] flex items-center justify-between bg-[#FAF8F5]">
              <div className="flex items-center gap-2 text-slate-900">
                <ShoppingBag className="w-4 h-4 text-[#E63946]" />
                <h3 className="font-black text-sm tracking-tight">Your Confirmed Items</h3>
              </div>
              <button onClick={() => setIsCartOpen(false)} className="p-1 rounded-lg hover:bg-slate-100 text-slate-500"><X className="w-4 h-4" /></button>
            </div>

            <div className="p-4 flex-1 space-y-5">
              {cart.length === 0 ? (
                <div className="text-center py-16 space-y-2">
                  <span className="text-3xl block">🧺</span>
                  <p className="text-xs font-bold text-slate-400">Your Basket is completely empty.</p>
                </div>
              ) : (
                <>
                  <div className="space-y-2">
                    <div className="max-h-60 overflow-y-auto border border-slate-100 rounded-xl p-2 bg-[#FAF8F5]/50 divide-y divide-slate-100">
                      {cart.map((item) => (
                        <div key={item.id} className="flex items-center justify-between py-3 first:pt-0">
                          <div className="flex items-center gap-3">
                            <img src={item.img} alt={item.name} className="w-10 h-10 rounded-lg object-cover border" />
                            <div>
                              <h5 className="font-bold text-xs text-slate-900 line-clamp-1">{item.name}</h5>
                              <p className="text-[10px] text-slate-400 font-medium">Weight: {item.selectedWeight} | Tag: &ldquo;{item.cakeLettering}&rdquo;</p>
                              <span className="text-[11px] text-slate-800 font-mono font-bold">₹{item.price.toLocaleString("en-IN")}</span>
                            </div>
                          </div>
                          <button onClick={() => removeFromCart(item.id)} className="p-1 text-slate-400 hover:text-red-500 transition-colors"><Trash2 className="w-4 h-4" /></button>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-slate-900 text-white p-4 rounded-xl flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-300">Total Cart Valuation</span>
                    <span className="text-lg font-black">₹{totalAmount.toLocaleString("en-IN")}</span>
                  </div>

                  <form id="checkout-panel-form" onSubmit={handleCheckoutSubmit} className="space-y-3 pt-2">
                    <span className="text-[10px] uppercase font-black text-slate-400 tracking-wider block border-b pb-1">Delivery Information</span>
                    <div className="space-y-1">
                      <label className="text-[11px] font-bold text-slate-700">Full Name *</label>
                      <input type="text" required placeholder="e.g. Amit Patel" value={customerName} onChange={(e) => setCustomerName(e.target.value)} className="w-full text-xs px-3 py-2 border rounded-xl bg-[#FAF8F5] text-slate-800 focus:outline-none" />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[11px] font-bold text-slate-700">Mobile Line *</label>
                      <input type="tel" required placeholder="e.g. +91 99887 76655" value={customerPhone} onChange={(e) => setCustomerPhone(e.target.value)} className="w-full text-xs px-3 py-2 border rounded-xl bg-[#FAF8F5] text-slate-800 focus:outline-none" />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[11px] font-bold text-slate-700">Drop-off Street Address *</label>
                      <textarea required rows={2} placeholder="House Number, Building Name, Location..." value={deliveryAddress} onChange={(e) => setDeliveryAddress(e.target.value)} className="w-full text-xs px-3 py-2 border rounded-xl bg-[#FAF8F5] resize-none text-slate-800 focus:outline-none" />
                    </div>
                  </form>
                </>
              )}
            </div>

            <div className="p-4 border-t border-slate-100 bg-[#FAF8F5]">
              {cart.length > 0 ? (
                <button type="submit" form="checkout-panel-form" className="w-full bg-[#E63946] hover:bg-red-600 text-white font-bold py-3.5 px-4 rounded-xl text-xs tracking-wider transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer uppercase">Place Order Summary</button>
              ) : (
                <button disabled className="w-full bg-slate-200 text-slate-400 font-bold py-3.5 px-4 rounded-xl text-xs tracking-wider cursor-not-allowed">Cart Is Currently Empty</button>
              )}
            </div>
          </div>
        </div>
      )}

      <main className="max-w-7xl mx-auto px-4 sm:px-8 py-12">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#EFEBE9] pb-6 mb-8">
          <div>
            <h3 className="text-xl font-black text-slate-900 tracking-tight">Trending Celebrations Assortment</h3>
            <p className="text-xs text-slate-400 mt-0.5">Click any asset package to specify custom weight limits and check pricing tags.</p>
          </div>
          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            {["All", "Signature", "Pastries"].map((cat) => (
              <button key={cat} onClick={() => setActiveCategory(cat)} className={`px-4 py-1.5 rounded-full text-xs font-bold cursor-pointer transition-all shrink-0 ${activeCategory === cat ? "bg-[#E63946] text-white" : "bg-white text-slate-600 border border-slate-200"}`}>{cat}</button>
            ))}
          </div>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredProducts.map((cake) => (
            <div key={cake.id} className="group bg-white border border-slate-200/80 rounded-2xl p-4 hover:shadow-lg transition-all flex flex-col justify-between">
              <div>
                <div className="relative mb-3 overflow-hidden rounded-xl bg-slate-50 aspect-video w-full flex items-center justify-center">
                  <img src={cake.img} alt={cake.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  <span className="absolute top-2.5 right-2.5 bg-white px-2 py-0.5 rounded text-[10px] font-bold text-slate-700 border shadow-2xs">{cake.category}</span>
                </div>
                <h4 className="font-black text-slate-800 text-sm tracking-tight">{cake.name}</h4>
                <div className="text-base font-black text-slate-900 mt-0.5">From ₹{cake.price.toLocaleString("en-IN")}</div>
              </div>
              
              <button 
                onClick={() => {
                  setSelectedProduct(cake);
                  setActiveWeight("0.5 Kg");
                }} 
                className="mt-4 w-full bg-[#E63946] hover:bg-red-600 text-white font-bold py-2.5 px-4 rounded-xl text-xs transition-all cursor-pointer text-center uppercase tracking-wider"
              >
                Configure & Order
              </button>
            </div>
          ))}
        </div>
      </main>

    </div>
  );
}
