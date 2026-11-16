import Layout from '@/components/Layout';
import SEO from '@/components/SEO';
import PortfolioGallery from '@/components/PortfolioGallery';

export default function Index() {
  return (
    <Layout>
      <SEO
        title="Creative Director & Visual Storyteller | Kathmandu, Nepal"
        description="coredeltav™ is an independent creative studio and product practice in Kathmandu, Nepal led by Creative Director Sabin Bhandari."
      />
      
      <div className="flex flex-col min-h-[calc(100vh-5rem)] justify-between pb-6">
        <section className="page-padding pt-8 pb-4 md:pt-12 md:pb-6">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-5">
            {/* Header/Intro content */}
          </div>
        </section>
        
        {/* Changed from justify-end to justify-center to center the photos vertically */}
        <div className="flex-1 flex flex-col justify-center">
          <PortfolioGallery />
        </div>
      </div>
    </Layout>
  );
}