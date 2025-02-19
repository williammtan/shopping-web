"use client";

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Database } from '@/types/supabase';
import { Star, ExternalLink, ShoppingCart } from 'lucide-react';

type MasterProduct = Database['public']['Tables']['master_products']['Row'] & {
  products: (Database['public']['Tables']['products']['Row'] & {
    product_image_urls: Database['public']['Tables']['product_image_urls']['Row'][];
  })[];
};

export function ProductDetails({ product }: { product: MasterProduct }) {
  const [selectedImage, setSelectedImage] = useState(
    product.image_url || product.products[0]?.product_image_urls[0]?.image_url
  );

  const sortedProducts = [...product.products].sort((a, b) => a.price - b.price);
  const lowestPrice = sortedProducts[0].price;

  const formatPrice = (price: number) =>
    new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' })
      .format(price);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div>
        <div className="aspect-square relative mb-4">
          <img
            src={selectedImage}
            alt={product.name}
            className="object-cover w-full h-full rounded-lg"
          />
        </div>
        <div className="grid grid-cols-6 gap-2">
          {product.products.flatMap(p => 
            p.product_image_urls.map(img => (
              <button
                key={img.id}
                onClick={() => setSelectedImage(img.image_url)}
                className="aspect-square relative"
              >
                <img
                  src={img.image_url}
                  alt={product.name}
                  className="object-cover w-full h-full rounded-lg hover:opacity-75 transition-opacity"
                />
              </button>
            ))
          )}
        </div>
      </div>

      <div>
        <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
        <div className="space-y-6">
          {sortedProducts.map((variant, index) => (
            <Card key={variant.id} className="p-6">
              {index === 0 && (
                <Badge className="mb-4" variant="secondary">
                  Best Price
                </Badge>
              )}
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="font-semibold text-lg">{variant.marketplace}</h3>
                  {variant.shop_name && (
                    <p className="text-sm text-muted-foreground">{variant.shop_name}</p>
                  )}
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold">{formatPrice(variant.price)}</p>
                  {variant.strike_price && variant.strike_price !== variant.price && (
                    <p className="text-sm text-muted-foreground line-through">
                      {formatPrice(variant.strike_price)}
                    </p>
                  )}
                </div>
              </div>
              
              <div className="flex items-center space-x-4 mb-4">
                {variant.rating && (
                  <div className="flex items-center">
                    <Star className="h-4 w-4 text-yellow-400 mr-1" />
                    <span>{variant.rating.toFixed(1)}</span>
                    {variant.review_count && (
                      <span className="text-sm text-muted-foreground ml-1">
                        ({variant.review_count.toLocaleString()} reviews)
                      </span>
                    )}
                  </div>
                )}
                {variant.sale_count && (
                  <div className="text-sm text-muted-foreground">
                    {variant.sale_count.toLocaleString()} sold
                  </div>
                )}
              </div>

              <div className="flex space-x-4">
                <Button
                  asChild
                  className="flex-1"
                  variant={index === 0 ? "default" : "secondary"}
                >
                  <a href={variant.url} target="_blank" rel="noopener noreferrer">
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    Buy Now
                  </a>
                </Button>
                <Button
                  asChild
                  variant="outline"
                >
                  <a href={variant.url} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    View Details
                  </a>
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}