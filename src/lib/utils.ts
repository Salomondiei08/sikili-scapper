import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Format currency value with proper formatting based on currency type
 * @param value - The numeric value to format
 * @param currency - The currency code (USD, EUR, XOF, etc.)
 * @param symbol - The currency symbol to display
 * @returns Formatted currency string
 */
export function formatCurrency(value: number, currency: string, symbol: string): string {
  // XOF and similar currencies with large values should have no decimals
  // and use thousand separators for better readability
  if (currency === "XOF") {
    return `${symbol} ${Math.round(value).toLocaleString('fr-FR')}`;
  }

  // USD and EUR should show 2 decimal places with thousand separators
  if (currency === "USD" || currency === "EUR") {
    return `${symbol}${value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  }

  // Default formatting with 2 decimal places
  return `${symbol}${value.toFixed(2)}`;
}
