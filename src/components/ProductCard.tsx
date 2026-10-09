import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Product } from '@/data/productData';
import { Badge } from '@/components/ui/badge';
import { formatNPR } from '@/lib/currency';

export default function ProductCard({ product }: { product: Product }) {
  const [imageIndex, setImageIndex] = useState(0);
  const hasMultiple = product.images.length > 1;

  return (
    <Link
      to={`/shop/${product.id}`}
      className="group block"
      onMouseEnter={() => hasMultiple && setImageIndex(1)}
      onMouseLeave={() => setImageIndex(0)}
    >
      <div className="aspect-square bg-secondary mb-3 overflow-hidden relative">
        <img src={product.images[imageIndex]} alt={product.title} className="w-full h-full object-cover" />
        {product.isNew && (
          <Badge variant="outline" className="absolute top-2 left-2 bg-background text-xs px-1.5 py-0.5 rounded-none font-normal uppercase">New</Badge>
        )}
        {product.soldOut && (
          <div className="absolute bottom-0 left-0 right-0 bg-background/90 py-2 text-center">
            <span className="text-xs text-muted-foreground">Sold out</span>
          </div>
        )}
      </div>
      <p className="text-xs mb-1 line-clamp-1 uppercase">{product.title}</p>
      <p className="text-xs text-muted-foreground">{formatNPR(product.price)}</p>
    </Link>
  );
}
