"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { 
  ShoppingBag, Shield, Package, 
  BarChart3, Plus, Trash2, Edit3, Check, X, ArrowLeft, Layers, ImageIcon 
} from "lucide-react";

const SEED_PRODUCTS = [
  { id: "c1", name: "Red Velvet Romance", price: 42.00, img: "https://images.unsplash.com/photo-1586788280802-941ac08994d5?q=80&w=600&auto=format&fit=crop", category: "Signature" },
  { id: "c2", name: "Classic Chocolate Fudge", price: 38.00, img: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?q=80&w=600&auto=format&fit=crop", category: "Signature" },
  { id: "c3", name: "Vanilla Bean Dream", price: 35.00, img: "https://images.unsplash.com/photo-1465014949162-e461f5408bc2?q=80&w=600&auto=format&fit=crop", category: "Pastries" },
  { id: "c4", name: "Strawberry Shortcake", price: 45.00, img: "https://images.unsplash.com/photo-1565958011703-44f9829ba187?q=80&w=600&auto=format&fit=crop", category: "Signature" },
  { id: "c5", name: "Lemon Blueberry Tart", price: 28.00, img: "https://images.unsplash.com/photo-1488477181946-6428a0291777?q=80&w=600&auto=format&fit=crop", category: "Pastries" },
  { id: "c6", name: "Matcha Green Tea Crepe", price: 48.00, img: "https://images.unsplash.com/photo-1536680465769-a36969fdfe70?q=80&w=600&auto=format&fit=crop", category: "Pastries" }
];

export default function SyncingAdminDashboard() {
  const [currentModule, setCurrentModule] = useState<'dashboard' | 'products' | 'categories' | 'orders' | 'customers' | 'coupons'>('products');
  const [products, setProducts] = useState<typeof SEED_PRODUCTS>([]);
  const [categories, setCategories] = useState(["All", "Signature", "Pastries", "Custom Tiered"]);
  
  const [newProdName, setNewProdName] = useState("");
  const [newProdPrice, setNewProdPrice] = useState("");
  const [newProdCat, setNewProdCat] = useState("Signature");
  const [newProdImg, setNewProdImg] = useState("");

  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState("");
  const [editPrice, setEditPrice] = useState("");
  const [editCat, setEditCat] = useState("");
  const [editImg, setEditImg] = useState("");

  const [orders] = useState([
    { id: "ord-901", customer: "Alex Miller", total: 42.00, status: "pending", date: "2026-06-18" }
  ]);

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
    
    const defaultBackupImg = "https://images.unsplash.com/photo-1578985545062-69928b1d9587?q=80&w=600&auto=format&fit=crop";
    
    const newProd = {
      id: `p-${Date.now()}`,
      name: newProdName,
      price: parseFloat(newProdPrice),
      category: newProdCat,
      img: newProdImg.trim() !== "" ? newProdImg.trim() : defaultBackupImg
    };

    const updated = [newProd, ...products];
    saveProductsToStorage(updated);
    
    setNewProdName("");
    setNewProdPrice("");
    setNewProdImg("");
  };

  const handleDeleteProduct = (id: string) => {
    const updated = products.filter(p => p.id !== id);
    saveProductsToStorage(updated);
  };

  const startEditing = (product: typeof SEED_PRODUCTS[0]) => {
    setEditingId(product.id);
    setEditName(product.name);
    setEditPrice(product.price.toString());
    setEditCat(product.category);
    setEditImg(product.img || "");
  };

  const handleSaveEdit = (id: string) => {
    const updated = products.map(p => {
      if (p.id === id) {
        return {
          ...p,
          name: editName,
          price: parseFloat(editPrice) || 0,
          category: editCat,
          img: editImg.trim()
        };
      }
      return p;
    });
    saveProductsToStorage(updated);
    setEditingId(null);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-800 flex flex-col md:flex-row antialiased">
      <aside className="w-full md:w-64 bg-slate-900 text-slate-200 p-6 flex flex-col justify-between shrink-0">
        <div className="space-y-8">
          <div>
            <div className="flex items-center gap-2 text-white font-black text-lg">
              <Shield className="w-5 h-5 text-amber-500" /> Admin Workspace
            </div>
            <p className="text-xs text-slate-400 mt-1">Cake-On-Cake Operations</p>
          </div>
          <nav className="space-y-1">
            {([
              { id: "dashboard" as const, label: "Overview Panel", icon: BarChart3 },
              { id: "products" as const, label: "Product Catalog (With Images)", icon: Package },
              { id: "categories" as const, label: "Categories Grid", icon: Layers },
            ]).map((tab) => {
              const Icon = tab.icon;
              return (
                <button 
                  key={tab.id} 
                  onClick={() => setCurrentModule(tab.id)} 
                  className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl font-bold text-xs text-left cursor-pointer transition-colors ${
                    currentModule === tab.id ? "bg-amber-500 text-slate-950" : "text-slate-400 hover:bg-slate-800 hover:text-slate-200"
                  }`}
                >
                  <Icon className="w-4 h-4" /> {tab.label}
                </button>
              );
            })}
          </nav>
        </div>
        <Link href="/" className="inline-flex items-center gap-2 text-xs font-bold text-slate-400 hover:text-white pt-4 border-t border-slate-800">
          <ArrowLeft className="w-3.5 h-3.5" /> Back to Live Storefront
        </Link>
      </aside>

      <main className="flex-1 p-6 sm:p-10 max-w-7xl mx-auto w-full space-y-8">
        <div className="flex justify-between items-center border-b pb-5">
          <div>
            <h1 className="text-3xl font-black text-slate-900 tracking-tight capitalize">{currentModule} Workspace</h1>
            <p className="text-xs text-slate-500 mt-1">Configure item layouts, adjust base prices, and update cover design graphics.</p>
          </div>
        </div>

        {currentModule === 'dashboard' && (
          <div className="grid gap-4 grid-cols-2 lg:grid-cols-4">
            <div className="bg-white border p-5 rounded-2xl flex items-center gap-4"><div className="p-3 rounded-xl bg-amber-50 text-amber-600"><ShoppingBag className="w-5 h-5" /></div><div><span className="text-[10px] uppercase font-bold text-slate-400 block">Total Orders</span><span className="text-2xl font-black">{orders.length}</span></div></div>
            <div className="bg-white border p-5 rounded-2xl flex items-center gap-4"><div className="p-3 rounded-xl bg-purple-50 text-purple-600"><Package className="w-5 h-5" /></div><div><span className="text-[10px] uppercase font-bold text-slate-400 block">Active Products</span><span className="text-2xl font-black">{products.length}</span></div></div>
          </div>
        )}

        {currentModule === 'products' && (
          <div className="space-y-8">
            
            <form onSubmit={handleAddProduct} className="bg-white border border-slate-200 p-6 rounded-2xl shadow-xs space-y-4">
              <h3 className="text-xs font-bold uppercase text-slate-400 tracking-wider flex items-center gap-1.5">
                <Plus className="w-4 h-4 text-slate-900" /> Catalog Registry - Add New Cake
              </h3>
              
              <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 items-end">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-500">Product Title Name</label>
                  <input type="text" required placeholder="e.g. Raspberry Truffle Classic" value={newProdName} onChange={(e) => setNewProdName(e.target.value)} className="w-full text-xs px-3 py-2 border rounded-xl bg-slate-50 focus:outline-none focus:ring-1 focus:ring-amber-500 text-slate-800" />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-500">Base Unit Price ($)</label>
                  <input type="number" required step="0.01" placeholder="39.99" value={newProdPrice} onChange={(e) => setNewProdPrice(e.target.value)} className="w-full text-xs px-3 py-2 border rounded-xl bg-slate-50 focus:outline-none focus:ring-1 focus:ring-amber-500 text-slate-800" />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-500">Category Tag Group</label>
                  <select value={newProdCat} onChange={(e) => setNewProdCat(e.target.value)} className="w-full text-xs px-3 py-2 border rounded-xl bg-slate-50 focus:outline-none focus:ring-1 focus:ring-amber-500 text-slate-800">
                    {categories.filter(c => c !== "All").map(cat => <option key={cat} value={cat}>{cat}</option>)}
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-500 flex items-center gap-1"><ImageIcon className="w-3 h-3 text-slate-400" /> Image Web Link / URL</label>
                  <input type="text" placeholder="https://images.unsplash.com/..." value={newProdImg} onChange={(e) => setNewProdImg(e.target.value)} className="w-full text-xs px-3 py-2 border rounded-xl bg-slate-50 focus:outline-none focus:ring-1 focus:ring-amber-500 text-slate-800 font-mono" />
                </div>
              </div>

              <div className="flex justify-end pt-2">
                <button type="submit" className="bg-slate-900 hover:bg-slate-800 text-white font-bold py-2.5 px-5 rounded-xl text-xs flex items-center gap-2 cursor-pointer transition-colors shadow-2xs">
                  <Plus className="w-4 h-4" /> Deploy Product to Live Grid
                </button>
              </div>
            </form>

            <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-xs">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 text-slate-400 text-[10px] uppercase font-bold border-b border-slate-200 tracking-wider">
                    <th className="p-4 w-20">Display Image</th>
                    <th className="p-4">Product Name Details</th>
                    <th className="p-4 w-36">Category Group</th>
                    <th className="p-4 w-32">Price Unit</th>
                    <th className="p-4 text-right w-28">Modify Matrix</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-xs font-medium text-slate-700">
                  {products.map((p) => {
                    const isEditing = editingId === p.id;
                    return (
                      <tr key={p.id} className="hover:bg-slate-50/40 transition-colors">
                        
                        <td className="p-4">
                          <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-slate-100 border border-slate-200 flex items-center justify-center group">
                            <img src={isEditing ? editImg : p.img} alt={p.name} className="w-full h-full object-cover" onError={(e)=>{(e.target as HTMLImageElement).src="https://images.unsplash.com/photo-1578985545062-69928b1d9587?q=80&w=600&auto=format&fit=crop"}} />
                          </div>
                        </td>

                        <td className="p-4">
                          {isEditing ? (
                            <div className="space-y-2 max-w-md">
                              <input type="text" value={editName} onChange={(e) => setEditName(e.target.value)} className="w-full text-xs px-2 py-1 border rounded-lg font-bold text-slate-900 bg-white" />
                              <div className="flex items-center gap-1.5 text-[11px] text-slate-400">
                                <span className="shrink-0 font-mono">Image Link:</span>
                                <input type="text" value={editImg} onChange={(e) => setEditImg(e.target.value)} className="w-full text-[11px] font-mono px-2 py-0.5 border rounded-sm bg-white text-slate-600" placeholder="Paste image address URL..." />
                              </div>
                            </div>
                          ) : (
                            <div>
                              <span className="font-bold text-slate-900 block text-sm">{p.name}</span>
                              <span className="text-[10px] text-slate-400 font-mono block mt-0.5 max-w-xs truncate">{p.img}</span>
                            </div>
                          )}
                        </td>

                        <td className="p-4">
                          {isEditing ? (
                            <select value={editCat} onChange={(e) => setEditCat(e.target.value)} className="text-xs p-1 border rounded-lg bg-white">
                              {categories.filter(c => c !== "All").map(cat => <option key={cat} value={cat}>{cat}</option>)}
                            </select>
                          ) : (
                            <span className="bg-slate-100 text-slate-700 border border-slate-200 px-2.5 py-0.5 rounded-md text-[10px] font-bold">{p.category}</span>
                          )}
                        </td>

                        <td className="p-4 font-mono font-bold text-slate-800">
                          {isEditing ? (
                            <div className="flex items-center gap-1">
                              <span>$</span>
                              <input type="number" step="0.01" value={editPrice} onChange={(e) => setEditPrice(e.target.value)} className="w-20 text-xs px-2 py-1 border rounded-lg bg-white" />
                            </div>
                          ) : (
                            <span className="text-sm font-black text-slate-900">${p.price.toFixed(2)}</span>
                          )}
                        </td>

                        <td className="p-4 text-right">
                          {isEditing ? (
                            <div className="flex items-center justify-end gap-1">
                              <button onClick={() => handleSaveEdit(p.id)} className="p-1.5 rounded-lg bg-emerald-50 text-emerald-600 hover:bg-emerald-100 transition-colors cursor-pointer" title="Save changes">
                                <Check className="w-4 h-4" />
                              </button>
                              <button onClick={() => setEditingId(null)} className="p-1.5 rounded-lg bg-slate-100 text-slate-500 hover:bg-slate-200 transition-colors cursor-pointer" title="Cancel operation">
                                <X className="w-4 h-4" />
                              </button>
                            </div>
                          ) : (
                            <div className="flex items-center justify-end gap-1">
                              <button onClick={() => startEditing(p)} className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer" title="Edit Product Specs">
                                <Edit3 className="w-4 h-4" />
                              </button>
                              <button onClick={() => handleDeleteProduct(p.id)} className="p-1.5 rounded-lg text-red-400 hover:text-red-600 hover:bg-red-50 transition-colors cursor-pointer" title="Delete Product">
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          )}
                        </td>

                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
