import Link from "next/link";
import ProductFeed from "@/components/ProductFeed";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      {/* Hero Section */}
      <section className="relative h-[70vh] w-full overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#0a0a0a] z-10" />
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1550745165-9bc0b252726f?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80')] bg-cover bg-center opacity-50" />
        </div>

        <div className="relative z-20 flex h-full flex-col items-center justify-center px-4 text-center">
          <h1 className="mb-6 text-6xl font-black tracking-tighter text-white sm:text-8xl md:text-9xl">
            RETRO<span className="text-red-600">HUNT</span>
          </h1>
          <p className="max-w-2xl text-lg text-gray-300 md:text-xl">
            Curated vintage treasures from the streets of Tokyo.
            Cameras, games, and timepieces that tell a story.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-24">
        <div className="mb-16 flex items-end justify-between">
          <div>
            <h2 className="text-3xl font-bold text-white md:text-4xl">Latest Drops</h2>
            <p className="mt-2 text-gray-400">Fresh finds from Akihabara & Nakano Broadway</p>
          </div>
        </div>

        <ProductFeed />
      </main>

      {/* Footer */}
      <footer className="border-t border-white/10 bg-black py-12 text-center text-gray-500">
        <p>© 2024 Japan Retro Hunt. Sourced with ❤️ from Tokyo.</p>
      </footer>
    </div>
  );
}
