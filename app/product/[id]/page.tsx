import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ExternalLink, ShieldCheck, ChevronRight, Sparkles } from "lucide-react";
import { getProducts, getProductById } from "@/lib/google-sheets";
import { getAffiliateLink } from "@/lib/data";
import { Button } from "@/components/ui/Button";
import type { Metadata } from "next";

export const revalidate = 3600; // ISR: Revalidate every 1 hour

interface ProductPageProps {
    params: Promise<{
        id: string;
    }>;
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
    const { id } = await params;
    const product = await getProductById(id);

    if (!product) {
        return {
            title: "Product Not Found - Japan Retro Hunt",
        };
    }

    return {
        title: `${product.title} - Japan Retro Hunt`,
        description: `Buy ${product.title} directly from Japan. ${product.description}`,
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
    const products = await getProducts();
    return products.map((product) => ({
        id: product.id,
    }));
}

export default async function ProductPage({ params }: ProductPageProps) {
    const { id } = await params;
    const products = await getProducts();
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
        <div className="min-h-screen bg-background pb-24 lg:pb-12">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />

            <div className="container mx-auto px-4 py-8 lg:py-12">
                {/* Breadcrumbs */}
                <nav className="mb-8 flex items-center gap-2 text-sm text-gray-400">
                    <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
                    <ChevronRight className="h-4 w-4" />
                    <Link href={`/?category=${product.category}`} className="hover:text-foreground transition-colors">{product.category}</Link>
                    <ChevronRight className="h-4 w-4" />
                    <span className="text-foreground truncate">{product.title}</span>
                </nav>

                <div className="grid gap-12 lg:grid-cols-2">
                    {/* Image Section */}
                    <div className="relative aspect-square overflow-hidden rounded-2xl border border-white/10 bg-card">
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
                        {product.isFeatured && (
                            <div className="absolute top-4 right-4 inline-flex items-center gap-1 rounded-full bg-primary/90 px-3 py-1 text-xs font-bold text-primary-foreground uppercase tracking-wider shadow-lg">
                                <Sparkles className="h-3 w-3" />
                                Featured
                            </div>
                        )}
                    </div>

                    {/* Details Section */}
                    <div className="flex flex-col justify-center">
                        <div className="mb-4 flex items-center gap-4">
                            <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-bold text-primary uppercase tracking-wider">
                                {product.category}
                            </span>
                            <span className="text-sm text-gray-400">
                                Condition: <span className="text-foreground font-medium">{product.condition}</span>
                            </span>
                        </div>

                        <h1 className="mb-4 text-4xl font-black tracking-tight text-foreground sm:text-5xl">
                            {product.title}
                        </h1>

                        <div className="mb-8 flex items-baseline gap-4">
                            {product.priceUsd > 0 ? (
                                <>
                                    <span className="text-4xl font-bold text-foreground">
                                        ${product.priceUsd.toLocaleString()}
                                    </span>
                                    <span className="text-xl text-gray-500">
                                        (¥{product.priceYen.toLocaleString()})
                                    </span>
                                </>
                            ) : (
                                <span className="inline-block rounded-full bg-primary/20 px-4 py-2 text-lg font-medium text-primary">
                                    Check Availability
                                </span>
                            )}
                        </div>

                        <div className="mb-8 rounded-xl border border-white/10 bg-card p-6">
                            <h3 className="mb-2 text-lg font-bold text-foreground">Why this is cool</h3>
                            <p className="text-gray-300 leading-relaxed">
                                {product.description}
                            </p>
                        </div>

                        {/* Desktop Buy Button */}
                        <div className="hidden flex-col gap-4 lg:flex">
                            <Button
                                size="lg"
                                className="w-full gap-2 shadow-[0_0_30px_rgba(255,0,51,0.4)]"
                                asChild
                            >
                                <a
                                    href={getAffiliateLink(product.affiliateLink)}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    {product.priceUsd > 0 ? "Buy from Japan" : "Check Price at Shop"}
                                    <ExternalLink className="h-5 w-5" />
                                </a>
                            </Button>
                            <p className="text-center text-xs text-gray-500">
                                *You will be redirected to our trusted partner site (Buyee).
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
                        <h2 className="mb-8 text-2xl font-bold text-foreground">You might also like</h2>
                        <div className="grid gap-6 sm:grid-cols-3">
                            {relatedProducts.map((related) => (
                                <Link
                                    key={related.id}
                                    href={`/product/${related.id}`}
                                    className="group relative overflow-hidden rounded-xl border border-white/10 bg-card transition-all duration-300 hover:-translate-y-1 hover:border-primary/50 hover:shadow-[0_0_20px_rgba(255,0,51,0.2)]"
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
                                        <span className="text-xs font-bold text-primary uppercase tracking-wider">
                                            {related.category}
                                        </span>
                                        <h3 className="mt-1 text-sm font-bold text-foreground group-hover:text-primary transition-colors truncate">
                                            {related.title}
                                        </h3>
                                        {related.priceUsd > 0 ? (
                                            <p className="mt-1 text-lg font-bold text-foreground">${related.priceUsd}</p>
                                        ) : (
                                            <span className="mt-1 inline-block text-sm font-medium text-primary">View Price</span>
                                        )}
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {/* Mobile Sticky Buy Button */}
            <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-white/10 bg-background/90 p-4 backdrop-blur-lg lg:hidden">
                <Button
                    size="lg"
                    className="w-full gap-2 shadow-[0_0_20px_rgba(255,0,51,0.4)] active:scale-95"
                    asChild
                >
                    <a
                        href={getAffiliateLink(product.affiliateLink)}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        {product.priceUsd > 0
                            ? `Buy from Japan ($${product.priceUsd})`
                            : "Check Price at Shop"}
                        <ExternalLink className="h-4 w-4" />
                    </a>
                </Button>
            </div>
        </div>
    );
}
