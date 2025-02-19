"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export function SearchBar({ className }: { className?: string }) {
  const [query, setQuery] = useState('');
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <form onSubmit={handleSearch} className={cn("relative", className)}>
      <div className="relative">
        <Input
          type="text"
          placeholder="Search for products..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="h-12 pl-4 pr-32 text-lg"
        />
        <Button 
          type="submit"
          className="absolute right-0 top-0 h-full px-6"
        >
          <Search className="h-5 w-5" />
          <span className="ml-2">Search</span>
        </Button>
      </div>
    </form>
  );
}