"use client";

import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { Fraunces, Inter } from "next/font/google";
import {
  ArrowLeft,
  Lock,
  ShieldCheck,
  Eye,
  EyeOff,
  Trash2,
  Plus,
  LogOut,
  LayoutGrid,
  Cake,
  IndianRupee,
  Search,
} from "lucide-react";

const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-display",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-body",
});

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
  const [search, setSearch] = useState("");
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
      category: newCategory,
    };

    const updated = [...products, newProduct];
    setProducts(updated);
    localStorage.setItem("cake_store_products", JSON.stringify(updated));

    setNewName("");
    setNewPrice("");
    setNewImg("");
  };

  const handleDeleteProduct = (id: string) => {
    const updated = products.filter((p) => p.id !== id);
    setProducts(updated);
    localStorage.setItem("cake_store_products", JSON.stringify(updated));
  };

  const filteredProducts = useMemo(() => {
    if (!search.trim()) return products;
    const q = search.toLowerCase();
    return products.filter(
      (p) => p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q)
    );
  }, [products, search]);

  const signatureCount = products.filter((p) => p.category === "Signature").length;
  const pastryCount = products.filter((p) => p.category === "Pastries").length;

  // ── LOGIN SCREEN ────────────────────────────────────────────────
  if (!isAuthenticated) {
    return (
      <div
        className={`${fraunces.variable} ${inter.variable} min-h-screen bg-white text-[#1F1B16] flex flex-col items-center justify-center p-6`}
        style={{ fontFamily: "var(--font-body)" }}
      >
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-[13px] font-medium text-[#9C9085] hover:text-[#1F1B16] transition-colors mb-10"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Back to storefront
        </Link>

        <div className="w-full max-w-[400px]">
          <div className="flex flex-col items-center text-center mb-8">
            <div className="w-12 h-12 rounded-full bg-[#1F1B16] flex items-center justify-center mb-5">
              <Lock className="w-5 h-5 text-white" strokeWidth={1.75} />
            </div>
            <h1
              style={{ fontFamily: "var(--font-display)" }}
              className="text-[28px] font-semibold tracking-tight text-[#1F1B16]"
            >
              Admin Desk
            </h1>
            <p className="text-[13px] text-[#9C9085] mt-2 leading-relaxed max-w-[280px]">
              Sign in with your administrator credentials to manage the Cake-On-Cake catalog.
            </p>
          </div>

          <div className="border border-[#ECE7E0] rounded-2xl p-7 sm:p-8">
            <form onSubmit={handleLogin} className="space-y-5">
              {authError && (
                <div className="px-3.5 py-2.5 bg-[#FBF1EF] border border-[#F3DCD8] text-[#A3372B] text-[12.5px] font-medium rounded-xl">
                  {authError}
                </div>
              )}

              <div className="space-y-1.5">
                <label className="text-[11.5px] font-semibold text-[#1F1B16] uppercase tracking-[0.04em]">
                  Email address
                </label>
                <input
                  type="email"
                  required
                  placeholder="admin@cakeoncake.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full text-[14px] px-3.5 py-2.75 bg-white border border-[#E4DFD7] rounded-xl outline-none focus:border-[#1F1B16] transition-colors placeholder:text-[#BDB4A8] text-[#1F1B16]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[11.5px] font-semibold text-[#1F1B16] uppercase tracking-[0.04em]">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full text-[14px] px-3.5 py-2.75 bg-white border border-[#E4DFD7] rounded-xl outline-none focus:border-[#1F1B16] transition-colors pr-11 text-[#1F1B16]"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#BDB4A8] hover:text-[#1F1B16] transition-colors cursor-pointer"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-[#1F1B16] hover:bg-[#3A3128] text-white font-semibold py-3 rounded-xl text-[13.5px] transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <ShieldCheck className="w-4 h-4" strokeWidth={1.75} /> Verify access
              </button>
            </form>
          </div>

          <p className="text-center text-[11.5px] text-[#BDB4A8] mt-6">
            Restricted area · authorized bakery staff only
          </p>
        </div>
      </div>
    );
  }

  // ── DASHBOARD ───────────────────────────────────────────────────
  return (
    <div
      className={`${fraunces.variable} ${inter.variable} min-h-screen bg-white text-[#1F1B16]`}
      style={{ fontFamily: "var(--font-body)" }}
    >
      <header className="border-b border-[#ECE7E0] px-5 sm:px-10 py-5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-[#1F1B16] flex items-center justify-center shrink-0">
            <Cake className="w-4 h-4 text-white" strokeWidth={1.75} />
          </div>
          <div>
            <h1
              style={{ fontFamily: "var(--font-display)" }}
              className="font-semibold text-[17px] tracking-tight leading-none"
            >
              Cake-On-Cake
            </h1>
            <p className="text-[11.5px] text-[#9C9085] mt-1 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block" />
              Session verified securely
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2.5">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 border border-[#ECE7E0] rounded-full text-[12.5px] font-medium text-[#3A3128] hover:bg-white transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Exit panel
          </Link>
          <button
            onClick={() => setIsAuthenticated(false)}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-[#FBF1EF] hover:bg-[#F6E3DF] text-[#A3372B] rounded-full text-[12.5px] font-medium transition-colors cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" /> Logout
          </button>
        </div>
      </header>

      <main className="max-w-[1180px] mx-auto px-5 sm:px-10 py-10">
        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-10">
          {[
            { label: "Total products", value: products.length, icon: LayoutGrid },
            { label: "Signature range", value: signatureCount, icon: Cake },
            { label: "Pastries range", value: pastryCount, icon: Cake },
          ].map((stat, i) => (
            <div key={i} className="border border-[#ECE7E0] rounded-2xl p-5">
              <div className="flex items-center justify-between mb-3">
                <span className="text-[11.5px] font-semibold uppercase tracking-[0.04em] text-[#9C9085]">
                  {stat.label}
                </span>
                <stat.icon className="w-4 h-4 text-[#BDB4A8]" strokeWidth={1.75} />
              </div>
              <span
                style={{ fontFamily: "var(--font-display)" }}
                className="text-[32px] font-semibold tracking-tight"
              >
                {stat.value}
              </span>
            </div>
          ))}
        </div>

        <div className="grid gap-8 lg:grid-cols-[340px_1fr]">
          {/* Add product */}
          <div className="border border-[#ECE7E0] rounded-2xl p-6 h-fit">
            <h3
              style={{ fontFamily: "var(--font-display)" }}
              className="font-semibold text-[18px] tracking-tight mb-1"
            >
              Add a new cake
            </h3>
            <p className="text-[12.5px] text-[#9C9085] mb-5 leading-relaxed">
              Introduce a fresh item to the live catalog.
            </p>

            <form onSubmit={handleAddProduct} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-[11.5px] font-semibold uppercase tracking-[0.04em] text-[#1F1B16]">
                  Cake name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Premium Mango Mousse"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  className="w-full text-[13.5px] px-3.5 py-2.5 bg-white border border-[#E4DFD7] rounded-xl outline-none focus:border-[#1F1B16] transition-colors text-[#1F1B16] placeholder:text-[#BDB4A8]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[11.5px] font-semibold uppercase tracking-[0.04em] text-[#1F1B16]">
                  Price (INR)
                </label>
                <div className="relative">
                  <IndianRupee className="absolute left-3.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#BDB4A8]" />
                  <input
                    type="number"
                    required
                    placeholder="2500"
                    value={newPrice}
                    onChange={(e) => setNewPrice(e.target.value)}
                    className="w-full text-[13.5px] pl-9 pr-3.5 py-2.5 bg-white border border-[#E4DFD7] rounded-xl outline-none focus:border-[#1F1B16] transition-colors text-[#1F1B16] placeholder:text-[#BDB4A8]"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[11.5px] font-semibold uppercase tracking-[0.04em] text-[#1F1B16]">
                  Image URL
                </label>
                <input
                  type="url"
                  required
                  placeholder="https://images.unsplash.com/..."
                  value={newImg}
                  onChange={(e) => setNewImg(e.target.value)}
                  className="w-full text-[13.5px] px-3.5 py-2.5 bg-white border border-[#E4DFD7] rounded-xl outline-none focus:border-[#1F1B16] transition-colors text-[#1F1B16] placeholder:text-[#BDB4A8]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[11.5px] font-semibold uppercase tracking-[0.04em] text-[#1F1B16]">
                  Category
                </label>
                <select
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  className="w-full text-[13.5px] px-3.5 py-2.5 bg-white border border-[#E4DFD7] rounded-xl outline-none focus:border-[#1F1B16] transition-colors text-[#1F1B16] cursor-pointer"
                >
                  <option value="Signature">Signature</option>
                  <option value="Pastries">Pastries</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full mt-1 bg-[#1F1B16] hover:bg-[#3A3128] text-white font-semibold py-2.75 rounded-xl text-[13px] flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" /> Publish to store
              </button>
            </form>
          </div>

          {/* Product list */}
          <div className="border border-[#ECE7E0] rounded-2xl p-6">
            <div className="flex items-center justify-between mb-5 gap-4">
              <div>
                <h3
                  style={{ fontFamily: "var(--font-display)" }}
                  className="font-semibold text-[18px] tracking-tight"
                >
                  Catalog directory
                </h3>
                <p className="text-[12.5px] text-[#9C9085] mt-0.5">
                  {filteredProducts.length} of {products.length} items shown
                </p>
              </div>
              <div className="relative w-full max-w-[220px]">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#BDB4A8]" />
                <input
                  type="text"
                  placeholder="Search catalog"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full text-[13px] pl-9 pr-3 py-2 bg-white border border-[#E4DFD7] rounded-full outline-none focus:border-[#1F1B16] transition-colors text-[#1F1B16] placeholder:text-[#BDB4A8]"
                />
              </div>
            </div>

            {filteredProducts.length === 0 ? (
              <div className="text-center py-16">
                <p className="text-[13px] text-[#9C9085]">
                  {products.length === 0
                    ? "No items yet — add your first cake using the form."
                    : "No items match your search."}
                </p>
              </div>
            ) : (
              <div className="divide-y divide-[#ECE7E0] max-h-[560px] overflow-y-auto -mx-1 px-1">
                {filteredProducts.map((p) => (
                  <div key={p.id} className="flex items-center justify-between py-3.5 first:pt-1 last:pb-1">
                    <div className="flex items-center gap-3.5 min-w-0">
                      <img
                        src={p.img}
                        alt={p.name}
                        className="w-12 h-12 rounded-xl object-cover border border-[#ECE7E0] shrink-0"
                      />
                      <div className="min-w-0">
                        <h4 className="font-semibold text-[13.5px] text-[#1F1B16] truncate">{p.name}</h4>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-[10.5px] font-semibold uppercase tracking-[0.03em] bg-[#F4F1EA] text-[#5A4E3F] px-2 py-0.5 rounded-full">
                            {p.category}
                          </span>
                          <span className="text-[12.5px] text-[#9C9085] font-medium">
                            ₹{p.price.toLocaleString("en-IN")}
                          </span>
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => handleDeleteProduct(p.id)}
                      className="p-2 text-[#BDB4A8] hover:text-[#A3372B] hover:bg-[#FBF1EF] rounded-xl transition-colors cursor-pointer shrink-0"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
