import Layout from '@/components/Layout';
import SEO from '@/components/SEO';
import ProductCard from '@/components/ProductCard';
import { productData } from '@/data/productData';
import { MessageSquare, Sparkles } from 'lucide-react';

export default function ProductsPage() {
  return (
    <Layout>
      <SEO
        title="Store & Minimalist Studio Goods"
        description="Browse custom studio objects, apparel editions, and physical products by coredeltav™ and Sabin Bhandari in Kathmandu, Nepal. Direct ordering via WhatsApp."
        canonicalUrl="https://coredeltav.com/shop"
      />

      <section className="page-padding py-12 md:py-16 min-h-screen max-w-7xl mx-auto">
        {/* Studio Header */}
        <div className="mb-10 pb-6 border-b border-border/80 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="inline-block w-1.5 h-1.5 bg-foreground" />
              <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-mono">
                Physical Practice / Studio Editions
              </p>
            </div>
            <h1 className="text-lg md:text-xl uppercase tracking-wider font-medium text-foreground">
              Objects & Goods
            </h1>
          </div>

          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <span className="font-mono text-[11px] uppercase tracking-wider">
              {productData.length} {productData.length === 1 ? 'Design' : 'Designs'}
            </span>
            <span className="text-border">|</span>
            <span className="text-[11px] tracking-wide">
              All prices in NPR (Rs.)
            </span>
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
          {productData.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>

        {/* Studio Ordering Info Footer Banner */}
        <div className="mt-20 pt-8 border-t border-border/60 grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
          <div className="space-y-1.5">
            <p className="text-[10px] uppercase tracking-widest font-semibold text-foreground">
              Crafted in Kathmandu
            </p>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Every edition is personally developed, prototyped, and inspected by Sabin Bhandari at the studio in Nepal.
            </p>
          </div>

          <div className="space-y-1.5">
            <p className="text-[10px] uppercase tracking-widest font-semibold text-foreground">
              Direct WhatsApp Checkout
            </p>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Skip payment gateway friction. Build your cart and dispatch an itemized pre-filled order directly to WhatsApp.
            </p>
          </div>

          <div className="space-y-1.5">
            <p className="text-[10px] uppercase tracking-widest font-semibold text-foreground">
              Local Delivery & Courier
            </p>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Prompt studio dispatch across Kathmandu Valley (Kathmandu, Lalitpur, Bhaktapur) and reliable express courier across Nepal.
            </p>
          </div>
        </div>
      </section>
    </Layout>
  );
}
