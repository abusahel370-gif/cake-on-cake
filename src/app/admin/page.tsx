"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, Lock, ShieldCheck, Eye, EyeOff, Trash2, Plus } from "lucide-react";

interface Product {
  id: string;
  name: string;
  price: number;
  img: string;
  category: string;
}

export default function AdminDesk() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [authError, setAuthError] = useState("");

  const [products, setProducts] = useState<Product[]>([]);
  const [newName, setNewName] = useState("");
  const [newPrice, setNewPrice] = useState("");
  const [newImg, setNewImg] = useState("");
  const [newCategory, setNewCategory] = useState("Signature");

  useEffect(() => {
    const savedProducts = localStorage.getItem("cake_store_products");
    if (savedProducts) {
      setProducts(JSON.parse(savedProducts));
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    const ADMIN_EMAIL = "admin@cakeoncake.com";
    const ADMIN_PASSWORD = "Password@123";

    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      setAuthError("");
    } else {
      setAuthError("Invalid admin email or password verification credentials.");
    }
  };

  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim() || !newPrice || !newImg.trim()) return;

    const newProduct: Product = {
      id: "c_" + Date.now(),
      name: newName.trim(),
      price: parseFloat(newPrice),
      img: newImg.trim(),
      category: newCategory
    };

    const updated = [...products, newProduct];
    setProducts(updated);
    localStorage.setItem("cake_store_products", JSON.stringify(updated));

    setNewName("");
    setNewPrice("");
    setNewImg("");
  };

  const handleDeleteProduct = (id: string) => {
    const updated = products.filter(p => p.id !== id);
    setProducts(updated);
    localStorage.setItem("cake_store_products", JSON.stringify(updated));
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#FAF8F5] flex flex-col items-center justify-center p-4 text-[#3E2723] font-sans">
        <Link href="/" className="inline-flex items-center gap-1.5 text-xs font-bold text-[#8D6E63] hover:text-[#4E342E] transition-colors mb-6">
          <ArrowLeft className="w-3.5 h-3.5" /> Back to Storefront
        </Link>

        <div className="w-full max-w-md bg-white border border-[#EFEBE9] rounded-3xl p-6 sm:p-8 shadow-xl">
          <div className="text-center space-y-2 mb-6">
            <div className="p-3 bg-amber-50 text-amber-800 rounded-2xl w-fit mx-auto border border-amber-100">
              <Lock className="w-6 h-6" />
            </div>
            <h2 className="text-xl font-black tracking-tight">Cake-On-Cake Admin Desk</h2>
            <p className="text-xs text-[#8D6E63]">Please enter your secure access credentials to manage inventory.</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            {authError && (
              <div className="p-3 bg-red-50 border border-red-100 text-red-700 text-xs font-semibold rounded-xl text-center">
                {authError}
              </div>
            )}

            <div className="space-y-1">
              <label className="text-[11px] font-bold text-[#5D4037]">Admin Email Address</label>
              <input
                type="email"
                required
                placeholder="admin@cakeoncake.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full text-xs px-3 py-2.5 bg-[#FAF8F5] border border-[#EFEBE9] rounded-xl focus:outline-none focus:border-[#8D6E63] text-slate-800"
              />
            </div>

            <div className="space-y-1 relative">
              <label className="text-[11px] font-bold text-[#5D4037]">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full text-xs px-3 py-2.5 bg-[#FAF8F5] border border-[#EFEBE9] rounded-xl focus:outline-none focus:border-[#8D6E63] text-slate-800 pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button type="submit" className="w-full bg-[#4E342E] hover:bg-[#3E2723] text-white font-bold py-3 px-4 rounded-xl text-xs tracking-wider transition-all shadow-md flex items-center justify-center gap-1.5 cursor-pointer">
              <ShieldCheck className="w-4 h-4" /> Verify Access
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#3E2723] font-sans antialiased">
      <header className="bg-white border-b border-[#EFEBE9] px-4 sm:px-8 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-2xl">🍰</span>
          <div>
            <h1 className="font-black text-sm tracking-tight text-[#4E342E]">Admin Control Panel</h1>
            <p className="text-[10px] text-emerald-600 font-bold flex items-center gap-1">● Session Verified Securely</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Link href="/" className="inline-flex items-center gap-1 px-3 py-1.5 border border-[#EFEBE9] rounded-full text-xs font-bold text-[#5D4037] bg-[#FAF8F5] hover:bg-[#F5F2EB] transition-all">
            Exit Panel
          </Link>
          <button onClick={() => setIsAuthenticated(false)} className="px-3 py-1.5 bg-red-50 hover:bg-red-100 text-red-600 rounded-full text-xs font-bold transition-all">
            Logout
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-8 py-8 grid gap-8 md:grid-cols-3">
        <div className="bg-white border border-[#EFEBE9] p-6 rounded-3xl h-fit space-y-4 shadow-xs">
          <div>
            <h3 className="font-black text-sm text-[#3E2723]">Add New Masterpiece</h3>
            <p className="text-[11px] text-[#8D6E63]">Introduce a fresh cake profile to the catalog grid.</p>
          </div>

          <form onSubmit={handleAddProduct} className="space-y-3">
            <div className="space-y-1">
              <label className="text-[11px] font-bold text-[#5D4037]">Cake Variant Name</label>
              <input type="text" required placeholder="e.g. Premium Mango Mousse" value={newName} onChange={(e) => setNewName(e.target.value)} className="w-full text-xs px-3 py-2 bg-[#FAF8F5] border rounded-xl text-slate-800" />
            </div>

            <div className="space-y-1">
              <label className="text-[11px] font-bold text-[#5D4037]">Price (in INR - ₹)</label>
              <input type="number" required placeholder="e.g. 2500" value={newPrice} onChange={(e) => setNewPrice(e.target.value)} className="w-full text-xs px-3 py-2 bg-[#FAF8F5] border rounded-xl text-slate-800" />
            </div>

            <div className="space-y-1">
              <label className="text-[11px] font-bold text-[#5D4037]">Unsplash Image URL</label>
              <input type="url" required placeholder="https://images.unsplash.com/..." value={newImg} onChange={(e) => setNewImg(e.target.value)} className="w-full text-xs px-3 py-2 bg-[#FAF8F5] border rounded-xl text-slate-800" />
            </div>

            <div className="space-y-1">
              <label className="text-[11px] font-bold text-[#5D4037]">Category Filter Profile</label>
              <select value={newCategory} onChange={(e) => setNewCategory(e.target.value)} className="w-full text-xs px-3 py-2 bg-[#FAF8F5] border rounded-xl text-slate-800">
                <option value="Signature">Signature</option>
                <option value="Pastries">Pastries</option>
              </select>
            </div>

            <button type="submit" className="w-full mt-2 bg-[#4E342E] hover:bg-[#3E2723] text-white font-bold py-2.5 rounded-xl text-xs flex items-center justify-center gap-1 cursor-pointer">
              <Plus className="w-3.5 h-3.5" /> Push to Live Store
            </button>
          </form>
        </div>

        <div className="md:col-span-2 bg-white border border-[#EFEBE9] p-6 rounded-3xl shadow-xs space-y-4">
          <div>
            <h3 className="font-black text-sm text-[#3E2723]">Active Dessert Directory ({products.length})</h3>
            <p className="text-[11px] text-[#8D6E63]">Review, monitor, or wipe item indexes out of sync storage.</p>
          </div>

          <div className="divide-y divide-[#EFEBE9] max-h-[500px] overflow-y-auto pr-1">
            {products.map((p) => (
              <div key={p.id} className="flex items-center justify-between py-3 first:pt-0 last:pb-0">
                <div className="flex items-center gap-3">
                  <img src={p.img} alt={p.name} className="w-10 h-10 rounded-xl object-cover border" />
                  <div>
                    <h4 className="font-bold text-xs text-[#3E2723]">{p.name}</h4>
                    <span className="text-[10px] bg-slate-100 text-slate-600 font-bold px-1.5 py-0.5 rounded-md mr-2">{p.category}</span>
                    <span className="text-[11px] text-[#8D6E63] font-mono font-bold">₹{p.price.toLocaleString("en-IN")}</span>
                  </div>
                </div>
                <button onClick={() => handleDeleteProduct(p.id)} className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all cursor-pointer">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
