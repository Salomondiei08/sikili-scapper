"use client"

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { CURRENCIES } from "@/lib/scraper"
import { DollarSign } from "lucide-react"

interface CurrencySelectorProps {
    value: string;
    onValueChange: (value: string) => void;
}

export function CurrencySelector({ value, onValueChange }: CurrencySelectorProps) {
    return (
        <div className="flex items-center gap-2">
            <DollarSign className="h-5 w-5 text-muted-foreground" />
            <Select value={value} onValueChange={onValueChange}>
                <SelectTrigger className="w-[200px] h-10 bg-card/50 hover:bg-card">
                    <SelectValue placeholder="Select currency" />
                </SelectTrigger>
                <SelectContent>
                    {CURRENCIES.map((currency) => (
                        <SelectItem key={currency.code} value={currency.code}>
                            {currency.symbol} {currency.code} - {currency.name}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </div>
    );
}
