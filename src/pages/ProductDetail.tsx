import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Layout from '@/components/Layout';
import SEO from '@/components/SEO';
import { getProduct } from '@/data/productData';
import { formatNPR } from '@/lib/currency';
import { getWhatsAppProductInquiryUrl } from '@/lib/whatsapp';
import { useCartStore } from '@/stores/cartStore';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { ArrowLeft, MessageSquare, Plus, Minus, Check, ShieldCheck } from 'lucide-react';

export default function ProductDetail() {
  const { productId } = useParams();
  const product = getProduct(productId);
  const [quantity, setQuantity] = useState(1);
  const [active, setActive] = useState(0);
  const [added, setAdded] = useState(false);
  const { addItem, setOpen } = useCartStore();

  if (!product) {
    return (
      <Layout>
        <SEO
          title="Product Not Found"
          description="The requested product could not be located in the coredeltav™ studio archive."
          canonicalUrl="https://coredeltav.com/shop"
        />
        <div className="page-padding py-24 text-center">
          <p className="text-xs uppercase tracking-widest text-muted-foreground mb-4">
            Product Not Found
          </p>
          <Link
            to="/shop"
            className="inline-block text-xs uppercase tracking-widest underline underline-offset-4 hover:opacity-60"
          >
            ← Return to Shop
          </Link>
        </div>
      </Layout>
    );
  }

  const handleAddToCart = () => {
    addItem(product, quantity);
    setAdded(true);
    setOpen(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const directInquiryUrl = getWhatsAppProductInquiryUrl(product);

  return (
    <Layout>
      <SEO
        title={`${product.title} — Studio Goods`}
        description={product.description}
        canonicalUrl={`https://coredeltav.com/shop/${product.id}`}
        ogImage={product.images[0]}
        ogType="product"
        productData={{
          name: product.title,
          description: product.description,
          price: product.price,
          currency: 'NPR',
          image: product.images[0],
          availability: product.soldOut ? 'OutOfStock' : 'InStock',
        }}
      />

      <div className="page-padding py-10 md:py-16 max-w-7xl mx-auto">
        {/* Navigation Breadcrumb */}
        <div className="mb-8">
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 text-[10px] uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Shop Archive</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
          {/* Left Column: Image Gallery */}
          <div className="lg:col-span-7 space-y-4">
            <div className="aspect-square bg-secondary/80 border border-border/60 overflow-hidden relative">
              <img
                src={product.images[active] || product.images[0]}
                alt={`${product.title} - view ${active + 1}`}
                className="w-full h-full object-cover transition-opacity duration-300"
              />
              {product.isNew && (
                <span className="absolute top-4 left-4 bg-background/90 backdrop-blur-xs text-[9px] uppercase tracking-widest font-mono px-2.5 py-1 border border-border">
                  {product.edition || 'Studio Edition'}
                </span>
              )}
            </div>

            {/* Thumbnail switcher if multiple images */}
            {product.images.length > 1 && (
              <div className="flex gap-3">
                {product.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActive(i)}
                    aria-label={`View image ${i + 1}`}
                    className={`w-20 h-20 bg-secondary border transition-all ${
                      i === active ? 'border-foreground ring-1 ring-foreground/20' : 'border-border/60 opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right Column: Product Metadata & Purchasing */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-8">
            <div className="space-y-6">
              <div>
                {product.category && (
                  <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-mono mb-1.5">
                    {product.category}
                  </p>
                )}
                <h1 className="text-xl md:text-2xl uppercase tracking-wider font-medium text-foreground">
                  {product.title}
                </h1>
                <div className="mt-2.5 flex items-baseline gap-3">
                  <span className="text-base font-semibold font-mono text-foreground">
                    {formatNPR(product.price)}
                  </span>
                  <span className="text-[11px] text-muted-foreground uppercase tracking-widest">
                    Nepali Rupees
                  </span>
                </div>
              </div>

              {/* Description */}
              <div className="border-t border-b border-border/60 py-5">
                <p className="text-xs leading-relaxed text-muted-foreground">
                  {product.description}
                </p>
              </div>

              {/* Quantity & Cart Actions */}
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <span className="text-[10px] uppercase tracking-widest text-muted-foreground">
                    Quantity
                  </span>
                  <div className="flex items-center border border-border">
                    <button
                      type="button"
                      onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                      className="w-9 h-9 flex items-center justify-center text-xs hover:bg-secondary transition-colors"
                      aria-label="Decrease quantity"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="w-10 text-center text-xs font-mono">{quantity}</span>
                    <button
                      type="button"
                      onClick={() => setQuantity((q) => q + 1)}
                      className="w-9 h-9 flex items-center justify-center text-xs hover:bg-secondary transition-colors"
                      aria-label="Increase quantity"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>
                </div>

                {/* Primary CTA: Add to Cart */}
                <button
                  type="button"
                  disabled={product.soldOut}
                  onClick={handleAddToCart}
                  className="w-full h-12 bg-foreground text-background text-xs uppercase tracking-widest font-medium hover:opacity-90 disabled:opacity-50 flex items-center justify-center gap-2 transition-opacity"
                >
                  {added ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>Added to Studio Cart</span>
                    </>
                  ) : product.soldOut ? (
                    'Sold Out / Archived'
                  ) : (
                    'Add to Cart'
                  )}
                </button>

                {/* Secondary CTA: Direct WhatsApp Inquiry */}
                <a
                  href={directInquiryUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full h-11 border border-border text-xs uppercase tracking-widest font-medium hover:bg-secondary flex items-center justify-center gap-2 transition-colors"
                >
                  <MessageSquare className="w-3.5 h-3.5 text-muted-foreground" />
                  <span>Direct WhatsApp Inquiry</span>
                </a>

                <div className="flex items-center justify-center gap-1.5 text-[10px] text-muted-foreground text-center pt-1">
                  <ShieldCheck className="w-3 h-3 text-muted-foreground" />
                  <span>Direct checkout via WhatsApp. Handled personally by Sabin Bhandari.</span>
                </div>
              </div>
            </div>

            {/* Accordion Specs & Studio Notes */}
            <div className="pt-4 border-t border-border/60">
              <Accordion type="single" collapsible className="w-full">
                {product.details && product.details.length > 0 && (
                  <AccordionItem value="specifications">
                    <AccordionTrigger className="text-xs uppercase tracking-widest text-left">
                      Specifications & Details
                    </AccordionTrigger>
                    <AccordionContent>
                      <ul className="text-xs text-muted-foreground space-y-1.5 pl-4 list-disc">
                        {product.details.map((detail, idx) => (
                          <li key={idx}>{detail}</li>
                        ))}
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                )}

                <AccordionItem value="shipping">
                  <AccordionTrigger className="text-xs uppercase tracking-widest text-left">
                    Kathmandu & Nepal Delivery
                  </AccordionTrigger>
                  <AccordionContent className="text-xs text-muted-foreground leading-relaxed space-y-2">
                    <p>
                      <strong>Kathmandu Valley:</strong> Direct studio courier delivery within 24–48 hours of confirmation.
                    </p>
                    <p>
                      <strong>Outside Valley:</strong> Dispatched via reliable express courier across major cities in Nepal (Pokhara, Biratnagar, Chitwan, Dharan, Butwal).
                    </p>
                    <p>
                      Shipping fees are communicated and confirmed prior to dispatch on WhatsApp.
                    </p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="craft">
                  <AccordionTrigger className="text-xs uppercase tracking-widest text-left">
                    Studio Craft & Philosophy
                  </AccordionTrigger>
                  <AccordionContent className="text-xs text-muted-foreground leading-relaxed">
                    coredeltav™ physical goods are designed and produced in small intentional batches. Rather than mass-market manufacturing, each piece is conceived as a durable physical artifact reflecting minimalist brutalism and thoughtful utility.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
