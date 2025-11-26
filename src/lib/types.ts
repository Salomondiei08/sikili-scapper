// Phone Models (iPhone and Samsung)
export interface PhoneModel {
    id: string;
    name: string;
    brand: "Apple" | "Samsung";
    series: string;
    storage: string;
    color?: string;
}

// Price Information
export interface PriceInfo {
    id: string;
    website: string;
    websiteUrl: string;
    country: string;
    countryCode: string;
    price: number;
    currency: string;
    inStock: boolean;
    lastUpdated: string;
}

// Statistics
export interface PriceStatistics {
    average: number;
    median: number;
    lowest: number;
    highest: number;
    range: number;
    currency: string;
}

// Currency
export interface Currency {
    code: string;
    name: string;
    symbol: string;
}

// Exchange Rate
export interface ExchangeRate {
    from: string;
    to: string;
    rate: number;
}
