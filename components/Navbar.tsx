import Link from "next/link";
import { Camera } from "lucide-react";

export function Navbar() {
    return (
        <nav className="sticky top-0 z-50 border-b border-white/10 bg-[#0a0a0a]/80 backdrop-blur-md">
            <div className="container mx-auto flex h-16 items-center justify-between px-4">
                <Link href="/" className="flex items-center gap-2 text-xl font-bold tracking-tighter text-white transition-opacity hover:opacity-80">
                    <Camera className="h-6 w-6 text-red-600" />
                    <span>JAPAN<span className="text-red-600">RETRO</span>HUNT</span>
                </Link>

                <div className="flex items-center gap-6">
                    <Link href="/" className="text-sm font-medium text-gray-300 transition-colors hover:text-white">
                        Home
                    </Link>
                    <Link href="#" className="text-sm font-medium text-gray-300 transition-colors hover:text-white">
                        About
                    </Link>
                </div>
            </div>
        </nav>
    );
}
