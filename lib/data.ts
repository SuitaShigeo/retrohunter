export interface Product {
  id: string;
  title: string;
  description: string;
  priceYen: number;
  priceUsd: number;
  imageUrl: string;
  affiliateLink: string;
  category: "Camera" | "Game" | "Watch";
  condition: "Mint" | "Near Mint" | "Used";
  isFeatured: boolean;
}

// Helper to generate affiliate links
export function getAffiliateLink(originalUrl: string): string {
  // TODO: Implement actual affiliate logic (eBay/Buyee/ZenMarket)
  // Example: return `${originalUrl}?aff_id=RETROHUNTER`;
  return originalUrl;
}

export const products: Product[] = [
  {
    id: "1",
    title: "Canon AE-1 Program",
    description: "The legendary 35mm SLR camera. Known for its robust build and exceptional image quality. A perfect entry point into film photography.",
    priceYen: 25000,
    priceUsd: 165,
    imageUrl: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    affiliateLink: "https://ebay.com/itm/example-canon-ae1",
    category: "Camera",
    condition: "Near Mint",
    isFeatured: true,
  },
  {
    id: "2",
    title: "Nintendo Game Boy Color (Atomic Purple)",
    description: "Relive the 90s with this translucent purple classic. The Game Boy Color features a color screen and backward compatibility with original Game Boy games.",
    priceYen: 12000,
    priceUsd: 80,
    imageUrl: "https://images.unsplash.com/photo-1531525645387-7f14be1bdbbd?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    affiliateLink: "https://ebay.com/itm/example-gameboy",
    category: "Game",
    condition: "Used",
    isFeatured: true,
  },
  {
    id: "3",
    title: "Seiko 5 Sports Speedtimer",
    description: "A vintage automatic chronograph from the 70s. The 'Pogue' style dial is iconic among collectors. Features a day-date complication.",
    priceYen: 45000,
    priceUsd: 300,
    imageUrl: "https://images.unsplash.com/photo-1614164185128-e4ec99c436d7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    affiliateLink: "https://ebay.com/itm/example-seiko",
    category: "Watch",
    condition: "Used",
    isFeatured: true,
  },
  {
    id: "4",
    title: "Contax T2",
    description: "The premium point-and-shoot film camera. Titanium body, Carl Zeiss Sonnar lens. The choice of celebrities and serious photographers.",
    priceYen: 150000,
    priceUsd: 1000,
    imageUrl: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    affiliateLink: "https://ebay.com/itm/example-contax",
    category: "Camera",
    condition: "Mint",
    isFeatured: false,
  },
  {
    id: "5",
    title: "Pokémon Red Version (JP)",
    description: "The original Japanese version of Pokémon Red. A piece of gaming history. Requires a Japanese Game Boy or region-free mod.",
    priceYen: 5000,
    priceUsd: 35,
    imageUrl: "https://images.unsplash.com/photo-1613771404721-1f92d799e49f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    affiliateLink: "https://ebay.com/itm/example-pokemon",
    category: "Game",
    condition: "Used",
    isFeatured: false,
  },
  {
    id: "6",
    title: "Olympus OM-1",
    description: "A compact, lightweight, and robust 35mm SLR. The OM-1 is a mechanical masterpiece, fully manual and reliable.",
    priceYen: 20000,
    priceUsd: 135,
    imageUrl: "https://images.unsplash.com/photo-1495707902641-75cac588d2e9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    affiliateLink: "https://ebay.com/itm/example-olympus",
    category: "Camera",
    condition: "Near Mint",
    isFeatured: false,
  },
  {
    id: "7",
    title: "Nikon F3",
    description: "The professional's choice for over 20 years. This rugged SLR features a high-eyepoint viewfinder and aperture-priority automation.",
    priceYen: 35000,
    priceUsd: 230,
    imageUrl: "https://images.unsplash.com/photo-1510127034890-ba27508e9f1c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    affiliateLink: "https://ebay.com/itm/example-nikon-f3",
    category: "Camera",
    condition: "Used",
    isFeatured: false,
  },
  {
    id: "8",
    title: "Casio G-Shock DW-5600C",
    description: "The original G-Shock. Built to withstand anything. A true icon of durability and functional design.",
    priceYen: 15000,
    priceUsd: 100,
    imageUrl: "https://images.unsplash.com/photo-1524805444758-089113d48a6d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    affiliateLink: "https://ebay.com/itm/example-gshock",
    category: "Watch",
    condition: "Near Mint",
    isFeatured: false,
  },
  {
    id: "9",
    title: "Nintendo 64 (Gold)",
    description: "Limited edition Gold Nintendo 64 console. A rare find for collectors. Comes with matching controller.",
    priceYen: 28000,
    priceUsd: 185,
    imageUrl: "https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    affiliateLink: "https://ebay.com/itm/example-n64-gold",
    category: "Game",
    condition: "Mint",
    isFeatured: true,
  },
  {
    id: "10",
    title: "Leica M6",
    description: "The ultimate rangefinder camera. Pure mechanical perfection with a built-in light meter. The dream camera for street photographers.",
    priceYen: 350000,
    priceUsd: 2300,
    imageUrl: "https://images.unsplash.com/photo-1534970028765-38ce47ef7d8d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    affiliateLink: "https://ebay.com/itm/example-leica-m6",
    category: "Camera",
    condition: "Mint",
    isFeatured: true,
  }
];
