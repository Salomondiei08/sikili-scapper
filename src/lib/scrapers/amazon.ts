import axios from 'axios';
import * as cheerio from 'cheerio';
import { PriceInfo } from '../types';
import { RetailerScraper, parsePrice, detectCurrency, extractDomain } from './base';

/**
 * Amazon scraper
 * Note: Amazon has strong anti-bot measures. This is a basic implementation
 * that may not work reliably without additional measures (proxies, headers, etc.)
 */
export class AmazonScraper implements RetailerScraper {
    retailerId = 'amazon';
    retailerName = 'Amazon';

    canHandle(url: string): boolean {
        return url.includes('amazon.com') || url.includes('amazon.');
    }

    async scrapePrice(productUrl: string, modelId: string): Promise<PriceInfo | null> {
        try {
            // Set headers to mimic a real browser
            const response = await axios.get(productUrl, {
                headers: {
                    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
                    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
                    'Accept-Language': 'en-US,en;q=0.5',
                    'Accept-Encoding': 'gzip, deflate, br',
                    'Connection': 'keep-alive',
                    'Upgrade-Insecure-Requests': '1',
                },
                timeout: 10000,
            });

            const $ = cheerio.load(response.data);

            // Amazon price selectors (these may change frequently)
            const priceSelectors = [
                '.a-price .a-offscreen',
                '#priceblock_ourprice',
                '#priceblock_dealprice',
                '.a-price-whole',
                'span.a-price-whole',
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
                console.warn(`Could not find price on Amazon page: ${productUrl}`);
                return null;
            }

            const price = parsePrice(priceText);
            if (!price) {
                console.warn(`Could not parse price from text: ${priceText}`);
                return null;
            }

            // Detect currency from the page
            const currency = this.detectCurrencyFromUrl(productUrl);

            // Extract country from URL
            const country = this.getCountryFromUrl(productUrl);
            const countryCode = this.getCountryCode(productUrl);

            return {
                id: `${modelId}-amazon-${Date.now()}`,
                website: this.retailerName,
                websiteUrl: productUrl,
                country,
                countryCode,
                price,
                currency,
                inStock: true, // Could scrape availability too
                lastUpdated: new Date().toISOString(),
            };
        } catch (error) {
            console.error(`Error scraping Amazon: ${error}`);
            return null;
        }
    }

    private detectCurrencyFromUrl(url: string): string {
        if (url.includes('amazon.com')) return 'USD';
        if (url.includes('amazon.co.uk')) return 'GBP';
        if (url.includes('amazon.de') || url.includes('amazon.fr') || url.includes('amazon.es')) return 'EUR';
        if (url.includes('amazon.co.jp')) return 'JPY';
        return 'USD';
    }

    private getCountryFromUrl(url: string): string {
        if (url.includes('amazon.com')) return 'United States';
        if (url.includes('amazon.co.uk')) return 'United Kingdom';
        if (url.includes('amazon.de')) return 'Germany';
        if (url.includes('amazon.fr')) return 'France';
        if (url.includes('amazon.co.jp')) return 'Japan';
        return 'United States';
    }

    private getCountryCode(url: string): string {
        if (url.includes('amazon.com')) return 'US';
        if (url.includes('amazon.co.uk')) return 'GB';
        if (url.includes('amazon.de')) return 'DE';
        if (url.includes('amazon.fr')) return 'FR';
        if (url.includes('amazon.co.jp')) return 'JP';
        return 'US';
    }
}
