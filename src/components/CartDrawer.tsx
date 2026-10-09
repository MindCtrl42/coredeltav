import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useCartStore } from '@/stores/cartStore';
import { formatNPR } from '@/lib/currency';
import CartItemsList from './CartItemsList';

interface CartDrawerProps {
  open: boolean;
  onClose: () => void;
}

export default function CartDrawer({ open, onClose }: CartDrawerProps) {
  const { items, placeOrderRequest, getTotalPrice } = useCartStore();
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    closeRef.current?.focus();
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', onKey);
    return () => { document.body.style.overflow = ''; document.removeEventListener('keydown', onKey); };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100]">
      <div className="absolute inset-0 bg-foreground/20 animate-fade-in" onClick={onClose} aria-hidden="true" />
      <div className="absolute top-0 right-0 h-full w-full max-w-[400px] bg-background flex flex-col animate-slide-in-right" role="dialog" aria-modal="true" aria-label="Shopping cart">
        <div className="nav-height flex items-center justify-between page-padding border-b border-border flex-shrink-0">
          <span className="text-sm uppercase tracking-wide">Cart ({items.length})</span>
          <button ref={closeRef} onClick={onClose} className="text-xs uppercase tracking-wide hover:opacity-60" aria-label="Close cart">Close</button>
        </div>
        {items.length === 0 ? (
          <div className="flex-1 flex items-center justify-center text-center">
            <div>
              <p className="text-sm text-muted-foreground mb-4">Your cart is empty</p>
              <Link to="/shop" onClick={onClose} className="text-sm underline underline-offset-4 hover:opacity-60">Continue shopping</Link>
            </div>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto"><CartItemsList onNavigate={onClose} /></div>
            <div className="flex-shrink-0 border-t border-border p-4 space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span>Total</span><span>{formatNPR(getTotalPrice())}</span>
              </div>
              <p className="text-xs text-muted-foreground">Shipping will be calculated according to the delivery location.</p>
              <button onClick={placeOrderRequest} className="w-full h-12 bg-foreground text-background text-xs uppercase hover:opacity-90">Place Order Request</button>
              <Link to="/cart" onClick={onClose} className="w-full h-12 border border-border text-xs uppercase hover:bg-secondary flex items-center justify-center">View Cart</Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
