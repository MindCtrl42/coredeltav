import { Helmet } from 'react-helmet-async';
import Layout from '@/components/Layout';
import ProductCard from '@/components/ProductCard';
import { productData } from '@/data/productData';

export default function ProductsPage() {
  return (
    <Layout>
      <Helmet>
        <title>Shop — coredeltav</title>
        <meta name="description" content="Shop coredeltav products." />
      </Helmet>
      <section className="page-padding py-16 min-h-screen">
        <div className="mb-12 flex items-end justify-between border-b border-border pb-4">
          <h1 className="text-lg uppercase">All Products</h1>
          <span className="text-sm text-muted-foreground">{productData.length} products</span>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {productData.map(p => <ProductCard key={p.id} product={p} />)}
        </div>
      </section>
    </Layout>
  );
}
