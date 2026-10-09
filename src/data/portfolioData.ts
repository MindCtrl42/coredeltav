import kathmandu from '@/assets/portfolio-mythicalbeast.jpg';
import culture from '@/assets/portfolio-lakhe.jpg';
import motion from '@/assets/portfolio-joyriot1.jpg';
import jatra from '@/assets/portfolio-jatrabhimsen1.jpg';
import jatra2 from '@/assets/portfolio-jatrabhimsen2.jpg';
import jatra3 from '@/assets/portfolio-jatrabhimsen3.jpg';
import jatra4 from '@/assets/portfolio-jatrabhimsen4.jpg';
import jatra5 from '@/assets/portfolio-jatrabhimsen5.jpg';
import jatra6 from '@/assets/portfolio-jatrabhimsen6.jpg';
import jatra7 from '@/assets/portfolio-jatrabhimsen7.jpg';
import jatra8 from '@/assets/portfolio-jatrabhimsen8.jpg';
import jatra9 from '@/assets/portfolio-jatrabhimsen9.jpg';
import jatra10 from '@/assets/portfolio-jatrabhimsen10.jpg';
import joy1 from '@/assets/portfolio-joyriot1.jpg';
import joy2 from '@/assets/portfolio-joyriot2.jpg';
import joy3 from '@/assets/portfolio-joyriot3.jpg';
import joy4 from '@/assets/portfolio-joyriot4.jpg';
import joy5 from '@/assets/portfolio-joyriot5.jpg';
import coming from '@/assets/portfolio-coming.png';


export interface PortfolioPhoto {
  src: string;
  alt: string;
}

export interface PortfolioEvent {
  /** Used in the URL: /work/:id */
  id: string;
  title: string;
  category: string;
  description: string;
  cover: string;
  coverAlt: string;
  photos: PortfolioPhoto[];
}

// Add a new event by adding a new entry to this array.
export const portfolioData: PortfolioEvent[] = [
  {
    id: 'Mythical BEAST',
    title: 'MYTHICAL BEAST',
    category: 'Wildlife Photography',
    description: 'Captured at (12,313 feet) above sea level near Gangtok Tsomgo Lake, this photograph brings a Himalayan myth into sharp reality. The image features a solitary, colossal Tibetan Yak standing against rugged mountain slopes under a clear blue sky, its formidable horns wrapped in bright red knitted covers with long flowing fringes.'
,
    cover: kathmandu,
    coverAlt: '',
    photos: [
      { src: kathmandu, alt: 'MYTHICAL BEAST(YAK)' },
      
    ],
  },
  {
    id: 'living-traditions',
    title: 'Living traditions',
    category: 'LAKHE',
    description: 'Captured in Patan Durbar Square, this photograph captures the powerful presence of a Lakhe. A fierce figure raises both arms high, wearing a vivid red demonic mask with bulging eyes, sharp fangs, and wild black-and-white hair cascading over an ornate golden costume adorned with marigold garlands.',
    cover: culture,
    coverAlt: '',
    photos: [
      { src: culture, alt: '' },
      
    ],
  },
  {
    id: 'JOYRIOT',
    title: 'JOYRIOT',
    category: 'A sober morning dance Party',
    description: 'Stills from a rooftop Sober Morning Dance Party in Kathmandu, Nepal. The event was a celebration of music, dance, and community, bringing together people from all walks of life to enjoy a morning filled with joy and rhythm.',
    cover: motion,
    coverAlt: 'A sober morning dance Party',
    photos: [
      { src: joy1,alt: 'A sober morning dance Party' },
      { src: joy2, alt: 'A sober morning dance Party' },
      { src: joy3, alt: 'A sober morning dance Party' },
      { src: joy4, alt: 'A sober morning dance Party' },
      { src: joy5, alt: 'A sober morning dance Party' },
    ],
  },

  
  {
    id: 'BHIMSEN JATRA',
    title: 'BHIMSEN JATRA',
    category: 'Jatra',
    description: 'Stills from Bhimsan Jatra, a traditional festival in Nepal. The event is marked by vibrant processions, cultural performances, and community gatherings, showcasing the rich heritage and traditions of the region.',
    cover: jatra,
    coverAlt: 'Bhimsen Jatra',
    photos: [
      { src: jatra, alt: 'Bhimsen Jatra' },
      { src: jatra2, alt: 'Bhimsen Jatra' },
      { src: jatra3, alt: 'Bhimsen Jatra' },
      { src: jatra4, alt: 'Bhimsen Jatra' },
      { src: jatra5, alt: 'Bhimsen Jatra' },
      { src: jatra6, alt: 'Bhimsen Jatra' },
      { src: jatra7, alt: 'Bhimsen Jatra' },
      { src: jatra8, alt: 'Bhimsen Jatra' },
      { src: jatra9, alt: 'Bhimsen Jatra' },
      { src: jatra10, alt: 'Bhimsen Jatra' },

    ],
  },
  {
    id: 'comingsoon',
    title: 'coming soon',
    category: 'Coming soon',
    description: '',
    cover: coming,
    coverAlt: 'Coming soon',
    photos: [
      { src: coming, alt: 'Coming soon' },
    

    ],
  },
];




export const getEvent = (id?: string) => portfolioData.find(e => e.id === id);
