"use client"

import { useState } from "react";
import { ModelSelector } from "@/components/model-selector";
import { PriceTable } from "@/components/price-table";
import { PriceStats } from "@/components/price-stats";
import { CurrencySelector } from "@/components/currency-selector";
import { PriceInfo } from "@/lib/types";
import { scrapePricesAction } from "@/app/actions";
import { PHONE_MODELS } from "@/lib/scraper";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Search, Smartphone, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export default function Home() {
  const [selectedModel, setSelectedModel] = useState("");
  const [currency, setCurrency] = useState("USD");
  const [prices, setPrices] = useState<PriceInfo[]>([]);
  const [loading, setLoading] = useState(false);
  const { theme, setTheme } = useTheme();

  const handleSearch = async () => {
    if (!selectedModel) return;

    setLoading(true);
    try {
      const result = await scrapePricesAction(selectedModel);
      setPrices(result);
    } catch (error) {
      console.error("Error scraping prices:", error);
    } finally {
      setLoading(false);
    }
  };

  const selectedModelData = PHONE_MODELS.find(m => m.id === selectedModel);

  // Mock exchange rates (in production, fetch from API)
  const exchangeRates: Record<string, number> = {
    USD: 1,
    EUR: 0.93,
    GBP: 0.79,
    JPY: 149,
    CNY: 7.24,
    AUD: 1.54,
    CAD: 1.39,
    XOF: 610,
    NGN: 1565,
    KES: 129,
    ZAR: 18.5,
    EGP: 49,
    MAD: 10,
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-background/95">
      {/* Header */}
      <header className="border-b border-border/40 bg-card/30 backdrop-blur-md sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Smartphone className="h-6 w-6 text-primary" />
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Phone Price Tracker
            </h1>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="rounded-full"
          >
            <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
            Compare Phone Prices Worldwide
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Find the best deals on iPhone and Samsung phones from retailers worldwide.
            Compare prices across Africa, Europe, Asia, and more with real-time currency conversion.
          </p>
        </div>

        {/* Search Section */}
        <div className="mb-8 bg-card/20 backdrop-blur-sm border border-border/40 rounded-xl p-5 shadow-lg">
          <div className="grid grid-cols-1 md:grid-cols-[1fr,auto,auto] gap-3 items-end">
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-muted-foreground">
                Select Phone Model
              </label>
              <ModelSelector value={selectedModel} onValueChange={setSelectedModel} />
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-medium text-muted-foreground">
                Display Currency
              </label>
              <CurrencySelector value={currency} onValueChange={setCurrency} />
            </div>

            <Button
              onClick={handleSearch}
              disabled={!selectedModel || loading}
              size="lg"
              className="h-10 px-6 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold shadow-md shadow-primary/10"
            >
              <Search className="mr-2 h-4 w-4" />
              {loading ? "Searching..." : "Search Prices"}
            </Button>
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="bg-card/30 rounded-xl p-6 border border-border/40">
                  <Skeleton className="h-4 w-24 mb-4" />
                  <Skeleton className="h-8 w-32" />
                </div>
              ))}
            </div>
            <div className="bg-card/30 rounded-xl p-6 border border-border/40">
              <Skeleton className="h-6 w-48 mb-6" />
              <div className="space-y-4">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Skeleton key={i} className="h-12 w-full" />
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Results */}
        {!loading && prices.length > 0 && (
          <div className="space-y-6 animate-in fade-in duration-500">
            <div className="flex items-center justify-between">
              <h3 className="text-2xl font-bold">
                Results for {selectedModelData?.name} ({selectedModelData?.storage})
              </h3>
              <div className="text-sm text-muted-foreground">
                {prices.length} retailers found
              </div>
            </div>

            <PriceStats
              prices={prices}
              targetCurrency={currency}
              exchangeRates={exchangeRates}
            />

            <PriceTable
              prices={prices}
              targetCurrency={currency}
              exchangeRates={exchangeRates}
            />
          </div>
        )}

        {/* Empty State */}
        {!loading && prices.length === 0 && (
          <div className="text-center py-16 bg-card/20 backdrop-blur-sm border border-border/40 rounded-2xl">
            <div className="inline-flex p-4 bg-primary/10 rounded-full mb-4">
              <Smartphone className="h-12 w-12 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">No Results Yet</h3>
            <p className="text-muted-foreground">
              Select a phone model and click Search to compare prices
            </p>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-border/40 bg-card/20 backdrop-blur-md mt-16">
        <div className="container mx-auto px-4 py-6 text-center text-sm text-muted-foreground">
          <p>Phone Price Tracker - Compare iPhone & Samsung prices worldwide</p>
        </div>
      </footer>
    </div>
  );
}
