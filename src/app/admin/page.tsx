"use client";

import React, { useEffect, useState } from "react";
import { getAdminOrders, getCustomInquiries } from "@/lib/supabase";
import { RefreshCw, Sparkles, ShoppingBag, Lock } from "lucide-react";

export default function AdminDashboard() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [orders, setOrders] = useState<any[]>([]);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [inquiries, setInquiries] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState<'orders' | 'inquiries'>('orders');
  const [loading, setLoading] = useState(true);

  // Security State Gates
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [pinInput, setPinInput] = useState("");
  const [pinError, setPinError] = useState(false);

  const MASTER_PIN = "1234";

  async function loadData() {
    setLoading(true);
    const orderData = await getAdminOrders();
    const inquiryData = await getCustomInquiries();
    setOrders(orderData);
    setInquiries(inquiryData);
    setLoading(false);
  }

  useEffect(() => {
    if (isAuthenticated) {
      loadData();
    }
  }, [isAuthenticated]);

  const handlePinSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pinInput === MASTER_PIN) {
      setIsAuthenticated(true);
      setPinError(false);
    } else {
      setPinError(true);
      setPinInput("");
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center p-6">
        <form onSubmit={handlePinSubmit} className="bg-white p-8 rounded-2xl shadow-xl max-w-sm w-full space-y-6 border border-slate-100">
          <div className="text-center space-y-2">
            <div className="mx-auto w-12 h-12 bg-amber-50 text-amber-700 rounded-full flex items-center justify-center">
              <Lock className="w-5 h-5" />
            </div>
            <h2 className="text-xl font-bold text-slate-900">Admin Authentication</h2>
            <p className="text-xs text-slate-500">Enter passcode to view commercial order feeds.</p>
          </div>

          <div className="space-y-2">
            <input
              type="password"
              maxLength={4}
              value={pinInput}
              onChange={(e) => setPinInput(e.target.value)}
              placeholder="••••"
              className="w-full text-center tracking-widest text-lg font-bold px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-slate-900"
            />
            {pinError && (
              <p className="text-xs font-semibold text-red-500 text-center animate-pulse">
                ❌ Invalid Passcode. Try again.
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-slate-900 hover:bg-slate-800 text-white py-3 rounded-xl font-bold text-sm transition-colors cursor-pointer"
          >
            Unlock Dashboard
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 p-6 sm:p-8 text-slate-800">
      <div className="mx-auto max-w-7xl flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-slate-200 pb-5 mb-6 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 font-serif tracking-tight">Cake-On-Cake Administration</h1>
          <p className="text-sm text-slate-500 mt-1">Manage standard orders and artisan bespoke inquiry sheets.</p>
        </div>
        <button 
          onClick={loadData}
          className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm hover:bg-slate-50 cursor-pointer"
        >
          <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} /> Refresh Feed
        </button>
      </div>

      <div className="mx-auto max-w-7xl flex gap-4 mb-6">
        <button
          onClick={() => setActiveTab('orders')}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm border transition-all ${
            activeTab === 'orders'
              ? 'bg-slate-900 text-white border-slate-900'
              : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-100'
          }`}
        >
          <ShoppingBag className="w-4 h-4" /> Standard Orders ({orders.length})
        </button>
        <button
          onClick={() => setActiveTab('inquiries')}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm border transition-all ${
            activeTab === 'inquiries'
              ? 'bg-slate-900 text-white border-slate-900'
              : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-100'
          }`}
        >
          <Sparkles className="w-4 h-4" /> Custom Inquiries ({inquiries.length})
        </button>
      </div>

      <div className="mx-auto max-w-7xl">
        {loading ? (
          <div className="flex justify-center items-center h-64 text-slate-400">Loading master files...</div>
        ) : activeTab === 'orders' ? (
          <div className="grid gap-4">
            {orders.length === 0 ? (
              <p className="text-center py-12 bg-white rounded-xl text-slate-400 border">No store orders recorded.</p>
            ) : (
              orders.map((order) => (
                <div key={order.id} className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm flex flex-col md:flex-row justify-between gap-6">
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono bg-slate-100 px-2 py-0.5 rounded text-slate-500">ID: {order.id.slice(0,8)}</span>
                      <span className="text-xs px-2.5 py-0.5 font-bold rounded-full bg-blue-50 text-blue-700 border border-blue-100 uppercase">{order.status}</span>
                    </div>
                    <h3 className="text-lg font-bold text-slate-900">{order.customer_name}</h3>
                    <p className="text-sm text-slate-500">{order.delivery_address} • 📅 {order.delivery_date}</p>
                  </div>
                  <div className="text-right flex flex-col justify-center">
                    <span className="text-xs text-slate-400 font-bold uppercase">Total Due</span>
                    <span className="text-2xl font-black text-slate-900">${Number(order.total_amount).toFixed(2)}</span>
                  </div>
                </div>
              ))
            )}
          </div>
        ) : (
          <div className="grid gap-4">
            {inquiries.length === 0 ? (
              <p className="text-center py-12 bg-white rounded-xl text-slate-400 border">No custom sheets submitted yet.</p>
            ) : (
              inquiries.map((inquiry) => (
                <div key={inquiry.id} className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
                  <div className="flex justify-between items-start flex-wrap gap-2">
                    <div>
                      <span className="text-xs font-mono bg-amber-50 text-amber-700 border border-amber-100 px-2 py-0.5 rounded font-bold">🎂 {inquiry.tier_count} Tier Design</span>
                      <h3 className="text-lg font-bold text-slate-900 mt-1">{inquiry.customer_name}</h3>
                      <p className="text-sm text-slate-500">{inquiry.customer_email}</p>
                    </div>
                    <span className="text-xs text-slate-400 font-mono">{new Date(inquiry.created_at).toLocaleDateString()}</span>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 bg-slate-50 p-3 rounded-xl border border-slate-100 text-sm">
                    <div><span className="text-slate-400 font-medium block text-xs uppercase">Sponge Flavor</span><strong className="text-slate-700">{inquiry.cake_flavor}</strong></div>
                    <div><span className="text-slate-400 font-medium block text-xs uppercase">Outer Frosting</span><strong className="text-slate-700">{inquiry.frosting_layer || inquiry.frosting_flavor}</strong></div>
                  </div>

                  {inquiry.special_message && (
                    <div className="bg-amber-50/40 border border-amber-100 rounded-xl p-3">
                      <span className="text-xs font-bold text-amber-800 block mb-0.5">Inscription & Directions:</span>
                      <p className="text-sm text-amber-950 italic">&ldquo;{inquiry.special_message}&rdquo;</p>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
}
