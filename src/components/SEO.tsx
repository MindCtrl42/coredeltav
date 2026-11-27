import { Helmet } from 'react-helmet-async';

export interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  canonicalUrl?: string;
  ogType?: 'website' | 'profile' | 'product' | 'article';
  ogImage?: string;
  jsonLd?: Record<string, any> | Array<Record<string, any>>;
  productData?: {
    name: string;
    description: string;
    price: number;
    currency?: string;
    image: string;
    availability?: 'InStock' | 'OutOfStock' | 'PreOrder';
    sku?: string;
  };
}

const DEFAULT_TITLE =
  'coredeltav™ — Sabin Bhandari | Creative Director, Visual Storyteller, Cinematographer & Photographer in Kathmandu, Nepal';
const DEFAULT_DESCRIPTION =
  'coredeltav™ is an independent creative studio led by Sabin Bhandari — a creative director in Nepal, visual storyteller Kathmandu, cinematographer in Kathmandu, and photographer in Kathmandu, Nepal.';
const DEFAULT_KEYWORDS = [
  'Sabin Bhandari',
  'coredeltav',
  'coredeltav™',
  'creative director in Nepal',
  'visual storyteller Kathmandu',
  'cinematographer in Kathmandu',
  'photographer in Kathmandu, Nepal',
  'Creative Direction',
  'Visual Storytelling',
  'Cinematography',
  'Photography',
  'Video Editing',
  'Graphic Design',
  'coredeltav.com',
].join(', ');
const SITE_URL = 'https://coredeltav.com';
const DEFAULT_OG_IMAGE = `${SITE_URL}/og-image.png`;

export default function SEO({
  title,
  description = DEFAULT_DESCRIPTION,
  keywords = DEFAULT_KEYWORDS,
  canonicalUrl = SITE_URL,
  ogType = 'website',
  ogImage = DEFAULT_OG_IMAGE,
  jsonLd,
  productData,
}: SEOProps) {
  const fullTitle = title
    ? `${title} — coredeltav™`
    : DEFAULT_TITLE;

  // Base structured data: Studio (LocalBusiness / ProfessionalService) + Founder (Person) + WebSite
  const baseSchemaGraph: Record<string, any>[] = [
    {
      '@type': ['ProfessionalService', 'LocalBusiness'],
      '@id': `${SITE_URL}/#studio`,
      name: 'coredeltav™',
      alternateName: ['coredeltav', 'Core Delta V', 'Coredeltav Studio'],
      url: SITE_URL,
      logo: `${SITE_URL}/og-image.png`,
      image: `${SITE_URL}/og-image.png`,
      description: DEFAULT_DESCRIPTION,
      telephone: '+977-9767834472',
      email: 'contact@coredeltav.com',
      priceRange: 'NPR',
      currenciesAccepted: 'NPR',
      paymentAccepted: 'WhatsApp Order, Cash on Delivery, Bank Transfer',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Kathmandu',
        addressRegion: 'Bagmati Province',
        addressCountry: 'NP',
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: 27.7172,
        longitude: 85.324,
      },
      areaServed: [
        { '@type': 'City', name: 'Kathmandu' },
        { '@type': 'Country', name: 'Nepal' },
        { '@type': 'AdministrativeArea', name: 'Worldwide' },
      ],
      founder: {
        '@type': 'Person',
        '@id': `${SITE_URL}/#sabin-bhandari`,
        name: 'Sabin Bhandari',
        jobTitle: 'Creative Director, Visual Storyteller, Cinematographer & Photographer',
        description:
          'Sabin Bhandari is an independent creative director in Nepal, visual storyteller Kathmandu, cinematographer in Kathmandu, and photographer in Kathmandu, Nepal.',
        url: SITE_URL,
        worksFor: {
          '@id': `${SITE_URL}/#studio`,
        },
        sameAs: [
          'https://www.instagram.com/coredeltav',
          'https://www.youtube.com/@coredeltav',
        ],
        knowsAbout: [
          'Creative Direction',
          'Visual Storytelling',
          'Cinematography',
          'Photography',
          'Video Editing',
          'Graphic Design',
          'Minimalist Product Design',
          'Brand Identity & Narrative Strategy',
        ],
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Kathmandu',
          addressCountry: 'NP',
        },
      },
      openingHoursSpecification: {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: [
          'Monday',
          'Tuesday',
          'Wednesday',
          'Thursday',
          'Friday',
          'Sunday',
        ],
        opens: '10:00',
        closes: '18:00',
      },
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'coredeltav™ Creative Services',
        itemListElement: [
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Creative Direction',
              description: 'End-to-end creative direction, art direction, and concept development in Kathmandu, Nepal.',
            },
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Visual Storytelling',
              description: 'Documentary and commercial visual storytelling for founders, startups, cultural festivals, and brands.',
            },
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Cinematography',
              description: 'Commercial cinematography, film direction, and camera production in Kathmandu, Nepal.',
            },
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Photography',
              description: 'Editorial, portrait, brand, and live event photography in Kathmandu, Nepal.',
            },
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Video Editing',
              description: 'High-retention commercial video editing, sound design, and color grading.',
            },
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Graphic Design',
              description: 'Graphic design, illustration, and visual identity systems.',
            },
          },
        ],
      },
    },
    {
      '@type': 'WebSite',
      '@id': `${SITE_URL}/#website`,
      url: SITE_URL,
      name: 'coredeltav™',
      description: DEFAULT_DESCRIPTION,
      publisher: {
        '@id': `${SITE_URL}/#studio`,
      },
    },
  ];

  // If page provides specific product data, attach rich product snippet
  if (productData) {
    baseSchemaGraph.push({
      '@type': 'Product',
      '@id': `${canonicalUrl}#product`,
      name: productData.name,
      image: productData.image.startsWith('http') ? productData.image : `${SITE_URL}${productData.image}`,
      description: productData.description,
      brand: {
        '@type': 'Brand',
        name: 'coredeltav™',
      },
      offers: {
        '@type': 'Offer',
        url: canonicalUrl,
        priceCurrency: productData.currency || 'NPR',
        price: productData.price,
        availability:
          productData.availability === 'OutOfStock'
            ? 'https://schema.org/OutOfStock'
            : 'https://schema.org/InStock',
        seller: {
          '@id': `${SITE_URL}/#studio`,
        },
      },
    });
  }

  // If custom schema provided, append to graph
  if (jsonLd) {
    if (Array.isArray(jsonLd)) {
      baseSchemaGraph.push(...jsonLd);
    } else {
      baseSchemaGraph.push(jsonLd);
    }
  }

  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': baseSchemaGraph,
  };

  return (
    <Helmet>
      {/* Standard HTML Meta */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content="Sabin Bhandari — coredeltav™" />
      <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
      <link rel="canonical" href={canonicalUrl} />

      {/* Open Graph / Facebook */}
      <meta property="og:site_name" content="coredeltav™" />
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:locale" content="en_US" />

      {/* Twitter Cards */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@coredeltav" />
      <meta name="twitter:creator" content="@coredeltav" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />

      {/* AI Search Engine Directives (ChatGPT, Perplexity, Google AI Overviews) */}
      <meta name="article:publisher" content="https://coredeltav.com" />
      <meta name="geo.region" content="NP-BA" />
      <meta name="geo.placename" content="Kathmandu" />
      <meta name="geo.position" content="27.7172;85.3240" />
      <meta name="ICBM" content="27.7172, 85.3240" />

      {/* Schema.org Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>
    </Helmet>
  );
}

