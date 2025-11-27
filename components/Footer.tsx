import Link from "next/link";
import { Instagram, LinkIcon } from "lucide-react";

const socialLinks = [
    {
        name: "Instagram",
        href: "https://www.instagram.com/japan_retro_hunter/",
        icon: Instagram,
    },
    {
        name: "Linktree",
        href: "https://linktr.ee/japanretrohunt",
        icon: LinkIcon,
    },
];

export function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="border-t border-white/10 bg-background py-12">
            <div className="container mx-auto px-4">
                <div className="flex flex-col items-center gap-6 text-center">
                    {/* Social Links */}
                    <div className="flex items-center gap-4">
                        {socialLinks.map((social) => (
                            <a
                                key={social.name}
                                href={social.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-card text-gray-400 transition-all hover:border-primary/50 hover:text-primary hover:shadow-[0_0_15px_rgba(255,0,51,0.3)]"
                                aria-label={social.name}
                            >
                                <social.icon className="h-5 w-5" />
                            </a>
                        ))}
                    </div>

                    {/* Disclaimer */}
                    <p className="text-sm text-gray-400 max-w-md">
                        We are curators, not sellers. All purchases are made through our trusted affiliate partners.
                    </p>

                    {/* Copyright */}
                    <p className="text-sm text-gray-500">
                        &copy; {currentYear} Japan Retro Hunt. Sourced from Kyoto & Osaka.
                    </p>
                </div>
            </div>
        </footer>
    );
}
