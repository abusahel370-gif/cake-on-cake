export interface Cake {
  id: string;
  name: string;
  description: string;
  price: number;
  original_price?: number;
  category: string;
  image_url: string;
  images?: string[];
}

export interface Review {
  id: string;
  cake_id: string;
  user_name: string;
  rating: number;
  comment: string;
  created_at: string;
}