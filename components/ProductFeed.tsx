"use client";

import { useState, useMemo } from "react";
import { Search, SlidersHorizontal } from "lucide-react";
import { Product } from "@/lib/data";
import { Button } from "@/components/ui/Button";
import { ProductCard } from "@/components/ProductCard";

type Category = "All" | "Camera" | "Game" | "Watch";
type SortOption = "newest" | "price_asc" | "price_desc";

interface ProductFeedProps {
    initialProducts: Product[];
}

export default function ProductFeed({ initialProducts }: ProductFeedProps) {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState<Category>("All");
    const [sortBy, setSortBy] = useState<SortOption>("newest");

    const filteredProducts = useMemo(() => {
        let result = [...initialProducts];

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
                result.sort((a, b) => Number(b.id) - Number(a.id));
                break;
        }

        return result;
    }, [initialProducts, searchQuery, selectedCategory, sortBy]);

    return (
        <div className="space-y-8">
            {/* Controls Header */}
            <div className="sticky top-16 z-10 -mx-4 bg-background/80 px-4 py-4 backdrop-blur-md sm:static sm:mx-0 sm:bg-transparent sm:px-0 sm:py-0">
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    {/* Search Bar */}
                    <div className="relative w-full md:max-w-md">
                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                            <Search className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                            type="text"
                            placeholder="Search retro gear..."
                            className="block w-full rounded-full border border-white/10 bg-white/5 py-3 pl-10 pr-4 text-foreground placeholder-gray-400 focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none transition-colors"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>

                    {/* Filters & Sort */}
                    <div className="flex flex-wrap items-center gap-3">
                        {/* Category Tabs */}
                        <div className="flex overflow-x-auto rounded-full border border-white/10 bg-card p-1 scrollbar-hide">
                            {(["All", "Camera", "Game", "Watch"] as Category[]).map((cat) => (
                                <Button
                                    key={cat}
                                    variant={selectedCategory === cat ? "default" : "ghost"}
                                    size="sm"
                                    onClick={() => setSelectedCategory(cat)}
                                    className="rounded-full"
                                >
                                    {cat}
                                </Button>
                            ))}
                        </div>

                        {/* Sort Dropdown */}
                        <div className="relative">
                            <select
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value as SortOption)}
                                className="appearance-none rounded-full border border-white/10 bg-card py-3 pl-4 pr-10 text-sm font-medium text-foreground focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none transition-colors"
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
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            ) : (
                <div className="flex min-h-[300px] flex-col items-center justify-center rounded-2xl border border-dashed border-white/10 bg-card p-12 text-center">
                    <Search className="mb-4 h-12 w-12 text-gray-600" />
                    <h3 className="mb-2 text-xl font-bold text-foreground">No items found</h3>
                    <p className="text-gray-400">
                        Try adjusting your search or filters to find what you&apos;re looking for.
                    </p>
                    <Button
                        variant="outline"
                        onClick={() => {
                            setSearchQuery("");
                            setSelectedCategory("All");
                        }}
                        className="mt-6"
                    >
                        Clear Filters
                    </Button>
                </div>
            )}
        </div>
    );
}
