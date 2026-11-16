import kathmandu from '@/assets/portfolio-mythicalbeast.jpg';
import culture from '@/assets/portfolio-lakhe.jpg';
import motion from '@/assets/portfolio-joyriot1.jpg';
import joy1 from '@/assets/portfolio-joyriot1.jpg';
import joy2 from '@/assets/portfolio-joyriot2.jpg';
import joy3 from '@/assets/portfolio-joyriot3.jpg';
import joy4 from '@/assets/portfolio-joyriot4.jpg';
import joy5 from '@/assets/portfolio-joyriot5.jpg';
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
import coming from '@/assets/portfolio-coming.png';

/**
 * Flexible photo definition: either a direct image import string or an object with alt text.
 */
export type PhotoItem = string | { src: string; alt?: string };

export function normalizePhoto(item: PhotoItem, fallbackAlt = ''): { src: string; alt: string } {
  if (typeof item === 'string') {
    return { src: item, alt: fallbackAlt };
  }
  return { src: item.src, alt: item.alt || fallbackAlt };
}

/**
 * Editorial Content Section:
 * - topic: Section tag on left in white (e.g. "Introduction", "Visual Direction")
 * - heading: Headline in white
 * - paragraphs: Body text in grey
 * - photos: Array of photos attached to this section (each photo is used ONCE; never repeated)
 */
export interface ArchiveSection {
  topic?: string;
  heading?: string;
  paragraphs?: string[];
  photos?: PhotoItem[];
}

export interface PortfolioEvent {
  /** Used in the URL: /work/:id */
  id: string;
  title: string;
  category: string;
  year?: string;
  role?: string;
  scope?: string;
  location?: string;
  timeline?: string;
  pitch?: string;
  description?: string;
  
  /** Hero banner image (shown once at top, never repeated in grids) */
  cover: string;
  coverAlt?: string;

  /** Modular sections with text and/or photos */
  sections?: ArchiveSection[];

  /** Additional standalone photos (used automatically without repetition) */
  photos?: PhotoItem[];
}

/**
 * ============================================================================
 * ARCHIVE DATA (Single Source of Truth)
 * ----------------------------------------------------------------------------
 * To edit or add projects:
 * 1. Import your images at the top of this file.
 * 2. Add or edit an entry in the `portfolioData` array below.
 * 3. Add or remove sections freely inside `sections: [...]`.
 * 4. Each photo is guaranteed to display at most ONCE. If you only have 1 photo,
 *    set it as `cover` and the page adapts cleanly with NO duplicate images.
 * ============================================================================
 */
export const portfolioData: PortfolioEvent[] = [
  // --------------------------------------------------------------------------
  // 1. JOYRIOT (Featured Case Study)
  // --------------------------------------------------------------------------
  {
    id: 'JOYRIOT',
    title: 'JOYRIOT',
    category: 'A Sober Morning Dance Party',
    year: '2024',
    role: 'Creative Direction & Photography',
    scope: 'Documentary Stills & Visual Rhythm',
    location: 'Kathmandu, Nepal',
    timeline: 'Rooftop Morning Session',
    pitch: 'A sober morning dance celebration on a Kathmandu rooftop—redefining morning energy, collective movement, and unfiltered visual rhythm.',
    description: 'Stills from a rooftop Sober Morning Dance Party in Kathmandu, Nepal. The event was a celebration of music, dance, and community, bringing together people from all walks of life to enjoy a morning filled with joy and rhythm.',
    cover: motion, // Photo 1 (used once for the hero banner)
    coverAlt: 'JOYRIOT rooftop morning dance celebration in Kathmandu',
    sections: [
      {
        topic: 'Introduction',
        heading: 'Building a morning ritual that is energized, intentional, and deeply communal.',
        paragraphs: [
          'JOYRIOT redefines morning culture in Kathmandu. Stripping away nightlife excess, this gathering brings people together under open morning skies to celebrate movement, electronic soundscapes, and honest human connection.',
          'Captured from early dawn light to vibrant morning sunshine, the visual direction focuses on raw, authentic human expression—documenting dancers lost in rhythm without pretension or artificial staging.'
        ],
        // Photos 2, 3, 4 (rendered in asymmetric 3-image grid, zero repeats)
        photos: [
          { src: joy2, alt: 'Rooftop dance celebration at dawn in Kathmandu' },
          { src: joy3, alt: 'Close-up of participant immersed in music and sunlight' },
          { src: joy4, alt: 'Crowd movement on the Kathmandu rooftop' },
        ],
      },
      {
        topic: 'Visual Direction',
        heading: 'Balancing raw rooftop sunlight with cinematic shutter momentum.',
        paragraphs: [
          'Rather than static event documentation, each frame was composed to feel tactile and immersive. High-altitude Himalayan morning sunlight provided natural rim-lighting against the valley skyline.',
          'Through intentional motion pacing and candid observation, the stills capture the collective warmth, rhythmic liberation, and electric morning atmosphere unique to Kathmandu.'
        ],
        // Photo 5 (rendered in wide focus frame, zero repeats)
        photos: [
          { src: joy5, alt: 'Euphoric morning celebration still' },
        ],
      },
      {
        topic: 'Atmosphere',
        heading: 'Movement as meditation: unfiltered joy in the heart of the valley.',
        paragraphs: [
          'The atmosphere evolved from calm early morning stretching to euphoric dance. The lens moves alongside the crowd, staying close to tactile emotion—sweat, smiles, soundwaves, and collective freedom.'
        ],
      },
    ],
  },

  // --------------------------------------------------------------------------
  // 2. LIVING TRADITIONS (LAKHE) - Single Photo Archive Example
  // --------------------------------------------------------------------------
  {
    id: 'living-traditions',
    title: 'Living Traditions',
    category: 'LAKHE / Cultural Heritage',
    year: '2023',
    role: 'Cultural Photography & Direction',
    scope: 'Sacred Rituals & Living Heritage',
    location: 'Patan Durbar Square, Nepal',
    timeline: 'Festival Stills',
    pitch: 'Documenting the fierce energy and living mythology of the Lakhe in the historic courtyards of Patan.',
    description: 'Captured in Patan Durbar Square, this photograph captures the powerful presence of a Lakhe. A fierce figure raises both arms high, wearing a vivid red demonic mask with bulging eyes, sharp fangs, and wild black-and-white hair cascading over an ornate golden costume adorned with marigold garlands.',
    cover: culture, // Only 1 photo available: displayed cleanly once as Hero, NO DUPLICATE GRIDS!
    coverAlt: 'Lakhe ritual dancer in Patan',
    sections: [
      {
        topic: 'Introduction',
        heading: 'A living embodiment of myth, ritual power, and Newar ancestral heritage.',
        paragraphs: [
          'In the ancient stone squares of Patan, the Lakhe emerges—a fierce yet protective spirit whose dance reverberates through centuries of cultural memory.',
          'The visual framing isolates the kinetic power of the masked dancer against the historic brickwork, emphasizing texture, color contrast, and raw cultural gravitas.'
        ]
      },
      {
        topic: 'Visual Direction',
        heading: 'Preserving ceremonial authenticity without staged theatricality.',
        paragraphs: [
          'Rather than treating the ritual as a spectacle for tourism, the camera approaches with reverence. Natural ambient shadows and the vivid red demonic mask create an arresting study of sacred motion.'
        ]
      }
    ]
  },

  // --------------------------------------------------------------------------
  // 3. BHIMSEN JATRA (Multi-Photo Sacred Procession)
  // --------------------------------------------------------------------------
  {
    id: 'BHIMSEN JATRA',
    title: 'BHIMSEN JATRA',
    category: 'Cultural Procession / Jatra',
    year: '2024',
    role: 'Documentary Cinematography & Stills',
    scope: 'Festival Narrative & Street Stills',
    location: 'Patan, Nepal',
    timeline: 'Annual Sacred Festival',
    pitch: 'Vibrant palanquin processions, sacred rhythm, and collective Newar heritage on the streets of Patan.',
    description: 'Stills from Bhimsen Jatra, a traditional festival in Nepal. Marked by vibrant processions, cultural devotion, and community gatherings, showcasing the rich heritage and living traditions of the valley.',
    cover: jatra, // Hero banner
    coverAlt: 'Bhimsen Jatra festival in Patan',
    sections: [
      {
        topic: 'Introduction',
        heading: 'Collective devotion: the streets of Patan alive with sacred fury and joy.',
        paragraphs: [
          'Bhimsen Jatra transforms the cobblestone alleys of Patan into a river of sound, incense, and unyielding energy. Men bear the heavy wooden chariot aloft through packed courtyards.',
          'The series captures the shared exertion and transcendent devotion of the carriers, framed against timeless architectural facades.'
        ],
        photos: [jatra2, jatra3, jatra4],
      },
      {
        topic: 'The Procession',
        heading: 'Pacing the chaos: capturing intimate human emotion within massive street crowds.',
        paragraphs: [
          'Working in the midst of a dense festival crowd demands quick instinct and steady framing. Shutter speeds were kept deliberate to register both frantic street momentum and sharp portraits of devotion.'
        ],
        photos: [jatra5, jatra6, jatra7],
      },
      {
        topic: 'Nightfall & Torchlight',
        heading: 'As night descends, torchlight and sacred torches illuminate the temple eaves.',
        paragraphs: [
          'The concluding ceremonies push deep into the night. Golden candlelight and smoky torches cast long dramatic shadows across stone gods and worshippers alike.'
        ],
        photos: [jatra8, jatra9, jatra10],
      }
    ],
  },

  // --------------------------------------------------------------------------
  // 4. MYTHICAL BEAST (High-Altitude Wildlife) - Single Photo Archive
  // --------------------------------------------------------------------------
  {
    id: 'Mythical BEAST',
    title: 'MYTHICAL BEAST',
    category: 'Wildlife Photography',
    year: '2023',
    role: 'Visual Production & Photography',
    scope: 'High-Altitude Documentary',
    location: 'Tsomgo (12,313 ft)',
    timeline: 'Himalayan Ridge',
    pitch: 'Captured at 12,313 feet above sea level, bringing a high-altitude Himalayan myth into sharp reality.',
    description: 'Captured at (12,313 feet) above sea level near Gangtok Tsomgo Lake, this photograph brings a Himalayan myth into sharp reality. The image features a solitary, colossal Tibetan Yak standing against rugged mountain slopes under a clear blue sky, its formidable horns wrapped in bright red knitted covers with long flowing fringes.',
    cover: kathmandu,
    coverAlt: 'Tibetan Yak at Tsomgo Lake',
    sections: [
      {
        topic: 'Introduction',
        heading: 'A solitary titan standing at the edge of the sky.',
        paragraphs: [
          'At over twelve thousand feet, the air thins and the landscape becomes elemental—stone, snow, and boundless sky. This colossal Tibetan Yak stood as if carved from the mountain itself.',
          'The bright red ceremonial horn coverings provide a vivid human touchpoint against the primordial mountain backdrop.'
        ]
      }
    ]
  },

  // --------------------------------------------------------------------------
  // 5. COMING SOON
  // --------------------------------------------------------------------------
  {
    id: 'comingsoon',
    title: 'Coming Soon',
    category: 'Upcoming Studio Release',
    year: '2025',
    role: 'Creative Direction & Production',
    scope: 'In Development',
    location: 'Kathmandu, Nepal',
    pitch: 'New visual narratives and custom crafted physical objects are currently in production at coredeltav™.',
    description: 'Upcoming documentary series and studio editions in active development.',
    cover: coming,
    coverAlt: 'Coming soon teaser',
  },
];

export const getEvent = (id?: string) => {
  if (!id) return undefined;
  // Case-insensitive lookup so /work/joyriot or /work/JOYRIOT both resolve correctly!
  return portfolioData.find(e => e.id.toLowerCase() === id.toLowerCase());
};
