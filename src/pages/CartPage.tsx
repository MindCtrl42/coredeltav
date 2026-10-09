import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Layout from '@/components/Layout';
import CartItemsList from '@/components/CartItemsList';
import { useCartStore } from '@/stores/cartStore';
import { formatNPR } from '@/lib/currency';

export default function CartPage() {
  const { items, placeOrderRequest, getTotalPrice } = useCartStore();
  const total = formatNPR(getTotalPrice());

  return (
    <Layout>
      <Helmet>
        <title>Cart — coredeltav</title>
        <meta name="description" content="Your cart" />
      </Helmet>
      <div className="page-padding py-12">
        <h1 className="text-sm uppercase mb-8">Cart</h1>
        {items.length === 0 ? (
          <div className="py-16 text-center">
            <p className="text-xs text-muted-foreground mb-4">Your cart is empty</p>
            <Link to="/shop" className="text-xs uppercase underline underline-offset-4 hover:opacity-60">Continue Shopping</Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2 border-t border-b border-border"><CartItemsList /></div>
            <div className="border border-border p-6 h-fit">
              <h2 className="text-xs uppercase mb-6">Order Summary</h2>
              <div className="flex items-center justify-between text-xs mb-3">
                <span className="text-muted-foreground">Subtotal</span><span>{total}</span>
              </div>
              <div className="border-t border-border pt-4 mb-4 flex items-center justify-between text-xs">
                <span className="uppercase">Total</span><span>{total}</span>
              </div>
              <p className="text-xs text-muted-foreground mb-6">Shipping will be calculated according to the delivery location.</p>
              <button onClick={placeOrderRequest} className="w-full h-12 bg-foreground text-background text-xs uppercase hover:opacity-90">Place Order Request</button>
              <p className="text-xs text-muted-foreground text-center mt-4">Opens WhatsApp with your order details ready to send.</p>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}
