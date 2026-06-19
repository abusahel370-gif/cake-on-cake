-- Create an orders table
create table if not exists orders (
  id uuid default gen_random_uuid() primary key,
  customer_name text not null,
  customer_email text not null,
  customer_phone text not null,
  delivery_address text not null,
  delivery_date date not null,
  delivery_time_slot text not null,
  total_amount numeric(10, 2) not null,
  status text default 'pending' not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create an order items breakdown table
create table if not exists order_items (
  id uuid default gen_random_uuid() primary key,
  order_id uuid references orders(id) on delete cascade not null,
  cake_id text not null,
  cake_name text not null,
  quantity integer not null,
  price_at_purchase numeric(10, 2) not null
);
