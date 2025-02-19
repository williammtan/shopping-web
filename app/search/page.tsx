import { Suspense } from 'react';
import { SearchResults } from '@/components/search-results';
import { SearchBar } from '@/components/search-bar';
import { ShoppingBag } from 'lucide-react';
import Link from 'next/link';

export default function SearchPage({
  searchParams,
}: {
  searchParams: { q: string };
}) {
  const query = searchParams.q;

  return (
    <main className="min-h-screen bg-background">
      <header className="border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-2">
              <ShoppingBag className="h-6 w-6 text-primary" />
              <span className="text-xl font-bold text-primary">shopping.id</span>
            </Link>
            <div className="w-full max-w-2xl ml-8">
              <SearchBar />
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <Suspense fallback={<div>Loading...</div>}>
          <SearchResults query={query} />
        </Suspense>
      </div>
    </main>
  );
}