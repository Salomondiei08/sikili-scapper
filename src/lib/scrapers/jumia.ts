import axios from 'axios';
import * as cheerio from 'cheerio';
import { PriceInfo } from '../types';
import { RetailerScraper, parsePrice, detectCurrency } from './base';

/**
 * Jumia Scraper
 * Covers multiple African countries: Nigeria, Kenya, Egypt, Senegal, etc.
 */
export class JumiaScraper implements RetailerScraper {
    retailerId = 'jumia';
    retailerName = 'Jumia';

    canHandle(url: string): boolean {
        return url.includes('jumia.');
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

            // Jumia price selectors
            // Usually in a div with class "-hr -mtxs -pvs" or similar
            const priceSelectors = [
                'span.-b.-ltr.-tal.-fs24', // Common Jumia price class
                'span.-b.-ltr.-tal.-fs24.-ptxs',
                'div.-hr.-mtxs.-pvs span[data-price]',
                '.prc', // Generic price class often used
                'h3.-fs20.-plm.-tar',
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
                // Try finding by currency symbol if specific classes fail
                const bodyText = $('body').text();
                const currency = this.detectCurrencyFromUrl(productUrl);
                const symbol = this.getCurrencySymbol(currency);

                // Simple regex to find price with symbol (e.g. ₦ 150,000)
                const regex = new RegExp(`${symbol}\\s*[0-9,]+`, 'i');
                const match = bodyText.match(regex);
                if (match) {
                    priceText = match[0];
                }
            }

            if (!priceText) {
                console.warn(`Could not find price on Jumia page: ${productUrl}`);
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
                id: `${modelId}-jumia-${Date.now()}`,
                website: `Jumia ${country}`,
                websiteUrl: productUrl,
                country,
                countryCode,
                price,
                currency,
                inStock: !response.data.includes('Out of Stock'),
                lastUpdated: new Date().toISOString(),
            };
        } catch (error) {
            console.error(`Error scraping Jumia: ${error}`);
            return null;
        }
    }

    private detectCurrencyFromUrl(url: string): string {
        if (url.includes('.ng')) return 'NGN'; // Nigeria
        if (url.includes('.ke')) return 'KES'; // Kenya
        if (url.includes('.eg')) return 'EGP'; // Egypt
        if (url.includes('.sn') || url.includes('.ci')) return 'XOF'; // Senegal, Cote d'Ivoire
        if (url.includes('.ma')) return 'MAD'; // Morocco
        if (url.includes('.gh')) return 'GHS'; // Ghana
        if (url.includes('.ug')) return 'UGX'; // Uganda
        return 'USD';
    }

    private getCurrencySymbol(currency: string): string {
        switch (currency) {
            case 'NGN': return '₦';
            case 'KES': return 'KSh';
            case 'EGP': return 'E£';
            case 'XOF': return 'FCFA';
            case 'MAD': return 'dh';
            case 'GHS': return 'GH₵';
            case 'UGX': return 'USh';
            default: return '$';
        }
    }

    private getCountryFromUrl(url: string): string {
        if (url.includes('.ng')) return 'Nigeria';
        if (url.includes('.ke')) return 'Kenya';
        if (url.includes('.eg')) return 'Egypt';
        if (url.includes('.sn')) return 'Senegal';
        if (url.includes('.ci')) return "Côte d'Ivoire";
        if (url.includes('.ma')) return 'Morocco';
        if (url.includes('.gh')) return 'Ghana';
        if (url.includes('.ug')) return 'Uganda';
        return 'Africa';
    }

    private getCountryCode(url: string): string {
        if (url.includes('.ng')) return 'NG';
        if (url.includes('.ke')) return 'KE';
        if (url.includes('.eg')) return 'EG';
        if (url.includes('.sn')) return 'SN';
        if (url.includes('.ci')) return 'CI';
        if (url.includes('.ma')) return 'MA';
        if (url.includes('.gh')) return 'GH';
        if (url.includes('.ug')) return 'UG';
        return 'AF';
    }
}
