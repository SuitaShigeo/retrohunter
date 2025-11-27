import { GoogleSpreadsheet } from "google-spreadsheet";
import { JWT } from "google-auth-library";
import { cache } from "react";
import { Product } from "./data";

const SCOPES = ["https://www.googleapis.com/auth/spreadsheets.readonly"];

function getServiceAccountAuth() {
  const email = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
  const key = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n");

  if (!email || !key) {
    throw new Error(
      "Missing Google Service Account credentials. Check GOOGLE_SERVICE_ACCOUNT_EMAIL and GOOGLE_PRIVATE_KEY in .env.local"
    );
  }

  return new JWT({
    email,
    key,
    scopes: SCOPES,
  });
}

type ValidCategory = "Camera" | "Game" | "Watch";

function parseCategory(value: string | undefined): ValidCategory {
  const normalized = value?.trim();
  if (normalized === "Camera" || normalized === "Game" || normalized === "Watch") {
    return normalized;
  }
  return "Camera"; // Default fallback
}

function parseBoolean(value: string | undefined): boolean {
  return value?.toUpperCase() === "TRUE";
}

function parseNumber(value: string | undefined): number {
  const parsed = parseInt(value || "0", 10);
  return isNaN(parsed) ? 0 : parsed;
}

/**
 * Convert Yahoo Auctions URL to Buyee URL for international buyers
 *
 * Supported formats:
 * 1. Auction page: https://page.auctions.yahoo.co.jp/jp/auction/h123456789
 *    -> https://buyee.jp/item/yahoo/auction/h123456789?lang=en
 *
 * 2. Search page: https://auctions.yahoo.co.jp/search/search/canon%20ae-1/0/
 *    -> https://buyee.jp/item/search/query/canon%20ae-1?lang=en
 */
function convertToBuyeeUrl(url: string): string {
  if (!url) return "";

  // Check if it's a Yahoo Auctions URL
  if (url.includes("auctions.yahoo.co.jp")) {
    // Format 1: Individual auction page /jp/auction/{id} or /auction/{id}
    const auctionIdMatch = url.match(/\/auction\/([a-zA-Z0-9]+)/);
    if (auctionIdMatch && auctionIdMatch[1]) {
      const auctionId = auctionIdMatch[1];
      return `https://buyee.jp/item/yahoo/auction/${auctionId}?lang=en`;
    }

    // Format 2: Search page /search/search/{query}/
    const searchMatch = url.match(/\/search\/search\/([^/]+)/);
    if (searchMatch && searchMatch[1]) {
      const searchQuery = searchMatch[1];
      return `https://buyee.jp/item/search/query/${searchQuery}?lang=en`;
    }

    // Format 3: Generic Yahoo Auctions URL - redirect to Buyee search with product name
    // This will be handled by returning empty and using product title as fallback
  }

  // Return original URL if not Yahoo Auctions or couldn't extract ID
  return url;
}

// Use React cache for deduplication within a single request
export const getProducts = cache(async (): Promise<Product[]> => {
  const sheetId = process.env.GOOGLE_SHEET_ID;

  if (!sheetId) {
    throw new Error("Missing GOOGLE_SHEET_ID in .env.local");
  }

  try {
    const auth = getServiceAccountAuth();
    const doc = new GoogleSpreadsheet(sheetId, auth);

    await doc.loadInfo();

    const sheet = doc.sheetsByTitle["Items"];
    if (!sheet) {
      throw new Error('Sheet named "Items" not found in the spreadsheet');
    }

    const rows = await sheet.getRows();

    const products: Product[] = rows
      .filter((row) => row.get("status") === "Approve")
      .map((row, index) => {
        const priceYen = parseNumber(row.get("price_yen"));
        const priceUsd = Math.floor(priceYen / 150);

        const rawUrl = row.get("affiliate_link") || row.get("source_url") || "";
        const affiliateLink = convertToBuyeeUrl(rawUrl);
        const description =
          row.get("ai_caption") || "A unique vintage item from Japan.";

        return {
          id: row.get("id") || String(index + 1),
          title: row.get("product_name") || "Untitled Product",
          description,
          priceYen,
          priceUsd,
          imageUrl: row.get("image_url") || "",
          affiliateLink,
          category: parseCategory(row.get("category")),
          condition: "Used" as const, // Default since not in DB yet
          isFeatured: parseBoolean(row.get("is_featured")),
        };
      });

    return products;
  } catch (error) {
    console.error("Error fetching products from Google Sheets:", error);
    throw error;
  }
});

// Get a single product by ID
export const getProductById = cache(
  async (id: string): Promise<Product | null> => {
    const products = await getProducts();
    return products.find((p) => p.id === id) || null;
  }
);

// Get featured products
export const getFeaturedProducts = cache(async (): Promise<Product[]> => {
  const products = await getProducts();
  return products.filter((p) => p.isFeatured);
});
