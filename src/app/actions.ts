"use server";

import { scrapePrices as scrapePricesLib } from "@/lib/scraper";
import { PriceInfo } from "@/lib/types";

/**
 * Server Action to scrape prices
 * This runs on the server, avoiding CORS issues with web scraping
 */
export async function scrapePricesAction(modelId: string): Promise<PriceInfo[]> {
    try {
        const prices = await scrapePricesLib(modelId);
        // Plain objects must be returned from Server Actions
        return JSON.parse(JSON.stringify(prices));
    } catch (error) {
        console.error("Server Action Error:", error);
        return [];
    }
}
