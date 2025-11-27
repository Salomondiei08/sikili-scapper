import axios from 'axios';
import * as cheerio from 'cheerio';
import { PriceInfo } from '../types';
import { RetailerScraper, parsePrice, detectCurrency } from './base';

/**
 * Back Market scraper
 * Good for refurbished prices
 */
export class BackMarketScraper implements RetailerScraper {
    retailerId = 'backmarket';
    retailerName = 'Back Market';

    canHandle(url: string): boolean {
        return url.includes('backmarket.');
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

            // Back Market price selectors
            const priceSelectors = [
                '[data-test="price"]',
                '.price-main',
                'h1 + div span',
                '.body-1-bold',
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
                console.warn(`Could not find price on Back Market page: ${productUrl}`);
                return null;
            }

            const price = parsePrice(priceText);
            if (!price) {
                console.warn(`Could not parse price from text: ${priceText}`);
                return null;
            }

            const currency = this.detectCurrencyFromUrl(productUrl);
            const country = this.getCountryFromUrl(productUrl);
            const countryCode = this.getCountryCode(productUrl);

            return {
                id: `${modelId}-backmarket-${Date.now()}`,
                website: this.retailerName,
                websiteUrl: productUrl,
                country,
                countryCode,
                price,
                currency,
                inStock: true,
                lastUpdated: new Date().toISOString(),
            };
        } catch (error) {
            console.error(`Error scraping Back Market: ${error}`);
            return null;
        }
    }

    private detectCurrencyFromUrl(url: string): string {
        if (url.includes('.com')) return 'USD';
        if (url.includes('.co.uk')) return 'GBP';
        if (url.includes('.fr') || url.includes('.de') || url.includes('.es')) return 'EUR';
        return 'USD';
    }

    private getCountryFromUrl(url: string): string {
        if (url.includes('.com')) return 'United States';
        if (url.includes('.co.uk')) return 'United Kingdom';
        if (url.includes('.fr')) return 'France';
        if (url.includes('.de')) return 'Germany';
        return 'United States';
    }

    private getCountryCode(url: string): string {
        if (url.includes('.com')) return 'US';
        if (url.includes('.co.uk')) return 'GB';
        if (url.includes('.fr')) return 'FR';
        if (url.includes('.de')) return 'DE';
        return 'US';
    }
}
