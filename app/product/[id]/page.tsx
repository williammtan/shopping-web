import { Suspense } from 'react';
import { notFound } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { ProductDetails } from '@/components/product-details';
import { SearchBar } from '@/components/search-bar';
import { ShoppingBag } from 'lucide-react';
import Link from 'next/link';

// This function is required for static site generation
export async function generateStaticParams() {
  const { data: products } = await supabase
    .from('master_products')
    .select('id');

  return (products ?? []).map((product) => ({
    id: product.id.toString(),
  }));
}

export default async function ProductPage({ params }: { params: { id: string } }) {
  const { data: product } = await supabase
    .from('master_products')
    .select(`
      *,
      products (
        *,
        product_image_urls (*)
      )
    `)
    .eq('id', params.id)
    .single();

  if (!product) {
    notFound();
  }

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
          <ProductDetails product={product} />
        </Suspense>
      </div>
    </main>
  );
}