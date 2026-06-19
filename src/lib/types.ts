export interface Cake {
  id: string;
  name: string;
  description: string;
  price: number;
  emoji?: string;
  original_price?: number;
  category: string;
  image_url: string;
  images: string[];
  rating: number;
  review_count: number;
  weight_options: { weight: string; price: number }[];
  flavour_options: string[];
  ingredients: string[];
  is_best_seller?: boolean;
  is_featured?: boolean;
  discount_percent?: number;
  stock: number;
  created_at: string;
}

export interface Review {
  id: string;
  customer_name: string;
  rating: number;
  comment: string;
  date: string;
  avatar: string;
  cake_name: string;
}
