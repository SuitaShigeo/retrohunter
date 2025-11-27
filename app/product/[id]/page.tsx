import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ExternalLink, ShieldCheck, ChevronRight } from "lucide-react";
import { products, getAffiliateLink } from "@/lib/data";
import type { Metadata } from "next";

interface ProductPageProps {
    params: Promise<{
        id: string;
    }>;
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
    const { id } = await params;
    const product = products.find((p) => p.id === id);

    if (!product) {
        return {
            title: "Product Not Found - Japan Retro Hunt",
        };
    }

    return {
        title: `${product.title} - Japan Retro Hunt`,
        description: `Buy ${product.title} directly from Japan. Best condition retro gears.`,
        openGraph: {
            title: `${product.title} - Japan Retro Hunt`,
            description: `Buy ${product.title} directly from Japan. Best condition retro gears.`,
            images: [
                {
                    url: product.imageUrl,
                    width: 1200,
                    height: 630,
                    alt: product.title,
                },
            ],
        },
    };
}

export async function generateStaticParams() {
    return products.map((product) => ({
        id: product.id,
    }));
}

export default async function ProductPage({ params }: ProductPageProps) {
    const { id } = await params;
    const product = products.find((p) => p.id === id);

    if (!product) {
        notFound();
    }

    // Get related products (random 3 from same category, excluding current)
    const relatedProducts = products
        .filter((p) => p.category === product.category && p.id !== product.id)
        .sort(() => 0.5 - Math.random())
        .slice(0, 3);

    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "Product",
        name: product.title,
        image: product.imageUrl,
        description: product.description,
        offers: {
            "@type": "Offer",
            price: product.priceYen,
            priceCurrency: "JPY",
            availability: "https://schema.org/InStock",
        },
    };

    return (
        <div className="min-h-screen bg-[#0a0a0a] pb-24 lg:pb-12">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />

            <div className="container mx-auto px-4 py-8 lg:py-12">
                {/* Breadcrumbs */}
                <nav className="mb-8 flex items-center gap-2 text-sm text-gray-400">
                    <Link href="/" className="hover:text-white">Home</Link>
                    <ChevronRight className="h-4 w-4" />
                    <Link href={`/?category=${product.category}`} className="hover:text-white">{product.category}</Link>
                    <ChevronRight className="h-4 w-4" />
                    <span className="text-white truncate">{product.title}</span>
                </nav>

                <div className="grid gap-12 lg:grid-cols-2">
                    {/* Image Section */}
                    <div className="relative aspect-square overflow-hidden rounded-2xl border border-white/10 bg-white/5">
                        <Image
                            src={product.imageUrl}
                            alt={product.title}
                            fill
                            className="object-cover"
                            priority
                        />
                        {product.condition === "Mint" && (
                            <div className="absolute top-4 left-4 rounded-full bg-green-500 px-3 py-1 text-xs font-bold text-black uppercase tracking-wider shadow-lg">
                                Mint Condition
                            </div>
                        )}
                    </div>

                    {/* Details Section */}
                    <div className="flex flex-col justify-center">
                        <div className="mb-4 flex items-center gap-4">
                            <span className="rounded-full bg-red-500/10 px-3 py-1 text-xs font-bold text-red-500 uppercase tracking-wider">
                                {product.category}
                            </span>
                            {product.isFeatured && (
                                <span className="rounded-full bg-yellow-500/10 px-3 py-1 text-xs font-bold text-yellow-500 uppercase tracking-wider">
                                    Featured Drop
                                </span>
                            )}
                        </div>

                        <h1 className="mb-4 text-4xl font-black tracking-tight text-white sm:text-5xl">
                            {product.title}
                        </h1>

                        <div className="mb-8 flex items-baseline gap-4">
                            <span className="text-4xl font-bold text-white">
                                ${product.priceUsd.toLocaleString()}
                            </span>
                            <span className="text-xl text-gray-500">
                                (¥{product.priceYen.toLocaleString()})
                            </span>
                        </div>

                        <div className="mb-8 rounded-xl border border-white/10 bg-white/5 p-6">
                            <h3 className="mb-2 text-lg font-bold text-white">Why this is cool</h3>
                            <p className="text-gray-300 leading-relaxed">
                                {product.description}
                            </p>
                        </div>

                        {/* Desktop Buy Button */}
                        <div className="hidden flex-col gap-4 lg:flex">
                            <a
                                href={getAffiliateLink(product.affiliateLink)}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-red-600 px-8 py-4 text-lg font-bold text-white transition-all hover:bg-red-700 hover:shadow-[0_0_30px_rgba(255,0,51,0.4)]"
                            >
                                Buy from Japan
                                <ExternalLink className="h-5 w-5" />
                            </a>
                            <p className="text-center text-xs text-gray-500">
                                *You will be redirected to our trusted partner site.
                            </p>
                        </div>

                        <div className="mt-8 flex items-center gap-2 text-sm text-gray-400">
                            <ShieldCheck className="h-4 w-4 text-green-500" />
                            <span>Curated for authenticity and quality.</span>
                        </div>
                    </div>
                </div>

                {/* Related Products */}
                {relatedProducts.length > 0 && (
                    <div className="mt-24 border-t border-white/10 pt-16">
                        <h2 className="mb-8 text-2xl font-bold text-white">You might also like</h2>
                        <div className="grid gap-6 sm:grid-cols-3">
                            {relatedProducts.map((related) => (
                                <Link
                                    key={related.id}
                                    href={`/product/${related.id}`}
                                    className="group relative overflow-hidden rounded-xl border border-white/10 bg-white/5 transition-all hover:-translate-y-1 hover:border-red-500/50"
                                >
                                    <div className="aspect-[4/3] overflow-hidden">
                                        <Image
                                            src={related.imageUrl}
                                            alt={related.title}
                                            width={400}
                                            height={300}
                                            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                                        />
                                    </div>
                                    <div className="p-4">
                                        <h3 className="mb-1 text-sm font-bold text-white group-hover:text-red-500 truncate">
                                            {related.title}
                                        </h3>
                                        <p className="text-sm text-gray-400">${related.priceUsd}</p>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {/* Mobile Sticky Buy Button */}
            <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-white/10 bg-black/90 p-4 backdrop-blur-lg lg:hidden">
                <a
                    href={getAffiliateLink(product.affiliateLink)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-red-600 px-6 py-3 text-base font-bold text-white shadow-[0_0_20px_rgba(220,38,38,0.4)] transition-all active:scale-95"
                >
                    Buy from Japan (${product.priceUsd})
                    <ExternalLink className="h-4 w-4" />
                </a>
            </div>
        </div>
    );
}
