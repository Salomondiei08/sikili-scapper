"use client"

import { PriceInfo } from "@/lib/types"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { ExternalLink, TrendingDown, TrendingUp } from "lucide-react"
import { useState } from "react"

interface PriceTableProps {
    prices: PriceInfo[];
    targetCurrency: string;
    exchangeRates: Record<string, number>;
}

export function PriceTable({ prices, targetCurrency, exchangeRates }: PriceTableProps) {
    const [sortBy, setSortBy] = useState<"price" | "website">("price");

    const convertPrice = (price: number, fromCurrency: string): number => {
        if (fromCurrency === targetCurrency) return price;
        // Convert to USD first (price / rate), then to target currency (* targetRate)
        const fromRate = exchangeRates[fromCurrency] || 1;
        const targetRate = exchangeRates[targetCurrency] || 1;
        return (price / fromRate) * targetRate;
    };

    const convertedPrices = prices.map(p => ({
        ...p,
        convertedPrice: convertPrice(p.price, p.currency),
    }));

    const sortedPrices = [...convertedPrices].sort((a, b) => {
        if (sortBy === "price") {
            return a.convertedPrice - b.convertedPrice;
        }
        return a.website.localeCompare(b.website);
    });

    const lowestPrice = Math.min(...convertedPrices.map(p => p.convertedPrice));
    const highestPrice = Math.max(...convertedPrices.map(p => p.convertedPrice));

    const getCurrencySymbol = (currency: string): string => {
        const symbols: Record<string, string> = {
            USD: "$", EUR: "€", GBP: "£", JPY: "¥", CNY: "¥", AUD: "A$", CAD: "C$",
            XOF: "CFA", NGN: "₦", KES: "KSh", ZAR: "R", EGP: "E£", MAD: "DH"
        };
        return symbols[currency] || currency;
    };

    return (
        <Card className="border-border/40 bg-card/30 backdrop-blur-sm">
            <CardHeader>
                <div className="flex items-center justify-between">
                    <CardTitle className="text-2xl">Price Comparison</CardTitle>
                    <div className="flex gap-2">
                        <Badge
                            variant={sortBy === "price" ? "default" : "outline"}
                            className="cursor-pointer"
                            onClick={() => setSortBy("price")}
                        >
                            Sort by Price
                        </Badge>
                        <Badge
                            variant={sortBy === "website" ? "default" : "outline"}
                            className="cursor-pointer"
                            onClick={() => setSortBy("website")}
                        >
                            Sort by Website
                        </Badge>
                    </div>
                </div>
            </CardHeader>
            <CardContent>
                <div className="rounded-lg border border-border/40 overflow-hidden">
                    <Table>
                        <TableHeader>
                            <TableRow className="hover:bg-muted/50">
                                <TableHead className="font-semibold">Website</TableHead>
                                <TableHead className="font-semibold">Country</TableHead>
                                <TableHead className="font-semibold">Original Price</TableHead>
                                <TableHead className="font-semibold">Converted Price</TableHead>
                                <TableHead className="font-semibold">Status</TableHead>
                                <TableHead className="font-semibold text-right">Link</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {sortedPrices.map((price) => {
                                const isLowest = price.convertedPrice === lowestPrice;
                                const isHighest = price.convertedPrice === highestPrice;

                                return (
                                    <TableRow
                                        key={price.id}
                                        className={`
                      transition-colors
                      ${isLowest ? "bg-primary/10 hover:bg-primary/20" : "hover:bg-muted/30"}
                    `}
                                    >
                                        <TableCell className="font-medium">
                                            <div className="flex items-center gap-2">
                                                {price.website}
                                                {isLowest && <TrendingDown className="h-4 w-4 text-primary" />}
                                                {isHighest && <TrendingUp className="h-4 w-4 text-muted-foreground" />}
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex items-center gap-2">
                                                <span className="text-2xl">{getCountryFlag(price.countryCode)}</span>
                                                <span>{price.country}</span>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <span className="font-mono">
                                                {getCurrencySymbol(price.currency)}{price.price.toLocaleString()}
                                            </span>
                                        </TableCell>
                                        <TableCell>
                                            <span className="font-mono font-semibold text-primary">
                                                {getCurrencySymbol(targetCurrency)}{price.convertedPrice.toFixed(2)}
                                            </span>
                                        </TableCell>
                                        <TableCell>
                                            <Badge variant={price.inStock ? "default" : "secondary"}>
                                                {price.inStock ? "In Stock" : "Out of Stock"}
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <a
                                                href={price.websiteUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-flex items-center gap-1 text-primary hover:text-primary/80 transition-colors"
                                            >
                                                Visit <ExternalLink className="h-4 w-4" />
                                            </a>
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </div>
            </CardContent>
        </Card>
    );
}

function getCountryFlag(code: string): string {
    const flags: Record<string, string> = {
        US: "🇺🇸", GB: "🇬🇧", JP: "🇯🇵", DE: "🇩🇪", AU: "🇦🇺", CA: "🇨🇦", CN: "🇨🇳", FR: "🇫🇷",
        SN: "🇸🇳", CI: "🇨🇮", NG: "🇳🇬", KE: "🇰🇪", ZA: "🇿🇦", EG: "🇪🇬", MA: "🇲🇦"
    };
    return flags[code] || "🌍";
}
