import { createClient } from "@supabase/supabase-js";
import type { Cake, Review } from "./types'S;

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

export const supabase =
  supabaseUrl && supabaseAnonKey
    ? createClient(supabaseUrl, supabaseAnonKey)
    : null;

// ── MOCK DATA ────────────────────────────────────────────────────────────────
export const MOCK_CAKES: Cake[] = [
  {
    id: "1",
    name: "Chocolate Truffle Dream",
    description: "Layers of rich dark chocolate sponge with ganache frosting and fresh raspberry coulis. Our most loved bestseller — indulgent, moist, and utterly decadent.",
    price: 899,
    original_price: 1099,
    category: "Chocolate",
    image_url: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=600&auto=format",
    images: [
      "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=600&auto=format",
      "https://images.unsplash.com/photo-1606890737304-57a1ca8a5b62?w=600&auto=format",
    ],
    rating: 4.9,
    review_count: 312,
    weight_options: [
      { weight: "500g", price: 899 },
      { weight: "1kg", price: 1499 },
      { weight: "2kg", price: 2699 },
    ],
    flavour_options: ["Dark Chocolate", "Milk Chocolate", "White Chocolate"],
    ingredients: ["Dark Chocolate 72%", "Fresh Cream", "Unsalted Butter", "Free-range Eggs", "All-Purpose Flour", "Raspberries", "Vanilla Extract"],
    is_best_seller: true,
    is_featured: true,
    discount_percent: 18,
    stock: 20,
    created_at: "2024-01-01T00:00:00Z",
  },
  {
    id: "2",
    name: "Strawberry Cloud Cake",
    description: "Light-as-air vanilla sponge layered with fresh strawberry compote and lightly whipped cream. A perennial summer favourite.",
    price: 799,
    original_price: 899,
    category: "Fruit",
    image_url: "https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=600&auto=format",
    images: [
      "https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=600&auto=format",
      "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=600&auto=format",
    ],
    rating: 4.8,
    review_count: 241,
    weight_options: [
      { weight: "500g", price: 799 },
      { weight: "1kg", price: 1349 },
      { weight: "2kg", price: 2499 },
    ],
    flavour_options: ["Strawberry", "Mixed Berry", "Peach"],
    ingredients: ["Fresh Strawberries", "Whipping Cream", "Vanilla Bean", "Free-range Eggs", "Caster Sugar", "Unsalted Butter"],
    is_best_seller: true,
    discount_percent: 10,
    stock: 15,
    created_at: "2024-01-02T00:00:00Z",
  },
  {
    id: "3",
    name: "Royal Wedding Tier",
    description: "Three-tier vanilla almond cake with fondant roses and 24K gold leaf detailing. Crafted exclusively for your perfect day.",
    price: 4999,
    category: "Wedding",
    image_url: "https://images.unsplash.com/photo-1535254973040-607b474cb50d?w=600&auto=format",
    images: [
      "https://images.unsplash.com/photo-1535254973040-607b474cb50d?w=600&auto=format",
    ],
    rating: 5.0,
    review_count: 89,
    weight_options: [
      { weight: "2kg", price: 4999 },
      { weight: "3kg", price: 6999 },
      { weight: "5kg", price: 9999 },
    ],
    flavour_options: ["Vanilla Almond", "Rose Lychee", "Champagne Buttercream"],
    ingredients: ["Almond Flour", "Vanilla Bean", "Fondant", "24K Gold Leaf", "Fresh Edible Flowers"],
    is_best_seller: false,
    is_featured: true,
    stock: 5,
    created_at: "2024-01-03T00:00:00Z",
  },
  {
    id: "4",
    name: "Rainbow Birthday Blast",
    description: "Six vibrant layers of coloured sponge with rainbow buttercream swirls and candy confetti. Kids absolutely adore it!",
    price: 1199,
    original_price: 1499,
    category: "Birthday",
    image_url: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&auto=format",
    images: [
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&auto=format",
      "https://images.unsplash.com/photo-1571115177098-24ec42ed204d?w=600&auto=format",
    ],
    rating: 4.7,
    review_count: 189,
    weight_options: [
      { weight: "500g", price: 1199 },
      { weight: "1kg", price: 1899 },
      { weight: "2kg", price: 3299 },
    ],
    flavour_options: ["Vanilla", "Bubblegum", "Cotton Candy"],
    ingredients: ["Vanilla Sponge", "Natural Food Colours", "Buttercream", "Rainbow Sprinkles", "Sugar Pearls"],
    is_best_seller: true,
    discount_percent: 20,
    stock: 12,
    created_at: "2024-01-04T00:00:00Z",
  },
  {
    id: "5",
    name: "Unicorn Fantasy",
    description: "A magical swirl of pastel buttercream with an edible gold unicorn horn and iridescent star sprinkles. Perfect for little dreamers.",
    price: 1349,
    category: "Kids",
    image_url: "https://images.unsplash.com/photo-1535141192574-5d4897c12636?w=600&auto=format",
    images: [
      "https://images.unsplash.com/photo-1535141192574-5d4897c12636?w=600&auto=format",
    ],
    rating: 4.9,
    review_count: 156,
    weight_options: [
      { weight: "500g", price: 1349 },
      { weight: "1kg", price: 2199 },
      { weight: "2kg", price: 3899 },
    ],
    flavour_options: ["Vanilla", "Strawberry", "Blueberry"],
    ingredients: ["Vanilla Sponge", "Pastel Buttercream", "Edible Glitter", "Fondant Horn", "Marshmallow Flowers"],
    is_best_seller: true,
    stock: 10,
    created_at: "2024-01-05T00:00:00Z",
  },
  {
    id: "6",
    name: "Tiramisu Elegante",
    description: "Classic Italian-inspired layers of espresso-soaked sponge with silky mascarpone cream and dusted cocoa powder.",
    price: 1099,
    original_price: 1299,
    category: "Anniversary",
    image_url: "https://images.unsplash.com/photo-1542124948-dc391252a940?w=600&auto=format",
    images: [
      "https://images.unsplash.com/photo-1542124948-dc391252a940?w=600&auto=format",
    ],
    rating: 4.8,
    review_count: 203,
    weight_options: [
      { weight: "500g", price: 1099 },
      { weight: "1kg", price: 1799 },
      { weight: "2kg", price: 3199 },
    ],
    flavour_options: ["Espresso", "Mocha", "Vanilla"],
    ingredients: ["Mascarpone Cheese", "Espresso Shots", "Ladyfinger Biscuits", "Cocoa Powder", "Free-range Eggs", "Caster Sugar"],
    is_best_seller: false,
    discount_percent: 15,
    stock: 18,
    created_at: "2024-01-06T00:00:00Z",
  },
  {
    id: "7",
    name: "Assorted Cupcake Box",
    description: "A dozen gourmet cupcakes in rotating seasonal flavours with hand-piped buttercream swirls and edible toppers.",
    price: 649,
    category: "Cupcakes",
    image_url: "https://images.unsplash.com/photo-1486427944299-d1955d23e34d?w=600&auto=format",
    images: [
      "https://images.unsplash.com/photo-1486427944299-d1955d23e34d?w=600&auto=format",
    ],
    rating: 4.6,
    review_count: 278,
    weight_options: [
      { weight: "6 pieces", price: 649 },
      { weight: "12 pieces", price: 1149 },
      { weight: "24 pieces", price: 2099 },
    ],
    flavour_options: ["Mixed", "All Chocolate", "All Vanilla"],
    ingredients: ["Vanilla", "Chocolate", "Red Velvet", "Buttercream", "Fondant Decorations"],
    is_best_seller: false,
    stock: 30,
    created_at: "2024-01-07T00:00:00Z",
  },
  {
    id: "8",
    name: "Mango Passion Delight",
    description: "Tropical Alphonso mango mousse layered between coconut sponge with a fresh mango mirror glaze. A summer paradise in every slice.",
    price: 899,
    original_price: 1099,
    category: "Fruit",
    image_url: "https://images.unsplash.com/photo-1567171466295-4afa63d45416?w=600&auto=format",
    images: [
      "https://images.unsplash.com/photo-1567171466295-4afa63d45416?w=600&auto=format",
    ],
    rating: 4.7,
    review_count: 134,
    weight_options: [
      { weight: "500g", price: 899 },
      { weight: "1kg", price: 1499 },
      { weight: "2kg", price: 2699 },
    ],
    flavour_options: ["Mango", "Mango Passion Fruit", "Coconut Mango"],
    ingredients: ["Alphonso Mango Pulp", "Coconut Cream", "Passion Fruit", "Coconut Sponge", "Gelatin", "Fresh Mint"],
    is_best_seller: false,
    discount_percent: 18,
    stock: 14,
    created_at: "2024-01-08T00:00:00Z",
  },
  {
    id: "9",
    name: "Black Forest Gateau",
    description: "Classic German-inspired black forest with layers of chocolate sponge, kirsch-soaked cherries, and fresh whipped cream.",
    price: 999,
    category: "Chocolate",
    image_url: "https://images.unsplash.com/photo-1606890737304-57a1ca8a5b62?w=600&auto=format",
    images: [
      "https://images.unsplash.com/photo-1606890737304-57a1ca8a5b62?w=600&auto=format",
    ],
    rating: 4.8,
    review_count: 167,
    weight_options: [
      { weight: "500g", price: 999 },
      { weight: "1kg", price: 1699 },
      { weight: "2kg", price: 2999 },
    ],
    flavour_options: ["Classic", "Dark Cherry", "White Chocolate Cherry"],
    ingredients: ["Chocolate Sponge", "Fresh Cherries", "Kirsch", "Whipping Cream", "Chocolate Shavings"],
    is_best_seller: false,
    stock: 16,
    created_at: "2024-01-09T00:00:00Z",
  },
  {
    id: "10",
    name: "Red Velvet Romance",
    description: "Velvety crimson sponge with cream cheese frosting and rose gold drip. The perfect anniversary centrepiece.",
    price: 1099,
    category: "Anniversary",
    image_url: "https://images.unsplash.com/photo-1571115177098-24ec42ed204d?w=600&auto=format",
    images: [
      "https://images.unsplash.com/photo-1571115177098-24ec42ed204d?w=600&auto=format",
    ],
    rating: 4.9,
    review_count: 221,
    weight_options: [
      { weight: "500g", price: 1099 },
      { weight: "1kg", price: 1799 },
      { weight: "2kg", price: 3299 },
    ],
    flavour_options: ["Classic Red Velvet", "Raspberry Red Velvet", "Chocolate Red Velvet"],
    ingredients: ["Cocoa Powder", "Red Food Colouring", "Cream Cheese", "Buttermilk", "Vanilla Extract", "Edible Rose Petals"],
    is_best_seller: true,
    is_featured: true,
    stock: 12,
    created_at: "2024-01-10T00:00:00Z",
  },
  {
    id: "11",
    name: "Lemon Drizzle Sunshine",
    description: "Zingy lemon sponge soaked in lemon syrup with lemon curd filling and light lemon buttercream. Bright and refreshing.",
    price: 749,
    category: "Fruit",
    image_url: "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=600&auto=format",
    images: [
      "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=600&auto=format",
    ],
    rating: 4.6,
    review_count: 98,
    weight_options: [
      { weight: "500g", price: 749 },
      { weight: "1kg", price: 1249 },
      { weight: "2kg", price: 2299 },
    ],
    flavour_options: ["Lemon", "Lemon & Poppy Seed", "Lemon & Elderflower"],
    ingredients: ["Lemon Zest", "Fresh Lemon Juice", "Lemon Curd", "Cream", "Icing Sugar", "Poppy Seeds"],
    is_best_seller: false,
    stock: 20,
    created_at: "2024-01-11T00:00:00Z",
  },
  {
    id: "12",
    name: "Butterscotch Bliss",
    description: "Rich butterscotch sponge with caramel sauce layers and crunchy praline topping. A childhood favourite elevated.",
    price: 849,
    category: "Birthday",
    image_url: "https://images.unsplash.com/photo-1557925923-33b27f979d62?w=600&auto=format",
    images: [
      "https://images.unsplash.com/photo-1557925923-33b27f979d62?w=600&auto=format",
    ],
    rating: 4.7,
    review_count: 145,
    weight_options: [
      { weight: "500g", price: 849 },
      { weight: "1kg", price: 1399 },
      { weight: "2kg", price: 2599 },
    ],
    flavour_options: ["Classic Butterscotch", "Caramel Toffee", "Salted Caramel"],
    ingredients: ["Brown Sugar", "Butter", "Heavy Cream", "Vanilla", "Almond Praline", "Sea Salt"],
    is_best_seller: false,
    stock: 17,
    created_at: "2024-01-12T00:00:00Z",
  },
];

export const MOCK_REVIEWS: Review[] = [
  {
    id: "r1",
    customer_name: "Priya Sharma",
    rating: 5,
    comment: "The chocolate truffle cake for my daughter's birthday was absolutely divine! The delivery was on time and the packaging was beautiful. Will definitely order again.",
    date: "2024-11-20",
    avatar: "PS",
    cake_name: "Chocolate Truffle Dream",
  },
  {
    id: "r2",
    customer_name: "Rahul & Meena",
    rating: 5,
    comment: "Our wedding cake was everything we dreamed of and more. The team went above and beyond. Every single guest asked where we got it!",
    date: "2024-11-15",
    avatar: "RM",
    cake_name: "Royal Wedding Tier",
  },
  {
    id: "r3",
    customer_name: "Ananya Krishnan",
    rating: 5,
    comment: "Ordered the unicorn cake for my daughter's 5th birthday. She was absolutely thrilled — it tasted as magical as it looked. Outstanding!",
    date: "2024-11-10",
    avatar: "AK",
    cake_name: "Unicorn Fantasy",
  },
  {
    id: "r4",
    customer_name: "Vikram Patel",
    rating: 4,
    comment: "Superb tiramisu cake for our anniversary. Rich flavours, beautifully presented. The custom message was a lovely touch.",
    date: "2024-11-05",
    avatar: "VP",
    cake_name: "Tiramisu Elegante",
  },
];

// ── DB HELPERS ────────────────────────────────────────────────────────────────
export async function getCakes(opts?: { category?: string; search?: string; limit?: number }): Promise<Cake[]> {
  if (!supabase) {
    let r = [...MOCK_CAKES];
    if (opts?.category) r = r.filter((c) => c.category === opts.category);
    if (opts?.search) { const q = opts.search.toLowerCase(); r = r.filter((c) => c.name.toLowerCase().includes(q) || c.description.toLowerCase().includes(q)); }
    if (opts?.limit) r = r.slice(0, opts.limit);
    return r;
  }
  let q = supabase.from("cakes").select("*");
  if (opts?.category) q = q.eq("category", opts.category);
  if (opts?.search) q = q.ilike("name", `%${opts.search}%`);
  if (opts?.limit) q = q.limit(opts.limit);
  const { data, error } = await q;
  if (error) { console.error(error); return MOCK_CAKES; }
  return data || [];
}

export async function getCakeById(id: string): Promise<Cake | null> {
  if (!supabase) return MOCK_CAKES.find((c) => c.id === id) || null;
  const { data, error } = await supabase.from("cakes").select("*").eq("id", id).single();
  if (error) return MOCK_CAKES.find((c) => c.id === id) || null;
  return data;
}

export async function getBestSellers(): Promise<Cake[]> {
  if (!supabase) return MOCK_CAKES.filter((c) => c.is_best_seller);
  const { data, error } = await supabase.from("cakes").select("*").eq("is_best_seller", true).limit(6);
  if (error) return MOCK_CAKES.filter((c) => c.is_best_seller);
  return data || [];
}