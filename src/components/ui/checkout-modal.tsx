"use client";

import React, { useState } from "react";
import { useCart } from "@/lib/cart-context";
import { createOrder } from "@/lib/supabase";
import { X, Calendar, Clock, MapPin, Phone, User, Mail, CheckCircle2 } from "lucide-react";

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CheckoutModal({ isOpen, onClose }: CheckoutModalProps) {
  const { items, cartTotal, clearCart, setIsOpen: setCartOpen } = useCart();
  const [loading, setLoading] = useState(false);
  const [orderCompleted, setOrderCompleted] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    date: "",
    timeSlot: "10:00 AM - 01:00 PM",
  });

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const orderPayload = {
      customer_name: formData.name,
      customer_email: formData.email,
      customer_phone: formData.phone,
      delivery_address: formData.address,
      delivery_date: formData.date,
      delivery_time_slot: formData.timeSlot,
      total_amount: cartTotal,
    };

    const { error } = await createOrder(orderPayload, items);

    setLoading(false);
    if (!error) {
      setOrderCompleted(true);
      clearCart();
      setCartOpen(false);
    } else {
      alert("Something went wrong placing your order. Please try again!");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-xs" onClick={onClose} />

      <div className="relative w-full max-w-lg overflow-hidden rounded-2xl bg-[var(--card)] p-6 shadow-2xl border border-[var(--border)] animate-scale-in max-h-[90vh] flex flex-col">
        
        <div className="flex items-center justify-between border-b border-[var(--border)] pb-4 mb-4">
          <h2 className="text-xl font-bold text-[var(--foreground)] font-serif">
            {orderCompleted ? "Order Confirmed!" : "Complete Your Order 👩‍🍳"}
          </h2>
          <button onClick={onClose} className="rounded-full p-1 text-[var(--muted-fg)] hover:bg-[var(--primary-light)] hover:text-[var(--primary)] transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {orderCompleted ? (
          <div className="flex flex-col items-center justify-center py-8 text-center space-y-4">
            <CheckCircle2 className="w-16 h-16 text-emerald-500 animate-bounce" />
            <h3 className="text-lg font-bold">Your order has been baked into reality!</h3>
            <p className="text-sm text-[var(--muted-fg)] max-w-xs">
              Thank you for shopping with Cake-On-Cake! We have safely recorded your delivery preferences.
            </p>
            <button 
              onClick={() => { setOrderCompleted(false); onClose(); }}
              className="mt-4 px-6 py-2 bg-[var(--primary)] text-white text-sm font-semibold rounded-xl hover:opacity-90 transition-opacity"
            >
              Back to Storefront
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto pr-1 space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[var(--muted-fg)] mb-1">Full Name</label>
              <div className="relative">
                <User className="absolute left-3 top-2.5 h-4 w-4 text-[var(--muted-fg)]" />
                <input required type="text" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full pl-10 pr-3 py-2 text-sm bg-white border border-[var(--border)] rounded-xl focus:outline-hidden focus:border-[var(--primary)]" placeholder="Your Name" />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[var(--muted-fg)] mb-1">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-2.5 h-4 w-4 text-[var(--muted-fg)]" />
                  <input required type="email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} className="w-full pl-10 pr-3 py-2 text-sm bg-white border border-[var(--border)] rounded-xl focus:outline-hidden focus:border-[var(--primary)]" placeholder="you@example.com" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[var(--muted-fg)] mb-1">Phone Number</label>
                <div className="relative">
                  <Phone className="absolute left-3 top-2.5 h-4 w-4 text-[var(--muted-fg)]" />
                  <input required type="tel" value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} className="w-full pl-10 pr-3 py-2 text-sm bg-white border border-[var(--border)] rounded-xl focus:outline-hidden focus:border-[var(--primary)]" placeholder="(555) 000-0000" />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[var(--muted-fg)] mb-1">Delivery Address</label>
              <div className="relative">
                <MapPin className="absolute left-3 top-2.5 h-4 w-4 text-[var(--muted-fg)]" />
                <input required type="text" value={formData.address} onChange={(e) => setFormData({...formData, address: e.target.value})} className="w-full pl-10 pr-3 py-2 text-sm bg-white border border-[var(--border)] rounded-xl focus:outline-hidden focus:border-[var(--primary)]" placeholder="Street Address, Apartment, Suite" />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[var(--muted-fg)] mb-1">Delivery Date</label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-2.5 h-4 w-4 text-[var(--muted-fg)]" />
                  <input required type="date" value={formData.date} onChange={(e) => setFormData({...formData, date: e.target.value})} className="w-full pl-10 pr-3 py-2 text-sm bg-white border border-[var(--border)] rounded-xl focus:outline-hidden focus:border-[var(--primary)]" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[var(--muted-fg)] mb-1">Time Slot Preference</label>
                <div className="relative">
                  <Clock className="absolute left-3 top-2.5 h-4 w-4 text-[var(--muted-fg)]" />
                  <select value={formData.timeSlot} onChange={(e) => setFormData({...formData, timeSlot: e.target.value})} className="w-full pl-10 pr-3 py-2 text-sm bg-white border border-[var(--border)] rounded-xl focus:outline-hidden focus:border-[var(--primary)] appearance-none">
                    <option>09:00 AM - 12:00 PM</option>
                    <option>12:00 PM - 03:00 PM</option>
                    <option>03:00 PM - 06:00 PM</option>
                    <option>06:00 PM - 09:00 PM</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="border-t border-[var(--border)] pt-4 mt-6">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-semibold text-[var(--muted-fg)]">Total Amount Due</span>
                <span className="text-xl font-black text-[var(--primary)]">${cartTotal.toFixed(2)}</span>
              </div>
              <button 
                type="submit"
                disabled={loading}
                className="w-full rounded-xl bg-emerald-600 text-white py-3 text-sm font-semibold shadow-sm hover:bg-emerald-500 transition-colors disabled:opacity-50 cursor-pointer"
              >
                {loading ? "Processing Order..." : "Place Your Cake Order ✨"}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
