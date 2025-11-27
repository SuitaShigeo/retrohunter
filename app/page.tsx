import Link from "next/link";
import Image from "next/image";
import { ArrowDown, Sparkles } from "lucide-react";
import { getProducts } from "@/lib/google-sheets";
import { Button } from "@/components/ui/Button";
import ProductFeed from "@/components/ProductFeed";

export const revalidate = 3600; // ISR: Revalidate every 1 hour

export default async function Home() {
  const products = await getProducts();
  const featuredProducts = products.filter((p) => p.isFeatured).slice(0, 4);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative h-[80vh] w-full overflow-hidden">
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-background/50 via-transparent to-background z-10" />

        {/* Background Image */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[url('/images/locations/hero-image.jpg')] bg-cover bg-center opacity-40" />
        </div>

        {/* Scanline Effect for Cyberpunk vibe */}
        <div className="absolute inset-0 z-10 pointer-events-none opacity-20 bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(0,0,0,0.3)_2px,rgba(0,0,0,0.3)_4px)]" />

        {/* Hero Content */}
        <div className="relative z-20 flex h-full flex-col items-center justify-center px-4 text-center">
          <h1 className="mb-6 text-6xl font-black tracking-tighter text-foreground sm:text-8xl md:text-9xl drop-shadow-[0_0_30px_rgba(255,0,51,0.3)]">
            RETRO<span className="text-primary drop-shadow-[0_0_20px_rgba(255,0,51,0.6)]">HUNT</span>
          </h1>
          <p className="max-w-2xl text-lg text-gray-300 md:text-xl mb-8">
            Hunting the Best Retro Gears from Kyoto & Osaka.
            <br />
            Cameras, games, and timepieces that tell a story.
          </p>
          <Button size="lg" className="gap-2 shadow-[0_0_30px_rgba(255,0,51,0.4)]" asChild>
            <a href="#featured">
              Shop Now
              <ArrowDown className="h-5 w-5 animate-bounce" />
            </a>
          </Button>
        </div>

        {/* Bottom Glow Effect */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-primary/10 to-transparent z-10" />
      </section>

      {/* Featured Section */}
      <section id="featured" className="container mx-auto px-4 py-24">
        <div className="mb-12 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-2 text-sm font-bold text-primary mb-4">
            <Sparkles className="h-4 w-4" />
            FEATURED DROPS
          </div>
          <h2 className="text-3xl font-black text-foreground md:text-5xl tracking-tight">
            Editor&apos;s Picks
          </h2>
          <p className="mt-4 text-gray-400 max-w-xl mx-auto">
            Hand-selected gems from our curators. These rare finds won&apos;t last long.
          </p>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {featuredProducts.map((product) => (
            <Link
              key={product.id}
              href={`/product/${product.id}`}
              className="group relative block overflow-hidden rounded-2xl border border-primary/20 bg-card transition-all duration-300 hover:border-primary/60 hover:shadow-[0_0_40px_rgba(255,0,51,0.3)] hover:-translate-y-2"
            >
              <div className="aspect-square overflow-hidden">
                <Image
                  src={product.imageUrl}
                  alt={product.title}
                  width={600}
                  height={600}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-60" />
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <span className="text-xs font-bold text-primary uppercase tracking-wider">
                  {product.category}
                </span>
                <h3 className="mt-1 text-lg font-bold text-foreground group-hover:text-primary transition-colors">
                  {product.title}
                </h3>
                <p className="mt-2 text-2xl font-black text-foreground">
                  ${product.priceUsd}
                </p>
              </div>
              {/* Neon Border Effect on Hover */}
              <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-primary/50 transition-colors pointer-events-none" />
            </Link>
          ))}
        </div>
      </section>

      {/* All Products Section */}
      <section className="border-t border-white/10 bg-background">
        <div className="container mx-auto px-4 py-24">
          <div className="mb-16 flex items-end justify-between">
            <div>
              <h2 className="text-3xl font-bold text-foreground md:text-4xl">All Products</h2>
              <p className="mt-2 text-gray-400">Fresh finds from Den Den Town & Teramachi</p>
            </div>
          </div>

          <ProductFeed initialProducts={products} />
        </div>
      </section>
    </div>
  );
}
