import { useCallback, useEffect, useRef, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { portfolioData } from '@/data/portfolioData';

const projects = portfolioData.map(e => ({ id: e.id, title: e.title, category: e.category, image: e.cover, alt: e.coverAlt }));
const slides = Array.from({ length: 3 }).flatMap(() => projects);

export default function PortfolioGallery() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: 'center', duration: 28 });
  const wheelRef = useRef<HTMLDivElement>(null);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const navigate = useNavigate();
  const setViewingIndex = (i: number) => navigate(`/work/${projects[i].id}`);
  const onSelect = useCallback(() => {
    if (emblaApi) setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);
    onSelect();
    return () => { emblaApi.off('select', onSelect); emblaApi.off('reInit', onSelect); };
  }, [emblaApi, onSelect]);

  useEffect(() => {
    const target = wheelRef.current;
    if (!target || !emblaApi) return;
    let locked = false;
    let timer: ReturnType<typeof setTimeout>;
    const onWheel = (event: WheelEvent) => {
            event.preventDefault();
      const delta = event.deltaX !== 0 ? event.deltaX : event.deltaY;
      if (locked || Math.abs(delta) < 6) return;
      locked = true;
      if (delta > 0) emblaApi.scrollNext(); else emblaApi.scrollPrev();
      timer = setTimeout(() => { locked = false; }, 260);
    };
    target.addEventListener('wheel', onWheel, { passive: false });
    return () => { target.removeEventListener('wheel', onWheel); clearTimeout(timer); };
  }, [emblaApi]);

  return (
      <section aria-label="Selected work" className="relative">
        <div ref={wheelRef} data-lenis-prevent tabIndex={0} role="region" aria-label="Portfolio gallery"
          className="flex min-h-[480px] h-[65svh] max-h-[850px] items-center overflow-hidden outline-none focus-visible:ring-1 focus-visible:ring-ring"
          onKeyDown={event => {
            if (event.target !== event.currentTarget) return;
            if (event.key === 'ArrowLeft') { event.preventDefault(); emblaApi?.scrollPrev(); }
            if (event.key === 'ArrowRight') { event.preventDefault(); emblaApi?.scrollNext(); }
            if (event.key === 'Enter') setViewingIndex(selectedIndex % projects.length);
          }}>
          <div ref={emblaRef} className="w-full">
            <div className="flex items-center cursor-grab active:cursor-grabbing">
              {slides.map((item, index) => (
                <div key={`${item.title}-${index}`} className="flex-none px-6 md:px-12 lg:px-20">
                  <div className={`motion-safe:transition-[transform,opacity] duration-500 ${index === selectedIndex ? 'opacity-100 scale-100' : 'opacity-45 scale-[0.75]'}`}>
                    <Button variant="ghost" aria-label={`View ${item.title}`} onClick={() => setViewingIndex(index % projects.length)}
                      tabIndex={index === selectedIndex ? 0 : -1}
                      className="block h-auto w-[240px] md:w-[320px] lg:w-[380px] p-0 hover:bg-transparent">
                      <img src={item.image} alt={item.alt} width={1024} height={1536} loading={index === 0 ? 'eager' : 'lazy'} draggable={false} className="w-full aspect-[2/3] object-cover" />
                    </Button>
                    <div className="mt-4 h-10 text-center">
                      <p className="text-xs uppercase">{item.title}</p>
                      <p className="mt-1 text-[10px] uppercase text-muted-foreground">{item.category}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="page-padding flex items-center justify-between border-t border-border py-3">
          <span className="text-[10px] uppercase text-muted-foreground">Selected work / {String(selectedIndex % projects.length + 1).padStart(2, '0')} — {String(projects.length).padStart(2, '0')}</span>
          <div className="flex gap-1">
            <Button variant="ghost" size="icon" title="Previous project" aria-label="Previous project" onClick={() => emblaApi?.scrollPrev()}><ArrowLeft /></Button>
            <Button variant="ghost" size="icon" title="Next project" aria-label="Next project" onClick={() => emblaApi?.scrollNext()}><ArrowRight /></Button>
          </div>
        </div>
      </section>
  );
}