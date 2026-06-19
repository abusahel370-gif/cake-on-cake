"use client";

import React, { useState } from "react";
import { useCart } from "@/lib/cart-context";
import { X, Plus, Minus, ShoppingBag } from "lucide-react";
import { CheckoutModal } from "./checkout-modal";

export function CartDrawer() {
  const { isOpen, setIsOpen, items, updateQuantity, removeFromCart, cartTotal } = useCart();
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 z-50 overflow-hidden">
        <div className="absolute inset-0 bg-black/40 backdrop-blur-xs transition-opacity" onClick={() => setIsOpen(false)} />
        <div className="absolute inset-y-0 right-0 flex max-w-full pl-10">
          <div className="w-screen max-w-md transform bg-[var(--card)] p-6 shadow-2xl transition-all h-full flex flex-col border-l border-[var(--border)]">
            <div className="flex items-center justify-between border-b border-[var(--border)] pb-4">
              <h2 className="text-lg font-bold font-serif text-[var(--foreground)] flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-[var(--primary)]" /> Your Dessert Box
              </h2>
              <button onClick={() => setIsOpen(false)} className="rounded-full p-1 text-[var(--muted-fg)] hover:bg-[var(--primary-light)] transition-colors cursor-pointer">
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto py-4 space-y-4">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-64 text-center text-[var(--muted-fg)]">
                  <span className="text-4xl mb-2">🎂</span>
                  <p className="font-medium text-base">Your box is completely empty!</p>
                </div>
              ) : (
                items.map((item) => (
                  <div key={item.product.id} className="flex items-center gap-4 p-2 rounded-xl border border-[var(--border)] bg-[var(--primary-light)]/40">
                    <div className="w-16 h-16 rounded-lg bg-[var(--muted)] flex items-center justify-center text-2xl shrink-0">🍰</div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-bold text-sm text-[var(--foreground)] truncate">{item.product.name}</h4>
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-sm font-extrabold text-[var(--primary)]">${(item.product.price * item.quantity).toFixed(2)}</span>
                        <div className="flex items-center gap-2 border border-[var(--border)] bg-white rounded-lg px-2 py-1">
                          <button onClick={() => updateQuantity(item.product.id, item.quantity - 1)} className="text-[var(--primary)] cursor-pointer"><Minus className="w-3 h-3" /></button>
                          <span className="text-xs font-bold w-4 text-center">{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.product.id, item.quantity + 1)} className="text-[var(--primary)] cursor-pointer"><Plus className="w-3 h-3" /></button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {items.length > 0 && (
              <div className="border-t border-[var(--border)] pt-4 mt-auto">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm font-medium text-[var(--muted-fg)]">Subtotal Amount</span>
                  <span className="text-xl font-black text-[var(--foreground)]">${cartTotal.toFixed(2)}</span>
                </div>
                <button 
                  onClick={() => setIsCheckoutOpen(true)}
                  className="w-full rounded-xl bg-[var(--primary)] text-white py-3 text-sm font-semibold shadow-sm hover:opacity-90 transition-opacity cursor-pointer"
                >
                  Proceed to Checkout 🚀
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <CheckoutModal isOpen={isCheckoutOpen} onClose={() => setIsCheckoutOpen(false)} />
    </>
  );
}
