import Image from "next/image";
import Link from "next/link";
import { MapPin, ShieldCheck, Heart, Zap, ArrowRight, Instagram, LinkIcon } from "lucide-react";
import { Button } from "@/components/ui/Button";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "About Us - Japan Retro Hunt",
    description: "We are curators of vintage treasures from Kyoto and Osaka. Learn about our mission to bring authentic Japanese retro gear to collectors worldwide.",
    openGraph: {
        title: "About Us - Japan Retro Hunt",
        description: "We are curators of vintage treasures from Kyoto and Osaka. Learn about our mission to bring authentic Japanese retro gear to collectors worldwide.",
    },
};

const values = [
    {
        icon: ShieldCheck,
        title: "Authenticity First",
        description: "Every item is carefully verified for authenticity. We work only with trusted sellers in Japan's most reputable vintage markets.",
    },
    {
        icon: Heart,
        title: "Passion for Retro",
        description: "We're collectors ourselves. Each piece we curate is something we'd proudly add to our own collection.",
    },
    {
        icon: MapPin,
        title: "Sourced from Kansai",
        description: "From Osaka's Den Den Town to Kyoto's antique markets, we hunt in the best spots of the Kansai region.",
    },
    {
        icon: Zap,
        title: "Quality Curation",
        description: "We don't list everything. Only items that meet our strict quality and condition standards make the cut.",
    },
];

const locations = [
    {
        name: "Den Den Town",
        city: "Osaka",
        description: "Osaka's electric town - Paradise for vintage electronics and retro gaming",
        image: "/images/locations/dendentown.jpg",
    },
    {
        name: "Teramachi & Shinkyogoku",
        city: "Kyoto",
        description: "Historic shopping arcades hiding vintage camera and watch treasures",
        image: "/images/locations/teramachi.jpg",
    },
    {
        name: "Shinsaibashi",
        city: "Osaka",
        description: "Premium vintage shops and collector's stores in the heart of Osaka",
        image: "/images/locations/shinsaibashi.jpg",
    },
];

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-background">
            {/* Hero Section */}
            <section className="relative py-24 overflow-hidden">
                {/* Background Gradient */}
                <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />

                <div className="container mx-auto px-4 relative z-10">
                    <div className="max-w-3xl mx-auto text-center">
                        <span className="inline-block rounded-full border border-primary/30 bg-primary/10 px-4 py-2 text-sm font-bold text-primary mb-6">
                            OUR STORY
                        </span>
                        <h1 className="text-4xl font-black tracking-tight text-foreground sm:text-5xl md:text-6xl mb-6">
                            We Hunt So You
                            <span className="text-primary"> Don't Have To</span>
                        </h1>
                        <p className="text-xl text-gray-400 leading-relaxed">
                            Japan Retro Hunt was born from a simple frustration: finding authentic vintage
                            Japanese gear from overseas is hard. Really hard. So we decided to do the
                            hunting for you.
                        </p>
                    </div>
                </div>
            </section>

            {/* Mission Section */}
            <section className="py-24 border-t border-white/10">
                <div className="container mx-auto px-4">
                    <div className="grid gap-16 lg:grid-cols-2 items-center">
                        <div>
                            <h2 className="text-3xl font-bold text-foreground mb-6">
                                Bridging Kansai's Vintage Scene to the World
                            </h2>
                            <div className="space-y-4 text-gray-400 leading-relaxed">
                                <p>
                                    Kyoto and Osaka are home to some of the world's best-preserved vintage gear.
                                    Film cameras in mint condition, gaming consoles that look brand new,
                                    watches maintained with obsessive Japanese precision.
                                </p>
                                <p>
                                    But accessing these treasures from abroad? That's where it gets tricky.
                                    Language barriers, shipping concerns, authenticity worries — we've been there.
                                </p>
                                <p>
                                    That's why we created Japan Retro Hunt. Based in the Kansai region, we partner
                                    with trusted sellers and marketplaces to bring you the best of Japanese vintage,
                                    with full transparency about condition and authenticity.
                                </p>
                            </div>
                            <div className="mt-8 p-6 rounded-xl border border-primary/20 bg-primary/5">
                                <p className="text-sm text-gray-400 mb-2">Important Note</p>
                                <p className="text-foreground font-medium">
                                    We are curators, not sellers. When you click "Buy from Japan," you'll be
                                    redirected to our trusted affiliate partners who handle the actual transaction
                                    and shipping.
                                </p>
                            </div>
                        </div>
                        <div className="relative">
                            <div className="aspect-square rounded-2xl overflow-hidden border border-white/10">
                                <Image
                                    src="/images/locations/photo-1545569341-9eb8b30979d9.jpeg"
                                    alt="Kyoto traditional street"
                                    width={600}
                                    height={600}
                                    className="h-full w-full object-cover"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Values Section */}
            <section className="py-24 border-t border-white/10">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold text-foreground mb-4">What We Stand For</h2>
                        <p className="text-gray-400 max-w-xl mx-auto">
                            Our commitment to quality and authenticity guides everything we do.
                        </p>
                    </div>
                    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
                        {values.map((value) => (
                            <div
                                key={value.title}
                                className="p-6 rounded-xl border border-white/10 bg-card hover:border-primary/30 transition-colors"
                            >
                                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                                    <value.icon className="h-6 w-6 text-primary" />
                                </div>
                                <h3 className="text-lg font-bold text-foreground mb-2">{value.title}</h3>
                                <p className="text-sm text-gray-400 leading-relaxed">{value.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Hunting Grounds Section */}
            <section className="py-24 border-t border-white/10">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold text-foreground mb-4">Our Hunting Grounds</h2>
                        <p className="text-gray-400 max-w-xl mx-auto">
                            We source from Kansai's most legendary spots for vintage goods.
                        </p>
                    </div>
                    <div className="grid gap-8 md:grid-cols-3">
                        {locations.map((location) => (
                            <div
                                key={location.name}
                                className="group relative overflow-hidden rounded-2xl border border-white/10"
                            >
                                <div className="aspect-[4/3] overflow-hidden">
                                    <Image
                                        src={location.image}
                                        alt={location.name}
                                        width={800}
                                        height={600}
                                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
                                </div>
                                <div className="absolute bottom-0 left-0 right-0 p-6">
                                    <div className="flex items-center gap-2 text-primary mb-2">
                                        <MapPin className="h-4 w-4" />
                                        <span className="text-sm font-bold uppercase tracking-wider">{location.city}</span>
                                    </div>
                                    <h3 className="text-xl font-bold text-foreground mb-1">{location.name}</h3>
                                    <p className="text-sm text-gray-400">{location.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Connect Section */}
            <section className="py-24 border-t border-white/10">
                <div className="container mx-auto px-4">
                    <div className="max-w-2xl mx-auto text-center">
                        <h2 className="text-3xl font-bold text-foreground mb-4">
                            Connect With Us
                        </h2>
                        <p className="text-gray-400 mb-8">
                            Follow our journey hunting vintage treasures across Kansai.
                            Get updates on new finds and behind-the-scenes content.
                        </p>
                        <div className="flex justify-center gap-4 mb-12">
                            <a
                                href="https://www.instagram.com/japan_retro_hunter/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-3 rounded-full border border-white/10 bg-card px-6 py-3 text-foreground transition-all hover:border-primary/50 hover:shadow-[0_0_20px_rgba(255,0,51,0.3)]"
                            >
                                <Instagram className="h-5 w-5 text-primary" />
                                <span className="font-medium">Instagram</span>
                            </a>
                            <a
                                href="https://linktr.ee/japanretrohunt"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-3 rounded-full border border-white/10 bg-card px-6 py-3 text-foreground transition-all hover:border-primary/50 hover:shadow-[0_0_20px_rgba(255,0,51,0.3)]"
                            >
                                <LinkIcon className="h-5 w-5 text-primary" />
                                <span className="font-medium">Linktree</span>
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-24 border-t border-white/10">
                <div className="container mx-auto px-4">
                    <div className="max-w-2xl mx-auto text-center">
                        <h2 className="text-3xl font-bold text-foreground mb-4">
                            Ready to Start Your Hunt?
                        </h2>
                        <p className="text-gray-400 mb-8">
                            Browse our curated collection of vintage cameras, gaming consoles,
                            and timepieces sourced directly from Kyoto & Osaka.
                        </p>
                        <Button size="lg" className="gap-2" asChild>
                            <Link href="/">
                                Explore Collection
                                <ArrowRight className="h-5 w-5" />
                            </Link>
                        </Button>
                    </div>
                </div>
            </section>
        </div>
    );
}
