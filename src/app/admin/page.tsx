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
          <div className="grid gap-6 md:grid-cols-2">
            {inquiries.length === 0 ? (
              <p className="text-center py-12 bg-white rounded-xl text-slate-400 border col-span-2">
                No custom sheets submitted yet.
              </p>
            ) : (
              inquiries.map((inquiry) => {
                let previewImg = "https://images.unsplash.com/photo-1535141192574-5d4897c13636?q=80&w=600&auto=format&fit=crop";

                const baseFlavor = (inquiry.cake_flavor || "").toLowerCase();
                if (baseFlavor.includes("chocolate") || baseFlavor.includes("dark fudge")) {
                  previewImg = "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?q=80&w=600&auto=format&fit=crop";
                } else if (baseFlavor.includes("red velvet")) {
                  previewImg = "https://images.unsplash.com/photo-1616541823729-00fe0aacd32c?q=80&w=600&auto=format&fit=crop";
                } else if (baseFlavor.includes("lemon")) {
                  previewImg = "https://images.unsplash.com/photo-1488477181946-6428a0291777?q=80&w=600&auto=format&fit=crop";
                } else if (baseFlavor.includes("strawberry")) {
                  previewImg = "https://images.unsplash.com/photo-1565958011703-44f9829ba187?q=80&w=600&auto=format&fit=crop";
                }

                return (
                  <div key={inquiry.id} className="bg-white border border-slate-200 rounded-2xl shadow-sm hover:shadow-md transition-shadow overflow-hidden flex flex-col justify-between">
                    
                    <div>
                      <div className="relative h-40 w-full bg-slate-100">
                        <img 
                          src={previewImg} 
                          alt="Custom Spec Visualizer" 
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute top-3 left-3 bg-slate-900/80 backdrop-blur-sm text-white text-xs font-mono px-2.5 py-1 rounded-full font-bold shadow-sm">
                          🎂 {inquiry.tier_count} Tier Request
                        </div>
                        <div className="absolute top-3 right-3 bg-amber-500 text-white text-xs font-bold px-2.5 py-1 rounded-full uppercase tracking-wider shadow-sm">
                          {inquiry.status || 'pending'}
                        </div>
                      </div>

                      <div className="p-5 space-y-4">
                        <div>
                          <span className="text-xs font-mono text-slate-400 block mb-0.5">INQUIRY ID: #{inquiry.id.slice(0, 6)}</span>
                          <h3 className="text-xl font-bold text-slate-900 leading-tight">{inquiry.customer_name}</h3>
                          <p className="text-sm text-slate-500 font-medium">{inquiry.customer_email}</p>
                        </div>

                        <div className="grid grid-cols-2 gap-3 bg-slate-50 p-3 rounded-xl border border-slate-100 text-xs">
                          <div>
                            <span className="text-slate-400 font-semibold block text-[10px] uppercase tracking-wider">Sponge Foundation</span>
                            <strong className="text-slate-700 text-sm block mt-0.5">{inquiry.cake_flavor}</strong>
                          </div>
                          <div>
                            <span className="text-slate-400 font-semibold block text-[10px] uppercase tracking-wider">Outer Coating</span>
                            <strong className="text-slate-700 text-sm block mt-0.5">{inquiry.frosting_layer || inquiry.frosting_flavor}</strong>
                          </div>
                        </div>

                        {inquiry.special_message && (
                          <div className="bg-amber-50/50 border border-amber-100/60 rounded-xl p-3.5">
                            <span className="text-[10px] font-bold text-amber-800 uppercase tracking-wider block mb-1">Inscription Script / Notes:</span>
                            <p className="text-sm text-amber-950 italic font-medium leading-relaxed">
                              &ldquo;{inquiry.special_message}&rdquo;
                            </p>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="px-5 pb-5 pt-2 border-t border-slate-50 flex items-center justify-between text-xs text-slate-400 bg-slate-50/50">
                      <span>Submitted: {new Date(inquiry.created_at).toLocaleDateString()}</span>
                      <button className="text-slate-700 hover:text-slate-900 font-bold border border-slate-200 bg-white px-3 py-1.5 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer">
                        Mark Reviewed
                      </button>
                    </div>

                  </div>
                );
              })
            )}
          </div>
        )}
      </div>
    </div>
  );
}
