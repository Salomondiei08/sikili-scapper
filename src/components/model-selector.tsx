"use client"

import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { PHONE_MODELS } from "@/lib/scraper"
import { PhoneModel } from "@/lib/types"

interface ModelSelectorProps {
    value: string;
    onValueChange: (value: string) => void;
}

export function ModelSelector({ value, onValueChange }: ModelSelectorProps) {
    const [open, setOpen] = React.useState(false);

    const selectedModel = PHONE_MODELS.find(model => model.id === value);

    // Group models by brand first, then by series
    const groupedModels = PHONE_MODELS.reduce((acc, model) => {
        const brandKey = model.brand;
        if (!acc[brandKey]) {
            acc[brandKey] = {};
        }
        if (!acc[brandKey][model.series]) {
            acc[brandKey][model.series] = [];
        }
        acc[brandKey][model.series].push(model);
        return acc;
    }, {} as Record<string, Record<string, typeof PHONE_MODELS>>);

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-full justify-between text-base h-10 bg-card/50 hover:bg-card"
                >
                    {selectedModel
                        ? `${selectedModel.name} (${selectedModel.storage})`
                        : "Select phone model..."}
                    <ChevronsUpDown className="ml-2 h-5 w-5 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-full p-0" align="start">
                <Command>
                    <CommandInput placeholder="Search phone models..." />
                    <CommandList>
                        <CommandEmpty>No model found.</CommandEmpty>
                        {Object.entries(groupedModels).map(([brand, seriesGroups]) => (
                            <React.Fragment key={brand}>
                                {Object.entries(seriesGroups).map(([series, models]) => (
                                    <CommandGroup key={`${brand}-${series}`} heading={`${brand} ${series}`}>
                                        {models.map((model) => (
                                            <CommandItem
                                                key={model.id}
                                                value={model.id}
                                                onSelect={(currentValue) => {
                                                    onValueChange(currentValue === value ? "" : currentValue);
                                                    setOpen(false);
                                                }}
                                            >
                                                <Check
                                                    className={cn(
                                                        "mr-2 h-4 w-4",
                                                        value === model.id ? "opacity-100" : "opacity-0"
                                                    )}
                                                />
                                                {model.name} ({model.storage})
                                            </CommandItem>
                                        ))}
                                    </CommandGroup>
                                ))}
                            </React.Fragment>
                        ))}
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    );
}
