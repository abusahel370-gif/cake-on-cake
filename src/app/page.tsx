"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { 
  Truck, Award, Sparkles, ShieldCheck,
  MapPin, ChevronDown, ChevronUp, Instagram, Send, Phone, 
  Mail, MessageSquare, ShoppingBag, ArrowRight, UploadCloud 
} from "lucide-react";

const SEED_PRODUCTS = [
  { id: "c1", name: "Red Velvet Romance", price: 42.00, img: "https://images.unsplash.com/photo-1586788280802-941ac08994d5?q=80&w=600&auto=format&fit=crop", category: "Signature" },
  { id: "c2", name: "Classic Chocolate Fudge", price: 38.00, img: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?q=80&w=600&auto=format&fit=crop", category: "Signature" },
  { id: "c3", name: "Vanilla Bean Dream", price: 35.00, img: "https://images.unsplash.com/photo-1465014949162-e461f5408bc2?q=80&w=600&auto=format&fit=crop", category: "Pastries" },
  { id: "c4", name: "Strawberry Shortcake", price: 45.00, img: "https://images.unsplash.com/photo-1565958011703-44f9829ba187?q=80&w=600&auto=format&fit=crop", category: "Signature" },
  { id: "c5", name: "Lemon Blueberry Tart", price: 28.00, img: "https://images.unsplash.com/photo-1488477181946-6428a0291777?q=80&w=600&auto=format&fit=crop", category: "Pastries" },
  { id: "c6", name: "Matcha Green Tea Crepe", price: 48.00, img: "https://images.unsplash.com/photo-1536680465769-a36969fdfe70?q=80&w=600&auto=format&fit=crop", category: "Pastries" }
];

export default function CakeOnCakeStorefront() {
  const [products, setProducts] = useState<typeof SEED_PRODUCTS>([]);
  const [activeCategory, setActiveCategory] = useState("All");
  const [cartCount, setCartCount] = useState(0);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [emailInput, setEmailInput] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem("cake_store_products");
    if (saved) {
      setProducts(JSON.parse(saved));
    } else {
      setProducts(SEED_PRODUCTS);
    }
  }, []);

  const filteredProducts = activeCategory === "All" 
    ? products 
    : products.filter(p => p.category.toLowerCase() === activeCategory.toLowerCase());

  const addToBox = () => {
    setCartCount(prev => prev + 1);
  };

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (emailInput.trim()) {
      alert(`🎉 Welcome to the sweet life! Offers sent to: ${emailInput}`);
      setEmailInput("");
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#3E2723] font-sans antialiased selection:bg-[#D7CCC8]">
      
      {/* ─── NAVIGATION HEADER ─── */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-[#EFEBE9] px-4 sm:px-8 py-4 flex items-center justify-between shadow-xs">
        <Link href="/" className="flex items-center gap-2.5 group">
          <span className="text-2xl">🍰</span>
          <span className="font-black text-xl tracking-tight text-[#4E342E] group-hover:text-[#8D6E63] transition-colors">
            Cake-On-Cake <span className="text-[#A1887F] font-light text-sm">Store</span>
          </span>
        </Link>
        <div className="flex items-center gap-3">
          <Link href="/custom" className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 border border-[#EFEBE9] rounded-full text-xs font-bold text-[#5D4037] bg-[#FAF8F5] hover:bg-[#F5F2EB] transition-all">
            ✨ Design Custom Cake
          </Link>
          <Link href="/admin" className="inline-flex items-center gap-1.5 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-full text-xs font-bold transition-all">
            🛡️ Admin Desk
          </Link>
          <button onClick={() => alert("Reviewing your Dessert Box selection!")} className="inline-flex items-center gap-2 px-4 py-2 bg-[#4E342E] hover:bg-[#3E2723] text-white rounded-full text-xs font-bold transition-all shadow-xs relative">
            <ShoppingBag className="w-3.5 h-3.5" /> View Dessert Box
            {cartCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-[#D84315] text-white text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center border-2 border-white animate-scaleIn">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </header>

      {/* ─── MAIN HERO BRAND BANNER ─── */}
      <section className="bg-gradient-to-br from-[#4E342E] to-[#2D1B18] text-white py-16 px-6 text-center shadow-inner">
        <span className="bg-[#A1887F]/30 text-[#D7CCC8] text-[10px] uppercase font-black tracking-widest px-3 py-1 rounded-full border border-[#A1887F]/20">
          Artisanal Bakery Studio
        </span>
        <h2 className="text-4xl sm:text-5xl font-black tracking-tight mt-4 max-w-2xl mx-auto leading-tight">
          Freshly Baked Happiness Delivered To Your Doorstep
        </h2>
        <p className="text-[#D7CCC8] text-xs sm:text-sm max-w-md mx-auto mt-3 font-medium">
          Handcrafted luxury treats customized down to the last sugar crystalline petal detail.
        </p>
      </section>

      {/* ─── LIVE PRODUCTS GRID WORKSPACE ─── */}
      <main className="max-w-7xl mx-auto px-4 sm:px-8 py-12">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#EFEBE9] pb-6 mb-8">
          <div>
            <h3 className="text-2xl font-black text-[#3E2723] tracking-tight">Explore Our Masterpieces</h3>
            <p className="text-xs text-[#8D6E63] mt-0.5">Filter by recipe profile classes or discover modern tier compositions.</p>
          </div>
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            {["All", "Signature", "Pastries"].map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-1.5 rounded-full text-xs font-bold cursor-pointer transition-all shrink-0 ${
                  activeCategory === cat 
                    ? "bg-[#4E342E] text-white shadow-xs" 
                    : "bg-white text-[#6D4C41] border border-[#EFEBE9] hover:bg-[#FAF8F5]"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {filteredProducts.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-[#EFEBE9]">
            <span className="text-4xl block mb-2">🧁</span>
            <p className="text-sm font-bold text-[#8D6E63]">No gourmet cakes match this query right now.</p>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredProducts.map((cake) => (
              <div key={cake.id} className="group bg-white border border-[#EFEBE9]/80 rounded-3xl p-5 hover:shadow-xl hover:border-[#D7CCC8] transition-all flex flex-col justify-between">
                <div>
                  <div className="relative mb-4 overflow-hidden rounded-2xl bg-[#FAF7F2] aspect-video w-full flex items-center justify-center border border-[#EFEBE9]/40">
                    <img 
                      src={cake.img} 
                      alt={cake.name} 
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                      onError={(e) => { (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1578985545062-69928b1d9587?q=80&w=600&auto=format&fit=crop"; }}
                    />
                    <span className="absolute top-3 right-3 bg-white/95 backdrop-blur-xs px-2.5 py-0.5 rounded-md text-[10px] font-bold text-[#5D4037] border border-[#EFEBE9] shadow-2xs">
                      {cake.category}
                    </span>
                  </div>
                  <h4 className="font-black text-[#3E2723] text-base tracking-tight group-hover:text-[#7A5C53] transition-colors">{cake.name}</h4>
                  <div className="text-xl font-black text-[#2E1C1A] mt-1">${cake.price.toFixed(2)}</div>
                </div>
                <button onClick={addToBox} className="mt-5 w-full bg-[#FAF6F0] hover:bg-[#4E342E] text-[#5D4037] hover:text-white font-bold py-3 px-4 rounded-xl text-xs transition-all tracking-wide flex items-center justify-center gap-2 border border-[#EFEBE9] cursor-pointer">
                  Add to Box
                </button>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* ─── 1. WHY CHOOSE US ─── */}
      <section className="bg-white border-y border-[#EFEBE9] py-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h3 className="text-2xl font-black tracking-tight text-[#3E2723]">Why Choose Cake-On-Cake</h3>
          <p className="text-xs text-[#8D6E63] mt-1">We treat confectionery as fine art and focus on premium execution.</p>
          
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 mt-10">
            {[
              { icon: Truck, title: "Same Day Delivery", desc: "Freshly boxed and transported in climate-controlled logic fleets.", color: "text-amber-600 bg-amber-50" },
              { icon: Sparkles, title: "Freshly Baked Daily", desc: "Whipped into shape from scratch only hours before deployment.", color: "text-rose-600 bg-rose-50" },
              { icon: Award, title: "Premium Ingredients", desc: "Organic butter churns, pure vanilla bean pods, and gourmet dark cacao.", color: "text-emerald-600 bg-emerald-50" },
              { icon: ShieldCheck, title: "Secure Payments", desc: "Fully protected, 256-bit encrypted transactions for smooth processing.", color: "text-blue-600 bg-blue-50" },
            ].map((item, idx) => (
              <div key={idx} className="bg-[#FAF8F5] p-6 rounded-2xl border border-[#EFEBE9]/60 text-left space-y-3">
                <div className={`p-3 rounded-xl w-fit ${item.color}`}><item.icon className="w-5 h-5" /></div>
                <h4 className="font-bold text-sm text-[#3E2723]">{item.title}</h4>
                <p className="text-xs text-[#6D4C41] leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 2. SHOP BY OCCASION ─── */}
      <section className="py-16 px-4 max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <h3 className="text-2xl font-black tracking-tight text-[#3E2723]">Shop By Occasion</h3>
          <p className="text-xs text-[#8D6E63] mt-1">Perfect sweet accents tailored for life&apos;s beautiful milestones.</p>
        </div>
        <div className="grid gap-4 grid-cols-2 lg:grid-cols-6">
          {[
            { label: "Birthday Cakes", emoji: "🎁", img: "https://images.unsplash.com/photo-1533410543004-3438c155d358?q=80&w=400&auto=format&fit=crop" },
            { label: "Anniversary Cakes", emoji: "💖", img: "https://images.unsplash.com/photo-1511018556340-d16986a1c194?q=80&w=400&auto=format&fit=crop" },
            { label: "Wedding Cakes", emoji: "💍", img: "https://images.unsplash.com/photo-1522683280249-02ece792881a?q=80&w=400&auto=format&fit=crop" },
            { label: "Baby Shower", emoji: "🍼", img: "https://images.unsplash.com/photo-1519340333755-56e87a7d402e?q=80&w=400&auto=format&fit=crop" },
            { label: "Graduation", emoji: "🎓", img: "https://images.unsplash.com/photo-1546173159-315724a31696?q=80&w=400&auto=format&fit=crop" },
            { label: "Valentine's", emoji: "🌹", img: "https://images.unsplash.com/photo-1570784294677-ae52e421FA65?q=80&w=400&auto=format&fit=crop" }
          ].map((occ, i) => (
            <div key={i} className="group relative h-44 rounded-2xl overflow-hidden border border-[#EFEBE9] cursor-pointer shadow-xs">
              <img src={occ.img} alt={occ.label} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#2E1C1A]/90 via-[#2E1C1A]/40 to-transparent flex flex-col justify-end p-3 text-white">
                <span className="text-xl mb-1">{occ.emoji}</span>
                <span className="font-bold text-xs tracking-tight">{occ.label}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ─── 3. CUSTOM CAKE BANNER SECTION ─── */}
      <section className="px-4 max-w-7xl mx-auto mb-16">
        <div className="bg-gradient-to-r from-[#DFD3C3] via-[#F4EAE1] to-[#E7DEC9] border border-[#D7CCC8] rounded-3xl p-8 sm:p-12 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6 shadow-xs">
          <div className="absolute -right-10 -bottom-10 text-9xl opacity-10 select-none">🎂</div>
          <div className="space-y-3 text-center md:text-left max-w-lg">
            <span className="bg-[#4E342E] text-white text-[9px] uppercase font-black tracking-widest px-2.5 py-1 rounded-md">Creative Freedom</span>
            <h3 className="text-3xl font-black text-[#3E2723] tracking-tight">Design Your Dream Cake</h3>
            <p className="text-xs text-[#5D4037] font-medium leading-relaxed">
              Upload your reference sketch layouts, pick your personalized frosting fillings, and our cake masters will bake it precisely how you want.
            </p>
          </div>
          <Link href="/custom" className="bg-[#4E342E] hover:bg-[#3E2723] text-white text-xs font-bold px-6 py-3.5 rounded-xl transition-all shadow-md flex items-center gap-2 shrink-0 group">
            <UploadCloud className="w-4 h-4" /> Create Custom Cake <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>
      </section>

      {/* ─── 4. CUSTOMER REVIEWS ─── */}
      <section className="bg-white border-y border-[#EFEBE9] py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10">
            <h3 className="text-2xl font-black tracking-tight text-[#3E2723]">Loved By Sweet Lovers</h3>
            <p className="text-xs text-[#8D6E63] mt-1">Real verified testimonials left by our sweet-toothed community.</p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { review: "Best chocolate cake in town! Pure richness.", author: "Rohan M.", loc: "Kochi" },
              { review: "Delivered on time and tasted absolutely amazing.", author: "Anjali K.", loc: "Kozhikode" },
              { review: "The Red Velvet variant made our anniversary complete.", author: "Sneha P.", loc: "Kannur" },
              { review: "Incredibly moist texture, not overly sweet. Pure balance.", author: "David E.", loc: "Thrissur" },
              { review: "Beautiful execution on custom requirements.", author: "Meera J.", loc: "Wayanad" },
              { review: "The frosting details were breathtaking.", author: "Arjun S.", loc: "Malappuram" },
              { review: "Secure payment setup and wonderful packaging support.", author: "Gautham B.", loc: "Kochi" },
              { review: "Same day dispatch loop worked flawlessly.", author: "Tina L.", loc: "Thrissur" }
            ].map((rev, i) => (
              <div key={i} className="bg-[#FAF8F5] border border-[#EFEBE9]/60 p-5 rounded-2xl flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <div className="text-amber-500 text-xs">⭐⭐⭐⭐⭐</div>
                  <p className="text-xs text-[#4E342E] font-medium leading-relaxed italic">&ldquo;{rev.review}&rdquo;</p>
                </div>
                <div className="text-[10px] text-[#8D6E63] font-bold border-t border-[#EFEBE9] pt-2 flex justify-between">
                  <span>— {rev.author}</span>
                  <span className="text-amber-800 font-normal">📍 {rev.loc}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 5. DELIVERY LOCATIONS ─── */}
      <section className="py-12 px-4 max-w-7xl mx-auto text-center border-b border-[#EFEBE9]">
        <span className="text-[10px] uppercase font-black tracking-widest text-[#A1887F] block mb-2">Regional Logistics Map</span>
        <h4 className="text-sm font-bold text-[#3E2723] flex items-center justify-center gap-1.5 mb-4">
          <MapPin className="w-4 h-4 text-rose-600" /> We Promptly Deliver Across:
        </h4>
        <div className="flex flex-wrap items-center justify-center gap-2 max-w-2xl mx-auto">
          {["Kozhikode", "Malappuram", "Kannur", "Wayanad", "Kochi", "Thrissur"].map((loc) => (
            <span key={loc} className="bg-white border border-[#EFEBE9] px-4 py-1.5 rounded-full text-xs font-bold text-[#5D4037] hover:border-[#A1887F] transition-colors shadow-2xs">
              {loc}
            </span>
          ))}
        </div>
      </section>

      {/* ─── 6. SPECIAL OFFERS ─── */}
      <section className="py-16 px-4 max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <h3 className="text-2xl font-black tracking-tight text-[#3E2723]">Exclusive Special Offers</h3>
          <p className="text-xs text-[#8D6E63] mt-1">Unlock sweet value rates on our flagship artisanal recipe sheets.</p>
        </div>
        <div className="grid gap-6 sm:grid-cols-3">
          {[
            { deal: "20% OFF Birthday Cakes", terms: "Use code BDAY20 on final review window.", color: "from-[#FDF2F2] to-[#FDE8E8] border-red-200 text-red-900" },
            { deal: "Buy 2 Get 1 Free Cupcakes", terms: "Valid on all custom pastry configurations.", color: "from-[#F0FDF4] to-[#DCFCE7] border-emerald-200 text-emerald-900" },
            { deal: "Free Delivery Above ₹999", terms: "Automatically applied at regional checkout loops.", color: "from-[#EFF6FF] to-[#DBEAFE] border-blue-200 text-blue-900" }
          ].map((off, i) => (
            <div key={i} className={`bg-gradient-to-br ${off.color} border p-6 rounded-2xl relative overflow-hidden flex flex-col justify-between h-32`}>
              <div className="absolute right-2 top-2 text-4xl opacity-10 font-bold font-mono">0{i+1}</div>
              <h4 className="font-black text-base tracking-tight">{off.deal}</h4>
              <p className="text-[11px] opacity-80 font-medium">{off.terms}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ─── 7. FAQ ACCORDION SECTION ─── */}
      <section className="bg-white border-y border-[#EFEBE9] py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <h3 className="text-2xl font-black tracking-tight text-[#3E2723]">Frequently Asked Questions</h3>
            <p className="text-xs text-[#8D6E63] mt-1">Got catalog or distribution inquiries? We have quick answers.</p>
          </div>
          <div className="space-y-3">
            {[
              { q: "How do I place an order?", a: "Simply browse our active storefront products grid, tap 'Add to Box' on your selected items, and confirm your selection via the checkout sequence." },
              { q: "Do you offer same-day delivery?", a: "Yes! All local bakery operations across our listed delivery networks support safe fulfillment for orders completed before 4:00 PM." },
              { q: "Can I customize my cake design specification?", a: "Absolutely. Tap our Design Custom Cake layout tab to submit reference graphics, text messages, and pick alternative layer options." },
              { q: "What payment methods are securely accepted?", a: "We support major Credit/Debit processing cards, secure modern wallet systems, Net Banking paths, and local UPI rails." }
            ].map((faq, idx) => (
              <div key={idx} className="border border-[#EFEBE9] rounded-xl overflow-hidden bg-[#FAF8F5]">
                <button onClick={() => toggleFaq(idx)} className="w-full flex items-center justify-between p-4 text-left font-bold text-xs sm:text-sm text-[#3E2723] hover:bg-[#F5F2EB] transition-colors cursor-pointer">
                  <span>{faq.q}</span>
                  {openFaq === idx ? <ChevronUp className="w-4 h-4 text-[#8D6E63]" /> : <ChevronDown className="w-4 h-4 text-[#8D6E63]" />}
                </button>
                {openFaq === idx && (
                  <div className="p-4 bg-white border-t border-[#EFEBE9] text-xs text-[#5D4037] leading-relaxed animate-fadeIn">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 8. INSTAGRAM GALLERY ─── */}
      <section className="py-16 px-4 max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <h3 className="text-2xl font-black tracking-tight text-[#3E2723] flex items-center justify-center gap-1.5">
            <Instagram className="w-5 h-5 text-pink-600" /> Instagram Gallery
          </h3>
          <p className="text-xs text-[#8D6E63] mt-1">Tag <span className="underline font-bold">@CakeOnCake</span> to get featured on our live community feed grid!</p>
        </div>
        <div className="grid gap-3 grid-cols-2 sm:grid-cols-4 lg:grid-cols-8">
          {[
            "https://images.unsplash.com/photo-1578985545062-69928b1d9587?q=80&w=300",
            "https://images.unsplash.com/photo-1586788280802-941ac08994d5?q=80&w=300",
            "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?q=80&w=300",
            "https://images.unsplash.com/photo-1465014949162-e461f5408bc2?q=80&w=300",
            "https://images.unsplash.com/photo-1565958011703-44f9829ba187?q=80&w=300",
            "https://images.unsplash.com/photo-1488477181946-6428a0291777?q=80&w=300",
            "https://images.unsplash.com/photo-1536680465769-a36969fdfe70?q=80&w=300",
            "https://images.unsplash.com/photo-1557925923-cd4648e21187?q=80&w=300"
          ].map((url, i) => (
            <div key={i} className="group relative aspect-square rounded-xl overflow-hidden bg-slate-100 border border-[#EFEBE9] cursor-crosshair">
              <img src={url} alt="Insta Cake" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-115" />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-xs font-bold">
                ❤️ Like
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ─── 9. NEWSLETTER SUBSCRIPTION ─── */}
      <section className="bg-[#4E342E] text-white py-12 px-4 text-center">
        <div className="max-w-md mx-auto space-y-3">
          <h3 className="text-xl font-black tracking-tight">Get Exclusive Cake Offers</h3>
          <p className="text-xs text-[#D7CCC8]">Join our secret distribution ring to receive unique discount coupon codes weekly.</p>
          <form onSubmit={handleSubscribe} className="flex items-center gap-2 mt-4 bg-white/10 p-1.5 rounded-xl border border-white/10">
            <input 
              type="email" 
              required
              placeholder="Enter your email address" 
              value={emailInput}
              onChange={(e) => setEmailInput(e.target.value)}
              className="w-full text-xs px-3 py-2 bg-transparent text-white placeholder-white/50 focus:outline-none font-medium"
            />
            <button type="submit" className="bg-white hover:bg-[#FAF8F5] text-[#4E342E] font-black text-xs px-4 py-2 rounded-lg transition-colors flex items-center gap-1 cursor-pointer">
              <Send className="w-3 h-3" /> Subscribe
            </button>
          </form>
        </div>
      </section>

      {/* ─── 10. FOOTER ─── */}
      <footer className="bg-[#1E110E] text-[#D7CCC8] pt-16 pb-8 px-6 sm:px-8 border-t border-[#3E2723]">
        <div className="max-w-7xl mx-auto grid gap-8 grid-cols-2 md:grid-cols-5 border-b border-[#3E2723] pb-12 text-xs">
          
          <div className="space-y-3 col-span-2 md:col-span-1">
            <h4 className="text-white font-black text-lg tracking-tight">Cake-On-Cake</h4>
            <p className="text-[#A1887F] font-medium leading-relaxed max-w-xs">
              Freshly baked happiness delivered straight to your doorstep across select local distribution corridors.
            </p>
          </div>

          <div className="space-y-3">
            <h5 className="text-white font-black uppercase text-[10px] tracking-wider text-amber-400">Quick Links</h5>
            <ul className="space-y-2 font-medium">
              <li><Link href="/" className="hover:text-white transition-colors">Home Storefront</Link></li>
              <li><button onClick={() => alert("Loading standard products collection...")} className="hover:text-white transition-colors text-left cursor-pointer">Shop Catalog</button></li>
              <li><Link href="/custom" className="hover:text-white transition-colors">Custom Cakes</Link></li>
              <li><span className="opacity-60 cursor-not-allowed">About Bakery Studio</span></li>
              <li><span className="opacity-60 cursor-not-allowed">Contact Us</span></li>
            </ul>
          </div>

          <div className="space-y-3">
            <h5 className="text-white font-black uppercase text-[10px] tracking-wider text-amber-400">Customer Support</h5>
            <ul className="space-y-2 font-medium">
              <li><button onClick={() => setOpenFaq(0)} className="hover:text-white transition-colors text-left cursor-pointer">FAQs Guide</button></li>
              <li><span className="opacity-60 cursor-not-allowed">Track Order State</span></li>
              <li><span className="opacity-60 cursor-not-allowed">Returns & Claims Policy</span></li>
              <li><span className="opacity-60 cursor-not-allowed">Terms of Service</span></li>
            </ul>
          </div>

          <div className="space-y-3">
            <h5 className="text-white font-black uppercase text-[10px] tracking-wider text-amber-400">Contact</h5>
            <ul className="space-y-2 font-medium text-[#A1887F]">
              <li className="flex items-center gap-1.5"><Phone className="w-3.5 h-3.5 text-amber-500" /> +91 98765 43210</li>
              <li className="flex items-center gap-1.5"><Mail className="w-3.5 h-3.5 text-amber-500" /> support@cakeoncake.com</li>
              <li className="flex items-center gap-1.5"><MessageSquare className="w-3.5 h-3.5 text-emerald-500" /> WhatsApp Support</li>
            </ul>
          </div>

          <div className="space-y-3">
            <h5 className="text-white font-black uppercase text-[10px] tracking-wider text-amber-400">Social Media</h5>
            <ul className="space-y-2 font-medium">
              <li><span className="hover:text-white cursor-pointer transition-colors block">📸 Instagram Feed</span></li>
              <li><span className="hover:text-white cursor-pointer transition-colors block">📘 Facebook Profile</span></li>
              <li><span className="hover:text-white cursor-pointer transition-colors block">▶️ YouTube Studio Channel</span></li>
            </ul>
          </div>

        </div>

        <div className="max-w-7xl mx-auto pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-[#8D6E63] font-medium">
          <p>© 2026 Cake-On-Cake Confectionery Studio. All rights reserved.</p>
          <p>Handcrafted using Next.js & Tailwind CSS frameworks.</p>
        </div>
      </footer>

    </div>
  );
}
