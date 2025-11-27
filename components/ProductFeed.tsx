"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { Search, SlidersHorizontal } from "lucide-react";
import { Product, products } from "@/lib/data";

type Category = "All" | "Camera" | "Game" | "Watch";
type SortOption = "newest" | "price_asc" | "price_desc";

export default function ProductFeed() {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState<Category>("All");
    const [sortBy, setSortBy] = useState<SortOption>("newest");

    const filteredProducts = useMemo(() => {
        let result = [...products];

        // Filter by Category
        if (selectedCategory !== "All") {
            result = result.filter((p) => p.category === selectedCategory);
        }

        // Filter by Search Query
        if (searchQuery) {
            const query = searchQuery.toLowerCase();
            result = result.filter((p) =>
                p.title.toLowerCase().includes(query)
            );
        }

        // Sort
        switch (sortBy) {
            case "price_asc":
                result.sort((a, b) => a.priceUsd - b.priceUsd);
                break;
            case "price_desc":
                result.sort((a, b) => b.priceUsd - a.priceUsd);
                break;
            case "newest":
            default:
                // Assuming higher ID is newer for now, or just keep original order
                // In a real app, we'd have a createdAt date
                result.sort((a, b) => Number(b.id) - Number(a.id));
                break;
        }

        return result;
    }, [searchQuery, selectedCategory, sortBy]);

    return (
        <div className="space-y-8">
            {/* Controls Header */}
            <div className="sticky top-0 z-10 -mx-4 bg-black/80 px-4 py-4 backdrop-blur-md sm:static sm:mx-0 sm:bg-transparent sm:px-0 sm:py-0">
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    {/* Search Bar */}
                    <div className="relative w-full md:max-w-md">
                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                            <Search className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                            type="text"
                            placeholder="Search retro gear..."
                            className="block w-full rounded-full border border-white/10 bg-white/5 py-3 pl-10 pr-4 text-white placeholder-gray-400 focus:border-red-500 focus:ring-1 focus:ring-red-500 focus:outline-none"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>

                    {/* Filters & Sort */}
                    <div className="flex flex-wrap items-center gap-3">
                        {/* Category Tabs */}
                        <div className="flex overflow-x-auto rounded-full border border-white/10 bg-white/5 p-1 scrollbar-hide">
                            {(["All", "Camera", "Game", "Watch"] as Category[]).map((cat) => (
                                <button
                                    key={cat}
                                    onClick={() => setSelectedCategory(cat)}
                                    className={`rounded-full px-4 py-2 text-sm font-medium transition-all ${selectedCategory === cat
                                            ? "bg-red-600 text-white shadow-lg"
                                            : "text-gray-400 hover:text-white"
                                        }`}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>

                        {/* Sort Dropdown */}
                        <div className="relative">
                            <select
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value as SortOption)}
                                className="appearance-none rounded-full border border-white/10 bg-white/5 py-3 pl-4 pr-10 text-sm font-medium text-white focus:border-red-500 focus:ring-1 focus:ring-red-500 focus:outline-none"
                            >
                                <option value="newest">Newest Arrivals</option>
                                <option value="price_asc">Price: Low to High</option>
                                <option value="price_desc">Price: High to Low</option>
                            </select>
                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                                <SlidersHorizontal className="h-4 w-4 text-gray-400" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Product Grid */}
            {filteredProducts.length > 0 ? (
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {filteredProducts.map((product) => (
                        <Link
                            key={product.id}
                            href={`/product/${product.id}`}
                            className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 transition-all hover:-translate-y-1 hover:border-red-500/50 hover:shadow-[0_0_30px_rgba(220,38,38,0.2)]"
                        >
                            <div className="aspect-[4/3] overflow-hidden">
                                <Image
                                    src={product.imageUrl}
                                    alt={product.title}
                                    width={600}
                                    height={450}
                                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                                />
                                {product.isFeatured && (
                                    <div className="absolute top-3 right-3 rounded-full bg-yellow-500 px-3 py-1 text-xs font-bold text-black uppercase tracking-wider shadow-lg">
                                        Featured
                                    </div>
                                )}
                                {product.condition === "Mint" && (
                                    <div className="absolute top-3 left-3 rounded-full bg-green-500 px-3 py-1 text-xs font-bold text-black uppercase tracking-wider shadow-lg">
                                        Mint
                                    </div>
                                )}
                            </div>
                            <div className="p-5">
                                <div className="mb-2 flex items-center justify-between">
                                    <span className="text-xs font-bold text-red-500 uppercase tracking-wider">
                                        {product.category}
                                    </span>
                                    <span className="text-xs text-gray-400">{product.condition}</span>
                                </div>
                                <h3 className="mb-2 text-lg font-bold text-white group-hover:text-red-500">
                                    {product.title}
                                </h3>
                                <div className="flex items-baseline gap-2">
                                    <span className="text-xl font-bold text-white">
                                        ${product.priceUsd}
                                    </span>
                                    <span className="text-sm text-gray-500">
                                        (¥{product.priceYen.toLocaleString()})
                                    </span>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            ) : (
                <div className="flex min-h-[300px] flex-col items-center justify-center rounded-2xl border border-dashed border-white/10 bg-white/5 p-12 text-center">
                    <Search className="mb-4 h-12 w-12 text-gray-600" />
                    <h3 className="mb-2 text-xl font-bold text-white">No items found</h3>
                    <p className="text-gray-400">
                        Try adjusting your search or filters to find what you're looking for.
                    </p>
                    <button
                        onClick={() => {
                            setSearchQuery("");
                            setSelectedCategory("All");
                        }}
                        className="mt-6 rounded-full bg-white/10 px-6 py-2 text-sm font-bold text-white transition-colors hover:bg-white/20"
                    >
                        Clear Filters
                    </button>
                </div>
            )}
        </div>
    );
}
