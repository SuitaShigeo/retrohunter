import Link from "next/link";

export function Navbar() {
    return (
        <nav className="sticky top-0 z-50 border-b border-white/10 bg-background/80 backdrop-blur-md">
            <div className="container mx-auto flex h-16 items-center justify-between px-4">
                <Link href="/" className="flex items-center gap-2">
                    <span className="text-xl font-black tracking-tighter text-foreground">
                        RETRO<span className="text-primary">HUNT</span>
                    </span>
                </Link>
                <div className="flex items-center gap-6">
                    <Link
                        href="/"
                        className="text-sm font-medium text-gray-400 transition-colors hover:text-foreground"
                    >
                        Hunt
                    </Link>
                    <Link
                        href="/about"
                        className="text-sm font-medium text-gray-400 transition-colors hover:text-foreground"
                    >
                        About
                    </Link>
                </div>
            </div>
        </nav>
    );
}
