import { supabase } from '@/lib/supabase';
import { ProductCard } from '@/components/product-card';

export async function SearchResults({ query }: { query: string }) {
  const { data: masterProducts } = await supabase
    .from('master_products')
    .select(`
      *,
      products (
        *,
        product_image_urls (*)
      )
    `)
    .ilike('name', `%${query}%`)
    .limit(20);

  if (!masterProducts?.length) {
    return (
      <div className="text-center py-12">
        <p className="text-lg text-muted-foreground">
          No products found for &quot;{query}&quot;
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {masterProducts.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}