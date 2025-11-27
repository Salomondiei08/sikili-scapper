import { PriceInfo } from './types';
import { RetailerScraper, RateLimiter, extractDomain } from './scrapers/base';
import { AmazonScraper } from './scrapers/amazon';
import { AppleScraper } from './scrapers/apple';
import { BestBuyScraper } from './scrapers/bestbuy';
import { BackMarketScraper } from './scrapers/backmarket';

/**
 * Service to manage web scraping operations
 */
export class ScraperService {
    private scrapers: RetailerScraper[] = [];
    private rateLimiter: RateLimiter;
    private priceCache: Map<string, { price: PriceInfo, timestamp: number }> = new Map();
    private cacheTTL: number = 1000 * 60 * 60; // 1 hour cache

    constructor() {
        this.rateLimiter = new RateLimiter(2000); // 2 seconds between requests per domain

        // Register scrapers
        this.registerScraper(new AmazonScraper());
        this.registerScraper(new AppleScraper());
        this.registerScraper(new BestBuyScraper());
        this.registerScraper(new BackMarketScraper());
    }

    /**
     * Register a new scraper
     */
    registerScraper(scraper: RetailerScraper) {
        this.scrapers.push(scraper);
    }

    /**
     * Get real price for a product URL
     */
    async getRealPrice(productUrl: string, modelId: string): Promise<PriceInfo | null> {
        // Check cache first
        const cacheKey = `${modelId}-${productUrl}`;
        const cached = this.priceCache.get(cacheKey);
        if (cached && Date.now() - cached.timestamp < this.cacheTTL) {
            return cached.price;
        }

        // Find appropriate scraper
        const scraper = this.scrapers.find(s => s.canHandle(productUrl));
        if (!scraper) {
            console.warn(`No scraper found for URL: ${productUrl}`);
            return null;
        }

        // Apply rate limiting
        const domain = extractDomain(productUrl);
        await this.rateLimiter.wait(domain);

        try {
            console.log(`Scraping ${scraper.retailerName}: ${productUrl}`);
            const priceInfo = await scraper.scrapePrice(productUrl, modelId);

            if (priceInfo) {
                // Cache the result
                this.priceCache.set(cacheKey, {
                    price: priceInfo,
                    timestamp: Date.now()
                });
                return priceInfo;
            }
        } catch (error) {
            console.error(`Failed to scrape ${productUrl}:`, error);
        }

        return null;
    }

    /**
     * Clear the price cache
     */
    clearCache() {
        this.priceCache.clear();
    }
}

// Export singleton instance
export const scraperService = new ScraperService();
