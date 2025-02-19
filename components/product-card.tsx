import Link from 'next/link';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Database } from '@/types/supabase';

type MasterProduct = Database['public']['Tables']['master_products']['Row'] & {
  products: (Database['public']['Tables']['products']['Row'] & {
    product_image_urls: Database['public']['Tables']['product_image_urls']['Row'][];
  })[];
};

export function ProductCard({ product }: { product: MasterProduct }) {
  const lowestPrice = Math.min(...product.products.map(p => p.price));
  const highestPrice = Math.max(...product.products.map(p => p.price));
  const formatPrice = (price: number) => 
    new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' })
      .format(price);

  return (
    <Link href={`/product/${product.id}`}>
      <Card className="h-full hover:shadow-lg transition-shadow">
        <CardContent className="p-4">
          <div className="aspect-square relative mb-4">
            <img
              src={product.image_url || product.products[0]?.product_image_urls[0]?.image_url}
              alt={product.name}
              className="object-cover w-full h-full rounded-lg"
            />
          </div>
          <h3 className="font-semibold text-lg line-clamp-2 mb-2">
            {product.name}
          </h3>
          <div className="flex flex-wrap gap-2 mb-4">
            {Array.from(new Set(product.products.map(p => p.marketplace))).map(marketplace => (
              <Badge key={marketplace} variant="secondary">
                {marketplace}
              </Badge>
            ))}
          </div>
        </CardContent>
        <CardFooter className="px-4 pb-4 pt-0">
          <div className="w-full">
            <p className="text-sm text-muted-foreground mb-1">Available from</p>
            <p className="font-semibold">
              {formatPrice(lowestPrice)}
              {highestPrice > lowestPrice && (
                <span className="text-muted-foreground"> - {formatPrice(highestPrice)}</span>
              )}
            </p>
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
}