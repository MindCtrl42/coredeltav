import { Link } from 'react-router-dom';
import Layout from '@/components/Layout';
import SEO from '@/components/SEO';
import ProductCard from '@/components/ProductCard';
import { productData } from '@/data/productData';
import { MessageSquare, Sparkles } from 'lucide-react';

export default function ProductsPage() {
  // Set to true to display the "Shop Under Construction" notice while preserving all product data & components
  const isUnderConstruction = true;

  return (
    <Layout>
      <SEO
        title="Shop Under Construction | coredeltav™"
        description="Physical editions, studio objects, and custom crafted goods by coredeltav™ and Sabin Bhandari are currently being prepared."
        canonicalUrl="https://coredeltav.com/shop"
      />

      {isUnderConstruction ? (
        <section className="page-padding py-24 md:py-36 min-h-[75vh] flex flex-col items-center justify-center text-center max-w-2xl mx-auto">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-border/80 bg-secondary/30 text-[10px] uppercase font-mono tracking-widest text-muted-foreground">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
              Physical Practice / Studio Editions
            </div>

            <h1 className="text-2xl sm:text-3xl md:text-4xl font-medium tracking-tight uppercase">
              Shop Under Construction
            </h1>

            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed max-w-md mx-auto">
              Our studio objects and physical editions catalog are currently being refined with new releases. Check back soon or reach out directly for custom inquiries and commissions.
            </p>

            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/archive"
                className="w-full sm:w-auto px-6 py-2.5 text-xs uppercase tracking-widest font-medium bg-foreground text-background hover:opacity-90 transition-opacity"
              >
                Explore Archive →
              </Link>
              <Link
                to="/contact"
                className="w-full sm:w-auto px-6 py-2.5 text-xs uppercase tracking-widest font-medium border border-border hover:bg-secondary/50 transition-colors"
              >
                Contact Studio
              </Link>
            </div>
          </div>
        </section>
      ) : (
        /* Preserved shop grid & ordering details */
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
      )}
    </Layout>
  );
}
