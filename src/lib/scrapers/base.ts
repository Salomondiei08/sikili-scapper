import { PriceInfo } from "../types";

/**
 * Base interface for all retailer scrapers
 */
export interface RetailerScraper {
    /**
     * Unique identifier for the retailer
     */
    retailerId: string;

    /**
     * Human-readable name of the retailer
     */
    retailerName: string;

    /**
     * Scrape price for a specific product
     * @param productUrl - URL of the product page
     * @param modelId - Internal model ID for fallback
     * @returns Price information or null if scraping failed
     */
    scrapePrice(productUrl: string, modelId: string): Promise<PriceInfo | null>;

    /**
     * Check if this scraper can handle a given URL
     */
    canHandle(url: string): boolean;
}

/**
 * Rate limiter to prevent overwhelming servers
 */
export class RateLimiter {
    private lastRequestTime: Map<string, number> = new Map();
    private minDelay: number;

    constructor(minDelayMs: number = 1000) {
        this.minDelay = minDelayMs;
    }

    /**
     * Wait if necessary to respect rate limits
     * @param domain - Domain to rate limit
     */
    async wait(domain: string): Promise<void> {
        const lastTime = this.lastRequestTime.get(domain) || 0;
        const now = Date.now();
        const timeSinceLastRequest = now - lastTime;

        if (timeSinceLastRequest < this.minDelay) {
            const waitTime = this.minDelay - timeSinceLastRequest;
            await new Promise(resolve => setTimeout(resolve, waitTime));
        }

        this.lastRequestTime.set(domain, Date.now());
    }
}

/**
 * Extract domain from URL
 */
export function extractDomain(url: string): string {
    try {
        const urlObj = new URL(url);
        return urlObj.hostname;
    } catch {
        return url;
    }
}

/**
 * Parse price from text (handles various formats)
 */
export function parsePrice(priceText: string): number | null {
    if (!priceText) return null;

    // Remove currency symbols and whitespace
    const cleaned = priceText
        .replace(/[$€£¥₦CFA]/g, '')
        .replace(/\s/g, '')
        .replace(/,/g, '');

    const price = parseFloat(cleaned);
    return isNaN(price) ? null : price;
}

/**
 * Detect currency from text or symbol
 */
export function detectCurrency(text: string): string {
    if (text.includes('$')) return 'USD';
    if (text.includes('€')) return 'EUR';
    if (text.includes('£')) return 'GBP';
    if (text.includes('CFA') || text.includes('XOF')) return 'XOF';
    if (text.includes('₦')) return 'NGN';
    return 'USD'; // default
}
