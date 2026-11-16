import { useMemo } from 'react';
import { Link, useParams } from 'react-router-dom';
import Layout from '@/components/Layout';
import SEO from '@/components/SEO';
import ScrollZoomImage from '@/components/ScrollZoomImage';
import { portfolioData, getEvent, normalizePhoto, PhotoItem } from '@/data/portfolioData';
import { ArrowLeft, ArrowUpRight, ArrowRight } from 'lucide-react';

/**
 * Adaptive Photo Grid:
 * Intelligently arranges 1, 2, 3, or more photos into clean editorial layouts
 * matching the user's reference design, with scroll-zoom animations and ZERO repetition.
 */
function AdaptivePhotoSection({
  photos,
  projectTitle,
}: {
  photos: { src: string; alt: string }[];
  projectTitle: string;
}) {
  if (!photos || photos.length === 0) return null;

  // Case 1: Single image -> Full container width in natural uncropped ratio
  if (photos.length === 1) {
    return (
      <div className="w-full">
        <ScrollZoomImage
          src={photos[0].src}
          alt={photos[0].alt || `${projectTitle} Still`}
        />
      </div>
    );
  }

  // Case 2: Exactly 2 images -> 2-column balanced split in natural uncropped ratio
  if (photos.length === 2) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
        <ScrollZoomImage
          src={photos[0].src}
          alt={photos[0].alt || `${projectTitle} Frame 1`}
        />
        <ScrollZoomImage
          src={photos[1].src}
          alt={photos[1].alt || `${projectTitle} Frame 2`}
        />
      </div>
    );
  }

  // Case 3: Exactly 3 images -> Asymmetric editorial layout in natural uncropped ratios
  // Left: Feature image | Right: Two stacked detail images
  if (photos.length === 3) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
        <div className="md:col-span-6">
          <ScrollZoomImage
            src={photos[0].src}
            alt={photos[0].alt || `${projectTitle} Feature Still`}
          />
        </div>
        <div className="md:col-span-6 space-y-6">
          <ScrollZoomImage
            src={photos[1].src}
            alt={photos[1].alt || `${projectTitle} Detail Still 1`}
          />
          <ScrollZoomImage
            src={photos[2].src}
            alt={photos[2].alt || `${projectTitle} Detail Still 2`}
          />
        </div>
      </div>
    );
  }

  // Case 4: 4 images -> 2-column stacked in natural uncropped ratios
  if (photos.length === 4) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
        <div className="space-y-6">
          <ScrollZoomImage
            src={photos[0].src}
            alt={photos[0].alt || `${projectTitle} Still 1`}
          />
          <ScrollZoomImage
            src={photos[2].src}
            alt={photos[2].alt || `${projectTitle} Still 3`}
          />
        </div>
        <div className="space-y-6">
          <ScrollZoomImage
            src={photos[1].src}
            alt={photos[1].alt || `${projectTitle} Still 2`}
          />
          <ScrollZoomImage
            src={photos[3].src}
            alt={photos[3].alt || `${projectTitle} Still 4`}
          />
        </div>
      </div>
    );
  }

  // Case 5: 5+ images -> Alternating 2-column masonry in natural uncropped ratios
  const leftColPhotos = photos.filter((_, i) => i % 2 === 0);
  const rightColPhotos = photos.filter((_, i) => i % 2 === 1);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
      <div className="space-y-6">
        {leftColPhotos.map((photo, i) => (
          <ScrollZoomImage
            key={photo.src + i * 2}
            src={photo.src}
            alt={photo.alt || `${projectTitle} Still ${i * 2 + 1}`}
          />
        ))}
      </div>
      <div className="space-y-6">
        {rightColPhotos.map((photo, i) => (
          <ScrollZoomImage
            key={photo.src + i * 2 + 1}
            src={photo.src}
            alt={photo.alt || `${projectTitle} Still ${i * 2 + 2}`}
          />
        ))}
      </div>
    </div>
  );
}

export default function EventGallery() {
  const { eventId } = useParams();
  const event = getEvent(eventId);

  // Compute next project for continuous portfolio exploration
  const currentIndex = portfolioData.findIndex(
    (e) => e.id.toLowerCase() === (eventId || '').toLowerCase()
  );
  const nextEvent =
    currentIndex >= 0 && currentIndex < portfolioData.length - 1
      ? portfolioData[currentIndex + 1]
      : portfolioData[0];

  // --------------------------------------------------------------------------
  // STRICT ZERO-REPETITION PHOTO PIPELINE:
  // Tracks every photo used starting from the hero banner.
  // No photo is EVER rendered twice on the page.
  // --------------------------------------------------------------------------
  const { processedSections, unassignedPhotos } = useMemo(() => {
    if (!event) return { processedSections: [], unassignedPhotos: [] };

    const seenSrcs = new Set<string>();

    // Mark cover/hero banner as used first
    if (event.cover) {
      seenSrcs.add(event.cover);
    }

    // Process modular sections and deduplicate photos inside each section
    const rawSections = event.sections || [];
    const processed = rawSections.map((sec) => {
      const rawPhotos = sec.photos || [];
      const normalized = rawPhotos.map((p) => normalizePhoto(p));
      const freshPhotos = normalized.filter((p) => {
        if (!p.src || seenSrcs.has(p.src)) return false;
        seenSrcs.add(p.src);
        return true;
      });

      return {
        topic: sec.topic,
        heading: sec.heading,
        paragraphs: sec.paragraphs || [],
        photos: freshPhotos,
      };
    });

    // Process any standalone photos in event.photos
    const standaloneRaw = event.photos || [];
    const normalizedStandalone = standaloneRaw.map((p) => normalizePhoto(p));
    const freshStandalone = normalizedStandalone.filter((p) => {
      if (!p.src || seenSrcs.has(p.src)) return false;
      seenSrcs.add(p.src);
      return true;
    });

    return {
      processedSections: processed,
      unassignedPhotos: freshStandalone,
    };
  }, [event]);

  if (!event) {
    return (
      <Layout className="bg-black">
        <SEO
          title="Archive Not Found"
          description="The requested project archive could not be located."
          canonicalUrl="https://coredeltav.com/archive"
        />
        <div className="min-h-screen bg-black text-white page-padding py-32 text-center">
          <p className="text-xs uppercase tracking-widest text-neutral-400 mb-4">
            Archive Work Not Found
          </p>
          <Link
            to="/archive"
            className="text-xs uppercase tracking-widest text-white underline underline-offset-4 hover:text-neutral-400 transition-colors"
          >
            ← Return to Archive
          </Link>
        </div>
      </Layout>
    );
  }

  // Metadata fallbacks
  const year = event.year || '2024';
  const role = event.role || 'Creative Direction & Cinematography';
  const scope = event.scope || 'Visual Narrative & Documentary';
  const location = event.location || 'Kathmandu, Nepal';
  const timeline = event.timeline || 'Studio Release';
  const pitch = event.pitch || event.description || '';

  return (
    <Layout className="bg-black">
      <SEO
        title={`${event.title} — Visual Archive`}
        description={event.pitch || event.description}
        canonicalUrl={`https://coredeltav.com/work/${encodeURIComponent(event.id)}`}
        ogImage={event.cover}
        jsonLd={{
          '@type': 'VisualArtwork',
          name: event.title,
          description: event.description || event.pitch,
          creator: {
            '@type': 'Person',
            name: 'Sabin Bhandari',
            url: 'https://coredeltav.com',
          },
          genre: event.category,
          artform: 'Photography / Cinematography',
          image: event.cover,
        }}
      />

      <article className="min-h-screen bg-black text-white selection:bg-neutral-800 selection:text-white">
        <div className="page-padding max-w-7xl mx-auto pt-6 pb-24 md:pb-32 space-y-16 md:space-y-24">
          
          {/* Top Breadcrumb Nav */}
          <div className="pt-2">
            <Link
              to="/archive"
              className="inline-flex items-center gap-2 text-[10px] uppercase tracking-widest text-neutral-400 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Archive</span>
            </Link>
          </div>

          {/* PROJECT HEADER & METADATA (Reference Image 1) */}
          <header className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
            {/* Left: Project Title, Pitch, Action Pill */}
            <div className="lg:col-span-7 space-y-6">
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-medium tracking-tight text-white uppercase">
                {event.title}
              </h1>

              {pitch && (
                <p className="text-sm sm:text-base text-neutral-400 leading-relaxed max-w-xl">
                  {pitch}
                </p>
              )}

              <div className="pt-2">
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-neutral-700 bg-neutral-950/60 text-neutral-300 hover:text-white hover:border-white text-xs uppercase tracking-wider transition-all duration-300 group"
                >
                  <span>Commission Visual Work</span>
                  <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </Link>
              </div>
            </div>

            {/* Right: Spec Meta Table with Thin Horizontal Dividers */}
            <div className="lg:col-span-5 border-t border-neutral-800 divide-y divide-neutral-800 text-xs">
              <div className="py-3.5 flex justify-between items-baseline gap-4">
                <span className="text-white font-medium uppercase tracking-wider text-[11px]">
                  Year
                </span>
                <span className="text-neutral-400 font-mono">
                  {year}
                </span>
              </div>

              <div className="py-3.5 flex justify-between items-baseline gap-4">
                <span className="text-white font-medium uppercase tracking-wider text-[11px]">
                  Discipline
                </span>
                <span className="text-neutral-400 text-right">
                  {role}
                </span>
              </div>

              <div className="py-3.5 flex justify-between items-baseline gap-4">
                <span className="text-white font-medium uppercase tracking-wider text-[11px]">
                  Space of Work
                </span>
                <span className="text-neutral-400 text-right">
                  {scope}
                </span>
              </div>

              <div className="py-3.5 flex justify-between items-baseline gap-4">
                <span className="text-white font-medium uppercase tracking-wider text-[11px]">
                  Location
                </span>
                <span className="text-neutral-400 text-right">
                  {location}
                </span>
              </div>

              <div className="py-3.5 flex justify-between items-baseline gap-4">
                <span className="text-white font-medium uppercase tracking-wider text-[11px]">
                  Timeline
                </span>
                <span className="text-neutral-400 text-right">
                  {timeline}
                </span>
              </div>
            </div>
          </header>

          {/* HERO BANNER IMAGE (Displays once in natural uncropped ratio; never duplicated below) */}
          <section className="w-full">
            <ScrollZoomImage
              src={event.cover}
              alt={event.coverAlt || `${event.title} Hero View`}
              priority
            />
          </section>

          {/* MODULAR SECTIONS (Rendered in user-defined order; zero duplicate photos) */}
          {processedSections.map((sec, idx) => {
            const hasText = Boolean(sec.topic || sec.heading || (sec.paragraphs && sec.paragraphs.length > 0));
            const hasPhotos = sec.photos && sec.photos.length > 0;

            return (
              <section key={idx} className="space-y-10 md:space-y-14">
                {/* 2-Column Editorial Text Block */}
                {hasText && (
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-16 pt-2">
                    <div className="lg:col-span-3">
                      {sec.topic && (
                        <span className="text-xs uppercase tracking-widest text-white font-medium sticky top-24">
                          {sec.topic}
                        </span>
                      )}
                    </div>
                    <div className="lg:col-span-9 max-w-3xl space-y-6">
                      {sec.heading && (
                        <h2 className="text-xl sm:text-2xl md:text-3xl font-medium tracking-tight text-white leading-snug">
                          {sec.heading}
                        </h2>
                      )}
                      {sec.paragraphs && sec.paragraphs.length > 0 && (
                        <div className="space-y-4 text-xs sm:text-sm text-neutral-400 leading-relaxed">
                          {sec.paragraphs.map((para, pIdx) => (
                            <p key={pIdx}>{para}</p>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Adaptive Photos Attached to This Section */}
                {hasPhotos && (
                  <AdaptivePhotoSection
                    photos={sec.photos}
                    projectTitle={event.title}
                  />
                )}
              </section>
            );
          })}

          {/* UNASSIGNED STANDALONE PHOTOS (If any extra photos were provided outside sections) */}
          {unassignedPhotos.length > 0 && (
            <section className="space-y-6 pt-4">
              <AdaptivePhotoSection
                photos={unassignedPhotos}
                projectTitle={event.title}
              />
            </section>
          )}

          {/* FOOTER: NEXT ARCHIVE PROJECT NAVIGATOR */}
          <footer className="border-t border-neutral-800 pt-12 md:pt-16 mt-20">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
              <div>
                <p className="text-[10px] uppercase tracking-widest text-neutral-500 mb-1">
                  Next Archive Work
                </p>
                <Link
                  to={`/work/${encodeURIComponent(nextEvent.id)}`}
                  className="group inline-flex items-center gap-3 text-xl sm:text-2xl md:text-3xl font-medium text-white hover:text-neutral-300 transition-colors"
                >
                  <span className="uppercase">{nextEvent.title}</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-300" />
                </Link>
              </div>

              <div className="flex items-center gap-6">
                <Link
                  to="/archive"
                  className="text-xs uppercase tracking-widest text-neutral-400 hover:text-white underline underline-offset-4 transition-colors"
                >
                  View All Archive
                </Link>
                <Link
                  to="/contact"
                  className="px-5 py-2.5 bg-white text-black text-xs uppercase tracking-widest font-medium hover:bg-neutral-200 transition-colors"
                >
                  Reach Out
                </Link>
              </div>
            </div>
          </footer>

        </div>
      </article>
    </Layout>
  );
}
