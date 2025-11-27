import axios from 'axios';
import * as cheerio from 'cheerio';
import { PriceInfo } from '../types';
import { RetailerScraper, parsePrice } from './base';

/**
 * Apple Store scraper
 * Apple's website is heavily JavaScript-based, so this basic scraper may not work
 * without a headless browser. This is a simplified version.
 */
export class AppleScraper implements RetailerScraper {
    retailerId = 'apple';
    retailerName = 'Apple Store';

    canHandle(url: string): boolean {
        return url.includes('apple.com');
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

            // Apple price selectors
            const priceSelectors = [
                '.rc-inline-price',
                '.as-price-currentprice',
                '[data-autom="price"]',
                '.current_price',
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
                console.warn(`Could not find price on Apple page: ${productUrl}`);
                return null;
            }

            const price = parsePrice(priceText);
            if (!price) {
                console.warn(`Could not parse price from text: ${priceText}`);
                return null;
            }

            // Detect currency from the price text first (most accurate)
            let currency = this.detectCurrencyFromText(priceText);

            // Fallback to URL detection if text detection returns default USD but URL suggests otherwise
            if (currency === 'USD' && !priceText.includes('$')) {
                const urlCurrency = this.detectCurrencyFromUrl(productUrl);
                if (urlCurrency !== 'USD') {
                    currency = urlCurrency;
                }
            }

            const country = this.getCountryFromUrl(productUrl);
            const countryCode = this.getCountryCode(productUrl);

            return {
                id: `${modelId}-apple-${Date.now()}`,
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
            console.error(`Error scraping Apple: ${error}`);
            return null;
        }
    }

    private detectCurrencyFromText(text: string): string {
        if (text.includes('¥') || text.includes('円')) return 'JPY';
        if (text.includes('€')) return 'EUR';
        if (text.includes('£')) return 'GBP';
        if (text.includes('CFA') || text.includes('XOF')) return 'XOF';
        if (text.includes('A$')) return 'AUD';
        if (text.includes('C$')) return 'CAD';
        if (text.includes('$')) return 'USD';
        return 'USD';
    }

    private detectCurrencyFromUrl(url: string): string {
        if (url.includes('/jp/')) return 'JPY';
        if (url.includes('/uk/')) return 'GBP';
        if (url.includes('/de/') || url.includes('/fr/')) return 'EUR';
        if (url.includes('/au/')) return 'AUD';
        if (url.includes('/ca/')) return 'CAD';
        return 'USD';
    }

    private getCountryFromUrl(url: string): string {
        if (url.includes('/jp/')) return 'Japan';
        if (url.includes('/uk/')) return 'United Kingdom';
        if (url.includes('/de/')) return 'Germany';
        if (url.includes('/fr/')) return 'France';
        if (url.includes('/au/')) return 'Australia';
        if (url.includes('/ca/')) return 'Canada';
        return 'United States';
    }

    private getCountryCode(url: string): string {
        if (url.includes('/jp/')) return 'JP';
        if (url.includes('/uk/')) return 'GB';
        if (url.includes('/de/')) return 'DE';
        if (url.includes('/fr/')) return 'FR';
        if (url.includes('/au/')) return 'AU';
        if (url.includes('/ca/')) return 'CA';
        return 'US';
    }
}
