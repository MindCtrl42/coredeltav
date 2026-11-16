import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useCartStore } from '@/stores/cartStore';
import { useCustomerStore } from '@/stores/customerStore';
import { formatNPR } from '@/lib/currency';
import CartItemsList from './CartItemsList';
import CustomerOrderForm from './CustomerOrderForm';
import { MessageSquare, ShoppingBag, ArrowRight } from 'lucide-react';

interface CartDrawerProps {
  open: boolean;
  onClose: () => void;
}

export default function CartDrawer({ open, onClose }: CartDrawerProps) {
  const { items, getTotalPrice, getTotalItems, placeOrderRequest } = useCartStore();
  const { customer, hasMinimumDetails } = useCustomerStore();
  const [showCheckoutForm, setShowCheckoutForm] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) {
      setShowCheckoutForm(false);
      return;
    }
    closeRef.current?.focus();
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      document.removeEventListener('keydown', onKey);
    };
  }, [open, onClose]);

  if (!open) return null;

  const total = formatNPR(getTotalPrice());
  const itemCount = getTotalItems();

  const handleQuickWhatsApp = () => {
    if (hasMinimumDetails()) {
      placeOrderRequest(customer);
    } else {
      setShowCheckoutForm(true);
    }
  };

  return (
    <div className="fixed inset-0 z-[100]">
      <div
        className="absolute inset-0 bg-foreground/30 backdrop-blur-[2px] animate-fade-in"
        onClick={onClose}
        aria-hidden="true"
      />
      <div
        className="absolute top-0 right-0 h-full w-full max-w-[440px] bg-background border-l border-border flex flex-col shadow-2xl animate-slide-in-right"
        role="dialog"
        aria-modal="true"
        aria-label="Shopping cart"
      >
        {/* Header */}
        <div className="nav-height flex items-center justify-between page-padding border-b border-border flex-shrink-0 bg-background">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-4 h-4 text-muted-foreground" />
            <span className="text-xs uppercase tracking-widest font-medium">
              Studio Cart {itemCount > 0 && `(${itemCount})`}
            </span>
          </div>
          <button
            ref={closeRef}
            onClick={onClose}
            className="text-xs uppercase tracking-widest hover:opacity-60 transition-opacity"
            aria-label="Close cart"
          >
            Close
          </button>
        </div>

        {items.length === 0 ? (
          <div className="flex-1 flex items-center justify-center text-center p-8">
            <div>
              <p className="text-xs uppercase tracking-wider text-muted-foreground mb-4">
                Your cart is empty
              </p>
              <Link
                to="/shop"
                onClick={onClose}
                className="inline-block px-5 py-2.5 bg-foreground text-background text-xs uppercase tracking-widest hover:opacity-90 transition-opacity"
              >
                Browse Shop
              </Link>
            </div>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto divide-y divide-border/60">
              {showCheckoutForm ? (
                <div className="p-5">
                  <div className="flex items-center justify-between mb-4 pb-2 border-b border-border/60">
                    <span className="text-xs uppercase tracking-wider font-medium">
                      Order Details
                    </span>
                    <button
                      type="button"
                      onClick={() => setShowCheckoutForm(false)}
                      className="text-[10px] uppercase tracking-wider text-muted-foreground hover:text-foreground underline underline-offset-4"
                    >
                      ← Back to items
                    </button>
                  </div>
                  <CustomerOrderForm
                    isCompact
                    onSuccess={() => {
                      onClose();
                    }}
                  />
                </div>
              ) : (
                <CartItemsList onNavigate={onClose} />
              )}
            </div>

            {/* Footer Summary & CTAs */}
            <div className="flex-shrink-0 border-t border-border p-5 space-y-3 bg-secondary/10">
              <div className="flex items-center justify-between text-xs font-medium">
                <span className="uppercase tracking-wider">Subtotal (NPR)</span>
                <span className="text-sm font-semibold">{total}</span>
              </div>
              <p className="text-[10px] text-muted-foreground leading-relaxed">
                Studio shipping in Kathmandu Valley & courier across Nepal calculated on WhatsApp.
              </p>

              {!showCheckoutForm && (
                <div className="space-y-2 pt-1">
                  <button
                    onClick={handleQuickWhatsApp}
                    className="w-full h-11 bg-foreground text-background text-xs uppercase tracking-widest font-medium hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>Order via WhatsApp</span>
                  </button>

                  <Link
                    to="/cart"
                    onClick={onClose}
                    className="w-full h-10 border border-border text-xs uppercase tracking-widest hover:bg-secondary flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <span>View Full Cart & Details</span>
                    <ArrowRight className="w-3 h-3 text-muted-foreground" />
                  </Link>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
