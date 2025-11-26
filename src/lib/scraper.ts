import { PhoneModel, PriceInfo } from "./types";

// Available Phone models (iPhone and Samsung)
export const PHONE_MODELS: PhoneModel[] = [
    // iPhone 16 Series
    { id: "iphone-16-pro-max-256gb", name: "iPhone 16 Pro Max", brand: "Apple", series: "16 Pro Max", storage: "256GB" },
    { id: "iphone-16-pro-max-512gb", name: "iPhone 16 Pro Max", brand: "Apple", series: "16 Pro Max", storage: "512GB" },
    { id: "iphone-16-pro-max-1tb", name: "iPhone 16 Pro Max", brand: "Apple", series: "16 Pro Max", storage: "1TB" },
    { id: "iphone-16-pro-256gb", name: "iPhone 16 Pro", brand: "Apple", series: "16 Pro", storage: "256GB" },
    { id: "iphone-16-pro-512gb", name: "iPhone 16 Pro", brand: "Apple", series: "16 Pro", storage: "512GB" },
    { id: "iphone-16-plus-256gb", name: "iPhone 16 Plus", brand: "Apple", series: "16 Plus", storage: "256GB" },
    { id: "iphone-16-128gb", name: "iPhone 16", brand: "Apple", series: "16", storage: "128GB" },
    { id: "iphone-16-256gb", name: "iPhone 16", brand: "Apple", series: "16", storage: "256GB" },

    // iPhone 15 Series
    { id: "iphone-15-pro-max-256gb", name: "iPhone 15 Pro Max", brand: "Apple", series: "15 Pro Max", storage: "256GB" },
    { id: "iphone-15-pro-max-512gb", name: "iPhone 15 Pro Max", brand: "Apple", series: "15 Pro Max", storage: "512GB" },
    { id: "iphone-15-pro-256gb", name: "iPhone 15 Pro", brand: "Apple", series: "15 Pro", storage: "256GB" },
    { id: "iphone-15-plus-256gb", name: "iPhone 15 Plus", brand: "Apple", series: "15 Plus", storage: "256GB" },
    { id: "iphone-15-128gb", name: "iPhone 15", brand: "Apple", series: "15", storage: "128GB" },
    { id: "iphone-15-256gb", name: "iPhone 15", brand: "Apple", series: "15", storage: "256GB" },

    // iPhone 14 Series
    { id: "iphone-14-pro-max-256gb", name: "iPhone 14 Pro Max", brand: "Apple", series: "14 Pro Max", storage: "256GB" },
    { id: "iphone-14-pro-256gb", name: "iPhone 14 Pro", brand: "Apple", series: "14 Pro", storage: "256GB" },
    { id: "iphone-14-plus-256gb", name: "iPhone 14 Plus", brand: "Apple", series: "14 Plus", storage: "256GB" },
    { id: "iphone-14-128gb", name: "iPhone 14", brand: "Apple", series: "14", storage: "128GB" },

    // iPhone 13 Series
    { id: "iphone-13-pro-max-256gb", name: "iPhone 13 Pro Max", brand: "Apple", series: "13 Pro Max", storage: "256GB" },
    { id: "iphone-13-pro-256gb", name: "iPhone 13 Pro", brand: "Apple", series: "13 Pro", storage: "256GB" },
    { id: "iphone-13-128gb", name: "iPhone 13", brand: "Apple", series: "13", storage: "128GB" },
    { id: "iphone-13-256gb", name: "iPhone 13", brand: "Apple", series: "13", storage: "256GB" },

    // iPhone 12 Series
    { id: "iphone-12-pro-max-256gb", name: "iPhone 12 Pro Max", brand: "Apple", series: "12 Pro Max", storage: "256GB" },
    { id: "iphone-12-128gb", name: "iPhone 12", brand: "Apple", series: "12", storage: "128GB" },
    { id: "iphone-12-256gb", name: "iPhone 12", brand: "Apple", series: "12", storage: "256GB" },

    // iPhone SE
    { id: "iphone-se-3rd-128gb", name: "iPhone SE (3rd gen)", brand: "Apple", series: "SE", storage: "128GB" },
    { id: "iphone-se-3rd-256gb", name: "iPhone SE (3rd gen)", brand: "Apple", series: "SE", storage: "256GB" },

    // Samsung Galaxy S24 Series
    { id: "samsung-s24-ultra-256gb", name: "Galaxy S24 Ultra", brand: "Samsung", series: "S24 Ultra", storage: "256GB" },
    { id: "samsung-s24-ultra-512gb", name: "Galaxy S24 Ultra", brand: "Samsung", series: "S24 Ultra", storage: "512GB" },
    { id: "samsung-s24-ultra-1tb", name: "Galaxy S24 Ultra", brand: "Samsung", series: "S24 Ultra", storage: "1TB" },
    { id: "samsung-s24-plus-256gb", name: "Galaxy S24+", brand: "Samsung", series: "S24+", storage: "256GB" },
    { id: "samsung-s24-plus-512gb", name: "Galaxy S24+", brand: "Samsung", series: "S24+", storage: "512GB" },
    { id: "samsung-s24-128gb", name: "Galaxy S24", brand: "Samsung", series: "S24", storage: "128GB" },
    { id: "samsung-s24-256gb", name: "Galaxy S24", brand: "Samsung", series: "S24", storage: "256GB" },

    // Samsung Galaxy S23 Series
    { id: "samsung-s23-ultra-256gb", name: "Galaxy S23 Ultra", brand: "Samsung", series: "S23 Ultra", storage: "256GB" },
    { id: "samsung-s23-ultra-512gb", name: "Galaxy S23 Ultra", brand: "Samsung", series: "S23 Ultra", storage: "512GB" },
    { id: "samsung-s23-plus-256gb", name: "Galaxy S23+", brand: "Samsung", series: "S23+", storage: "256GB" },
    { id: "samsung-s23-128gb", name: "Galaxy S23", brand: "Samsung", series: "S23", storage: "128GB" },
    { id: "samsung-s23-256gb", name: "Galaxy S23", brand: "Samsung", series: "S23", storage: "256GB" },

    // Samsung Galaxy Z Fold/Flip Series
    { id: "samsung-zfold5-256gb", name: "Galaxy Z Fold5", brand: "Samsung", series: "Z Fold5", storage: "256GB" },
    { id: "samsung-zfold5-512gb", name: "Galaxy Z Fold5", brand: "Samsung", series: "Z Fold5", storage: "512GB" },
    { id: "samsung-zflip5-256gb", name: "Galaxy Z Flip5", brand: "Samsung", series: "Z Flip5", storage: "256GB" },
    { id: "samsung-zflip5-512gb", name: "Galaxy Z Flip5", brand: "Samsung", series: "Z Flip5", storage: "512GB" },

    // Samsung Galaxy A Series
    { id: "samsung-a54-128gb", name: "Galaxy A54", brand: "Samsung", series: "A54", storage: "128GB" },
    { id: "samsung-a54-256gb", name: "Galaxy A54", brand: "Samsung", series: "A54", storage: "256GB" },
    { id: "samsung-a34-128gb", name: "Galaxy A34", brand: "Samsung", series: "A34", storage: "128GB" },
    { id: "samsung-a14-128gb", name: "Galaxy A14", brand: "Samsung", series: "A14", storage: "128GB" },
];

// Mock scraper function - simulates scraping from multiple retailers
export async function scrapePrices(modelId: string): Promise<PriceInfo[]> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    const basePrice = getBasePrice(modelId);

    const retailers = [
        // USA
        { name: "Apple Store USA", url: "https://apple.com", country: "United States", code: "US", currency: "USD" },
        { name: "Best Buy", url: "https://bestbuy.com", country: "United States", code: "US", currency: "USD" },
        { name: "Amazon US", url: "https://amazon.com", country: "United States", code: "US", currency: "USD" },
        { name: "B&H Photo", url: "https://bhphotovideo.com", country: "United States", code: "US", currency: "USD" },

        // UK
        { name: "Apple Store UK", url: "https://apple.com/uk", country: "United Kingdom", code: "GB", currency: "GBP" },
        { name: "Currys", url: "https://currys.co.uk", country: "United Kingdom", code: "GB", currency: "GBP" },
        { name: "Amazon UK", url: "https://amazon.co.uk", country: "United Kingdom", code: "GB", currency: "GBP" },

        // Europe
        { name: "Apple Store Germany", url: "https://apple.com/de", country: "Germany", code: "DE", currency: "EUR" },
        { name: "MediaMarkt", url: "https://mediamarkt.de", country: "Germany", code: "DE", currency: "EUR" },
        { name: "Amazon DE", url: "https://amazon.de", country: "Germany", code: "DE", currency: "EUR" },
        { name: "Fnac France", url: "https://fnac.com", country: "France", code: "FR", currency: "EUR" },
        { name: "Auchan France", url: "https://auchan.fr", country: "France", code: "FR", currency: "EUR" },

        // Asia
        { name: "Apple Store Japan", url: "https://apple.com/jp", country: "Japan", code: "JP", currency: "JPY" },
        { name: "Yodobashi Camera", url: "https://yodobashi.com", country: "Japan", code: "JP", currency: "JPY" },

        // Oceania
        { name: "Apple Store Australia", url: "https://apple.com/au", country: "Australia", code: "AU", currency: "AUD" },
        { name: "JB Hi-Fi", url: "https://jbhifi.com.au", country: "Australia", code: "AU", currency: "AUD" },

        // North America
        { name: "Apple Store Canada", url: "https://apple.com/ca", country: "Canada", code: "CA", currency: "CAD" },
        { name: "Best Buy Canada", url: "https://bestbuy.ca", country: "Canada", code: "CA", currency: "CAD" },

        // Africa - West Africa (XOF)
        { name: "Jumia Senegal", url: "https://jumia.sn", country: "Senegal", code: "SN", currency: "XOF" },
        { name: "Jumia Côte d'Ivoire", url: "https://jumia.ci", country: "Côte d'Ivoire", code: "CI", currency: "XOF" },
        { name: "Auchan Sénégal", url: "https://auchan.sn", country: "Senegal", code: "SN", currency: "XOF" },

        // Africa - Nigeria (NGN)
        { name: "Jumia Nigeria", url: "https://jumia.com.ng", country: "Nigeria", code: "NG", currency: "NGN" },
        { name: "Slot Nigeria", url: "https://slot.ng", country: "Nigeria", code: "NG", currency: "NGN" },

        // Africa - Kenya (KES)
        { name: "Jumia Kenya", url: "https://jumia.co.ke", country: "Kenya", code: "KE", currency: "KES" },
        { name: "Safaricom Shop", url: "https://safaricom.co.ke", country: "Kenya", code: "KE", currency: "KES" },

        // Africa - South Africa (ZAR)
        { name: "Takealot", url: "https://takealot.com", country: "South Africa", code: "ZA", currency: "ZAR" },
        { name: "Incredible Connection", url: "https://incredible.co.za", country: "South Africa", code: "ZA", currency: "ZAR" },

        // Africa - Egypt (EGP)
        { name: "Jumia Egypt", url: "https://jumia.com.eg", country: "Egypt", code: "EG", currency: "EGP" },

        // Africa - Morocco (MAD)
        { name: "Jumia Morocco", url: "https://jumia.ma", country: "Morocco", code: "MA", currency: "MAD" },
    ];

    return retailers.map((retailer, index) => {
        const priceVariation = (Math.random() - 0.5) * 0.10; // Reduced to ±5% variation
        const currencyRate = getCurrencyRate(retailer.currency);
        const regionalMarkup = getRegionalMarkup(retailer.country);

        // Calculate local price: Base Price * Regional Markup * Currency Rate * Random Variation
        const localPrice = Math.round(basePrice * regionalMarkup * currencyRate * (1 + priceVariation));

        // Generate a realistic product URL based on the retailer and model
        const productPath = modelId.toLowerCase().replace(/-/g, "-");
        let deepLink = retailer.url;

        if (retailer.name.includes("Amazon")) {
            deepLink = `${retailer.url}/dp/${Math.random().toString(36).substring(7).toUpperCase()}`;
        } else if (retailer.name.includes("Apple")) {
            deepLink = `${retailer.url}/shop/buy-iphone/${modelId.split('-').slice(0, 2).join('-')}`;
        } else if (retailer.name.includes("Jumia")) {
            deepLink = `${retailer.url}/${productPath}.html`;
        } else {
            deepLink = `${retailer.url}/product/${productPath}`;
        }

        return {
            id: `${modelId}-${retailer.code}-${index}`,
            website: retailer.name,
            websiteUrl: deepLink,
            country: retailer.country,
            countryCode: retailer.code,
            price: localPrice,
            currency: retailer.currency,
            inStock: Math.random() > 0.1, // 90% in stock
            lastUpdated: new Date().toISOString(),
        };
    });
}

function getRegionalMarkup(country: string): number {
    // Estimated markup factors (taxes, import duties, market conditions) relative to US base price
    const markups: Record<string, number> = {
        "United States": 1.0,    // Base
        "United Kingdom": 1.2,   // ~20% VAT
        "Germany": 1.25,         // ~19% VAT + fees
        "France": 1.25,          // ~20% VAT + fees
        "Japan": 1.1,            // Lower taxes
        "Australia": 1.15,       // GST
        "Canada": 1.12,          // Sales tax
        "Nigeria": 1.35,         // High import costs
        "Senegal": 1.30,         // Import duties
        "Côte d'Ivoire": 1.30,   // Import duties
        "Kenya": 1.25,           // Import duties
        "South Africa": 1.20,    // VAT
        "Egypt": 1.30,           // Import duties + fees
        "Morocco": 1.25,         // Import duties
    };
    return markups[country] || 1.2; // Default to 20% markup for others
}

function getBasePrice(modelId: string): number {
    // Base prices in USD
    const prices: Record<string, number> = {
        // iPhone prices
        "iphone-16-pro-max-256gb": 1199,
        "iphone-16-pro-max-512gb": 1399,
        "iphone-16-pro-max-1tb": 1599,
        "iphone-16-pro-256gb": 999,
        "iphone-16-pro-512gb": 1199,
        "iphone-16-plus-256gb": 899,
        "iphone-16-128gb": 799,
        "iphone-16-256gb": 899,
        "iphone-15-pro-max-256gb": 1099,
        "iphone-15-pro-max-512gb": 1299,
        "iphone-15-pro-256gb": 899,
        "iphone-15-plus-256gb": 799,
        "iphone-15-128gb": 699,
        "iphone-15-256gb": 799,
        "iphone-14-pro-max-256gb": 999,
        "iphone-14-pro-256gb": 799,
        "iphone-14-plus-256gb": 699,
        "iphone-14-128gb": 599,
        "iphone-13-pro-max-256gb": 899,
        "iphone-13-pro-256gb": 699,
        "iphone-13-128gb": 599,
        "iphone-13-256gb": 699,
        "iphone-12-pro-max-256gb": 799,
        "iphone-12-128gb": 499,
        "iphone-12-256gb": 599,
        "iphone-se-3rd-128gb": 429,
        "iphone-se-3rd-256gb": 479,

        // Samsung prices
        "samsung-s24-ultra-256gb": 1299,
        "samsung-s24-ultra-512gb": 1419,
        "samsung-s24-ultra-1tb": 1659,
        "samsung-s24-plus-256gb": 999,
        "samsung-s24-plus-512gb": 1119,
        "samsung-s24-128gb": 799,
        "samsung-s24-256gb": 859,
        "samsung-s23-ultra-256gb": 1199,
        "samsung-s23-ultra-512gb": 1379,
        "samsung-s23-plus-256gb": 999,
        "samsung-s23-128gb": 799,
        "samsung-s23-256gb": 859,
        "samsung-zfold5-256gb": 1799,
        "samsung-zfold5-512gb": 1919,
        "samsung-zflip5-256gb": 999,
        "samsung-zflip5-512gb": 1119,
        "samsung-a54-128gb": 449,
        "samsung-a54-256gb": 499,
        "samsung-a34-128gb": 369,
        "samsung-a14-128gb": 199,
    };

    return prices[modelId] || 799;
}

function getCurrencyRate(currency: string): number {
    // Updated currency rates relative to USD (Nov 2025)
    const rates: Record<string, number> = {
        "USD": 1,
        "GBP": 0.79,
        "EUR": 0.95,     // Stronger USD
        "JPY": 152,      // Weaker Yen
        "AUD": 1.55,
        "CAD": 1.40,
        "CNY": 7.25,
        "XOF": 625,      // Updated rate
        "NGN": 1650,     // Updated rate
        "KES": 132,
        "ZAR": 18.8,
        "EGP": 51,
        "MAD": 10.2,
    };

    return rates[currency] || 1;
}

export const CURRENCIES = [
    { code: "USD", name: "US Dollar", symbol: "$" },
    { code: "EUR", name: "Euro", symbol: "€" },
    { code: "GBP", name: "British Pound", symbol: "£" },
    { code: "JPY", name: "Japanese Yen", symbol: "¥" },
    { code: "CNY", name: "Chinese Yuan", symbol: "¥" },
    { code: "AUD", name: "Australian Dollar", symbol: "A$" },
    { code: "CAD", name: "Canadian Dollar", symbol: "C$" },
    { code: "XOF", name: "West African CFA Franc", symbol: "CFA" },
    { code: "NGN", name: "Nigerian Naira", symbol: "₦" },
    { code: "KES", name: "Kenyan Shilling", symbol: "KSh" },
    { code: "ZAR", name: "South African Rand", symbol: "R" },
    { code: "EGP", name: "Egyptian Pound", symbol: "E£" },
    { code: "MAD", name: "Moroccan Dirham", symbol: "DH" },
];
