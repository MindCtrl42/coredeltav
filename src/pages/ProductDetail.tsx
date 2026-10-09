import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Layout from '@/components/Layout';
import { getProduct } from '@/data/productData';
import { formatNPR } from '@/lib/currency';
import { useCartStore } from '@/stores/cartStore';

export default function ProductDetail() {
  const { productId } = useParams();
  const product = getProduct(productId);
  const [quantity, setQuantity] = useState(1);
  const [active, setActive] = useState(0);
  const { addItem, setOpen } = useCartStore();

  if (!product) {
    return (
      <Layout>
        <div className="page-padding py-24 text-center">
          <p className="text-xs text-muted-foreground mb-4">Product not found</p>
          <Link to="/shop" className="text-xs uppercase underline underline-offset-4">Back to Shop</Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <Helmet>
        <title>{product.title} — coredeltav</title>
        <meta name="description" content={product.description} />
      </Helmet>
      <div className="page-padding py-12 grid grid-cols-1 md:grid-cols-2 gap-10">
        <div>
          <div className="aspect-square bg-secondary overflow-hidden">
            <img src={product.images[active]} alt={product.title} className="w-full h-full object-cover" />
          </div>
          {product.images.length > 1 && (
            <div className="mt-3 flex gap-2">
              {product.images.map((img, i) => (
                <button key={i} onClick={() => setActive(i)} aria-label={`View image ${i + 1}`}
                  className={`w-16 h-16 bg-secondary border ${i === active ? 'border-foreground' : 'border-transparent'}`}>
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>
        <div className="md:pt-8">
          <Link to="/shop" className="text-[10px] uppercase text-muted-foreground hover:text-foreground">← Shop</Link>
          <h1 className="text-lg uppercase mt-4">{product.title}</h1>
          <p className="text-sm mt-2">{formatNPR(product.price)}</p>
          <p className="text-xs text-muted-foreground mt-2">Shipping will be calculated according to the delivery location.</p>
          <p className="text-xs leading-relaxed mt-8">{product.description}</p>
          <div className="mt-8 flex items-center gap-4">
            <div className="flex items-center border border-border">
              <button onClick={() => setQuantity(q => Math.max(1, q - 1))} className="w-10 h-10 text-xs hover:bg-secondary" aria-label="Decrease quantity">−</button>
              <span className="w-10 text-center text-xs">{quantity}</span>
              <button onClick={() => setQuantity(q => q + 1)} className="w-10 h-10 text-xs hover:bg-secondary" aria-label="Increase quantity">+</button>
            </div>
          </div>
          <button
            disabled={product.soldOut}
            onClick={() => { addItem(product, quantity); setOpen(true); }}
            className="mt-4 w-full h-12 bg-foreground text-background text-xs uppercase hover:opacity-90 disabled:opacity-50"
          >
            {product.soldOut ? 'Sold out' : 'Add to Cart'}
          </button>
        </div>
      </div>
    </Layout>
  );
}
