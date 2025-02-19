import { SearchBar } from '@/components/search-bar';
import { ShoppingBag } from 'lucide-react';

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col items-center justify-center space-y-8 pt-20">
          <div className="flex items-center space-x-2">
            <ShoppingBag className="h-10 w-10 text-primary" />
            <h1 className="text-4xl font-bold text-primary">shopping.id</h1>
          </div>
          <p className="text-lg text-muted-foreground text-center max-w-2xl">
            Compare prices across multiple marketplaces and find the best deals on your favorite products.
          </p>
          <div className="w-full max-w-3xl">
            <SearchBar />
          </div>
          {/* Disclaimer Section */}
          <div className="w-full max-w-3xl mt-8">
            <div className="rounded-md border border-muted p-4 bg-muted">
              <p className="text-sm text-muted-foreground">
                Disclaimer: Shopping.id is currently in public beta, and the data presented may be incomplete or inaccurate. At this stage, the platform only displays milk product listings from Tokopedia and Blibli.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
