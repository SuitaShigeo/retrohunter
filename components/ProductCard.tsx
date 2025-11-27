import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Product } from "@/lib/data";
import { Button } from "@/components/ui/Button";

interface ProductCardProps {
    product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
    return (
        <Link
            href={`/product/${product.id}`}
            className="group relative block overflow-hidden rounded-xl border border-white/10 bg-card transition-all hover:border-primary/50 hover:shadow-[0_0_30px_rgba(220,38,38,0.2)]"
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
                    <span className="absolute right-3 top-3 rounded-full bg-yellow-500 px-2 py-1 text-xs font-bold text-black shadow-lg">
                        FEATURED
                    </span>
                )}
                {product.condition === "Mint" && (
                    <span className="absolute left-3 top-3 rounded-full bg-green-500 px-2 py-1 text-xs font-bold text-black shadow-lg">
                        MINT
                    </span>
                )}
            </div>
            <div className="p-4">
                <div className="mb-2 flex items-center justify-between">
                    <span className="text-xs font-bold text-primary uppercase tracking-wider">
                        {product.category}
                    </span>
                    <span className="text-xs text-gray-400">{product.condition}</span>
                </div>
                <h3 className="mb-2 text-lg font-bold text-white transition-colors group-hover:text-primary">
                    {product.title}
                </h3>
                <div className="flex items-end justify-between">
                    <div>
                        <p className="text-xl font-bold text-white">${product.priceUsd}</p>
                        <p className="text-xs text-gray-500">
                            ¥{product.priceYen.toLocaleString()}
                        </p>
                    </div>
                    <Button variant="secondary" size="sm" className="rounded-full">
                        Details <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                </div>
            </div>
        </Link>
    );
}
