"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Sparkles, Cake } from "lucide-react";
import { supabase } from "@/lib/supabase";

export default function CustomOrderPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    flavor: "Vanilla Sponge",
    frosting: "Vanilla Buttercream",
    tiers: 1,
    message: ""
  });
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    const submitData = {
      customer_name: formData.name,
      customer_email: formData.email,
      cake_flavor: formData.flavor,
      frosting_flavor: formData.frosting,
      tier_count: Number(formData.tiers),
      special_message: formData.message
    };

    const targetTable = supabase ? supabase.from("custom_inquiries") : null;

    if (targetTable) {
      const { error } = await targetTable.insert([submitData]);
      if (error) {
        alert("Something went wrong submitting your design inquiry: " + error.message);
        setSubmitting(false);
        return;
      }
    } else {
      console.log("Mock saved inquiry data:", submitData);
    }

    setSuccess(true);
    setSubmitting(false);
  };

  if (success) {
    return (
      <div className="min-h-screen bg-[#FAF7F2] flex items-center justify-center p-6 text-center">
        <div className="max-w-md bg-white border border-[#EFEBE9] p-8 rounded-2xl shadow-sm space-y-4">
          <div className="text-5xl">✨🎂✨</div>
          <h1 className="text-2xl font-bold text-[#4E342E]">Design Sheet Submitted!</h1>
          <p className="text-sm text-[#795548]">
            Our head pastry artisans are reviewing your custom layout details. Keep an eye on your inbox at <strong className="text-[#4E342E]">{formData.email}</strong> for pricing quotes!
          </p>
          <div className="pt-4">
            <Link href="/" className="inline-flex items-center gap-2 text-sm font-bold text-[#8D6E63] hover:text-[#795548]">
              <ArrowLeft className="w-4 h-4" /> Return to Storefront
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#3E2723] p-6 sm:p-12">
      <div className="max-w-xl mx-auto">
        
        <Link href="/" className="inline-flex items-center gap-2 text-sm font-semibold text-[#8D6E63] hover:text-[#795548] mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to menu showcase
        </Link>

        <div className="bg-white rounded-2xl border border-[#EFEBE9] p-6 sm:p-10 shadow-sm space-y-6">
          <div className="flex items-center gap-3 border-b border-[#FAF7F2] pb-4">
            <div className="bg-[#FAF7F2] p-3 rounded-xl text-[#8D6E63]">
              <Cake className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-[#4E342E]">Bespoke Cake Designer</h1>
              <p className="text-xs text-[#795548]">Draft custom tier sheets, sizes, and event coatings.</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-[#795548]">Your Name</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="Alex Morgan"
                  className="w-full px-4 py-2.5 rounded-xl border border-[#D7CCC8] bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#8D6E63]"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-[#795548]">Email Address</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  placeholder="alex@example.com"
                  className="w-full px-4 py-2.5 rounded-xl border border-[#D7CCC8] bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#8D6E63]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-[#795548]">Cake Base Sponge</label>
                <select
                  value={formData.flavor}
                  onChange={(e) => setFormData(prev => ({ ...prev, flavor: e.target.value }))}
                  className="w-full px-4 py-2.5 rounded-xl border border-[#D7CCC8] bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#8D6E63]"
                >
                  <option>Vanilla Sponge</option>
                  <option>Decadent Dark Fudge</option>
                  <option>Zesty Lemon Zest</option>
                  <option>Rich Red Velvet</option>
                  <option>Spiced Carrot Walnut</option>
                </select>
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-[#795548]">Outer Frosting Layer</label>
                <select
                  value={formData.frosting}
                  onChange={(e) => setFormData(prev => ({ ...prev, frosting: e.target.value }))}
                  className="w-full px-4 py-2.5 rounded-xl border border-[#D7CCC8] bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#8D6E63]"
                >
                  <option>Vanilla Buttercream</option>
                  <option>Cream Cheese Frosting</option>
                  <option>Swiss Meringue Whipped</option>
                  <option>Chocolate Ganache Glaze</option>
                  <option>Smooth Rolled Fondant</option>
                </select>
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-[#795548]">Tier Count Selector ({formData.tiers} Layer{formData.tiers > 1 ? "s" : ""})</label>
              <div className="flex gap-3">
                {[1, 2, 3, 4].map((t) => (
                  <button
                    type="button"
                    key={t}
                    onClick={() => setFormData(prev => ({ ...prev, tiers: t }))}
                    className={`flex-1 py-2.5 rounded-xl border font-bold text-sm transition-all ${
                      formData.tiers === t
                        ? "bg-[#5D4037] text-white border-[#5D4037] shadow-sm scale-102"
                        : "bg-white text-[#5D4037] border-[#D7CCC8] hover:bg-[#FAF7F2]"
                    }`}
                  >
                    {t} Tier{t > 1 ? "s" : ""}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-[#795548]">Script Inscriptions & Special Requests</label>
              <textarea
                rows={4}
                value={formData.message}
                onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                placeholder="Write message inscriptions here (e.g., 'Happy 30th Birthday Chloe!'). Specify any custom themes, colors, or structural delivery details."
                className="w-full px-4 py-3 rounded-xl border border-[#D7CCC8] bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#8D6E63] placeholder-[#A1887F] resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full bg-[#8D6E63] hover:bg-[#795548] text-white py-3.5 rounded-xl font-bold text-sm shadow-sm transition-colors flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
            >
              <Sparkles className="w-4 h-4" /> {submitting ? "Transmitting Specs..." : "Submit Design Inquiry Sheet"}
            </button>

          </form>
        </div>

      </div>
    </div>
  );
}
