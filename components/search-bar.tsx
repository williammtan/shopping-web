"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function SearchBar({ className }: { className?: string }) {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const router = useRouter();

  // Use your product list for suggestions
  const productSuggestions = [
    "susu",
    "uht",
    "full cream",
    "powdered",
    "kental",
    "milk",
    "abbott",
    "adult",
    "almond",
    "anlene",
    "appeton",
    "bear",
    "bendera",
    "binggrae",
    "brand",
    "bubuk",
    "caramel",
    "carnation",
    "choco",
    "chocolate",
    "cimory",
    "coconut",
    "cokelat",
    "dancow",
    "delight",
    "dewasa",
    "diabetasol",
    "diabetic",
    "diamond",
    "eksplor",
    "ensure",
    "entrasol",
    "evaporasi",
    "f&n",
    "family",
    "low fat",
    "flag",
    "fortigro",
    "fresh",
    "frisian",
    "gain",
    "gold",
    "goldsure",
    "good",
    "grain",
    "greenfields",
    "hilo",
    "indomilk",
    "instant",
    "kg",
    "kids",
    "krimer",
    "lemak",
    "malt",
    "melon",
    "milklab",
    "mimi",
    "multi",
    "nestle",
    "pediacomplete",
    "pediasure",
    "plain",
    "platinum",
    "powder",
    "putih",
    "reguler",
    "rendah",
    "sgm",
    "skim",
    "slim",
    "so",
    "steril",
    "strawberry",
    "stroberi",
    "sunbay",
    "teen",
    "teh",
    "tropicana",
    "ultra",
    "unsweetened",
    "v-soy",
    "vanila",
    "vanilla",
    "weight",
    "years",
    "zee",
    ]

  // Update suggestions based on the query
  useEffect(() => {
    if (query.trim()) {
      const filtered = productSuggestions.filter((item) =>
        item.toLowerCase().includes(query.toLowerCase())
      );
      setSuggestions(filtered);
    } else {
      setSuggestions([]);
    }
  }, [query]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query.trim())}`);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setQuery(suggestion);
    setSuggestions([]);
    router.push(`/search?q=${encodeURIComponent(suggestion)}`);
  };

  return (
    <div className={cn("relative", className)}>
      <form onSubmit={handleSearch} className="relative">
        <div className="relative">
          <Input
            type="text"
            placeholder="Search for products..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="h-12 pl-4 pr-32 text-lg"
          />
          <Button type="submit" className="absolute right-0 top-0 h-full px-6">
            <Search className="h-5 w-5" />
            <span className="ml-2">Search</span>
          </Button>
        </div>
      </form>
      {suggestions.length > 0 && (
        <ul
          className={cn(
            "absolute mt-2 w-full rounded-md border shadow-lg",
            // Use design tokens from your UI library (replace these if necessary)
            "border-input bg-background"
          )}
        >
          {suggestions.map((suggestion, index) => (
            <li
              key={index}
              onClick={() => handleSuggestionClick(suggestion)}
              className={cn(
                "cursor-pointer p-2 text-lg",
                // Match text color and hover styling with the search bar
                "text-foreground hover:bg-muted"
              )}
            >
              {suggestion}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
