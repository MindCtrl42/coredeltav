import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Product } from '@/data/productData';
import { Badge } from '@/components/ui/badge';
import { formatNPR } from '@/lib/currency';

export default function ProductCard({ product }: { product: Product }) {
  const [imageIndex, setImageIndex] = useState(0);
  const hasMultiple = product.images && product.images.length > 1;

  return (
    <Link
      to={`/shop/${product.id}`}
      className="group block focus:outline-none"
      onMouseEnter={() => hasMultiple && setImageIndex(1)}
      onMouseLeave={() => setImageIndex(0)}
    >
      <div className="aspect-square bg-secondary/80 mb-3 overflow-hidden relative border border-border/40 transition-colors group-hover:border-border">
        <img
          src={product.images[imageIndex] || product.images[0]}
          alt={product.title}
          className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.02]"
          loading="lazy"
        />

        {product.isNew && (
          <Badge
            variant="outline"
            className="absolute top-2.5 left-2.5 bg-background/95 backdrop-blur-xs text-[9px] px-2 py-0.5 rounded-none font-medium uppercase tracking-widest border border-border/80"
          >
            Studio Edition
          </Badge>
        )}

        {product.soldOut && (
          <div className="absolute inset-0 bg-background/70 backdrop-blur-[1px] flex items-center justify-center">
            <span className="text-[10px] uppercase tracking-widest border border-foreground/30 px-3 py-1 bg-background/90 text-foreground font-medium">
              Archive / Sold Out
            </span>
          </div>
        )}
      </div>

      <div className="space-y-1">
        {product.category && (
          <p className="text-[9px] uppercase tracking-widest text-muted-foreground/70">
            {product.category}
          </p>
        )}
        <h3 className="text-xs uppercase tracking-wider text-foreground group-hover:opacity-70 transition-opacity line-clamp-1">
          {product.title}
        </h3>
        <p className="text-xs text-muted-foreground font-mono">
          {formatNPR(product.price)}
        </p>
      </div>
    </Link>
  );
}
