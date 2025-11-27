"use client"

import { PriceInfo, PriceStatistics } from "@/lib/types"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingDown, TrendingUp, DollarSign, BarChart3 } from "lucide-react"
import { formatCurrency } from "@/lib/utils"

interface PriceStatsProps {
    prices: PriceInfo[];
    targetCurrency: string;
    exchangeRates: Record<string, number>;
}

export function PriceStats({ prices, targetCurrency, exchangeRates }: PriceStatsProps) {
    const convertPrice = (price: number, fromCurrency: string): number => {
        if (fromCurrency === targetCurrency) return price;
        // Convert to USD first (price / rate), then to target currency (* targetRate)
        const fromRate = exchangeRates[fromCurrency] || 1;
        const targetRate = exchangeRates[targetCurrency] || 1;
        return (price / fromRate) * targetRate;
    };

    const convertedPrices = prices.map(p => convertPrice(p.price, p.currency));

    const stats: PriceStatistics = {
        average: convertedPrices.reduce((a, b) => a + b, 0) / convertedPrices.length,
        median: calculateMedian(convertedPrices),
        lowest: Math.min(...convertedPrices),
        highest: Math.max(...convertedPrices),
        range: Math.max(...convertedPrices) - Math.min(...convertedPrices),
        currency: targetCurrency,
    };

    const getCurrencySymbol = (currency: string): string => {
        const symbols: Record<string, string> = {
            USD: "$", EUR: "€", GBP: "£", JPY: "¥", CNY: "¥", AUD: "A$", CAD: "C$",
            XOF: "CFA", NGN: "₦", KES: "KSh", ZAR: "R", EGP: "E£", MAD: "DH"
        };
        return symbols[currency] || currency;
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard
                title="Lowest Price"
                value={formatCurrency(stats.lowest, targetCurrency, getCurrencySymbol(targetCurrency))}
                icon={<TrendingDown className="h-5 w-5 text-primary" />}
                color="primary"
            />
            <StatCard
                title="Average Price"
                value={formatCurrency(stats.average, targetCurrency, getCurrencySymbol(targetCurrency))}
                icon={<DollarSign className="h-5 w-5 text-accent" />}
                color="accent"
            />
            <StatCard
                title="Median Price"
                value={formatCurrency(stats.median, targetCurrency, getCurrencySymbol(targetCurrency))}
                icon={<BarChart3 className="h-5 w-5 text-muted-foreground" />}
                color="muted"
            />
            <StatCard
                title="Highest Price"
                value={formatCurrency(stats.highest, targetCurrency, getCurrencySymbol(targetCurrency))}
                icon={<TrendingUp className="h-5 w-5 text-destructive" />}
                color="destructive"
            />
        </div>
    );
}

function StatCard({
    title,
    value,
    icon,
    color
}: {
    title: string;
    value: string;
    icon: React.ReactNode;
    color: string;
}) {
    return (
        <Card className="border-border/40 bg-card/30 backdrop-blur-sm hover:bg-card/50 transition-all duration-300">
            <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                    <CardTitle className="text-sm font-medium text-muted-foreground">
                        {title}
                    </CardTitle>
                    {icon}
                </div>
            </CardHeader>
            <CardContent>
                <div className="text-3xl font-bold font-mono">{value}</div>
            </CardContent>
        </Card>
    );
}

function calculateMedian(numbers: number[]): number {
    const sorted = [...numbers].sort((a, b) => a - b);
    const mid = Math.floor(sorted.length / 2);
    return sorted.length % 2 !== 0
        ? sorted[mid]
        : (sorted[mid - 1] + sorted[mid]) / 2;
}
