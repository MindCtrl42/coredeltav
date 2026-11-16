import { useState } from 'react';
import Layout from '@/components/Layout';
import SEO from '@/components/SEO';
import PortfolioGallery from '@/components/PortfolioGallery';

export default function ArchivePage() {
  // If you only want it to play once per browser session, check sessionStorage:
  const [isPlaying, setIsPlaying] = useState(() => {
    return !sessionStorage.getItem('archive_intro_played');
  });

  const handleVideoEnd = () => {
    sessionStorage.setItem('archive_intro_played', 'true');
    setIsPlaying(false);
  };

  return (
    <Layout>
      <SEO
        title="Visual Archive & Portfolio — Creative Direction & Cinematography"
        description="Explore the visual archive and curated portfolio of coredeltav™ and Sabin Bhandari in Kathmandu, Nepal. Cinematography, documentary stills, commercial video, and cultural narratives."
        canonicalUrl="https://coredeltav.com/archive"
      />

      {/* Video Loading Overlay */}
      {isPlaying && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black transition-opacity duration-500">
          <video
            src="/archive-loading.mp4"
            autoPlay
            muted
            playsInline
            onEnded={handleVideoEnd}
            onError={handleVideoEnd}
            className="w-full h-full object-cover"
          />

          {/* Optional skip button in case user wants to skip */}
          <button
            onClick={handleVideoEnd}
            className="absolute top-6 right-6 text-xs uppercase tracking-widest text-white/70 hover:text-white px-3 py-1.5 border border-white/20 rounded"
          >
            Skip
          </button>
        </div>
      )}

      <div className="flex flex-col min-h-[calc(100vh-5rem)] justify-between pb-6">
        <section className="page-padding pt-8 pb-4 md:pt-12 md:pb-6">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-5">
            {/* Header/Intro content */}
          </div>
        </section>

        <div className="flex-1 flex flex-col justify-center">
          <PortfolioGallery />
        </div>
      </div>
    </Layout>
  );
}