export function Footer() {
    return (
        <footer className="border-t border-white/10 bg-[#0a0a0a] py-8">
            <div className="container mx-auto px-4 text-center">
                <p className="mb-2 text-sm text-gray-400">
                    &copy; {new Date().getFullYear()} Japan Retro Hunt. All rights reserved.
                </p>
                <p className="text-xs text-gray-600">
                    We are a curator, not a seller. All purchases are handled by third-party affiliates.
                </p>
            </div>
        </footer>
    );
}
