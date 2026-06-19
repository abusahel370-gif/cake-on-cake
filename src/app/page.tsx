"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { 
  Truck, Award, Sparkles, ShieldCheck,
  MapPin, ChevronDown, ChevronUp, Instagram, Send, Phone, 
  Mail, ShoppingBag, ArrowRight, UploadCloud, X, Trash2, Star
} from "lucide-react";

interface Product {
  id: string;
  name: string;
  price: number;
  img: string;
  category: string;
}

interface CartItem extends Product {
  quantity: number;
}

interface Review {
  review: string;
  author: string;
  loc: string;
  rating: number;
}

const SEED_PRODUCTS = [
  { id: "c1", name: "Red Velvet Romance", price: 3507, img: "https://images.unsplash.com/photo-1586788280802-941ac08994d5?q=80&w=600&auto=format&fit=crop", category: "Signature" },
  { id: "c2", name: "Classic Chocolate Fudge", price: 3173, img: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?q=80&w=600&auto=format&fit=crop", category: "Signature" },
  { id: "c3", name: "Vanilla Bean Dream", price: 2922, img: "https://images.unsplash.com/photo-1465014949162-e461f5408bc2?q=80&w=600&auto=format&fit=crop", category: "Pastries" },
  { id: "c4", name: "Strawberry Shortcake", price: 3757, img: "https://images.unsplash.com/photo-1565958011703-44f9829ba187?q=80&w=600&auto=format&fit=crop", category: "Signature" },
  { id: "c5", name: "Lemon Blueberry Tart", price: 2338, img: "https://images.unsplash.com/photo-1488477181946-6428a0291777?q=80&w=600&auto=format&fit=crop", category: "Pastries" },
  { id: "c6", name: "Matcha Green Tea Crepe", price: 4008, img: "https://images.unsplash.com/photo-1536680465769-a36969fdfe70?q=80&w=600&auto=format&fit=crop", category: "Pastries" }
];

const INITIAL_REVIEWS: Review[] = [
  { review: "Best chocolate cake in town! Pure richness.", author: "Rohan M.", loc: "Kochi", rating: 5 },
  { review: "Delivered on time and tasted absolutely amazing.", author: "Anjali K.", loc: "Kozhikode", rating: 5 },
  { review: "The Red Velvet variant made our anniversary complete.", author: "Sneha P.", loc: "Kannur", rating: 5 },
  { review: "Incredibly moist texture, not overly sweet. Pure balance.", author: "David E.", loc: "Thrissur", rating: 5 },
  { review: "Beautiful execution on custom requirements.", author: "Meera J.", loc: "Wayanad", rating: 5 },
  { review: "The frosting details were breathtaking.", author: "Arjun S.", loc: "Malappuram", rating: 5 },
  { review: "Secure payment setup and wonderful packaging support.", author: "Gautham B.", loc: "Kochi", rating: 5 },
  { review: "Same day dispatch loop worked flawlessly.", author: "Tina L.", loc: "Thrissur", rating: 5 }
];

export default function CakeOnCakeStorefront() {
  const [products, setProducts] = useState<Product[]>([]);
  const [activeCategory, setActiveCategory] = useState("All");
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [emailInput, setEmailInput] = useState("");

  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [cakeLettering, setCakeLettering] = useState("");
  const [deliveryAddress, setDeliveryAddress] = useState("");

  const [reviews, setReviews] = useState<Review[]>(INITIAL_REVIEWS);
  const [userComment, setUserComment] = useState("");
  const [userAuthor, setUserAuthor] = useState("");
  const [userLoc, setUserLoc] = useState("Kochi");
  const [userRating, setUserRating] = useState(5);
  const [hoverRating, setHoverRating] = useState<number | null>(null);

  useEffect(() => {
    const savedProducts = localStorage.getItem("cake_store_products");
    if (savedProducts) {
      setProducts(JSON.parse(savedProducts));
    } else {
      setProducts(SEED_PRODUCTS);
    }

    const savedReviews = localStorage.getItem("cake_store_reviews");
    if (savedReviews) {
      setReviews(JSON.parse(savedReviews));
    }
  }, []);

  const filteredProducts = activeCategory === "All" 
    ? products 
    : products.filter(p => p.category.toLowerCase() === activeCategory.toLowerCase());

  const addToBox = (product: Product) => {
    setCart(prevCart => {
      const existing = prevCart.find(item => item.id === product.id);
      if (existing) {
        return prevCart.map(item => 
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (id: string) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
  const totalAmount = cart.reduce((total, item) => total + (item.price * item.quantity), 0);

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

  const handleCheckoutSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (cart.length === 0) return;

    alert(
      "🎂 Order Received Successfully!\n\n" +
      "👤 Name: " + customerName + "\n" +
      "📞 Phone: " + customerPhone + "\n" +
      "✍️ Name on Cake: " + (cakeLettering || "None") + "\n" +
      "📍 Delivery Address: " + deliveryAddress + "\n" +
      "💰 Total Amount: \u20B9" + totalAmount.toLocaleString("en-IN") + "\n\n" +
      "Thank you for baking with Cake-On-Cake!"
    );

    setCart([]);
    setCustomerName("");
    setCustomerPhone("");
    setCakeLettering("");
    setDeliveryAddress("");
    setIsCartOpen(false);
  };

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userComment.trim() || !userAuthor.trim()) return;

    const newReview: Review = {
      review: userComment.trim(),
      author: userAuthor.trim(),
      loc: userLoc,
      rating: userRating
    };

    const updatedReviews = [newReview, ...reviews];
    setReviews(updatedReviews);
    localStorage.setItem("cake_store_reviews", JSON.stringify(updatedReviews));

    setUserComment("");
    setUserAuthor("");
    setUserRating(5);
    alert("✨ Thank you for your valuable feedback! Your review is live below.");
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#3E2723] font-sans antialiased selection:bg-[#D7CCC8]">
      
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-[#EFEBE9] px-4 sm:px-8 py-4 flex items-center justify-between shadow-xs">
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
          <button onClick={() => setIsCartOpen(true)} className="inline-flex items-center gap-2 px-4 py-2 bg-[#4E342E] hover:bg-[#3E2723] text-white rounded-full text-xs font-bold transition-all shadow-xs relative cursor-pointer">
            <ShoppingBag className="w-3.5 h-3.5" /> View Dessert Box
            {cartCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-[#D84315] text-white text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center border-2 border-white">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </header>

      {isCartOpen && (
        <div className="fixed inset-0 z-50 flex justify-end animate-fadeIn">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-xs" onClick={() => setIsCartOpen(false)} />
          <div className="relative w-full max-w-sm bg-white h-full shadow-2xl flex flex-col justify-between overflow-y-auto z-10 border-l border-[#EFEBE9]">
            <div className="p-4 border-b border-[#EFEBE9] flex items-center justify-between bg-[#FAF8F5]">
              <div className="flex items-center gap-2 text-[#4E342E]">
                <ShoppingBag className="w-4 h-4 text-[#8D6E63]" />
                <h3 className="font-black text-sm tracking-tight">Your Custom Dessert Box</h3>
              </div>
              <button onClick={() => setIsCartOpen(false)} className="p-1 rounded-lg hover:bg-slate-200 transition-colors text-slate-500"><X className="w-4 h-4" /></button>
            </div>

            <div className="p-4 flex-1 space-y-5">
              {cart.length === 0 ? (
                <div className="text-center py-16 space-y-2">
                  <span className="text-3xl block">🧺</span>
                  <p className="text-xs font-bold text-[#8D6E63]">Your Dessert Box is empty.</p>
                </div>
              ) : (
                <>
                  <div className="space-y-2">
                    <span className="text-[10px] uppercase font-black text-[#A1887F] tracking-wider block">Selected Layers</span>
                    <div className="max-h-40 overflow-y-auto border border-[#EFEBE9] rounded-xl p-2 bg-[#FAF8F5]/50 divide-y divide-[#EFEBE9]/60">
                      {cart.map((item) => (
                        <div key={item.id} className="flex items-center justify-between py-2 first:pt-0 last:pb-0">
                          <div className="flex items-center gap-2.5">
                            <img src={item.img} alt={item.name} className="w-9 h-9 rounded-lg object-cover border border-[#EFEBE9]" />
                            <div>
                              <h5 className="font-bold text-xs text-[#3E2723] line-clamp-1">{item.name}</h5>
                              <span className="text-[10px] text-[#8D6E63] font-mono">{'\u20B9'}{item.price.toLocaleString("en-IN")} x {item.quantity}</span>
                            </div>
                          </div>
                          <button onClick={() => removeFromCart(item.id)} className="p-1 text-slate-400 hover:text-red-500 transition-colors"><Trash2 className="w-3.5 h-3.5" /></button>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-[#4E342E] text-white p-3.5 rounded-xl flex items-center justify-between">
                    <span className="text-xs font-bold text-[#D7CCC8]">Total Amount Summary</span>
                    <span className="text-lg font-black">{'\u20B9'}{totalAmount.toLocaleString("en-IN")}</span>
                  </div>

                  <form id="checkout-form" onSubmit={handleCheckoutSubmit} className="space-y-3">
                    <span className="text-[10px] uppercase font-black text-[#A1887F] tracking-wider block border-b pb-1">Delivery Details & Personalization</span>
                    <div className="space-y-1">
                      <label className="text-[11px] font-bold text-[#5D4037]">Recipient Name *</label>
                      <input type="text" required placeholder="e.g. Rahul Sharma" value={customerName} onChange={(e) => setCustomerName(e.target.value)} className="w-full text-xs px-3 py-1.5 border rounded-xl bg-[#FAF8F5] focus:outline-none focus:border-[#8D6E63] text-slate-800" />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[11px] font-bold text-[#5D4037]">Contact Number *</label>
                      <input type="tel" required placeholder="e.g. +91 98765 43210" value={customerPhone} onChange={(e) => setCustomerPhone(e.target.value)} className="w-full text-xs px-3 py-1.5 border rounded-xl bg-[#FAF8F5] focus:outline-none focus:border-[#8D6E63] text-slate-800" />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[11px] font-bold text-[#5D4037] flex items-center justify-between"><span>Name Written On Cake</span><span className="text-[10px] text-slate-400 font-normal">Optional</span></label>
                      <input type="text" placeholder="e.g. Happy Birthday!" value={cakeLettering} onChange={(e) => setCakeLettering(e.target.value)} className="w-full text-xs px-3 py-1.5 border rounded-xl bg-[#FAF8F5] focus:outline-none focus:border-[#8D6E63] text-slate-800" maxLength={50} />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[11px] font-bold text-[#5D4037]">Complete Delivery Address *</label>
                      <textarea required rows={2} placeholder="Flat, Street, Landmark Details..." value={deliveryAddress} onChange={(e) => setDeliveryAddress(e.target.value)} className="w-full text-xs px-3 py-1.5 border rounded-xl bg-[#FAF8F5] focus:outline-none focus:border-[#8D6E63] resize-none text-slate-800" />
                    </div>
                  </form>
                </>
              )}
            </div>

            <div className="p-4 border-t border-[#EFEBE9] bg-[#FAF8F5]">
              {cart.length > 0 ? (
                <button type="submit" form="checkout-form" className="w-full bg-[#4E342E] hover:bg-[#3E2723] text-white font-bold py-3 px-4 rounded-xl text-xs tracking-wider transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer">Confirm Order ({'\u20B9'}{totalAmount.toLocaleString("en-IN")})</button>
              ) : (
                <button disabled className="w-full bg-slate-200 text-slate-400 font-bold py-3 px-4 rounded-xl text-xs tracking-wider cursor-not-allowed">Dessert Box is Empty</button>
              )}
            </div>
          </div>
        </div>
      )}

      <section className="bg-gradient-to-br from-[#4E342E] to-[#2D1B18] text-white py-16 px-6 text-center shadow-inner">
        <span className="bg-[#A1887F]/30 text-[#D7CCC8] text-[10px] uppercase font-black tracking-widest px-3 py-1 rounded-full border border-[#A1887F]/20">Artisanal Bakery Studio</span>
        <h2 className="text-4xl sm:text-5xl font-black tracking-tight mt-4 max-w-2xl mx-auto leading-tight">Freshly Baked Happiness Delivered To Your Doorstep</h2>
        <p className="text-[#D7CCC8] text-xs sm:text-sm max-w-md mx-auto mt-3 font-medium">Handcrafted luxury treats customized down to the last sugar crystalline petal detail.</p>
      </section>

      <main className="max-w-7xl mx-auto px-4 sm:px-8 py-12">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#EFEBE9] pb-6 mb-8">
          <div>
            <h3 className="text-2xl font-black text-[#3E2723] tracking-tight">Explore Our Masterpieces</h3>
            <p className="text-xs text-[#8D6E63] mt-0.5">Filter by recipe profile classes or discover modern tier compositions.</p>
          </div>
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            {["All", "Signature", "Pastries"].map((cat) => (
              <button key={cat} onClick={() => setActiveCategory(cat)} className={`px-4 py-1.5 rounded-full text-xs font-bold cursor-pointer transition-all shrink-0 ${activeCategory === cat ? "bg-[#4E342E] text-white shadow-xs" : "bg-white text-[#6D4C41] border border-[#EFEBE9] hover:bg-[#FAF8F5]"}`}>{cat}</button>
            ))}
          </div>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredProducts.map((cake) => (
            <div key={cake.id} className="group bg-white border border-[#EFEBE9]/80 rounded-3xl p-5 hover:shadow-xl hover:border-[#D7CCC8] transition-all flex flex-col justify-between">
              <div>
                <div className="relative mb-4 overflow-hidden rounded-2xl bg-[#FAF7F2] aspect-video w-full flex items-center justify-center border border-[#EFEBE9]/40">
                  <img src={cake.img} alt={cake.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" onError={(e) => { (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1578985545062-69928b1d9587?q=80&w=600&auto=format&fit=crop"; }} />
                  <span className="absolute top-3 right-3 bg-white/95 backdrop-blur-xs px-2.5 py-0.5 rounded-md text-[10px] font-bold text-[#5D4037] border border-[#EFEBE9] shadow-2xs">{cake.category}</span>
                </div>
                <h4 className="font-black text-[#3E2723] text-base tracking-tight group-hover:text-[#7A5C53] transition-colors">{cake.name}</h4>
                <div className="text-xl font-black text-[#2E1C1A] mt-1">{'\u20B9'}{cake.price.toLocaleString("en-IN")}</div>
              </div>
              <button onClick={() => addToBox(cake)} className="mt-5 w-full bg-[#FAF6F0] hover:bg-[#4E342E] text-[#5D4037] hover:text-white font-bold py-3 px-4 rounded-xl text-xs transition-all border border-[#EFEBE9] cursor-pointer">Add to Box</button>
            </div>
          ))}
        </div>
      </main>

      <section className="bg-white border-y border-[#EFEBE9] py-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h3 className="text-2xl font-black tracking-tight text-[#3E2723]">Why Choose Cake-On-Cake</h3>
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

      <section className="py-16 px-4 max-w-7xl mx-auto">
        <div className="text-center mb-10"><h3 className="text-2xl font-black tracking-tight text-[#3E2723]">Shop By Occasion</h3></div>
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

      <section className="px-4 max-w-7xl mx-auto mb-16">
        <div className="bg-gradient-to-r from-[#DFD3C3] via-[#F4EAE1] to-[#E7DEC9] border border-[#D7CCC8] rounded-3xl p-8 sm:p-12 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xs">
          <div className="space-y-3 text-center md:text-left max-w-lg">
            <span className="bg-[#4E342E] text-white text-[9px] uppercase font-black tracking-widest px-2.5 py-1 rounded-md">Creative Freedom</span>
            <h3 className="text-3xl font-black text-[#3E2723] tracking-tight">Design Your Dream Cake</h3>
            <p className="text-xs text-[#5D4037] font-medium leading-relaxed">Upload your reference layouts, choose flavors, and our artists will craft it perfectly.</p>
          </div>
          <Link href="/custom" className="bg-[#4E342E] text-white text-xs font-bold px-6 py-3.5 rounded-xl shadow-md flex items-center gap-2 shrink-0">
            <UploadCloud className="w-4 h-4" /> Create Custom Cake <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </section>

      <section className="bg-white border-t border-[#EFEBE9] pt-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10">
            <h3 className="text-2xl font-black tracking-tight text-[#3E2723]">Loved By Sweet Lovers</h3>
            <p className="text-xs text-[#8D6E63] mt-1">Real verified reviews left by our sweet-toothed community.</p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {reviews.map((rev, i) => (
              <div key={i} className="bg-[#FAF8F5] border border-[#EFEBE9]/60 p-5 rounded-2xl flex flex-col justify-between space-y-4 shadow-2xs hover:border-[#D7CCC8] transition-all">
                <div className="space-y-2">
                  <div className="flex gap-0.5">
                    {[...Array(5)].map((_, starIdx) => (
                      <Star key={starIdx} className={`w-3.5 h-3.5 ${starIdx < rev.rating ? "text-amber-500 fill-amber-500" : "text-slate-200"}`} />
                    ))}
                  </div>
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

      <section className="bg-white border-b border-[#EFEBE9] pb-16 pt-10 px-4">
        <div className="max-w-xl mx-auto bg-[#FAF8F5] border border-[#EFEBE9] rounded-3xl p-6 sm:p-8 shadow-xs">
          <div className="text-center space-y-1 mb-6">
            <h4 className="text-lg font-black text-[#3E2723] tracking-tight">Share Your Valuable Feedback</h4>
            <p className="text-xs text-[#8D6E63]">Your experience helps our bakery craft better happiness moments.</p>
          </div>

          <form onSubmit={handleReviewSubmit} className="space-y-4">
            <div className="flex flex-col items-center gap-1.5 bg-white py-3 rounded-2xl border border-[#EFEBE9]/60 shadow-2xs">
              <span className="text-[11px] font-bold text-[#8D6E63] uppercase tracking-wider">Your Rating</span>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setUserRating(star)}
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(null)}
                    className="p-1 focus:outline-none transition-transform active:scale-95 cursor-pointer"
                  >
                    <Star 
                      className={`w-6 h-6 transition-colors ${
                        star <= (hoverRating ?? userRating) 
                          ? "text-amber-500 fill-amber-500" 
                          : "text-slate-200"
                      }`} 
                    />
                  </button>
                ))}
              </div>
            </div>

            <div className="grid gap-4 grid-cols-1 sm:grid-cols-2">
              <div className="space-y-1">
                <label className="text-[11px] font-bold text-[#5D4037]">Your Name</label>
                <input 
                  type="text" required placeholder="e.g. Sahal V." value={userAuthor} onChange={(e) => setUserAuthor(e.target.value)}
                  className="w-full text-xs px-3 py-2.5 bg-white border border-[#EFEBE9] rounded-xl focus:outline-none focus:border-[#8D6E63] text-slate-800" 
                />
              </div>
              <div className="space-y-1">
                <label className="text-[11px] font-bold text-[#5D4037]">Your Location</label>
                <select 
                  value={userLoc} onChange={(e) => setUserLoc(e.target.value)}
                  className="w-full text-xs px-3 py-2.5 bg-white border border-[#EFEBE9] rounded-xl focus:outline-none focus:border-[#8D6E63] text-slate-800"
                >
                  {["Kozhikode", "Malappuram", "Kannur", "Wayanad", "Kochi", "Thrissur"].map((city) => (
                    <option key={city} value={city}>{city}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[11px] font-bold text-[#5D4037]">Review Message / Comments</label>
              <textarea 
                required rows={3} placeholder="Tell us how the cake tasted..." value={userComment} onChange={(e) => setUserComment(e.target.value)}
                className="w-full text-xs px-3 py-2.5 bg-white border border-[#EFEBE9] rounded-xl focus:outline-none focus:border-[#8D6E63] resize-none text-slate-800" 
              />
            </div>

            <button type="submit" className="w-full bg-[#4E342E] hover:bg-[#3E2723] text-white font-bold py-3 px-4 rounded-xl text-xs tracking-wider transition-all shadow-sm flex items-center justify-center gap-1.5 cursor-pointer">
              <Send className="w-3.5 h-3.5" /> Publish My Feedback
            </button>
          </form>
        </div>
      </section>

      <section className="py-12 px-4 max-w-7xl mx-auto text-center border-b border-[#EFEBE9]">
        <h4 className="text-sm font-bold text-[#3E2723] flex items-center justify-center gap-1.5 mb-4"><MapPin className="w-4 h-4 text-rose-600" /> We Promptly Deliver Across:</h4>
        <div className="flex flex-wrap items-center justify-center gap-2 max-w-2xl mx-auto">
          {["Kozhikode", "Malappuram", "Kannur", "Wayanad", "Kochi", "Thrissur"].map((loc) => (
            <span key={loc} className="bg-white border border-[#EFEBE9] px-4 py-1.5 rounded-full text-xs font-bold text-[#5D4037]">{loc}</span>
          ))}
        </div>
      </section>

      <section className="py-16 px-4 max-w-7xl mx-auto">
        <div className="text-center mb-10"><h3 className="text-2xl font-black tracking-tight text-[#3E2723]">Exclusive Special Offers</h3></div>
        <div className="grid gap-6 sm:grid-cols-3">
          {[
            { deal: "20% OFF Birthday Cakes", terms: "Use code BDAY20 on final checkout layer.", color: "from-[#FDF2F2] to-[#FDE8E8] border-red-200 text-red-900" },
            { deal: "Buy 2 Get 1 Free Cupcakes", terms: "Valid on all custom configurations.", color: "from-[#F0FDF4] to-[#DCFCE7] border-emerald-200 text-emerald-900" },
            { deal: "Free Delivery Above \u20B9999", terms: "Automatically calculated at regional checkout loops.", color: "from-[#EFF6FF] to-[#DBEAFE] border-blue-200 text-blue-900" }
          ].map((off, i) => (
            <div key={i} className={`bg-gradient-to-br ${off.color} border p-6 rounded-2xl flex flex-col justify-between h-32`}>
              <h4 className="font-black text-base tracking-tight">{off.deal}</h4>
              <p className="text-[11px] opacity-80 font-medium">{off.terms}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-white border-y border-[#EFEBE9] py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10"><h3 className="text-2xl font-black tracking-tight text-[#3E2723]">Frequently Asked Questions</h3></div>
          <div className="space-y-3">
            {[
              { q: "How do I place an order?", a: "Browse our products, tap 'Add to Box' on your selected items, fill out delivery details in the slider panel, and hit confirm." },
              { q: "Do you offer same-day delivery?", a: "Yes! All local bakery branches support safe fulfillment for orders completed before 4:00 PM." },
              { q: "Can I customize my cake design specification?", a: "Absolutely. Tap our 'Design Custom Cake' tab to submit structural specifications and lettering requirements." },
              { q: "What payment methods are securely accepted?", a: "We support major Credit/Debit processing cards, modern wallet systems, Net Banking, and local UPI rails." }
            ].map((faq, idx) => (
              <div key={idx} className="border border-[#EFEBE9] rounded-xl overflow-hidden bg-[#FAF8F5]">
                <button onClick={() => toggleFaq(idx)} className="w-full flex items-center justify-between p-4 text-left font-bold text-xs sm:text-sm text-[#3E2723] hover:bg-[#F5F2EB] transition-colors cursor-pointer">
                  <span>{faq.q}</span>
                  {openFaq === idx ? <ChevronUp className="w-4 h-4 text-[#8D6E63]" /> : <ChevronDown className="w-4 h-4 text-[#8D6E63]" />}
                </button>
                {openFaq === idx && <div className="p-4 bg-white border-t border-[#EFEBE9] text-xs text-[#5D4037] leading-relaxed animate-fadeIn">{faq.a}</div>}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-4 max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <h3 className="text-2xl font-black tracking-tight text-[#3E2723] flex items-center justify-center gap-1.5"><Instagram className="w-5 h-5 text-pink-600" /> Instagram Gallery</h3>
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
            </div>
          ))}
        </div>
      </section>

      <section className="bg-[#4E342E] text-white py-12 px-4 text-center">
        <div className="max-w-md mx-auto space-y-3">
          <h3 className="text-xl font-black tracking-tight">Get Exclusive Cake Offers</h3>
          <p className="text-xs text-[#D7CCC8]">Join our channel to receive premium discount coupon codes weekly.</p>
          <form onSubmit={handleSubscribe} className="flex items-center gap-2 mt-4 bg-white/10 p-1.5 rounded-xl border border-white/10">
            <input type="email" required placeholder="Enter your email address" value={emailInput} onChange={(e) => setEmailInput(e.target.value)} className="w-full text-xs px-3 py-2 bg-transparent text-white placeholder-white/50 focus:outline-none font-medium" />
            <button type="submit" className="bg-white text-[#4E342E] font-black text-xs px-4 py-2 rounded-lg transition-colors flex items-center gap-1 cursor-pointer"><Send className="w-3 h-3" /> Subscribe</button>
          </form>
        </div>
      </section>

      <footer className="bg-[#1E110E] text-[#D7CCC8] pt-16 pb-8 px-6 sm:px-8 border-t border-[#3E2723]">
        <div className="max-w-7xl mx-auto grid gap-8 grid-cols-2 md:grid-cols-5 border-b border-[#3E2723] pb-12 text-xs">
          <div className="space-y-3 col-span-2 md:col-span-1">
            <h4 className="text-white font-black text-lg tracking-tight">Cake-On-Cake</h4>
            <p className="text-[#A1887F] font-medium leading-relaxed max-w-xs">Freshly baked happiness delivered straight to your doorstep across select local corridors.</p>
          </div>
          <div className="space-y-3">
            <h5 className="text-white font-black uppercase text-[10px] tracking-wider text-amber-400">Quick Links</h5>
            <ul className="space-y-2 font-medium">
              <li><Link href="/" className="hover:text-white">Home Storefront</Link></li>
              <li><button type="button" onClick={() => setIsCartOpen(true)} className="hover:text-white text-left cursor-pointer">Shop Catalog</button></li>
              <li><Link href="/custom" className="hover:text-white">Custom Cakes</Link></li>
            </ul>
          </div>
          <div className="space-y-3">
            <h5 className="text-white font-black uppercase text-[10px] tracking-wider text-amber-400">Customer Support</h5>
            <ul className="space-y-2 font-medium">
              <li><button type="button" onClick={() => setOpenFaq(0)} className="hover:text-white text-left cursor-pointer">FAQs Guide</button></li>
            </ul>
          </div>
          <div className="space-y-3">
            <h5 className="text-white font-black uppercase text-[10px] tracking-wider text-amber-400">Contact</h5>
            <ul className="space-y-2 font-medium text-[#A1887F]">
              <li className="flex items-center gap-1.5"><Phone className="w-3.5 h-3.5 text-amber-500" /> +91 98765 43210</li>
              <li className="flex items-center gap-1.5"><Mail className="w-3.5 h-3.5 text-amber-500" /> support@cakeoncake.com</li>
            </ul>
          </div>
          <div className="space-y-3">
            <h5 className="text-white font-black uppercase text-[10px] tracking-wider text-amber-400">Social Media</h5>
            <ul className="space-y-2 font-medium">
              <li><a href="https://www.instagram.com/cake_on_cake.12?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" target="_blank" rel="noopener noreferrer" className="hover:text-white cursor-pointer block">📸 Instagram Feed</a></li>
              <li><span className="hover:text-white cursor-pointer block">📘 Facebook Profile</span></li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-[#8D6E63] font-medium">
          <p>&copy; 2026 Cake-On-Cake Confectionery Studio. All rights reserved.</p>
          <p>Handcrafted using Next.js & Tailwind CSS frameworks.</p>
        </div>
      </footer>

    </div>
  );
}
