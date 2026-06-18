import { supabase } from "@/lib/supabase";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export const revalidate = 0;

export default async function Home() {
  const { data: products, error } = await supabase
    .from("cakes")
    .select("*");

  if (error) {
    console.error("Error fetching cakes:", error);
  }

  return (
    <div className="min-h-screen">
      {/* Navigation Header */}
      <header className="sticky top-0 z-50 border-b border-[var(--border)] bg-[var(--card)]/80 backdrop-blur-md transition-colors">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold tracking-tight text-[var(--primary)] font-serif">🎂 CAKE-ON-CAKE</span>
          </div>
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-[var(--muted-foreground)]">
            <a href="#" className="text-[var(--foreground)] hover:text-[var(--primary)] transition-colors">Menu</a>
            <a href="#" className="hover:text-[var(--primary)] transition-colors">Our Story</a>
            <a href="#" className="hover:text-[var(--primary)] transition-colors">Custom Orders</a>
          </nav>
          <div className="flex items-center gap-4">
            <button className="rounded-full bg-[var(--primary)] px-4 py-2 text-sm font-medium text-[var(--primary-foreground)] shadow-sm hover:opacity-90 transition-opacity cursor-pointer">
              View Cart (0)
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[var(--secondary)] to-[var(--background)] py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <span className="inline-flex items-center rounded-full bg-[var(--accent)] px-3 py-1 text-xs font-medium text-[var(--accent-foreground)] ring-1 ring-inset ring-[var(--border)] mb-4">
            Freshly Baked Every Morning ✨
          </span>
          <h1 className="mx-auto max-w-3xl text-4xl font-bold tracking-tight text-[var(--foreground)] sm:text-6xl font-serif">
            Artisanal Confections <br />
            <span className="text-[var(--primary)]">Crafted with Pure Love</span>
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-[var(--muted-foreground)]">
            Elevate your special moments with premium cakes, hand-selected organic ingredients, and designs customized specifically for your story.
          </p>
        </div>
      </section>

      {/* Menu / Product Grid */}
      <main id="menu" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight text-[var(--foreground)] font-serif">Today's Fresh Showcase</h2>
          <p className="mt-2 text-[var(--muted-foreground)]">Pick from our freshly baked signature delicacies ready for delivery.</p>
        </div>

        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
          {products && products.length > 0 ? (
            products.map((product) => (
              <Card key={product.id} className="group relative flex flex-col overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--card)] p-2 shadow-sm hover:shadow-md transition-all duration-200">
                <CardHeader className="p-0">
                  {/* Image Container */}
                  <div className="aspect-square w-full rounded-xl bg-[var(--muted)] flex items-center justify-center text-5xl group-hover:scale-[1.01] transition-transform duration-300">
                    🍰
                  </div>
                </CardHeader>
                
                <CardContent className="mt-4 flex-1 p-2">
                  <div className="mb-2">
                    <Badge variant="secondary" className="text-[10px] font-semibold tracking-wider uppercase bg-[var(--accent)] text-[var(--accent-foreground)]">
                      {product.category}
                    </Badge>
                  </div>
                  <h3 className="text-lg font-bold text-[var(--foreground)] tracking-tight">{product.name}</h3>
                  <p className="mt-1 text-sm text-[var(--muted-foreground)] line-clamp-2 leading-relaxed">{product.description}</p>
                </CardContent>

                <CardFooter className="flex items-center justify-between p-2 mt-4 pt-0">
                  <span className="text-xl font-extrabold text-[var(--foreground)]">${Number(product.price).toFixed(2)}</span>
                  <button className="rounded-xl bg-[var(--primary)] text-[var(--primary-foreground)] px-4 py-2 text-xs font-semibold shadow-sm hover:opacity-90 transition-opacity cursor-pointer">
                    Add to Box
                  </button>
                </CardFooter>
              </Card>
            ))
          ) : (
            <div className="col-span-full text-center py-12 text-[var(--muted-foreground)]">
              No delicious cakes found.
            </div>
          )}
        </div>
      </main>
    </div>
  );
}