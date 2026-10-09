import { Helmet } from 'react-helmet-async';
import Layout from '@/components/Layout';
import PortfolioGallery from '@/components/PortfolioGallery';

export default function Index() {
  return (
    <Layout>
      <Helmet>
        <title>coredeltav — Creative Director & Visual Storyteller</title>
        <meta name="description" content="coredeltav is a Creative Director, visual storyteller, and content creator based in Kathmandu, Nepal. Specializing in visual production, brand strategy, photography, cinematography and video editing." />
      </Helmet>
      
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