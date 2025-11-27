import axios from 'axios';
import * as cheerio from 'cheerio';
import { PriceInfo } from '../types';
import { RetailerScraper, parsePrice } from './base';

/**
 * Best Buy scraper
 */
export class BestBuyScraper implements RetailerScraper {
    retailerId = 'bestbuy';
    retailerName = 'Best Buy';

    canHandle(url: string): boolean {
        return url.includes('bestbuy.com');
    }

    async scrapePrice(productUrl: string, modelId: string): Promise<PriceInfo | null> {
        try {
            const response = await axios.get(productUrl, {
                headers: {
                    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
                    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
                },
                timeout: 10000,
            });

            const $ = cheerio.load(response.data);

            // Best Buy price selectors
            const priceSelectors = [
                '.priceView-hero-price span[aria-hidden="true"]',
                '.priceView-customer-price span',
                '.large-price',
                '.price-block__primary-price',
            ];

            let priceText = '';
            for (const selector of priceSelectors) {
                const element = $(selector).first();
                if (element.length > 0) {
                    priceText = element.text().trim();
                    if (priceText) break;
                }
            }

            if (!priceText) {
                console.warn(`Could not find price on Best Buy page: ${productUrl}`);
                return null;
            }

            const price = parsePrice(priceText);
            if (!price) {
                console.warn(`Could not parse price from text: ${priceText}`);
                return null;
            }

            return {
                id: `${modelId}-bestbuy-${Date.now()}`,
                website: this.retailerName,
                websiteUrl: productUrl,
                country: 'United States',
                countryCode: 'US',
                price,
                currency: 'USD',
                inStock: true,
                lastUpdated: new Date().toISOString(),
            };
        } catch (error) {
            console.error(`Error scraping Best Buy: ${error}`);
            return null;
        }
    }
}
