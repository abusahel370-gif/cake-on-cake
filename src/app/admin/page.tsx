"use client";

import React, { useEffect, useState } from "react";
import { getAdminOrders, getCustomInquiries } from "@/lib/supabase";
import { RefreshCw, Sparkles, ShoppingBag, Lock, Calendar, Mail } from "lucide-react";

export default function AdminDashboard() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [orders, setOrders] = useState<any[]>([]);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [inquiries, setInquiries] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState<'orders' | 'inquiries'>('orders');
  const [loading, setLoading] = useState(true);
  
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
      <div className="min-h-screen bg-[#1E293B] flex items-center justify-center p-6">
        <form onSubmit={handlePinSubmit} className="bg-white p-8 rounded-2xl shadow-xl max-w-sm w-full space-y-6 border border-slate-100">
          <div className="text-center space-y-2">
            <div className="mx-auto w-12 h-12 bg-amber-50 text-amber-700 rounded-full flex items-center justify-center">
              <Lock className="w-5 h-5" />
            </div>
            <h2 className="text-xl font-bold text-slate-900">Admin Authentication</h2>
            <p className="text-xs text-slate-500">Enter pin to open the order streams.</p>
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
                ❌ Invalid Passcode.
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
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Cake-On-Cake Administration</h1>
          <p className="text-sm text-slate-500 mt-1">Review standard checkouts and incoming design sheets.</p>
        </div>
        <button 
          onClick={loadData}
          className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm hover:bg-slate-50 cursor-pointer"
        >
          <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} /> Refresh Feed
        </button>
      </div>

      <div className="mx-auto max-w-7xl flex gap-4 mb-8">
        <button
          onClick={() => setActiveTab('orders')}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm border transition-all cursor-pointer ${
            activeTab === 'orders'
              ? 'bg-slate-900 text-white border-slate-900 shadow-sm'
              : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-100'
          }`}
        >
          <ShoppingBag className="w-4 h-4" /> Standard Orders ({orders.length})
        </button>
        <button
          onClick={() => setActiveTab('inquiries')}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm border transition-all cursor-pointer ${
            activeTab === 'inquiries'
              ? 'bg-slate-900 text-white border-slate-900 shadow-sm'
              : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-100'
          }`}
        >
          <Sparkles className="w-4 h-4" /> Custom Inquiries ({inquiries.length})
        </button>
      </div>

      <div className="mx-auto max-w-7xl">
        {loading ? (
          <div className="flex justify-center items-center h-64 text-slate-400 font-medium">
            Synchronizing data layers...
          </div>
        ) : activeTab === 'orders' ? (
          <div className="grid gap-4">
            {orders.length === 0 ? (
              <p className="text-center py-12 bg-white rounded-xl text-slate-400 border">No store orders recorded.</p>
            ) : (
              orders.map((order) => (
                <div key={order.id} className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm flex flex-col md:flex-row justify-between gap-6 items-start md:items-center">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-xs font-mono bg-slate-100 px-2 py-0.5 rounded text-slate-500">ID: {order.id.slice(0,8)}</span>
                      <span className="text-xs px-2.5 py-0.5 font-bold rounded-full bg-blue-50 text-blue-700 border border-blue-100 uppercase">{order.status}</span>
                    </div>
                    <h3 className="text-lg font-bold text-slate-900">{order.customer_name}</h3>
                    <p className="text-sm text-slate-500">{order.delivery_address} • 📅 {order.delivery_date}</p>
                  </div>
                  <div className="text-left md:text-right flex flex-col justify-center">
                    <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">Total Amount</span>
                    <span className="text-2xl font-black text-slate-900">${Number(order.total_amount).toFixed(2)}</span>
                  </div>
                </div>
              ))
            )}
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {inquiries.length === 0 ? (
              <p className="text-center py-12 bg-white rounded-xl text-slate-400 border sm:col-span-2 lg:col-span-3">
                No custom specs submitted yet.
              </p>
            ) : (
              inquiries.map((inquiry) => {
                let profileImg = "https://images.unsplash.com/photo-1535141192574-5d4897c13636?q=80&w=600&auto=format&fit=crop";
                const flavorLower = (inquiry.cake_flavor || "").toLowerCase();
                
                if (flavorLower.includes("velvet")) {
                  profileImg = "https://images.unsplash.com/photo-1616541823729-00fe0aacd32c?q=80&w=600&auto=format&fit=crop";
                } else if (flavorLower.includes("chocolate") || flavorLower.includes("fudge")) {
                  profileImg = "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?q=80&w=600&auto=format&fit=crop";
                } else if (flavorLower.includes("lemon")) {
                  profileImg = "https://images.unsplash.com/photo-1488477181946-6428a0291777?q=80&w=600&auto=format&fit=crop";
                } else if (flavorLower.includes("strawberry")) {
                  profileImg = "https://images.unsplash.com/photo-1565958011703-44f9829ba187?q=80&w=600&auto=format&fit=crop";
                }

                return (
                  <div key={inquiry.id} className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden flex flex-col justify-between hover:shadow-md transition-shadow duration-200">
                    <div>
                      <div className="relative h-44 w-full bg-slate-100">
                        <img 
                          src={profileImg} 
                          alt="Cake Configuration Preview" 
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute top-3 left-3 bg-slate-900/80 backdrop-blur-sm text-white text-xs font-bold px-2.5 py-1 rounded-full shadow-sm">
                          🎂 {inquiry.tier_count} Tier{inquiry.tier_count > 1 ? 's' : ''}
                        </div>
                        <div className="absolute top-3 right-3 bg-amber-500 text-white text-[10px] font-bold tracking-wider uppercase px-2 py-0.5 rounded shadow-sm">
                          New Spec
                        </div>
                      </div>

                      <div className="p-5 space-y-4">
                        <div>
                          <h3 className="text-xl font-bold text-slate-900 tracking-tight">{inquiry.customer_name}</h3>
                          <div className="flex items-center gap-1.5 text-slate-500 text-xs mt-1 font-medium">
                            <Mail className="w-3.5 h-3.5 text-slate-400" />
                            <span>{inquiry.customer_email}</span>
                          </div>
                        </div>

                        <div className="space-y-2 border-t border-slate-100 pt-3">
                          <div className="flex justify-between text-xs items-center">
                            <span className="text-slate-400 font-semibold uppercase tracking-wider text-[10px]">Base Sponge</span>
                            <span className="text-slate-800 font-bold bg-slate-100 px-2 py-0.5 rounded">{inquiry.cake_flavor}</span>
                          </div>
                          <div className="flex justify-between text-xs items-center">
                            <span className="text-slate-400 font-semibold uppercase tracking-wider text-[10px]">Outer Frosting</span>
                            <span className="text-slate-800 font-bold bg-slate-100 px-2 py-0.5 rounded">{inquiry.frosting_flavor || inquiry.frosting_layer}</span>
                          </div>
                        </div>

                        {inquiry.special_message && (
                          <div className="bg-amber-50/50 border border-amber-100 rounded-xl p-3">
                            <span className="text-[10px] font-bold text-amber-800 uppercase tracking-wider block mb-1">Script Inscription:</span>
                            <p className="text-xs text-amber-950 italic font-medium leading-relaxed">
                              &ldquo;{inquiry.special_message}&rdquo;
                            </p>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="p-4 border-t border-slate-100 bg-slate-50 flex items-center justify-between text-[11px] text-slate-400 font-medium">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5" />
                        {new Date(inquiry.created_at).toLocaleDateString()}
                      </span>
                      <button className="bg-white border border-slate-200 text-slate-700 font-bold px-3 py-1.5 rounded-lg hover:bg-slate-100 hover:text-slate-950 transition-colors cursor-pointer">
                        Mark Approved
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
