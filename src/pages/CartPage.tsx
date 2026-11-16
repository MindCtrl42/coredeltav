import { Link } from 'react-router-dom';
import Layout from '@/components/Layout';
import SEO from '@/components/SEO';
import CartItemsList from '@/components/CartItemsList';
import CustomerOrderForm from '@/components/CustomerOrderForm';
import { useCartStore } from '@/stores/cartStore';
import { formatNPR } from '@/lib/currency';
import { ArrowLeft, ShoppingBag } from 'lucide-react';

export default function CartPage() {
  const { items, getTotalPrice, getTotalItems } = useCartStore();
  const total = formatNPR(getTotalPrice());
  const itemCount = getTotalItems();

  return (
    <Layout>
      <SEO
        title="Cart — Studio Order Request"
        description="Review your coredeltav™ studio selections and place your order request directly via WhatsApp."
        canonicalUrl="https://coredeltav.com/cart"
      />
      <div className="page-padding py-12 max-w-6xl mx-auto">
        <div className="flex items-center justify-between border-b border-border/80 pb-4 mb-8">
          <div className="flex items-center gap-3">
            <Link
              to="/shop"
              className="text-muted-foreground hover:text-foreground transition-colors p-1"
              aria-label="Back to shop"
            >
              <ArrowLeft className="w-4 h-4" />
            </Link>
            <h1 className="text-xs uppercase tracking-widest font-medium">
              Studio Cart {itemCount > 0 && `(${itemCount})`}
            </h1>
          </div>
          <Link
            to="/shop"
            className="text-[11px] uppercase tracking-wider text-muted-foreground hover:text-foreground underline underline-offset-4 transition-colors"
          >
            Continue Browsing
          </Link>
        </div>

        {items.length === 0 ? (
          <div className="py-24 text-center border border-dashed border-border/60 p-12">
            <ShoppingBag className="w-8 h-8 mx-auto text-muted-foreground/60 mb-4" />
            <p className="text-xs text-muted-foreground uppercase tracking-wider mb-4">
              Your cart is currently empty
            </p>
            <Link
              to="/shop"
              className="inline-block px-6 py-3 bg-foreground text-background text-xs uppercase tracking-widest hover:opacity-90 transition-opacity"
            >
              Explore Products
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Left: Cart Items */}
            <div className="lg:col-span-7">
              <div className="border border-border/80">
                <div className="px-4 py-3 bg-secondary/30 border-b border-border/60 flex justify-between items-center text-[10px] uppercase tracking-widest text-muted-foreground">
                  <span>Selected Products</span>
                  <span>{itemCount} {itemCount === 1 ? 'Item' : 'Items'}</span>
                </div>
                <CartItemsList />
              </div>

              {/* Delivery notice */}
              <div className="mt-6 p-4 border border-border/40 bg-secondary/20 space-y-1.5 text-left">
                <p className="text-[11px] uppercase tracking-wider font-medium text-foreground">
                  Delivery & Fulfillment Notice
                </p>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Orders within Kathmandu Valley are fulfilled via direct studio courier. Deliveries across other regions of Nepal are dispatched via reliable express courier. Final shipping fee is confirmed directly with you on WhatsApp prior to dispatch.
                </p>
              </div>
            </div>

            {/* Right: Order Summary & WhatsApp Checkout Details */}
            <div className="lg:col-span-5 space-y-6">
              <div className="border border-border/80 p-6 bg-background">
                <h2 className="text-xs uppercase tracking-widest font-medium border-b border-border/60 pb-3 mb-4">
                  Order Summary
                </h2>

                <div className="space-y-2.5 text-xs">
                  <div className="flex items-center justify-between text-muted-foreground">
                    <span>Subtotal</span>
                    <span className="text-foreground">{total}</span>
                  </div>
                  <div className="flex items-center justify-between text-muted-foreground">
                    <span>Estimated Shipping</span>
                    <span className="text-[11px] italic">Calculated upon confirmation</span>
                  </div>
                  <div className="border-t border-border/60 pt-3 flex items-center justify-between font-medium">
                    <span className="uppercase tracking-wider">Subtotal (NPR)</span>
                    <span className="text-sm">{total}</span>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-border/60">
                  <CustomerOrderForm />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}
