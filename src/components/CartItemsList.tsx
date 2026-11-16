import { Link } from 'react-router-dom';
import { useCartStore } from '@/stores/cartStore';
import { formatNPR } from '@/lib/currency';
import { Minus, Plus, Trash2 } from 'lucide-react';

export default function CartItemsList({ onNavigate }: { onNavigate?: () => void }) {
  const { items, updateQuantity, removeItem } = useCartStore();

  return (
    <div className="divide-y divide-border/60">
      {items.map((item) => (
        <div key={item.id} className="p-4 sm:p-5 flex gap-4 items-start bg-background">
          {/* Item Image */}
          <div className="w-20 h-20 bg-secondary/80 border border-border/60 flex-shrink-0 overflow-hidden">
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>

          {/* Item Details */}
          <div className="flex-1 min-w-0">
            <div className="flex justify-between items-start gap-2">
              <Link
                to={`/shop/${item.id}`}
                onClick={onNavigate}
                className="text-xs uppercase tracking-wider font-medium text-foreground hover:opacity-60 transition-opacity line-clamp-1"
              >
                {item.title}
              </Link>
              <button
                type="button"
                onClick={() => removeItem(item.id)}
                className="text-muted-foreground hover:text-destructive p-1 transition-colors"
                aria-label={`Remove ${item.title}`}
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>

            <p className="text-xs font-mono text-muted-foreground mt-1">
              {formatNPR(item.price)} each
            </p>

            <div className="flex items-center justify-between mt-3 pt-2">
              {/* Stepper */}
              <div className="flex items-center border border-border bg-background">
                <button
                  type="button"
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  className="w-7 h-7 flex items-center justify-center hover:bg-secondary text-xs transition-colors"
                  aria-label="Decrease quantity"
                >
                  <Minus className="w-3 h-3" />
                </button>
                <span className="w-8 text-center text-xs font-mono">
                  {item.quantity}
                </span>
                <button
                  type="button"
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  className="w-7 h-7 flex items-center justify-center hover:bg-secondary text-xs transition-colors"
                  aria-label="Increase quantity"
                >
                  <Plus className="w-3 h-3" />
                </button>
              </div>

              {/* Item Subtotal */}
              <span className="text-xs font-mono font-medium text-foreground">
                {formatNPR(item.price * item.quantity)}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
