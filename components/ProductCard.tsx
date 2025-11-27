import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Product } from "@/lib/data";

interface ProductCardProps {
    product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
    return (
        <div className="group relative overflow-hidden rounded-lg border border-white/10 bg-white/5 transition-all hover:border-red-500/50 hover:shadow-[0_0_20px_rgba(255,0,51,0.15)]">
            <div className="aspect-square relative overflow-hidden">
                <Image
                    src={product.imageUrl}
                    alt={product.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            </div>

            <div className="p-4">
                <div className="mb-2 flex items-center justify-between">
                    <span className="text-xs font-medium text-red-500 uppercase tracking-wider">
                        {product.category}
                    </span>
                    <span className="text-sm text-gray-400">
                        ¥{product.priceYen.toLocaleString()}
                    </span>
                </div>

                <h3 className="mb-1 text-lg font-bold text-white line-clamp-1">
                    {product.title}
                </h3>

                <div className="flex items-center justify-between mt-4">
                    <span className="text-xl font-bold text-white">
                        ${product.priceUsd.toLocaleString()}
                    </span>

                    <Link
                        href={`/product/${product.id}`}
                        className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-red-600 hover:text-white group-hover:bg-red-600"
                    >
                        Details
                        <ArrowRight className="h-4 w-4" />
                    </Link>
                </div>
            </div>
        </div>
    );
}
