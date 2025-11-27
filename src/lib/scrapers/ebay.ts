import axios from 'axios';
import * as cheerio from 'cheerio';
import { PriceInfo } from '../types';
import { RetailerScraper, parsePrice } from './base';

/**
 * eBay Scraper
 * Good for market value and used/refurbished prices
 */
export class EbayScraper implements RetailerScraper {
    retailerId = 'ebay';
    retailerName = 'eBay';

    canHandle(url: string): boolean {
        return url.includes('ebay.');
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

            // eBay price selectors
            const priceSelectors = [
                '.x-price-primary span',
                '.main-price .notranslate',
                '#prcIsum',
                '#mm-saleDscPrc',
                '.x-bin-price__content .x-price-primary',
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
                console.warn(`Could not find price on eBay page: ${productUrl}`);
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
                id: `${modelId}-ebay-${Date.now()}`,
                website: `eBay ${country}`,
                websiteUrl: productUrl,
                country,
                countryCode,
                price,
                currency,
                inStock: true,
                lastUpdated: new Date().toISOString(),
            };
        } catch (error) {
            console.error(`Error scraping eBay: ${error}`);
            return null;
        }
    }

    private detectCurrencyFromUrl(url: string): string {
        if (url.includes('ebay.co.uk')) return 'GBP';
        if (url.includes('ebay.de') || url.includes('ebay.fr') || url.includes('ebay.it') || url.includes('ebay.es')) return 'EUR';
        if (url.includes('ebay.com.au')) return 'AUD';
        if (url.includes('ebay.ca')) return 'CAD';
        return 'USD';
    }

    private getCountryFromUrl(url: string): string {
        if (url.includes('ebay.co.uk')) return 'United Kingdom';
        if (url.includes('ebay.de')) return 'Germany';
        if (url.includes('ebay.fr')) return 'France';
        if (url.includes('ebay.it')) return 'Italy';
        if (url.includes('ebay.es')) return 'Spain';
        if (url.includes('ebay.com.au')) return 'Australia';
        if (url.includes('ebay.ca')) return 'Canada';
        return 'United States';
    }

    private getCountryCode(url: string): string {
        if (url.includes('ebay.co.uk')) return 'GB';
        if (url.includes('ebay.de')) return 'DE';
        if (url.includes('ebay.fr')) return 'FR';
        if (url.includes('ebay.it')) return 'IT';
        if (url.includes('ebay.es')) return 'ES';
        if (url.includes('ebay.com.au')) return 'AU';
        if (url.includes('ebay.ca')) return 'CA';
        return 'US';
    }
}
