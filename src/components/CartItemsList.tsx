import { Link } from 'react-router-dom';
import { useCartStore } from '@/stores/cartStore';
import { formatNPR } from '@/lib/currency';

export default function CartItemsList({ onNavigate }: { onNavigate?: () => void }) {
  const { items, updateQuantity, removeItem } = useCartStore();
  return (
    <div className="divide-y divide-border">
      {items.map(item => (
        <div key={item.id} className="p-4 flex gap-4">
          <div className="w-20 h-20 bg-secondary flex-shrink-0">
            <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
          </div>
          <div className="flex-1 min-w-0">
            <Link to={`/shop/${item.id}`} onClick={onNavigate} className="text-xs mb-1 line-clamp-1 uppercase hover:opacity-60">{item.title}</Link>
            <p className="text-sm">{formatNPR(item.price)}</p>
            <div className="flex items-center justify-between mt-3">
              <div className="flex items-center border border-border">
                <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="w-8 h-8 flex items-center justify-center hover:bg-secondary text-xs" aria-label="Decrease quantity">−</button>
                <span className="w-8 text-center text-xs">{item.quantity}</span>
                <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="w-8 h-8 flex items-center justify-center hover:bg-secondary text-xs" aria-label="Increase quantity">+</button>
              </div>
              <button onClick={() => removeItem(item.id)} className="text-xs text-muted-foreground underline underline-offset-4 hover:text-foreground">Remove</button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
