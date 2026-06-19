"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ShoppingBag, Shield, DollarSign, Users, Package, Tag, BarChart3, Plus, Trash2, CheckCircle2, Clock, ArrowLeft, Layers } from "lucide-react";

const SEED_PRODUCTS = [
  { id: "c1", name: "Red Velvet Romance", price: 42.00, img: "https://images.unsplash.com/photo-1586788280802-941ac08994d5?q=80&w=600&auto=format&fit=crop", category: "Signature" },
  { id: "c2", name: "Classic Chocolate Fudge", price: 38.00, img: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?q=80&w=600&auto=format&fit=crop", category: "Signature" },
  { id: "c3", name: "Vanilla Bean Dream", price: 35.00, img: "https://images.unsplash.com/photo-1465014949162-e461f5408bc2?q=80&w=600&auto=format&fit=crop", category: "Pastries" },
  { id: "c4", name: "Strawberry Shortcake", price: 45.00, img: "https://images.unsplash.com/photo-1565958011703-44f9829ba187?q=80&w=600&auto=format&fit=crop", category: "Signature" }
];

export default function SyncingAdminDashboard() {
  const [currentModule, setCurrentModule] = useState<'dashboard' | 'products' | 'categories' | 'orders' | 'customers' | 'coupons'>('dashboard');
  const [products, setProducts] = useState<typeof SEED_PRODUCTS>([]);
  const [categories, setCategories] = useState(["All", "Signature", "Pastries", "Custom Tiered"]);
  const [orders, setOrders] = useState([
    { id: "ord-901", customer: "Alex Miller", total: 42.00, status: "pending", date: "2026-06-18" },
    { id: "ord-902", customer: "Sarah Jenkins", total: 76.00, status: "delivered", date: "2026-06-17" }
  ]);
  const [customers] = useState([{ id: "u1", name: "Alex Miller", email: "alex@gmail.com", totalOrders: 1 }]);
  const [coupons, setCoupons] = useState([{ code: "SWEET20", discount: "20%", active: true }]);

  const [newProdName, setNewProdName] = useState("");
  const [newProdPrice, setNewProdPrice] = useState("");
  const [newProdCat, setNewProdCat] = useState("Signature");
  const [newCatName, setNewCatName] = useState("");
  const [newCouponCode, setNewCouponCode] = useState("");
  const [newCouponDiscount, setNewCouponDiscount] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem("cake_store_products");
    if (saved) {
      setProducts(JSON.parse(saved));
    } else {
      localStorage.setItem("cake_store_products", JSON.stringify(SEED_PRODUCTS));
      setProducts(SEED_PRODUCTS);
    }
  }, []);

  const saveProductsToStorage = (updatedProducts: typeof SEED_PRODUCTS) => {
    setProducts(updatedProducts);
    localStorage.setItem("cake_store_products", JSON.stringify(updatedProducts));
  };

  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProdName || !newProdPrice) return;
    
    const newProd = {
      id: `p-${Date.now()}`,
      name: newProdName,
      price: parseFloat(newProdPrice),
      category: newProdCat,
      img: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?q=80&w=600&auto=format&fit=crop"
    };

    const updated = [newProd, ...products];
    saveProductsToStorage(updated);
    setNewProdName("");
    setNewProdPrice("");
  };

  const handleDeleteProduct = (id: string) => {
    const updated = products.filter(p => p.id !== id);
    saveProductsToStorage(updated);
  };

  const handleAddCategory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCatName || categories.includes(newCatName)) return;
    setCategories([...categories, newCatName]);
    setNewCatName("");
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-800 flex flex-col md:flex-row antialiased">
      <aside className="w-full md:w-64 bg-slate-900 text-slate-200 p-6 flex flex-col justify-between shrink-0">
        <div className="space-y-8">
          <div>
            <div className="flex items-center gap-2 text-white font-black text-lg"><Shield className="w-5 h-5 text-amber-500" /> Admin Workspace</div>
            <p className="text-xs text-slate-400 mt-1">Cake-On-Cake Operations</p>
          </div>
          <nav className="space-y-1">
            {([
              { id: "dashboard" as const, label: "Overview Panel", icon: BarChart3 },
              { id: "products" as const, label: "Product Catalog", icon: Package },
              { id: "categories" as const, label: "Categories Grid", icon: Layers },
              { id: "orders" as const, label: "Order Fulfilment", icon: ShoppingBag },
              { id: "customers" as const, label: "Customer Roster", icon: Users },
              { id: "coupons" as const, label: "Coupon Discounts", icon: Tag },
            ]).map((tab) => {
              const Icon = tab.icon;
              return (
                <button key={tab.id} onClick={() => setCurrentModule(tab.id)} className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl font-bold text-xs text-left cursor-pointer ${currentModule === tab.id ? "bg-amber-500 text-slate-950" : "text-slate-400 hover:bg-slate-800"}`}>
                  <Icon className="w-4 h-4" /> {tab.label}
                </button>
              );
            })}
          </nav>
        </div>
        <Link href="/" className="inline-flex items-center gap-2 text-xs font-bold text-slate-400 hover:text-white pt-4 border-t border-slate-800"><ArrowLeft className="w-3.5 h-3.5" /> Back to Store</Link>
      </aside>

      <main className="flex-1 p-6 sm:p-10 max-w-7xl mx-auto w-full space-y-8">
        <div className="flex justify-between items-center border-b pb-5">
          <h1 className="text-3xl font-black text-slate-900 tracking-tight capitalize">{currentModule} Workspace</h1>
        </div>

        {currentModule === 'dashboard' && (
          <div className="grid gap-4 grid-cols-2 lg:grid-cols-4">
            <div className="bg-white border p-5 rounded-2xl flex items-center gap-4"><div className="p-3 rounded-xl bg-amber-50 text-amber-600"><ShoppingBag className="w-5 h-5" /></div><div><span className="text-[10px] uppercase font-bold text-slate-400 block">Total Orders</span><span className="text-2xl font-black">{orders.length}</span></div></div>
            <div className="bg-white border p-5 rounded-2xl flex items-center gap-4"><div className="p-3 rounded-xl bg-emerald-50 text-emerald-600"><DollarSign className="w-5 h-5" /></div><div><span className="text-[10px] uppercase font-bold text-slate-400 block">Revenue</span><span className="text-2xl font-black">$118.00</span></div></div>
            <div className="bg-white border p-5 rounded-2xl flex items-center gap-4"><div className="p-3 rounded-xl bg-blue-50 text-blue-600"><Users className="w-5 h-5" /></div><div><span className="text-[10px] uppercase font-bold text-slate-400 block">Customers</span><span className="text-2xl font-black">{customers.length}</span></div></div>
            <div className="bg-white border p-5 rounded-2xl flex items-center gap-4"><div className="p-3 rounded-xl bg-purple-50 text-purple-600"><Package className="w-5 h-5" /></div><div><span className="text-[10px] uppercase font-bold text-slate-400 block">Products</span><span className="text-2xl font-black">{products.length}</span></div></div>
          </div>
        )}

        {currentModule === 'products' && (
          <div className="space-y-6">
            <form onSubmit={handleAddProduct} className="bg-white border p-5 rounded-2xl grid gap-4 sm:grid-cols-4 items-end">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-500">Product Title Name</label>
                <input type="text" required placeholder="Lemon Meringue Bliss" value={newProdName} onChange={(e) => setNewProdName(e.target.value)} className="w-full text-xs px-3 py-2 border rounded-xl bg-slate-50 focus:outline-hidden text-slate-800" />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-500">Base Unit Price ($)</label>
                <input type="number" required step="0.01" placeholder="39.99" value={newProdPrice} onChange={(e) => setNewProdPrice(e.target.value)} className="w-full text-xs px-3 py-2 border rounded-xl bg-slate-50 focus:outline-hidden text-slate-800" />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-500">Category Tag</label>
                <select value={newProdCat} onChange={(e) => setNewProdCat(e.target.value)} className="w-full text-xs px-3 py-2 border rounded-xl bg-slate-50 focus:outline-hidden text-slate-800">
                  {categories.filter(c => c !== "All").map(cat => <option key={cat} value={cat}>{cat}</option>)}
                </select>
              </div>
              <button type="submit" className="bg-slate-900 hover:bg-slate-800 text-white font-bold py-2 px-4 rounded-xl text-xs flex items-center justify-center gap-1.5 cursor-pointer h-9"><Plus className="w-3.5 h-3.5" /> Add New Product</button>
            </form>

            <div className="bg-white border rounded-2xl overflow-hidden">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 text-slate-400 text-[10px] uppercase font-bold border-b">
                    <th className="p-4">Product Model Description</th>
                    <th className="p-4">Category Group</th>
                    <th className="p-4">Price</th>
                    <th className="p-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y text-xs font-medium text-slate-700">
                  {products.map((p) => (
                    <tr key={p.id}>
                      <td className="p-4 font-bold text-slate-900">{p.name}</td>
                      <td className="p-4"><span className="bg-slate-100 px-2 py-0.5 rounded text-[10px] font-bold">{p.category}</span></td>
                      <td className="p-4 font-mono font-bold">${p.price.toFixed(2)}</td>
                      <td className="p-4 text-right">
                        <button onClick={() => handleDeleteProduct(p.id)} className="text-red-400 hover:text-red-600 p-1.5 cursor-pointer"><Trash2 className="w-4 h-4" /></button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {currentModule === 'categories' && (
          <div className="space-y-6 max-w-xl">
            <form onSubmit={handleAddCategory} className="bg-white border p-5 rounded-2xl flex gap-3 items-end">
              <input type="text" required placeholder="Gluten Free" value={newCatName} onChange={(e) => setNewCatName(e.target.value)} className="w-full text-xs px-3 py-2 border rounded-xl bg-slate-50 text-slate-800" />
              <button type="submit" className="bg-slate-900 text-white px-4 h-9 rounded-xl text-xs cursor-pointer">Append Category</button>
            </form>
            <div className="bg-white border p-5 rounded-2xl flex flex-wrap gap-2">
              {categories.map((c, i) => <span key={i} className="bg-slate-100 text-slate-800 font-bold text-xs px-3 py-1.5 rounded-xl">{c}</span>)}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
