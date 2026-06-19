"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  ShoppingBag, Shield, DollarSign, Users, Package, 
  Tag, BarChart3, Plus, Trash2, CheckCircle2, Clock, 
  ArrowLeft, Layers
} from "lucide-react";

const INITIAL_PRODUCTS = [
  { id: "p1", name: "Red Velvet Romance", price: 42.00, category: "Signature", stock: 12 },
  { id: "p2", name: "Classic Chocolate Fudge", price: 38.00, category: "Signature", stock: 8 },
  { id: "p3", name: "Vanilla Bean Dream", price: 35.00, category: "Pastries", stock: 15 },
  { id: "p4", name: "Strawberry Shortcake", price: 45.00, category: "Signature", stock: 5 },
];

const INITIAL_CATEGORIES = ["All", "Signature", "Pastries", "Custom Tiered", "Seasonal Special"];

const INITIAL_ORDERS = [
  { id: "ord-901", customer: "Alex Miller", total: 42.00, status: "pending", date: "2026-06-18" },
  { id: "ord-902", customer: "Sarah Jenkins", total: 76.00, status: "delivered", date: "2026-06-17" },
  { id: "ord-903", customer: "Michael Chang", total: 118.00, status: "pending", date: "2026-06-19" },
];

const INITIAL_CUSTOMERS = [
  { id: "u1", name: "Alex Miller", email: "alex@gmail.com", totalOrders: 1 },
  { id: "u2", name: "Sarah Jenkins", email: "sarah.j@outlook.com", totalOrders: 4 },
  { id: "u3", name: "Michael Chang", email: "mchang@techcorp.com", totalOrders: 2 },
];

const INITIAL_COUPONS = [
  { code: "SWEET20", discount: "20%", active: true },
  { code: "CAKEONCAKE", discount: "$10 Off", active: true },
  { code: "EARLYBIRD", discount: "5%", active: false },
];

export default function FullyLoadedAdmin() {
  const [currentModule, setCurrentModule] = useState<'dashboard' | 'products' | 'categories' | 'orders' | 'customers' | 'coupons'>('dashboard');

  const [products, setProducts] = useState(INITIAL_PRODUCTS);
  const [categories, setCategories] = useState(INITIAL_CATEGORIES);
  const [orders, setOrders] = useState(INITIAL_ORDERS);
  const [customers] = useState(INITIAL_CUSTOMERS);
  const [coupons, setCoupons] = useState(INITIAL_COUPONS);

  const [newProdName, setNewProdName] = useState("");
  const [newProdPrice, setNewProdPrice] = useState("");
  const [newProdCat, setNewProdCat] = useState("Signature");
  const [newCatName, setNewCatName] = useState("");
  const [newCouponCode, setNewCouponCode] = useState("");
  const [newCouponDiscount, setNewCouponDiscount] = useState("");

  const totalOrdersCount = orders.length;
  const totalRevenue = orders.reduce((sum, o) => sum + o.total, 0);
  const uniqueCustomersCount = customers.length;
  const totalProductsCount = products.length;

  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProdName || !newProdPrice) return;
    const newProd = {
      id: `p${Date.now()}`,
      name: newProdName,
      price: parseFloat(newProdPrice),
      category: newProdCat,
      stock: 10
    };
    setProducts([newProd, ...products]);
    setNewProdName("");
    setNewProdPrice("");
  };

  const handleDeleteProduct = (id: string) => {
    setProducts(products.filter(p => p.id !== id));
  };

  const handleAddCategory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCatName || categories.includes(newCatName)) return;
    setCategories([...categories, newCatName]);
    setNewCatName("");
  };

  const toggleOrderStatus = (orderId: string) => {
    setOrders(orders.map(o => {
      if (o.id === orderId) {
        return { ...o, status: o.status === 'pending' ? 'delivered' : 'pending' };
      }
      return o;
    }));
  };

  const toggleCouponState = (code: string) => {
    setCoupons(coupons.map(c => c.code === code ? { ...c, active: !c.active } : c));
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-800 flex flex-col md:flex-row antialiased">
      
      <aside className="w-full md:w-64 bg-slate-900 text-slate-200 p-6 flex flex-col justify-between border-r border-slate-800 shrink-0">
        <div className="space-y-8">
          <div>
            <div className="flex items-center gap-2 text-white font-black text-lg tracking-tight">
              <Shield className="w-5 h-5 text-amber-500" /> Admin Workspace
            </div>
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
                <button
                  key={tab.id}
                  onClick={() => setCurrentModule(tab.id)}
                  className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl font-bold text-xs transition-all cursor-pointer text-left ${
                    currentModule === tab.id 
                      ? "bg-amber-500 text-slate-950 shadow-sm" 
                      : "hover:bg-slate-800 text-slate-400 hover:text-slate-100"
                  }`}
                >
                  <Icon className="w-4 h-4" /> {tab.label}
                </button>
              );
            })}
          </nav>
        </div>

        <Link href="/" className="inline-flex items-center gap-2 text-xs font-bold text-slate-400 hover:text-white mt-8 border-t border-slate-800 pt-4">
          <ArrowLeft className="w-3.5 h-3.5" /> Back to Live Bakery
        </Link>
      </aside>

      <main className="flex-1 p-6 sm:p-10 max-w-7xl mx-auto w-full space-y-8">
        
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-slate-200 pb-5 gap-4">
          <div>
            <h1 className="text-3xl font-black text-slate-900 tracking-tight capitalize">{currentModule} Workspace</h1>
            <p className="text-sm text-slate-500 mt-0.5">Manage live storefront records, system keys, and bakery dispatch status streams.</p>
          </div>
          <div className="text-xs font-mono bg-slate-200/60 text-slate-600 px-3 py-1.5 rounded-lg border border-slate-300/40">
            🕒 Active Session Safe
          </div>
        </div>

        {currentModule === 'dashboard' && (
          <div className="space-y-8">
            <div className="grid gap-4 grid-cols-2 lg:grid-cols-4">
              <div className="bg-white border border-slate-200 p-5 rounded-2xl shadow-2xs flex items-center gap-4">
                <div className="p-3 rounded-xl bg-amber-50 text-amber-600"><ShoppingBag className="w-5 h-5" /></div>
                <div>
                  <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 block">Total Orders</span>
                  <span className="text-2xl font-black text-slate-900">{totalOrdersCount}</span>
                </div>
              </div>
              <div className="bg-white border border-slate-200 p-5 rounded-2xl shadow-2xs flex items-center gap-4">
                <div className="p-3 rounded-xl bg-emerald-50 text-emerald-600"><DollarSign className="w-5 h-5" /></div>
                <div>
                  <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 block">Total Revenue</span>
                  <span className="text-2xl font-black text-slate-900">${totalRevenue.toFixed(2)}</span>
                </div>
              </div>
              <div className="bg-white border border-slate-200 p-5 rounded-2xl shadow-2xs flex items-center gap-4">
                <div className="p-3 rounded-xl bg-blue-50 text-blue-600"><Users className="w-5 h-5" /></div>
                <div>
                  <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 block">Total Customers</span>
                  <span className="text-2xl font-black text-slate-900">{uniqueCustomersCount}</span>
                </div>
              </div>
              <div className="bg-white border border-slate-200 p-5 rounded-2xl shadow-2xs flex items-center gap-4">
                <div className="p-3 rounded-xl bg-purple-50 text-purple-600"><Package className="w-5 h-5" /></div>
                <div>
                  <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 block">Total Products</span>
                  <span className="text-2xl font-black text-slate-900">{totalProductsCount}</span>
                </div>
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              <div className="bg-white border border-slate-200 p-6 rounded-2xl shadow-2xs md:col-span-2 space-y-4">
                <div>
                  <h3 className="font-bold text-slate-900 text-sm">Monthly Sales Volumetric Analytics</h3>
                  <p className="text-xs text-slate-400">Aggregated revenue timeline velocity metrics</p>
                </div>
                <div className="h-44 flex items-end gap-3 pt-6 border-b border-slate-100 px-2">
                  {[
                    { label: "Jan", height: "h-12", rev: "$1.2k" },
                    { label: "Feb", height: "h-20", rev: "$2.1k" },
                    { label: "Mar", height: "h-16", rev: "$1.8k" },
                    { label: "Apr", height: "h-28", rev: "$3.2k" },
                    { label: "May", height: "h-36", rev: "$4.5k" },
                    { label: "Jun", height: "h-40", rev: "$5.1k" },
                  ].map((bar, i) => (
                    <div key={i} className="flex-1 flex flex-col items-center gap-2 group cursor-pointer">
                      <span className="text-[9px] font-bold text-slate-500 opacity-0 group-hover:opacity-100 transition-opacity">{bar.rev}</span>
                      <div className={`w-full ${bar.height} bg-slate-900 group-hover:bg-amber-500 rounded-t-md transition-colors`} />
                      <span className="text-[10px] font-medium text-slate-400">{bar.label}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white border border-slate-200 p-6 rounded-2xl shadow-2xs space-y-4">
                <div>
                  <h3 className="font-bold text-slate-900 text-sm">Top Selling Cakes</h3>
                  <p className="text-xs text-slate-400">Highest grossing catalog items</p>
                </div>
                <div className="space-y-3">
                  {[
                    { rank: 1, name: "Red Velvet Romance", orders: 142, share: "38%" },
                    { rank: 2, name: "Classic Chocolate Fudge", orders: 98, share: "27%" },
                    { rank: 3, name: "Strawberry Shortcake", orders: 64, share: "19%" },
                  ].map((cake) => (
                    <div key={cake.rank} className="flex items-center justify-between border-b border-slate-50 pb-2 text-xs">
                      <div className="flex items-center gap-2">
                        <span className="w-5 h-5 bg-amber-50 rounded text-amber-700 font-bold flex items-center justify-center text-[10px]">{cake.rank}</span>
                        <span className="font-bold text-slate-800">{cake.name}</span>
                      </div>
                      <span className="font-mono text-slate-400 text-[11px] font-semibold">{cake.share}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {currentModule === 'products' && (
          <div className="space-y-6">
            <form onSubmit={handleAddProduct} className="bg-white border border-slate-200 p-5 rounded-2xl shadow-2xs grid gap-4 sm:grid-cols-4 items-end">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-500">Product Title Name</label>
                <input 
                  type="text" required placeholder="Lemon Meringue Bliss" value={newProdName}
                  onChange={(e) => setNewProdName(e.target.value)}
                  className="w-full text-xs px-3 py-2 border rounded-xl bg-slate-50 focus:outline-hidden"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-500">Base Unit Price ($)</label>
                <input 
                  type="number" required step="0.01" placeholder="39.99" value={newProdPrice}
                  onChange={(e) => setNewProdPrice(e.target.value)}
                  className="w-full text-xs px-3 py-2 border rounded-xl bg-slate-50 focus:outline-hidden"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-500">Category Tag Assignment</label>
                <select 
                  value={newProdCat} onChange={(e) => setNewProdCat(e.target.value)}
                  className="w-full text-xs px-3 py-2 border rounded-xl bg-slate-50 focus:outline-hidden"
                >
                  {categories.filter(c => c !== "All").map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
              <button type="submit" className="bg-slate-900 hover:bg-slate-800 text-white font-bold py-2 px-4 rounded-xl text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer h-9">
                <Plus className="w-3.5 h-3.5" /> Add New Product
              </button>
            </form>

            <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-2xs">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 text-slate-400 text-[10px] uppercase font-bold tracking-wider border-b border-slate-200">
                    <th className="p-4">Product Model Description</th>
                    <th className="p-4">Category Group</th>
                    <th className="p-4">Unit Value Price</th>
                    <th className="p-4 text-right">Inventory Target Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-xs font-medium">
                  {products.map((p) => (
                    <tr key={p.id} className="hover:bg-slate-50/60">
                      <td className="p-4 font-bold text-slate-900">{p.name}</td>
                      <td className="p-4 text-slate-500"><span className="bg-slate-100 px-2 py-0.5 rounded text-[10px] font-bold">{p.category}</span></td>
                      <td className="p-4 font-mono font-bold text-slate-800">${p.price.toFixed(2)}</td>
                      <td className="p-4 text-right">
                        <button onClick={() => handleDeleteProduct(p.id)} className="text-red-400 hover:text-red-600 p-1.5 rounded-lg hover:bg-red-50 transition-colors cursor-pointer">
                          <Trash2 className="w-4 h-4" />
                        </button>
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
            <form onSubmit={handleAddCategory} className="bg-white border border-slate-200 p-5 rounded-2xl shadow-2xs flex gap-3 items-end">
              <div className="flex-1 space-y-1.5">
                <label className="text-xs font-bold text-slate-500">New Category Tag Label</label>
                <input 
                  type="text" required placeholder="Gluten-Free Options" value={newCatName}
                  onChange={(e) => setNewCatName(e.target.value)}
                  className="w-full text-xs px-3 py-2 border rounded-xl bg-slate-50 focus:outline-hidden"
                />
              </div>
              <button type="submit" className="bg-slate-900 hover:bg-slate-800 text-white font-bold py-2 px-4 rounded-xl text-xs transition-colors cursor-pointer h-9">
                Append Category
              </button>
            </form>

            <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-2xs space-y-3">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Active Stream Categories</h3>
              <div className="flex flex-wrap gap-2">
                {categories.map((cat, i) => (
                  <span key={i} className="bg-slate-100 text-slate-800 font-bold text-xs px-3 py-1.5 rounded-xl border border-slate-200">
                    {cat}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}

        {currentModule === 'orders' && (
          <div className="space-y-4">
            {orders.map((order) => (
              <div key={order.id} className="bg-white border border-slate-200 p-5 rounded-2xl shadow-2xs flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs text-slate-400 font-bold">#{order.id}</span>
                    <span className={`inline-flex items-center gap-1 text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md ${
                      order.status === 'delivered' ? 'bg-emerald-50 text-emerald-700 border border-emerald-100' : 'bg-amber-50 text-amber-700 border border-amber-100'
                    }`}>
                      {order.status === 'delivered' ? <CheckCircle2 className="w-3 h-3" /> : <Clock className="w-3 h-3" />} {order.status}
                    </span>
                  </div>
                  <h4 className="text-sm font-bold text-slate-900">{order.customer}</h4>
                  <p className="text-xs text-slate-400">📅 Finalized Date Logs: {order.date}</p>
                </div>

                <div className="flex items-center gap-6 w-full sm:w-auto justify-between sm:justify-end">
                  <span className="font-mono font-black text-slate-900 text-lg">${order.total.toFixed(2)}</span>
                  <button 
                    onClick={() => toggleOrderStatus(order.id)}
                    className="text-xs font-bold bg-slate-100 hover:bg-slate-200 text-slate-700 px-3 py-1.5 rounded-lg border border-slate-200 transition-colors cursor-pointer"
                  >
                    Toggle Status Key
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {currentModule === 'customers' && (
          <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-2xs">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 text-slate-400 text-[10px] uppercase font-bold tracking-wider border-b border-slate-200">
                  <th className="p-4">Customer Identity Account</th>
                  <th className="p-4">Electronic Mail Email</th>
                  <th className="p-4 text-center">Checkout Count Summary</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs font-medium text-slate-700">
                {customers.map((c) => (
                  <tr key={c.id} className="hover:bg-slate-50/60">
                    <td className="p-4 font-bold text-slate-900">{c.name}</td>
                    <td className="p-4 font-mono text-slate-500">{c.email}</td>
                    <td className="p-4 text-center font-bold font-mono text-slate-800">{c.totalOrders} Orders</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {currentModule === 'coupons' && (
          <div className="space-y-6">
            <form onSubmit={(e) => {
              e.preventDefault();
              if(!newCouponCode || !newCouponDiscount) return;
              setCoupons([...coupons, { code: newCouponCode.toUpperCase(), discount: newCouponDiscount, active: true }]);
              setNewCouponCode("");
              setNewCouponDiscount("");
            }} className="bg-white border border-slate-200 p-5 rounded-2xl shadow-2xs grid gap-4 sm:grid-cols-3 items-end">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-500">Coupon Code Token</label>
                <input type="text" required placeholder="SUMMER50" value={newCouponCode} onChange={(e) => setNewCouponCode(e.target.value)} className="w-full text-xs px-3 py-2 border rounded-xl bg-slate-50 focus:outline-hidden" />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-500">Discount Matrix Factor</label>
                <input type="text" required placeholder="15% or $15" value={newCouponDiscount} onChange={(e) => setNewCouponDiscount(e.target.value)} className="w-full text-xs px-3 py-2 border rounded-xl bg-slate-50 focus:outline-hidden" />
              </div>
              <button type="submit" className="bg-slate-900 hover:bg-slate-800 text-white font-bold py-2 px-4 rounded-xl text-xs transition-colors cursor-pointer h-9">
                Generate Token Coupon
              </button>
            </form>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {coupons.map((coupon, i) => (
                <div key={i} className={`p-4 rounded-2xl border transition-all flex justify-between items-center bg-white ${
                  coupon.active ? 'border-slate-200 shadow-2xs' : 'border-slate-200 opacity-60 bg-slate-50'
                }`}>
                  <div>
                    <span className="font-mono font-black text-sm text-slate-900 block">{coupon.code}</span>
                    <span className="text-xs font-bold text-emerald-600 mt-0.5 block">{coupon.discount} Rate Reduction</span>
                  </div>
                  <button 
                    onClick={() => toggleCouponState(coupon.code)}
                    className={`text-[10px] font-bold px-3 py-1.5 rounded-lg border cursor-pointer transition-all ${
                      coupon.active ? 'bg-amber-500 text-slate-950 border-amber-500 font-extrabold' : 'bg-slate-100 text-slate-500 border-slate-200'
                    }`}
                  >
                    {coupon.active ? "Enabled Switch" : "Disabled Switch"}
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

      </main>
    </div>
  );
}
